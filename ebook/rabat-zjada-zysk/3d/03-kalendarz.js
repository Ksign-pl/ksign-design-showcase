// Rozdział 03 · Omnibus w każdym kanale: bloczek zdzieranego kalendarza z 30 kartek („30 DNI”),
// na nim turkusowa metka ze sznurkiem, kilka zdartych kartek na podłodze (jedna turkusowa).
import { studio, THREE, mat, rbox, metka, napis, sznurek, losowe } from "./studio.js";

const { scene, render } = studio({ kamera: [2.4, 6.9, 10.4], cel: [0.3, 0.1, -1.4], fov: 30 });

const rnd = losowe(3);
const papier = new THREE.MeshPhysicalMaterial({ color: 0xfbfcfb, roughness: 0.75, sheen: 0.4 });
const turkus = mat.turkus();
const czern = mat.czarny();
const K = { w: 2.7, d: 2.3, h: 0.022 };

// 30 kartek z drobnym przesunięciem – widać warstwy na krawędzi
const blok = new THREE.Group();
for (let i = 0; i < 30; i++) {
  const k = rbox(K.w, K.h, K.d, 0.006, papier);
  k.position.set((rnd() - 0.5) * 0.02, K.h / 2 + i * (K.h + 0.002), (rnd() - 0.5) * 0.02);
  k.rotation.y = (rnd() - 0.5) * 0.008;
  blok.add(k);
}
const wierzch = 30 * (K.h + 0.002);
// grzbiet bloczka (klej) i sztywna tektura pod spodem
const grzbiet = rbox(K.w + 0.04, wierzch + 0.04, 0.2, 0.03, czern);
grzbiet.position.set(0, (wierzch + 0.04) / 2, -K.d / 2 + 0.08);
blok.add(grzbiet);

// „30 DNI” na wierzchniej kartce
const liczba = napis("30", { rozmiar: 0.92, glebokosc: 0.012, faza: 0, material: czern });
liczba.rotation.x = -Math.PI / 2;
liczba.position.set(-0.12, wierzch + 0.008, 0.02);
blok.add(liczba);
const dni = napis("DNI", { rozmiar: 0.24, glebokosc: 0.01, faza: 0, material: czern });
dni.rotation.x = -Math.PI / 2;
dni.position.set(-0.12, wierzch + 0.008, 0.72);
blok.add(dni);
blok.rotation.y = -0.18;
blok.position.x = 0.75;
scene.add(blok);

// turkusowa metka na rogu bloczka
const m = metka({
  w: 1.25,
  h: 0.7,
  grubosc: 0.06,
  faza: 0.015,
  sciecie: 0.22,
  otwor: 0.07,
  material: turkus,
});
m.mesh.rotation.x = -Math.PI / 2;
m.mesh.rotation.z = 0.5;
m.mesh.position.set(1.15, wierzch + 0.05, 0.85);
blok.add(m.mesh);
blok.updateMatrixWorld(true);
const otwor = m.mesh.localToWorld(new THREE.Vector3(m.srodekOtworu.x, m.srodekOtworu.y, 0));
scene.add(
  sznurek(
    [
      [otwor.x, otwor.y + 0.03, otwor.z],
      [otwor.x - 0.1, otwor.y + 0.1, otwor.z + 0.35],
      [otwor.x + 0.1, 0.35, otwor.z + 0.95],
      [otwor.x + 0.5, 0.02, otwor.z + 1.3],
      [otwor.x + 1.2, 0.02, otwor.z + 1.2],
    ],
    0.022,
    new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: 0.7, sheen: 1 }),
  ),
);

// zdarte kartki na podłodze
[
  [2.3, -1.45, 0.5, turkus],
  [-1.75, 0.75, -0.35, papier],
].forEach(([x, z, obrot, material]) => {
  const k = rbox(K.w * 0.52, 0.016, K.d * 0.52, 0.005, material);
  k.position.set(x, 0.01, z);
  k.rotation.set(0, obrot, (rnd() - 0.5) * 0.03);
  scene.add(k);
});

render({ ostrosc: [0.3, 0.6, 0.2], przeslona: 0.0016, rozmycie: 0.007 });
