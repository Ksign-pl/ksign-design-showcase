// Liczy wszystkie liczby do tabel i przykładów w e-booku „TikTok Shop od pierwszego dnia.”, żeby nie wpisywać
// ich ręcznie. Stawki: TikTok Shop Seller University dla Polski (stan na 25.09.2026).
// Użycie:
//   node ebook/tiktok-shop/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/tiktok-shop/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa --> w pliku
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

// ---------- stawki TikTok Shop (Polska) ----------

export const STAWKI = {
  prowizja: 0.09, // standardowa prowizja w UE, od zamówienia z VAT i z dostawą płaconą przez klienta
  prowizjaElektronika: 0.07,
  prowizjaNowySprzedawca: 0.02, // w Polsce przez 90 dni po wykonaniu misji
  dniNowySprzedawca: 90,
};

// Wysyłka przez platformę, Polska → Polska. Opłata dla sprzedawcy bez VAT, opłata dla klienta z VAT.
// Źródło: „Cennik wysyłek krajowych przez platformę”, TikTok Shop Seller University, 18.09.2026.
export const WYSYLKA = [
  { waga: "do 1 kg", punkt: 8.86, dom: 11.35, klientPunkt: 10.9, klientDom: 13.96 },
  { waga: "1–2 kg", punkt: 8.86, dom: 11.35, klientPunkt: 10.9, klientDom: 13.96 },
  { waga: "2–5 kg", punkt: 9.49, dom: 12.21, klientPunkt: 10.9, klientDom: 13.96 },
  { waga: "5–10 kg", punkt: 15.64, dom: 15.64, klientPunkt: 15.68, klientDom: 15.68 },
  { waga: "10–30 kg", punkt: 26.01, dom: 26.01, klientPunkt: 15.68, klientDom: 15.68 },
];

// ---------- formatowanie po polsku ----------

const VAT = 0.23;
const zl = (x) => `${Math.round(x).toLocaleString("pl-PL").replace(/ /g, " ")} zł`;
const zlGr = (x) => `${x.toFixed(2).replace(".", ",")} zł`;
const proc = (x, miejsca = 0) =>
  `${(x * 100).toFixed(miejsca).replace(".", ",").replace(/,0+$/, "")}%`;
const minus = (x) => (Math.round(x * 100) === 0 ? "0 zł" : `−${zl(x)}`);
const zlZnak = (x) => (Math.round(x) >= 0 ? `+${zl(x)}` : `−${zl(-x)}`);

// Tabela jako dane: nagłówek, wiersze i opcje składu HTML (klasa tabeli, wyróżnione komórki).
// Komórka „**tekst**” to pogrubienie; wiersz z pogrubioną pierwszą komórką jest wyróżniony w składzie.
function tabela(naglowek, wiersze, sklad = {}) {
  return { naglowek, wiersze, sklad };
}

function doMarkdown({ naglowek, wiersze }) {
  const kolumny = naglowek.map((_, i) =>
    Math.max(...[naglowek, ...wiersze].map((w) => w[i].length)),
  );
  const linia = (w) => `| ${w.map((k, i) => k.padEnd(kolumny[i])).join(" | ")} |`;
  const kreska = `| ${kolumny.map((s) => "-".repeat(s)).join(" | ")} |`;
  return [linia(naglowek), kreska, ...wiersze.map(linia)].join("\n");
}

// sklad.klasa – dodatkowe klasy tabeli; sklad.komorka(tekst, wiersz, kolumna) – klasa komórki.
function doHtml({ naglowek, wiersze, sklad }) {
  const tresc = (k) =>
    k
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>");
  const klasaKomorki = (k, w, i) => {
    const klasa = sklad.komorka?.(k, w, i);
    return klasa ? ` class="${klasa}"` : "";
  };
  const th = naglowek.map((k) => `<th>${tresc(k)}</th>`).join("");
  const tr = wiersze
    .map((w, wi) => {
      const akcent = /^\*\*/.test(w[0]) ? ' class="accent"' : "";
      const td = w.map((k, i) => `<td${klasaKomorki(k, wi, i)}>${tresc(k)}</td>`).join("");
      return `<tr${akcent}>${td}</tr>`;
    })
    .join("\n");
  const klasa = ["tbl", sklad.klasa].filter(Boolean).join(" ");
  return `<table class="${klasa}">\n<thead><tr>${th}</tr></thead>\n<tbody>\n${tr}\n</tbody>\n</table>`;
}

// ---------- przykład prowadzący ----------

// Marka kosmetyków: serum za 123 zł (100 zł netto), paczka do 1 kg do punktu odbioru, darmowa dostawa.
// Założenia do przykładu, nie benchmark.
export const PRODUKT = {
  brutto: 123,
  towar: 35, // koszt zakupu lub produkcji (netto)
  pakowanie: 3, // karton, wypełniacz, praca (netto)
  wysylka: WYSYLKA[0].punkt, // darmowa dostawa: płacisz opłatę za wysyłkę przez platformę
};

// Wynik jednego zamówienia. Prowizję liczymy od ceny z VAT (tak liczy TikTok Shop). Prowizję twórcy
// ostrożnie też od ceny z VAT – sprawdź w Centrum afiliacyjnym, od jakiej kwoty liczy się w Twoim sklepie.
export function zamowienie({ prowizja = STAWKI.prowizja, tworca = 0, p = PRODUKT } = {}) {
  const netto = p.brutto / (1 + VAT);
  const oplataTikTok = p.brutto * prowizja;
  const oplataTworca = p.brutto * tworca;
  const zysk = netto - p.towar - p.pakowanie - p.wysylka - oplataTikTok - oplataTworca;
  return { netto, oplataTikTok, oplataTworca, zysk };
}

function tabelaZamowienia() {
  const warianty = [
    ["Nowy sprzedawca (2%)", zamowienie({ prowizja: STAWKI.prowizjaNowySprzedawca })],
    ["Po 90 dniach (9%)", zamowienie()],
    ["9% + twórca 15%", zamowienie({ tworca: 0.15 })],
  ];
  const w = (f) => warianty.map(([, z]) => f(z));
  return tabela(
    ["Na 1 zamówienie", ...warianty.map(([n]) => n)],
    [
      ["Klient płaci (z VAT)", ...w(() => zl(PRODUKT.brutto))],
      ["Cena netto (bez 23% VAT)", ...w((z) => zl(z.netto))],
      ["Towar", ...w(() => minus(PRODUKT.towar))],
      ["Pakowanie", ...w(() => minus(PRODUKT.pakowanie))],
      ["Wysyłka (darmowa dla klienta)", ...w(() => minus(PRODUKT.wysylka))],
      ["Prowizja TikTok Shop", ...w((z) => minus(z.oplataTikTok))],
      ["Prowizja twórcy", ...w((z) => minus(z.oplataTworca))],
      ["**Zysk z zamówienia**", ...w((z) => `**${zl(z.zysk)}**`)],
    ],
    {
      klasa: "tbl--liczby",
      komorka: (k, wi, i) => (wi === 7 && i > 0 ? "hit" : null),
    },
  );
}

// Ile możesz dać twórcy: zysk z zamówienia przy różnych prowizjach afiliacyjnych.
const PROWIZJE_TWORCY = [0, 0.1, 0.15, 0.2, 0.25, 0.3];

function tabelaAfiliacji() {
  return tabela(
    ["Prowizja twórcy", "Twórca dostaje", "Zysk z zamówienia", "Zysk w okresie 2%"],
    PROWIZJE_TWORCY.map((t) => {
      const z = zamowienie({ tworca: t });
      const zNowy = zamowienie({ tworca: t, prowizja: STAWKI.prowizjaNowySprzedawca });
      return [
        t === 0 ? "bez twórcy" : proc(t),
        zl(z.oplataTworca),
        zlZnak(z.zysk),
        zlZnak(zNowy.zysk),
      ];
    }),
    {
      klasa: "tbl--liczby",
      komorka: (k, wi, i) => (i >= 2 ? (k.startsWith("−") ? "zle" : null) : null),
    },
  );
}

// Wysyłka przez platformę: ile kosztuje Cię paczka, gdy klient płaci za dostawę, a ile przy darmowej.
function tabelaWysylki() {
  return tabela(
    [
      "Waga paczki",
      "Klient płaci (punkt odbioru)",
      "Twój koszt, gdy klient płaci",
      "Twój koszt przy darmowej dostawie",
    ],
    WYSYLKA.filter((_, i) => i !== 1).map((r, i) => {
      const waga = i === 0 ? "do 2 kg" : r.waga;
      const koszt = Math.max(0, r.punkt - r.klientPunkt / (1 + VAT));
      return [waga, zlGr(r.klientPunkt), zlGr(koszt), zlGr(r.punkt)];
    }),
    { klasa: "tbl--liczby" },
  );
}

const BLOKI = {
  zamowienie: tabelaZamowienia,
  afiliacja: tabelaAfiliacji,
  wysylka: tabelaWysylki,
};

// ---------- uruchomienie ----------

const i = process.argv.indexOf("--wstaw");
if (i > 0) {
  const plik = process.argv[i + 1];
  let tekst = fs.readFileSync(plik, "utf8");
  const format = plik.endsWith(".html") ? doHtml : doMarkdown;
  const wstawione = [];
  for (const [nazwa, generuj] of Object.entries(BLOKI)) {
    const wzor = new RegExp(`(<!-- tabela:${nazwa} -->)[\\s\\S]*?(<!-- /tabela:${nazwa} -->)`);
    if (!wzor.test(tekst)) continue;
    tekst = tekst.replace(wzor, (_, a, b) => `${a}\n\n${format(generuj())}\n\n${b}`);
    wstawione.push(nazwa);
  }
  fs.writeFileSync(plik, tekst);
  console.log(`Wstawiono do ${plik}: ${wstawione.join(", ") || "nic (brak znaczników)"}`);
} else {
  for (const [nazwa, generuj] of Object.entries(BLOKI))
    console.log(`\n## ${nazwa}\n\n${doMarkdown(generuj())}`);
  const z9 = zamowienie();
  const z2 = zamowienie({ prowizja: STAWKI.prowizjaNowySprzedawca });
  const oszczednosc = z2.zysk - z9.zysk;
  console.log(
    `\nProwizja 9% od ${zl(PRODUKT.brutto)} = ${zlGr(z9.oplataTikTok)}, czyli ${proc(z9.oplataTikTok / z9.netto, 1)} przychodu netto.` +
      `\nW okresie 2% zostaje ${zlGr(oszczednosc)} więcej na zamówieniu; na 1000 zamówień: ${zl(oszczednosc * 1000)}.` +
      `\nMaksymalna prowizja twórcy, przy której zamówienie wychodzi na zero: ${proc(z9.zysk / PRODUKT.brutto, 1)} (w okresie 2%: ${proc(z2.zysk / PRODUKT.brutto, 1)}).`,
  );
}
