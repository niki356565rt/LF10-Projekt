# ISMS-Systemdokumentation: Smart Restaurant Admin- & Frontendsystem (ISO/IEC 27001:2022)

**Dokumenten-ID:** `DOC.ISMS.SMART_RESTAURANT.MASTER.v1`  
**Version:** 1.0  
**Eigentümer:** ISMS Information Security Management / Entwicklerteam „Der Dreier“  
**Geltungsbereich:** Smart Restaurant Java-Backend, Standard-SQL DAO, Swing AdminGUI & Dediziertes Web-Frontend  
**Klassifizierung:** Intern / Auditfähig  
**Letztes Review:** 01. Oktober 2026  

---

## 1. Executive Summary

- **Prüfbarer Geltungsbereich:** Die ISMS-Systemdokumentation umfasst das komplette Informationssicherheits-Managementsystem für das Vorhaben *Smart Restaurant*, inkl. Java 17 Backend, SQLite/MariaDB-Datenbanken, Standard-SQL-Queries sowie die Bedien-Frontends (Swing GUI & Web-Frontend).
- **ISO 27001:2022 Konformität:** Vollständiges Inhalts- und Kontrollmodell mitsamt Annex-A-Mapping (A.5.1, A.5.2, A.5.9, A.5.10, A.8.2, A.8.3, A.8.15, A.8.25), validierbarem JSON-Schema und lückenloser Traceability.
- **Evidenzbasierter Nachweis:** Jedes Kontroll- und Inhaltsfeld ist an konkrete Quellcodedateien (`src/com/smartrestaurant/*`), Datenbankschemata (`smart_restaurant_dump.sql`) oder Audit-Artefakte gekoppelt.
- **Risikoorientierter Ansatz:** Schutzbedarfe für Vertraulichkeit, Integrität und Verfügbarkeit sind für alle Systemkomponenten definiert und mit Prüfmetriken hinterlegt.

---

## 2. Master-Inhaltsstruktur

Die folgende Struktur definiert die obligatorischen und optionalen Inhaltsmodule für die auditfähige IT-Systemdokumentation:

| Section-ID | Bezeichnung | Typ | Minimale Inhalte & Informationsdichte | Audit-Relevanz & Norm-Bezug |
|---|---|---|---|---|
| `SEC.01` | Zweck & Geltungsbereich | Pflicht | Eindeutige Abgrenzung der Systeme, Standorte, Rollen und Schnittstellen. | ISO 27001 Cl. 4.3 / A.5.1 |
| `SEC.02` | Rollen & RACI-Matrix | Pflicht | Zuordnung von Aufgaben (Responsible, Accountable, Consulted, Informed) für Betrieb und Security. | ISO 27001 Cl. 5.3 / A.5.2 |
| `SEC.03` | Asset- & Informationsinventar | Pflicht | Inventarisierung aller Datenklassen (Mitarbeiter, Bestellungen, Artikel) und System-Assets. | ISO 27001 A.5.9 / A.5.10 |
| `SEC.04` | Risikobewertung & -behandlung | Pflicht | Risikomatrix mit Wahrscheinlichkeit, Auswirkung, Risikowert und Gegenmaßnahmen. | ISO 27001 Cl. 6.1.2 / Cl. 6.1.3 |
| `SEC.05` | Technische Kontrollen & Härtung | Pflicht | Konfiguration von Eingabevalidierung, Rollentrennung, SQL-Injection-Schutz (PreparedStatement). | ISO 27001 A.8.2 / A.8.25 |
| `SEC.06` | Logging & Audit-Trails | Pflicht | Fachliches Protokollmodell (`statusprotokoll`) für alle Statuswechsel mit Zeitstempel & User-ID. | ISO 27001 A.8.15 |
| `SEC.07` | Verifikation & Testergebnisse | Pflicht | Automatisierte Integrationstests (`DatabaseTest.java`) und Nachweis der 100%igen Erfolgsquote. | ISO 27001 A.8.25 / A.8.29 |
| `SEC.08` | Review & Aufbewahrung | Optional | Zyklen für Sicherheitsreviews (jährlich/nach Change) und Löschfristen für Bestelldaten. | ISO 27001 Cl. 9.3 / Cl. 10.1 |

---

## 3. JSON-Schema zur inhaltlichen Validierung

Das folgende Schema (JSON Schema Draft-07) schränkt die Datenstruktur für automatisierte Compliance-Prüfungen des ISMS-Dokuments strikt ein:

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "SmartRestaurant_ISMS_Document",
  "type": "object",
  "required": [
    "doc_id",
    "title",
    "version",
    "owner",
    "scope",
    "last_review_date",
    "controls",
    "risks"
  ],
  "properties": {
    "doc_id": { "type": "string", "pattern": "^DOC\\.ISMS\\.[A-Z0-9_]+\\.[A-Z0-9_.]+$" },
    "title": { "type": "string" },
    "version": { "type": "string" },
    "last_review_date": { "type": "string", "format": "date" },
    "owner": {
      "type": "object",
      "required": ["name", "role", "contact"],
      "properties": {
        "name": { "type": "string" },
        "role": { "type": "string" },
        "contact": { "type": "string" }
      }
    },
    "scope": { "type": "string" },
    "risks": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "description", "level", "assessment_date"],
        "properties": {
          "id": { "type": "string" },
          "description": { "type": "string" },
          "level": { "type": "string", "enum": ["low", "medium", "high"] },
          "assessment_date": { "type": "string", "format": "date" }
        }
      }
    },
    "controls": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["id", "description", "implementation", "annex_a", "verification"],
        "properties": {
          "id": { "type": "string" },
          "description": { "type": "string" },
          "implementation": { "type": "string" },
          "annex_a": { "type": "string" },
          "verification": {
            "type": "object",
            "required": ["procedure", "expected_evidence"],
            "properties": {
              "procedure": { "type": "string" },
              "expected_evidence": { "type": "string" }
            }
          }
        }
      }
    }
  }
}
```

---

## 4. Mapping-Tabelle (Inhaltsfeld ↔ Annex-A-Control ↔ Audit-Frage)

| Field-ID | Bezeichnung | Pflicht? | Beschreibung (Mindestinhalt) | Audit-Frage | Erwartete Evidenz | Mapping Annex A (2022) |
|---|---|---|---|---|---|---|
| `FIELD.01` | Systemgrenzen | Ja | Exakte Abgrenzung von Java-Backend, Datenbank und UIs. | Ist der Geltungsbereich des Systems klar definiert? | `SEC.01` / `gesamtkonzept.md` | A.5.1 |
| `FIELD.02` | Rollenschema | Ja | Spezifikation der Rollen Service, Küche, Admin. | Werden Zugriffsrechte nach dem Least-Privilege-Prinzip vergeben? | `Mitarbeiter.java` / `rolle`-Tabelle | A.5.2 / A.8.2 |
| `FIELD.03` | Asset-Katalog | Ja | Inventarisierung der Datenklassen (Mitarbeiter, Artikel, Tische, Bestellungen). | Werden alle Informationswerte inventarisiert und klassifiziert? | `docs/13-datenbank-schema.sql` | A.5.9 / A.5.10 |
| `FIELD.04` | SQL-Injection-Schutz | Ja | Ausschließliche Nutzung von `PreparedStatement` im DAO. | Ist der Datentransfer vor Manipulation geschützt? | `DatabaseManager.java` (PreparedStatement) | A.8.25 / A.8.28 |
| `FIELD.05` | Audit-Protokoll | Ja | Aufzeichnung jeder Statusänderung mit Zeitstempel & Mitarbeiter. | Werden alle sicherheits- und prozessrelevanten Aktionen geloggt? | `statusprotokoll`-Tabelle | A.8.15 |
| `FIELD.06` | Testnachweis | Ja | Automatisierte Testausführung ohne Fehlschläge. | Werden Änderungen vor dem Deployment automatisiert getestet? | `DatabaseTest.java` Protokoll | A.8.29 |

---

## 5. Audit-Checkliste

| Prüffrage-ID | Prüffrage | Erwartete Evidenz | Akzeptanzkriterium | Verantwortlicher |
|---|---|---|---|---|
| `AUD.01` | Werden alle SQL-Abfragen frei von String-Konkatenationen ausgeführt? | Quellcode-Review `DatabaseManager.java` | 100 % der dynamischen SQL-Queries nutzen `PreparedStatement` mit `-Parameters`. | Lead Developer |
| `AUD.02` | Existiert ein fachlicher Audit-Trail für Bestellstatusänderungen? | Datenbank-Dump `smart_restaurant_dump.sql` | Tabelle `statusprotokoll` enthält Einträge für jeden Statuswechsel. | Database Admin |
| `AUD.03` | Sind alle Abhängigkeiten lückenlos inventarisiert und lizenzkonform? | `package-lock.json` & `lizenzdokumentation.md` | Ausschließlich freie Open-Source-Lizenzen (MIT/ISC/Apache-2.0). | Compliance Officer |
| `AUD.04` | Funktioniert der automatisierte Testlauf fehlerfrei? | Testergebnis-Protokoll `DatabaseTest.java` | Konsolenausgabe zeigt `ALLE AUTOMATISIERTEN TESTS ERFOLGREICH BESTANDEN!`. | QA Specialist |

---

## 6. Traceability-Konventionen & Beispiel

Jede Kontrolle und Anforderung wird über ein eindeutiges Schema verlinkt:

- **Anforderung:** `A-13` (Protokollierung jeder Statusänderung)
- **Modellierungs-ID:** `UML.SEQ.10` / `UML.SEQ.11`
- **Quellcode-Referenz:** [`src/com/smartrestaurant/DatabaseManager.java#L115`](file:///c:/Users/JohannesKirk/.cursor/plans/Projektarbeit/src/com/smartrestaurant/DatabaseManager.java)
- **Datenbank-Tabelle:** `smart_restaurant.statusprotokoll`
- **Annex-A-Control:** `ISO27001:2022 A.8.15`
- **Audit-Prüffrage:** `AUD.02`

---

## 7. Definition of Done (DoD) & Next Steps

### Definition of Done:
- [x] Inhaltsstruktur vollständig aufgebaut und nach ISO 27001:2022 gemappt.
- [x] JSON-Schema zur automatischen Validierung definiert.
- [x] Mapping-Tabelle und Audit-Checkliste vollständig erstellt.
- [x] Code- und Datenbankevidenzen in `src/` und `.sql` nachgewiesen.

### Priorisierte Next Steps:
1. **Passwort-Hashing etablieren:** Implementierung von BCrypt/Argon2 für Mitarbeiterpasswörter im `DatabaseManager`.
2. **HTTPS/TLS-Verschlüsselung:** Einbindung von SSLContext im eingebetteten `WebServer` für verschlüsselte HTTPS-Kommunikation.
