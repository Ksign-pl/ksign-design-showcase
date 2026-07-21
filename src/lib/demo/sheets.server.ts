// Google Sheets — dopisywanie leada po wysłaniu dema.
// Service account + JWT RS256 podpisywany WebCrypto (działa w Node i na Cloudflare
// Workers, bez zależności googleapis). Błąd arkusza NIGDY nie blokuje wysyłki dema —
// wywołujący łapie wyjątek i loguje zdarzenie.

const TOKEN_URL = "https://oauth2.googleapis.com/token";
const SCOPE = "https://www.googleapis.com/auth/spreadsheets";

export function sheetsMissingEnv(): string[] {
  const missing: string[] = [];
  if (!process.env.GOOGLE_SHEETS_CLIENT_EMAIL) missing.push("GOOGLE_SHEETS_CLIENT_EMAIL");
  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) missing.push("GOOGLE_SHEETS_PRIVATE_KEY");
  if (!process.env.GOOGLE_SHEETS_SPREADSHEET_ID) missing.push("GOOGLE_SHEETS_SPREADSHEET_ID");
  return missing;
}

export function isSheetsConfigured(): boolean {
  return sheetsMissingEnv().length === 0;
}

function base64UrlEncode(data: Uint8Array | string): string {
  const bytes = typeof data === "string" ? new TextEncoder().encode(data) : data;
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function pemToArrayBuffer(pem: string): ArrayBuffer {
  const body = pem
    .replace(/-----BEGIN PRIVATE KEY-----/, "")
    .replace(/-----END PRIVATE KEY-----/, "")
    .replace(/\s+/g, "");
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function getAccessToken(clientEmail: string, privateKeyPem: string): Promise<string> {
  const now = Math.floor(Date.now() / 1000);
  const header = base64UrlEncode(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = base64UrlEncode(
    JSON.stringify({
      iss: clientEmail,
      scope: SCOPE,
      aud: TOKEN_URL,
      iat: now,
      exp: now + 3600,
    }),
  );
  const unsigned = `${header}.${claims}`;

  const key = await crypto.subtle.importKey(
    "pkcs8",
    pemToArrayBuffer(privateKeyPem),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(unsigned),
  );
  const jwt = `${unsigned}.${base64UrlEncode(new Uint8Array(signature))}`;

  const res = await fetch(TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Google OAuth ${res.status}: ${body.slice(0, 200)}`);
  }
  const json = (await res.json()) as { access_token?: string };
  if (!json.access_token) throw new Error("Google OAuth: no access_token in response");
  return json.access_token;
}

export interface LeadRow {
  createdAt: string;
  companyName: string;
  clientEmail: string;
  packageName: string;
  pricePln: number;
  city: string;
  siteTypeLabel: string;
  demoUrl: string;
  advisorName: string;
}

/** Dopisuje wiersz leada do arkusza. Rzuca wyjątkiem przy błędzie — wywołujący decyduje, że to nie blokuje. */
export async function appendLeadToSheet(row: LeadRow): Promise<void> {
  const clientEmail = process.env.GOOGLE_SHEETS_CLIENT_EMAIL;
  // Klucz w env często ma \n zapisane literalnie — normalizujemy.
  const privateKey = process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
  if (!clientEmail || !privateKey || !spreadsheetId) {
    throw new Error(`Google Sheets not configured: missing ${sheetsMissingEnv().join(", ")}`);
  }
  const range = process.env.GOOGLE_SHEETS_RANGE || "Leady!A:I";

  const token = await getAccessToken(clientEmail, privateKey);
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      values: [
        [
          row.createdAt,
          row.companyName,
          row.clientEmail,
          row.packageName,
          row.pricePln,
          row.city,
          row.siteTypeLabel,
          row.demoUrl,
          row.advisorName,
        ],
      ],
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Sheets append ${res.status}: ${body.slice(0, 200)}`);
  }
}
