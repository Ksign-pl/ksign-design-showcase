// Renderuje strony e-booka (HTML, strony 1080 × 1350 px) do PNG (każda strona osobno) i PDF.
// Użycie: node ebook/chatgpt-ads/render.mjs [plik.html] [katalog-wyjściowy]
//   domyślnie: src/ebook.html → export/ebook (39 × PNG + ebook.pdf)
// Atrybuty <body> zmieniają tryb: data-pdf="nie" (tylko PNG), data-fonty="nie" albo lista krojów,
// data-tlo="przezroczyste" (PNG z kanałem alfa) – używa ich src/mockup.html.
// Wymaga Playwright: `npm i` w repo (@playwright/test) albo globalnie `playwright`.
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
const input = path.resolve(process.argv[2] ?? path.join(here, "src/ebook.html"));
const name = path.basename(input, ".html");
const outDir = path.resolve(process.argv[3] ?? path.join(here, "export", name));

const browser = await loadChromium().launch();
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  const offline = [];
  const bledy = [];
  page.on("pageerror", (e) => bledy.push(e.message));
  // Wszystko jest lokalne (fonty, grafiki) – blokujemy sieć, żeby render był powtarzalny.
  await page.route(/^https?:/, (route) => {
    offline.push(route.request().url());
    return route.abort();
  });
  await page.goto(pathToFileURL(input).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  const tryb = await page.evaluate(() => {
    const fonty = document.body.dataset.fonty;
    return {
      pdf: document.body.dataset.pdf !== "nie",
      // data-fonty="nie" – bez kontroli; lista po przecinku – tylko te kroje; brak – komplet e-booka.
      fonty:
        fonty === "nie"
          ? []
          : fonty
            ? fonty.split(",").map((f) => f.trim())
            : ["Anton", "Inter Tight", "JetBrains Mono"],
      przezroczyste: document.body.dataset.tlo === "przezroczyste",
    };
  });

  const missing = await page.evaluate(
    (families) =>
      families.filter(
        (family) =>
          ![...document.fonts].some(
            (f) => f.family.replace(/"/g, "") === family && f.status === "loaded",
          ),
      ),
    tryb.fonty,
  );
  if (missing.length) throw new Error(`Nie załadowano fontów: ${missing.join(", ")}`);
  if (offline.length) console.warn(`Zablokowane zasoby sieciowe: ${offline.join(", ")}`);
  if (bledy.length) throw new Error(`Błędy skryptów na stronie: ${bledy.join("; ")}`);
  const puste = await page.evaluate(
    () => document.querySelectorAll("[data-str]:empty, .pnum:empty").length,
  );
  if (puste) throw new Error(`Puste numery stron lub odsyłacze: ${puste}`);

  await fs.mkdir(outDir, { recursive: true });
  const pages = await page.$$(".page");
  for (const [i, el] of pages.entries()) {
    // Plik: numer strony + nazwa (data-name), np. 28-kalkulator.png – kolejność zgodna z PDF.
    const nazwa = await el.getAttribute("data-name");
    const nr = String(i + 1).padStart(2, "0");
    const id = pages.length > 1 && nazwa ? `${nr}-${nazwa}` : (nazwa ?? nr);
    // Chromium czasem robi zrzut, zanim dorysuje fragment strony (widać wtedy prostokąt tła).
    // Zapisujemy dopiero dwa identyczne zrzuty z rzędu.
    await el.scrollIntoViewIfNeeded();
    let poprzedni = null;
    let zrzut = null;
    for (let proba = 0; proba < 6; proba++) {
      await page.evaluate(
        () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))),
      );
      zrzut = await el.screenshot({ omitBackground: tryb.przezroczyste });
      if (poprzedni && zrzut.equals(poprzedni)) break;
      poprzedni = zrzut;
      if (proba === 5) throw new Error(`Niestabilny zrzut strony ${id}`);
    }
    await fs.writeFile(path.join(outDir, `${id}.png`), zrzut);
  }
  if (tryb.pdf) {
    await page.pdf({
      path: path.join(outDir, `${name}.pdf`),
      width: "1080px",
      height: "1350px",
      printBackground: true,
      preferCSSPageSize: true,
    });
  }
  console.log(`OK: ${pages.length} str. → ${path.relative(process.cwd(), outDir)}`);
} finally {
  await browser.close();
}
