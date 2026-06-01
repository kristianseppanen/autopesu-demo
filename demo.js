const views = [
  {
    id: "overview",
    label: "Dokumentaatio",
    detail: "Kohdetiedot, mittaukset ja luovutuksen tila",
    title: "Käyttöönoton dokumentaatio",
  },
  {
    id: "commissioning",
    label: "Laatupassi",
    detail: "Checklist ennen luovutusta",
    title: "Käyttöönoton laatupassi",
  },
  {
    id: "chemistry",
    label: "Pesukemia",
    detail: "Annostelu, mittaus ja säätö",
    title: "Pesukemian mittaus ja säätö",
  },
  {
    id: "service",
    label: "Huolto",
    detail: "Avoin tapaus ja eskalointipaketti",
    title: "Huollon työtila",
  },
  {
    id: "knowledge",
    label: "Tietopankki",
    detail: "Huollon oppiva mikro-ohje",
    title: "Huollon oppiva tietopankki",
  },
];

const metrics = [
  { label: "Dokumentoitu", value: "67%" },
  { label: "Avoimet", value: "3" },
  { label: "Kemialinjat OK", value: "3/4" },
];

const documentationFields = [
  { label: "Kohde", value: "ABC Pesula / SmartCare Mock 01", warning: false },
  { label: "Laitemalli ja sarjanumero", value: "SmartCare / SC-240601", warning: false },
  { label: "Ohjelmistoversio", value: "Wash Control 4.8.2", warning: false },
  { label: "Sähkömittaukset", value: "Tallennettu pöytäkirjaan", warning: false },
  { label: "Parametrimuutokset", value: "Kuivaus +8 %, vahaohjelma päivitetty", warning: false },
  { label: "Pesukemian annostelu", value: "Vahakanava vaatii säädön", warning: true },
  { label: "Valokuvat", value: "Kohdekuvat puuttuvat vielä", warning: true },
  { label: "Luovutustila", value: "Täydennettävä ennen luovutusta", warning: true },
];

const checklistItems = [
  {
    id: "site",
    title: "Kohdetiedot ja sarjanumerot kirjattu",
    description: "Laitemalli, sarjanumero ja kohdetiedot talteen myöhempää huoltoa varten.",
    done: true,
    critical: true,
  },
  {
    id: "software",
    title: "Ohjelmistoversio ja parametrimuutokset dokumentoitu",
    description: "Asennettu versio sekä tehdyt säätömuutokset näkyvät jälkikäteen.",
    done: true,
    critical: true,
  },
  {
    id: "electrical",
    title: "Sähkömittaukset tallennettu",
    description: "Syöttö, suojaukset, maadoitus ja turvapiirit kirjattu.",
    done: true,
    critical: true,
  },
  {
    id: "channels",
    title: "Kemikaalikanavat nimetty ja ilmattu",
    description: "Esipesu, shampoo, vaha ja vannepesu varmistettu käyttöönotossa.",
    done: true,
    critical: true,
  },
  {
    id: "chemistry",
    title: "Annostelu mitattu ja säädetty",
    description: "Jokaisesta kanavasta on tavoitearvo, mitattu arvo ja kirjattu havainto.",
    done: false,
    critical: true,
  },
  {
    id: "wash",
    title: "Testipesu hyväksytty",
    description: "Pesutulos arvioitu ja poikkeamat kirjattu dokumentaatioon.",
    done: false,
    critical: true,
  },
  {
    id: "photos",
    title: "Kohdekuvat ja tyyppikilvet tallennettu",
    description: "Valokuvat helpottavat huoltoa ja varaosien tunnistusta.",
    done: false,
    critical: false,
  },
  {
    id: "handover",
    title: "Asiakkaan käyttöopastus tehty",
    description: "Päivittäiset toimet ja huoltokäytännöt käyty läpi.",
    done: true,
    critical: false,
  },
  {
    id: "remote",
    title: "Etäyhteys ja tietopankkilinkit testattu",
    description: "Huolto pääsee oikeaan aineistoon ilman erillistä tiedonhakua.",
    done: true,
    critical: true,
  },
];

const chemicalChannels = [
  {
    name: "Esipesu",
    product: "Prewash Active",
    target: "24 ml/min",
    measured: "23 ml/min",
    status: "OK",
    note: "Poikkeama pieni, ei vaadi säätöä.",
  },
  {
    name: "Shampoo",
    product: "Foam Clean",
    target: "32 ml/min",
    measured: "31 ml/min",
    status: "OK",
    note: "Vaahtotaso vastaa tavoitetta.",
  },
  {
    name: "Vaha",
    product: "Shine Shield",
    target: "18 ml/min",
    measured: "11 ml/min",
    status: "Säädä",
    note: "Todennäköinen syy heikkoon kuivaukseen ja kiiltoon.",
  },
  {
    name: "Vannepesu",
    product: "Wheel Clean Pro",
    target: "16 ml/min",
    measured: "16 ml/min",
    status: "OK",
    note: "Ei poikkeamaa mittauksessa.",
  },
];

const scenarios = [
  {
    id: "wax",
    title: "Heikko kuivaus / kiilto",
    intro:
      "Kuivauspisarat jäävät pintaan ja kiilto on heikko. Vaha-kanavan todellinen tuotto mitataan ennen komponenttien vaihtoa.",
    steps: [
      "Mittaa vaha-kanavan todellinen tuotto 30 sekunnin testijaksolla.",
      "Ilmaa letku ja tarkista mahdollinen ilmavuoto tai tukos.",
      "Säädä annostelu tavoitearvoon ja tee uusi testipesu.",
      "Kirjaa uusi arvo ja havainto käyttöönoton dokumentaatioon.",
    ],
    escalation:
      "kanava on ilmattu, annostelu säädetty ja testipesun jälkeen pesutulos on edelleen heikko.",
    result:
      "Useimmat tapaukset ratkeavat mittaamalla todellinen tuotto, säätämällä arvo kohdalleen ja dokumentoimalla lopputulos.",
    outcome: "Säädä",
    time: "Arvioitu käsittely: 15 min",
    learning:
      "Heikko kuivaus/kiilto: mittaa vaha-kanavan todellinen tuotto ennen komponenttien vaihtoa.",
  },
  {
    id: "prewash",
    title: "Esipesu jää tehottomaksi",
    intro:
      "Pesutulos jää harmaaksi jo esipesuvaiheessa. Tarkista annostelu ja ohjelma-aika ennen muuta vianhakua.",
    steps: [
      "Varmista esipesukanava, letkut ja suuttimen puhtaus.",
      "Mittaa todellinen tuotto ja vertaa tavoitearvoon.",
      "Tarkista oikea esipesuaika ohjelmasta.",
      "Kirjaa korjattu arvo ja tee vertailutestipesu.",
    ],
    escalation:
      "suutin, letkut ja annostelu ovat kunnossa mutta pesutulos jää silti poikkeavaksi useassa testissä.",
    result:
      "Yleisin juurisyy löytyy annostelusta tai ohjelma-ajasta, joten huolto pystyy ratkaisemaan asian useimmiten itse.",
    outcome: "OK",
    time: "Arvioitu käsittely: 14 min",
    learning:
      "Esipesu jää tehottomaksi: tarkista suutin ja mittaa tuotto ennen kuin epäilet sähkö- tai ohjelmistovikaa.",
  },
  {
    id: "foam",
    title: "Shampoon vaahto jää ohueksi",
    intro:
      "Pesu näyttää asiakkaan silmään vajaalta. Varmista annostelu, säiliötila ja visuaalinen testipesu.",
    steps: [
      "Tarkista shampoo-kanavan tuotto ja ilmansekoitus.",
      "Varmista ettei säiliö ole tyhjä tai letku vuoda.",
      "Tee visuaalinen testipesu ja vertaa vaahtotasoa tavoitetasoon.",
      "Kirjaa hyväksytty lopputulos dokumentaatioon.",
    ],
    escalation:
      "tuotto on oikea mutta vaahtokuva jää silti poikkeavaksi ja vaikuttaa pesutulokseen tai asiakaskokemukseen.",
    result:
      "Dokumentoitu visuaalinen havainto auttaa seuraavaa huoltajaa ymmärtämään millä säädöllä hyväksytty tulos saavutettiin.",
    outcome: "OK",
    time: "Arvioitu käsittely: 12 min",
    learning:
      "Ohut vaahto: kirjaa myös visuaalinen havainto, ei vain ml/min-arvo.",
  },
];

const documents = [
  {
    title: "Käyttöönoton dokumentointipohja",
    category: "Käyttöönotto",
    description: "Kohdetiedot, sarjanumerot, ohjelmistoversiot, mittaukset, parametrit, kuvat ja luovutushuomiot.",
  },
  {
    title: "Pesukemian mittaus- ja säätöohje",
    category: "Kemia",
    description: "Tavoitearvot, mittausjakso, ilmauksen tarkastus ja dokumentoitavat havainnot kaikille kanaville.",
  },
  {
    title: "Vaha-kanavan mikro-ohje",
    category: "Mikro-ohje",
    description: "Mittaa todellinen tuotto ennen komponenttien vaihtoa. Ilmaa, säädä, testaa ja kirjaa uusi arvo.",
  },
  {
    title: "Päämiehen asetustaulukko",
    category: "Päämies",
    description: "Kemikaalikanavien ohjearvot, ohjelma-asetukset ja hyväksytyn testipesun rajat.",
  },
  {
    title: "Luovutusmuistio asiakkaalle",
    category: "Dokumentit",
    description: "Yhteenveto siitä, millä asetuksilla kohde luovutettiin ja mitä jäi seurattavaksi.",
  },
];

const serviceCase = {
  title: "Heikko kuivaus vahauksen jälkeen",
  state: "Huolto käsittelee",
  observation:
    "Asiakas raportoi, että testipesun jälkeen pintaan jää vesipisaroita ja kiilto jää vajaaksi.",
  cause:
    "Vaha-kanavan mitattu tuotto jää alle tavoitearvon, jolloin kuivauksen lopputulos heikkenee.",
  escalation:
    "mittaus, ilmaus, säätö ja uusi testipesu on tehty eikä pesutulos silti korjaannu.",
  outcome:
    "Huollon tavoite on ratkaista tapaus paikan päällä ja siirtää asiantuntijalle vain valmis aineisto.",
  checklist: [
    "Tarkista kohteen viimeisin käyttöönoton mittaus ja annosteluarvo.",
    "Mittaa vaha-kanavan todellinen tuotto 30 sekunnin testijaksolla.",
    "Ilmaa kanava ja tarkista mahdollinen ilmavuoto tai tukos.",
    "Säädä annostelu tavoitearvoon ja tee uusi testipesu.",
    "Kirjaa uusi arvo, havainto ja lopputulos tietopankkiin.",
  ],
  evidence: [
    "Mitattu ml/min-arvo ennen säätöä",
    "Mitattu ml/min-arvo säädön jälkeen",
    "Valokuva tai havainto testipesun lopputuloksesta",
    "Mahdollinen loki tai huomio ilmauksesta / tukoksesta",
  ],
};

const navButtons = document.querySelector("#navButtons");
const topMetrics = document.querySelector("#topMetrics");
const viewTitle = document.querySelector("#viewTitle");
const viewPanels = document.querySelectorAll(".view");

const overviewFields = document.querySelector("#overviewFields");
const checklist = document.querySelector("#checklist");
const checklistCounter = document.querySelector("#checklistCounter");
const handoverBadge = document.querySelector("#handoverBadge");
const handoverText = document.querySelector("#handoverText");
const progressValue = document.querySelector("#progressValue");
const heroCritical = document.querySelector("#heroCritical");
const overviewProgress = document.querySelector("#overviewProgress");
const overviewOpen = document.querySelector("#overviewOpen");
const docStatusBadge = document.querySelector("#docStatusBadge");

const chemList = document.querySelector("#chemList");
const scenarioNav = document.querySelector("#scenarioNav");
const scenarioTitle = document.querySelector("#scenarioTitle");
const scenarioIntro = document.querySelector("#scenarioIntro");
const scenarioSteps = document.querySelector("#scenarioSteps");
const scenarioEscalation = document.querySelector("#scenarioEscalation");
const scenarioResult = document.querySelector("#scenarioResult");
const scenarioOutcome = document.querySelector("#scenarioOutcome");
const scenarioTime = document.querySelector("#scenarioTime");
const learningText = document.querySelector("#learningText");
const serviceTitle = document.querySelector("#serviceTitle");
const serviceState = document.querySelector("#serviceState");
const serviceObservation = document.querySelector("#serviceObservation");
const serviceCause = document.querySelector("#serviceCause");
const serviceChecklist = document.querySelector("#serviceChecklist");
const serviceEvidence = document.querySelector("#serviceEvidence");
const serviceEscalationText = document.querySelector("#serviceEscalationText");
const serviceOutcome = document.querySelector("#serviceOutcome");

const docSearch = document.querySelector("#docSearch");
const docFilters = document.querySelector("#docFilters");
const docList = document.querySelector("#docList");

let activeView = "overview";
let activeScenario = scenarios[0].id;
let activeCategory = "Kaikki";

function checklistStats() {
  const total = checklistItems.length;
  const done = checklistItems.filter((item) => item.done).length;
  const openCritical = checklistItems.filter((item) => item.critical && !item.done).length;
  return {
    total,
    done,
    percent: Math.round((done / total) * 100),
    openCritical,
  };
}

function renderNav() {
  navButtons.innerHTML = "";
  views.forEach((view) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `nav-button${view.id === activeView ? " is-active" : ""}`;
    button.dataset.view = view.id;
    button.innerHTML = `<strong>${view.label}</strong><span>${view.detail}</span>`;
    navButtons.appendChild(button);
  });
}

function renderTopMetrics() {
  topMetrics.innerHTML = "";
  metrics.forEach((metric) => {
    const tile = document.createElement("div");
    tile.className = "metric-tile";
    tile.innerHTML = `<span>${metric.label}</span><strong>${metric.value}</strong>`;
    topMetrics.appendChild(tile);
  });
}

function activateView() {
  const active = views.find((view) => view.id === activeView);
  if (active) {
    viewTitle.textContent = active.title;
  }

  viewPanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.view === activeView);
  });
}

function renderOverviewFields() {
  overviewFields.innerHTML = "";
  documentationFields.forEach((field) => {
    const item = document.createElement("article");
    item.className = `field-card${field.warning ? " warning" : ""}`;
    item.innerHTML = `<span>${field.label}</span><strong>${field.value}</strong>`;
    overviewFields.appendChild(item);
  });
}

function renderChecklist() {
  checklist.innerHTML = "";
  checklistItems.forEach((item) => {
    const card = document.createElement("label");
    card.className = "check-card";
    const statusClass = item.done ? "status-ok" : "status-warn";
    const statusText = item.done ? "Valmis" : item.critical ? "Kesken" : "Huomio";
    card.innerHTML = `
      <input type="checkbox" ${item.done ? "checked" : ""} data-task-id="${item.id}" />
      <div>
        <strong>${item.title}</strong>
        <p>${item.description}</p>
      </div>
      <span class="badge status-chip ${statusClass}">${statusText}</span>
    `;
    checklist.appendChild(card);
  });
}

function updateChecklistSummary() {
  const stats = checklistStats();
  checklistCounter.textContent = `${stats.done} / ${stats.total} valmiina`;
  progressValue.textContent = `${stats.percent}%`;
  heroCritical.textContent = `${stats.openCritical}`;
  overviewProgress.textContent = `${stats.percent}%`;
  overviewOpen.textContent = `${stats.total - stats.done}`;

  if (stats.openCritical === 0) {
    handoverBadge.textContent = "Valmis luovutukseen";
    docStatusBadge.textContent = "Valmis";
    handoverText.textContent =
      "Kaikki kriittiset mittaukset, kemiasäädöt, kuvat ja luovutushuomiot on tallennettu. Kohde voidaan luovuttaa.";
  } else {
    handoverBadge.textContent = "Täydennettävä ennen luovutusta";
    docStatusBadge.textContent = "Täydennettävä";
    handoverText.textContent =
      "Ennen luovutusta tulee vahvistaa pesukemian mittaustulos, tallentaa lopulliset annosteluarvot ja täydentää kohdekuvat tietopankkiin.";
  }
}

function renderChemistry() {
  chemList.innerHTML = "";
  chemicalChannels.forEach((channel) => {
    const card = document.createElement("article");
    card.className = `chem-card${channel.status === "Säädä" ? " warning" : ""}`;
    card.innerHTML = `
      <div class="chem-card-head">
        <div>
          <strong>${channel.name}</strong>
          <span>${channel.product}</span>
        </div>
        <span class="badge ${channel.status === "Säädä" ? "badge-accent" : "status-ok"}">${channel.status}</span>
      </div>
      <div class="chem-metrics">
        <div><span>Tavoite</span><strong>${channel.target}</strong></div>
        <div><span>Mitattu</span><strong>${channel.measured}</strong></div>
      </div>
      <p>${channel.note}</p>
    `;
    chemList.appendChild(card);
  });
}

function renderServiceCase() {
  serviceTitle.textContent = serviceCase.title;
  serviceState.textContent = serviceCase.state;
  serviceObservation.textContent = serviceCase.observation;
  serviceCause.textContent = serviceCase.cause;
  serviceEscalationText.textContent = serviceCase.escalation;
  serviceOutcome.textContent = serviceCase.outcome;

  serviceChecklist.innerHTML = "";
  serviceCase.checklist.forEach((item, index) => {
    const row = document.createElement("article");
    row.className = "service-check-row";
    row.innerHTML = `
      <span class="service-step-index">${index + 1}</span>
      <div>
        <strong>Huollon vaihe ${index + 1}</strong>
        <p>${item}</p>
      </div>
    `;
    serviceChecklist.appendChild(row);
  });

  serviceEvidence.innerHTML = "";
  serviceCase.evidence.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item;
    serviceEvidence.appendChild(li);
  });
}

function renderScenarioNav() {
  scenarioNav.innerHTML = "";
  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `scenario-button${scenario.id === activeScenario ? " is-active" : ""}`;
    button.dataset.scenario = scenario.id;
    button.textContent = scenario.title;
    scenarioNav.appendChild(button);
  });
}

function updateScenario() {
  const scenario = scenarios.find((item) => item.id === activeScenario);
  if (!scenario) return;

  scenarioTitle.textContent = scenario.title;
  scenarioIntro.textContent = scenario.intro;
  scenarioSteps.innerHTML = scenario.steps.map((step) => `<li>${step}</li>`).join("");
  scenarioEscalation.textContent = scenario.escalation;
  scenarioResult.textContent = scenario.result;
  scenarioOutcome.textContent = scenario.outcome;
  scenarioTime.textContent = scenario.time;
  learningText.textContent = scenario.learning;
}

function categories() {
  return ["Kaikki", ...new Set(documents.map((doc) => doc.category))];
}

function renderDocFilters() {
  docFilters.innerHTML = "";
  categories().forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `filter-button${category === activeCategory ? " is-active" : ""}`;
    button.dataset.category = category;
    button.textContent = category;
    docFilters.appendChild(button);
  });
}

function renderDocuments() {
  const term = docSearch.value.trim().toLowerCase();
  const filtered = documents.filter((doc) => {
    const categoryMatch = activeCategory === "Kaikki" || doc.category === activeCategory;
    const searchMatch =
      !term || `${doc.title} ${doc.category} ${doc.description}`.toLowerCase().includes(term);
    return categoryMatch && searchMatch;
  });

  docList.innerHTML = "";

  if (!filtered.length) {
    docList.innerHTML = `<div class="note-block">Hakuehdolla ei löytynyt ohjetta. Tässä kohdassa olisi hyvä lisätä uusi mikro-ohje tietopankkiin.</div>`;
    return;
  }

  filtered.forEach((doc) => {
    const card = document.createElement("article");
    card.className = "doc-card";
    card.innerHTML = `
      <strong>${doc.title}</strong>
      <p>${doc.description}</p>
      <span class="badge">${doc.category}</span>
    `;
    docList.appendChild(card);
  });
}

renderNav();
renderTopMetrics();
activateView();
renderOverviewFields();
renderChecklist();
updateChecklistSummary();
renderChemistry();
renderServiceCase();
renderScenarioNav();
updateScenario();
renderDocFilters();
renderDocuments();

navButtons.addEventListener("click", (event) => {
  const target = event.target;
  const button = target instanceof HTMLElement ? target.closest("[data-view]") : null;
  if (!(button instanceof HTMLButtonElement)) return;
  activeView = button.dataset.view;
  renderNav();
  activateView();
});

checklist.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;
  const item = checklistItems.find((entry) => entry.id === target.dataset.taskId);
  if (!item) return;
  item.done = target.checked;
  renderChecklist();
  updateChecklistSummary();
});

scenarioNav.addEventListener("click", (event) => {
  const target = event.target;
  const button = target instanceof HTMLElement ? target.closest("[data-scenario]") : null;
  if (!(button instanceof HTMLButtonElement)) return;
  activeScenario = button.dataset.scenario;
  renderScenarioNav();
  updateScenario();
});

docFilters.addEventListener("click", (event) => {
  const target = event.target;
  const button = target instanceof HTMLElement ? target.closest("[data-category]") : null;
  if (!(button instanceof HTMLButtonElement)) return;
  activeCategory = button.dataset.category;
  renderDocFilters();
  renderDocuments();
});

docSearch.addEventListener("input", () => {
  renderDocuments();
});
