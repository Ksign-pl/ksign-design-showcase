// Rozdział 02 · Jak to działa: pytanie w dymku → karta reklamy → kliknięcie kursorem.
import { studio, THREE, mat, rbox } from "./studio.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import helvetiker from "./node_modules/three/examples/fonts/helvetiker_bold.typeface.json" with { type: "json" };

const { scene, render } = studio({
  kamera: [2.4, 3.9, 17.2],
  cel: [0.1, 3.55, 0],
  fov: 28,
  kluczPoz: [-7, 10, 7],
});

const bialy = mat.bialy();
const pomarancz = mat.pomarancz();
const czarny = mat.czarny();
const szary = new THREE.MeshStandardMaterial({ color: 0xd9d6d0, roughness: 0.45 });

function dymekKsztalt(bw, bh, r) {
  const s = new THREE.Shape();
  const x0 = -bw / 2;
  s.moveTo(x0 + r, 0);
  s.lineTo(x0 + bw * 0.62, 0);
  s.lineTo(x0 + bw * 0.86, -0.42);
  s.lineTo(x0 + bw * 0.78, 0);
  s.lineTo(x0 + bw - r, 0);
  s.quadraticCurveTo(x0 + bw, 0, x0 + bw, r);
  s.lineTo(x0 + bw, bh - r);
  s.quadraticCurveTo(x0 + bw, bh, x0 + bw - r, bh);
  s.lineTo(x0 + r, bh);
  s.quadraticCurveTo(x0, bh, x0, bh - r);
  s.lineTo(x0, r);
  s.quadraticCurveTo(x0, 0, x0 + r, 0);
  return s;
}

// 1) dymek z pytaniem – w głębi po lewej, unosi się
const dymek = new THREE.Mesh(
  new THREE.ExtrudeGeometry(dymekKsztalt(2.1, 1.5, 0.45), {
    depth: 0.35,
    bevelEnabled: true,
    bevelThickness: 0.08,
    bevelSize: 0.07,
    bevelSegments: 8,
    curveSegments: 32,
  }),
  bialy,
);
dymek.castShadow = true;
dymek.position.set(-2.05, 3.05, -1.5);
dymek.rotation.set(0.02, 0.32, 0.04);
scene.add(dymek);

// 2) karta reklamy – pomarańczowa, na środku
const karta = new THREE.Group();
const tloKarty = rbox(2.2, 2.7, 0.14, 0.14, pomarancz);
karta.add(tloKarty);
const zdjecie = rbox(1.85, 1.35, 0.06, 0.1, bialy);
zdjecie.position.set(0, 0.45, 0.08);
karta.add(zdjecie);
const produkt = rbox(0.62, 0.5, 0.3, 0.08, pomarancz);
produkt.position.set(0, 0.42, 0.26);
karta.add(produkt);
const linia1 = rbox(1.5, 0.12, 0.04, 0.05, czarny);
linia1.position.set(-0.17, -0.55, 0.09);
const linia2 = rbox(
  1.1,
  0.09,
  0.04,
  0.04,
  new THREE.MeshStandardMaterial({ color: 0x5a3a08, roughness: 0.5 }),
);
linia2.position.set(-0.37, -0.8, 0.09);
const przycisk = rbox(0.8, 0.28, 0.06, 0.13, bialy);
przycisk.position.set(-0.52, -1.12, 0.09);
karta.add(linia1, linia2, przycisk);
karta.traverse((o) => o.isMesh && ((o.castShadow = true), (o.receiveShadow = true)));
karta.position.set(0.35, 2.55, 0.2);
karta.rotation.set(0.04, -0.28, -0.03);
scene.add(karta);

// 3) kursor – duża biała strzałka, klika w przycisk
const k = new THREE.Shape();
k.moveTo(0, 0);
k.lineTo(0, -1.9);
k.lineTo(0.46, -1.46);
k.lineTo(0.8, -2.2);
k.lineTo(1.08, -2.08);
k.lineTo(0.76, -1.36);
k.lineTo(1.36, -1.36);
k.lineTo(0, 0);
const kursor = new THREE.Mesh(
  new THREE.ExtrudeGeometry(k, {
    depth: 0.18,
    bevelEnabled: true,
    bevelThickness: 0.06,
    bevelSize: 0.06,
    bevelSegments: 6,
  }),
  bialy,
);
kursor.castShadow = true;
const obrys = new THREE.Mesh(
  new THREE.ExtrudeGeometry(k, {
    depth: 0.12,
    bevelEnabled: true,
    bevelThickness: 0.1,
    bevelSize: 0.12,
    bevelSegments: 4,
  }),
  czarny,
);
obrys.position.z = 0.02;
const kursorG = new THREE.Group();
kursorG.add(obrys, kursor);
kursor.position.z = 0.06;
kursorG.position.set(0.1, 1.55, 1.25);
kursorG.rotation.set(0.1, -0.38, 0.22);
kursorG.scale.setScalar(0.72);
scene.add(kursorG);
// fale kliknięcia na przycisku
for (const [r, a] of [
  [0.34, 0.9],
  [0.52, 0.55],
]) {
  const fala = new THREE.Mesh(
    new THREE.TorusGeometry(r, 0.025, 12, 64),
    new THREE.MeshStandardMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: a,
      roughness: 0.3,
    }),
  );
  fala.position.set(-0.52, -1.12, 0.16);
  karta.add(fala);
}

// kropki ścieżki od dymka do karty
const krzywa = new THREE.QuadraticBezierCurve3(
  new THREE.Vector3(-1.05, 2.75, -1.1),
  new THREE.Vector3(-0.95, 1.9, -0.5),
  new THREE.Vector3(-0.72, 2.35, 0.15),
);
for (let i = 1; i <= 5; i++) {
  const p = krzywa.getPoint(i / 6);
  const kr = new THREE.Mesh(new THREE.SphereGeometry(0.08, 20, 14), szary);
  kr.position.copy(p);
  scene.add(kr);
}

// znak zapytania w dymku (font z przykładów three.js, wczytany jako moduł JSON – fetch nie działa z file://)
const font = new FontLoader().parse(helvetiker);
const geo = new TextGeometry("?", {
  font,
  size: 0.95,
  depth: 0.12,
  curveSegments: 12,
  bevelEnabled: true,
  bevelThickness: 0.02,
  bevelSize: 0.015,
  bevelSegments: 3,
});
geo.center();
const znak = new THREE.Mesh(geo, pomarancz);
znak.position.set(0, 0.78, 0.48);
znak.castShadow = true;
dymek.add(znak);

render({ ostrosc: [0.3, 2.3, 0.4], przeslona: 0.0012, rozmycie: 0.006 });
