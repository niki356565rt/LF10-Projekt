const fs = require("fs");
const path = require("path");

const [svgPath, htmlPath, title] = process.argv.slice(2);
const svg = fs.readFileSync(svgPath, "utf8");

const vb = svg.match(/viewBox="0 0 ([\d.]+) ([\d.]+)"/);
if (!vb) throw new Error("viewBox nicht gefunden in " + svgPath);
const wPx = parseFloat(vb[1]);
const hPx = parseFloat(vb[2]);

// A4 Hochformat mit 10 mm Rand; das Diagramm wird proportional eingepasst.
const pageW = 210, pageH = 297, margin = 10;
const availW = pageW - 2 * margin;
const availH = pageH - 2 * margin - 8; // 8 mm fuer die Titelzeile
const mmPerPx = 25.4 / 96;
const scale = Math.min(availW / (wPx * mmPerPx), availH / (hPx * mmPerPx));

const drawW = (wPx * mmPerPx * scale).toFixed(2);
const drawH = (hPx * mmPerPx * scale).toFixed(2);

const cleanSvg = svg
  .replace(/\swidth="[^"]*"/, "")
  .replace(/\sheight="[^"]*"/, "")
  .replace(/\sstyle="width:[^"]*"/, "")
  .replace("<svg", `<svg width="${drawW}mm" height="${drawH}mm"`);

const html = `<!DOCTYPE html>
<html lang="de">
<head>
<meta charset="utf-8">
<title>${title}</title>
<style>
  @page { size: ${pageW}mm ${pageH}mm; margin: ${margin}mm; }
  html, body { margin: 0; padding: 0; background: #fff; }
  body { font-family: Arial, Helvetica, sans-serif; }
  h1 { font-size: 10pt; font-weight: 600; margin: 0 0 3mm; }
  .diagram { width: ${drawW}mm; height: ${drawH}mm; }
</style>
</head>
<body>
<h1>${title}</h1>
<div class="diagram">${cleanSvg}</div>
</body>
</html>
`;

fs.writeFileSync(htmlPath, html, "utf8");
console.log(`${path.basename(htmlPath)}: ${wPx}x${hPx}px -> ${drawW}x${drawH}mm (Faktor ${scale.toFixed(3)})`);
