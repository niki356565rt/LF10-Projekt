# Audit-Dokumentation

## Einleitung

Dieses Dokument definiert den Auditumfang für das Repository Smart Restaurant / LF10-Projektarbeit. Es dient einem externen Prüfer dazu, Fragen, Kriterien, Evidence und Stichproben ohne Scheinsicherheit über nicht vorhandenen Produktivcode abzuarbeiten.

## Geltungsbereich

Auditobjekt ist der Git-Workspace einschließlich `docs/`, `abgabe/`, `tools/`, `package.json`, `package-lock.json` und `/internal-docs`. Nicht auditierbar als laufendes System: Authentifizierung, Datenbank, HTTP-API, CI-Pipeline (fehlen im Repository).

## Begriffe und Definitionen

| Begriff | Definition |
|---|---|
| Auditkriterium | Sollzustand aus Katalog, Richtlinie oder Lizenz. |
| Feststellung | Beobachtung mit Evidence-Pfad. |
| Abweichung | Soll nicht erfüllt. |
| Stichprobe | Bewusst gewählte Dateien oder Commits, kein statistisches Sample. |

## Verantwortlichkeiten

| Tätigkeit | Projektleitung | Entwicklung | Auftraggeber | Compliance-Rolle |
|---|---|---|---|---|
| Auditumfang festlegen | A | C | I | R |
| Evidence bereitstellen | A | R | I | C |
| Abweichungen schließen | A | R | C | C |
| Maßnahmen nachverfolgen | A | C | I | R |

## Detailbeschreibung

### Auditkriterien

1. Planungsdokumente decken Muss-Anforderungen und Bestellprozess ab.
2. UML-Bestellprozess ist intern konsistent zu Statuswerten A-10/A-13.
3. Keine Secrets oder Echtdaten im Git.
4. npm-Lizenzen sind erfasst.
5. Interne Compliance-Struktur ist vollständig und ohne Platzhalter.
6. Technische Sicherheitskontrollen der App werden nur behauptet, wenn Code existiert.

### Prüffragen und Evidence

| ID | Prüffrage | Evidence-Pfad | Stichprobenmethodik | Erwartetes Ergebnis |
|---|---|---|---|---|
| A-01 | Existiert ein Anforderungskatalog mit IDs und Prüfkriterien? | `docs/01-anforderungskatalog.md` | Vollständige Datei | Muss/Soll/Kann und Rollen Service/Küche/Admin |
| A-02 | Ist der Bestellprozess gegen den Katalog gehalten? | `docs/02-projektplanung-bestellprozess.md`, UML 07 | Abgleich Statusliste | Status aufgegeben → … → bezahlt |
| A-03 | Wird jede Statusänderung fachlich protokolliert? | UML 07, A-13 | Stichprobe aller Log-Aktionen im PUML | Log-Aktion je Statuswechsel |
| A-04 | Werden Speise- und Getränkepositionen unabhängig korrekt verteilt? | UML 07, UML 10, A-09, K-05 | Reine Speise-, reine Getränke- und gemischte Bestellung gegen die Guards prüfen | Speisen nur zur Küche, Getränke nur zur Bar; bei gemischter Bestellung beide `par`-Operanden |
| A-05 | Liegt ein regelkonformes BubbleSort-Aktivitätsdiagramm vor? | `docs/08-uml-aktivitaetsdiagramm-bubblesort.puml` | Vergleich mit Java-for-Schleifen | Nested Loops, Tausch, println, kein erfundenes `-j` |
| A-05b | Liegt ein regelkonformes zoo.main-Aktivitätsdiagramm vor? | `docs/09-uml-aktivitaetsdiagramm-zoo.puml`, `.drawio` | Abgleich mit `main` / `steckbrief` / `behandeln` | Alias t↔e, Polymorphie ArrayList, Überladung behandeln(Tier,Tier); offene Pfeile |
| A-05c | Liegen Sequenzdiagramme zum geplanten Bestellkern vor? | `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio`, `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.puml`, `docs/11-uml-sequenzdiagramm-kueche-servieren-bezahlen.drawio` | Abgleich S-01–S-04, K-01–K-05, A-09, A-13 gegen UML 10/11; S-05–S-08 (Servieren, Rechnung, Bezahlung, Tischfreigabe) gegen UML 07 | UML 10: Sync/Reply/Async, Status `aufgegeben` inkl. Protokoll, getrennte Küchen-/Bar-Weiterleitung einschließlich Mischbestellung (draw.io verbindlich, PlantUML semantikgleich). UML 11: nur Küchenausschnitt `inBearbeitung`/`fertig` inkl. Protokoll und asynchrone `benachrichtigeFertig` an `:sui`. Servieren, Rechnung, Bezahlung und Tischfreigabe sind in UML 11 **nicht** enthalten |
| A-06 | Sind npm-Lizenzen dokumentiert? | `package-lock.json`, `lizenzdokumentation.md` | Alle `license`-Felder im Lockfile | JSZip Dual-License MIT-Pfad |
| A-07 | Werden Binaries/Build-Caches versioniert? | `.gitignore` | Suche `plantuml.jar`, `out/`, `node_modules/` | ausgeschlossen |
| A-08 | Gibt es App-Auth im Repo? | Gesamtrepo-Suche nach Login/OAuth | Dateimuster | **Nein** – Feststellung, keine Abweichung gegen Ist, aber Eintrittskriterium vor Go-Live |
| A-09 | Öffentlicher Remote ohne Personen-Echtdaten? | `abgabe/`, `docs/` | Stichprobe Texte | Keine Klarnamen von Gästen/Mitarbeitern des Betriebs |
| A-10 | Draw.io-Kontext aktuell? | `internal-docs/architektur/architektur.drawio` | Datei öffnen | Systemkontext inkl. Git/npm/lokal, keine erfundene Cloud |

### Feststellungen (Stand 24.08.2026)

| ID | Typ | Beschreibung | Maßnahme | Verantwortlich |
|---|---|---|---|---|
| F-01 | Feststellung | Kein Anwendungscode, daher ISO-Kontrollen 8.2/8.5/8.24 nur geplant | Vor Implementierung Auth- und Speicherentscheidung dokumentieren | Entwicklung |
| F-02 | Feststellung | GitHub-Remote öffentlich laut package.json | Keine Betriebsdaten; optional privat schalten | Projektleitung |
| F-03 | Abweichung (Dokumentation, behoben in dieser Revision) | `/internal-docs` fehlte | Struktur angelegt | Entwicklung |
| F-04 | Offener Punkt | LICENSE-Datei im Repo nicht nachgewiesen trotz `"license": "ISC"` in package.json | LICENSE anlegen oder Angabe korrigieren | Projektleitung |
| F-05 | Offener Punkt | AV/SCC GitHub nicht im Repo | Vertragsklärung falls personenbezogene Git-Metadaten relevant | Auftraggeber/Projektleitung |

## Nachweise und Artefakte

Die Evidence-Pfade der Tabelle sind verbindlich. Zusätzlich: Render-PDFs unter `docs/07-*.pdf` und `docs/08-*.pdf` als visuelles Abbild der PUML-Quellen; draw.io-Quellen unter `docs/07-*.drawio`, `docs/09-*.drawio`, `docs/10-*.drawio` und `docs/11-*.drawio`.

## Risiken und Kontrollen

| Risiko | Auswirkung | Eintrittswahrscheinlichkeit | Maßnahme | Kontrolle | Nachweis |
|---|---|---|---|---|---|
| Audit behauptet Produktivreife | Falsche Freigabe | mittel | Fragen A-08 explizit „kein Code“ | Wiederholaudit vor Go-Live | dieses Dokument |
| UML weicht vom Katalog ab | Falsche Umsetzung | mittel | Abgleich A-02/A-03 | Review bei PUML-Änderung | Changelog |
| Interne Docs veralten | Compliance-Lücke | hoch ohne Pflege | Changelog-Pflicht | Stichprobe nach Releases | `prozesse/changelog.md` |

## Pflegeprozess

Nach jeder wesentlichen Dokument- oder Dependency-Änderung werden die Prüffragen A-01 bis A-10 erneut gegen den Tree gelesen. Geschlossene Abweichungen erhalten ein Datum in der Revisionshistorie, nicht nur im Fließtext.

## Revisionshistorie

| Datum | Autor/Rolle | Änderung | Anlass |
|---|---|---|---|
| 24.08.2026 | Entwicklung | Erstes Auditset; F-03 geschlossen durch Anlegen von `/internal-docs` | Pflichtstruktur und BubbleSort-Artefakt |
| 26.08.2026 | Entwicklung | Prüffrage A-05b für zoo.main UML ergänzt | CHG-2026-08-26-01 |
| 27.08.2026 | Entwicklung | Prüffrage A-05c für Sequenzdiagramme Bestellprozess ergänzt | CHG-2026-08-27-01 |
| 27.08.2026 | Entwicklung | A-04/A-05c um Bar-Weiterleitung und gemischte Bestellungen erweitert | CHG-2026-08-27-07 |
| 27.08.2026 | Entwicklung | A-05c: UML 11 nur noch Küchenausschnitt; Servieren/Bezahlen gegen UML 07 | CHG-2026-08-27-09 |
| 27.08.2026 | Entwicklung | A-05c Evidence um PlantUML von UML 10 ergänzt | CHG-2026-08-27-10 |
