# ROAS KŁAMIE – manuskrypt, strony 1–19

> Wersja robocza v0.1 · fakty sprawdzone 25.09.2026 · stopka na okładce i stronach: ksign.pl
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
> w czasie przeszłym w zwrotach do czytelnika.

---

## Str. 1 · Okładka

- **Tag:** E-BOOK KSIGN · 40 STRON · 20 MINUT **[liczba stron po składzie]**
- **Tytuł:** ROAS KŁAMIE.
- **Podtytuł:** Ile naprawdę zarabia Twoja reklama. Próg ROAS, MER i zysk po reklamie zamiast liczb z paneli.
- **Stopka:** ksign.pl
- **Grafika (scena 3D):** marmurowe popiersie z długim nosem z turkusowego szkła. Od nosa biegną świecące turkusowe
  pęknięcia (kintsugi).

---

## Str. 2 · Dla kogo i jak czytać

**Nagłówek:** DLA KOGO I JAK CZYTAĆ

**Ten e-book jest dla Ciebie, jeśli:**

- wydajesz na reklamy w Meta i Google kilkanaście tysięcy złotych miesięcznie albo więcej,
- GA4, Meta i Google Ads pokazują Ci różną sprzedaż i nie wiesz, której liczbie wierzyć,
- ROAS w panelach rośnie, a na koncie firmy tego nie widać.

**Nie jest dla Ciebie, jeśli** dopiero zaczynasz reklamy i wydajesz kilkaset złotych miesięcznie. Wtedy najpierw
policz próg ROAS (rozdział 02), a resztę zostaw na później.

**Jak czytać – 20 minut:**

1. **5 minut – rozdziały 01–02.** Policzysz próg ROAS dla swojej marży.
2. **10 minut – rozdziały 03–05.** Zrozumiesz, skąd różnice w panelach, i przejdziesz na MER i zysk po reklamie.
3. **5 minut – rozdziały 06–08.** Raport na 1 stronę, 9 błędów i test Twojego pomiaru.
4. **Na koniec – ściąga ze str. 38.** Wydrukuj ją dla osoby, która prowadzi reklamy.

Każdy rozdział kończy się ramką **„Do zrobienia dziś”** – od 1 do 3 działań na ten sam dzień.

**Stan wiedzy:** 25.09.2026 (data sprawdzenia faktów – przy premierze sprawdzić ponownie i zaktualizować). Zasady
atrybucji sprawdziliśmy w oficjalnej pomocy Google Ads, Google Analytics i Meta – źródła z datami są na str. 40.

**Nota:** Liczby w przykładach to założenia, nie średnie rynkowe. Twoje progi policzysz na własnych danych.

---

## Str. 3 · Spis treści

| Nr  | Rozdział                              | Co z niego wyniesiesz                                      | Str. |
| --- | ------------------------------------- | ---------------------------------------------------------- | ---- |
| 01  | ROAS kłamie                           | Czego ROAS nie widzi i jakie 3 liczby go zastąpią          | 4    |
| 02  | Próg ROAS                             | Wzór, tabela progów i kartka do wypełnienia                | 8    |
| 03  | Dlaczego panele się różnią            | Okna i modele atrybucji, daty, VAT, zgody                  | 12   |
| 04  | MER i zysk po reklamie                | Liczby dla całego sklepu i dla nowych klientów             | 20   |
| 05  | Ile naprawdę dała reklama             | Przyrost zamiast przypisania, test geograficzny            | 24   |
| 06  | Budżet od zysku                       | Raport na 1 stronę, 5 zasad budżetu, 7 pytań do agencji    | 28   |
| 07  | 9 błędów                              | Co psuje ocenę reklam i co zrobić zamiast tego             | 32   |
| 08  | Badanie                               | Test pomiaru w 10 punktach i nasza ankieta                 | 35   |
| –   | Ściąga · 3 kolejne kroki · Słowniczek | Wersja do wydruku, oferta KSIGN, pojęcia i źródła z datami | 38   |

---

# ROZDZIAŁ 01 · ROAS KŁAMIE

## Str. 4 · Plakat rozdziału

- **Numer:** 01
- **Tytuł:** ROAS kłamie.
- **Lead:** Panel pokazuje sprzedaż, którą sobie przypisał. Nie pokazuje zysku.
- **W tym rozdziale:** Czego ROAS nie widzi · Miesiąc sklepu w liczbach · 3 liczby zamiast ROAS
- **Scena 3D:** marmurowe popiersie z długim nosem z turkusowego szkła (jak na okładce, z innej strony).

---

## Str. 5 · Co mierzy ROAS, a czego nie

**Marker:** [ 01 / ROAS KŁAMIE ]
**Nagłówek:** CO MIERZY ROAS, A CZEGO NIE

**Lead:** ROAS to przychód, który panel przypisał reklamie, podzielony przez jej koszt. Nie mówi, ile zarabiasz.

**Wzór:**

> ROAS = przychód przypisany reklamie ÷ wydatki na reklamę

**4 rzeczy, których ROAS nie widzi:**

1. **Koszty.** Towar, dostawa, płatność i obsługa. Przy marży 20% ROAS 4 oznacza stratę – próg to 5,00 (str. 10).
2. **VAT i dostawę.** Jeśli sklep wysyła do panelu wartość z VAT, ROAS wygląda o 23% lepiej, niż jest (str. 17).
3. **Zwroty.** Zwrócone zamówienie zostaje w wyniku reklamy, dopóki go nie odejmiesz (str. 17).
4. **Sprzedaż, która i tak by przyszła.** Klient, który wpisał w Google nazwę Twojego sklepu, i tak by kupił. Panel
   przypisze ten zakup reklamie (rozdział 05).

**Do tego każdy panel liczy po swojemu:** inne okno, inny model, inna data (rozdział 03).

---

## Str. 6 · Miesiąc sklepu w liczbach

**Marker:** [ 01 / ROAS KŁAMIE ]
**Nagłówek:** MIESIĄC SKLEPU W LICZBACH

**Lead:** Przykładowy sklep: 246 000 zł sprzedaży w miesiącu, 24 000 zł na reklamy w Meta i Google.

<!-- tabela:miesiac -->

| Miesiąc sklepu                        | Kwota         | Co mówi                                 |
| ------------------------------------- | ------------- | --------------------------------------- |
| Sprzedaż z VAT (system sklepu)        | 246 000 zł    | wszystkie źródła, po anulowaniach       |
| Sprzedaż netto po zwrotach            | 184 000 zł    | bez VAT, zwroty 8%                      |
| Wydatki na reklamę (Meta + Google)    | 24 000 zł     | 14 000 zł + 10 000 zł                   |
| ROAS w Menedżerze reklam Meta         | 7,0           | wartość z VAT, okno atrybucji Meta      |
| ROAS w Google Ads                     | 11,0          | wartość z VAT, data kliknięcia          |
| Suma sprzedaży przypisanej w panelach | 208 000 zł    | 85% całej sprzedaży sklepu              |
| **MER** (sprzedaż netto ÷ wydatki)    | **7,7**       | próg MER przy marży 40%: 2,50           |
| **Zysk po reklamie**                  | **49 600 zł** | 73 600 zł zysku przed reklamą − wydatki |

<!-- /tabela:miesiac -->

**Co widać w tabeli:**

- **Panele przypisały sobie 85% całej sprzedaży.** A przecież sklep ma też wejścia z wyszukiwarki, newsletter,
  wejścia bezpośrednie i stałych klientów.
- **ROAS 7,0 i 11,0 wyglądają świetnie,** ale nie da się ich ani zsumować, ani porównać ze sobą.
- **MER i zysk po reklamie mówią o całym sklepie** – na nich opierasz budżet (rozdział 04).

_Przykładowe założenia, nie benchmark: marża 40% po kosztach zmiennych, zwroty 8% sprzedaży._

---

## Str. 7 · 3 liczby zamiast ROAS

**Marker:** [ 01 / ROAS KŁAMIE ]
**Nagłówek:** 3 LICZBY ZAMIAST ROAS

**Lead:** ROAS z panelu zostaje – ale jako sygnał do ustawiania kampanii, nie jako wynik firmy.

1. **Próg ROAS – dla każdej kampanii.** Poniżej progu reklama przynosi stratę (rozdział 02).
2. **MER – dla całego sklepu.** Sprzedaż netto ze wszystkich źródeł podzielona przez wszystkie wydatki na reklamę
   (str. 21).
3. **Zysk po reklamie – w złotówkach.** Co tydzień i co miesiąc (str. 22).

**Czwarta liczba dla zaawansowanych: przyrost.** Ile sprzedaży naprawdę dała reklama – mierzysz go testem, nie
panelem (rozdział 05).

**Do czego zostaje ROAS w panelu:** do porównywania kampanii, zestawów reklam i słów kluczowych w obrębie jednego
panelu.

> **Do zrobienia dziś**
>
> 1. Wypisz ROAS z Meta i Google Ads za ostatni miesiąc i sprzedaż z systemu sklepu.
> 2. Zsumuj sprzedaż przypisaną w panelach i porównaj ją z całą sprzedażą sklepu.
> 3. Policz MER za ten miesiąc: sprzedaż netto ÷ wszystkie wydatki na reklamę.

---

# ROZDZIAŁ 02 · PRÓG ROAS

## Str. 8 · Plakat rozdziału

- **Numer:** 02
- **Tytuł:** Próg ROAS.
- **Lead:** Poniżej progu każda sprzedaż z reklamy to strata. Wystarczy znać marżę.
- **W tym rozdziale:** Wzór na próg ROAS · Tabela progów · Twój próg w 15 minut
- **Scena 3D:** marmurowy próg drzwi z turkusową szklaną linią.

---

## Str. 9 · Wzór na próg ROAS

**Marker:** [ 02 / PRÓG ROAS ]
**Nagłówek:** WZÓR NA PRÓG ROAS

**Lead:** Próg ROAS to punkt, w którym reklama nie przynosi ani zysku, ani straty.

**Wzór:**

> próg ROAS = 1 ÷ marża – gdy panel liczy wartość bez VAT
>
> próg ROAS = 1,23 ÷ marża – gdy panel liczy wartość z VAT

**Marża** to zysk przed reklamą podzielony przez cenę netto. Zysk przed reklamą to cena netto minus koszty zmienne:
towar, dostawa, płatność, opakowanie, obsługa.

**Przykład z e-booka „Rabat zjada zysk.”:** fotel za 1230 zł z VAT daje 400 zł zysku przed reklamą, czyli 40% ceny
netto. Panel liczy z VAT, więc próg ROAS = 1230 ÷ 400 = 3,08. Przy ROAS 4 zostaje 93 zł na zamówieniu. Po rabacie
20% próg rośnie do 4,92.

**2 błędy, które zaniżają próg:**

- **Marża od ceny z VAT.** Liczysz ją od ceny netto.
- **Marża handlowa zamiast marży po kosztach zmiennych.** Sama różnica między ceną a kosztem towaru pomija dostawę,
  płatności i obsługę.

**Pamiętaj:** próg nie obejmuje kosztów stałych – pensji, czynszu, narzędzi. Zysk po reklamie musi je pokryć (str. 22).

---

## Str. 10 · Tabela progów

**Marker:** [ 02 / PRÓG ROAS ]
**Nagłówek:** TABELA PROGÓW

**Lead:** Znajdź swoją marżę i odczytaj próg. Wybierz kolumnę według tego, co Twój sklep wysyła do panelu.

<!-- tabela:prog -->

| Zysk przed reklamą (marża) | Próg ROAS: wartość bez VAT | Próg ROAS: wartość z VAT | ROAS dla 10% zysku (z VAT) |
| -------------------------- | -------------------------- | ------------------------ | -------------------------- |
| 20%                        | 5,00                       | 6,15                     | 12,30                      |
| 30%                        | 3,33                       | 4,10                     | 6,15                       |
| 40%                        | 2,50                       | 3,08                     | 4,10                       |
| 50%                        | 2,00                       | 2,46                     | 3,08                       |
| 60%                        | 1,67                       | 2,05                     | 2,46                       |

<!-- /tabela:prog -->

- **Kolumna „z VAT”** – jeśli do panelu trafia wartość z VAT (sprawdzisz to na str. 17).
- **„ROAS dla 10% zysku”** – przy tym ROAS po reklamie zostaje 10% ceny netto na koszty stałe i zysk.
- **Każda kategoria ma swoją marżę,** więc i swój próg. Ustaw go osobno dla kampanii z różnymi kategoriami.

---

## Str. 11 · Twój próg w 15 minut

**Marker:** [ 02 / PRÓG ROAS ]
**Nagłówek:** TWÓJ PRÓG W 15 MINUT

**Lead:** Wypełnij dla każdej głównej kategorii. Wystarczą dane z ostatnich 3 miesięcy.

| Pole | Co wpisać                                                       | Twoja liczba |
| ---- | --------------------------------------------------------------- | ------------ |
| A    | Średnia wartość zamówienia z VAT                                | ……… zł       |
| B    | Wartość netto: A ÷ 1,23                                         | ……… zł       |
| C    | Koszty zmienne na zamówienie: towar, dostawa, płatność, obsługa | ……… zł       |
| D    | Zysk przed reklamą: B − C                                       | ……… zł       |
| E    | Marża: D ÷ B                                                    | ……… %        |
| F    | Próg ROAS: 1 ÷ E (panel bez VAT) albo A ÷ D (panel z VAT)       | ………          |

> **Do zrobienia dziś**
>
> 1. Wypełnij kartkę dla 3 głównych kategorii.
> 2. Wpisz progi do notatek kampanii w Meta i Google Ads.
> 3. Porównaj ROAS z ostatnich 30 dni z progiem dla każdej kampanii.

---

# ROZDZIAŁ 03 · DLACZEGO PANELE SIĘ RÓŻNIĄ

## Str. 12 · Plakat rozdziału

- **Numer:** 03
- **Tytuł:** Dlaczego panele się różnią.
- **Lead:** Każdy panel liczy po swojemu – i każdy ma rację po swojemu.
- **W tym rozdziale:** Okna i modele atrybucji · Daty · Wartość konwersji · Zgody · Jedno źródło prawdy
- **Scena 3D:** trzy marmurowe wagi ważą tę samą paczkę – każda z innym odważnikiem z turkusowego szkła.

---

## Str. 13 · Jedno zamówienie, trzy raporty

**Marker:** [ 03 / DLACZEGO PANELE SIĘ RÓŻNIĄ ]
**Nagłówek:** JEDNO ZAMÓWIENIE, TRZY RAPORTY

**Lead:** Prześledź jedną ścieżkę zakupu. Każde narzędzie zobaczy ją inaczej.

**Ścieżka klienta:**

- **Poniedziałek:** widzi reklamę na Instagramie. Nie klika.
- **Wtorek:** klika reklamę w Meta, ogląda produkt i wychodzi.
- **Czwartek:** wpisuje w Google nazwę sklepu, klika reklamę w wyszukiwarce, dodaje produkt do koszyka.
- **Sobota:** otwiera newsletter i kupuje za 246 zł z VAT (200 zł bez VAT).

**Kto przypisze sobie zakup:**

- **Meta:** zakup 4 dni po kliknięciu mieści się w oknie 7 dni. Przypisze całe 246 zł, jeśli sklep wysyła wartość
  z VAT.
- **Google Ads:** zakup 2 dni po kliknięciu mieści się w oknie 30 dni. Przypisze całe 246 zł – i zapisze je pod
  czwartkiem, dniem kliknięcia.
- **GA4:** podzieli zasługę między reklamę w Meta, reklamę w Google i e-mail. Wartość: 200 zł, jeśli sklep wysyła ją
  bez VAT, tak jak zaleca Google.
- **System sklepu:** 1 zamówienie za 246 zł.

**Wynik: w panelach reklamowych 492 zł, w sklepie 246 zł.** Żaden panel nie kłamie według własnych zasad. Kłamie
suma.

---

## Str. 14 · Okna atrybucji

**Marker:** [ 03 / DLACZEGO PANELE SIĘ RÓŻNIĄ ]
**Nagłówek:** OKNA ATRYBUCJI

**Lead:** Okno atrybucji to czas po kliknięciu albo wyświetleniu reklamy, w którym panel może przypisać sobie zakup.
Im dłuższe okno, tym więcej sprzedaży „zobaczy” panel.

| Narzędzie                    | Po kliknięciu                                                            | Po wyświetleniu lub innej aktywności                                |
| ---------------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| Meta – atrybucja standardowa | 1 albo 7 dni                                                             | 1 dzień po wyświetleniu; 1 dzień po innej aktywności, np. 5 s filmu |
| Google Ads                   | domyślnie 30 dni, do wyboru od 1 do 90                                   | obejrzenie z zaangażowaniem: 3 dni; wyświetlenie: 1 dzień           |
| GA4                          | zakupy: domyślnie 90 dni (albo 30, 60); pierwsza wizyta: 30 dni (albo 7) | –                                                                   |

- **Porównuj wyniki przy tych samych ustawieniach.** Zmiana okna w Meta zmienia liczby w raporcie.
- **W GA4 zmiana okna działa od dnia zmiany.** Zmiana modelu atrybucji zmienia też dane historyczne.

---

## Str. 15 · Data kliknięcia a data zakupu

**Marker:** [ 03 / DLACZEGO PANELE SIĘ RÓŻNIĄ ]
**Nagłówek:** DATA KLIKNIĘCIA A DATA ZAKUPU

**Lead:** Google Ads zapisuje zakup pod dniem kliknięcia. GA4 i system sklepu – pod dniem zakupu.

**Przykład:** klient klika reklamę 31 stycznia i kupuje 2 lutego.

- **Google Ads (kolumna „Konwersje”):** zakup w styczniu.
- **GA4 i system sklepu:** zakup w lutym.
- **Google Ads (kolumny „według czasu konwersji”):** zakup w lutym.

**Co z tego wynika:**

- **Wynik z ostatnich dni w Google Ads jeszcze urośnie.** Zakupy po kliknięciach z tego tygodnia będą dopisywane
  wstecz przez całe okno konwersji.
- **Do porównań miesięcznych z GA4 i sklepem** dodaj w Google Ads kolumny „według czasu konwersji”: konwersje
  i wartość konwersji.
- **Kolumna „Wszystkie konwersje”** obejmuje też konwersje dodatkowe i po wyświetleniu. Nie mieszaj jej
  z „Konwersjami”.

---

## Str. 16 · Modele atrybucji

**Marker:** [ 03 / DLACZEGO PANELE SIĘ RÓŻNIĄ ]
**Nagłówek:** MODELE ATRYBUCJI

**Lead:** Model atrybucji decyduje, jak podzielić zasługę za zakup między kolejne kontakty z reklamą.

- **Google Ads:** 2 modele – oparty na danych (domyślny dla większości konwersji) i ostatnie kliknięcie. Modele
  „pierwsze kliknięcie”, „liniowy”, „spadek w czasie” i „uwzględniający pozycję” wycofano, a konwersje z nimi
  przeniesiono na model oparty na danych.
- **GA4:** model oparty na danych i model ostatniego kliknięcia. Pozostałe modele zniknęły w listopadzie 2023 r.
- **Meta:** 3 modele – standardowy (okna ze str. 14), przyrostowy (Meta przewiduje, czy zakup spowodowała reklama)
  i niestandardowy (dane z zewnętrznego narzędzia analitycznego).

**Meta pisze wprost:** wyników zestawów reklam z różnymi modelami atrybucji nie można porównywać. Jeśli korzystasz
z zewnętrznych narzędzi analitycznych, skuteczność oceniaj w tych narzędziach.

**Wniosek:** ROAS z Meta i ROAS z Google Ads to dwie różne miary. Nie porównuj ich jeden do jednego.

---

## Str. 17 · Wartość konwersji

**Marker:** [ 03 / DLACZEGO PANELE SIĘ RÓŻNIĄ ]
**Nagłówek:** WARTOŚĆ KONWERSJI

**Lead:** Zanim porównasz ROAS, sprawdź, jaką kwotę sklep wysyła do każdego narzędzia.

- **GA4:** dokumentacja Google zaleca, żeby wartość zakupu była sumą cen produktów razy ilość – bez dostawy i bez
  podatku.
- **Meta i Google Ads:** dostają tę wartość, którą wyśle wtyczka albo tag sklepu. Często to kwota z VAT, czasem także
  z dostawą. Wtedy ROAS jest o 23% albo więcej wyższy niż „bez VAT”.
- **Rabaty:** wartość powinna być tym, co klient zapłacił – po rabacie.
- **Zwroty:** w GA4 wysyłaj zdarzenie zwrotu (`refund`), w Google Ads użyj korekt konwersji. Tam, gdzie się nie da,
  odejmuj zwroty we własnym raporcie (str. 22).

**Jak sprawdzić, co wysyła sklep:** GA4 – DebugView; Meta – testowanie zdarzeń w Menedżerze zdarzeń; Google Ads –
diagnostyka konwersji albo Tag Assistant. Zapisz wynik w tabeli: narzędzie → co zawiera wartość.

---

## Str. 18 · Zgody i konwersje modelowane

**Marker:** [ 03 / DLACZEGO PANELE SIĘ RÓŻNIĄ ]
**Nagłówek:** ZGODY I KONWERSJE MODELOWANE

**Lead:** Bez zgody na pliki cookie narzędzia widzą mniej. Część konwersji szacują.

- **Google Ads modeluje konwersje osób bez zgody,** jeśli masz poprawnie wdrożony tryb uzyskiwania zgody (Consent
  Mode) albo IAB TCF v2.0 i co najmniej 700 kliknięć reklam w 7 dni w danym kraju i grupie domen.
- **Modelowane konwersje trafiają do kolumny „Konwersje”** i do wszystkich raportów, które z niej korzystają.
  W panelu nie odróżnisz ich od zmierzonych.
- **Przesyłanie danych z serwera** – Conversions API w Meta, konwersje rozszerzone w Google – poprawia dopasowanie
  zakupów do reklam. Nie zastępuje zgody.

**Wniosek:** wynik w panelu to część zmierzona plus część oszacowana. System sklepu zna 100% zamówień.

**Ramka:** jak ustawić baner cookies, żeby nie tracić danych zgodnie z prawem – e-book „Baner cookies, który nie
zabija danych.” (w przygotowaniu).

---

## Str. 19 · Jedno źródło prawdy

**Marker:** [ 03 / DLACZEGO PANELE SIĘ RÓŻNIĄ ]
**Nagłówek:** JEDNO ŹRÓDŁO PRAWDY

**Lead:** Każde narzędzie odpowiada na inne pytanie. Kłopot zaczyna się, gdy pytasz niewłaściwe.

| Pytanie                                       | Skąd bierzesz odpowiedź                               |
| --------------------------------------------- | ----------------------------------------------------- |
| Ile sprzedaliśmy i ile zarobiliśmy?           | system sklepu – zamówienia po anulowaniach i zwrotach |
| Ile wydaliśmy na reklamy?                     | faktury albo eksport z paneli reklamowych             |
| Skąd przychodzą klienci i jak łączą kanały?   | GA4                                                   |
| Która kampania, reklama, słowo działa lepiej? | panel danego kanału – porównania w obrębie panelu     |
| Ile sprzedaży naprawdę dała reklama?          | test przyrostowy (rozdział 05)                        |

> **Do zrobienia dziś**
>
> 1. Sprawdź w każdym narzędziu, czy wartość zakupu zawiera VAT i dostawę.
> 2. Dodaj w Google Ads kolumny „według czasu konwersji” do raportu miesięcznego.
> 3. Zapisz w jednym dokumencie ustawienia atrybucji w Meta, Google Ads i GA4: okna i modele.

---

## Źródła do rozdziałów 01–03 (trafią na str. 40)

| Fakt                                                                                          | Źródło                                                                                                                                                 | Data dostępu |
| --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------ |
| Meta: modele standardowy, przyrostowy, niestandardowy; okna 1 i 7 dni, 1 dzień, aktywność 5 s | Meta, Centrum pomocy dla firm, „Modele i ustawienia atrybucji – informacje”: https://www.facebook.com/business/help/460276478298895                    | 25.09.2026   |
| Meta: nie porównuj modeli; oceniaj w zewnętrznym narzędziu                                    | Jak wyżej                                                                                                                                              | 25.09.2026   |
| Meta: działania przypisywane do reklam według ustawienia atrybucji                            | Meta, „Działania przypisywane do Twoich reklam”: https://www.facebook.com/business/help/458681590974355                                                | 25.09.2026   |
| Google Ads: modele oparty na danych i ostatnie kliknięcie, wycofane modele                    | Google Ads Help, „About attribution models”: https://support.google.com/google-ads/answer/6259715                                                      | 25.09.2026   |
| Google Ads: okno 30 dni (1–90), obejrzenie z zaangażowaniem 3 dni, wyświetlenie 1 dzień       | Google Ads Help, „About conversion windows”: https://support.google.com/google-ads/answer/3123169                                                      | 25.09.2026   |
| Google Ads: kolumny konwersji liczone według czasu kliknięcia; „Wszystkie konwersje”          | Google Ads Help, „Understand your conversion tracking data”: https://support.google.com/google-ads/answer/6270625                                      | 25.09.2026   |
| Google Ads: modelowanie konwersji, próg 700 kliknięć w 7 dni, kolumna „Konwersje”             | Google Ads Help, „About consent mode modeling”: https://support.google.com/google-ads/answer/10548233                                                  | 25.09.2026   |
| GA4: wycofane modele (XI 2023), okna 30/7 i 90/30/60 dni, zmiany wstecz i od dziś             | Google Analytics Help, „Select attribution settings”: https://support.google.com/analytics/answer/10597962                                             | 25.09.2026   |
| GA4: wartość zakupu bez dostawy i podatku; zdarzenie zwrotu                                   | Google for Developers, GA4 „Recommended events – purchase”: https://developers.google.com/analytics/devguides/collection/ga4/reference/events#purchase | 25.09.2026   |
| Próg ROAS fotela 3,08, zysk 93 zł przy ROAS 4, próg 4,92 po rabacie                           | E-book „Rabat zjada zysk.”, str. 30 (`ebook/rabat-zjada-zysk/kalkulator.mjs`)                                                                          | 25.09.2026   |

**Uwagi redakcyjne:**

- **Domyślne ustawienie atrybucji w Meta:** strona pomocy wymienia dostępne okna, ale nie podaje wprost domyślnego.
  W tekście nie piszemy „domyślnie 7 dni”, tylko o dostępnych oknach. **[SPRAWDZIĆ]** w Menedżerze reklam przed
  premierą.
- **Model domyślny w GA4:** strona pomocy mówi o modelu opartym na danych i modelach regułowych. Że model oparty na
  danych jest domyślny – **[SPRAWDZIĆ]** w ustawieniach atrybucji w GA4.
- **Nazwy kolumn w polskim Google Ads** („Konwersje”, „Wszystkie konwersje”, kolumny „według czasu konwersji”) –
  **[SPRAWDZIĆ]** dokładne brzmienie w polskim interfejsie.
- **Zwroty w Meta:** nie znaleźliśmy w pomocy Meta sposobu na odejmowanie zwrotów od wyniku kampanii – dlatego
  w tekście „odejmuj we własnym raporcie”.
- **Ścieżka klienta na str. 13** to przykład zbudowany na oknach ze str. 14, nie dane z badania.
