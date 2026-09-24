# Kostenstellen – Smart Restaurant

**Projekt:** Digitales Bestell- und Verwaltungssystem  
**Auftragnehmer (Szenario):** Another Great Solution GmbH  
**Laufzeit:** 2 Wochen (10 Arbeitstage)  
**Stand:** 26.08.2026  
**Bezug:** [`04-kostenkalkulation.md`](04-kostenkalkulation.md)

## 1. Wozu diese Übersicht

Eine **Kostenstelle** ist der Ort, an dem Kosten entstehen (Abteilung, Team, Raum, Infrastruktur). Für die Projektkalkulation zählt vor allem: Kann man die Kosten **direkt diesem Auftrag** zurechnen oder müssen sie **umgelegt** werden?

- **Eindeutig zuordenbar** = Einzelkosten. Ohne das Projekt Smart Restaurant würden sie so nicht anfallen.
- **Nicht eindeutig zuordenbar** = Gemeinkosten. Sie entstehen auch ohne dieses Projekt (Büro, Leitung, gemeinsame Tools) und werden nur anteilig belastet.

Die Beträge in Abschnitt 5 entsprechen der bestehenden Kalkulation (Herstellkosten 14.900,00 €, Gemeinkostenzuschlag 20 %).

## 2. Eindeutig dem Projekt zuordenbar

Diese Stellen bzw. Kostenblöcke gehören zum Auftrag „Smart Restaurant“. Sie lassen sich über Stunden, Belege oder eine eigene Projektnummer nachweisen.

| Nr. | Kostenstelle / Kostenblock | Was konkret anfällt | Warum eindeutig | Nachweis |
|---|---|---|---|---|
| E-01 | Projektteam Smart Restaurant | 320 Stunden der vier Rollen (Leitung, Analyse, Datenbank, Oberfläche) | Die Personen arbeiten in diesen zwei Wochen am Bestellprozess | Stundenzettel, Kanban, Projekttagebuch |
| E-02 | Analyse und Dokumentation (dieser Auftrag) | Anforderungskatalog, Prozess, UML, Stakeholder, Make-or-Buy | Artefakte entstehen nur für diesen Auftrag | Dateien unter `docs/` |
| E-03 | Umsetzung Bestellprozess | Service-, Küchen- und Admin-Funktionen, Statuslog | Spezifisch für Speisen, Tische, Bestellstatus | Quellcode, Testdaten |
| E-04 | Test und Abnahme (dieser Auftrag) | End-to-End-Test Aufnahme → Küche → Bezahlung | Prüft nur diesen Kernablauf | Testdokumentation |
| E-05 | Projektspezifische Ablage | GitHub-Repository `LF10-Projekt`, Issues, Board-Karten | Repo und Board sind für dieses Projekt angelegt | GitHub-Projekt, Issues |
| E-06 | Projektspezifische Diagramm- und Abgabeerstellung | Aktivitätsdiagramm, ER-Modell, Abgabedateien | Inhaltlich nur der Gaststätten-Bestellprozess | `docs/07-*`, `abgabe/` |
| E-07 | Auftragsspezifische Abstimmung | Daily, Sprint-Reviews, Absprachen mit dem Auftraggeber-Szenario | Zeit wäre ohne den Auftrag nicht nötig | Projekttagebuch |

**In der Kalkulation:** das sind die **14.400,00 € Personalkosten** plus der eindeutig projektbezogene Teil der Sachkosten (Ablage/Board 50,00 €, Tools anteilig nur soweit extra für diesen Auftrag).

Nicht in diese Gruppe gehören spätere Erweiterungen (eigene Bar-Software, Lager, Kartenleser). Die wären erst dann eindeutig, wenn sie beauftragt und umgesetzt werden.

## 3. Nicht eindeutig dem Projekt zuordenbar

Diese Stellen laufen im Unternehmen bzw. in der Ausbildungsstätte weiter, auch wenn Smart Restaurant nicht existierte. Ein einzelner Beleg „nur für LF10“ fehlt. Man verteilt sie über einen **Umlageschlüssel** (Stunden, Arbeitsplätze, Quadratmeter, Nutzungsdauer).

| Nr. | Kostenstelle | Was konkret anfällt | Warum nicht eindeutig | Üblicher Schlüssel |
|---|---|---|---|---|
| G-01 | Allgemeine Verwaltung / Sekretariat | Buchhaltung, Verträge, Personalverwaltung | Arbeitet für alle Aufträge | Anteil Projektstunden an allen Stunden |
| G-02 | Geschäftsleitung / Ausbilder | Steuerung mehrerer Projekte, Prüfungen, Mentoring | Zeit ist nicht nur Smart Restaurant | geschätzter Leitungsanteil |
| G-03 | Gebäude und Arbeitsplätze | Miete, Heizung, Reinigung, Möbel | Räume dienen mehreren Vorhaben | m² oder Arbeitsplatz × 10 Tage |
| G-04 | Energie und Internet | Strom, Netz, WLAN | gemeinsamer Anschluss | Anteil Nutzungszeit |
| G-05 | Zentrale IT / Rechnerpark | PCs, Lizenzen für IDE, Office, Betriebssystem | Geräte und Lizenzen werden wiederverwendet | Abschreibung anteilig 2 Wochen |
| G-06 | Gemeinsame Kommunikationsdienste | E-Mail, Teams/Chat, allgemeines GitHub-Konto | nicht nur dieses Repo | Pauschale / Nutzerzahl |
| G-07 | Versicherung, Arbeitssicherheit | Betriebshaftpflicht, Unterweisungen | gesetzlich für den ganzen Betrieb | Kopfzahl oder Umsatzanteil |
| G-08 | Aus- und Weiterbildung allgemein | Berufsschule, überbetriebliche Kurse | unabhängig vom Gaststätten-Auftrag | nicht umlegen oder nur Lehranteil |
| G-09 | Kantine / Sozialräume | Pausenversorgung | kein Projektbezug | in der Regel nicht dem Auftrag belasten |
| G-10 | Marketing / Akquise | Akquise weiterer Aufträge | Nutzen liegt in der Zukunft | nicht diesem 2-Wochen-Projekt |

**In der Kalkulation:** das steckt im **Gemeinkostenzuschlag von 20 %** (2.980,00 € auf 14.900,00 € Herstellkosten). Die 200,00 € „Infrastruktur anteilig“ und 150,00 € „Tools anteilig“ in Abschnitt 4 der Kostenkalkulation sind bereits eine grobe Umlage aus G-03 bis G-05 – sie sind **geschätzt**, nicht einzeln belegt.

## 4. Grenzfälle (kurz)

| Position | Einordnung | Begründung |
|---|---|---|
| Notebooks der vier Teammitglieder | nicht eindeutig, außer Neuanschaffung nur für LF10 | vorhandene Geräte → Abschreibung / Umlage (G-05) |
| Cursor, VS Code, PlantUML, Git | nicht eindeutig, solange kostenlos oder Firmenlizenz | nur extra gekaufte Pro-Lizenzen wären E-Kosten |
| Datenbanklizenz | eindeutig, wenn nur für Smart Restaurant beschafft | vorhandene Lern-/Express-Edition → Gemeinkosten |
| Schulungsraum für das Daily | nicht eindeutig | Raum gehört zur Ausbildungsstätte (G-03) |
| Ausdruck der Abgabe | eindeutig, wenn nur dieser Auftrag gedruckt wird | Papier/Toner sonst über Büro umlegen |

## 5. Bezug zur Zahlenkalkulation

| Zuordnung | Entspricht in `04-kostenkalkulation.md` | Betrag |
|---|---|---|
| Eindeutig (überwiegend E-01 bis E-07) | Personalkosten | 14.400,00 € |
| Mischblock, schon anteilig umgelegt | Sach- und Betriebskosten | 500,00 € |
| **Direkt erfasste Herstellkosten** | Personal + Sachkosten | **14.900,00 €** |
| Nicht eindeutig (G-01 bis G-07, pauschal) | Gemeinkosten 20 % | 2.980,00 € |
| **Selbstkosten** | | **17.880,00 €** |

Ohne die Gemeinkosten wäre das Angebot zu niedrig: Leitung, Räume und Rechner würden „verschenkt“. Ohne die Einzelkosten-Trennung wüsste man nicht, was der Bestellprozess selbst gekostet hat.

## 6. Fazit

Dem Projekt **klar zurechenbar** sind vor allem die **320 Stunden** der vier Rollen plus die **projektspezifische Ablage und Dokumentation**.

**Nicht klar zurechenbar** sind Gebäude, Strom, zentrale IT, Verwaltung und allgemeine Ausbildung. Sie werden nicht einzeln auf Smart Restaurant gebucht, sondern über den **20-%-Zuschlag** (und die kleinen anteiligen Sachkosten) mitgetragen.

Für die Abgabe reicht diese Zweiteilung: Einzelkosten nachweisen, Gemeinkosten erklären und nicht so tun, als wären Miete und Internet „nur dieses Projekt“.
