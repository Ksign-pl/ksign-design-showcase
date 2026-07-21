// Panel doradcy — lista dem + status konfiguracji integracji.
// Chronione layoutem /_authenticated (wymaga zalogowanego użytkownika Supabase).

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { CheckCircle2, LogOut, Plus, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { supabase } from "@/integrations/supabase/client";
import { getIntegrationsStatus, listDemos } from "@/lib/demo/demos.functions";
import { DEMO_PACKAGES, formatPricePln, getPackage, getSiteType } from "@/lib/demo/schema";

export const Route = createFileRoute("/_authenticated/doradca/")({
  head: () => ({
    meta: [
      { title: "Panel doradcy — Ksign Demo Generator" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: DoradcaDashboard,
});

const STATUS_LABELS: Record<string, { label: string; className: string }> = {
  draft: { label: "Szkic", className: "bg-secondary text-secondary-foreground" },
  sent: { label: "Wysłane", className: "bg-lime/15 text-ink border border-lime/40" },
  paid: { label: "Opłacone", className: "bg-lime text-white" },
  expired: { label: "Wygasłe", className: "bg-ink/10 text-ink/60" },
};

function IntegrationRow({
  name,
  configured,
  missing,
  note,
}: {
  name: string;
  configured: boolean;
  missing: string[];
  note?: string;
}) {
  return (
    <li className="flex items-start justify-between gap-3 py-2">
      <div className="flex items-center gap-2">
        {configured ? (
          <CheckCircle2 className="h-4 w-4 shrink-0 text-lime" aria-hidden="true" />
        ) : (
          <XCircle className="h-4 w-4 shrink-0 text-destructive" aria-hidden="true" />
        )}
        <span className="text-[13px] font-semibold">{name}</span>
      </div>
      <div className="text-right">
        {configured ? (
          <span className="text-[12px] text-muted-foreground">{note ?? "skonfigurowane"}</span>
        ) : (
          <code className="font-mono text-[10.5px] text-destructive">{missing.join(", ")}</code>
        )}
      </div>
    </li>
  );
}

function DoradcaDashboard() {
  const demosQuery = useQuery({ queryKey: ["doradca", "demos"], queryFn: () => listDemos() });
  const statusQuery = useQuery({
    queryKey: ["doradca", "integrations"],
    queryFn: () => getIntegrationsStatus(),
    staleTime: 60_000,
  });

  return (
    <div className="min-h-screen bg-cream text-ink">
      <header className="border-b border-ink/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <div className="font-mono text-[10px] uppercase tracking-[0.4em] text-ink/60">
              KSIGN — narzędzie wewnętrzne
            </div>
            <h1 className="text-xl font-black tracking-tight">Demo Generator</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button asChild className="gap-2 bg-lime text-white hover:bg-lime/90">
              <Link to="/doradca/nowe">
                <Plus className="h-4 w-4" /> Nowe demo
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Wyloguj"
              onClick={async () => {
                await supabase.auth.signOut();
                window.location.href = "/login";
              }}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-6xl gap-6 px-5 py-8 lg:grid-cols-[1fr_320px]">
        <section aria-labelledby="demos-heading">
          <h2
            id="demos-heading"
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-ink/60"
          >
            Dema ({demosQuery.data?.demos.length ?? "…"})
          </h2>
          {demosQuery.isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-20 w-full rounded-2xl" />
              <Skeleton className="h-20 w-full rounded-2xl" />
            </div>
          ) : demosQuery.isError ? (
            <p className="rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
              Nie udało się pobrać listy dem. Jeśli to pierwsze uruchomienie — upewnij się, że
              migracja
              <code className="mx-1 font-mono text-[12px]">20260721160000_demo_generator.sql</code>
              została zastosowana w Supabase.
            </p>
          ) : demosQuery.data && demosQuery.data.demos.length > 0 ? (
            <ul className="space-y-3">
              {demosQuery.data.demos.map((demo) => {
                const status = STATUS_LABELS[demo.status] ?? STATUS_LABELS.draft;
                const pkg = getPackage(demo.package_id);
                return (
                  <li key={demo.id}>
                    <Link
                      to="/doradca/demo/$demoId"
                      params={{ demoId: demo.id }}
                      className="flex items-center justify-between gap-4 rounded-2xl border border-ink/10 bg-white p-4 transition-colors hover:border-ink/30"
                    >
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="truncate text-[15px] font-extrabold tracking-tight">
                            {demo.company_name}
                          </span>
                          <Badge className={`rounded-full text-[10px] ${status.className}`}>
                            {status.label}
                          </Badge>
                        </div>
                        <div className="mt-1 truncate text-[12px] text-muted-foreground">
                          {getSiteType(demo.site_type).label} · {pkg.name} (
                          {formatPricePln(pkg.pricePln)}) · {demo.client_email}
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink/50">
                          {new Date(demo.created_at).toLocaleDateString("pl-PL")}
                        </div>
                        {demo.advisor_id !== demosQuery.data.userId ? (
                          <div className="mt-0.5 text-[10px] text-violet">
                            doradca: {demo.advisor_name ?? "inny"}
                          </div>
                        ) : null}
                      </div>
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="rounded-2xl border border-dashed border-ink/20 bg-white/60 p-10 text-center">
              <p className="text-[15px] font-bold">Brak dem</p>
              <p className="mx-auto mt-1 max-w-sm text-[13px] text-muted-foreground">
                Podczas rozmowy z klientem wypełnij brief i wyślij pierwsze demo w mniej niż 15
                minut.
              </p>
              <Button asChild className="mt-4 gap-2 bg-lime text-white hover:bg-lime/90">
                <Link to="/doradca/nowe">
                  <Plus className="h-4 w-4" /> Utwórz pierwsze demo
                </Link>
              </Button>
            </div>
          )}
        </section>

        <aside aria-labelledby="config-heading">
          <h2
            id="config-heading"
            className="mb-4 font-mono text-[10px] uppercase tracking-[0.35em] text-ink/60"
          >
            Konfiguracja integracji
          </h2>
          <div className="rounded-2xl border border-ink/10 bg-white p-4">
            {statusQuery.isLoading ? (
              <Skeleton className="h-40 w-full" />
            ) : statusQuery.data ? (
              <>
                <ul className="divide-y divide-ink/5">
                  <IntegrationRow
                    name="Anthropic (treści AI)"
                    configured={statusQuery.data.anthropic.configured}
                    missing={statusQuery.data.anthropic.missing}
                    note={statusQuery.data.anthropic.model}
                  />
                  <IntegrationRow
                    name="Resend (e-mail)"
                    configured={statusQuery.data.resend.configured}
                    missing={statusQuery.data.resend.missing}
                  />
                  <IntegrationRow
                    name="Stripe (płatności)"
                    configured={statusQuery.data.stripe.configured}
                    missing={statusQuery.data.stripe.missing}
                  />
                  <IntegrationRow
                    name="Google Sheets (leady)"
                    configured={statusQuery.data.sheets.configured}
                    missing={statusQuery.data.sheets.missing}
                  />
                </ul>
                <p className="mt-3 border-t border-ink/5 pt-3 text-[11px] leading-relaxed text-muted-foreground">
                  Brak klucza nie blokuje pracy z podglądem — funkcje bez konfiguracji pokazują
                  czytelny komunikat zamiast udawać działanie. Szczegóły: README-demo-generator.md.
                </p>
              </>
            ) : (
              <p className="text-sm text-destructive">Nie udało się pobrać statusu konfiguracji.</p>
            )}
          </div>

          <div className="mt-4 rounded-2xl border border-ink/10 bg-ink p-4 text-cream">
            <div className="font-mono text-[9px] uppercase tracking-[0.3em] text-cream/60">
              Cennik pakietów
            </div>
            <ul className="mt-2 space-y-1.5">
              {DEMO_PACKAGES.map((pkg) => (
                <li key={pkg.id} className="flex items-baseline justify-between gap-2 text-[13px]">
                  <span className="font-semibold">{pkg.name}</span>
                  <span className="font-mono text-lime">{formatPricePln(pkg.pricePln)}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </main>
    </div>
  );
}
