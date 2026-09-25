// Liczy liczby do tabel w e-booku „Lista mailowa bez rabatu -10%.”, żeby nie wpisywać ich ręcznie.
// Koszt kodu rabatowego za zapis, próg opłacalności zapisu bez rabatu, koszt zachęt i wielkość próby do testu A/B.
// Przykład jak w poprzednich e-bookach serii: zamówienie 123 zł z VAT (100 zł netto), marża 40% (40 zł zysku).
// Użycie:
//   node ebook/lista-bez-rabatu/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/lista-bez-rabatu/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa -->
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

const VAT = 0.23;

// ---------- założenia przykładu ----------

export const ZAMOWIENIE = { brutto: 123, marza: 0.4 }; // marża po kosztach zmiennych, od ceny netto
export const RABATY = [0.05, 0.1, 0.15, 0.2];
export const MARZE = [0.3, 0.4, 0.5];
export const KOSZYKI = [123, 246, 369];
export const ZACHETY = {
  dostawa: 10, // założenie: darmowa dostawa pierwszego zamówienia kosztuje sklep 10 zł netto (jak w e-booku #081)
  probka: 8, // założenie: próbka albo drobny prezent – 8 zł kosztu netto
};

// ---------- wzory ----------

const netto = (brutto) => brutto / (1 + VAT);

// Rabat procentowy od ceny z VAT zmniejsza przychód netto o ten sam procent.
export function zRabatem(brutto = ZAMOWIENIE.brutto, rabat = 0.1, marza = ZAMOWIENIE.marza) {
  const przychod = netto(brutto);
  const zysk = przychod * marza;
  const kosztRabatu = przychod * rabat;
  return { przychod, zysk, kosztRabatu, zyskPo: zysk - kosztRabatu };
}

// O ile musi wzrosnąć liczba zamówień z rabatem, żeby zysk się nie zmienił.
export const wzrostPotrzebny = (rabat, marza) => marza / (marza - rabat) - 1;

// Jaka część kupujących (w porównaniu z wersją z rabatem) wystarczy przy zapisie bez rabatu,
// żeby zarobić tyle samo: zysk bez rabatu × x = zysk z rabatem  →  x = (marża − rabat) ÷ marża.
export const progBezRabatu = (rabat, marza) => (marza - rabat) / marza;

// Liczba osób w każdej grupie testu A/B (istotność 5%, moc 80%) – ten sam wzór co w e-booku „Drugi zakup…”.
export function wielkoscGrupy(p1, p2) {
  const z = 1.959964 + 0.841621;
  return Math.ceil((z * z * (p1 * (1 - p1) + p2 * (1 - p2))) / (p1 - p2) ** 2);
}
export const BAZY = [0.05, 0.1, 0.2]; // odsetek zapisanych, którzy kupują w 30 dni
export const ROZNICE = [0.2, 0.3, 0.5]; // względna różnica, którą chcesz wykryć

// Kartka wartości zapisu: ten sam ruch w sklepie, dwie zachęty. Liczby umowne – pokazują metodę, nie rynek.
export const WARIANTY = [
  { nazwa: "Kod −10%", zapisy: 1000, kupuje: 0.1, rabat: 0.1 },
  { nazwa: "Poradnik, bez rabatu", zapisy: 700, kupuje: 0.12, rabat: 0 },
];

// Zysk z pierwszych zamówień w 30 dni od zapisu i zysk na jeden zapis.
export function wartoscZapisu({ zapisy, kupuje, rabat }, brutto = ZAMOWIENIE.brutto) {
  const r = zRabatem(brutto, rabat);
  const kupujacy = Math.round(zapisy * kupuje);
  const zysk = kupujacy * r.zyskPo;
  return { kupujacy, zyskPrzed: r.zysk, kosztZachety: r.kosztRabatu, zysk, naZapis: zysk / zapisy };
}

// ---------- formatowanie po polsku ----------

const zlGr = (x) => `${x < 0 ? "−" : ""}${Math.abs(x).toFixed(2).replace(".", ",")} zł`;
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

// Str. 5: ile kosztuje kod −10% na zamówieniu 123 zł.
function tabelaKodu() {
  const b = ZAMOWIENIE.brutto;
  const r = zRabatem(b, 0.1);
  return tabela(
    ["Zamówienie 123 zł", "Bez kodu", "Z kodem −10%"],
    [
      ["Klient płaci", zlGr(b), zlGr(b * 0.9)],
      ["Przychód netto", zlGr(r.przychod), zlGr(r.przychod - r.kosztRabatu)],
      ["Zysk przed rabatem (marża 40%)", zlGr(r.zysk), zlGr(r.zysk)],
      ["Koszt kodu", "0,00 zł", zlGr(-r.kosztRabatu)],
      ["**Zysk z zamówienia**", `**${zlGr(r.zysk)}**`, `**${zlGr(r.zyskPo)}**`],
      ["Część zysku, którą oddajesz", "–", proc(r.kosztRabatu / r.zysk)],
      [
        "Tyle więcej zamówień potrzebujesz z kodem",
        "–",
        `+${proc(wzrostPotrzebny(0.1, ZAMOWIENIE.marza))}`,
      ],
    ],
    { klasa: "tbl--liczby" },
  );
}

// Str. 7: jaka część kupujących wystarczy bez rabatu, żeby zarobić tyle samo.
function tabelaProgu() {
  return tabela(
    ["Rabat za zapis", ...MARZE.map((m) => `Marża ${proc(m)}`)],
    RABATY.map((r) => [
      `−${proc(r)}`,
      ...MARZE.map((m) => (r < m ? proc(progBezRabatu(r, m)) : "zawsze")),
    ]),
    { klasa: "tbl--liczby" },
  );
}

// Str. 11: koszt zachęty przy różnych koszykach – rabat rośnie z koszykiem, prezent i dostawa nie.
function tabelaZachet() {
  const wiersz = (nazwa, koszt) => [
    nazwa,
    ...KOSZYKI.map((k) => {
      const c = koszt(k);
      return `${zlGr(c)} (${proc(c / zRabatem(k).zysk)})`;
    }),
  ];
  return tabela(
    ["Zachęta · koszt netto (część zysku)", ...KOSZYKI.map((k) => `Koszyk ${liczba(k)} zł`)],
    [
      wiersz("Kod −10%", (k) => zRabatem(k, 0.1).kosztRabatu),
      wiersz("Darmowa dostawa pierwszego zamówienia", () => ZACHETY.dostawa),
      wiersz("Próbka albo prezent", () => ZACHETY.probka),
      wiersz("Poradnik albo lista oczekujących", () => 0),
    ],
    { klasa: "tbl--liczby" },
  );
}

// Str. 24: kartka A–G – wartość zapisu dla dwóch zachęt przy tym samym ruchu.
function tabelaWartosci() {
  const w = WARIANTY.map((v) => ({ ...v, ...wartoscZapisu(v) }));
  const wiersz = (nazwa, f) => [nazwa, ...w.map(f), ""];
  return tabela(
    ["Kartka wartości zapisu", ...w.map((v) => v.nazwa), "Twoje liczby"],
    [
      wiersz("A. Zapisy w miesiącu", (v) => liczba(v.zapisy)),
      wiersz("B. Kupuje w 30 dni od zapisu", (v) => proc(v.kupuje)),
      wiersz("C. Kupujący (A × B)", (v) => liczba(v.kupujacy)),
      wiersz("D. Zysk z zamówienia przed zachętą", (v) => zlGr(v.zyskPrzed)),
      wiersz("E. Koszt zachęty na zamówienie", (v) => zlGr(v.kosztZachety)),
      wiersz("**F. Zysk z pierwszych zamówień: C × (D − E)**", (v) => `**${zlGr(v.zysk)}**`),
      wiersz("G. Zysk na jeden zapis (F ÷ A)", (v) => zlGr(v.naZapis)),
    ],
    { klasa: "tbl--liczby tbl--kartka" },
  );
}

// Str. 25: ilu zapisanych potrzebujesz w każdej grupie testu A/B.
function tabelaProby() {
  return tabela(
    ["Kupuje w 30 dni (grupa A)", ...ROZNICE.map((d) => `Różnica o ${proc(d)}`)],
    BAZY.map((p) => [
      `${proc(p)} zapisanych`,
      ...ROZNICE.map((d) => `${liczba(wielkoscGrupy(p, p * (1 + d)))} na grupę`),
    ]),
    { klasa: "tbl--liczby" },
  );
}

const BLOKI = {
  kod: tabelaKodu,
  prog: tabelaProgu,
  zachety: tabelaZachet,
  wartosc: tabelaWartosci,
  proba: tabelaProby,
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
    `\nKod −10%: próg bez rabatu ${proc(progBezRabatu(0.1, 0.4))} kupujących, wzrost potrzebny z kodem +${proc(wzrostPotrzebny(0.1, 0.4))}.` +
      `\nTest A/B przy 10% kupujących i różnicy 30%: ${liczba(wielkoscGrupy(0.1, 0.13))} osób na grupę.`,
  );
}
