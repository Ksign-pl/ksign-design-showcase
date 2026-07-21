// Okresowe wygaszanie dem: POST /api/public/demos/expire
// Zabezpieczone sekretem CRON_SECRET (nagłówek x-cron-secret lub ?secret=).
// Nie zakładamy działającego crona — publiczne strony egzekwują reguły 72h/30 dni
// same przy każdym wejściu; ten endpoint domyka statusy w bazie (np. do raportów).
//
// Konfiguracja crona (przykłady):
//  - Vercel Cron / Cloudflare Cron Trigger / GitHub Actions schedule:
//    curl -X POST -H "x-cron-secret: $CRON_SECRET" https://<domena>/api/public/demos/expire

import { createFileRoute } from "@tanstack/react-router";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

export const Route = createFileRoute("/api/public/demos/expire")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const secret = process.env.CRON_SECRET;
        if (!secret) {
          return Response.json(
            { error: "CRON_SECRET is not configured — endpoint disabled" },
            { status: 503 },
          );
        }
        const url = new URL(request.url);
        const provided =
          request.headers.get("x-cron-secret") ?? url.searchParams.get("secret") ?? "";
        if (provided !== secret) {
          return Response.json({ error: "Unauthorized" }, { status: 401 });
        }

        const nowIso = new Date().toISOString();
        const { data: toExpire, error } = await supabaseAdmin
          .from("demos")
          .select("id")
          .in("status", ["draft", "sent"])
          .not("expires_at", "is", null)
          .lt("expires_at", nowIso);

        if (error) {
          console.error("[demo:expire] select failed:", error.message);
          return Response.json({ error: "Query failed" }, { status: 500 });
        }

        let expired = 0;
        for (const row of toExpire ?? []) {
          const { error: updateError } = await supabaseAdmin
            .from("demos")
            .update({ status: "expired", expired_at: nowIso })
            .eq("id", row.id)
            .in("status", ["draft", "sent"]);
          if (updateError) {
            console.error("[demo:expire] update failed:", row.id, updateError.message);
            continue;
          }
          expired += 1;
          await supabaseAdmin.from("demo_events").insert({
            demo_id: row.id,
            event_type: "expired",
            metadata: { via: "cron" },
          });
        }

        return Response.json({ ok: true, expired, checked: toExpire?.length ?? 0 });
      },
    },
  },
});
