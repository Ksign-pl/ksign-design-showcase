// Polska typografia na stronach e-booka: twarde spacje po jednoliterowych słowach,
// przed półpauzą i między liczbą a jednostką, żeby nic nie zostawało samo na końcu wiersza.
(function () {
  const NBSP = " ";
  const rules = [
    [/(^|[\s(„])([aiouwzAIOUWZ])\s+/g, `$1$2${NBSP}`],
    [/\s+([–—])\s/g, `${NBSP}$1 `],
    [/(\d)\s+(zł|mln|mld|tys\.|dni|dzień|min|minut|stron|znaków|lat)/g, `$1${NBSP}$2`],
    [/(\b(?:str|ok|np|nr)\.)\s+/g, `$1${NBSP}`],
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

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".page").forEach(fix);
  });
})();
