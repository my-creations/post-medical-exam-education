import { EXAMS, SPECIALTIES } from "./documents.js";

const ORDERED_EXAMS = SPECIALTIES.flatMap((specialty) =>
  EXAMS.filter((exam) => exam.specialty === specialty.id),
);

function normalizeLanguage(language) {
  return language === "en" ? "en" : "pt";
}

function localizeExam(exam, language, index) {
  const normalizedLanguage = normalizeLanguage(language);
  const documentUrl = exam.documents[normalizedLanguage];
  const specialty = SPECIALTIES.find(({ id }) => id === exam.specialty);

  return {
    id: exam.id,
    number: String(index + 1).padStart(2, "0"),
    name: exam.names[normalizedLanguage],
    specialty: {
      id: specialty.id,
      name: specialty.names[normalizedLanguage],
    },
    content: exam.content[normalizedLanguage],
    document: {
      available: Boolean(documentUrl),
      url: documentUrl,
    },
  };
}

export function getExamCatalogue(language = "pt") {
  return ORDERED_EXAMS.map((exam, index) => localizeExam(exam, language, index));
}

export function resolveExamSelection(examId, language = "pt") {
  const examIndex = ORDERED_EXAMS.findIndex((exam) => exam.id === examId);

  if (examIndex === -1) return null;

  return localizeExam(ORDERED_EXAMS[examIndex], language, examIndex);
}
