"""Badanie „100 polskich sklepów” do e-booka „Nie ma cię w rozmowie”.

Dla każdej domeny z kandydaci.csv sprawdza:
  1. czy strona główna odpowiada (zwykła przeglądarka, bez udawania botów OpenAI),
  2. reguły robots.txt dla OAI-AdsBot, OAI-SearchBot i GPTBot (zgodnie z RFC 9309),
  3. czy jest pixel OpenAI (skrypt z bzrcdn.openai.com / funkcja oaiq) – w HTML strony głównej
     i w kontenerach Google Tag Managera, do których strona linkuje,
  4. dla porównania: czy jest pixel Meta.

Nie renderuje JavaScriptu i nie klika banerów cookies – szuka kodu, a nie wywołań sieciowych.
Użycie: pip install requests && python skan.py  → wyniki.csv
"""

import csv
import datetime as dt
import re
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import requests

HERE = Path(__file__).parent
UA = (
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36"
)
BOTS = ["OAI-AdsBot", "OAI-SearchBot", "GPTBot"]
TIMEOUT = 20
MAX_BYTES = 3_000_000

OPENAI_PIXEL = re.compile(r"bzrcdn\.openai\.com|oaiq\s*\(", re.I)
META_PIXEL = re.compile(r"connect\.facebook\.net/[^\"']*fbevents|fbq\s*\(\s*['\"]init", re.I)
GTM_ID = re.compile(r"GTM-[A-Z0-9]{4,10}")


def get(session, url):
    try:
        r = session.get(url, timeout=TIMEOUT, allow_redirects=True, stream=True)
        body = r.raw.read(MAX_BYTES, decode_content=True) if r.status_code < 500 else b""
        return r.status_code, r.url, body.decode(r.encoding or "utf-8", errors="replace")
    except requests.RequestException as e:
        return None, url, type(e).__name__


# ---------- robots.txt (RFC 9309) ----------


def parse_robots(text):
    """Zwraca listę grup: (lista user-agentów, lista reguł (allow: bool, ścieżka))."""
    groups, agents, rules, last_was_agent = [], [], [], False
    for raw in text.splitlines():
        line = raw.split("#", 1)[0].strip()
        if ":" not in line:
            continue
        key, value = (part.strip() for part in line.split(":", 1))
        key = key.lower()
        if key == "user-agent":
            if not last_was_agent and agents:
                groups.append((agents, rules))
                agents, rules = [], []
            agents.append(value.lower())
            last_was_agent = True
        elif key in ("allow", "disallow"):
            if agents:
                rules.append((key == "allow", value))
            last_was_agent = False
    if agents:
        groups.append((agents, rules))
    return groups


def rule_matches(pattern, path):
    if pattern == "":
        return False
    regex = "".join(".*" if c == "*" else "$" if c == "$" else re.escape(c) for c in pattern)
    if not regex.endswith("$"):
        regex += ".*"
    return re.fullmatch(regex, path) is not None


def verdict(groups, bot, path="/"):
    """(dostęp, źródło): dostęp = 'dozwolony'/'zablokowany', źródło = 'nazwany'/'*'/'brak reguł'."""
    token = bot.lower()
    named = [rules for agents, rules in groups if token in agents]
    source = "nazwany"
    if not named:
        named = [rules for agents, rules in groups if "*" in agents]
        source = "*" if named else "brak reguł"
    rules = [r for group in named for r in group]
    best = None  # (długość wzorca, allow)
    for allow, pattern in rules:
        if rule_matches(pattern, path):
            candidate = (len(pattern), allow)
            if best is None or candidate[0] > best[0] or (candidate[0] == best[0] and allow):
                best = candidate
    blocked = best is not None and not best[1]
    return ("zablokowany" if blocked else "dozwolony"), source


# ---------- skan jednej domeny ----------


def scan(row):
    domain = row["domena"]
    s = requests.Session()
    s.headers.update({"User-Agent": UA, "Accept-Language": "pl-PL,pl;q=0.9"})
    out = dict(row)

    status, final_url, html = get(s, f"https://{domain}/")
    out["status_strony"] = status if status is not None else f"błąd: {html}"
    out["adres_koncowy"] = final_url
    page_ok = status is not None and status < 400

    r_status, _, robots = get(s, f"https://{domain}/robots.txt")
    out["robots_status"] = r_status if r_status is not None else f"błąd: {robots}"
    if r_status is not None and 200 <= r_status < 300 and "user-agent" in robots.lower():
        groups = parse_robots(robots)
        for bot in BOTS:
            out[f"{bot}_dostep"], out[f"{bot}_regula"] = verdict(groups, bot)
    elif r_status is not None and 400 <= r_status < 500:
        for bot in BOTS:  # brak pliku = wszystko dozwolone
            out[f"{bot}_dostep"], out[f"{bot}_regula"] = "dozwolony", "brak pliku"
    else:
        for bot in BOTS:
            out[f"{bot}_dostep"], out[f"{bot}_regula"] = "nieznany", "robots niedostępny"

    sources = [html] if page_ok else []
    gtm_ids = sorted(set(GTM_ID.findall(html)))[:4] if page_ok else []
    for gid in gtm_ids:
        g_status, _, g_js = get(s, f"https://www.googletagmanager.com/gtm.js?id={gid}")
        if g_status == 200:
            sources.append(g_js)
    out["kontenery_gtm"] = " ".join(gtm_ids)
    if page_ok:
        in_html = bool(OPENAI_PIXEL.search(html))
        in_gtm = any(OPENAI_PIXEL.search(js) for js in sources[1:])
        out["pixel_openai"] = "tak (HTML)" if in_html else "tak (GTM)" if in_gtm else "nie"
        out["pixel_meta"] = "tak" if any(META_PIXEL.search(src) for src in sources) else "nie"
    else:
        out["pixel_openai"] = out["pixel_meta"] = "nie sprawdzono"
    return out


def main():
    rows = list(csv.DictReader(open(HERE / "kandydaci.csv", encoding="utf-8")))
    with ThreadPoolExecutor(max_workers=8) as pool:
        results = list(pool.map(scan, rows))
    stamp = dt.datetime.now(dt.timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    fields = list(results[0].keys()) + ["data_skanu"]
    with open(HERE / "wyniki.csv", "w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fields)
        w.writeheader()
        for r in results:
            w.writerow({**r, "data_skanu": stamp})
    print(f"OK: {len(results)} domen → wyniki.csv ({stamp})", file=sys.stderr)


if __name__ == "__main__":
    main()
