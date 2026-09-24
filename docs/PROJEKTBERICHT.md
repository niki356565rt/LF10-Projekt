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
- **Java-Softwareimplementierung & Standard-SQL:** Ausführung einer lauffähigen, objektorientierten Administrationssoftware in reinet Java (Swing GUI + JDBC + Standard SQL-Abfragen) unter `src/com/smartrestaurant/`.
- **GUI-Mockups & UML-Klassendiagramm:** Detaillierte UI-Mockups (`docs/15-mockup-gui.md`) und ein vollstandiges PlantUML-Klassendiagramm (`docs/16-klassendiagramm.puml`).
- **Automatisierte & Manuelle Qualitätssicherung:** Implementierung einer automatisierten Java-Testsuite (`DatabaseTest.java`) mit 100 % Erfolgsquote sowie Dokumentation des automatisierten Testkonzepts (`docs/17-testdokumentation.md`).
- **Entwickler- & Benutzerdokumentation:** Ausführliche Dokumentation zur Kompilierung (`javac`), Ausführung (`java`) und Bedienung der Software (`docs/18-entwicklerdokumentation.md` & `docs/19-benutzerdokumentation.md`).
- **Security, Compliance & ISO 27001:** Etablierung eines ISMS-Gesamtkonzepts nach ISO/IEC 27001:2022 (Annex A Mapping für 15 Kontrollen), DSGVO-Konformitätsprüfungen, Sicherheitsrichtlinien sowie ein vollständiges Audit-Framework mit 11 Prüfkriterien (`A-01`–`A-10`).

---

## 2. Projektgegenstand & Ausgangslage

### 2.1 Ausgangssituation & Problemstellung
In der Gaststätte werden Bestellungen traditionell manuell mit Papier und Stift aufgenommen. Dieser analoge Prozess führt in der Praxis zu prägnanten Engpässen:
- **Kommunikationsverluste & Handschriftenprobleme:** Lesefehler bei der Übermittlung von Sonderwünschen oder Artikeln an die Küche.
- **Verzögerungen:** Physische Wege des Servicepersonals zwischen Gästetisch und Küche bremsen den Gesamtablauf.
- **Fehlende Transparenz:** Kein Echtzeit-Überblick über offene, in Bearbeitung befindliche oder fertiggestellte Speisen und Getränke.
- **Manuelle Abrechnung:** Erhöhter Fehleraufwand bei der Rechnungsstellung und Rechnungsaufteilung.

### 2.2 Zielsetzung & Projektauftrag
Ziel des Projekts ist die Entwicklung einer maßgeschneiderten Softwarelösung, die den Bestellprozess digital optimiert. Das System adressiert drei Kernbereiche:
1. **Service:** Schnelle Bestellerfassung direkt am Tisch, Einsicht in Tischstatus, Servieren und Rechnungsabschluss.
2. **Küche / Bar:** Echtzeit-Anzeige eingehender Speisen (Küche) und Getränke (Bar) in chronologischer Reihenfolge mit Statusmeldung.
3. **Administration:** Stammdatenpflege für Mitarbeiter, Speise- und Getränkekarten (Artikel) sowie Raumplanung (Tische) inklusive kaufmännischer Auswertungen.

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

### 3.2 UI-Mockups
Vor der GUI-Umsetzung wurden detaillierte Mockups für alle 5 Hauptbereiche erstellt und im Dokument [`docs/15-mockup-gui.md`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/15-mockup-gui.md) dokumentiert.

### 3.3 PlantUML-Klassendiagramm
Das objektorientierte Klassendesign ist im PlantUML-Klassendiagramm ([`docs/16-klassendiagramm.puml`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/16-klassendiagramm.puml)) spezifiziert und als Vektorgrafik ([`docs/16-klassendiagramm.svg`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/16-klassendiagramm.svg)) gerendert.

---

## 4. Testdokumentation & Konzept zum automatisierten Testen

### 4.1 Testdurchführung & Testergebnisse
Die automatisierte Testklasse `DatabaseTest` prüft alle SQL-Queries und Datenbank-CRUD-Operationen:
```text
=== AUTOMATISIERTER TEST: DatabaseManager & SQL ===
[PASS] 1. Datenbank erfolgreich initialisiert.
  ✓ Mitarbeiter konnte hinzugefügt werden.
  ✓ Mitarbeiter-Anzahl hat sich um 1 erhöht.
  ✓ Mitarbeiter konnte gelöscht werden.
[PASS] 2. Mitarbeiter CRUD-Operationen erfolgreich.
  ✓ Artikel konnte hinzugefügt werden.
  ✓ Artikel-Anzahl hat sich um 1 erhöht.
  ✓ Artikel konnte gelöscht werden.
[PASS] 3. Artikel CRUD-Operationen erfolgreich.
  ✓ Tisch konnte hinzugefügt werden.
  ✓ Tisch-Anzahl hat sich um 1 erhöht.
  ✓ Tisch konnte gelöscht werden.
[PASS] 4. Tisch CRUD-Operationen erfolgreich.
  ✓ Bestellungen vorhanden.
  ✓ Bestellstatus konnte auf 'in Bearbeitung' aktualisiert werden.
[PASS] 5. Bestellstatus-Update erfolgreich.

✅ ALLE AUTOMATISIERTEN TESTS ERFOLGREICH BESTANDEN!
```
Ausführliche manuelle & automatisierte Testergebnisse sind in [`docs/17-testdokumentation.md`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/17-testdokumentation.md) dokumentiert.

### 4.2 Vorteile des automatisierten Testens
- **Frühzeitige Fehlererkennung (Shift-Left):** Entwickler erkennen Regressionsfehler sofort beim lokalen Build.
- **Refactoring-Sicherheit:** Code & SQL-Abfragen können ohne Risiko optimiert werden.
- **Effizienz & Schnelligkeit:** Sekunden schnelle Durchführung statt langwieriger manueller UI-Klicks.
- **CI/CD Integration:** Automatische Qualitätsschranken vor Git-Commits.

---

## 5. Entwickler- & Benutzerdokumentation

- **Entwicklerdokumentation ([`docs/18-entwicklerdokumentation.md`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/18-entwicklerdokumentation.md)):** Enthält Kompilieranleitung (`javac -encoding UTF-8 -cp "lib/sqlite-jdbc.jar;src" -d bin src/com/smartrestaurant/*.java`), Ausführbefehl (`java -cp "lib/sqlite-jdbc.jar;bin" com.smartrestaurant.Main`) sowie DDL-Schema.
- **Benutzerdokumentation ([`docs/19-benutzerdokumentation.md`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/19-benutzerdokumentation.md)):** Ausführliche Schritt-für-Schritt Anwenderanleitung für die Bedienung aller 5 Tabs der Swing-Oberfläche.

---

## 6. Projektergebnis & Ausblick

Das Projekt *Smart Restaurant* beinhaltet die vollständige, lauffähige Java-Softwareanwendung, Mockups, Klassendiagramme, automatisierte Testsuites, SQL-Dumps sowie eine lückenlose Entwickler- und Benutzerdokumentation.

---
*Bericht erstellt und verifiziert durch das Entwicklungsteam „Der Dreier“ (Another Great Solution GmbH).*
