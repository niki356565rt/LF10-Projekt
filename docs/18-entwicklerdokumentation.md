# Entwicklerdokumentation: Smart Restaurant Adminsoftware

**Projekt:** Digitales Bestell- und Verwaltungssystem  
**Programmiersprache:** Java 17 (OpenJDK)  
**Oberfläche:** Java Swing  
**Datenbank:** SQLite 3 über Standard JDBC & SQL  
**Stand:** 24. September 2026  

---

## 1. Systemarchitektur & Pakete

Die Anwendung ist als klassische 3-Schichten-Architektur (Model-DAO-View) in reinen Java-Standardklassen ohne schwere Frameworks umgesetzt:

```
com.smartrestaurant
 ├── Main.java              # App-Einstiegspunkt & StartUp Logik
 ├── AdminGUI.java          # Swing-Benutzeroberfläche (View)
 ├── DatabaseManager.java   # Data Access Object / JDBC & SQL-Abfragen (DAO)
 ├── Mitarbeiter.java       # Domain Model Mitarbeiter
 ├── Artikel.java           # Domain Model Artikel
 ├── Tisch.java             # Domain Model Tisch
 ├── Bestellung.java        # Domain Model Bestellung
 └── DatabaseTest.java      # Automatisierter Testsuite-Runner
```

---

## 2. Klassendesign & Schnittstellen

### 2.1 Domain Models
- **`Mitarbeiter`**: Repräsentiert Personalstammdaten (`id`, `name`, `benutzername`, `rolle`, `aktiv`).
- **`Artikel`**: Repräsentiert Speisen und Getränke (`id`, `name`, `kategorie`, `preis`, `aktiv`).
- **`Tisch`**: Repräsentiert Gaststättentische (`id`, `tischnummer`, `kapazitaet`, `status`).
- **`Bestellung`**: Repräsentiert Bestellungen (`id`, `tischId`, `mitarbeiterId`, `status`, `gesamtpreis`).

### 2.2 Datenbank-Verwaltung (`DatabaseManager`)
Der `DatabaseManager` kapselt alle JDBC-Datenbankzugriffe über **Standard-SQL-Queries**:
- `initDatabase()`: Führt `CREATE TABLE IF NOT EXISTS` Befehle aus und erstellt bei leerer Datenbank Initialdaten.
- `getAllMitarbeiter()`, `addMitarbeiter()`, `deleteMitarbeiter()`: Ausführung von `SELECT`, `INSERT`, `DELETE` Queries.
- `getAllArtikel()`, `addArtikel()`, `deleteArtikel()`: CRUD für Artikel.
- `getAllTische()`, `addTisch()`, `deleteTisch()`: CRUD für Tische.
- `getAllBestellungen()`, `updateBestellstatus()`: Abfrage mit `JOIN` über Tabellen `bestellung`, `tisch` und `mitarbeiter`.

### 2.3 Benutzeroberfläche (`AdminGUI`)
Die Benutzeroberfläche basiert auf `javax.swing.JFrame` und verwendet ein `JTabbedPane` mit 5 Hauptbereichen. Die Tabellendarstellung erfolgt über `JTable` mit dynamischen `DefaultTableModel`-Instanzen.

---

## 3. Kompilierung & Ausführung

### Voraussetzungen:
- Java JDK 17 oder höher
- `lib/sqlite-jdbc.jar` im Projektverzeichnis

### 3.1 Kompilieren des Quellcodes
Im Projektverzeichnis folgenden Befehl ausführen:
```bash
javac -encoding UTF-8 -cp "lib/sqlite-jdbc.jar;src" -d bin src/com/smartrestaurant/*.java
```

### 3.2 Starten der Anwendung (GUI)
```bash
java -cp "lib/sqlite-jdbc.jar;bin" com.smartrestaurant.Main
```

### 3.3 Ausführen der automatisierten Tests
```bash
java -cp "lib/sqlite-jdbc.jar;bin" com.smartrestaurant.DatabaseTest
```

---

## 4. Datenbank-Schema (SQLite DDL)

Das Datenbankschema wird beim ersten Programmstart in der Datei `smart_restaurant.db` automatisch angelegt:

```sql
CREATE TABLE IF NOT EXISTS mitarbeiter (
    mitarbeiter_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    benutzername TEXT UNIQUE NOT NULL,
    rolle TEXT NOT NULL,
    aktiv INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS tisch (
    tisch_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tischnummer INTEGER UNIQUE NOT NULL,
    kapazitaet INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'frei'
);

CREATE TABLE IF NOT EXISTS artikel (
    artikel_id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    kategorie TEXT NOT NULL,
    preis REAL NOT NULL,
    aktiv INTEGER DEFAULT 1
);

CREATE TABLE IF NOT EXISTS bestellung (
    bestellung_id INTEGER PRIMARY KEY AUTOINCREMENT,
    tisch_id INTEGER NOT NULL,
    erstellt_von INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'aufgegeben',
    erstellt_am TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    gesamtpreis REAL DEFAULT 0.0,
    FOREIGN KEY(tisch_id) REFERENCES tisch(tisch_id),
    FOREIGN KEY(erstellt_von) REFERENCES mitarbeiter(mitarbeiter_id)
);
```
