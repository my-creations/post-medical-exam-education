import { describe, expect, it } from "vitest";

import { getExamCatalogue, resolveExamSelection } from "../../js/catalog.js";

describe("exam catalogue", () => {
  it("returns the five approved examinations in European Portuguese by default", () => {
    const catalogue = getExamCatalogue();

    expect(catalogue.map((exam) => exam.name)).toEqual([
      "Endoscopia Digestiva Alta",
      "Endoscopia Digestiva Baixa",
      "Broncofibroscopia",
      "Anuscopia de Alta Resolução",
      "Fibrosigmoidoscopia",
    ]);
  });

  it("returns English names when English is requested", () => {
    const catalogue = getExamCatalogue("en");

    expect(catalogue.map((exam) => exam.name)).toEqual([
      "Upper GI Endoscopy",
      "Lower GI Endoscopy",
      "Fiberoptic Bronchoscopy",
      "High-resolution Anoscopy",
      "Flexible Sigmoidoscopy",
    ]);
  });

  it("falls back to European Portuguese for an unsupported language", () => {
    expect(getExamCatalogue("fr")[0].name).toBe("Endoscopia Digestiva Alta");
  });
});

describe("exam selection", () => {
  it("resolves a known examination and reports that its PDF is pending", () => {
    expect(resolveExamSelection("bronchoscopy", "en")).toEqual({
      id: "bronchoscopy",
      number: "03",
      name: "Fiberoptic Bronchoscopy",
      document: {
        available: false,
        url: null,
      },
    });
  });

  it("returns null for an unknown examination", () => {
    expect(resolveExamSelection("not-an-exam", "pt")).toBeNull();
  });
});
