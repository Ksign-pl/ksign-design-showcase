# BANER COOKIES, KTÓRY NIE ZABIJA DANYCH – manuskrypt, strony 1–18

> Wersja robocza v0.1 · fakty sprawdzone 25–26.09.2026 · stopka na okładce i stronach: ksign.pl
>
> **Numery „Str. N” to układ roboczy (40 stron, z plakatami rozdziałów jak w poprzednich e-bookach).** W składzie
> numery i odsyłacze liczą się automatycznie.
>
> **Tabele z liczbami wstawia skrypt** – nie poprawiaj ich ręcznie. Po zmianie założeń w `kalkulator.mjs`:
> `node kalkulator.mjs --wstaw manuskrypt/rozdzialy-01-03.md && prettier --write manuskrypt/rozdzialy-01-03.md`
>
> **[DO DECYZJI]** – do ustalenia z Karolem. **[SPRAWDZIĆ]** – do potwierdzenia tuż przed publikacją.
>
> Formy grzecznościowe jak w poprzednich e-bookach: „Ty”, „Twój”, „Ciebie” wielką literą. Bez form rodzajowych
> w czasie przeszłym w zwrotach do czytelnika. Nazwy parametrów Google (`ad_storage` itd.) zostają w oryginale.

---

## Str. 1 · Okładka

- **Tag:** E-BOOK KSIGN · 40 STRON · 20 MINUT **[liczba stron po składzie]**
- **Tytuł:** BANER COOKIES, KTÓRY NIE ZABIJA DANYCH.
- **Podtytuł:** Zgody i Consent Mode v2 w praktyce. Co mówi prawo, ile danych naprawdę tracisz i jak zaprojektować
  baner.
- **Stopka:** ksign.pl
- **Grafika (scena 3D):** marmurowe ciastko przełamane na pół. Pęknięcie wypełnia świecące turkusowe szkło (kintsugi),
  a w przełomie widać turkusowe słupki wykresu.

---

## Str. 2 · Dla kogo i jak czytać

**Nagłówek:** DLA KOGO I JAK CZYTAĆ

**Ten e-book jest dla Ciebie, jeśli:**

- prowadzisz sklep z Google Ads, GA4 albo reklamami w Meta,
- po wdrożeniu banera cookies w GA4 „zniknęła” część ruchu i zamówień,
- nie masz pewności, czy Twój baner jest zgodny z prawem.

**Nie jest dla Ciebie, jeśli** szukasz sposobu, żeby zbierać dane bez zgody. Takiego sposobu tu nie ma – jest za to
sposób, żeby tracić ich mniej.

**Jak czytać – 20 minut:**

1. **5 minut – rozdziały 01–02.** Co mówi prawo i ile danych naprawdę tracisz.
2. **10 minut – rozdziały 03–05.** Consent Mode v2, piksel Meta i projekt banera z gotowymi tekstami.
3. **5 minut – rozdziały 06–08.** Testy techniczne, 9 błędów i test banera.
4. **Na koniec – ściąga ze str. 38.** Wydrukuj ją dla osoby, która wdraża tagi.

Każdy rozdział kończy się ramką **„Do zrobienia dziś”** – od 1 do 3 działań na ten sam dzień.

**Stan wiedzy:** 26.09.2026 (data sprawdzenia faktów – przy premierze sprawdzić ponownie i zaktualizować). Przepisy
sprawdziliśmy w tekstach ustaw i w EUR-Lex. Źródła z datami są na str. 40.

**Nota:** To nie jest porada prawna. Wybór trybu Consent Mode i treść banera skonsultuj z prawnikiem albo inspektorem
ochrony danych. Liczby w przykładach to założenia, nie średnie rynkowe.

---

## Str. 3 · Spis treści

| Nr  | Rozdział                              | Co z niego wyniesiesz                                      | Str. |
| --- | ------------------------------------- | ---------------------------------------------------------- | ---- |
| 01  | Co mówi prawo                         | Kiedy potrzebujesz zgody, co jest ważną zgodą, kary        | 4    |
| 02  | Ile danych naprawdę tracisz           | Sesje, konwersje i różnice między panelami                 | 9    |
| 03  | Consent Mode v2                       | 7 rodzajów zgody, 2 tryby, progi modelowania, wdrożenie    | 13   |
| 04  | Meta i inne tagi                      | Piksel Meta, serwer a zgoda, mapa tagów                    | 19   |
| 05  | Projekt banera                        | 2 warstwy, gotowe teksty, wycofanie zgody, test            | 23   |
| 06  | Pomiar po wdrożeniu                   | 10 testów technicznych i raport co miesiąc                 | 29   |
| 07  | 9 błędów                              | Co psuje baner i dane – i co zrobić zamiast tego           | 32   |
| 08  | Badanie                               | Test banera w 10 punktach i banery w 100 sklepach          | 35   |
| –   | Ściąga · 3 kolejne kroki · Słowniczek | Wersja do wydruku, oferta KSIGN, pojęcia i źródła z datami | 38   |

---

# ROZDZIAŁ 01 · CO MÓWI PRAWO

## Str. 4 · Plakat rozdziału

- **Numer:** 01
- **Tytuł:** Co mówi prawo.
- **Lead:** Na pliki cookie do statystyk i reklam potrzebujesz zgody. Jak ją zbierać, mówią ustawa, RODO, wyrok
  Trybunału Sprawiedliwości UE i organy ochrony danych.
- **W tym rozdziale:** Kiedy potrzebujesz zgody · Co jest ważną zgodą · 7 praktyk, które EROD uznaje za błąd · Kary
- **Scena 3D:** marmurowa waga szalkowa: na jednej szalce ciastko, na drugiej turkusowa szklana kłódka.

---

## Str. 5 · Kiedy potrzebujesz zgody

**Marker:** [ 01 / CO MÓWI PRAWO ]
**Nagłówek:** KIEDY POTRZEBUJESZ ZGODY

**Lead:** Zapisywanie plików cookie na urządzeniu klienta i ich odczyt wymagają zgody – chyba że są niezbędne do
działania usługi, o którą klient prosi.

**Co mówi Prawo komunikacji elektronicznej (art. 399):**

1. **Najpierw informacja** – jednoznaczna, łatwa i zrozumiała: w jakim celu zapisujesz i odczytujesz informacje oraz
   że klient może określić warunki w ustawieniach przeglądarki albo usługi.
2. **Potem zgoda** – dopiero po tej informacji.
3. **Wyjątek:** zgoda nie jest potrzebna, jeśli zapis lub odczyt jest konieczny do przesłania komunikatu albo do
   świadczenia usługi, o którą klient prosi.

**Zgoda przez przeglądarkę?** Ustawa pozwala wyrazić zgodę także w ustawieniach przeglądarki (art. 399 ust. 2), ale
do każdej zgody stosuje się przepisy o ochronie danych osobowych (art. 400). W praktyce sklepy zbierają ją banerem.

| Cel plików cookie                                   | Zgoda                                      |
| --------------------------------------------------- | ------------------------------------------ |
| Koszyk, logowanie, zapamiętanie wyboru w banerze    | nie – usługa, o którą prosi klient         |
| Statystyki odwiedzin (np. GA4)                      | tak                                        |
| Reklama i remarketing (np. Google Ads, piksel Meta) | tak                                        |
| Czat, mapy, filmy osadzone z innych serwisów        | sprawdź, czy zapisują pliki cookie i po co |

_Tabela to nasza interpretacja art. 399. Każdy plik cookie oceniaj po celu, nie po nazwie narzędzia (str. 22)._

---

## Str. 6 · Co jest ważną zgodą

**Marker:** [ 01 / CO MÓWI PRAWO ]
**Nagłówek:** CO JEST WAŻNĄ ZGODĄ

**Lead:** Zgoda musi być dobrowolna, konkretna, świadoma i jednoznaczna. Kilka sytuacji rozstrzygnęły już Trybunał
Sprawiedliwości UE i Europejska Rada Ochrony Danych.

**RODO:**

- **Zgoda to wyraźne działanie** – oświadczenie albo kliknięcie (art. 4 pkt 11).
- **Milczenie, zaznaczone z góry pola i brak działania nie są zgodą** (motyw 32).
- **Wycofanie zgody musi być równie łatwe jak jej wyrażenie** (art. 7 ust. 3).

**Wyrok TSUE Planet49 (C-673/17, 1.10.2019):**

- zgoda przez okienko zaznaczone z góry, które trzeba odznaczyć, żeby odmówić, jest nieważna,
- to samo dotyczy plików cookie, które nie zawierają danych osobowych,
- informacja dla klienta obejmuje też czas działania plików cookie i to, czy mają do nich dostęp osoby trzecie.

**Wytyczne EROD 05/2020 w sprawie zgody:**

- **Przewijanie strony nie jest zgodą** – w żadnych okolicznościach nie spełnia wymogu wyraźnego działania.
- **Blokada treści do czasu kliknięcia „Akceptuję”** (tzw. cookie wall) – zgoda nie jest dobrowolna, bo klient nie
  ma prawdziwego wyboru.

---

## Str. 7 · 7 praktyk, które EROD uznaje za błąd

**Marker:** [ 01 / CO MÓWI PRAWO ]
**Nagłówek:** 7 PRAKTYK, KTÓRE EROD UZNAJE ZA BŁĄD

**Lead:** W 2023 r. grupa zadaniowa Europejskiej Rady Ochrony Danych opisała najczęstsze błędy w banerach. To wspólne
minimum organów z całej UE przy skargach na banery.

| Nr  | Praktyka                                                   | Stanowisko organów                                                           |
| --- | ---------------------------------------------------------- | ---------------------------------------------------------------------------- |
| 1   | Brak przycisku odrzucenia na warstwie z przyciskiem zgody  | zdecydowana większość organów: naruszenie                                    |
| 2   | Pola zaznaczone z góry na drugiej warstwie                 | zgoda nieważna                                                               |
| 3   | Odrzucenie tylko jako link w tekście, bez wyróżnienia      | zgoda nieważna                                                               |
| 4   | Kolory i kontrast, które pchają do „Akceptuję”             | ocena w każdym przypadku; nieczytelny przycisk odrzucenia – wprowadza w błąd |
| 5   | „Prawnie uzasadniony interes” jako podstawa plików cookie  | nie może być podstawą zapisu i odczytu plików cookie                         |
| 6   | Pliki cookie oznaczone jako „niezbędne”, choć takie nie są | właściciel strony musi umieć wykazać, że są niezbędne                        |
| 7   | Brak łatwego wycofania zgody                               | potrzebny łatwo dostępny sposób, np. ikona albo link w widocznym miejscu     |

**Zasada ogólna według EROD:** baner nie może sprawiać wrażenia, że zgoda jest warunkiem wejścia na stronę, ani
wyraźnie pchać do zgody.

_Stanowiska dotyczą skarg organizacji noyb. Nie zastępują wytycznych krajowych i oceny konkretnego banera._

---

## Str. 8 · Kto kontroluje i jakie kary

**Marker:** [ 01 / CO MÓWI PRAWO ]
**Nagłówek:** KTO KONTROLUJE I JAKIE KARY

**Lead:** Za pliki cookie odpowiadasz przed Prezesem UKE, za dane osobowe – przed Prezesem UODO. Google i Meta mają
też własne zasady.

| Kto              | Za co                                                  | Kara albo skutek                                                          |
| ---------------- | ------------------------------------------------------ | ------------------------------------------------------------------------- |
| Prezes UKE       | zapis lub odczyt informacji niezgodnie z art. 399 PKE  | do 3% przychodu z poprzedniego roku (art. 444 ust. 1 pkt 82 i art. 446)   |
| Prezes UODO      | naruszenie warunków zgody z RODO (art. 7)              | do 20 mln EUR albo 4% rocznego światowego obrotu – wyższa kwota (art. 83) |
| Google           | brak zgody i informacji wymaganych przez zasady Google | ograniczenie lub zawieszenie usługi                                       |
| Google Analytics | brak sygnałów zgody od użytkowników z EOG              | od marca 2024 r. nie trafiają na listy odbiorców w Google Ads             |

**Meta** pisze wprost, że każda firma sama odpowiada za zgodność z RODO – także przy pikselu (str. 20).

> **Do zrobienia dziś**
>
> 1. Otwórz sklep w oknie prywatnym i sprawdź: czy na pierwszej warstwie banera jest przycisk odrzucenia?
> 2. Sprawdź, czy pola na drugiej warstwie są puste i czy w stopce jest link do zmiany zgody.

---

# ROZDZIAŁ 02 · ILE DANYCH NAPRAWDĘ TRACISZ

## Str. 9 · Plakat rozdziału

- **Numer:** 02
- **Tytuł:** Ile danych naprawdę tracisz.
- **Lead:** 40% odmów nie znaczy 40% mniej sprzedaży w statystykach. Osoby, które kupują, częściej zgadzają się na
  pliki cookie.
- **W tym rozdziale:** Sesje a konwersje · Różnice między panelami · Policz u siebie
- **Scena 3D:** marmurowa klepsydra, przez którą przesypuje się tylko część turkusowych kryształków.

---

## Str. 10 · Mniej sesji to nie tyle samo mniej konwersji

**Marker:** [ 02 / ILE DANYCH NAPRAWDĘ TRACISZ ]
**Nagłówek:** MNIEJ SESJI TO NIE TYLE SAMO MNIEJ KONWERSJI

**Lead:** Google pisze, że osoby, które zgadzają się na pliki cookie, są zwykle 2–5 razy bardziej skłonne do
konwersji. Dlatego konwersji znika mniej niż sesji.

<!-- tabela:widocznosc -->

| Odsetek zgód | Widoczne sesje | Widoczne konwersje – przewaga 2× | Widoczne konwersje – przewaga 3× | Widoczne konwersje – przewaga 5× |
| ------------ | -------------- | -------------------------------- | -------------------------------- | -------------------------------- |
| 40%          | 40%            | 57%                              | 67%                              | 77%                              |
| 60%          | 60%            | 75%                              | 82%                              | 88%                              |
| 80%          | 80%            | 89%                              | 92%                              | 95%                              |

<!-- /tabela:widocznosc -->

**Co widać w tabeli:**

- **Przy 60% zgód** statystyki bez modelowania widzą 60% sesji, ale 75–88% konwersji.
- **Przykład Google:** przy 50% zgód liczba konwersji spadła o 19%, a nie o połowę.
- **Przewaga zależy od sklepu** – od odsetka zgód, branży i rodzaju konwersji (Google).

**Wniosek:** jeśli po wdrożeniu banera zakupy w GA4 spadły mocniej niż sesje, szukaj błędu technicznego, a nie tylko
odmów (str. 12 i 30).

_Przewaga 2–5× to przedział podany przez Google. Wzór: widoczne konwersje = zgody × przewaga ÷ (zgody × przewaga +
odmowy)._

---

## Str. 11 · Skąd różnice między panelami

**Marker:** [ 02 / ILE DANYCH NAPRAWDĘ TRACISZ ]
**Nagłówek:** SKĄD RÓŻNICE MIĘDZY PANELAMI

**Lead:** Sklep liczy wszystkie zamówienia. Każde narzędzie reklamowe – tylko to, co pozwala mu zobaczyć zgoda.

| Źródło               | Co liczy                            | Co widzi, gdy klient odmówi                                             |
| -------------------- | ----------------------------------- | ----------------------------------------------------------------------- |
| Panel sklepu         | wszystkie zamówienia                | wszystko – to Twój punkt odniesienia                                    |
| GA4                  | sesje i zdarzenia                   | tryb podstawowy: nic; zaawansowany: pingi bez cookies i dane modelowane |
| Google Ads           | konwersje z kliknięć reklam         | konwersje modelowane w kolumnie „Konwersje”                             |
| Menedżer reklam Meta | zdarzenia z piksela i API konwersji | nic z piksela po wycofaniu zgody (str. 20)                              |

**Do tego dochodzą różnice w atrybucji** – okna konwersji, modele, data kliknięcia i data zakupu. Opisujemy je
w e-booku „ROAS kłamie.”.

**Zasada:** sprzedaż mierz w panelu sklepu, a narzędzia reklamowe traktuj jako wskazówkę, do którego kanału ją
przypisać.

---

## Str. 12 · Policz u siebie

**Marker:** [ 02 / ILE DANYCH NAPRAWDĘ TRACISZ ]
**Nagłówek:** POLICZ U SIEBIE

**Lead:** 10 minut i 3 liczby z ostatniego miesiąca. Dowiesz się, czy tracisz dane przez odmowy, czy przez błąd.

| Pole | Co wpisać                                                        | Twoja liczba |
| ---- | ---------------------------------------------------------------- | ------------ |
| A    | Odsetek zgód na statystyki – z panelu platformy zgód             |              |
| B    | Zamówienia w panelu sklepu                                       |              |
| C    | Zakupy w GA4 – w widoku bez danych modelowanych                  |              |
| D    | C ÷ B – część zamówień widoczna w GA4                            |              |
| E    | Oczekiwana część z tabeli ze str. 10 dla odsetka A (przewaga 2×) |              |

**Jak czytać:**

- **D w okolicach E lub wyżej** – dane tracisz głównie przez odmowy. Pomoże modelowanie i lepszy baner (rozdziały
  03 i 05).
- **D wyraźnie poniżej E** – szukaj błędu: tag bez zakupu, przekierowanie płatności, tag odpalany dopiero po
  odświeżeniu strony (str. 30).

**Widok bez danych modelowanych:** w GA4 wybierz w ustawieniach tożsamość na potrzeby raportowania bez modelowania,
a po porównaniu wróć do ustawienia z modelowaniem.

> **Do zrobienia dziś**
>
> 1. Wypełnij kartkę A–E dla ostatniego pełnego miesiąca.
> 2. Jeśli D jest wyraźnie niższe niż E – przejdź od razu do testów ze str. 30.

---

# ROZDZIAŁ 03 · CONSENT MODE V2

## Str. 13 · Plakat rozdziału

- **Numer:** 03
- **Tytuł:** Consent Mode v2.
- **Lead:** Tryb uzyskiwania zgody nie zbiera zgody – przekazuje Google, na co klient się zgodził. Od tego zależy, co
  zobaczysz w GA4 i Google Ads.
- **W tym rozdziale:** 7 rodzajów zgody · Tryb podstawowy czy zaawansowany · Progi modelowania · Wdrożenie · Tryb
  zaawansowany a prawo
- **Scena 3D:** marmurowy przełącznik z turkusowym szklanym suwakiem w połowie drogi.

---

## Str. 14 · 7 rodzajów zgody

**Marker:** [ 03 / CONSENT MODE V2 ]
**Nagłówek:** 7 RODZAJÓW ZGODY

**Lead:** Tryb uzyskiwania zgody („Consent Mode”) to sposób, w jaki strona przekazuje tagom Google wybór klienta. Sam
nie wyświetla banera – zgodę zbiera baner albo platforma zgód.

| Parametr                  | Czego dotyczy                                                   |
| ------------------------- | --------------------------------------------------------------- |
| `ad_storage`              | pliki cookie i identyfikatory związane z reklamami              |
| `ad_user_data`            | wysyłanie danych użytkownika do Google w celach reklamowych     |
| `ad_personalization`      | reklamy spersonalizowane, m.in. remarketing                     |
| `analytics_storage`       | pliki cookie do statystyk, np. czas trwania wizyty              |
| `functionality_storage`   | funkcje strony, np. wybór języka                                |
| `personalization_storage` | personalizacja, np. rekomendacje                                |
| `security_storage`        | bezpieczeństwo, np. uwierzytelnianie i ochrona przed oszustwami |

**Co doszło w wersji 2:** parametry `ad_user_data` i `ad_personalization`.

**Wymóg Google dla ruchu z EOG:** żeby korzystać z pomiaru, personalizacji reklam i remarketingu, musisz uzyskać
zgodę użytkowników z Europejskiego Obszaru Gospodarczego i przekazywać Google sygnały zgody. Bez tego od początku
marca 2024 r. użytkownicy z EOG nie trafiają na listy odbiorców z GA4 używane w Google Ads.

---

## Str. 15 · Tryb podstawowy czy zaawansowany

**Marker:** [ 03 / CONSENT MODE V2 ]
**Nagłówek:** TRYB PODSTAWOWY CZY ZAAWANSOWANY

**Lead:** Google przewiduje 2 sposoby wdrożenia. Różnią się tym, czy tagi działają przed zgodą i jak dokładne jest
modelowanie.

|                       | Tryb podstawowy                             | Tryb zaawansowany                                   |
| --------------------- | ------------------------------------------- | --------------------------------------------------- |
| Tagi Google           | czekają na wybór w banerze                  | wczytują się od razu, domyślnie z odmową zgody      |
| Gdy klient odmówi     | do Google nie trafia nic – nawet stan zgody | Google dostaje stan zgody i pingi bez plików cookie |
| Gdy klient się zgodzi | pliki cookie i pełne dane                   | pliki cookie i pełne dane                           |
| Modelowanie konwersji | model ogólny, mniej szczegółowy             | model dostosowany do Twojego konta                  |

**Co pisze Google o trybie podstawowym:** jeśli tagi nie wczytają się do czasu wyboru w banerze, Google nie może
zweryfikować wyborów klienta, co może oznaczać utratę informacji.

**Co pisze Google o trybie zaawansowanym:** daje lepsze modelowanie, bo model jest dopasowany do reklamodawcy.
Pingi bez plików cookie według Google nie służą do śledzenia pojedynczych osób, list remarketingowych ani profili.

**Który wybrać:** to decyzja prawna, nie tylko techniczna (str. 18).

---

## Str. 16 · Progi modelowania

**Marker:** [ 03 / CONSENT MODE V2 ]
**Nagłówek:** PROGI MODELOWANIA

**Lead:** Modelowanie wypełnia luki po odmowach, ale tylko w większych sklepach. Sprawdź, czy spełniasz progi Google.

**GA4 – modelowanie behawioralne.** Warunki według Google: tryb zgody na wszystkich stronach, wdrożenie
zaawansowane, co najmniej 1000 zdarzeń dziennie bez zgody przez 7 dni i co najmniej 1000 użytkowników dziennie ze
zgodą przez 7 z ostatnich 28 dni.

<!-- tabela:progi_ga4 -->

| Użytkownicy dziennie | Zgoda 40%            | Zgoda 60%            | Zgoda 80%            |
| -------------------- | -------------------- | -------------------- | -------------------- |
| 1000                 | 400 – za mało        | 600 – za mało        | 800 – za mało        |
| 2000                 | 800 – za mało        | **1200 – wystarczy** | **1600 – wystarczy** |
| 5000                 | **2000 – wystarczy** | **3000 – wystarczy** | **4000 – wystarczy** |

<!-- /tabela:progi_ga4 -->

**Google Ads – modelowanie konwersji.** Warunek według Google: prawidłowo wdrożony tryb zgody i co najmniej 700
kliknięć reklamy w ciągu 7 dni na kraj i grupę domen.

<!-- tabela:progi_ads -->

| Koszt kliknięcia | 700 kliknięć w tygodniu | Budżet miesięczny |
| ---------------- | ----------------------- | ----------------- |
| 1,00 zł          | 700 zł                  | 3042 zł           |
| 1,50 zł          | 1050 zł                 | 4563 zł           |
| 2,50 zł          | 1750 zł                 | 7604 zł           |

<!-- /tabela:progi_ads -->

**Uwaga:** spełnienie progów nie gwarantuje modelu – Google stosuje dodatkowe kryteria jakości. Przy 60% zgód GA4
potrzebuje ok. 1700 użytkowników każdego dnia.

_Koszt kliknięcia i liczba użytkowników to założenia. Wpisz swoje z Google Ads i GA4._

---

## Str. 17 · Wdrożenie krok po kroku

**Marker:** [ 03 / CONSENT MODE V2 ]
**Nagłówek:** WDROŻENIE KROK PO KROKU

**Lead:** Kolejność kodu decyduje o wszystkim. Domyślny stan zgody musi być ustawiony, zanim tagi wyślą pierwsze dane.

1. **Platforma zgód (CMP).** Google prowadzi listę certyfikowanych platform – w nich tryb zgody v2 włączasz
   w ustawieniach banera. Przy własnym banerze wdrażasz go ręcznie.
2. **Stan domyślny na każdej stronie** – przed poleceniami `config` i `event`:

```js
gtag("consent", "default", {
  ad_storage: "denied",
  ad_user_data: "denied",
  ad_personalization: "denied",
  analytics_storage: "denied",
  wait_for_update: 500, // baner wczytuje się asynchronicznie – 500 ms na przekazanie wyboru
});
```

3. **Aktualizacja po wyborze klienta:** `gtag("consent", "update", { ... })` z wartościami `granted` dla kategorii,
   na które klient się zgodził.
4. **Opcje dodatkowe:** `url_passthrough` przekazuje informacje o kliknięciu reklamy w adresach kolejnych stron,
   gdy `ad_storage` ma odmowę; `ads_data_redaction` maskuje identyfikatory kliknięć przy odmowie. Obie opcje oceń
   razem z decyzją ze str. 18.
5. **Sprawdzenie:** w Google Ads na karcie „Diagnostyka konwersji” zobaczysz stan trybu zgody. Testy – str. 30.

_Przykład kodu z dokumentacji Google, skrócony. Przy Menedżerze tagów Google te same ustawienia robisz w szablonie
platformy zgód._

---

## Str. 18 · Tryb zaawansowany a prawo

**Marker:** [ 03 / CONSENT MODE V2 ]
**Nagłówek:** TRYB ZAAWANSOWANY A PRAWO

**Lead:** W trybie zaawansowanym tagi Google działają, zanim klient kliknie cokolwiek, i wysyłają pingi także po
odmowie. Czy to w porządku, rozstrzyga Twoja analiza prawna, nie dokumentacja Google.

**Co zawierają pingi bez plików cookie (według Google):**

- stan zgody dla każdego rodzaju zgody,
- informacje funkcyjne, np. nagłówki dodane przez przeglądarkę,
- informację, czy adres strony zawiera identyfikator kliknięcia reklamy,
- losową liczbę generowaną przy każdym wczytaniu strony,
- informację o platformie zgód na stronie.

**Pytania do prawnika albo IOD:**

1. Czy wysyłka tych danych przed zgodą ma podstawę w RODO?
2. Czy nie zapisujemy i nie odczytujemy wtedy informacji z urządzenia klienta (art. 399 PKE)?
3. Czy informujemy o tym w polityce prywatności?

**Nasza rekomendacja:** podejmij decyzję na piśmie, z uzasadnieniem. Wybór trybu podstawowego oznacza model ogólny
i mniej danych do modelowania; wybór zaawansowanego – dokumentację, dlaczego jest zgodny z prawem.
**[DO DECYZJI dla każdego sklepu]**

> **Do zrobienia dziś**
>
> 1. Sprawdź, którego trybu używasz: czy tagi Google wczytują się przed wyborem w banerze (str. 30)?
> 2. Umów rozmowę z prawnikiem albo IOD o wyborze trybu i zapisz decyzję.

---

## Źródła do rozdziałów 01–03 (trafią na str. 40)

| Fakt                                                                                                                                                    | Źródło                                                                                                                                                                                | Data dostępu |
| ------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Zgoda na zapis i odczyt informacji w urządzeniu; wyjątki; zgoda przez ustawienia przeglądarki; zgoda według przepisów o danych osobowych                | Ustawa z 12.07.2024 r. – Prawo komunikacji elektronicznej, Dz.U. 2024 poz. 1221, art. 399 i 400: https://api.sejm.gov.pl/eli/acts/DU/2024/1221/text.pdf                               | 25.09.2026   |
| Kara za naruszenie art. 399: do 3% przychodu, nakłada Prezes UKE                                                                                        | Jak wyżej, art. 444 ust. 1 pkt 82 i art. 446 ust. 1. Zmiany ustawy z 2025 i 2026 r. nie dotyczą art. 390–450                                                                          | 25.09.2026   |
| Definicja zgody, wycofanie, motyw 32; kara do 20 mln EUR albo 4% obrotu                                                                                 | Rozporządzenie (UE) 2016/679 (RODO), art. 4 pkt 11, art. 7 ust. 3, art. 83 ust. 5 lit. a, motyw 32: https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:32016R0679         | 25.09.2026   |
| Zaznaczone okienko – zgoda nieważna; także bez danych osobowych; informacja o czasie działania i dostępie osób trzecich                                 | Wyrok TSUE z 1.10.2019 r., C-673/17 (Planet49): https://eur-lex.europa.eu/legal-content/PL/TXT/HTML/?uri=CELEX:62017CJ0673                                                            | 26.09.2026   |
| Przewijanie nie jest zgodą (przykład 16); blokada treści – zgoda niedobrowolna (przykład 6a)                                                            | EROD, „Guidelines 05/2020 on consent under Regulation 2016/679”, wersja 1.1: https://www.edpb.europa.eu/system/files/documents/files/file1/edpb_guidelines_202005_consent_en.pdf      | 26.09.2026   |
| 7 praktyk w banerach i stanowiska organów; pliki cookie zapamiętujące preferencje uznaje się za niezbędne (za opinią Grupy Roboczej art. 29 nr 04/2012) | EROD, „Report of the work undertaken by the Cookie Banner Taskforce”, 17.01.2023: https://www.edpb.europa.eu/system/files/2023-01/edpb_20230118_report_cookie_banner_taskforce_en.pdf | 26.09.2026   |
| Zasady zgody użytkownika z UE: zgoda, informacja, możliwe ograniczenie lub zawieszenie usługi                                                           | Google, „EU user consent policy”: https://www.google.com/about/company/user-consent-policy/                                                                                           | 26.09.2026   |
| Od początku marca 2024 r. bez sygnałów zgody użytkownicy z EOG nie trafiają na listy odbiorców                                                          | Pomoc Google Analytics, „[GA4] Sprawdzanie i aktualizowanie ustawień w Google Analytics dotyczących zgody”: https://support.google.com/analytics/answer/14275483?hl=pl                | 26.09.2026   |
| Wymóg zgody i sygnałów zgody dla ruchu z EOG; nowe parametry v2; utrata informacji przy blokadzie tagów                                                 | Pomoc Google Ads, „Aktualizacje trybu uzyskiwania zgody w przypadku ruchu w EOG”: https://support.google.com/google-ads/answer/13695607?hl=pl                                         | 26.09.2026   |
| Osoby ze zgodą 2–5 razy bardziej skłonne do konwersji; przykład: 50% zgód, spadek konwersji o 19%; próg 700 kliknięć w 7 dni                            | Pomoc Google Ads, „Informacje o modelowaniu na potrzeby trybu uzyskiwania zgody”: https://support.google.com/google-ads/answer/10548233?hl=pl                                         | 26.09.2026   |
| 7 rodzajów zgody; tryb podstawowy i zaawansowany; odpowiedzialność za zgodę                                                                             | Google for Developers, „Omówienie trybu uzyskiwania zgody”: https://developers.google.com/tag-platform/security/concepts/consent-mode?hl=pl                                           | 26.09.2026   |
| Zawartość pingów bez plików cookie; pingi nie służą do śledzenia osób                                                                                   | Pomoc Google Ads, „Tryb uzyskiwania zgody”: https://support.google.com/google-ads/answer/10000067?hl=pl                                                                               | 26.09.2026   |
| Progi modelowania behawioralnego w GA4                                                                                                                  | Pomoc Google Analytics, „[GA4] Modelowanie behawioralne na potrzeby trybu uzyskiwania zgody”: https://support.google.com/analytics/answer/11161109?hl=pl                              | 26.09.2026   |
| Kolejność kodu, `wait_for_update`, region, `url_passthrough`, `ads_data_redaction`                                                                      | Google for Developers, „Konfigurowanie trybu uzyskiwania zgody w witrynach”: https://developers.google.com/tag-platform/security/guides/consent?hl=pl                                 | 26.09.2026   |
| Każda firma odpowiada za zgodność z RODO (Meta)                                                                                                         | Meta for Developers, „General Data Protection Regulation” (piksel Meta): https://developers.facebook.com/docs/meta-pixel/implementation/gdpr                                          | 26.09.2026   |
| Widoczne sesje i konwersje, progi GA4 i Google Ads                                                                                                      | Wyliczenia w `kalkulator.mjs` – założenia, nie dane z rynku                                                                                                                           | –            |

**Uwagi redakcyjne:**

- **Tabela celów plików cookie (str. 5)** – nasza interpretacja art. 399 PKE; każdy sklep ocenia swoje pliki cookie.
- **Raport EROD (str. 7)** dotyczy skarg noyb i ma zastrzeżenie, że nie zastępuje wytycznych krajowych – tak to
  podpisujemy.
- **Tryb zaawansowany (str. 18)** – nie rozstrzygamy zgodności z prawem. Wskazujemy fakty z dokumentacji Google
  i pytania do prawnika. **[SPRAWDZIĆ, czy UODO albo EROD wydały w tej sprawie stanowisko przed premierą]**
- **Kod (str. 17)** – przykład z dokumentacji Google, bez `region`. W składzie jako ramka z kodem.
