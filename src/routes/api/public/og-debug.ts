import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const GRAPH_VERSION = "v21.0";

const PayloadSchema = z.object({
  url: z.string().url().max(2048),
  scrape: z.boolean().optional().default(true),
});

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

function pickToken(): string | undefined {
  return process.env.META_APP_ACCESS_TOKEN || process.env.META_CAPI_ACCESS_TOKEN;
}

async function requireAdmin(request: Request): Promise<Response | null> {
  const auth = request.headers.get("authorization") || request.headers.get("Authorization");
  const bearer = auth?.startsWith("Bearer ") ? auth.slice(7).trim() : null;
  if (!bearer) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...CORS },
    });
  }
  const { data: userData, error: userErr } = await supabaseAdmin.auth.getUser(bearer);
  if (userErr || !userData?.user) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json", ...CORS },
    });
  }
  const { data: roleRow } = await supabaseAdmin
    .from("user_roles")
    .select("role")
    .eq("user_id", userData.user.id)
    .eq("role", "admin")
    .maybeSingle();
  if (!roleRow) {
    return new Response(JSON.stringify({ error: "Forbidden" }), {
      status: 403,
      headers: { "Content-Type": "application/json", ...CORS },
    });
  }
  return null;
}

export const Route = createFileRoute("/api/public/og-debug")({
  server: {
    handlers: {
      OPTIONS: async () =>
        new Response(null, { status: 204, headers: CORS }),

      POST: async ({ request }) => {
        const denied = await requireAdmin(request);
        if (denied) return denied;

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
