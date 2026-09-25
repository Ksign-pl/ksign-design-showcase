// Wyciąga tekst ze złożonych stron (src/ebook.html) do Markdown: manuskrypt/tekst-v1.0.md.
// To tekst 1:1 ze składem – do korekty, akceptacji i ponownego użycia (landing, posty).
// Użycie: node ebook/rabat-zjada-zysk/zloz.mjs && node ebook/rabat-zjada-zysk/tekst.mjs
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
const input = path.join(here, "src/ebook.html");
const output = path.join(here, "manuskrypt/tekst-v1.0.md");

const browser = await loadChromium().launch();
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  await page.route(/^https?:/, (route) => route.abort());
  await page.goto(pathToFileURL(input).href, { waitUntil: "load" });

  const pages = await page.evaluate(() =>
    [...document.querySelectorAll(".page")].map((el, i) => {
      const clone = el.cloneNode(true);
      // Stopka powtarza się na każdej stronie – pomijamy ją.
      clone.querySelectorAll(".foot, .cover__foot").forEach((n) => n.remove());
      document.body.appendChild(clone);
      const text = clone.innerText;
      clone.remove();
      return { nr: i + 1, name: el.dataset.name ?? "", text };
    }),
  );

  // Każdy wiersz składu jako osobny akapit – czytelne i w surowym pliku, i na GitHubie.
  const clean = (s) =>
    s
      .replace(/⁠/g, "")
      .replace(/ /g, " ")
      .replace(/\t+/g, " · ")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .join("\n\n");

  const md = [
    "# RABAT ZJADA ZYSK – tekst finalny v1.0 (1:1 ze składem)",
    "",
    "> Plik generowany z `src/ebook.html` przez `tekst.mjs` – nie edytuj ręcznie.",
    "> Zmiany treści wprowadzaj w `src/strony/*.html`, potem: `node zloz.mjs && node tekst.mjs`.",
    "> Źródła i notatki redakcyjne: `rozdzialy-01-03.md`, `rozdzialy-04-08.md`.",
    "",
    ...pages.flatMap(({ nr, name, text }) => [
      "---",
      "",
      `## Str. ${nr} · \`${name}\``,
      "",
      clean(text),
      "",
    ]),
  ].join("\n");

  await fs.writeFile(output, md);
  console.log(`OK: ${pages.length} str. → ${path.relative(process.cwd(), output)}`);
} finally {
  await browser.close();
}
