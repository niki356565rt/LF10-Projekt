# Anforderungskatalog – Smart Restaurant

**Projekt:** Digitales Bestell- und Verwaltungssystem für eine Gaststätte  
**Gewählte Bereiche:** Service, Küche und Administration  
**Stand:** 18.08.2026

## 1. Ausgangssituation

In der Gaststätte werden Bestellungen bisher mit Papier und Stift aufgenommen. Dadurch kann es zu Missverständnissen, längeren Wartezeiten und Problemen bei der Kommunikation zwischen Service und Küche kommen.

Das Ziel des Projekts ist eine eigene Software, die den Bestellvorgang digital unterstützt. Der Service nimmt Bestellungen direkt am Tisch auf. Die Küche erhält die bestellten Speisen und kann deren Bearbeitungsstatus ändern. Über die Administration werden Mitarbeiter, Artikel und Tische verwaltet.

## 2. Beteiligte Benutzer

| Benutzer | Aufgaben im System |
|---|---|
| Service | Tische auswählen, Bestellungen aufnehmen, Rechnungen anzeigen und Bestellungen abschließen |
| Küche | Offene Bestellungen sehen und ihren Bearbeitungsstatus ändern |
| Administration | Mitarbeiter, Artikel und Tische verwalten sowie Auswertungen anzeigen |

## 3. Prioritäten

Die Anforderungen werden nach ihrer Wichtigkeit eingeteilt:

- **Muss:** Für den grundlegenden Ablauf notwendig
- **Soll:** Wichtig, aber nicht zwingend für eine erste Version
- **Kann:** Sinnvolle Erweiterung für eine spätere Version

## 4. Allgemeine Anforderungen

| ID | Anforderung | Priorität | Prüfkriterium |
|---|---|---|---|
| A-01 | Jeder Tisch besitzt eine eindeutige Tischnummer. | Muss | Eine Tischnummer kann nicht doppelt vergeben werden. |
| A-02 | Für jeden Tisch wird eine Kapazität von 2 bis 8 Personen gespeichert. | Muss | Es können nur Werte zwischen 2 und 8 eingegeben werden. |
| A-03 | Jeder Tisch besitzt den Status „frei“ oder „besetzt“. | Muss | Der aktuelle Tischstatus wird eindeutig angezeigt. |
| A-04 | Einem Tisch können mehrere Bestellungen zugeordnet werden. | Muss | Zu einem Tisch lassen sich mehrere Bestellungen speichern und anzeigen. |
| A-05 | Jede Bestellung wird mit Datum und Uhrzeit gespeichert. | Muss | Nach dem Anlegen sind Datum und Uhrzeit vorhanden. |
| A-06 | Eine Bestellung besteht aus einer oder mehreren Bestellpositionen. | Muss | Eine Bestellung mit mehreren Artikeln kann gespeichert werden. |
| A-07 | Jede Bestellposition enthält einen Artikel und eine Menge. | Muss | Artikel und Menge werden bei jeder Position angezeigt. |
| A-08 | Jeder Artikel besitzt einen Namen, einen Preis und eine Kategorie. | Muss | Ein Artikel kann nur mit allen drei Angaben gespeichert werden. |
| A-09 | Artikel werden abhängig von ihrer Kategorie der Küche oder der Bar zugeordnet. | Muss | Speisen werden an die Küche weitergeleitet. |
| A-10 | Eine Bestellung kann die Status „aufgegeben“, „in Bearbeitung“, „fertig“, „serviert“ und „bezahlt“ besitzen. | Muss | Der aktuelle Status ist bei jeder Bestellung sichtbar. |
| A-11 | Mitarbeiter werden mit Name, Benutzername und Rolle gespeichert. | Muss | Alle drei Angaben sind im Mitarbeiterdatensatz vorhanden. |
| A-12 | Das System unterstützt mindestens die Rollen Service, Küche und Administration. | Muss | Jede der drei Rollen kann einem Mitarbeiter zugeordnet werden. |
| A-13 | Jede Änderung des Bestellstatus wird protokolliert. | Muss | Im Protokoll stehen Mitarbeiter, Zeitpunkt und Bestellung. |

## 5. Anforderungen an die Service-Ansicht

| ID | Anforderung | Priorität | Prüfkriterium |
|---|---|---|---|
| S-01 | Der Service kann einen Tisch aus einer Übersicht auswählen. | Muss | Nach der Auswahl wird der gewählte Tisch angezeigt. |
| S-02 | Der Service kann für einen Tisch eine neue Bestellung anlegen. | Muss | Die Bestellung wird dem richtigen Tisch zugeordnet. |
| S-03 | Der Service kann Artikel und Mengen zu einer Bestellung hinzufügen. | Muss | Die gewählten Artikel und Mengen erscheinen in der Bestellung. |
| S-04 | Neue Bestellungen erhalten den Status „aufgegeben“. | Muss | Nach dem Speichern wird der richtige Status angezeigt. |
| S-05 | Der Service kann eine fertige Bestellung auf „serviert“ setzen. | Muss | Der neue Status wird gespeichert und protokolliert. |
| S-06 | Der Service kann die Rechnung eines Tisches anzeigen. | Soll | Die Rechnung enthält Artikel, Mengen, Einzelpreise und Gesamtpreis. |
| S-07 | Der Service kann eine Bestellung nach der Bezahlung abschließen. | Muss | Die Bestellung erhält den Status „bezahlt“. |
| S-08 | Nach Abschluss aller Bestellungen kann ein Tisch wieder auf „frei“ gesetzt werden. | Soll | Der Tisch wird in der Übersicht als frei angezeigt. |

## 6. Anforderungen an die Küchen-Ansicht

| ID | Anforderung | Priorität | Prüfkriterium |
|---|---|---|---|
| K-01 | Die Küche sieht alle offenen Bestellungen mit Speisen. | Muss | Eine neue Bestellung mit Speisen erscheint in der Küchenansicht. |
| K-02 | Die Bestellungen werden nach ihrer Eingangszeit sortiert. | Soll | Die älteste offene Bestellung steht an erster Stelle. |
| K-03 | Die Küche kann eine Bestellung auf „in Bearbeitung“ setzen. | Muss | Der Statuswechsel wird gespeichert und protokolliert. |
| K-04 | Die Küche kann eine Bestellung auf „fertig“ setzen. | Muss | Der Statuswechsel wird gespeichert und ist für den Service sichtbar. |
| K-05 | Reine Getränkebestellungen werden nicht in der Küchenansicht angezeigt. | Muss | Eine Bestellung nur mit Getränken erscheint nicht in der Küchenliste. |

## 7. Anforderungen an die Admin-Ansicht

| ID | Anforderung | Priorität | Prüfkriterium |
|---|---|---|---|
| AD-01 | Mitarbeiter können angezeigt werden. | Muss | Eine Liste mit Name, Benutzername und Rolle wird angezeigt. |
| AD-02 | Mitarbeiter können angelegt werden. | Muss | Ein neuer Mitarbeiter erscheint nach dem Speichern in der Liste. |
| AD-03 | Mitarbeiter können bearbeitet werden. | Muss | Änderungen bleiben nach dem Speichern erhalten. |
| AD-04 | Mitarbeiter können gelöscht werden. | Muss | Der gelöschte Mitarbeiter erscheint nicht mehr in der aktiven Liste. |
| AD-05 | Artikel können angelegt werden. | Muss | Ein neuer Artikel kann mit Name, Preis und Kategorie gespeichert werden. |
| AD-06 | Artikel können bearbeitet werden. | Muss | Änderungen an einem Artikel werden gespeichert. |
| AD-07 | Artikel können gelöscht werden. | Muss | Der gelöschte Artikel kann nicht mehr bestellt werden. |
| AD-08 | Tische können angelegt, bearbeitet und gelöscht werden. | Muss | Änderungen sind anschließend in der Tischübersicht sichtbar. |
| AD-09 | Der Wochenumsatz kann angezeigt werden. | Soll | Für eine ausgewählte Woche wird der Umsatz berechnet. |
| AD-10 | Das meistverkaufte Getränk einer Woche kann angezeigt werden. | Soll | Das Getränk mit der größten verkauften Menge wird angezeigt. |

## 8. Nicht enthaltene Funktionen

Für die erste Umsetzung werden nur die Bereiche Service, Küche und Administration betrachtet. Folgende Funktionen gehören deshalb nicht zum aktuellen Umfang:

- eigene Bar-Ansicht
- automatische Lagerverwaltung
- Bestellung durch Gäste per QR-Code oder App
- Anbindung an ein Kartenlesegerät oder einen Zahlungsdienst

Diese Funktionen können später als Erweiterungen umgesetzt werden.

## 9. Noch zu klärende Punkte

- Soll die Software als Web-, Desktop- oder mobile Anwendung entwickelt werden?
- Wie melden sich die Mitarbeiter am System an?
- Wird der Status für eine ganze Bestellung oder für einzelne Positionen geändert?
- Wird eine Rechnung pro Bestellung oder für den gesamten Tisch erstellt?
- Wie werden Getränke verarbeitet, solange keine eigene Bar-Ansicht vorhanden ist?
- Sollen bereits verwendete Mitarbeiter und Artikel gelöscht oder nur deaktiviert werden?

## 10. Zusammenfassung

Der Anforderungskatalog beschreibt die wichtigsten Funktionen für die Bereiche Service, Küche und Administration. Im Mittelpunkt steht ein vollständiger digitaler Ablauf von der Aufnahme einer Bestellung bis zur Bezahlung. Die Anforderungen dienen als Grundlage für die späteren User Stories, Diagramme, die Datenbank und die Umsetzung der Software.
