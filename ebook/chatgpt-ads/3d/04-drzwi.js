// Rozdział 04 · Test drzwi: samotne drzwi w studiu, ciepłe światło w środku, przed nimi mały robot.
import { studio, THREE, mat, rbox } from "./studio.js";

const { scene, render } = studio({
  kamera: [-2.6, 2.8, 13.6],
  cel: [0.45, 2.85, 0.4],
  fov: 28,
  kluczPoz: [-8, 9, 5],
});

const bialy = mat.bialy();
const pomarancz = mat.pomarancz();
const czarny = mat.czarny();

// futryna
const dw = 1.9;
const dh = 3.6;
const t = 0.24;
const futryna = new THREE.Group();
const lewa = rbox(t, dh + t, 0.5, 0.04, bialy);
lewa.position.set(-dw / 2 - t / 2, (dh + t) / 2, 0);
const prawa = rbox(t, dh + t, 0.5, 0.04, bialy);
prawa.position.set(dw / 2 + t / 2, (dh + t) / 2, 0);
const gora = rbox(dw + 2 * t, t, 0.5, 0.04, bialy);
gora.position.set(0, dh + t / 2, 0);
futryna.add(lewa, prawa, gora);
scene.add(futryna);

// „wnętrze”: świecąca płaszczyzna tuż za futryną + światło padające na podłogę przed drzwiami
// gradient: jasny środek, ciepłe brzegi – wygląda jak światło, nie jak ściana
const cv = document.createElement("canvas");
cv.width = 256;
cv.height = 512;
const g2 = cv.getContext("2d");
const grad = g2.createRadialGradient(128, 300, 10, 128, 300, 330);
grad.addColorStop(0, "#fffaf0");
grad.addColorStop(0.45, "#ffe2b0");
grad.addColorStop(1, "#f0a64a");
g2.fillStyle = grad;
g2.fillRect(0, 0, 256, 512);
const tekstura = new THREE.CanvasTexture(cv);
tekstura.colorSpace = THREE.SRGBColorSpace;
const blask = new THREE.Mesh(
  new THREE.PlaneGeometry(dw, dh),
  new THREE.MeshBasicMaterial({ map: tekstura }),
);
blask.position.set(0, dh / 2, -0.12);
scene.add(blask);
const swiatlo = new THREE.SpotLight(0xffc27a, 60, 14, 0.7, 0.6, 1.4);
swiatlo.position.set(0, dh * 0.8, -0.4);
swiatlo.target.position.set(0.4, 0, 3.2);
swiatlo.castShadow = true;
swiatlo.shadow.mapSize.set(1024, 1024);
scene.add(swiatlo, swiatlo.target);

// skrzydło drzwi otwarte na zewnątrz, zawias po lewej
const skrzydlo = new THREE.Group();
const plyta = rbox(dw - 0.04, dh - 0.03, 0.09, 0.02, bialy);
plyta.position.set((dw - 0.04) / 2, dh / 2, 0);
skrzydlo.add(plyta);
for (const [y, h] of [
  [dh * 0.7, dh * 0.34],
  [dh * 0.27, dh * 0.34],
]) {
  const panel = rbox(dw * 0.62, h, 0.03, 0.01, bialy);
  panel.position.set((dw - 0.04) / 2, y, -0.055);
  skrzydlo.add(panel);
}
const klamka = rbox(0.28, 0.05, 0.05, 0.02, mat.metal());
klamka.position.set(dw - 0.3, dh * 0.48, -0.1);
skrzydlo.add(klamka);
skrzydlo.position.set(-dw / 2 + 0.02, 0.01, 0.2);
skrzydlo.rotation.y = 1.9;
scene.add(skrzydlo);

// robot
const robot = new THREE.Group();
const tulow = new THREE.Mesh(new THREE.CapsuleGeometry(0.42, 0.55, 12, 48), bialy);
tulow.position.y = 0.98;
robot.add(tulow);
const glowa = rbox(0.9, 0.62, 0.72, 0.22, bialy);
glowa.position.y = 1.98;
robot.add(glowa);
const wizjer = rbox(0.72, 0.36, 0.1, 0.12, czarny);
wizjer.position.set(0, 1.98, 0.34);
robot.add(wizjer);
const okoMat = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  emissive: new THREE.Color("#e8940c"),
  emissiveIntensity: 2.4,
});
for (const x of [-0.16, 0.16]) {
  const oko = new THREE.Mesh(new THREE.CapsuleGeometry(0.045, 0.08, 6, 16), okoMat);
  oko.position.set(x, 1.99, 0.4);
  robot.add(oko);
}
const antena = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.32, 12), czarny);
antena.position.y = 2.45;
robot.add(antena);
const kulka = new THREE.Mesh(new THREE.SphereGeometry(0.08, 32, 24), pomarancz);
kulka.position.y = 2.64;
robot.add(kulka);
for (const s of [-1, 1]) {
  const reka = new THREE.Mesh(new THREE.CapsuleGeometry(0.1, 0.42, 8, 24), bialy);
  reka.position.set(s * 0.56, 1.02, 0);
  reka.rotation.z = s * 0.18;
  robot.add(reka);
  const noga = new THREE.Mesh(new THREE.CapsuleGeometry(0.12, 0.28, 8, 24), czarny);
  noga.position.set(s * 0.2, 0.26, 0);
  robot.add(noga);
}
robot.traverse((o) => o.isMesh && ((o.castShadow = true), (o.receiveShadow = true)));
robot.position.set(1.3, 0, 2.7);
robot.rotation.y = -1.25; // w trzech czwartych do kamery, zerka w stronę drzwi
scene.add(robot);

render({ ostrosc: [1.2, 1.6, 1.6], przeslona: 0.0012, rozmycie: 0.006 });
