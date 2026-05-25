// Lighthouse CI config for staging.ksign.pl.
//
// Mirrors .lighthouserc.staging.json but is a JS module so we can inject
// HTTP Basic Auth credentials from env vars at runtime — needed when the
// staging environment is gated and not publicly reachable.
//
// Set in GitHub Actions repo secrets (or your shell):
//   STAGING_BASIC_AUTH_USER
//   STAGING_BASIC_AUTH_PASS
//
// When both are present, an `Authorization: Basic …` header is attached to
// every Lighthouse request. When absent, the audit runs without auth (same
// behaviour as the JSON config).

const user = process.env.STAGING_BASIC_AUTH_USER;
const pass = process.env.STAGING_BASIC_AUTH_PASS;

const extraHeaders = {};
if (user && pass) {
  const token = Buffer.from(`${user}:${pass}`).toString("base64");
  extraHeaders.Authorization = `Basic ${token}`;
}

module.exports = {
  ci: {
    collect: {
      url: [
        "https://staging.ksign.pl/",
        "https://staging.ksign.pl/pakiety",
        "https://staging.ksign.pl/blog",
      ],
      numberOfRuns: 3,
      settings: {
        preset: "desktop",
        emulatedFormFactor: "mobile",
        throttlingMethod: "simulate",
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        screenEmulation: {
          mobile: true,
          width: 412,
          height: 823,
          deviceScaleFactor: 1.75,
          disabled: false,
        },
        formFactor: "mobile",
        onlyCategories: ["performance"],
        skipAudits: ["uses-http2"],
        extraHeaders,
      },
    },
    assert: {
      assertions: {
        "categories:performance": ["warn", { minScore: 0.85 }],
        "largest-contentful-paint": ["warn", { maxNumericValue: 2500 }],
        "total-blocking-time": ["warn", { maxNumericValue: 200 }],
        interactive: ["warn", { maxNumericValue: 3800 }],
        "cumulative-layout-shift": ["warn", { maxNumericValue: 0.1 }],
        "first-contentful-paint": ["warn", { maxNumericValue: 1800 }],
        "speed-index": ["warn", { maxNumericValue: 3400 }],
      },
    },
    upload: {
      target: "temporary-public-storage",
    },
  },
};
