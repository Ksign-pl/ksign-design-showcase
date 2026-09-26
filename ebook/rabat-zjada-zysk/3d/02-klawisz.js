// Rozdział 02 · Kalkulator rabatu: biała klawiatura, jeden duży klawisz ze szkła w turkusie
// ze świecącym znakiem % w środku (nawiązanie do inspiracji ze świecącym klawiszem „Start”).
import { studio, THREE, mat, rbox, napis, swieci } from "./studio.js";

const { scene, render } = studio({
  kamera: [2.4, 6.4, 9.2],
  cel: [0.3, 0.1, -1.6],
  fov: 30,
  kluczPoz: [-5, 10, 4],
  mgla: [9, 16],
});

const bialy = mat.bialy();
const plyta = rbox(9.4, 0.36, 4.6, 0.16, bialy);
plyta.position.set(0, 0.18, 0.4);
scene.add(plyta);

const KR = 0.78; // raster klawiszy
const duzy = { x: 0, z: 0 }; // klawisz % zajmuje 2 × 2 pola, lewy górny róg w (0, 0)
for (let r = -2; r <= 2; r++) {
  for (let k = -6; k <= 5; k++) {
    if ((k === duzy.x || k === duzy.x + 1) && (r === duzy.z || r === duzy.z + 1)) continue;
    const klawisz = rbox(0.68, 0.24, 0.68, 0.12, bialy);
    klawisz.position.set(k * KR + KR / 2, 0.36 + 0.12, r * KR + KR / 2);
    scene.add(klawisz);
  }
}

const szklo = mat.szkloTurkus();
szklo.attenuationColor = new THREE.Color("#2ec4b6");
szklo.attenuationDistance = 1.6;
const klawisz = rbox(KR * 2 - 0.1, 0.46, KR * 2 - 0.1, 0.2, szklo);
klawisz.position.set((duzy.x + 1) * KR, 0.36 + 0.23, (duzy.z + 1) * KR);
scene.add(klawisz);

// świecący znak % w środku klawisza
const znak = napis("%", {
  rozmiar: 0.74,
  glebokosc: 0.012,
  faza: 0,
  material: new THREE.MeshBasicMaterial({ color: new THREE.Color("#b8fff7") }),
});
znak.rotation.x = -Math.PI / 2;
znak.position.set(klawisz.position.x, 0.36 + 0.46 + 0.007, klawisz.position.z);
znak.castShadow = false;
scene.add(swieci(znak));

// turkusowe światło pod klawiszem
const blask = new THREE.PointLight(new THREE.Color("#2ec4b6"), 6, 3.2, 1.6);
blask.position.set(klawisz.position.x, 0.5, klawisz.position.z);
scene.add(blask);

render({
  ostrosc: [klawisz.position.x, 0.6, klawisz.position.z],
  przeslona: 0.0026,
  rozmycie: 0.01,
  blask: { sila: 0.9, promien: 0.3 },
});
