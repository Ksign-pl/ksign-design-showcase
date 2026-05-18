import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const SessionSchema = z.object({
  orderId: z.string().uuid(),
  sessionId: z
    .string()
    .min(10)
    .max(255)
    .regex(/^[a-zA-Z0-9_]+$/),
});

async function assertOwnership(orderId: string, sessionId: string) {
  const { data, error } = await supabaseAdmin
    .from("orders")
    .select("id, stripe_session_id")
    .eq("id", orderId)
    .maybeSingle();
  if (error || !data) throw new Error("Nie znaleziono zamówienia.");
  if (data.stripe_session_id !== sessionId) {
    throw new Error("Brak uprawnień do tego zamówienia.");
  }
}

const NotesSchema = z
  .record(z.string().regex(/^\d{1,3}$/), z.string().max(2000))
  .refine((v) => Object.keys(v).length <= 200, "Za dużo notatek.");

export const getChecklistProgress = createServerFn({ method: "GET" })
  .inputValidator((input) => SessionSchema.parse(input))
  .handler(async ({ data }) => {
    await assertOwnership(data.orderId, data.sessionId);
    const { data: row, error } = await supabaseAdmin
      .from("order_checklist_progress")
      .select("checked_indices, notes")
      .eq("order_id", data.orderId)
      .maybeSingle();
    if (error) throw new Error("Nie udało się wczytać postępu.");
    return {
      checked: (row?.checked_indices ?? []) as number[],
      notes: (row?.notes ?? {}) as Record<string, string>,
    };
  });

const SaveSchema = SessionSchema.extend({
  checked: z.array(z.number().int().min(0).max(999)).max(200),
  notes: NotesSchema.optional(),
});

export const saveChecklistProgress = createServerFn({ method: "POST" })
  .inputValidator((input) => SaveSchema.parse(input))
  .handler(async ({ data }) => {
    await assertOwnership(data.orderId, data.sessionId);
    const unique = Array.from(new Set(data.checked)).sort((a, b) => a - b);
    // strip empty notes
    const cleanNotes: Record<string, string> = {};
    for (const [k, v] of Object.entries(data.notes ?? {})) {
      const trimmed = v.trim();
      if (trimmed) cleanNotes[k] = trimmed;
    }
    const { error } = await supabaseAdmin
      .from("order_checklist_progress")
      .upsert(
        {
          order_id: data.orderId,
          checked_indices: unique,
          notes: cleanNotes,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "order_id" },
      );
    if (error) throw new Error("Nie udało się zapisać postępu.");
    return { ok: true, checked: unique, notes: cleanNotes };
  });
