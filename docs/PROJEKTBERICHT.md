# Umfassender Projektbericht: Smart Restaurant

**Projektbezeichnung:** Digitales Bestell- und Verwaltungssystem für eine Gaststätte  
**Projekt-Repository:** `niki356565rt/LF10-Projekt`  
**Auftragnehmer (Szenario):** Another Great Solution GmbH (Team „Der Dreier“)  
**Auftraggeber (Szenario):** Regionales Gastronomieunternehmen  
**Projektlaufzeit:** 2 Wochen (10 Arbeitstage / 320 Personenstunden)  
**Dokumentenstand:** 24. September 2026  
**Status:** Vollständige Projektdokumentation, Java-Implementierung & Konsolidierter Bericht  

---

## 1. Management Summary (Executive Summary)

Das Vorhaben **„Smart Restaurant“** befasst sich mit der Konzeption, Planung, Architektur, Datenbankmodellierung, physikalischen Datenbankerstellung in MariaDB/MySQL & SQLite sowie der **vollständigen Software-Implementierung in Java (Swing GUI + Standard SQL)** für einen mittelständischen Gastronomiebetrieb. Durch die Ablösung der bisherigen papierbasierten Bestellaufnahme wird der gesamte Betriebsablauf – von der Tisch- und Bestellaufnahme am Gästetisch über die Zubereitung in der Küche bzw. Bar bis hin zur Servierung, Rechnungsstellung und Abrechnung – durchgängig digitalisiert und transparent protokolliert.

Im Rahmen der Projektlaufzeit wurden sämtliche Fach- und IT-Grundlagen erarbeitet:
- **Anforderungs- & Prozessanalyse:** Definition von 26 strukturierten Muss- und Soll-Anforderungen (IDs `A-01`–`AD-10`) für die Funktionsbereiche Service, Küche und Administration.
- **Make-or-Buy-Entscheidung:** Qualifizierte Bewertung gegen Branchen-SaaS mit einer klaren Entscheidung für die **Eigenentwicklung (Make)** zur Sicherstellung der Erweiterbarkeit und Prozesskonformität.
- **Projektplanung & Agiles Vorgehen:** Strukturierung in 6 Phasen und 4 Sprints inkl. umfassender Risikomatrix (10 klassifizierte Projektrisiken).
- **Projekttagebuch-Regel & Rekonstruktion:** Etablierung einer permanenten Projektregel (`.cursor/rules/projekttagebuch.mdc`) zur parallelen Führung des Projekttagebuchs sowie Erstellung der vollständigen, rekonstituierten Tagebuch-Dokumentation als PDF ([`abgabe/Projekttagebuch.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Projekttagebuch.pdf)).
- **Kosten- & Betriebskalkulation:** Vollständige Kostenrechnung über 320 Arbeitsstunden mit Herstellkosten von **14.900,00 €**, Selbstkosten von **17.880,00 €** und einem Angebotspreis von **19.668,00 € netto** (**23.404,92 € brutto**), ergänzt durch eine Zuordnung nach Einzel- und Gemeinkostenstellen.
- **Java-Softwareimplementierung & Standard-SQL:** Ausführung einer lauffähigen, objektorientierten Administrationssoftware in reinem Java (Swing GUI + JDBC + Standard SQL-Abfragen) unter `src/com/smartrestaurant/`.
- **GUI-Mockups & UML-Klassendiagramm:** Detaillierte UI-Mockups (`docs/15-mockup-gui.md`) und ein vollständiges PlantUML-Klassendiagramm (`docs/16-klassendiagramm.puml`).
- **Automatisierte & Manuelle Qualitätssicherung:** Implementierung einer automatisierten Java-Testsuite (`DatabaseTest.java`) mit 100 % Erfolgsquote sowie Dokumentation des automatisierten Testkonzepts (`docs/17-testdokumentation.md`).
- **Entwickler- & Benutzerdokumentation (auch als PDF):** Ausführliche Dokumentation zur Kompilierung, Ausführung und Bedienung der Software als Markdown, HTML sowie als druckfertige PDF-Dateien ([`abgabe/Entwicklerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Entwicklerdokumentation.pdf) & [`abgabe/Benutzerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Benutzerdokumentation.pdf)).
- **Security, Compliance & ISO 27001:** Etablierung eines ISMS-Gesamtkonzepts nach ISO/IEC 27001:2022 (Annex A Mapping für 15 Kontrollen), DSGVO-Konformitätsprüfungen, Sicherheitsrichtlinien sowie ein vollständiges Audit-Framework mit 11 Prüfkriterien (`A-01`–`A-10`).

---

## 2. Projekttagebuch & Projektregeln

In den Projektregeln unter `.cursor/rules/projekttagebuch.mdc` ist verbindlich vorgegeben, dass ein **Projekttagebuch** parallel geführt werden muss. 
Sämtliche vergangenen Projektschritte von der Initialisierung am 18.08.2026 bis zur Softwareumsetzung und Dokumentation am 24.09.2026 wurden anhand der Git-Commit-Historie und Erstellungszeitpunkte chronologisch aufgearbeitet.

- **Projekttagebuch PDF:** [`abgabe/Projekttagebuch.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Projekttagebuch.pdf) (sowie [`docs/Projekttagebuch.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/Projekttagebuch.pdf))
- **HTML-Quelle:** [`docs/Projekttagebuch.html`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/Projekttagebuch.html)

---

## 3. Java-Softwareimplementierung & Objektorientiertes Design

### 3.1 Software-Architektur (Java 17 & Swing)
Die entwickelte Administrationssoftware ist vollständig in **Java 17** ohne externe ORM-Frameworks unter Verwendung von **Standard-SQL-Abfragen über JDBC** umgesetzt.

#### Modulstruktur (`src/com/smartrestaurant/`):
- **`Main.java`**: Hauptklasse & Einstiegspunkt der Anwendung.
- **`AdminGUI.java`**: Grafische Swing-Benutzeroberfläche mit 5 Reitern (Mitarbeiter, Artikel, Tische, Bestellungen, System-Status).
- **`DatabaseManager.java`**: Data Access Object (DAO) kapselt alle Standard-SQL-Queries (`CREATE TABLE`, `SELECT`, `INSERT`, `UPDATE`, `DELETE`).
- **`Mitarbeiter.java`**: Entitätsklasse für Mitarbeiterdaten.
- **`Artikel.java`**: Entitätsklasse für Speisen und Getränke.
- **`Tisch.java`**: Entitätsklasse für Gaststättentische.
- **`Bestellung.java`**: Entitätsklasse für Bestellungen.
- **`DatabaseTest.java`**: Automatisierte Testsuite.

---

## 4. Testdokumentation & Dokumentations-PDFs

- **Projekttagebuch PDF:** [`abgabe/Projekttagebuch.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Projekttagebuch.pdf)
- **Entwicklerdokumentation PDF:** [`abgabe/Entwicklerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Entwicklerdokumentation.pdf)
- **Benutzerdokumentation PDF:** [`abgabe/Benutzerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Benutzerdokumentation.pdf)
- **ISMS-Systemdokumentation (ISO 27001) PDF:** [`abgabe/ISMS-Systemdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/ISMS-Systemdokumentation.pdf)

---

## 5. Projektergebnis & Ausblick

Das Projekt *Smart Restaurant* beinhaltet die vollständige, lauffähige Java-Softwareanwendung, Mockups, Klassendiagramme, automatisierte Testsuites, SQL-Dumps sowie Projekttagebuch, Entwickler- und Benutzerdokumentationen im Markdown-, HTML- und PDF-Format.

---
*Bericht erstellt und verifiziert durch das Entwicklungsteam „Der Dreier“ (Another Great Solution GmbH).*
