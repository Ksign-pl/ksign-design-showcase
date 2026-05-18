import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { getCatalogItem } from "@/lib/catalog";
import { mailto } from "@/lib/contact";

const SearchSchema = z.object({
  price: z.string().optional(),
});

export const Route = createFileRoute("/checkout/canceled")({
  head: () => ({
    meta: [
      { title: "Płatność anulowana | KSIGN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  validateSearch: (s) => SearchSchema.parse(s),
  component: CheckoutCanceled,
});

function CheckoutCanceled() {
  const { price } = Route.useSearch();
  const item = price ? getCatalogItem(price) : undefined;
  const retryPrice = item ? price : "pakiet_start_one_time";

  return (
    <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-5 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ink/10 text-ink text-3xl mb-6">
          ⏸
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
          Płatność anulowana
        </h1>
        <p className="text-ink/70 mb-2">
          Nic nie zostało pobrane z Twojej karty.
          {item && (
            <>
              {" "}Zamówienie <strong>{item.name}</strong> nie zostało zrealizowane.
            </>
          )}
        </p>

        <div className="mt-8 mb-8 text-left bg-white/60 border border-ink/10 rounded-2xl p-6">
          <h2 className="font-bold mb-3">Co możesz zrobić dalej?</h2>
          <ul className="space-y-2 text-sm text-ink/75">
            <li>
              <strong>1.</strong> Wróć do checkoutu i dokończ płatność — Twój wybór pakietu nie został utracony.
            </li>
            <li>
              <strong>2.</strong> Zobacz ponownie ofertę pakietów i wybierz inny wariant.
            </li>
            <li>
              <strong>3.</strong> Jeśli wolisz przelew tradycyjny lub fakturę proforma — napisz, ustalimy płatność poza Stripe.
            </li>
          </ul>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/checkout"
            search={{ price: retryPrice }}
            className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition"
          >
            Dokończ płatność
          </Link>
          <Link
            to="/pakiety"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-ink/20 text-ink px-7 py-4 rounded-full font-bold hover:bg-ink/5 transition"
          >
            ← Zobacz pakiety
          </Link>
        </div>

        <div className="mt-8">
          <a
            href={mailto("Inna forma płatności")}
            className="text-sm text-ink/50 underline"
          >
            Napisz do nas o inną formę płatności
          </a>
        </div>
      </div>
    </div>
  );
}
