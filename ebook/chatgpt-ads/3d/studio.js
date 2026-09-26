// Wspólne studio dla scen e-booka (kierunek v2): tło, podłoga, światło, cienie, AO i głębia ostrości.
// Każda scena importuje studio(), dodaje własne obiekty i wywołuje render().
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { GTAOPass } from "three/addons/postprocessing/GTAOPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";

export { THREE, RoundedBoxGeometry };
export const W = 1080;
export const H = 1350;

export const kolory = {
  tlo: 0xece9e4,
  podloga: 0xe3dfd8,
  pomarancz: new THREE.Color("#e8940c"),
};

export const mat = {
  bialy: () =>
    new THREE.MeshPhysicalMaterial({
      color: 0xfbfaf8,
      roughness: 0.3,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    }),
  pomarancz: () =>
    new THREE.MeshPhysicalMaterial({
      color: kolory.pomarancz,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    }),
  czarny: () =>
    new THREE.MeshPhysicalMaterial({
      color: 0x1c1c1c,
      roughness: 0.32,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    }),
  szary: () => new THREE.MeshPhysicalMaterial({ color: 0xb9b8b4, roughness: 0.35, clearcoat: 0.4 }),
  metal: () => new THREE.MeshStandardMaterial({ color: 0xcfcfcf, metalness: 1, roughness: 0.28 }),
  szklo: () =>
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.02,
      transmission: 1,
      thickness: 0.4,
      ior: 1.5,
    }),
};

// Bryła obrotowa bez szwu (profil: [promień, wysokość]).
export function lathe(profil, segmenty = 96) {
  let geo = new THREE.LatheGeometry(
    profil.map(([r, y]) => new THREE.Vector2(r, y)),
    segmenty,
  );
  geo.deleteAttribute("uv");
  geo.deleteAttribute("normal");
  geo = mergeVertices(geo, 1e-4);
  geo.computeVertexNormals();
  return geo;
}

export function rbox(w, h, d, r, material) {
  const m = new THREE.Mesh(
    new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2, h / 2, d / 2)),
    material,
  );
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function studio(opcje = {}) {
  const o = {
    tlo: kolory.tlo,
    podloga: kolory.podloga,
    mgla: null, // domyślnie od odległości kamery: obiekt ostry, tło znika we mgle
    otoczenie: 0.34,
    klucz: 2.8,
    kluczPoz: [-7, 9, 6],
    wypelnienie: 0.5,
    fov: 28,
    kamera: [0, 3, 16],
    cel: [0, 2.5, 0],
    ...opcje,
  };
  RectAreaLightUniformsLib.init();
  const S = Math.max(2, window.devicePixelRatio * 1.5);
  const renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
  renderer.setPixelRatio(S);
  renderer.setSize(W, H);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.VSMShadowMap;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(o.tlo);
  const odl = new THREE.Vector3(...o.kamera).distanceTo(new THREE.Vector3(...o.cel));
  const [blisko, daleko] = o.mgla ?? [odl + 3, odl + 22];
  scene.fog = new THREE.Fog(o.tlo, blisko, daleko);
  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environmentIntensity = o.otoczenie;

  const podloga = new THREE.Mesh(
    new THREE.PlaneGeometry(120, 120),
    new THREE.MeshStandardMaterial({ color: o.podloga, roughness: 0.9 }),
  );
  podloga.rotation.x = -Math.PI / 2;
  podloga.receiveShadow = true;
  scene.add(podloga);

  const camera = new THREE.PerspectiveCamera(o.fov, W / H, 0.1, 200);
  camera.position.set(...o.kamera);
  camera.lookAt(...o.cel);

  const klucz = new THREE.DirectionalLight(0xffffff, o.klucz);
  klucz.position.set(...o.kluczPoz);
  klucz.castShadow = true;
  klucz.shadow.mapSize.set(2048, 2048);
  klucz.shadow.radius = 14;
  klucz.shadow.blurSamples = 24;
  Object.assign(klucz.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, far: 60 });
  klucz.shadow.bias = -0.0004;
  scene.add(klucz);
  const wyp = new THREE.DirectionalLight(0xffffff, o.wypelnienie);
  wyp.position.set(6, 4, 8);
  scene.add(wyp);

  function render({ ostrosc = null, przeslona = 0.003, rozmycie = 0.01, ao = 0.8 } = {}) {
    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    if (ao) {
      const gtao = new GTAOPass(scene, camera, W, H);
      gtao.updateGtaoMaterial({
        radius: 0.5,
        distanceExponent: 1.4,
        thickness: 1,
        scale: 1,
        samples: 16,
      });
      gtao.blendIntensity = ao;
      composer.addPass(gtao);
    }
    if (ostrosc) {
      const cel = new THREE.Vector3(...ostrosc);
      composer.addPass(
        new BokehPass(scene, camera, {
          focus: camera.position.distanceTo(cel),
          aperture: przeslona,
          maxblur: rozmycie,
        }),
      );
    }
    composer.addPass(new OutputPass());
    composer.render();
    window.__done = true;
  }

  return { scene, camera, renderer, klucz, render };
}
