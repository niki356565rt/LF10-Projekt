# Changelog Prozesse und Artefakte

## Einleitung

Dieses Changelog dokumentiert Änderungen am Repository mit Begründung, Auswirkung, Risiko, betroffenen Komponenten, Prüfung, Freigabe und Rollback. Es ersetzt nicht `git log`, sondern bewertet fachliche und compliance-relevante Wirkung.

## Geltungsbereich

Einträge gelten für Planungsdokumente, UML, Abgabegeneratoren, npm-Abhängigkeiten und `/internal-docs`. Reine Tippfehler ohne Semantik entfallen.

## Begriffe und Definitionen

| Begriff | Definition |
|---|---|
| Auswirkung | Was sich für Leser, Abgabe oder spätere Implementierung ändert. |
| Risiko | Welche Fehlinterpretation oder welches Sicherheits-/Lizenzproblem droht. |
| Rollback | Wie der vorherige nachweisbare Stand wiederhergestellt wird. |

## Verantwortlichkeiten

| Tätigkeit | Projektleitung | Entwicklung | Auftraggeber | Compliance-Rolle |
|---|---|---|---|---|
| Änderung freigeben | A | C | I | C |
| Changelog-Eintrag schreiben | A | R | I | C |
| Risiko einstufen | A | C | I | R |
| Rollback testen (Git) | I | R | I | I |

## Detailbeschreibung

### CHG-2026-08-24-01 – BubbleSort-Aktivitätsdiagramm

| Feld | Inhalt |
|---|---|
| Begründung | Aus Java-Quellcode sollte ein UML-2.5-Aktivitätsdiagramm entstehen. Die automatisch erzeugte PUML-Skizze war syntaktisch ungültig (`if ()`, unaufgelöste `goto`/`merge`-Labels, `note right of` auf Label). |
| Auswirkung | Neues Artefakt `docs/08-uml-aktivitaetsdiagramm-bubblesort.puml` plus SVG/PNG/PDF. Schleifen als Entscheidung plus Rücksprung; Tausch als eine Aktion; `println` nach innerer Schleife; innere Bedingung wie im Code `i < newList.size() - 1`. |
| Risiko | Gering: Verwechslung mit dem Bestellprozess-UML; Hinweis dass `-j`-Optimierung nicht modelliert wird, weil sie im Java-Snippet fehlt. |
| Betroffene Komponenten | `docs/08-*`, lokales PlantUML-Rendering |
| Prüfung | PlantUML 1.2025.4 Compile ohne Syntaxfehler; visueller Abgleich PNG gegen Java-for-Schleifen |
| Freigabe | Entwicklung, 24.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Dateien `docs/08-uml-aktivitaetsdiagramm-bubblesort.*` entfernen |

### CHG-2026-08-24-02 – Interne Compliance-Struktur

| Feld | Inhalt |
|---|---|
| Begründung | Pflichtstruktur `/internal-docs` fehlte vollständig (Auditabweichung F-03). |
| Auswirkung | Compliance-, Audit-, Prozess- und Architekturdateien angelegt, bezogen auf den realen Planungsstand ohne Anwendungsserver. |
| Risiko | Mittel, wenn Leser die Docs als Betriebszertifizierung liest – daher Status `geplant`/`nicht anwendbar` in ISO-Mapping. |
| Betroffene Komponenten | `internal-docs/**` |
| Prüfung | Vollständigkeit der Pflichtpfade und der zehn Hauptabschnitte je Markdown-Datei |
| Freigabe | Entwicklung, 24.08.2026 |
| Rollback | Verzeichnis `internal-docs/` löschen (nicht empfohlen, solange die Teamregel gilt) |

### CHG-2026-08-25-01 – Bestellprozess-UML: Partitionen neu geschnitten

| Feld | Inhalt |
|---|---|
| Begründung | Die Partition `System` bündelte Status- und Protokollaktionen rollenfremd, sodass aus dem Diagramm nicht ablesbar war, wer einen Statuswechsel auslöst. Getränke hatten keine ausführende Stelle. Zusätzlich waren die Kanten der beiden `repeat`-Rauten unbeschriftet. |
| Auswirkung | `docs/07-*` hat jetzt die Partitionen `Service`, `Küche` und `Bar`. Status- und `Log(...)`-Aktionen liegen in der Partition der auslösenden Rolle. Neue Verzweigung `Getränke enthalten?` mit Bar-Zweig (anzeigen, `in Bearbeitung`, zubereiten, `fertig`) parallel zum bestehenden Küchen-Zweig. Alle vier Entscheidungen führen beide Kanten mit ausformulierter Bedingung. |
| Risiko | Gering bis mittel: Die Bar-Partition erweitert den Umfang gegenüber `docs/01-anforderungskatalog.md` Abschnitt 8, der eine eigene Bar-Ansicht ausdrücklich ausschließt, und gegenüber `docs/02` (Nicht im Umfang). Anforderung K-05 (reine Getränkebestellungen erscheinen nicht in der Küchenansicht) bleibt erfüllt, weil der Küchen-Zweig weiterhin an `Speisen enthalten?` hängt. Anforderungskatalog und Projektplanung sind noch nicht nachgezogen und widersprechen dem Diagramm derzeit. |
| Betroffene Komponenten | `docs/07-uml-aktivitaetsdiagramm-bestellprozess.puml`, `.svg`, `.png`, `.pdf`; offen: `docs/07-...html` (Altstand mit `System`-Lane), `docs/01`, `docs/02` |
| Prüfung | PlantUML 1.2025.4 rendert ohne Syntaxfehler; Textknoten-Auswertung des SVG belegt Partitionen `Service`/`Küche`/`Bar` (kein `System`) und 8 Bedingungslabels zu 4 Rauten; Randprüfung ohne abgeschnittene Beschriftung; visueller Abgleich am PNG |
| Freigabe | Entwicklung, 25.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | `git checkout -- docs/07-uml-aktivitaetsdiagramm-bestellprozess.puml docs/07-uml-aktivitaetsdiagramm-bestellprozess.pdf` und erneut rendern |

### CHG-2026-08-25-02 – Bestellprozess-UML als draw.io-Aktivitätsdiagramm

| Feld | Inhalt |
|---|---|
| Begründung | Der Bestellprozess soll in diagrams.net als natives UML-2.5-Aktivitätsdiagramm liegen, nicht als importierter PlantUML-Text. |
| Auswirkung | `docs/07-uml-aktivitaetsdiagramm-bestellprozess.drawio` ist mit UML-Formen nachgebaut: Opaque Actions, Initial-/Final-Knoten, leere Entscheidungsrauten, Merge-Knoten, Note-Kommentare, Activity-Partitionen Service/Küche/Bar. Kontrollfluss und Status-/Log-Aktionen entsprechen `docs/07-uml-aktivitaetsdiagramm-bestellprozess.puml`. |
| Risiko | Gering: PlantUML- und draw.io-Stand können auseinanderlaufen, wenn nur eine Datei gepflegt wird. Mittel unverändert: Bar-Partition weicht vom Anforderungskatalog (keine eigene Bar-Ansicht) ab; K-05 bleibt erfüllt. |
| Betroffene Komponenten | `docs/07-uml-aktivitaetsdiagramm-bestellprozess.drawio`; Evidence-Pfade in Architektur- und Gesamtkonzept |
| Prüfung | XML wohlgeformt; Knoten-IDs eindeutig; vier leere Entscheidungsrauten; vier kleine Merge-Knoten; acht Guard-Beschriftungen an den Kanten; Partitionen Service/Küche/Bar |
| Freigabe | Entwicklung, 25.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Datei `docs/07-uml-aktivitaetsdiagramm-bestellprozess.drawio` entfernen |

### CHG-2026-08-25-03 – draw.io-UML: offene Pfeile und ruhigeres Layout

| Feld | Inhalt |
|---|---|
| Begründung | Gefüllte Blockpfeile wirkten schwer; ungleich breite Aktionen und enge Abstände machten die Spalten unruhig. |
| Auswirkung | Alle Kontrollflusspfeile sind offene UML-Pfeile (`endArrow=open`). Aktionen je Partition gleich breit und zentriert; gleichmäßiger Vertikalabstand; hellere Partitionslinien; abgerundete orthogonale Kanten. |
| Risiko | Gering, nur Darstellung. |
| Betroffene Komponenten | `docs/07-uml-aktivitaetsdiagramm-bestellprozess.drawio` |
| Prüfung | Kantenstile ohne `endArrow=block`; Spaltenzentrierung Service/Küche/Bar |
| Freigabe | Entwicklung, 25.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Vorherigen Stand der `.drawio`-Datei aus Git wiederherstellen |

### CHG-2026-08-26-02 – Kostenstellen eindeutig vs. nicht eindeutig

| Feld | Inhalt |
|---|---|
| Begründung | Die bestehende Kalkulation nannte Beträge, aber nicht, welche Kosten dem Auftrag Smart Restaurant direkt gehören und welche nur umgelegt werden. |
| Auswirkung | Neues Dokument `docs/04-kostenstellen.md`: sieben eindeutig zuordenbare Blöcke (vor allem 320 Projektstunden und projektbezogene Ablage) und zehn nicht eindeutig zuordenbare Stellen (Verwaltung, Gebäude, zentrale IT, Ausbildung). Verknüpfung mit den 14.400 € Personal, 500 € Sachkosten und 20 % Gemeinkosten. Querverweis in `docs/04-kostenkalkulation.md`. |
| Risiko | Gering: Leser könnten Gemeinkosten mit „unnötig“ verwechseln; das Dokument begründet den Zuschlag. Mittel nur, wenn Sachkosten 150/200 € als Einzelbelege gelesen werden – sie bleiben als Umlage gekennzeichnet. |
| Betroffene Komponenten | `docs/04-kostenstellen.md`, `docs/04-kostenkalkulation.md` |
| Prüfung | Abgleich der Beträge mit Abschnitt 3–5 der Kostenkalkulation; keine neuen Euro-Beträge erfunden |
| Freigabe | Entwicklung, 26.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | `docs/04-kostenstellen.md` entfernen und Querverweise in `docs/04-kostenkalkulation.md` zurücknehmen |

### CHG-2026-08-27-01 – Sequenzdiagramme Bestellprozess (draw.io)

| Feld | Inhalt |
|---|---|
| Begründung | Für die geplante App Smart Restaurant fehlten Interaktionsdiagramme; der Kontrollfluss lag nur als Aktivitätsdiagramm vor. Sequenzdiagramme machen Aufrufreihenfolge, Reply und asynchrone Küchenbenachrichtigung prüfbar. |
| Auswirkung | Neue Artefakte `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio` (Tischwahl, Anlegen, Positionen, Status `aufgegeben`, optionale Küchenanzeige) und `docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio` (Status `in Bearbeitung`/`fertig`/`serviert`/`bezahlt`, Rechnung, optionale Tischfreigabe). Notation UML 2.x / DIN ISO/IEC 19505 als natives draw.io. |
| Risiko | Gering: Soll-Architektur ohne Laufzeitcode; Methoden- und Typnamen sind geplant, nicht aus Implementierung abgeleitet. Mittel unverändert: keine eigene Bar-Ansicht (Katalog Abschnitt 8); Getränke ohne Speisen nutzen den `[else]`-Zweig in Diagramm 10 und erscheinen nicht in der Küchen-UI. |
| Betroffene Komponenten | `docs/10-*.drawio`, `docs/11-*.drawio`; Evidence in Architektur, Gesamtkonzept, Audit |
| Prüfung | XML wohlgeformt; Lifelines `name:Typ`; synchrone Calls gefüllte Spitze; Replies gestrichelt offen; asynchrone Signals offene Spitze; Combined Fragments `loop`/`alt`/`opt`; Selbstaufruf `setzeStatus` mit gestapeltem Ausführungsfokus |
| Freigabe | Entwicklung, 27.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Dateien `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio` und `docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio` entfernen |

### CHG-2026-08-27-02 – Sequenzdiagramme auf Lesbarkeitsregeln umgestellt

| Feld | Inhalt |
|---|---|
| Begründung | Im ersten Stand endeten die Nachrichtenkanten an den Rändern der Lifeline-Köpfe, sodass Beschriftungen über Nachbarspalten und Rahmenlinien liefen. Die Skill-Regel „Linien und Texte überlagern sich nicht, sofern nicht von den UML-Regeln verlangt“ war damit nicht erfüllt. |
| Auswirkung | Beide `.drawio`-Dateien neu erzeugt: Spaltenabstand 260 px (Diagramm 10) bzw. 280 px (Diagramm 11) bei 140 px Kopfbreite, Vertikalabstand 56 px je Nachricht, Nachrichten enden exakt an den Kanten des Ausführungsbalkens, Selbstaufrufe mit 60 px Freiraum und gestapeltem Balken, Guards mit weißem Texthintergrund unterhalb des Fragmentreiters, Fragmentreiter schneidet keine Lebenslinie, Labels spaltenübergreifender Nachrichten aus der Mitte versetzt. Zur Kollisionsvermeidung wurden Argumentlisten gekürzt (`aendereStatus(inBearbeitung)` statt Nennung von Bestellung und Status, `ergaenzePosition(artikel, menge)`); Semantik und Reihenfolge der Interaktionen sind unverändert. |
| Risiko | Gering: rein darstellend, keine neue Fachlogik. Restrisiko, dass gekürzte Argumentlisten den Empfängerkontext weniger explizit zeigen; er bleibt über den Ausführungsbalken und den vorausgehenden Selbstaufruf ableitbar. |
| Betroffene Komponenten | `docs/10-*.drawio`, `docs/11-*.drawio`; Regelgrundlage `~/.cursor/skills/sequenzdiagram/SKILL.md` und `drawio-uml.md` |
| Prüfung | Skriptgestützte Geometrieprüfung beider Dateien: 26 bzw. 41 Nachrichten, Mindestabstand 48 px eingehalten, keine Überlappung von Labels untereinander, mit Lifeline-Köpfen, Guards oder Rahmenkanten; XML wohlgeformt (`xml-js`-Parse) |
| Freigabe | Entwicklung, 27.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Vorherigen Stand der beiden `.drawio`-Dateien aus Git wiederherstellen |

### CHG-2026-08-27-03 – Selbstaufrufe: Pfeil schnitt den gestapelten Balken

| Feld | Inhalt |
|---|---|
| Begründung | Neue Skill-Regel: Nachrichtenpfeile dürfen Ausführungsbalken nur berühren, nicht schneiden. Ein Geometrie-Check deckte auf, dass der gestapelte Balken der Selbstaufrufe `setzeStatus(...)` bereits auf Höhe des Absendepunkts begann. Der Pfeil startete damit im Balkeninneren und lief durch die Balkenfläche – fünf Fälle (1× Diagramm 10, 4× Diagramm 11). |
| Auswirkung | Der geschachtelte Balken beginnt jetzt 22 px tiefer, auf Höhe des Empfangsereignisses der Selbstnachricht. Der Pfeil verlässt den äußeren Balken an dessen rechter Außenkante, führt rechts an der Lebenslinie vorbei und endet exakt auf der rechten Kante des geschachtelten Balkens. Alle übrigen Nachrichten waren bereits kantenbündig angebunden und bleiben unverändert; Semantik und Reihenfolge der Interaktionen sind unverändert. |
| Risiko | Gering: rein darstellend. Der geschachtelte Balken endet 6 px vor der nächsten Nachricht, sodass Folgeaufrufe wieder aus dem äußeren Ausführungsfokus starten – dies entspricht der Modellierung, dass `schreibeLog(...)` nach Abschluss des Statuswechsels gesendet wird. |
| Betroffene Komponenten | `docs/10-*.drawio`, `docs/11-*.drawio`; Regelgrundlage `~/.cursor/skills/sequenzdiagram/SKILL.md`, `drawio-uml.md`, `sparx-regeln.md` |
| Prüfung | Skriptgestützte Segmentprüfung beider Dateien gegen alle 18 bzw. 29 Ausführungsbalken: kein Pfeilsegment schneidet eine Balkeninnenfläche, jeder Start- und Endpunkt liegt auf einer Balkenaußenkante; zusätzlich weiterhin keine Label-, Guard-, Rahmen- oder Kopfkollision |
| Freigabe | Entwicklung, 27.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Vorherigen Stand der beiden `.drawio`-Dateien aus Git wiederherstellen |

### CHG-2026-08-27-04 – Perimeter-Projektion: Pfeilspitzen rutschten in die Balkenmitte

| Feld | Inhalt |
|---|---|
| Begründung | Trotz kantengenauer `exitX`/`entryX`-Werte endeten die Pfeile in der Anzeige mittig auf den Aktivitätsbalken. Ursache ist mxGraph: fixe Verbindungspunkte werden per Default auf die Shape-Perimeter projiziert, und `perimeter=lifelinePerimeter` liefert dabei einen Punkt auf der Mittelachse der Lebenslinie. Die im XML korrekten Koordinaten wurden dadurch beim Rendern überschrieben. |
| Auswirkung | Alle 26 bzw. 41 Nachrichtenkanten tragen jetzt `exitPerimeter=0;entryPerimeter=0;`. Damit gelten die berechneten Kantenkoordinaten unverändert und die Pfeilspitzen sitzen auf der Balkenaußenkante. Keine inhaltliche Änderung an Lifelines, Nachrichten oder Fragmenten. |
| Risiko | Gering: rein darstellend. Hinweis für Nachbearbeitung in diagrams.net: Werden Kanten dort neu verbunden, setzt das Werkzeug die Perimeter-Projektion wieder aktiv – die beiden Schlüssel müssen dann erneut gesetzt werden. |
| Betroffene Komponenten | `docs/10-*.drawio`, `docs/11-*.drawio`; Regelgrundlage `~/.cursor/skills/sequenzdiagram/SKILL.md`, `drawio-uml.md` |
| Prüfung | Skriptprüfung beider Dateien: jede Message enthält `exitPerimeter=0` und `entryPerimeter=0`; kein Pfeilsegment schneidet eine Balkeninnenfläche; jeder Endpunkt liegt auf einer Balkenaußenkante |
| Freigabe | Entwicklung, 27.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Style-Schlüssel `exitPerimeter=0;entryPerimeter=0;` aus den Kanten entfernen (stellt den fehlerhaften Stand wieder her, nicht empfohlen) |

### CHG-2026-08-27-05 – Antwort an sich selbst bei Selbstaufrufen

| Feld | Inhalt |
|---|---|
| Begründung | Prüfung des Skills zeigte eine Regellücke: Für Selbstaufrufe war nur der gestapelte Balken geregelt, nicht die Antwort. Die Reply-Pflicht in medium/high Detailtiefe stand unter der Ausnahme „sofern nicht implizit am Balkenende klar“, die auf Selbstaufrufe angewendet wurde. Ergebnis war eine Mischung zweier Rückkehr-Konventionen im selben Diagramm: In Diagramm 10 hatten 12 von 13 synchronen Aufrufen einen Reply, nur `setzeStatus(aufgegeben)` nicht; in Diagramm 11 betraf das vier `setzeStatus(...)`-Aufrufe. |
| Auswirkung | Regel im Skill festgeschrieben: Ein synchroner Selbstaufruf erhält in medium/high Detailtiefe einen eigenen gestrichelten Reply von der Außenkante des gestapelten Balkens zurück auf die Außenkante des äußeren Balkens; die Implizit-Ausnahme gilt für Selbstaufrufe nicht. Der Selbstaufruf belegt dadurch zwei Zeitscheiben. Beide Diagramme neu erzeugt: Diagramm 10 hat jetzt 13 Calls zu 13 Replies (1 Selbst-Reply), Diagramm 11 22 zu 22 (4 Selbst-Replies). Der gestapelte Balken endet auf Höhe des Reply-Abgangs. Diagramm 10 wuchs um eine, Diagramm 11 um vier Zeitscheiben. |
| Risiko | Gering: keine neue Fachlogik, die Statuswechsel und ihre Reihenfolge sind unverändert. Der Rückgabewert ist mit `ok` bewusst schwach spezifiziert, weil die Signatur von `setzeStatus(...)` in der Soll-Architektur nicht festgelegt ist – als offener Punkt zu präzisieren, sobald die Schnittstelle definiert wird. |
| Betroffene Komponenten | `docs/10-*.drawio`, `docs/11-*.drawio`; Regelgrundlage `~/.cursor/skills/sequenzdiagram/SKILL.md`, `sparx-regeln.md`, `drawio-uml.md` |
| Prüfung | Skriptprüfung beider Dateien: Anzahl synchroner Calls gleich Anzahl Replies, Anzahl Selbstaufrufe gleich Anzahl Selbst-Replies, kein Pfeilsegment schneidet eine Balkeninnenfläche, alle Endpunkte auf Balkenaußenkanten, `exitPerimeter=0;entryPerimeter=0;` überall vorhanden, keine Label-, Guard-, Rahmen- oder Kopfkollision, Mindestabstand 48 px eingehalten |
| Freigabe | Entwicklung, 27.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Vorherigen Stand der beiden `.drawio`-Dateien aus Git wiederherstellen und die Selbst-Reply-Regel im Skill zurücknehmen |

### CHG-2026-08-27-06 – Ende-X, Rahmen-Containment und 90°-Kantenführung

| Feld | Inhalt |
|---|---|
| Begründung | Drei zuvor nur im Skill nachgezogene Regeln waren in den Diagrammen noch nicht umgesetzt: (1) Lebenslinien endeten ohne Abschlusssymbol als offene gestrichelte Linie, (2) sie ragten 14 px unter die Unterkante des `sd`-Rahmens hinaus und das `alt`-Fragment in Diagramm 10 lag genau auf dessen rechter Kante, (3) für Nachrichten war `curved`/`rounded` nicht explizit gesetzt, sodass draw.io die Selbstaufruf-Knicke als Bogen darstellen konnte. |
| Auswirkung | Beide Diagramme neu erzeugt. Jede Lebenslinie endet jetzt mit einem `shape=umlDestroy`-X (18 px) 40 px unterhalb des letzten Inhalts; die gestrichelte Linie läuft bis zum X-Mittelpunkt. Der `sd`-Rahmen umschließt alle Elemente mit mindestens 24 px Innenabstand: Unterkante liegt 24 px unter dem X, die rechte Kante 96 px rechts der letzten Lebenslinienachse, wodurch die Fragmentbreite auf ±70 px reduziert wurde und 26 px Abstand zur Rahmenkante entstehen. Alle Nachrichten tragen `curved=0;rounded=0;`; Nachrichten zwischen Lebenslinien bleiben einsegmentig horizontal, Selbstaufrufe und Selbst-Replies bestehen aus genau drei achsparallelen Segmenten mit zwei 90°-Knicken. Diagramm 10: 1286 × 1919 px, Diagramm 11: 1846 × 2807 px. |
| Risiko | Gering: rein darstellende Änderung, Nachrichtenfolge, Signaturen und Fachlogik sind unverändert. Das X kennzeichnet hier das Ende der modellierten Interaktion, nicht die Zerstörung eines Objekts – bei einer späteren Erweiterung der Diagramme über den Bezahlvorgang hinaus muss es entsprechend nachgezogen werden. |
| Betroffene Komponenten | `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio`, `docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio`; Regelgrundlage `~/.cursor/skills/sequenzdiagram/SKILL.md`, `drawio-uml.md`, `sparx-regeln.md`, `belegsatz-sequenz.pdf` |
| Prüfung | Skriptprüfung beider Dateien ohne Befund: pro Lebenslinie genau ein Ende-X, Linienende exakt auf dem X-Mittelpunkt, alle Vertizes, Pfeilstützpunkte und Labels mit ≥ 12 px Abstand innerhalb des `sd`-Rahmens, jedes Pfeilsegment achsparallel, `curved=0;rounded=0;` und `exitPerimeter=0;entryPerimeter=0;` überall vorhanden, kein Segment schneidet eine Balkeninnenfläche, alle Endpunkte auf Balkenaußenkanten, Call/Reply-Parität 13:13 bzw. 22:22, Mindestabstand 48 px eingehalten |
| Freigabe | Entwicklung, 27.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Vorherigen Stand der beiden `.drawio`-Dateien aus Git wiederherstellen |

### CHG-2026-08-27-07 – Speise- und Getränkebestellungen getrennt weiterleiten

| Feld | Inhalt |
|---|---|
| Begründung | Diagramm 10 konnte nur zwischen „Speisen enthalten“ und „nur Getränke“ wählen. Damit war eine gemischte Bestellung semantisch nicht korrekt darstellbar und es fehlte ein Empfänger für Getränkepositionen. |
| Auswirkung | `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio` enthält jetzt die Lebenslinie `bar:BarUI`. Das bisherige `alt`-Fragment wurde durch ein `par`-Fragment mit den unabhängig bewachten Operanden `[Speisen enthalten]` und `[Getränke enthalten]` ersetzt. Der Systemkern sendet asynchron `zeigeSpeisebestellung(bestellung)` an die Küchen-UI und `zeigeGetraenkebestellung(bestellung)` an die Bar-UI. Bei einer gemischten Bestellung sind beide Guards wahr und beide Operanden werden ausgeführt. Architekturübersicht, Architekturdiagramm, Auditfragen und Sicherheitsrollen wurden nachgezogen. |
| Risiko | Mittel: Eine eigene Bar-UI erweitert den bisher in Projektplanung und Kalkulation ausgeschlossenen Umfang. Die Nutzerentscheidung ist in der Soll-Architektur dokumentiert; Katalog, Projektplanung und Kalkulation bleiben bis zu einer ausdrücklichen Scope-Freigabe widersprüchlich. Statusrechte und der weitere Bearbeitungsablauf der Bar sind noch nicht spezifiziert und dürfen nicht aus dem Küchenablauf geraten werden. |
| Betroffene Komponenten | `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio`, `internal-docs/architektur/architektur-uebersicht.md`, `internal-docs/architektur/architektur.drawio`, `internal-docs/audits/audit-dokumentation.md`, `internal-docs/compliance/sicherheitsrichtlinien.md` |
| Prüfung | XML erfolgreich geparst; sechs eindeutige Lebenslinien mit sechs Ende-X; `par`-Fragment und beide Guards vorhanden; Bar-Nachricht endet an `bar:BarUI`; alle Nachrichten mit `curved=0;rounded=0;exitPerimeter=0;entryPerimeter=0`; keine Kante schneidet eine Balkeninnenfläche; alle Vertizes innerhalb des `sd`-Rahmens |
| Freigabe | Fachliche Änderung auf Nutzeranforderung vom 27.08.2026; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Bar-Lebenslinie, Bar-Nachricht und zweiten `par`-Operanden entfernen und vorherige Rahmenbreite wiederherstellen |

### CHG-2026-08-27-08 – Sequenzdiagramme an aktualisierte Darstellungsregeln angepasst

| Feld | Inhalt |
|---|---|
| Begründung | Der Sequenzdiagramm-Skill verlangt neu eine reine Instanzbenennung `:name`, unverzerrte Strichfiguren für menschliche Rollen sowie transparente, explizit oberhalb des Pfeils positionierte Nachrichtenbeschriftungen. Beide Diagramme verwendeten noch `name:Klasse`, rechteckige Köpfe für Service/Küche und weiße Labelhintergründe ohne festen Offset. |
| Auswirkung | Alle Objektköpfe wurden auf `:name` ohne Klassenteil umgestellt. Diagramm 10 zeigt `:service` als Akteur; Diagramm 11 zeigt `:kueche` und `:service` als Akteure. Die Figuren sind jeweils 30 × 60 px, ihr Name steht unterhalb, und eine getrennte gestrichelte Lebenslinie läuft vom freien Bereich unter dem Label bis zum Ende-X. Der Zeitbereich wurde um 40 px nach unten verschoben. Jede Message trägt nun `labelBackgroundColor=none;whiteSpace=nowrap`; ihre Geometrie enthält `x=\"0.5\"` (Selbstnachrichten `0.65`) und den Offset `(0,-10)`, sodass der Text über dem Schaft liegt. |
| Risiko | Gering: ausschließlich Notation und Layout; Nachrichtenfolge, Bar-Verteilung, Statuslogik und fachliche Bedingungen bleiben unverändert. Durch getrennte Akteur-Shapes und Lebenslinien muss bei späterer manueller Verschiebung die gemeinsame Mittelachse erhalten bleiben. |
| Betroffene Komponenten | `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio`, `docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio`; Regelgrundlage `~/.cursor/skills/sequenzdiagram/SKILL.md`, `drawio-uml.md`, `sparx-regeln.md`, `belegsatz-sequenz.pdf` |
| Prüfung | Beide XML-Dateien erfolgreich geparst; Diagramm 10: sechs Beteiligte, ein Akteur und 28 Nachrichten; Diagramm 11: sechs Beteiligte, zwei Akteure und 45 Nachrichten. Geprüft wurden `:name`, Akteurproportion 1:2, Labelposition, Akteurlinien bis zum X, Nachrichtenoffset, transparenter Hintergrund, 48-px-Mindestabstand, achsparallele Kanten, Balkenberührung ohne Schnitt und vollständiges Rahmen-Containment. Kein Befund. |
| Freigabe | Entwicklung, 27.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Vorherigen Stand der beiden `.drawio`-Dateien wiederherstellen |

### CHG-2026-08-27-09 – Diagramm 11 auf Küchenausschnitt begrenzt

| Feld | Inhalt |
|---|---|
| Begründung | Ein Sequenzdiagramm soll eine Interaktion abbilden. Diagramm 11 verkettete vier Fachschritte (Zubereitung, Servieren, Rechnung/Bezahlung, optionale Tischfreigabe) und wurde dadurch unlesbar. Der Skill verlangt einen klaren Interaktionsausschnitt. |
| Auswirkung | `docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio` zeigt nur noch `sd Küche zubereiten`: Küche setzt über `:kui` und `:kern` die Status `inBearbeitung` und `fertig` (jeweils mit Selbstaufruf `setzeStatus`, Log und Reply), anschließend sendet `:kern` asynchron `benachrichtigeFertig(bestellung)` an `:sui`. Beteiligte: `:kueche` (Akteur), `:kui`, `:kern`, `:db`, `:sui`. Entfernt: `:service`, Servieren, Rechnung, Bezahlung, `opt` Tischfreigabe. Der Dateiname bleibt aus Abgabekontinuität unverändert. Servieren und Bezahlen sind in UML 11 nicht mehr nachgewiesen; der Gesamtablauf bleibt im Aktivitätsdiagramm 07 beschrieben. |
| Risiko | Mittel: Leser, die den Dateinamen wörtlich nehmen, erwarten Servieren und Bezahlen. Gegenmaßnahme: Rahmenbeschriftung `sd Küche zubereiten` und diese Changelog-/Audit-Korrektur. Gering fachlich, weil keine Statuswerte erfunden wurden – sie fehlen im Sequenznachweis, existieren aber weiter in Katalog und UML 07. |
| Betroffene Komponenten | `docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio`; Evidence in Architekturübersicht, Gesamtkonzept, Audit A-05c |
| Prüfung | XML erzeugt; fünf Beteiligte, ein Akteur 30×60, fünf Ende-X; 17 Nachrichten (8 Sync, 8 Reply inkl. 2 Selbst-Replies, 1 Async); `benachrichtigeFertig` innerhalb des Ausführungsfokus von `:kern` nach dem Fertig-Log; keine Nachrichten zu Servieren/Bezahlen; Skill-Notation (`:name`, offene Pfeilregeln, Label-Offset, Rahmen-Containment) beibehalten |
| Freigabe | Entwicklung, 27.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Vorherigen Stand von `docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio` aus Git wiederherstellen |

### CHG-2026-08-27-10 – PlantUML-Fassung von Sequenzdiagramm 10

| Feld | Inhalt |
|---|---|
| Begründung | Für Abgleich, Textarbeit und optionales PlantUML-Rendering wurde die Interaktion aus `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio` zusätzlich als PlantUML verlangt. Die draw.io-Datei bleibt die verbindliche Notationsquelle für Layout und Belegsatz-Geometrie. |
| Auswirkung | Neues Artefakt `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.puml`: dieselben Beteiligten (`:service` als Akteur, `:ui`, `:kern`, `:db`, `:kueche`, `:bar`), Nachrichtenfolge, Selbstaufruf mit Reply, `loop` und `par` mit den Guards `[Speisen enthalten]` / `[Getränke enthalten]`. Pfeile nach Skill: `->` synchron, `-->` Reply, `->>` asynchron. `destroy` am Ende jeder Lebenslinie steht für das Belegsatz-Ende-X der Darstellung, nicht für eine Laufzeit-Zerstörung. |
| Risiko | Gering: keine neue Fachlogik. Mittel nur, wenn PlantUML-Layout (Labelposition, Akteurproportion, Pfeil-an-Balken) als prüfungsidentisch zur draw.io-Datei gelesen wird – das ist nicht der Fall. `par`/`else` in PlantUML ist der zweite Operandenrahmen, keine XOR-Alternative. |
| Betroffene Komponenten | `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.puml`; Evidence in Architekturübersicht, Gesamtkonzept, Audit A-05c |
| Prüfung | Datei syntaktisch `@startuml`/`@enduml`; 13 synchrone Calls inkl. Selbstaufruf, 13 Replies, 2 Async; `loop` und `par` mit beiden Guards; sechs `destroy`; Aliase zeigen `:name` |
| Freigabe | Entwicklung, 27.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.puml` entfernen |

### CHG-2026-08-26-01 – zoo.main als UML-Aktivitätsdiagramm (PlantUML + draw.io)

| Feld | Inhalt |
|---|---|
| Begründung | Aus dem Java-Lehrmodell `zoo` (Vererbung, Alias, Polymorphie, Überladung) soll ein regelkonformes UML-2.x-Aktivitätsdiagramm entstehen, analog zum BubbleSort-Lehrmodell. |
| Auswirkung | Neue Artefakte `docs/09-uml-aktivitaetsdiagramm-zoo.puml` und `docs/09-uml-aktivitaetsdiagramm-zoo.drawio`. Partitionen `zoo.main`, `Landtier`, `Tierarzt`. Kontrollfluss folgt `main`; `steckbrief` als Call-Operation in Landtier; `behandeln` überladen in Tierarzt. Offene Pfeile (`endArrow=open`). Ungenutzte Klassen (Wal, Nashorn, …) nicht als Ablaufknoten. |
| Risiko | Gering: Lehrmodell, kein Produktivpfad der Gaststätte. Hinweis: Code-Kommentar zu „alphabetisch sortiertem“ Set weicht von `HashSet` ab – im Diagramm als Note markiert. |
| Betroffene Komponenten | `docs/09-uml-aktivitaetsdiagramm-zoo.puml`, `docs/09-uml-aktivitaetsdiagramm-zoo.drawio`; Evidence in Architektur, Gesamtkonzept, Audit |
| Prüfung | 25 Kontrollflüsse mit `endArrow=open`; Aktionen max. 1 in/1 out; drei Partitions; Notes an Alias/Polymorphie/Überladung |
| Freigabe | Entwicklung, 26.08.2026, im Workspace; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Dateien `docs/09-uml-aktivitaetsdiagramm-zoo.*` entfernen |

### CHG-2026-08-27-10 – Kanban auf das Repo-Board kopiert

| Feld | Inhalt |
|---|---|
| Begründung | Das Arbeitsboard hing nur am User-Projekt `joki1990jk-bit/projects/1`. Das Repo `niki356565rt/LF10-Projekt` hat ein eigenes, verknüpftes Project (`niki356565rt/projects/1`), das leer war. |
| Auswirkung | 16 Issues (#17–#32) plus Draft „UML-Sequenzdiagramme Bestellprozess“ liegen auf https://github.com/users/niki356565rt/projects/1 mit denselben Status-/Sprint-/Prioritätswerten wie das Quellboard. Spalten: Backlog, ToDo, In Progress, Review/Test, Done. Fertige Karten (#17–#19 und Draft) stehen auf Done; Architektur (#21) auf In Progress. Script: `tools/copy-kanban-to-repo.js`. |
| Risiko | Gering: Issue-Nummern weichen vom Quellboard (#1–#16) ab, weil diese Nummern im Ziel-Repo bereits vergeben oder nicht sichtbar waren. Mittel nur, wenn jemand noch das User-Board pflegt – dann divergieren zwei Boards. |
| Betroffene Komponenten | GitHub Project `niki356565rt/projects/1`, Issues im Remote-Repo, `tools/copy-kanban-to-repo.js` |
| Prüfung | `gh project item-list 1 --owner niki356565rt`: 17 Items; Status/Sprint/Priorität stichprobenartig gegen Quellboard |
| Freigabe | Entwicklung, 27.08.2026; Git-Commit nur auf ausdrückliche Anforderung |
| Rollback | Issues #17–#32 schließen/löschen und Project-Items entfernen; User-Board `joki1990jk-bit/projects/1` bleibt unverändert |

### Technischer Hinweis zum Rendering

`skinparam conditionStyle diamond` unterdrückt in PlantUML 1.2025.4 die `is (...) not (...)`-Beschriftungen der `repeat while`-Rauten; die `if/else`-Labels bleiben davon unberührt. Der Parameter wurde deshalb entfernt. Die Standarddarstellung zeichnet Entscheidungen bereits als Raute, `conditionStyle inside` erzeugt in dieser Version ein identisches Bild.

### Frühere, bereits im Repo sichtbare Stände (nachträglich erfasst)

| Feld | Inhalt |
|---|---|
| Begründung | Bestellprozess-UML und Ideologie-Abgaben existierten vor diesem Changelog. |
| Auswirkung | `docs/07-*` modelliert den digitalen Bestellprozess; `abgabe/` enthält DOCX/PDF aus `tools/build-ideologien-docx.js`; Abhängigkeit `docx@9.7.1`. |
| Risiko | Öffentlicher GitHub-Remote kann Abgaben verbreiten; keine Personen-Echtdaten vorgesehen. |
| Betroffene Komponenten | `docs/01`–`07`, `abgabe/`, `tools/build-ideologien-docx.js`, `package-lock.json` |
| Prüfung | Bestehende PDF/HTML-Artefakte im Tree |
| Freigabe | Historisch durch Projektarbeit, nicht in diesem Changelog nachträglich „neu“ genehmigt |
| Rollback | `git` auf den jeweiligen historischen Commit |

## Nachweise und Artefakte

Git-Status und die in den Einträgen genannten Pfade. Render-Zwischenstände in `out/` sind gitignored und kein Release-Nachweis.

## Risiken und Kontrollen

| Risiko | Auswirkung | Eintrittswahrscheinlichkeit | Maßnahme | Kontrolle | Nachweis |
|---|---|---|---|---|---|
| Changelog nur „was“ ohne Risiko | Ungeeignete Freigabe | mittel | Pflichtfelder je CHG | Review neuer Einträge | dieses Dokument |
| Commit ohne Changelog bei sicherheitsrelevanten Änderungen | Auditlücke | mittel | Check gegen ISO/DSGVO/Lizenz | Audit A-Dokumente | `audit-dokumentation.md` |

## Pflegeprozess

Neue CHG-ID nach Schema `CHG-YYYY-MM-DD-nn`. Eintrag **vor** oder unmittelbar mit der inhaltlichen Änderung. Bei Git-Commit auf Wunsch der Projektleitung die CHG-ID in die Commit-Message übernehmen.

## Revisionshistorie

| Datum | Autor/Rolle | Änderung | Anlass |
|---|---|---|---|
| 24.08.2026 | Entwicklung | Erstes Changelog mit CHG-01 und CHG-02 | BubbleSort-UML und `/internal-docs` |
| 25.08.2026 | Entwicklung | CHG-2026-08-25-01 ergänzt | Bestellprozess-UML: `System`-Partition aufgelöst, Bar-Partition und vollständige Kantenbeschriftung |
| 25.08.2026 | Entwicklung | CHG-2026-08-25-02 ergänzt | Bestellprozess als draw.io-Aktivitätsdiagramm `docs/07-*.drawio` |
| 25.08.2026 | Entwicklung | CHG-2026-08-25-03 ergänzt | Offene Pfeile und ruhigeres Spaltenlayout |
| 26.08.2026 | Entwicklung | CHG-2026-08-26-01 ergänzt | zoo.main PlantUML + draw.io-Aktivitätsdiagramm |
| 26.08.2026 | Entwicklung | CHG-2026-08-26-02 ergänzt | Kostenstellen eindeutig vs. nicht eindeutig (`docs/04-kostenstellen.md`) |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-01 ergänzt | Zwei UML-Sequenzdiagramme zum Bestellprozess (`docs/10-*`, `docs/11-*`) |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-02 ergänzt | Sequenzdiagramme nach den Lesbarkeitsregeln des Skills neu gelayoutet |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-03 ergänzt | Selbstaufruf-Pfeile berühren den gestapelten Ausführungsbalken statt ihn zu schneiden |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-04 ergänzt | `exitPerimeter=0;entryPerimeter=0;` gegen das Verrutschen der Pfeilspitzen in die Balkenmitte |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-05 ergänzt | Selbstaufrufe erhalten eine eigene Antwort an sich selbst; Regellücke im Skill geschlossen |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-06 ergänzt | Ende-X je Lebenslinie, vollständiges Containment im `sd`-Rahmen und 90°-Kantenführung in beiden Sequenzdiagrammen umgesetzt |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-07 ergänzt | Bar-Lebenslinie und unabhängige `par`-Weiterleitung für Speise-, Getränke- und Mischbestellungen ergänzt |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-08 ergänzt | Beide Sequenzdiagramme auf `:name`, unverzerrte Akteure und transparente Pfeillabels mit festem Offset umgestellt |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-09 ergänzt | Diagramm 11 auf den Küchenausschnitt `in Bearbeitung`/`fertig` plus Service-Benachrichtigung gekürzt |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-10 ergänzt | Kanban auf das Repo-Board `niki356565rt/projects/1` kopiert |
| 27.08.2026 | Entwicklung | CHG-2026-08-27-10 ergänzt | PlantUML-Fassung von Sequenzdiagramm 10 (`docs/10-*.puml`) |
