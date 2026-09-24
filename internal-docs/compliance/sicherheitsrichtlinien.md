# Sicherheitsrichtlinien

## Einleitung

Diese Richtlinie legt Schutzmaßnahmen für den Repository-Betrieb und Soll-Maßnahmen für die geplante Smart-Restaurant-Anwendung fest. Technische Verfahren (Algorithmen, Provider), die nicht im Repository stehen, werden als **klärungsbedürftig** gekennzeichnet.

## Geltungsbereich

Gilt für alle, die am Repository oder an einer späteren Implementierung der Muss-Anforderungen arbeiten. Gilt nicht für die IT der Gaststätte außerhalb dieses Vorhabens, solange keine Anbindung existiert.

## Begriffe und Definitionen

| Begriff | Definition |
|---|---|
| Fachrolle | Service, Küche, Bar oder Administration; die Bar-Erweiterung ist in UML 10 modelliert, aber in A-12 noch nicht abschließend als Rolle definiert. |
| Statusprotokoll | Nach A-13: Mitarbeiter, Zeitpunkt, Bestellung bei Statuswechsel. |
| Secret | Passwort, Token, Schlüssel; darf nicht im Git liegen. |
| Trust Boundary | Grenze, an der sich das Vertrauensniveau ändert (z. B. Client zu Server). |

## Verantwortlichkeiten

| Tätigkeit | Projektleitung | Entwicklung | Auftraggeber | Compliance-Rolle |
|---|---|---|---|---|
| Richtlinie freigeben | A | C | C | R |
| AuthN/AuthZ implementieren | A | R | C | C |
| Secrets-Handling | A | R | I | C |
| Logging-Konzept Fachprotokoll | A | R | C | C |
| Patchen von npm-Abhängigkeiten | A | R | I | I |

## Detailbeschreibung

### Authentifizierung

Im Repository ist **keine Authentifizierung** implementiert (kein Login-Code, kein Identity-Provider). Soll vor erstem produktiven Speichern von Mitarbeiter- oder Bestelldaten: eindeutiger Benutzername (A-11), geheimes Passwort oder gleichwertiges Verfahren, Sitzungsbindung. MFA: **nicht spezifiziert**; für Administration empfohlen, Entscheidung offen.

### Autorisierung und Rollenmodell

Geplante Fachrollen und grobe Rechte:

| Rolle | Darf laut Katalog |
|---|---|
| Service | Tischwahl, Bestellung anlegen, serviert/bezahlt setzen, Rechnung (Soll) |
| Küche | Offene Speisenbestellungen sehen, in Bearbeitung/fertig setzen; keine reinen Getränke (K-05) |
| Bar | Ausschließlich Getränkepositionen sehen; Statusrechte sind vor Implementierung zu spezifizieren |
| Administration | Mitarbeiter, Artikel, Tische, Auswertungen (Soll) |

Technische Durchsetzung (Middleware, Policies): **nicht vorhanden**. Es darf keine gemeinsame Admin-Schnittstelle ohne Rollentrennung in Produktion gehen.

### Passwort- und MFA-Regeln

Soll, sobald Auth existiert: keine Klartextspeicherung, kein Default-Passwort in Docs, Mindestlänge und eindeutige Initialvergabe durch Administration. Hash-Verfahren (z. B. Argon2id/bcrypt) ist **nicht festgelegt**, weil kein Auth-Code existiert. MFA-Faktor und IdP: klärungsbedürftig.

### Netzwerkzonierung

Aktuell nur lokale Arbeitsplätze. Geplante Zonen: Endgerät Service/Küche/Bar, Anwendungsserver, Datenspeicher. Firewall- und VLAN-Design: **nicht im Repo**. Trust Boundary liegt fachlich zwischen Personal-Clients und Systempartition (siehe UML-Partitionen Service/Systemkern/Küche/Bar).

### Secrets-Management

Verbot, Dateien wie `.env` oder `credentials.json` zu committen. Aktueller Workspace-Stand enthält keine solchen Dateien. PlantUML-JAR und `node_modules` sind lokal. Kein Vault, kein CI-Secret-Store nachweisbar.

### Verschlüsselung

- In transit: für eine spätere Web-App TLS; **kein** Server, daher kein Zertifikat im Repo.
- At rest: Datenbank- oder Datenträgerverschlüsselung **nicht festgelegt**.

### Logging und Monitoring

Fachlich: Statuswechsel protokollieren (A-13, UML-Log-Aktionen). Technisches Security-Logging (fehlgeschlagene Logins, Admin-Änderungen): geplant, nicht implementiert. Kein Monitoring-Stack (kein Prometheus/Sentry im Repo).

### Backup

Dokumente: Git-Historie. Fachdaten: Backup-Rhythmus und Restore-Test **klärungsbedürftig** vor Go-Live.

### Patch- und Vulnerability-Management

npm-Abhängigkeiten über Lockfile pinnen. Vor Abgabe und nach Dependency-Änderungen `npm audit` (Ergebnis hier nicht als Datei vorgehalten – bei Ausführung zu den Changelog-Einträgen legen). JDK und Chrome liegen in der Verantwortung der lokalen Arbeitsplatzhärtung.

## Nachweise und Artefakte

Anforderungskatalog A-09 und A-11 bis A-13, UML `docs/07-uml-aktivitaetsdiagramm-bestellprozess.puml`, `docs/10-uml-sequenzdiagramm-bestellung-aufnehmen.drawio`, `.gitignore`, `package-lock.json`.

## Risiken und Kontrollen

| Risiko | Auswirkung | Eintrittswahrscheinlichkeit | Maßnahme | Kontrolle | Nachweis |
|---|---|---|---|---|---|
| App ohne Auth | beliebige Statusänderungen | hoch bei naiver Umsetzung | AuthZ vor Persistenz | Review erstes Backend | diese Richtlinie |
| Secrets im Git | Kompromittierung | niedrig | gitignore, keine `.env` | Pre-commit Sichtprüfung | Git |
| Öffentliche Admin-URL | Manipulation Stammdaten | mittel später | Netztrennung / Login | Architekturreview | `architektur-uebersicht.md` |
| Bar-Ansicht ohne eigene Rolle oder Filterung | Unberechtigter Einblick in Speise- oder Zahlungsdaten | mittel bei Erweiterung | Least-Privilege-Rolle und serverseitige Filterung auf Getränkepositionen festlegen | Rollenreview vor Implementierung | UML 10; diese Richtlinie |
| Ungepatchtes docx/jszip | Lieferkettenlücke | niedrig | Lockfile + audit | Changelog bei Update | `package-lock.json` |

## Pflegeprozess

Die Richtlinie wird angepasst, sobald ein Framework, eine Datenbank, ein Auth-Provider oder ein Hosting-Ziel gewählt ist. Bis dahin bleiben die Soll-Abschnitte verbindlich für die Implementierung.

## Revisionshistorie

| Datum | Autor/Rolle | Änderung | Anlass |
|---|---|---|---|
| 24.08.2026 | Entwicklung | Soll-Regeln plus ehrlicher Ist-Stand ohne App-Code | Aufbau `/internal-docs` |
| 27.08.2026 | Entwicklung | Bar-Rolle als offene Soll-Rolle mit Least-Privilege-Anforderung ergänzt | CHG-2026-08-27-07 |
