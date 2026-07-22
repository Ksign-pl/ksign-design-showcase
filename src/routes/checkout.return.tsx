import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { useServerFn } from "@tanstack/react-start";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getOrderBySession } from "@/lib/orders.functions";
import { resendOrderConfirmation } from "@/lib/email.functions";
import { getCatalogItem, getPreparationChecklist, getPostBriefCta } from "@/lib/catalog";
import { CONTACT, mailto } from "@/lib/contact";
import { generateOrderPdf } from "@/lib/order-pdf";
import { generateOrderPdfLink } from "@/lib/order-pdf.functions";
import { uploadBriefAsset, listBriefAssets, deleteBriefAsset } from "@/lib/brief-assets.functions";
import { getChecklistProgress, saveChecklistProgress } from "@/lib/checklist-progress.functions";

const SearchSchema = z.object({
  session_id: z.string().optional(),
  canceled: z.string().optional(),
  price: z.string().optional(),
});

export const Route = createFileRoute("/checkout/return")({
  head: () => ({
    meta: [
      { title: "Status płatności | KSIGN" },
      {
        name: "description",
        content:
          "Potwierdzenie statusu Twojej płatności w KSIGN i dalsze kroki realizacji zamówienia.",
      },
      { name: "robots", content: "noindex,nofollow" },
      { property: "og:title", content: "Status płatności | KSIGN" },
      {
        property: "og:description",
        content:
          "Potwierdzenie statusu Twojej płatności w KSIGN i dalsze kroki realizacji zamówienia.",
      },
      { property: "og:url", content: "https://ksign.pl/checkout/return" },
    ],
  }),
  validateSearch: (s) => SearchSchema.parse(s),
  component: CheckoutReturn,
});

const POLL_INTERVAL_MS = 2000;
const POLL_MAX = 12; // ~24s before declaring timeout

function CheckoutReturn() {
  const { session_id, canceled, price } = Route.useSearch();
  const navigate = useNavigate();
  const fetchOrder = useServerFn(getOrderBySession);
  const [pollCount, setPollCount] = useState(0);
  const [retryCycle, setRetryCycle] = useState(0);

  const isCanceled = canceled === "1";
  const noSession = !session_id || isCanceled;

  // Redirect canceled flow to dedicated page, preserving selected price.
  useEffect(() => {
    if (isCanceled) {
      navigate({
        to: "/checkout/canceled",
        search: price ? { price } : {},
        replace: true,
      });
    }
  }, [isCanceled, price, navigate]);

  const {
    data: order,
    isFetched,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ["order", session_id, retryCycle],
    queryFn: () => (session_id ? fetchOrder({ data: { sessionId: session_id } }) : null),
    enabled: !!session_id && !isCanceled,
    refetchInterval: (q) => (q.state.data ? false : POLL_INTERVAL_MS),
  });

  useEffect(() => {
    if (noSession || order) return;
    const t = setInterval(() => setPollCount((c) => (c < POLL_MAX ? c + 1 : c)), POLL_INTERVAL_MS);
    return () => clearInterval(t);
  }, [noSession, order, retryCycle]);

  const handleRefresh = () => {
    setPollCount(0);
    setRetryCycle((c) => c + 1);
    refetch();
  };

  if (isCanceled) return <RedirectingView />;
  if (noSession) return <FailureView />;

  if (!order) {
    const timedOut = pollCount >= POLL_MAX && isFetched;
    if (timedOut) {
      return (
        <PendingView
          sessionId={session_id}
          onRefresh={handleRefresh}
          refreshing={isFetching}
          retryCycle={retryCycle}
        />
      );
    }
    return <LoadingView pollCount={pollCount} max={POLL_MAX} retryCycle={retryCycle} />;
  }

  return <SuccessView order={order} sessionId={session_id!} navigate={navigate} />;
}

function Shell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-ink flex items-center justify-center px-5 py-16">
      <div className="max-w-xl w-full text-center">{children}</div>
    </div>
  );
}

function ProgressBar({ value, max }: { value: number; max: number }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div
      className="w-full h-2 rounded-full bg-ink/10 overflow-hidden"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-label="Postęp weryfikacji płatności"
    >
      <div
        className="h-full bg-ink transition-[width] duration-500 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

function LoadingView({
  pollCount,
  max,
  retryCycle,
}: {
  pollCount: number;
  max: number;
  retryCycle: number;
}) {
  const secondsLeft = Math.max(0, (max - pollCount) * 2);
  const stillWaiting = pollCount > max / 2;
  const isReverify = retryCycle > 0;

  return (
    <Shell>
      <div className="text-5xl mb-6 animate-pulse">⏳</div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
        {isReverify ? "Ponowna weryfikacja…" : "Potwierdzamy płatność…"}
      </h1>
      <p className="text-ink/60 mb-8">
        {stillWaiting
          ? "To trwa dłużej niż zwykle — czekamy na potwierdzenie ze Stripe."
          : "Czekamy na webhook ze Stripe. Zwykle zajmuje to kilka sekund — nie zamykaj tej strony."}
      </p>

      <div className="bg-white/60 border border-ink/10 rounded-2xl p-6">
        <ProgressBar value={pollCount} max={max} />
        <div className="flex justify-between mt-3 text-xs text-ink/70 font-mono">
          <span>
            Próba {Math.min(pollCount + 1, max)}/{max}
          </span>
          <span>{secondsLeft > 0 ? `~${secondsLeft}s pozostało` : "kończymy…"}</span>
        </div>
      </div>
    </Shell>
  );
}

function SuccessView({
  order,
  sessionId,
  navigate,
}: {
  order: {
    id: string;
    product_name: string;
    price_id: string;
    amount_cents: number;
    currency: string;
    brief_completed: boolean;
  };
  sessionId: string;
  navigate: ReturnType<typeof useNavigate>;
}) {
  const item = getCatalogItem(order.price_id);
  const briefDone = order.brief_completed;
  const steps = briefDone
    ? (item?.postBriefSteps ?? item?.nextSteps ?? [])
    : (item?.nextSteps ?? []);
  const [minDays, maxDays] = item?.deliveryDays ?? [3, 7];
  const eta = etaRange(minDays, maxDays);

  return (
    <Shell>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-ink text-cream text-3xl mb-6">
        ✓
      </div>
      <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-3">
        {briefDone ? "Wszystko gotowe — startujemy!" : "Dzięki za zamówienie!"}
      </h1>
      <p className="text-ink/70 mb-2">
        <strong>{order.product_name}</strong> — {(order.amount_cents / 100).toLocaleString("pl-PL")}{" "}
        {order.currency.toUpperCase()}
      </p>
      <p className="text-ink/60 mb-8">Potwierdzenie wysłaliśmy na Twój e-mail.</p>

      {/* Status + ETA bar */}
      <div className="grid grid-cols-2 gap-3 mb-8 text-left">
        <div className="bg-white border border-ink/10 rounded-2xl p-4">
          <div className="text-xs text-ink/50 uppercase tracking-wide mb-1">Status briefu</div>
          <div className="font-bold">{briefDone ? "✓ wypełniony" : "○ oczekuje"}</div>
          <div className="text-xs text-ink/70 uppercase tracking-wide mb-1">Status briefu</div>
          <div className="font-bold">
            {briefDone ? "✓ wypełniony" : "○ oczekuje"}
          </div>
        </div>
        <div className="bg-white border border-ink/10 rounded-2xl p-4">
          <div className="text-xs text-ink/70 uppercase tracking-wide mb-1">
            {briefDone ? "Pierwsza wersja do" : "Realizacja"}
          </div>
          <div className="font-bold">{briefDone ? eta : `${minDays}–${maxDays} dni rob.`}</div>
        </div>
      </div>

      {steps.length > 0 && (
        <div className="text-left bg-white border border-ink/10 rounded-2xl p-6 mb-8">
          <h2 className="font-black text-lg mb-4">
            {briefDone ? "Co dzieje się teraz?" : "Co dalej?"}
          </h2>
          <ol className="space-y-3">
            {steps.map((step, i) => (
              <li key={i} className="flex gap-3 text-sm text-ink/80">
                <span className="flex-none w-6 h-6 rounded-full bg-ink text-cream font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {briefDone && (
        <PreparationChecklist
          orderId={order.id}
          sessionId={sessionId}
          items={getPreparationChecklist(item)}
        />
      )}

      {/* Dynamic primary CTA */}
      {!briefDone ? (
        <div className="space-y-3">
          <button
            type="button"
            onClick={() => navigate({ to: "/brief", search: { session_id: sessionId } })}
            className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition"
          >
            Wypełnij brief →
          </button>
          <p className="text-xs text-ink/70">
            Im szybciej wypełnisz brief, tym szybciej zaczynam — zwykle ten sam dzień.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {(() => {
            const cta = getPostBriefCta(item);
            const isExternal = cta.external ?? cta.href.startsWith("http");
            return (
              <>
                <a
                  href={cta.href}
                  {...(isExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition"
                >
                  {cta.label}
                </a>
                {cta.note && <p className="text-xs text-ink/50">{cta.note}</p>}
                {cta.note && (
                  <p className="text-xs text-ink/70">{cta.note}</p>
                )}
              </>
            );
          })()}
        </div>
      )}

      <DownloadSummary
        order={order}
        steps={steps}
        deliveryDays={[minDays, maxDays]}
        eta={eta}
        sessionId={sessionId}
      />

      <ResendConfirmation orderId={order.id} sessionId={sessionId} />

      <ContactSection />

      <div className="mt-10">
        <Link to="/" className="text-sm text-ink/70 underline">
          ← Wróć na stronę
        </Link>
      </div>
      <p className="text-xs text-ink/70 mt-6 font-mono break-all">ID: {sessionId}</p>
    </Shell>
  );
}

function etaRange(minDays: number, maxDays: number): string {
  const fmt = new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "short" });
  const add = (n: number) => {
    const d = new Date();
    let added = 0;
    while (added < n) {
      d.setDate(d.getDate() + 1);
      const day = d.getDay();
      if (day !== 0 && day !== 6) added++;
    }
    return d;
  };
  return `${fmt.format(add(minDays))} – ${fmt.format(add(maxDays))}`;
}

function PreparationChecklist({
  orderId,
  sessionId,
  items,
}: {
  orderId: string;
  sessionId: string;
  items: string[];
}) {
  const fetchProgress = useServerFn(getChecklistProgress);
  const saveProgress = useServerFn(saveChecklistProgress);
  const legacyKey = `ksign:prep-checklist:${orderId}`;

  const { data, isLoading } = useQuery({
    queryKey: ["checklist-progress", orderId],
    queryFn: () => fetchProgress({ data: { orderId, sessionId } }),
  });

  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [openNote, setOpenNote] = useState<number | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [saveState, setSaveState] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const saveTimer = useRef<number | null>(null);
  const migratedRef = useRef(false);

  const persist = (nextChecked: Set<number>, nextNotes: Record<string, string>) => {
    if (saveTimer.current) window.clearTimeout(saveTimer.current);
    setSaveState("saving");
    saveTimer.current = window.setTimeout(async () => {
      try {
        await saveProgress({
          data: {
            orderId,
            sessionId,
            checked: [...nextChecked],
            notes: nextNotes,
          },
        });
        setSaveState("saved");
        window.setTimeout(() => setSaveState((s) => (s === "saved" ? "idle" : s)), 1500);
      } catch {
        setSaveState("error");
      }
    }, 500);
  };

  // Hydrate from server; one-time migration of any localStorage progress.
  useEffect(() => {
    if (isLoading || hydrated) return;
    const serverChecked = new Set<number>(data?.checked ?? []);
    const serverNotes = (data?.notes ?? {}) as Record<string, string>;
    let merged = serverChecked;
    if (!migratedRef.current && typeof window !== "undefined") {
      migratedRef.current = true;
      try {
        const raw = window.localStorage.getItem(legacyKey);
        if (raw) {
          const arr = JSON.parse(raw);
          if (Array.isArray(arr)) {
            const local = arr.map(Number).filter((n) => Number.isInteger(n));
            if (local.length && serverChecked.size === 0) {
              merged = new Set<number>([...serverChecked, ...local]);
              persist(merged, serverNotes);
            }
          }
          window.localStorage.removeItem(legacyKey);
        }
      } catch {
        /* ignore */
      }
    }
    setChecked(merged);
    setNotes(serverNotes);
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading, data]);

  useEffect(() => {
    return () => {
      if (saveTimer.current) window.clearTimeout(saveTimer.current);
    };
  }, []);

  const toggle = (i: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      persist(next, notes);
      return next;
    });
  };

  const updateNote = (i: number, value: string) => {
    const capped = value.slice(0, 2000);
    setNotes((prev) => {
      const next = { ...prev };
      if (capped.trim()) next[String(i)] = capped;
      else delete next[String(i)];
      persist(checked, next);
      return next;
    });
  };

  const done = checked.size;
  const total = items.length;
  const pct = total > 0 ? Math.round((done / total) * 100) : 0;
  const allDone = done === total && total > 0;

  return (
    <div className="text-left bg-white border border-ink/10 rounded-2xl p-6 mb-8">
      <div className="flex items-baseline justify-between mb-3 gap-3">
        <h2 className="font-black text-lg">Przygotuj przed startem</h2>
        <span className="text-xs text-ink/70 font-mono flex items-center gap-2">
          {saveState === "saving" && <span className="text-ink/70">zapisywanie…</span>}
          {saveState === "saved" && <span className="text-emerald-600">zapisano ✓</span>}
          {saveState === "error" && <span className="text-red-600">błąd zapisu</span>}
          <span>
            {done}/{total}
          </span>
        </span>
      </div>
      <p className="text-sm text-ink/60 mb-4">
        Zbierz te rzeczy zanim zaczniemy — dzięki temu ruszamy bez przestojów. Możesz dopisać
        notatkę z detalami dla KSIGN do każdego punktu.
      </p>

      <div
        className="w-full h-1.5 rounded-full bg-ink/10 overflow-hidden mb-4"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={total}
        aria-valuenow={done}
        aria-label="Postęp przygotowań"
      >
        <div
          className={`h-full transition-[width] duration-500 ease-out ${allDone ? "bg-emerald-600" : "bg-ink"}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <ul className="space-y-2">
        {items.map((item, i) => {
          const isChecked = checked.has(i);
          const note = notes[String(i)] ?? "";
          const isOpen = openNote === i || note.length > 0;
          return (
            <li key={i} className="rounded-lg hover:bg-ink/5 transition p-2 -m-2">
              <div className="flex gap-3 items-start">
                <input
                  id={`prep-${i}`}
                  type="checkbox"
                  checked={isChecked}
                  onChange={() => toggle(i)}
                  className="mt-0.5 flex-none w-5 h-5 rounded border-ink/30 text-ink focus:ring-ink/30 cursor-pointer"
                />
                <label
                  htmlFor={`prep-${i}`}
                  className={`flex-1 text-sm leading-snug cursor-pointer ${isChecked ? "text-ink/70 line-through" : "text-ink/80"}`}
                >
                  {item}
                </label>
                <button
                  type="button"
                  onClick={() => setOpenNote((cur) => (cur === i ? null : i))}
                  className="text-[11px] font-mono uppercase tracking-wide text-ink/70 hover:text-ink underline-offset-2 hover:underline flex-none"
                  aria-expanded={isOpen}
                  aria-controls={`note-${i}`}
                >
                  {note ? "notatka ✎" : "+ notatka"}
                </button>
              </div>
              {isOpen && (
                <div id={`note-${i}`} className="mt-2 ml-8">
                  <textarea
                    value={note}
                    onChange={(e) => updateNote(i, e.target.value)}
                    placeholder="Dopisz szczegóły dla KSIGN (linki, wymiary, marka, deadline…)"
                    maxLength={2000}
                    rows={2}
                    className="w-full text-sm rounded-md border border-ink/15 bg-ink/5 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-ink/20 resize-y min-h-[60px]"
                  />
                  <div className="flex justify-between mt-1">
                    <span className="text-[10px] text-ink/70 font-mono">{note.length}/2000</span>
                    {note && (
                      <button
                        type="button"
                        onClick={() => updateNote(i, "")}
                        className="text-[10px] text-ink/70 hover:text-red-600 font-mono uppercase"
                      >
                        Usuń notatkę
                      </button>
                    )}
                  </div>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      {allDone && (
        <p className="text-xs text-emerald-700 font-bold mt-4">
          ✓ Wszystko gotowe — możemy ruszać.
        </p>
      )}

      <BriefAssetUploader orderId={orderId} sessionId={sessionId} />
    </div>
  );
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error("Błąd odczytu pliku"));
    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") return reject(new Error("Niepoprawny format odczytu"));
      const comma = result.indexOf(",");
      resolve(comma >= 0 ? result.slice(comma + 1) : result);
    };
    reader.readAsDataURL(file);
  });
}

function formatBytes(n: number): string {
  if (!n) return "0 B";
  const units = ["B", "kB", "MB", "GB"];
  const i = Math.min(units.length - 1, Math.floor(Math.log(n) / Math.log(1024)));
  return `${(n / Math.pow(1024, i)).toFixed(i === 0 ? 0 : 1)} ${units[i]}`;
}

const MAX_UPLOAD_BYTES = 10 * 1024 * 1024;

function BriefAssetUploader({ orderId, sessionId }: { orderId: string; sessionId: string }) {
  const uploadFn = useServerFn(uploadBriefAsset);
  const listFn = useServerFn(listBriefAssets);
  const deleteFn = useServerFn(deleteBriefAsset);

  const list = useQuery({
    queryKey: ["brief-assets", orderId],
    queryFn: () => listFn({ data: { orderId, sessionId } }),
  });

  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setError(null);
    const arr = Array.from(files);
    for (const file of arr) {
      if (file.size > MAX_UPLOAD_BYTES) {
        setError(`„${file.name}" przekracza limit 10 MB.`);
        continue;
      }
      try {
        setUploading((n) => n + 1);
        const contentBase64 = await fileToBase64(file);
        await uploadFn({
          data: {
            orderId,
            sessionId,
            fileName: file.name,
            contentType: file.type || "application/octet-stream",
            contentBase64,
          },
        });
      } catch (e) {
        setError(e instanceof Error ? e.message : "Nie udało się wgrać pliku.");
      } finally {
        setUploading((n) => n - 1);
      }
    }
    if (inputRef.current) inputRef.current.value = "";
    list.refetch();
  };

  const handleDelete = async (path: string) => {
    if (!window.confirm("Usunąć ten plik?")) return;
    try {
      await deleteFn({ data: { orderId, sessionId, path } });
      list.refetch();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Nie udało się usunąć pliku.");
    }
  };

  const items = list.data?.items ?? [];

  return (
    <div className="mt-6 pt-6 border-t border-ink/10">
      <div className="flex items-baseline justify-between mb-2">
        <h3 className="font-bold text-sm">Załączniki (logo, zdjęcia, teksty)</h3>
        <span className="text-xs text-ink/70 font-mono">
          {items.length} {items.length === 1 ? "plik" : "plików"}
        </span>
      </div>
      <p className="text-xs text-ink/50 mb-3">
        Wgraj pliki, które przygotowałeś z checklisty. Limit 10 MB na plik. Obrazy, PDF, DOC, XLS,
        ZIP.
      <p className="text-xs text-ink/70 mb-3">
        Wgraj pliki, które przygotowałeś z checklisty. Limit 10 MB na plik. Obrazy, PDF, DOC, XLS, ZIP.
      </p>

      <label className="inline-flex items-center gap-2 cursor-pointer bg-ink/5 hover:bg-ink/10 border border-dashed border-ink/30 rounded-xl px-4 py-3 text-sm font-medium transition">
        <input
          ref={inputRef}
          type="file"
          multiple
          className="hidden"
          accept="image/*,application/pdf,text/plain,.doc,.docx,.xls,.xlsx,.zip"
          onChange={(e) => handleFiles(e.target.files)}
          disabled={uploading > 0}
        />
        <span>📎</span>
        <span>{uploading > 0 ? `Wgrywanie… (${uploading})` : "Dodaj pliki"}</span>
      </label>

      {error && (
        <p className="text-xs text-red-600 mt-2" role="status">
          {error}
        </p>
      )}

      {list.isLoading && <p className="text-xs text-ink/40 mt-3">Ładowanie listy plików…</p>}
      {list.isLoading && (
        <p className="text-xs text-ink/70 mt-3">Ładowanie listy plików…</p>
      )}

      {items.length > 0 && (
        <ul className="mt-4 space-y-1.5">
          {items.map((f) => (
            <li
              key={f.path}
              className="flex items-center justify-between gap-3 text-sm bg-ink/[0.03] rounded-lg px-3 py-2"
            >
              <div className="min-w-0 flex-1">
                {f.url ? (
                  <a
                    href={f.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-ink hover:text-violet underline-offset-2 hover:underline truncate block"
                  >
                    {f.name}
                  </a>
                ) : (
                  <span className="font-medium truncate block">{f.name}</span>
                )}
                <span className="text-xs text-ink/70">{formatBytes(f.size)}</span>
              </div>
              <button
                type="button"
                onClick={() => handleDelete(f.path)}
                className="text-xs text-ink/70 hover:text-red-600 transition flex-none"
                aria-label={`Usuń ${f.name}`}
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function DownloadSummary({
  order,
  steps,
  deliveryDays,
  eta,
  sessionId,
}: {
  order: {
    id: string;
    product_name: string;
    amount_cents: number;
    currency: string;
    brief_completed: boolean;
  };
  steps: string[];
  deliveryDays: [number, number];
  eta: string;
  sessionId: string;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const handleDownload = async () => {
    setStatus("loading");
    try {
      const doc = generateOrderPdf({
        orderId: order.id,
        productName: order.product_name,
        amountCents: order.amount_cents,
        currency: order.currency,
        briefCompleted: order.brief_completed,
        deliveryDays,
        etaRange: eta,
        steps,
      });
      doc.save(`ksign-zamowienie-${order.id.slice(0, 8)}.pdf`);
      setStatus("done");
      setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const isLoading = status === "loading";

  const generateLink = useServerFn(generateOrderPdfLink);
  const linkMutation = useMutation({
    mutationFn: () =>
      generateLink({
        data: { orderId: order.id, sessionId, deliveryDays, etaRange: eta, steps },
      }),
  });

  const minutesLeft = linkMutation.data
    ? Math.max(1, Math.round(linkMutation.data.expiresInSec / 60))
    : null;

  return (
    <div className="mt-8 space-y-3">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={handleDownload}
          disabled={isLoading}
          className="inline-flex items-center justify-center gap-2 bg-transparent border border-ink/20 text-ink px-5 py-2.5 rounded-full font-bold text-sm hover:bg-ink/5 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <span
                className="inline-block w-3.5 h-3.5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"
                aria-hidden="true"
              />
              Generowanie…
            </>
          ) : (
            <>
              <span aria-hidden="true">⬇</span>
              Pobierz podsumowanie (PDF)
            </>
          )}
        </button>
        {status === "done" && (
          <span className="text-sm text-ink/70" role="status">
            ✓ Gotowe
          </span>
        )}
        {status === "error" && (
          <span className="text-sm text-red-600" role="status">
            Błąd generowania
          </span>
        )}

        <button
          type="button"
          onClick={() => linkMutation.mutate()}
          disabled={linkMutation.isPending}
          className="inline-flex items-center justify-center gap-2 bg-transparent border border-ink/20 text-ink px-5 py-2.5 rounded-full font-bold text-sm hover:bg-ink/5 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {linkMutation.isPending ? (
            <>
              <span
                className="inline-block w-3.5 h-3.5 border-2 border-ink/30 border-t-ink rounded-full animate-spin"
                aria-hidden="true"
              />
              Tworzenie linku…
            </>
          ) : (
            <>
              <span aria-hidden="true">🔗</span>
              Wygeneruj link do pobrania
            </>
          )}
        </button>
      </div>

      {linkMutation.isSuccess && linkMutation.data && (
        <div className="text-sm text-ink/70 flex flex-wrap items-center gap-2">
          <a
            href={linkMutation.data.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-ink underline hover:text-violet transition"
          >
            Pobierz PDF z serwera
          </a>
          <span className="text-ink/50">· link ważny ok. {minutesLeft} min</span>
          <span className="text-ink/70">
            · link ważny ok. {minutesLeft} min
          </span>
        </div>
      )}
      {linkMutation.isError && (
        <p className="text-sm text-red-600" role="status">
          Nie udało się wygenerować linku.{" "}
          {linkMutation.error instanceof Error ? linkMutation.error.message : ""}
        </p>
      )}
    </div>
  );
}

function ResendConfirmation({ orderId, sessionId }: { orderId: string; sessionId: string }) {
  const resend = useServerFn(resendOrderConfirmation);
  const [lastSentAt, setLastSentAt] = useState<number | null>(null);

  const mutation = useMutation({
    mutationFn: () => resend({ data: { orderId, sessionId } }),
    onSuccess: () => setLastSentAt(Date.now()),
  });

  const status: "idle" | "sending" | "sent" | "error" = mutation.isPending
    ? "sending"
    : mutation.isError
      ? "error"
      : mutation.isSuccess
        ? "sent"
        : "idle";

  const cooldownSec = 30;
  const sinceSent = lastSentAt ? Math.floor((Date.now() - lastSentAt) / 1000) : null;
  const inCooldown = sinceSent !== null && sinceSent < cooldownSec;

  const [, force] = useState(0);
  useEffect(() => {
    if (!inCooldown) return;
    const t = setInterval(() => force((n) => n + 1), 1000);
    return () => clearInterval(t);
  }, [inCooldown]);

  const disabled = mutation.isPending || inCooldown;

  const statusStyles: Record<typeof status, string> = {
    idle: "text-ink/70",
    sending: "text-ink/70",
    sent: "text-emerald-700",
    error: "text-red-700",
  };

  const statusLabel: Record<typeof status, string> = {
    idle: "Nie otrzymałeś e-maila? Możemy wysłać ponownie.",
    sending: "Wysyłanie…",
    sent: "✓ Wysłane — sprawdź skrzynkę (także spam)",
    error:
      mutation.error instanceof Error
        ? `Błąd: ${mutation.error.message}`
        : "Nie udało się wysłać. Spróbuj ponownie.",
  };

  return (
    <div className="mt-10 pt-8 border-t border-ink/10">
      <h3 className="font-black text-base mb-2">Potwierdzenie e-mail</h3>
      <p className={`text-sm mb-3 ${statusStyles[status]}`} aria-live="polite">
        {statusLabel[status]}
      </p>
      <button
        type="button"
        onClick={() => mutation.mutate()}
        disabled={disabled}
        className="inline-flex items-center justify-center gap-2 bg-transparent border border-ink/20 text-ink px-5 py-2.5 rounded-full font-bold text-sm hover:bg-ink/5 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <span className={mutation.isPending ? "inline-block animate-spin" : ""}>
          {status === "sent" ? "✓" : status === "error" ? "↻" : "✉"}
        </span>
        {mutation.isPending
          ? "Wysyłanie…"
          : inCooldown
            ? `Ponów za ${cooldownSec - (sinceSent ?? 0)}s`
            : status === "sent"
              ? "Wyślij ponownie"
              : status === "error"
                ? "Spróbuj ponownie"
                : "Wyślij ponownie potwierdzenie"}
      </button>
    </div>
  );
}

function ContactSection() {
  return (
    <div className="mt-10 pt-8 border-t border-ink/10 text-left">
      <h3 className="font-black text-base mb-4 text-center">Masz pytania? Odezwij się</h3>
      <div className="grid sm:grid-cols-3 gap-3">
        <a
          href={mailto("Pytanie do zamówienia")}
          className="block bg-white border border-ink/10 rounded-2xl p-4 hover:border-ink transition group"
        >
          <div className="text-2xl mb-2">✉</div>
          <div className="font-bold text-sm">E-mail</div>
          <div className="text-xs text-ink/60 group-hover:text-ink transition truncate">
            {CONTACT.email}
          </div>
        </a>
        <a
          href={CONTACT.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white border border-ink/10 rounded-2xl p-4 hover:border-ink transition group"
        >
          <div className="text-2xl mb-2">💬</div>
          <div className="font-bold text-sm">WhatsApp</div>
          <div className="text-xs text-ink/60 group-hover:text-ink transition">
            Szybka odpowiedź
          </div>
        </a>
        <a
          href={CONTACT.calendarShortUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white border border-ink/10 rounded-2xl p-4 hover:border-ink transition group"
        >
          <div className="text-2xl mb-2">📅</div>
          <div className="font-bold text-sm">Umów rozmowę</div>
          <div className="text-xs text-ink/60 group-hover:text-ink transition">15 min, online</div>
        </a>
      </div>
      <p className="text-xs text-ink/40 mt-4 text-center">{CONTACT.hours}</p>
      <p className="text-xs text-ink/70 mt-4 text-center">
        {CONTACT.hours}
      </p>
    </div>
  );
}

function PendingView({
  sessionId,
  onRefresh,
  refreshing,
  retryCycle,
}: {
  sessionId: string;
  onRefresh: () => void;
  refreshing: boolean;
  retryCycle: number;
}) {
  return (
    <Shell>
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-100 text-amber-700 text-3xl mb-6">
        !
      </div>
      <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-3">
        Płatność w trakcie potwierdzania
      </h1>
      <p className="text-ink/70 mb-2">
        Przyjęliśmy zlecenie, ale potwierdzenie ze Stripe (webhook) jeszcze nie dotarło.
      </p>
      <p className="text-ink/60 mb-6">
        Jeśli karta została obciążona — wszystko jest w porządku, status zaktualizuje się
        automatycznie. Możesz odświeżyć teraz albo wrócić tu za kilka minut.
      </p>

      <div className="bg-white/60 border border-ink/10 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between text-sm">
          <span className="text-ink/60">Status webhooka</span>
          <span className="font-mono text-amber-700">oczekiwanie ⏱</span>
        </div>
        {retryCycle > 0 && (
          <div className="mt-2 text-xs text-ink/70 text-right">
            Ponowna weryfikacja: {retryCycle}×
          </div>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          type="button"
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 bg-ink text-cream px-7 py-4 rounded-full font-bold hover:bg-violet hover:text-ink transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <span className={refreshing ? "inline-block animate-spin" : "inline-block"}>↻</span>
          {refreshing ? "Sprawdzam…" : "Odśwież status"}
        </button>
        <a
          href={mailto("Status płatności")}
          className="inline-flex items-center justify-center gap-2 bg-transparent border border-ink/20 text-ink px-7 py-4 rounded-full font-bold hover:bg-ink/5 transition"
        >
          Napisz do nas
        </a>
      </div>

      <div className="mt-10">
        <Link to="/" className="text-sm text-ink/50 underline">
          ← Wróć na stronę
        </Link>
        <Link to="/" className="text-sm text-ink/70 underline">← Wróć na stronę</Link>
      </div>
      <p className="text-xs text-ink/70 mt-6 font-mono break-all">ID: {sessionId}</p>
    </Shell>
  );
}

function RedirectingView() {
  return (
    <Shell>
      <div className="text-5xl mb-6 animate-pulse">…</div>
      <p className="text-ink/60">Przekierowuję na stronę anulowanej płatności…</p>
    </Shell>
  );
}

function FailureView() {
  useEffect(() => {
    window.location.replace("/checkout/failed");
  }, []);
  return (
    <Shell>
      <div className="text-5xl mb-6 animate-pulse">…</div>
      <p className="text-ink/60">Przekierowuję…</p>
    </Shell>
  );
}
