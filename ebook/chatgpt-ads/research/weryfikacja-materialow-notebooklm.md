# Weryfikacja materiałów z NotebookLM (24.09.2026)

**Co sprawdzone:** 5 plików od Karola (Blueprint – 14 slajdów, „Przewodnik”, „Koszty”, „Tworzenie reklam”, arkusz
porównania kampanii) i 2 infografiki z Gemini Notebook.

**Na czym bazują:** wszystkie materiały to podsumowania dwóch filmów z YouTube:

1. „How to run ChatGPT Ads in Europe in 2026 (Full Tutorial)” – case B2C (Europa).
2. „I Spent $1K on ChatGPT Ads — Here's the Truth” – Grow My Ads, case B2B. Wersja tekstowa:
   https://growmyads.com/chatgpt-ads-review/ (03.08.2026, rynki USA/CA/AU/NZ).

## Wniosek

- **Wartość:** praktyka z panelu (pułapki, stawki, lejek) i dwa realne case'y. Trafią do rozdziałów 03–07.
- **Cytujemy źródła pierwotne**, nie NotebookLM: filmy, artykuł Grow My Ads, OpenAI Help Center.
- **Grafik nie publikujemy.** Pokazują interfejs ChatGPT z logo OpenAI (łamie naszą zasadę „bez imitacji ChatGPT”),
  mają błędy merytoryczne (niżej) i znak wodny Gemini.

## Twierdzenia i ich status

| #   | Twierdzenie z materiałów                                       | Status                                                                                                                                               | Gdzie w e-booku        |
| --- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------- |
| 1   | Reklamy widzą tylko darmowi użytkownicy                        | **Nieprecyzyjne.** Widzą Free, Go i niezalogowani. Nie widzą Plus, Pro, Business, Enterprise, Edu.                                                   | str. 8 (już poprawnie) |
| 2   | Tytuł do 50 znaków, opis do 100                                | **Potwierdzone** (cloro.dev, 15.09.2026). Obraz kwadratowy min. 256 × 256 px.                                                                        | str. 7 – poprawione    |
| 3   | Formaty: obraz statyczny i karuzela                            | **Częściowo.** Karuzela = kampanie z feedu produktowego (od 07.08.2026, cena z feedu). Zwykła reklama = 1 obraz. Wideo brak.                         | str. 7 – poprawione    |
| 4   | „Text customization” – AI personalizuje nagłówki               | **Potwierdzone i ważniejsze, niż wynika z materiałów:** domyślnie włączone, AI tłumaczy i przerabia tytuł i opis, wersje mogą iść bez akceptacji.    | str. 7, rozdz. 05, 07  |
| 5   | „Campaign Budget nie da się edytować – trzeba budować od nowa” | **Częściowo błędne.** Z budżetu na całą kampanię da się przejść na dzienny, ale nie z powrotem (OpenAI Help Center). Kwotę dzienną można zmieniać.   | str. 9 – poprawione    |
| 6   | Sugerowana stawka 3–5 USD, poniżej 3 USD ostrzeżenie           | **Potwierdzone dla kont w USD** (cloro.dev). Próg dla kont w PLN nieznany – **[SPRAWDZIĆ w panelu]**.                                                | str. 21                |
| 7   | Analityka: tylko kliknięcia, CPC, CPM („black box”)            | **Nieaktualne.** Są już konwersje (pixel, zdarzenia), cel konwersji (oCPC), raport karuzeli. Nadal brak danych demograficznych.                      | str. 23                |
| 8   | Kod konwersji tylko na stronie podziękowania                   | **Poprawna zasada.** Kod zdarzenia na każdej podstronie liczy każde wejście jako konwersję.                                                          | str. 15, rozdz. 07     |
| 9   | UTM obowiązkowe, bez nich ruch w GA4 jako „direct”             | **Zgodne z zaleceniem OpenAI.** Uwaga: u Grow My Ads dodanie UTM „zepsuło” reklamę – link testujemy przed startem.                                   | str. 15, 20, rozdz. 07 |
| 10  | Case B2B: 1200 USD, 92 kliknięcia, CPC 13 USD, 0 konwersji     | **Potwierdzone w źródle** (+ CTR 1%, CPM 120 USD, start ze stawką 25 USD). Rynek USA – nie przenosić 1:1 na PL.                                      | rozdz. 03, 06          |
| 11  | Case B2C (Europa): CPC 0,67 USD, CTR 1,3%, 4 konwersje         | **Niezweryfikowane i sprzeczne:** Blueprint podaje 62 USD / 100 kliknięć (= 0,62 USD), arkusz – budżet 250 USD. Użyjemy dopiero po obejrzeniu filmu. | rozdz. 06 (warunkowo)  |
| 12  | „CPC od 3 do 13 USD” (infografika)                             | **Błędne.** 3 USD to sugerowana stawka startowa, nie koszt. W case B2C realne CPC było niższe niż 1 USD.                                             | —                      |
| 13  | „Ustaw 25 USD, żeby przebić barierę” (Blueprint)               | **Nie rekomendujemy.** Jedyny przykład skończył się CPC 13 USD i zerem konwersji.                                                                    | rozdz. 07 jako błąd    |
| 14  | W Europie brak Custom Audiences i targetowania demograficznego | **Zgodne** z krokiem 2 (brak personalizacji i własnych grup odbiorców w EOG).                                                                        | str. 8, 12             |
| 15  | Pierwszy test za 250–500 USD                                   | **Zgodne co do rzędu wielkości** z naszym minimum: 65 zł × 14 dni = 910 zł.                                                                          | str. 9, 22             |
| 16  | Zweryfikowane konto firmowe, 1–2 dni                           | **Niezweryfikowane** – **[SPRAWDZIĆ przy zakładaniu konta KSIGN]**.                                                                                  | str. 13                |
| 17  | Liczba wskazówek kontekstowych w grupie reklam                 | **Otwarte.** Poradniki podają różne wartości, a nasz plan str. 17 zakłada „mało wskazówek w grupie, więcej grup”. Rozstrzygnąć przy rozdz. 05.       | str. 17                |
| 18  | Lejek: quiz / bridge page → e-mail → nurture → oferta          | **Dobra praktyka.** Pasuje do drabinki KSIGN: Test drzwi → [Generator] → wdrożenie.                                                                  | str. 16, 30            |

## Błędy w infografikach Gemini

- Interfejs ChatGPT i logo OpenAI na grafikach – nie do użycia w materiałach KSIGN.
- „Karuzele” jako format ogólny – w rzeczywistości tylko kampanie z feedu.
- Lista „kto nie widzi” pomija Enterprise, Edu, osoby poniżej 18 lat, czat tymczasowy i Atlas. Pomija też niezalogowanych, którzy reklamy widzą.
- „CPC 3–13 USD” miesza stawkę startową z kosztem kliknięcia.
- Blueprint sam sobie przeczy: slajd 12 mówi „wyłącznie jeden statyczny obraz”, a przewodnik – „obraz lub karuzela”.
- Arkusz: „użytkownicy darmowych i płatnych wersji ChatGPT” – płatne plany poza Go reklam nie widzą.

## Źródła weryfikacji (dostęp 24.09.2026)

- Grow My Ads, „Should You Advertise on ChatGPT? Our Honest Take After $1,000 in Spend”, 03.08.2026 – https://growmyads.com/chatgpt-ads-review/
- cloro.dev, „How to Advertise on ChatGPT: Self-Serve Ads Manager Guide”, akt. 15.09.2026 – https://cloro.dev/blog/how-to-advertise-on-chatgpt/
- Sprites, „ChatGPT Ads Manager: Setup Guide with Screenshots”, 21.09.2026 – https://www.sprites.ai/chatgpt-ads-manager
- Search Engine Roundtable, „OpenAI ChatGPT Ads Updates: oCPC, Dynamic URLs, Multi-Product Carousel Format” – https://www.seroundtable.com/openai-chatgpt-ads-updates-41828.html
- Digiday, „OpenAI brings product carousels to ChatGPT ads” – https://digiday.com/marketing/openai-brings-product-carousels-to-chatgpt-ads/
- OpenAI Help Center, „Daily Budgets” – https://help.openai.com/en/articles/20001413-daily-budgets (blokuje pobranie; treść z wyników wyszukiwania)
