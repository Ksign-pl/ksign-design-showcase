// Wysyłka e-maili demo przez Resend (REST API przez fetch — działa w Node i na Workerach).
// Server-only: nie importować w kodzie klienckim.

import { formatPricePln, getPackage, type PackageId } from "./schema";

export function isResendConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export function resendMissingEnv(): string[] {
  return isResendConfigured() ? [] : ["RESEND_API_KEY"];
}

interface DemoEmailInput {
  to: string;
  companyName: string;
  demoUrl: string;
  activateUrl: string;
  packageId: PackageId;
  advisorName?: string;
}

const BRAND = {
  ink: "#0A0A0C",
  cream: "#EDE4D3",
  teal: "#1F8F87",
  paper: "#FCFAF6",
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function buildDemoEmailHtml(input: DemoEmailInput): string {
  const pkg = getPackage(input.packageId);
  const company = escapeHtml(input.companyName);
  const advisor = input.advisorName ? escapeHtml(input.advisorName) : "";
  return `<!doctype html>
<html lang="pl">
<body style="margin:0;padding:0;background:${BRAND.cream};font-family:'Helvetica Neue',Arial,sans-serif;color:${BRAND.ink};">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <div style="font-size:11px;letter-spacing:4px;text-transform:uppercase;font-family:monospace;color:${BRAND.ink};opacity:.7;margin-bottom:16px;">KSIGN — Projekt demo</div>
    <div style="background:${BRAND.paper};border:1px solid rgba(10,10,12,.12);border-radius:16px;padding:32px 28px;">
      <h1 style="margin:0 0 12px;font-size:28px;line-height:1.1;letter-spacing:-0.02em;font-weight:800;">
        Twoja strona demo jest gotowa
      </h1>
      <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">
        Przygotowaliśmy indywidualny projekt demonstracyjny strony dla firmy
        <strong>${company}</strong>. Zobacz, jak może wyglądać Twoja nowa strona:
      </p>
      <a href="${input.demoUrl}"
         style="display:inline-block;background:${BRAND.teal};color:#ffffff;text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;">
        Zobacz demo strony →
      </a>
      <div style="margin:28px 0;border-top:1px solid rgba(10,10,12,.12);"></div>
      <div style="font-size:11px;letter-spacing:3px;text-transform:uppercase;font-family:monospace;opacity:.7;margin-bottom:8px;">Wybrany pakiet</div>
      <p style="margin:0 0 4px;font-size:18px;font-weight:800;">Pakiet ${escapeHtml(pkg.name)} — ${formatPricePln(pkg.pricePln)}</p>
      <p style="margin:0 0 20px;font-size:14px;line-height:1.5;opacity:.85;">${escapeHtml(pkg.description)}</p>
      <a href="${input.activateUrl}"
         style="display:inline-block;background:${BRAND.ink};color:${BRAND.cream};text-decoration:none;font-weight:700;font-size:15px;padding:14px 28px;border-radius:999px;">
        Aktywuj projekt i zapłać online
      </a>
      <p style="margin:24px 0 0;font-size:13px;line-height:1.6;opacity:.8;">
        ⏳ <strong>Demo jest dostępne przez 72 godziny</strong> od wysłania tej wiadomości.
        Po tym czasie link wygaśnie — jeśli potrzebujesz więcej czasu, po prostu odpisz na tego maila.
      </p>
      ${advisor ? `<p style="margin:16px 0 0;font-size:13px;opacity:.8;">Twój doradca: <strong>${advisor}</strong></p>` : ""}
    </div>
    <p style="margin:20px 0 0;font-size:11px;line-height:1.5;opacity:.6;text-align:center;">
      KSIGN — nowoczesne strony internetowe dla małych firm · ksign.pl
    </p>
  </div>
</body>
</html>`;
}

export interface SendDemoEmailResult {
  ok: boolean;
  id?: string;
  error?: string;
}

/** Wysyła e-mail z linkiem do demo. Wymaga RESEND_API_KEY — bez klucza NIE symulujemy wysyłki. */
export async function sendDemoEmail(input: DemoEmailInput): Promise<SendDemoEmailResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }
  const from = process.env.RESEND_FROM_EMAIL || "KSIGN <onboarding@resend.dev>";
  const pkg = getPackage(input.packageId);

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to: [input.to],
      subject: `${input.companyName} — Twoja strona demo (pakiet ${pkg.name})`,
      html: buildDemoEmailHtml(input),
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    console.error("[demo:email] Resend error:", res.status, body);
    return { ok: false, error: `Resend HTTP ${res.status}` };
  }
  const json = (await res.json().catch(() => ({}))) as { id?: string };
  return { ok: true, id: json.id };
}
