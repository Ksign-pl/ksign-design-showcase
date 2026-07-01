import { test, expect, type Request } from "@playwright/test";

/**
 * E2E: Google Ads tag (AW-18158941733) detection + consent gating.
 *
 * Verifies:
 *  1. Base gtag.js script for AW-18158941733 is injected on load (so the
 *     Google "Test connection" crawler can detect the tag) — even before
 *     consent.
 *  2. Before consent: no conversion / remarketing requests fire to
 *     google.com/ccm/collect or googleadservices.com.
 *  3. After "Akceptuję wszystkie": Consent Mode flips ad_storage=granted
 *     and conversion/collect requests for AW-18158941733 are observed.
 */

const ADS_ID = "AW-18158941733";
const GTAG_SRC_RE = new RegExp(
  `googletagmanager\\.com/gtag/js\\?id=${ADS_ID.replace(/[-]/g, "\\$&")}`,
);
// Google Ads conversion/remarketing endpoints carry the tag id either in the
// path (rmkt/collect/<id>) or in the tids/tid query param (ccm/collect).
const ADS_COLLECT_RE = new RegExp(
  `(google\\.com/(ccm|pagead|rmkt)/collect|googleadservices\\.com).*${ADS_ID}`,
);

function trackAdsRequests(page: import("@playwright/test").Page): {
  list: Request[];
  matches: () => Request[];
} {
  const list: Request[] = [];
  page.on("request", (req) => {
    const u = req.url();
    if (ADS_COLLECT_RE.test(u) || (u.includes(ADS_ID) && /collect|conversion/.test(u))) {
      list.push(req);
    }
  });
  return { list, matches: () => list };
}

test.describe("Google Ads tag — detection & consent gating", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("base gtag.js for AW-18158941733 is present on initial load (pre-consent)", async ({
    page,
  }) => {
    await page.goto("/");
    await page.waitForSelector('[role="dialog"][aria-labelledby="cookie-banner-title"]');

    // Script tag injected by loadGoogleAds()
    const adsScript = page.locator("#google-ads-script");
    await expect(adsScript).toHaveCount(1);
    const src = await adsScript.getAttribute("src");
    expect(src).toMatch(GTAG_SRC_RE);

    // window.gtag must exist (Consent Mode initialized).
    const hasGtag = await page.evaluate(() => typeof (window as any).gtag === "function");
    expect(hasGtag).toBe(true);

    // Default consent state is denied for ad_storage.
    const denied = await page.evaluate(() => {
      // dataLayer entries are arguments-like objects pushed by gtag().
      const dl = ((window as any).dataLayer ?? []) as IArguments[];
      const consents = dl
        .map((a) => Array.from(a as unknown as ArrayLike<unknown>))
        .filter((arr) => arr[0] === "consent" && arr[1] === "default");
      return consents.length > 0 && (consents[0][2] as any)?.ad_storage === "denied";
    });
    expect(denied).toBe(true);
  });

  test("no Ads collect/conversion requests fire before consent", async ({ page }) => {
    const tracker = trackAdsRequests(page);
    await page.goto("/");
    await page.waitForSelector('[role="dialog"][aria-labelledby="cookie-banner-title"]');
    // Give gtag.js time to load; if it were going to fire a hit, it would by now.
    await page.waitForTimeout(2000);

    expect(
      tracker.matches().map((r) => r.url()),
      "no Google Ads collect/conversion hits should fire pre-consent",
    ).toEqual([]);
  });

  test("after Akceptuję wszystkie: Ads requests are sent with AW id", async ({ page }) => {
    const tracker = trackAdsRequests(page);
    await page.goto("/");

    // Sanity: nothing fired yet.
    await page.waitForSelector('[role="dialog"][aria-labelledby="cookie-banner-title"]');
    expect(tracker.matches().length).toBe(0);

    await page.getByRole("button", { name: "Akceptuję wszystkie" }).first().click();

    // Wait for at least one Ads collect/conversion request carrying the tag id.
    await page
      .waitForRequest(
        (req) => {
          const u = req.url();
          return (
            (ADS_COLLECT_RE.test(u) || u.includes(ADS_ID)) && /collect|conversion|rmkt|ccm/.test(u)
          );
        },
        { timeout: 10_000 },
      )
      .catch(() => null);

    const hits = tracker.matches();
    expect(
      hits.length,
      "expected at least one Ads collect/conversion hit after consent",
    ).toBeGreaterThan(0);
    expect(hits.some((r) => r.url().includes(ADS_ID))).toBe(true);

    // Consent Mode should now report ad_storage=granted.
    const granted = await page.evaluate(() => {
      const dl = ((window as any).dataLayer ?? []) as IArguments[];
      const updates = dl
        .map((a) => Array.from(a as unknown as ArrayLike<unknown>))
        .filter((arr) => arr[0] === "consent" && arr[1] === "update");
      const last = updates[updates.length - 1];
      return last && (last[2] as any)?.ad_storage === "granted";
    });
    expect(granted).toBe(true);
  });
});
