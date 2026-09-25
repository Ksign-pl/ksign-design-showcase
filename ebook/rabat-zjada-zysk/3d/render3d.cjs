// Renderuje scenę 3D do PNG: node render3d.cjs <scena.html|nazwa-sceny> <wyjście.png> [szer] [wys] [skala]
// SZYBKO=1 – podgląd: płótno bez nadpróbkowania i mniejsze mapy cieni (kompozycja w kilka sekund).
// Nazwę sceny (np. 08-lupa) uruchamia przez scena.html?s=08-lupa. Obraz bierze prosto z płótna WebGL
// (szybciej niż zrzut ekranu przy dużych rozdzielczościach) i skaluje do szer × skala na wys × skala.
const { chromium } = require("playwright");
const fs = require("fs");
const path = require("path");

(async () => {
  const [, , wejscie, wyjscie, w = "1080", h = "1350", dpr = "1"] = process.argv;
  const url = wejscie.endsWith(".html")
    ? "file://" + path.resolve(wejscie)
    : "file://" +
      path.resolve(__dirname, "scena.html") +
      "?s=" +
      encodeURIComponent(wejscie) +
      (process.env.SZYBKO ? "&szybko=1" : "");
  const browser = await chromium.launch({
    args: [
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--allow-file-access-from-files",
    ],
  });
  try {
    const page = await browser.newPage({
      viewport: { width: +w, height: +h },
      deviceScaleFactor: +dpr,
    });
    page.on("console", (m) => console.log("console:", m.text()));
    page.on("pageerror", (e) => console.log("pageerror:", e.message));
    await page.goto(url);
    await page.waitForFunction(() => window.__done === true, null, { timeout: 480000 });
    const dane = await page.evaluate(
      ([szer, wys]) => {
        const zrodlo = document.querySelector("canvas");
        const cel = document.createElement("canvas");
        cel.width = szer;
        cel.height = wys;
        const ctx = cel.getContext("2d");
        ctx.imageSmoothingEnabled = true;
        ctx.imageSmoothingQuality = "high";
        ctx.drawImage(zrodlo, 0, 0, szer, wys);
        return cel.toDataURL("image/png");
      },
      [+w * +dpr, +h * +dpr],
    );
    fs.writeFileSync(wyjscie, Buffer.from(dane.split(",")[1], "base64"));
  } finally {
    await browser.close();
  }
})();
