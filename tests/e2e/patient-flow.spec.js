import { expect, test } from "@playwright/test";

test("patient selects an examination and sees that its document is pending", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Indicações pós-exame");
  await expect(
    page.getByRole("button", {
      name: /Endoscopia|Broncofibroscopia|Anuscopia|Fibrosigmoidoscopia/,
    }),
  ).toHaveCount(5);

  await page.getByRole("button", { name: "Broncofibroscopia" }).click();

  await expect(page.getByRole("heading", { name: "Broncofibroscopia", level: 2 })).toBeVisible();
  await expect(page.getByText("Documento brevemente disponível")).toBeVisible();
  await expect(page.getByRole("button", { name: "Ver indicações" })).toBeDisabled();
  await expect(page.getByRole("button", { name: "Descarregar PDF" })).toBeDisabled();
  await expect(page).toHaveURL(/exam=bronchoscopy/);
});

test("patient changes to English without losing the selected examination", async ({ page }) => {
  await page.goto("/?exam=anoscopy");

  await page.getByRole("button", { name: "EN", exact: true }).click();

  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Post-exam instructions");
  await expect(page.getByRole("heading", { name: "High-resolution Anoscopy" })).toBeVisible();
  await expect(page.getByText("Document available soon")).toBeVisible();
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
});
