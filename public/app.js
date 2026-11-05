const app = document.querySelector("#app");
const dialog = document.querySelector("#case-dialog");
const dialogContent = document.querySelector("#dialog-content");
const portraitUrl = "/images/diana-profile.jpeg";

const illustrations = {
  route: `<svg viewBox="0 0 360 210" aria-hidden="true"><path d="M20 168C84 168 79 43 153 43s64 116 128 116 44-98 73-98"/><path class="route-dash" d="M20 168C84 168 79 43 153 43s64 116 128 116 44-98 73-98"/><circle cx="20" cy="168" r="9"/><circle cx="153" cy="43" r="9"/><circle cx="281" cy="159" r="9"/><circle cx="354" cy="61" r="9"/><path class="tiny-star" d="m208 28 4 11 11 4-11 4-4 11-4-11-11-4 11-4z"/></svg>`,
  bank: `<svg viewBox="0 0 360 210" aria-hidden="true"><rect class="phone" x="122" y="13" width="116" height="184" rx="23"/><rect class="screen" x="132" y="29" width="96" height="152" rx="14"/><circle class="avatar-dot" cx="153" cy="54" r="13"/><path class="ui-line" d="M177 51h33M146 83h68M146 96h50"/><rect class="pay-tile" x="145" y="112" width="70" height="25" rx="8"/><path class="ui-line strong" d="M150 155h27M190 155h17"/><circle class="orbit-dot" cx="270" cy="50" r="17"/><path class="spark" d="m270 40 3 7 7 3-7 3-3 7-3-7-7-3 7-3z"/><path class="soft-orbit" d="M68 152c15-42 31-64 48-64M242 154c26-35 45-53 68-55"/></svg>`,
  mobile: `<svg viewBox="0 0 360 210" aria-hidden="true"><rect class="device device-back" x="155" y="26" width="91" height="150" rx="17" transform="rotate(12 155 26)"/><rect class="device" x="112" y="35" width="97" height="156" rx="18"/><rect class="device-screen" x="121" y="48" width="79" height="128" rx="10"/><path class="ui-line strong" d="M135 70h45M135 83h31M135 103h48M135 115h36M135 140h48M135 153h27"/><circle class="check" cx="273" cy="80" r="20"/><path class="check-mark" d="m264 80 6 6 12-14"/><path class="soft-orbit" d="M64 153c31-25 48-34 65-38M241 153c23 0 43-7 67-21"/></svg>`,
  performance: `<svg viewBox="0 0 360 210" aria-hidden="true"><rect class="dash-frame" x="49" y="25" width="263" height="160" rx="17"/><path class="ui-line" d="M72 52h94M72 67h54"/><path class="chart-grid" d="M72 153h214M72 127h214M72 101h214"/><path class="chart-area" d="M76 143 109 124l25 12 31-48 29 29 25-43 26 19 41-35v75H76z"/><path class="chart-line" d="m76 143 33-19 25 12 31-48 29 29 25-43 26 19 41-35"/><circle class="chart-point" cx="219" cy="74" r="5"/><rect class="metric" x="226" y="37" width="65" height="28" rx="9"/><path class="spark" d="m249 44 3 6 6 2-6 2-3 6-2-6-6-2 6-2z"/></svg>`,
  portfolio: `<svg viewBox="0 0 360 210" aria-hidden="true"><rect class="note" x="58" y="30" width="167" height="143" rx="14" transform="rotate(-7 58 30)"/><path class="ui-line" d="m91 73 93-12M94 88l80-10M97 104l61-8"/><circle class="sun" cx="245" cy="65" r="36"/><path class="flower" d="M248 49c15-19 36-2 20 13 22-6 27 16 4 19 16 17-3 33-18 15-7 23-28 19-25-3-20 11-33-8-12-20-14-17 4-31 18-13 2-22 22-24 13-11z"/><path class="soft-orbit" d="M38 176c63-37 110-39 158-15"/></svg>`
};

const categoryKeys = {
  engineering: "categoryEngineering",
  research: "categoryResearch",
  exploration: "categoryExploration"
};

let activeLocale = localStorage.getItem("diana-portfolio-locale") || "en";
let activeFilter = "all";
let currentPortfolio;

function escapeHtml(value = "") {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
  })[char]);
}

function categoryLabel(category, ui) {
  return ui[categoryKeys[category]] || category;
}

function projectCard(project, ui) {
  const status = project.status === "now" ? ui.statusNow : ui.statusPast;
  return `
    <article class="project-card project-card--${escapeHtml(project.visual)}" data-category="${escapeHtml(project.category)}">
      <div class="project-art">${illustrations[project.visual] || illustrations.portfolio}</div>
      <div class="project-copy">
        <div class="project-meta"><span class="project-category">${escapeHtml(categoryLabel(project.category, ui))}</span><span>${escapeHtml(project.year)}</span></div>
        <h3>${escapeHtml(project.title)}</h3>
        <p>${escapeHtml(project.summary)}</p>
        <div class="tag-row">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>
        <button class="text-button" type="button" data-open-project="${escapeHtml(project.id)}">${escapeHtml(ui.viewCase)} <span aria-hidden="true">↗</span></button>
      </div>
      <span class="project-status">${escapeHtml(status)}</span>
    </article>`;
}

function explorationCard(item) {
  return `<article class="exploration-card"><span class="exploration-number">${escapeHtml(item.number)}</span><p class="exploration-label">${escapeHtml(item.label)}</p><h3>${escapeHtml(item.title)}</h3><p>${escapeHtml(item.text)}</p><span class="exploration-arrow" aria-hidden="true">↗</span></article>`;
}

function experienceItem(item) {
  return `<details class="experience-item"><summary><span class="experience-date">${escapeHtml(item.date)}</span><span class="experience-main"><strong>${escapeHtml(item.role)}</strong><span>${escapeHtml(item.company)}</span></span><span class="experience-plus" aria-hidden="true">+</span></summary><div class="experience-detail"><p>${escapeHtml(item.summary)}</p><p class="learning-note">${escapeHtml(item.learning)}</p><div class="tag-row">${item.tools.map((tool) => `<span>${escapeHtml(tool)}</span>`).join("")}</div></div></details>`;
}

function renderPortfolio(portfolio) {
  currentPortfolio = portfolio;
  const { ui, profile } = portfolio;
  document.documentElement.lang = activeLocale;
  document.title = `${profile.name} — Portfolio in Motion`;
  document.querySelector("meta[name='description']")?.setAttribute("content", ui.heroBody);

  app.innerHTML = `
    <header class="site-header">
      <a class="wordmark" href="#top" aria-label="${escapeHtml(profile.name)} home"><span class="wordmark-mark">D<span>.</span></span><span class="wordmark-name">Diana Torres</span></a>
      <nav class="main-nav" aria-label="Main navigation">
        <a href="#story">${escapeHtml(ui.navStory)}</a><a href="#work">${escapeHtml(ui.navWork)}</a><a href="#journey">${escapeHtml(ui.navJourney)}</a><a href="#about">${escapeHtml(ui.navAbout)}</a>
      </nav>
      <div class="header-actions"><div class="language-switch" role="group" aria-label="Choose language">${["en", "fr", "es"].map((lang) => `<button type="button" class="language-button ${lang === activeLocale ? "is-active" : ""}" data-language="${lang}" aria-pressed="${lang === activeLocale}">${lang.toUpperCase()}</button>`).join("")}</div><a class="header-contact" href="#contact">${escapeHtml(ui.contact)} <span aria-hidden="true">↗</span></a></div>
      <button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false">☰</button>
    </header>

    <main id="main">
      <section class="hero section-shell" id="top">
        <div class="hero-copy" id="story">
          <p class="eyebrow"><span class="eyebrow-dot"></span>${escapeHtml(ui.heroEyebrow)}</p>
          <h1>${escapeHtml(ui.heroTitle)}</h1>
          <p class="hero-intro">${escapeHtml(ui.heroBody)}</p>
          <div class="hero-cta"><a class="button button-primary" href="#work">${escapeHtml(ui.heroPrimary)} <span aria-hidden="true">↓</span></a><a class="button button-quiet" href="#about">${escapeHtml(ui.heroSecondary)} <span aria-hidden="true">↗</span></a></div>
          <div class="hero-note"><span class="note-line"></span><span>${escapeHtml(ui.heroNote)}</span></div>
        </div>
        <div class="hero-art" aria-label="${escapeHtml(ui.portraitAlt)}">
          <div class="portrait-orbit portrait-orbit--one"></div><div class="portrait-orbit portrait-orbit--two"></div>
          <div class="portrait-frame"><img src="${portraitUrl}" alt="${escapeHtml(ui.portraitAlt)}" /></div>
          <span class="orbit-label orbit-label--top">${escapeHtml(profile.title)}</span><span class="orbit-label orbit-label--bottom">${escapeHtml(profile.location)}</span>
          <span class="tiny-spark spark-one">✳</span><span class="tiny-spark spark-two">✦</span><span class="hero-stamp">D<br/><small>in motion</small></span>
        </div>
        <div class="hero-bottom"><span>01 / 05</span><span class="hero-bottom-line"></span><span>${escapeHtml(ui.openToExplore)}</span></div>
      </section>

      <section class="signal-strip section-shell" aria-label="Profile highlights">
        <div><strong>5<span>+</span></strong><p>${escapeHtml(ui.statYears)}</p></div><div><strong>3</strong><p>${escapeHtml(ui.statLanguages)}</p></div><div><strong>↗</strong><p>${escapeHtml(ui.statNext)}</p></div>
      </section>

      <section class="work-section section-shell" id="work">
        <div class="section-heading"><div><p class="eyebrow">${escapeHtml(ui.workEyebrow)}</p><h2>${escapeHtml(ui.workTitle)}</h2></div><p class="section-intro">${escapeHtml(ui.workIntro)}</p></div>
        <div class="filter-bar" role="group" aria-label="Filter projects">${[["all", ui.filterAll], ["engineering", ui.filterEngineering], ["research", ui.filterResearch], ["exploration", ui.filterExploration]].map(([value, label]) => `<button class="filter-button ${value === activeFilter ? "is-active" : ""}" data-filter="${value}" type="button" aria-pressed="${value === activeFilter}">${escapeHtml(label)}</button>`).join("")}</div>
        <div class="project-grid">${portfolio.projects.map((project) => projectCard(project, ui)).join("")}</div>
      </section>

      <section class="next-section section-shell">
        <div class="next-copy"><p class="eyebrow"><span class="eyebrow-star">✳</span>${escapeHtml(ui.focusEyebrow)}</p><h2>${escapeHtml(ui.focusTitle)}</h2><p>${escapeHtml(ui.focusBody)}</p><div class="focus-tags"><span>${escapeHtml(ui.focusTag1)}</span><span>${escapeHtml(ui.focusTag2)}</span><span>${escapeHtml(ui.focusTag3)}</span></div></div>
        <div class="exploration-area"><div class="exploration-header"><span>DRAW MY FUTURE</span><span>2026 →</span></div><div class="exploration-grid">${portfolio.explorations.map(explorationCard).join("")}</div><p class="future-footnote">${escapeHtml(ui.statusExploring)} · ${escapeHtml(profile.name)}</p></div>
      </section>

      <section class="journey-section section-shell" id="journey">
        <div class="journey-heading"><p class="eyebrow">${escapeHtml(ui.journeyEyebrow)}</p><h2>${escapeHtml(ui.journeyTitle)}</h2><p>${escapeHtml(ui.journeyIntro)}</p></div>
        <div class="journey-route"><div class="route-place"><span class="route-marker"></span><div><strong>${escapeHtml(ui.storyOrigin)}</strong><span>Where my story started</span></div></div><svg viewBox="0 0 540 92" preserveAspectRatio="none" aria-hidden="true"><path d="M8 73 C84 73 76 15 151 15 S228 73 302 73 385 15 457 15 496 53 532 33"/><circle cx="8" cy="73" r="5"/><circle cx="532" cy="33" r="5"/></svg><div class="route-place route-place--end"><span class="route-marker"></span><div><strong>${escapeHtml(ui.storyCurrent)}</strong><span>${escapeHtml(ui.storyRoute)}</span></div></div></div>
        <div class="experience-heading"><div><p class="eyebrow">${escapeHtml(ui.experienceLabel)}</p><p>${escapeHtml(ui.experienceHint)}</p></div><span class="experience-count">0${portfolio.experience.length}</span></div>
        <div class="experience-list">${portfolio.experience.map(experienceItem).join("")}</div>
      </section>

      <section class="about-section section-shell" id="about">
        <div class="about-intro"><p class="eyebrow">${escapeHtml(ui.aboutEyebrow)}</p><h2>${escapeHtml(ui.aboutTitle)}</h2><p>${escapeHtml(ui.aboutIntro)}</p></div>
        <div class="about-content"><div class="hobby-panel"><p class="panel-label">${escapeHtml(ui.hobbiesTitle)}</p><div class="hobby-list">${portfolio.hobbies.map((hobby, index) => `<article class="hobby-item hobby-item--${index + 1}"><span class="hobby-number">0${index + 1}</span><div><h3>${escapeHtml(hobby.name)}</h3><p>${escapeHtml(hobby.note)}</p></div><span class="hobby-symbol" aria-hidden="true">${["✳", "◌", "⌁"][index]}</span></article>`).join("")}</div></div>
          <div class="language-panel"><p class="panel-label">${escapeHtml(ui.languagesTitle)}</p><div class="language-list">${portfolio.languages.map((language) => `<div><strong>${escapeHtml(language.name)}</strong><span>${escapeHtml(language.level)}</span><span class="language-bar"><i></i></span></div>`).join("")}</div><div class="skill-cloud">${portfolio.skills.map((group) => `<span>${escapeHtml(group.title)}</span>`).join("")}</div></div></div>
      </section>

      <section class="contact-section section-shell" id="contact"><div class="contact-orb" aria-hidden="true">✳</div><div><p class="eyebrow">${escapeHtml(ui.contactEyebrow)}</p><h2>${escapeHtml(ui.contactTitle)}</h2><p>${escapeHtml(ui.contactBody)}</p><div class="contact-actions"><a class="button button-primary" href="mailto:${encodeURIComponent(profile.email)}">${escapeHtml(ui.emailCta)} <span aria-hidden="true">↗</span></a><a class="button button-outline" href="${escapeHtml(profile.linkedin)}" target="_blank" rel="noreferrer">${escapeHtml(ui.linkedinCta)} <span aria-hidden="true">↗</span></a></div></div></section>
    </main>
    <footer class="site-footer section-shell"><a class="wordmark" href="#top"><span class="wordmark-mark">D<span>.</span></span><span class="wordmark-name">Diana Torres</span></a><span>${escapeHtml(ui.footerNote)}</span><a href="#top" class="back-to-top">↑ <span>TOP</span></a></footer>`;

  bindInteractions();
  updateFilter();
}

function showProject(projectId) {
  const project = currentPortfolio.projects.find((item) => item.id === projectId);
  if (!project) return;
  const { ui } = currentPortfolio;
  dialogContent.innerHTML = `<p class="eyebrow">${escapeHtml(categoryLabel(project.category, ui))} · ${escapeHtml(project.year)}</p><h2 id="dialog-title">${escapeHtml(project.title)}</h2><p class="dialog-summary">${escapeHtml(project.summary)}</p><div class="dialog-detail-grid"><section><h3>${escapeHtml(ui.caseChallenge)}</h3><p>${escapeHtml(project.challenge)}</p></section><section><h3>${escapeHtml(ui.caseApproach)}</h3><p>${escapeHtml(project.approach)}</p></section><section><h3>${escapeHtml(ui.caseOutcome)}</h3><p>${escapeHtml(project.outcome)}</p></section></div><div class="tag-row">${project.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join("")}</div>`;
  dialog.showModal();
  dialog.querySelector("[data-close-dialog]").setAttribute("aria-label", ui.close);
}

function updateFilter() {
  if (!app) return;
  app.querySelectorAll(".project-card").forEach((card) => {
    card.hidden = activeFilter !== "all" && card.dataset.category !== activeFilter;
  });
}

function bindInteractions() {
  app.querySelectorAll("[data-language]").forEach((button) => button.addEventListener("click", () => loadPortfolio(button.dataset.language)));
  app.querySelectorAll("[data-filter]").forEach((button) => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    app.querySelectorAll("[data-filter]").forEach((filterButton) => {
      const selected = filterButton.dataset.filter === activeFilter;
      filterButton.classList.toggle("is-active", selected);
      filterButton.setAttribute("aria-pressed", String(selected));
    });
    updateFilter();
  }));
  app.querySelectorAll("[data-open-project]").forEach((button) => button.addEventListener("click", () => showProject(button.dataset.openProject)));

  const menuToggle = app.querySelector(".menu-toggle");
  menuToggle?.addEventListener("click", () => {
    const expanded = menuToggle.getAttribute("aria-expanded") === "true";
    menuToggle.setAttribute("aria-expanded", String(!expanded));
    app.querySelector(".main-nav")?.classList.toggle("is-open", !expanded);
  });
  app.querySelectorAll(".main-nav a").forEach((link) => link.addEventListener("click", () => {
    app.querySelector(".main-nav")?.classList.remove("is-open");
    menuToggle?.setAttribute("aria-expanded", "false");
  }));
}

async function loadPortfolio(locale = activeLocale) {
  activeLocale = ["en", "fr", "es"].includes(locale) ? locale : "en";
  localStorage.setItem("diana-portfolio-locale", activeLocale);
  try {
    const response = await fetch(`/api/portfolio?lang=${activeLocale}`);
    if (!response.ok) throw new Error("Portfolio API request failed");
    renderPortfolio(await response.json());
  } catch {
    app.innerHTML = `<div class="error-state"><span>Something went wrong</span><p>Start the Node.js server from the project folder to view the portfolio.</p></div>`;
  }
}

dialog?.querySelector("[data-close-dialog]")?.addEventListener("click", () => dialog.close());
dialog?.addEventListener("click", (event) => {
  if (event.target === dialog) dialog.close();
});

loadPortfolio();
