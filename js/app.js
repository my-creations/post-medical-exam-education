import { getExamCatalogue, resolveExamSelection } from "./catalog.js";
import { getCopy } from "./i18n.js";

const app = document.querySelector("#app");
const initialParams = new URLSearchParams(window.location.search);

const state = {
  language: initialParams.get("lang") === "en" ? "en" : "pt",
  selectedExamId: initialParams.get("exam"),
  readerOpen: false,
};

if (!resolveExamSelection(state.selectedExamId, state.language)) state.selectedExamId = null;

function languageToggle(copy) {
  return `
    <div class="language-toggle" role="group" aria-label="${copy.language}">
      <button type="button" data-language="pt" aria-pressed="${state.language === "pt"}" class="${state.language === "pt" ? "is-active" : ""}">PT</button>
      <button type="button" data-language="en" aria-pressed="${state.language === "en"}" class="${state.language === "en" ? "is-active" : ""}">EN</button>
    </div>`;
}

function brand(copy) {
  return `
    <a class="brand" href="./" aria-label="${copy.service}">
      <span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
      <span class="brand-copy"><strong>${copy.service}</strong><small>${copy.nursing}</small></span>
    </a>`;
}

function examOption(exam) {
  return `
    <button
      type="button"
      class="exam-option ${state.selectedExamId === exam.id ? "is-selected" : ""}"
      data-exam-id="${exam.id}"
      aria-label="${exam.name}"
      aria-pressed="${state.selectedExamId === exam.id}"
    >
      <span class="exam-number" aria-hidden="true">${exam.number}</span>
      <span class="exam-name">${exam.name}</span>
      <span class="exam-arrow" aria-hidden="true">→</span>
    </button>`;
}

function examList(exams) {
  const groups = exams.reduce((specialties, exam) => {
    const current = specialties.at(-1);

    if (current?.id === exam.specialty.id) {
      current.exams.push(exam);
    } else {
      specialties.push({ ...exam.specialty, exams: [exam] });
    }

    return specialties;
  }, []);

  return groups
    .map(
      (specialty) => `
        <section class="exam-group" aria-labelledby="specialty-${specialty.id}">
          <h2 class="exam-specialty" id="specialty-${specialty.id}">${specialty.name}</h2>
          <div class="exam-options">${specialty.exams.map(examOption).join("")}</div>
        </section>`,
    )
    .join("");
}

function emptyDocument(copy) {
  return `
    <div class="document-empty">
      <div class="paper-stack" aria-hidden="true"><span></span><span></span><strong>PDF</strong></div>
      <h2>${copy.emptyTitle}</h2>
      <p>${copy.emptyBody}</p>
    </div>`;
}

function documentItems(items) {
  if (!items?.length) return "";

  return `<ul>${items
    .map((item) => `<li>${item.text}${documentItems(item.items)}</li>`)
    .join("")}</ul>`;
}

function webDocument(copy, exam) {
  const content = exam.content;

  return `
    <article class="web-document" id="web-document" aria-labelledby="web-document-title">
      <header>
        <p>${copy.webVersion}</p>
        <h2 id="web-document-title">${exam.name}</h2>
        <p class="web-summary">${content.summary}</p>
      </header>
      ${content.sections
        .map(
          (section) => `
            <section>
              ${section.title ? `<h3>${section.title}</h3>` : ""}
              ${(section.paragraphs ?? []).map((paragraph) => `<p>${paragraph}</p>`).join("")}
              ${documentItems(section.items)}
            </section>`,
        )
        .join("")}
      <aside class="web-contact">
        <h3>${content.contactTitle}</h3>
        <p>${content.contact}</p>
      </aside>
    </article>`;
}

function selectedDocument(copy, exam) {
  const documentStatus = exam.document.available ? copy.available : copy.pending;
  const statusBody = exam.document.available ? copy.bilingual : copy.pendingBody;

  return `
    <div class="document-selected">
      <div class="document-summary">
        <span class="selection-check" aria-hidden="true">✓</span>
        <p class="selection-label">${copy.selected}</p>
        <h2>${exam.name}</h2>
        <div class="file-card ${exam.document.available ? "is-available" : "is-pending"}">
          <span class="file-type">PDF</span>
          <span class="file-copy"><strong>${documentStatus}</strong><small>${statusBody}</small></span>
          <span class="status-dot" aria-hidden="true"></span>
        </div>
        <div class="document-actions">
          <button type="button" class="button button-primary" data-action="read">${state.readerOpen ? copy.hide : copy.view}</button>
          ${
            exam.document.available
              ? `<a class="button button-secondary" href="${exam.document.url}" download>${copy.download}</a>`
              : `<button type="button" class="button button-secondary" disabled>${copy.download}</button>`
          }
        </div>
        <button type="button" class="choose-another" data-action="clear">← ${copy.chooseAnother}</button>
      </div>
      ${state.readerOpen ? webDocument(copy, exam) : ""}
    </div>`;
}

function syncUrl() {
  const params = new URLSearchParams();
  if (state.language === "en") params.set("lang", "en");
  if (state.selectedExamId) params.set("exam", state.selectedExamId);
  const query = params.toString();
  window.history.replaceState({}, "", `${window.location.pathname}${query ? `?${query}` : ""}`);
}

function render() {
  const copy = getCopy(state.language);
  const exams = getExamCatalogue(state.language);
  const selectedExam = resolveExamSelection(state.selectedExamId, state.language);

  document.documentElement.lang = state.language === "pt" ? "pt-PT" : "en";
  document.title = copy.metaTitle;

  app.innerHTML = `
    <div class="page-shell">
      <header class="site-header">
        ${brand(copy)}
        <div class="header-actions">${languageToggle(copy)}</div>
      </header>
      <main class="main-layout">
        <section class="exam-directory" aria-labelledby="page-title">
          <div class="directory-heading">
            <p class="eyebrow"><span></span>${copy.eyebrow}</p>
            <h1 id="page-title">${copy.title}</h1>
            <p>${copy.prompt}</p>
          </div>
          <div class="exam-list">${examList(exams)}</div>
        </section>
        <section class="document-area" aria-live="polite">
          <div class="document-sheet ${state.readerOpen ? "is-reading" : ""}">
            <p class="document-kicker">${copy.document}</p>
            ${selectedExam ? selectedDocument(copy, selectedExam) : emptyDocument(copy)}
          </div>
          <p class="safety-note">${copy.safety}</p>
        </section>
      </main>
    </div>`;

  syncUrl();
}

app.addEventListener("click", (event) => {
  const languageButton = event.target.closest("[data-language]");
  const examButton = event.target.closest("[data-exam-id]");
  const actionButton = event.target.closest("[data-action]");

  if (languageButton) {
    state.language = languageButton.dataset.language;
    state.readerOpen = false;
    render();
    return;
  }

  if (examButton) {
    state.selectedExamId = examButton.dataset.examId;
    state.readerOpen = false;
    render();
    document
      .querySelector(".document-area")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  if (!actionButton) return;

  if (actionButton.dataset.action === "clear") {
    state.selectedExamId = null;
    state.readerOpen = false;
    render();

    if (window.matchMedia("(max-width: 900px)").matches) {
      const list = document.querySelector(".exam-list");
      list?.querySelector(".exam-option")?.focus({ preventScroll: true });
      list?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  if (actionButton.dataset.action === "read") {
    state.readerOpen = !state.readerOpen;
    render();
    if (state.readerOpen) {
      document
        .querySelector("#web-document")
        ?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.readerOpen) {
    state.readerOpen = false;
    render();
  }
});

render();
