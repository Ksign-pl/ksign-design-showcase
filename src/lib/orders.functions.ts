import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

// Public lookup of an order by Stripe session_id (returned by Stripe in /checkout/return URL).
// Returns minimal display data only — never customer email or sensitive fields.
export const getOrderBySession = createServerFn({ method: "POST" })
  .inputValidator((input: { sessionId: string }) => {
    const schema = z.object({
      sessionId: z
        .string()
        .min(10)
        .max(255)
        .regex(/^[a-zA-Z0-9_]+$/),
    });
    return schema.parse(input);
  })
  .handler(async ({ data }) => {
    const { data: order, error } = await supabaseAdmin
      .from("orders")
      .select(
        "id, product_name, price_id, amount_cents, currency, brief_completed, status, created_at",
      )
      .eq("stripe_session_id", data.sessionId)
      .maybeSingle();
    if (error) {
      console.error("getOrderBySession error:", error);
      return null;
    }
    return order;
  });

const BriefSchema = z.object({
  sessionId: z
    .string()
    .min(10)
    .max(255)
    .regex(/^[a-zA-Z0-9_]+$/),
  companyName: z.string().min(1).max(255),
  industry: z.string().min(1).max(255),
  goals: z.string().min(1).max(2000),
  brandColors: z.string().max(255).optional().default(""),
  contentNotes: z.string().max(5000).optional().default(""),
  logoUrl: z.string().url().max(500).optional().or(z.literal("")).default(""),
  inspirations: z.string().max(2000).optional().default(""),
  phone: z.string().max(40).optional().default(""),
});

export const submitBrief = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => BriefSchema.parse(input))
  .handler(async ({ data }) => {
    const { data: order, error: orderErr } = await supabaseAdmin
      .from("orders")
      .select("id")
      .eq("stripe_session_id", data.sessionId)
      .maybeSingle();
    if (orderErr || !order) {
      throw new Error("Nie znaleziono zamówienia.");
    }

    const { error } = await supabaseAdmin.from("briefs").upsert(
      {
        order_id: order.id,
        company_name: data.companyName,
        industry: data.industry,
        goals: data.goals,
        brand_colors: data.brandColors,
        content_notes: data.contentNotes,
        logo_url: data.logoUrl || null,
        inspirations: data.inspirations,
        phone: data.phone,
      },
      { onConflict: "order_id" },
    );
    if (error) {
      console.error("submitBrief insert error:", error);
      throw new Error("Nie udało się zapisać briefu.");
    }

    await supabaseAdmin.from("orders").update({ brief_completed: true }).eq("id", order.id);

    return { ok: true };
  });
