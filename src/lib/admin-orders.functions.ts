import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const StatusEnum = z.enum(["all", "paid", "failed", "expired", "canceled", "refunded"]);

export type OrderStatusFilter = z.infer<typeof StatusEnum>;

export type AdminOrderRow = {
  id: string;
  created_at: string;
  customer_email: string | null;
  customer_name: string | null;
  product_name: string;
  price_id: string;
  amount_cents: number;
  currency: string;
  status: string;
  environment: string;
  stripe_session_id: string;
};

export const listAdminOrders = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { status?: OrderStatusFilter; priceId?: string }) =>
    z
      .object({
        status: StatusEnum.optional().default("all"),
        priceId: z.string().min(1).max(100).optional(),
      })
      .parse(input),
  )
  .handler(async ({ data, context }): Promise<{ orders: AdminOrderRow[] }> => {
    const { supabase } = context;

    let query = supabase
      .from("orders")
      .select(
        "id, created_at, customer_email, customer_name, product_name, price_id, amount_cents, currency, status, environment, stripe_session_id",
      )
      .order("created_at", { ascending: false })
      .limit(500);

    if (data.status && data.status !== "all") {
      query = query.eq("status", data.status);
    }
    if (data.priceId) {
      query = query.eq("price_id", data.priceId);
    }

    const { data: rows, error } = await query;
    if (error) {
      // RLS odmowa = brak roli admin
      throw new Error(error.message);
    }

    return { orders: (rows ?? []) as AdminOrderRow[] };
  });
