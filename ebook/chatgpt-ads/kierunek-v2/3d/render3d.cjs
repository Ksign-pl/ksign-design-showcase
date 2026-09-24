const { chromium } = require("playwright");
(async () => {
  const [, , file, out, w, h, dpr] = process.argv;
  const browser = await chromium.launch({
    args: [
      "--use-gl=angle",
      "--use-angle=swiftshader",
      "--enable-unsafe-swiftshader",
      "--allow-file-access-from-files",
    ],
  });
  const page = await browser.newPage({
    viewport: { width: +w || 1080, height: +h || 1350 },
    deviceScaleFactor: +dpr || 1,
  });
  page.on("console", (m) => console.log("console:", m.text()));
  page.on("pageerror", (e) => console.log("pageerror:", e.message));
  await page.goto("file://" + require("path").resolve(file));
  await page.waitForFunction(() => window.__done === true, null, { timeout: 300000 });
  await page.screenshot({ path: out });
  await browser.close();
})();
