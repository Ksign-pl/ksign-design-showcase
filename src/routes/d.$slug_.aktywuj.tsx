// Aktywacja projektu: /d/$slug/aktywuj — poza layoutem dema (działa również dla
// dem wygasłych; to jest cel CTA „Aktywuj projekt"). Tworzy sesję Stripe Checkout
// na żądanie — indywidualny link płatności z e-maila prowadzi właśnie tutaj.

import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import {
  createDemoCheckout,
  getActivateInfo,
  type ActivateInfo,
} from "@/lib/demo/public.functions";

export const Route = createFileRoute("/d/$slug_/aktywuj")({
  validateSearch: (search: Record<string, unknown>): { payment?: "canceled" } =>
    search.payment === "canceled" ? { payment: "canceled" } : {},
  loader: async ({ params }): Promise<ActivateInfo> => {
    try {
      return await getActivateInfo({ data: { slug: params.slug } });
    } catch (err) {
      console.error("[demo:activate] loader error:", err);
      return { state: "gone" };
    }
  },
  head: () => ({
    meta: [{ title: "Aktywuj projekt — KSIGN" }, { name: "robots", content: "noindex,nofollow" }],
  }),
  component: ActivatePage,
});

function ActivatePage() {
  const info = Route.useLoaderData();
  const { payment } = Route.useSearch();
  const { slug } = Route.useParams();
  const [redirecting, setRedirecting] = useState(false);

  const startCheckout = async () => {
    setRedirecting(true);
    try {
      const result = await createDemoCheckout({ data: { slug } });
      window.location.href = result.url;
    } catch (err) {
      setRedirecting(false);
      toast.error(err instanceof Error ? err.message : "Nie udało się rozpocząć płatności.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5 py-10 text-ink">
      <Toaster position="top-center" />
      <div className="w-full max-w-lg">
        <div className="text-center font-mono text-[10px] uppercase tracking-[0.4em] text-ink/60">
          KSIGN · Aktywacja projektu
        </div>

        {info.state === "gone" ? (
          <div className="mt-8 text-center">
            <h1 className="text-3xl font-black tracking-tight">Ten link nie jest już aktywny</h1>
            <p className="mt-3 text-[14px] text-ink/70">
              Skontaktuj się z nami przez{" "}
              <a className="font-semibold underline underline-offset-2" href="https://ksign.pl">
                ksign.pl
              </a>
              , aby wrócić do rozmowy o projekcie.
            </p>
          </div>
        ) : info.state === "paid" ? (
          <div className="mt-8 rounded-3xl border border-lime/40 bg-white p-8 text-center shadow-sm">
            <h1 className="text-3xl font-black tracking-tight">Projekt jest aktywny 🎉</h1>
            <p className="mt-3 text-[14px] leading-relaxed text-ink/75">
              Płatność za projekt <strong>{info.companyName}</strong> została już zaksięgowana.
              Skontaktujemy się z Tobą, aby ustalić kolejne kroki realizacji.
            </p>
          </div>
        ) : (
          <div className="mt-8 rounded-3xl border border-ink/10 bg-white p-8 shadow-sm">
            {payment === "canceled" ? (
              <p
                role="status"
                className="mb-5 rounded-xl bg-ink/5 px-4 py-2.5 text-center text-[13px] font-semibold"
              >
                Płatność została anulowana — możesz spróbować ponownie.
              </p>
            ) : null}
            <h1 className="text-display text-4xl sm:text-5xl">Aktywuj projekt</h1>
            <p className="mt-4 text-[15px] leading-relaxed text-ink/80">
              Zamień demo <strong>{info.companyName}</strong> w prawdziwą stronę. Po opłaceniu
              pakietu ruszamy z realizacją — bez formularzy i czekania.
            </p>
            <div className="mt-6 flex items-center justify-between rounded-2xl border border-ink/10 bg-cream px-5 py-4">
              <div>
                <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-ink/60">
                  Wybrany pakiet
                </div>
                <div className="text-lg font-extrabold tracking-tight">
                  Pakiet {info.packageName}
                </div>
              </div>
              <div className="font-mono text-xl font-bold text-lime">{info.priceLabel}</div>
            </div>
            {info.paymentsAvailable ? (
              <button
                type="button"
                onClick={startCheckout}
                disabled={redirecting}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-lime px-8 py-4 text-[15px] font-bold text-white transition-transform hover:scale-[1.01] disabled:opacity-60"
              >
                {redirecting ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : null}
                {redirecting
                  ? "Przekierowuję do płatności…"
                  : "Przejdź do bezpiecznej płatności (Stripe)"}
              </button>
            ) : (
              <p className="mt-6 rounded-xl border border-ink/10 bg-ink/5 px-4 py-3 text-center text-[13px] font-semibold text-ink/80">
                Płatność online jest chwilowo niedostępna.
                <br />
                Napisz do nas:{" "}
                <a href="mailto:hello@ksign.pl" className="underline underline-offset-2">
                  hello@ksign.pl
                </a>{" "}
                — dokończymy aktywację mailowo.
              </p>
            )}
            <p className="mt-4 text-center text-[11px] text-ink/50">
              Płatność obsługuje Stripe. Po zaksięgowaniu status projektu zmienia się automatycznie.
            </p>
          </div>
        )}
        <p className="mt-8 text-center font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
          ksign.pl
        </p>
      </div>
    </div>
  );
}
