// Numeracja stron i odsyłacze liczone przy każdym renderze – po dodaniu strony nic nie trzeba przepisywać.
// .pnum        → numer bieżącej strony (dwie cyfry, np. „07”)
// [data-str]   → numer strony o podanej nazwie (data-name), np. <span data-str="kalkulator"></span> → „28”
// Uruchom przed typografia.js (kolejność <script>), żeby twarde spacje objęły też wstawione numery.
(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const strony = [...document.querySelectorAll(".page")];
    const numery = new Map(strony.map((s, i) => [s.dataset.name, i + 1]));
    strony.forEach((s, i) => {
      s.dataset.nr = String(i + 1);
      s.querySelectorAll(".pnum").forEach((el) => {
        el.textContent = String(i + 1).padStart(2, "0");
      });
    });
    document.querySelectorAll("[data-str]").forEach((el) => {
      const nr = numery.get(el.dataset.str);
      if (!nr) throw new Error(`Odsyłacz do nieistniejącej strony: ${el.dataset.str}`);
      el.textContent = String(nr);
    });
  });
})();
