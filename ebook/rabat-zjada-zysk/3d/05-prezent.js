// Rozdział 05 · Zamiast rabatu: białe pudełko prezentowe z turkusową wstążką i kokardą,
// obok przewrócony marmurowy znak %.
import { studio, THREE, mat, rbox, napis } from "./studio.js";

const ustaw = (obiekt, x, y, z) => (obiekt.position.set(x, y, z), obiekt);

const { scene, render } = studio({ kamera: [2.2, 4.6, 12.4], cel: [0.1, 1.35, 0], fov: 30 });

const bialy = mat.bialy();
const turkus = mat.turkus();
const P = { w: 2.0, h: 1.6, pokrywa: 0.34 };

const pudelko = new THREE.Group();
pudelko.add(rbox(P.w, P.h, P.w, 0.04, bialy).translateY(P.h / 2));
pudelko.add(
  rbox(P.w + 0.12, P.pokrywa, P.w + 0.12, 0.05, bialy).translateY(P.h + P.pokrywa / 2 - 0.08),
);
// wstążki na krzyż (na pokrywie i na bokach)
const W = 0.3;
const gora = P.h + P.pokrywa - 0.08;
pudelko.add(rbox(W, 0.02, P.w + 0.14, 0.008, turkus).translateY(gora + 0.005));
pudelko.add(rbox(P.w + 0.14, 0.02, W, 0.008, turkus).translateY(gora + 0.006));
for (const s of [-1, 1]) {
  pudelko.add(ustaw(rbox(W, gora, 0.02, 0.008, turkus), 0, gora / 2, s * (P.w / 2 + 0.065)));
  pudelko.add(ustaw(rbox(0.02, gora, W, 0.008, turkus), s * (P.w / 2 + 0.065), gora / 2, 0));
}
// kokarda: dwie pętle, węzeł i dwa końce
for (const s of [-1, 1]) {
  const petla = new THREE.Mesh(new THREE.TorusGeometry(0.36, 0.1, 24, 64), turkus);
  petla.scale.set(1, 0.62, 0.8);
  petla.position.set(s * 0.36, gora + 0.28, 0);
  petla.rotation.set(0, 0, s * 0.42);
  petla.castShadow = true;
  pudelko.add(petla);
  const koniec = rbox(0.24, 0.02, 0.7, 0.01, turkus);
  koniec.position.set(s * 0.22, gora + 0.03, 0.32);
  koniec.rotation.set(0.05, s * 0.5, 0);
  pudelko.add(koniec);
}
const wezel = new THREE.Mesh(new THREE.SphereGeometry(0.16, 32, 16), turkus);
wezel.scale.set(1, 0.8, 0.9);
wezel.position.set(0, gora + 0.14, 0);
wezel.castShadow = true;
pudelko.add(wezel);
pudelko.position.set(0.95, 0, -0.4);
pudelko.rotation.y = -0.4;
scene.add(pudelko);

// przewrócony marmurowy znak %
const marmur = mat.marmur({ ziarno: 5, kafel: 1.6 });
const procent = napis("%", { rozmiar: 1.45, glebokosc: 0.34, faza: 0.03, material: marmur });
procent.rotation.set(-Math.PI / 2, 0, 0.55);
procent.position.set(-1.05, 0.2, 1.65);
scene.add(procent);

render({ ostrosc: [0.1, 1.0, 0.4], przeslona: 0.0012, rozmycie: 0.005 });
