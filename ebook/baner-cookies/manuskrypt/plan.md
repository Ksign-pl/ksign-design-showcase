# BANER COOKIES, KTÓRY NIE ZABIJA DANYCH – karta e-booka i plan stron

> Stan na 26.09.2026 · v0.1 (tekst) · temat #062 z raportu „100 tematów na e-booki o marketingu e-commerce”
> (`ebook/plan-serii/`). Tekst: strony 1–18 w `rozdzialy-01-03.md`, strony 19–40 w `rozdzialy-04-08.md`.

## Karta e-booka

| Pole               | Wartość                                                                                                                                                                           |
| ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Numer w serii      | 10                                                                                                                                                                                |
| Tytuł              | Baner cookies, który nie zabija danych.                                                                                                                                           |
| Podtytuł           | Zgody i Consent Mode v2 w praktyce – co mówi prawo, ile danych naprawdę tracisz i jak zaprojektować baner                                                                         |
| Filar              | 04 · First-party data i prywatność                                                                                                                                                |
| Dla kogo           | Sklepy korzystające z Google Ads, GA4 i Meta Ads (segment: średnie)                                                                                                               |
| Problem czytelnika | „Po wdrożeniu banera cookies z GA4 zniknęła duża część danych, a kampanie gorzej się optymalizują. Nie wiem też, czy baner jest zgodny z prawem.”                                 |
| Obietnica          | W 20 minut sprawdzisz baner z przepisami i stanowiskami organów UE, policzysz, ile danych naprawdę tracisz, wybierzesz tryb Consent Mode v2 i dostaniesz gotowe teksty banera.    |
| Premiera           | **[DO DECYZJI]** Propozycja: czwartek 8.07.2027, najpóźniej 15.07. Wakacje to spokojniejszy sezon na porządek w danych przed Q4.                                                  |
| Format             | Jak poprzednie e-booki: 4:5 (1080 × 1350 px), 40 stron z 8 plakatami rozdziałów, PDF + PNG każdej strony. Skład osobno, po decyzjach.                                             |
| Oferta (3 kroki)   | Z kalendarza: audyt pomiaru i zgód. Propozycja niżej.                                                                                                                             |
| Badanie            | Z kalendarza: „Banery cookies w 100 sklepach”. Propozycja niżej – **decyzja do 15.05.2027**.                                                                                      |
| Status             | Tekst v0.1 (26.09.2026): 40 stron, 4 tabele z `kalkulator.mjs`, źródła z datami (PKE, RODO, wyrok TSUE Planet49, EROD, pomoc Google Ads i Analytics, dokumentacja Google i Meta). |

## Plan stron

| Str.  | Rozdział                       | Strona                                       | Treść                                                                                  | Stan  |
| ----- | ------------------------------ | -------------------------------------------- | -------------------------------------------------------------------------------------- | ----- |
| 1     | –                              | Okładka                                      | Scena: marmurowe ciastko przełamane na pół, pęknięcie z turkusowego szkła              | tekst |
| 2     | –                              | Dla kogo i jak czytać                        | Dla kogo, 20 minut czytania, stan wiedzy, nota                                         | tekst |
| 3     | –                              | Spis treści                                  | 8 rozdziałów + ściąga, 3 kroki, słowniczek                                             | tekst |
| 4     | 01 Co mówi prawo               | Plakat                                       | Scena: marmurowa waga z ciastkiem i turkusową szklaną kłódką                           | tekst |
| 5     | 01                             | Kiedy potrzebujesz zgody                     | Art. 399 PKE: zgoda, wyjątki, ustawienia przeglądarki, art. 400                        | tekst |
| 6     | 01                             | Co jest ważną zgodą                          | RODO, wyrok TSUE Planet49, przewijanie i blokada treści według EROD                    | tekst |
| 7     | 01                             | 7 praktyk, które EROD uznaje za błąd         | Raport grupy zadaniowej EROD o banerach (17.01.2023)                                   | tekst |
| 8     | 01                             | Kto kontroluje i jakie kary                  | Prezes UKE (do 3% przychodu), UODO (do 20 mln EUR / 4% obrotu), zasady Google          | tekst |
| 9     | 02 Ile danych naprawdę tracisz | Plakat                                       | Scena: marmurowa klepsydra, w której przesypuje się tylko część turkusowych kryształów | tekst |
| 10    | 02                             | Mniej sesji to nie tyle samo mniej konwersji | Tabela: widoczne sesje i konwersje przy 40–80% zgód (Google: przewaga 2–5×)            | tekst |
| 11    | 02                             | Skąd różnice między panelami                 | GA4, Google Ads, Meta i sklep – kto co liczy                                           | tekst |
| 12    | 02                             | Policz u siebie                              | Kartka: odsetek zgód, sesje, zamówienia w sklepie i w GA4                              | tekst |
| 13    | 03 Consent Mode v2             | Plakat                                       | Scena: marmurowy przełącznik z turkusowym szklanym suwakiem                            | tekst |
| 14    | 03                             | 7 rodzajów zgody                             | Tabela parametrów; co doszło w v2; wymogi Google w EOG od marca 2024                   | tekst |
| 15    | 03                             | Tryb podstawowy czy zaawansowany             | Tabela porównania z dokumentacji Google                                                | tekst |
| 16    | 03                             | Progi modelowania                            | Tabele: próg GA4 (1000 użytkowników ze zgodą) i Google Ads (700 kliknięć w 7 dni)      | tekst |
| 17    | 03                             | Wdrożenie krok po kroku                      | Kolejność kodu, wait_for_update, region, url_passthrough, ads_data_redaction, CMP      | tekst |
| 18    | 03                             | Tryb zaawansowany a prawo                    | Co zawierają pingi bez cookies; decyzja z prawnikiem lub IOD                           | tekst |
| 19    | 04 Meta i inne tagi            | Plakat                                       | Scena: marmurowa tablica rozdzielcza z turkusowymi szklanymi bezpiecznikami            | tekst |
| 20    | 04                             | Piksel Meta i zgoda                          | fbq consent revoke/grant; jakie dane zbiera piksel                                     | tekst |
| 21    | 04                             | Serwer nie zastępuje zgody                   | API konwersji, konwersje rozszerzone, tagowanie po stronie serwera                     | tekst |
| 22    | 04                             | Mapa tagów w 30 minut                        | Tabela: tag, cel, kategoria zgody, kto odbiera dane                                    | tekst |
| 23    | 05 Projekt banera              | Plakat                                       | Scena: marmurowa ramka z dwoma równymi turkusowymi szklanymi przyciskami               | tekst |
| 24    | 05                             | Pierwsza warstwa                             | „Akceptuję” i „Odrzucam” obok siebie, 3 zdania, link do ustawień                       | tekst |
| 25    | 05                             | Druga warstwa: kategorie                     | 4 kategorie, puste pola, lista plików cookie z czasem działania i odbiorcami           | tekst |
| 26    | 05                             | Gotowe teksty banera                         | Nagłówek, opis, przyciski, kategorie – do skopiowania                                  | tekst |
| 27    | 05                             | Wycofanie zgody                              | Link w stopce albo ikona; równie łatwo jak zgoda                                       | tekst |
| 28    | 05                             | Test banera bez ciemnych wzorców             | Tabela: odwiedzający na wersję; co wolno testować                                      | tekst |
| 29    | 06 Pomiar po wdrożeniu         | Plakat                                       | Scena: marmurowy stetoskop na turkusowym szklanym ciastku                              | tekst |
| 30    | 06                             | 10 testów technicznych                       | Narzędzia przeglądarki, parametry zgody, Tag Assistant, diagnostyka Google Ads         | tekst |
| 31    | 06                             | Raport co miesiąc                            | 8 liczb                                                                                | tekst |
| 32    | 07 9 błędów                    | Plakat                                       | Scena: marmurowy słoik na ciastka z pękniętą turkusową szklaną pokrywką                | tekst |
| 33–34 | 07                             | 9 błędów (2 strony)                          | Każdy błąd z „Zamiast tego” i odsyłaczem do strony                                     | tekst |
| 35    | 08 Badanie                     | Plakat                                       | Scena: marmurowa lupa nad turkusowymi szklanymi banerami                               | tekst |
| 36    | 08                             | Test banera w 10 punktach                    | Samodzielny test                                                                       | tekst |
| 37    | 08                             | Banery cookies w 100 sklepach                | Metoda badania; wyniki **[DO UZUPEŁNIENIA]**                                           | tekst |
| 38    | –                              | Ściąga                                       | Lista kontrolna na 1 stronę + „moje liczby”                                            | tekst |
| 39    | –                              | 3 kolejne kroki                              | Przegląd banera i pomiaru (0 zł), wdrożenie, pomiar co miesiąc – **[DO DECYZJI]**      | tekst |
| 40    | –                              | Słowniczek i źródła                          | 11 pojęć, źródła z obu części manuskryptu                                              | tekst |

## Oferta – 3 kolejne kroki (propozycja)

Z kalendarza w raporcie: „Audyt pomiaru i zgód”.

1. **Przegląd banera i pomiaru · 0 zł.** Sprawdzimy baner z listą z rozdziału 08, pliki cookie przed zgodą i stan
   Consent Mode. **[DO DECYZJI: nazwa, termin odpowiedzi]**
2. **Wdrożenie banera i Consent Mode v2.** Platforma zgód, teksty, mapa tagów, Google i Meta, testy techniczne.
   **[DO DECYZJI: cena]**
3. **Pomiar co miesiąc.** Raport 8 liczb, kontrola tagów po zmianach w sklepie. **[DO DECYZJI: cena lub abonament]**

## Badanie – propozycja (rozdział 08)

- **Pytanie:** jak polskie sklepy pytają o zgodę na cookies i czy zapisują pliki cookie przed zgodą.
- **Próba:** 100 sklepów w 5 kategoriach (uroda, moda, dom, sport, elektronika), po 20.
- **Co sprawdzamy (automat w przeglądarce, bez klikania w baner):** czy jest baner, czy na pierwszej warstwie jest
  przycisk odrzucenia, czy pola na drugiej warstwie są puste, które pliki cookie reklamowe i analityczne pojawiają się
  przed zgodą (np. `_ga`, `_gcl_au`, `_fbp`), czy tag Google wysyła parametry trybu zgody.
- **Jak:** automat jak w badaniu do e-booka #01 + ręczna kontrola sklepów, które go zatrzymają. Nie klikamy
  „Akceptuję” ani „Odrzucam” w trybie automatycznym poza osobnym testem 10 sklepów.
- **Termin:** 1–12.06.2027; wyniki w e-booku (str. 37) i w osobnym poście.
- **[DO DECYZJI do 15.05.2027]:** czy robimy badanie i czy publikujemy nazwy sklepów (proponujemy: nie).

## Haki na Instagram i YouTube

| Format           | Hak                                                                                            | Materiał z e-booka |
| ---------------- | ---------------------------------------------------------------------------------------------- | ------------------ |
| Rolka / Short    | „Baner bez przycisku «Odrzuć»? Większość organów ochrony danych w UE uznaje to za naruszenie.” | str. 7             |
| Rolka / Short    | „60% zgód nie znaczy 40% mniej sprzedaży w GA4. Dlaczego?”                                     | str. 10            |
| Rolka / Short    | „Consent Mode: tryb podstawowy czy zaawansowany? 3 różnice”                                    | str. 15            |
| Karuzela         | „7 praktyk w banerach cookies, które EROD uznaje za błąd”                                      | str. 7             |
| Karuzela         | „Gotowy tekst banera cookies – do skopiowania”                                                 | str. 26            |
| YouTube 8–10 min | „Baner cookies i Consent Mode v2: od prawa do danych w GA4”                                    | rozdziały 01–03    |

Miniatura YouTube: „Odrzuć = Akceptuj” na tle marmurowego ciastka z turkusowym pęknięciem.

## Do sprawdzenia tuż przed publikacją

- **PKE:** czy art. 399, 400, 444 i 446 się nie zmieniły (API Sejmu, akty zmieniające).
- **UE:** czy zmieniły się przepisy o cookies (dyrektywa o prywatności i łączności elektronicznej) albo wytyczne EROD.
- **Google:** dokumentacja trybu uzyskiwania zgody, progi modelowania w GA4 i Google Ads, zasady zgody użytkownika
  z UE.
- **Meta:** dokumentacja piksela i RODO.
- **Dane w przykładach** (odsetki zgód, koszt kliknięcia, liczba użytkowników) są założeniami – nie zmieniać ich na
  „średnie z rynku” bez źródła.
