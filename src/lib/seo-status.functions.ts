import { createServerFn } from "@tanstack/react-start";
import { getRequestHost } from "@tanstack/react-start/server";

export interface UrlCheck {
  url: string;
  path: string;
  status: number;
  ok: boolean;
  hasTitle: boolean;
  title: string | null;
  hasDescription: boolean;
  hasCanonical: boolean;
  canonicalMatches: boolean;
  canonical: string | null;
  hasOgImage: boolean;
  jsonLdCount: number;
  jsonLdValid: boolean;
  jsonLdTypes: string[];
  jsonLdError: string | null;
}

export interface SeoStatusResult {
  base: string;
  checkedAt: string;
  sitemap: { url: string; status: number; ok: boolean; isXml: boolean; urlCount: number };
  robots: { url: string; status: number; ok: boolean };
  pages: UrlCheck[];
}

const PATHS = ["/", "/polityka-prywatnosci", "/polityka-cookies"];

function pickBase(): string {
  try {
    const host = getRequestHost();
    const proto = host.startsWith("localhost") ? "http" : "https";
    return `${proto}://${host}`;
  } catch {
    return "https://ksign.pl";
  }
}

async function checkPage(base: string, path: string): Promise<UrlCheck> {
  const url = base + path;
  const expectedCanonical = url.endsWith("/") ? url : url; // exact match
  try {
    const res = await fetch(url, {
      headers: { "user-agent": "KSIGN-SEO-Audit/1.0" },
      redirect: "follow",
    });
    const html = await res.text();

    const titleMatch = html.match(/<title[^>]*>([^<]*)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : null;

    const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);

    const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i);
    const canonical = canonicalMatch ? canonicalMatch[1] : null;

    const ogImageMatch = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);

    // JSON-LD blocks
    const jsonLdBlocks = [...html.matchAll(/<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)];
    const types: string[] = [];
    let jsonLdValid = true;
    let jsonLdError: string | null = null;

    for (const block of jsonLdBlocks) {
      try {
        const parsed = JSON.parse(block[1].trim());
        const collect = (node: unknown) => {
          if (!node || typeof node !== "object") return;
          const obj = node as Record<string, unknown>;
          if (typeof obj["@type"] === "string") types.push(obj["@type"] as string);
          if (Array.isArray(obj["@graph"])) (obj["@graph"] as unknown[]).forEach(collect);
        };
        collect(parsed);
      } catch (e) {
        jsonLdValid = false;
        jsonLdError = (e as Error).message;
      }
    }

    return {
      url,
      path,
      status: res.status,
      ok: res.ok,
      hasTitle: !!title,
      title,
      hasDescription: !!descMatch,
      hasCanonical: !!canonical,
      canonicalMatches: canonical === expectedCanonical || canonical === url,
      canonical,
      hasOgImage: !!ogImageMatch,
      jsonLdCount: jsonLdBlocks.length,
      jsonLdValid,
      jsonLdTypes: [...new Set(types)],
      jsonLdError,
    };
  } catch (e) {
    return {
      url,
      path,
      status: 0,
      ok: false,
      hasTitle: false,
      title: null,
      hasDescription: false,
      hasCanonical: false,
      canonicalMatches: false,
      canonical: null,
      hasOgImage: false,
      jsonLdCount: 0,
      jsonLdValid: false,
      jsonLdTypes: [],
      jsonLdError: (e as Error).message,
    };
  }
}

export const getSeoStatus = createServerFn({ method: "GET" }).handler(async (): Promise<SeoStatusResult> => {
  const base = pickBase();

  const [sitemapRes, robotsRes, ...pages] = await Promise.all([
    fetch(base + "/sitemap.xml", { headers: { "user-agent": "KSIGN-SEO-Audit/1.0" } })
      .then(async (r) => {
        const txt = await r.text();
        const isXml = txt.trimStart().startsWith("<?xml");
        const urlCount = (txt.match(/<loc>/g) || []).length;
        return { url: base + "/sitemap.xml", status: r.status, ok: r.ok, isXml, urlCount };
      })
      .catch(() => ({ url: base + "/sitemap.xml", status: 0, ok: false, isXml: false, urlCount: 0 })),
    fetch(base + "/robots.txt", { headers: { "user-agent": "KSIGN-SEO-Audit/1.0" } })
      .then((r) => ({ url: base + "/robots.txt", status: r.status, ok: r.ok }))
      .catch(() => ({ url: base + "/robots.txt", status: 0, ok: false })),
    ...PATHS.map((p) => checkPage(base, p)),
  ]);

  return {
    base,
    checkedAt: new Date().toISOString(),
    sitemap: sitemapRes,
    robots: robotsRes,
    pages: pages as UrlCheck[],
  };
});
