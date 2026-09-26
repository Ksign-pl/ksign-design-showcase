// Rozdział 08 · Badanie: lupa nad siatką 100 sklepików, 5 z nich pomarańczowych (pixel OpenAI).
import { studio, THREE, mat, rbox, lathe } from "./studio.js";

const { scene, render } = studio({ kamera: [0, 9.6, 12.4], cel: [0, 1.15, -0.4], fov: 30 });

const bialy = mat.bialy();
const pomarancz = mat.pomarancz();
const daszekMat = new THREE.MeshStandardMaterial({ color: 0xcfcac1, roughness: 0.6 });
const ciemny = new THREE.MeshStandardMaterial({ color: 0x2b2b2b, roughness: 0.4 });
const pomaranczowe = new Set([13, 37, 44, 68, 82]);

const krok = 0.62;
for (let i = 0; i < 10; i++) {
  for (let j = 0; j < 10; j++) {
    const n = i * 10 + j;
    const x = (j - 4.5) * krok;
    const z = (i - 4.5) * krok;
    const wys = 0.26 + ((n * 37) % 5) * 0.04;
    const sklep = new THREE.Group();
    const bryla = rbox(0.4, wys, 0.36, 0.03, pomaranczowe.has(n) ? pomarancz : bialy);
    bryla.position.y = wys / 2;
    sklep.add(bryla);
    // daszek nad wejściem i drzwi
    const daszek = rbox(0.34, 0.03, 0.12, 0.01, pomaranczowe.has(n) ? ciemny : daszekMat);
    daszek.position.set(0, wys * 0.62, 0.2);
    daszek.rotation.x = 0.35;
    sklep.add(daszek);
    const drzwi = rbox(0.1, wys * 0.42, 0.01, 0.005, ciemny);
    drzwi.position.set(0, wys * 0.21, 0.181);
    sklep.add(drzwi);
    sklep.position.set(x, 0, z);
    scene.add(sklep);
  }
}

// lupa: gruba soczewka dwuwypukła, cienka obręcz, rączka
const lupa = new THREE.Group();
const szklo = new THREE.MeshPhysicalMaterial({
  color: 0xffffff,
  roughness: 0,
  transmission: 1,
  thickness: 1.6,
  ior: 1.52,
  specularIntensity: 1,
  clearcoat: 1,
});
const soczewka = new THREE.Mesh(
  lathe([
    [0, 0.2],
    [0.5, 0.16],
    [0.85, 0.08],
    [0.99, 0.01],
    [0.99, -0.01],
    [0.85, -0.08],
    [0.5, -0.16],
    [0, -0.2],
  ]),
  szklo,
);
lupa.add(soczewka);
const obrecz = new THREE.Mesh(new THREE.TorusGeometry(1.0, 0.055, 32, 160), mat.czarny());
obrecz.rotation.x = Math.PI / 2;
lupa.add(obrecz);
const raczka = rbox(0.17, 0.17, 1.8, 0.08, mat.czarny());
raczka.position.set(0, 0, 1.98);
lupa.add(raczka);
const tuleja = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.28, 32), mat.metal());
tuleja.rotation.x = Math.PI / 2;
tuleja.position.set(0, 0, 1.14);
lupa.add(tuleja);
// nad pomarańczowym sklepem nr 44 (środek siatki), przechylona do kamery
lupa.position.set(-0.31, 1.25, -0.2);
lupa.rotation.set(0.55, 0.62, 0);
lupa.traverse((o) => o.isMesh && (o.castShadow = true));
scene.add(lupa);

render({ ostrosc: [-0.31, 0.3, -0.31], przeslona: 0.0014, rozmycie: 0.007 });
