// Składa e-book: wkleja strony z src/strony/*.html (w kolejności nazw) do src/szablon.html → src/ebook.html.
// Użycie: node ebook/rabat-zjada-zysk/zloz.mjs && node ebook/rabat-zjada-zysk/render.mjs src/ebook.html export/ebook
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dir = path.join(here, "src/strony");
const files = (await fs.readdir(dir)).filter((f) => f.endsWith(".html")).sort();
const pages = await Promise.all(files.map((f) => fs.readFile(path.join(dir, f), "utf8")));
const template = await fs.readFile(path.join(here, "src/szablon.html"), "utf8");
const html = template.replace("<!-- STRONY -->", pages.join("\n"));
await fs.writeFile(path.join(here, "src/ebook.html"), html);
console.log(`OK: ${files.length} plików stron → src/ebook.html`);
