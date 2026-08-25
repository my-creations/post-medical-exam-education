import { mkdir } from "node:fs/promises";
import { resolve } from "node:path";

import { chromium } from "@playwright/test";

import { getExamCatalogue } from "../js/catalog.js";

const root = resolve(import.meta.dirname, "..");
const outputRoot = resolve(root, "assets/documents");
const languages = ["pt", "en"];

function escapeHtml(value) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function list(items) {
  if (!items?.length) return "";

  return `<ul>${items
    .map((item) => `<li>${escapeHtml(item.text)}${item.items?.length ? list(item.items) : ""}</li>`)
    .join("")}</ul>`;
}

function section(sectionData) {
  return `
    <section>
      ${sectionData.title ? `<h2>${escapeHtml(sectionData.title)}</h2>` : ""}
      ${(sectionData.paragraphs ?? []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("")}
      ${list(sectionData.items)}
    </section>`;
}

function documentHtml(exam, language) {
  const content = exam.content;
  const documentLanguage = language === "pt" ? "pt-PT" : "en";

  return `<!doctype html>
<html lang="${documentLanguage}">
  <head>
    <meta charset="UTF-8" />
    <style>
      @page { size: A4; margin: 18mm 17mm 17mm; }
      * { box-sizing: border-box; }
      body {
        margin: 0;
        color: #273136;
        font-family: Arial, Helvetica, sans-serif;
        font-size: 11.5pt;
        line-height: 1.48;
      }
      header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 12mm;
        padding-bottom: 5mm;
        border-bottom: 2px solid #00a2ce;
      }
      .service { color: #016f8e; font-size: 10pt; font-weight: 700; }
      .language { color: #56656b; font-size: 9pt; text-transform: uppercase; }
      h1 {
        margin: 0 0 4mm;
        color: #074f64;
        font-size: 24pt;
        line-height: 1.12;
      }
      .summary { margin: 0 0 8mm; color: #56656b; font-size: 12pt; }
      section { margin-top: 7mm; break-inside: avoid; }
      h2 { margin: 0 0 3mm; color: #016f8e; font-size: 15pt; }
      p { margin: 0 0 3mm; }
      ul { margin: 2mm 0 0; padding-left: 6mm; }
      li { margin: 0 0 2.4mm; padding-left: 1mm; }
      li > ul { margin-top: 2mm; }
      .contact {
        margin-top: 9mm;
        padding: 5mm;
        border-left: 4px solid #00a2ce;
        background: #eef8fb;
        break-inside: avoid;
      }
      .contact h2 { margin-bottom: 2mm; font-size: 13pt; }
    </style>
  </head>
  <body>
    <header>
      <span class="service">${escapeHtml(content.service)}</span>
      <span class="language">${escapeHtml(content.languageLabel)}</span>
    </header>
    <main>
      <h1>${escapeHtml(exam.name)}</h1>
      <p class="summary">${escapeHtml(content.summary)}</p>
      ${content.sections.map(section).join("")}
      <section class="contact">
        <h2>${escapeHtml(content.contactTitle)}</h2>
        <p>${escapeHtml(content.contact)}</p>
      </section>
    </main>
  </body>
</html>`;
}

await Promise.all(
  languages.map((language) => mkdir(resolve(outputRoot, language), { recursive: true })),
);

const browser = await chromium.launch();
const page = await browser.newPage();

try {
  for (const language of languages) {
    for (const exam of getExamCatalogue(language)) {
      await page.setContent(documentHtml(exam, language), { waitUntil: "load" });
      await page.pdf({
        path: resolve(outputRoot, language, `${exam.id}.pdf`),
        format: "A4",
        printBackground: true,
        preferCSSPageSize: true,
      });
      console.log(`Generated ${language}/${exam.id}.pdf`);
    }
  }
} finally {
  await browser.close();
}
