// Rozdział 08 · Badanie: lupa nad rzędami białych metek, pod szkłem jedna turkusowa.
import { studio, THREE, mat, metka, lathe, rbox, losowe } from "./studio.js";

const { scene, render } = studio({ kamera: [0, 9.6, 12.2], cel: [0, 1.0, -0.6], fov: 30 });

const rnd = losowe(4);
const opcje = { w: 0.62, h: 0.36, grubosc: 0.035, faza: 0.01, sciecie: 0.11, otwor: 0.04, r: 0.04 };
const biala = metka({ ...opcje, material: mat.bialy() });
const turkusowa = metka({ ...opcje, material: mat.turkus() });
const SRODEK = { i: 2, j: 4 };
for (let i = 0; i < 7; i++) {
  for (let j = 0; j < 9; j++) {
    const m = (i === SRODEK.i && j === SRODEK.j ? turkusowa : biala).mesh.clone();
    m.rotation.set(-Math.PI / 2, 0, (rnd() - 0.5) * 0.35);
    m.position.set(
      (j - 4) * 0.78 + (rnd() - 0.5) * 0.06,
      0.02,
      (i - 3) * 0.62 + (rnd() - 0.5) * 0.05,
    );
    scene.add(m);
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
lupa.add(
  new THREE.Mesh(
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
  ),
);
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
lupa.position.set(0.05, 1.25, 0.9);
lupa.rotation.set(0.55, 0.62, 0);
lupa.traverse((o) => o.isMesh && (o.castShadow = true));
scene.add(lupa);

render({ ostrosc: [0, 0.3, 0], przeslona: 0.0014, rozmycie: 0.007 });
