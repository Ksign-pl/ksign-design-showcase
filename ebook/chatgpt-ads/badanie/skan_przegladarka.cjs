// Drugie przejście badania: domeny, które odrzuciły prosty skaner (403/429/błąd), otwieramy
// w zwykłym Chromium (bez udawania botów OpenAI). Zapisujemy status, HTML strony głównej,
// adresy zapytań sieciowych i treść robots.txt → przegladarka.json.
// Użycie: node skan_przegladarka.cjs domena1 domena2 ...
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

const UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36";

async function visit(context, domain) {
  const page = await context.newPage();
  const requests = [];
  page.on("request", (r) => requests.push(r.url()));
  const out = { domena: domain };
  try {
    const res = await page.goto(`https://${domain}/`, {
      waitUntil: "domcontentloaded",
      timeout: 30000,
    });
    await page.waitForTimeout(4000);
    out.status = res ? res.status() : null;
    out.adres_koncowy = page.url();
    out.html = (await page.content()).slice(0, 3000000);
  } catch (e) {
    out.status = null;
    out.blad = e.message.split("\n")[0];
  }
  out.zapytania = requests.filter((u) => /openai|googletagmanager|facebook/.test(u));
  try {
    const rb = await page.goto(`https://${domain}/robots.txt`, {
      waitUntil: "domcontentloaded",
      timeout: 20000,
    });
    out.robots_status = rb ? rb.status() : null;
    out.robots = rb ? await rb.text() : "";
  } catch (e) {
    out.robots_status = null;
    out.robots = "";
  }
  await page.close();
  return out;
}

(async () => {
  const domains = process.argv.slice(2);
  const browser = await chromium.launch();
  const context = await browser.newContext({
    userAgent: UA,
    locale: "pl-PL",
    viewport: { width: 1366, height: 900 },
  });
  const results = [];
  const queue = [...domains];
  async function worker() {
    while (queue.length) {
      const d = queue.shift();
      results.push(await visit(context, d));
      process.stderr.write(`${d} `);
    }
  }
  await Promise.all(Array.from({ length: 4 }, worker));
  await browser.close();
  fs.writeFileSync(path.join(__dirname, "przegladarka.json"), JSON.stringify(results));
  process.stderr.write(`\nOK: ${results.length}\n`);
})();
