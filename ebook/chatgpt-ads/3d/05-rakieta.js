// Rozdział 05 · Pierwsza kampania w 7 dni: rakieta startuje z kłębów dymu.
import { studio, THREE, mat, lathe } from "./studio.js";

const { scene, render } = studio({
  kamera: [2.0, 2.4, 20.5],
  cel: [0, 3.55, 0],
  fov: 28,
  kluczPoz: [-7, 10, 5],
});

const bialy = mat.bialy();
const pomarancz = mat.pomarancz();
const czarny = mat.czarny();

const rakieta = new THREE.Group();
// kadłub z nosem
const kadlub = new THREE.Mesh(
  lathe([
    [0, 0],
    [0.52, 0],
    [0.62, 0.35],
    [0.68, 1.0],
    [0.68, 2.0],
    [0.62, 2.6],
    [0.5, 3.05],
    [0.001, 3.06],
  ]),
  bialy,
);
rakieta.add(kadlub);
const nos = new THREE.Mesh(
  lathe([
    [0, 3.0],
    [0.5, 3.0],
    [0.4, 3.4],
    [0.22, 3.75],
    [0.06, 3.95],
    [0, 3.98],
  ]),
  pomarancz,
);
rakieta.add(nos);
// pas i dysza
const pas = new THREE.Mesh(new THREE.CylinderGeometry(0.69, 0.69, 0.16, 64), pomarancz);
pas.position.y = 1.2;
rakieta.add(pas);
const dysza = new THREE.Mesh(
  lathe([
    [0.28, 0],
    [0.44, -0.32],
    [0.4, -0.34],
    [0.24, -0.02],
  ]),
  czarny,
);
rakieta.add(dysza);
// iluminator
const okno = new THREE.Mesh(new THREE.TorusGeometry(0.24, 0.05, 24, 64), mat.metal());
okno.position.set(0, 2.15, 0.66);
rakieta.add(okno);
const szyba = new THREE.Mesh(
  new THREE.CircleGeometry(0.22, 48),
  new THREE.MeshPhysicalMaterial({ color: 0x1d2b33, roughness: 0.05, clearcoat: 1 }),
);
szyba.position.set(0, 2.15, 0.672);
rakieta.add(szyba);
// statecznik ×3
const ksztalt = new THREE.Shape();
ksztalt.moveTo(0, 0);
ksztalt.lineTo(0.75, -0.35);
ksztalt.quadraticCurveTo(0.85, -0.4, 0.82, -0.2);
ksztalt.lineTo(0.55, 0.55);
ksztalt.quadraticCurveTo(0.2, 1.1, 0, 1.2);
ksztalt.lineTo(0, 0);
const skrzGeo = new THREE.ExtrudeGeometry(ksztalt, {
  depth: 0.08,
  bevelEnabled: true,
  bevelThickness: 0.03,
  bevelSize: 0.03,
  bevelSegments: 4,
});
skrzGeo.translate(0, 0, -0.04);
for (let k = 0; k < 3; k++) {
  const f = new THREE.Mesh(skrzGeo, pomarancz);
  const a = Math.PI / 2 + (k * 2 * Math.PI) / 3; // jeden z tyłu, dwa po bokach z przodu
  const g = new THREE.Group();
  f.position.set(0.58, 0.05, 0);
  g.add(f);
  g.rotation.y = a;
  rakieta.add(g);
}
rakieta.traverse((o) => o.isMesh && ((o.castShadow = true), (o.receiveShadow = true)));
rakieta.position.y = 1.35;
rakieta.rotation.z = -0.05;
scene.add(rakieta);

// płomień: stożek świecący, pod dyszą
const plomien = new THREE.Mesh(
  lathe([
    [0.001, -1.2],
    [0.22, -0.7],
    [0.34, -0.25],
    [0.3, 0],
    [0.001, 0],
  ]),
  new THREE.MeshStandardMaterial({ color: 0xffd08a, emissive: 0xffa53a, emissiveIntensity: 2.2 }),
);
plomien.position.set(0, 1.35 - 0.3, 0);
plomien.rotation.z = -0.05;
scene.add(plomien);
const blask = new THREE.PointLight(0xffa53a, 12, 5, 1.6);
blask.position.set(0, 0.7, 0.4);
scene.add(blask);

// kłęby dymu: miękkie białe kule
const dymMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 });
const rnd = (() => {
  let s = 11;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
})();
for (let k = 0; k < 46; k++) {
  const a = rnd() * Math.PI * 2;
  const r = 0.4 + rnd() * 2.6;
  const rozmiar = 0.28 + rnd() * 0.55 * (1.2 - r / 3.2);
  const kula = new THREE.Mesh(new THREE.SphereGeometry(rozmiar, 32, 24), dymMat);
  kula.position.set(
    Math.cos(a) * r,
    rozmiar * 0.55 + rnd() * 0.25 * (1 - r / 3),
    Math.sin(a) * r * 0.7,
  );
  kula.castShadow = true;
  kula.receiveShadow = true;
  scene.add(kula);
}

render({ ostrosc: [0, 2.8, 0], przeslona: 0.0012, rozmycie: 0.006 });
