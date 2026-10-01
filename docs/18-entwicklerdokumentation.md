# Entwicklerdokumentation: Smart Restaurant Adminsoftware

**Projektbezeichnung:** Smart Restaurant – Digitales Bestell- und Verwaltungssystem  
**Lernfeld / Kontext:** Lernfeld 10 (LF10) – Gestalten von Softwareprojekten / IHK-Standard  
**Programmiersprache:** Java 17 (OpenJDK LTS)  
**GUI-Framework:** Java Swing (`javax.swing`) mit System Look & Feel  
**Datenbank-Engine:** SQLite 3 über standardkonforme JDBC-Treiber & SQL  
**Architekturmuster:** 3-Schichten-Architektur (Model-View-DAO)  
**Dokumentenversion:** 1.2 (Final)  
**Datum:** 01. Oktober 2026  
**Autoren:** Team „Der Dreier“ (Another Great Solution GmbH)  

---

## Inhaltsverzeichnis
1. [Architekturübersicht & Entwurfsprinzipien](#1-architekturübersicht--entwurfsprinzipien)
2. [Projekt- & Verzeichnisstruktur](#2-projekt---verzeichnisstruktur)
3. [Detailliertes Klassendesign & Komponenten](#3-detailliertes-klassendesign--komponenten)
4. [Datenbankmodell & Relationales Schema (3NF)](#4-datenbankmodell--relationales-schema-3nf)
5. [Eingebetteter WebServer & Schnittstellen](#5-eingebetteter-webserver--schnittstellen)
6. [Entwicklungsumgebung, Build-Prozess & Kompilierung](#6-entwicklungsumgebung-build-prozess--kompilierung)
7. [Clean Code, Programmierrichtlinien & Sicherheit](#7-clean-code-programmierrichtlinien--sicherheit)
8. [Erweiterungsmöglichkeiten & Wartung](#8-erweiterungsmöglichkeiten--wartung)

---

## 1. Architekturübersicht & Entwurfsprinzipien

Die Software **Smart Restaurant Admin** wurde als modulare Desktop-Anwendung nach dem Prinzip der klassischen **3-Schichten-Architektur** konzipiert. Ziel der Architektur ist eine strikte Trennung von Benutzeroberfläche (Präsentation), Datenzugriff (DAO) und Datenmodellierung (Domain Models), um hohe Wartbarkeit, Testbarkeit und Erweiterbarkeit sicherzustellen.

```
+-------------------------------------------------------------------------+
|                         PRÄSENTATIONSSCHICHT                            |
|             AdminGUI.java  |  Wizards  |  web/index.html (Web UI)        |
+-------------------------------------------------------------------------+
                                    |
                                    v (Methodenaufrufe)
+-------------------------------------------------------------------------+
|                       LOGIK- & DATENZUGRIFFSSCHICHT                     |
|           DatabaseManager.java (DAO)  |  WebServer.java (HTTP)          |
|      CRUD-Operationen, Prepared Statements, Status-State-Machine         |
+-------------------------------------------------------------------------+
                    |                                   ^
                    v (Instanziierung)                  | (Mappings)
+-------------------------------------------------------------------------+
|                             DOMÄNENSCHICHT                              |
|       Mitarbeiter.java | Artikel.java | Tisch.java | Bestellung.java     |
+-------------------------------------------------------------------------+
                                    |
                                    v (JDBC Connection)
+-------------------------------------------------------------------------+
|                             DATENSPEICHER                               |
|               SQLite 3 Datenbankdatei: smart_restaurant.db              |
+-------------------------------------------------------------------------+
```

### Wesentliche Entwurfsmuster (Design Patterns):
- **Data Access Object (DAO):** `DatabaseManager` kapselt sämtliche SQL-Befehle, Verbindungsaufbauten und `ResultSet`-Mappings. Die Benutzeroberfläche besitzt keinerlei Kenntnis über die physische Datenbankstruktur.
- **Model-View-Separation:** Trennung von UI-Code (`AdminGUI`) und POJO-Entitäten (`Mitarbeiter`, `Artikel`, `Tisch`, `Bestellung`).
- **Wizard-Pattern:** Auslagerung komplexerer Eingabeprozesse in modale Dialogfenster (`ArtikelWizardDialog`, `MitarbeiterWizardDialog`, `TischWizardDialog`).
- **Multi-Threading / Thread Separation:** Swing-Elemente laufen ausschließlich im *Event Dispatch Thread (EDT)* via `SwingUtilities.invokeLater()`; der eingebettete Webserver nutzt einen `CachedThreadPool` im Hintergrund.

---

## 2. Projekt- & Verzeichnisstruktur

Das Projektverzeichnis ist übersichtlich nach Verantwortungsbereichen organisiert:

```
Projektarbeit/
 ├── bin/                           # Kompilierte .class-Dateien
 ├── lib/
 │    └── sqlite-jdbc.jar           # Xerial SQLite JDBC-Treiber
 ├── src/
 │    └── com/smartrestaurant/      # Java Quellcode-Paket
 │         ├── Main.java            # Einstiegspunkt & Bootstrapping
 │         ├── AdminGUI.java        # Haupt-Swing-Oberfläche mit 5 Tabs
 │         ├── DatabaseManager.java # DAO für alle SQL-Operationen
 │         ├── Mitarbeiter.java     # Modellklasse Personal
 │         ├── Artikel.java         # Modellklasse Speise-/Getränkekarte
 │         ├── Tisch.java           # Modellklasse Gastraumtisch
 │         ├── Bestellung.java      # Modellklasse Bestellung
 │         ├── DatabaseTest.java    # Automatisierte Testsuite
 │         ├── WebServer.java       # Integrierter HTTP-Server
 │         ├── MitarbeiterWizardDialog.java # Modal-Dialog Mitarbeiter
 │         ├── ArtikelWizardDialog.java     # Modal-Dialog Artikel
 │         └── TischWizardDialog.java       # Modal-Dialog Tisch
 ├── web/
 │    └── index.html                # Web-Dashboard Frontend
 ├── docs/                          # Sämtliche Projekt- & Ausbildungsdokumente
 ├── abgabe/                        # Druckfertige PDF-Abgabedokumente
 ├── run.bat                        # Batch-Starter für Windows
 ├── smart_restaurant.db            # SQLite-Datenbankdatei
 └── smart_restaurant_dump.sql      # Vollständiger SQL-Dump
```

---

## 3. Detailliertes Klassendesign & Komponenten

### 3.1 Einstiegsklasse `Main.java`
- **Aufgabe:** Initialisiert das System-Look-and-Feel (z. B. Windows-nativer Stil), ruft `DatabaseManager.initDatabase()` auf, startet den Hintergrund-Webserver `WebServer.startServer()` und erzeugt die Haupt-GUI im EDT.

### 3.2 Data Access Object `DatabaseManager.java`
Zentrale statische Verwaltungsklasse für Datenbankverbindungen und SQL-Befehle:
- `getConnection()`: Baut die Verbindung über die Connection-URL `jdbc:sqlite:smart_restaurant.db` auf.
- `initDatabase()`: Führt `CREATE TABLE IF NOT EXISTS`-Befehle aus und initialisiert Standard-Beispieldaten bei leerer Datenbank.
- **Mitarbeiter-CRUD:**
  - `List<Mitarbeiter> getAllMitarbeiter()`
  - `boolean addMitarbeiter(Mitarbeiter m)`
  - `boolean deleteMitarbeiter(int id)`
- **Artikel-CRUD:**
  - `List<Artikel> getAllArtikel()`
  - `boolean addArtikel(Artikel a)`
  - `boolean deleteArtikel(int id)`
- **Tisch-CRUD:**
  - `List<Tisch> getAllTische()`
  - `boolean addTisch(Tisch t)`
  - `boolean deleteTisch(int id)`
- **Bestellungs-Management:**
  - `List<Bestellung> getAllBestellungen()`: Führt eine `JOIN`-Abfrage über die Tabellen `bestellung`, `tisch` und `mitarbeiter` aus, um Tischnummer und Mitarbeitername aufzulösen.
  - `boolean updateBestellstatus(int bestellungId, String neuerStatus)`: Schaltet den Status im Lebenszyklus weiter.

### 3.3 Modellklassen (Domain POJOs)
- **`Mitarbeiter`:** Kapselt `id` (int), `name` (String), `benutzername` (String), `rolle` (String) und `aktiv` (boolean).
- **`Artikel`:** Kapselt `id` (int), `name` (String), `kategorie` (String), `preis` (double) und `aktiv` (boolean).
- **`Tisch`:** Kapselt `id` (int), `tischnummer` (int), `kapazitaet` (int) und `status` (String).
- **`Bestellung`:** Kapselt `id` (int), `tischId` (int), `erstelltVon` (int), `status` (String), `erstelltAm` (String), `gesamtpreis` (double) sowie aufgelöste Attribute `tischnummer` und `mitarbeiterName`.

### 3.4 Benutzeroberfläche `AdminGUI.java` & Wizards
- Basiert auf `javax.swing.JFrame` und nutzt ein `JTabbedPane` mit 5 Tabs.
- Jedes Panel ist mit `JTable`, benutzerdefiniertem `DefaultTableModel` (nicht editierbare Zellen), ScrollPanes und Formular- bzw. Aktionspanels ausgestattet.
- **Wizards:** `MitarbeiterWizardDialog`, `ArtikelWizardDialog`, `TischWizardDialog` bieten strukturierte Eingabemasken mit Live-Validierung vor dem Absenden.

---

## 4. Datenbankmodell & Relationales Schema (3NF)

Das relationale Datenbankschema befindet sich in der **3. Normalform (3NF)**:
1. **1NF:** Alle Attribute sind atomar; keine Wiederholungsgruppen.
2. **2NF:** Alle Nichtschlüssel-Attribute sind voll funktional vom Primärschlüssel abhängig.
3. **3NF:** Es existieren keine transitiven Abhängigkeiten zwischen Nichtschlüssel-Attributen.

### SQLite DDL-Spezifikation:
```sql
-- Tabelle: Mitarbeiter
CREATE TABLE IF NOT EXISTS mitarbeiter (
    mitarbeiter_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT NOT NULL,
    benutzername   TEXT UNIQUE NOT NULL,
    rolle          TEXT NOT NULL,
    aktiv          INTEGER DEFAULT 1
);

-- Tabelle: Tisch
CREATE TABLE IF NOT EXISTS tisch (
    tisch_id       INTEGER PRIMARY KEY AUTOINCREMENT,
    tischnummer    INTEGER UNIQUE NOT NULL,
    kapazitaet     INTEGER NOT NULL,
    status         TEXT NOT NULL DEFAULT 'frei'
);

-- Tabelle: Artikel
CREATE TABLE IF NOT EXISTS artikel (
    artikel_id     INTEGER PRIMARY KEY AUTOINCREMENT,
    name           TEXT NOT NULL,
    kategorie      TEXT NOT NULL,
    preis          REAL NOT NULL,
    aktiv          INTEGER DEFAULT 1
);

-- Tabelle: Bestellung
CREATE TABLE IF NOT EXISTS bestellung (
    bestellung_id  INTEGER PRIMARY KEY AUTOINCREMENT,
    tisch_id       INTEGER NOT NULL,
    erstellt_von   INTEGER NOT NULL,
    status         TEXT NOT NULL DEFAULT 'aufgegeben',
    erstellt_am    TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    gesamtpreis    REAL DEFAULT 0.0,
    FOREIGN KEY(tisch_id)     REFERENCES tisch(tisch_id),
    FOREIGN KEY(erstellt_von) REFERENCES mitarbeiter(mitarbeiter_id)
);
```

---

## 5. Eingebetteter WebServer & Schnittstellen

Um neben der Desktop-GUI eine leichtgewichtige mobile Ansicht für Tablets und Handheld-Terminals bereitzustellen, enthält die Software die Klasse `WebServer.java`:
- Verwendet den mit Java mitgelieferten HTTP-Server `com.sun.net.httpserver.HttpServer` (keine externen Webserver-Abhängigkeiten wie Tomcat oder Spring Boot erforderlich).
- Horcht auf Port `8080`.
- Liefert das moderne, responsive Dashboard `web/index.html` aus.
- Multi-Threaded Ausführung über `Executors.newCachedThreadPool()`.

---

## 6. Entwicklungsumgebung, Build-Prozess & Kompilierung

### Systemvoraussetzungen für Entwickler:
- Java SE Development Kit (JDK) Version 17 oder höher (z. B. Eclipse Temurin 17 LTS).
- Dateipfad zu `lib/sqlite-jdbc.jar` muss vorhanden sein.

### Kompilierung über das Terminal:
```bash
# Aus dem Projektverzeichnis ausführen:
javac -encoding UTF-8 -cp "lib/sqlite-jdbc.jar;src" -d bin src/com/smartrestaurant/*.java
```

### Starten der Anwendung:
```bash
java -cp "lib/sqlite-jdbc.jar;bin" com.smartrestaurant.Main
```

### Ausführen der automatisierten Tests:
```bash
java -cp "lib/sqlite-jdbc.jar;bin" com.smartrestaurant.DatabaseTest
```

### Ausführen per Windows Batch:
Für den schnellen Start steht das Skript `run.bat` zur Verfügung:
```bat
@echo off
chcp 65001 > nul
start javaw -cp "lib/sqlite-jdbc.jar;bin" com.smartrestaurant.Main
```

---

## 7. Clean Code, Programmierrichtlinien & Sicherheit

### 7.1 Abwehr von SQL-Injection durch Prepared Statements
Um Sicherheitsrisiken gemäß OWASP Top 10 auszuschließen, werden ausnahmslos parametrisierte SQL-Abfragen eingesetzt:
```java
// Beispiel aus DatabaseManager.java:
String sql = "INSERT INTO artikel (name, kategorie, preis, aktiv) VALUES (?, ?, ?, ?)";
try (Connection conn = getConnection();
     PreparedStatement pstmt = conn.prepareStatement(sql)) {
    pstmt.setString(1, a.getName());
    pstmt.setString(2, a.getKategorie());
    pstmt.setDouble(3, a.getPreis());
    pstmt.setInt(4, a.isAktiv() ? 1 : 0);
    return pstmt.executeUpdate() > 0;
}
```

### 7.2 Ressourcenmanagement mit Try-with-Resources
Sämtliche `Connection`-, `PreparedStatement`- und `ResultSet`-Instanzen werden über `try-with-resources`-Blöcke deklariert. Dadurch ist gewährleistet, dass Datenbankverbindungen auch im Ausnahme- und Fehlerfall sauber und zuverlässig geschlossen werden (Schutz vor Resource-Leaks).

### 7.3 Thread-Sicherheit
GUI-Updates erfolgen synchronisiert über den Event Dispatch Thread (EDT) via `SwingUtilities.invokeLater()`.

---

## 8. Erweiterungsmöglichkeiten & Wartung

### Zukünftige Ausbaustufen (Roadmap):
1. **RESTful API:** Erweiterung des `WebServer` um JSON-Endpunkte (`/api/bestellungen`, `/api/artikel`) für direkte Tablet-Bestellungen am Tisch.
2. **Kassensicherungsverordnung (KassenSichV):** Integration einer zertifizierten Technischen Sicherheitseinrichtung (TSE) zur finanzamtkonformen Signierung von Belegen.
3. **Küchen-Monitor (Kitchen Display System):** Dedizierter Vollbild-View für die Küchenstation mit Signalton bei neuen Bestellungen.
4. **Datensicherung:** Automatisierter täglicher Export der SQLite-Datei in ein verschlüsseltes Cloud- oder Backup-Verzeichnis.

---
*Erstellt durch das Entwicklungsteam „Der Dreier“ (Another Great Solution GmbH).*
