import { describe, expect, it } from "vitest";

import { getExamCatalogue, resolveExamSelection } from "../../js/catalog.js";

describe("exam catalogue", () => {
  it("returns every unique examination from the supplied scan in European Portuguese", () => {
    const catalogue = getExamCatalogue();

    expect(catalogue.map((exam) => exam.name)).toEqual([
      "Endoscopia Digestiva Alta",
      "Colonoscopia Total",
      "Fibrosigmoidoscopia",
      "Cápsula Endoscópica",
      "Broncofibroscopia",
      "Toracocentese",
      "Histeroscopia",
      "MonaLisa Touch",
      "Tratamento Laser do Colo do Útero, Vagina ou Vulva",
      "Anuscopia de Alta Resolução",
      "Anuscopia",
      "Cardioversão Elétrica Eletiva",
    ]);
    expect([...new Set(catalogue.map((exam) => exam.specialty.name))]).toEqual([
      "Gastrenterologia",
      "Pneumologia",
      "Ginecologia",
      "Proctologia",
      "Cardiologia",
    ]);
  });

  it("returns English names when English is requested", () => {
    const catalogue = getExamCatalogue("en");

    expect(catalogue.map((exam) => exam.name)).toEqual([
      "Upper GI Endoscopy",
      "Total Colonoscopy",
      "Flexible Sigmoidoscopy",
      "Capsule Endoscopy",
      "Fiberoptic Bronchoscopy",
      "Thoracentesis",
      "Hysteroscopy",
      "MonaLisa Touch",
      "Laser Treatment of the Cervix, Vagina or Vulva",
      "High-resolution Anoscopy",
      "Anoscopy",
      "Elective Electrical Cardioversion",
    ]);
  });

  it("falls back to European Portuguese for an unsupported language", () => {
    expect(getExamCatalogue("fr")[0].name).toBe("Endoscopia Digestiva Alta");
  });
});

describe("exam selection", () => {
  it("resolves a known examination with web content and its draft PDF", () => {
    expect(resolveExamSelection("bronchoscopy", "en")).toMatchObject({
      id: "bronchoscopy",
      number: "05",
      name: "Fiberoptic Bronchoscopy",
      specialty: {
        id: "pulmonology",
        name: "Pulmonology",
      },
      content: {
        summary: "Information and care after a bronchoscopy.",
      },
      document: {
        available: true,
        url: "./assets/documents/en/bronchoscopy.pdf",
      },
    });
  });

  it("returns null for an unknown examination", () => {
    expect(resolveExamSelection("not-an-exam", "pt")).toBeNull();
  });
});
