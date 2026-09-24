// Składa raport „100 tematów na e-booki” z danych src/tematy.json do src/raport.html (A4).
// Użycie: node ebook/plan-serii/zloz.mjs && node ebook/plan-serii/render.mjs
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const dane = JSON.parse(await fs.readFile(path.join(here, "src/tematy.json"), "utf8"));

// Polska typografia – reguły jak w ebook/chatgpt-ads/src/typografia.js, ale stosowane przy składaniu.
// Twarde spacje po jednoliterowych słowach, przed półpauzą i przy liczbach. Zakresy liczb („001–020”)
// i słowa z „e-” trafiają do <span class="nw">, zamiast niewidocznych znaków w tekście PDF.
const NBSP = "\u00a0";
const REGULY = [
  // Lookbehind, żeby wiązać też ciągi jednoliterowych słów („a w domu”, „i z nami”).
  [/(?<=^|[\s(„])([aiouwzAIOUWZ])\s+/g, `$1${NBSP}`],
  [/\s+([–—])\s/g, `${NBSP}$1 `],
  [/(\d)\s+(zł|mln|mld|tys\.|dni|dzień|min|lat|godzin|tyg\.|r\.|p\.p\.|h\b)/g, `$1${NBSP}$2`],
  [/(\b(?:str|ok|np|nr|s)\.)\s+/g, `$1${NBSP}`],
  [/(\d)\s(\d{3})\b/g, `$1${NBSP}$2`],
];
const NIELAMANE = [
  [/(\d+–\d+)/g, '<span class="nw">$1</span>'],
  [/\b([eE]-\p{L}+)/gu, '<span class="nw">$1</span>'],
];

function typo(tekst) {
  let wynik = tekst;
  // Dwa przebiegi łapią ciągi typu „w 10 tys.”.
  for (let i = 0; i < 2; i++)
    for (const [re, zamiana] of REGULY) wynik = wynik.replace(re, zamiana);
  for (const [re, zamiana] of NIELAMANE) wynik = wynik.replace(re, zamiana);
  return wynik;
}

const esc = (s) =>
  String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
// Ostatnie słowo (do 8 znaków) zawsze razem z poprzednim – bez sierotek na końcu akapitu.
const t = (s) => typo(esc(s)).replace(/ (\S{1,8})$/u, `${NBSP}$1`);
const nr2 = (n) => String(n).padStart(2, "0");
const nr3 = (n) => String(n).padStart(3, "0");
// Tytuły kończą się kropką; w środku zdania (w cudzysłowie) kropkę pomijamy.
const bezKropki = (s) => s.replace(/\.$/, "");

// Numeracja tematów 001–100 w kolejności filarów.
let licznik = 0;
dane.filary.forEach((filar, i) => {
  filar.nr = i + 1;
  for (const temat of filar.tematy) {
    temat.nr = ++licznik;
    temat.filar = filar;
  }
});
const tematy = dane.filary.flatMap((f) => f.tematy);
const wgNumeru = new Map(tematy.map((temat) => [temat.nr, temat]));
const miesiacTop = new Map(dane.kalendarz.filter((k) => k.nr).map((k) => [k.nr, k.miesiac]));
for (const k of dane.kalendarz) {
  if (k.nr && !wgNumeru.has(k.nr))
    throw new Error(`Kalendarz wskazuje nieistniejący temat #${k.nr}`);
}

const glowka = (lewa = "KSIGN · 100 tematów na e-booki", prawa = `Stan na ${dane.raport.stan}`) =>
  `<header class="glowka"><span>${t(lewa)}</span><span>${t(prawa)}</span></header>`;
const stopka = (n) =>
  `<footer class="stopka"><span>ksign.pl</span><span class="stopka__nr">${n}</span></footer>`;

// ---------- strony ----------

function okladka() {
  const filary = dane.filary
    .map(
      (f) => `
      <li>
        <span class="okladka__fnr">${nr2(f.nr)}</span>
        <span class="okladka__fnazwa">${t(f.nazwa)}</span>
        <span class="okladka__fzakres">${t(`${nr3(f.tematy[0].nr)}–${nr3(f.tematy.at(-1).nr)}`)}</span>
      </li>`,
    )
    .join("");
  return `
  <section class="page okladka" data-nazwa="okladka" data-kolizja=".okladka__lead|.okladka__filary">
    <div class="okladka__gora"><span>Raport KSIGN</span><span>Stan na ${t(dane.raport.stan)}</span></div>
    <h1 class="okladka__tytul" aria-label="${esc(dane.raport.tytul)}">
      <span class="okladka__liczba">100</span>
      <span class="okladka__linia">tematów na e-booki</span>
      <span class="okladka__linia"><em>o marketingu e-commerce</em></span>
    </h1>
    <p class="okladka__lead">${t(
      "Pięć filarów i sto kart tematów: chwytliwy tytuł, grupa docelowa, problem czytelnika i trzy kluczowe rozdziały. Do tego TOP 10 na pierwszy rok i szablon planu wydawniczego.",
    )}</p>
    <ol class="okladka__filary">${filary}
    </ol>
    <div class="okladka__dol"><span>Seria e-booków KSIGN o e-commerce</span><span>ksign.pl</span></div>
  </section>`;
}

function spisTresci(n, numery) {
  const pozycje = [
    {
      id: "podsumowanie",
      tytul: "Podsumowanie",
      opis: "Pięć wniosków z danych o polskim e-commerce",
    },
    {
      id: "metoda",
      tytul: "Jak powstał spis",
      opis: "Kryteria wyboru tematów i mapa: filary a grupy docelowe",
    },
    {
      id: "top10",
      tytul: "TOP 10 na pierwszy rok",
      opis: "Kolejność wydań od października 2026 do sierpnia 2027",
    },
    ...dane.filary.map((f) => ({
      id: `filar-${f.id}`,
      nr: nr2(f.nr),
      tytul: f.nazwa,
      opis: `Filar ${nr2(f.nr)} · tematy ${nr3(f.tematy[0].nr)}–${nr3(f.tematy.at(-1).nr)}`,
    })),
    {
      id: "szablon-plan",
      tytul: "Szablon planu wydawniczego",
      opis: "Plan na 12 miesięcy, karta e-booka, produkcja i promocja",
    },
    {
      id: "zrodla",
      tytul: "Metodologia i źródła",
      opis: "Skąd są dane, lista źródeł i zastrzeżenia",
    },
  ];
  const lista = pozycje
    .map(
      (p) => `
      <li>
        <span class="spis__nr">${p.nr ?? ""}</span>
        <span class="spis__tytul">${t(p.tytul)}<span class="spis__opis">${t(p.opis)}</span></span>
        <span class="spis__str">${numery.get(p.id)}</span>
      </li>`,
    )
    .join("");
  return `
  <section class="page" data-nazwa="spis-tresci">
    ${glowka()}
    <div class="tresc" data-kontrola>
      <h1 class="etykieta" aria-label="Spis treści">Spis treści</h1>
      <p class="tytul-strony">Co jest w raporcie</p>
      <ol class="spis">${lista}
      </ol>
    </div>
    ${stopka(n)}
  </section>`;
}

const WNIOSKI = [
  {
    tytul: "Rośnie się na powracających klientach.",
    tekst:
      "78% internautów już kupuje online, a wzrost rok do roku jest niewielki. Gemius nazywa to efektem sufitu: pole do wzrostu to częstotliwość zakupów, wartość koszyka i retencja.",
    zrodlo: "Gemius, E-commerce w Polsce 2025, s. 4",
    filar: 2,
  },
  {
    tytul: "AI to już codzienność klientów.",
    tekst:
      "53% internautów korzysta z narzędzi AI. Chatbot nie jest jednak ulubioną formą kontaktu ze sklepem: klienci wolą e-mail i telefon. AI ma odciążać zespół i prowadzić klienta, a trudne sprawy oddawać ludziom.",
    zrodlo: "Gemius, E-commerce w Polsce 2025, s. 4",
    filar: 1,
  },
  {
    tytul: "Social commerce ma już sklep w aplikacji.",
    tekst:
      "Zakupy w mediach społecznościowych deklaruje 19% internautów, na razie okazjonalnie. Od 15.06.2026 w Polsce działa TikTok Shop: kto teraz nauczy się sprzedawać z filmów i transmisji LIVE, ma szansę wyprzedzić konkurencję.",
    zrodlo: "Gemius, E-commerce w Polsce 2025, s. 4; TikTok Newsroom, 28.05.2026",
    filar: 3,
  },
  {
    tytul: "Wyniki reklam zależą od danych sklepu.",
    tekst:
      "Od marca 2024 r. Google wymaga Consent Mode v2 dla ruchu z EOG, a od 10.11.2024 r. obowiązuje Prawo komunikacji elektronicznej. Sklepy, które zbierają zgody i dane zgodnie z prawem, lepiej mierzą wyniki i lepiej kierują reklamy.",
    zrodlo: "Google, zasady dotyczące zgody użytkownika z UE; Dz.U. 2024 poz. 1221",
    filar: 4,
  },
  {
    tytul: "Klient jest w wielu kanałach naraz.",
    tekst:
      "Dla 82% internautów smartfon to podstawowe urządzenie zakupowe, a 65% porównuje ceny na telefonie nawet w sklepie stacjonarnym. Aż 41% kupuje też w zagranicznych e-sklepach.",
    zrodlo: "Gemius, E-commerce w Polsce 2025, s. 4",
    filar: 5,
  },
];

function podsumowanie(n, numery) {
  const wnioski = WNIOSKI.map(
    (w, i) => `
      <li>
        <span class="wnioski__nr">${i + 1}</span>
        <div>
          <p class="wnioski__tytul">${t(w.tytul)}</p>
          <p class="wnioski__tekst">${t(w.tekst)}</p>
          <p class="zrodlo wnioski__zrodlo">${t(w.zrodlo)}</p>
        </div>
        <span class="chip wnioski__filar">Filar ${nr2(w.filar)}</span>
      </li>`,
  ).join("");
  const start = wgNumeru.get(dane.kalendarz[0].nr);
  return `
  <section class="page" data-nazwa="podsumowanie">
    ${glowka()}
    <div class="tresc" data-kontrola>
      <h1 class="etykieta" aria-label="Podsumowanie">Podsumowanie</h1>
      <p class="tytul-strony">Pięć filarów, sto tematów, jeden plan.</p>
      <p class="lead">${t(
        "Raport porządkuje 100 tematów na e-booki o marketingu e-commerce w pięciu filarach. Wybór filarów opiera się na pięciu wnioskach z danych o polskim rynku.",
      )}</p>
      <ol class="wnioski">${wnioski}
      </ol>
      <figure class="cytat">
        <blockquote>${t(
          `Rekomendacja: zacząć od „${bezKropki(start.tytul)}” (#${nr3(start.nr)}) w październiku. Black Friday wypada 27.11.2026, a sklepy planują ceny i promocje właśnie teraz.`,
        )}</blockquote>
        <figcaption>${t(`Pełna kolejność 10 wydań: s. ${numery.get("top10")}`)}</figcaption>
      </figure>
    </div>
    ${stopka(n)}
  </section>`;
}

const KRYTERIA = [
  [
    "Kosztowny problem",
    "Temat zaczyna się od problemu, za który sklep płaci: marżą, budżetem reklamowym albo czasem zespołu.",
  ],
  [
    "Jasny odbiorca",
    "Karta mówi, dla kogo jest e-book. To ułatwia reklamy i wybór kanałów promocji.",
  ],
  [
    "Własne dane",
    "Temat da się poprzeć badaniem albo testem, np. 100 polskich sklepów. Liczby z badania to najlepsze haki do social mediów.",
  ],
  [
    "Usługa na końcu",
    "Każdy e-book prowadzi do oferty KSIGN: sklep, SEO, kampanie, newsletter albo automatyzacje.",
  ],
];

function metoda(n, numery) {
  const kolumny = Object.keys(dane.segmenty);
  const naglowki = {
    male: "Małe",
    srednie: "Średnie i duże",
    d2c: "D2C",
    marketplace: "Market­place",
    b2b: "B2B",
    omni: "Z salonami",
  };
  const liczby = dane.filary.map((f) => {
    const wiersz = Object.fromEntries(kolumny.map((k) => [k, 0]));
    for (const temat of f.tematy) wiersz[temat.segment]++;
    return wiersz;
  });
  const sumy = Object.fromEntries(kolumny.map((k) => [k, liczby.reduce((s, w) => s + w[k], 0)]));
  const komorka = (x) => `<td class="liczba${x ? "" : " zero"}">${x || "–"}</td>`;
  const wiersze = dane.filary
    .map(
      (f, i) => `
        <tr><td>${nr2(f.nr)} · ${t(f.nazwa)}</td>${kolumny.map((k) => komorka(liczby[i][k])).join("")}<td class="liczba">${f.tematy.length}</td></tr>`,
    )
    .join("");
  const ranking = [...kolumny].sort((a, b) => sumy[b] - sumy[a]);
  const [pierwszy, drugi] = ranking;
  const [ostatni, przedostatni] = [...ranking].reverse();
  const komentarz = `Najwięcej tematów dotyczy grupy „${dane.segmenty[pierwszy]}” (${sumy[pierwszy]}) i „${dane.segmenty[drugi]}” (${sumy[drugi]}). Najmniej: „${dane.segmenty[ostatni]}” (${sumy[ostatni]}) i „${dane.segmenty[przedostatni]}” (${sumy[przedostatni]}). Jeśli te grupy są ważne dla KSIGN, warto dopisać dla nich tematy.`;
  const kryteria = KRYTERIA.map(
    ([tytul, opis], i) => `
        <div class="kryterium">
          <span class="kryterium__nr">${i + 1}</span>
          <p class="kryterium__tytul">${t(tytul)}</p>
          <p>${t(opis)}</p>
        </div>`,
  ).join("");
  return `
  <section class="page" data-nazwa="metoda">
    ${glowka()}
    <div class="tresc" data-kontrola>
      <h1 class="etykieta" aria-label="Jak powstał spis">Jak powstał spis</h1>
      <p class="tytul-strony">Każdy temat: problem, odbiorca, własne dane i usługa na końcu.</p>
      <p class="lead">${t(
        "Punktem wyjścia była wstępna lista 100 tematów w 10 kategoriach. Przebudowano ją na 5 filarów, usunięto powtórzenia i dodano polski kontekst: Allegro, BLIK, InPost, TikTok Shop, RODO, Prawo komunikacji elektronicznej, Omnibus i AI Act.",
      )}</p>
      <div class="kryteria">${kryteria}
      </div>
      <div class="naglowek-sekcji">
        <h2 class="sekcja">Mapa tematów</h2>
        <span class="zrodlo">Liczba tematów w filarze według głównej grupy docelowej</span>
      </div>
      <table class="tabela mapa">
        <colgroup><col />${kolumny.map(() => '<col style="width:18mm" />').join("")}<col style="width:17mm" /></colgroup>
        <thead><tr><th>Filar</th>${kolumny.map((k) => `<th class="liczba">${t(naglowki[k])}</th>`).join("")}<th class="liczba">Razem</th></tr></thead>
        <tbody>${wiersze}
          <tr class="suma"><td>Razem</td>${kolumny.map((k) => `<td class="liczba">${sumy[k]}</td>`).join("")}<td class="liczba">${tematy.length}</td></tr>
        </tbody>
      </table>
      <p class="komentarz">${t(komentarz)}</p>
      <div class="legenda">${typo(
        `<strong>Jak czytać kartę tematu.</strong> Na górze numer (001–100) i główna grupa docelowa. Pod tytułem i podtytułem: <strong>Dla kogo</strong> – kto dokładnie ma przeczytać e-book; <strong>Problem czytelnika</strong> – zdanie, którym czytelnik sam opisałby swój kłopot (gotowy hak do reklamy); <strong>Kluczowe rozdziały</strong> – trzy rozdziały, które ten problem rozwiązują. Znacznik <strong>TOP 10</strong> oznacza temat z planu na pierwszy rok (s. ${numery.get("top10")}).`,
      )}</div>
    </div>
    ${stopka(n)}
  </section>`;
}

function top10(n) {
  const wiersze = dane.kalendarz
    .map((k) => {
      if (!k.nr) {
        return `
        <tr class="pauza"><td class="top10__miesiac">${t(k.miesiac)}</td><td></td><td colspan="2">${t(k.nr === null && k.miesiac.startsWith("Gru") ? "Bez premiery" : "Planowanie drugiego roku")}</td><td>${t(k.dlaczego)}</td></tr>`;
      }
      const temat = wgNumeru.get(k.nr);
      return `
        <tr>
          <td class="top10__miesiac">${t(k.miesiac)}</td>
          <td class="top10__nr">${nr3(temat.nr)}</td>
          <td><span class="top10__tytul">${t(temat.tytul)}</span></td>
          <td>${t(temat.filar.nazwa)}</td>
          <td>${t(k.dlaczego)}</td>
        </tr>`;
    })
    .join("");
  return `
  <section class="page" data-nazwa="top10">
    ${glowka()}
    <div class="tresc" data-kontrola>
      <h1 class="etykieta" aria-label="TOP 10 na pierwszy rok">TOP 10 na pierwszy rok</h1>
      <p class="tytul-strony">Dwa tematy z każdego filaru, ułożone pod sezon.</p>
      <p class="lead">${t(
        "Kolejność zaczyna się od Black Friday 2026, a kończy przed sezonem 2027. W grudniu nie ma premiery: to szczyt sprzedaży, więc publikujemy wtedy wyniki badania cen z Black Friday.",
      )}</p>
      <table class="tabela top10">
        <colgroup><col style="width:17mm" /><col style="width:11mm" /><col style="width:52mm" /><col style="width:27mm" /><col /></colgroup>
        <thead><tr><th>Miesiąc</th><th>Nr</th><th>E-book</th><th>Filar</th><th>Dlaczego wtedy</th></tr></thead>
        <tbody>${wiersze}
        </tbody>
      </table>
      <p class="przypis">${t(
        "Zmiany względem listy z 24.09.2026: doszedł TikTok Shop (#051), bo działa w Polsce od 15.06.2026. Tematy spoza filarów („Koszyk ucieka” i „Google wydaje twoje pieniądze”) zastąpiono tematami z filarów. „Feed to nowe SEO” jest w raporcie jako #082.",
      )}</p>
    </div>
    ${stopka(n)}
  </section>`;
}

function otwarcieFilaru(filar, n) {
  const daneFilaru = filar.dane
    .map(
      (d) => `
        <div class="dana">
          <p class="dana__liczba">${t(d.liczba)}</p>
          <p class="dana__opis">${t(d.opis)}</p>
          <p class="zrodlo">${t(d.zrodlo)}</p>
        </div>`,
    )
    .join("");
  const cytat = filar.cytat
    ? `
      <figure class="cytat">
        <blockquote>${t(`„${filar.cytat.tekst}”`)}</blockquote>
        <figcaption>${t(filar.cytat.autor)}</figcaption>
      </figure>`
    : "";
  const lista = filar.tematy
    .map((temat) => {
      const top = miesiacTop.get(temat.nr);
      return `
          <li><span class="filar__spis-nr">${nr3(temat.nr)}</span><span>${t(temat.tytul)}</span><span class="filar__spis-top">${top ? t(`TOP · ${top}`) : ""}</span></li>`;
    })
    .join("");
  return `
  <section class="page filar" data-nazwa="filar-${filar.id}" data-kolizja=".filar__tresc|.filar__spis">
    ${glowka(undefined, `Tematy ${nr3(filar.tematy[0].nr)}–${nr3(filar.tematy.at(-1).nr)}`)}
    <div class="tresc" data-kontrola>
      <div class="filar__tresc">
        <div class="filar__gora">
          <span class="filar__nr">${nr2(filar.nr)}</span>
          <div>
            <p class="etykieta">Filar ${nr2(filar.nr)} · ${filar.tematy.length} tematów</p>
            <h1 class="filar__nazwa" aria-label="${esc(`${nr2(filar.nr)} ${filar.nazwa}`)}">${t(filar.nazwa)}</h1>
          </div>
        </div>
        <p class="filar__lead">${t(filar.lead)}</p>
        <div class="filar__dane${filar.dane.length === 2 ? " filar__dane--2" : ""}">${daneFilaru}
        </div>${cytat}
      </div>
      <div class="filar__spis">
        <p class="etykieta">Tematy w tym filarze</p>
        <ol>${lista}
        </ol>
      </div>
    </div>
    ${stopka(n)}
  </section>`;
}

function karta(temat) {
  const top = miesiacTop.get(temat.nr);
  return `
        <article class="karta" data-kontrola>
          <div class="karta__gora">
            <span class="karta__nr">${nr3(temat.nr)}</span>
            ${top ? `<span class="chip chip--top">${t(`TOP 10 · ${top}`)}</span>` : ""}
            <span class="chip">${t(dane.segmenty[temat.segment])}</span>
          </div>
          <h2 class="karta__tytul" aria-label="${esc(`${nr3(temat.nr)} ${temat.tytul}`)}">${t(temat.tytul)}</h2>
          <p class="karta__pod">${t(temat.podtytul)}</p>
          <dl class="karta__pola">
            <div><dt>Dla kogo</dt><dd>${t(temat.dla)}</dd></div>
            <div><dt>Problem czytelnika</dt><dd class="karta__problem">${t(`„${temat.problem}”`)}</dd></div>
            <div>
              <dt>Kluczowe rozdziały</dt>
              <dd><ol class="rozdzialy">${temat.rozdzialy.map((r) => `<li>${t(r)}</li>`).join("")}</ol></dd>
            </div>
          </dl>
        </article>`;
}

function stronaKart(filar, czworka, n) {
  const zakres = `Tematy ${nr3(czworka[0].nr)}–${nr3(czworka.at(-1).nr)}`;
  return `
  <section class="page" data-nazwa="karty-${nr3(czworka[0].nr)}">
    ${glowka(`Filar ${nr2(filar.nr)} · ${filar.nazwa}`, zakres)}
    <div class="tresc" data-kontrola>
      <div class="siatka">${czworka.map(karta).join("")}
      </div>
    </div>
    ${stopka(n)}
  </section>`;
}

function szablonPlan(n) {
  const wiersze = dane.kalendarz
    .map((k) => {
      const temat = k.nr ? wgNumeru.get(k.nr) : null;
      const ebook = temat
        ? `#${nr3(temat.nr)} ${temat.tytul}`
        : k.miesiac.startsWith("Gru")
          ? "Bez premiery"
          : "Planowanie";
      return `
        <tr>
          <td class="top10__miesiac">${t(k.miesiac)}</td>
          <td class="propozycja">${t(k.okazje)}</td>
          <td class="propozycja">${t(ebook)}</td>
          <td class="propozycja">${t(k.oferta)}</td>
          <td class="propozycja">${t(k.badanie)}</td>
          <td class="puste"></td>
          <td class="puste"></td>
        </tr>`;
    })
    .join("");
  return `
  <section class="page" data-nazwa="szablon-plan">
    ${glowka()}
    <div class="tresc" data-kontrola>
      <h1 class="etykieta" aria-label="Szablon planu wydawniczego">Szablon planu wydawniczego</h1>
      <p class="tytul-strony">Plan na 12 miesięcy</p>
      <p class="lead">${t(
        "Kursywą wpisane są propozycje z raportu. Zmień je według swoich decyzji, dopisz datę premiery i status: pomysł, w produkcji, gotowy albo wydany.",
      )}</p>
      <table class="tabela plan">
        <colgroup><col style="width:16mm" /><col style="width:27mm" /><col style="width:40mm" /><col style="width:30mm" /><col style="width:31mm" /><col style="width:17mm" /><col /></colgroup>
        <thead><tr><th>Miesiąc</th><th>Okazje w sezonie</th><th>E-book</th><th>Oferta KSIGN</th><th>Własne dane</th><th>Premiera</th><th>Status</th></tr></thead>
        <tbody>${wiersze}
        </tbody>
      </table>
    </div>
    ${stopka(n)}
  </section>`;
}

const POLA_KARTY = [
  ["Nr i tytuł roboczy", "", 4, 1],
  ["Filar", "", 2, 1],
  ["Podtytuł", "", 4, 1],
  ["Grupa docelowa", "", 2, 1],
  ["Problem czytelnika", "jednym zdaniem, słowami klienta", 6, 1],
  ["Obietnica", "co czytelnik zyska po lekturze", 6, 1],
  ["Rozdziały", "od 3 do 8", 3, 6, 2],
  ["Własne dane i badanie", "co sprawdzamy, na ilu sklepach, kiedy", 3, 2],
  ["Źródła do sprawdzenia", "raporty, przepisy, regulaminy platform", 3, 2],
  ["Oferta KSIGN na końcu", "", 3, 1],
  ["CTA i słowo-klucz w DM", "", 3, 1],
  [
    "Haki do social mediów",
    "Reels/Shorts 1 · Reels/Shorts 2 · karuzela (slajd 1) · YouTube: tytuł i miniatura",
    6,
    4,
  ],
  ["KPI po 30 dniach", "pobrania · koszt kontaktu · rozmowy", 2, 2],
  ["Terminy", "konspekt · tekst · skład · premiera", 2, 2],
  ["Odpowiedzialni", "tekst · grafika · promocja", 2, 2],
];

function szablonKarta(n) {
  const pola = POLA_KARTY.map(([etykieta, podpowiedz, kolumny, wiersze, rzedy]) => {
    const styl = `--s:${kolumny}${rzedy ? `;grid-row:span ${rzedy}` : ""}`;
    return `
        <div class="pole" style="${styl}">
          <span class="pole__etykieta">${t(etykieta)}${podpowiedz ? `<span class="pole__podpowiedz">${t(podpowiedz)}</span>` : ""}</span>
          <span class="pole__linie">${"<i></i>".repeat(wiersze)}</span>
        </div>`;
  }).join("");
  return `
  <section class="page" data-nazwa="szablon-karta">
    ${glowka(undefined, "Szablon planu wydawniczego")}
    <div class="tresc" data-kontrola>
      <h2 class="etykieta" aria-label="Karta e-booka">Karta e-booka</h2>
      <p class="tytul-strony">Jedna strona na każdy e-book</p>
      <div class="formularz">${pola}
      </div>
    </div>
    ${stopka(n)}
  </section>`;
}

const HARMONOGRAM = [
  ["T–6 tyg.", "Wybór tematu, karta e-booka, start badania"],
  ["T–5 tyg.", "Konspekt i akceptacja rozdziałów"],
  ["T–4 tyg.", "Tekst rozdziałów"],
  ["T–3 tyg.", "Wyniki badania, grafiki, skład"],
  [
    "T–2 tyg.",
    "Korekta, sprawdzenie faktów, konsultacja prawna przy tematach prawnych, strona z formularzem",
  ],
  ["T–1 tydz.", "Haki i treści do social mediów, sekwencja mailowa, automat w DM"],
  ["Premiera", "Post, Reels/Shorts, mail do bazy"],
  ["T+1–4 tyg.", "Film na YouTube, 6–8 Reels/Shorts, 3 karuzele ze stron e-booka, raport KPI"],
];

const KPI = [
  "Pobrania e-booka",
  "Konwersja strony z formularzem",
  "Koszt pozyskania kontaktu z reklam",
  "Kliknięcia w sekwencji mailowej",
  "Rozmowy sprzedażowe",
  "Sprzedaż z pozyskanych kontaktów",
];

const SILNIK = [
  ["1", "badanie albo test na polskich sklepach"],
  ["1", "film na YouTube (8–12 min) z testem"],
  ["6–8", "Reels i Shorts wyciętych z filmu"],
  ["3", "karuzele ze stron e-booka (format 4:5)"],
  ["1", "mail do bazy i sekwencja po pobraniu"],
  ["1", "artykuł na blogu pod SEO"],
];

function szablonProdukcja(n) {
  const harmonogram = HARMONOGRAM.map(
    ([kiedy, co]) =>
      `<tr><td>${t(kiedy)}</td><td>${t(co)}</td><td class="puste" style="width:26mm"></td><td class="kratka"></td></tr>`,
  ).join("");
  const kpi = KPI.map(
    (m) =>
      `<tr><td>${t(m)}</td><td class="puste"></td><td class="puste"></td><td class="puste"></td></tr>`,
  ).join("");
  const silnik = SILNIK.map(([ile, co]) => `<li><strong>${t(ile)}</strong>${t(co)}</li>`).join("");
  return `
  <section class="page" data-nazwa="szablon-produkcja">
    ${glowka(undefined, "Szablon planu wydawniczego")}
    <div class="tresc" data-kontrola>
      <h2 class="etykieta" aria-label="Produkcja i promocja">Produkcja i promocja</h2>
      <p class="tytul-strony">Sześć tygodni do premiery, miesiąc promocji</p>
      <table class="tabela harmonogram kpi">
        <thead><tr><th>Kiedy</th><th>Co zrobić</th><th>Kto</th><th>Gotowe</th></tr></thead>
        <tbody>${harmonogram}</tbody>
      </table>
      <div class="naglowek-sekcji"><p class="sekcja">KPI e-booka</p><span class="zrodlo">Cel wpisz przed premierą</span></div>
      <table class="tabela kpi">
        <thead><tr><th>Miernik</th><th>Cel</th><th>Po 30 dniach</th><th>Po 90 dniach</th></tr></thead>
        <tbody>${kpi}</tbody>
      </table>
      <div class="naglowek-sekcji"><p class="sekcja">Z jednego e-booka powstaje</p></div>
      <ol class="silnik">${silnik}</ol>
      <p class="cta-linia">${t(
        "Jedno wezwanie do działania w każdym poście: słowo-klucz w komentarzu albo w DM (np. RABAT, KOSZYK, ROAS). Automat wysyła link do e-booka, a przy pobraniu zbieramy e-mail.",
      )}</p>
    </div>
    ${stopka(n)}
  </section>`;
}

const ZRODLA = [
  [
    "Gemius, „E-commerce w Polsce 2025”. Badanie CAWI na 1629 internautach w wieku 15+ (17–24.07.2025), dane ze s. 4, 18 i 33.",
    "https://gemius.com/pl/news/raport-e-commerce-w-polsce-2025-jest-juz-dostepny/",
  ],
  [
    "Gemius, komunikat prasowy do raportu 2025: preferowane formy kontaktu ze sklepem (e-mail 31%, telefon 26%, chatbot 8%).",
    "https://gemius.com/pl/news/raport-e-commerce-w-polsce-2025-jest-juz-dostepny/",
  ],
  [
    "TikTok Newsroom, „TikTok Shop w Polsce”, 28.05.2026: start 15.06.2026, zakupy z filmów, LIVE i zakładki Shop, dane TikTok Marketing Science.",
    "https://newsroom.tiktok.com/introducing-tiktok-shop-in-poland?lang=pl-PL",
  ],
  ["Google, zasady dotyczące zgody użytkownika z UE: wymóg Consent Mode v2 od marca 2024 r.", ""],
  [
    "Ustawa z 12.07.2024 r. – Prawo komunikacji elektronicznej (Dz.U. 2024 poz. 1221), w mocy od 10.11.2024 r.",
    "https://isap.sejm.gov.pl/isap.nsf/DocDetails.xsp?id=WDU20240001221",
  ],
  [
    "RODO (rozporządzenie UE 2016/679), art. 33; AI Act (rozporządzenie UE 2024/1689); dyrektywa Omnibus (UE 2019/2161).",
    "",
  ],
];

const ZASTRZEZENIA = [
  "Tematy prawne (RODO, Prawo komunikacji elektronicznej, Omnibus, AI Act, regulaminy platform) przed publikacją przegląda prawnik.",
  "Funkcje platform zmieniają się szybko: TikTok Shop, zakupy przez agentów AI, Consent Mode, Allegro Ads. Stan sprawdzamy w dniu pisania e-booka.",
  "Tytuły są robocze. Przed produkcją warto sprawdzić je jako haki w social mediach i wybrać te, które mają najlepsze reakcje.",
  "Z listy z 24.09.2026 w raporcie są tematy #001, #002, #021, #041, #061, #081, #082 i #098.",
];

function zrodla(n) {
  const lista = ZRODLA.map(
    ([opis, url]) =>
      `<li>${t(opis)}${url ? `<br /><a href="${esc(url)}">${esc(url.replace(/^https:\/\//, ""))}</a>` : ""}</li>`,
  ).join("");
  return `
  <section class="page" data-nazwa="zrodla">
    ${glowka()}
    <div class="tresc" data-kontrola>
      <h1 class="etykieta" aria-label="Metodologia i źródła">Metodologia i źródła</h1>
      <p class="tytul-strony">Skąd są dane i czego pilnować</p>
      <div class="akapity" style="margin-top:6mm">
        <p>${t(
          "Raport powstał we wrześniu 2026 r. na podstawie wstępnej listy 100 tematów w 10 kategoriach. Tematy przebudowano na pięć filarów: AI i automatyzacja, marketing relacyjny i retention, social commerce i livestreaming, first-party data i prywatność oraz e-commerce omnichannel. Każdy filar ma 20 tematów, bez powtórzeń między filarami.",
        )}</p>
        <p>${t(
          "Każdy temat dostał grupę docelową, problem czytelnika i trzy kluczowe rozdziały. Grupy docelowe są opisowe (np. „sklepy z modą i obuwiem”), a do mapy tematów przypisano każdemu tematowi jedną główną grupę. Liczby w raporcie pochodzą wyłącznie z wymienionych niżej źródeł.",
        )}</p>
      </div>
      <div class="naglowek-sekcji"><p class="sekcja">Źródła</p></div>
      <ol class="zrodla">${lista}</ol>
      <div class="naglowek-sekcji"><p class="sekcja">Zastrzeżenia</p></div>
      <ul class="zastrzezenia">${ZASTRZEZENIA.map((z) => `<li>${t(z)}</li>`).join("")}</ul>
    </div>
    ${stopka(n)}
  </section>`;
}

function koniec(numery) {
  const [a, b, c] = dane.kalendarz.filter((k) => k.nr).map((k) => wgNumeru.get(k.nr));
  const kroki = [
    `Zatwierdź kolejność na pierwszy kwartał: #${nr3(a.nr)} „${bezKropki(a.tytul)}”, #${nr3(b.nr)} „${bezKropki(b.tytul)}” i #${nr3(c.nr)} „${bezKropki(c.tytul)}”.`,
    `Wypełnij kartę e-booka dla „${bezKropki(a.tytul)}” (s. ${numery.get("szablon-karta")}).`,
    "Od 1.10.2026 zbieramy ceny ok. 1000 produktów ze 100 sklepów. To dane do e-booka i treści na Black Friday.",
  ];
  return `
  <section class="page koniec" data-nazwa="koniec" data-kolizja=".koniec__tresc|.koniec__dol">
    <div class="koniec__tresc">
      <p class="etykieta">Następny krok</p>
      <p class="koniec__tytul">Wybierz trzy pierwsze tematy i ruszamy.</p>
      <ol class="kroki">${kroki
        .map((k, i) => `<li><span class="kroki__nr">${i + 1}</span><span>${t(k)}</span></li>`)
        .join("")}</ol>
    </div>
    <div class="koniec__dol"><span class="koniec__marka">KSIGN</span><span class="koniec__www">ksign.pl</span></div>
  </section>`;
}

// ---------- kolejność stron i numeracja ----------

const strony = [
  { id: "okladka", html: () => okladka() },
  { id: "spis", html: (n, numery) => spisTresci(n, numery) },
  { id: "podsumowanie", html: (n, numery) => podsumowanie(n, numery) },
  { id: "metoda", html: (n, numery) => metoda(n, numery) },
  { id: "top10", html: (n) => top10(n) },
];
for (const filar of dane.filary) {
  strony.push({ id: `filar-${filar.id}`, html: (n) => otwarcieFilaru(filar, n) });
  for (let i = 0; i < filar.tematy.length; i += 4) {
    const czworka = filar.tematy.slice(i, i + 4);
    strony.push({ id: `karty-${czworka[0].nr}`, html: (n) => stronaKart(filar, czworka, n) });
  }
}
strony.push(
  { id: "szablon-plan", html: (n) => szablonPlan(n) },
  { id: "szablon-karta", html: (n) => szablonKarta(n) },
  { id: "szablon-produkcja", html: (n) => szablonProdukcja(n) },
  { id: "zrodla", html: (n) => zrodla(n) },
  { id: "koniec", html: (n, numery) => koniec(numery) },
);

const numery = new Map(strony.map((s, i) => [s.id, i + 1]));
const tresc = strony.map((s, i) => s.html(i + 1, numery)).join("\n");

const html = `<!doctype html>
<html lang="pl">
  <head>
    <meta charset="utf-8" />
    <title>${esc(dane.raport.tytul)} – raport ${esc(dane.raport.wydawca)}</title>
    <meta name="author" content="${esc(dane.raport.wydawca)}" />
    <link rel="stylesheet" href="raport.css" />
  </head>
  <body>
${tresc}
  </body>
</html>
`;

await fs.writeFile(path.join(here, "src/raport.html"), html);
console.log(
  `OK: ${strony.length} stron, ${tematy.length} tematów → ${path.relative(process.cwd(), path.join(here, "src/raport.html"))}`,
);
