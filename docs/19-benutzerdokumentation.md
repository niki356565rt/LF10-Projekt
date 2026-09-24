# Benutzerdokumentation: Smart Restaurant Adminsoftware

**Projekt:** Digitales Bestell- und Verwaltungssystem  
**Software:** Admin- & Verwaltungsoberfläche  
**Stand:** 24. September 2026  

---

## 1. Übersicht & Systemvoraussetzungen

Die **Smart Restaurant Adminsoftware** dient der zentralen Verwaltung von Mitarbeitern, Speise- und Getränkeangeboten, Tischplänen und aktuellen Bestellungen im Gastronomiebetrieb.

### Systemvoraussetzungen:
- **Betriebssystem:** Windows, macOS oder Linux.
- **Java Runtime Environment (JRE):** Java 17 oder höher.
- **Bildschirmauflösung:** Mindestens 1024 × 768 Pixel.

---

## 2. Programmstart

Starten Sie die Anwendung über die Konsole oder per Doppelklick auf die Startdatei:
```bash
java -cp "lib/sqlite-jdbc.jar;bin" com.smartrestaurant.Main
```
Beim ersten Start wird die Datenbank `smart_restaurant.db` automatisch im selben Ordner angelegt und mit Standard-Testdaten befüllt.

---

## 3. Bedienung der Funktionsbereiche

Das Hauptfenster gliedert sich in **5 Reiter (Tabs)**:

```
+-----------------------------------------------------------------------------------+
| [👥 Mitarbeiter]  [🍕 Artikel]  [🪑 Tische]  [📋 Bestellungen]  [ℹ️ System Status]  |
+-----------------------------------------------------------------------------------+
```

---

### 3.1 Reiter 1: Mitarbeiterverwaltung (`👥 Mitarbeiter`)
Verwaltung des Gaststättenpersonals.

- **Mitarbeiter anzeigen:** Die Tabelle zeigt alle erfassten Mitarbeiter mit ID, Name, Benutzername, Rolle und Aktivitätsstatus.
- **Neuen Mitarbeiter anlegen:**
  1. Geben Sie den vollständigen Namen in das Feld **Name** ein.
  2. Geben Sie einen eindeutigen **Benutzernamen** ein.
  3. Wählen Sie die Rolle aus (`Service`, `Küche` oder `Administration`).
  4. Klicken Sie auf **Hinzufügen**.
- **Mitarbeiter löschen:**
  1. Wählen Sie den gewünschten Mitarbeiter in der Tabelle per Mausklick aus.
  2. Klicken Sie auf **Löschen**.

---

### 3.2 Reiter 2: Artikelverwaltung (`🍕 Artikel`)
Pflege der Speisen- und Getränkekarte.

- **Artikel anzeigen:** Zeigt alle Artikel mit Preis und Kategorie (`Vorspeisen`, `Hauptspeisen`, `Desserts`, `Getränke`).
- **Neuen Artikel anlegen:**
  1. Geben Sie den **Artikelnamen** ein.
  2. Wählen Sie die **Kategorie** aus.
  3. Geben Sie den **Preis** ein (z. B. `12.50` oder `12,50`).
  4. Klicken Sie auf **Hinzufügen**.
- **Artikel löschen:** Zeile auswählen und auf **Löschen** klicken.

---

### 3.3 Reiter 3: Tischverwaltung (`🪑 Tische`)
Verwaltung der Gaststättentische und Belegungszustände.

- **Tische anzeigen:** Zeigt Tischnummer, Sitzplatzkapazität (2–8 Personen) und Belegungsstatus (`frei` oder `belegt`).
- **Neuen Tisch anlegen:**
  1. Geben Sie die **Tischnummer** und die **Kapazität** ein.
  2. Wählen Sie den Status (`frei` oder `belegt`).
  3. Klicken Sie auf **Hinzufügen**.

---

### 3.4 Reiter 4: Bestellübersicht (`📋 Bestellungen`)
Verfolgung und Statussteuerung der eingehenden Bestellungen.

- **Bestellungen einsehen:** Zeigt Bestell-ID, Tischnummer, Ersteller, aktuellen Status (`aufgegeben`, `in Bearbeitung`, `fertig`, `serviert`, `bezahlt`) und Gesamtsumme.
- **Status weiterschalten:**
  1. Wählen Sie eine Bestellung in der Tabelle aus.
  2. Klicken Sie auf **Status weiterschalten**.
  3. Der Status wechselt automatisch in die nächste Phase (z. B. `aufgegeben` → `in Bearbeitung` → `fertig` → `serviert` → `bezahlt`).
- **Aktualisieren:** Klicken Sie auf **Aktualisieren**, um die Tabelle manuell auf den neuesten Stand zu bringen.

---

### 3.5 Reiter 5: System Status (`ℹ️ System Status`)
Zeigt technische Details zur Datenbankverbindung, Treiberversion und Systemumgebung an.

---

## 4. Problembehebung (Troubleshooting)

- **Fehlermeldung "Gültigen Preis eingeben!":**
  - Stellen Sie sicher, dass Sie im Feld Preis nur Zahlen (z. B. `14.50`) eingeben.
- **Fehlermeldung "Bitte alle Felder ausfüllen!":**
  - Name und Benutzername dürfen bei der Mitarbeiteranlage nicht leer sein.
- **Keine Reaktionen der Tabelle:**
  - Klicken Sie auf den Button **Aktualisieren** im Bestellreiter.
