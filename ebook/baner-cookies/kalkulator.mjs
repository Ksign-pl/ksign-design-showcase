// Liczy liczby do tabel w e-booku „Baner cookies, który nie zabija danych.”, żeby nie wpisywać ich ręcznie.
// Ile konwersji widzisz przy danym odsetku zgód, czy sklep spełni progi modelowania Google i ilu odwiedzających
// potrzebuje test banera.
// Użycie:
//   node ebook/baner-cookies/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/baner-cookies/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa -->
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

// ---------- założenia przykładu ----------

export const DNI_W_MIESIACU = 365 / 12;
export const ZGODY = [0.4, 0.6, 0.8]; // odsetek odwiedzających, którzy zgadzają się na pliki cookie
// Google: osoby, które zgadzają się na cookies, są zwykle 2–5 razy bardziej skłonne do konwersji.
export const PRZEWAGI = [2, 3, 5];
// GA4: co najmniej 1000 użytkowników dziennie ze zgodą (analytics_storage='granted') przez 7 z 28 dni.
export const PROG_GA4 = 1000;
export const UZYTKOWNICY = [1000, 2000, 5000]; // użytkownicy dziennie
// Google Ads: modelowanie konwersji od 700 kliknięć reklamy w 7 dni na kraj i grupę domen.
export const PROG_ADS = 700;
export const CPC = [1, 1.5, 2.5]; // założenie: koszt kliknięcia w zł
// Test banera: o ile punktów procentowych chcesz podnieść odsetek zgód.
export const ROZNICE_PP = [0.03, 0.05, 0.1];

// ---------- wzory ----------

// Jaka część konwersji jest widoczna bez modelowania, gdy zgodę daje c odwiedzających,
// a osoby ze zgodą są r razy bardziej skłonne do konwersji.
export const widoczneKonwersje = (c, r) => (c * r) / (c * r + (1 - c));

// Liczebność każdej grupy przy porównaniu dwóch proporcji (test dwustronny, istotność 5%, moc 80%)
// – ten sam wzór co w poprzednich e-bookach serii.
export function wielkoscGrupy(p1, p2) {
  const z = 1.959964 + 0.841621;
  return Math.ceil((z * z * (p1 * (1 - p1) + p2 * (1 - p2))) / (p1 - p2) ** 2);
}

// ---------- formatowanie po polsku ----------

const zl = (x) => `${Math.round(x).toLocaleString("pl-PL").replace(/ /g, " ")} zł`;
const zlGr = (x) => `${x.toFixed(2).replace(".", ",")} zł`;
const liczba = (x) => Math.round(x).toLocaleString("pl-PL").replace(/ /g, " ");
const proc = (x, m = 0) => `${(x * 100).toFixed(m).replace(".", ",").replace(/,0+$/, "")}%`;

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

// Str. 10: ile sesji i konwersji widzisz bez modelowania.
function tabelaWidocznosci() {
  return tabela(
    [
      "Odsetek zgód",
      "Widoczne sesje",
      ...PRZEWAGI.map((r) => `Widoczne konwersje – przewaga ${r}×`),
    ],
    ZGODY.map((c) => [proc(c), proc(c), ...PRZEWAGI.map((r) => proc(widoczneKonwersje(c, r)))]),
    { klasa: "tbl--liczby" },
  );
}

// Str. 16: czy sklep spełni próg modelowania behawioralnego w GA4.
function tabelaProgowGa4() {
  return tabela(
    ["Użytkownicy dziennie", ...ZGODY.map((c) => `Zgoda ${proc(c)}`)],
    UZYTKOWNICY.map((u) => [
      liczba(u),
      ...ZGODY.map((c) => {
        const n = u * c;
        return n >= PROG_GA4 ? `**${liczba(n)} – wystarczy**` : `${liczba(n)} – za mało`;
      }),
    ]),
    { klasa: "tbl--liczby" },
  );
}

// Str. 16: jaki budżet daje 700 kliknięć reklamy w 7 dni.
function tabelaProgowAds() {
  return tabela(
    ["Koszt kliknięcia", "700 kliknięć w tygodniu", "Budżet miesięczny"],
    CPC.map((k) => [zlGr(k), zl(PROG_ADS * k), zl(((PROG_ADS * k) / 7) * DNI_W_MIESIACU)]),
    { klasa: "tbl--liczby" },
  );
}

// Str. 28: ilu odwiedzających w każdej wersji banera, żeby wykryć wzrost odsetka zgód.
function tabelaTestu() {
  return tabela(
    ["Odsetek zgód teraz", ...ROZNICE_PP.map((d) => `Wzrost o ${liczba(d * 100)} pkt proc.`)],
    ZGODY.map((c) => [
      proc(c),
      ...ROZNICE_PP.map((d) => (c + d < 1 ? `${liczba(wielkoscGrupy(c, c + d))} na wersję` : "–")),
    ]),
    { klasa: "tbl--liczby" },
  );
}

const BLOKI = {
  widocznosc: tabelaWidocznosci,
  progi_ga4: tabelaProgowGa4,
  progi_ads: tabelaProgowAds,
  test: tabelaTestu,
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
  console.log(
    `\nPrzykład Google: zgoda 50%, przewaga 4× → widać ${proc(widoczneKonwersje(0.5, 4))} konwersji.` +
      `\nGA4: przy zgodzie 60% próg 1000 użytkowników ze zgodą to ${liczba(PROG_GA4 / 0.6)} użytkowników dziennie.` +
      `\nTest banera 60% → 65%: ${liczba(wielkoscGrupy(0.6, 0.65))} odwiedzających na wersję.`,
  );
}
