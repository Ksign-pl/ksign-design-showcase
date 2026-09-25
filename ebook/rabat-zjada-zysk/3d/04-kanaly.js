// Rozdział 04 · Jedna oferta, wiele kanałów: trzy identyczne turkusowe metki – na torbie zakupowej,
// na kartonie wysyłkowym i na sklepowej półce. Łączy je jedna turkusowa nitka.
import { studio, THREE, mat, rbox, metka, sznurek } from "./studio.js";

const ustaw = (obiekt, x, y, z) => (obiekt.position.set(x, y, z), obiekt);

const { scene, render } = studio({ kamera: [0.6, 4.6, 15.2], cel: [0.1, 1.6, 0], fov: 30 });

const bialy = mat.bialy();
const turkus = mat.turkus();
const metkaOpcje = {
  w: 0.86,
  h: 0.5,
  grubosc: 0.045,
  faza: 0.012,
  sciecie: 0.15,
  otwor: 0.055,
  material: turkus,
};
const dziurki = [];
function przypnij(m, rodzic) {
  rodzic.add(m.mesh);
  rodzic.updateMatrixWorld(true);
  dziurki.push(m.mesh.localToWorld(new THREE.Vector3(m.srodekOtworu.x, m.srodekOtworu.y, 0)));
}

// torba zakupowa (lewa)
const torba = new THREE.Group();
torba.add(rbox(1.5, 1.8, 0.62, 0.03, bialy).translateY(0.9));
for (const z of [-0.18, 0.18]) {
  const ucho = new THREE.Mesh(new THREE.TorusGeometry(0.34, 0.035, 16, 48, Math.PI), turkus);
  ucho.position.set(0, 1.8, z);
  ucho.castShadow = true;
  torba.add(ucho);
}
torba.position.set(-2.3, 0, -0.3);
torba.rotation.y = 0.35;
scene.add(torba);
const m1 = metka(metkaOpcje);
m1.mesh.position.set(0.25, 1.15, 0.33);
m1.mesh.rotation.set(0, 0, -0.35);
przypnij(m1, torba);

// karton wysyłkowy (środek, bliżej)
const karton = new THREE.Group();
karton.add(rbox(1.7, 1.05, 1.25, 0.05, bialy).translateY(0.525));
const tasma = rbox(0.24, 0.012, 1.254, 0.004, turkus);
tasma.position.y = 1.05;
karton.add(tasma);
karton.position.set(0.05, 0, 1.2);
karton.rotation.y = -0.22;
scene.add(karton);
const m2 = metka(metkaOpcje);
m2.mesh.rotation.set(0, 0, 0.2);
m2.mesh.position.set(0.2, 0.55, 0.65);
przypnij(m2, karton);

// sklepowa półka (prawa)
const polka = new THREE.Group();
for (const x of [-0.85, 0.85]) polka.add(ustaw(rbox(0.09, 2.5, 0.8, 0.02, bialy), x, 1.25, 0));
for (const y of [0.55, 1.4, 2.25]) polka.add(ustaw(rbox(1.8, 0.08, 0.8, 0.02, bialy), 0, y, 0));
// towar na półce
for (const [x, y, w, h] of [
  [-0.45, 1.44, 0.42, 0.62],
  [0.1, 1.44, 0.5, 0.48],
  [0.55, 0.59, 0.46, 0.56],
])
  polka.add(ustaw(rbox(w, h, 0.5, 0.05, bialy), x, y + h / 2, -0.05));
polka.position.set(2.4, 0, -0.6);
polka.rotation.y = -0.4;
scene.add(polka);
const m3 = metka(metkaOpcje);
m3.mesh.position.set(-0.25, 1.08, 0.43);
m3.mesh.rotation.set(0, 0, 0.3);
przypnij(m3, polka);

// jedna nitka przez trzy otwory
const [a, b, c] = dziurki;
scene.add(
  sznurek(
    [
      [a.x - 0.5, a.y + 0.55, a.z - 0.1],
      [a.x, a.y, a.z + 0.02],
      [(a.x + b.x) / 2 - 0.2, 0.03, (a.z + b.z) / 2 + 0.5],
      [b.x, b.y + 0.02, b.z],
      [(b.x + c.x) / 2 + 0.1, 0.03, (b.z + c.z) / 2 + 0.6],
      [c.x, c.y, c.z + 0.02],
      [c.x + 0.35, c.y - 0.55, c.z + 0.15],
    ],
    0.02,
    turkus,
  ),
);

render({ ostrosc: [0.05, 1.0, 1.2], przeslona: 0.0012, rozmycie: 0.005 });
