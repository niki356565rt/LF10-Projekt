# Umfassender Projektbericht: Smart Restaurant

> **Hinweis:** Der vollständige und ausführliche Projektbericht befindet sich in [`docs/PROJEKTBERICHT.md`](docs/PROJEKTBERICHT.md).

**Projektbezeichnung:** Digitales Bestell- und Verwaltungssystem für eine Gaststätte  
**Projekt-Repository:** `niki356565rt/LF10-Projekt`  
**Auftragnehmer (Szenario):** Another Great Solution GmbH (Team „Der Dreier“)  
**Auftraggeber (Szenario):** Regionales Gastronomieunternehmen  
**Projektlaufzeit:** 2 Wochen (10 Arbeitstage / 320 Personenstunden)  
**Dokumentenstand:** 24. September 2026  
**Status:** Vollständige Projektdokumentation, Datenbank-Export & Konsolidierter Bericht  

---

## Inhaltsübersicht des Projektberichts

1. **Management Summary (Executive Summary):** Kern-Erkenntnisse, Projektziele, Meilensteine, MariaDB-Anlegung und SQL-Dump.
2. **Projektgegenstand & Ausgangslage:** Papierbasierter Ist-Zustand vs. digitaler Soll-Zustand, Rollenverteilung.
3. **Anforderungsanalyse & Priorisierung:** 26 Anforderungen (A-01 bis AD-10), MoSCoW-Klassifizierung, Scope-Abgrenzung.
4. **Strategische Entscheidungen:** Make-or-Buy-Bewertung (Entscheidung für Eigenentwicklung) & Stakeholder-Analyse (10 Gruppen).
5. **Projektplanung, Ressourcen & Risikomanagement:** 6 Phasen, 4 Sprints, Risikomatrix mit 10 Risiken.
6. **Kosten- & Wirtschaftlichkeitsbetrachtung:** 320h Aufwand, Herstellkosten (14.900 €), Selbstkosten (17.880 €), Angebotspreis (19.668 € netto / 23.404,92 € brutto), Einzel- vs. Gemeinkosten.
7. **Physikalische Datenbankerstellung, Testdaten & SQL-Export:** 
   - Physikalische Anlegung der Datenbank `smart_restaurant` in MariaDB.
   - Befüllung aller 10 Tabellen mit repräsentativen Testdaten (5 Mitarbeiter, 8 Tische, 6 Kategorien, 15 Artikel, 4 Bestellungen, 13 Positionen, 12 Audit-Protokolle).
   - Export der vollständigen Datenbankstruktur (DDL) und Datensätze (DML) als standalone Dump-Datei: [`smart_restaurant_dump.sql`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/smart_restaurant_dump.sql) / [`docs/smart_restaurant_dump.sql`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/docs/smart_restaurant_dump.sql).
8. **Security, Compliance & ISMS (ISO 27001 / DSGVO):** ISMS-Gesamtkonzept, ISO 27001 Annex-A-Mapping (15 Controls), DSGVO-Prüfung, Sicherheitsrichtlinien & Lizenzinventar.
9. **Qualitätssicherung & Audit-Framework:** Audit-Verifikation der Datensätze, 11 Prüfkriterien (A-01 bis A-10), Feststellungen F-01 bis F-05.
10. **Projektergebnis, Fazit & Ausblick:** Soll-Ist-Vergleich, Lessons Learned, Erweiterungsmöglichkeiten.

👉 **Vollständigen Bericht lesen:** [`docs/PROJEKTBERICHT.md`](docs/PROJEKTBERICHT.md)  
👉 **Datenbank-Dump (.sql) abrufen:** [`smart_restaurant_dump.sql`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/smart_restaurant_dump.sql)
