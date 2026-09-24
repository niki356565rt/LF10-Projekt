const { execFileSync } = require("child_process");
const gh = "C:\\Program Files\\GitHub CLI\\gh.exe";
const repo = "niki356565rt/LF10-Projekt";
const owner = "@me";
const project = "1";

function ghJson(args) {
  const out = execFileSync(gh, args, { encoding: "utf8" });
  return out.trim() ? JSON.parse(out) : null;
}

function ghRun(args) {
  return execFileSync(gh, args, { encoding: "utf8" }).trim();
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
];

for (const [name, color, desc] of labels) {
  try {
    ghRun(["label", "create", name, "--repo", repo, "--color", color, "--description", desc, "--force"]);
    console.log("label", name);
  } catch (e) {
    console.error("label fail", name, e.stderr || e.message);
  }
}

const cards = [
  {
    title: "Anforderungskatalog finalisieren (Muss)",
    labels: ["sprint-1", "muss", "documentation"],
    status: "Done",
    sprint: "Sprint 1",
    prio: "Muss",
    close: true,
    body: "Als Team wollen wir die Muss-Anforderungen festziehen, damit der Scope in 2 Wochen haltbar bleibt.\n\n**Ergebnis:** docs/01-anforderungskatalog.md\n**Punkte:** 3 SP",
  },
  {
    title: "Prozess und UML-Aktivitaetsdiagramm Bestellprozess",
    labels: ["sprint-1", "muss", "documentation"],
    status: "Done",
    sprint: "Sprint 1",
    prio: "Muss",
    close: true,
    body: "Als Team wollen wir den Ablauf von Aufnahme bis Bezahlung modellieren, damit Service und Kueche denselben Prozess haben.\n\n**Ergebnis:** UML-Aktivitaetsdiagramm (HTML/PUML/PDF)\n**Punkte:** 5 SP",
  },
  {
    title: "Agiles Vorgehen: User Stories und Kanban-Board",
    labels: ["sprint-1", "muss", "documentation"],
    status: "Done",
    sprint: "Sprint 1",
    prio: "Muss",
    close: true,
    body: "Arbeitsblatt ausfuellen, Board anlegen, Stories schaetzen (Planning Poker).\n\n**Ergebnis:** GitHub-Kanban + ausgefuelltes Arbeitsblatt\n**Punkte:** 3 SP",
  },
  {
    title: "ER-Modell und Datenbank anlegen",
    labels: ["sprint-1", "muss", "system"],
    status: "ToDo",
    sprint: "Sprint 1",
    prio: "Muss",
    body: "Task: Tabellen fuer Tische, Mitarbeiter, Artikel, Bestellungen, Positionen, Statuslog.\n\n**Meilenstein M2**\n**Punkte:** 8 SP",
  },
  {
    title: "Architektur und Mockups der Kernmasken",
    labels: ["sprint-1", "muss", "documentation"],
    status: "ToDo",
    sprint: "Sprint 1",
    prio: "Muss",
    body: "Task: einfache Architektur fuer Service, Kueche, Admin. Grobe Mockups nur Kernmasken.\n\n**Punkte:** 5 SP",
  },
  {
    title: "US-S1: Tisch waehlen und Bestellung aufnehmen",
    labels: ["sprint-2", "muss", "service"],
    status: "ToDo",
    sprint: "Sprint 2",
    prio: "Muss",
    body: "Als Service moechte ich einen Tisch auswaehlen und eine Bestellung mit Artikeln/Mengen anlegen, damit die Kueche die Speisen bekommt.\n\n**Anforderungen:** S-01, S-02, S-03, S-04, A-05, A-06, A-07\n**Punkte:** 5 SP",
  },
  {
    title: "US-K1: Offene Speisen sehen und Status setzen",
    labels: ["sprint-2", "muss", "kueche"],
    status: "ToDo",
    sprint: "Sprint 2",
    prio: "Muss",
    body: "Als Kueche moechte ich offene Speisenbestellungen nach Eingangszeit sehen und auf „in Bearbeitung“ / „fertig“ setzen, damit der Service weiss, wann serviert werden kann.\n\n**Anforderungen:** K-01, K-03, K-04, K-05\n**Soll:** K-02 Sortierung (5 SP gesamt, Sortierung 2 SP extra falls Restzeit)\n**Punkte:** 5 SP",
  },
  {
    title: "T-SYS: Statuswechsel protokollieren",
    labels: ["sprint-2", "muss", "system"],
    status: "ToDo",
    sprint: "Sprint 2",
    prio: "Muss",
    body: "Task: Jeder Statuswechsel speichert Mitarbeiter, Zeitstempel und Bestellung.\n\n**Anforderung:** A-13\n**Punkte:** 3 SP",
  },
  {
    title: "US-S2: Servieren und Bezahlung abschliessen",
    labels: ["sprint-3", "muss", "service"],
    status: "ToDo",
    sprint: "Sprint 3",
    prio: "Muss",
    body: "Als Service moechte ich fertige Bestellungen auf „serviert“ und nach Zahlung auf „bezahlt“ setzen, damit der Tischabschluss klappt.\n\n**Anforderungen:** S-05, S-07\n**Punkte:** 3 SP",
  },
  {
    title: "S-06: Rechnung anzeigen (Soll)",
    labels: ["sprint-3", "soll", "service"],
    status: "Backlog",
    sprint: "Sprint 3",
    prio: "Soll",
    body: "Als Service moechte ich die Rechnung mit Positionen, Mengen, Preisen und Gesamtsumme sehen.\n\n**Punkte:** 3 SP",
  },
  {
    title: "S-08: Tisch auf frei setzen wenn alles bezahlt ist (Soll)",
    labels: ["sprint-3", "soll", "service"],
    status: "Backlog",
    sprint: "Sprint 3",
    prio: "Soll",
    body: "Als Service moechte ich den Tisch wieder frei sehen, wenn alle Bestellungen bezahlt sind.\n\n**Punkte:** 2 SP",
  },
  {
    title: "T-A1: Admin Stammdaten (Mitarbeiter, Artikel, Tische)",
    labels: ["sprint-3", "muss", "admin"],
    status: "ToDo",
    sprint: "Sprint 3",
    prio: "Muss",
    body: "Task: Mitarbeiter, Artikel und Tische anlegen, bearbeiten, loeschen.\n\n**Anforderungen:** AD-01 bis AD-08, A-11, A-12\n**Punkte:** 5 SP",
  },
  {
    title: "Getraenke ohne Bar: direkt servieren",
    labels: ["sprint-2", "muss", "service", "kueche"],
    status: "ToDo",
    sprint: "Sprint 2",
    prio: "Muss",
    body: "Reine Getraenkebestellungen nicht in der Kueche anzeigen. Service setzt nach Ausgabe auf „serviert“.\n\n**Anforderung:** K-05, A-09\n**Punkte:** 3 SP",
  },
  {
    title: "End-to-End-Test Kernablauf",
    labels: ["sprint-4", "muss"],
    status: "Backlog",
    sprint: "Sprint 4",
    prio: "Muss",
    body: "Aufnahme → Kueche → serviert → bezahlt pruefen. Muss-Kriterien abhaken.\n\n**Meilenstein M4/M5**\n**Punkte:** 5 SP",
  },
  {
    title: "Abschlussdokumentation und Abgabe",
    labels: ["sprint-4", "muss", "documentation"],
    status: "Backlog",
    sprint: "Sprint 4",
    prio: "Muss",
    body: "Kurze Entwickler-/Benutzerdoku, Screenshot, Quellcodeausschnitt, Ziele begruenden.\n\n**Punkte:** 5 SP",
  },
  {
    title: "AD-09/AD-10: Wochenumsatz und meistverkauftes Getraenk (Soll)",
    labels: ["sprint-4", "soll", "admin"],
    status: "Backlog",
    sprint: "Sprint 4",
    prio: "Soll",
    body: "Nur bei Restzeit. Sonst streichen.\n\n**Punkte:** 5 SP",
  },
];

const existing = ghJson(["issue", "list", "--repo", repo, "--state", "all", "--limit", "50", "--json", "title,url"]);
const have = new Set((existing || []).map((i) => i.title));
console.log("existing issues", have.size);

for (const card of cards) {
  if (have.has(card.title)) {
    console.log("skip create", card.title);
    const found = existing.find((i) => i.title === card.title);
    card.url = found.url;
  } else {
    const args = [
      "issue", "create",
      "--repo", repo,
      "--title", card.title,
      "--body", card.body,
    ];
    for (const l of card.labels) {
      args.push("--label", l);
    }
    const url = ghRun(args).split(/\s+/).pop();
    console.log("issue", url);
    card.url = url;
  }

  let added;
  try {
    added = ghJson([
      "project", "item-add", project,
      "--owner", owner,
      "--url", card.url,
      "--format", "json",
    ]);
  } catch (e) {
    console.log("item-add note", (e.stderr || e.message || "").toString().slice(0, 200));
  }
  let itemId = added && (added.id || added.itemId);
  if (!itemId) {
    const listed = ghJson(["project", "item-list", project, "--owner", owner, "--format", "json", "--limit", "50"]);
    const items = (listed && listed.items) || listed || [];
    const hit = items.find((it) => (it.content && it.content.url) === card.url || it.title === card.title);
    itemId = hit && hit.id;
  }
  console.log("added", itemId);
  if (!itemId) {
    console.error("NO ITEM ID", card.title);
    continue;
  }

  const projectId = "PVT_kwHOEvfPhs4BhaSf";
  const fields = {
    Status: "PVTSSF_lAHOEvfPhs4BhaSfzhgWHvA",
    Sprint: "PVTSSF_lAHOEvfPhs4BhaSfzhgWIaQ",
    "Priorität": "PVTSSF_lAHOEvfPhs4BhaSfzhgWIbg",
  };
  const options = {
    Status: {
      Backlog: "f169c48c",
      ToDo: "4f5d0407",
      "In Progress": "f0e8547b",
      "Review/Test": "ca526966",
      Done: "5012122c",
    },
    Sprint: {
      "Sprint 1": "9696634c",
      "Sprint 2": "3a2854f4",
      "Sprint 3": "1deec751",
      "Sprint 4": "fb46ce57",
    },
    "Priorität": {
      Muss: "2a3ad4f6",
      Soll: "eb69fb8c",
      Kann: "554a3f2a",
    },
  };

  function setSelect(fieldName, value) {
    ghRun([
      "project", "item-edit",
      "--id", itemId,
      "--project-id", projectId,
      "--field-id", fields[fieldName],
      "--single-select-option-id", options[fieldName][value],
    ]);
  }

  setSelect("Status", card.status);
  setSelect("Sprint", card.sprint);
  setSelect("Priorität", card.prio);

  if (card.close) {
    ghRun(["issue", "close", card.url, "--reason", "completed"]);
    console.log("closed", card.url);
  }
}

console.log("BOARD=https://github.com/users/joki1990jk-bit/projects/1");
