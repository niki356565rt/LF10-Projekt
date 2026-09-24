# Testdokumentation & Konzept zum automatisierten Testen

**Projekt:** Smart Restaurant – Admin- & Verwaltungssoftware  
**Programmiersprache:** Java 17 (OpenJDK)  
**Datenbank:** SQLite 3 (über Standard JDBC & SQL)  
**Stand:** 24. September 2026  

---

## 1. Teststrategie & Testkonzept

Die Anwendung wurde einer Kombination aus **systematischen manuellen UI-Tests** und **automatisierten Modultests (Integrationstests über Java/JDBC)** unterzogen. 

Das Testkonzept verfolgt zwei Ziele:
1. **Funktionale Korrektheit:** Verifikation aller CRUD-Operationen (Erstellen, Lesen, Aktualisieren, Löschen) auf den Entitäten Mitarbeiter, Artikel, Tisch und Bestellung.
2. **Datenbankintegrität:** Sicherstellung, dass alle Standard SQL-Queries (`CREATE TABLE`, `SELECT`, `INSERT`, `UPDATE`, `DELETE`) fehlerfrei und ohne Datenverlust ausgeführt werden.

---

## 2. Automatisierte Testergebnisse (Automated Test Run)

Die automatisierte Testsuite `com.smartrestaurant.DatabaseTest` wurde direkt auf der compiled Anwendung ausgeführt.

### Testausführung & Protokoll:
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

---

## 3. Manuelle GUI-Testergebnisse (Systemtests)

| Test-ID | Testobjekt / Szenario | Eingabedaten / Aktion | Erwartetes Ergebnis | Ist-Ergebnis | Status |
|---|---|---|---|---|---|
| **T-GUI-01** | Anwendungsschema & DB-Init | Programmstart `Main.main()` | Erstellung von `smart_restaurant.db`, Tabellen anlegen & Testdaten füllen. | Datenbank und Tabellen erfolgreich angelegt. | **PASS** |
| **T-GUI-02** | Mitarbeiter anlegen | Name: "Eva Test", User: "etest", Rolle: "Service" -> Button "Hinzufügen" | Neuer Eintrag erscheint sofort in der Tabelle und DB. | Zeile erscheint in der JTable. | **PASS** |
| **T-GUI-03** | Mitarbeiter löschen | Zeile auswählen -> Button "Löschen" | Zeile verschwindet aus Tabelle und SQL-DB. | Eintrag erfolgreich gelöscht. | **PASS** |
| **T-GUI-04** | Artikel mit Preis anlegen | Name: "Pizza Margherita", Kat: "Hauptspeisen", Preis: "9,50" | Artikel mit formatiertem Preis in DB gespeichert. | Artikel in DB eingetragen. | **PASS** |
| **T-GUI-05** | Ungültigen Preis eingeben | Preis: "abc" -> Button "Hinzufügen" | Fehlermeldung "Gültigen Preis eingeben!" erscheint, kein DB-Eintrag. | Dialogfenster wird angezeigt. | **PASS** |
| **T-GUI-06** | Tisch anlegen | Nummer: 5, Kapazität: 4, Status: "frei" | Neuer Tisch 5 in DB angelegt. | Tisch 5 in Tabelle vorhanden. | **PASS** |
| **T-GUI-07** | Bestellstatus weiterschalten | Bestellung 1 wählen -> Button "Status weiterschalten" | Status wechselt von `aufgegeben` zu `in Bearbeitung`. | Status in DB und UI aktualisiert. | **PASS** |

---

## 4. Möglichkeiten des automatisierten Testens im Projekt

In Softwareprojekten dieser Art existieren verschiedene Stufen des automatisierten Testens, die eingesetzt werden können:

### 4.1 Teststufen & Werkzeuge
1. **Unit-Tests (Einzellogik):**
   - **Werkzeug:** JUnit 5, AssertJ.
   - **Anwendungsbereich:** Prüfung isolierter Geschäftslogik (z. B. Validierung von Preisberechnungen, Statusübergängen oder Eingabefiltern) ohne externe Abhängigkeiten.
2. **Integrationstests (Datenbank & DAO):**
   - **Werkzeug:** JUnit 5 + In-Memory Datenbank (H2 / SQLite `:memory:`).
   - **Anwendungsbereich:** Prüfung aller Standard-SQL-Queries, Join-Abfragen und Transaktionen im `DatabaseManager`.
3. **GUI- / UI-Tests (Automatisierte Oberflächen-Tests):**
   - **Werkzeug:** AssertJ Swing / Fest-Swing oder Selenium.
   - **Anwendungsbereich:** Automatisiertes Klickverhalten, Ausfüllen von Textfeldern und Auslösen von Events im `AdminGUI`.
4. **Continuous Integration (CI/CD Pipeline):**
   - **Werkzeug:** GitHub Actions, GitLab CI oder Jenkins.
   - **Anwendungsbereich:** Automatisches Kompilieren (`javac`) und Ausführen aller Tests bei jedem `git push`.

---

## 5. Vorteile für die Qualitätssicherung und den Entwicklungsprozess

Der Einsatz automatisierter Tests bietet gravierende Vorteile für das Projekt:

### 1. Qualitäts- & Verlässlichkeitsgewinn (Qualitätssicherung)
- **Frühzeitige Fehlererkennung (Shift-Left):** Entwickler erkennen Regressionsfehler sofort beim lokalen Erstellen der Software, noch bevor der Code in Produktion geht.
- **Hohe Testabdeckung (Test Coverage):** Alle Kernfunktionen (CRUD-SQLs, Statusübergänge) werden in Sekundenschnelle zu 100 % abgedeckt, was bei manuellen Tests Stunden dauern würde.
- **Vermeidung menschlicher Leichtsinnsfehler:** Wiederholbare, deterministische Testabläufe ohne subjektive Prüffehler.

### 2. Effizienz im Entwicklungsprozess (Developer Experience)
- **Schnelleres Feedback:** Ein automatisierter Testdurchlauf dauert wenige Millisekunden im Vergleich zu Minuten langer manueller Formulareingabe.
- **Sicheres Refactoring:** Code und SQL-Queries können bedenkenlos umstrukturiert oder optimiert werden, da Tests sofort zeigen, ob die Funktionsfähigkeit erhalten bleibt.
- **Dokumentationsfunktion:** Gut geschriebene Unit-Tests dienen gleichzeitig als lebendige Dokumentation für andere Entwickler, wie Schnittstellen zu nutzen sind.
- **Nahtlose CI/CD-Integration:** Automatische Freigabe von Releases nur bei grünem Teststatus.
