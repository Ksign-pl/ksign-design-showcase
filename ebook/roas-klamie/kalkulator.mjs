// Liczy wszystkie liczby do tabel i przykładów w e-booku „ROAS kłamie.”, żeby nie wpisywać ich ręcznie.
// Użycie:
//   node ebook/roas-klamie/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/roas-klamie/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa --> w pliku
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

const VAT = 0.23;

// ---------- wzory ----------

// Próg ROAS: przy jakim ROAS reklama nie przynosi ani zysku, ani straty.
// marza – zysk przed reklamą jako część ceny netto; zVat – czy wartość konwersji w panelu zawiera VAT.
export const progRoas = (marza, zVat = false) => (zVat ? 1 + VAT : 1) / marza;

// ROAS, przy którym po reklamie zostaje zakładany zysk (część ceny netto).
export const roasDlaZysku = (marza, zysk, zVat = false) => (zVat ? 1 + VAT : 1) / (marza - zysk);

// MER: cała sprzedaż sklepu (netto) podzielona przez wszystkie wydatki na reklamę.
export const mer = (sprzedazNetto, wydatki) => sprzedazNetto / wydatki;

// Test geograficzny: ile sprzedaży przyniosła reklama w regionach, w których działała (A),
// w porównaniu z regionami bez reklamy (B). Oczekiwana sprzedaż A = sprzedaż B w teście × (A/B przed testem).
export function testGeo({ przedA, przedB, testA, testB, wydatki }) {
  const oczekiwanaA = testB * (przedA / przedB);
  const przyrost = testA - oczekiwanaA;
  return { oczekiwanaA, przyrost, iroas: przyrost / wydatki };
}

// ---------- formatowanie po polsku ----------

const zl = (x) => `${Math.round(x).toLocaleString("pl-PL").replace(/ /g, " ")} zł`;
// Zaokrąglenie „do połowy w górę” z poprawką na zapis zmiennoprzecinkowy (3,075 → 3,08, jak w e-booku #098).
const liczba = (x, m = 2) =>
  (Math.round(x * 10 ** m + 1e-9) / 10 ** m).toFixed(m).replace(".", ",");
const proc = (x, m = 0) => `${(x * 100).toFixed(m).replace(".", ",").replace(/,0+$/, "")}%`;
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

// ---------- tabele ----------

const MARZE = [0.2, 0.3, 0.4, 0.5, 0.6];
const CEL_ZYSKU = 0.1; // 10% ceny netto po reklamie

function tabelaProgu() {
  return tabela(
    [
      "Zysk przed reklamą (marża)",
      "Próg ROAS: wartość bez VAT",
      "Próg ROAS: wartość z VAT",
      `ROAS dla ${proc(CEL_ZYSKU)} zysku (z VAT)`,
    ],
    MARZE.map((m) => [
      proc(m),
      liczba(progRoas(m)),
      liczba(progRoas(m, true)),
      liczba(roasDlaZysku(m, CEL_ZYSKU, true)),
    ]),
    { klasa: "tbl--liczby", komorka: (k, w, i) => (w === 2 && i > 0 ? "hit" : null) },
  );
}

// Przykładowy miesiąc sklepu: sprzedaż ze wszystkich źródeł, 2 kanały reklamy i to, co pokazują panele.
// Założenia do przykładu, nie benchmark.
export const MIESIAC = {
  sprzedazBrutto: 246000, // cała sprzedaż sklepu z VAT (system sklepu), po anulowaniach
  marza: 0.4, // zysk przed reklamą: sprzedaż netto minus towar, dostawa, płatności, obsługa
  meta: { wydatki: 14000, przypisaneBrutto: 98000 }, // Menedżer reklam: 7 dni od kliknięcia, 1 dzień od wyświetlenia
  google: { wydatki: 10000, przypisaneBrutto: 110000 }, // Google Ads: kolumna „Wartość konw.”, model oparty na danych
  zwroty: 0.08, // część sprzedaży netto zwrócona w ciągu miesiąca
};

export function liczMiesiac(m = MIESIAC) {
  const netto = m.sprzedazBrutto / (1 + VAT);
  const nettoPoZwrotach = netto * (1 - m.zwroty);
  const wydatki = m.meta.wydatki + m.google.wydatki;
  const zyskPrzed = nettoPoZwrotach * m.marza;
  const przypisane = m.meta.przypisaneBrutto + m.google.przypisaneBrutto;
  return {
    netto,
    nettoPoZwrotach,
    wydatki,
    zyskPrzed,
    zyskPo: zyskPrzed - wydatki,
    mer: mer(nettoPoZwrotach, wydatki),
    roasMeta: m.meta.przypisaneBrutto / m.meta.wydatki,
    roasGoogle: m.google.przypisaneBrutto / m.google.wydatki,
    przypisane,
    udzialPrzypisanych: przypisane / m.sprzedazBrutto,
  };
}

function tabelaMiesiaca() {
  const m = MIESIAC;
  const z = liczMiesiac();
  return tabela(
    ["Miesiąc sklepu", "Kwota", "Co mówi"],
    [
      ["Sprzedaż z VAT (system sklepu)", zl(m.sprzedazBrutto), "wszystkie źródła, po anulowaniach"],
      ["Sprzedaż netto po zwrotach", zl(z.nettoPoZwrotach), `bez VAT, zwroty ${proc(m.zwroty)}`],
      [
        "Wydatki na reklamę (Meta + Google)",
        zl(z.wydatki),
        `${zl(m.meta.wydatki)} + ${zl(m.google.wydatki)}`,
      ],
      [
        "ROAS w Menedżerze reklam Meta",
        liczba(z.roasMeta, 1),
        "wartość z VAT, okno atrybucji Meta",
      ],
      ["ROAS w Google Ads", liczba(z.roasGoogle, 1), "wartość z VAT, data kliknięcia"],
      [
        "Suma sprzedaży przypisanej w panelach",
        zl(z.przypisane),
        `${proc(z.udzialPrzypisanych)} całej sprzedaży sklepu`,
      ],
      [
        "**MER** (sprzedaż netto ÷ wydatki)",
        `**${liczba(z.mer, 1)}**`,
        `próg MER przy marży ${proc(m.marza)}: ${liczba(progRoas(m.marza))}`,
      ],
      [
        "**Zysk po reklamie**",
        `**${zl(z.zyskPo)}**`,
        `${zl(z.zyskPrzed)} zysku przed reklamą − wydatki`,
      ],
    ],
    { klasa: "tbl--liczby" },
  );
}

// Test geograficzny: reklama Meta wyłączona na 4 tygodnie w połowie regionów. Przykładowe liczby.
export const TEST = {
  przedA: 100000,
  przedB: 100000,
  testA: 112000,
  testB: 104000,
  wydatki: 4000,
  roasPanel: 6.5,
};

function tabelaTestu() {
  const t = TEST;
  const w = testGeo(t);
  return tabela(
    ["Sprzedaż netto, 4 tygodnie", "Regiony z reklamą (A)", "Regiony bez reklamy (B)"],
    [
      ["Przed testem", zl(t.przedA), zl(t.przedB)],
      ["W czasie testu", zl(t.testA), zl(t.testB)],
      ["Zmiana", zlZnak(t.testA - t.przedA), zlZnak(t.testB - t.przedB)],
      ["**Sprzedaż dzięki reklamie**", `**${zl(w.przyrost)}**`, "–"],
      ["Wydatki na reklamę w regionach A", zl(t.wydatki), "0 zł"],
      [
        "**ROAS przyrostowy (bez VAT)**",
        `**${liczba(w.iroas, 1)}**`,
        `w panelu: ${liczba(t.roasPanel, 1)} (z VAT)`,
      ],
    ],
    { klasa: "tbl--liczby", komorka: (k, wi, i) => (wi === 5 && i === 1 ? "zle" : null) },
  );
}

const BLOKI = { prog: tabelaProgu, miesiac: tabelaMiesiaca, test: tabelaTestu };

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
  const z = liczMiesiac();
  const w = testGeo(TEST);
  console.log(
    `\nMiesiąc: MER ${liczba(z.mer, 2)}, zysk po reklamie ${zl(z.zyskPo)}, panele przypisują ${proc(z.udzialPrzypisanych)} sprzedaży.` +
      `\nTest: oczekiwana sprzedaż A ${zl(w.oczekiwanaA)}, przyrost ${zl(w.przyrost)}, ROAS przyrostowy ${liczba(w.iroas, 2)} (próg bez VAT przy marży 40%: ${liczba(progRoas(0.4))}).`,
  );
}
