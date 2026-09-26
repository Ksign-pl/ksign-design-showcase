// Rozdział 01 · Klient już rozmawia: z ekranu laptopa wychodzi dymek rozmowy, a na nim stoi sofa – odpowiedź.
import { studio, THREE, mat, rbox } from "./studio.js";

const { scene, render } = studio({
  kamera: [3.6, 4.6, 15.0],
  cel: [-0.2, 2.35, 0],
  fov: 28,
  kluczPoz: [-7, 10, 6],
});

const bialy = mat.bialy();
const pomarancz = mat.pomarancz();
const czarny = mat.czarny();
const alu = new THREE.MeshPhysicalMaterial({
  color: 0xe6e4e0,
  metalness: 0.6,
  roughness: 0.35,
  clearcoat: 0.3,
});

// laptop
const laptop = new THREE.Group();
const baza = rbox(4.2, 0.14, 2.9, 0.07, alu);
baza.position.y = 0.07;
laptop.add(baza);
const klawiatura = rbox(
  3.5,
  0.02,
  1.25,
  0.02,
  new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.6 }),
);
klawiatura.position.set(0, 0.145, -0.35);
laptop.add(klawiatura);
const gladzik = rbox(
  1.2,
  0.01,
  0.75,
  0.04,
  new THREE.MeshStandardMaterial({ color: 0xd9d6d0, roughness: 0.5 }),
);
gladzik.position.set(0, 0.142, 0.8);
laptop.add(gladzik);
const zawias = new THREE.Group();
zawias.position.set(0, 0.14, -1.42);
zawias.rotation.x = -0.28; // ekran lekko odchylony
const pokrywa = rbox(4.2, 2.8, 0.1, 0.07, alu);
pokrywa.position.set(0, 1.4, -0.05);
zawias.add(pokrywa);
const ekran = new THREE.Mesh(
  new THREE.PlaneGeometry(3.9, 2.5),
  new THREE.MeshPhysicalMaterial({
    color: 0x111416,
    roughness: 0.15,
    clearcoat: 1,
    emissive: 0x1a1f24,
    emissiveIntensity: 0.4,
  }),
);
ekran.position.set(0, 1.42, 0.001);
zawias.add(ekran);
laptop.add(zawias);
laptop.position.set(-0.6, 0, -0.4);
laptop.rotation.y = 0.28;
scene.add(laptop);

// dymek rozmowy wychodzący z ekranu (zaokrąglony prostokąt z ogonkiem skierowanym w ekran)
const ksztalt = new THREE.Shape();
const bw = 2.9;
const bh = 1.7;
const r = 0.5;
const x0 = -bw / 2;
const y0 = 0;
ksztalt.moveTo(x0 + r, y0);
ksztalt.lineTo(x0 + bw * 0.3, y0);
ksztalt.lineTo(x0 + bw * 0.14, y0 - 0.5); // ogonek
ksztalt.lineTo(x0 + bw * 0.46, y0);
ksztalt.lineTo(x0 + bw - r, y0);
ksztalt.quadraticCurveTo(x0 + bw, y0, x0 + bw, y0 + r);
ksztalt.lineTo(x0 + bw, y0 + bh - r);
ksztalt.quadraticCurveTo(x0 + bw, y0 + bh, x0 + bw - r, y0 + bh);
ksztalt.lineTo(x0 + r, y0 + bh);
ksztalt.quadraticCurveTo(x0, y0 + bh, x0, y0 + bh - r);
ksztalt.lineTo(x0, y0 + r);
ksztalt.quadraticCurveTo(x0, y0, x0 + r, y0);
const dymekGeo = new THREE.ExtrudeGeometry(ksztalt, {
  depth: 0.45,
  bevelEnabled: true,
  bevelThickness: 0.1,
  bevelSize: 0.08,
  bevelSegments: 8,
  curveSegments: 32,
});
const dymek = new THREE.Mesh(dymekGeo, bialy);
dymek.castShadow = true;
dymek.receiveShadow = true;
const dymekG = new THREE.Group();
dymekG.add(dymek);
// dymek stoi pionowo i „wychodzi” z ekranu: tył schowany za płaszczyzną ekranu
const kropkaMat = new THREE.MeshStandardMaterial({ color: 0xc9c5bd, roughness: 0.4 });
for (let k = 0; k < 3; k++) {
  const kr = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 24), kropkaMat);
  kr.position.set(-0.55 + k * 0.55, bh / 2, 0.58);
  kr.scale.z = 0.6;
  kr.castShadow = true;
  dymekG.add(kr);
}
laptop.updateMatrixWorld(true);
zawias.add(dymekG);
dymekG.position.set(-0.35, 1.05, -0.12);
dymekG.rotation.set(0.1, -0.12, 0.03);

// sofa na podstawie laptopa – produkt, który „wyszedł” z rozmowy
const sofa = new THREE.Group();
const siedzisko = rbox(1.5, 0.28, 0.62, 0.1, pomarancz);
siedzisko.position.set(0, 0.34, 0.04);
const oparcie = rbox(1.5, 0.52, 0.22, 0.1, pomarancz);
oparcie.position.set(0, 0.62, -0.26);
const podst = rbox(1.56, 0.14, 0.7, 0.05, pomarancz);
podst.position.set(0, 0.17, 0);
sofa.add(siedzisko, oparcie, podst);
for (const s of [-1, 1]) {
  const podlokietnik = rbox(0.2, 0.44, 0.74, 0.09, pomarancz);
  podlokietnik.position.set(s * 0.84, 0.38, 0);
  sofa.add(podlokietnik);
  for (const z of [-0.26, 0.26]) {
    const nozka = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.025, 0.12, 16), czarny);
    nozka.position.set(s * 0.72, 0.06, z);
    sofa.add(nozka);
  }
}
const poduszka = rbox(0.42, 0.34, 0.12, 0.06, bialy);
poduszka.position.set(-0.35, 0.62, -0.1);
poduszka.rotation.set(-0.2, 0.1, 0.12);
sofa.add(poduszka);
sofa.traverse((o) => o.isMesh && ((o.castShadow = true), (o.receiveShadow = true)));
sofa.scale.setScalar(1.15);
sofa.position.set(0.55, 0.14, 0.75);
sofa.rotation.y = -0.18;
laptop.add(sofa);

render({ ostrosc: [0.2, 1.2, 0.4], przeslona: 0.0011, rozmycie: 0.005 });
