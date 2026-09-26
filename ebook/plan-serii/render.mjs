// Renderuje src/raport.html do PDF (A4, z zakładkami) i opcjonalnie zapisuje podglądy stron w PNG.
// Użycie: node ebook/plan-serii/render.mjs [--png katalog]
// Przerywa pracę, jeśli brakuje fontu, strona zgłosi błąd albo treść wyjdzie poza ramkę.
import { createRequire } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";
import fs from "node:fs/promises";
import path from "node:path";

const require = createRequire(import.meta.url);

function loadChromium() {
  for (const name of ["@playwright/test", "playwright"]) {
    try {
      return require(name).chromium;
    } catch {
      // próbujemy kolejnego pakietu
    }
  }
  throw new Error("Nie znaleziono Playwright. Uruchom `npm install` w katalogu repo.");
}

const here = path.dirname(fileURLToPath(import.meta.url));
const input = path.join(here, "src/raport.html");
const output = path.join(here, "export/raport-100-tematow-ebookow.pdf");
const pngArg = process.argv.indexOf("--png");
const pngDir = pngArg > 0 ? path.resolve(process.argv[pngArg + 1] ?? "") : null;

const browser = await loadChromium().launch();
try {
  const page = await browser.newPage({
    viewport: { width: 794, height: 1123 },
    deviceScaleFactor: 1.5,
  });
  const bledy = [];
  page.on("pageerror", (e) => bledy.push(`Błąd skryptu: ${e.message}`));
  page.on("requestfailed", (r) => bledy.push(`Nie wczytano: ${r.url()}`));
  await page.route(/^https?:/, (route) => route.abort());
  await page.goto(pathToFileURL(input).href, { waitUntil: "load" });
  await page.emulateMedia({ media: "print" });

  const brakFontow = await page.evaluate(async () => {
    const wymagane = [
      '400 12px "Work Sans"',
      'italic 400 12px "Work Sans"',
      '600 12px "Work Sans"',
      '400 12px "Instrument Serif"',
      'italic 400 12px "Instrument Serif"',
    ];
    await document.fonts.ready;
    await Promise.all(wymagane.map((f) => document.fonts.load(f, "Aąęłśżź")));
    return wymagane.filter((f) => !document.fonts.check(f, "Aąęłśżź"));
  });
  if (brakFontow.length) throw new Error(`Nie wczytano fontów: ${brakFontow.join(", ")}`);

  const problemy = await page.evaluate(() => {
    const wynik = [];
    const nazwa = (el) => el.closest(".page")?.dataset.nazwa ?? "?";
    // Ramki o stałej wysokości (strona, karta) nie mogą ucinać treści.
    for (const el of document.querySelectorAll("[data-kontrola]")) {
      if (el.scrollHeight > el.clientHeight + 1 || el.scrollWidth > el.clientWidth + 1) {
        const tytul = el.querySelector("h1, h2")?.textContent.trim() ?? "";
        wynik.push(
          `${nazwa(el)}: ${el.className} ${tytul} (${el.scrollHeight} > ${el.clientHeight})`,
        );
      }
    }
    // Bloki pozycjonowane absolutnie nie mogą na siebie nachodzić.
    for (const strona of document.querySelectorAll("[data-kolizja]")) {
      const [gora, dol] = strona.dataset.kolizja.split("|").map((s) => strona.querySelector(s));
      const a = gora.getBoundingClientRect();
      const b = dol.getBoundingClientRect();
      if (a.bottom > b.top - 4)
        wynik.push(`${nazwa(strona)}: ${gora.className} nachodzi na ${dol.className}`);
    }
    return wynik;
  });
  if (problemy.length) throw new Error(`Treść wychodzi poza ramkę:\n${problemy.join("\n")}`);
  if (bledy.length) throw new Error(bledy.join("\n"));

  await fs.mkdir(path.dirname(output), { recursive: true });
  await page.pdf({
    path: output,
    preferCSSPageSize: true,
    printBackground: true,
    outline: true,
    tagged: true,
  });

  const strony = await page.$$(".page");
  if (pngDir) {
    await fs.mkdir(pngDir, { recursive: true });
    for (const [i, strona] of strony.entries()) {
      await strona.screenshot({ path: path.join(pngDir, `${String(i + 1).padStart(2, "0")}.png`) });
    }
  }
  console.log(
    `OK: ${strony.length} stron → ${path.relative(process.cwd(), output)}${pngDir ? ` (+ PNG w ${pngDir})` : ""}`,
  );
} finally {
  await browser.close();
}
