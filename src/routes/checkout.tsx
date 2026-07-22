import { createFileRoute, Link, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { StripeEmbeddedCheckout } from "@/components/StripeEmbeddedCheckout";
import { PaymentTestModeBanner } from "@/components/PaymentTestModeBanner";
import { CATALOG, getCatalogItem } from "@/lib/catalog";

const SearchSchema = z.object({
  price: z.string().optional(),
});

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Zamówienie | KSIGN" },
      {
        name: "description",
        content:
          "Sfinalizuj zamówienie pakietu KSIGN — bezpieczna płatność online i szybki start prac nad Twoją stroną.",
      },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Zamówienie | KSIGN" },
      {
        property: "og:description",
        content:
          "Sfinalizuj zamówienie pakietu KSIGN — bezpieczna płatność online i szybki start prac nad Twoją stroną.",
      },
      { property: "og:url", content: "https://ksign.pl/checkout" },
    ],
  }),
  validateSearch: (search) => SearchSchema.parse(search),
  beforeLoad: ({ search }) => {
    const priceId = search.price ?? "pakiet_start_one_time";
    if (!getCatalogItem(priceId)) {
      throw redirect({ to: "/pakiety" });
    }
  },
  component: CheckoutPage,
});

function CheckoutPage() {
  const { price } = Route.useSearch();
  const priceId = price ?? "pakiet_start_one_time";
  const item = getCatalogItem(priceId)!;

  return (
    <div className="min-h-screen bg-cream text-ink">
      <PaymentTestModeBanner />
      <header className="border-b border-ink/10">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8 py-5 flex items-center justify-between">
          <Link to="/" className="font-black tracking-tight text-xl">
            KSIGN
          </Link>
          <Link to="/pakiety" className="text-sm text-ink/60 hover:text-ink">
            ← Wybierz inny pakiet
          </Link>
        </div>
      </header>
      <main className="mx-auto max-w-[1100px] px-5 md:px-8 py-10 md:py-16">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-2">
          {item.name} — {item.amountPln.toLocaleString("pl-PL")} zł
          {item.recurring && <span className="text-2xl text-ink/70"> / mies.</span>}
        </h1>
        <p className="text-ink/60 mb-8">{item.blurb}</p>
        <div className="rounded-3xl overflow-hidden border border-ink/10 bg-white">
          <StripeEmbeddedCheckout
            priceId={priceId}
            returnUrl={`${typeof window !== "undefined" ? window.location.origin : ""}/checkout/return?session_id={CHECKOUT_SESSION_ID}&price=${encodeURIComponent(priceId)}`}
          />
        </div>
        <p className="mt-6 text-xs text-ink/70">
          Zwrot możliwy do momentu rozpoczęcia prac. Po starcie realizacji opłata jest bezzwrotna.
        </p>
      </main>
    </div>
  );
}
