// Liczy liczby do tabel w e-booku „Kreacja to nowe targetowanie.”, żeby nie wpisywać ich ręcznie.
// Faza uczenia się a budżet, ile wyświetleń i kliknięć potrzeba do testu kreacji, wyniki 4 kreacji.
// Przykład jak w poprzednich e-bookach serii: zamówienie 123 zł z VAT, marża 40% – zakup może kosztować najwyżej 40 zł.
// Użycie:
//   node ebook/kreacja-targetowanie/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/kreacja-targetowanie/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa -->
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

// ---------- założenia przykładu ----------

export const DNI_W_MIESIACU = 365 / 12;
export const WYNIKI_NAUKI = 50; // Meta: faza uczenia się kończy się zwykle po ok. 50 wynikach w tygodniu
export const BUDZETY = [3000, 6000, 10000]; // zł miesięcznie na jeden zestaw reklam
export const KOSZTY_ZAKUPU = [30, 40, 60, 90]; // CPA w zł
export const MAKS_CPA = 40; // zysk z zamówienia 123 zł przy marży 40% – próg z e-booka „ROAS kłamie.”
export const CPM = 25; // założenie: 25 zł za 1000 wyświetleń
export const CPC = 1.5; // założenie: 1,50 zł za kliknięcie linku

// Test: odsetek wyświetleń, które dały 3-sekundowe odtworzenie, i różnica, którą chcesz wykryć.
export const HAKI = [0.15, 0.25, 0.35];
export const ROZNICE_HAKU = [0.1, 0.2, 0.3];
// Test: odsetek kliknięć, które kończą się zakupem, i różnica, którą chcesz wykryć.
export const KONWERSJE = [0.01, 0.02, 0.03];
export const ROZNICE_ZAKUPU = [0.2, 0.3, 0.5];

// Wyniki 4 kreacji po 2 tygodniach – liczby umowne, pokazują sposób czytania.
export const KREACJE = [
  {
    nazwa: "Demo w 15 sekund",
    wydatki: 620,
    wyswietlenia: 24800,
    odtworzenia3s: 7440,
    klikniecia: 372,
    zakupy: 17,
  },
  {
    nazwa: "Opinia klienta",
    wydatki: 540,
    wyswietlenia: 21600,
    odtworzenia3s: 4320,
    klikniecia: 302,
    zakupy: 9,
  },
  {
    nazwa: "Założyciel mówi",
    wydatki: 480,
    wyswietlenia: 19200,
    odtworzenia3s: 6144,
    klikniecia: 173,
    zakupy: 8,
  },
  {
    nazwa: "Karuzela „3 powody”",
    wydatki: 360,
    wyswietlenia: 14400,
    odtworzenia3s: null,
    klikniecia: 245,
    zakupy: 6,
  },
];

// ---------- wzory ----------

// Ile zakupów w tygodniu da budżet miesięczny przy danym koszcie zakupu.
export const zakupyTygodniowo = (budzet, cpa) => (budzet * 7) / DNI_W_MIESIACU / cpa;
// Jaki budżet miesięczny daje 50 zakupów w tygodniu.
export const budzetNaNauke = (cpa) => (WYNIKI_NAUKI * cpa * DNI_W_MIESIACU) / 7;

// Liczebność każdej grupy przy porównaniu dwóch proporcji (test dwustronny, istotność 5%, moc 80%)
// – ten sam wzór co w e-bookach „Drugi zakup jest najtańszy.” i „Lista mailowa bez rabatu -10%.”.
export function wielkoscGrupy(p1, p2) {
  const z = 1.959964 + 0.841621;
  return Math.ceil((z * z * (p1 * (1 - p1) + p2 * (1 - p2))) / (p1 - p2) ** 2);
}

export function ocenKreacje(kreacje = KREACJE) {
  const suma = (k) => kreacje.reduce((s, x) => s + (x[k] ?? 0), 0);
  const wideo = kreacje.filter((x) => x.odtworzenia3s != null);
  const hakSredni =
    wideo.reduce((s, x) => s + x.odtworzenia3s, 0) / wideo.reduce((s, x) => s + x.wyswietlenia, 0);
  const ctrSredni = suma("klikniecia") / suma("wyswietlenia");
  return kreacje.map((x) => {
    const hak = x.odtworzenia3s == null ? null : x.odtworzenia3s / x.wyswietlenia;
    const ctr = x.klikniecia / x.wyswietlenia;
    const cpa = x.wydatki / x.zakupy;
    let decyzja;
    if (cpa <= MAKS_CPA) decyzja = "zostaw – zarabia";
    else if (hak != null && hak < hakSredni) decyzja = "zmień pierwsze 3 sekundy";
    else if (ctr < ctrSredni) decyzja = "zmień obietnicę i wezwanie";
    else decyzja = "sprawdź stronę produktu i ofertę";
    return { ...x, hak, ctr, cpa, decyzja, hakSredni, ctrSredni };
  });
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

// Str. 9: ile zakupów w tygodniu da budżet jednego zestawu reklam i ile trzeba na 50 zakupów.
function tabelaNauki() {
  const komorka = (b, cpa) => {
    const n = zakupyTygodniowo(b, cpa);
    return n >= WYNIKI_NAUKI ? `**${liczba(n)} – wystarczy**` : `${liczba(n)} – za mało`;
  };
  return tabela(
    [
      "Koszt zakupu",
      ...BUDZETY.map((b) => `${liczba(b)} zł/mies.`),
      "Budżet na 50 zakupów w tygodniu",
    ],
    KOSZTY_ZAKUPU.map((cpa) => [
      `${cpa} zł`,
      ...BUDZETY.map((b) => komorka(b, cpa)),
      `${zl(budzetNaNauke(cpa))}/mies.`,
    ]),
    { klasa: "tbl--liczby" },
  );
}

// Str. 26: ile wyświetleń na wariant, żeby wykryć różnicę w 3-sekundowych odtworzeniach.
function tabelaSygnalow() {
  return tabela(
    ["3-sekundowe odtworzenia", ...ROZNICE_HAKU.map((d) => `Różnica o ${proc(d)}`)],
    HAKI.map((p) => [
      `${proc(p)} wyświetleń`,
      ...ROZNICE_HAKU.map((d) => {
        const n = wielkoscGrupy(p, p * (1 + d));
        return `${liczba(n)} wyśw. · ${zl((n / 1000) * CPM)}`;
      }),
    ]),
    { klasa: "tbl--liczby" },
  );
}

// Str. 27: ile kliknięć na wariant, żeby wykryć różnicę w odsetku zakupów.
function tabelaZakupow() {
  return tabela(
    ["Zakupy na 100 kliknięć", ...ROZNICE_ZAKUPU.map((d) => `Różnica o ${proc(d)}`)],
    KONWERSJE.map((p) => [
      `${liczba(p * 100)} zakup${p === 0.01 ? "" : "y"}`,
      ...ROZNICE_ZAKUPU.map((d) => {
        const n = wielkoscGrupy(p, p * (1 + d));
        return `${liczba(n)} klik. · ${zl(n * CPC)}`;
      }),
    ]),
    { klasa: "tbl--liczby" },
  );
}

// Str. 30: wyniki 4 kreacji i decyzja.
function tabelaWynikow() {
  const w = ocenKreacje();
  const { hakSredni, ctrSredni } = w[0];
  const suma = (k) => KREACJE.reduce((s, x) => s + x[k], 0);
  return tabela(
    ["Kreacja", "Wydatki", "3-s odtworzenia", "CTR", "Zakupy", "Koszt zakupu", "Decyzja"],
    [
      ...w.map((x) => [
        x.nazwa,
        zl(x.wydatki),
        x.hak == null ? "–" : proc(x.hak),
        proc(x.ctr, 1),
        liczba(x.zakupy),
        zlGr(x.cpa),
        x.decyzja,
      ]),
      [
        "**Razem / średnio**",
        `**${zl(suma("wydatki"))}**`,
        `**${proc(hakSredni)}**`,
        `**${proc(ctrSredni, 1)}**`,
        `**${liczba(suma("zakupy"))}**`,
        `**${zlGr(suma("wydatki") / suma("zakupy"))}**`,
        `**próg: ${zl(MAKS_CPA)}**`,
      ],
    ],
    { klasa: "tbl--liczby" },
  );
}

const BLOKI = {
  nauka: tabelaNauki,
  sygnaly: tabelaSygnalow,
  zakupy: tabelaZakupow,
  wyniki: tabelaWynikow,
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
  const n = wielkoscGrupy(0.02, 0.026);
  console.log(
    `\nBudżet na 50 zakupów tygodniowo przy CPA ${MAKS_CPA} zł: ${zl(budzetNaNauke(MAKS_CPA))}/mies.` +
      `\nTest haka 25% → 30%: ${liczba(wielkoscGrupy(0.25, 0.3))} wyświetleń na wariant.` +
      `\nTest zakupów 2% → 2,6%: ${liczba(n)} kliknięć na wariant, ${zl(n * CPC)} przy CPC ${zlGr(CPC)}.`,
  );
}
