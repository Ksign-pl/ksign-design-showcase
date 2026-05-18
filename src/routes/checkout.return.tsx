import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { getOrderBySession } from "@/lib/orders.functions";
import { getCatalogItem } from "@/lib/catalog";

const SearchSchema = z.object({
  session_id: z.string().optional(),
  canceled: z.string().optional(),
});

export const Route = createFileRoute("/checkout/return")({
  head: () => ({
    meta: [
      { title: "Status płatności | KSIGN" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  validateSearch: (s) => SearchSchema.parse(s),
  component: CheckoutReturn,
});

const POLL_MAX = 12; // ~24s

function CheckoutReturn() {
  const { session_id, canceled } = Route.useSearch();
  const navigate = useNavigate();
  const fetchOrder = useServerFn(getOrderBySession);
  const [pollCount, setPollCount] = useState(0);

  const noSession = !session_id || canceled === "1";

  const { data: order, isFetched } = useQuery({
    queryKey: ["order", session_id, pollCount],
    queryFn: () => (session_id ? fetchOrder({ data: { sessionId: session_id } }) : null),
    enabled: !!session_id,
    refetchInterval: (q) => (q.state.data ? false : 2000),
  });

  useEffect(() => {
    if (noSession) return;
    const t = setInterval(() => setPollCount((c) => (c < POLL_MAX ? c + 1 : c)), 2000);
    return () => clearInterval(t);
  }, [noSession]);

  // State: cancellation / no session
  if (noSession) return <FailureView />;

  // State: webhook hasn't landed yet
  if (!order) {
    const timedOut = pollCount >= POLL_MAX && isFetched;
    if (timedOut) return <PendingView sessionId={session_id} />;
    return <LoadingView />;
  }

  // State: success
  return <SuccessView order={order} sessionId={session_id!} navigate={navigate} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-5 py-16">
      <div className="max-w-xl w-full text-center">{children}</div>
    </div>
  );
}

function LoadingView() {
  return (
    <Shell>
      <div className="text-5xl mb-6 animate-pulse">⏳</div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
        Potwierdzamy płatność…
      </h1>
      <p className="text-ink/60">
        To zwykle trwa kilka sekund. Nie zamykaj tej strony.
      </p>
    </Shell>
  );
}

function SuccessView({
  order,
  sessionId,
  navigate,
}: {
  order: { product_name: string; price_id: string; amount_cents: number; currency: string; brief_completed: boolean };
  sessionId: string;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const item = getCatalogItem(order.price_id);
  const steps = item?.nextSteps ?? [];

  return (
    <Shell>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ink text-cream text-3xl mb-6">
        ✓
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
        Dzięki za zamówienie!
      </h1>
      <p className="text-ink/70 mb-2">
        <strong>{order.product_name}</strong> —{" "}
        {(order.amount_cents / 100).toLocaleString("pl-PL")}{" "}
        {order.currency.toUpperCase()}
      </p>
      <p className="text-ink/60 mb-8">
        Potwierdzenie wysłaliśmy na Twój e-mail.
      </p>

      {steps.length > 0 && (
        <div className="text-left bg-white border border-ink/10 rounded-2xl p-6 mb-8">
          <h2 className="font-black text-lg mb-4">Co dalej?</h2>
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/80">
                <span className="flex-none w-6 h-6 rounded-full bg-ink text-cream font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {!order.brief_completed ? (
        <button
          type="button"
          onClick={() => navigate({ to: "/brief", search: { session_id: sessionId } })}
          className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition"
        >
          Wypełnij brief →
        </button>
      ) : (
        <p className="text-sm text-ink/60">Brief już wypełniony — odzywam się mailowo.</p>
      )}

      <div className="mt-10">
        <Link to="/" className="text-sm text-ink/50 underline">
          ← Wróć na stronę
        </Link>
      </div>
      <p className="text-xs text-ink/30 mt-6 font-mono break-all">ID: {sessionId}</p>
    </Shell>
  );
}

function PendingView({ sessionId }: { sessionId: string }) {
  return (
    <Shell>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 text-3xl mb-6">
        !
      </div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
        Płatność w trakcie potwierdzania
      </h1>
      <p className="text-ink/70 mb-6">
        Przyjęliśmy zlecenie, ale potwierdzenie ze Stripe jeszcze nie dotarło. Zwykle
        zajmuje to chwilę. Sprawdź e-mail za kilka minut lub napisz do nas — szybko
        zweryfikujemy status.
      </p>
      <a
        href="mailto:hello@ksign.pl?subject=Status%20p%C5%82atno%C5%9Bci"
        className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition"
      >
        Napisz do nas
      </a>
      <div className="mt-10">
        <Link to="/" className="text-sm text-ink/50 underline">← Wróć na stronę</Link>
      </div>
      <p className="text-xs text-ink/30 mt-6 font-mono break-all">ID: {sessionId}</p>
    </Shell>
  );
}

function FailureView() {
  useEffect(() => {
    // Redirect anulowane / brakujące sesje do dedykowanej strony błędu
    window.location.replace("/checkout/failed");
  }, []);
  return (
    <Shell>
      <div className="text-5xl mb-6 animate-pulse">…</div>
      <p className="text-ink/60">Przekierowuję…</p>
    </Shell>
  );
}
