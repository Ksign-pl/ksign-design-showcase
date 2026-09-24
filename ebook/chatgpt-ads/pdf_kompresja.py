"""Zmniejsza PDF e-booka bez zmiany układu stron i uzupełnia metadane (autor, temat).

Chromium zapisuje posągi z cieniem (CSS `filter: drop-shadow`) jako bezstratne obrazy
w ok. 3-krotnej rozdzielczości, więc PDF waży kilkanaście MB. Skrypt podmienia w miejscu
strumienie dużych obrazów: kolor → JPEG, maska przezroczystości → mniejsza maska Flate.
Obiekty PDF zostają te same, więc odwołania z wzorców (Pattern) działają dalej
(`Document.rewrite_images` z PyMuPDF je psuje – dlatego robimy to ręcznie).

Użycie:  python ebook/chatgpt-ads/pdf_kompresja.py export/ebook/ebook.pdf [--jakosc 84] [--skala 0.62]
Wymaga:  pip install pymupdf pillow
"""

import argparse
import io
import os

import pymupdf
from PIL import Image

MIN_PIKSELI = 600_000  # mniejsze obrazy zostawiamy bez zmian


def przelicz(doc: pymupdf.Document, jakosc: int, skala: float) -> int:
    zmienione = 0
    for xref in range(1, doc.xref_length()):
        if doc.xref_get_key(xref, "Subtype")[1] != "/Image":
            continue
        # Maski (DeviceGray) przeliczamy razem z obrazem, do którego należą.
        if doc.xref_get_key(xref, "ColorSpace")[1] != "/DeviceRGB":
            continue
        # JPEG już przeliczony (np. drugie uruchomienie) – nie zmniejszamy drugi raz.
        if doc.xref_get_key(xref, "Filter")[1] == "/DCTDecode":
            continue
        szer = int(doc.xref_get_key(xref, "Width")[1])
        wys = int(doc.xref_get_key(xref, "Height")[1])
        if szer * wys < MIN_PIKSELI:
            continue
        nszer, nwys = max(1, round(szer * skala)), max(1, round(wys * skala))

        obraz = Image.open(io.BytesIO(doc.extract_image(xref)["image"])).convert("RGB")
        bufor = io.BytesIO()
        obraz.resize((nszer, nwys), Image.LANCZOS).save(bufor, "JPEG", quality=jakosc, optimize=True)
        doc.update_stream(xref, bufor.getvalue(), compress=False)
        doc.xref_set_key(xref, "Filter", "/DCTDecode")
        doc.xref_set_key(xref, "DecodeParms", "null")
        doc.xref_set_key(xref, "Width", str(nszer))
        doc.xref_set_key(xref, "Height", str(nwys))

        maska = doc.xref_get_key(xref, "SMask")
        if maska[0] == "xref":
            mxref = int(maska[1].split()[0])
            alfa = Image.open(io.BytesIO(doc.extract_image(mxref)["image"])).convert("L")
            doc.update_stream(mxref, alfa.resize((nszer, nwys), Image.LANCZOS).tobytes(), compress=True)
            doc.xref_set_key(mxref, "DecodeParms", "null")
            doc.xref_set_key(mxref, "Width", str(nszer))
            doc.xref_set_key(mxref, "Height", str(nwys))
        zmienione += 1
    return zmienione


def main() -> None:
    parser = argparse.ArgumentParser(description=__doc__.splitlines()[0])
    parser.add_argument("pdf")
    parser.add_argument("--jakosc", type=int, default=84, help="jakość JPEG (domyślnie 84)")
    parser.add_argument("--skala", type=float, default=0.62, help="skala dużych obrazów (domyślnie 0.62)")
    args = parser.parse_args()

    przed = os.path.getsize(args.pdf)
    doc = pymupdf.open(args.pdf)
    zmienione = przelicz(doc, args.jakosc, args.skala)
    meta = doc.metadata
    doc.set_metadata(
        {
            **meta,
            "author": meta.get("author") or "KSIGN",
            "subject": meta.get("subject") or "Reklamy w ChatGPT dla polskich firm",
            "keywords": meta.get("keywords") or "ChatGPT Ads, reklamy w ChatGPT, OpenAI, KSIGN",
        }
    )
    tymczasowy = args.pdf + ".tmp"
    doc.save(tymczasowy, garbage=1, deflate=True)
    doc.close()
    os.replace(tymczasowy, args.pdf)
    po = os.path.getsize(args.pdf)
    print(f"OK: {zmienione} obrazów, {przed / 1e6:.1f} MB → {po / 1e6:.1f} MB")


if __name__ == "__main__":
    main()
