# Preis- und Kostenkalkulation – Smart Restaurant

**Projekt:** Digitales Bestell- und Verwaltungssystem  
**Auftraggeber (Szenario):** regionales Gastronomieunternehmen  
**Auftragnehmer (Szenario):** Another Great Solution GmbH  
**Laufzeit:** 2 Wochen (10 Arbeitstage)  
**Team:** 4 Personen  
**Stand:** 19.08.2026

## 1. Ziel der Kalkulation

Diese Kalkulation schätzt die Kosten für die Entwicklung des digitalen Bestellprozesses (Service, Küche, Administration). Sie dient als Übersicht für die Projektplanung und zeigt, woraus sich ein möglicher Angebotspreis zusammensetzt.

Welche Kosten dem Auftrag direkt gehören und welche nur umgelegt werden, steht in [`04-kostenstellen.md`](04-kostenstellen.md).

## 2. Annahmen

| Annahme | Wert |
|---|---|
| Projektdauer | 10 Arbeitstage |
| Teamgröße | 4 Personen |
| Arbeitszeit pro Person und Tag | 8 Stunden |
| Gesamtstunden | 4 × 10 × 8 = **320 Stunden** |
| Stundensatz intern (Durchschnitt) | 45,00 € |
| Gemeinkostenzuschlag | 20 % |
| Gewinnzuschlag | 10 % |

Die Stundensätze sind Schätzwerte für ein Ausbildungs- bzw. Junior-Projekt und können je nach Unternehmen abweichen.

## 3. Personalkosten

| Rolle | Anteil | Stunden | Stundensatz | Kosten |
|---|---|---|---|---|
| Teamleitung / Organisation | 20 % | 64 h | 50,00 € | 3.200,00 € |
| Analyse / Dokumentation | 20 % | 64 h | 40,00 € | 2.560,00 € |
| Datenbank / Backend | 30 % | 96 h | 45,00 € | 4.320,00 € |
| Oberfläche / Frontend | 30 % | 96 h | 45,00 € | 4.320,00 € |
| **Summe Personalkosten** | **100 %** | **320 h** | | **14.400,00 €** |

## 4. Sach- und Betriebskosten (Detaillierte Aufschlüsselung)

| Kostenart | Konkrete Berechnung / Basis | Betrag |
|---|---|---|
| **Stromkosten (Arbeitsplätze & Server)** | 4 Entwickler-PCs (je 180 W) + 1 Testserver (80 W) = 800 W<br>800 W × 8 h/Tag × 10 Tage = **64 kWh**<br>64 kWh × 0,40 €/kWh (Gewerbestrompreis) | **25,60 €** (gerundet 28,00 €) |
| **Infrastruktur & Hardware-Nutzung** | Anteilige Rechner-Abschreibung / Arbeitsplatzmiete (10 Tage) | 172,00 € |
| **Softwarerechte / Tools** | Entwicklungsumgebung, UML-Tools, Diagramm-Lizenzen (anteilig) | 150,00 € |
| **Ablage / Kommunikation & Internet** | Repository-Hosting, Board, Internet/Netzwerkanbindung | 50,00 € |
| **Puffer / Kleinteile** | Unvorhergesehenes, Kleinmaterial, Adapter | 100,00 € |
| **Summe Sach- und Betriebskosten** | | **500,00 €** |

> **Hinweis zu den Gemeinkosten (2.980,00 €):**  
> Die übrigen Betriebskosten (Heizung, Raummiete, zentrale Gebäude-Stromkosten, Sekretariat und Geschäftsleitung) werden über den **Gemeinkostenzuschlag von 20 %** auf die Herstellkosten gedeckt.

## 5. Selbstkosten und Angebotspreis

| Position | Betrag |
|---|---|
| Personalkosten | 14.400,00 € |
| Sach- und Betriebskosten (inkl. Strom) | 500,00 € |
| **Herstellkosten** | **14.900,00 €** |
| Gemeinkosten (20 % auf Herstellkosten) | 2.980,00 € |
| **Selbstkosten** | **17.880,00 €** |
| Gewinnzuschlag (10 % auf Selbstkosten) | 1.788,00 € |
| **Angebotspreis (netto)** | **19.668,00 €** |
| MwSt. (19 %) | 3.736,92 € |
| **Angebotspreis (brutto)** | **23.404,92 €** |

## 6. Kosten je Phase (Überblick)

| Phase | Zeitraum | geschätzter Anteil | geschätzte Kosten* |
|---|---|---|---|
| 1 Analyse | Tag 1 | 5 % | 745,00 € |
| 2 Prozessplanung | Tag 1–2 | 10 % | 1.490,00 € |
| 3 Konzeption | Tag 2–3 | 15 % | 2.235,00 € |
| 4 Umsetzung | Tag 3–8 | 50 % | 7.450,00 € |
| 5 Test | Tag 8–9 | 10 % | 1.490,00 € |
| 6 Abschluss | Tag 9–10 | 10 % | 1.490,00 € |
| **Gesamt** | | **100 %** | **14.900,00 €** |

\*bezogen auf die Herstellkosten (Personal + Sachkosten)

## 7. Detaillierter Wirtschaftlichkeits- & TCO-Vergleich (3 Jahre)

Neben den einmaligen Entwicklungskosten ist für den Gastronomiebetrieb entscheidend, welche **laufenden Betriebs- und Energiekosten** im Regelbetrieb entstehen.

### Laufende Betriebskosten im Regelbetrieb (pro Jahr):

1. **Stromkosten im Betrieb (Gaststätte):**
   - 1× lokaler Mini-Server / Datenbank-Host: 25 W Dauerbetrieb (24/7) = 219 kWh/Jahr à 0,38 € = **83,22 € / Jahr**
   - 3× Touch-Terminals (Service, Küche, Bar): 3 × 35 W × 10 h/Tag × 300 Betriebstage = 315 kWh/Jahr à 0,38 € = **119,70 € / Jahr**
   - **Summe jährliche Stromkosten:** **ca. 203,00 € / Jahr**

2. **Laufende Wartung & Datensicherung:**
   - Automatisierte Backups & Wartungspauschale: **ca. 240,00 € / Jahr**
   - **Laufende Betriebskosten (Make) gesamt: ca. 443,00 € / Jahr**

3. **Vergleich Branchen-SaaS (Buy):**
   - Lizenzgebühren: 3 Terminals à 59 €/Monat = 177 €/Monat = **2.124,00 € / Jahr**
   - Stromkosten für Terminals fallen ebenfalls an: **ca. 120,00 € / Jahr**
   - **Laufende Betriebskosten (SaaS) gesamt: ca. 2.244,00 € / Jahr**

### Gesamtkostenvergleich (TCO über 3 Jahre):

| Kostenblock | Eigenentwicklung (Make) | Branchen-SaaS (Buy) | Differenz |
|---|---|---|---|
| **Einmalige Anschaffung / Entwicklung** | 19.668,00 € (Angebotspreis) | 3.500,00 € (Setup & Schulung) | - 16.168,00 € |
| **Hardware (Server + 3 Terminals)** | 1.800,00 € (einmalig) | 1.800,00 € (Terminals) | 0,00 € |
| **Laufende Lizenzgebühren (3 Jahre)** | **0,00 €** | **6.372,00 €** (3 × 2.124 €) | **+ 6.372,00 €** |
| **Laufende Stromkosten (3 Jahre)** | **ca. 610,00 €** (3 × 203 €) | **ca. 360,00 €** (nur Terminals) | - 250,00 € |
| **Wartung & Datensicherung (3 Jahre)** | **ca. 720,00 €** (3 × 240 €) | im SaaS-Abo enthalten | - 720,00 € |
| **Gesamtkosten nach 3 Jahren (TCO)** | **ca. 22.798,00 €** | **ca. 12.032,00 €** | |
| **Laufende Ersparnis ab Jahr 4** | **nur ca. 443 € / Jahr** | **ca. 2.244 € / Jahr** | **1.801 € Ersparnis p.a.** |

## 8. Fazit

Die geschätzten **Herstellkosten** liegen bei ca. **14.900 €**. Mit Gemeinkosten und Gewinn ergibt sich ein **Angebotspreis von ca. 19.700 € netto** (ca. **23.400 € brutto**). 

Durch die genaue Erfassung der **Stromkosten (28 € im Projekt / ca. 203 € p.a. im Betrieb)** und der wegfallenden Lizenzgebühren (2.124 € Ersparnis p.a.) erweist sich die Eigenentwicklung als langfristig hochwirtschaftlich und prozessstabil.

