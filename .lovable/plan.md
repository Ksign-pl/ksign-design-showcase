
## Cel

Dodać drugi workflow Lighthouse CI, który uruchamia się równolegle obok obecnego (produkcyjnego) i testuje `https://staging.ksign.pl` na każdym PR do `main`. Wyniki raportowane jako warn — widać w PR, ale **nie blokują merge**. Obecny workflow na `ksign.pl` zostaje bez zmian i nadal blokuje regresje na produkcji.

## Co powstanie

### 1. `.lighthouserc.staging.json` (nowy)
Kopia obecnego `.lighthouserc.json` z dwiema zmianami:
- `collect.url` → `https://staging.ksign.pl/`, `/pakiety`, `/blog`
- `assert.assertions` → wszystkie metryki zmienione z `"error"` na `"warn"` (LCP, TBT, TTI, CLS, Performance score, FCP, Speed Index). Dzięki temu `lhci autorun` zawsze kończy się exit 0 i nie blokuje merge, a wyniki dalej są widoczne w komentarzu PR i w raporcie temporary-public-storage.
- Reszta (mobile emulation, Slow 4G, 4× CPU, 3 runs) bez zmian — żeby porównanie staging vs prod było rzetelne.

### 2. `.github/workflows/lighthouse-ci-staging.yml` (nowy)
Bliźniaczy do istniejącego `lighthouse-ci.yml`:
- Triggery: `pull_request` → `main`, `push` → `main`, `workflow_dispatch`
- Job o nazwie `Lighthouse CI — staging (mobile, non-blocking)`
- Krok pre-check: `curl -sfI https://staging.ksign.pl` — jeśli staging nie odpowiada, job kończy się `continue-on-error` z czytelnym komunikatem (zamiast czerwonego ❌ z LHCI).
- Uruchamia `lhci autorun --config=./.lighthouserc.staging.json`
- Cały job dostaje `continue-on-error: true` jako podwójne zabezpieczenie, żeby nawet nieoczekiwany błąd LHCI nie zablokował merge.

### 3. Bez zmian
- `.github/workflows/lighthouse-ci.yml` zostaje — dalej testuje produkcję na `pull_request`/`push` do `main` i blokuje regresje.
- `.lighthouserc.json` bez zmian.

## Szczegóły techniczne

**Dlaczego osobny config zamiast `--collect.url` z CLI:** progi (`assert.assertions`) muszą być inne dla staging (warn) niż dla prod (error), a tego nie da się nadpisać prostym flagiem CLI bez gubienia reszty configu. Drugi plik jest najczystszy.

**Wymóg po stronie infry (poza kodem):** subdomena `staging.ksign.pl` musi wskazywać na środowisko testowe i być publicznie dostępna (HTTP 200 na `/`, `/pakiety`, `/blog`). Jeśli staging jest za Basic Auth / VPN, LHCI nie zaloguje się i wszystkie audyty wyjdą jako warn na pustej stronie — wtedy trzeba będzie dodać `extraHeaders` z tokenem do configu albo upublicznić staging na czas audytu.

**Branch protection:** w ustawieniach repo na GitHubie tylko obecny `Lighthouse CI — mobile` powinien być wymagany do merge. Nowy `Lighthouse CI — staging (mobile, non-blocking)` celowo zostaje opcjonalny — `continue-on-error: true` w workflow sprawia, że GitHub i tak zaraportuje go jako sukces.

## Plik diff (skrót)

```text
+ .lighthouserc.staging.json           (nowy, ~30 linii)
+ .github/workflows/lighthouse-ci-staging.yml  (nowy, ~35 linii)
  .lighthouserc.json                   (bez zmian)
  .github/workflows/lighthouse-ci.yml  (bez zmian)
```
