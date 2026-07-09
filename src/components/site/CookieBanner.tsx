import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getConsent, saveConsent, type ConsentState } from "@/lib/consent";

type Mode = "hidden" | "banner" | "settings";

type TestStatus = "idle" | "running" | "ok" | "blocked" | "no-tags";

type TestResult = {
  status: TestStatus;
  ga4Hits: number;
  adsHits: number;
  pixelHits: number;
  consent: { analytics: boolean; marketing: boolean };
  message: string;
};

const ENDPOINT_PATTERNS = {
  ga4: /google-analytics\.com\/(g\/collect|collect)|analytics\.google\.com\/g\/collect/,
  ads: /(google\.com\/(ccm|pagead|rmkt)\/collect|googleadservices\.com|googletagmanager\.com\/gtag\/js\?id=AW-)/,
  pixel: /facebook\.com\/tr|connect\.facebook\.net\/.*\/fbevents/,
};

async function runConnectionTest(
  consent: { analytics: boolean; marketing: boolean },
): Promise<TestResult> {
  const w = window as unknown as {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  };

  const ga4Available = typeof w.gtag === "function";
  const pixelAvailable = typeof w.fbq === "function";

  if (!ga4Available && !pixelAvailable) {
    return {
      status: "no-tags",
      ga4Hits: 0,
      adsHits: 0,
      pixelHits: 0,
      consent,
      message: "Brak załadowanych skryptów (gtag/fbq).",
    };
  }

  const startedAt = performance.now();
  let ga4Hits = 0;
  let adsHits = 0;
  let pixelHits = 0;

  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.startTime < startedAt) continue;
      const url = entry.name;
      if (ENDPOINT_PATTERNS.ga4.test(url)) ga4Hits++;
      else if (ENDPOINT_PATTERNS.ads.test(url) && url.includes("collect")) adsHits++;
      else if (ENDPOINT_PATTERNS.pixel.test(url) && url.includes("/tr")) pixelHits++;
    }
  });
  try {
    observer.observe({ type: "resource", buffered: false });
  } catch {
    // Older browsers
  }

  // Fire test events
  try {
    w.gtag?.("event", "ksign_consent_test", {
      event_category: "diagnostics",
      event_label: `analytics=${consent.analytics};marketing=${consent.marketing}`,
      non_interaction: true,
    });
  } catch { /* noop */ }
  try {
    w.fbq?.("trackCustom", "KsignConsentTest", {
      analytics: consent.analytics,
      marketing: consent.marketing,
    });
  } catch { /* noop */ }

  // Wait for network activity to settle.
  await new Promise((r) => setTimeout(r, 1500));
  observer.disconnect();

  const totalHits = ga4Hits + adsHits + pixelHits;
  const expectsAnalytics = consent.analytics;
  const expectsMarketing = consent.marketing;

  let status: TestStatus;
  let message: string;
  if (!expectsAnalytics && !expectsMarketing) {
    status = totalHits === 0 ? "blocked" : "blocked";
    message =
      totalHits === 0
        ? "Zgodnie z oczekiwaniem: zgoda cofnięta, żadne zdarzenia nie zostały wysłane."
        : `Uwaga: zgoda cofnięta, a wysłano ${totalHits} żądań — sprawdź konfigurację.`;
  } else {
    const ok =
      (!expectsAnalytics || ga4Hits > 0) &&
      (!expectsMarketing || adsHits > 0 || pixelHits > 0);
    status = ok ? "ok" : "blocked";
    message = ok
      ? "Zdarzenie testowe wysłane pomyślnie."
      : "Zdarzenie nie zostało wysłane — możliwe blokowanie przez przeglądarkę / adblock lub brak załadowanych tagów.";
  }

  return { status, ga4Hits, adsHits, pixelHits, consent, message };
}

export function CookieBanner() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [test, setTest] = useState<TestResult | null>(null);
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    const existing = getConsent();
    if (!existing) {
      setMode("banner");
    } else {
      setAnalytics(existing.analytics);
      setMarketing(existing.marketing);
    }
    const openHandler = () => {
      const c = getConsent();
      setAnalytics(c?.analytics ?? false);
      setMarketing(c?.marketing ?? false);
      setMode("settings");
    };
    window.addEventListener("ksign:open-consent", openHandler);
    return () => window.removeEventListener("ksign:open-consent", openHandler);
  }, []);

  if (mode === "hidden") return null;

  const acceptAll = () => {
    saveConsent({ analytics: true, marketing: true });
    setMode("hidden");
  };
  const rejectAll = () => {
    saveConsent({ analytics: false, marketing: false });
    setMode("hidden");
  };
  const saveSelection = () => {
    saveConsent({ analytics, marketing });
    setMode("hidden");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-banner-title"
      className="fixed inset-x-0 bottom-0 z-[100] p-3 sm:p-5 md:p-6 pointer-events-none"
    >
      <div className="pointer-events-auto mx-auto max-h-[72svh] max-w-4xl overflow-y-auto bg-ink text-cream rounded-3xl shadow-2xl border border-white/10 p-4 md:p-7">
        {mode === "banner" ? (
          <>
            <div className="flex items-start gap-3 mb-4">
              <div className="text-2xl" aria-hidden>🍪</div>
              <div>
                <h2 id="cookie-banner-title" className="text-lg md:text-xl font-black tracking-tight">
                  Szanujemy Twoją prywatność
                </h2>
                <p className="mt-2 text-sm text-cream/70 leading-relaxed">
                  Używamy plików cookies, aby strona działała poprawnie, analizować ruch i (za Twoją zgodą)
                  dopasowywać działania marketingowe. Możesz zaakceptować wszystkie, odrzucić opcjonalne lub
                  wybrać samodzielnie. Szczegóły znajdziesz w{" "}
                  <Link to="/polityka-cookies" className="underline hover:text-lime">Polityce cookies</Link>{" "}
                  i{" "}
                  <Link to="/polityka-prywatnosci" className="underline hover:text-lime">Polityce prywatności</Link>.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={rejectAll}
                className="flex-1 px-5 py-3 rounded-full border border-white/20 font-bold text-sm hover:bg-white/5 transition"
              >
                Tylko niezbędne
              </button>
              <button
                onClick={() => setMode("settings")}
                className="flex-1 px-5 py-3 rounded-full border border-white/20 font-bold text-sm hover:bg-white/5 transition"
              >
                Ustawienia
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-5 py-3 rounded-full bg-lime text-ink font-bold text-sm hover:bg-cream transition"
              >
                Akceptuję wszystkie
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 id="cookie-banner-title" className="text-lg md:text-xl font-black tracking-tight mb-4">
              Ustawienia plików cookies
            </h2>
            <div className="space-y-3 mb-5">
              <Toggle
                label="Niezbędne"
                description="Wymagane do działania strony (np. obsługa formularzy, bezpieczeństwo). Nie można ich wyłączyć."
                checked
                disabled
              />
              <Toggle
                label="Analityczne"
                description="Pozwalają nam mierzyć ruch i ulepszać stronę (Google Analytics 4)."
                checked={analytics}
                onChange={setAnalytics}
              />
              <Toggle
                label="Marketingowe"
                description="Umożliwiają personalizację reklam i pomiar skuteczności kampanii (Meta Pixel)."
                checked={marketing}
                onChange={setMarketing}
              />
            </div>

            <div className="mb-4 rounded-2xl border border-white/10 p-4">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="font-bold text-sm">Testuj połączenie</div>
                  <div className="text-xs text-cream/60 mt-1">
                    Wysyła zdarzenie testowe do GA4 / Google Ads / Meta Pixel zgodnie z aktualnymi ustawieniami zgody.
                  </div>
                </div>
                <button
                  type="button"
                  onClick={async () => {
                    setTesting(true);
                    setTest(null);
                    // Persist current selection first so the test reflects it.
                    saveConsent({ analytics, marketing });
                    // Let applyConsent() run before testing.
                    await new Promise((r) => setTimeout(r, 400));
                    const result = await runConnectionTest({ analytics, marketing });
                    setTest(result);
                    setTesting(false);
                  }}
                  disabled={testing}
                  className="shrink-0 px-4 py-2 rounded-full bg-cream text-ink font-bold text-xs hover:bg-lime transition disabled:opacity-60"
                >
                  {testing ? "Testowanie…" : "Testuj"}
                </button>
              </div>
              {test && (
                <div
                  role="status"
                  aria-live="polite"
                  className={`mt-3 rounded-xl p-3 text-xs ${
                    test.status === "ok"
                      ? "bg-lime/10 border border-lime/30 text-lime"
                      : test.status === "no-tags"
                      ? "bg-white/5 border border-white/10 text-cream/70"
                      : "bg-amber-400/10 border border-amber-400/30 text-amber-300"
                  }`}
                >
                  <div className="font-bold mb-1">
                    {test.status === "ok"
                      ? "✓ Połączenie OK"
                      : test.status === "no-tags"
                      ? "○ Brak tagów"
                      : "⚠ Zablokowane / brak ruchu"}
                  </div>
                  <div className="text-cream/80 mb-2">{test.message}</div>
                  <ul className="space-y-0.5 text-cream/70">
                    <li>
                      Zgoda: analytics={String(test.consent.analytics)}, marketing={String(test.consent.marketing)}
                    </li>
                    <li>GA4 hits: {test.ga4Hits}</li>
                    <li>Google Ads hits: {test.adsHits}</li>
                    <li>Meta Pixel hits: {test.pixelHits}</li>
                  </ul>
                </div>
              )}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <button
                onClick={rejectAll}
                className="flex-1 px-5 py-3 rounded-full border border-white/20 font-bold text-sm hover:bg-white/5 transition"
              >
                Odrzuć opcjonalne
              </button>
              <button
                onClick={saveSelection}
                className="flex-1 px-5 py-3 rounded-full border border-white/20 font-bold text-sm hover:bg-white/5 transition"
              >
                Zapisz wybór
              </button>
              <button
                onClick={acceptAll}
                className="flex-1 px-5 py-3 rounded-full bg-lime text-ink font-bold text-sm hover:bg-cream transition"
              >
                Akceptuję wszystkie
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Toggle({
  label,
  description,
  checked,
  onChange,
  disabled,
}: {
  label: string;
  description: string;
  checked: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  return (
    <label className={`flex items-start gap-4 p-4 rounded-2xl border border-white/10 ${disabled ? "opacity-70" : "cursor-pointer hover:bg-white/5"}`}>
      <div className="flex-1">
        <div className="font-bold text-sm">{label}</div>
        <div className="text-xs text-cream/60 mt-1 leading-relaxed">{description}</div>
      </div>
      <span className="relative inline-block w-11 h-6 shrink-0 mt-1">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
          className="peer sr-only"
        />
        <span className="absolute inset-0 rounded-full bg-white/15 peer-checked:bg-lime transition" />
        <span className="absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-cream transition peer-checked:translate-x-5" />
      </span>
    </label>
  );
}

export type { ConsentState };
