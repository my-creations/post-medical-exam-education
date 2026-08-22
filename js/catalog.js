const EXAMS = [
  {
    id: "upper-endoscopy",
    names: {
      pt: "Endoscopia Digestiva Alta",
      en: "Upper GI Endoscopy",
    },
    documents: { pt: null, en: null },
  },
  {
    id: "lower-endoscopy",
    names: {
      pt: "Endoscopia Digestiva Baixa",
      en: "Lower GI Endoscopy",
    },
    documents: { pt: null, en: null },
  },
  {
    id: "bronchoscopy",
    names: {
      pt: "Broncofibroscopia",
      en: "Fiberoptic Bronchoscopy",
    },
    documents: { pt: null, en: null },
  },
  {
    id: "anoscopy",
    names: {
      pt: "Anuscopia de Alta Resolução",
      en: "High-resolution Anoscopy",
    },
    documents: { pt: null, en: null },
  },
  {
    id: "sigmoidoscopy",
    names: {
      pt: "Fibrosigmoidoscopia",
      en: "Flexible Sigmoidoscopy",
    },
    documents: { pt: null, en: null },
  },
];

function normalizeLanguage(language) {
  return language === "en" ? "en" : "pt";
}

function localizeExam(exam, language, index) {
  const normalizedLanguage = normalizeLanguage(language);
  const documentUrl = exam.documents[normalizedLanguage];

  return {
    id: exam.id,
    number: String(index + 1).padStart(2, "0"),
    name: exam.names[normalizedLanguage],
    document: {
      available: Boolean(documentUrl),
      url: documentUrl,
    },
  };
}

export function getExamCatalogue(language = "pt") {
  return EXAMS.map((exam, index) => localizeExam(exam, language, index));
}

export function resolveExamSelection(examId, language = "pt") {
  const examIndex = EXAMS.findIndex((exam) => exam.id === examId);

  if (examIndex === -1) return null;

  return localizeExam(EXAMS[examIndex], language, examIndex);
}
