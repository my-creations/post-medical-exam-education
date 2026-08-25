import { expect, test } from "@playwright/test";

test("patient reads and downloads an examination document", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Indicações pós-exame");
  await expect(page.locator(".exam-option")).toHaveCount(12);
  await expect(page.locator(".exam-specialty")).toHaveText([
    "Gastrenterologia",
    "Pneumologia",
    "Ginecologia",
    "Proctologia",
    "Cardiologia",
  ]);

  await page.getByRole("button", { name: "Broncofibroscopia" }).click();

  await expect(page.getByRole("heading", { name: "Broncofibroscopia", level: 2 })).toBeVisible();
  await expect(page.getByText("Documento disponível")).toBeVisible();
  await page.getByRole("button", { name: "Ler no ecrã" }).click();
  await expect(page.getByRole("heading", { name: "Sinais e sintomas de alerta" })).toBeVisible();
  await expect(page.getByText("Falta de ar.", { exact: true })).toBeVisible();
  await expect(page.locator(".source-note")).toHaveCount(0);

  const downloadPromise = page.waitForEvent("download");
  await page.getByRole("link", { name: "Descarregar PDF" }).click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe("bronchoscopy.pdf");
  await expect(page).toHaveURL(/exam=bronchoscopy/);
});

test("patient changes to English without losing the selected examination", async ({ page }) => {
  await page.goto("/?exam=anoscopy");

  await page.getByRole("button", { name: "EN", exact: true }).click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Post-exam instructions");
  await expect(page.getByRole("heading", { name: "High-resolution Anoscopy" })).toBeVisible();
  await expect(page.getByText("Document available")).toBeVisible();
  await expect(page).toHaveURL(/lang=en/);
  await expect(page).toHaveURL(/exam=anoscopy/);
});

test("mobile patient can select every examination without horizontal overflow", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/?lang=en");

  await expect(page.getByRole("button", { name: "Flexible Sigmoidoscopy" })).toBeVisible();
  await page.getByRole("button", { name: "Flexible Sigmoidoscopy" }).click();

  const hasHorizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );

  expect(hasHorizontalOverflow).toBe(false);
  await expect(page.getByRole("heading", { name: "Flexible Sigmoidoscopy" })).toBeVisible();

  await page.getByRole("button", { name: "Choose another examination" }).click();
  await expect(page.getByRole("button", { name: "Upper GI Endoscopy" })).toBeFocused();
  await expect
    .poll(() =>
      page
        .locator(".exam-list")
        .evaluate((list) => Math.abs(list.getBoundingClientRect().top) <= 24),
    )
    .toBe(true);
  await expect(page).toHaveURL(/\?lang=en$/);
});
