// Rozdział 07 · 9 błędów Black Friday: pułapka na myszy, w której zamiast sera leży turkusowa
// metka ze znakiem %. Podstawa z marmuru, druty ze stali.
import { studio, THREE, mat, rbox, metka, napis, sznurek } from "./studio.js";

const { scene, render } = studio({ kamera: [3.1, 3.9, 8.4], cel: [-0.15, 0.75, 0], fov: 30 });

const marmur = mat.marmur({ ziarno: 17, kafel: 3.2 });
const stal = new THREE.MeshStandardMaterial({ color: 0xe4e8e8, metalness: 1, roughness: 0.24 });
const B = { w: 3.4, h: 0.2, d: 1.5 };
scene.add(rbox(B.w, B.h, B.d, 0.05, marmur).translateY(B.h / 2));
const Y = B.h + 0.03;
const drut = (punkty, r = 0.03) => scene.add(sznurek(punkty, r, stal));

// pałąk (napięty, położony do tyłu) – prostokątna pętla z drutu
const xZawias = 0.2;
drut(
  [
    [xZawias, Y, -0.55],
    [-1.4, Y, -0.55],
    [-1.45, Y, -0.5],
    [-1.45, Y, 0.5],
    [-1.4, Y, 0.55],
    [xZawias, Y, 0.55],
  ],
  0.035,
);
// sprężyny przy zawiasie
for (const z of [-0.42, 0.42]) {
  const zwoje = [];
  for (let i = 0; i <= 120; i++) {
    const a = (i / 120) * Math.PI * 2 * 5;
    zwoje.push([
      xZawias + Math.cos(a) * 0.1,
      Y + 0.1 + Math.sin(a) * 0.1,
      z + (i / 120 - 0.5) * 0.26,
    ]);
  }
  drut(zwoje, 0.022);
}
drut(
  [
    [xZawias, Y + 0.1, -0.62],
    [xZawias, Y + 0.1, 0.62],
  ],
  0.03,
);
// zapadka: drut od tyłu pałąka nad podstawą do języczka
drut(
  [
    [-1.45, Y + 0.05, 0],
    [-0.6, Y + 0.13, 0],
    [0.4, Y + 0.17, 0],
    [1.0, Y + 0.13, 0],
  ],
  0.022,
);
// języczek (płytka na przynętę)
const plytka = rbox(0.62, 0.035, 0.52, 0.02, stal);
plytka.position.set(1.15, Y + 0.02, 0);
scene.add(plytka);

// przynęta: turkusowa metka z białym %
const m = metka({
  w: 0.95,
  h: 0.58,
  grubosc: 0.06,
  faza: 0.015,
  sciecie: 0.17,
  otwor: 0.06,
  material: mat.turkus(),
});
m.mesh.rotation.set(-Math.PI / 2 + 0.25, 0, 0.35);
m.mesh.position.set(1.18, Y + 0.25, 0.02);
scene.add(m.mesh);
const znak = napis("%", { rozmiar: 0.3, glebokosc: 0.012, faza: 0, material: mat.bialy() });
znak.position.set(0.12, 0, m.przod + 0.006);
m.mesh.add(znak);

render({ ostrosc: [1.0, 0.4, 0.1], przeslona: 0.0016, rozmycie: 0.007 });
