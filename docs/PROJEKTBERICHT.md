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
- **Kosten- & Betriebskalkulation:** Vollständige Kostenrechnung über 320 Arbeitsstunden mit Herstellkosten von **14.900,00 €**, Selbstkosten von **17.880,00 €** und einem Angebotspreis von **19.668,00 € netto** (**23.404,92 € brutto**), ergänzt durch eine Zuordnung nach Einzel- und Gemeinkostenstellen.
- **Java-Softwareimplementierung & Standard-SQL:** Ausführung einer lauffähigen, objektorientierten Administrationssoftware in reinem Java (Swing GUI + JDBC + Standard SQL-Abfragen) unter `src/com/smartrestaurant/`.
- **GUI-Mockups & UML-Klassendiagramm:** Detaillierte UI-Mockups (`docs/15-mockup-gui.md`) und ein vollständiges PlantUML-Klassendiagramm (`docs/16-klassendiagramm.puml`).
- **Automatisierte & Manuelle Qualitätssicherung:** Implementierung einer automatisierten Java-Testsuite (`DatabaseTest.java`) mit 100 % Erfolgsquote sowie Dokumentation des automatisierten Testkonzepts (`docs/17-testdokumentation.md`).
- **Entwickler- & Benutzerdokumentation (auch als PDF):** Ausführliche Dokumentation zur Kompilierung, Ausführung und Bedienung der Software als Markdown, HTML sowie als druckfertige PDF-Dateien ([`abgabe/Entwicklerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Entwicklerdokumentation.pdf) & [`abgabe/Benutzerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Benutzerdokumentation.pdf)).
- **Security, Compliance & ISO 27001:** Etablierung eines ISMS-Gesamtkonzepts nach ISO/IEC 27001:2022 (Annex A Mapping für 15 Kontrollen), DSGVO-Konformitätsprüfungen, Sicherheitsrichtlinien sowie ein vollständiges Audit-Framework mit 11 Prüfkriterien (`A-01`–`A-10`).

---

## 2. Projektgegenstand & Ausgangslage

### 2.1 Ausgangssituation & Problemstellung
In der Gaststätte werden Bestellungen traditionell manuell mit Papier und Stift aufgenommen. Dieser analoge Prozess führt in der Praxis zu prägnanten Engpässen:
- **Kommunikationsverluste & Handschriftenprobleme:** Lesefehler bei der Übermittlung von Sonderwünschen oder Artikeln an die Küche.
- **Verzögerungen:** Physische Wege des Servicepersonals zwischen Gästetisch und Küche bremsen den Gesamtablauf.
- **Fehlende Transparenz:** Kein Echtzeit-Überblick über offene, in Bearbeitung befindliche oder fertiggestellte Speisen und Getränke.
- **Manuelle Abrechnung:** Erhöhter Fehleraufwand bei der Rechnungsstellung und Rechnungsaufteilung.

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

### 3.2 UI-Mockups & Klassendiagramm
- UI-Mockups: [`docs/15-mockup-gui.md`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/15-mockup-gui.md)
- PlantUML-Klassendiagramm: [`docs/16-klassendiagramm.puml`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/16-klassendiagramm.puml) / SVG: [`docs/16-klassendiagramm.svg`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/16-klassendiagramm.svg)

---

## 4. Testdokumentation & Dokumentations-PDFs

- **Entwicklerdokumentation PDF:** [`abgabe/Entwicklerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Entwicklerdokumentation.pdf) (sowie [`docs/Entwicklerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/Entwicklerdokumentation.pdf))
- **Benutzerdokumentation PDF:** [`abgabe/Benutzerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/abgabe/Benutzerdokumentation.pdf) (sowie [`docs/Benutzerdokumentation.pdf`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/Benutzerdokumentation.pdf))
- **Testdokumentation:** [`docs/17-testdokumentation.md`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/17-testdokumentation.md)

---

## 5. Projektergebnis & Ausblick

Das Projekt *Smart Restaurant* beinhaltet die vollständige, lauffähige Java-Softwareanwendung, Mockups, Klassendiagramme, automatisierte Testsuites, SQL-Dumps sowie Entwickler- und Benutzerdokumentationen im Markdown-, HTML- und PDF-Format.

---
*Bericht erstellt und verifiziert durch das Entwicklungsteam „Der Dreier“ (Another Great Solution GmbH).*
