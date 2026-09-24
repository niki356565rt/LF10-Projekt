# UI-Mockups: Smart Restaurant Adminsoftware

**Projekt:** Digitales Bestell- und Verwaltungssystem  
**Komponente:** Grafische Benutzeroberfläche (Java Swing AdminGUI)  
**Stand:** 24. September 2026  

---

## 1. Übersicht des Gesamt-Layouts

Die Benutzeroberfläche der Administrationssoftware ist als **Tabbed Application** aufgebaut. Die Navigation erfolgt über Reiter am oberen Bildrand.

```
+-----------------------------------------------------------------------------------+
| Smart Restaurant – Admin- & Verwaltungssoftware                           [_][square][X] |
+-----------------------------------------------------------------------------------+
| [👥 Mitarbeiter]  [🍕 Artikel]  [🪑 Tische]  [📋 Bestellungen]  [ℹ️ System Status]  |
+-----------------------------------------------------------------------------------+
|                                                                                   |
|                                                                                   |
|                              (Inhalt des aktiven Tabs)                            |
|                                                                                   |
|                                                                                   |
+-----------------------------------------------------------------------------------+
```

---

## 2. Mockup Tab 1: Mitarbeiterverwaltung

Hier werden alle Mitarbeiter der Gaststätte in einer Tabelle aufgelistet. Im unteren Bereich können neue Mitarbeiter angelegt oder bestehende gelöscht werden.

```
+-----------------------------------------------------------------------------------+
| [👥 Mitarbeiter]  [🍕 Artikel]  [🪑 Tische]  [📋 Bestellungen]  [ℹ️ System Status]  |
+-----------------------------------------------------------------------------------+
| ID  | Name           | Benutzername | Rolle          | Aktiv                      |
|-----+----------------+--------------+----------------+----------------------------|
| 1   | Anna Service   | aservice     | Service        | Ja                         |
| 2   | Ben Kellner    | bkellner     | Service        | Ja                         |
| 3   | Karl Koch      | kkoch        | Küche          | Ja                         |
| 4   | Chef Admin     | admin        | Administration | Ja                         |
+-----------------------------------------------------------------------------------+
| +-- Neuen Mitarbeiter anlegen --------------------------------------------------+ |
| | Name:            Benutzername:      Rolle:                                    | |
| | [______________] [____________]     [ Service         v]                      | |
| |                                     [ Hinzufügen ]  [ Löschen ]               | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## 3. Mockup Tab 2: Artikelverwaltung

Verwaltung von Speisen und Getränken inklusive Preisen und Zuordnung zu Kategorien.

```
+-----------------------------------------------------------------------------------+
| [👥 Mitarbeiter]  [🍕 Artikel]  [🪑 Tische]  [📋 Bestellungen]  [ℹ️ System Status]  |
+-----------------------------------------------------------------------------------+
| ID  | Name                                | Kategorie     | Preis (€) | Aktiv     |
|-----+-------------------------------------+---------------+-----------+-----------|
| 1   | Tomatensuppe                        | Vorspeisen    | 6.50      | Ja        |
| 2   | Wiener Schnitzel                    | Hauptspeisen  | 22.50     | Ja        |
| 3   | Burger Classic                      | Hauptspeisen  | 16.80     | Ja        |
| 4   | Tiramisu                            | Desserts      | 6.90      | Ja        |
| 5   | Coca-Cola 0.4l                      | Getränke      | 4.20      | Ja        |
+-----------------------------------------------------------------------------------+
| +-- Neuen Artikel anlegen ------------------------------------------------------+ |
| | Artikelname:     Kategorie:         Preis (€):                                | |
| | [______________] [ Hauptspeisen v]  [______]                                  | |
| |                                     [ Hinzufügen ]  [ Löschen ]               | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## 4. Mockup Tab 3: Tischverwaltung

Übersicht aller Gaststätten-Tische inklusive Sitzplatz-Kapazität und aktuellem Belegungsstatus.

```
+-----------------------------------------------------------------------------------+
| [👥 Mitarbeiter]  [🍕 Artikel]  [🪑 Tische]  [📋 Bestellungen]  [ℹ️ System Status]  |
+-----------------------------------------------------------------------------------+
| ID  | Tischnummer | Kapazität | Status                                            |
|-----+-------------+-----------+---------------------------------------------------|
| 1   | 1           | 2         | belegt                                            |
| 2   | 2           | 4         | frei                                              |
| 3   | 3           | 6         | belegt                                            |
| 4   | 4           | 8         | frei                                              |
+-----------------------------------------------------------------------------------+
| +-- Neuen Tisch anlegen --------------------------------------------------------+ |
| | Tischnummer:     Kapazität:         Status:                                   | |
| | [______]         [______]           [ frei            v]                      | |
| |                                     [ Hinzufügen ]  [ Löschen ]               | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```

---

## 5. Mockup Tab 4: Bestellübersicht

Echtzeitansicht aller Bestellungen mit der Möglichkeit, den Bestellstatus über Buttons weiterzuschalten.

```
+-----------------------------------------------------------------------------------+
| [👥 Mitarbeiter]  [🍕 Artikel]  [🪑 Tische]  [📋 Bestellungen]  [ℹ️ System Status]  |
+-----------------------------------------------------------------------------------+
| Bestell-ID | Tisch # | Erstellt von | Status          | Erstellt am          | €   |
|------------+---------+--------------+-----------------+----------------------+-----|
| 1          | 1       | Anna Service | aufgegeben      | 2026-09-24 08:30:00  | 29.0|
| 2          | 3       | Ben Kellner  | in Bearbeitung  | 2026-09-24 08:25:00  | 44.1|
+-----------------------------------------------------------------------------------+
| [ Status weiterschalten ]   [ Aktualisieren ]                                     |
+-----------------------------------------------------------------------------------+
```

---

## 6. Mockup Tab 5: System & DB Status

Informationsansicht zum Verbindungsstatus und der verwendeten SQLite-Datenbank.

```
+-----------------------------------------------------------------------------------+
| [👥 Mitarbeiter]  [🍕 Artikel]  [🪑 Tische]  [📋 Bestellungen]  [ℹ️ System Status]  |
+-----------------------------------------------------------------------------------+
| +-------------------------------------------------------------------------------+ |
| | === Smart Restaurant – System & Datenbank Status ===                           | |
| |                                                                               | |
| | DBMS: SQLite 3 (über Standard JDBC Driver)                                   | |
| | Datenbank-Datei: smart_restaurant.db                                          | |
| | Architektur: Java Swing GUI + DAO + Standard SQL Queries                      | |
| | Java Version: 17.0.19                                                         | |
| |                                                                               | |
| | Status: Verbindung aktiv & betriebsbereit.                                    | |
| +-------------------------------------------------------------------------------+ |
+-----------------------------------------------------------------------------------+
```
