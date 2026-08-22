// PROTOTYPE ONLY. Mock content and interactions for choosing a visual direction.
const exams = [
  {
    id: "upper-endoscopy",
    icon: "01",
    pt: "Endoscopia Digestiva Alta",
    en: "Upper GI Endoscopy",
  },
  {
    id: "lower-endoscopy",
    icon: "02",
    pt: "Endoscopia Digestiva Baixa",
    en: "Lower GI Endoscopy",
  },
  {
    id: "bronchoscopy",
    icon: "03",
    pt: "Broncofibroscopia",
    en: "Fiberoptic Bronchoscopy",
  },
  {
    id: "anoscopy",
    icon: "04",
    pt: "Anuscopia de Alta Resolução",
    en: "High-resolution Anoscopy",
  },
  {
    id: "sigmoidoscopy",
    icon: "05",
    pt: "Fibrosigmoidoscopia",
    en: "Flexible Sigmoidoscopy",
  },
];

const copy = {
  pt: {
    pageTitle: "Indicações pós-exame",
    service: "Exames Especiais",
    serviceShort: "Serviço de Enfermagem",
    language: "Idioma",
    eyebrow: "Depois do seu exame",
    title: "Encontre as indicações para o seu exame",
    intro:
      "Selecione o exame que realizou. Pode consultar as indicações no ecrã ou guardar o PDF no seu dispositivo.",
    select: "Selecionar exame",
    selected: "Exame selecionado",
    open: "Ver indicações",
    download: "Descarregar PDF",
    back: "Escolher outro exame",
    note: "Em caso de dúvida ou agravamento dos sintomas, contacte a sua equipa de saúde.",
    private: "Não pedimos dados pessoais.",
    available: "Documento disponível em português e inglês",
    choose: "Qual foi o exame que realizou?",
    chooseHint: "Toque numa opção para continuar.",
    document: "Indicações pós-exame",
    ready: "O seu documento está pronto",
    preview: "Pré-visualização do documento",
    close: "Fechar",
    page: "Página 1 de 2",
    placeholder: "Conteúdo clínico por inserir",
    placeholderBody:
      "Esta área vai apresentar o PDF validado pela equipa clínica. O documento ainda não faz parte deste protótipo.",
    unavailable: "O PDF será adicionado quando o conteúdo clínico estiver disponível.",
    home: "Início",
    step: "Passo 1 de 1",
    immediate: "Acesso imediato, sem registo",
  },
  en: {
    pageTitle: "Post-exam instructions",
    service: "Special Procedures",
    serviceShort: "Nursing Service",
    language: "Language",
    eyebrow: "After your examination",
    title: "Find the instructions for your examination",
    intro:
      "Select the examination you had. You can read the instructions on screen or save the PDF to your device.",
    select: "Select examination",
    selected: "Selected examination",
    open: "View instructions",
    download: "Download PDF",
    back: "Choose another examination",
    note: "If you have concerns or your symptoms worsen, contact your healthcare team.",
    private: "We do not ask for personal information.",
    available: "Document available in Portuguese and English",
    choose: "Which examination did you have?",
    chooseHint: "Tap an option to continue.",
    document: "Post-exam instructions",
    ready: "Your document is ready",
    preview: "Document preview",
    close: "Close",
    page: "Page 1 of 2",
    placeholder: "Clinical content to be added",
    placeholderBody:
      "This area will display the PDF approved by the clinical team. The document is not included in this prototype yet.",
    unavailable: "The PDF will be added when the clinical content is available.",
    home: "Home",
    step: "Step 1 of 1",
    immediate: "Immediate access, no sign-in",
  },
};

const variantNames = {
  A: { pt: "Cartões tranquilos", en: "Calm cards" },
  B: { pt: "Diretório clínico", en: "Clinical directory" },
  C: { pt: "Percurso direto", en: "Direct path" },
};

const params = new URLSearchParams(window.location.search);
const state = {
  variant: ["A", "B", "C"].includes(params.get("variant")) ? params.get("variant") : "A",
  lang: params.get("lang") === "en" ? "en" : "pt",
  selectedExam: exams.find((exam) => exam.id === params.get("exam")) ?? null,
  viewerOpen: params.get("view") === "1",
};

const app = document.querySelector("#app");
const toast = document.querySelector("#toast");

function t(key) {
  return copy[state.lang][key];
}

function examName(exam) {
  return exam?.[state.lang] ?? "";
}

function updateUrl() {
  const next = new URLSearchParams();
  next.set("variant", state.variant);
  next.set("lang", state.lang);
  if (state.selectedExam) next.set("exam", state.selectedExam.id);
  if (state.viewerOpen) next.set("view", "1");
  window.history.replaceState({}, "", `${window.location.pathname}?${next.toString()}`);
}

function brand(quiet = false) {
  return `
    <a class="brand ${quiet ? "brand--quiet" : ""}" href="#" data-action="home" aria-label="${t("home")}">
      <span class="brand-mark" aria-hidden="true"><i></i><i></i></span>
      <span class="brand-copy">
        <strong>${t("service")}</strong>
        <small>${t("serviceShort")}</small>
      </span>
    </a>`;
}

function languageToggle() {
  return `
    <div class="language-toggle" role="group" aria-label="${t("language")}">
      <button type="button" class="${state.lang === "pt" ? "is-active" : ""}" data-lang="pt" aria-pressed="${state.lang === "pt"}">PT</button>
      <button type="button" class="${state.lang === "en" ? "is-active" : ""}" data-lang="en" aria-pressed="${state.lang === "en"}">EN</button>
    </div>`;
}

function examButtons(className = "") {
  return exams
    .map(
      (exam) => `
        <button
          type="button"
          class="exam-option ${className} ${state.selectedExam?.id === exam.id ? "is-selected" : ""}"
          data-exam="${exam.id}"
          aria-pressed="${state.selectedExam?.id === exam.id}"
        >
          <span class="exam-number" aria-hidden="true">${exam.icon}</span>
          <span class="exam-label">${examName(exam)}</span>
          <span class="exam-arrow" aria-hidden="true">→</span>
        </button>`,
    )
    .join("");
}

function actionButtons() {
  if (!state.selectedExam) return "";

  return `
    <div class="document-actions">
      <button class="button button--primary" type="button" data-action="open-viewer">
        <span class="button-icon" aria-hidden="true">⌁</span>${t("open")}
      </button>
      <button class="button button--secondary" type="button" data-action="download">
        <span class="button-icon" aria-hidden="true">↓</span>${t("download")}
      </button>
    </div>`;
}

function renderVariantA() {
  return `
    <div class="variant variant-a">
      <header class="topbar topbar--contained">
        ${brand()}
        ${languageToggle()}
      </header>
      <main class="a-main">
        <section class="a-hero">
          <div class="eyebrow"><span></span>${t("eyebrow")}</div>
          <h1>${t("title")}</h1>
          <p>${t("intro")}</p>
        </section>

        <section class="a-picker" aria-labelledby="a-picker-title">
          <div class="section-heading">
            <span>01</span>
            <div><p>${t("select")}</p><h2 id="a-picker-title">${t("choose")}</h2></div>
          </div>
          <div class="a-grid">${examButtons("exam-option--card")}</div>
        </section>

        ${
          state.selectedExam
            ? `<section class="a-selection selection-panel" aria-live="polite">
                <div class="selection-icon" aria-hidden="true">✓</div>
                <div class="selection-copy">
                  <span>${t("selected")}</span>
                  <h2>${examName(state.selectedExam)}</h2>
                  <p>${t("available")}</p>
                </div>
                ${actionButtons()}
              </section>`
            : ""
        }

        <aside class="care-note"><span aria-hidden="true">i</span><p>${t("note")}</p></aside>
      </main>
      <footer class="simple-footer"><span>${t("private")}</span><span>${t("service")}</span></footer>
    </div>`;
}

function renderVariantB() {
  return `
    <div class="variant variant-b">
      <header class="b-header">
        ${brand(true)}
        <div class="b-header-right"><span class="secure-label">${t("immediate")}</span>${languageToggle()}</div>
      </header>
      <main class="b-layout">
        <section class="b-directory">
          <div class="b-intro">
            <div class="eyebrow"><span></span>${t("eyebrow")}</div>
            <h1>${t("pageTitle")}</h1>
            <p>${t("chooseHint")}</p>
          </div>
          <div class="b-list" role="list">${examButtons("exam-option--row")}</div>
          <p class="b-privacy"><span aria-hidden="true">◇</span>${t("private")}</p>
        </section>

        <section class="b-document ${state.selectedExam ? "has-selection" : ""}" aria-live="polite">
          <div class="b-document-inner">
            <div class="document-stamp">${t("document")}</div>
            ${
              state.selectedExam
                ? `<div class="b-selected">
                    <span class="large-check" aria-hidden="true">✓</span>
                    <p>${t("ready")}</p>
                    <h2>${examName(state.selectedExam)}</h2>
                    <div class="file-card">
                      <span class="file-type">PDF</span>
                      <div><strong>${t("document")}</strong><small>${t("available")}</small></div>
                    </div>
                    ${actionButtons()}
                    <button class="text-button" type="button" data-action="clear">← ${t("back")}</button>
                  </div>`
                : `<div class="b-empty">
                    <div class="paper-stack" aria-hidden="true"><span></span><span></span><span>PDF</span></div>
                    <h2>${t("choose")}</h2>
                    <p>${t("intro")}</p>
                  </div>`
            }
          </div>
          <p class="b-care-note">${t("note")}</p>
        </section>
      </main>
    </div>`;
}

function renderVariantC() {
  return `
    <div class="variant variant-c">
      <header class="c-header">
        ${brand(true)}
        ${languageToggle()}
      </header>
      <main class="c-main">
        <div class="c-progress"><span>${t("step")}</span><i></i></div>
        <div class="c-title-row">
          <div>
            <div class="eyebrow"><span></span>${t("eyebrow")}</div>
            <h1>${t("choose")}</h1>
          </div>
          <p>${t("chooseHint")}</p>
        </div>
        <section class="c-list" aria-label="${t("select")}">${examButtons("exam-option--line")}</section>

        ${
          state.selectedExam
            ? `<section class="c-action" aria-live="polite">
                <div><span>${t("selected")}</span><strong>${examName(state.selectedExam)}</strong></div>
                ${actionButtons()}
              </section>`
            : `<div class="c-idle"><span>↓</span>${t("select")}</div>`
        }
      </main>
      <footer class="c-footer"><p>${t("note")}</p><span>${t("private")}</span></footer>
    </div>`;
}

function viewer() {
  if (!state.viewerOpen || !state.selectedExam) return "";

  return `
    <div class="viewer-backdrop" data-action="close-viewer">
      <section class="viewer" role="dialog" aria-modal="true" aria-labelledby="viewer-title">
        <header class="viewer-header">
          <div><span>${t("preview")}</span><h2 id="viewer-title">${examName(state.selectedExam)}</h2></div>
          <button type="button" class="viewer-close" data-action="close-viewer" aria-label="${t("close")}">×</button>
        </header>
        <div class="viewer-toolbar">
          <span>${t("page")}</span>
          <button type="button" data-action="download">↓ ${t("download")}</button>
        </div>
        <div class="viewer-canvas">
          <article class="mock-pdf">
            <div class="mock-pdf-brand"><span></span>${t("service")}</div>
            <p class="mock-kicker">${t("document")}</p>
            <h3>${examName(state.selectedExam)}</h3>
            <div class="mock-rule"></div>
            <div class="placeholder-notice">
              <strong>${t("placeholder")}</strong>
              <p>${t("placeholderBody")}</p>
            </div>
            <div class="mock-lines" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></div>
          </article>
        </div>
      </section>
    </div>`;
}

function prototypeSwitcher() {
  const currentExam = state.selectedExam ? examName(state.selectedExam) : t("select");
  return `
    <aside class="prototype-switcher" aria-label="Prototype variants">
      <button type="button" data-switch="previous" aria-label="Previous variant">←</button>
      <div>
        <strong>${state.variant} · ${variantNames[state.variant][state.lang]}</strong>
        <span>${state.lang.toUpperCase()} · ${currentExam}</span>
      </div>
      <button type="button" data-switch="next" aria-label="Next variant">→</button>
    </aside>`;
}

function render() {
  document.documentElement.lang = state.lang === "pt" ? "pt-PT" : "en";
  document.title = `${t("pageTitle")} | Protótipo`;
  document.body.dataset.variant = state.variant;

  const variants = {
    A: renderVariantA,
    B: renderVariantB,
    C: renderVariantC,
  };

  app.innerHTML = `${variants[state.variant]()}${viewer()}${prototypeSwitcher()}`;
  updateUrl();

  if (state.viewerOpen) {
    requestAnimationFrame(() => document.querySelector(".viewer-close")?.focus());
  }
}

function setVariant(direction) {
  const variants = ["A", "B", "C"];
  const current = variants.indexOf(state.variant);
  const offset = direction === "next" ? 1 : -1;
  state.variant = variants[(current + offset + variants.length) % variants.length];
  state.viewerOpen = false;
  window.scrollTo({ top: 0, behavior: "smooth" });
  render();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => toast.classList.remove("is-visible"), 3200);
}

app.addEventListener("click", (event) => {
  const languageButton = event.target.closest("[data-lang]");
  const examButton = event.target.closest("[data-exam]");
  const actionButton = event.target.closest("[data-action]");
  const switchButton = event.target.closest("[data-switch]");

  if (languageButton) {
    state.lang = languageButton.dataset.lang;
    render();
    return;
  }

  if (examButton) {
    state.selectedExam = exams.find((exam) => exam.id === examButton.dataset.exam);
    state.viewerOpen = false;
    render();
    requestAnimationFrame(() =>
      document.querySelector(".selection-panel, .b-selected, .c-action")?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      }),
    );
    return;
  }

  if (switchButton) {
    setVariant(switchButton.dataset.switch);
    return;
  }

  if (!actionButton) return;

  const action = actionButton.dataset.action;
  if (action === "home") {
    event.preventDefault();
    state.selectedExam = null;
    state.viewerOpen = false;
    render();
  }
  if (action === "clear") {
    state.selectedExam = null;
    state.viewerOpen = false;
    render();
  }
  if (action === "open-viewer") {
    state.viewerOpen = true;
    render();
  }
  if (action === "close-viewer") {
    if (event.target.closest(".viewer") && !event.target.closest(".viewer-close")) return;
    state.viewerOpen = false;
    render();
  }
  if (action === "download") showToast(t("unavailable"));
});

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && state.viewerOpen) {
    state.viewerOpen = false;
    render();
    return;
  }

  const tagName = document.activeElement?.tagName;
  if (["INPUT", "TEXTAREA"].includes(tagName) || document.activeElement?.isContentEditable) return;
  if (state.viewerOpen) return;
  if (event.key === "ArrowLeft") setVariant("previous");
  if (event.key === "ArrowRight") setVariant("next");
});

render();
