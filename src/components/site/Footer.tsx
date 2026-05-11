export function Footer() {
  return (
    <footer className="bg-cream border-t border-ink/10 pt-16 pb-28 md:pb-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <div className="text-4xl md:text-5xl font-black tracking-tighter mb-4">
              KSIGN<span className="text-violet">.</span>
            </div>
            <p className="text-ink/60 max-w-sm leading-snug">
              Premium web design dla firm, które chcą wyglądać lepiej od konkurencji.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Nawigacja</div>
            <ul className="space-y-2">
              {["Oferta", "Pakiet Start", "Proces", "FAQ", "Kontakt"].map((l) => (
                <li key={l}>
                  <a href={`#${l.toLowerCase().replace(" ", "")}`} className="font-medium hover:text-violet transition">{l}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-xs font-mono uppercase tracking-widest text-ink/40 mb-4">Kontakt</div>
            <ul className="space-y-2 mb-6">
              <li><a href="mailto:hello@ksign.pl" className="font-medium hover:text-violet transition">hello@ksign.pl</a></li>
              <li><a href="tel:+48000000000" className="font-medium hover:text-violet transition">+48 000 000 000</a></li>
            </ul>
            <div className="flex gap-2">
              {["IG", "FB", "BE", "IN"].map((s) => (
                <a key={s} href="#" className="w-10 h-10 rounded-full bg-ink text-cream flex items-center justify-center text-xs font-bold hover:bg-violet hover:text-ink transition">
                  {s}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-ink/10 flex flex-wrap items-center justify-between gap-4 text-sm text-ink/50">
          <div>© {new Date().getFullYear()} KSIGN. Wszelkie prawa zastrzeżone.</div>
          <div className="font-mono uppercase tracking-widest text-xs">Premium web design / Polska</div>
        </div>
      </div>
    </footer>
  );
}
