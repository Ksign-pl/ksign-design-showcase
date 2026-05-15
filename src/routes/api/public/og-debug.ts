import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const GRAPH_VERSION = "v21.0";

const PayloadSchema = z.object({
  url: z.string().url().max(2048),
  scrape: z.boolean().optional().default(true),
});

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function pickToken(): string | undefined {
  // Preferred: dedicated App Access Token in form "APP_ID|APP_SECRET".
  // Fallback: existing CAPI System User token (works if it has the right scopes).
  return process.env.META_APP_ACCESS_TOKEN || process.env.META_CAPI_ACCESS_TOKEN;
}

export const Route = createFileRoute("/api/public/og-debug")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: CORS }),

      POST: async ({ request }) => {
        const accessToken = pickToken();
        if (!accessToken) {
          return new Response(
            JSON.stringify({
              error:
                "Brak tokenu. Dodaj sekret META_APP_ACCESS_TOKEN w formacie APP_ID|APP_SECRET.",
            }),
            { status: 500, headers: { "Content-Type": "application/json", ...CORS } },
          );
        }

        let payload: z.infer<typeof PayloadSchema>;
        try {
          payload = PayloadSchema.parse(await request.json());
        } catch (err) {
          return new Response(
            JSON.stringify({ error: "Invalid payload", details: String(err) }),
            { status: 400, headers: { "Content-Type": "application/json", ...CORS } },
          );
        }

        // Meta Sharing Debugger / Scrape API
        // POST  https://graph.facebook.com/v21.0/?id=<URL>&scrape=true
        // Returns the OG metadata Meta currently has cached. With scrape=true
        // it forces a refresh of the cache.
        const params = new URLSearchParams({
          id: payload.url,
          scrape: payload.scrape ? "true" : "false",
          access_token: accessToken,
        });
        const endpoint = `https://graph.facebook.com/${GRAPH_VERSION}/?${params.toString()}`;

        try {
          const res = await fetch(endpoint, { method: "POST" });
          const text = await res.text();
          let data: unknown = text;
          try {
            data = JSON.parse(text);
          } catch {
            // keep as raw text
          }
          return new Response(
            JSON.stringify({
              ok: res.ok,
              status: res.status,
              url: payload.url,
              scrape: payload.scrape,
              data,
            }),
            { status: 200, headers: { "Content-Type": "application/json", ...CORS } },
          );
        } catch (err) {
          console.error("OG debug fetch failed", err);
          return new Response(
            JSON.stringify({ error: "Upstream request failed", details: String(err) }),
            { status: 502, headers: { "Content-Type": "application/json", ...CORS } },
          );
        }
      },
    },
  },
});
