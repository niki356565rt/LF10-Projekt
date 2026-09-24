const fs = require("fs");
const path = require("path");
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  ShadingType,
  PageBreak,
  Footer,
  PageNumber,
  NumberFormat,
  convertMillimetersToTwip,
} = require("docx");

const OUT_DIR = path.join(__dirname, "..", "abgabe");
const ABRUF = "23.08.2026";

const FONT = "Calibri";
const ACCENT = "1F4E79";
const LIGHT = "DCE6F1";
const GREY = "F2F2F2";

const NO_BORDER = { style: BorderStyle.NONE, size: 0, color: "FFFFFF" };
const HAIRLINE = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };

function run(text, opts = {}) {
  return new TextRun({
    text,
    font: FONT,
    size: opts.size || 19,
    bold: opts.bold || false,
    italics: opts.italics || false,
    color: opts.color || "000000",
  });
}

function body(text, opts = {}) {
  return new Paragraph({
    spacing: { before: opts.before ?? 0, after: opts.after ?? 40, line: 240 },
    alignment: opts.align,
    children: [run(text, opts)],
  });
}

function bullet(text, opts = {}) {
  return new Paragraph({
    bullet: { level: 0 },
    spacing: { after: opts.after ?? 20, line: 230 },
    indent: { left: 220, hanging: 180 },
    children: [run(text, { size: opts.size || 19 })],
  });
}

function numbered(index, boldPart, rest) {
  return new Paragraph({
    spacing: { after: 20, line: 230 },
    indent: { left: 220, hanging: 180 },
    children: [
      run(`${index}. `, { bold: true }),
      run(boldPart, { bold: true }),
      run(rest),
    ],
  });
}

function sectionHeading(text) {
  return new Paragraph({
    spacing: { before: 120, after: 60 },
    shading: { type: ShadingType.CLEAR, fill: LIGHT },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT } },
    keepNext: true,
    keepLines: true,
    children: [run(` ${text}`, { bold: true, size: 20, color: ACCENT })],
  });
}

function titleBlock(title, subtitle) {
  return [
    new Paragraph({
      spacing: { after: 40 },
      shading: { type: ShadingType.CLEAR, fill: ACCENT },
      children: [run(` ${title}`, { bold: true, size: 30, color: "FFFFFF" })],
    }),
    new Paragraph({
      spacing: { after: 80 },
      border: { bottom: HAIRLINE },
      children: [run(subtitle, { size: 17, color: "595959" })],
    }),
  ];
}

function infoBox(label, text) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: HAIRLINE, bottom: HAIRLINE, left: HAIRLINE, right: HAIRLINE,
      insideHorizontal: NO_BORDER, insideVertical: NO_BORDER,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: GREY },
            margins: { top: 60, bottom: 60, left: 100, right: 100 },
            children: [
              new Paragraph({
                spacing: { after: 0, line: 230 },
                children: [run(`${label} `, { bold: true }), run(text, { italics: true })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function analysisTable(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [2600, 7600],
    borders: {
      top: HAIRLINE, bottom: HAIRLINE, left: HAIRLINE, right: HAIRLINE,
      insideHorizontal: HAIRLINE, insideVertical: HAIRLINE,
    },
    rows: rows.map(
      ([key, value]) =>
        new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              width: { size: 2600, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: GREY },
              margins: { top: 50, bottom: 50, left: 90, right: 90 },
              children: [
                new Paragraph({
                  spacing: { after: 0, line: 230 },
                  children: [run(key, { bold: true, size: 18 })],
                }),
              ],
            }),
            new TableCell({
              width: { size: 7600, type: WidthType.DXA },
              margins: { top: 50, bottom: 50, left: 90, right: 90 },
              children: [
                new Paragraph({
                  spacing: { after: 0, line: 230 },
                  alignment: AlignmentType.JUSTIFIED,
                  children: [run(value, { size: 18 })],
                }),
              ],
            }),
          ],
        })
    ),
  });
}

function gridTable(header, rows, widths) {
  const headerRow = new TableRow({
    tableHeader: true,
    children: header.map(
      (h, i) =>
        new TableCell({
          width: { size: widths[i], type: WidthType.DXA },
          shading: { type: ShadingType.CLEAR, fill: ACCENT },
          margins: { top: 40, bottom: 40, left: 90, right: 90 },
          children: [
            new Paragraph({
              spacing: { after: 0, line: 220 },
              children: [run(h, { bold: true, size: 17, color: "FFFFFF" })],
            }),
          ],
        })
    ),
  });

  const bodyRows = rows.map(
    (cells, r) =>
      new TableRow({
        cantSplit: true,
        children: cells.map(
          (c, i) =>
            new TableCell({
              width: { size: widths[i], type: WidthType.DXA },
              shading:
                r % 2 === 1
                  ? { type: ShadingType.CLEAR, fill: "F7F9FC" }
                  : undefined,
              margins: { top: 45, bottom: 45, left: 90, right: 90 },
              children: [
                new Paragraph({
                  spacing: { after: 0, line: 220 },
                  children: [run(c, { size: 17, bold: i === 0 })],
                }),
              ],
            })
        ),
      })
  );

  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: widths,
    borders: {
      top: HAIRLINE, bottom: HAIRLINE, left: HAIRLINE, right: HAIRLINE,
      insideHorizontal: HAIRLINE, insideVertical: HAIRLINE,
    },
    rows: [headerRow, ...bodyRows],
  });
}

function statBoxes(items) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [3400, 3400, 3400],
    borders: {
      top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER,
      insideHorizontal: NO_BORDER,
      insideVertical: { style: BorderStyle.SINGLE, size: 4, color: "FFFFFF" },
    },
    rows: [
      new TableRow({
        cantSplit: true,
        children: items.map(
          (it) =>
            new TableCell({
              width: { size: 3400, type: WidthType.DXA },
              shading: { type: ShadingType.CLEAR, fill: LIGHT },
              margins: { top: 70, bottom: 70, left: 110, right: 110 },
              children: [
                new Paragraph({
                  spacing: { after: 10, line: 240 },
                  alignment: AlignmentType.CENTER,
                  children: [run(it.value, { bold: true, size: 26, color: ACCENT })],
                }),
                new Paragraph({
                  spacing: { after: 0, line: 210 },
                  alignment: AlignmentType.CENTER,
                  children: [run(it.label, { size: 15 })],
                }),
              ],
            })
        ),
      }),
    ],
  });
}

function timeline(rows) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    columnWidths: [1900, 8300],
    borders: {
      top: NO_BORDER, bottom: NO_BORDER, left: NO_BORDER, right: NO_BORDER,
      insideHorizontal: HAIRLINE, insideVertical: NO_BORDER,
    },
    rows: rows.map(
      ([when, what]) =>
        new TableRow({
          cantSplit: true,
          children: [
            new TableCell({
              width: { size: 1900, type: WidthType.DXA },
              margins: { top: 35, bottom: 35, left: 60, right: 90 },
              children: [
                new Paragraph({
                  spacing: { after: 0, line: 215 },
                  children: [run(when, { bold: true, size: 17, color: ACCENT })],
                }),
              ],
            }),
            new TableCell({
              width: { size: 8300, type: WidthType.DXA },
              margins: { top: 35, bottom: 35, left: 60, right: 60 },
              children: [
                new Paragraph({
                  spacing: { after: 0, line: 215 },
                  children: [run(what, { size: 17 })],
                }),
              ],
            }),
          ],
        })
    ),
  });
}

function diagramBox(title, steps, note) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: HAIRLINE, bottom: HAIRLINE, left: HAIRLINE, right: HAIRLINE,
      insideHorizontal: NO_BORDER, insideVertical: NO_BORDER,
    },
    rows: [
      new TableRow({
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: GREY },
            margins: { top: 70, bottom: 70, left: 110, right: 110 },
            children: [
              new Paragraph({
                spacing: { after: 50, line: 220 },
                children: [run(title, { bold: true, size: 18, color: ACCENT })],
              }),
              new Paragraph({
                spacing: { after: 50, line: 240 },
                alignment: AlignmentType.CENTER,
                children: [run(steps, { bold: true, size: 18 })],
              }),
              new Paragraph({
                spacing: { after: 0, line: 215 },
                children: [run(note, { size: 16, italics: true })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

function quoteBox(quote, attribution) {
  return new Table({
    width: { size: 100, type: WidthType.PERCENTAGE },
    borders: {
      top: NO_BORDER, bottom: NO_BORDER, right: NO_BORDER,
      left: { style: BorderStyle.SINGLE, size: 18, color: ACCENT },
      insideHorizontal: NO_BORDER, insideVertical: NO_BORDER,
    },
    rows: [
      new TableRow({
        cantSplit: true,
        children: [
          new TableCell({
            shading: { type: ShadingType.CLEAR, fill: "F7F9FC" },
            margins: { top: 55, bottom: 55, left: 130, right: 110 },
            children: [
              new Paragraph({
                spacing: { after: 30, line: 220 },
                alignment: AlignmentType.JUSTIFIED,
                children: [run(`„${quote}“`, { size: 17, italics: true })],
              }),
              new Paragraph({
                spacing: { after: 0, line: 210 },
                alignment: AlignmentType.RIGHT,
                children: [run(attribution, { size: 15, color: "595959" })],
              }),
            ],
          }),
        ],
      }),
    ],
  });
}

const spacer = (h = 80) => new Paragraph({ spacing: { after: h }, children: [] });

function sourceList(sources) {
  const out = [
    new Paragraph({
      spacing: { before: 140, after: 40 },
      border: { top: { style: BorderStyle.SINGLE, size: 6, color: ACCENT } },
      children: [run("Quellenverzeichnis", { bold: true, size: 18, color: ACCENT })],
    }),
  ];
  sources.forEach((s, i) => {
    out.push(
      new Paragraph({
        spacing: { after: 30, line: 220 },
        indent: { left: 240, hanging: 240 },
        children: [
          run(`[${i + 1}] `, { size: 15, bold: true }),
          run(`${s.autor}: ${s.titel}`, { size: 15 }),
          run(` URL: ${s.url} (Abruf: ${ABRUF}, ${s.zeit} Uhr).`, { size: 15 }),
        ],
      })
    );
  });
  return out;
}

function makeFooter(label) {
  return new Footer({
    children: [
      new Paragraph({
        spacing: { before: 60, after: 0 },
        alignment: AlignmentType.RIGHT,
        border: { top: HAIRLINE },
        children: [
          new TextRun({ text: `${label}  ·  Seite `, font: FONT, size: 14, color: "808080" }),
          new TextRun({ children: [PageNumber.CURRENT], font: FONT, size: 14, color: "808080" }),
          new TextRun({ text: " von ", font: FONT, size: 14, color: "808080" }),
          new TextRun({ children: [PageNumber.TOTAL_PAGES], font: FONT, size: 14, color: "808080" }),
        ],
      }),
    ],
  });
}

function makeDoc(children, marginMm = 14, footerLabel) {
  return new Document({
    creator: "Berufsschule - Gemeinschaftskunde",
    description: "Ideologien: Informationsblatt / Bewertung",
    title: "Ideologien",
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: convertMillimetersToTwip(marginMm),
              bottom: convertMillimetersToTwip(marginMm),
              left: convertMillimetersToTwip(marginMm + 2),
              right: convertMillimetersToTwip(marginMm + 2),
            },
            pageNumbers: { formatType: NumberFormat.DECIMAL },
          },
        },
        footers: footerLabel ? { default: makeFooter(footerLabel) } : undefined,
        children,
      },
    ],
  });
}

/* ------------------------------------------------------------------ */
/* 1) INFORMATIONSBLATT ISLAMISMUS                                     */
/* ------------------------------------------------------------------ */

const quellenIslamismus = [
  {
    autor: "Bundeszentrale für politische Bildung (Hrsg.)",
    titel: "Islamismus – Was ist das überhaupt? Dossier Islamismus, Bonn.",
    url: "https://www.bpb.de/themen/islamismus/dossier-islamismus/36339/islamismus-was-ist-das-ueberhaupt/",
    zeit: "18:40",
  },
  {
    autor: "Bundesamt für Verfassungsschutz",
    titel: "Islamismus und islamistischer Terrorismus, Köln.",
    url: "https://www.verfassungsschutz.de/DE/themen/islamismus-und-islamistischer-terrorismus/islamismus-und-islamistischer-terrorismus_node.html",
    zeit: "18:55",
  },
  {
    autor: "Bundeszentrale für politische Bildung (Hrsg.)",
    titel: "Islamismus, Salafismus, Dschihadismus. Infodienst Radikalisierungsprävention, Bonn.",
    url: "https://www.bpb.de/themen/infodienst/322920/islamismus-salafismus-dschihadismus/",
    zeit: "19:05",
  },
];

const islamismus = [
  ...titleBlock(
    "IDEOLOGIE: ISLAMISMUS",
    "Informationsblatt (Gruppenabgabe) · Namen: ______________________  /  ______________________ · Fach: Gemeinschaftskunde · Klasse: ________ · Datum: 23.08.2026"
  ),
  infoBox(
    "Kurzdefinition:",
    "Islamismus ist eine Sammelbezeichnung für alle politischen Auffassungen und Handlungen, die im Namen des Islam eine religiös legitimierte Gesellschafts- und Staatsordnung errichten wollen [1]. Wichtig: Islam (Religion) und Islamismus (politische Ideologie) sind nicht dasselbe."
  ),
  sectionHeading("1  Grundanalyse des Kernkonzepts"),
  analysisTable([
    [
      "Grundannahme",
      "Es existiert eine gottgewollte, absolute Ordnung, die über allen von Menschen gemachten Regeln steht [2]. Staat und Religion sollen deshalb nicht getrennt werden; der Islam soll Politik, Recht, Wirtschaft und Alltag verbindlich prägen. Der Einzelne wird vor allem als Teil der Glaubensgemeinschaft (Umma) gesehen und der religiösen Norm untergeordnet. Individualität, Menschenrechte, Pluralismus, Säkularität und Volkssouveränität werden abgelehnt [1].",
    ],
    [
      "Rolle des Eigentums",
      "Privateigentum wird grundsätzlich anerkannt, aber religiös eingebunden: Eigentum gilt als von Gott anvertraut und ist an religiöse Pflichten gebunden (z. B. Almosenabgabe/Zakat, Zinsverbot/Riba). Ein eigenes geschlossenes Wirtschaftsmodell gibt es nicht – die Religion setzt den Rahmen über der Wirtschaft.",
    ],
    [
      "Ziele der gesellschaftlichen Ordnung",
      "Errichtung einer allein religiös begründeten Gesellschafts-, Rechts- und Staatsordnung nach der jeweiligen Auslegung der Scharia. Manche Gruppen wollen dies auf nationalstaatlicher Ebene erreichen, anderen geht es um ein länderübergreifendes Kalifat [3]. Angestrebt wird eine homogene, identitäre Sozialordnung mit festen Geschlechterrollen.",
    ],
    [
      "Sicht auf menschliches Handeln",
      "Der Mensch handelt nicht in erster Linie rational und eigennützig, sondern soll göttlichen Geboten gehorchen. Leitend sind religiöse Pflicht, Gehorsam, Moral und Gruppenzugehörigkeit – nicht individuelle Selbstverwirklichung.",
    ],
  ]),
  sectionHeading("2  Zentrale Werte nach Priorität"),
  numbered(1, "Gottessouveränität vor Volkssouveränität – ", "die religiöse Norm steht über dem Mehrheitswillen."),
  numbered(2, "Scharia als Rechtsgrundlage – ", "Recht wird religiös und nicht demokratisch begründet."),
  numbered(3, "Gemeinschaft und Identität (Umma) – ", "die Gruppe steht klar vor dem Einzelnen."),
  numbered(4, "Gehorsam und Autorität – ", "Führung durch religiöse Autoritäten statt durch Wahl."),
  numbered(5, "Moral und Sittlichkeit – ", "religiöse Regeln reichen bis in das Privatleben hinein."),
  new Paragraph({
    spacing: { before: 40, after: 40, line: 230 },
    children: [
      run("Begründung der Reihenfolge: ", { bold: true, size: 18 }),
      run(
        "Alle weiteren Forderungen leiten sich logisch aus der Grundannahme der göttlichen Ordnung ab – ohne sie gäbe es keinen Anspruch auf ein religiöses Rechtssystem.",
        { size: 18 }
      ),
    ],
  }),
  new Paragraph({
    spacing: { after: 40, line: 230 },
    shading: { type: ShadingType.CLEAR, fill: GREY },
    children: [
      run(" Gegensätze: ", { bold: true, size: 18 }),
      run(
        "Autorität ↔ Partizipation · Kollektivismus ↔ Individualismus · religiöse Norm ↔ Säkularität/Rechtsstaat · Hierarchie ↔ Gleichheit",
        { size: 18 }
      ),
    ],
  }),
  sectionHeading("3  Wichtige Abgrenzung: Islam ist nicht Islamismus"),
  new Paragraph({
    spacing: { after: 60, line: 235 },
    alignment: AlignmentType.JUSTIFIED,
    children: [
      run(
        "Der Islam ist eine Weltreligion, die von Musliminnen und Muslimen sehr unterschiedlich gedeutet und gelebt wird. Der Islamismus ist dagegen eine politische Ideologie, die sich auf diese Religion beruft, um eine bestimmte Staats- und Rechtsordnung durchzusetzen. Extremistische und gewalttätige Auslegungen werden von der überwiegenden Mehrheit der Musliminnen und Muslime abgelehnt [3]. Eine Gleichsetzung beider Begriffe ist sachlich falsch und trifft die falschen Menschen.",
        { size: 18 }
      ),
    ],
  }),

  sectionHeading("4  Woran man Islamismus erkennt – fünf Merkmale"),
  bullet("Die Absolutsetzung des Islam als Lebens- und Staatsordnung.", { size: 18 }),
  bullet("Der Vorrang der Gottes- vor der Volkssouveränität als Legitimationsbasis.", { size: 18 }),
  bullet("Die religiöse Durchdringung aller Lebensbereiche.", { size: 18 }),
  bullet("Die Forderung nach einer homogenen und identitären Sozialordnung im Namen der Religion.", { size: 18 }),
  bullet("Die Ablehnung der Normen und Regeln des modernen demokratischen Verfassungsstaates. [1]", { size: 18 }),
  spacer(50),
  quoteBox(
    "Dies macht in der Bilanz aus dem Islamismus eine Form des religiösen Extremismus, ein Phänomen des politischen Fundamentalismus und eine Variante des ideologischen Totalitarismus.",
    "Bundeszentrale für politische Bildung [1]"
  ),

  sectionHeading("5  Strömungen im Überblick – ein Begriff, viele Gruppen"),
  gridTable(
    ["Strömung", "Ziele und Mittel", "Beispiele"],
    [
      [
        "Legalistisch",
        "Arbeitet innerhalb der bestehenden Regeln: Vereinsarbeit, Bildung, Soziales, Missionierung, teils Parteipolitik. Ziel ist eine langfristige Veränderung der Gesellschaft ohne offenen Gesetzesbruch.",
        "Muslimbruderschaft und ihr nahestehende Organisationen",
      ],
      [
        "Puristisch-salafistisch",
        "Will die Gesellschaft durch strenge Lebensführung und intensive Missionierung „von unten“ verändern; lehnt Demokratie und säkulare Ordnungen ab.",
        "salafistische Szene in Deutschland (11.200 Personen) [2]",
      ],
      [
        "Herrschaftsausübend",
        "Setzt die eigene Auslegung religiöser Normen als Staatsrecht durch, wenn die Gruppe an der Macht ist.",
        "Taliban in Afghanistan",
      ],
      [
        "Dschihadistisch",
        "Deutet den Dschihad als dauerhaften Kampf gegen als feindlich wahrgenommene Ordnungen und setzt Gewalt bis hin zum Terrorismus ein [2].",
        "„Islamischer Staat“ (IS), Al-Qaida",
      ],
    ],
    [2000, 5900, 2300]
  ),
  new Paragraph({
    spacing: { before: 60, after: 40, line: 220 },
    children: [
      run("Merke: ", { bold: true, size: 17 }),
      run(
        "Manche Gruppen wollen nur die Gesetzgebung eines einzelnen Staates ändern, anderen geht es um ein länderübergreifendes oder weltweites Kalifat [3].",
        { size: 17 }
      ),
    ],
  }),

  sectionHeading("6  Historische Entwicklung"),
  timeline([
    ["ab ca. 1850", "Ideologischer Ursprung in inner-islamischen Reformbestrebungen der zweiten Hälfte des 19. Jahrhunderts [1]."],
    ["1928", "Gründung der Muslimbruderschaft in Ägypten – die organisatorische Wurzel der Bewegung [1]."],
    ["Kolonialzeit / 20. Jh.", "Kolonialerfahrung, gescheiterte Modernisierung und autoritäre Regierungen begünstigen den Zulauf [3]."],
    ["1980er-Jahre", "Der Begriff „Islamismus“ setzt sich in französischen, englischen und deutschen Fachpublikationen durch [3]."],
    ["11.09.2001", "Die Anschläge in den USA gelten als Zäsur; sie prägen die Szene und die Sicherheitspolitik bis heute [2]."],
    ["seit 2024", "Sechs islamistisch motivierte Anschläge in Deutschland – die Gefährdungslage bleibt anhaltend hoch [2]."],
  ]),

  sectionHeading("7  Typische Forderungen und Praxisbezug"),
  bullet(
    "Forderungen: Gesetzgebung und Alltag nach der eigenen Auslegung der Scharia ausrichten; Ablehnung säkularer Gesetze, der Gleichstellung der Geschlechter und einer pluralen Gesellschaft.",
    { size: 18 }
  ),
  bullet(
    "Feindbilder: Der jihadistisch motivierte Anschlag am 25. Juli 2026 am Rande des Christopher Street Day in Berlin-Tiergarten zeigt, dass queere Menschen für Islamisten nicht nur Feindbild, sondern auch Angriffsziel sind [2].",
    { size: 18 }
  ),
  bullet(
    "Gegenmaßnahmen des Staates: Vereinsverbote sind ein zentrales Instrument der wehrhaften Demokratie; der Verfassungsschutz liefert dafür die Materialgrundlage [2].",
    { size: 18 }
  ),
  bullet(
    "Aktueller Aspekt: Die jihadistische Internetpropaganda nimmt laut Verfassungsschutz wieder zu. Radikalisierung läuft heute stark über Social Media und Messenger – also genau dort, wo auch Auszubildende und Jugendliche unterwegs sind [2].",
    { size: 18 }
  ),
  spacer(60),
  statBoxes([
    { value: "28.645", label: "Personen im Personenpotenzial „Islamismus/islamistischer Terrorismus“ in Deutschland [2]" },
    { value: "9.110", label: "davon werden dem gewaltorientierten Potenzial zugerechnet [2]" },
    { value: "28", label: "islamistisch motivierte Anschlagsvorhaben wurden seit 2015 verhindert [2]" },
  ]),

  sectionHeading("8  Wie wird „Islamismus“ definiert? – zwei Sichtweisen im Zitat"),
  new Paragraph({
    spacing: { after: 60, line: 225 },
    children: [
      run(
        "Eine allgemein anerkannte Definition gibt es nicht, weil Definitionen immer mit unterschiedlichen Erkenntnisinteressen verbunden sind [3]. Das zeigt der Vergleich zweier Zitate:",
        { size: 18 }
      ),
    ],
  }),
  quoteBox(
    "Beim Islamismus handelt es sich um Bestrebungen zur Umgestaltung von Gesellschaft, Kultur, Staat oder Politik anhand von Werten und Normen, die als islamisch angesehen werden.",
    "Tilman Seidensticker 2014, S. 9 – zitiert nach [3] (wissenschaftliche Definition)"
  ),
  spacer(50),
  quoteBox(
    "Der Begriff ‚Islamismus‘ bezeichnet eine Form des politischen Extremismus. Unter Berufung auf den Islam zielt der Islamismus auf die teilweise oder vollständige Abschaffung der freiheitlichen demokratischen Grundordnung der Bundesrepublik Deutschland ab.",
    "Bundesamt für Verfassungsschutz 2020, S. 172 – zitiert nach [3] (sicherheitsbehördliche Definition)"
  ),
  new Paragraph({
    spacing: { before: 60, after: 40, line: 220 },
    children: [
      run("Unterschied: ", { bold: true, size: 17 }),
      run(
        "Die erste Definition beschreibt das Phänomen neutral, die zweite bewertet es vor dem Hintergrund des Grundgesetzes und hat damit normativen Charakter [3].",
        { size: 17 }
      ),
    ],
  }),

  sectionHeading("9  Kurze Bewertung und Hinweise für den Leser"),
  bullet(
    "Der Islamismus ist mit der freiheitlich-demokratischen Grundordnung nicht vereinbar, weil er Volkssouveränität, Pluralismus und Menschenrechte grundsätzlich ablehnt [1] [2].",
    { size: 18 }
  ),
  bullet(
    "Seine Anziehungskraft liegt in einfachen Antworten, klarer Identität und starkem Gemeinschaftsgefühl – das erklärt die Wirkung, macht die Ideologie aber nicht überzeugender.",
    { size: 18 }
  ),
  bullet(
    "Innerer Widerspruch: Die angeblich absolute göttliche Ordnung wird von Menschen ausgelegt – deshalb streiten islamistische Gruppen selbst darüber, was gelten soll [1] [3].",
    { size: 18 }
  ),
  bullet(
    "Empfehlung: Islam und Islamismus immer klar trennen und Radikalisierung dort ansprechen, wo sie beginnt – online und im persönlichen Umfeld.",
    { size: 18 }
  ),
  bullet(
    "Weiterführende Frage: Wie kann sich eine Demokratie wirksam schützen, ohne selbst Grundrechte einzuschränken?",
    { size: 18 }
  ),
  ...sourceList(quellenIslamismus),
];

/* ------------------------------------------------------------------ */
/* 2) INFORMATIONSBLATT KAPITALISMUS                                   */
/* ------------------------------------------------------------------ */

const quellenKapitalismus = [
  {
    autor: "Bundeszentrale für politische Bildung (Hrsg.)",
    titel:
      "Kapitalismus. In: Lexikon der Wirtschaft (Lizenzausgabe von: Duden Wirtschaft von A bis Z, 6. Auflage, Mannheim 2016), Bonn.",
    url: "https://www.bpb.de/kurz-knapp/lexika/lexikon-der-wirtschaft/19938/kapitalismus/",
    zeit: "19:20",
  },
  {
    autor: "Bundeszentrale für politische Bildung (Hrsg.)",
    titel: "Leben wir im Kapitalismus oder in einer sozialen Marktwirtschaft? Dossier Wirtschaftspolitik, Bonn.",
    url: "https://www.bpb.de/themen/wirtschaft/wirtschaftspolitik/557079/leben-wir-im-kapitalismus-oder-in-einer-sozialen-marktwirtschaft/",
    zeit: "19:30",
  },
  {
    autor: "Bundeszentrale für politische Bildung (Hrsg.)",
    titel: "Kapitalismus. In: Das junge Politik-Lexikon, Bonn.",
    url: "https://www.bpb.de/kurz-knapp/lexika/das-junge-politik-lexikon/320595/kapitalismus/",
    zeit: "19:38",
  },
];

const kapitalismus = [
  ...titleBlock(
    "IDEOLOGIE: KAPITALISMUS",
    "Informationsblatt (Gruppenabgabe) · Namen: ______________________  /  ______________________ · Fach: Gemeinschaftskunde · Klasse: ________ · Datum: 23.08.2026"
  ),
  infoBox(
    "Kurzdefinition:",
    "Kapitalismus ist eine Wirtschafts- und Gesellschaftsordnung, in der das private Eigentum an den Produktionsmitteln, das Prinzip der Gewinnmaximierung und die Steuerung der Wirtschaft über den Markt typisch sind [1]."
  ),
  sectionHeading("1  Grundanalyse des Kernkonzepts"),
  analysisTable([
    [
      "Grundannahme",
      "Wohlstand entsteht am besten, wenn Einzelne frei über ihr Eigentum verfügen und auf Märkten tauschen. Angebot und Nachfrage bestimmen Markt und Produktion. Der Staat greift wenig oder gar nicht in das Wirtschaftsgeschehen ein, schützt aber das Privateigentum und die Unternehmer [3]. Das Individuum gilt als eigenverantwortlich und frei in Berufs- und Vertragswahl.",
    ],
    [
      "Rolle des Eigentums",
      "Das Privateigentum an den Produktionsmitteln (Fabrikhallen, Maschinen, Anlagen) ist das Kernmerkmal. Kapitalbesitz ist die Voraussetzung für die Verfügungsgewalt über die Produktionsmittel und schließt das Weisungsrecht über die Arbeitskraft der abhängig Beschäftigten ein. Historisch war die Masse der Arbeiter besitzlos und von wenigen Kapitalbesitzern wirtschaftlich abhängig [1].",
    ],
    [
      "Ziele der gesellschaftlichen Ordnung",
      "Effizienz, Wachstum, Innovation und steigender Wohlstand durch Wettbewerb. Ziel ist nicht die Gleichheit der Ergebnisse, sondern Entscheidungsfreiheit und die Belohnung von Leistung, Investition und Risiko. Knappe Güter sollen über Preise verteilt werden statt über staatliche Planung.",
    ],
    [
      "Sicht auf menschliches Handeln",
      "Der Mensch handelt überwiegend rational und interessenorientiert und reagiert auf Anreize wie Preis, Gewinn und Konkurrenz. Eigennutz gilt nicht als Fehler, sondern als Antrieb, der über den Wettbewerb in gesellschaftlichen Nutzen umgewandelt werden soll.",
    ],
  ]),
  sectionHeading("2  Zentrale Werte nach Priorität"),
  numbered(1, "Privateigentum und Vertragsfreiheit – ", "die Grundlage, ohne die das ganze System nicht funktioniert."),
  numbered(2, "Wirtschaftliche Freiheit und Wettbewerb – ", "möglichst wenige staatliche Eingriffe in Preise und Produktion."),
  numbered(3, "Leistungsgerechtigkeit – ", "wer mehr leistet oder mehr Risiko trägt, soll auch mehr bekommen."),
  numbered(4, "Effizienz, Wachstum und Innovation – ", "Fortschritt als Ergebnis von Konkurrenzdruck."),
  numbered(5, "Rechtssicherheit – ", "Verträge und Eigentum müssen staatlich geschützt sein."),
  new Paragraph({
    spacing: { before: 40, after: 40, line: 230 },
    children: [
      run("Begründung der Reihenfolge: ", { bold: true, size: 18 }),
      run(
        "Eigentum und Vertragsfreiheit stehen oben, weil Wettbewerb, Leistungsanreize und Wachstum erst daraus entstehen. Rechtssicherheit steht am Ende, ist aber die stille Voraussetzung für alles davor.",
        { size: 18 }
      ),
    ],
  }),
  new Paragraph({
    spacing: { after: 40, line: 230 },
    shading: { type: ShadingType.CLEAR, fill: GREY },
    children: [
      run(" Gegensätze: ", { bold: true, size: 18 }),
      run(
        "Freiheit ↔ Gleichheit · Markt ↔ staatliche Steuerung · Leistungsgerechtigkeit ↔ Verteilungsgerechtigkeit · Wachstum ↔ Nachhaltigkeit",
        { size: 18 }
      ),
    ],
  }),
  sectionHeading("3  Die drei Kernmerkmale und wie der Markt steuert"),
  statBoxes([
    { value: "Privateigentum", label: "an den Produktionsmitteln: Fabrikhallen, Maschinen, Anlagen [1]" },
    { value: "Gewinnmaximierung", label: "als leitendes Handlungsprinzip der Eigentümer [1]" },
    { value: "Markt", label: "als Steuerungsmechanismus über Angebot und Nachfrage [1]" },
  ]),
  spacer(80),
  diagramBox(
    "So steuert der Markt (vereinfachtes Schema)",
    "Gut wird knapp  →  Preis steigt  →  Produktion lohnt sich  →  Angebot steigt  →  Konkurrenz  →  Preis sinkt",
    "Ergebnis: Es wird ohne staatlichen Plan produziert, was nachgefragt wird. Das funktioniert aber nur, solange echter Wettbewerb besteht und niemand den Markt beherrscht.",
  ),

  sectionHeading("4  Historische Phasen"),
  timeline([
    ["ausgeh. 16. – Anf. 18. Jh.", "Frühkapitalismus: erste Formen kapitalistischen Wirtschaftens noch vor der Industrialisierung [1] [2]."],
    ["ind. Revolution – ca. 1870", "Hochkapitalismus: Fabriksystem, kaum Regulierung (Manchesterkapitalismus), große soziale Not [1] [2]."],
    ["ab ca. 1. Weltkrieg", "Spätkapitalismus: Der Staat greift stärker ein, Sozial- und Wirtschaftsgesetze entstehen [1]."],
    ["ab 20. Jahrhundert", "Die Wirtschaftsordnungen westlicher Industriestaaten werden reformiert; Gewerkschaften vertreten die Arbeitnehmerinteressen [3]."],
    ["nach 1945", "Soziale Marktwirtschaft in der Bundesrepublik: Markt mit staatlichem Rahmen und Sozialpartnerschaft [2]."],
  ]),

  sectionHeading("5  Spielarten des Kapitalismus – „den“ Kapitalismus gibt es nicht"),
  gridTable(
    ["Ausprägung", "Merkmale", "Rolle des Staates"],
    [
      ["Manchesterkapitalismus", "Weitgehend unreguliert, während der industriellen Revolution in Großbritannien.", "sehr gering"],
      ["Raubkapitalismus", "Russland nach dem Zusammenbruch des real existierenden Sozialismus in den 1990er-Jahren.", "schwach, kaum durchsetzungsfähig"],
      ["Soziale Marktwirtschaft", "Auch „rheinischer Kapitalismus“; Markt plus Sozialstaat, Tarifpartner und Mitbestimmung.", "setzt und kontrolliert den Rahmen"],
      ["Skandinavische Wohlfahrtsstaaten", "Marktwirtschaft mit sehr stark ausgebautem Sozialstaat, frühes 21. Jahrhundert.", "sehr aktiv, hohe Umverteilung"],
    ],
    [2400, 5500, 2300]
  ),
  new Paragraph({
    spacing: { before: 60, after: 40, line: 220 },
    children: [
      run("Wichtig: ", { bold: true, size: 17 }),
      run(
        "Die soziale Marktwirtschaft ist eine Unterausprägung des Kapitalismus und kein Gegenmodell. Die bpb vergleicht das mit Hunderassen: Der Kapitalismus ist die ganze Familie, die soziale Marktwirtschaft eine Rasse darin [2].",
        { size: 17 }
      ),
    ],
  }),

  sectionHeading("6  Typische Forderungen und Praxisbezug"),
  bullet(
    "Forderungen der Marktbefürworter: Schutz des Eigentums, freier Wettbewerb, niedrige Steuern und Abgaben, wenig Bürokratie, flexible Arbeitsmärkte und offene Märkte für Handel.",
    { size: 18 }
  ),
  bullet(
    "Forderungen der Gegenseite: Mitbestimmung, Tarifbindung, höhere Löhne, stärkere Umverteilung und verbindliche Umwelt- und Sozialstandards.",
    { size: 18 }
  ),
  bullet(
    "Seit Ende des 19. Jahrhunderts wurde die Wirtschaftsordnung durch zahlreiche Sozial- und Wirtschaftsgesetze reformiert; starke Gewerkschaften sorgten für einen Kräfteausgleich zwischen Arbeitgebern und Arbeitnehmern [1].",
    { size: 18 }
  ),
  bullet(
    "Deshalb beschreibt der Begriff „Kapitalismus“ in seiner reinen Form die heutige Wirtschaftsordnung westlicher Industrieländer nicht mehr richtig; meistens wird von „Marktwirtschaft“ gesprochen [1] [3].",
    { size: 18 }
  ),
  bullet(
    "Bezug zum Ausbildungsbetrieb: Tarifvertrag, Mindestlohn, Betriebsrat, Sozialversicherung und Kündigungsschutz sind genau die Regeln, die den Markt sozial einrahmen – hier wird die Ideologie im Alltag konkret.",
    { size: 18 }
  ),
  bullet(
    "Aktuelle Streitpunkte: Vermögensverteilung, Lohnentwicklung, Bürokratieabbau, Klimaschutz und Verantwortung in globalen Lieferketten.",
    { size: 18 }
  ),

  sectionHeading("7  Definition im Zitat und häufige Missverständnisse"),
  quoteBox(
    "der unter den Produktions- und Arbeitsbedingungen des ausgehenden 18. Jahrhunderts und des beginnenden 19. Jahrhunderts geprägte Begriff für eine Wirtschafts- und Gesellschaftsordnung, in der das private Eigentum an den Produktionsmitteln (Fabrikhallen, Maschinen, Anlagen), das Prinzip der Gewinnmaximierung und die Steuerung der Wirtschaft über den Markt typisch ist.",
    "Duden Wirtschaft von A bis Z, Lizenzausgabe der bpb – zitiert nach [1]"
  ),
  spacer(60),
  gridTable(
    ["Häufiges Missverständnis", "Richtigstellung"],
    [
      [
        "„Soziale Marktwirtschaft ist das Gegenteil von Kapitalismus.“",
        "Falsch. Sie ist eine Unterausprägung des Kapitalismus, also eine Spielart innerhalb derselben Familie [2].",
      ],
      [
        "„Kapitalismus heißt, dass der Staat gar nichts regelt.“",
        "Falsch. Der Staat schützt das Privateigentum und die Unternehmer – ohne Rechtsordnung funktioniert kein Markt [3].",
      ],
      [
        "„Wir leben heute im reinen Kapitalismus.“",
        "Falsch. Die reine Ausprägung gilt als überholt; für die heutige Ordnung passt der Begriff „Marktwirtschaft“ besser [1].",
      ],
    ],
    [3900, 6300]
  ),

  sectionHeading("8  Kritik und Grenzen"),
  bullet(
    "Karl Marx kritisierte die Verhältnisse seiner Zeit scharf. Die bpb weist jedoch darauf hin, dass die damaligen Bedingungen mit einer heutigen, an demokratischen und rechtsstaatlichen Werten orientierten Ordnung nicht vergleichbar sind [1].",
    { size: 18 }
  ),
  bullet(
    "Strukturelles Machtgefälle: Kapitalbesitz begründet die Verfügungsgewalt über die Produktionsmittel und das Weisungsrecht über die Arbeitskraft [1].",
    { size: 18 }
  ),
  bullet(
    "Umwelt- und Folgekosten tauchen im Preis nur auf, wenn der Staat sie einpreist – der Markt allein rechnet Nachhaltigkeit nicht mit.",
    { size: 18 }
  ),

  sectionHeading("9  Kurze Bewertung und Hinweise für den Leser"),
  bullet(
    "Der Kapitalismus ist wirtschaftlich sehr leistungsfähig: Wettbewerb und Gewinnaussicht erzeugen Innovation und haben in den Industrieländern breiten Wohlstand ermöglicht [1].",
    { size: 18 }
  ),
  bullet(
    "Ohne Regeln entstehen aber Machtungleichgewichte, ungleiche Vermögensverteilung und Umweltkosten, die niemand direkt bezahlt.",
    { size: 18 }
  ),
  bullet(
    "Empfehlung: Die Frage lautet nicht „Markt oder Staat“, sondern „Markt mit welchem Rahmen“. Die soziale Marktwirtschaft ist der praktikable Kompromiss.",
    { size: 18 }
  ),
  bullet(
    "Weiterführende Frage: Wie viel Regulierung verträgt ein Markt, bevor die Leistungsanreize verloren gehen?",
    { size: 18 }
  ),
  ...sourceList(quellenKapitalismus),
];

/* ------------------------------------------------------------------ */
/* 3) INDIVIDUELLE BEWERTUNG                                           */
/* ------------------------------------------------------------------ */

function beHeading(text) {
  return new Paragraph({
    spacing: { before: 180, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: ACCENT } },
    children: [run(text, { bold: true, size: 22, color: ACCENT })],
  });
}

function beSub(text) {
  return new Paragraph({
    spacing: { before: 100, after: 40 },
    children: [run(text, { bold: true, size: 20 })],
  });
}

function beText(text) {
  return new Paragraph({
    spacing: { after: 80, line: 260 },
    alignment: AlignmentType.JUSTIFIED,
    children: [run(text, { size: 20 })],
  });
}

const quellenBewertung = [
  quellenIslamismus[0],
  quellenIslamismus[1],
  quellenKapitalismus[0],
];

const bewertung = [
  ...titleBlock(
    "BEWERTUNG ZWEIER IDEOLOGIEN: ISLAMISMUS UND KAPITALISMUS",
    "Individuelle Bewertung (freiwillige Abgabe mit Benotung) · Name: ______________________ · Fach: Gemeinschaftskunde · Klasse: ________ · Datum: 23.08.2026"
  ),

  beHeading("1  Einleitung"),
  beText(
    "In diesem Text bewerte ich die beiden Ideologien, die ich bearbeitet habe: den Islamismus und den Kapitalismus. Beide sind auf den ersten Blick kaum vergleichbar, weil die eine Ideologie religiös begründet ist und die andere wirtschaftlich. Genau deshalb finde ich den Vergleich aber interessant: Beide machen eine sehr klare Aussage darüber, was den Menschen antreibt und wer in einer Gesellschaft das Sagen haben soll. Ich bewerte sie nach ihrem Menschenbild, ihrer inneren Widerspruchsfreiheit, ihrer Umsetzbarkeit und danach, wie sie mit Freiheit, Gerechtigkeit und Menschenrechten umgehen."
  ),

  beHeading("2  Bewertung des Islamismus"),
  beSub("Menschenbild und innere Logik"),
  beText(
    "Der Islamismus geht davon aus, dass es eine gottgewollte Ordnung gibt, die über allen von Menschen gemachten Regeln steht. Der Mensch wird dabei nicht als selbstbestimmtes Individuum gesehen, sondern als Gläubiger, der sich einer feststehenden Norm unterordnen soll. Innerhalb dieser Annahme ist die Ideologie durchaus logisch aufgebaut: Wenn Gottes Wille über dem Mehrheitswillen steht, dann folgt daraus zwangsläufig, dass Wahlen, Parlamente und Grundrechte nur noch zweitrangig sind. Der entscheidende Widerspruch liegt aber genau davor: Die Auslegung dieser angeblich absoluten Ordnung wird von Menschen vorgenommen. Die Bundeszentrale für politische Bildung weist darauf hin, dass islamistische Strömungen sich in ihren Zielen und Mitteln stark unterscheiden, weil sie die Scharia unterschiedlich interpretieren. Eine Ordnung, die für sich beansprucht, eindeutig und göttlich zu sein, ist in der Praxis also uneindeutig und menschlich gedeutet. Das halte ich für die größte innere Schwäche."
  ),
  beSub("Attraktivität und historische Prägung"),
  beText(
    "Attraktiv ist der Islamismus vor allem für Menschen, die sich benachteiligt, entwurzelt oder nicht anerkannt fühlen, weil er einfache Antworten, eine klare Identität und ein starkes Gemeinschaftsgefühl bietet. Historisch wurde die Bewegung durch Kolonialerfahrung, gescheiterte Modernisierungsversuche und autoritäre Regierungen in der islamischen Welt geprägt; die organisatorische Wurzel liegt in der 1928 in Ägypten gegründeten Muslimbruderschaft. Man versteht die Ideologie also besser, wenn man sie als Reaktion auf erlebte Demütigung und Ohnmacht liest. Erklären heißt für mich aber nicht rechtfertigen."
  ),
  beSub("Freiheit, Minderheiten und Menschenrechte"),
  beText(
    "Hier fällt mein Urteil eindeutig aus. Der Islamismus beschränkt individuelle Freiheiten massiv, weil religiöse Regeln bis ins Privatleben hineinreichen sollen. Minderheiten, Andersgläubige, Frauen und queere Menschen werden nicht gleichberechtigt behandelt, sondern in eine feste Ordnung eingeordnet. Das Bundesamt für Verfassungsschutz stuft den Islamismus deshalb als Form des politischen Extremismus ein, die auf die teilweise oder vollständige Abschaffung der freiheitlichen demokratischen Grundordnung zielt. Mit den Menschenrechten ist diese Ideologie damit nicht vereinbar. Wirtschaftlich ist sie außerdem kein Problemlöser: Sie liefert religiöse Rahmenregeln, aber kein tragfähiges Konzept für Produktivität, Beschäftigung oder Wohlstand."
  ),
  beSub("Stärken, Schwächen und Realisierbarkeit"),
  beText(
    "Als Stärke sehe ich nur die soziale Bindungskraft: Islamistische Gruppen sind oft in Sozialarbeit und Nachbarschaftshilfe aktiv und schaffen dadurch Zusammenhalt. Die Schwächen überwiegen jedoch deutlich – Ablehnung von Pluralismus, fehlende Kontrolle der Macht und die Gefahr von Gewalt bis hin zum Terrorismus. Realistisch umsetzbar ist das Modell in einer vielfältigen Gesellschaft nicht, ohne dass ein Teil der Bevölkerung dauerhaft unterdrückt wird. Wichtig ist mir zum Schluss die klare Trennung: Der Islam ist eine Weltreligion, die von Millionen Menschen friedlich gelebt wird. Der Islamismus ist eine politische Ideologie, die diese Religion für Machtansprüche nutzt. Wer beides gleichsetzt, macht einen sachlichen Fehler und trifft die Falschen."
  ),

  beHeading("3  Bewertung des Kapitalismus"),
  beSub("Menschenbild und innere Logik"),
  beText(
    "Der Kapitalismus unterstellt einen Menschen, der überwiegend rational entscheidet, seinen eigenen Nutzen sucht und auf Anreize wie Preis, Gewinn und Konkurrenz reagiert. Eigennutz gilt hier nicht als moralischer Makel, sondern als Motor. Diese Logik ist in sich stimmig und funktioniert erstaunlich gut, solange Wettbewerb tatsächlich vorhanden ist. Schwächer wird sie dort, wo Menschen eben nicht rational handeln, wo Informationen fehlen oder wo Monopole entstehen. Ein weiterer Widerspruch fällt mir auf: Der Kapitalismus verspricht Leistungsgerechtigkeit, gleichzeitig entscheidet aber häufig das geerbte Startkapital darüber, wer überhaupt am Wettbewerb teilnehmen kann. Frei nach dem eigenen Anspruch müsste die Startlinie für alle gleich sein – das ist sie nicht."
  ),
  beSub("Produktivität, Gerechtigkeit und Nachhaltigkeit"),
  beText(
    "Als Problemlöser ist der Kapitalismus stark: Er erzeugt Innovation, verteilt knappe Güter über Preise und hat in den Industrieländern breiten Wohlstand ermöglicht. Bei der Gerechtigkeit sieht es gemischter aus. Wer Kapital, Bildung oder Gesundheit mitbringt, profitiert deutlich mehr als jemand ohne diese Voraussetzungen. Die Bundeszentrale für politische Bildung beschreibt, dass im Kapitalismus der Kapitalbesitz die Verfügungsgewalt über die Produktionsmittel und das Weisungsrecht über die Arbeitskraft der Beschäftigten begründet – dieses Machtgefälle ist Teil des Systems und verschwindet nicht von allein. Bei der Nachhaltigkeit sehe ich die größte Lücke: Ein System, das auf Wachstum und kurzfristigen Gewinn ausgerichtet ist, rechnet Umweltschäden nur dann ein, wenn der Staat sie einpreist."
  ),
  beSub("Freiheit, Minderheiten und Realisierbarkeit"),
  beText(
    "Individuelle Freiheiten schützt der Kapitalismus grundsätzlich, weil Eigentum, Vertragsfreiheit und Berufswahl zu seinen Grundlagen gehören. Diese Freiheit ist allerdings ungleich verteilt: Sie nützt vor allem denen, die etwas zu verhandeln haben. Gegenüber Minderheiten ist der Markt zunächst neutral, weil ihn nur die Zahlungsfähigkeit interessiert, aber er sorgt eben auch nicht aktiv für Inklusion. Realistisch ist das Modell auf jeden Fall – anders als der reine Islamismus wird es weltweit praktiziert. Wichtig ist mir dabei die Erkenntnis aus meiner Recherche, dass es „den“ Kapitalismus nicht gibt: Vom unregulierten Manchesterkapitalismus bis zum skandinavischen Wohlfahrtsstaat gehört alles dazu, und auch die deutsche soziale Marktwirtschaft ist eine Unterform des Kapitalismus und kein Gegenentwurf."
  ),
  beSub("Stärken und Schwächen"),
  beText(
    "Stärken: hohe Produktivität, Innovationskraft, Wahlfreiheit und Anpassungsfähigkeit. Schwächen: Ungleichheit, Machtkonzentration, Krisenanfälligkeit und fehlende Rücksicht auf Umwelt und Zukunft. Mein Urteil: Der Kapitalismus ist ein gutes Werkzeug, aber kein gutes Ziel. Er braucht einen klaren staatlichen Rahmen – Tarifverträge, Mindestlohn, Mitbestimmung, Sozialversicherung und Umweltauflagen sind genau dieser Rahmen und wirken im Betrieb ganz konkret."
  ),

  beHeading("4  Vergleich der beiden Ideologien"),
  beSub("Gemeinsamkeiten"),
  beText(
    "Beide Ideologien haben einen umfassenden Anspruch: Sie erklären nicht nur einen Teilbereich, sondern wollen prägen, wie Menschen leben, arbeiten und entscheiden. Beide erzeugen zudem klare Hierarchien – im Islamismus über religiöse Autorität, im Kapitalismus über Kapitalbesitz. Und beide setzen auf eine feste Annahme über den Menschen, die in der Realität nicht immer zutrifft: hier der gehorsame Gläubige, dort der rationale Nutzenmaximierer."
  ),
  beSub("Unterschiede"),
  beText(
    "Der wichtigste Unterschied liegt in der Legitimation und in der Offenheit für Kritik. Der Islamismus begründet seine Ordnung religiös und absolut; Widerspruch ist damit im Kern nicht vorgesehen. Der Kapitalismus begründet seine Ordnung funktional über Effizienz und ist reformierbar – genau das zeigt die Entwicklung zur sozialen Marktwirtschaft durch Sozialgesetze und starke Gewerkschaften. Außerdem stellt der Islamismus die Gemeinschaft über den Einzelnen, während der Kapitalismus den Einzelnen über die Gemeinschaft stellt."
  ),

  beHeading("5  Fazit"),
  beText(
    "Für mich fällt das Ergebnis unterschiedlich deutlich aus. Den Islamismus lehne ich ab, weil er Volkssouveränität, Pluralismus und Menschenrechte grundsätzlich ausschließt und damit keine Ordnung anbietet, in der Menschen mit verschiedenen Überzeugungen gleichberechtigt leben können. Den Kapitalismus bewerte ich kritisch, aber nicht ablehnend: Er ist wirtschaftlich leistungsfähig und lernfähig, produziert jedoch von sich aus Ungleichheit und Umweltkosten. Der entscheidende Unterschied ist die Reformierbarkeit. Eine Ideologie, die Kritik aushält und sich korrigieren lässt, ist einer Ideologie überlegen, die Kritik als Angriff auf eine göttliche Wahrheit versteht. Genau deshalb halte ich eine demokratisch eingerahmte Marktwirtschaft für das tragfähigere Modell – nicht weil sie perfekt wäre, sondern weil sie verbesserbar bleibt."
  ),

  ...sourceList(quellenBewertung),

  new Paragraph({
    spacing: { before: 200, after: 60 },
    border: { top: { style: BorderStyle.SINGLE, size: 6, color: ACCENT } },
    children: [run("Hinweis zur Nutzung von KI (auszufüllen)", { bold: true, size: 18, color: ACCENT })],
  }),
  new Paragraph({
    spacing: { after: 60, line: 230 },
    children: [
      run(
        "Laut Aufgabenstellung müssen KI-Quellen mit vollständigem Prompt und vollständiger KI-Antwort angegeben werden. Falls für diese Abgabe ein KI-Werkzeug genutzt wurde, sind Werkzeug, Datum, Prompt und Antwort hier bzw. im Anhang vollständig zu dokumentieren:",
        { size: 17 }
      ),
    ],
  }),
  new Paragraph({ spacing: { after: 40 }, children: [run("Werkzeug / Modell: ______________________________     Datum: ______________", { size: 17 })] }),
  new Paragraph({ spacing: { after: 40 }, children: [run("Verwendeter Prompt: ______________________________________________________________", { size: 17 })] }),
  new Paragraph({ spacing: { after: 40 }, children: [run("Vollständige KI-Antwort: siehe Anhang, Seite ______", { size: 17 })] }),
];

/* ------------------------------------------------------------------ */

async function main() {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const jobs = [
    ["Islamismus.docx", makeDoc(islamismus, 13, "Informationsblatt Islamismus")],
    ["Kapitalismus.docx", makeDoc(kapitalismus, 13, "Informationsblatt Kapitalismus")],
    ["Bewertung_Islamismus_Kapitalismus.docx", makeDoc(bewertung, 20, "Bewertung: Islamismus und Kapitalismus")],
  ];
  for (const [name, doc] of jobs) {
    const buf = await Packer.toBuffer(doc);
    fs.writeFileSync(path.join(OUT_DIR, name), buf);
    console.log(`OK  ${name}  (${Math.round(buf.length / 1024)} KB)`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
