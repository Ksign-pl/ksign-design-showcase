import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { supabaseAdmin } from "@/integrations/supabase/client.server";

const BUCKET = "brief-assets";
const MAX_BYTES = 10 * 1024 * 1024; // 10 MB
const SIGNED_URL_TTL = 60 * 15; // 15 min

const ALLOWED_MIME = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "image/svg+xml",
  "application/pdf",
  "text/plain",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "application/zip",
]);

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

function sanitizeName(name: string): string {
  const trimmed = name.trim().slice(-120);
  return trimmed.replace(/[^a-zA-Z0-9._-]+/g, "_").replace(/_+/g, "_");
}

const UploadSchema = SessionSchema.extend({
  fileName: z.string().min(1).max(200),
  contentType: z
    .string()
    .min(1)
    .max(100)
    .refine((v) => ALLOWED_MIME.has(v), "Niedozwolony typ pliku."),
  /** base64-encoded file content (no data URL prefix) */
  contentBase64: z.string().min(1).max(Math.ceil((MAX_BYTES * 4) / 3) + 1024),
});

export const uploadBriefAsset = createServerFn({ method: "POST" })
  .inputValidator((input) => UploadSchema.parse(input))
  .handler(async ({ data }) => {
    await assertOwnership(data.orderId, data.sessionId);

    const bytes = Uint8Array.from(atob(data.contentBase64), (c) => c.charCodeAt(0));
    if (bytes.byteLength > MAX_BYTES) {
      throw new Error(`Plik jest zbyt duży (limit ${MAX_BYTES / 1024 / 1024} MB).`);
    }

    const safeName = sanitizeName(data.fileName);
    const path = `${data.orderId}/${Date.now()}-${safeName}`;

    const { error } = await supabaseAdmin.storage
      .from(BUCKET)
      .upload(path, bytes, { contentType: data.contentType, upsert: false });
    if (error) throw new Error(`Błąd zapisu: ${error.message}`);

    return { path, name: safeName, size: bytes.byteLength, contentType: data.contentType };
  });

export const listBriefAssets = createServerFn({ method: "POST" })
  .inputValidator((input) => SessionSchema.parse(input))
  .handler(async ({ data }) => {
    await assertOwnership(data.orderId, data.sessionId);

    const { data: files, error } = await supabaseAdmin.storage
      .from(BUCKET)
      .list(data.orderId, { limit: 100, sortBy: { column: "created_at", order: "desc" } });
    if (error) throw new Error(`Błąd listy: ${error.message}`);

    const items = await Promise.all(
      (files ?? [])
        .filter((f) => f.name && !f.name.startsWith("."))
        .map(async (f) => {
          const path = `${data.orderId}/${f.name}`;
          const { data: signed } = await supabaseAdmin.storage
            .from(BUCKET)
            .createSignedUrl(path, SIGNED_URL_TTL);
          // Display name = strip leading timestamp prefix
          const displayName = f.name.replace(/^\d+-/, "");
          return {
            path,
            name: displayName,
            size: (f.metadata as { size?: number } | null)?.size ?? 0,
            contentType:
              (f.metadata as { mimetype?: string } | null)?.mimetype ?? "application/octet-stream",
            createdAt: f.created_at ?? null,
            url: signed?.signedUrl ?? null,
          };
        }),
    );

    return { items };
  });

const DeleteSchema = SessionSchema.extend({
  path: z.string().min(1).max(500),
});

export const deleteBriefAsset = createServerFn({ method: "POST" })
  .inputValidator((input) => DeleteSchema.parse(input))
  .handler(async ({ data }) => {
    await assertOwnership(data.orderId, data.sessionId);
    if (!data.path.startsWith(`${data.orderId}/`)) {
      throw new Error("Nieprawidłowa ścieżka pliku.");
    }
    const { error } = await supabaseAdmin.storage.from(BUCKET).remove([data.path]);
    if (error) throw new Error(`Błąd usuwania: ${error.message}`);
    return { ok: true };
  });
