# Projektplanung – Bestellprozess Smart Restaurant

**Projekt:** Digitales Bestell- und Verwaltungssystem für eine Gaststätte  
**Schwerpunkt:** Planung und Umsetzung des digitalen Bestellprozesses  
**Bereiche:** Service, Küche und Administration  
**Gesamtzeitraum:** 2 Wochen  
**Stand:** 19.08.2026

## 1. Projektdefinition

### 1.1 Projektziel

Ziel des Projekts ist die Entwicklung einer eigenen Software für den digitalen Bestellprozess in einer Gaststätte. Bestellungen sollen vom Service am Tisch erfasst, an die Küche weitergeleitet, dort bearbeitet und anschließend serviert sowie bezahlt werden. Zusätzlich wird eine Administration für Mitarbeiter, Artikel und Tische benötigt.

Wegen der kurzen Projektlaufzeit von **2 Wochen** wird nur der Kernablauf mit den **Muss-Anforderungen** sicher umgesetzt. Soll- und Kann-Anforderungen werden nur bei Restzeit ergänzt.

### 1.2 Projektumfang

**Im Umfang enthalten (Priorität Muss):**
- Service-Ansicht (Tischwahl, Bestellung, Status „serviert“, Abschluss)
- Küchen-Ansicht (Anzeige und Statusänderungen)
- Admin-Ansicht (Mitarbeiter, Artikel, Tische)
- Speicherung von Bestellungen, Statuswechseln und Protokolleinträgen

**Nur bei Restzeit (Soll):**
- Rechnung anzeigen
- Sortierung in der Küche
- Wochenumsatz / meistverkauftes Getränk

**Nicht im Umfang enthalten:**
- eigene Bar-Ansicht
- automatische Lagerverwaltung
- Bestellung durch Gäste per App oder QR-Code
- Anbindung an ein Kartenlesegerät

Die detaillierten Anforderungen stehen im Dokument [`01-anforderungskatalog.md`](01-anforderungskatalog.md).  
Die Stakeholder-Analyse steht im Dokument [`05-stakeholder-analyse.md`](05-stakeholder-analyse.md).  
Die Make-or-Buy-Entscheidung steht im Dokument [`06-make-or-buy.md`](06-make-or-buy.md).

### 1.3 Bestellprozess im Überblick

1. Tisch auswählen
2. Bestellung aufnehmen
3. Bestellung an die Küche weiterleiten
4. Bestellung in der Küche bearbeiten
5. Bestellung als fertig melden
6. Speisen servieren
7. Rechnung anzeigen und Bezahlung abschließen

### 1.4 Team und Organisation

Das Projekt wird in einer Gruppe mit vier Auszubildenden bearbeitet. Empfohlene Rollenverteilung:

| Rolle | Verantwortung |
|---|---|
| Teamleitung | Überblick, Termine, Absprachen, Projekttagebuch |
| Analyse / Dokumentation | Anforderungen, Prozessbeschreibung, Diagramme |
| Datenbank / Backend-nahe Aufgaben | Datenmodell, Speicherung, Statuslogik |
| Oberfläche / Frontend-nahe Aufgaben | Masken für Service, Küche und Admin |

Wegen der kurzen Zeit arbeiten Analyse und Entwicklung **parallel**: Während die Datenbank vorbereitet wird, werden Diagramme und Dokumentation mitgeschrieben.

## 2. Ressourcenschätzung

### 2.1 Zeitliche Ressourcen (2 Wochen)

| Phase | Inhalt | Dauer |
|---|---|---|
| Phase 1 | Analyse und Anforderungen | Tag 1 |
| Phase 2 | Prozess- und Ablaufplanung | Tag 1–2 |
| Phase 3 | Konzeption und Architektur | Tag 2–3 |
| Phase 4 | Umsetzung | Tag 3–8 |
| Phase 5 | Test | Tag 8–9 |
| Phase 6 | Abschluss und Dokumentation | Tag 9–10 |
| **Gesamt** | | **10 Arbeitstage (2 Wochen)** |

**Wochenplan:**

| Woche | Schwerpunkt |
|---|---|
| Woche 1 | Anforderungen, Prozess, Datenbank, Start der Umsetzung |
| Woche 2 | Bestellprozess fertigstellen, testen, dokumentieren und abgeben |

### 2.2 Personelle Ressourcen

| Ressource | Beschreibung |
|---|---|
| Teamgröße | 4 Auszubildende |
| Arbeitsform | parallele Arbeit nach Rollen, tägliche kurze Abstimmung |
| Abstimmung | kurzes Daily (5–10 Minuten) und Projekttagebuch |

### 2.3 Technische Ressourcen

| Ressource | Verwendung |
|---|---|
| Entwicklungsumgebung | Editor / IDE für die Programmierung |
| Datenbanksystem | relationale Datenbank für Stammdaten und Bestellungen |
| Versionsverwaltung | Ablage und Austausch der Projektdateien |
| Diagramm-Tools | Aktivitätsdiagramm, ER-Modell, Mockups |
| Kanban-Board | Planung und Verfolgung der Aufgaben |

Die Preis- und Kostenkalkulation steht im Dokument [`04-kostenkalkulation.md`](04-kostenkalkulation.md).

## 3. Projektphasen

Die Umsetzung wird in sechs Phasen unterteilt. Die Phasen laufen wegen der kurzen Zeit teilweise parallel.

### Phase 1: Analyse und Anforderungsdefinition

**Ziel:** Den Bestellprozess verstehen und die wichtigsten Anforderungen festlegen.

**Aufgaben:**
- Ausgangssituation kurz beschreiben
- Bereiche Service, Küche und Administration bestätigen
- Anforderungskatalog finalisieren (Fokus Muss)
- Offene Fragen im Team klären

**Ergebnis:** Freigegebener Anforderungskatalog  
**Dauer:** Tag 1

---

### Phase 2: Prozess- und Ablaufplanung

**Ziel:** Den Bestellablauf fachlich beschreiben.

**Aufgaben:**
- Ablauf von Bestellaufnahme bis Bezahlung beschreiben
- Statuswechsel festlegen (`aufgegeben` → `in Bearbeitung` → `fertig` → `serviert` → `bezahlt`)
- UML-Aktivitätsdiagramm erstellen

**Ergebnis:** Prozessbeschreibung und Aktivitätsdiagramm  
**Dauer:** Tag 1–2

---

### Phase 3: Konzeption und Softwarearchitektur

**Ziel:** Die technische Grundlage schnell festlegen.

**Aufgaben:**
- Einfache Architektur für Service, Küche und Admin festlegen
- ER-Modell und Datenbank anlegen
- Grobe Mockups skizzieren (nur Kernmasken)

**Ergebnis:** Datenbankmodell und kurze Architekturübersicht  
**Dauer:** Tag 2–3

---

### Phase 4: Umsetzung des Bestellprozesses

**Ziel:** Den Kern des Bestellprozesses lauffähig machen.

**Aufgaben:**
- Stammdaten (Tische, Artikel, Mitarbeiter)
- Service: Tischwahl, Bestellung erfassen, servieren, bezahlen
- Küche: Bestellungen anzeigen, Status ändern
- Statusprotokoll speichern
- Admin: grundlegende Verwaltung

**Ergebnis:** Lauffähige Basisversion  
**Dauer:** Tag 3–8

---

### Phase 5: Test und Qualitätssicherung

**Ziel:** Den kompletten Bestellablauf prüfen.

**Aufgaben:**
- Kernablauf End-to-End testen
- Fehler beheben
- Prüfkriterien der Muss-Anforderungen kontrollieren

**Ergebnis:** Kurze Testdokumentation und korrigierte Anwendung  
**Dauer:** Tag 8–9

---

### Phase 6: Abschluss, Dokumentation und Ausblick

**Ziel:** Abgabe vorbereiten und Projekt abschließen.

**Aufgaben:**
- Entwickler- und Benutzerdokumentation knapp erstellen
- Screenshot und Quellcodeausschnitt ergänzen
- Erreichte / nicht erreichte Ziele begründen
- Ausblick auf Erweiterungen beschreiben

**Ergebnis:** Abschlussdokumentation  
**Dauer:** Tag 9–10

## 4. Phasenübersicht

| Phase | Name | Zeitraum | Wichtigstes Ergebnis |
|---|---|---|---|
| 1 | Analyse | Tag 1 | Anforderungskatalog |
| 2 | Prozessplanung | Tag 1–2 | Aktivitätsdiagramm |
| 3 | Konzeption | Tag 2–3 | Datenbankmodell |
| 4 | Umsetzung | Tag 3–8 | Basissoftware |
| 5 | Test | Tag 8–9 | Testdokumentation |
| 6 | Abschluss | Tag 9–10 | Enddokumentation |

## 5. Meilensteine

| Meilenstein | Inhalt | Zeitpunkt |
|---|---|---|
| M1 | Anforderungen und Prozess stehen | Ende Tag 2 |
| M2 | Datenbank und Architektur stehen | Ende Tag 3 |
| M3 | Bestellung kann erfasst und in der Küche bearbeitet werden | Ende Woche 1 |
| M4 | Kompletter Kernablauf funktioniert | Tag 8 |
| M5 | Tests und Dokumentation sind fertig | Ende Tag 10 |

## 6. Sprint Planning (2 Wochen)

Wegen der kurzen Laufzeit werden **4 kurze Sprints** geplant (je ca. 2–3 Tage).

### 6.1 Sprint-Übersicht

| Sprint | Zeitraum | Ziel | Wichtige Inhalte |
|---|---|---|---|
| Sprint 1 | Tag 1–3 | Grundlagen | Anforderungen finalisieren, Prozess, Datenbank, Board aufbauen |
| Sprint 2 | Tag 4–6 | Bestellung + Küche | Service: Bestellung erfassen; Küche: Status ändern |
| Sprint 3 | Tag 7–8 | Prozess abschließen | Servieren, bezahlen, Protokoll, Admin-Kern |
| Sprint 4 | Tag 9–10 | Stabilisieren & abgeben | Tests, Fehlerbehebung, Dokumentation, Abgabe |

### 6.2 Priorität in den Sprints

1. Zuerst alle **Muss-Anforderungen**
2. Danach nur ausgewählte **Soll-Anforderungen**
3. **Kann-Anforderungen** entfallen bei Zeitmangel

### 6.3 Arbeitsweise im Sprint

- Aufgaben auf dem Kanban-Board führen
- Am Sprintanfang festlegen, was fertig werden muss
- Am Sprintende den geplanten Teil des Bestellprozesses prüfen
- Offene Punkte nur übernehmen, wenn sie den Kernablauf blockieren

## 7. Risikoanalyse

### 7.1 Bewertungsmaßstab

**Risikowert = Eintrittswahrscheinlichkeit × Auswirkung**

| Stufe | Eintrittswahrscheinlichkeit | Auswirkung |
|---|---|---|
| 1 | gering | geringe Störung |
| 2 | mittel | spürbare Verzögerung oder Qualitätsminderung |
| 3 | hoch | starker Einfluss auf Ablauf, Zeitplan oder Ergebnis |

| Risikowert | Bewertung |
|---|---|
| 1–2 | niedrig |
| 3–4 | mittel |
| 6–9 | hoch |

### 7.2 Risiken im 2-Wochen-Projekt

| ID | Risiko | Phase | Wahrscheinlichkeit | Auswirkung | Risikowert | Bewertung | Maßnahme |
|---|---|---|---|---|---|---|---|
| R-01 | Anforderungen sind unklar oder ändern sich häufig | 1–2 | 2 | 3 | 6 | hoch | Anforderungen am Tag 1 einfrieren |
| R-02 | Der Bestellablauf wird zu kompliziert geplant | 2 | 2 | 3 | 6 | hoch | Nur Kernablauf Service → Küche → Bezahlung |
| R-03 | Datenmodell ist fehlerhaft | 3 | 2 | 3 | 6 | hoch | Datenbank früh mit Testwerten prüfen |
| R-04 | Zeitmangel bei der Programmierung | 4 | 3 | 3 | 9 | hoch | Strikt nur Muss-Funktionen umsetzen |
| R-05 | Abstimmungsprobleme im Team | alle | 2 | 3 | 6 | hoch | Tägliche kurze Abstimmung und klare Rollen |
| R-06 | Bestellungen kommen in der Küche falsch an | 4–5 | 2 | 3 | 6 | hoch | Frühe End-to-End-Tests ab Sprint 2 |
| R-07 | Statuswechsel werden nicht protokolliert | 4–5 | 2 | 2 | 4 | mittel | Logging direkt mit der Statuslogik bauen |
| R-08 | Testdaten fehlen | 5 | 2 | 2 | 4 | mittel | Testdaten bereits in Sprint 1 anlegen |
| R-09 | Technische Probleme (Tools, Datenbank) | 3–4 | 2 | 3 | 6 | hoch | Umgebung am Tag 1/2 einrichten |
| R-10 | Dokumentation wird zu spät erstellt | 6 | 3 | 3 | 9 | hoch | Dokumentation parallel ab Woche 1 mitführen |

### 7.3 Die drei größten Risiken

1. **Zeitmangel (R-04)** – Gegenmaßnahme: nur Muss-Funktionen, Scope nicht erweitern.
2. **Dokumentation zu spät (R-10)** – Gegenmaßnahme: parallel zur Umsetzung schreiben.
3. **Unklare Anforderungen / zu großer Umfang (R-01 / R-02)** – Gegenmaßnahme: Scope am Tag 1 festlegen und einfrieren.

## 8. Empfehlungen für die Umsetzung

- In 2 Wochen zählt der **komplette Kernablauf** mehr als viele Einzeldetails.
- Jeden Tag prüfen: Kommen wir dem Bestellprozess näher?
- Bei Zeitdruck zuerst streichen: Auswertungen, Komfortfunktionen, optionale Masken.
- Parallel arbeiten: eine Person Datenbank, eine Person Oberfläche, eine Person Dokumentation.

## 9. Zusammenfassung

Die Projektplanung ist auf einen festen Zeitraum von **2 Wochen (10 Arbeitstage)** ausgelegt. Die sechs Phasen und vier Sprints sind zeitlich stark verdichtet. Der Fokus liegt auf dem lauffähigen Kernprozess von der Bestellaufnahme bis zur Bezahlung. Das größte Risiko ist Zeitmangel; deshalb werden Muss-Anforderungen priorisiert und Dokumentation sowie Tests parallel mitgeführt.
