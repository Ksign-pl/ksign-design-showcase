// Rozdział 01 · Sprzedaż rośnie, zysk spada: kartony wysyłkowe rosną schodami w górę,
// stosy monet przed nimi maleją. Ostatnia moneta – turkusowa.
import { studio, THREE, mat, rbox, lathe } from "./studio.js";

const { scene, render } = studio({ kamera: [3.4, 3.9, 12.2], cel: [0.1, 1.95, 0], fov: 30 });

const bialy = mat.bialy();
const tasma = mat.turkus();
const K = { w: 0.92, h: 0.6, d: 0.74 };

// kartony: kolumny 1, 2, 3, 4 od lewej do prawej
[1, 2, 3, 4].forEach((ile, kol) => {
  for (let i = 0; i < ile; i++) {
    const karton = new THREE.Group();
    karton.add(rbox(K.w, K.h, K.d, 0.05, bialy));
    const pas = rbox(0.18, 0.012, K.d + 0.004, 0.004, tasma);
    pas.position.y = K.h / 2;
    karton.add(pas);
    const bok = rbox(0.18, K.h * 0.34, 0.012, 0.004, tasma);
    bok.position.set(0, K.h / 2 - (K.h * 0.34) / 2, K.d / 2);
    karton.add(bok);
    karton.position.set(-1.95 + kol * 1.08, K.h / 2 + i * (K.h + 0.015), -0.9);
    karton.rotation.y = ((i * 7 + kol * 3) % 5) * 0.012 - 0.024;
    scene.add(karton);
  }
});

// monety: stosy 9, 6, 3, 1 od lewej do prawej
const moneta = lathe([
  [0, 0],
  [0.3, 0],
  [0.318, 0.012],
  [0.322, 0.035],
  [0.318, 0.058],
  [0.3, 0.07],
  [0.27, 0.07],
  [0.265, 0.062],
  [0, 0.062],
]);
const srebro = new THREE.MeshStandardMaterial({
  color: 0xf1f4f3,
  metalness: 0.9,
  roughness: 0.3,
  envMapIntensity: 2.4,
});
const turkus = new THREE.MeshPhysicalMaterial({
  color: new THREE.Color("#2ec4b6"),
  metalness: 0.35,
  roughness: 0.18,
  clearcoat: 1,
});
[9, 6, 3, 1].forEach((ile, kol) => {
  for (let i = 0; i < ile; i++) {
    const m = new THREE.Mesh(moneta, kol === 3 ? turkus : srebro);
    m.castShadow = true;
    m.receiveShadow = true;
    const drganie = ((i * 13 + kol * 7) % 9) / 9 - 0.5;
    m.position.set(-1.55 + kol * 1.08 + drganie * 0.03, i * 0.071, 0.75 + drganie * 0.02);
    scene.add(m);
  }
});

render({ ostrosc: [0.2, 0.8, 0.2], przeslona: 0.0014, rozmycie: 0.006 });
