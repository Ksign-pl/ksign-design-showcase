// Rozdział 03 · Czy to dla Ciebie?: waga szalkowa – torba zakupowa kontra stos monet.
import { studio, THREE, mat, rbox, lathe } from "./studio.js";

const { scene, render } = studio({ kamera: [1.4, 3.6, 17.2], cel: [0.05, 2.95, 0], fov: 28 });

const bialy = mat.bialy();
const czarny = mat.czarny();
const metal = mat.metal();

// podstawa, kolumna, belka
const podstawa = new THREE.Mesh(
  lathe([
    [0, 0],
    [1.15, 0],
    [1.18, 0.05],
    [1.1, 0.16],
    [0.55, 0.26],
    [0.3, 0.34],
    [0.22, 0.4],
    [0, 0.4],
  ]),
  bialy,
);
podstawa.castShadow = true;
podstawa.receiveShadow = true;
scene.add(podstawa);
const kolumna = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 3.2, 48), bialy);
kolumna.position.y = 0.4 + 1.6;
kolumna.castShadow = true;
scene.add(kolumna);
const przegub = new THREE.Mesh(new THREE.SphereGeometry(0.2, 48, 32), czarny);
przegub.position.y = 3.62;
przegub.castShadow = true;
scene.add(przegub);

const pochylenie = 0.06; // lekko przeważa torba – decyzja jeszcze nie zapadła
const belka = new THREE.Group();
belka.position.y = 3.62;
belka.rotation.z = pochylenie;
const pret = rbox(4.6, 0.14, 0.14, 0.06, bialy);
belka.add(pret);
for (const s of [-1, 1]) {
  const kulka = new THREE.Mesh(new THREE.SphereGeometry(0.1, 32, 24), czarny);
  kulka.position.x = s * 2.3;
  belka.add(kulka);
}
scene.add(belka);

// szalki na linkach (zawsze pionowo, wiszą z końców belki)
function szalka(x, y) {
  const g = new THREE.Group();
  const misa = new THREE.Mesh(
    lathe([
      [0, 0],
      [0.7, 0.02],
      [1.02, 0.12],
      [1.06, 0.16],
      [1.0, 0.15],
      [0.68, 0.07],
      [0, 0.05],
    ]),
    bialy,
  );
  misa.castShadow = true;
  misa.receiveShadow = true;
  g.add(misa);
  const dlugosc = 1.9;
  for (let k = 0; k < 3; k++) {
    const a = (k / 3) * Math.PI * 2 + 0.4;
    const start = new THREE.Vector3(Math.cos(a) * 0.98, 0.15, Math.sin(a) * 0.98);
    const koniec = new THREE.Vector3(0, dlugosc, 0);
    const srodek = start.clone().add(koniec).multiplyScalar(0.5);
    const linka = new THREE.Mesh(
      new THREE.CylinderGeometry(0.012, 0.012, start.distanceTo(koniec), 8),
      metal,
    );
    linka.position.copy(srodek);
    linka.lookAt(koniec);
    linka.rotateX(Math.PI / 2);
    g.add(linka);
  }
  g.position.set(x, y - dlugosc, 0);
  scene.add(g);
  return g;
}
const lewy = new THREE.Vector3(-2.3, 0, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), pochylenie);
const prawy = new THREE.Vector3(2.3, 0, 0).applyAxisAngle(new THREE.Vector3(0, 0, 1), pochylenie);
const szalkaL = szalka(lewy.x, 3.62 + lewy.y);
const szalkaP = szalka(prawy.x, 3.62 + prawy.y);

// lewa szalka: pomarańczowa torba zakupowa
const torba = new THREE.Group();
const korpus = rbox(0.95, 1.05, 0.5, 0.04, mat.pomarancz());
korpus.position.y = 0.55;
torba.add(korpus);
const uchwytMat = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.4 });
for (const z of [-0.12, 0.12]) {
  const uchwyt = new THREE.Mesh(new THREE.TorusGeometry(0.22, 0.02, 12, 48, Math.PI), uchwytMat);
  uchwyt.position.set(0, 1.08, z);
  uchwyt.castShadow = true;
  torba.add(uchwyt);
}
torba.position.y = 0.1;
torba.rotation.y = 0.35;
szalkaL.add(torba);

// prawa szalka: stos monet
const monetaMat = new THREE.MeshPhysicalMaterial({
  color: 0xe2ded6,
  metalness: 0.35,
  roughness: 0.32,
  clearcoat: 0.5,
});
const brzegMat = new THREE.MeshPhysicalMaterial({
  color: 0xc9c4ba,
  metalness: 0.4,
  roughness: 0.4,
});
for (let k = 0; k < 11; k++) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 64), [
    brzegMat,
    monetaMat,
    monetaMat,
  ]);
  m.position.set(Math.sin(k * 1.7) * 0.03, 0.12 + k * 0.092, Math.cos(k * 2.3) * 0.03);
  m.rotation.y = k;
  m.castShadow = true;
  szalkaP.add(m);
}
for (const [x, z, y] of [
  [0.62, 0.25, 0.1],
  [-0.55, -0.3, 0.1],
]) {
  const m = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.09, 64), [
    brzegMat,
    monetaMat,
    monetaMat,
  ]);
  m.position.set(x * 0.5, 0.12 + y, z * 0.5);
  m.rotation.set(0.25, 0, -0.2);
  m.castShadow = true;
  szalkaP.add(m);
}

render({ ostrosc: [0, 2.6, 0], przeslona: 0.0012, rozmycie: 0.006 });
