# ROAS KŁAMIE – manuskrypt, strony 20–40

> Wersja robocza v0.1 · fakty sprawdzone 25.09.2026 · zasady jak w `rozdzialy-01-03.md`.
>
> **Tabele z liczbami wstawia skrypt:**
> `node kalkulator.mjs --wstaw manuskrypt/rozdzialy-04-08.md && prettier --write manuskrypt/rozdzialy-04-08.md`

---

# ROZDZIAŁ 04 · MER I ZYSK PO REKLAMIE

## Str. 20 · Plakat rozdziału

- **Numer:** 04
- **Tytuł:** MER i zysk po reklamie.
- **Lead:** Liczby, których nie da się podkręcić zmianą okna atrybucji.
- **W tym rozdziale:** MER · Zysk po reklamie · Nowi klienci osobno
- **Scena 3D:** marmurowa waga szalkowa, na jednej szalce turkusowy szklany znak „zł”.

---

## Str. 21 · MER

**Marker:** [ 04 / MER I ZYSK PO REKLAMIE ]
**Nagłówek:** MER

**Lead:** MER to cała sprzedaż sklepu podzielona przez wszystkie wydatki na reklamę. Nie obchodzi go, który panel
przypisał sobie zakup.

**Wzór:**

> MER = sprzedaż netto po zwrotach ÷ wszystkie wydatki na reklamę

- **Sprzedaż netto** bierzesz z systemu sklepu, bez VAT, po anulowaniach i zwrotach.
- **Wydatki** – wszystkie kanały płatne. Opłatę agencji dolicz, jeśli chcesz widzieć pełny koszt.
- **Próg MER jest taki sam jak próg ROAS bez VAT:** 1 ÷ marża. Przy marży 40% – 2,50 (str. 10).
- **Przykład ze str. 6:** 184 000 zł ÷ 24 000 zł = 7,7.

**Zaleta:** tej liczby nie zmieni okno atrybucji ani model. **Wada:** nie powie, który kanał działa. Do tego służy
test przyrostowy (rozdział 05).

**Licz co tydzień i patrz na średnią z 4 tygodni** – sprzedaż ma swoje wahania i sezon.

---

## Str. 22 · Zysk po reklamie

**Marker:** [ 04 / MER I ZYSK PO REKLAMIE ]
**Nagłówek:** ZYSK PO REKLAMIE

**Lead:** Na koniec miesiąca liczy się kwota w złotówkach, nie wskaźnik.

**Wzór:**

> zysk po reklamie = sprzedaż netto po zwrotach × marża − wydatki na reklamę

**Przykład ze str. 6:** 184 000 zł × 40% − 24 000 zł = **49 600 zł**.

- **Z tej kwoty płacisz koszty stałe:** pensje, czynsz, narzędzia. Zysk firmy to dopiero to, co zostanie.
- **Zwroty odejmij od sprzedaży,** zanim policzysz zysk. W przykładzie to 8% sprzedaży netto.
- **Test każdej podwyżki budżetu:** jeśli dołożysz 5000 zł, zysk po reklamie musi wzrosnąć. Jeśli rośnie tylko
  sprzedaż, dodatkowe pieniądze nie zarabiają.

---

## Str. 23 · Nowi klienci osobno

**Marker:** [ 04 / MER I ZYSK PO REKLAMIE ]
**Nagłówek:** NOWI KLIENCI OSOBNO

**Lead:** Reklama, która trafia głównie do stałych klientów, świetnie wygląda w panelu. Nowych klientów licz osobno.

- **MER dla nowych klientów** = sprzedaż netto od nowych klientów ÷ wydatki na reklamę.
- **Koszt pozyskania nowego klienta** = wydatki na reklamę ÷ liczba nowych klientów.
- **Porównaj go z zyskiem z pierwszego zamówienia.** Przykład: 24 000 zł wydatków i 800 nowych klientów to 30 zł na
  klienta. Jeśli pierwsze zamówienie daje 40 zł zysku przed reklamą, zostaje 10 zł – i szansa na drugi zakup.
- **Drugi zakup zmienia rachunek:** ilu nowych klientów musi wrócić, żeby reklama się zwróciła, policzysz w e-booku
  „Drugi zakup jest najtańszy.”, str. 5–6.

_Przykładowe założenia, nie benchmark._

> **Do zrobienia dziś**
>
> 1. Policz MER za ostatnie 12 miesięcy, miesiąc po miesiącu.
> 2. Policz zysk po reklamie za ostatni miesiąc.
> 3. Policz koszt pozyskania nowego klienta i porównaj go z zyskiem z pierwszego zamówienia.

---

# ROZDZIAŁ 05 · ILE NAPRAWDĘ DAŁA REKLAMA

## Str. 24 · Plakat rozdziału

- **Numer:** 05
- **Tytuł:** Ile naprawdę dała reklama.
- **Lead:** Przypisanie to nie przyrost. Liczy się sprzedaż, której bez reklamy by nie było.
- **W tym rozdziale:** Przyrost, nie przypisanie · Test geograficzny · Narzędzia i plan testu
- **Scena 3D:** dwie marmurowe połówki mapy Polski; jedna z turkusowymi świecącymi pęknięciami.

---

## Str. 25 · Przyrost, nie przypisanie

**Marker:** [ 05 / ILE NAPRAWDĘ DAŁA REKLAMA ]
**Nagłówek:** PRZYROST, NIE PRZYPISANIE

**Lead:** Panel przypisuje reklamie każdy zakup w jej oknie. Przyrost to tylko te zakupy, których bez reklamy by nie
było.

**Gdzie różnica bywa największa:**

- **Kampanie na nazwę marki:** osoba, która wpisuje nazwę Twojego sklepu, i tak by do niego trafiła.
- **Remarketing:** reklama do osób z pełnym koszykiem często „łapie” zakupy, które i tak by się odbyły.
- **Reklamy do stałych klientów:** ci klienci wracają też bez reklamy.

**To nie znaczy, że te kampanie są złe.** Znaczy, że ich wynik trzeba sprawdzić testem, a nie panelem.

**Platformy same to przyznają:** Meta oferuje atrybucję przyrostową – model, który przewiduje, czy zakup spowodowała
reklama.

---

## Str. 26 · Test geograficzny

**Marker:** [ 05 / ILE NAPRAWDĘ DAŁA REKLAMA ]
**Nagłówek:** TEST GEOGRAFICZNY

**Lead:** Najprostszy test: wyłącz reklamę w części regionów na 4 tygodnie i porównaj sprzedaż.

1. **Podziel województwa na 2 grupy** o podobnej sprzedaży w ostatnich 8 tygodniach.
2. **W grupie B wyłącz testowany kanał** (np. kampanie Meta) na 4 tygodnie. W grupie A nic nie zmieniaj.
3. **Policz oczekiwaną sprzedaż A:** sprzedaż B w teście × (A ÷ B przed testem).
4. **ROAS przyrostowy** = (sprzedaż A − oczekiwana sprzedaż A) ÷ wydatki w regionach A.

<!-- tabela:test -->

| Sprzedaż netto, 4 tygodnie       | Regiony z reklamą (A) | Regiony bez reklamy (B) |
| -------------------------------- | --------------------- | ----------------------- |
| Przed testem                     | 100 000 zł            | 100 000 zł              |
| W czasie testu                   | 112 000 zł            | 104 000 zł              |
| Zmiana                           | +12 000 zł            | +4000 zł                |
| **Sprzedaż dzięki reklamie**     | **8000 zł**           | –                       |
| Wydatki na reklamę w regionach A | 4000 zł               | 0 zł                    |
| **ROAS przyrostowy (bez VAT)**   | **2,0**               | w panelu: 6,5 (z VAT)   |

<!-- /tabela:test -->

**Wniosek z przykładu:** panel pokazywał ROAS 6,5, a test – 2,0 bez VAT. To poniżej progu 2,5 przy marży 40%.
Reklama w tej formie traciła pieniądze, choć panel mówił co innego.

**Zasady:** w czasie testu nie zmieniaj cen ani innych kanałów tylko w jednej grupie. Poczekaj na zakupy
z opóźnieniem. Im mniejsza sprzedaż, tym większa szansa, że różnica jest przypadkowa.

_Przykładowe liczby, nie wynik badania._

---

## Str. 27 · Narzędzia i plan testu

**Marker:** [ 05 / ILE NAPRAWDĘ DAŁA REKLAMA ]
**Nagłówek:** NARZĘDZIA I PLAN TESTU

**Lead:** Test geograficzny zrobisz sam. Do większych pytań są gotowe narzędzia.

- **Meta:** atrybucja przyrostowa i eksperymenty w Menedżerze reklam. Dostępność zależy od konta i budżetu.
- **Google Ads:** eksperymenty i badania przyrostu. Dostępność też zależy od konta i budżetu.
- **Modelowanie marketing mix (MMM):** otwarte narzędzia Meridian (Google) i Robyn (Meta). Potrzebujesz danych
  z wielu miesięcy i analityka, ale dostajesz obraz wszystkich kanałów naraz.

**Plan testu na 6 tygodni:**

| Tydzień | Co robisz                                                           |
| ------- | ------------------------------------------------------------------- |
| 0       | Wybór kanału, podział województw, zapis sprzedaży z 8 tygodni       |
| 1–4     | Test: kanał wyłączony w grupie B                                    |
| 5       | Czekasz na zakupy z opóźnieniem, nic nie zmieniasz                  |
| 6       | Liczysz ROAS przyrostowy i decydujesz: budżet w górę, w dół, zmiana |

> **Do zrobienia dziś**
>
> 1. Wybierz kampanię do testu: na markę, remarketing albo tę z największym wydatkiem.
> 2. Podziel województwa na 2 podobne grupy.
> 3. Wpisz do kalendarza start testu i dzień decyzji.

---

# ROZDZIAŁ 06 · BUDŻET OD ZYSKU

## Str. 28 · Plakat rozdziału

- **Numer:** 06
- **Tytuł:** Budżet od zysku.
- **Lead:** Budżet ustawiasz od tego, ile zostaje, a nie od tego, ile przypisał panel.
- **W tym rozdziale:** Raport na 1 stronę · 5 zasad budżetu · 7 pytań do agencji
- **Scena 3D:** marmurowy kran, z którego kapią turkusowe szklane monety.

---

## Str. 29 · Raport na 1 stronę

**Marker:** [ 06 / BUDŻET OD ZYSKU ]
**Nagłówek:** RAPORT NA 1 STRONĘ

**Lead:** 9 wierszy co tydzień. Wystarczy arkusz i 15 minut w poniedziałek.

| Wiersz                                      | Skąd                           |
| ------------------------------------------- | ------------------------------ |
| Sprzedaż netto po zwrotach                  | system sklepu                  |
| Zysk przed reklamą                          | system sklepu i koszty zmienne |
| Wydatki na reklamę, wszystkie kanały        | panele albo faktury            |
| MER                                         | wyliczony                      |
| Zysk po reklamie                            | wyliczony                      |
| Nowi klienci i koszt pozyskania             | system sklepu i wydatki        |
| Zwroty: odsetek i kwota                     | system sklepu                  |
| ROAS w panelach – tylko jako sygnał         | Meta, Google Ads               |
| Uwagi: promocje, zmiany w kampaniach, testy | zespół                         |

**Pokazuj trend:** ten tydzień, średnia z 4 tygodni i ten sam tydzień rok temu.

---

## Str. 30 · 5 zasad budżetu

**Marker:** [ 06 / BUDŻET OD ZYSKU ]
**Nagłówek:** 5 ZASAD BUDŻETU

**Lead:** Proste reguły, które chronią zysk, gdy panele pokazują co innego.

1. **Próg ROAS to podłoga, nie cel.** Kampania stale poniżej progu – popraw ją albo wyłącz.
2. **Cel ustawiasz dla MER i zysku po reklamie,** nie dla ROAS w panelu.
3. **Skaluj krokami,** np. o 20% tygodniowo, i sprawdzaj, czy rośnie zysk po reklamie, a nie tylko sprzedaż.
4. **Kampanie na markę i remarketing testuj co roku** – testem przyrostowym (str. 26).
5. **W promocjach próg rośnie.** Rabat zmniejsza marżę, więc ta sama reklama musi dać wyższy ROAS (e-book „Rabat zjada
   zysk.”, str. 30).

---

## Str. 31 · 7 pytań do agencji

**Marker:** [ 06 / BUDŻET OD ZYSKU ]
**Nagłówek:** 7 PYTAŃ DO AGENCJI

**Lead:** Zadaj je przed kolejnym budżetem. Dobra agencja odpowie na każde w jednym zdaniu.

1. Jaki próg ROAS przyjęliście dla naszej marży i skąd go macie?
2. Czy wartość konwersji w panelach jest z VAT, z dostawą i przed zwrotami?
3. Jakie okna i modele atrybucji są ustawione w Meta i Google Ads?
4. Ile sprzedaży przypisują sobie wszystkie panele razem w porównaniu z naszą sprzedażą?
5. Jaki był MER i zysk po reklamie w ostatnich 3 miesiącach?
6. Ile kosztuje nas nowy klient i ilu nowych klientów przyniosły reklamy?
7. Kiedy ostatnio testowaliście przyrost kampanii na markę i remarketingu?

> **Do zrobienia dziś**
>
> 1. Załóż arkusz z 9 wierszami ze str. 29 i wpisz dane z ostatniego tygodnia.
> 2. Zapisz 5 zasad budżetu i uzgodnij je z osobą, która prowadzi reklamy.
> 3. Wyślij agencji 7 pytań ze str. 31.

---

# ROZDZIAŁ 07 · 9 BŁĘDÓW

## Str. 32 · Plakat rozdziału

- **Numer:** 07
- **Tytuł:** 9 błędów.
- **Lead:** Każdy z nich sprawia, że reklama wygląda lepiej, niż zarabia.
- **W tym rozdziale:** Liczby · Ustawienia · Decyzje
- **Scena 3D:** marmurowy termometr z pękniętą turkusową skalą.

---

## Str. 33 · Błędy 1–5

**Marker:** [ 07 / 9 BŁĘDÓW ]
**Nagłówek:** 9 BŁĘDÓW (1–5)

1. **ROAS z panelu jako wynik firmy.** Panel pokazuje przypisaną sprzedaż, nie zysk.
   **Zamiast tego:** MER i zysk po reklamie (str. 21–22).
2. **Próg liczony bez VAT, a panel liczy z VAT.** Kampania wygląda na zyskowną, choć jest pod progiem.
   **Zamiast tego:** sprawdź wartość w panelu i wybierz właściwą kolumnę progu (str. 10 i 17).
3. **Marża handlowa zamiast marży po kosztach zmiennych.** Próg wychodzi za niski.
   **Zamiast tego:** marża po towarze, dostawie, płatności i obsłudze (str. 9).
4. **Sumowanie sprzedaży z paneli.** Jedno zamówienie liczone dwa razy.
   **Zamiast tego:** sprzedaż tylko z systemu sklepu (str. 13 i 19).
5. **Porównywanie miesięcy w Google Ads i GA4 bez korekty dat.** Google Ads liczy po dacie kliknięcia.
   **Zamiast tego:** kolumny „według czasu konwersji” (str. 15).

---

## Str. 34 · Błędy 6–9

**Marker:** [ 07 / 9 BŁĘDÓW ]
**Nagłówek:** 9 BŁĘDÓW (6–9)

6. **Zmiana okna albo modelu atrybucji w trakcie porównania.** Wynik zmienia się bez zmiany sprzedaży.
   **Zamiast tego:** zapisz ustawienia i porównuj okresy przy tych samych (str. 14 i 16).
7. **Zwroty w wyniku reklam.** Zwrócone zamówienia podnoszą ROAS.
   **Zamiast tego:** zdarzenie zwrotu, korekty konwersji albo odejmowanie w raporcie (str. 17 i 22).
8. **Kampanie na markę i remarketing oceniane panelem.** Najwięcej zakupów, które i tak by przyszły.
   **Zamiast tego:** test przyrostowy (str. 25–26).
9. **Budżet w górę, bo rośnie sprzedaż.** Dodatkowe złotówki mogą nic nie zarabiać.
   **Zamiast tego:** decyzja według zysku po reklamie (str. 22 i 30).

> **Do zrobienia dziś**
>
> 1. Przejdź listę 9 błędów z osobą, która prowadzi reklamy.
> 2. Zaznacz błędy, które widzisz u siebie.
> 3. Przy każdym wpisz, kto i do kiedy go poprawi.

---

# ROZDZIAŁ 08 · BADANIE

## Str. 35 · Plakat rozdziału

- **Numer:** 08
- **Tytuł:** Badanie.
- **Lead:** Pytamy sklepy, jak liczą ROAS i czy znają swój próg.
- **W tym rozdziale:** Test pomiaru w 10 punktach · Nasza ankieta
- **Scena 3D:** lupa nad trzema marmurowymi wykresami, każdy pokazuje inną wysokość.

---

## Str. 36 · Test pomiaru w 10 punktach

**Marker:** [ 08 / BADANIE ]
**Nagłówek:** TEST POMIARU W 10 PUNKTACH

**Lead:** Sprawdź, czy Twoje liczby mówią prawdę. Odpowiedz „tak” albo „nie”.

1. Znasz marżę po kosztach zmiennych dla głównych kategorii (str. 9).
2. Każda kampania ma swój próg ROAS (str. 10–11).
3. Wiesz, czy wartość zakupu w GA4, Meta i Google Ads zawiera VAT i dostawę (str. 17).
4. Zwroty są odejmowane – w narzędziach albo w raporcie (str. 17 i 22).
5. Ustawienia okien i modeli atrybucji są zapisane (str. 14 i 16).
6. Miesiące w Google Ads porównujesz kolumnami „według czasu konwersji” (str. 15).
7. Tryb uzyskiwania zgody działa poprawnie (str. 18).
8. Co tydzień liczysz MER i zysk po reklamie (str. 21–22 i 29).
9. Znasz koszt pozyskania nowego klienta (str. 23).
10. W ostatnich 12 miesiącach był co najmniej jeden test przyrostowy (str. 26).

**Wynik:** 10 razy „tak” – Twoje liczby są gotowe do decyzji. Każde „nie” to zadanie na ten tydzień.

---

## Str. 37 · Nasza ankieta

**[DO DECYZJI: treść zależy od decyzji o ankiecie do 10.12.2026 – patrz `plan.md`]**

**Marker:** [ 08 / BADANIE ]
**Nagłówek:** NASZA ANKIETA

**Lead:** W styczniu 2027 pytamy właścicieli sklepów i osoby prowadzące reklamy, jak oceniają zysk z reklam.

**Co sprawdzamy:**

1. Jaki ROAS sklepy uznają za dobry i skąd biorą tę liczbę?
2. Czy znają marżę po kosztach zmiennych?
3. Czy wartość w panelach zawiera VAT i dostawę?
4. Czy odejmują zwroty?
5. Czy liczą MER albo zysk po reklamie?
6. Czy robią testy przyrostowe?

**Jak:** anonimowa ankieta online, 4–18.01.2027. Zapraszamy sklepy z newslettera i sieci kontaktów KSIGN oraz
z LinkedIna. Próba jest dobrowolna, więc wyniki pokazują tendencję, a nie obraz całego rynku.

**Wyniki:** **[DO UZUPEŁNIENIA: stan na dzień przed premierą]**

**Chcesz porównać się z innymi sklepami?** Zapisz się na ksign.pl, a wyślemy Ci pełne wyniki.

---

## Str. 38 · Ściąga na 1 stronę

**Nagłówek:** ŚCIĄGA
**Lead:** Wydrukuj i odhaczaj. Numery stron prowadzą do szczegółów.

**Progi**

- Marża po kosztach zmiennych dla każdej kategorii (str. 9)
- Próg ROAS – z VAT albo bez, zależnie od panelu (str. 10–11)

**Panele**

- Wartość zakupu: VAT, dostawa, rabaty, zwroty – sprawdzone w każdym narzędziu (str. 17)
- Okna i modele atrybucji zapisane (str. 14 i 16)
- Google Ads: kolumny „według czasu konwersji” do porównań (str. 15)
- Tryb uzyskiwania zgody działa (str. 18)

**Liczby dla sklepu**

- MER co tydzień, średnia z 4 tygodni (str. 21)
- Zysk po reklamie w złotówkach (str. 22)
- Koszt pozyskania nowego klienta (str. 23)

**Decyzje**

- Test przyrostowy raz w roku dla kampanii na markę i remarketingu (str. 26–27)
- Budżet według zysku po reklamie, nie sprzedaży (str. 30)

**Moje liczby:** marża …… % · próg ROAS …… · MER …… · zysk po reklamie …… zł · koszt nowego klienta …… zł

---

## Str. 39 · 3 kolejne kroki

**Nagłówek:** CO DALEJ · 3 KOLEJNE KROKI
**Lead:** Policz sam albo zrób to z nami.

1. **Przegląd pomiaru · 0 zł.** Sprawdzimy, jaką wartość sklep wysyła do GA4, Meta i Google Ads, i policzymy Twój
   próg ROAS oraz MER za ostatnie 3 miesiące. **[DO DECYZJI: nazwa, termin odpowiedzi]**
2. **Kampanie Google i Meta Ads od zysku.** Budżety i cele liczone od marży, raport MER i zysku po reklamie co
   tydzień. **[DO DECYZJI: cena lub „wycena po przeglądzie”]**
3. **Test przyrostowy.** Zaplanujemy i przeprowadzimy 4-tygodniowy test dla jednego kanału. **[DO DECYZJI: cena]**

**Kontakt:** ksign.pl · hello@ksign.pl · 606 576 517
**Przycisk:** Zamów przegląd pomiaru

---

## Str. 40 · Słowniczek i źródła

**Nagłówek:** SŁOWNICZEK I ŹRÓDŁA

**Słowniczek:**

- **ROAS** – przychód przypisany reklamie podzielony przez jej koszt.
- **Próg ROAS** – ROAS, przy którym reklama nie przynosi ani zysku, ani straty.
- **Marża** – zysk przed reklamą podzielony przez cenę netto.
- **MER** – sprzedaż netto całego sklepu podzielona przez wszystkie wydatki na reklamę.
- **Zysk po reklamie** – zysk przed reklamą minus wydatki na reklamę; z niego płacisz koszty stałe.
- **Atrybucja** – przypisanie zakupu reklamie albo kanałowi.
- **Okno atrybucji** – czas po kliknięciu albo wyświetleniu, w którym panel może przypisać sobie zakup.
- **Model atrybucji** – zasada podziału zasługi między kolejne kontakty z reklamą.
- **Przyrost** – sprzedaż, której bez reklamy by nie było.
- **Konwersje modelowane** – zakupy oszacowane przez panel dla osób bez zgody na pliki cookie.
- **Test geograficzny** – porównanie sprzedaży w regionach z reklamą i bez niej.

**Źródła:** tabela źródeł z obu części manuskryptu, z datami dostępu (niżej i w `rozdzialy-01-03.md`).

---

## Źródła do rozdziałów 04–08 (trafią na str. 40)

| Fakt                                                    | Źródło                                                                                                                              | Data dostępu |
| ------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| Meta: atrybucja przyrostowa                             | Meta, Centrum pomocy dla firm, „Modele i ustawienia atrybucji – informacje”: https://www.facebook.com/business/help/460276478298895 | 25.09.2026   |
| Meridian – otwarte narzędzie MMM od Google              | Google for Developers, „Meridian”: https://developers.google.com/meridian                                                           | 25.09.2026   |
| Robyn – otwarte narzędzie MMM od Meta Marketing Science | Robyn: https://facebookexperimental.github.io/Robyn/                                                                                | 25.09.2026   |
| Próg ROAS rośnie po rabacie                             | E-book „Rabat zjada zysk.”, str. 30                                                                                                 | 25.09.2026   |
| Próg powrotów nowych klientów                           | E-book „Drugi zakup jest najtańszy.”, str. 5–6                                                                                      | 25.09.2026   |
| MER, zysk po reklamie, test geograficzny                | Wzory i przykłady wyliczone w `kalkulator.mjs` – założenia, nie dane z badania                                                      | –            |

**Uwagi redakcyjne:**

- **Str. 37** zależy od decyzji o ankiecie. Jeśli ankiety nie robimy, zastąp ją stroną „Jak policzyć MER za 12
  miesięcy w arkuszu”.
- **Eksperymenty i badania przyrostu w Meta i Google Ads:** nie podajemy progów budżetu – zmieniają się i zależą od
  konta. **[SPRAWDZIĆ]** aktualne warunki przed premierą.
- **„Skaluj o 20% tygodniowo”** to nasza reguła ostrożności, nie zalecenie platform.
- Kontakt na str. 39 taki sam jak w poprzednich e-bookach.
