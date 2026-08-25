const translations = {
  pt: {
    metaTitle: "Indicações pós-exame",
    service: "Exames Especiais",
    nursing: "Serviço de Enfermagem",
    eyebrow: "Depois do seu exame",
    title: "Indicações pós-exame",
    prompt: "Selecione o exame que realizou.",
    document: "Indicações pós-exame",
    emptyTitle: "Qual foi o exame que realizou?",
    emptyBody:
      "Selecione o exame na lista. Depois pode consultar as indicações no ecrã ou guardar o PDF.",
    selected: "Exame selecionado",
    available: "Documento disponível",
    bilingual: "Disponível em português e inglês.",
    pending: "Documento brevemente disponível",
    pendingBody: "A equipa clínica ainda está a preparar este documento.",
    view: "Ler no ecrã",
    hide: "Ocultar indicações",
    webVersion: "Versão para web",
    download: "Descarregar PDF",
    chooseAnother: "Escolher outro exame",
    safety: "Em caso de dúvida ou agravamento dos sintomas, contacte a sua equipa de saúde.",
    language: "Idioma",
  },
  en: {
    metaTitle: "Post-exam instructions",
    service: "Special Procedures",
    nursing: "Nursing Service",
    eyebrow: "After your examination",
    title: "Post-exam instructions",
    prompt: "Select the examination you had.",
    document: "Post-exam instructions",
    emptyTitle: "Which examination did you have?",
    emptyBody:
      "Select the examination from the list. You can then read the instructions on screen or save the PDF.",
    selected: "Selected examination",
    available: "Document available",
    bilingual: "Available in Portuguese and English.",
    pending: "Document available soon",
    pendingBody: "The clinical team is still preparing this document.",
    view: "Read on screen",
    hide: "Hide instructions",
    webVersion: "Web version",
    download: "Download PDF",
    chooseAnother: "Choose another examination",
    safety: "If you have concerns or your symptoms worsen, contact your healthcare team.",
    language: "Language",
  },
};

export function getCopy(language) {
  return translations[language === "en" ? "en" : "pt"];
}
