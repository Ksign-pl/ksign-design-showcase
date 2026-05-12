import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getSeoStatus, type UrlCheck } from "@/lib/seo-status.functions";

function StatusDot({ ok }: { ok: boolean }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block w-2.5 h-2.5 rounded-full ${ok ? "bg-lime" : "bg-red-500"}`}
    />
  );
}

function Row({ label, ok, detail }: { label: string; ok: boolean; detail?: string }) {
  return (
    <li className="flex items-start gap-3 py-2 border-b border-ink/10 last:border-0">
      <StatusDot ok={ok} />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-semibold">{label}</div>
        {detail && <div className="text-xs text-ink/60 truncate font-mono">{detail}</div>}
      </div>
      <span className={`text-xs font-bold uppercase tracking-wider ${ok ? "text-ink/70" : "text-red-600"}`}>
        {ok ? "OK" : "FAIL"}
      </span>
    </li>
  );
}

function PageCard({ check }: { check: UrlCheck }) {
  const allOk =
    check.ok &&
    check.hasTitle &&
    check.hasDescription &&
    check.hasCanonical &&
    check.canonicalMatches &&
    check.hasOgImage &&
    check.jsonLdCount > 0 &&
    check.jsonLdValid;

  return (
    <div className="bg-white rounded-2xl border border-ink/10 p-6">
      <div className="flex items-center justify-between gap-3 mb-4">
        <div className="min-w-0">
          <div className="text-xs font-mono uppercase tracking-widest text-ink/40">URL</div>
          <a
            href={check.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-bold truncate block hover:text-violet transition"
          >
            {check.path}
          </a>
        </div>
        <span
          className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
            allOk ? "bg-lime text-ink" : "bg-red-100 text-red-700"
          }`}
        >
          {allOk ? "Pass" : "Issues"}
        </span>
      </div>
      <ul>
        <Row label={`HTTP ${check.status}`} ok={check.ok} />
        <Row label="Tytuł (<title>)" ok={check.hasTitle} detail={check.title || undefined} />
        <Row label="Meta description" ok={check.hasDescription} />
        <Row
          label="Canonical"
          ok={check.hasCanonical && check.canonicalMatches}
          detail={check.canonical || "brak"}
        />
        <Row label="og:image" ok={check.hasOgImage} />
        <Row
          label={`JSON-LD (${check.jsonLdCount})`}
          ok={check.jsonLdCount > 0 && check.jsonLdValid}
          detail={
            check.jsonLdError
              ? `Błąd parsowania: ${check.jsonLdError}`
              : check.jsonLdTypes.join(", ") || "brak"
          }
        />
      </ul>
    </div>
  );
}

export function SeoStatus() {
  const fetchStatus = useServerFn(getSeoStatus);
  const { data, isLoading, isError, refetch, isFetching } = useQuery({
    queryKey: ["seo-status"],
    queryFn: () => fetchStatus(),
    staleTime: 60_000,
    refetchOnWindowFocus: false,
  });

  return (
    <section id="seo-status" className="py-20 md:py-28 bg-cream border-t border-ink/10">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-2">
              [ Raport SEO ]
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter">
              Status indeksacji <span className="text-violet">live</span>
            </h2>
            <p className="text-ink/60 mt-3 max-w-xl">
              Live check: dostępność sitemapy, poprawność canonical i walidacja danych
              strukturalnych JSON-LD dla głównych URL-i serwisu.
            </p>
          </div>
          <button
            onClick={() => refetch()}
            disabled={isFetching}
            className="inline-flex items-center gap-2 bg-ink text-cream px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-violet hover:text-ink transition disabled:opacity-50"
          >
            {isFetching ? "Sprawdzam…" : "Odśwież raport"}
          </button>
        </div>

        {isLoading && (
          <div className="text-center py-16 text-ink/50 font-mono text-sm">
            Pobieram dane z {typeof window !== "undefined" ? window.location.host : "serwera"}…
          </div>
        )}

        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 rounded-2xl p-6">
            Nie udało się pobrać raportu SEO. Spróbuj ponownie za chwilę.
          </div>
        )}

        {data && (
          <>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-2xl border border-ink/10 p-6">
                <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-3">
                  Infrastruktura
                </div>
                <ul>
                  <Row
                    label="sitemap.xml"
                    ok={data.sitemap.ok && data.sitemap.isXml && data.sitemap.urlCount > 0}
                    detail={`${data.sitemap.status} • ${data.sitemap.urlCount} URL${data.sitemap.urlCount === 1 ? "" : "i"} • ${data.sitemap.isXml ? "XML" : "nie-XML"}`}
                  />
                  <Row label="robots.txt" ok={data.robots.ok} detail={`HTTP ${data.robots.status}`} />
                </ul>
              </div>
              <div className="bg-white rounded-2xl border border-ink/10 p-6">
                <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-3">
                  Sprawdzono
                </div>
                <div className="text-sm font-mono text-ink/70 break-all">{data.base}</div>
                <div className="text-xs text-ink/40 mt-2">
                  {new Date(data.checkedAt).toLocaleString("pl-PL")}
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              {data.pages.map((p) => (
                <PageCard key={p.path} check={p} />
              ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3 text-sm">
              <a
                href={`https://search.google.com/test/rich-results?url=${encodeURIComponent(data.base + "/")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-ink/10 hover:border-ink transition"
              >
                Google Rich Results Test →
              </a>
              <a
                href={`https://validator.schema.org/#url=${encodeURIComponent(data.base + "/")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-ink/10 hover:border-ink transition"
              >
                Schema.org Validator →
              </a>
              <a
                href={`https://developers.facebook.com/tools/debug/?q=${encodeURIComponent(data.base + "/")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-ink/10 hover:border-ink transition"
              >
                Facebook Sharing Debugger →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
