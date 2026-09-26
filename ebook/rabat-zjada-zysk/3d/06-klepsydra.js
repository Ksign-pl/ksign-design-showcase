// Rozdział 06 · Plan na 6 tygodni: szklana klepsydra, w której zamiast piasku przesypują się
// małe białe metki. Jedna metka – turkusowa. Podstawy z marmuru, kolumienki w turkusie.
import { studio, THREE, mat, metka, lathe, losowe } from "./studio.js";

const { scene, render } = studio({ kamera: [0.4, 3.4, 14.7], cel: [-0.9, 2.75, 0], fov: 30 });

const rnd = losowe(8);
const marmur = mat.marmur({ ziarno: 13, kafel: 2.4 });
const turkus = mat.turkus();
const DOL = 0.2;
const GORA = 3.5;

for (const y of [DOL / 2, GORA + DOL / 2]) {
  const tarcza = new THREE.Mesh(new THREE.CylinderGeometry(1.08, 1.08, DOL, 96), marmur);
  tarcza.position.y = y;
  tarcza.castShadow = true;
  tarcza.receiveShadow = true;
  scene.add(tarcza);
}
for (let i = 0; i < 3; i++) {
  const a = (i / 3) * Math.PI * 2 + 0.5;
  const slup = new THREE.Mesh(new THREE.CylinderGeometry(0.055, 0.055, GORA - DOL, 32), turkus);
  slup.position.set(Math.cos(a) * 0.9, (GORA + DOL) / 2, Math.sin(a) * 0.9);
  slup.castShadow = true;
  scene.add(slup);
}

// profil szkła: promień w funkcji wysokości (dwie bańki, wąska szyjka)
const H = GORA - DOL;
const promien = (y) => {
  const t = (y - DOL) / H; // 0..1
  const banka = Math.sin(Math.PI * ((t < 0.5 ? t : t - 0.5) * 2));
  return 0.07 + 0.66 * Math.pow(Math.max(0, banka), 0.75);
};
const profil = [];
for (let i = 0; i <= 80; i++) {
  const y = DOL + (H * i) / 80;
  profil.push([Math.max(0.001, promien(y)), y]);
}
const szklo = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0.02,
  transmission: 1,
  thickness: 0.05,
  ior: 1.45,
  side: THREE.DoubleSide,
  transparent: true,
});
const banka = new THREE.Mesh(lathe(profil, 96), szklo);
scene.add(banka);

// metki w środku: kopiec na dole, lejek na górze, kilka w szyjce
const mala = metka({
  w: 0.3,
  h: 0.18,
  grubosc: 0.02,
  faza: 0.004,
  sciecie: 0.06,
  otwor: 0.024,
  r: 0.03,
  material: mat.bialy(),
});
const turkusowa = metka({
  w: 0.42,
  h: 0.25,
  grubosc: 0.03,
  faza: 0.006,
  sciecie: 0.08,
  otwor: 0.032,
  r: 0.04,
  material: turkus,
});
function wrzuc(szablon, x, y, z) {
  const m = szablon.mesh.clone();
  m.position.set(x, y, z);
  m.rotation.set(rnd() * Math.PI, rnd() * Math.PI, rnd() * Math.PI);
  scene.add(m);
  return m;
}
const kopiec = (y0, wys, n, odwrocony = false) => {
  for (let i = 0; i < n; i++) {
    const h = Math.pow(rnd(), 0.8) * wys;
    const y = odwrocony ? y0 - h : y0 + h;
    const r = Math.min(promien(y) * 0.78, (wys - h) * 1.5 + 0.08) * Math.sqrt(rnd());
    const a = rnd() * Math.PI * 2;
    wrzuc(mala, Math.cos(a) * r, y + 0.03, Math.sin(a) * r);
  }
};
kopiec(DOL + 0.02, 0.62, 95);
kopiec(DOL + H / 2 + 0.2, 0.3, 26);
for (const y of [DOL + H / 2 - 0.05, DOL + H / 2 - 0.35, DOL + H / 2 - 0.62])
  wrzuc(mala, 0.01, y, 0);
// turkusowa metka w lejku nad szyjką – następna w kolejce
const t = wrzuc(turkusowa, 0.02, DOL + H / 2 + 0.2, 0.12);
t.rotation.set(-0.5, 0.1, 0.35);

render({ ostrosc: [0, 1.0, 0.3], przeslona: 0.0012, rozmycie: 0.005 });
