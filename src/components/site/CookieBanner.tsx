import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { getConsent, saveConsent, type ConsentState } from "@/lib/consent";

type Mode = "hidden" | "banner" | "settings";

export function CookieBanner() {
  const [mode, setMode] = useState<Mode>("hidden");
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

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
      <div className="pointer-events-auto mx-auto max-w-4xl bg-ink text-cream rounded-3xl shadow-2xl border border-white/10 p-5 md:p-7">
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
