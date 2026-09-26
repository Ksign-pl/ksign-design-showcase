# BANER COOKIES, KTÓRY NIE ZABIJA DANYCH – manuskrypt, strony 19–40

> Wersja robocza v0.1 · fakty sprawdzone 25–26.09.2026 · zasady jak w `rozdzialy-01-03.md`.
>
> **Tabele z liczbami wstawia skrypt** – po zmianie założeń w `kalkulator.mjs`:
> `node kalkulator.mjs --wstaw manuskrypt/rozdzialy-04-08.md && prettier --write manuskrypt/rozdzialy-04-08.md`

---

# ROZDZIAŁ 04 · META I INNE TAGI

## Str. 19 · Plakat rozdziału

- **Numer:** 04
- **Tytuł:** Meta i inne tagi.
- **Lead:** Tryb zgody Google działa tylko w tagach Google. Piksel Meta, czat, mapa kliknięć i każdy inny tag
  potrzebują własnej blokady do czasu zgody.
- **W tym rozdziale:** Piksel Meta i zgoda · Serwer nie zastępuje zgody · Mapa tagów w 30 minut
- **Scena 3D:** marmurowa tablica rozdzielcza z turkusowymi szklanymi bezpiecznikami. Jeden z nich jest wyłączony.

---

## Str. 20 · Piksel Meta i zgoda

**Marker:** [ 04 / META I INNE TAGI ]
**Nagłówek:** PIKSEL META I ZGODA

**Lead:** Meta nie ma odpowiednika trybu zgody z modelowaniem. Piksel ma za to prosty przełącznik: wstrzymaj, a po
zgodzie – wznów.

**Co pisze Meta:**

- **Każda firma sama odpowiada** za zgodność z RODO.
- **Warto wdrożyć baner**, który wymaga wyraźnej zgody przed użyciem piksela.
- **Wstrzymanie wysyłki** do czasu zgody: `fbq('consent', 'revoke');` – na każdej stronie. Po zgodzie:
  `fbq('consent', 'grant');`.
- **Regulamin narzędzi biznesowych Meta** wymaga wyraźnej informacji dla odwiedzających, jak korzystasz z plików
  cookie i jakie dane z witryny udostępniasz innym firmom.

**Jakie dane zbiera piksel (według Meta):**

| Rodzaj danych         | Przykłady                                                                       |
| --------------------- | ------------------------------------------------------------------------------- |
| Nagłówki HTTP         | adres IP, przeglądarka, adres strony, strona, z której przyszedł klient         |
| Dane piksela          | identyfikator piksela, plik cookie Facebooka                                    |
| Kliknięcia przycisków | kliknięte przyciski, ich etykiety i strony, na które prowadzą                   |
| Wartości opcjonalne   | np. wartość konwersji, typ strony                                               |
| Nazwy pól formularzy  | np. „email”, „adres” – bez wartości, chyba że włączysz zaawansowane dopasowanie |

**Przez Menedżera tagów:** piksel uruchamiaj wyzwalaczem po zgodzie marketingowej z platformy zgód, a przy wycofaniu
zgody wywołuj `revoke`.

---

## Str. 21 · Serwer nie zastępuje zgody

**Marker:** [ 04 / META I INNE TAGI ]
**Nagłówek:** SERWER NIE ZASTĘPUJE ZGODY

**Lead:** API konwersji Meta, konwersje rozszerzone Google i tagowanie po stronie serwera poprawiają jakość danych.
Nie zwalniają jednak ze zgody.

**Co wynika z zasad Google:**

- **Zasady zgody użytkownika z UE** wymagają zgody na zbieranie, udostępnianie i wykorzystanie danych osobowych do
  personalizacji reklam. Nie przewidują wyjątku dla danych wysyłanych z serwera.
- **Wymogi dla ruchu z EOG** dotyczą też danych z GA4 używanych w Google Ads. Przy przesyłaniu danych z innych źródeł
  Google odsyła do swoich zasad dotyczących danych klientów.

**Nasza interpretacja:** RODO i art. 399 PKE dotyczą celu i danych, a nie techniki przesyłania. Jeśli piksel wymaga
zgody, to te same dane wysłane z serwera też jej wymagają. **[SPRAWDZIĆ z prawnikiem]**

**Jak to ustawić w praktyce:**

1. Serwer wysyła zdarzenia marketingowe tylko osób, które zgodziły się na marketing.
2. Stan zgody z banera zapisujesz przy zamówieniu, żeby serwer mógł go sprawdzić.
3. W polityce prywatności opisujesz przesyłanie danych z serwera – tak jak z przeglądarki.

**Po co więc serwer?** Dane osób ze zgodą docierają pełniej: nie gubią się przez blokady w przeglądarce, a zakup
potwierdza system sklepu, nie skrypt na stronie podziękowania.

---

## Str. 22 · Mapa tagów w 30 minut

**Marker:** [ 04 / META I INNE TAGI ]
**Nagłówek:** MAPA TAGÓW W 30 MINUT

**Lead:** Nie ocenisz banera, jeśli nie wiesz, co ze sklepu wysyła dane. Zrób listę wszystkich tagów i plików cookie.

| Tag albo narzędzie | Cel                    | Kategoria zgody | Pliki cookie                       | Kto dostaje dane |
| ------------------ | ---------------------- | --------------- | ---------------------------------- | ---------------- |
| Koszyk i logowanie | działanie sklepu       | niezbędne       | pliki sesji sklepu                 | sklep            |
| Google Analytics 4 | statystyki             | analityczne     | `_ga`, `_ga_<identyfikator>`       | Google           |
| Google Ads         | konwersje, remarketing | marketingowe    | `_gcl_…`                           | Google           |
| Piksel Meta        | konwersje, remarketing | marketingowe    | plik cookie piksela Meta           | Meta             |
| Czat z obsługą     | obsługa klienta        | sprawdź         | sprawdź w narzędziach przeglądarki | dostawca czatu   |

**Jak zrobić mapę:**

1. Otwórz sklep w oknie prywatnym i narzędzia przeglądarki: karta z plikami cookie i karta z zapytaniami sieciowymi.
2. Kliknij „Akceptuję wszystkie” i zapisz każdy nowy plik cookie oraz domenę, do której idą zapytania.
3. Porównaj z listą tagów w Menedżerze tagów i we wtyczkach sklepu.
4. Każdemu tagowi przypisz cel i kategorię zgody. Jeśli nie umiesz wykazać, że tag jest niezbędny – nie jest (str. 7).

_Nazwy plików cookie Google według pomocy Google (`_ga` działa 2 lata). Pozostałe wiersze to przykład – wypełnij
tabelę dla swojego sklepu._

> **Do zrobienia dziś**
>
> 1. Zrób mapę tagów dla strony głównej, karty produktu i strony podziękowania.
> 2. Sprawdź, czy piksel Meta czeka na zgodę marketingową.

---

# ROZDZIAŁ 05 · PROJEKT BANERA

## Str. 23 · Plakat rozdziału

- **Numer:** 05
- **Tytuł:** Projekt banera.
- **Lead:** Baner zgodny z prawem nie musi straszyć. Dwa równe przyciski, trzy zdania i jasne kategorie – i klient
  wie, na co się zgadza.
- **W tym rozdziale:** Pierwsza warstwa · Kategorie · Gotowe teksty · Wycofanie zgody · Test banera
- **Scena 3D:** marmurowa ramka z dwoma równymi turkusowymi szklanymi przyciskami.

---

## Str. 24 · Pierwsza warstwa

**Marker:** [ 05 / PROJEKT BANERA ]
**Nagłówek:** PIERWSZA WARSTWA

**Lead:** Pierwsza warstwa decyduje o zgodności z prawem i o odsetku zgód. Klient musi mieć wybór bez szukania.

**6 zasad:**

1. **„Akceptuję wszystkie” i „Odrzucam” obok siebie** – ten sam rozmiar, czytelny kontrast. Brak odrzucenia albo
   odrzucenie jako link w tekście EROD uznaje za błąd (str. 7).
2. **Trzeci przycisk: „Ustawienia”** – prowadzi do kategorii (str. 25).
3. **2–3 zdania:** po co pliki cookie, kto dostaje dane (np. Google, Meta) i jak zmienić zdanie.
4. **Linki:** polityka prywatności i lista plików cookie z czasem działania (str. 6).
5. **Baner nie zasłania sklepu.** Blokada treści do czasu zgody oznacza zgodę niedobrowolną (str. 6).
6. **Do czasu wyboru tagi czekają** – poza tagami Google w trybie zaawansowanym, jeśli świadomie go wybierzesz
   (str. 18).

**Zamknięcie banera krzyżykiem** traktuj jak brak zgody – nie jest wyraźnym działaniem (nasza rekomendacja).

---

## Str. 25 · Druga warstwa: kategorie

**Marker:** [ 05 / PROJEKT BANERA ]
**Nagłówek:** DRUGA WARSTWA: KATEGORIE

**Lead:** 4 kategorie, puste pola i pełna informacja. Klient zgadza się na to, co wybierze – nic więcej.

| Kategoria    | Domyślnie       | Przykłady                              | Parametry Google (tryb zgody)                      |
| ------------ | --------------- | -------------------------------------- | -------------------------------------------------- |
| Niezbędne    | zawsze włączone | koszyk, logowanie, zapamiętanie wyboru | `security_storage`                                 |
| Funkcjonalne | wyłączone       | czat, osadzone filmy i mapy            | `functionality_storage`, `personalization_storage` |
| Analityczne  | wyłączone       | Google Analytics                       | `analytics_storage`                                |
| Marketingowe | wyłączone       | Google Ads, piksel Meta                | `ad_storage`, `ad_user_data`, `ad_personalization` |

**Przy każdej kategorii:** cel w jednym zdaniu, lista plików cookie z czasem działania i informacja, czy mają do nich
dostęp inne firmy (wyrok Planet49, str. 6).

**Przyciski na drugiej warstwie:** „Zapisz wybór”, „Akceptuję wszystkie”, „Odrzucam wszystkie”.

_Przypisanie parametrów Google do kategorii to nasza propozycja. Sprawdź je z mapą tagów (str. 22)._

---

## Str. 26 · Gotowe teksty banera

**Marker:** [ 05 / PROJEKT BANERA ]
**Nagłówek:** GOTOWE TEKSTY BANERA

**Lead:** Do skopiowania i dopasowania. Nazwy dostawców i listę plików cookie wpisz z mapy tagów.

**Pierwsza warstwa:**

> **Pliki cookie w [Sklep]**
>
> Używamy plików cookie, żeby sklep działał, a za Twoją zgodą – także do statystyk i reklam. Dane z plików
> statystycznych i reklamowych trafiają też do naszych partnerów, m.in. Google i Meta. Zgodę zmienisz w każdej chwili
> w stopce strony („Ustawienia cookies”). Szczegóły: [Polityka prywatności] · [Lista plików cookie]
>
> **[Akceptuję wszystkie] [Odrzucam] [Ustawienia]**

**Druga warstwa:**

> **Niezbędne** – zawsze włączone. Koszyk, logowanie i zapamiętanie Twojego wyboru w tym oknie. Bez nich sklep nie
> działa.
>
> **Funkcjonalne** – czat z obsługą, osadzone filmy i mapy. Dostawcy: [lista].
>
> **Analityczne** – statystyki odwiedzin: które strony pomagają w zakupach. Dostawca: Google (Google Analytics).
>
> **Marketingowe** – pomiar skuteczności reklam i reklamy dopasowane do Twoich zainteresowań. Dostawcy: Google
> (Google Ads), Meta (Facebook, Instagram).
>
> **[Zapisz wybór] [Akceptuję wszystkie] [Odrzucam wszystkie]**

**Link w stopce:** „Ustawienia cookies”.

_Teksty to nasza propozycja. Sprawdź je z prawnikiem razem z polityką prywatności._

---

## Str. 27 · Wycofanie zgody

**Marker:** [ 05 / PROJEKT BANERA ]
**Nagłówek:** WYCOFANIE ZGODY

**Lead:** Wycofanie zgody musi być równie łatwe jak jej wyrażenie (art. 7 ust. 3 RODO). Jeden klik w baner – jeden
klik, żeby zmienić zdanie.

**Co pisze EROD:** potrzebny jest łatwo dostępny sposób, np. mała ikona widoczna na każdej stronie albo link
w widocznym, standardowym miejscu. Organy nie narzucają jednego rozwiązania – oceniają, czy wycofanie jest równie
łatwe.

**Jak to zrobić:**

1. **Link „Ustawienia cookies” w stopce każdej strony** – otwiera drugą warstwę banera.
2. **Po wycofaniu zgody tagi przestają wysyłać dane:** `gtag("consent", "update", …)` z odmową i
   `fbq('consent', 'revoke');`.
3. **Pliki cookie z wycofanych kategorii usuń,** jeśli platforma zgód to umożliwia (nasza rekomendacja).
4. **Nie pytaj ponownie przy każdej wizycie** – ustal okres, np. 6 miesięcy, i wpisz go do polityki prywatności
   (nasza rekomendacja).

---

## Str. 28 · Test banera bez ciemnych wzorców

**Marker:** [ 05 / PROJEKT BANERA ]
**Nagłówek:** TEST BANERA BEZ CIEMNYCH WZORCÓW

**Lead:** Odsetek zgód możesz poprawić uczciwie – jaśniejszym tekstem i lepszym miejscem, a nie ukrywaniem
odrzucenia.

<!-- tabela:test -->

| Odsetek zgód teraz | Wzrost o 3 pkt proc. | Wzrost o 5 pkt proc. | Wzrost o 10 pkt proc. |
| ------------------ | -------------------- | -------------------- | --------------------- |
| 40%                | 4231 na wersję       | 1531 na wersję       | 385 na wersję         |
| 60%                | 4126 na wersję       | 1468 na wersję       | 354 na wersję         |
| 80%                | 2626 na wersję       | 903 na wersję        | 197 na wersję         |

<!-- /tabela:test -->

**Jak czytać tabelę:** przy 60% zgód i wzroście o 5 punktów procentowych potrzebujesz ok. 1500 odwiedzających na
wersję. Przy 1000 odwiedzających dziennie test potrwa ok. 3 dni.

| Testuj                                              | Nie testuj                                       |
| --------------------------------------------------- | ------------------------------------------------ |
| treść nagłówka i opisu                              | słabszy kolor albo kontrast przycisku „Odrzucam” |
| kolejność informacji: cel, partnerzy, zmiana zdania | odrzucenie jako link zamiast przycisku           |
| miejsce banera: dół ekranu czy środek               | zaznaczone z góry pola                           |
| wygląd zgodny z wyglądem sklepu                     | blokadę sklepu do czasu zgody                    |

_Prawa kolumna to praktyki, które EROD opisuje jako błędy (str. 7). Wzór: istotność 5%, moc 80%, jak w poprzednich
e-bookach._

> **Do zrobienia dziś**
>
> 1. Porównaj swój baner z 6 zasadami ze str. 24 i tabelą kategorii ze str. 25.
> 2. Dodaj link „Ustawienia cookies” w stopce, jeśli go nie ma.

---

# ROZDZIAŁ 06 · POMIAR PO WDROŻENIU

## Str. 29 · Plakat rozdziału

- **Numer:** 06
- **Tytuł:** Pomiar po wdrożeniu.
- **Lead:** Baner działa dopiero wtedy, gdy tagi słuchają wyboru klienta. Sprawdzisz to w 30 minut, bez programisty.
- **W tym rozdziale:** 10 testów technicznych · Raport co miesiąc
- **Scena 3D:** marmurowy stetoskop na turkusowym szklanym ciastku.

---

## Str. 30 · 10 testów technicznych

**Marker:** [ 06 / POMIAR PO WDROŻENIU ]
**Nagłówek:** 10 TESTÓW TECHNICZNYCH

**Lead:** Okno prywatne przeglądarki, narzędzia przeglądarki i rozszerzenie Tag Assistant. Każdy test zapisz ze
zrzutem ekranu.

1. **Przed wyborem w banerze** nie ma plików cookie statystycznych i reklamowych (np. `_ga`, `_gcl_…`, plik piksela
   Meta).
2. **Po „Odrzucam”** – nadal ich nie ma.
3. **Po „Akceptuję wszystkie”** – pojawiają się.
4. **Tag Assistant, najwcześniejsze zdarzenie „Zgoda”:** ustawione są `ad_storage`, `ad_user_data`,
   `ad_personalization` i `analytics_storage`.
5. **Tag Assistant, najnowsze zdarzenie „Zgoda”:** stan zmienił się zgodnie z kliknięciem w banerze.
6. **Brak błędu, że tag odczytał zgodę przed ustawieniem wartości domyślnej.** Jeśli jest – przenieś kod zgody wyżej
   (str. 17).
7. **Piksel Meta:** przed zgodą marketingową nie wysyła zdarzeń; po zgodzie – wysyła.
8. **Google Ads, karta „Diagnostyka konwersji”:** stan trybu zgody bez ostrzeżeń.
9. **Zakup testowy po zgodzie:** zdarzenie zakupu trafia do GA4, Google Ads i Meta.
10. **Link „Ustawienia cookies” w stopce** otwiera baner, a wycofanie zgody zatrzymuje wysyłkę danych.

**Powtarzaj testy 1–3** po każdej zmianie w sklepie: nowym tagu, wtyczce albo szablonie.

---

## Str. 31 · Raport co miesiąc

**Marker:** [ 06 / POMIAR PO WDROŻENIU ]
**Nagłówek:** RAPORT CO MIESIĄC

**Lead:** 8 liczb na jednej stronie. Pokażą, czy tracisz dane przez odmowy, czy przez błąd.

| Nr  | Liczba                                                        | Ten miesiąc | Poprzedni |
| --- | ------------------------------------------------------------- | ----------- | --------- |
| 1   | Odsetek zgód analitycznych i marketingowych (platforma zgód)  |             |           |
| 2   | Odsetek odmów i zamknięć bez wyboru                           |             |           |
| 3   | Zamówienia w panelu sklepu                                    |             |           |
| 4   | Zakupy w GA4 bez modelowania ÷ zamówienia w sklepie (str. 12) |             |           |
| 5   | Zakupy w GA4 z modelowaniem – jeśli dostępne (str. 16)        |             |           |
| 6   | Konwersje w Google Ads i stan trybu zgody                     |             |           |
| 7   | Zakupy w Menedżerze zdarzeń Meta ÷ zamówienia w sklepie       |             |           |
| 8   | Nowe tagi w tym miesiącu i ich kategoria (str. 22)            |             |           |

**Sygnał alarmowy:** liczba 4 spada, a odsetek zgód stoi w miejscu – coś zepsuło się technicznie. Wróć do testów ze
str. 30.

> **Do zrobienia dziś**
>
> 1. Przeprowadź testy 1–3 i zapisz zrzuty ekranu.
> 2. Załóż raport z 8 liczbami i uzupełnij go za ostatni miesiąc.

---

# ROZDZIAŁ 07 · 9 BŁĘDÓW

## Str. 32 · Plakat rozdziału

- **Numer:** 07
- **Tytuł:** 9 błędów.
- **Lead:** Część kosztuje dane, część – karę. Najgorsze kosztują jedno i drugie.
- **W tym rozdziale:** Błędy 1–5 · Błędy 6–9
- **Scena 3D:** marmurowy słoik na ciastka z pękniętą turkusową szklaną pokrywką.

---

## Str. 33 · Błędy 1–5

**Marker:** [ 07 / 9 BŁĘDÓW ]
**Nagłówek:** BŁĘDY 1–5

1. **Brak przycisku „Odrzucam” na pierwszej warstwie.** Zdecydowana większość organów w UE uznaje to za naruszenie.
   **Zamiast tego:** dwa równe przyciski (str. 24).
2. **Kategorie zaznaczone z góry.** Taka zgoda jest nieważna (motyw 32 RODO, wyrok Planet49). **Zamiast tego:** puste
   pola (str. 25).
3. **Tagi działają przed wyborem w banerze** – poza świadomie wybranym trybem zaawansowanym Google. To zapis i odczyt
   informacji bez zgody (art. 399 PKE). **Zamiast tego:** blokada do czasu zgody i testy (str. 30).
4. **„Przeglądając stronę, akceptujesz pliki cookie”.** Przewijanie nie jest zgodą. **Zamiast tego:** kliknięcie
   w baner (str. 6).
5. **Blokada sklepu do czasu „Akceptuję”.** Zgoda nie jest wtedy dobrowolna. **Zamiast tego:** baner, który pozwala
   oglądać sklep (str. 24).

---

## Str. 34 · Błędy 6–9

**Marker:** [ 07 / 9 BŁĘDÓW ]
**Nagłówek:** BŁĘDY 6–9

6. **Wszystko w kategorii „niezbędne”.** Musisz umieć wykazać, że plik cookie jest niezbędny. **Zamiast tego:** mapa
   tagów i uczciwe kategorie (str. 22 i 25).
7. **Brak sposobu na zmianę zgody.** Wycofanie ma być równie łatwe jak zgoda. **Zamiast tego:** link w stopce
   (str. 27).
8. **Tryb zgody bez wersji 2.** Bez `ad_user_data` i `ad_personalization` tracisz listy odbiorców i personalizację
   dla ruchu z EOG. **Zamiast tego:** wersja 2 (str. 14).
9. **Porównywanie GA4 z panelem sklepu bez uwzględnienia zgód.** Prowadzi do złych decyzji o budżecie. **Zamiast
   tego:** kartka ze str. 12 i sprzedaż liczona w panelu sklepu (str. 11).

> **Do zrobienia dziś**
>
> 1. Zaznacz na ściądze ze str. 38 błędy, które masz.
> 2. Zacznij od błędów 1–3 – dotyczą zgodności z prawem.

---

# ROZDZIAŁ 08 · BADANIE

## Str. 35 · Plakat rozdziału

- **Numer:** 08
- **Tytuł:** Badanie.
- **Lead:** Sprawdź swój baner w 10 punktach. Potem zobacz, jak pytają o zgodę inne sklepy.
- **W tym rozdziale:** Test banera w 10 punktach · Banery cookies w 100 sklepach
- **Scena 3D:** marmurowa lupa nad turkusowymi szklanymi miniaturami banerów.

---

## Str. 36 · Test banera w 10 punktach

**Marker:** [ 08 / BADANIE ]
**Nagłówek:** TEST BANERA W 10 PUNKTACH

**Lead:** 15 minut w oknie prywatnym przeglądarki. Każde „nie” to zadanie na ten tydzień.

| Nr  | Pytanie                                                                         | Tak / nie | Str.   |
| --- | ------------------------------------------------------------------------------- | --------- | ------ |
| 1   | Czy na pierwszej warstwie są „Akceptuję wszystkie” i „Odrzucam” obok siebie?    |           | 24     |
| 2   | Czy pola kategorii na drugiej warstwie są puste?                                |           | 25     |
| 3   | Czy przed wyborem w banerze nie ma plików cookie statystyk i reklam?            |           | 30     |
| 4   | Czy baner nie blokuje sklepu i nie uznaje przewijania za zgodę?                 |           | 6      |
| 5   | Czy przy kategoriach jest lista plików cookie z czasem działania i odbiorcami?  |           | 25     |
| 6   | Czy w stopce jest link do zmiany zgody?                                         |           | 27     |
| 7   | Czy tryb zgody Google ma wersję 2 i stan widoczny w Tag Assistant?              |           | 14, 30 |
| 8   | Czy piksel Meta czeka na zgodę marketingową?                                    |           | 20     |
| 9   | Czy wybór trybu podstawowego albo zaawansowanego jest zapisany z uzasadnieniem? |           | 18     |
| 10  | Czy znasz odsetek zgód i część zamówień widoczną w GA4?                         |           | 12     |

**Wynik:**

- **9–10 × „tak”** – baner jest gotowy na test wersji (str. 28).
- **6–8 × „tak”** – zacznij od punktów 1–4.
- **0–5 × „tak”** – zacznij od rozdziału 01 i mapy tagów (str. 22).

---

## Str. 37 · Banery cookies w 100 sklepach

**Marker:** [ 08 / BADANIE ]
**Nagłówek:** BANERY COOKIES W 100 SKLEPACH

**Lead:** Jak polskie sklepy pytają o zgodę i czy zapisują pliki cookie przed nią.
**[DO DECYZJI do 15.05.2027: czy robimy badanie]**

**Metoda:**

- **Próba:** 100 sklepów w 5 kategoriach: uroda, moda, dom, sport, elektronika – po 20.
- **Co sprawdzamy bez klikania w baner:** czy jest baner, czy na pierwszej warstwie jest przycisk odrzucenia, czy
  pola na drugiej warstwie są puste, które pliki cookie statystyk i reklam pojawiają się przed zgodą, czy tag Google
  przekazuje stan zgody.
- **Jak:** automat w przeglądarce jak w badaniu do e-booka #01 i ręczna kontrola sklepów, które go zatrzymają.
- **Termin:** 1–12.06.2027. Nazw sklepów nie publikujemy. **[DO DECYZJI]**

**Wyniki: [DO UZUPEŁNIENIA po badaniu]**

| Co sprawdzamy                                 | Wynik             |
| --------------------------------------------- | ----------------- |
| Sklepy z banerem cookies                      | [DO UZUPEŁNIENIA] |
| Przycisk odrzucenia na pierwszej warstwie     | [DO UZUPEŁNIENIA] |
| Pola zaznaczone z góry na drugiej warstwie    | [DO UZUPEŁNIENIA] |
| Pliki cookie statystyk lub reklam przed zgodą | [DO UZUPEŁNIENIA] |
| Tag Google przekazuje stan zgody              | [DO UZUPEŁNIENIA] |
| Link do zmiany zgody w stopce                 | [DO UZUPEŁNIENIA] |

**Wersja bez badania:** „Przegląd banerów 5 konkurentów w godzinę” – test ze str. 36 przeprowadzony na 5 sklepach
z Twojej branży.

---

## Str. 38 · Ściąga na 1 stronę

**Nagłówek:** ŚCIĄGA
**Lead:** Wydrukuj i odhaczaj. Numery stron prowadzą do szczegółów.

**Prawo**

- Zgoda przed plikami cookie statystyk i reklam (str. 5)
- Kliknięcie, puste pola, bez blokady sklepu (str. 6–7)

**Dane**

- Kartka A–E: odmowy czy błąd (str. 10–12)

**Consent Mode v2**

- 4 parametry reklam i statystyk, wersja 2 (str. 14)
- Tryb podstawowy czy zaawansowany – decyzja na piśmie (str. 15 i 18)
- Kod zgody przed tagami (str. 17)

**Tagi i baner**

- Piksel Meta: `revoke` do czasu zgody (str. 20)
- Mapa tagów (str. 22)
- Dwa równe przyciski, 4 kategorie, link w stopce (str. 24–27)

**Pomiar**

- 10 testów i raport co miesiąc (str. 30–31)

**Moje liczby:** odsetek zgód …… % · zamówienia w sklepie …… · zakupy w GA4 …… · część widoczna w GA4 …… % · tryb
zgody: podstawowy / zaawansowany

---

## Str. 39 · 3 kolejne kroki

**Nagłówek:** CO DALEJ · 3 KOLEJNE KROKI
**Lead:** Zrób to sam albo z nami.

1. **Przegląd banera i pomiaru · 0 zł.** Sprawdzimy baner z testem ze str. 36, pliki cookie przed zgodą i stan
   trybu zgody. **[DO DECYZJI: nazwa, termin odpowiedzi]**
2. **Wdrożenie banera i Consent Mode v2.** Platforma zgód, teksty, mapa tagów, Google i Meta, testy techniczne.
   **[DO DECYZJI: cena]**
3. **Pomiar co miesiąc.** Raport 8 liczb i kontrola tagów po zmianach w sklepie. **[DO DECYZJI: cena lub
   abonament]**

**Kontakt:** ksign.pl · hello@ksign.pl · 606 576 517
**Przycisk:** Zamów przegląd banera

---

## Str. 40 · Słowniczek i źródła

**Nagłówek:** SŁOWNICZEK I ŹRÓDŁA

**Słowniczek:**

- **Plik cookie** – mały plik zapisywany w przeglądarce, np. żeby pamiętać koszyk albo rozpoznać odwiedzającego.
- **Zgoda** – dobrowolne, konkretne, świadome i jednoznaczne „tak”, wyrażone kliknięciem.
- **Platforma zgód (CMP)** – narzędzie, które wyświetla baner, zapisuje wybór i przekazuje go tagom.
- **Tryb uzyskiwania zgody (Consent Mode)** – sposób przekazywania tagom Google wyboru klienta.
- **Tryb podstawowy** – tagi Google czekają na wybór w banerze; bez zgody nic nie wysyłają.
- **Tryb zaawansowany** – tagi Google wczytują się od razu i przy odmowie wysyłają pingi bez plików cookie.
- **Ping bez plików cookie** – sygnał do Google bez zapisu plików cookie, z m.in. stanem zgody.
- **Modelowanie konwersji** – szacowanie konwersji osób bez zgody na podstawie zachowań osób ze zgodą.
- **Pierwsza warstwa** – pierwszy widok banera z przyciskami wyboru.
- **Cookie wall** – blokada treści do czasu zgody; według EROD zgoda nie jest wtedy dobrowolna.
- **EROD** – Europejska Rada Ochrony Danych, w której zasiadają organy ochrony danych państw UE.

**Źródła:** tabela źródeł z obu części manuskryptu, z datami dostępu (niżej i w `rozdzialy-01-03.md`).

---

## Źródła do rozdziałów 04–08 (trafią na str. 40)

| Fakt                                                                                                                                  | Źródło                                                                                                                                                                                               | Data dostępu |
| ------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Odpowiedzialność za RODO; baner z wyraźną zgodą; `fbq('consent', 'revoke')` i `'grant'` na każdej stronie; dane zbierane przez piksel | Meta for Developers, „General Data Protection Regulation” (piksel Meta): https://developers.facebook.com/docs/meta-pixel/implementation/gdpr                                                         | 26.09.2026   |
| Regulamin narzędzi biznesowych: informacja o plikach cookie i udostępnianiu danych                                                    | Centrum pomocy dla firm Meta, „Ustawienia plików cookie piksela Meta – informacje”: https://www.facebook.com/business/help/471978536642445                                                           | 26.09.2026   |
| Zgoda na dane do personalizacji reklam                                                                                                | Google, „EU user consent policy”: https://www.google.com/about/company/user-consent-policy/                                                                                                          | 26.09.2026   |
| Wymogi EOG obejmują dane z GA4 w Google Ads; dane z innych źródeł – zasady dotyczące danych klientów                                  | Pomoc Google Ads, „Aktualizacje trybu uzyskiwania zgody w przypadku ruchu w EOG”: https://support.google.com/google-ads/answer/13695607?hl=pl                                                        | 26.09.2026   |
| Pliki cookie `_ga` i `_ga_<identyfikator>` – 2 lata                                                                                   | Pomoc Google Analytics, „[GA4] Używanie plików cookie w witrynach”: https://support.google.com/analytics/answer/11397207?hl=pl                                                                       | 26.09.2026   |
| Pliki cookie konwersji Google Ads `_gcl_…`                                                                                            | Google for Developers, „Omówienie trybu uzyskiwania zgody”: https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pl                                                          | 26.09.2026   |
| Wycofanie zgody równie łatwe                                                                                                          | RODO, art. 7 ust. 3: https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32016R0679                                                                                                       | 25.09.2026   |
| Ikona albo link do wycofania zgody; ocena w każdym przypadku; praktyki uznane za błąd                                                 | EROD, „Report of the work undertaken by the Cookie Banner Taskforce”, 17.01.2023, pkt 6–35: https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf      | 26.09.2026   |
| Tag Assistant: zdarzenia „Zgoda”, stan domyślny i aktualizacja, błąd odczytu zgody przed wartością domyślną                           | Google for Developers, „Rozwiązywanie problemów z trybem uzyskiwania zgody za pomocą rozszerzenia Tag Assistant”: https://developers.google.com/tag-platform/security/guides/consent-debugging?hl=pl | 26.09.2026   |
| Stan trybu zgody na karcie „Diagnostyka konwersji”                                                                                    | Pomoc Google Ads, „Aktualizacje trybu uzyskiwania zgody w przypadku ruchu w EOG” (jak wyżej)                                                                                                         | 26.09.2026   |
| Test banera                                                                                                                           | Wyliczenia w `kalkulator.mjs` – wzór na liczebność prób przy porównaniu dwóch proporcji (α = 5%, moc 80%)                                                                                            | –            |

**Uwagi redakcyjne:**

- **„Serwer nie zastępuje zgody” (str. 21)** – nasza interpretacja przepisów i zasad Google. **[SPRAWDZIĆ
  z prawnikiem]**
- **Zamknięcie krzyżykiem jako brak zgody (str. 24), usuwanie plików cookie przy wycofaniu i okres ponownego pytania
  (str. 27)** – nasze rekomendacje.
- **Gotowe teksty banera (str. 26)** – propozycja do sprawdzenia z prawnikiem razem z polityką prywatności.
- **Badanie (str. 37)** – bez publikowania nazw sklepów; automat nie klika w banery poza osobnym testem 10 sklepów
  (plan.md).
