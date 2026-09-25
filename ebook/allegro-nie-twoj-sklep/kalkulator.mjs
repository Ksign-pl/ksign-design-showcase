// Liczy wszystkie liczby do tabel i przykładów w e-booku „Allegro to nie twój sklep.”, żeby nie wpisywać ich
// ręcznie. Stawki Allegro: Regulamin Allegro obowiązujący od 5.05.2026 (załącznik nr 4) i stawki prowizji od
// 2.03.2026. Płatności w sklepie: tabela prowizji Przelewy24. Stan na 25.09.2026.
// Użycie:
//   node ebook/allegro-nie-twoj-sklep/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/allegro-nie-twoj-sklep/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa -->
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

const VAT = 0.23;

// ---------- stawki Allegro (allegro.pl, konto firmowe) ----------

export const ALLEGRO = {
  // Dom i Ogród → Oświetlenie: 11% (stawki od 2.03.2026). Stawka netto, liczona od ceny z VAT
  // i od dostawy, jeśli płaci za nią kupujący (w Smart! dostawa jest dla kupującego bezpłatna).
  prowizja: 0.11,
  prowizjaDo2025: 0.105, // Oświetlenie przed zmianą cennika 3.03.2025 (10,5% → 11%)
  dodatkowaZaWyroznienie: 0.75, // dodatkowa prowizja: 0,75 prowizji podstawowej
  wyroznienieZa10Dni: 19.9, // zł brutto za ofertę, większość kategorii
  // Opłata sprzedającego za przesyłkę Smart! – Allegro Paczkomaty InPost, pierwsza paczka w zamówieniu
  // (załącznik nr 4, art. 15 ust. 2). Allegro Delivery (One, ORLEN, DHL, DPD) – kwoty brutto z pomocy Allegro.
  smart: [
    { od: 30, do: 44.99, netto: 1.29, brutto: 1.59, delivery: 0.99 },
    { od: 45, do: 64.99, netto: 2.59, brutto: 3.19, delivery: 1.99 },
    { od: 65, do: 99.99, netto: 4.22, brutto: 5.19, delivery: 3.69 },
    { od: 100, do: 149.99, netto: 6.41, brutto: 7.89, delivery: 6.19 },
    { od: 150, do: Infinity, netto: 8.12, brutto: 9.99, delivery: 7.99 },
  ],
};

// ---------- własny sklep ----------

export const SKLEP = {
  platnoscProc: 0.0129, // Przelewy24: przelew online, BLIK, karta – 1,29% + 0,30 zł
  platnoscStala: 0.3,
  wysylka: 10.0, // założenie: Paczkomat z umowy z przewoźnikiem, 12,30 zł brutto = 10 zł netto
  ponowneZamowienie: 1.0, // założenie: koszt newslettera lub SMS-a na jedno ponowne zamówienie
  pozyskanie: 55, // założenie: koszt reklamy na nowego klienta, jak w e-booku „Drugi zakup jest najtańszy.”
};

// Przykład: lampa stołowa za 123 zł z VAT (100 zł netto). Towar i pakowanie jak w e-booku o TikTok Shop.
export const PRODUKT = { nazwa: "lampa stołowa", cena: 123, towar: 35, pakowanie: 3 };

export const MIESIECZNIE = 1000; // zamówień z Allegro miesięcznie w przykładzie o podwyżkach

// ---------- wzory ----------

const grosze = (x) => Math.round(x * 100 + 1e-9) / 100;
const netto = (brutto) => brutto / (1 + VAT);

// Allegro zaokrągla prowizję w górę do pełnych groszy.
export const prowizja = (cena, stawka = ALLEGRO.prowizja) =>
  Math.ceil(cena * stawka * 100 - 1e-9) / 100;
export const dodatkowaProwizja = (cena, stawka = ALLEGRO.prowizja) =>
  Math.ceil(prowizja(cena, stawka) * ALLEGRO.dodatkowaZaWyroznienie * 100 - 1e-9) / 100;
export const progSmart = (wartosc) => ALLEGRO.smart.find((p) => wartosc >= p.od && wartosc <= p.do);
export const oplataSmart = (wartosc) => progSmart(wartosc)?.netto ?? 0;
export const platnosc = (kwota) => grosze(kwota * SKLEP.platnoscProc + SKLEP.platnoscStala);

// Koszty kanału na jednym zamówieniu (netto, bez towaru i pakowania – te są takie same w obu kanałach).
export const kosztyAllegro = (cena, { wyroznienie = false, stawka } = {}) =>
  grosze(
    prowizja(cena, stawka) +
      oplataSmart(cena) +
      (wyroznienie ? dodatkowaProwizja(cena, stawka) : 0),
  );
export const kosztySklepu = (cena) => grosze(platnosc(cena) + SKLEP.wysylka);

// Zysk z zamówienia przed kosztami stałymi (abonament, platforma, obsługa).
export function zysk({ kanal, cena = PRODUKT.cena, p = PRODUKT, wyroznienie = false, klient = 0 }) {
  const koszty = kanal === "allegro" ? kosztyAllegro(cena, { wyroznienie }) : kosztySklepu(cena);
  return grosze(netto(cena) - p.towar - p.pakowanie - koszty - klient);
}

// Ile najwyżej możesz zapłacić za nowego klienta w sklepie, żeby zarobić na nim tyle samo co na Allegro,
// jeśli kupi n razy w roku. Ponowne zamówienia w sklepie kosztują SKLEP.ponowneZamowienie.
export const progPozyskania = (cena, n) =>
  grosze(n * (kosztyAllegro(cena) - kosztySklepu(cena)) - (n - 1) * SKLEP.ponowneZamowienie);

// ---------- formatowanie po polsku ----------

const kwota = (x) =>
  grosze(Math.abs(x))
    .toFixed(2)
    .replace(".", ",")
    .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
const zl = (x) => `${Math.round(x).toLocaleString("pl-PL").replace(/ /g, " ")} zł`;
const zlGr = (x) => `${x < 0 ? "−" : ""}${kwota(x)} zł`;
const minus = (x) => `−${kwota(x)} zł`;
// Próg kwotowy: pełne złote bez groszy (30, 150), pozostałe z groszami (44,99).
const prog = (x) => (Number.isInteger(x) ? String(x) : kwota(x));
const proc = (x, m = 1) => `${(x * 100).toFixed(m).replace(".", ",").replace(/,0+$/, "")}%`;

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

const ujemna = (k) => (/^\**−/.test(k) ? "zle" : null);

// ---------- tabele ----------

// Str. 9: zamówienie 123 zł na Allegro.
function tabelaAllegro() {
  const c = PRODUKT.cena;
  const s = progSmart(c);
  const koszty = kosztyAllegro(c);
  return tabela(
    ["Zamówienie na Allegro", "Kwota", "Skąd ta liczba"],
    [
      ["Cena dla klienta", zlGr(c), "z VAT, dostawa w Smart! za 0 zł"],
      ["Przychód netto", zlGr(netto(c)), "bez 23% VAT"],
      [
        "Prowizja od sprzedaży",
        minus(prowizja(c)),
        `${proc(ALLEGRO.prowizja, 0)} od ${zl(c)} – Oświetlenie, stawka netto`,
      ],
      [
        "Opłata za przesyłkę Smart!",
        minus(s.netto),
        `${kwota(s.brutto)} zł brutto, zamówienie ${prog(s.od)}–${prog(s.do)} zł`,
      ],
      ["Towar", minus(PRODUKT.towar), "założenie"],
      ["Pakowanie", minus(PRODUKT.pakowanie), "założenie"],
      [
        "**Zysk z zamówienia**",
        `**${zlGr(zysk({ kanal: "allegro" }))}**`,
        "przed abonamentem i kosztami stałymi",
      ],
      ["Koszty Allegro razem", zlGr(koszty), `${proc(koszty / netto(c))} przychodu netto`],
    ],
    { klasa: "tbl--liczby" },
  );
}

// Str. 10: to samo zamówienie we własnym sklepie, klient przyszedł sam.
function tabelaSklepu() {
  const c = PRODUKT.cena;
  const roznica = kosztyAllegro(c) - kosztySklepu(c);
  return tabela(
    ["Zamówienie w Twoim sklepie", "Kwota", "Skąd ta liczba"],
    [
      ["Cena dla klienta", zlGr(c), "z VAT, darmowa dostawa jak w Smart!"],
      ["Przychód netto", zlGr(netto(c)), "bez 23% VAT"],
      [
        "Płatność online",
        minus(platnosc(c)),
        `Przelewy24: ${proc(SKLEP.platnoscProc, 2)} + ${kwota(SKLEP.platnoscStala)} zł`,
      ],
      ["Wysyłka do Paczkomatu", minus(SKLEP.wysylka), "założenie: 12,30 zł brutto z umowy"],
      ["Towar", minus(PRODUKT.towar), "założenie"],
      ["Pakowanie", minus(PRODUKT.pakowanie), "założenie"],
      [
        "**Zysk przed pozyskaniem klienta**",
        `**${zlGr(zysk({ kanal: "sklep" }))}**`,
        "przed platformą i kosztami stałymi",
      ],
      ["Różnica względem Allegro", `+${zlGr(roznica)}`, "tyle zostaje na pozyskanie klienta"],
    ],
    { klasa: "tbl--liczby" },
  );
}

// Str. 11: to samo zamówienie z 5 źródeł.
function tabelaKanalow() {
  const c = PRODUKT.cena;
  const wiersze = [
    ["Allegro, Smart!", kosztyAllegro(c), 0, zysk({ kanal: "allegro" })],
    [
      "Allegro, Smart! i Wyróżnienie",
      kosztyAllegro(c, { wyroznienie: true }),
      0,
      zysk({ kanal: "allegro", wyroznienie: true }),
    ],
    [
      "Sklep: nowy klient z reklamy",
      kosztySklepu(c),
      SKLEP.pozyskanie,
      zysk({ kanal: "sklep", klient: SKLEP.pozyskanie }),
    ],
    [
      "Sklep: klient z newslettera",
      kosztySklepu(c),
      SKLEP.ponowneZamowienie,
      zysk({ kanal: "sklep", klient: SKLEP.ponowneZamowienie }),
    ],
    ["Sklep: klient z wyszukiwania marki", kosztySklepu(c), 0, zysk({ kanal: "sklep" })],
  ];
  return tabela(
    ["Skąd przyszło zamówienie 123 zł", "Koszt kanału", "Koszt klienta", "Zysk z zamówienia"],
    wiersze.map(([nazwa, kanal, klient, z]) => [nazwa, zlGr(kanal), zlGr(klient), zlGr(z)]),
    { klasa: "tbl--liczby", komorka: (k, wi, i) => (i === 3 ? ujemna(k) : null) },
  );
}

// Str. 12: opłaty sprzedającego za przesyłki Smart! (pierwsza paczka w zamówieniu).
function tabelaSmart() {
  return tabela(
    [
      "Wartość zamówienia",
      "Paczkomaty InPost netto",
      "Paczkomaty InPost brutto",
      "Allegro Delivery brutto",
    ],
    ALLEGRO.smart.map((p) => [
      p.do === Infinity ? `od ${prog(p.od)} zł` : `${prog(p.od)}–${prog(p.do)} zł`,
      zlGr(p.netto),
      zlGr(p.brutto),
      zlGr(p.delivery),
    ]),
    { klasa: "tbl--liczby" },
  );
}

// Str. 14: ile możesz zapłacić za nowego klienta w sklepie, żeby zarobić tyle co na Allegro.
export const WARTOSCI = [49.9, 123, 246, 492];
export const ZAMOWIENIA = [1, 2, 3, 5];
function tabelaProgu() {
  return tabela(
    [
      "Zamówienie z VAT",
      "Allegro minus sklep",
      ...ZAMOWIENIA.map((n) => `${n} ${n === 1 ? "zakup" : n < 5 ? "zakupy" : "zakupów"} w roku`),
    ],
    WARTOSCI.map((c) => {
      const r = kosztyAllegro(c) - kosztySklepu(c);
      return [
        zlGr(c),
        zlGr(r),
        ...ZAMOWIENIA.map((n) => (progPozyskania(c, n) > 0 ? zlGr(progPozyskania(c, n)) : "brak")),
      ];
    }),
    {
      klasa: "tbl--liczby",
      komorka: (k, wi, i) => (k === "brak" || (i === 1 && /^−/.test(k)) ? "zle" : null),
    },
  );
}

// Str. 15: jeden klient, 3 zakupy po 123 zł w roku – na Allegro i w sklepie.
function tabelaKlienta() {
  const a = zysk({ kanal: "allegro" });
  const powrot = zysk({ kanal: "sklep", klient: SKLEP.ponowneZamowienie });
  const zReklamy = [zysk({ kanal: "sklep", klient: SKLEP.pozyskanie }), powrot, powrot];
  const zMarki = [zysk({ kanal: "sklep" }), powrot, powrot];
  const suma = (t) => grosze(t.reduce((s, x) => s + x, 0));
  return tabela(
    ["3 zakupy po 123 zł w roku", "Allegro", "Sklep: klient z reklamy", "Sklep: klient z marki"],
    [
      ...[0, 1, 2].map((i) => [`Zakup ${i + 1}`, zlGr(a), zlGr(zReklamy[i]), zlGr(zMarki[i])]),
      [
        "**Zysk z klienta w roku**",
        `**${zlGr(3 * a)}**`,
        `**${zlGr(suma(zReklamy))}**`,
        `**${zlGr(suma(zMarki))}**`,
      ],
    ],
    { klasa: "tbl--liczby", komorka: (k) => ujemna(k) },
  );
}

// Str. 16: co zmiana cennika robi z zyskiem przy 1000 zamówień miesięcznie.
function tabelaPodwyzki() {
  const c = PRODUKT.cena;
  const z = zysk({ kanal: "allegro" });
  const zmiany = [
    [
      "Prowizja 10,5% → 11% (Oświetlenie, 3.03.2025)",
      prowizja(c) - prowizja(c, ALLEGRO.prowizjaDo2025),
    ],
    ["Prowizja +1 punkt procentowy", prowizja(c, ALLEGRO.prowizja + 0.01) - prowizja(c)],
    ["Opłata Smart! +1 zł brutto", grosze(netto(1))],
    ["Wyróżnienie: dodatkowa prowizja", dodatkowaProwizja(c)],
  ];
  return tabela(
    [
      "Zmiana kosztów na Allegro",
      "Na zamówieniu",
      "Część zysku",
      `Miesięcznie (${MIESIECZNIE} zamówień)`,
      "Rocznie",
    ],
    zmiany.map(([nazwa, d]) => [
      nazwa,
      minus(d),
      proc(d / z),
      minus(Math.round(d * MIESIECZNIE)).replace(",00", ""),
      minus(Math.round(d * MIESIECZNIE * 12)).replace(",00", ""),
    ]),
    { klasa: "tbl--liczby" },
  );
}

const BLOKI = {
  allegro: tabelaAllegro,
  sklep: tabelaSklepu,
  kanaly: tabelaKanalow,
  smart: tabelaSmart,
  prog: tabelaProgu,
  klient: tabelaKlienta,
  podwyzka: tabelaPodwyzki,
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
  const c = PRODUKT.cena;
  console.log(
    `\nZamówienie ${zl(c)}: koszty Allegro ${zlGr(kosztyAllegro(c))}, koszty sklepu ${zlGr(kosztySklepu(c))},` +
      ` różnica ${zlGr(kosztyAllegro(c) - kosztySklepu(c))}.` +
      `\nProwizja ${proc(ALLEGRO.prowizja, 0)} od ceny z VAT = ${proc(prowizja(c) / netto(c))} przychodu netto.` +
      `\nKlient z reklamy za ${zl(SKLEP.pozyskanie)} zrównuje się z Allegro po ` +
      `${Math.ceil((SKLEP.pozyskanie - SKLEP.ponowneZamowienie) / (kosztyAllegro(c) - kosztySklepu(c) - SKLEP.ponowneZamowienie))} zakupach.`,
  );
}
