# Benutzerdokumentation: Smart Restaurant Adminsoftware

**Projektbezeichnung:** Smart Restaurant – Digitales Bestell- und Verwaltungssystem  
**Lernfeld / Kontext:** Lernfeld 10 (LF10) – Gestalten von Softwareprojekten / IHK-Standard  
**Zielgruppe:** Betriebsleitung, Restaurantfachkräfte, Servicepersonal, Schichtleitung  
**Software-Version:** 1.2 (Produktiv-Release)  
**Dokumentenversion:** 1.2 (Final)  
**Stand:** 01. Oktober 2026  
**Autoren:** Team „Der Dreier“ (Another Great Solution GmbH)  

---

## Inhaltsverzeichnis
1. [Einführung & Zweck der Software](#1-einführung--zweck-der-software)
2. [Systemvoraussetzungen & Hardwareanforderungen](#2-systemvoraussetzungen--hardwareanforderungen)
3. [Programmstart & Erste Schritte](#3-programmstart--erste-schritte)
4. [Übersicht der Benutzeroberfläche](#4-übersicht-der-benutzeroberfläche)
5. [Detaillierte Funktionsbeschreibungen nach Modulen](#5-detaillierte-funktionsbeschreibungen-nach-modulen)
   - [5.1 Mitarbeiterverwaltung (Personal)](#51-mitarbeiterverwaltung-personal)
   - [5.2 Speise- & Getränkekarte (Artikelverwaltung)](#52-speise---getränkekarte-artikelverwaltung)
   - [5.3 Tischverwaltung & Raumplan](#53-tischverwaltung--raumplan)
   - [5.4 Bestellübersicht & Statussteuerung](#54-bestellübersicht--statussteuerung)
   - [5.5 System & DB Status / Web-Dashboard](#55-system--db-status--web-dashboard)
6. [Praxis-Leitfaden: Typischer Gastro-Tagesablauf (Workflow)](#6-praxis-leitfaden-typischer-gastro-tagesablauf-workflow)
7. [Fehlerbehebung & Häufige Fragen (Troubleshooting & FAQ)](#7-fehlerbehebung--häufige-fragen-troubleshooting--faq)
8. [Glossar & Support-Informationen](#8-glossar--support-informationen)

---

## 1. Einführung & Zweck der Software

Die **Smart Restaurant Adminsoftware** ist das zentrale Steuerungs- und Verwaltungswerkzeug für moderne Gastronomiebetriebe. Sie löst papierbasierte Kellnerblöcke und manuelle Küchenzettel vollständig ab und sorgt für eine reibungslose Kommunikation zwischen Service, Küche, Bar und Restaurantleitung.

### Kernnutzen für den Betrieb:
- **Fehlerfreie Bestellübertragung:** Bestellungen werden digital erfasst und stehen sofort für Küche und Service bereit.
- **Transparente Statusverfolgung:** Jede Bestellung durchläuft klar definierte Phasen von der Zubereitung bis zur Bezahlung.
- **Einfache Stammdatenpflege:** Speisen, Getränke, Preise, Tische und Mitarbeiter können ohne IT-Kenntnisse gepflegt werden.
- **Mobiler Zugriff:** Integriertes Web-Dashboard für Tablets und Smartphones.

---

## 2. Systemvoraussetzungen & Hardwareanforderungen

### Minimale Voraussetzungen:
- **Betriebssystem:** Windows 10/11 (64-Bit), macOS ab Version 12 oder modernes Linux (z. B. Ubuntu, Debian).
- **Laufzeitumgebung:** Java Runtime Environment (JRE) oder Java Development Kit (JDK) Version 17 oder höher.
- **Arbeitsspeicher (RAM):** Mindestens 2 GB freier RAM.
- **Festplattenspeicher:** Mindestens 100 MB freier Speicherplatz für Anwendung und Datenbank.
- **Bildschirmauflösung:** Mindestens 1024 × 768 Pixel (empfohlen: Full HD 1920 × 1080 Pixel).

---

## 3. Programmstart & Erste Schritte

### 3.1 Start unter Windows:
1. Navigieren Sie in den Ordner der Anwendung.
2. Führen Sie einen Doppelklick auf die Datei **`run.bat`** aus.
3. Alternativ öffnen Sie eine Eingabeaufforderung (PowerShell oder CMD) und tippen:
   ```bash
   java -cp "lib/sqlite-jdbc.jar;bin" com.smartrestaurant.Main
   ```

### 3.2 Erstinitialisierung der Datenbank:
Beim allerersten Programmstart prüft die Software selbstständig, ob die Datenbankdatei `smart_restaurant.db` existiert. Ist dies nicht der Fall, wird sie automatisch angelegt und mit einem Grundstock an Stammdaten (Test-Mitarbeiter, Standard-Speisekarte, Mustertische und Beispielbestellungen) befüllt. Es ist keine manuelle Datenbankinstallation notwendig!

---

## 4. Übersicht der Benutzeroberfläche

Nach dem Start öffnet sich das Hauptfenster mit modernem Erscheinungsbild und einer strukturierten Reiter-Navigation (Tabbed Pane) im oberen Bereich:

```
+----------------------------------------------------------------------------------------------------+
|  Smart Restaurant – Admin- & Verwaltungssoftware                                       [ _ | X ]  |
+----------------------------------------------------------------------------------------------------+
| [👥 Mitarbeiterverwaltung] [🍕 Artikelverwaltung] [🪑 Tischverwaltung] [📋 Bestellungen] [ℹ️ Status] |
+----------------------------------------------------------------------------------------------------+
|                                                                                                    |
|                                       DATENTABELLE (JTable)                                        |
|                                                                                                    |
+----------------------------------------------------------------------------------------------------+
| EINGABEBEREICH / AKTIONEN                                                                          |
| [ Feld 1 ]  [ Feld 2 ]  [ Feld 3 ]    [ ➕ Hinzufügen ]  [ 🪄 Wizard ]  [ 🗑️ Löschen ]  [ 🔄 Refresh ] |
+----------------------------------------------------------------------------------------------------+
```

---

## 5. Detaillierte Funktionsbeschreibungen nach Modulen

### 5.1 Mitarbeiterverwaltung (Personal)
Im ersten Reiter verwalten Sie die Zugänge und Rollen Ihres Personals.

- **Mitarbeiterliste:** Zeigt Mitarbeiter-ID, vollständigen Namen, Anmelde-Benutzernamen, Rolle und Aktivitätsstatus.
- **Neuen Mitarbeiter hinzufügen (Schnelleingabe):**
  1. Tragen Sie im Feld **Name** den Vor- und Nachnamen ein (z. B. `Sabine Schmidt`).
  2. Vergeben Sie im Feld **Benutzername** ein eindeutiges Kürzel (z. B. `sschmidt`).
  3. Wählen Sie im Dropdown-Menü die Rolle aus:
     - `Service`: Kellner / Servicekräfte.
     - `Küche`: Küchenpersonal / Köche.
     - `Administration`: Betriebsleitung / Schichtleitung mit Vollzugriff.
  4. Klicken Sie auf die Schaltfläche **Hinzufügen**.
- **Mitarbeiter über Wizard anlegen:** Klicken Sie auf **Neuer Mitarbeiter (Wizard)** für einen geführten Dialog mit Echtzeit-Validierung.
- **Mitarbeiter löschen:** Markieren Sie die Zeile des gewünschten Mitarbeiters in der Tabelle und klicken Sie auf **Löschen**.

---

### 5.2 Speise- & Getränkekarte (Artikelverwaltung)
Pflege des gastronomischen Angebots und der Verkaufspreise.

- **Artikeltabelle:** Übersicht aller Speisen und Getränke mit Name, Warengruppe, Brutto-Verkaufspreis und Status.
- **Neuen Artikel anlegen:**
  1. Geben Sie den **Artikelnamen** ein (z. B. `Spaghetti Bolognese`).
  2. Wählen Sie die **Kategorie** (`Vorspeisen`, `Hauptspeisen`, `Desserts` oder `Getränke`).
  3. Tragen Sie den **Preis** ein (z. B. `13,50` oder `13.50`). Das System akzeptiert sowohl das deutsche Komma als auch den internationalen Punkt.
  4. Klicken Sie auf **Hinzufügen**.
- **Artikel-Wizard:** Für eine besonders komfortable Erfassung steht der Button **Neuer Artikel (Wizard)** bereit.
- **Artikel löschen:** Markieren Sie den Artikel und wählen Sie **Löschen**.

---

### 5.3 Tischverwaltung & Raumplan
Verwaltung des Gastraums und der Sitzplatzkapazitäten.

- **Tischliste:** Anzeige der Tischnummer, Personenkapazität (Sitzplätze) und des aktuellen Belegungszustands (`frei` oder `belegt`).
- **Tisch anlegen:**
  1. Vergeben Sie eine freie **Tischnummer** (z. B. `15`).
  2. Geben Sie die **Kapazität** ein (z. B. `4` Plätze).
  3. Setzen Sie den Initialstatus auf `frei`.
  4. Klicken Sie auf **Hinzufügen**.

---

### 5.4 Bestellübersicht & Statussteuerung
Die Schaltzentrale für die operative Gastronomieabwicklung.

- **Live-Bestelltabelle:** Zeigt alle Bestellungen mit automatischer Zuordnung:
  - Bestellnummer (`ID`)
  - Tischnummer
  - Verantwortliche Servicekraft (`Erstellt von`)
  - Aktueller Bestellstatus
  - Erstellungszeitpunkt (`Zeitstempel`)
  - Gesamtsumme in Euro
- **Status-Workflow Weiterschalten:**  
  Klicken Sie auf eine Bestellung und anschließend auf die Schaltfläche **Status weiterschalten**. Die Bestellung wandert automatisch in den nächsten Zustand:
  $$\text{aufgegeben} \longrightarrow \text{in Bearbeitung} \longrightarrow \text{fertig} \longrightarrow \text{serviert} \longrightarrow \text{bezahlt}$$
- **Aktualisieren:** Aktualisiert die Tabelle manuell auf den neuesten Stand.

---

### 5.5 System & DB Status / Web-Dashboard
Technischer Überblick über den Betriebszustand des Systems:
- Überprüfung der SQLite-Verbindung und Anzeige des Speicherpfads.
- Versionsanzeige des JDBC-Treibers.
- **Web-Frontend Link:** Über `http://localhost:8080` kann das browserbasierte Responsive-Dashboard für Handhelds geöffnet werden.

---

## 6. Praxis-Leitfaden: Typischer Gastro-Tagesablauf (Workflow)

```
[Gast betritt Lokal] 
         │
         ▼
[Tisch zuweisen & Belegung auf 'belegt' setzen (Tab Tische)]
         │
         ▼
[Bestellaufnahme durch Servicekraft (Status: 'aufgegeben')]
         │
         ▼
[Küche sieht Bestellung & beginnt Zubereitung: Klick auf 'Status weiterschalten' (Status: 'in Bearbeitung')]
         │
         ▼
[Speisen fertig angerichtet: Klick auf 'Status weiterschalten' (Status: 'fertig')]
         │
         ▼
[Service serviert Speisen am Tisch: Klick auf 'Status weiterschalten' (Status: 'serviert')]
         │
         ▼
[Gast bezahlt: Klick auf 'Status weiterschalten' (Status: 'bezahlt') -> Tisch wieder auf 'frei']
```

---

## 7. Fehlerbehebung & Häufige Fragen (Troubleshooting & FAQ)

| Symptom / Meldung | Mögliche Ursache | Lösungsschritt |
|---|---|---|
| **„Bitte alle Felder ausfüllen!“** | Ein Textfeld bei Mitarbeiter oder Artikel wurde leer gelassen. | Füllen Sie Name, Kürzel bzw. Preis vollständig aus. |
| **„Gültigen Preis eingeben!“** | Im Preisfeld wurden Buchstaben oder Sonderzeichen eingegeben. | Verwenden Sie nur Ziffern und ein Trennzeichen (z. B. `12,50`). |
| **„Benutzername existiert bereits“** | Ein Mitarbeiter mit demselben Anmeldekürzel ist bereits vorhanden. | Wählen Sie einen abweichenden Benutzernamen. |
| **„Datenbank gesperrt (busy)“** | Eine andere Instanz oder ein externes Programm greift sperrend auf `smart_restaurant.db` zu. | Schließen Sie andere Programmfenster oder SQLite-Browser-Tools. |
| **Tabelle zeigt neue Daten nicht an** | Automatische Aktualisierung verzögert. | Klicken Sie auf die Schaltfläche **Aktualisieren** im jeweiligen Reiter. |
| **Web-Dashboard nicht erreichbar** | Port 8080 wird von einer anderen Anwendung blockiert. | Beenden Sie andere Webserver auf Port 8080 und starten Sie die App neu. |

---

## 8. Glossar & Support-Informationen

- **CRUD:** Akronym für *Create, Read, Update, Delete* – die Grundfunktionen jeder Datenverwaltung.
- **EDT:** *Event Dispatch Thread* – Der Hintergrund-Thread von Java Swing zur Darstellung flüssiger Benutzeroberflächen.
- **JDBC:** *Java Database Connectivity* – Standardschnittstelle für den Zugriff auf relationale Datenbanken.

### Support & Wartung:
Bei technischen Fragen oder Störungen wenden Sie sich bitte an das Projektteam:
- **Hersteller:** Another Great Solution GmbH – Team „Der Dreier“
- **Support-E-Mail:** `support@anothergreatsolution.local`
- **Reaktionszeit:** Werktags innerhalb von 4 Stunden

---
*Benutzerdokumentation freigegeben für das Betriebspersonal des Gastronomieunternehmens.*
