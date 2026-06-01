const checklistItems = [
  {
    id: "site",
    title: "Kohdetiedot, laitemalli ja sarjanumero kirjattu",
    description: "Perustiedot talteen samaan runkoon myöhempää huoltoa ja muutoksia varten.",
    critical: true,
    done: true,
  },
  {
    id: "software",
    title: "Ohjelmistoversio ja parametrimuutokset dokumentoitu",
    description: "Asennettu versio, tehdyt muutokset ja käyttöönoton poikkeamat näkyvät jälkikäteen.",
    critical: true,
    done: true,
  },
  {
    id: "electrical",
    title: "Sähkömittaukset ja suojaukset tallennettu",
    description: "Syöttö, suojaukset, maadoitus ja turvapiirit mitattu sekä kirjattu.",
    critical: true,
    done: true,
  },
  {
    id: "channels",
    title: "Kemikaalikanavat nimetty ja annostelupumput ilmattu",
    description: "Esipesu, shampoo, vaha ja vannepesu tunnistettu ja ilma poistettu linjoista.",
    critical: true,
    done: true,
  },
  {
    id: "chemistry",
    title: "Pesukemian annostelu mitattu ja säädetty",
    description: "Jokaisesta kanavasta on tavoitearvo, mitattu arvo ja dokumentoitu lopputulos.",
    critical: true,
    done: false,
  },
  {
    id: "washresult",
    title: "Testipesu hyväksytty ja havainto kirjattu",
    description: "Pesutulos arvioitu, poikkeamat kirjattu ja tarvittaessa tehty lisäsäätö.",
    critical: true,
    done: false,
  },
  {
    id: "photos",
    title: "Valokuvat, tyyppikilvet ja kohdekuvat tallennettu",
    description: "Valokuvat tukevat myöhempää huoltoa ja varaosien tunnistamista.",
    critical: false,
    done: false,
  },
  {
    id: "handover",
    title: "Asiakkaan luovutus ja käyttöopastus tehty",
    description: "Päivittäiset toimet, hälytykset ja huoltokäytännöt käyty läpi.",
    critical: false,
    done: true,
  },
  {
    id: "remote",
    title: "Etäyhteys ja tietopankkilinkit testattu",
    description: "Huolto pääsee oikeaan aineistoon ilman erillistä tiedonmetsästystä.",
    critical: true,
    done: true,
  },
];

const documentationFields = [
  { label: "Kohde", value: "SmartCare Mock 01 / ABC Pesula", warning: false },
  { label: "Laitemalli", value: "SmartCare mock / sarjanumero SC-240601", warning: false },
  { label: "Ohjelmistoversio", value: "Wash control 4.8.2", warning: false },
  { label: "Sähkömittaukset", value: "OK, tallennettu pöytäkirjaan", warning: false },
  { label: "Parametrimuutokset", value: "Kuivaus +8 %, vahaohjelma päivitetty", warning: false },
  { label: "Pesukemian mittaus", value: "Vahakanava poikkeaa tavoitearvosta", warning: true },
  { label: "Valokuvat", value: "Kohdekuvat puuttuvat vielä", warning: true },
  { label: "Luovutustila", value: "Täydennettävä ennen luovutusta", warning: true },
];

const chemistryChannels = [
  {
    name: "Esipesu",
    product: "Prewash Active",
    target: "24 ml/min",
    measured: "23 ml/min",
    status: "OK",
    note: "Pieni poikkeama, ei vaadi säätöä.",
  },
  {
    name: "Shampoo",
    product: "Foam Clean",
    target: "32 ml/min",
    measured: "31 ml/min",
    status: "OK",
    note: "Pesuvaahdon määrä vastaa tavoitetta.",
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
    title: "Pesutulos heikko vahauksen jälkeen",
    subtitle: "Kuivauspisaroita ja heikko kiilto testipesussa",
    intro:
      "Kuivauspisarat jäävät pintaan ja kiilto on heikko. Ennen komponenttien vaihtoa tarkistetaan vaha-kanavan todellinen tuotto.",
    steps: [
      "Mittaa vaha-kanavan todellinen tuotto 30 sekunnin testijaksolla.",
      "Ilmaa letku ja tarkista mahdollinen ilmavuoto tai tukos.",
      "Säädä annosteluasetus tavoitearvoon ja aja uusi testipesu.",
      "Kirjaa uusi arvo ja havainto tietopankkiin luovutuksen liitteeksi.",
    ],
    escalation:
      "kanava on ilmattu, annostelu säädetty tavoitearvoon ja testipesun jälkeen pesutulos on edelleen heikko.",
    result:
      "Useimmat tapaukset ratkeavat mittaamalla todellinen tuotto, säätämällä arvo kohdalleen ja kirjaamalla uusi asetus dokumentaatioon.",
    outcome: "Säädä ja dokumentoi",
    time: "Arvioitu käsittely: 15 min",
    supportRatio: "3/4",
    learningTitle: "Heikko kuivaus / kiilto",
    learningText:
      "Mittaa vaha-kanavan todellinen tuotto ennen komponenttien vaihtoa. Tarkista myös ilma letkussa, säädä annostelu ja kirjaa uusi arvo dokumentaatioon.",
  },
  {
    id: "prewash",
    title: "Esipesu ei irrota likaa riittävästi",
    subtitle: "Pesutulos jää harmaaksi jo esipesuvaiheessa",
    intro:
      "Pesutulos viittaa usein annosteluun, suuttimen kuntoon tai väärään ohjelma-arvoon, ei välttämättä sähkövikaan.",
    steps: [
      "Varmista esipesuaineen kanava, letkut ja suuttimen puhtaus.",
      "Mittaa esipesun todellinen tuotto ja vertaa tavoitearvoon.",
      "Tarkista ohjelmasta oikea esipesuaika ja annostelupiste.",
      "Kirjaa lopullinen arvo ja tee vertailutestipesu.",
    ],
    escalation:
      "suutin, letkut ja annostelu ovat kunnossa mutta pesutulos jää silti poikkeavaksi useassa testipesussa.",
    result:
      "Yleisin juurisyy löytyy annostelusta tai ohjelma-ajasta, jolloin tapaus ratkeaa huollossa ilman lisäeskalointia.",
    outcome: "Ratkeaa huollossa",
    time: "Arvioitu käsittely: 14 min",
    supportRatio: "4/4",
    learningTitle: "Esipesu jää tehottomaksi",
    learningText:
      "Tarkista esipesusuutin ja mittaa tuotto ennen kuin epäilet kemikaalia tai ohjelmistovirhettä. Vertailupesun havainto kannattaa kirjata samaan käyttöönottorunkoon.",
  },
  {
    id: "foam",
    title: "Shampoon vaahto jää ohueksi",
    subtitle: "Asiakas kokee pesun näyttävän vajaalta",
    intro:
      "Vaahto-ongelma voi olla annostelun lisäksi näyttölaatuun vaikuttava asiakaskokemusasia, joten dokumentointi on tärkeää myös myynnille.",
    steps: [
      "Tarkista shampoo-kanavan tuotto ja ilmansekoitus.",
      "Varmista ettei kemikaalisäiliö ole lähes tyhjä tai syöttöletku vuoda.",
      "Aja visuaalinen testipesu ja vertaile vaahtokerrosta tavoitetasoon.",
      "Kirjaa muutos, jotta myöhemmin nähdään millä arvolla hyväksytty tulos saavutettiin.",
    ],
    escalation:
      "tuotto on oikea mutta vaahtokuva jää silti poikkeavaksi ja vaikuttaa pesutulokseen tai asiakaskokemukseen.",
    result:
      "Dokumentoitu vertailutulos auttaa erottamaan oikean laatuongelman normaalista vaihtelusta.",
    outcome: "Ratkeaa huollossa",
    time: "Arvioitu käsittely: 12 min",
    supportRatio: "4/4",
    learningTitle: "Vaahto näyttää heikolta",
    learningText:
      "Kirjaa myös visuaalinen havainto, ei vain ml/min-arvo. Näin seuraava huoltaja näkee, millä säädöllä hyväksytty vaahtotaso saavutettiin.",
  },
];

const documents = [
  {
    title: "Käyttöönoton dokumentointipohja",
    category: "Käyttöönotto",
    audience: "Tuoteasiantuntija / Asennus",
    detail: "Kohdetiedot, sarjanumerot, ohjelmistoversiot, mittaukset, parametrit, kuvat ja luovutushuomiot.",
    tags: ["käyttöönotto", "dokumentaatio", "luovutus"],
  },
  {
    title: "Pesukemian mittaus- ja säätöohje",
    category: "Kemia",
    audience: "Huolto",
    detail: "Tavoitearvot, mittausjakso, ilmauksen tarkastus ja dokumentoitavat havainnot kaikille kanaville.",
    tags: ["kemia", "annostelu", "mittaus"],
  },
  {
    title: "Vaha-kanavan poikkeama: mikro-ohje huollolle",
    category: "Mikro-ohje",
    audience: "Huolto",
    detail: "Mittaa todellinen tuotto ennen komponenttien vaihtoa. Ilmaa, säädä, testaa ja kirjaa uusi arvo.",
    tags: ["vaha", "kiilto", "kuivaus"],
  },
  {
    title: "Päämiehen kemikaalikanavien asetustaulukko",
    category: "Päämies",
    audience: "Tuoteasiantuntija",
    detail: "Valmistajan ohjearvot kemikaalikanaville, ohjelma-asetuksille ja testipesulle.",
    tags: ["päämies", "asetus", "washtec"],
  },
  {
    title: "Kohdekuvat ja tyyppikilvet",
    category: "Dokumentit",
    audience: "Huolto / Varaosat",
    detail: "Valokuvat helpottavat myöhempää huoltoa, varaosien tunnistusta ja muutosten jäljitystä.",
    tags: ["kuvat", "tyyppikilpi", "kohde"],
  },
  {
    title: "Luovutusmuistio asiakkaalle",
    category: "Dokumentit",
    audience: "Asiakas / Huolto",
    detail: "Yhteenveto siitä, millä asetuksilla kohde luovutettiin ja mitä jäi seurattavaksi ensimmäisten viikkojen aikana.",
    tags: ["asiakas", "luovutus", "muistio"],
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
const docFields = document.querySelector("#docFields");
const chemList = document.querySelector("#chemList");
const scenarioNav = document.querySelector("#scenarioNav");

const scenarioTitle = document.querySelector("#scenarioTitle");
const scenarioIntro = document.querySelector("#scenarioIntro");
const scenarioSteps = document.querySelector("#scenarioSteps");
const scenarioEscalation = document.querySelector("#scenarioEscalation");
const scenarioResult = document.querySelector("#scenarioResult");
const scenarioOutcome = document.querySelector("#scenarioOutcome");
const scenarioTime = document.querySelector("#scenarioTime");
const learningTitle = document.querySelector("#learningTitle");
const learningText = document.querySelector("#learningText");

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
    const tagText = item.done ? "Valmis" : item.critical ? "Täydennä" : "Avoin";

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

function renderDocumentationFields() {
  docFields.innerHTML = "";

  documentationFields.forEach((field) => {
    const card = document.createElement("article");
    card.className = `field-card${field.warning ? " is-warning" : ""}`;
    card.innerHTML = `
      <span>${field.label}</span>
      <strong>${field.value}</strong>
    `;
    docFields.appendChild(card);
  });
}

function renderChemistryChannels() {
  chemList.innerHTML = "";

  chemistryChannels.forEach((channel) => {
    const card = document.createElement("article");
    card.className = `chem-card${channel.status === "Säädä" ? " is-warning" : ""}`;
    card.innerHTML = `
      <div class="chem-card-head">
        <div>
          <strong>${channel.name}</strong>
          <span>${channel.product}</span>
        </div>
        <span class="chem-badge ${channel.status === "Säädä" ? "chem-badge-warning" : "chem-badge-ok"}">${channel.status}</span>
      </div>
      <div class="chem-metrics">
        <div>
          <span>Tavoite</span>
          <strong>${channel.target}</strong>
        </div>
        <div>
          <span>Mitattu</span>
          <strong>${channel.measured}</strong>
        </div>
      </div>
      <p>${channel.note}</p>
    `;
    chemList.appendChild(card);
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
      <li>Kaikki kriittiset käyttöönottovaiheet on mitattu ja dokumentoitu</li>
      <li>Kemikaalikanavat vastaavat tavoitearvoja ja testipesu on hyväksytty</li>
      <li>Huolto voi käyttää samaa tietopankkia ilman lisäselvityksiä</li>
    `;
    handoverText.textContent =
      "Kohde on valmis luovutettavaksi. Mittaukset, ohjelmistoversio, kemiasäädöt, kuvat ja luovutushuomiot on kirjattu samaan dokumenttipakettiin.";
  } else if (criticalOpen === 1) {
    launchState.textContent = "Melkein valmis";
    launchState.className = "panel-badge panel-badge-accent";
    readinessPoints.innerHTML = `
      <li>Yksi kriittinen kohta vielä auki: ${openCriticalTitles[0]}</li>
      <li>Luovutus voidaan tehdä heti, kun viimeinen mittaus on vahvistettu</li>
      <li>Huollon kannalta olennaiset tiedot ovat muuten valmiina</li>
    `;
    handoverText.textContent =
      "Kohde on lähes valmis luovutukseen. Viimeinen avoin kriittinen kohta kannattaa sulkea heti, jotta lopullinen tila jää oikein talteen.";
  } else {
    launchState.textContent = "Täydennettävä ennen luovutusta";
    launchState.className = "panel-badge panel-badge-neutral";
    readinessPoints.innerHTML = openCriticalTitles
      .slice(0, 3)
      .map((title) => `<li>Avoin kriittinen kohta: ${title}</li>`)
      .join("");
    handoverText.textContent =
      "Kohde on vielä täydennettävä ennen luovutusta. Erityisesti pesukemian mittaus, testipesun hyväksyntä ja lopullinen dokumentointi on varmistettava.";
  }
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
  learningTitle.textContent = scenario.learningTitle;
  learningText.textContent = scenario.learningText;

  scenarioOutcome.className =
    scenario.outcome === "Ratkeaa huollossa"
      ? "panel-badge panel-badge-accent"
      : "panel-badge panel-badge-neutral";
}

function renderScenarioNav() {
  scenarioNav.innerHTML = "";

  scenarios.forEach((scenario) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `micro-nav-button${scenario.id === activeScenarioId ? " is-active" : ""}`;
    button.dataset.scenarioId = scenario.id;
    button.textContent = scenario.title;
    scenarioNav.appendChild(button);
  });
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
        Hakuehdoilla ei löytynyt ohjetta. Tässä kohtaa hyvä toimintamalli on lisätä
        uusi mikro-ohje, jotta tieto ei jää vain yhden ihmisen muistiin.
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
renderDocumentationFields();
renderChemistryChannels();
updateChecklistSummary();
renderScenarioNav();
updateScenarioDetail();
renderDocFilters();
renderDocuments();

checklistRoot.addEventListener("change", (event) => {
  const target = event.target;
  if (!(target instanceof HTMLInputElement)) return;

  const item = checklistItems.find((entry) => entry.id === target.dataset.taskId);
  if (!item) return;

  item.done = target.checked;
  updateChecklistSummary();
  renderChecklist();
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

scenarioNav.addEventListener("click", (event) => {
  const target = event.target;
  const button = target instanceof HTMLElement ? target.closest("[data-scenario-id]") : null;
  if (!(button instanceof HTMLButtonElement)) return;

  activeScenarioId = button.dataset.scenarioId;
  renderScenarioNav();
  updateScenarioDetail();
});
