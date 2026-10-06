const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

async function createPresentation() {
    const pres = new pptxgen();
    pres.layout = 'LAYOUT_16x9'; // 16:9 widescreen (10" x 5.625")
    pres.author = 'Another Great Solution GmbH (Team Der Dreier)';
    pres.company = 'Another Great Solution GmbH';
    pres.title = 'Smart Restaurant - IHK Projektpräsentation';
    pres.subject = 'Digitales Bestell- und Verwaltungssystem';

    // Corporate Color Palette
    const NAVY = '0D2B45';
    const TEAL = '208B80';
    const LIGHT_BG = 'F8FAFC';
    const CARD_BG = 'FFFFFF';
    const TEXT_MAIN = '1E293B';
    const TEXT_MUTED = '64748B';
    const ACCENT_GOLD = 'D97706';
    const BORDER_COLOR = 'CBD5E1';
    const GREEN = '16A34A';
    const RED = 'DC2626';
    const BLUE_BG = 'F0F7FF';
    const TOTAL_SLIDES = 14;

    // Helper: Standard Slide Chrome (Header, Category Badge, Footer with Page Number - NO speaker labels)
    function addSlideChrome(slide, slideNum, title, category) {
        // Top accent line
        slide.addShape(pres.shapes.RECTANGLE, {
            x: 0, y: 0, w: '100%', h: 0.1,
            fill: { color: NAVY }
        });

        // Category Badge
        slide.addText(category.toUpperCase(), {
            x: 0.8, y: 0.22, w: 6.0, h: 0.28,
            fontSize: 9.5, bold: true, color: TEAL, fontFace: 'Segoe UI'
        });

        // Slide Title
        slide.addText(title, {
            x: 0.8, y: 0.48, w: 8.4, h: 0.45,
            fontSize: 19, bold: true, color: NAVY, fontFace: 'Segoe UI'
        });

        // Header separator line
        slide.addShape(pres.shapes.LINE, {
            x: 0.8, y: 0.98, w: 8.4, h: 0,
            line: { color: BORDER_COLOR, width: 0.75 }
        });

        // Footer separator line
        slide.addShape(pres.shapes.LINE, {
            x: 0.8, y: 5.15, w: 8.4, h: 0,
            line: { color: BORDER_COLOR, width: 0.75 }
        });

        // Footer left: Project name
        slide.addText('Smart Restaurant – Digitales Bestell- und Verwaltungssystem  |  IHK-Projektpräsentation', {
            x: 0.8, y: 5.2, w: 6.5, h: 0.35,
            fontSize: 9, color: TEXT_MUTED, fontFace: 'Segoe UI'
        });

        // Footer right: Explicit Page Number
        slide.addText(`Seite ${slideNum} / ${TOTAL_SLIDES}`, {
            x: 7.7, y: 5.2, w: 1.5, h: 0.35,
            fontSize: 9, bold: true, color: TEXT_MUTED, fontFace: 'Segoe UI', align: 'right'
        });

        slide.slideNumber = { x: 8.8, y: 5.2, color: TEXT_MUTED, fontSize: 9, fontFace: 'Segoe UI' };
    }

    // Helper: IDE Code Box with Mac/IDE Header & Syntax Highlighting
    function addCodeBox(slide, x, y, w, h, filename, codeTokens) {
        // Container
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x, y, w, h,
            fill: { color: '0F172A' }, line: { color: '334155', width: 1 }
        });

        // Header bar
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x, y, w, h: 0.35,
            fill: { color: '1E293B' }, line: { color: '334155', width: 0 }
        });

        // 3 Mac Window Dots
        slide.addShape(pres.shapes.OVAL, { x: x + 0.12, y: y + 0.12, w: 0.11, h: 0.11, fill: { color: 'EF4444' } });
        slide.addShape(pres.shapes.OVAL, { x: x + 0.28, y: y + 0.12, w: 0.11, h: 0.11, fill: { color: 'F59E0B' } });
        slide.addShape(pres.shapes.OVAL, { x: x + 0.44, y: y + 0.12, w: 0.11, h: 0.11, fill: { color: '10B981' } });

        // Filename
        slide.addText(filename, {
            x: x + 0.65, y: y + 0.06, w: w - 0.75, h: 0.22,
            fontSize: 8.5, fontFace: 'Consolas', color: '94A3B8', valign: 'middle'
        });

        // Code content: Explicit top alignment, zero margin, no auto-wrap
        slide.addText(codeTokens, {
            x: x + 0.18, y: y + 0.44, w: w - 0.36, h: h - 0.52,
            fontFace: 'Consolas', fontSize: 7.5, lineSpacingMultiple: 1.15,
            valign: 'top', margin: 0, wrap: false
        });
    }

    // -------------------------------------------------------------
    // SLIDE 1: TITELFOLIE (OHNE SPRECHERLISTE)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: NAVY };

        // Decorative background geometric column
        slide.addShape(pres.shapes.RECTANGLE, {
            x: 7.0, y: 0, w: 3.0, h: 5.625,
            fill: { color: '143859' }, line: { color: '143859' }
        });

        slide.addText('IHK-PROJEKTPRÄSENTATION  |  20 MINUTEN', {
            x: 0.8, y: 0.9, w: 6.0, h: 0.4,
            fontSize: 12, bold: true, color: '38BDF8', fontFace: 'Segoe UI'
        });

        slide.addText('Smart Restaurant', {
            x: 0.8, y: 1.35, w: 6.0, h: 0.85,
            fontSize: 36, bold: true, color: 'FFFFFF', fontFace: 'Segoe UI'
        });

        slide.addText('Digitales Bestell- und Verwaltungssystem für eine Gaststätte', {
            x: 0.8, y: 2.25, w: 5.8, h: 0.45,
            fontSize: 14.5, bold: true, color: '94A3B8', fontFace: 'Segoe UI'
        });

        slide.addText('Konzeption  •  UML-Prozessanalyse  •  3NF-Datenbank  •  Java 17 & JDBC  •  ISMS (ISO 27001)', {
            x: 0.8, y: 2.7, w: 5.8, h: 0.4,
            fontSize: 10.5, color: 'CBD5E1', fontFace: 'Segoe UI'
        });

        // 3 Key Stats Chips
        const stats = [
            { label: 'PROJEKTAUWAND', val: '320 Std.' },
            { label: 'ENTWICKLUNGSDAUER', val: '10 Tage' },
            { label: 'QUALITÄTSQUOTE', val: '100 % Tests' }
        ];
        stats.forEach((st, idx) => {
            const xPos = 0.8 + idx * 1.95;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: xPos, y: 3.35, w: 1.8, h: 0.95,
                fill: { color: '0A2136' }, line: { color: TEAL, width: 1.2 }
            });
            slide.addText(st.label, {
                x: xPos, y: 3.45, w: 1.8, h: 0.25,
                fontSize: 8, bold: true, color: '38BDF8', fontFace: 'Segoe UI', align: 'center'
            });
            slide.addText(st.val, {
                x: xPos, y: 3.7, w: 1.8, h: 0.45,
                fontSize: 14, bold: true, color: 'FFFFFF', fontFace: 'Segoe UI', align: 'center'
            });
        });

        // Company Box
        slide.addText([
            { text: 'AUFTRAGNEHMER:\n', options: { bold: true, color: '38BDF8', fontSize: 10 } },
            { text: 'Another Great Solution GmbH\n(Projektteam „Der Dreier“)\n\n', options: { color: 'FFFFFF', fontSize: 11 } },
            { text: 'AUFTRAGGEBER:\n', options: { bold: true, color: '38BDF8', fontSize: 10 } },
            { text: 'Regionales Gastronomieunternehmen\n\n', options: { color: 'FFFFFF', fontSize: 11 } },
            { text: 'STATUS:\n', options: { bold: true, color: '38BDF8', fontSize: 10 } },
            { text: 'Vollständig implementiert & abgenommen', options: { color: '34D399', fontSize: 10.5, bold: true } }
        ], {
            x: 7.3, y: 1.3, w: 2.4, h: 3.5,
            fontFace: 'Segoe UI'
        });

        // Page number
        slide.addText(`Seite 1 / ${TOTAL_SLIDES}`, {
            x: 7.7, y: 5.2, w: 1.5, h: 0.35,
            fontSize: 9, bold: true, color: '64748B', fontFace: 'Segoe UI', align: 'right'
        });
    }

    // -------------------------------------------------------------
    // SLIDE 2: AGENDA (VISUELL, TEXTARM, OHNE SPRECHER)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 2, 'Agenda & Gliederung', 'Überblick');

        const agendaBlocks = [
            {
                num: '01',
                title: 'Projektrahmen & Wirtschaftlichkeit',
                time: 'ca. 6 Minuten',
                color: NAVY,
                items: ['IST-Zustand vs. SOLL-Konzept', 'Make-or-Buy-Entscheidung', 'Phasen- & Ressourcenplanung', 'Vollständige Kalkulation (320h)']
            },
            {
                num: '02',
                title: 'Architektur & Implementierung',
                time: 'ca. 7 Minuten',
                color: TEAL,
                items: ['Prozess-Routing & Statuslogik', 'Datenbankmodellierung (3NF)', 'Transaktionen (ACID) & DAO', 'GUI-Design & Usability (ISO 9241)']
            },
            {
                num: '03',
                title: 'Qualitätssicherung & Projektabschluss',
                time: 'ca. 7 Minuten',
                color: '334155',
                items: ['Automatisierte Testsuite (Java)', 'ISMS & Security (ISO/IEC 27001)', 'Soll-Ist-Vergleich (Scope & Budget)', 'Lessons Learned & Ausblick']
            }
        ];

        agendaBlocks.forEach((b, idx) => {
            const xPos = 0.8 + idx * 2.85;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: xPos, y: 1.3, w: 2.7, h: 3.6,
                fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 }
            });

            // Card Header
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: xPos, y: 1.3, w: 2.7, h: 0.7,
                fill: { color: b.color }, line: { color: b.color, width: 0 }
            });

            slide.addText(b.num, {
                x: xPos + 0.15, y: 1.35, w: 0.7, h: 0.55,
                fontSize: 20, bold: true, color: 'FFFFFF', fontFace: 'Segoe UI'
            });
            slide.addText(b.time, {
                x: xPos + 1.1, y: 1.48, w: 1.45, h: 0.3,
                fontSize: 9, bold: true, color: 'CBD5E1', fontFace: 'Segoe UI', align: 'right'
            });

            slide.addText(b.title, {
                x: xPos + 0.15, y: 2.15, w: 2.4, h: 0.5,
                fontSize: 12, bold: true, color: NAVY, fontFace: 'Segoe UI'
            });

            // Clean bullet chips
            b.items.forEach((it, iIdx) => {
                const yChip = 2.75 + iIdx * 0.52;
                slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                    x: xPos + 0.15, y: yChip, w: 2.4, h: 0.42,
                    fill: { color: LIGHT_BG }, line: { color: BORDER_COLOR, width: 0.5 }
                });
                slide.addText(`▸ ${it}`, {
                    x: xPos + 0.22, y: yChip + 0.08, w: 2.25, h: 0.28,
                    fontSize: 9, bold: false, color: TEXT_MAIN, fontFace: 'Segoe UI'
                });
            });
        });
    }

    // -------------------------------------------------------------
    // SLIDE 3: IST-ZUSTAND VS. SOLL-KONZEPT (VISUELLER VERGLEICH)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 3, 'Ausgangslage: Problemstellung & Lösungsziel', 'Projektrahmen');

        // Left Box: IST (Pain points)
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.8, y: 1.3, w: 4.1, h: 3.65,
            fill: { color: CARD_BG }, line: { color: 'FCA5A5', width: 1.5 }
        });
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.8, y: 1.3, w: 4.1, h: 0.55,
            fill: { color: 'FEF2F2' }, line: { color: 'FCA5A5', width: 0 }
        });
        slide.addText('IST-ZUSTAND: Papiergebundene Risiken', {
            x: 1.0, y: 1.4, w: 3.7, h: 0.35,
            fontSize: 12, bold: true, color: RED, fontFace: 'Segoe UI'
        });

        const istItems = [
            { tag: 'LESEFEHLER', desc: 'Handschriftliche Bons unleserlich in Küche/Bar' },
            { tag: 'LAUFWEGE', desc: 'Servicekräfte pendeln manuell zwischen Gast & Küche' },
            { tag: 'VERZÖGERUNG', desc: 'Status der Zubereitung am Gasttisch unbekannt' },
            { tag: 'EINNAHMEVERLUST', desc: 'Verlorene Papierbons führen zu Abrechnungsfehlern' }
        ];

        istItems.forEach((item, idx) => {
            const yPos = 1.95 + idx * 0.72;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: 1.0, y: yPos, w: 1.1, h: 0.28,
                fill: { color: 'FEE2E2' }, line: { color: 'EF4444', width: 0.5 }
            });
            slide.addText(item.tag, {
                x: 1.0, y: yPos + 0.04, w: 1.1, h: 0.2,
                fontSize: 7.5, bold: true, color: RED, fontFace: 'Segoe UI', align: 'center'
            });
            slide.addText(item.desc, {
                x: 1.0, y: yPos + 0.32, w: 3.7, h: 0.35,
                fontSize: 9, color: TEXT_MAIN, fontFace: 'Segoe UI'
            });
        });

        // Right Box: SOLL (Target state)
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 5.1, y: 1.3, w: 4.1, h: 3.65,
            fill: { color: CARD_BG }, line: { color: '86EFAC', width: 1.5 }
        });
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 5.1, y: 1.3, w: 4.1, h: 0.55,
            fill: { color: 'F0FDF4' }, line: { color: '86EFAC', width: 0 }
        });
        slide.addText('SOLL-KONZEPT: Zentrales Smart Restaurant', {
            x: 5.3, y: 1.4, w: 3.7, h: 0.35,
            fontSize: 12, bold: true, color: GREEN, fontFace: 'Segoe UI'
        });

        const sollItems = [
            { tag: 'DIGITAL', desc: 'Strukturierte Bestellaufnahme direkt am Terminal' },
            { tag: 'ROUTING', desc: 'Automatisierte Trennung für Küche (Speisen) & Bar' },
            { tag: 'ECHTZEIT', desc: 'Live-Statusanzeige: OFFEN ➔ IN ARBEIT ➔ SERVIERT' },
            { tag: 'REVISION', desc: '100% protokollierte Buchungen & fehlerfreie Rechnung' }
        ];

        sollItems.forEach((item, idx) => {
            const yPos = 1.95 + idx * 0.72;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: 5.3, y: yPos, w: 1.1, h: 0.28,
                fill: { color: 'DCFCE7' }, line: { color: GREEN, width: 0.5 }
            });
            slide.addText(item.tag, {
                x: 5.3, y: yPos + 0.04, w: 1.1, h: 0.2,
                fontSize: 7.5, bold: true, color: GREEN, fontFace: 'Segoe UI', align: 'center'
            });
            slide.addText(item.desc, {
                x: 5.3, y: yPos + 0.32, w: 3.7, h: 0.35,
                fontSize: 9, color: TEXT_MAIN, fontFace: 'Segoe UI'
            });
        });
    }

    // -------------------------------------------------------------
    // SLIDE 4: STRATEGISCHE ENTSCHEIDUNG (MAKE OR BUY & TCO)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 4, 'Make-or-Buy & Betriebskosten-Vergleich (TCO)', 'Wirtschaftlichkeit');

        // Comparison Table
        const rows = [
            [
                { text: 'Entscheidungskriterium', options: { bold: true, fill: NAVY, color: 'FFFFFF' } },
                { text: 'Eigenentwicklung (Make)  [GEWÄHLT]', options: { bold: true, fill: TEAL, color: 'FFFFFF' } },
                { text: 'Branchen-SaaS (Buy)  [VERWORFEN]', options: { bold: true, fill: '64748B', color: 'FFFFFF' } }
            ],
            [
                { text: 'Prozessgenauigkeit', options: { bold: true } },
                { text: '✔  100 % passgenau auf Arbeitsabläufe zugeschnitten' },
                { text: '✖  Standardisiert; erfordert Anpassung des Betriebs' }
            ],
            [
                { text: 'Laufende Kosten p.a.\n(Energie & Lizenzen)', options: { bold: true } },
                { text: '✔  ca. 443 € / Jahr (ca. 203 € Strom Server/Terminals + 240 € Wartung)' },
                { text: '✖  ca. 2.244 € / Jahr (2.124 € Lizenz-Abo 3 Terminals + 120 € Strom)' }
            ],
            [
                { text: 'Kumulierte TCO (3 Jahre)', options: { bold: true } },
                { text: '✔  ca. 1.330 € laufend; Amortisation nach 18 Monaten' },
                { text: '✖  ca. 6.732 € kumulierte Abokosten (Vendor-Lock-in)' }
            ],
            [
                { text: 'Datensicherheit (DSGVO)', options: { bold: true } },
                { text: '✔  Volle Datenhoheit im lokalen Betriebsnetzwerk' },
                { text: '✖  Datenübertragung auf externe Cloud-Server' }
            ],
            [
                { text: 'Erweiterbarkeit', options: { bold: true } },
                { text: '✔  Offene Schnittstellen für TSE-Kassen & Handhelds' },
                { text: '✖  Abhängig vom Update-Zyklus des Drittanbieters' }
            ]
        ];

        slide.addTable(rows, {
            x: 0.8, y: 1.18, w: 8.4, h: 2.65,
            fontSize: 8.5, fontFace: 'Segoe UI',
            border: { color: BORDER_COLOR, width: 0.75 },
            margin: [3, 4, 3, 4]
        });

        // Bottom Result Box
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.8, y: 3.95, w: 8.4, h: 1.0,
            fill: { color: 'DCFCE7' }, line: { color: GREEN, width: 1.5 }
        });
        slide.addText('TCO-FAZIT: 1.801 € JÄHRLICHE BETRIEBSKOSTENERSPARNIS GEGENÜBER SAAS', {
            x: 1.0, y: 4.05, w: 8.0, h: 0.25,
            fontSize: 10.5, bold: true, color: '166534', fontFace: 'Segoe UI'
        });
        slide.addText('Trotz Initialaufwand amortisiert sich das System schnell: Niedrige Stromkosten (ca. 203 €/Jahr für Server & Terminals) und der Wegfall von monatlichen Lizenzgebühren sparen ab Jahr 4 über 1.800 € pro Jahr ein.', {
            x: 1.0, y: 4.33, w: 8.0, h: 0.52,
            fontSize: 8.5, color: TEXT_MAIN, fontFace: 'Segoe UI'
        });
    }

    // -------------------------------------------------------------
    // SLIDE 5: PROJEKTPLANUNG & KOSTENKALKULATION (METRIKEN & TABELLE)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 5, 'Ressourcen- & Angebotskalkulation', 'Wirtschaftlichkeit');

        // Phasenverteilung Left (Container x: 0.8, y: 1.18, w: 3.8, h: 3.8)
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.8, y: 1.18, w: 3.8, h: 3.8,
            fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 }
        });
        slide.addText('Phasenaufteilung (320 Stunden)', {
            x: 1.0, y: 1.28, w: 3.4, h: 0.28,
            fontSize: 11, bold: true, color: NAVY, fontFace: 'Segoe UI'
        });

        const phasenData = [
            ['Phase 1: Analyse & Anforderung', '5 %', '16 h'],
            ['Phase 2: Prozessplanung (UML)', '10 %', '32 h'],
            ['Phase 3: DB-Design (3NF)', '15 %', '48 h'],
            ['Phase 4: Java-Implementierung', '50 %', '160 h'],
            ['Phase 5: Qualitätssicherung & Test', '10 %', '32 h'],
            ['Phase 6: Dokumentation & ISMS', '10 %', '32 h']
        ];

        const pTable = [
            [{ text: 'Phase', options: { bold: true } }, { text: 'Anteil', options: { bold: true } }, { text: 'Aufwand', options: { bold: true } }],
            ...phasenData.map(p => [{ text: p[0] }, { text: p[1] }, { text: p[2] }])
        ];
        slide.addTable(pTable, {
            x: 0.9, y: 1.6, w: 3.6, h: 1.7,
            fontSize: 7.5, fontFace: 'Segoe UI',
            border: { color: BORDER_COLOR, width: 0.5 },
            margin: [1, 2, 1, 2]
        });

        // Detailed Sach- & Betriebskosten Box inside Left Container
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.9, y: 3.38, w: 3.6, h: 1.48,
            fill: { color: BLUE_BG }, line: { color: '38BDF8', width: 0.75 }
        });
        slide.addText('⚡ Sach- & Betriebskosten im Projekt (500 €)', {
            x: 1.0, y: 3.45, w: 3.4, h: 0.22,
            fontSize: 8.5, bold: true, color: NAVY, fontFace: 'Segoe UI'
        });
        slide.addText([
            { text: '• Stromkosten (4 PCs + Server): ', options: { bold: true } },
            { text: '64 kWh à 0,40 € ≈ 28 €\n' },
            { text: '• Hardware & Rechnerarbeitsplätze: ', options: { bold: true } },
            { text: '172 € (anteilig 10 Tage)\n' },
            { text: '• Lizenzen, Diagramm-Tools & Repo: ', options: { bold: true } },
            { text: '150 € + 50 € Ablage\n' },
            { text: '• Unvorhergesehenes & Puffer: ', options: { bold: true } },
            { text: '100 €\n' },
            { text: '• Gemeinkosten (2.980 €): ', options: { bold: true, color: TEAL } },
            { text: 'Raummiete, Heizung, Büro-Strom', options: { color: TEAL } }
        ], {
            x: 1.0, y: 3.68, w: 3.4, h: 1.12,
            fontSize: 7.2, color: TEXT_MAIN, fontFace: 'Segoe UI'
        });

        // Zuschlagskalkulation Right (Container x: 4.8, y: 1.18, w: 4.4, h: 3.8)
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 4.8, y: 1.18, w: 4.4, h: 3.8,
            fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 }
        });
        slide.addText('Kalkulationsschema (IHK-Zuschlagskalkulation)', {
            x: 5.0, y: 1.28, w: 4.0, h: 0.28,
            fontSize: 11, bold: true, color: NAVY, fontFace: 'Segoe UI'
        });

        const calcTable = [
            [{ text: 'Kostenposition', options: { bold: true } }, { text: 'Berechnungsgrundlage', options: { bold: true } }, { text: 'Betrag', options: { bold: true } }],
            [{ text: 'Personalkosten' }, { text: '320 h × 45,00 € Ø Stundensatz' }, { text: '14.400,00 €' }],
            [{ text: 'Sach- & Betriebskosten' }, { text: 'Inkl. Strom (28 €), Hardware & Tools' }, { text: '500,00 €' }],
            [{ text: 'Herstellkosten (HK)', options: { bold: true, fill: 'F1F5F9' } }, { text: 'Personal + Sachkosten', options: { fill: 'F1F5F9' } }, { text: '14.900,00 €', options: { bold: true, fill: 'F1F5F9' } }],
            [{ text: 'Gemeinkostenzuschlag' }, { text: '+ 20 % (inkl. Raum, Heizung, Energie)' }, { text: '2.980,00 €' }],
            [{ text: 'Selbstkosten (SK)', options: { bold: true, fill: 'F1F5F9' } }, { text: 'HK + Gemeinkosten', options: { fill: 'F1F5F9' } }, { text: '17.880,00 €', options: { bold: true, fill: 'F1F5F9' } }],
            [{ text: 'Gewinnzuschlag' }, { text: '+ 10 % auf Selbstkosten' }, { text: '1.788,00 €' }],
            [{ text: 'Angebotspreis (Netto)', options: { bold: true, fill: 'DCFCE7', color: GREEN } }, { text: 'Selbstkosten + Gewinn', options: { fill: 'DCFCE7' } }, { text: '19.668,00 €', options: { bold: true, fill: 'DCFCE7', color: GREEN } }],
            [{ text: 'Umsatzsteuer (19 %)' }, { text: 'Gesetzliche Mehrwertsteuer' }, { text: '3.736,92 €' }],
            [{ text: 'Angebotspreis (Brutto)', options: { bold: true, fill: 'E2E8F0' } }, { text: 'Gesamtangebot für Kunden', options: { fill: 'E2E8F0' } }, { text: '23.404,92 €', options: { bold: true, fill: 'E2E8F0' } }]
        ];
        slide.addTable(calcTable, {
            x: 4.9, y: 1.6, w: 4.2, h: 3.25,
            fontSize: 8, fontFace: 'Segoe UI',
            border: { color: BORDER_COLOR, width: 0.5 },
            margin: [2, 3, 2, 3]
        });
    }

    // -------------------------------------------------------------
    // SLIDE 6: GESCHÄFTSPROZESS: ABLAUF & QUELLCODE (STEPS + CODE)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 6, 'Geschäftsprozess: Ablauf & Routing-Logik', 'Entwurf & Implementierung');

        // Left: 4 Prozess-Etappen
        const steps = [
            { num: '01', title: 'Bestellaufnahme am Tisch', desc: 'Auswahl Tisch, Erfassung Speisen & Getränke, Status = "aufgegeben"' },
            { num: '02', title: 'Automatisches Routing & Status', desc: 'Trennung nach Kategorie: Küche (Speisen) vs. Bar (Getränke)' },
            { num: '03', title: 'Zubereitung & Quittierung', desc: 'Küche/Bar setzt Status: "in Bearbeitung" ➔ "fertig"' },
            { num: '04', title: 'Servieren & Abrechnung', desc: 'Service quittiert "serviert"; Tischabrechnung & Freigabe' }
        ];

        steps.forEach((s, idx) => {
            const yPos = 1.25 + idx * 0.92;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: 0.8, y: yPos, w: 4.15, h: 0.82,
                fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 }
            });
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: 0.8, y: yPos, w: 0.55, h: 0.82,
                fill: { color: TEAL }, line: { color: TEAL, width: 0 }
            });
            slide.addText(s.num, {
                x: 0.8, y: yPos + 0.22, w: 0.55, h: 0.35,
                fontSize: 12, bold: true, color: 'FFFFFF', fontFace: 'Segoe UI', align: 'center'
            });
            slide.addText(s.title, {
                x: 1.45, y: yPos + 0.08, w: 3.45, h: 0.3,
                fontSize: 10.2, bold: true, color: NAVY, fontFace: 'Segoe UI'
            });
            slide.addText(s.desc, {
                x: 1.45, y: yPos + 0.36, w: 3.45, h: 0.4,
                fontSize: 8.2, color: TEXT_MAIN, fontFace: 'Segoe UI'
            });
        });

        // Right: IDE Code Box showing the state machine / routing process implementation in Java & SQL
        const processCode = [
            { text: '// DatabaseManager.java - Status-Routing\n', options: { color: '64748B', italic: true } },
            { text: 'public static boolean ', options: { color: 'F43F5E', bold: true } },
            { text: 'updateBestellstatus(\n    ', options: { color: '38BDF8' } },
            { text: 'int bestellungId, String newStatus) {\n', options: { color: 'E2E8F0' } },
            { text: '    // Validierte Status-Übergänge:\n', options: { color: '64748B', italic: true } },
            { text: '    // aufgegeben ➔ in Bearbeitung ➔ fertig\n', options: { color: '64748B', italic: true } },
            { text: '    String sql = \n', options: { color: 'E2E8F0' } },
            { text: '      "UPDATE bestellung "\n    + ', options: { color: '34D399' } },
            { text: '"SET status = ? "\n    + ', options: { color: '34D399' } },
            { text: '"WHERE bestellung_id = ?";\n\n', options: { color: '34D399' } },
            { text: '    try (Connection conn = \n', options: { color: 'E2E8F0' } },
            { text: '           getConnection();\n', options: { color: 'E2E8F0' } },
            { text: '         PreparedStatement pstmt = \n', options: { color: 'F43F5E' } },
            { text: '           conn.prepareStatement(sql)) {\n', options: { color: 'E2E8F0' } },
            { text: '        pstmt.setString(1, newStatus);\n', options: { color: 'E2E8F0' } },
            { text: '        pstmt.setInt(2, bestellungId);\n', options: { color: 'E2E8F0' } },
            { text: '        return pstmt.executeUpdate() > 0;\n', options: { color: 'F43F5E' } },
            { text: '    } catch (SQLException e) {\n', options: { color: 'E2E8F0' } },
            { text: '        return false;\n', options: { color: 'F43F5E' } },
            { text: '    }\n}', options: { color: 'E2E8F0' } }
        ];
        addCodeBox(slide, 5.15, 1.25, 4.05, 3.7, 'BestellprozessRouting.java', processCode);
    }

    // -------------------------------------------------------------
    // SLIDE 7: DATENBANKMODELLIERUNG 3NF & SQL-CODE (OHNE ÜBERLAPPUNGEN)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 7, 'Relationales Datenmodell (3NF) & SQL-DDL', 'Datenbank-Design');

        // Top: 3 Normalform-Kriterien (kompakt, Höhe 0.62)
        const nfs = [
            { num: '1NF', label: 'Atomare Werte', desc: 'Separate Spalten; keine Aufzählungen.' },
            { num: '2NF', label: 'Voll funktional', desc: 'Keine Teilabhängigkeit vom Primärschlüssel.' },
            { num: '3NF', label: 'Transitivfrei', desc: 'Keine Abhängigkeiten unter Nicht-Schlüsseln.' }
        ];

        nfs.forEach((item, idx) => {
            const xPos = 0.8 + idx * 2.85;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: xPos, y: 1.12, w: 2.7, h: 0.62,
                fill: { color: CARD_BG }, line: { color: idx === 2 ? GREEN : BORDER_COLOR, width: idx === 2 ? 1.5 : 1 }
            });
            slide.addText(item.num, {
                x: xPos + 0.1, y: 1.16, w: 0.55, h: 0.24,
                fontSize: 11, bold: true, color: idx === 2 ? GREEN : NAVY, fontFace: 'Segoe UI'
            });
            slide.addText(item.label, {
                x: xPos + 0.68, y: 1.17, w: 1.9, h: 0.22,
                fontSize: 9, bold: true, color: TEAL, fontFace: 'Segoe UI'
            });
            slide.addText(item.desc, {
                x: xPos + 0.1, y: 1.42, w: 2.5, h: 0.26,
                fontSize: 7.5, color: TEXT_MAIN, fontFace: 'Segoe UI'
            });
        });

        // Bottom Left: Container Box for Relational Schema (x: 0.8, y: 1.88, w: 4.15, h: 3.1)
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.8, y: 1.88, w: 4.15, h: 3.1,
            fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 }
        });

        slide.addText('Relationales Schema (Kern-Tabellen)', {
            x: 0.95, y: 1.96, w: 3.8, h: 0.28,
            fontSize: 10.5, bold: true, color: NAVY, fontFace: 'Segoe UI'
        });

        // Entities Table with explicit colW and rowH to prevent auto-wrap expansion
        const entitiesData = [
            [
                { text: 'Tabelle', options: { bold: true, fill: 'F1F5F9' } },
                { text: 'PK', options: { bold: true, fill: 'F1F5F9' } },
                { text: 'Integritätsregeln & Constraints', options: { bold: true, fill: 'F1F5F9' } }
            ],
            [{ text: 'mitarbeiter' }, { text: 'id' }, { text: 'UNIQUE(login), hash(pw)' }],
            [{ text: 'tisch' }, { text: 'id' }, { text: 'UNIQUE(nummer), status_check' }],
            [{ text: 'artikel' }, { text: 'id' }, { text: 'kategorie_id, preis >= 0.00' }],
            [{ text: 'bestellung' }, { text: 'id' }, { text: 'FK(tisch), FK(mitarbeiter)' }],
            [{ text: 'bestellpos' }, { text: 'id' }, { text: 'FK(bestellung), FK(artikel), menge' }]
        ];

        slide.addTable(entitiesData, {
            x: 0.92, y: 2.28, w: 3.9, h: 2.05,
            colW: [1.1, 0.45, 2.35],
            rowH: [0.32, 0.32, 0.32, 0.32, 0.32, 0.32],
            fontSize: 7.5, fontFace: 'Segoe UI',
            border: { color: BORDER_COLOR, width: 0.5 },
            margin: [2, 3, 2, 3]
        });

        // Benefit chip at bottom of left container
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.92, y: 4.46, w: 3.9, h: 0.38,
            fill: { color: 'DCFCE7' }, line: { color: GREEN, width: 0.75 }
        });
        slide.addText('✔ 3NF-Vorteil: 0 % Redundanz & keine Update-Anomalien', {
            x: 0.95, y: 4.52, w: 3.84, h: 0.25,
            fontSize: 8, bold: true, color: '166534', fontFace: 'Segoe UI', align: 'center'
        });

        // Bottom Right: IDE Code Box for SQL DDL (x: 5.15, y: 1.88, w: 4.05, h: 3.1)
        const sqlCode = [
            { text: 'CREATE TABLE ', options: { color: 'F43F5E', bold: true } },
            { text: 'bestellposition (\n', options: { color: '38BDF8' } },
            { text: '  pos_id      ', options: { color: 'E2E8F0' } },
            { text: 'INTEGER PRIMARY KEY,\n', options: { color: 'F43F5E' } },
            { text: '  bestell_id  ', options: { color: 'E2E8F0' } },
            { text: 'INTEGER NOT NULL,\n', options: { color: 'F43F5E' } },
            { text: '  artikel_id  ', options: { color: 'E2E8F0' } },
            { text: 'INTEGER NOT NULL,\n', options: { color: 'F43F5E' } },
            { text: '  menge       ', options: { color: 'E2E8F0' } },
            { text: 'INT CHECK(menge > 0),\n', options: { color: 'F43F5E' } },
            { text: '  einzelpreis ', options: { color: 'E2E8F0' } },
            { text: 'DECIMAL(10,2) NOT NULL,\n', options: { color: '38BDF8' } },
            { text: '  FOREIGN KEY', options: { color: 'F43F5E' } },
            { text: '(bestell_id)\n    ', options: { color: 'E2E8F0' } },
            { text: 'REFERENCES bestellung(id),\n', options: { color: '34D399' } },
            { text: '  FOREIGN KEY', options: { color: 'F43F5E' } },
            { text: '(artikel_id)\n    ', options: { color: 'E2E8F0' } },
            { text: 'REFERENCES artikel(id)\n);', options: { color: '34D399' } }
        ];
        addCodeBox(slide, 5.15, 1.88, 4.05, 3.1, 'schema_3nf.sql', sqlCode);
    }

    // -------------------------------------------------------------
    // SLIDE 8: SOFTWARE-ARCHITEKTUR & TRANSAKTIONEN (DUAL-CODE)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 8, 'Java 17-Architektur: Transaktionskapselung & DAO', 'Software-Architektur');

        // Left IDE Code Box: Transaction Management (ACID)
        const txCode = [
            { text: '// Transaktionssichere Buchung (ACID)\n', options: { color: '64748B', italic: true } },
            { text: 'conn.setAutoCommit(', options: { color: '38BDF8' } },
            { text: 'false', options: { color: 'F43F5E', bold: true } },
            { text: '); // Start TX\n', options: { color: '38BDF8' } },
            { text: 'try {\n', options: { color: 'E2E8F0' } },
            { text: '    // 1. Kopfdatensatz erzeugen\n', options: { color: '64748B', italic: true } },
            { text: '    int bId = insertBestellung(conn);\n', options: { color: 'E2E8F0' } },
            { text: '    // 2. Positionen buchen\n', options: { color: '64748B', italic: true } },
            { text: '    for (Item pos : items) {\n', options: { color: 'E2E8F0' } },
            { text: '        insertPosition(conn, bId, pos);\n', options: { color: 'E2E8F0' } },
            { text: '    }\n', options: { color: 'E2E8F0' } },
            { text: '    // 3. Tischstatus ➔ "belegt"\n', options: { color: '64748B', italic: true } },
            { text: '    updateTischStatus(conn, tId);\n\n', options: { color: 'E2E8F0' } },
            { text: '    conn.commit(); ', options: { color: '34D399', bold: true } },
            { text: '// Atomar gespeichert\n', options: { color: '64748B', italic: true } },
            { text: '} catch (SQLException ex) {\n', options: { color: 'E2E8F0' } },
            { text: '    conn.rollback(); ', options: { color: 'F43F5E', bold: true } },
            { text: '// Konsistenter Zustand\n', options: { color: '64748B', italic: true } },
            { text: '    throw ex;\n', options: { color: 'F43F5E' } },
            { text: '}', options: { color: 'E2E8F0' } }
        ];
        addCodeBox(slide, 0.8, 1.25, 4.15, 3.7, 'OrderTransaction.java', txCode);

        // Right IDE Code Box: DAO PreparedStatement Query
        const daoCode = [
            { text: '// DatabaseManager.java - DAO-Pattern\n', options: { color: '64748B', italic: true } },
            { text: 'public static List<Bestellung>\n', options: { color: 'F43F5E', bold: true } },
            { text: 'getAllBestellungen() {\n', options: { color: '38BDF8' } },
            { text: '    String sql = \n', options: { color: 'E2E8F0' } },
            { text: '      "SELECT b.bestellung_id, "\n    + ', options: { color: '34D399' } },
            { text: '"t.tischnummer, m.name, "\n    + ', options: { color: '34D399' } },
            { text: '"b.status, b.gesamtpreis "\n    + ', options: { color: '34D399' } },
            { text: '"FROM bestellung b "\n    + ', options: { color: '34D399' } },
            { text: '"JOIN tisch t ON b.tisch_id=t.id "\n    + ', options: { color: '34D399' } },
            { text: '"JOIN mitarbeiter m "\n    + ', options: { color: '34D399' } },
            { text: '"  ON b.erstellt_von=m.id "\n    + ', options: { color: '34D399' } },
            { text: '"ORDER BY b.bestellung_id DESC";\n\n', options: { color: '34D399' } },
            { text: '    // PreparedStatement & AutoClose\n', options: { color: '64748B', italic: true } },
            { text: '    try (Connection conn = \n', options: { color: 'E2E8F0' } },
            { text: '           getConnection();\n', options: { color: 'E2E8F0' } },
            { text: '         Statement stmt = \n', options: { color: 'F43F5E' } },
            { text: '           conn.createStatement();\n', options: { color: 'E2E8F0' } },
            { text: '         ResultSet rs = \n', options: { color: 'F43F5E' } },
            { text: '           stmt.executeQuery(sql)) {\n', options: { color: 'E2E8F0' } },
            { text: '        return mapResultSet(rs);\n', options: { color: '38BDF8' } },
            { text: '    }\n}', options: { color: 'E2E8F0' } }
        ];
        addCodeBox(slide, 5.15, 1.25, 4.05, 3.7, 'DatabaseManager.java', daoCode);
    }

    // -------------------------------------------------------------
    // SLIDE 9: BENUTZEROBERFLÄCHE & USABILITY (VISUELL)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 9, 'Benutzeroberfläche & Usability (ISO 9241-110)', 'Frontend & Praxis');

        // 3 Cards for GUI Features
        const guiFeatures = [
            {
                title: 'Tischplan & Schnellauswahl',
                badge: 'SERVICE-DESK',
                points: ['Farbliche Tischzustände (Frei/Belegt)', '1-Klick-Auswahl zur Bestellaufnahme', 'Direkte Zuweisung an Bedienung']
            },
            {
                title: 'Artikel- & Speisekarten-Manager',
                badge: 'STAMMDATEN',
                points: ['Kategorien: Vorspeise, Hauptgang, Bar', 'Echtzeit-Validierung vor Speicherung', 'Sofortige Verfügbarkeitsumschaltung']
            },
            {
                title: 'Live-Monitor & Abrechnung',
                badge: 'MANAGEMENT',
                points: ['Übersicht aller aktiven Küchenbons', 'Summenkalkulation mit MwSt.-Split', 'Revisionssicherer Rechnungsabschluss']
            }
        ];

        guiFeatures.forEach((feat, idx) => {
            const xPos = 0.8 + idx * 2.85;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: xPos, y: 1.25, w: 2.7, h: 2.3,
                fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 }
            });

            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: xPos + 0.15, y: 1.4, w: 1.2, h: 0.26,
                fill: { color: 'E0F2FE' }, line: { color: '0284C7', width: 0.5 }
            });
            slide.addText(feat.badge, {
                x: xPos + 0.15, y: 1.43, w: 1.2, h: 0.2,
                fontSize: 7.5, bold: true, color: '0369A1', fontFace: 'Segoe UI', align: 'center'
            });

            slide.addText(feat.title, {
                x: xPos + 0.15, y: 1.75, w: 2.4, h: 0.45,
                fontSize: 11, bold: true, color: NAVY, fontFace: 'Segoe UI'
            });

            const bullets = feat.points.map(p => `•  ${p}`).join('\n\n');
            slide.addText(bullets, {
                x: xPos + 0.15, y: 2.3, w: 2.4, h: 1.15,
                fontSize: 8.5, color: TEXT_MAIN, fontFace: 'Segoe UI'
            });
        });

        // Bottom ISO Ergonomie Standards Card
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.8, y: 3.75, w: 8.4, h: 1.2,
            fill: { color: BLUE_BG }, line: { color: '38BDF8', width: 1 }
        });
        slide.addText('UMSETZUNG DER ERGONOMIE-GRUNDSÄTZE (DIN EN ISO 9241-110)', {
            x: 1.0, y: 3.88, w: 8.0, h: 0.25,
            fontSize: 10, bold: true, color: NAVY, fontFace: 'Segoe UI'
        });

        const ergoCols = [
            { title: 'Aufgabenangemessenheit', desc: 'Maximal 2 Klicks zur Bestellauslösung im Stoßbetrieb' },
            { title: 'Fehlertoleranz', desc: 'UI fängt negative Preise und falsche Typen sofort ab' },
            { title: 'Erwartungskonformität', desc: 'Standardisierte Menüstrukturen und Farbkodierungen' }
        ];

        ergoCols.forEach((c, idx) => {
            const xC = 1.0 + idx * 2.75;
            slide.addText(`✔ ${c.title}`, {
                x: xC, y: 4.18, w: 2.6, h: 0.22,
                fontSize: 9, bold: true, color: TEAL, fontFace: 'Segoe UI'
            });
            slide.addText(c.desc, {
                x: xC, y: 4.42, w: 2.6, h: 0.45,
                fontSize: 8, color: TEXT_MAIN, fontFace: 'Segoe UI'
            });
        });
    }

    // -------------------------------------------------------------
    // SLIDE 10: QUALITÄTSSICHERUNG & TESTCODE (DATABASETEST.JAVA)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 10, 'Automatisierte Qualitätssicherung & Testcode', 'Qualitätsmanagement');

        // Left: Metrics & Test Matrix
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.8, y: 1.25, w: 3.9, h: 3.7,
            fill: { color: CARD_BG }, line: { color: GREEN, width: 1.2 }
        });

        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 1.0, y: 1.45, w: 3.5, h: 0.7,
            fill: { color: 'DCFCE7' }, line: { color: GREEN, width: 1 }
        });
        slide.addText('100 % ERFOLGSQUOTE', {
            x: 1.0, y: 1.52, w: 3.5, h: 0.35,
            fontSize: 15, bold: true, color: GREEN, fontFace: 'Segoe UI', align: 'center'
        });
        slide.addText('Alle CRUD- und Integritätstests fehlerfrei durchlaufen', {
            x: 1.0, y: 1.85, w: 3.5, h: 0.25,
            fontSize: 8, color: '166534', fontFace: 'Segoe UI', align: 'center'
        });

        // Test Matrix Table
        const tests = [
            [{ text: 'ID', options: { bold: true } }, { text: 'Testfall', options: { bold: true } }, { text: 'Prüfziel', options: { bold: true } }, { text: 'Ergebnis', options: { bold: true } }],
            [{ text: 'TC-01' }, { text: 'Schema Init' }, { text: 'PK/FK Validierung' }, { text: 'BESTANDEN', options: { bold: true, color: GREEN } }],
            [{ text: 'TC-02' }, { text: 'SQL Injection' }, { text: 'Maskierung Eingaben' }, { text: 'BESTANDEN', options: { bold: true, color: GREEN } }],
            [{ text: 'TC-03' }, { text: 'Bestellablauf' }, { text: 'Statuswechsel' }, { text: 'BESTANDEN', options: { bold: true, color: GREEN } }],
            [{ text: 'TC-04' }, { text: 'Constraint FK' }, { text: 'Tisch-Integrität' }, { text: 'BESTANDEN', options: { bold: true, color: GREEN } }],
            [{ text: 'TC-05' }, { text: 'Rollback' }, { text: 'Abbruch-Sicherheit' }, { text: 'BESTANDEN', options: { bold: true, color: GREEN } }]
        ];
        slide.addTable(tests, {
            x: 0.9, y: 2.3, w: 3.7, h: 2.45,
            fontSize: 7.5, fontFace: 'Segoe UI',
            border: { color: BORDER_COLOR, width: 0.5 }
        });

        // Right: IDE Code Box with DatabaseTest.java
        const testCode = [
            { text: '// DatabaseTest.java - Testsuite\n', options: { color: '64748B', italic: true } },
            { text: 'public static void ', options: { color: 'F43F5E', bold: true } },
            { text: 'testIntegritaet() {\n', options: { color: '38BDF8' } },
            { text: '    DatabaseManager db = new DatabaseManager();\n\n', options: { color: 'E2E8F0' } },
            { text: '    // Test: SQL Injection-Resistenz\n', options: { color: '64748B', italic: true } },
            { text: '    String inject = ', options: { color: 'E2E8F0' } },
            { text: '"Gast\'; DROP TABLE bestellung;--";\n', options: { color: '34D399' } },
            { text: '    boolean maOk = db.erstelleMitarbeiter(\n', options: { color: 'E2E8F0' } },
            { text: '        inject, "hacker", "Service");\n', options: { color: 'E2E8F0' } },
            { text: '    assert maOk : ', options: { color: 'F43F5E' } },
            { text: '"Maskierung fehlgeschlagen";\n\n', options: { color: '34D399' } },
            { text: '    // Test: Fremdschlüssel-Prüfung\n', options: { color: '64748B', italic: true } },
            { text: '    boolean tischOk = db.tischExistiert(999);\n', options: { color: 'E2E8F0' } },
            { text: '    assert !tischOk : ', options: { color: 'F43F5E' } },
            { text: '"Ungültiger FK akzeptiert";\n', options: { color: '34D399' } },
            { text: '    System.out.println("100% Tests OK!");\n}', options: { color: 'E2E8F0' } }
        ];
        addCodeBox(slide, 4.9, 1.25, 4.3, 3.7, 'DatabaseTest.java', testCode);
    }

    // -------------------------------------------------------------
    // SLIDE 11: IT-SICHERHEIT & ISMS NACH ISO 27001 (CODE & CONTROLS)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 11, 'IT-Sicherheit, ISMS & Compliance (ISO 27001)', 'Sicherheit & ISMS');

        // Left: 3 Security Control Cards
        const secCards = [
            {
                ctrl: 'A.5 & A.8: Zugriffssteuerung (RBAC)',
                desc: 'Rollenmodell: Servicekräfte buchen Tische; Artikelpreise und Stammdaten nur durch Admin editierbar.'
            },
            {
                ctrl: 'A.8.24: Passwortsicherheit (PBKDF2)',
                desc: 'Keine Klartextpasswörter. Kryptographische Salting- und Hashing-Verfahren verhindern Credential-Leaks.'
            },
            {
                ctrl: 'A.8.12: Datensicherung & RPO/RTO',
                desc: 'Täglicher SQL-Export (smart_restaurant_dump.sql). Wiederanlaufzeit (RTO) unter 60 Minuten gewährleistet.'
            }
        ];

        secCards.forEach((sc, idx) => {
            const yPos = 1.25 + idx * 1.22;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: 0.8, y: yPos, w: 4.1, h: 1.1,
                fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 }
            });
            slide.addText(`🔒  ${sc.ctrl}`, {
                x: 0.95, y: yPos + 0.1, w: 3.8, h: 0.28,
                fontSize: 10, bold: true, color: NAVY, fontFace: 'Segoe UI'
            });
            slide.addText(sc.desc, {
                x: 0.95, y: yPos + 0.42, w: 3.8, h: 0.6,
                fontSize: 8.5, color: TEXT_MAIN, fontFace: 'Segoe UI'
            });
        });

        // Right: IDE Code Box with Security/Hashing Code
        const secCode = [
            { text: '// Security-Implementierung (Passwort-Hash)\n', options: { color: '64748B', italic: true } },
            { text: 'public static String ', options: { color: 'F43F5E', bold: true } },
            { text: 'hashPassword(', options: { color: '38BDF8' } },
            { text: 'String pw, byte[] salt) {\n', options: { color: 'E2E8F0' } },
            { text: '    KeySpec spec = new PBEKeySpec(\n', options: { color: 'E2E8F0' } },
            { text: '        pw.toCharArray(), salt, 65536, 256);\n', options: { color: 'E2E8F0' } },
            { text: '    SecretKeyFactory factory = \n', options: { color: 'E2E8F0' } },
            { text: '        SecretKeyFactory.getInstance(\n', options: { color: 'E2E8F0' } },
            { text: '            "PBKDF2WithHmacSHA256");\n', options: { color: '34D399' } },
            { text: '    byte[] hash = factory\n', options: { color: 'E2E8F0' } },
            { text: '        .generateSecret(spec).getEncoded();\n', options: { color: 'E2E8F0' } },
            { text: '    return Base64.getEncoder()\n', options: { color: 'F43F5E' } },
            { text: '        .encodeToString(hash);\n}', options: { color: 'E2E8F0' } }
        ];
        addCodeBox(slide, 5.1, 1.25, 4.1, 3.7, 'SecurityUtil.java', secCode);
    }

    // -------------------------------------------------------------
    // SLIDE 12: SOLL-IST-VERGLEICH (CONTROLLING-KENNZAHLEN)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 12, 'Soll-Ist-Vergleich & Projektcontrolling', 'Projektabschluss');

        // 3 Big KPI Tiles
        const kpis = [
            { label: 'FUNKTIONSUMFANG', val: '100 %', sub: '26 von 26 Anforderungen erfüllt', color: GREEN },
            { label: 'ZEITAUFWAND', val: '320 h', sub: '10 Tage exakt eingehalten', color: TEAL },
            { label: 'HERSTELLKOSTEN', val: '14.900 €', sub: 'Punktlandung im Budgetrahmen', color: NAVY }
        ];

        kpis.forEach((kp, idx) => {
            const xPos = 0.8 + idx * 2.85;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: xPos, y: 1.25, w: 2.7, h: 1.4,
                fill: { color: CARD_BG }, line: { color: kp.color, width: 1.5 }
            });
            slide.addText(kp.label, {
                x: xPos, y: 1.35, w: 2.7, h: 0.25,
                fontSize: 8.5, bold: true, color: TEXT_MUTED, fontFace: 'Segoe UI', align: 'center'
            });
            slide.addText(kp.val, {
                x: xPos, y: 1.6, w: 2.7, h: 0.55,
                fontSize: 22, bold: true, color: kp.color, fontFace: 'Segoe UI', align: 'center'
            });
            slide.addText(kp.sub, {
                x: xPos, y: 2.2, w: 2.7, h: 0.3,
                fontSize: 8, color: TEXT_MAIN, fontFace: 'Segoe UI', align: 'center'
            });
        });

        // Bottom Delta Analysis Table
        const deltaTable = [
            [{ text: 'Dimension', options: { bold: true } }, { text: 'Plan (SOLL)', options: { bold: true } }, { text: 'Ist-Ergebnis', options: { bold: true } }, { text: 'Abweichungsursache & Gegenmaßnahme', options: { bold: true } }],
            [{ text: 'Swing Table-GUI' }, { text: '40 h' }, { text: '48 h (+8h)' }, { text: 'Tabellen-Renderer komplexer; voll kompensiert durch schnelle DB-Modellierung (-8h).' }],
            [{ text: 'Qualitätstests' }, { text: 'Manuell' }, { text: 'Automatisiert' }, { text: 'Zusätzlicher Java-Testrunner erstellt ➔ 100% Regressionsschutz ohne Mehrzeit.' }],
            [{ text: 'Dokumentation' }, { text: 'Basisberichte' }, { text: '4 Fachberichte' }, { text: 'Zusätzlich ISMS-Dokumentation (ISO 27001) und Tagebuch nach mdc-Regel gepflegt.' }]
        ];

        slide.addTable(deltaTable, {
            x: 0.8, y: 2.85, w: 8.4, h: 2.1,
            fontSize: 8.5, fontFace: 'Segoe UI',
            border: { color: BORDER_COLOR, width: 0.5 }
        });
    }

    // -------------------------------------------------------------
    // SLIDE 13: LESSONS LEARNED & ROADMAP
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: LIGHT_BG };
        addSlideChrome(slide, 13, 'Lessons Learned & Zukunftsausblick', 'Ausblick & Roadmap');

        // Left Lessons Learned Cards
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 0.8, y: 1.25, w: 4.1, h: 3.7,
            fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 }
        });
        slide.addText('Erkenntnisse & Lessons Learned', {
            x: 1.0, y: 1.4, w: 3.7, h: 0.3,
            fontSize: 11.5, bold: true, color: NAVY, fontFace: 'Segoe UI'
        });

        const lessons = [
            { title: 'Parallele Dokumentationsführung', desc: 'Das Führen des Projekttagebuchs parallel zu den Sprints verhinderte Last-Minute-Stress.' },
            { title: 'Strikte Schichtentrennung (DAO)', desc: 'Die Entkopplung von GUI und SQL erlaubte gleichzeitiges Arbeiten an Backend und Frontend.' },
            { title: 'Automatisierte Tests ab Tag 1', desc: 'Frühzeitige Integritätstests verhinderten logische Datenfehler vor dem GUI-Test.' }
        ];

        lessons.forEach((ls, idx) => {
            const yPos = 1.85 + idx * 0.95;
            slide.addText(`✔ ${ls.title}`, {
                x: 1.0, y: yPos, w: 3.7, h: 0.25,
                fontSize: 9.5, bold: true, color: TEAL, fontFace: 'Segoe UI'
            });
            slide.addText(ls.desc, {
                x: 1.0, y: yPos + 0.28, w: 3.7, h: 0.6,
                fontSize: 8.5, color: TEXT_MAIN, fontFace: 'Segoe UI'
            });
        });

        // Right Roadmap Cards
        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 5.1, y: 1.25, w: 4.1, h: 3.7,
            fill: { color: CARD_BG }, line: { color: BORDER_COLOR, width: 1 }
        });
        slide.addText('Roadmap & Erweiterungspotenzial', {
            x: 5.3, y: 1.4, w: 3.7, h: 0.3,
            fontSize: 11.5, bold: true, color: NAVY, fontFace: 'Segoe UI'
        });

        const roadmap = [
            { phase: 'PHASE 2', title: 'Mobile Kellner-Handhelds', desc: 'Web- & Tablet-Interface zur direkten Aufnahme am Gästetisch.' },
            { phase: 'PHASE 3', title: 'KassenSichV & TSE-Hardware', desc: 'Integration einer zertifizierten Sicherheitseinrichtung für Belege.' },
            { phase: 'PHASE 4', title: 'Küchen-Monitor-System', desc: 'Touchscreen-Terminals für Köche mit Farbstatus und akustischem Signal.' }
        ];

        roadmap.forEach((rm, idx) => {
            const yPos = 1.85 + idx * 0.95;
            slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
                x: 5.3, y: yPos, w: 0.85, h: 0.24,
                fill: { color: 'FEF3C7' }, line: { color: ACCENT_GOLD, width: 0.5 }
            });
            slide.addText(rm.phase, {
                x: 5.3, y: yPos + 0.03, w: 0.85, h: 0.18,
                fontSize: 7.5, bold: true, color: 'B45309', fontFace: 'Segoe UI', align: 'center'
            });
            slide.addText(rm.title, {
                x: 6.25, y: yPos - 0.02, w: 2.8, h: 0.28,
                fontSize: 9.5, bold: true, color: NAVY, fontFace: 'Segoe UI'
            });
            slide.addText(rm.desc, {
                x: 5.3, y: yPos + 0.32, w: 3.7, h: 0.55,
                fontSize: 8.5, color: TEXT_MAIN, fontFace: 'Segoe UI'
            });
        });
    }

    // -------------------------------------------------------------
    // SLIDE 14: ABSCHLUSS & FACHGESPRÄCH (OHNE SPRECHER)
    // -------------------------------------------------------------
    {
        const slide = pres.addSlide();
        slide.background = { color: NAVY };

        slide.addShape(pres.shapes.RECTANGLE, {
            x: 0, y: 0, w: '100%', h: 0.12,
            fill: { color: TEAL }
        });

        slide.addText('PROJEKTABSCHLUSS', {
            x: 0.8, y: 0.9, w: 8.4, h: 0.35,
            fontSize: 12, bold: true, color: '38BDF8', fontFace: 'Segoe UI', align: 'center'
        });

        slide.addText('Vielen Dank für Ihre Aufmerksamkeit!', {
            x: 0.8, y: 1.3, w: 8.4, h: 0.8,
            fontSize: 32, bold: true, color: 'FFFFFF', fontFace: 'Segoe UI', align: 'center'
        });

        slide.addText('Wir freuen uns auf Ihre Fragen im IHK-Fachgespräch.', {
            x: 0.8, y: 2.15, w: 8.4, h: 0.45,
            fontSize: 15, color: 'CBD5E1', fontFace: 'Segoe UI', align: 'center'
        });

        // 5 Documentation Artifact Chips
        const artifacts = [
            'Projekttagebuch (chronologisch nach mdc-Regel)',
            'Entwicklerdokumentation (Java 17, Swing, SQL & Tests)',
            'Benutzerdokumentation & Rollenhandbuch (Gastronomie)',
            'ISMS-Systemdokumentation (ISO/IEC 27001 & DSGVO)',
            'SQL-Datenbankdump & Automatisierte Testsuite'
        ];

        slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
            x: 1.2, y: 2.85, w: 7.6, h: 2.05,
            fill: { color: '0A2136' }, line: { color: TEAL, width: 1.2 }
        });

        slide.addText('Vollständige Projektdokumentation liegt vor:', {
            x: 1.5, y: 3.0, w: 7.0, h: 0.28,
            fontSize: 10.5, bold: true, color: '38BDF8', fontFace: 'Segoe UI'
        });

        artifacts.forEach((art, idx) => {
            const yA = 3.35 + idx * 0.28;
            slide.addText(`✔  ${art}`, {
                x: 1.5, y: yA, w: 7.0, h: 0.25,
                fontSize: 9, color: 'FFFFFF', fontFace: 'Segoe UI'
            });
        });

        // Page number
        slide.addText(`Seite 14 / ${TOTAL_SLIDES}`, {
            x: 7.7, y: 5.2, w: 1.5, h: 0.35,
            fontSize: 9, bold: true, color: '64748B', fontFace: 'Segoe UI', align: 'right'
        });
    }

    // Save
    const outputDir = path.join(__dirname, '..', 'abgabe');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const outputPath = path.join(outputDir, 'Smart_Restaurant_IHK_Praesentation.pptx');
    await pres.writeFile({ fileName: outputPath });
    console.log(`Presentation updated successfully: ${outputPath}`);
}

createPresentation().catch(err => {
    console.error('Error creating presentation:', err);
    process.exit(1);
});
