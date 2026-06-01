const checklistItems = [
  {
    id: "electrical",
    title: "Sähkösyöttö ja suojaukset tarkastettu",
    description: "Pääsyöttö, sulakkeet, turvakytkin ja maadoitus mitattu dokumentoidusti.",
    critical: true,
    done: true,
  },
  {
    id: "drawings",
    title: "Sähkökuvat päivitetty kohdekohtaisiksi",
    description: "Kaaviot vastaavat toteutusta ja ovat huollon käytettävissä.",
    critical: true,
    done: true,
  },
  {
    id: "software",
    title: "Pesuohjelmisto asennettu ja testattu",
    description: "Perusohjelmat, maksutavat ja etäyhteys validoitu testitapahtumilla.",
    critical: true,
    done: true,
  },
  {
    id: "safety",
    title: "Hätäseis- ja turvapiirit testattu",
    description: "Kaikki turvatoiminnot testattu kuormitetusti ja kirjattu pöytäkirjaan.",
    critical: true,
    done: false,
  },
  {
    id: "dosing",
    title: "Kemikaaliannostelu mitattu ja säädetty",
    description: "Annostelupisteet, mittaustulokset ja lopulliset arvot tallennettu.",
    critical: true,
    done: false,
  },
  {
    id: "handover",
    title: "Käyttökoulutus pidetty asiakkaalle",
    description: "Päivittäiset toimet, hälytykset ja huollon yhteyspolku käyty läpi.",
    critical: false,
    done: true,
  },
  {
    id: "photos",
    title: "Valokuvat ja luovutusdokumentit arkistoitu",
    description: "Kohdekuvat, tyyppikilvet ja lopulliset dokumentit ladattu talteen.",
    critical: false,
    done: false,
  },
];

const scenarios = [
  {
    id: "payment",
    title: "Maksupääte offline",
    subtitle: "Yleinen yhteys- tai päätelaiteongelma",
    intro:
      "Huolto käy läpi verkko-, päätelaite- ja ohjelmistotarkastukset ennen kuin asia nostetaan eteenpäin.",
    steps: [
      "Tarkista modeemin ja kytkimen virrat sekä linkkivalot.",
      "Vahvista päätelaitteen IP-osoite ja yhteystesti huoltosivulta.",
      "Aja yksi testimaksu ja tallenna virhekoodi lokiin.",
    ],
    escalation:
      "päätelaite on online, loki on kerätty ja maksutapahtuma epäonnistuu silti kahdessa peräkkäisessä testissä.",
    result:
      "Huolto pystyy palauttamaan yhteyden useimmissa tapauksissa ilman lisäeskalointia.",
    outcome: "Ratkeaa huollossa",
    time: "Arvioitu käsittely: 12 min",
    supportRatio: "3/4",
  },
  {
    id: "program",
    title: "Pesuohjelma ei käynnisty",
    subtitle: "PLC-, turvapiiri- tai kuittauspoikkeama",
    intro:
      "Tässä polussa huolto sulkee pois turvapiirin, käyttöliittymän ja ohjelmavalinnan virheet ennen asiantuntijatukea.",
    steps: [
      "Tarkista hätäseis, rajakytkimet ja turvapiirin palautuminen.",
      "Varmista käyttöliittymästä ohjelman tila ja viimeisin hälytys.",
      "Käynnistä huoltotesti ja kirjaa PLC:n I/O-tila kuvakaappauksena.",
    ],
    escalation:
      "turvapiiri on ehjä ja I/O-data osoittaa PLC-logiikan poikkeaman tai ohjelmamuutostarpeen.",
    result:
      "Huolto ratkaisee mekaaniset ja kuittaukseen liittyvät syyt, mutta logiikkapoikkeamat nousevat asiantuntijalle.",
    outcome: "Eskaloi asiantuntijalle",
    time: "Arvioitu käsittely: 18 min",
    supportRatio: "2/4",
  },
  {
    id: "chem",
    title: "Kemikaaliannostelu poikkeaa",
    subtitle: "Mittausta ja säätöä vaativa laatuongelma",
    intro:
      "Huolto saa mitatun etenemispolun, jotta annostelun säätö tehdään samalla tavalla kaikissa kohteissa.",
    steps: [
      "Tarkista letkut, suodattimet ja mahdolliset ilmavuodot.",
      "Mittaa annostelumäärä 30 sekunnin testijaksolla.",
      "Vertaa tulosta kohdekohtaiseen tavoitearvoon ja säädä pumppua.",
    ],
    escalation:
      "mittaustulos poikkeaa edelleen tavoitearvosta säädön jälkeen tai kemikaalikanava ei reagoi asetuksiin.",
    result:
      "Useimmat poikkeamat ratkeavat paikallisella mittauksella ja säädöllä ilman soittoa eteenpäin.",
    outcome: "Ratkeaa huollossa",
    time: "Arvioitu käsittely: 15 min",
    supportRatio: "3/4",
  },
  {
    id: "remote",
    title: "Etäyhteys puuttuu käyttöönotossa",
    subtitle: "Kriittinen ennen luovutusta",
    intro:
      "Etäyhteys varmistetaan ennen luovutusta, jotta myöhemmät tukitilanteet voidaan hoitaa tehokkaasti.",
    steps: [
      "Tarkista reitittimen WAN-yhteys ja SIM-kortin tila.",
      "Varmista VPN- tai etäpalvelun tunnukset ja laite-ID.",
      "Aja testikirjautuminen dokumentointinäkymästä ja tallenna loki.",
    ],
    escalation:
      "WAN-yhteys on kunnossa, tunnukset oikein ja etäpalvelu silti hylkää yhteyden tai laite ei rekisteröidy.",
    result:
      "Kun perustarkastukset ovat tehty, asiantuntija saa valmiin aineiston eikä aikaa kulu peruskyselyyn.",
    outcome: "Eskaloi asiantuntijalle",
    time: "Arvioitu käsittely: 14 min",
    supportRatio: "2/4",
  },
];

const documents = [
  {
    title: "Käyttöönoton päächecklist",
    category: "Käyttöönotto",
    audience: "Asennus / Tuoteasiantuntija",
    detail: "Vaiheet sähköistyksestä luovutukseen. Sisältää pakolliset mittaukset ja hyväksynnät.",
    tags: ["käyttöönotto", "checklist", "luovutus"],
  },
  {
    title: "Kemikaaliannostelun mittausohje",
    category: "Huolto",
    audience: "Huolto",
    detail: "Vakioitu mittaus- ja säätöpolku, jolla poikkeamat saadaan ratkaistua ilman arvaamista.",
    tags: ["annostelu", "kemikaali", "mittaus"],
  },
  {
    title: "PLC-hälytykset ja ensitoimet",
    category: "Vianhaku",
    audience: "Huolto / Tuoteasiantuntija",
    detail: "Yleisimpien hälytysten tulkinta, tarvittavat tarkastukset ja eskalointiraja.",
    tags: ["plc", "hälytys", "vianhaku"],
  },
  {
    title: "Etäyhteyden käyttöönotto-ohje",
    category: "Käyttöönotto",
    audience: "Asennus / Huolto",
    detail: "Yhteydet, tunnukset, lokit ja testaus ennen kohteen luovutusta.",
    tags: ["vpn", "reititin", "etäyhteys"],
  },
  {
    title: "Päämiehen tekniset tiedotteet",
    category: "Päämies",
    audience: "Tuoteasiantuntija",
    detail: "Versionumerot, ohjelmistopäivitykset ja muutokset, jotka vaikuttavat kenttäkohteisiin.",
    tags: ["päämies", "päivitys", "ohjelmisto"],
  },
  {
    title: "Huollon eskalointipaketti",
    category: "Vianhaku",
    audience: "Huolto",
    detail: "Mitä tietoa kerätään ennen soittoa: lokit, kuvat, mittaukset ja testitulos.",
    tags: ["escalation", "lokit", "kuvat"],
  },
];

const checklistRoot = document.querySelector("#checklist");
const checklistCounter = document.querySelector("#checklistCounter");
const launchState = document.querySelector("#launchState");
const progressValue = document.querySelector("#progressValue");
const readinessPoints = document.querySelector("#readinessPoints");
const handoverText = document.querySelector("#handoverText");
const heroProgress = document.querySelector("#heroProgress");
const heroCritical = document.querySelector("#heroCritical");
const heroSupport = document.querySelector("#heroSupport");

const scenarioList = document.querySelector("#scenarioList");
const scenarioTitle = document.querySelector("#scenarioTitle");
const scenarioIntro = document.querySelector("#scenarioIntro");
const scenarioSteps = document.querySelector("#scenarioSteps");
const scenarioEscalation = document.querySelector("#scenarioEscalation");
const scenarioResult = document.querySelector("#scenarioResult");
const scenarioOutcome = document.querySelector("#scenarioOutcome");
const scenarioTime = document.querySelector("#scenarioTime");

const docSearch = document.querySelector("#docSearch");
const docFilters = document.querySelector("#docFilters");
const docList = document.querySelector("#docList");

let activeScenarioId = scenarios[0].id;
let activeCategory = "Kaikki";

function getChecklistStats() {
  const total = checklistItems.length;
  const done = checklistItems.filter((item) => item.done).length;
  const criticalOpen = checklistItems.filter((item) => item.critical && !item.done).length;
  const percent = Math.round((done / total) * 100);

  return { total, done, criticalOpen, percent };
}

function renderChecklist() {
  checklistRoot.innerHTML = "";

  checklistItems.forEach((item) => {
    const card = document.createElement("label");
    card.className = `task-card${item.critical ? " is-critical" : ""}`;

    const tagClass = item.done ? "tag-ok" : item.critical ? "tag-critical" : "tag-standard";
    const tagText = item.done ? "Valmis" : item.critical ? "Kriittinen" : "Avoin";

    card.innerHTML = `
      <input type="checkbox" ${item.done ? "checked" : ""} data-task-id="${item.id}" />
      <div class="task-copy">
        <strong>${item.title}</strong>
        <p>${item.description}</p>
      </div>
      <span class="panel-badge task-tag ${tagClass}">${tagText}</span>
    `;

    checklistRoot.appendChild(card);
  });
}

function updateChecklistSummary() {
  const { total, done, criticalOpen, percent } = getChecklistStats();
  checklistCounter.textContent = `${done} / ${total} valmiina`;
  progressValue.textContent = `${percent}%`;
  heroProgress.textContent = `${percent}%`;
  heroCritical.textContent = `${criticalOpen}`;
  document.documentElement.style.setProperty("--progress-angle", `${percent * 3.6}deg`);

  const openCriticalTitles = checklistItems
    .filter((item) => item.critical && !item.done)
    .map((item) => item.title);

  if (criticalOpen === 0) {
    launchState.textContent = "Valmis luovutukseen";
    launchState.className = "panel-badge panel-badge-accent";
    readinessPoints.innerHTML = `
      <li>Kaikki kriittiset sähkö- ja turvallisuustarkastukset valmiina</li>
      <li>Kemikaaliannostelu dokumentoitu tavoitearvoihin</li>
      <li>Huolto ja asiakas voivat tukeutua samaan dokumenttipakettiin</li>
    `;
    handoverText.textContent =
      "Kohde on valmis luovutettavaksi. Kaikki kriittiset mittaukset on tehty, turvallisuustestit kirjattu ja huoltoa varten tarvittavat dokumentit tallennettu.";
  } else if (criticalOpen === 1) {
    launchState.textContent = "Melkein valmis";
    launchState.className = "panel-badge panel-badge-accent";
    readinessPoints.innerHTML = `
      <li>Yksi kriittinen vaihe kesken: ${openCriticalTitles[0]}</li>
      <li>Luovutus voidaan aikatauluttaa heti kun viimeinen mittaus on hyväksytty</li>
      <li>Dokumenttipaketti on muuten valmis huollon käyttöön</li>
    `;
    handoverText.textContent =
      "Kohde on lähes valmis. Yksi kriittinen tarkastus odottaa hyväksyntää, minkä jälkeen luovutus voidaan tehdä ilman erillistä lisäkierrosta.";
  } else {
    launchState.textContent = "Osittain valmis";
    launchState.className = "panel-badge panel-badge-neutral";
    readinessPoints.innerHTML = openCriticalTitles
      .slice(0, 3)
      .map((title) => `<li>Avoin kriittinen vaihe: ${title}</li>`)
      .join("");
    handoverText.textContent =
      "Kohteen käyttöönotto etenee suunnitellusti. Ennen luovutusta tulee vielä sulkea avoimet kriittiset vaiheet ja kirjata mittaustulokset dokumentaatioon.";
  }
}

function renderScenarios() {
  scenarioList.innerHTML = "";

  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `scenario-button${scenario.id === activeScenarioId ? " is-active" : ""}`;
    button.dataset.scenarioId = scenario.id;
    button.innerHTML = `
      <strong>${scenario.title}</strong>
      <span>${scenario.subtitle}</span>
    `;
    scenarioList.appendChild(button);
  });
}

function updateScenarioDetail() {
  const scenario = scenarios.find((item) => item.id === activeScenarioId);
  if (!scenario) return;

  scenarioTitle.textContent = scenario.title;
  scenarioIntro.textContent = scenario.intro;
  scenarioSteps.innerHTML = scenario.steps.map((step) => `<li>${step}</li>`).join("");
  scenarioEscalation.textContent = scenario.escalation;
  scenarioResult.textContent = scenario.result;
  scenarioOutcome.textContent = scenario.outcome;
  scenarioTime.textContent = scenario.time;
  heroSupport.textContent = scenario.supportRatio;

  scenarioOutcome.className =
    scenario.outcome === "Ratkeaa huollossa"
      ? "panel-badge panel-badge-accent"
      : "panel-badge panel-badge-neutral";
}

function getCategories() {
  return ["Kaikki", ...new Set(documents.map((doc) => doc.category))];
}

function renderDocFilters() {
  docFilters.innerHTML = "";

  getCategories().forEach((category) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `doc-filter${category === activeCategory ? " is-active" : ""}`;
    button.textContent = category;
    button.dataset.category = category;
    docFilters.appendChild(button);
  });
}

function renderDocuments() {
  const searchTerm = docSearch.value.trim().toLowerCase();
  const filtered = documents.filter((doc) => {
    const categoryMatch = activeCategory === "Kaikki" || doc.category === activeCategory;
    const searchMatch =
      !searchTerm ||
      [doc.title, doc.category, doc.audience, doc.detail, ...doc.tags]
        .join(" ")
        .toLowerCase()
        .includes(searchTerm);
    return categoryMatch && searchMatch;
  });

  docList.innerHTML = "";

  if (filtered.length === 0) {
    docList.innerHTML = `
      <div class="empty-state">
        Hakuehdoilla ei löytynyt dokumentteja. Tämäkin on hyödyllinen havainto:
        puuttuva ohje pitää lisätä, jotta tieto ei jää ihmisten muistin varaan.
      </div>
    `;
    return;
  }

  filtered.forEach((doc) => {
    const card = document.createElement("article");
    card.className = "doc-card";
    card.innerHTML = `
      <strong>${doc.title}</strong>
      <span>${doc.detail}</span>
      <div class="doc-meta">
        <span>${doc.category}</span>
        <span>${doc.audience}</span>
        ${doc.tags.map((tag) => `<span>#${tag}</span>`).join("")}
      </div>
    `;
    docList.appendChild(card);
  });
}

renderChecklist();
updateChecklistSummary();
renderScenarios();
updateScenarioDetail();
renderDocFilters();
renderDocuments();

checklistRoot.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;

  const item = checklistItems.find((entry) => entry.id === target.dataset.taskId);
  if (!item) return;

  item.done = target.checked;
  renderChecklist();
  updateChecklistSummary();
});

scenarioList.addEventListener("click", (event) => {
  const target = event.target;
  const button = target instanceof HTMLElement ? target.closest("[data-scenario-id]") : null;
  if (!(button instanceof HTMLButtonElement)) return;

  activeScenarioId = button.dataset.scenarioId;
  renderScenarios();
  updateScenarioDetail();
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
