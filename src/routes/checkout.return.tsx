import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getOrderBySession } from "@/lib/orders.functions";

const SearchSchema = z.object({
  session_id: z.string().optional(),
});

export const Route = createFileRoute("/checkout/return")({
  head: () => ({
    meta: [
      { title: "Dziękujemy za zamówienie | KSIGN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  validateSearch: (s) => SearchSchema.parse(s),
  component: CheckoutReturn,
});

function CheckoutReturn() {
  const { session_id } = Route.useSearch();
  const navigate = useNavigate();
  const fetchOrder = useServerFn(getOrderBySession);
  const [pollCount, setPollCount] = useState(0);

  const { data: order } = useQuery({
    queryKey: ["order", session_id, pollCount],
    queryFn: () => (session_id ? fetchOrder({ data: { sessionId: session_id } }) : null),
    enabled: !!session_id,
    refetchInterval: (q) => (q.state.data ? false : 2000),
  });

  // Stop polling after ~20s if webhook hasn't landed.
  useEffect(() => {
    const t = setInterval(() => setPollCount((c) => (c < 10 ? c + 1 : c)), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-5 py-16">
      <div className="max-w-xl text-center">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Dzięki za zamówienie!</h1>

        {order ? (
          <>
            <p className="text-ink/70 mb-2">
              <strong>{order.product_name}</strong> —{" "}
              {(order.amount_cents / 100).toLocaleString("pl-PL")} {order.currency.toUpperCase()}
            </p>
            <p className="text-ink/70 mb-6">
              Wysłaliśmy potwierdzenie. Aby przyspieszyć start prac, uzupełnij krótki brief:
            </p>
            <button
              type="button"
              onClick={() =>
                navigate({ to: "/brief", search: { session_id: session_id! } })
              }
              className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition"
            >
              Wypełnij brief →
            </button>
          </>
        ) : (
          <p className="text-ink/60 mb-6">
            Płatność została przyjęta. Trwa potwierdzanie zamówienia…
          </p>
        )}

        <div className="mt-10">
          <Link to="/" className="text-sm text-ink/50 underline">
            ← Wróć na stronę
          </Link>
        </div>
        {session_id && (
          <p className="text-xs text-ink/30 mt-6 font-mono break-all">ID: {session_id}</p>
        )}
      </div>
    </div>
  );
}
