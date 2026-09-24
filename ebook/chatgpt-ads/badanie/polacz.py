"""Łączy dwa przejścia badania (HTTP: wyniki.csv, przeglądarka: przegladarka.json),
wybiera próbę 100 sklepów i liczy statystyki do str. 27–28 e-booka.

Wyjście: proba_100.csv (surowe wyniki dla 100 sklepów) i podsumowanie.json.
"""

import csv
import json
import re
from collections import Counter, defaultdict
from pathlib import Path

import requests

from skan import BOTS, GTM_ID, META_PIXEL, OPENAI_PIXEL, UA, parse_robots, verdict

HERE = Path(__file__).parent
CHALLENGE = re.compile(r"Cierpliwości|Access Denied|Attention Required|anti-robot|Proszę czekać", re.I)
# Kategorie zakazane poza USA wg zasad reklam OpenAI (usługi zdrowotne, w tym suplementy).
PROHIBITED_OUTSIDE_US = {"Apteki i suplementy"}
# Domeny bez odpowiedzi w obu przejściach albo z przerwą techniczną – nie wchodzą do próby.
PER_CATEGORY = 12  # 8 kategorii × 12 = 96, +4 z największych kategorii = 100


def robots_verdicts(text):
    if "user-agent" not in text.lower():
        return {bot: ("dozwolony", "brak reguł") for bot in BOTS}
    groups = parse_robots(text)
    return {bot: verdict(groups, bot) for bot in BOTS}


def main():
    http_rows = {r["domena"]: r for r in csv.DictReader(open(HERE / "wyniki.csv", encoding="utf-8"))}
    browser = {r["domena"]: r for r in json.load(open(HERE / "przegladarka.json", encoding="utf-8"))}
    session = requests.Session()
    session.headers["User-Agent"] = UA
    gtm_cache = {}

    def gtm_js(gid):
        if gid not in gtm_cache:
            try:
                r = session.get(f"https://www.googletagmanager.com/gtm.js?id={gid}", timeout=20)
                gtm_cache[gid] = r.text if r.status_code == 200 else ""
            except requests.RequestException:
                gtm_cache[gid] = ""
        return gtm_cache[gid]

    final = []
    for domain, row in http_rows.items():
        out = {k: row[k] for k in ("domena", "kategoria", "grupa")}
        http_ok = str(row["status_strony"]).startswith("2")
        b = browser.get(domain)
        # przegladarka.json w repo jest odchudzony (bez HTML) – wtedy korzystamy z pól wyliczonych przy skanie
        page_text = (b.get("html") or b.get("tytul_strony", "")) if b else ""
        b_ok = bool(b and b.get("status") and 200 <= b["status"] < 400 and not CHALLENGE.search(page_text[:20000]))

        if http_ok:
            out["metoda"] = "HTTP"
            out["dostep_automatu"] = "otwarta"
            html, extra_urls = None, []
        elif b_ok:
            out["metoda"] = "przeglądarka"
            out["dostep_automatu"] = "otwarta"
            html, extra_urls = b.get("html", ""), b.get("zapytania", [])
        elif (b and b.get("status") and b["status"] < 500) or str(row["status_strony"])[:1] in "34":
            out["metoda"] = "przeglądarka" if b else "HTTP"
            out["dostep_automatu"] = "ochrona antybotowa"
            html, extra_urls = None, []
        else:
            out["dostep_automatu"] = "brak odpowiedzi"
            out["metoda"] = "-"
            html, extra_urls = None, []

        # robots.txt: wynik HTTP, jeśli był czytelny; inaczej z przeglądarki
        if str(row["robots_status"]).startswith(("2", "4")) and row["OAI-AdsBot_regula"] != "robots niedostępny":
            for bot in BOTS:
                out[f"{bot}"] = f'{row[f"{bot}_dostep"]} ({row[f"{bot}_regula"]})'
        elif b and b.get("robots_status") and 200 <= b["robots_status"] < 300:
            for bot, (acc, src) in robots_verdicts(b.get("robots", "")).items():
                out[bot] = f"{acc} ({src})"
        elif str(row["robots_status"]) == "200":
            for bot in BOTS:
                out[bot] = "dozwolony (brak reguł)"
        else:
            for bot in BOTS:
                out[bot] = "nieznany"

        # pixel OpenAI i Meta
        if out["dostep_automatu"] != "otwarta":
            out["pixel_openai"] = out["pixel_meta"] = "nie sprawdzono"
            out["kontenery_gtm"] = ""
        elif html is None:  # HTTP – wynik z pierwszego przejścia
            out["pixel_openai"], out["pixel_meta"] = row["pixel_openai"], row["pixel_meta"]
            out["kontenery_gtm"] = row["kontenery_gtm"]
        else:
            html_ids = GTM_ID.findall(html) if html else b.get("kontenery_gtm_w_html", [])
            ids = sorted(set(html_ids + [m for u in extra_urls for m in GTM_ID.findall(u)]))[:4]
            containers = [gtm_js(g) for g in ids]
            net_openai = any("bzrcdn.openai.com" in u or "bzr.openai.com" in u for u in extra_urls)
            in_html = bool(OPENAI_PIXEL.search(html)) if html else b.get("pixel_openai_w_html", False)
            in_gtm = any(OPENAI_PIXEL.search(js) for js in containers)
            out["pixel_openai"] = (
                "tak (HTML)" if in_html else "tak (GTM)" if in_gtm else "tak (sieć)" if net_openai else "nie"
            )
            net_meta = any("connect.facebook.net" in u for u in extra_urls)
            out["pixel_meta"] = (
                "tak"
                if (META_PIXEL.search(html) if html else b.get("pixel_meta_w_html"))
                or any(META_PIXEL.search(js) for js in containers)
                or net_meta
                else "nie"
            )
            out["kontenery_gtm"] = " ".join(ids)

        out["kategoria_openai"] = (
            "zakazana poza USA (zdrowie)" if out["kategoria"] in PROHIBITED_OUTSIDE_US else "dozwolona"
        )
        out["data_skanu"] = row["data_skanu"]
        final.append(out)

    # próba: bez domen bez odpowiedzi; po 12 na kategorię (proporcja lider/mniejszy jak najbliżej 50/50),
    # a 4 dodatkowe miejsca dla kategorii z największą liczbą sprawdzonych domen
    valid = [r for r in final if r["dostep_automatu"] != "brak odpowiedzi" and r["domena"] != "answear.com"]
    by_cat = defaultdict(list)
    for r in valid:
        by_cat[r["kategoria"]].append(r)
    chosen = []
    spare = []
    for cat, rows in by_cat.items():
        leaders = [r for r in rows if r["grupa"] == "lider"]
        smaller = [r for r in rows if r["grupa"] == "mniejszy"]
        pick = leaders[:6] + smaller[:6]
        for r in leaders[6:] + smaller[6:]:
            if len(pick) < PER_CATEGORY:
                pick.append(r)
            else:
                spare.append(r)
        chosen += pick[:PER_CATEGORY]
        spare += pick[PER_CATEGORY:]
    chosen += spare[: 100 - len(chosen)]
    chosen.sort(key=lambda r: (r["kategoria"], r["grupa"], r["domena"]))

    fields = list(chosen[0].keys())
    with open(HERE / "proba_100.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        w.writerows(chosen)

    n = len(chosen)
    checked = [r for r in chosen if r["dostep_automatu"] == "otwarta"]
    count = lambda rows, pred: sum(1 for r in rows if pred(r))
    summary = {
        "sklepow": n,
        "kategorie": Counter(r["kategoria"] for r in chosen),
        "liderzy": count(chosen, lambda r: r["grupa"] == "lider"),
        "otwarte_dla_automatu": len(checked),
        "ochrona_antybotowa": count(chosen, lambda r: r["dostep_automatu"] == "ochrona antybotowa"),
        "pixel_openai": count(checked, lambda r: r["pixel_openai"].startswith("tak")),
        "pixel_openai_domeny": [r["domena"] for r in checked if r["pixel_openai"].startswith("tak")],
        "pixel_meta_co_najmniej": count(checked, lambda r: r["pixel_meta"] == "tak"),
        "robots_nazwany_OAI-AdsBot": count(chosen, lambda r: "nazwany" in r["OAI-AdsBot"]),
        "robots_nazwany_OAI-SearchBot": count(chosen, lambda r: "nazwany" in r["OAI-SearchBot"]),
        "robots_nazwany_GPTBot": count(chosen, lambda r: "nazwany" in r["GPTBot"]),
        "blokuje_GPTBot": count(chosen, lambda r: r["GPTBot"].startswith("zablokowany")),
        "blokuje_OAI-SearchBot": count(chosen, lambda r: r["OAI-SearchBot"].startswith("zablokowany")),
        "blokuje_OAI-AdsBot": count(chosen, lambda r: r["OAI-AdsBot"].startswith("zablokowany")),
        "robots_nieznany": count(chosen, lambda r: r["GPTBot"] == "nieznany"),
        "kategoria_zakazana": count(chosen, lambda r: r["kategoria_openai"] != "dozwolona"),
        "gotowe_na_start": [
            r["domena"]
            for r in checked
            if r["kategoria_openai"] == "dozwolona"
            and r["pixel_openai"].startswith("tak")
            and not r["OAI-AdsBot"].startswith("zablokowany")
        ],
        "wykluczone": [r["domena"] for r in final if r not in chosen],
    }
    json.dump(summary, open(HERE / "podsumowanie.json", "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print(json.dumps(summary, ensure_ascii=False, indent=1))


if __name__ == "__main__":
    main()
