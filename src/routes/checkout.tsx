import { createFileRoute, Link } from "@tanstack/react-router";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Zamówienie — Pakiet Start | KSIGN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: CheckoutPage,
});

function CheckoutPage() {
  return (
    <div className="min-h-screen bg-cream text-ink">
      <PaymentTestModeBanner />
      <header className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="font-black tracking-tight text-xl">KSIGN</Link>
          <Link to="/" className="text-sm text-ink/60 hover:text-ink">← Wróć</Link>
        </div>
      </header>
      <main className="mx-auto max-w-[1100px] px-5 md:px-8 py-10 md:py-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">Pakiet Start — 999 zł</h1>
        <p className="text-ink/60 mb-8">Realizacja 3–7 dni roboczych. Bez ukrytych kosztów.</p>
        <div className="rounded-3xl overflow-hidden border border-ink/10 bg-white">
          <StripeEmbeddedCheckout priceId="pakiet_start_one_time" />
        </div>
      </main>
    </div>
  );
}
