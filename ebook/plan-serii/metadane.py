"""Uzupełnia PDF raportu po renderze: metadane (autor, temat, słowa kluczowe) i czytelne zakładki.

Chromium zapisuje tylko tytuł dokumentu, a zakładki buduje z wyrenderowanych nagłówków: z wielkimi
literami z CSS, twardymi spacjami i bez spacji w miejscu złamania wiersza. Skrypt podmienia nazwy
zakładek na atrybuty aria-label nagłówków z src/raport.html (ta sama kolejność co w PDF).
Zapis przyrostowy, więc struktura dostępności (tagged PDF) zostaje bez zmian.

Użycie:  python ebook/plan-serii/metadane.py [ścieżka.pdf]
Wymaga:  pip install pymupdf
"""

import sys
from html.parser import HTMLParser
from pathlib import Path

import pymupdf

TUTAJ = Path(__file__).parent
sciezka = Path(sys.argv[1]) if len(sys.argv) > 1 else TUTAJ / "export" / "raport-100-tematow-ebookow.pdf"


class Naglowki(HTMLParser):
    """Zbiera nazwy nagłówków h1–h6 w kolejności dokumentu (aria-label albo tekst)."""

    def __init__(self):
        super().__init__()
        self.nazwy, self._otwarty, self._tekst = [], None, []

    def handle_starttag(self, tag, attrs):
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"}:
            self._otwarty, self._tekst = dict(attrs).get("aria-label"), []
            self.nazwy.append(None)

    def handle_data(self, data):
        if self.nazwy and self.nazwy[-1] is None:
            self._tekst.append(data)

    def handle_endtag(self, tag):
        if tag in {"h1", "h2", "h3", "h4", "h5", "h6"} and self.nazwy and self.nazwy[-1] is None:
            nazwa = self._otwarty or " ".join("".join(self._tekst).split())
            self.nazwy[-1] = nazwa.replace(" ", " ")


parser = Naglowki()
parser.feed((TUTAJ / "src" / "raport.html").read_text(encoding="utf-8"))

doc = pymupdf.open(sciezka)
zakladki = doc.get_toc(simple=True)
if len(zakladki) != len(parser.nazwy):
    raise SystemExit(f"Liczba zakładek ({len(zakladki)}) nie zgadza się z nagłówkami ({len(parser.nazwy)})")
doc.set_toc([[poziom, nazwa, strona] for (poziom, _, strona), nazwa in zip(zakladki, parser.nazwy)])
doc.set_metadata(
    {
        **doc.metadata,
        "author": "KSIGN",
        "subject": "100 tematów na e-booki o marketingu e-commerce w 5 filarach, TOP 10 i szablon planu wydawniczego",
        "keywords": "e-booki, marketing e-commerce, AI, retencja, social commerce, first-party data, omnichannel, KSIGN",
    }
)
doc.saveIncr()
doc.close()
print(f"OK: metadane i {len(zakladki)} zakładek → {sciezka}")
