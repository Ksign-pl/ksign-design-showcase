import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/checkout/return")({
  head: () => ({
    meta: [
      { title: "Dziękujemy za zamówienie | KSIGN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  validateSearch: (search: Record<string, unknown>): { session_id?: string } => ({
    session_id: typeof search.session_id === "string" ? search.session_id : undefined,
  }),
  component: CheckoutReturn,
});

function CheckoutReturn() {
  const { session_id } = Route.useSearch();
  return (
    <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-5">
      <div className="max-w-xl text-center">
        <div className="text-6xl mb-6">✓</div>
        <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Dzięki za zamówienie!</h1>
        <p className="text-ink/70 mb-2">
          Pakiet Start za 999 zł został opłacony. Odezwiemy się w ciągu 24h na podany e-mail,
          żeby rozpocząć realizację (3–7 dni roboczych).
        </p>
        {session_id && (
          <p className="text-xs text-ink/40 mt-6 font-mono break-all">ID: {session_id}</p>
        )}
        <Link
          to="/"
          className="mt-8 inline-flex items-center justify-center gap-2 bg-ink text-cream px-6 py-3 rounded-full font-bold hover:bg-violet hover:text-ink transition-all"
        >
          ← Wróć na stronę
        </Link>
      </div>
    </div>
  );
}
