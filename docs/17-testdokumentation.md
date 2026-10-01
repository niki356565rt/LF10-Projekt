# Testdokumentation & Qualitätssicherungsbericht

**Projektbezeichnung:** Smart Restaurant – Digitales Bestell- und Verwaltungssystem  
**Lernfeld / Kontext:** Lernfeld 10 (LF10) – Gestalten von Softwareprojekten / IHK-Abschlussprojekt Standard  
**Projektteam:** „Der Dreier“ (Another Great Solution GmbH)  
**Auftraggeber:** Regionaler Gastronomiebetrieb  
**Programmiersprache:** Java 17 (OpenJDK)  
**Datenbank:** SQLite 3 über Standard JDBC & SQL  
**Dokumentenversion:** 1.2 (Final)  
**Datum:** 01. Oktober 2026  
**Status:** Abgenommen / 100 % Tests bestanden  

---

## Inhaltsverzeichnis
1. [Einleitung & Testziel](#1-einleitung--testziel)
2. [Teststrategie & Teststufen (Testpyramide)](#2-teststrategie--teststufen-testpyramide)
3. [Testumgebung & Testmittel](#3-testumgebung--testmittel)
4. [Qualitätskriterien & Abbruchbedingungen](#4-qualitätskriterien--abbruchbedingungen)
5. [Detaillierter Testkatalog (Manuelle & Systemtests)](#5-detaillierter-testkatalog-manuelle--systemtests)
6. [Automatisierte Testsuite (Integrationstests & DAO)](#6-automatisierte-testsuite-integrationstests--dao)
7. [Sicherheitstests & Grenzwertanalysen](#7-sicherheitstests--grenzwertanalysen)
8. [Fehlermanagement & Abweichungsbericht (Defect-Lifecycle)](#8-fehlermanagement--abweichungsbericht-defect-lifecycle)
9. [Testfazit & Freigabeempfehlung](#9-testfazit--freigabeempfehlung)

---

## 1. Einleitung & Testziel

Ziel der vorliegenden Testdokumentation ist der lückenlose Nachweis der funktionalen Korrektheit, Datenintegrität, Robustheit und Benutzerfreundlichkeit der Administrationssoftware **Smart Restaurant**. 

Die Qualitätssicherung orientiert sich an den Vorgaben des Rahmenlehrplans für Fachinformatiker Anwendungsentwicklung (Lernfeld 10).

### Hauptziele der Testdurchführung:
- **Verifikation der CRUD-Funktionen:** Fehlerfreie Abwicklung aller Create-, Read-, Update- und Delete-Operationen für Personal, Speisen/Getränke, Tische und Bestellungen.
- **Transaktionssicherheit & Datenintegrität:** Einhaltung relationaler Integritätsbedingungen (Primary Keys, Foreign Keys, Unique Constraints) in SQLite.
- **Robuste Fehlerbehandlung (Exception Handling):** Absicherung gegen Fehleingaben (z. B. Text statt Zahlen, negative Werte, Duplikate) und Vorbeugung von Programmabstürzen.
- **Sicherheitsprüfung:** Absicherung gegen SQL-Injection durch konsequente Nutzung parametrisierter SQL-Abfragen (`PreparedStatement`).

---

## 2. Teststrategie & Teststufen (Testpyramide)

Die Qualitätssicherung folgt dem Prinzip der agilen Testpyramide nach Mike Cohn. Durch eine ausgewogene Kombination automatisierter Modul-/Integrationstests und systematischer manueller System- und Abnahmetests wird eine maximale Fehlererkennungsrate bei minimalem manuellen Wiederholungsaufwand gewährleistet.

```
            / \
           /   \        Akzeptanztests (UAT)
          / UAT \       Endbenutzer-Szenarien & Gastro-Workflows
         /-------\
        /  System \     GUI- & Systemtests
       /  & GUI    \    Manuelle Maskentests & Wizard-Prüfungen
      /-------------\
     / Integrations- \  Datenbank- & Schnittstellentests
    /  tests (JDBC)   \ Automatisierte Suite: DatabaseTest.java
   /-------------------\
  /     Unit-Tests      \ Isolierte Logikprüfungen (Validatoren,
 /_______________________\ Berechnungen, Formatierungen)
```

### Beschreibung der Teststufen:
1. **Unit-Tests (Komponententests):** Überprüfung isolierter Geschäftslogik (z. B. Parsen und Formatieren von Preisen mit Komma/Punkt, Rollenprüfungen).
2. **Integrationstests (DAO- / Datenbanktests):** Automatisierte Überprüfung des Zusammenspiels zwischen Java-Entitäten, dem `DatabaseManager` und der SQLite-Engine über JDBC.
3. **System- & GUI-Tests:** Manuelle Überprüfung aller Masken (`AdminGUI`), Tabellen, Wizard-Dialoge und Eingabefelder im Gesamtsystem.
4. **Akzeptanztests (User Acceptance Tests):** Validierung realistischer Arbeitsabläufe in der Gastronomie (z. B. Tischbelegung -> Bestellaufnahme -> Küchenzubereitung -> Bezahlung).

---

## 3. Testumgebung & Testmittel

Um reproduzierbare Ergebnisse sicherzustellen, wurden sämtliche Tests in einer standardisierten und dokumentierten Testumgebung durchgeführt.

| Komponente | Spezifikation Testumgebung |
|---|---|
| **Betriebssystem** | Microsoft Windows 11 Enterprise (64-Bit) / Getestet auch unter Ubuntu Linux 22.04 LTS |
| **Java Runtime Environment (JRE)** | OpenJDK 17.0.x (LTS) (Temurin / Oracle Standard) |
| **Datenbank-Engine** | SQLite Version 3.42+ embedded |
| **Treiber** | `sqlite-jdbc.jar` (Xerial SQLite JDBC Driver) |
| **Display-Auflösung** | 1920 × 1080 Pixel (Skalierung 100 % und 125 %), Minimalanforderung 1024 × 768 Pixel |
| **Eingabegeräte** | Tastatur, Maus, Touch-Display (Simulation Kassen-Terminal) |
| **Web-Schnittstelle** | Integrierter `WebServer.java` auf Port `8080`, getestet mit Edge & Chrome (Chromium Engine) |
| **Testdatenbestand** | Standard-Initialisierungsbestand: 3 Mitarbeiter, 6 Speisen/Getränke, 4 Tische, 2 Bestellungen |

---

## 4. Qualitätskriterien & Abbruchbedingungen

### Eintrittskriterien (Entry Criteria):
- Quellcode fehlerfrei mit `javac` (Target Java 17) ohne Warnungen kompiliert.
- Vorhandensein der SQLite-JDBC-Bibliothek im Classpath (`lib/sqlite-jdbc.jar`).
- Testdatenbestand und DDL-Skripte sind initialisierbar.

### Abbruchkriterien (Suspension Criteria):
- Fataler Datenbankfehler: Datenbankdatei `smart_restaurant.db` kann nicht erstellt, gesperrt oder beschrieben werden (I/O-Exception).
- Nicht behobene Laufzeit-Exceptions im Event Dispatch Thread (EDT) der GUI.

### Austritts- & Freigabekriterien (Exit / Release Criteria):
- 100 % der automatisierten Integrationstests (`DatabaseTest`) erfolgreich (`PASS`).
- 100 % der Testfälle mit Schweregrad „Kritisch“ (Blocker) und „Schwer“ (Major) erfolgreich abgeschlossen.
- Keine unbehandelten Exceptions bei ungültigen Anwendereingaben.
- Vollständige Traceability zu den Anforderungen aus dem Lastenheft (`A-01` bis `AD-10`).

---

## 5. Detaillierter Testkatalog (Manuelle & Systemtests)

Nachfolgend sind die durchgeführten manuellen System- und Oberflächentests tabellarisch dokumentiert. Jeder Testfall ist eindeutig identifizierbar und enthält Vorbedingungen, Soll- und Ist-Ergebnisse sowie den resultierenden Status.

| Test-ID | Testobjekt / Szenario | Vorbedingung & Eingabedaten | Erwartetes Ergebnis (Soll) | Tatsächliches Ergebnis (Ist) | Status |
|---|---|---|---|---|---|
| **T-SYS-01** | DB-Schema & Erstinitialisierung | Keine `smart_restaurant.db` vorhanden. Programmstart via `Main.main()`. | Datei `smart_restaurant.db` wird angelegt. Tabellen (`mitarbeiter`, `artikel`, `tisch`, `bestellung`) und Standarddaten werden erzeugt. | Datenbankdatei generiert, Tabellenstrukturen und Testdaten vollständig vorhanden. | **PASS** |
| **T-SYS-02** | WebServer-Start & Dashboard | Programmstart via `Main.main()`. Aufruf von `http://localhost:8080`. | Integrierter Java-Webserver startet parallel auf Port 8080; ausgelieferte HTML-Seite visualisiert Dashboard. | Seite `web/index.html` lädt mit Statuscode 200 im Browser. | **PASS** |
| **T-GUI-01** | Mitarbeiter anlegen (Erfolg) | Tab „Mitarbeiterverwaltung“. Eingabe Name: „Maximilian Weber“, User: „mweber“, Rolle: „Service“. Klick auf „Hinzufügen“. | Datensatz wird in SQLite gespeichert. Tabelle aktualisiert sich sofort um die neue Zeile. Eingabefelder leeren sich. | Datensatz sofort in JTable sichtbar; DB enthält neuen Mitarbeiter mit ID. | **PASS** |
| **T-GUI-02** | Mitarbeiter Validierung (Leerfelder) | Tab „Mitarbeiterverwaltung“. Eingabe Name: „“, User: „“. Klick auf „Hinzufügen“. | Dialogfenster mit Warnmeldung: „Bitte alle Felder ausfüllen!“. Kein DB-Insert. | Warnungs-Modal erscheint; Datenbestand bleibt unverändert. | **PASS** |
| **T-GUI-03** | Mitarbeiter Duplikat-Benutzername | Eingabe Name: „Max Neuer“, User: „mweber“ (bereits vergeben). | Fehlermeldung bezüglich Unique-Constraint / „Fehler beim Hinzufügen! Benutzername existiert bereits“. | Fehlermeldung wird abgefangen, kein inkonsistenter Datensatz. | **PASS** |
| **T-GUI-04** | Mitarbeiter löschen | Mitarbeiter „Maximilian Weber“ in JTable markiert. Klick auf „Löschen“. | Datensatz wird aus DB gelöscht. Zeile verschwindet aus JTable. | Mitarbeiter wird gelöscht und Tabelle aktualisiert. | **PASS** |
| **T-GUI-05** | Artikel mit Kommapreis anlegen | Tab „Artikelverwaltung“. Name: „Spaghetti Carbonara“, Kat: „Hauptspeisen“, Preis: „13,50“. Klick auf „Hinzufügen“. | System akzeptiert deutsches Komma-Format und wandelt intern sauber in `13.50` (Double). Speicherung in DB. | Artikel mit `13.50 €` formatiert in Tabelle angezeigt. | **PASS** |
| **T-GUI-06** | Artikel Validierung (Ungültiger Preis) | Name: „Cola 0,5l“, Kat: „Getränke“, Preis: „drei_fuffzich“. Klick auf „Hinzufügen“. | Abfang der `NumberFormatException`. Hinweisdialog: „Gültigen Preis eingeben!“. Kein Insert. | Dialogfenster erscheint; keine Exception auf der Konsole. | **PASS** |
| **T-GUI-07** | Artikel Validierung (Negativer Preis) | Name: „Minus-Pizza“, Kat: „Hauptspeisen“, Preis: „-5.00“. | Validierung meldet ungültigen Betrag (Preis muss > 0 sein). Kein DB-Eintrag. | Hinweisdialog erscheint; Eintrag wird abgelehnt. | **PASS** |
| **T-GUI-08** | Artikel Wizard Dialog | Klick auf Button „Neuer Artikel (Wizard)“. | Mehrstufiger bzw. strukturierter Wizard öffnet sich; nach Bestätigung erscheint Artikel in JTable. | Wizard-Dialog öffnet modal, Validierung greift, Artikel angelegt. | **PASS** |
| **T-GUI-09** | Tisch anlegen (Erfolg) | Tab „Tischverwaltung“. Tisch-Nr.: 12, Kapazität: 6, Status: „frei“. | Neuer Tisch 12 wird in DB registriert und in Tabelle aufgeführt. | Tisch mit Kapazität 6 und Status „frei“ angelegt. | **PASS** |
| **T-GUI-10** | Tisch Duplikat-Tischnummer | Tisch-Nr.: 12 erneut eingeben. Klick auf „Hinzufügen“. | Unique-Constraint greift: Fehlermeldung „Tischnummer existiert bereits“. | Insert wird verhindert; Hinweisbox informiert Anwender. | **PASS** |
| **T-GUI-11** | Tisch Kapazität Validierung | Tisch-Nr.: 15, Kapazität: „null“ oder „0“. | Validierungsfehler: Kapazität muss eine positive Ganzzahl sein (mind. 1). | Dialog fordert gültige Kapazität; kein Absturz. | **PASS** |
| **T-GUI-12** | Bestellstatus Weiterschalten (Workflow) | Tab „Bestellübersicht“. Bestellung #1 wählen (Status: „aufgegeben“). Klick auf „Status weiterschalten“. | Status wechselt deterministisch: `aufgegeben` -> `in Bearbeitung`. Neuer Status in UI und DB. | Status in JTable wechselt auf „in Bearbeitung“. | **PASS** |
| **T-GUI-13** | Bestellstatus Vollzyklus bis Bezahlung | Mehrfacher Klick auf „Status weiterschalten“ für selbe Bestellung. | Kette wird durchlaufen: `in Bearbeitung` -> `fertig` -> `serviert` -> `bezahlt`. Bei `bezahlt` kein Weiterschalten mehr möglich. | Phasenfolge wird exakt eingehalten; nach `bezahlt` erfolgt Endzustandsmeldung. | **PASS** |
| **T-GUI-14** | Bestellübersicht Join-Abfrage | Tab „Bestellübersicht“ öffnen. | Tabelle zeigt Tischnummer, Mitarbeiter-Klarname, Status, Zeitstempel und Gesamtsumme (SQL-JOIN über 3 Tabellen). | Alle Fremdschlüssel korrekt zu Klarnamen und Tischnummern aufgelöst. | **PASS** |
| **T-GUI-15** | System & DB Status Überwachung | Tab „System & DB Status“ aufrufen. | Anzeige von DB-Dateipfad, Verbindungsstatus („Verbunden“), SQLite-Treiberversion und Webserver-URL. | Grüne Statusanzeigen und korrekte System-Metriken sichtbar. | **PASS** |
| **T-GUI-16** | Tabellenaktualisierung per Refresh | Klick auf „Aktualisieren“ in beliebigen Reitern. | Tabelle lädt aktuellen Datenbestand neu aus SQLite ohne GUI-Flackern. | Tabellendaten werden ohne Fehler refreshed. | **PASS** |

---

## 6. Automatisierte Testsuite (Integrationstests & DAO)

Die automatisierte Testsuite `com.smartrestaurant.DatabaseTest` validiert alle CRUD-Funktionen und Statusübergänge auf Datenbankebene ohne Benutzereingriff.

### 6.1 Testcode-Architektur
Die Testsuite verwendet automatisierte Assertions (`assertCondition`). Scheitert eine Bedingung, bricht der Testlauf mit einer `RuntimeException` und aussagekräftiger Fehlerbeschreibung ab.

### 6.2 Testausführungsprotokoll (Originalauszug)
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
Execution Time: 42 ms | Assertions: 12 | Failures: 0 | Errors: 0
```

---

## 7. Sicherheitstests & Grenzwertanalysen

Im Rahmen des Prüfungsbereichs Anwendungsentwicklung wurden gezielte Sicherheitstests gegen typische Schwachstellen durchgeführt:

### 7.1 SQL-Injection-Verifikation
- **Testfall:** Eingabe von `' OR '1'='1` und `Admin'; DROP TABLE mitarbeiter; --` in Benutzername- und Namensfelder.
- **Erwartung:** Durch die ausschließliche Verwendung von `java.sql.PreparedStatement` mit Platzhaltern (`?`) werden Metazeichen strikt als literale Datenwerte interpretiert.
- **Ergebnis:** Keine Veränderung der SQL-Syntax. Eingaben werden als reiner Text gespeichert oder durch Validierung abgewiesen. **Erfolgreich bestanden.**

### 7.2 Rand- & Grenzwerte
- **Preiseingaben:** Getestet mit `0.01` (Minimalwert), `0,00` (abgewiesen), `999.99` (Höchstwert Speisekarte).
- **Namenslängen:** Getestet mit 1 Zeichen und Strings mit 250 Zeichen. Keine Buffer-Overflows oder GUI-Abschneidungen.

---

## 8. Fehlermanagement & Abweichungsbericht (Defect-Lifecycle)

Während der Implementierungs- und Testphase identifizierte Abweichungen wurden nach Schweregraden klassifiziert und im Rahmen der Sprints vollständig behoben:

| Bug-ID | Gefundener Fehler / Abweichung | Schweregrad | Ursache | Durchgeführte Korrekturmaßnahme | Status |
|---|---|---|---|---|---|
| **BUG-01** | Komma in Preisangaben führte zu `NumberFormatException` (z. B. `12,50`). | Mittel | Standard `Double.parseDouble()` verlangt englischen Punkt (`.`). | Vorverarbeitung der Eingabe: `.replace(',', '.')` implementiert. | **Behoben & Verifiziert** |
| **BUG-02** | Nach Löschen eines Datensatzes blieb Selektion auf ungültigem Index hängen. | Gering | JTable SelectionModel wurde nicht zurückgesetzt. | Aufruf von `table.clearSelection()` nach jedem Lösch- und Aktualisierungsvorgang. | **Behoben & Verifiziert** |
| **BUG-03** | Webserver warf Exception, wenn Port 8080 belegt war. | Mittel | Unbehandelte `BindException` bei Port-Kollision. | Try-Catch-Block mit sauberer Konsolenausgabe und Fallback hinzugefügt. | **Behoben & Verifiziert** |
| **BUG-04** | Status weiterschalten war auch bei bereits bezahlten Bestellungen aktiv. | Gering | Fehlende Prüfung auf den Endzustand `bezahlt`. | Bedingungsprüfung im `DatabaseManager`: Endzustand `bezahlt` bleibt unverändert. | **Behoben & Verifiziert** |

---

## 9. Testfazit & Freigabeempfehlung

Alle definierten Testfälle aus dem Testkatalog wurden vollständig und reproduzierbar durchgeführt. 

- **Gesamtergebnis:** 16 von 16 Systemtestfällen bestanden (100 %).
- **Automatisierte Suite:** 5 Testblöcke mit 12 Assertions fehlerfrei durchlaufen.
- **Kritische Fehler:** 0 offene Fehler.

### Freigabeurteil:
Die Software **Smart Restaurant Admin** erfüllt sämtliche funktionalen und qualitativen Anforderungen aus dem Anforderungskatalog (Lernfeld 10). Die Software ist stabil, datenkonsistent und ergonomisch bedienbar. 

**Empfehlung der Qualitätssicherung:**  
Das System wird hiermit uneingeschränkt für die Bereitstellung und den Produktivbetrieb im Gastronomieunternehmen freigegeben.

---
*Protokolliert und freigegeben durch das Qualitätssicherungsteam „Der Dreier“ (Another Great Solution GmbH).*
