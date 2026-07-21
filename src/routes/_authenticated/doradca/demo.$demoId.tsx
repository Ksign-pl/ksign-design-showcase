// Edycja istniejącego dema: doradca zmienia brief/branding (podgląd i publiczna
// strona aktualizują się po zapisie), może ponowić generowanie i wysyłkę.

import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DemoBuilder, type DemoBuilderInitial } from "@/components/demo/DemoBuilder";
import { getDemoForAdvisor } from "@/lib/demo/demos.functions";
import type { Brief, PackageId, SiteTypeId } from "@/lib/demo/schema";

export const Route = createFileRoute("/_authenticated/doradca/demo/$demoId")({
  head: () => ({
    meta: [
      { title: "Edycja dema — Ksign Demo Generator" },
      { name: "robots", content: "noindex,nofollow" },
    ],
  }),
  component: EditDemoPage,
});

const STATUS_LABELS: Record<string, string> = {
  draft: "Szkic — e-mail nie został jeszcze wysłany",
  sent: "Wysłane do klienta",
  paid: "Opłacone 🎉",
  expired: "Wygasłe (72h minęło)",
};

const EVENT_LABELS: Record<string, string> = {
  generated: "Wygenerowano treści",
  sent: "Wysłano e-mail do klienta",
  visited: "Klient wszedł na demo",
  paid: "Płatność zakończona",
  expired: "Demo wygasło",
  sheets_error: "Błąd zapisu do Google Sheets",
  email_error: "Błąd wysyłki e-maila",
};

function EditDemoPage() {
  const { demoId } = Route.useParams();
  const query = useQuery({
    queryKey: ["doradca", "demo", demoId],
    queryFn: () => getDemoForAdvisor({ data: { demoId } }),
  });

  return (
    <div className="flex min-h-screen flex-col bg-cream text-ink">
      <header className="border-b border-ink/10">
        <div className="mx-auto flex max-w-[1500px] flex-wrap items-center gap-4 px-5 py-3.5">
          <Link
            to="/doradca"
            className="flex items-center gap-1.5 rounded-full px-2 py-1 text-[13px] font-semibold text-ink/70 hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Panel
          </Link>
          <div className="h-5 w-px bg-ink/15" aria-hidden="true" />
          <div className="min-w-0">
            <div className="font-mono text-[9px] uppercase tracking-[0.35em] text-ink/60">
              Edycja dema
            </div>
            <h1 className="truncate text-[15px] font-black leading-tight tracking-tight">
              {query.data?.demo.company_name ?? "…"}
            </h1>
          </div>
          {query.data ? (
            <div className="ml-auto flex flex-wrap items-center gap-2">
              <Badge variant="secondary" className="rounded-full text-[11px]">
                {STATUS_LABELS[query.data.demo.status] ?? query.data.demo.status}
              </Badge>
              <a
                href={`/d/${query.data.demo.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 rounded-full border border-ink/15 bg-white px-3 py-1 font-mono text-[11px] hover:border-ink/40"
              >
                /d/{query.data.demo.slug} <ExternalLink className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-[1500px] flex-1 flex-col px-5 py-5">
        {query.isLoading ? (
          <div className="grid gap-6 xl:grid-cols-[minmax(360px,440px)_1fr]">
            <Skeleton className="h-[520px] rounded-2xl" />
            <Skeleton className="h-[520px] rounded-2xl" />
          </div>
        ) : query.isError || !query.data ? (
          <p className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6 text-sm text-destructive">
            Nie znaleziono dema albo nie masz do niego dostępu.
          </p>
        ) : (
          <>
            <DemoBuilder initial={toInitial(query.data)} />
            <section aria-labelledby="events-heading" className="mt-8 max-w-2xl pb-10">
              <h2
                id="events-heading"
                className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-ink/60"
              >
                Historia zdarzeń
              </h2>
              {query.data.events.length === 0 ? (
                <p className="text-[13px] text-muted-foreground">Brak zdarzeń.</p>
              ) : (
                <ol className="space-y-1.5">
                  {query.data.events.map((event) => (
                    <li
                      key={event.id}
                      className="flex items-baseline justify-between gap-3 rounded-xl border border-ink/5 bg-white px-3 py-2 text-[13px]"
                    >
                      <span className="font-medium">
                        {EVENT_LABELS[event.event_type] ?? event.event_type}
                      </span>
                      <time className="shrink-0 font-mono text-[11px] text-ink/50">
                        {new Date(event.created_at).toLocaleString("pl-PL")}
                      </time>
                    </li>
                  ))}
                </ol>
              )}
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function toInitial(
  data: NonNullable<Awaited<ReturnType<typeof getDemoForAdvisor>>>,
): DemoBuilderInitial {
  const demo = data.demo;
  const brief: Brief = {
    companyName: demo.company_name,
    mainService: demo.main_service,
    targetAudience: demo.target_audience,
    city: demo.city,
    clientEmail: demo.client_email,
    advisorName: demo.advisor_name ?? "",
    logoUrl: demo.logo_url ?? "",
    brandColor: demo.brand_color ?? "",
    siteType: demo.site_type as SiteTypeId,
    packageId: demo.package_id as PackageId,
  };
  return {
    demoId: demo.id,
    brief,
    content: data.content,
    status: demo.status,
    slug: demo.slug,
    publicUrl: `/d/${demo.slug}`,
  };
}
