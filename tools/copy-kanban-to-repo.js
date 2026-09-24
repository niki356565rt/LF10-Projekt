/**
 * Fuellt niki356565rt/projects/1 mit Karten aus dem bestehenden Kanban.
 * Muss als niki356565rt laufen. Legt Issues an, falls das Repo noch keine hat.
 */
const { execFileSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const gh = "C:\\Program Files\\GitHub CLI\\gh.exe";
const repo = "niki356565rt/LF10-Projekt";
const expectedLogin = "niki356565rt";
const targetNumber = "1";
const targetProjectId = "PVT_kwHOAxhV3c4BhoZ4";

function ghRun(args, opts = {}) {
  return execFileSync(gh, args, { encoding: "utf8", ...opts }).trim();
}
function ghJson(args) {
  const out = ghRun(args);
  return out ? JSON.parse(out) : null;
}
function graphql(query, variables) {
  const payload = JSON.stringify({ query, variables });
  const tmp = path.join(process.env.TEMP || ".", "gh-gql-copy-kanban.json");
  fs.writeFileSync(tmp, payload);
  return JSON.parse(ghRun(["api", "graphql", "--input", tmp]));
}

const login = ghRun(["api", "user", "--jq", ".login"]);
if (login !== expectedLogin) {
  console.error(`Angemeldet als ${login}. Bitte als ${expectedLogin} einloggen.`);
  process.exit(1);
}

const labels = [
  ["sprint-1", "1D4ED8", "Sprint 1 (Tag 1-3)"],
  ["sprint-2", "0F766E", "Sprint 2 (Tag 4-6)"],
  ["sprint-3", "B45309", "Sprint 3 (Tag 7-8)"],
  ["sprint-4", "6D28D9", "Sprint 4 (Tag 9-10)"],
  ["muss", "B91C1C", "Muss-Anforderung"],
  ["soll", "CA8A04", "Soll-Anforderung"],
  ["service", "2563EB", "Bereich Service"],
  ["kueche", "D97706", "Bereich Kueche"],
  ["admin", "4B5563", "Bereich Administration"],
  ["system", "0F766E", "System / Backend"],
  ["documentation", "0075CA", "Dokumentation"],
];
for (const [name, color, desc] of labels) {
  try {
    ghRun(["label", "create", name, "--repo", repo, "--color", color, "--description", desc, "--force"]);
    console.log("label", name);
  } catch (e) {
    console.error("label fail", name, String(e.stderr || e.message).slice(0, 120));
  }
}

const cards = [
  { title: "Anforderungskatalog finalisieren (Muss)", labels: ["sprint-1", "muss", "documentation"], status: "Done", sprint: "Sprint 1", prio: "Muss", close: true, body: "Als Team wollen wir die Muss-Anforderungen festziehen, damit der Scope in 2 Wochen haltbar bleibt.\n\n**Ergebnis:** docs/01-anforderungskatalog.md\n**Punkte:** 3 SP" },
  { title: "Prozess und UML-Aktivitaetsdiagramm Bestellprozess", labels: ["sprint-1", "muss", "documentation"], status: "Done", sprint: "Sprint 1", prio: "Muss", close: true, body: "Als Team wollen wir den Ablauf von Aufnahme bis Bezahlung modellieren, damit Service und Kueche denselben Prozess haben.\n\n**Ergebnis:** UML-Aktivitaetsdiagramm (HTML/PUML/PDF)\n**Punkte:** 5 SP" },
  { title: "Agiles Vorgehen: User Stories und Kanban-Board", labels: ["sprint-1", "muss", "documentation"], status: "Done", sprint: "Sprint 1", prio: "Muss", close: true, body: "Arbeitsblatt ausfuellen, Board anlegen, Stories schaetzen (Planning Poker).\n\n**Ergebnis:** GitHub-Kanban + ausgefuelltes Arbeitsblatt\n**Punkte:** 3 SP" },
  { title: "ER-Modell und Datenbank anlegen", labels: ["sprint-1", "muss", "system"], status: "ToDo", sprint: "Sprint 1", prio: "Muss", body: "Task: Tabellen fuer Tische, Mitarbeiter, Artikel, Bestellungen, Positionen, Statuslog.\n\n**Meilenstein M2**\n**Punkte:** 8 SP" },
  { title: "Architektur und Mockups der Kernmasken", labels: ["sprint-1", "muss", "documentation"], status: "In Progress", sprint: "Sprint 1", prio: "Muss", body: "Task: einfache Architektur fuer Service, Kueche, Admin. Grobe Mockups nur Kernmasken.\n\n**Punkte:** 5 SP" },
  { title: "US-S1: Tisch waehlen und Bestellung aufnehmen", labels: ["sprint-2", "muss", "service"], status: "ToDo", sprint: "Sprint 2", prio: "Muss", body: "Als Service moechte ich einen Tisch auswaehlen und eine Bestellung mit Artikeln/Mengen anlegen, damit die Kueche die Speisen bekommt.\n\n**Anforderungen:** S-01, S-02, S-03, S-04, A-05, A-06, A-07\n**Punkte:** 5 SP" },
  { title: "US-K1: Offene Speisen sehen und Status setzen", labels: ["sprint-2", "muss", "kueche"], status: "ToDo", sprint: "Sprint 2", prio: "Muss", body: "Als Kueche moechte ich offene Speisenbestellungen nach Eingangszeit sehen und auf „in Bearbeitung“ / „fertig“ setzen, damit der Service weiss, wann serviert werden kann.\n\n**Anforderungen:** K-01, K-03, K-04, K-05\n**Soll:** K-02 Sortierung (5 SP gesamt, Sortierung 2 SP extra falls Restzeit)\n**Punkte:** 5 SP" },
  { title: "T-SYS: Statuswechsel protokollieren", labels: ["sprint-2", "muss", "system"], status: "ToDo", sprint: "Sprint 2", prio: "Muss", body: "Task: Jeder Statuswechsel speichert Mitarbeiter, Zeitstempel und Bestellung.\n\n**Anforderung:** A-13\n**Punkte:** 3 SP" },
  { title: "US-S2: Servieren und Bezahlung abschliessen", labels: ["sprint-3", "muss", "service"], status: "ToDo", sprint: "Sprint 3", prio: "Muss", body: "Als Service moechte ich fertige Bestellungen auf „serviert“ und nach Zahlung auf „bezahlt“ setzen, damit der Tischabschluss klappt.\n\n**Anforderungen:** S-05, S-07\n**Punkte:** 3 SP" },
  { title: "S-06: Rechnung anzeigen (Soll)", labels: ["sprint-3", "soll", "service"], status: "Backlog", sprint: "Sprint 3", prio: "Soll", body: "Als Service moechte ich die Rechnung mit Positionen, Mengen, Preisen und Gesamtsumme sehen.\n\n**Punkte:** 3 SP" },
  { title: "S-08: Tisch auf frei setzen wenn alles bezahlt ist (Soll)", labels: ["sprint-3", "soll", "service"], status: "Backlog", sprint: "Sprint 3", prio: "Soll", body: "Als Service moechte ich den Tisch wieder frei sehen, wenn alle Bestellungen bezahlt sind.\n\n**Punkte:** 2 SP" },
  { title: "T-A1: Admin Stammdaten (Mitarbeiter, Artikel, Tische)", labels: ["sprint-3", "muss", "admin"], status: "ToDo", sprint: "Sprint 3", prio: "Muss", body: "Task: Mitarbeiter, Artikel und Tische anlegen, bearbeiten, loeschen.\n\n**Anforderungen:** AD-01 bis AD-08, A-11, A-12\n**Punkte:** 5 SP" },
  { title: "Getraenke ohne Bar: direkt servieren", labels: ["sprint-2", "muss", "service", "kueche"], status: "ToDo", sprint: "Sprint 2", prio: "Muss", body: "Reine Getraenkebestellungen nicht in der Kueche anzeigen. Service setzt nach Ausgabe auf „serviert“.\n\n**Anforderung:** K-05, A-09\n**Punkte:** 3 SP" },
  { title: "End-to-End-Test Kernablauf", labels: ["sprint-4", "muss"], status: "Backlog", sprint: "Sprint 4", prio: "Muss", body: "Aufnahme → Kueche → serviert → bezahlt pruefen. Muss-Kriterien abhaken.\n\n**Meilenstein M4/M5**\n**Punkte:** 5 SP" },
  { title: "Abschlussdokumentation und Abgabe", labels: ["sprint-4", "muss", "documentation"], status: "Backlog", sprint: "Sprint 4", prio: "Muss", body: "Kurze Entwickler-/Benutzerdoku, Screenshot, Quellcodeausschnitt, Ziele begruenden.\n\n**Punkte:** 5 SP" },
  { title: "AD-09/AD-10: Wochenumsatz und meistverkauftes Getraenk (Soll)", labels: ["sprint-4", "soll", "admin"], status: "Backlog", sprint: "Sprint 4", prio: "Soll", body: "Nur bei Restzeit. Sonst streichen.\n\n**Punkte:** 5 SP" },
  {
    draft: true,
    title: "UML-Sequenzdiagramme Bestellprozess",
    status: "Done",
    sprint: "Sprint 1",
    prio: "Muss",
    body: "Fertig: docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio und docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio. Speisen zur Kueche, Getraenke zur Bar, Mischbestellungen in par. Commit 244da95 auf main.",
  },
];

const fields2 = ghJson(["project", "field-list", targetNumber, "--owner", "@me", "--format", "json"]);
function optionMap(fieldName) {
  const f = fields2.fields.find((x) => x.name === fieldName);
  if (!f) throw new Error("Feld fehlt: " + fieldName);
  const map = { id: f.id, options: {} };
  for (const o of f.options || []) map.options[o.name] = o.id;
  return map;
}
const statusF = optionMap("Status");
const sprintF = optionMap("Sprint");
const prioF = optionMap("Priorität");

function setField(itemId, fieldId, optionId) {
  if (!fieldId || !optionId) return;
  ghRun([
    "project", "item-edit",
    "--id", itemId,
    "--project-id", targetProjectId,
    "--field-id", fieldId,
    "--single-select-option-id", optionId,
  ]);
}

function setMeta(itemId, card) {
  setField(itemId, statusF.id, statusF.options[card.status]);
  setField(itemId, sprintF.id, sprintF.options[card.sprint]);
  setField(itemId, prioF.id, prioF.options[card.prio]);
}

const existingIssues = ghJson(["issue", "list", "--repo", repo, "--state", "all", "--limit", "50", "--json", "title,url"]) || [];
const haveIssue = new Map(existingIssues.map((i) => [i.title, i.url]));

const existingItems = ghJson(["project", "item-list", targetNumber, "--owner", "@me", "--format", "json", "--limit", "100"]);
const haveItem = new Map(((existingItems && existingItems.items) || []).map((i) => [i.title, i.id]));

for (const card of cards) {
  let itemId = haveItem.get(card.title);
  if (itemId) {
    console.log("item exists", card.title);
    setMeta(itemId, card);
    continue;
  }

  if (card.draft) {
    const draft = graphql(
      `mutation($projectId:ID!,$title:String!,$body:String){
        addProjectV2DraftIssue(input:{projectId:$projectId,title:$title,body:$body}){
          projectItem { id }
        }
      }`,
      { projectId: targetProjectId, title: card.title, body: card.body || "" }
    );
    if (draft.errors) {
      console.error("draft fail", JSON.stringify(draft.errors));
      continue;
    }
    itemId = draft.data.addProjectV2DraftIssue.projectItem.id;
    console.log("draft", card.title, itemId);
    setMeta(itemId, card);
    continue;
  }

  let url = haveIssue.get(card.title);
  if (!url) {
    const args = ["issue", "create", "--repo", repo, "--title", card.title, "--body", card.body];
    for (const l of card.labels || []) args.push("--label", l);
    url = ghRun(args).split(/\s+/).pop();
    console.log("issue created", url);
  } else {
    console.log("issue exists", url);
  }

  const added = ghJson(["project", "item-add", targetNumber, "--owner", "@me", "--url", url, "--format", "json"]);
  itemId = added && added.id;
  console.log("added", card.title, itemId);
  if (!itemId) continue;
  setMeta(itemId, card);
  if (card.close) {
    ghRun(["issue", "close", url, "--reason", "completed"]);
    console.log("closed", url);
  }
}

console.log("REPO_BOARD=https://github.com/users/niki356565rt/projects/1");
