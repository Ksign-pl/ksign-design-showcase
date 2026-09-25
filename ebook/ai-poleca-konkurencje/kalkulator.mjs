// Liczy liczby do tabel w e-booku „AI poleca konkurencję.”, żeby nie wpisywać ich ręcznie.
// Wynik widoczności w odpowiedziach AI z testu pytań zakupowych i porównanie kanałów w GA4.
// Wszystkie dane w przykładach są umowne – pokazują metodę, nie wyniki rynku.
// Użycie:
//   node ebook/ai-poleca-konkurencje/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/ai-poleca-konkurencje/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa -->
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

// ---------- punktacja testu ----------

// P – asystent poleca Twój sklep albo produkt z linkiem, W – wymienia go bez linku,
// Z – Twoja strona jest tylko w źródłach pod odpowiedzią, 0 – brak.
export const PUNKTY = { P: 3, W: 2, Z: 1, 0: 0 };
export const MAKS = PUNKTY.P;
export const ASYSTENCI = ["ChatGPT", "Gemini", "Google: przegląd od AI i Tryb AI", "Copilot"];

// Przykład wypełnionego arkusza: 10 pytań × 4 asystenty. Dane umowne.
export const TEST = [
  { pytanie: "Jaka lampa do czytania w łóżku?", typ: "potrzeba", wyniki: ["0", "Z", "W", "0"] },
  { pytanie: "Lampa stołowa do 200 zł – co wybrać?", typ: "budżet", wyniki: ["0", "0", "Z", "0"] },
  { pytanie: "Lampa z ciepłym światłem do salonu", typ: "kategoria", wyniki: ["W", "Z", "P", "0"] },
  { pytanie: "[Twoja marka] lampy – opinie", typ: "marka", wyniki: ["P", "P", "P", "W"] },
  { pytanie: "[Twoja marka] czy [konkurent]?", typ: "porównanie", wyniki: ["W", "W", "P", "Z"] },
  { pytanie: "Gdzie kupić lampę [model]?", typ: "gdzie kupić", wyniki: ["Z", "W", "P", "0"] },
  { pytanie: "Najlepsze lampy biurkowe 2027", typ: "ranking", wyniki: ["0", "0", "Z", "0"] },
  { pytanie: "Jaka żarówka do lampy do czytania?", typ: "porada", wyniki: ["0", "Z", "Z", "0"] },
  { pytanie: "Lampa, która nie męczy oczu", typ: "problem", wyniki: ["0", "0", "0", "0"] },
  { pytanie: "Lampy polskich producentów", typ: "pochodzenie", wyniki: ["W", "0", "W", "0"] },
];

// Wynik widoczności: suma punktów ÷ najwyższy możliwy wynik (3 pkt × liczba pytań), w procentach.
export function wynikAsystenta(i, test = TEST) {
  const kody = test.map((w) => w.wyniki[i]);
  const liczba = (k) => kody.filter((x) => x === k).length;
  const suma = kody.reduce((s, k) => s + PUNKTY[k], 0);
  return {
    P: liczba("P"),
    W: liczba("W"),
    Z: liczba("Z"),
    brak: liczba("0"),
    wynik: suma / (MAKS * kody.length),
  };
}

export function wynikOgolny(test = TEST) {
  const suma = test.flatMap((w) => w.wyniki).reduce((s, k) => s + PUNKTY[k], 0);
  return suma / (MAKS * test.length * ASYSTENCI.length);
}

// ---------- kanały w GA4 (przykład, dane umowne) ----------

export const KANALY = [
  { nazwa: "Bezpłatne wyniki wyszukiwania", sesje: 18000, zakupy: 360, przychod: 88560 },
  { nazwa: "Asystent AI", sesje: 400, zakupy: 10, przychod: 2460 },
  { nazwa: "Bezpośrednie", sesje: 6000, zakupy: 150, przychod: 36900 },
  { nazwa: "E-mail", sesje: 2500, zakupy: 75, przychod: 17220 },
];

// ---------- formatowanie po polsku ----------

const zl = (x) => `${Math.round(x).toLocaleString("pl-PL").replace(/ /g, " ")} zł`;
const zlGr = (x) => `${x.toFixed(2).replace(".", ",")} zł`;
const liczba = (x) => Math.round(x).toLocaleString("pl-PL").replace(/ /g, " ");
const proc = (x, m = 0) => `${(x * 100).toFixed(m).replace(".", ",")}%`;

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

// ---------- tabele ----------

// Str. 11: przykład wypełnionego arkusza – 10 pytań, kody P/W/Z/0.
function tabelaArkusza() {
  return tabela(
    ["Pytanie", "Typ", ...ASYSTENCI.map((a) => a.split(":")[0])],
    TEST.map((w) => [w.pytanie, w.typ, ...w.wyniki.map((k) => (k === "0" ? "–" : k))]),
    { klasa: "tbl--kody" },
  );
}

// Str. 12: wynik widoczności dla każdego asystenta.
function tabelaWyniku() {
  const wiersze = ASYSTENCI.map((a, i) => {
    const w = wynikAsystenta(i);
    return [a, String(w.P), String(w.W), String(w.Z), String(w.brak), proc(w.wynik)];
  });
  wiersze.push(["**Razem**", "", "", "", "", `**${proc(wynikOgolny())}**`]);
  return tabela(
    [
      "Asystent",
      "Poleca (3 pkt)",
      "Wymienia (2 pkt)",
      "Źródło (1 pkt)",
      "Brak",
      "Wynik widoczności",
    ],
    wiersze,
    { klasa: "tbl--liczby" },
  );
}

// Str. 28: kanały w GA4 – przychód na sesję i współczynnik konwersji.
function tabelaKanalow() {
  const suma = KANALY.reduce((s, k) => s + k.sesje, 0);
  return tabela(
    ["Kanał w GA4", "Sesje", "Udział w sesjach", "Konwersja", "Przychód na sesję"],
    KANALY.map((k) => [
      k.nazwa,
      liczba(k.sesje),
      proc(k.sesje / suma, 1),
      proc(k.zakupy / k.sesje, 1),
      zlGr(k.przychod / k.sesje),
    ]),
    { klasa: "tbl--liczby" },
  );
}

const BLOKI = { arkusz: tabelaArkusza, wynik: tabelaWyniku, kanaly: tabelaKanalow };

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
  const ai = KANALY.find((k) => k.nazwa === "Asystent AI");
  const org = KANALY.find((k) => k.nazwa === "Bezpłatne wyniki wyszukiwania");
  console.log(
    `\nWynik widoczności razem: ${proc(wynikOgolny())}.` +
      `\nPrzychód na sesję: Asystent AI ${zlGr(ai.przychod / ai.sesje)}, wyszukiwarka ${zlGr(org.przychod / org.sesje)}` +
      ` (${proc(ai.przychod / ai.sesje / (org.przychod / org.sesje) - 1)} różnicy), przychód z AI ${zl(ai.przychod)}.`,
  );
}
