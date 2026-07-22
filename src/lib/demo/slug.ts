// Generowanie publicznego adresu demo: [slug-firmy]-[losowy-token].
// Token z crypto.getRandomValues — trudny do odgadnięcia (36^8 ≈ 2,8e12 kombinacji).

const POLISH_MAP: Record<string, string> = {
  ą: "a",
  ć: "c",
  ę: "e",
  ł: "l",
  ń: "n",
  ó: "o",
  ś: "s",
  ź: "z",
  ż: "z",
};

export function slugifyCompany(name: string): string {
  const slug = name
    .toLowerCase()
    .replace(/[ąćęłńóśźż]/g, (ch) => POLISH_MAP[ch] ?? ch)
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/g, "");
  return slug || "demo";
}

const TOKEN_ALPHABET = "abcdefghijklmnopqrstuvwxyz0123456789";

export function randomToken(length = 8): string {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  let token = "";
  for (const byte of bytes) token += TOKEN_ALPHABET[byte % TOKEN_ALPHABET.length];
  return token;
}

export function buildDemoSlug(companyName: string): string {
  return `${slugifyCompany(companyName)}-${randomToken(8)}`;
}
