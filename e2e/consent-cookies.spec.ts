import { test, expect, type BrowserContext } from "@playwright/test";

/**
 * E2E: Consent Mode v2 cookie behaviour.
 *
 * We can't rely on real GA4 / Google Ads / Meta network calls in a local
 * preview environment, so we verify two deterministic things:
 *  1. Before consent → analytics/marketing tracking scripts are NOT injected
 *     and no analytics/marketing cookies exist.
 *  2. After "Akceptuję wszystkie" → tracking <script> tags are injected.
 *  3. When consent is withdrawn ("Tylko niezbędne") → previously-set
 *     analytics/marketing cookies are removed by applyConsent().
 *
 * For (3) we seed fake _ga / _gcl_au / _fbp cookies via document.cookie so the
 * test does not depend on Google/Meta actually setting them.
 */

const ANALYTICS_COOKIES = ["_ga", "_ga_GQT4Y20Z0B", "_gid"];
const MARKETING_COOKIES = ["_gcl_au", "_fbp"];
const TRACKING_COOKIES = [...ANALYTICS_COOKIES, ...MARKETING_COOKIES];

async function cookieNames(context: BrowserContext) {
  const cookies = await context.cookies();
  return cookies.map((c) => c.name);
}

test.describe("Consent Mode v2 — cookies", () => {
  test.beforeEach(async ({ context }) => {
    await context.clearCookies();
  });

  test("before consent: no GA/Ads/Meta scripts and no tracking cookies", async ({
    page,
    context,
  }) => {
    await page.goto("/");
    await page.waitForSelector('[role="dialog"][aria-labelledby="cookie-banner-title"]');

    // No analytics/marketing scripts in the DOM yet.
    await expect(page.locator("#ga4-script")).toHaveCount(0);
    await expect(page.locator("#google-ads-script")).toHaveCount(0);
    await expect(page.locator("#meta-pixel-script")).toHaveCount(0);

    // GTM container itself IS allowed (loads in default-denied state).
    await expect(page.locator("#gtm-script")).toHaveCount(1);

    const names = await cookieNames(context);
    for (const c of TRACKING_COOKIES) {
      expect(names, `cookie ${c} must not be set before consent`).not.toContain(c);
    }
  });

  test("after Akceptuję wszystkie: GA4 + Ads scripts get injected", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Akceptuję wszystkie" }).first().click();

    await expect(page.locator("#ga4-script")).toHaveCount(1);
    await expect(page.locator("#google-ads-script")).toHaveCount(1);

    // Consent state is persisted.
    const stored = await page.evaluate(() => localStorage.getItem("ksign_consent_v1"));
    expect(stored).not.toBeNull();
    const parsed = JSON.parse(stored!);
    expect(parsed.analytics).toBe(true);
    expect(parsed.marketing).toBe(true);
  });

  test("withdrawing consent removes seeded analytics/marketing cookies", async ({
    page,
    context,
  }) => {
    await page.goto("/");

    // Accept everything so we end up in a "consented" state.
    await page.getByRole("button", { name: "Akceptuję wszystkie" }).first().click();

    // Seed fake tracking cookies (as Google/Meta would have done) on the
    // page's own host so the deleteCookie() helper can match them.
    await page.evaluate((names) => {
      const expires = new Date(Date.now() + 86400_000).toUTCString();
      for (const n of names) {
        document.cookie = `${n}=test-value; path=/; expires=${expires}`;
      }
    }, TRACKING_COOKIES);

    let names = await cookieNames(context);
    for (const c of TRACKING_COOKIES) {
      expect(names, `seed: cookie ${c} should be present`).toContain(c);
    }

    // Open settings + reject optional → triggers applyConsent() which
    // should clear analytics + marketing cookies.
    await page.evaluate(() => {
      window.dispatchEvent(new CustomEvent("ksign:open-consent"));
    });
    await page.getByRole("button", { name: "Odrzuć opcjonalne" }).click();

    // Give the consent event handler a tick.
    await page.waitForFunction(() => {
      const raw = localStorage.getItem("ksign_consent_v1");
      if (!raw) return false;
      const c = JSON.parse(raw);
      return c.analytics === false && c.marketing === false;
    });

    names = await cookieNames(context);
    for (const c of TRACKING_COOKIES) {
      expect(names, `cookie ${c} should be cleared after withdrawal`).not.toContain(c);
    }
  });
});
