// Okładka: marmurowa metka „−20%” z odgryzionym rogiem. Od ugryzienia biegną świecące turkusowe
// pęknięcia (kintsugi), okruchy leżą na podłodze, przez otwór przechodzi turkusowy sznurek.
import {
  studio,
  THREE,
  mat,
  metka,
  pekniecia,
  okruch,
  sznurek,
  napis,
  rbox,
  losowe,
} from "./studio.js";

const { scene, render } = studio({
  kamera: [0.9, 2.3, 11.6],
  cel: [0.25, 2.0, 0],
  fov: 28,
  kluczPoz: [-6, 10, 7],
});

const marmur = mat.marmur({ ziarno: 11, kafel: 4.6 });
const ugryzienie = { R: 1.08, wysuniecie: 0.16, zeby: 3, glebokosc: 0.1 };
const m = metka({ w: 4.2, h: 2.4, grubosc: 0.34, material: marmur, ugryzienie });

const tag = new THREE.Group();
tag.add(m.mesh);

// napis „−20%” na przodzie metki, w lewej dolnej części (poza drogą pęknięć)
const czern = mat.czarny();
const tekst = new THREE.Group();
const liczba = napis("20%", { rozmiar: 0.56, glebokosc: 0.035, faza: 0.008, material: czern });
liczba.position.set(0.28, 0, 0);
tekst.add(liczba);
const minus = rbox(0.34, 0.092, 0.043, 0.02, czern);
minus.position.set(-0.78, 0.02, 0);
tekst.add(minus);
tekst.position.set(-0.28, -0.52, m.przod + 0.018);
tag.add(tekst);
const poleNapisu = (x, y) => x > -1.35 && x < 0.95 && y > -0.95 && y < -0.1;

// pęknięcia od krawędzi ugryzienia w głąb metki
const { c, R } = m.luk;
const starty = [
  [201, 2.6],
  [223, 3.3],
  [244, 2.5],
  [262, 1.7],
].map(([stopnie, dl]) => {
  const a = (stopnie * Math.PI) / 180;
  return [c.x + Math.cos(a) * (R + 0.09), c.y + Math.sin(a) * (R + 0.09), a, dl];
});
tag.add(
  pekniecia({
    starty,
    naScianie: (x, y) => m.naMetce(x, y, 0.07) && !poleNapisu(x, y),
    z: m.przod + 0.003,
    ziarno: 5,
    krok: 0.08,
    szerokosc: 0.05,
    galezie: 0.1,
  }),
);

// oczko wokół otworu (przód i tył)
for (const z of [m.przod, -m.przod]) {
  const oczko = new THREE.Mesh(new THREE.TorusGeometry(0.2, 0.035, 20, 64), mat.metal());
  oczko.position.set(m.srodekOtworu.x, m.srodekOtworu.y, z);
  oczko.castShadow = true;
  tag.add(oczko);
}

const PODLOGA = -1.2 + 0.03; // y podłogi w układzie metki (metka stoi na dolnej krawędzi)
const ox = m.srodekOtworu.x;
tag.add(
  sznurek(
    [
      [-0.6, PODLOGA, -1.1],
      [ox + 0.2, -0.7, -0.5],
      [ox, -0.05, -0.26],
      [ox, 0.02, 0],
      [ox, -0.05, 0.26],
      [ox - 0.15, -0.55, 0.5],
      [ox - 0.45, PODLOGA, 1.0],
      [ox - 0.95, PODLOGA, 1.55],
      [ox - 0.55, PODLOGA, 2.15],
      [ox + 0.25, PODLOGA, 2.2],
    ],
    0.028,
    new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#2ec4b6"),
      roughness: 0.62,
      sheen: 1,
      sheenColor: new THREE.Color("#7fe3da"),
    }),
  ),
);

tag.position.set(0, 1.2, 0);
tag.rotation.y = -0.36;
scene.add(tag);

// okruchy marmuru pod ugryzieniem
const rnd = losowe(21);
const okruchy = [
  [1.55, 0.55, 0.15],
  [1.95, 0.95, 0.1],
  [1.25, 1.1, 0.08],
  [2.3, 0.45, 0.07],
  [1.7, 1.45, 0.06],
  [2.05, 1.3, 0.05],
  [1.05, 0.75, 0.045],
];
okruchy.forEach(([x, z, r], i) => {
  const o = okruch(r, marmur, 30 + i);
  o.position.set(x, r * 0.62, z);
  o.rotation.set(rnd() * 3, rnd() * 3, rnd() * 3);
  scene.add(o);
});

render({
  ostrosc: [1.0, 1.6, 0.5],
  przeslona: 0.0008,
  rozmycie: 0.004,
  blask: { sila: 0.8, promien: 0.25 },
});
