// Liczy liczby do tabel w e-booku „Sklep na autopilocie.”, żeby nie wpisywać ich ręcznie.
// Mapa 10 zadań właściciela (czas i możliwa oszczędność), wartość odzyskanych godzin i czas zwrotu wdrożenia.
// Wszystkie czasy są umowne – pokazują metodę. Właściciel wpisuje własne z tygodnia pomiaru (str. 5).
// Użycie:
//   node ebook/sklep-autopilot/kalkulator.mjs                  – wypisuje tabele w Markdown
//   node ebook/sklep-autopilot/kalkulator.mjs --wstaw plik.md  – podmienia bloki <!-- tabela:nazwa -->
//   (plik .md → tabela Markdown, plik .html → <table class="tbl"> do składu)
// Po --wstaw uruchom prettier na pliku, żeby wyrównał kolumny.
import fs from "node:fs";

// ---------- założenia przykładu ----------

export const TYGODNI_W_MIESIACU = 52 / 12;

// Zadania: ile razy w tygodniu, ile minut za każdym razem, jaka część czasu zniknie po automatyzacji
// i czy zadanie może działać bez człowieka (pelna: false – AI przygotowuje, człowiek zatwierdza).
export const ZADANIA = [
  { nazwa: "Odpowiedzi „gdzie jest paczka?”", razy: 40, minut: 3, oszczednosc: 0.8, pelna: true },
  { nazwa: "Opis nowego produktu", razy: 5, minut: 30, oszczednosc: 0.6, pelna: false },
  {
    nazwa: "Posty w mediach społecznościowych",
    razy: 4,
    minut: 30,
    oszczednosc: 0.5,
    pelna: false,
  },
  {
    nazwa: "Zamówienia do arkusza i raport dzienny",
    razy: 7,
    minut: 15,
    oszczednosc: 0.9,
    pelna: true,
  },
  { nazwa: "Faktury do programu księgowego", razy: 50, minut: 2, oszczednosc: 0.9, pelna: true },
  { nazwa: "Kontrola stanów magazynu", razy: 7, minut: 10, oszczednosc: 0.9, pelna: true },
  { nazwa: "Zdjęcia: kadr i tło", razy: 10, minut: 6, oszczednosc: 0.6, pelna: false },
  { nazwa: "Prośba o opinię po dostawie", razy: 60, minut: 1, oszczednosc: 1, pelna: true },
  { nazwa: "Raport tygodniowy", razy: 1, minut: 60, oszczednosc: 0.8, pelna: true },
  { nazwa: "Reklamacje i zwroty", razy: 3, minut: 20, oszczednosc: 0.3, pelna: false },
];

export const STAWKI = [50, 80, 120]; // wartość godziny właściciela w zł (założenie)
export const KOSZT_NARZEDZI = 200; // zł miesięcznie: narzędzie do automatyzacji i AI (założenie)
export const GODZINY_ZAOSZCZEDZONE = [10, 20, 40]; // godzin miesięcznie
export const GODZINY_WDROZENIA = [8, 16, 32]; // jednorazowo

// ---------- wzory ----------

export const godzinyMiesiecznie = (z) => (z.razy * z.minut * TYGODNI_W_MIESIACU) / 60;
export const oszczednoscMiesiecznie = (z) => godzinyMiesiecznie(z) * z.oszczednosc;

// Po ilu miesiącach wdrożenie się zwraca: koszt godzin wdrożenia ÷ miesięczny zysk netto.
export function miesiaceZwrotu(godzinyWdrozenia, godzinyZaoszczedzone, stawka) {
  const zyskNetto = godzinyZaoszczedzone * stawka - KOSZT_NARZEDZI;
  return zyskNetto > 0 ? (godzinyWdrozenia * stawka) / zyskNetto : Infinity;
}

// ---------- formatowanie po polsku ----------

const zl = (x) => `${Math.round(x).toLocaleString("pl-PL").replace(/ /g, " ")} zł`;
const godz = (x) => `${x.toFixed(1).replace(".", ",")} h`;
const proc = (x, m = 0) => `${(x * 100).toFixed(m).replace(".", ",").replace(/,0+$/, "")}%`;
const liczbaMies = (x) =>
  Number.isFinite(x) ? `${x.toFixed(1).replace(".", ",")} mies.` : "nie zwraca się";

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

// Str. 6: mapa zadań – posortowana od największej oszczędności.
function tabelaMapy() {
  const wiersze = [...ZADANIA]
    .sort((a, b) => oszczednoscMiesiecznie(b) - oszczednoscMiesiecznie(a))
    .map((z) => [
      z.nazwa,
      `${z.razy} × ${z.minut} min`,
      godz(godzinyMiesiecznie(z)),
      proc(z.oszczednosc),
      godz(oszczednoscMiesiecznie(z)),
      z.pelna ? "automat" : "AI + człowiek",
    ]);
  const suma = (f) => ZADANIA.reduce((s, z) => s + f(z), 0);
  wiersze.push([
    "**Razem**",
    "",
    `**${godz(suma(godzinyMiesiecznie))}**`,
    "",
    `**${godz(suma(oszczednoscMiesiecznie))}**`,
    "",
  ]);
  return tabela(
    ["Zadanie", "W tygodniu", "Godzin w miesiącu", "Oszczędność", "Odzyskane godziny", "Tryb"],
    wiersze,
    { klasa: "tbl--liczby" },
  );
}

// Str. 7: ile warte są odzyskane godziny po odjęciu kosztu narzędzi.
function tabelaWartosci() {
  return tabela(
    ["Odzyskane godziny w miesiącu", ...STAWKI.map((s) => `Godzina = ${s} zł`)],
    GODZINY_ZAOSZCZEDZONE.map((h) => [`${h} h`, ...STAWKI.map((s) => zl(h * s - KOSZT_NARZEDZI))]),
    { klasa: "tbl--liczby" },
  );
}

// Str. 8: po ilu miesiącach zwraca się czas wdrożenia (godzina właściciela = 80 zł).
function tabelaZwrotu() {
  const stawka = 80;
  return tabela(
    ["Odzyskane godziny w miesiącu", ...GODZINY_WDROZENIA.map((g) => `Wdrożenie ${g} h`)],
    GODZINY_ZAOSZCZEDZONE.map((h) => [
      `${h} h`,
      ...GODZINY_WDROZENIA.map((g) => liczbaMies(miesiaceZwrotu(g, h, stawka))),
    ]),
    { klasa: "tbl--liczby" },
  );
}

const BLOKI = { mapa: tabelaMapy, wartosc: tabelaWartosci, zwrot: tabelaZwrotu };

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
  const suma = ZADANIA.reduce((s, z) => s + godzinyMiesiecznie(z), 0);
  const zysk = ZADANIA.reduce((s, z) => s + oszczednoscMiesiecznie(z), 0);
  console.log(
    `\n10 zadań: ${godz(suma)} miesięcznie, możliwa oszczędność ${godz(zysk)} (${proc(zysk / suma)}).`,
  );
}
