# Umfassender Projektbericht: Smart Restaurant

> **Hinweis:** Der vollständige und ausführliche Projektbericht befindet sich in [`docs/PROJEKTBERICHT.md`](docs/PROJEKTBERICHT.md).

**Projektbezeichnung:** Digitales Bestell- und Verwaltungssystem für eine Gaststätte  
**Projekt-Repository:** `niki356565rt/LF10-Projekt`  
**Auftragnehmer (Szenario):** Another Great Solution GmbH (Team „Der Dreier“)  
**Auftraggeber (Szenario):** Regionales Gastronomieunternehmen  
**Projektlaufzeit:** 2 Wochen (10 Arbeitstage / 320 Personenstunden)  
**Dokumentenstand:** 01. Oktober 2026  
**Status:** Vollständige Projektdokumentation, Java-Implementierung & Konsolidierter Bericht  

---

## Inhaltsübersicht des Projektberichts

1. **Management Summary (Executive Summary):** Kern-Erkenntnisse, Projektziele, Meilensteine, Java-Software, Projekttagebuch PDF & SQL-Dump.
2. **Projekttagebuch & Projektregeln:** 
   - Regel `.cursor/rules/projekttagebuch.mdc` zur parallelen Führung des Projekttagebuchs.
   - Rekonstruiertes Projekttagebuch (PDF): [`abgabe/Projekttagebuch.pdf`](abgabe/Projekttagebuch.pdf) / [`docs/Projekttagebuch.html`](docs/Projekttagebuch.html).
3. **Projektgegenstand & Ausgangslage:** Papierbasierter Ist-Zustand vs. digitaler Soll-Zustand, Rollenverteilung.
4. **Java-Softwareimplementierung & Objektorientiertes Design:** 
   - Lauffähige Java 17 Swing-Anwendung (`src/com/smartrestaurant/`) mit Standard-SQL-Queries.
   - UI-Mockups ([`docs/15-mockup-gui.md`](docs/15-mockup-gui.md)) & PlantUML-Klassendiagramm ([`docs/16-klassendiagramm.puml`](docs/16-klassendiagramm.puml)).
5. **Testdokumentation & Konzept zum automatisierten Testen:**
   - Automatisierter Testsuite-Runner ([`DatabaseTest.java`](src/com/smartrestaurant/DatabaseTest.java)) mit 100 % Erfolgsquote.
   - Testdokumentation & Qualitätskonzept ([`docs/17-testdokumentation.md`](docs/17-testdokumentation.md)).
6. **Entwickler- & Benutzerdokumentation (PDF & Markdown):**
   - Entwicklerdokumentation (PDF): [`abgabe/Entwicklerdokumentation.pdf`](abgabe/Entwicklerdokumentation.pdf) / [`docs/18-entwicklerdokumentation.md`](docs/18-entwicklerdokumentation.md)
   - Benutzerdokumentation (PDF): [`abgabe/Benutzerdokumentation.pdf`](abgabe/Benutzerdokumentation.pdf) / [`docs/19-benutzerdokumentation.md`](docs/19-benutzerdokumentation.md)
7. **Strategische Entscheidungen:** Make-or-Buy-Bewertung (Entscheidung für Eigenentwicklung) & Stakeholder-Analyse.
8. **Projektplanung & Wirtschaftlichkeit:** 320h Aufwand, Herstellkosten (14.900 €), Selbstkosten (17.880 €), Angebotspreis (19.668 € netto / 23.404,92 € brutto).
9. **Physikalische Datenbankerstellung & Export:** SQL-Dump [`smart_restaurant_dump.sql`](smart_restaurant_dump.sql).
10. **Projektergebnis & Ausblick:** Zusammenfassung & Erweiterungsmöglichkeiten.

👉 **Vollständigen Bericht lesen:** [`docs/PROJEKTBERICHT.md`](docs/PROJEKTBERICHT.md)  
👉 **Testdokumentation (PDF):** [`abgabe/Testdokumentation.pdf`](abgabe/Testdokumentation.pdf)  
👉 **Entwicklerdokumentation (PDF):** [`abgabe/Entwicklerdokumentation.pdf`](abgabe/Entwicklerdokumentation.pdf)  
👉 **Benutzerdokumentation (PDF):** [`abgabe/Benutzerdokumentation.pdf`](abgabe/Benutzerdokumentation.pdf)  
👉 **Projekttagebuch (PDF):** [`abgabe/Projekttagebuch.pdf`](abgabe/Projekttagebuch.pdf)  
👉 **ISMS-Systemdokumentation (ISO 27001) (PDF):** [`abgabe/ISMS-Systemdokumentation.pdf`](abgabe/ISMS-Systemdokumentation.pdf)  
👉 **Datenbank-Dump (.sql) abrufen:** [`smart_restaurant_dump.sql`](smart_restaurant_dump.sql)
