import { createFileRoute } from "@tanstack/react-router";
import { createHash } from "crypto";
import { z } from "zod";

const PIXEL_ID = process.env.META_PIXEL_ID || "1466352945238692";
const GRAPH_VERSION = "v21.0";

const UserDataSchema = z
  .object({
    email: z.string().email().max(254).optional(),
    phone: z.string().min(4).max(32).optional(),
    firstName: z.string().max(100).optional(),
    lastName: z.string().max(100).optional(),
    city: z.string().max(100).optional(),
    country: z.string().max(2).optional(),
    externalId: z.string().max(128).optional(),
  })
  .partial();

const PayloadSchema = z.object({
  eventName: z.enum([
    "PageView",
    "Lead",
    "Contact",
    "CompleteRegistration",
    "ViewContent",
    "InitiateCheckout",
    "Purchase",
    "Subscribe",
  ]),
  eventId: z.string().min(8).max(128),
  eventSourceUrl: z.string().url().max(2048).optional(),
  userData: UserDataSchema.optional(),
  customData: z.record(z.string().max(64), z.union([z.string().max(512), z.number(), z.boolean()])).optional(),
});

const sha256 = (v: string) => createHash("sha256").update(v).digest("hex");

const normEmail = (v: string) => v.trim().toLowerCase();
// Phone: keep digits only, strip leading zeros — Meta requires E.164-style digits.
const normPhone = (v: string) => v.replace(/\D+/g, "").replace(/^0+/, "");
const normName = (v: string) => v.trim().toLowerCase();
const normCity = (v: string) => v.trim().toLowerCase().replace(/\s+/g, "");
const normCountry = (v: string) => v.trim().toLowerCase().slice(0, 2);

function parseCookies(header: string | null): Record<string, string> {
  const out: Record<string, string> = {};
  if (!header) return out;
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k) out[k] = decodeURIComponent(rest.join("="));
  }
  return out;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

export const Route = createFileRoute("/api/public/meta-capi")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: CORS }),
      POST: async ({ request }) => {
        const accessToken = process.env.META_CAPI_ACCESS_TOKEN;
        if (!accessToken) {
          return new Response(JSON.stringify({ error: "META_CAPI_ACCESS_TOKEN not configured" }), {
            status: 500,
            headers: { "Content-Type": "application/json", ...CORS },
          });
        }

        let payload: z.infer<typeof PayloadSchema>;
        try {
          payload = PayloadSchema.parse(await request.json());
        } catch (err) {
          return new Response(JSON.stringify({ error: "Invalid payload", details: String(err) }), {
            status: 400,
            headers: { "Content-Type": "application/json", ...CORS },
          });
        }

        const cookies = parseCookies(request.headers.get("cookie"));
        const fbp = cookies["_fbp"];
        const fbc = cookies["_fbc"];
        const ua = request.headers.get("user-agent") ?? undefined;
        const ipHeader =
          request.headers.get("cf-connecting-ip") ??
          request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
          request.headers.get("x-real-ip") ??
          undefined;

        const u = payload.userData ?? {};
        const user_data: Record<string, unknown> = {};
        if (u.email) user_data.em = [sha256(normEmail(u.email))];
        if (u.phone) user_data.ph = [sha256(normPhone(u.phone))];
        if (u.firstName) user_data.fn = [sha256(normName(u.firstName))];
        if (u.lastName) user_data.ln = [sha256(normName(u.lastName))];
        if (u.city) user_data.ct = [sha256(normCity(u.city))];
        if (u.country) user_data.country = [sha256(normCountry(u.country))];
        if (u.externalId) user_data.external_id = [sha256(u.externalId.trim().toLowerCase())];
        if (fbp) user_data.fbp = fbp;
        if (fbc) user_data.fbc = fbc;
        if (ipHeader) user_data.client_ip_address = ipHeader;
        if (ua) user_data.client_user_agent = ua;

        const event = {
          event_name: payload.eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: payload.eventId,
          action_source: "website",
          event_source_url: payload.eventSourceUrl,
          user_data,
          custom_data: payload.customData,
        };

        const body: Record<string, unknown> = { data: [event] };
        if (process.env.META_CAPI_TEST_EVENT_CODE) {
          body.test_event_code = process.env.META_CAPI_TEST_EVENT_CODE;
        }

        const url = `https://graph.facebook.com/${GRAPH_VERSION}/${PIXEL_ID}/events?access_token=${encodeURIComponent(
          accessToken,
        )}`;

        try {
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
          });
          const text = await res.text();
          if (!res.ok) {
            console.error("Meta CAPI error", res.status, text);
            return new Response(JSON.stringify({ error: "Meta CAPI error", status: res.status }), {
              status: 502,
              headers: { "Content-Type": "application/json", ...CORS },
            });
          }
          return new Response(text, {
            status: 200,
            headers: { "Content-Type": "application/json", ...CORS },
          });
        } catch (err) {
          console.error("Meta CAPI fetch failed", err);
          return new Response(JSON.stringify({ error: "Upstream request failed" }), {
            status: 502,
            headers: { "Content-Type": "application/json", ...CORS },
          });
        }
      },
    },
  },
});
