# DSGVO-Dokumentation

## Einleitung

Diese Dokumentation beschreibt Verarbeitungstätigkeiten im Sinne der DSGVO, soweit sie aus dem Repository ableitbar sind, und die **geplante** Verarbeitung der Fachanwendung Smart Restaurant. Es werden keine personenbezogenen Echtdaten behauptet, die nicht im Repo vorkommen.

## Geltungsbereich

Gilt für (a) den Umgang mit Inhalten dieses Git-Repositories und (b) die geplante Verarbeitung durch die Gaststätten-Software laut Anforderungskatalog. Nicht im Geltungsbereich: Schulnetz, privates Endgerät der Autoren, GitHub-Konten Dritter – außer soweit der öffentliche Remote Metadaten verarbeitet (klärungsbedürftige Auftragsverarbeitung durch GitHub).

## Begriffe und Definitionen

| Begriff | Definition |
|---|---|
| Betroffene Person | Natürliche Person, deren Daten verarbeitet werden. |
| Verantwortlicher | Stelle, die über Zwecke und Mittel entscheidet. Für die geplante App: der Gaststättenbetrieb (Auftraggeber). Für das öffentliche Repo: die Repository-Owner, solange Inhalte veröffentlicht werden. |
| Verzeichnis von Verarbeitungstätigkeiten | Übersicht nach Art. 30 DSGVO. |
| DSFA | Datenschutz-Folgenabschätzung nach Art. 35 DSGVO. |

## Verantwortlichkeiten

| Tätigkeit | Projektleitung | Entwicklung | Auftraggeber | Compliance-Rolle |
|---|---|---|---|---|
| Zwecke der Fachverarbeitung festlegen | C | C | R/A | C |
| TOMs der App umsetzen | A | R | C | C |
| Repo ohne Echtdaten halten | A | R | I | C |
| Betroffenenanfragen (Betrieb) | I | C | R/A | C |
| DSFA-Schwellenwert prüfen | A | C | C | R |

## Detailbeschreibung

### Verzeichnis von Verarbeitungstätigkeiten

| ID | Tätigkeit | Zweck | Kategorien Betroffener | Datenkategorien | Rechtsgrundlage | Speicherdauer | Empfänger |
|---|---|---|---|---|---|---|---|
| V-01 | Versionierung der Projektdokumentation | Nachvollziehbare Abgabe und Zusammenarbeit | Autoren (Git-Metadaten: Name/E-Mail falls in Commits) | Commit-Metadaten, Dokumenttexte | Berechtigtes Interesse Art. 6 Abs. 1 lit. f bzw. Vertrag/Ausbildung, soweit einschlägig | Lebensdauer des Repositories | Git-Hoster (GitHub laut `package.json`) |
| V-02 | Erzeugung von Informationsblättern | Schulische Abgabe (`abgabe/`) | Keine realen Gäste; ideologische Lehrtexte | Keine personenbezogenen Gästedaten | Art. 6 Abs. 1 lit. e/b analog Ausbildung; Inhalte sind sachlich, nicht personenbezogen | Abgabezeitraum plus Aufbewahrung Schule | Lehrkräfte / TSC-Upload (Prozess außerhalb Repo) |
| V-03 | Geplante Bestellverarbeitung | Betrieb der Gaststätte | Gäste (indirekt über Tisch/Bestellung), Mitarbeiter | Mitarbeitername, Benutzername, Rolle; Bestellungen, Zeiten, Statusprotokoll | Art. 6 Abs. 1 lit. b (Beschäftigte/Vertrag) und lit. f (Betriebsablauf); Gäste typischerweise keine Identitätsdaten laut Katalog – Tischnummer, Positionen, Zeit | **nicht im Repo festgelegt** | Service, Küche, Administration; kein Zahlungsdienstleister im Umfang |

Kategorien laut Katalog: Mitarbeiter (Name, Benutzername, Rolle), Tische (Nummer, Kapazität, Status), Artikel (Name, Preis, Kategorie), Bestellungen (Datum/Uhrzeit, Positionen, Status), Protokoll (Mitarbeiter, Zeitpunkt, Bestellung). Keine Gesundheitsdaten, keine besonderen Kategorien Art. 9 im Katalog.

### Betroffenenrechte

Für V-03 müssen Auskunft, Berichtigung, Löschung und Einschränkung über die Admin-Funktionen (Mitarbeiter/Artikel) bzw. betriebliche Prozesse abgebildet werden. Für V-01 gelten die Möglichkeiten des Git-Hosters und interne Commit-Hygiene (keine Klarnamen Dritter in Docs). Technische Umsetzung der Betroffenenrechte in Software: **nicht vorhanden**.

### TOMs (technisch-organisatorisch)

Aktuell: lokale Bearbeitung, `.gitignore` für Build-Ausgaben, keine Secrets-Dateien im Workspace-Stand. Geplant: Zugriff nach Rolle (A-12), Protokoll der Statuswechsel (A-13), keine öffentliche Gäste-App. Verschlüsselung, MFA und Hosting-TOM: **nicht ableitbar**.

### Auftragsverarbeiter

| Stelle | Rolle | Drittland | Nachweis |
|---|---|---|---|
| GitHub (github.com/niki356565rt/LF10-Projekt) | Hosting des Git-Remotes | USA möglich (GitHub) | URL in `package.json`; AV-Vertrag/SCC **nicht im Repo** |
| npm Registry | Bezug von `docx` | USA möglich | `package-lock.json` resolved URLs |
| Schulplattform TSC | Abgabe-Upload | unbekannt | nur in Gesprächskontext, nicht im Code |

### Drittlandtransfers

Öffentliches GitHub und npm können Übermittlungen in Drittländer auslösen. Ergänzende Garantien (SCC, DPF) sind **nicht im Repository dokumentiert** und müssen vom Verantwortlichen mit dem jeweiligen Anbieter geklärt werden.

### DSFA-Schwellenwertanalyse

Kriterien (Kurzprüfung): keine systematische umfangreiche Überwachung; keine Art.-9-Daten im Katalog; keine automatisierte Entscheidung mit Rechtswirkung; begrenzter Kreis Beschäftigter; Bestellungen ohne zwingende Gästeidentität. **Ergebnis: Art. 35 DSGVO voraussichtlich nicht ausgelöst** für den im Katalog beschriebenen Kern. Neu bewerten bei Einführung von Gästekonten, Tracking, Video, Scoring oder umfangreichem Profiling. Offene Annahme: keine Anbindung von Zahlungsmitteln, daher kein PCI-Kontext.

## Nachweise und Artefakte

`docs/01-anforderungskatalog.md`, `docs/05-stakeholder-analyse.md` (Stakeholder, keine Datenfelder darüber hinaus), UML-Statusprotokoll, `package.json` homepage.

## Risiken und Kontrollen

| Risiko | Auswirkung | Eintrittswahrscheinlichkeit | Maßnahme | Kontrolle | Nachweis |
|---|---|---|---|---|---|
| Mitarbeiterdaten in öffentlichem Repo | Unbefugte Kenntnisnahme | niedrig aktuell / hoch bei Copy-Paste aus Betrieb | Nur fiktive/anonymisierte Beispiele | Review `abgabe/` und `docs/` | Git-Diff |
| Unklare Verantwortlichkeit GitHub | Lücken bei Betroffenenrechten | mittel | AV/SCC mit Hoster oder privates Repo | Vertragslage prüfen | klärungsbedürftig |
| Protokoll A-13 ohne Löschkonzept | Verstoß gegen Speicherbegrenzung | mittel bei Betrieb | Frist und Löschpfad vor Go-Live festlegen | DSGVO-Review vor Persistenz | dieses Dokument |

## Pflegeprozess

Das Verzeichnis wird aktualisiert, sobald persistente Speicherung, Login, Hosting oder neue Empfänger eingeführt werden. Die Schwellenwertanalyse ist bei jeder neuen Datenkategorie zu wiederholen.

## Revisionshistorie

| Datum | Autor/Rolle | Änderung | Anlass |
|---|---|---|---|
| 24.08.2026 | Entwicklung | Verzeichnis V-01 bis V-03, DSFA-Kurzprüfung | Aufbau `/internal-docs` |
