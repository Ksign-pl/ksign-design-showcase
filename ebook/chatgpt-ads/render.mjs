// Renderuje strony e-booka (HTML, strony 1080 × 1350 px) do PNG (każda strona osobno) i PDF.
// Użycie: node ebook/chatgpt-ads/render.mjs [plik.html] [katalog-wyjściowy]
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
const input = path.resolve(process.argv[2] ?? path.join(here, "src/probka.html"));
const name = path.basename(input, ".html");
const outDir = path.resolve(process.argv[3] ?? path.join(here, "export", name));

const browser = await loadChromium().launch();
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  const offline = [];
  // Wszystko jest lokalne (fonty, grafiki) – blokujemy sieć, żeby render był powtarzalny.
  await page.route(/^https?:/, (route) => {
    offline.push(route.request().url());
    return route.abort();
  });
  await page.goto(pathToFileURL(input).href, { waitUntil: "load" });
  await page.evaluate(() => document.fonts.ready);

  const missing = await page.evaluate(() =>
    ["Anton", "Inter Tight", "JetBrains Mono"].filter(
      (family) =>
        ![...document.fonts].some(
          (f) => f.family.replace(/"/g, "") === family && f.status === "loaded",
        ),
    ),
  );
  if (missing.length) throw new Error(`Nie załadowano fontów: ${missing.join(", ")}`);
  if (offline.length) console.warn(`Zablokowane zasoby sieciowe: ${offline.join(", ")}`);

  await fs.mkdir(outDir, { recursive: true });
  const pages = await page.$$(".page");
  for (const [i, el] of pages.entries()) {
    const id = (await el.getAttribute("data-name")) ?? String(i + 1).padStart(2, "0");
    await el.screenshot({ path: path.join(outDir, `${id}.png`) });
  }
  await page.pdf({
    path: path.join(outDir, `${name}.pdf`),
    width: "1080px",
    height: "1350px",
    printBackground: true,
    preferCSSPageSize: true,
  });
  console.log(`OK: ${pages.length} str. → ${path.relative(process.cwd(), outDir)}`);
} finally {
  await browser.close();
}
