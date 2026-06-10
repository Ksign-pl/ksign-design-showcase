import { createFileRoute, Link } from "@tanstack/react-router";
import { z } from "zod";
import { getCatalogItem } from "@/lib/catalog";
import { mailto } from "@/lib/contact";

const SearchSchema = z.object({
  price: z.string().optional(),
  reason: z.string().optional(),
});

export const Route = createFileRoute("/checkout/failed")({
  head: () => ({
    meta: [
      { title: "Płatność nieudana | KSIGN" },
      { name: "description", content: "Płatność nie powiodła się. Spróbuj ponownie lub skontaktuj się z nami, żebyśmy pomogli sfinalizować zamówienie." },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Płatność nieudana | KSIGN" },
      { property: "og:description", content: "Płatność nie powiodła się. Spróbuj ponownie lub skontaktuj się z nami, żebyśmy pomogli sfinalizować zamówienie." },
      { property: "og:url", content: "https://ksign.pl/checkout/failed" },
    ],
  }),
  validateSearch: (s) => SearchSchema.parse(s),
  component: CheckoutFailed,
});

function CheckoutFailed() {
  const { price, reason } = Route.useSearch();
  const item = price ? getCatalogItem(price) : undefined;
  const retryPrice = item ? price : "pakiet_start_one_time";

  return (
    <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-5 py-16">
      <div className="max-w-xl w-full text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 text-red-600 text-3xl mb-6">
          ✕
        </div>
        <h1 className="text-3xl md:text-5xl font-black tracking-tight mb-3">
          Płatność nieudana
        </h1>
        <p className="text-ink/70 mb-2">
          Nic nie zostało pobrane z Twojej karty.
          {item && (
            <>
              {" "}Zamówienie <strong>{item.name}</strong> nie zostało opłacone.
            </>
          )}
        </p>
        {reason && (
          <p className="text-sm text-ink/50 mb-2">Powód: {reason}</p>
        )}
        <p className="text-ink/60 mb-8">
          Możesz spróbować ponownie lub wrócić do wyboru pakietu. Jeśli problem się
          powtarza — napisz, ustalimy inny sposób płatności.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/checkout"
            search={{ price: retryPrice }}
            className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition"
          >
            Spróbuj ponownie
          </Link>
          <Link
            to="/pakiety"
            className="inline-flex items-center justify-center gap-2 bg-transparent border border-ink/20 text-ink px-7 py-4 rounded-full font-bold hover:bg-ink/5 transition"
          >
            ← Wróć do pakietów
          </Link>
        </div>

        <div className="mt-8">
          <a
            href={mailto("Problem z płatnością")}
            className="text-sm text-ink/50 underline"
          >
            Napisz do nas
          </a>
        </div>
      </div>
    </div>
  );
}
