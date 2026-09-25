// Liczy wszystkie liczby do tabel i przykładów w e-booku „Drugi zakup jest najtańszy.”, żeby nie wpisywać ich ręcznie.
// Użycie:
//   node ebook/drugi-zakup/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/drugi-zakup/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa --> w pliku
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

// ---------- wzory ----------

// Próg powrotów: jaka część nowych klientów musi kupić drugi raz, żeby pierwsze i drugie zamówienia
// razem pokryły koszt pozyskania. strataNaPierwszym – na 1 klienta (zł, dodatnia), kosztWiadomosci –
// na 1 klienta, zyskZDrugiego – zysk z 1 drugiego zamówienia (zł).
export function progPowrotow(strataNaPierwszym, kosztWiadomosci, zyskZDrugiego) {
  return (strataNaPierwszym + kosztWiadomosci) / zyskZDrugiego;
}

// Mediana i kwartyle (interpolacja liniowa) – do cyklu zakupowego z własnych danych.
export function kwantyl(dane, q) {
  const s = [...dane].sort((a, b) => a - b);
  const poz = (s.length - 1) * q;
  const d = Math.floor(poz);
  return s[d] + (s[Math.min(d + 1, s.length - 1)] - s[d]) * (poz - d);
}

// Długość SMS według zasad SMSAPI (regulamin z 10.11.2024): bez znaków spoza alfabetu GSM – 160 znaków
// w 1 SMS, 153 na część; z choćby jednym (np. „ą”) – 70 i 67. Znaki ^ { } [ ] ~ \ | € i „enter” liczą się
// podwójnie.
const GSM =
  "@£$¥èéùìòÇØøÅå_ÆæßÉ!\"#¤%&'()*+,-./:;<=>?0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
  "abcdefghijklmnopqrstuvwxyzÄÖÑÜ§¿äöñüà ";
const GSM_PODWOJNE = "^{}[]~\\|€\n";

export function sms(tekst) {
  const znaki = [...tekst];
  const gsm = znaki.every((z) => GSM.includes(z) || GSM_PODWOJNE.includes(z));
  const dlugosc = gsm
    ? znaki.reduce((n, z) => n + (GSM_PODWOJNE.includes(z) ? 2 : 1), 0)
    : znaki.length;
  const [jeden, czesc] = gsm ? [160, 153] : [70, 67];
  return { gsm, dlugosc, czesci: dlugosc <= jeden ? 1 : Math.ceil(dlugosc / czesc) };
}

// Ilu klientów potrzebujesz w każdej grupie (z automatem i kontrolnej), żeby różnica w odsetku
// powrotów była wiarygodna: test dwustronny, poziom istotności 5%, moc 80%.
export function wielkoscGrupy(p1, p2) {
  const z = 1.959964 + 0.841621;
  return Math.ceil((z * z * (p1 * (1 - p1) + p2 * (1 - p2))) / (p1 - p2) ** 2);
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

// Kwota ze znakiem: „+40 zł”, „−15 zł” (typograficzny minus).
const zlZnak = (x) => (Math.round(x) >= 0 ? `+${zl(x)}` : `−${zl(-x)}`);

// ---------- tabele ----------

const VAT = 0.23;

// Przykład prowadzący: sklep z kosmetykami do pielęgnacji, zamówienie z kremem i serum.
// Założenia do przykładu, nie benchmark.
const zamowienie = {
  brutto: 123, // 100 zł netto – okrągłe liczby, żeby czytelnik mógł przeliczyć sam
  towar: 35, // koszt zakupu towaru (netto)
  wysylka: 18, // pakowanie i wysyłka
  obsluga: 7, // płatność i obsługa zamówienia
  pozyskanie: 55, // koszt reklamy na 1 nowego klienta
};
// Koszt wiadomości w automatach: 2 SMS na klienta po 0,15 zł (SMSAPI: 0,11–0,17 zł netto), e-mail
// w abonamencie platformy – bez kosztu na wiadomość.
const SMS = { cena: 0.15, naKlienta: 2 };

function liczZamowienie() {
  const netto = zamowienie.brutto / (1 + VAT);
  const zysk = netto - (zamowienie.towar + zamowienie.wysylka + zamowienie.obsluga);
  const pierwsze = zysk - zamowienie.pozyskanie;
  const wiadomosci = SMS.cena * SMS.naKlienta;
  return { netto, zysk, pierwsze, wiadomosci, drugie: zysk };
}

function tabelaZamowien() {
  const z = liczZamowienie();
  return tabela(
    ["Na 1 zamówienie", "Pierwsze zamówienie", "Drugie zamówienie"],
    [
      ["Cena brutto", zl(zamowienie.brutto), zl(zamowienie.brutto)],
      ["Cena netto (bez 23% VAT)", zl(z.netto), zl(z.netto)],
      [
        "Towar, wysyłka, płatność i obsługa",
        `−${zl(zamowienie.towar + zamowienie.wysylka + zamowienie.obsluga)}`,
        `−${zl(zamowienie.towar + zamowienie.wysylka + zamowienie.obsluga)}`,
      ],
      ["**Zysk przed reklamą**", `**${zl(z.zysk)}**`, `**${zl(z.zysk)}**`],
      ["Reklama, żeby klient kupił", `−${zl(zamowienie.pozyskanie)}`, "0 zł (automat)"],
      ["**Wynik zamówienia**", `**${zlZnak(z.pierwsze)}**`, `**${zlZnak(z.drugie)}**`],
    ],
    {
      klasa: "tbl--liczby",
      komorka: (k, w, i) => (w === 5 && i === 1 ? "zle" : w === 5 && i === 2 ? "hit" : null),
    },
  );
}

const POWROTY = [0.1, 0.2, 0.3, 0.4, 0.5];

function tabelaScenariuszy() {
  const z = liczZamowienie();
  const pierwsze = 100 * z.pierwsze;
  const wiadomosci = 100 * z.wiadomosci;
  return tabela(
    [
      "Kupiło drugi raz",
      "Pierwsze zamówienia",
      "Wiadomości",
      "Drugie zamówienia",
      "Wynik na 100 klientach",
    ],
    POWROTY.map((p) => {
      const drugie = p * 100 * z.drugie;
      const wynik = pierwsze - wiadomosci + drugie;
      return [
        `${Math.round(p * 100)} na 100`,
        zlZnak(pierwsze),
        zlZnak(-wiadomosci),
        zlZnak(drugie),
        `**${zlZnak(wynik)}**`,
      ];
    }),
    {
      klasa: "tbl--liczby",
      komorka: (k, w, i) => (i === 4 ? (k.includes("−") ? "zle" : "hit") : null),
    },
  );
}

// Cykl zakupowy: dni między pierwszym a drugim zamówieniem u 11 klientów (przykład).
const DNI_DO_DRUGIEGO = [19, 23, 26, 28, 30, 33, 35, 37, 41, 47, 62];

function tabelaCyklu() {
  const med = kwantyl(DNI_DO_DRUGIEGO, 0.5);
  const q1 = kwantyl(DNI_DO_DRUGIEGO, 0.25);
  const q3 = kwantyl(DNI_DO_DRUGIEGO, 0.75);
  const dni = (x) => `${Math.round(x)}. dzień`;
  return tabela(
    ["Miara", "Wynik", "Co z tym zrobić"],
    [
      ["Pierwszy kwartyl (25% klientów kupiło do tego dnia)", dni(q1), "Nie przypominaj wcześniej"],
      [
        "**Mediana (połowa klientów kupiła do tego dnia)**",
        `**${dni(med)}**`,
        `Przypomnienie 1: ${dni(med - 3)}`,
      ],
      ["Trzeci kwartyl (75% klientów)", dni(q3), `Przypomnienie 2: ${dni(q3)}`],
    ],
    { klasa: "tbl--cykl" },
  );
}

function tabelaSms() {
  const zakres = (czesci) => `${Math.round(110 * czesci)}–${zl(170 * czesci)}`;
  const przyklad = sms(`Kończy się krem? ${"x".repeat(103)}`);
  return tabela(
    ["Wiadomość", "Znaków w 1 SMS", "Koszt 1000 wysyłek (SMSAPI, netto)"],
    [
      ["Bez polskich znaków", "160", zakres(1)],
      ["Z choćby jedną literą „ą”, „ę”, „ś”…", "70", zakres(1)],
      ["Dłuższa, sklejana z części", "153 bez polskich znaków, 67 z nimi", "cena × liczba części"],
      [
        `**Przykład: ${przyklad.dlugosc} znaków z literą „ę”**`,
        `**${przyklad.czesci} części**`,
        `**${zakres(przyklad.czesci)}**`,
      ],
    ],
    { klasa: "tbl--sms" },
  );
}

// Gotowe SMS-y ze str. 30 – liczba znaków i części liczona, nie wpisywana ręcznie.
export const SMS_PRZYKLADY = [
  [
    "Dostępność",
    "TwojSklep: krem Nawilzajacy 50 ml znow jest dostepny. Zamow: twojsklep.pl/k/a1 Rezygnacja z SMS: twojsklep.pl/stop",
  ],
  [
    "Uzupełnienie",
    "TwojSklep: konczy sie krem Nawilzajacy? Zamow ponownie, wyslemy w 24 h: twojsklep.pl/k/b2 Rezygnacja z SMS: twojsklep.pl/stop",
  ],
  [
    "Porzucony koszyk",
    "TwojSklep: krem Nawilzajacy czeka w koszyku. Dokoncz zamowienie: twojsklep.pl/k/c3 Rezygnacja z SMS: twojsklep.pl/stop",
  ],
  [
    "Uzupełnienie z polskimi literami",
    "TwójSklep: kończy się krem Nawilżający? Zamów ponownie, wyślemy w 24 h: twojsklep.pl/k/b2 Rezygnacja z SMS: twojsklep.pl/stop",
  ],
];

function tabelaSmsPrzykladow() {
  return tabela(
    ["SMS", "Znaków", "Części", "Koszt 1000 wysyłek przy 0,15 zł"],
    SMS_PRZYKLADY.map(([nazwa, tekst]) => {
      const m = sms(tekst);
      return [nazwa, String(m.dlugosc), String(m.czesci), zl(1000 * SMS.cena * m.czesci)];
    }),
    { klasa: "tbl--liczby", komorka: (k, w, i) => (i === 2 && Number(k) > 1 ? "zle" : null) },
  );
}

// Grupa kontrolna: ilu klientów trzeba w każdej grupie, żeby zobaczyć różnicę w powrotach.
const TESTY = [
  [0.2, 0.3],
  [0.3, 0.4],
  [0.3, 0.35],
];

function tabelaProby() {
  const naSto = (p) => `${Math.round(p * 100)} na 100`;
  return tabela(
    ["Powroty bez automatu", "Z automatem", "Różnica", "Klientów w każdej grupie"],
    TESTY.map(([p1, p2]) => [
      naSto(p1),
      naSto(p2),
      `${Math.round((p2 - p1) * 100)} pkt proc.`,
      `ok. ${(Math.ceil(wielkoscGrupy(p1, p2) / 10) * 10).toLocaleString("pl-PL").replace(/ /g, " ")}`,
    ]),
    { klasa: "tbl--liczby" },
  );
}

// Rabat na drugie zamówienie: ile zostaje z drugiego zamówienia i jak rośnie próg powrotów.
const RABATY = [0, 0.1, 0.15, 0.2];

function tabelaRabatuNaDrugi() {
  const z = liczZamowienie();
  return tabela(
    ["Rabat na drugie zamówienie", "Zysk z drugiego zamówienia", "Próg powrotów"],
    RABATY.map((r) => {
      const zysk = z.drugie - z.netto * r;
      const prog = progPowrotow(-z.pierwsze, z.wiadomosci, zysk);
      return [
        r === 0 ? "bez rabatu" : `−${proc(r)}`,
        zl(zysk),
        `${Math.round(prog * 100)} na 100 klientów`,
      ];
    }),
    { klasa: "tbl--liczby", komorka: (k, w, i) => (w === 0 && i > 0 ? "hit" : null) },
  );
}

const BLOKI = {
  zamowienia: tabelaZamowien,
  scenariusze: tabelaScenariuszy,
  cykl: tabelaCyklu,
  sms: tabelaSms,
  "rabat-na-drugi": tabelaRabatuNaDrugi,
  "sms-przyklady": tabelaSmsPrzykladow,
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
  const z = liczZamowienie();
  console.log(
    `\nZysk przed reklamą: ${zl(z.zysk)} (marża ${proc(z.zysk / z.netto)}). Pierwsze zamówienie: ${zlZnak(z.pierwsze)}.` +
      `\nPróg powrotów: ${proc(progPowrotow(-z.pierwsze, z.wiadomosci, z.drugie))} nowych klientów musi kupić drugi raz.` +
      `\nRabat −10% na drugie zamówienie opłaca się, jeśli zwiększy liczbę powrotów o ponad ${proc(z.drugie / (z.drugie - z.netto * 0.1) - 1)}.`,
  );
}
