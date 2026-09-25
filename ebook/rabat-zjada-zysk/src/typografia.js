// Polska typografia na stronach e-booka: twarde spacje po jednoliterowych słowach,
// przed półpauzą i między liczbą a jednostką, żeby nic nie zostawało samo na końcu wiersza.
(function () {
  const NBSP = "\u00a0";
  const rules = [
    // Lookbehind, żeby wiązać też ciągi jednoliterowych słów („a w salonie”).
    [/(?<=^|[\s(„])([aiouwzAIOUWZ])\s+/g, `$1${NBSP}`],
    [/\s+([–—])\s/g, `${NBSP}$1 `],
    [
      /(\d)\s+(zł|mln|mld|tys\.|dni|dzień|min|minut|stron|znaków|lat|r\.|szt\.|sztuk|sklepów|produktów|tygodni)/g,
      `$1${NBSP}$2`,
    ],
    // Grupy tysięcy: „30 945 000 zł” w jednym wierszu.
    [/(\d) (?=\d{3}\b)/g, `$1${NBSP}`],
    [/(\b(?:str|ok|np|nr|art|ust|poz|tzw)\.)\s+/g, `$1${NBSP}`],
    [/\b(pkt|rozdz\.)\s+(\d)/g, `$1${NBSP}$2`],
    [/(\d)\s+(€|\$|×)/g, `$1${NBSP}$2`],
    [/(\d)–(\d)/g, "$1–⁠$2"],
    [/\b([eE])-(\p{L})/gu, "$1-⁠$2"],
    // Liczba zostaje ze słowem, które po niej następuje („10 punktach”, „3 razy”).
    [/(\d)[ \t\n]+(?=\p{L})/gu, `$1${NBSP}`],
    // Nazwy akcji zawsze w jednym wierszu.
    [/\b(Black)\s+(Friday|Week|Weeks|November)\b/g, `$1${NBSP}$2`],
    [/\b(Cyber)\s+(Monday)\b/g, `$1${NBSP}$2`],
    [/\b(Allegro)\s+(Days)\b/g, `$1${NBSP}$2`],
  ];

  function fix(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      let text = node.nodeValue;
      // Dwa przebiegi łapią ciągi typu „i w”.
      for (let pass = 0; pass < 2; pass++) {
        for (const [re, rep] of rules) text = text.replace(re, rep);
      }
      node.nodeValue = text;
      return;
    }
    if (
      node.nodeType === Node.ELEMENT_NODE &&
      node.nodeName !== "SCRIPT" &&
      node.nodeName !== "STYLE"
    ) {
      node.childNodes.forEach(fix);
    }
  }

  // Bez sierotek: dwa ostatnie słowa akapitu, punktu listy, komórki i podpisu trzymają się razem.
  const BLOKI =
    "p, li, h1, h2, h3, td, .stat__t, .tl__t, .err__good, .err__bad > span, .trzy > div, .gloss > div";
  const KONIEC = /^([\s\S]*[^ \t\n])[ \t\n]+([^ \t\n]{1,24}[ \t\n]*)$/;

  function bezSierotki(el) {
    const w = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
    let ostatni = null;
    while (w.nextNode()) if (w.currentNode.nodeValue.trim()) ostatni = w.currentNode;
    if (!ostatni) return;
    const m = ostatni.nodeValue.match(KONIEC);
    if (m) ostatni.nodeValue = m[1] + NBSP + m[2];
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".page").forEach((strona) => {
      fix(strona);
      strona.querySelectorAll(BLOKI).forEach(bezSierotki);
    });
  });
})();
