// Rozdział 07 · 9 błędów: dziewięć kostek domina; łańcuch pada, pomarańczowa (budżet) jest następna.
import { studio, THREE, mat, rbox } from "./studio.js";

const { scene, render } = studio({
  kamera: [-0.6, 4.4, 11.8],
  cel: [0.35, 1.75, -0.6],
  fov: 30,
  kluczPoz: [-8, 10, 2],
});

const bialy = mat.bialy();
const pomarancz = mat.pomarancz();
const oczko = new THREE.MeshStandardMaterial({ color: 0x1c1c1c, roughness: 0.4 });

const kw = 0.9;
const kh = 1.8;
const kd = 0.3;
// oczka na przedniej ścianie: górna i dolna połowa
const uklady = [
  [1, 4],
  [2, 6],
  [3, 5],
  [0, 2],
  [5, 3],
  [6, 6],
  [4, 1],
  [2, 2],
  [3, 6],
];
const pozycjeOczek = {
  0: [],
  1: [[0, 0]],
  2: [
    [-1, 1],
    [1, -1],
  ],
  3: [
    [-1, 1],
    [0, 0],
    [1, -1],
  ],
  4: [
    [-1, 1],
    [1, 1],
    [-1, -1],
    [1, -1],
  ],
  5: [
    [-1, 1],
    [1, 1],
    [0, 0],
    [-1, -1],
    [1, -1],
  ],
  6: [
    [-1, 1],
    [1, 1],
    [-1, 0],
    [1, 0],
    [-1, -1],
    [1, -1],
  ],
};
function kostka(material, [gora, dol]) {
  const g = new THREE.Group();
  const b = rbox(kw, kh, kd, 0.07, material);
  b.position.y = kh / 2;
  g.add(b);
  const kreska = rbox(kw * 0.8, 0.025, 0.02, 0.01, oczko);
  kreska.position.set(0, kh / 2, kd / 2 + 0.002);
  g.add(kreska);
  const dodaj = (liczba, srodekY) => {
    for (const [px, py] of pozycjeOczek[liczba]) {
      const o = new THREE.Mesh(new THREE.CylinderGeometry(0.065, 0.065, 0.02, 32), oczko);
      o.rotation.x = Math.PI / 2;
      o.position.set(px * 0.24, srodekY + py * 0.24, kd / 2 + 0.004);
      g.add(o);
    }
  };
  dodaj(gora, kh * 0.75);
  dodaj(dol, kh * 0.25);
  return g;
}

// łańcuch biegnie od kamery w głąb (lekka litera S); oczka patrzą do kamery
const punkty = [];
for (let i = 0; i < 9; i++) {
  const t = i / 8;
  const x = -3.9 + t * 7.6;
  const z = 2.4 - t * 5.8 + Math.sin(t * Math.PI) * 1.3;
  punkty.push(new THREE.Vector3(x, 0, z));
}
// pierwsze kostki już leżą; pomarańczowa (nr 5) stoi jako następna – to Twój budżet
const pochylenia = [1.32, 1.18, 1.0, 0.72, 0.36, 0, 0, 0, 0];
for (let i = 0; i < 9; i++) {
  const p = punkty[i];
  const a = punkty[Math.max(i - 1, 0)];
  const b = punkty[Math.min(i + 1, 8)];
  const kier = Math.atan2(b.x - a.x, b.z - a.z);
  const k = kostka(i === 5 ? pomarancz : bialy, uklady[i]);
  k.position.z = kd / 2; // oś obrotu na przedniej dolnej krawędzi
  const pochyl = new THREE.Group();
  pochyl.rotation.x = -pochylenia[i];
  pochyl.add(k);
  const obrot = new THREE.Group();
  obrot.position.set(p.x, 0, p.z);
  obrot.rotation.y = kier + Math.PI; // ściana z oczkami do tyłu, czyli do kamery
  obrot.add(pochyl);
  scene.add(obrot);
}

render({ ostrosc: [punkty[5].x, 0.9, punkty[5].z], przeslona: 0.0022, rozmycie: 0.01 });
