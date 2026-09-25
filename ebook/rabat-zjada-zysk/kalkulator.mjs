// Liczy wszystkie liczby do tabel i przykładów w e-booku „Rabat zjada zysk.”, żeby nie wpisywać ich ręcznie.
// Użycie:
//   node ebook/rabat-zjada-zysk/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/rabat-zjada-zysk/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa --> w pliku
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu w src/strony/)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

// ---------- wzory ----------

// Ile więcej sztuk trzeba sprzedać, żeby rabat nie obniżył zysku (ułamek: 1 = +100%).
// marza – zysk ze sztuki po kosztach zmiennych jako ułamek ceny netto; rabat – ułamek ceny.
// Zwraca null, gdy rabat zjada całą marżę (każda sztuka bez zysku albo ze stratą).
export function progSprzedazy(marza, rabat) {
  return rabat < marza ? rabat / (marza - rabat) : null;
}

// Największy rabat, przy którym spodziewany wzrost sprzedaży (ułamek) utrzyma zysk.
export function maksymalnyRabat(marza, wzrost) {
  return (marza * wzrost) / (1 + wzrost);
}

// Rabat liczony od najniższej ceny z 30 dni przed obniżką (art. 4 ust. 2 ustawy o informowaniu o cenach).
export function obnizkaOdNajnizszej(najnizsza30, cenaPromocyjna) {
  return 1 - cenaPromocyjna / najnizsza30;
}

// ---------- formatowanie po polsku ----------

const zl = (x) => `${Math.round(x).toLocaleString("pl-PL").replace(/ /g, " ")} zł`;
const proc = (x, miejsca = 0) =>
  `${(x * 100).toFixed(miejsca).replace(".", ",").replace(/,0+$/, "")}%`;
// Zaokrąglenie w dół z poprawką na błąd zmiennoprzecinkowy (0,3 × 0,5 ÷ 1,5 = 0,0999…).
const wDol = (x, krok = 0.01) => Math.floor(x / krok + 1e-9) * krok;

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
      .replace(/\*\*(.+?)\*\*/g, "<b>$1</b>")
      .replace(/^……… ?(.*)$/, '<span class="wpis"></span>$1');
  const klasaKomorki = (k, w, i) => {
    const klasy = [sklad.komorka?.(k, w, i), /^………/.test(k) ? "pole" : null].filter(Boolean);
    return klasy.length ? ` class="${klasy.join(" ")}"` : "";
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

const VAT = 0.23;

// Przykład prowadzący przez rozdziały 01–02: fotel sprzedawany we własnym sklepie.
const fotel = {
  brutto: 1230,
  towar: 480,
  dostawa: 70,
  obsluga: 50, // płatność, opakowanie, obsługa zamówienia – w uproszczeniu stała kwota
  reklama: 100, // koszt reklamy na 1 zamówienie
  rabat: 0.2,
};

function przykladFotel() {
  const netto = fotel.brutto / (1 + VAT);
  const koszty = fotel.towar + fotel.dostawa + fotel.obsluga;
  const scen = [0, fotel.rabat].map((r) => {
    const n = netto * (1 - r);
    const zysk = n - koszty;
    return { brutto: fotel.brutto * (1 - r), netto: n, zysk, poReklamie: zysk - fotel.reklama };
  });
  const [a, b] = scen;
  const spadek = (x, y) => ` (−${proc(1 - y / x)})`;
  return tabela(
    ["Na 1 zamówienie", "Cena regularna", `Black Friday −${proc(fotel.rabat)}`],
    [
      ["Cena brutto", zl(a.brutto), zl(b.brutto)],
      ["Cena netto (bez 23% VAT)", zl(a.netto), zl(b.netto)],
      ["Towar", `−${zl(fotel.towar)}`, `−${zl(fotel.towar)}`],
      ["Dostawa do klienta", `−${zl(fotel.dostawa)}`, `−${zl(fotel.dostawa)}`],
      ["Płatność, opakowanie, obsługa", `−${zl(fotel.obsluga)}`, `−${zl(fotel.obsluga)}`],
      ["**Zysk ze sztuki**", `**${zl(a.zysk)}**`, `**${zl(b.zysk)}**${spadek(a.zysk, b.zysk)}`],
      ["Reklama na 1 zamówienie", `−${zl(fotel.reklama)}`, `−${zl(fotel.reklama)}`],
      [
        "**Zysk po reklamie**",
        `**${zl(a.poReklamie)}**`,
        `**${zl(b.poReklamie)}**${spadek(a.poReklamie, b.poReklamie)}`,
      ],
      ["Zamówień, żeby zarobić tyle samo", "1", String(Math.round(a.poReklamie / b.poReklamie))],
    ],
    { klasa: "tbl--liczby tbl--fotel" },
  );
}

const MARZE = [0.2, 0.25, 0.3, 0.35, 0.4, 0.5, 0.6];
const RABATY = [0.05, 0.1, 0.15, 0.2, 0.25, 0.3];

function tabelaProgu() {
  return tabela(
    ["Marża", ...RABATY.map((r) => `−${proc(r)}`)],
    MARZE.map((m) => [
      proc(m),
      ...RABATY.map((r) => {
        const p = progSprzedazy(m, r);
        if (p === null) return Math.abs(r - m) < 1e-9 ? "zero" : "strata";
        return `+${proc(p)}`;
      }),
    ]),
    {
      klasa: "tbl--siatka",
      // komórka z przykładu w tekście: marża 30%, rabat 20% → +200%
      komorka: (k, w, i) =>
        k === "strata" || k === "zero"
          ? "zle"
          : MARZE[w] === 0.3 && RABATY[i - 1] === 0.2
            ? "hit"
            : null,
    },
  );
}

const WZROSTY = [0.1, 0.25, 0.5, 1];

function tabelaMaksymalnegoRabatu() {
  return tabela(
    ["Marża", ...WZROSTY.map((w) => `wzrost +${proc(w)}`)],
    [0.2, 0.3, 0.4, 0.5, 0.6].map((m) => [
      proc(m),
      ...WZROSTY.map((w) => `${proc(wDol(maksymalnyRabat(m, w)))}`),
    ]),
    {
      klasa: "tbl--siatka",
      // przykład w tekście: marża 30%, wzrost +50% → najwyżej 10%
      komorka: (k, w, i) =>
        [0.2, 0.3, 0.4, 0.5, 0.6][w] === 0.3 && WZROSTY[i - 1] === 0.5 ? "hit" : null,
    },
  );
}

// Oś czasu: tydzień promocji przed Black Friday, a potem większy rabat w piątek.
// Daty 2026: Black Friday 27.11 (piątek po czwartym czwartku listopada), Cyber Monday 30.11.
const os = { regularna: 200, blackWeek: 160, blackFriday: 140 };

function tabelaOsiCzasu() {
  const bw = obnizkaOdNajnizszej(os.regularna, os.blackWeek);
  const bf = obnizkaOdNajnizszej(os.blackWeek, os.blackFriday);
  const bfOdRegularnej = obnizkaOdNajnizszej(os.regularna, os.blackFriday);
  return tabela(
    ["Termin", "Cena", "Najniższa cena z 30 dni przed obniżką", "Obniżka, którą pokazujesz"],
    [
      ["do 19.11", zl(os.regularna), "–", "–"],
      [
        "20–26.11 (Black Week)",
        zl(os.blackWeek),
        `${zl(os.regularna)} (21.10–19.11)`,
        `−${proc(bw)}`,
      ],
      [
        "od 27.11 (Black Friday)",
        zl(os.blackFriday),
        `${zl(os.blackWeek)} (28.10–26.11)`,
        `−${proc(bf, 1)}, nie −${proc(bfOdRegularnej)}`,
      ],
    ],
    { klasa: "tbl--os", komorka: (k, w, i) => (w === 2 && i === 3 ? "hit" : null) },
  );
}

// Drugi przykład (rozdział 05): poduszka dekoracyjna – prezent do fotela i produkt w promocji „3 w cenie 2”.
const poduszka = {
  brutto: 123,
  towar: 35,
  obsluga: 5, // pakowanie i obsługa jednej sztuki
  wysylka: 15, // koszt wysyłki jednego zamówienia po stronie sklepu
};

// Kwota w złotych z groszami tylko wtedy, gdy nie jest pełna (98,40 zł, ale 246 zł).
const zlGr = (x) =>
  Math.abs(x - Math.round(x)) < 0.005 ? zl(x) : `${x.toFixed(2).replace(".", ",")} zł`;

function tabelaPrezentu() {
  const netto = fotel.brutto / (1 + VAT);
  const zysk = netto - (fotel.towar + fotel.dostawa + fotel.obsluga);
  const kosztRabatu = netto * fotel.rabat;
  const kosztPrezentu = poduszka.towar + poduszka.obsluga; // jedzie w tej samej paczce
  const zRabatem = zysk - kosztRabatu;
  const zPrezentem = zysk - kosztPrezentu;
  return tabela(
    [
      "Na 1 zamówienie fotela",
      "Cena regularna",
      `Rabat −${proc(fotel.rabat)}`,
      "Prezent: poduszka",
    ],
    [
      [
        "Co dostaje klient",
        "–",
        `${zl(fotel.brutto * fotel.rabat)} taniej`,
        `poduszkę wartą ${zl(poduszka.brutto)}`,
      ],
      ["Koszt dla sklepu (netto)", "–", zl(kosztRabatu), zl(kosztPrezentu)],
      ["**Zysk ze sztuki**", `**${zl(zysk)}**`, `**${zl(zRabatem)}**`, `**${zl(zPrezentem)}**`],
      [
        "Potrzebny wzrost sprzedaży",
        "–",
        `+${proc(zysk / zRabatem - 1)}`,
        `+${proc(zysk / zPrezentem - 1)}`,
      ],
    ],
    { klasa: "tbl--liczby tbl--prezent", komorka: (k, w, i) => (i === 3 && w >= 2 ? "hit" : null) },
  );
}

function tabelaTrzyWCenieDwoch() {
  const netto = poduszka.brutto / (1 + VAT);
  const wariant = (nazwa, sztuk, placone, rabat = 0) => {
    const przychod = netto * placone * (1 - rabat);
    const koszty = sztuk * (poduszka.towar + poduszka.obsluga) + poduszka.wysylka;
    return [
      nazwa,
      zlGr(poduszka.brutto * placone * (1 - rabat)),
      zl(przychod),
      zl(przychod - koszty),
    ];
  };
  return tabela(
    ["Zamówienie", "Klient płaci", "Przychód netto", "Zysk z zamówienia"],
    [
      wariant("1 szt. w cenie regularnej", 1, 1),
      wariant(`1 szt. z rabatem −${proc(fotel.rabat)}`, 1, 1, fotel.rabat),
      wariant("**3 szt. w cenie 2**", 3, 2),
      wariant("3 szt. w cenie regularnej", 3, 3),
    ],
    { klasa: "tbl--liczby" },
  );
}

// Próg ROAS: wartość konwersji w panelu reklamowym = cena brutto zamówienia.
const ROAS_PRZYKLAD = 4;

function tabelaRoas() {
  const netto = fotel.brutto / (1 + VAT);
  const koszty = fotel.towar + fotel.dostawa + fotel.obsluga;
  const scen = [0, fotel.rabat].map((r) => {
    const brutto = fotel.brutto * (1 - r);
    const zysk = netto * (1 - r) - koszty;
    return { brutto, zysk, prog: brutto / zysk, przyRoas: zysk - brutto / ROAS_PRZYKLAD };
  });
  const znak = (x) => (x >= 0 ? `+${zl(x)}` : `−${zl(-x)}`);
  const roas = (x) => x.toFixed(2).replace(".", ",");
  return tabela(
    ["Na 1 zamówienie fotela", "Cena regularna", `Black Friday −${proc(fotel.rabat)}`],
    [
      ["Cena brutto = wartość konwersji", ...scen.map((s) => zl(s.brutto))],
      ["Zysk ze sztuki przed reklamą", ...scen.map((s) => zl(s.zysk))],
      ["Maksymalny koszt reklamy na zamówienie", ...scen.map((s) => zl(s.zysk))],
      ["**Próg ROAS** = cena brutto ÷ zysk", ...scen.map((s) => `**${roas(s.prog)}**`)],
      [`Zysk po reklamie przy ROAS ${ROAS_PRZYKLAD}`, ...scen.map((s) => znak(s.przyRoas))],
    ],
    { klasa: "tbl--liczby", komorka: (k) => (/^−\d/.test(k) && k.endsWith("zł") ? "zle" : null) },
  );
}

// Kalkulator na kartce (rozdział 02): wiersze A–J, kolumna „Przykład” z założeń fotela.
// J – przykładowy realny wzrost (zeszłoroczny Black Friday), założenie do tekstu na str. 11.
const REALNY_WZROST = 0.8;

function kalkulatorNaKartce() {
  const A = fotel.brutto / (1 + VAT);
  const B = fotel.towar;
  const C = fotel.dostawa + fotel.obsluga;
  const D = 0;
  const E = fotel.reklama;
  const F = A - B - C - D - E;
  const G = F / A;
  const Hr = fotel.rabat;
  const I = progSprzedazy(G, Hr);
  return tabela(
    ["", "Wzór", "Twoje liczby", "Przykład"],
    [
      ["A", "Cena netto = cena brutto ÷ 1,23", "……… zł", zl(A)],
      ["B", "Koszt towaru (netto)", "……… zł", zl(B)],
      ["C", "Dostawa, płatność, opakowanie, obsługa", "……… zł", zl(C)],
      ["D", "Prowizja marketplace od ceny regularnej", "……… zł", zl(D)],
      ["E", "Reklama na 1 zamówienie", "……… zł", zl(E)],
      ["F", "Zysk z zamówienia = A − B − C − D − E", "……… zł", zl(F)],
      ["G", "Marża = F ÷ A", "……… %", proc(G)],
      ["H", "Planowany rabat", "……… %", proc(Hr)],
      ["I", "Potrzebny wzrost sprzedaży = H ÷ (G − H)", "……… %", `+${proc(I)}`],
      ["J", "Realny wzrost: zeszły rok, ruch, stany magazynu", "……… %", `+${proc(REALNY_WZROST)}`],
    ],
    { klasa: "tbl--kartka", komorka: (k, w, i) => (i === 0 ? "lit" : null) },
  );
}

const BLOKI = {
  kartka: kalkulatorNaKartce,
  fotel: przykladFotel,
  prog: tabelaProgu,
  "maks-rabat": tabelaMaksymalnegoRabatu,
  "os-czasu": tabelaOsiCzasu,
  prezent: tabelaPrezentu,
  "trzy-w-cenie-dwoch": tabelaTrzyWCenieDwoch,
  roas: tabelaRoas,
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
  const k = 0.1;
  console.log(
    `\nRabat 20% przy prowizji ${proc(k)} kosztuje ${proc(0.2 * (1 - k))} ceny ` +
      `(wzrost sprzedaży przy marży 40%: +${proc((0.2 * (1 - k)) / (0.4 - 0.2 * (1 - k)))}).`,
  );
}
