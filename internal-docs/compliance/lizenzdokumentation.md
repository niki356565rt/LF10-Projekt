# Lizenzdokumentation

## Einleitung

Diese Dokumentation erfasst die im Repository nachweisbaren Open-Source- und Werkzeuglizenzen. Primärquelle für npm ist `package-lock.json` (LockfileVersion 3). Zusätzliche lokale Werkzeuge, die gitignored sind, werden als Betriebsannahme geführt, nicht als Lieferbestandteil des Git-Stands.

## Geltungsbereich

Gilt für direkte und transitive npm-Pakete der Dependency `docx@9.7.1`, für die Repository-Lizenzangabe in `package.json` (`ISC`) und für bekannte lokale Render-Werkzeuge. Gilt nicht für Chrome, das JDK oder das Betriebssystem; diese sind Ausführungsumgebung, nicht Projektdependencies.

## Begriffe und Definitionen

| Begriff | Definition |
|---|---|
| Direkte Abhängigkeit | In `package.json` unter `dependencies` genannt. |
| Transitiv | Nur über das Lockfile bezogen. |
| Copyleft-Risiko | Pflicht zur Offenlegung abgeleiteter Werke bei bestimmter Nutzung. |
| Freigabestatus | `freigegeben`, `bedingt`, `ungeprüft`. |

## Verantwortlichkeiten

| Tätigkeit | Projektleitung | Entwicklung | Auftraggeber | Compliance-Rolle |
|---|---|---|---|---|
| Abhängigkeit hinzufügen | A | R | I | C |
| Lizenz prüfen | A | R | I | C |
| Freigabe dokumentieren | A | C | I | R |
| `npm audit` / Lockfile pflegen | A | R | I | I |

## Detailbeschreibung

### Direkte Abhängigkeit

| Paket | Version (Lock) | Lizenz | Pflichten | Risiko | Freigabe |
|---|---|---|---|---|---|
| docx | 9.7.1 | MIT | Copyright-Hinweis beibehalten bei Weitergabe des Pakets | niedrig | freigegeben für lokale DOCX-Erzeugung (`tools/build-ideologien-docx.js`) |

Das Projektrepository selbst deklariert in `package.json` die Lizenz **ISC**. Ob der GitHub-Remote denselben Text im LICENSE-File führt, ist im Workspace nicht als LICENSE-Datei nachgewiesen (klärungsbedürftig).

### Ausgewählte transitive Pakete (aus `package-lock.json`)

| Paket | Lizenz im Lockfile | Hinweis |
|---|---|---|
| @types/node 25.9.5 | MIT | Typen, Laufzeit unkritisch |
| hash.js 1.1.7 | MIT | Transitiv über docx |
| nanoid | MIT | Transitiv über docx |
| xml / xml-js | MIT | Transitiv über docx |
| inherits | ISC | Transitiv |
| jszip 3.10.1 | MIT OR GPL-3.0-or-later | **Dual license.** Dieses Projekt nutzt JSZip ausschließlich als transitive Abhängigkeit von `docx` zur Erzeugung von Office-Open-XML. Es wird der **MIT-Pfad** in Anspruch genommen. Keine Modifikation von JSZip-Quellen im Repository. |
| pako | MIT AND Zlib | Kompression transitiv über jszip |
| lie | MIT | Transitiv über jszip |
| readable-stream / string_decoder / util-deprecate / safe-buffer / setimmediate | MIT | Transitiv |
| xmlbuilder / sax-ähnliche Hilfen soweit im Lockfile MIT | MIT | Transitiv |
| undici-types | MIT | Transitiv über @types/node |
| minimalistic-assert | ISC | Transitiv über hash.js |
| core-util-is, isarray, immediate, process-nextick-args | MIT | Transitiv |
| lie / inherited stack | siehe Lockfile | Bei jedem `npm update` neu prüfen |
| sax 1.6.1 | BlueOak-1.0.0 | Permissive Lizenz; transitiv über xml-js; freigegeben |

### Lokale, nicht versionierte Werkzeuge

| Werkzeug | Nachweis | Lizenz (Annahme) | Status |
|---|---|---|---|
| tools/plantuml.jar | `.gitignore`; lokale Datei ~22 MB laut Kommentar | PlantUML üblicherweise GPL/Lizenzhinweis im JAR | **nicht im Git.** Nur lokale Diagrammerzeugung. Weitergabe des JAR mit dem Projekt ist nicht vorgesehen. |
| Google Chrome Headless | PDF-Druck der SVGs | Proprietär (Google) | Ausführungsumgebung, keine Distribution |

### Pruefprozess

1. `package.json` / Lockfile lesen.
2. Feld `license` je Paket dokumentieren.
3. Dual licenses: Nutzungsart festlegen (hier MIT für JSZip).
4. Copyleft-JARs nicht ins Git und nicht in Abgaben packen, sofern nicht rechtlich geprüft.
5. Freigabe durch Compliance-Rolle oder ersatzweise Projektleitung.

## Nachweise und Artefakte

- `package.json`, `package-lock.json`
- Erzeugerskript `tools/build-ideologien-docx.js`
- `.gitignore` (Ausschluss `tools/plantuml.jar`, `node_modules/`, `out/`)

## Risiken und Kontrollen

| Risiko | Auswirkung | Eintrittswahrscheinlichkeit | Maßnahme | Kontrolle | Nachweis |
|---|---|---|---|---|---|
| JSZip unter GPL interpretiert | Copyleft auf Abgaben | niedrig | MIT-Pfad dokumentieren, JSZip nicht forken | Lizenzreview | diese Tabelle |
| PlantUML-JAR wird committed | Lizenz- und Binärballast | mittel | gitignore | `git status` vor Commit | `.gitignore` |
| Ungeprüfte neue npm-Pakete | Unbekannte Pflichten | mittel | Kein `npm i` ohne Lockfile-Diff-Review | Diff `package-lock.json` | Changelog |

## Pflegeprozess

Jede Änderung an `package.json` oder am Lockfile aktualisiert diese Liste. Pakete ohne `license`-Feld im Lockfile werden als `ungeprüft` geführt, bis die Quelle (Registry/`LICENSE` im tarball) nachgezogen ist.

## Revisionshistorie

| Datum | Autor/Rolle | Änderung | Anlass |
|---|---|---|---|
| 24.08.2026 | Entwicklung | Auswertung `package-lock.json` für docx 9.7.1 und Transitive | Aufbau `/internal-docs` |
