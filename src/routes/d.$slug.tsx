// Publiczne demo klienta: /d/[slug-firmy]-[token].
// Layout pobiera demo i egzekwuje okno życia: aktywne (72h) → pełna strona,
// 72h–30 dni → ekran „Oferta wygasła", po 30 dniach → link nie prezentuje danych.

import { createFileRoute, Link, Outlet } from "@tanstack/react-router";
import { getPublicDemo, type PublicDemoState } from "@/lib/demo/public.functions";

export const Route = createFileRoute("/d/$slug")({
  validateSearch: (search: Record<string, unknown>): { payment?: "success" } =>
    search.payment === "success" ? { payment: "success" } : {},
  loader: async ({ params }): Promise<PublicDemoState> => {
    try {
      return await getPublicDemo({ data: { slug: params.slug } });
    } catch (err) {
      console.error("[demo:public] loader error:", err);
      return { state: "gone" };
    }
  },
  head: ({ loaderData }) => ({
    meta: [
      {
        title:
          loaderData?.state === "active"
            ? `${loaderData.demo.companyName} — projekt demo`
            : "Projekt demonstracyjny — KSIGN",
      },
      { name: "robots", content: "noindex,nofollow" },
      {
        name: "description",
        content:
          "Indywidualny projekt demonstracyjny strony internetowej przygotowany przez KSIGN.",
      },
    ],
  }),
  component: PublicDemoLayout,
});

function ExpiredScreen({ slug }: { slug: string }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5 text-ink">
      <div className="w-full max-w-xl text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/60">
          KSIGN · Projekt demonstracyjny
        </div>
        <h1 className="text-display mt-6 text-5xl sm:text-7xl">Oferta wygasła</h1>
        <p className="mx-auto mt-6 max-w-md text-[15px] leading-relaxed text-ink/75">
          Ten indywidualny projekt demonstracyjny był dostępny przez 72 godziny.
        </p>
        <div className="mt-9">
          <Link
            to="/d/$slug/aktywuj"
            params={{ slug }}
            className="inline-flex items-center gap-2 rounded-full bg-lime px-8 py-4 text-[15px] font-bold text-white transition-transform hover:scale-[1.02]"
          >
            Aktywuj projekt <span aria-hidden="true">→</span>
          </Link>
        </div>
        <p className="mt-8 font-mono text-[10px] uppercase tracking-[0.3em] text-ink/40">
          ksign.pl
        </p>
      </div>
    </div>
  );
}

function GoneScreen() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-cream px-5 text-ink">
      <div className="max-w-md text-center">
        <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/60">KSIGN</div>
        <h1 className="mt-5 text-3xl font-black tracking-tight">Ten link nie jest już aktywny</h1>
        <p className="mt-3 text-[14px] leading-relaxed text-ink/70">
          Projekt demonstracyjny, którego szukasz, nie jest już dostępny. Jeśli chcesz zobaczyć, jak
          może wyglądać Twoja strona — odezwij się do nas.
        </p>
        <a
          href="https://ksign.pl"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-[14px] font-bold text-cream"
        >
          Przejdź na ksign.pl <span aria-hidden="true">→</span>
        </a>
      </div>
    </div>
  );
}

function PublicDemoLayout() {
  const data = Route.useLoaderData();
  const { payment } = Route.useSearch();
  const { slug } = Route.useParams();

  if (data.state === "gone") return <GoneScreen />;
  if (data.state === "expired") return <ExpiredScreen slug={slug} />;

  return (
    <div className="min-h-screen">
      {payment === "success" ? (
        <div
          role="status"
          className="sticky top-0 z-50 bg-lime px-4 py-2.5 text-center text-[13px] font-bold text-white"
        >
          Dziękujemy! Płatność została przyjęta — skontaktujemy się z Tobą, aby ruszyć z realizacją
          projektu.
        </div>
      ) : null}
      <Outlet />
    </div>
  );
}
