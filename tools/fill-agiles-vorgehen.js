const path = require("path");
const fs = require("fs");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
} = require("docx");

const FONT = "Calibri";
const thin = { style: BorderStyle.SINGLE, size: 4, color: "000000" };
const borders = { top: thin, bottom: thin, left: thin, right: thin };

function t(text, opts = {}) {
  return new TextRun({
    text,
    font: FONT,
    size: opts.size || 22,
    bold: opts.bold || false,
    italics: opts.italics || false,
  });
}

function p(text, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 80, before: opts.before ?? 0 },
    children: [t(text, opts)],
  });
}

function mixed(parts, opts = {}) {
  return new Paragraph({
    spacing: { after: opts.after ?? 80, before: opts.before ?? 0 },
    children: parts.map((x) => t(x.text, x)),
  });
}

function cell(text, opts = {}) {
  return new TableCell({
    borders,
    width: { size: opts.w || 2340, type: WidthType.DXA },
    margins: { top: 40, bottom: 40, left: 60, right: 60 },
    children: [
      new Paragraph({
        children: [t(text, { bold: opts.bold, size: opts.size || 20 })],
      }),
    ],
  });
}

const doc = new Document({
  sections: [
    {
      properties: {
        page: {
          margin: { top: 720, bottom: 720, left: 850, right: 850 },
        },
      },
      children: [
        p("Projekt Smart Restaurant", { bold: true, size: 32, after: 40 }),
        p("Agiles Vorgehen mit User Stories und Kanban-Board", {
          bold: true,
          size: 26,
          after: 120,
        }),
        p("Teammitglieder: (Namen im Team ergänzen)", { after: 200 }),

        p("1. Vor- und Nachteile agiler Entwicklung in Bezug auf das Projekt", {
          bold: true,
          size: 24,
          after: 80,
        }),
        p("Vorteile:", { bold: true, after: 40 }),
        p("• Kurze Sprints (2–3 Tage), wir merken schnell, ob der Bestellprozess läuft."),
        p("• Muss-Anforderungen zuerst, bei Zeitmangel fallen Soll/Kann weg."),
        p("• Kanban-Board zeigt den Stand fürs ganze Team."),
        p("• Änderungen (z. B. Getränke ohne Bar) lassen sich noch einbauen.", {
          after: 160,
        }),

        p("Nachteile:", { bold: true, after: 40 }),
        p("• Nur 2 Wochen: Daily, Poker und Board kosten Zeit."),
        p("• Ohne feste Anforderungen droht Scope-Creep."),
        p("• Doku und Tests können untergehen, wenn nur Features zählen."),
        p("• Planning Poker ist am Anfang ungenau, weil uns Erfahrung fehlt.", {
          after: 200,
        }),

        p("2. Kanban-Board ANALOG oder DIGITAL?", { bold: true, size: 24 }),
        p(
          "Die User Stories sollen über ein Kanban-Board organisiert werden. Spalten: Backlog, ToDo, In Progress, Review/Test, Done.",
          { after: 160 }
        ),

        p("2.1 ENTSCHEIDUNG und BEGRÜNDUNG", { bold: true, size: 24 }),
        mixed(
          [
            { text: "Wir haben uns für ein " },
            { text: "digitales GitHub-Board", bold: true },
            {
              text: " entschieden, weil der Code schon auf GitHub liegt. Alle im Team sehen Issues und Status, nichts geht verloren wie bei Post-its. Extra-Tools (Jira/Trello) brauchen wir nicht.",
            },
          ],
          { after: 200 }
        ),

        p("2.2 User Stories und Tasks (Service, Küche, Admin)", {
          bold: true,
          size: 24,
        }),
        p(
          "Schätzung mit Planning Poker (Story Points). 1 SP ≈ kleine Aufgabe, 5 SP ≈ halber Tag, 8 SP ≈ ganzer Tag.",
          { after: 80 }
        ),

        new Table({
          width: { size: 9360, type: WidthType.DXA },
          columnWidths: [1100, 1600, 4860, 1800],
          rows: [
            new TableRow({
              children: [
                cell("ID / SP", { bold: true, w: 1100 }),
                cell("Bereich", { bold: true, w: 1600 }),
                cell("User Story / Task", { bold: true, w: 4860 }),
                cell("Prio", { bold: true, w: 1800 }),
              ],
            }),
            new TableRow({
              children: [
                cell("US-S1 / 5", { w: 1100 }),
                cell("Service", { w: 1600 }),
                cell(
                  "Als Service möchte ich einen Tisch auswählen und eine Bestellung mit Artikeln/Mengen anlegen, damit die Küche die Speisen bekommt.",
                  { w: 4860 }
                ),
                cell("Muss", { w: 1800 }),
              ],
            }),
            new TableRow({
              children: [
                cell("US-S2 / 3", { w: 1100 }),
                cell("Service", { w: 1600 }),
                cell(
                  "Als Service möchte ich fertige Bestellungen auf „serviert“ und nach Zahlung auf „bezahlt“ setzen, damit der Tischabschluss klappt.",
                  { w: 4860 }
                ),
                cell("Muss", { w: 1800 }),
              ],
            }),
            new TableRow({
              children: [
                cell("US-K1 / 5", { w: 1100 }),
                cell("Küche", { w: 1600 }),
                cell(
                  "Als Küche möchte ich offene Speisenbestellungen nach Eingangszeit sehen und auf „in Bearbeitung“/„fertig“ setzen, damit der Service weiß, wann serviert werden kann.",
                  { w: 4860 }
                ),
                cell("Muss", { w: 1800 }),
              ],
            }),
            new TableRow({
              children: [
                cell("T-A1 / 5", { w: 1100 }),
                cell("Admin", { w: 1600 }),
                cell(
                  "Task: Mitarbeiter, Artikel und Tische anlegen/bearbeiten/löschen (kein Nutzer-Story-Format, Stammdaten).",
                  { w: 4860 }
                ),
                cell("Muss", { w: 1800 }),
              ],
            }),
            new TableRow({
              children: [
                cell("T-SYS / 3", { w: 1100 }),
                cell("System", { w: 1600 }),
                cell(
                  "Task: Jeden Statuswechsel mit Mitarbeiter, Zeitstempel und Bestellung speichern (A-13).",
                  { w: 4860 }
                ),
                cell("Muss", { w: 1800 }),
              ],
            }),
          ],
        }),

        p("", { after: 80 }),
        p("2.3 User Stories für zwei Anforderungen unserer Wahl", {
          bold: true,
          size: 24,
        }),
        p("Unsere User Stories:", { after: 60 }),
        mixed([
          { text: "S-02: ", bold: true },
          {
            text: "Als Service-Mitarbeiter möchte ich für einen Tisch eine neue Bestellung anlegen, damit die Bestellung dem richtigen Tisch zugeordnet ist. (3 SP)",
          },
        ]),
        mixed(
          [
            { text: "K-01: ", bold: true },
            {
              text: "Als Küchen-Mitarbeiter möchte ich alle offenen Bestellungen mit Speisen sehen, damit ich nichts verpasse und der Reihe nach kochen kann. (5 SP)",
            },
          ],
          { after: 200 }
        ),

        p("2.4 Screenshot vom digitalen Board oder Foto vom analogen Board:", {
          bold: true,
          size: 24,
        }),
        p(
          "Platzhalter: Screenshot vom GitHub-Kanban (Spalten Backlog / ToDo / In Progress / Review/Test / Done) hier einfügen, sobald das Board live ist.",
          { italics: true }
        ),
      ],
    },
  ],
});

async function main() {
  const buf = await Packer.toBuffer(doc);
  const out1 = path.join(
    __dirname,
    "..",
    "docs",
    "02-agiles-vorgehen-ausgefuellt.docx"
  );
  const out2 = path.join(
    process.env.USERPROFILE,
    "Downloads",
    "2. agilesVorgehen_ausgefuellt.docx"
  );
  fs.writeFileSync(out1, buf);
  fs.writeFileSync(out2, buf);
  console.log("wrote", out1);
  console.log("wrote", out2);
}

main();
