# Gesamtkonzept Compliance

## Einleitung

Dieses Gesamtkonzept beschreibt die Compliance-Ausrichtung des Repositories „Projektarbeit“ (GitHub: `niki356565rt/LF10-Projekt`). Das Repository enthält die Planungs- und Nachweisdokumentation für das Vorhaben **Smart Restaurant**, ein digitales Bestell- und Verwaltungssystem für eine Gaststätte, sowie lokale Erzeugerskripte für Abgabedokumente und UML-Diagramme. Es enthält **keinen laufenden Anwendungsserver**, keine produktive Datenbank und keine authentifizierte API. Die hier festgelegten Schutzziele gelten deshalb in zwei Schichten: (1) für die **geplante Fachanwendung** laut `docs/01-anforderungskatalog.md` und (2) für den **aktuellen Repository-Betrieb** (Dokumentation, Build-Skripte, lokale Render-Werkzeuge).

## Geltungsbereich

In den Geltungsbereich fallen alle Dateien unter `docs/`, `abgabe/`, `tools/`, `internal-docs/` sowie die Node.js-Abhängigkeiten aus `package.json`/`package-lock.json`. Außerhalb des Geltungsbereichs liegen produktive Gaststätten-IT, Zahlungsdienstleister, Hosting-Umgebungen und personenbezogene Betriebsdaten; diese existieren im Repository nicht. Offene Annahme: Eine spätere Implementierung der Muss-Anforderungen (Service, Küche, Administration) übernimmt dieses Konzept, sobald Code, Speicherung und Identitäten nachweisbar sind.

## Begriffe und Definitionen

| Begriff | Definition im Projektkontext |
|---|---|
| Fachanwendung | Geplante Software laut Anforderungskatalog (Tisch, Bestellung, Status, Protokoll, Rollen). |
| Repository-Betrieb | Versionierung, lokale Skripte (`tools/build-ideologien-docx.js`, `tools/svg-to-print-html.js`) und optionales `tools/plantuml.jar`. |
| Schutzbedarf | Einstufung der Vertraulichkeit, Integrität und Verfügbarkeit von Informationen. |
| Risikoakzeptanzniveau | Schwelle, ab der ein Restrisiko ohne weitere Maßnahme getragen wird. |
| Nachweis | Datei, Log oder Prozessschritt, mit dem eine Kontrolle geprüft werden kann. |

## Verantwortlichkeiten

| Tätigkeit | Projektleitung | Entwicklung | Auftraggeber (Gaststätte) | Compliance-Rolle |
|---|---|---|---|---|
| Fachliche Anforderungen | A | C | R | I |
| Technische Architektur (geplant) | A | R | C | C |
| Repository-Inhalte und Lizenzen | A | R | I | C |
| Datenschutz-Folgenabschätzung (Schwellenwert) | A | C | C | R |
| Freigabe von Abgabedokumenten | R | C | A | I |
| Pflege von `/internal-docs` | A | R | I | C |

R = Responsible, A = Accountable, C = Consulted, I = Informed.

Die Compliance-Rolle ist im Repository **nicht namentlich besetzt**. Bis zur Benennung bleibt die Projektleitung accountable und die Entwicklung responsible für die Dokumentationspflege.

## Detailbeschreibung

### Strategische Ausrichtung

Die Make-or-Buy-Entscheidung in `docs/06-make-or-buy.md` verpflichtet das Vorhaben auf **Eigenentwicklung** (Make), nicht auf eine Branchen-SaaS. Daraus folgt: Schutzbedarf, Datenflüsse und Betriebsmodell müssen im eigenen System nachweisbar bleiben. Solange nur Planungsartefakte existieren, ist das Risikoakzeptanzniveau **konservativ für personenbezogene Betriebsdaten** (keine Echtdaten im Git) und **moderat für öffentliche Projektdokumente** (Anforderungen, UML, Schulungsblätter).

### Schutzbedarfe

| Informationsklasse | Beispiele im Repo / geplant | Vertraulichkeit | Integrität | Verfügbarkeit |
|---|---|---|---|---|
| Öffentliche Planungsdokumente | `docs/*.md`, UML-PDF | niedrig | hoch | mittel |
| Abgabedokumente (Schule) | `abgabe/*.docx`, `abgabe/*.pdf` | mittel | hoch | mittel |
| Geplante Bestell- und Mitarbeiterdaten | Namen, Benutzername, Bestellungen, Protokolle | hoch | hoch | mittel |
| Secrets und Zugangsdaten | nicht im Repository vorhanden | – | – | – |

### Datenflüsse (aktuell nachweisbar)

1. Autor bearbeitet Markdown/PlantUML lokal.
2. `tools/build-ideologien-docx.js` erzeugt DOCX aus fest kodierten Inhalten (Paket `docx` 9.7.1).
3. PlantUML (lokales JAR, gitignored) rendert Aktivitätsdiagramme nach SVG; Headless-Chrome druckt PDF.
4. Git überträgt nur Dokumente und Skripte, keine Bestelldaten.

Geplante Fachdatenflüsse (noch nicht implementiert, Quelle: Anforderungskatalog und `docs/07-uml-aktivitaetsdiagramm-bestellprozess.*`): Service erfasst Bestellung → System speichert Status und Log → Küche ändert Status → Service serviert und schließt Bezahlung ab. Zahlungsanbindung ist ausdrücklich **nicht** im Umfang.

### Beteiligte Systeme

Nachweisbar im Repository: Git, Node.js-Skriptumgebung, optionales JDK 17 + PlantUML, Chrome für PDF. Geplante Fachsysteme: Service-Ansicht, Küchen-Ansicht, Admin-Ansicht, persistente Speicherung von Tischen, Artikeln, Mitarbeitern, Bestellungen und Statusprotokollen. Speichermedium, Hosting und Auth-Provider sind **nicht aus dem Repository ableitbar**.

### Betriebsmodell

Aktuell: lokaler Dokumenten-Workflow ohne Produktionsbetrieb. Geplant: eigener Betrieb beim Auftraggeber oder durch das Entwicklungsteam (Another Great Solution GmbH laut Make-or-Buy-Dokument). SLA, Backup-Ort und Monitoring-Stack sind klärungsbedürftig.

### Zusammenspiel der Richtlinien

ISO-27001-Mapping, DSGVO-Verzeichnis, Sicherheitsrichtlinien, Lizenzdokumentation und Auditfragen beziehen sich auf denselben Systemkontext. Änderungen an Datenflüssen, Lizenzen oder dem geplanten Rollenmodell müssen in allen genannten Dokumenten nachgezogen werden. Das Änderungsprotokoll steht in `internal-docs/prozesse/changelog.md`.

## Nachweise und Artefakte

| Nachweis | Pfad |
|---|---|
| Anforderungskatalog | `docs/01-anforderungskatalog.md` |
| Bestellprozess und Phasen | `docs/02-projektplanung-bestellprozess.md`, `docs/03-projektphasen.md` |
| UML Bestellprozess | `docs/07-uml-aktivitaetsdiagramm-bestellprozess.puml`, `.drawio` und gerenderte Ableitungen |
| UML BubbleSort (Lehrmodell) | `docs/08-uml-aktivitaetsdiagramm-bubblesort.puml` und Ableitungen |
| UML zoo.main (Lehrmodell) | `docs/09-uml-aktivitaetsdiagramm-zoo.puml`, `.drawio` |
| UML Sequenz Bestellaufnahme | `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio`, `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.puml` |
| UML Sequenz Küche zubereiten (Ausschnitt; Dateiname historisch) | `docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio` |
| Abhängigkeiten | `package.json`, `package-lock.json` |
| Architektur | `internal-docs/architektur/architektur-uebersicht.md` |

## Risiken und Kontrollen

| Risiko | Auswirkung | Eintrittswahrscheinlichkeit | Maßnahme | Kontrolle | Nachweis |
|---|---|---|---|---|---|
| Echtdaten landen im Git | Datenschutzverletzung | niedrig | Keine Betriebsdaten committen; `.gitignore` für `out/` und lokale JARs | Review vor Commit | Git-Historie, `.gitignore` |
| Geplante App ohne Auth-Konzept | unbefugter Zugriff | mittel (bei Implementierung) | Rollenmodell aus A-11/A-12 vor erstem Persistenz-Code festziehen | Architektur- und DSGVO-Review | `sicherheitsrichtlinien.md`, `dsgvo.md` |
| Lizenzkonflikt JSZip dual license | unklare Weitergabe | niedrig | Nutzung über MIT-Pfad dokumentieren | Lizenzreview bei `npm`-Änderung | `lizenzdokumentation.md` |
| Scheinsicherheit durch Plan-only-Repo | falsche Auditaussagen | mittel | Offene Annahmen kennzeichnen | Audit-Stichprobe | dieses Dokument, `audit-dokumentation.md` |

## Pflegeprozess

Die Projektleitung löst eine Aktualisierung aus, wenn Anforderungen, Datenflüsse, Abhängigkeiten oder Abgabepfade wechseln. Die Entwicklung prüft `/internal-docs` in derselben Änderung. Mindestens nach jeder Abgabephase und nach jedem neuen UML- oder Build-Skript erfolgt ein Abgleich. Veraltete Aussagen werden ersetzt, nicht durch Platzhalter ergänzt.

## Revisionshistorie

| Datum | Autor/Rolle | Änderung | Anlass |
|---|---|---|---|
| 24.08.2026 | Entwicklung | Erstfassung anhand Repository-Stand (Docs, Node-docx, UML, kein App-Code) | Pflichtstruktur `/internal-docs` |
| 25.08.2026 | Entwicklung | Evidence-Pfad um `docs/07-*.drawio` ergänzt | CHG-2026-08-25-02 |
| 26.08.2026 | Entwicklung | Evidence-Pfad UML zoo.main (`docs/09-*`) | CHG-2026-08-26-01 |
| 27.08.2026 | Entwicklung | Evidence-Pfad Sequenzdiagramme (`docs/10-*`, `docs/11-*`) | CHG-2026-08-27-01 |
| 27.08.2026 | Entwicklung | UML 11 als Küchenausschnitt ausgewiesen, nicht als Restprozess | CHG-2026-08-27-09 |
| 27.08.2026 | Entwicklung | Evidence-Pfad PlantUML UML 10 (`docs/10-*.puml`) | CHG-2026-08-27-10 |
