// Wspólne studio scen e-booka „Rabat zjada zysk.”: tło, podłoga, światło, cienie, AO, głębia ostrości
// i poświata. Materiały serii: marmur, biały lakier, turkus, szkło, turkusowe pęknięcia (kintsugi).
// Każda scena importuje studio(), dodaje własne obiekty i wywołuje render().
// Podgląd w niskiej rozdzielczości: scena.html?s=nazwa&szybko=1 (render3d.cjs z SZYBKO=1).
import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";
import { GTAOPass } from "three/addons/postprocessing/GTAOPass.js";
import { BokehPass } from "three/addons/postprocessing/BokehPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/addons/postprocessing/ShaderPass.js";
import { mergeVertices } from "three/addons/utils/BufferGeometryUtils.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { RectAreaLightUniformsLib } from "three/addons/lights/RectAreaLightUniformsLib.js";
// Font jako moduł JSON – fetch nie działa z file://.
import helvetiker from "./node_modules/three/examples/fonts/helvetiker_bold.typeface.json" with { type: "json" };

export { THREE, RoundedBoxGeometry };

// Poświata tylko dla wybranych obiektów (pęknięcia): swieci(obiekt) dodaje go do warstwy blasku.
const WARSTWA_BLASKU = 1;
export function swieci(obiekt) {
  obiekt.traverse((o) => o.layers.enable(WARSTWA_BLASKU));
  return obiekt;
}
export const W = 1080;
export const H = 1350;
const SZYBKO = new URLSearchParams(location.search).has("szybko");

export const kolory = {
  tlo: 0xe9edec,
  podloga: 0xe1e6e4,
  turkus: new THREE.Color("#2ec4b6"),
  turkusCiemny: new THREE.Color("#0f766e"),
};

// Powtarzalny generator liczb losowych – ta sama scena zawsze wygląda tak samo.
export function losowe(ziarno = 1) {
  let s = ziarno >>> 0 || 1;
  return () => (s = (s * 1664525 + 1013904223) >>> 0) / 4294967296;
}

// Szum gradientowy 2D (Perlin) do tekstury marmuru.
function szum2d(ziarno) {
  const rnd = losowe(ziarno);
  const perm = [...Array(256).keys()];
  for (let i = 255; i > 0; i--) {
    const j = Math.floor(rnd() * (i + 1));
    [perm[i], perm[j]] = [perm[j], perm[i]];
  }
  const p = new Uint8Array(512).map((_, i) => perm[i & 255]);
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  const lerp = (a, b, t) => a + (b - a) * t;
  const grad = (h, x, y) => {
    switch (h & 7) {
      case 0:
        return x + y;
      case 1:
        return -x + y;
      case 2:
        return x - y;
      case 3:
        return -x - y;
      case 4:
        return x;
      case 5:
        return -x;
      case 6:
        return y;
      default:
        return -y;
    }
  };
  return (x, y) => {
    const X = Math.floor(x) & 255;
    const Y = Math.floor(y) & 255;
    x -= Math.floor(x);
    y -= Math.floor(y);
    const u = fade(x);
    const v = fade(y);
    const a = p[X] + Y;
    const b = p[X + 1] + Y;
    return lerp(
      lerp(grad(p[a], x, y), grad(p[b], x - 1, y), u),
      lerp(grad(p[a + 1], x, y - 1), grad(p[b + 1], x - 1, y - 1), u),
      v,
    );
  };
}

// Tekstura białego marmuru z szarymi żyłami (kanwa 2D → CanvasTexture).
export function marmurTekstura({ ziarno = 7, rozmiar = 1024, zyly = 1, skala = 2.6 } = {}) {
  const n = szum2d(ziarno);
  const fbm = (x, y, oktawy = 5) => {
    let s = 0;
    let a = 0.5;
    let f = 1;
    for (let o = 0; o < oktawy; o++) {
      s += a * n(x * f, y * f);
      f *= 2;
      a *= 0.5;
    }
    return s;
  };
  const kanwa = document.createElement("canvas");
  kanwa.width = kanwa.height = rozmiar;
  const ctx = kanwa.getContext("2d");
  const img = ctx.createImageData(rozmiar, rozmiar);
  const baza = [243, 244, 241];
  const zyla = [166, 174, 175];
  for (let j = 0; j < rozmiar; j++) {
    for (let i = 0; i < rozmiar; i++) {
      const x = (i / rozmiar) * skala;
      const y = (j / rozmiar) * skala;
      const t = fbm(x, y);
      const glowna = Math.pow(1 - Math.abs(Math.sin((x * 1.2 + y * 0.55) * 2.6 + t * 7)), 11);
      const drobna =
        Math.pow(
          1 - Math.abs(Math.sin((x * 0.5 - y * 1.1) * 4.2 + fbm(x + 5.2, y + 1.3) * 9)),
          34,
        ) * 0.3;
      const mgla = fbm(x * 1.7 + 11, y * 1.7 + 3, 4);
      const k = Math.min(1, (glowna * 0.85 + drobna) * zyly);
      const o = (j * rozmiar + i) * 4;
      for (let c = 0; c < 3; c++) img.data[o + c] = baza[c] * (1 - k) + zyla[c] * k + mgla * 14 - 4;
      img.data[o + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(kanwa);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = tex.wrapT = THREE.MirroredRepeatWrapping;
  tex.anisotropy = 8;
  return tex;
}

export const mat = {
  bialy: () =>
    new THREE.MeshPhysicalMaterial({
      color: 0xfbfcfb,
      roughness: 0.3,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    }),
  turkus: () =>
    new THREE.MeshPhysicalMaterial({
      color: kolory.turkus,
      roughness: 0.22,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
    }),
  czarny: () =>
    new THREE.MeshPhysicalMaterial({
      color: 0x1b1d1d,
      roughness: 0.32,
      clearcoat: 0.6,
      clearcoatRoughness: 0.2,
    }),
  szary: () => new THREE.MeshPhysicalMaterial({ color: 0xb6bcbb, roughness: 0.35, clearcoat: 0.4 }),
  metal: () => new THREE.MeshStandardMaterial({ color: 0xd4d8d8, metalness: 1, roughness: 0.26 }),
  szklo: () =>
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.02,
      transmission: 1,
      thickness: 0.4,
      ior: 1.5,
    }),
  szkloTurkus: () =>
    new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      roughness: 0.04,
      transmission: 1,
      thickness: 0.9,
      ior: 1.5,
      attenuationColor: new THREE.Color("#12a697"),
      attenuationDistance: 0.9,
      clearcoat: 1,
      clearcoatRoughness: 0.03,
    }),
  // Świecąca turkusowa linia – pęknięcia kintsugi, poświata w render({ blask }).
  swiatlo: (moc = 2.4) =>
    new THREE.MeshStandardMaterial({
      color: kolory.turkus,
      emissive: kolory.turkus,
      emissiveIntensity: moc,
      roughness: 0.4,
    }),
  // Marmur: skala tekstury w jednostkach sceny (1 kafel = `kafel` jednostek UV).
  marmur: ({ ziarno = 7, kafel = 1, zyly = 1 } = {}) => {
    const map = marmurTekstura({ ziarno, zyly });
    map.repeat.set(1 / kafel, 1 / kafel);
    map.offset.set(0.5, 0.5);
    return new THREE.MeshPhysicalMaterial({
      map,
      roughness: 0.24,
      clearcoat: 0.55,
      clearcoatRoughness: 0.18,
      sheen: 0.25,
      sheenColor: new THREE.Color(0xffffff),
    });
  },
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

// ---------- Metka z ceną ----------

// Kontur metki: prostokąt ze ściętym lewym końcem i otworem na sznurek. Opcjonalnie ugryzienie
// w prawym górnym rogu: łuk z odciskami zębów. Zwraca kształt i test „czy punkt leży na metce”.
export function ksztaltMetki({
  w = 4.2,
  h = 2.4,
  sciecie = 0.7,
  r = 0.12,
  otwor = 0.17,
  ugryzienie = null,
} = {}) {
  const x0 = -w / 2;
  const x1 = w / 2;
  const y0 = -h / 2;
  const y1 = h / 2;
  const s = new THREE.Shape();
  // Wierzchołki przeciwnie do ruchu wskazówek zegara; r = promień zaokrąglenia rogu.
  const pkt = [
    [x0 + sciecie, y0, r],
    [x1, y0, r],
  ];
  let luk = null;
  if (ugryzienie) {
    const { R = 1, wysuniecie = 0.16, zeby = 5, glebokosc = 0.07 } = ugryzienie;
    const c = new THREE.Vector2(x1 + wysuniecie, y1 + wysuniecie);
    const dy = Math.sqrt(R * R - wysuniecie * wysuniecie);
    pkt.push([x1, c.y - dy, 0]);
    luk = { c, R, zeby, glebokosc, koniec: new THREE.Vector2(c.x - dy, y1) };
    pkt.push([c.x - dy, y1, 0, luk]);
  } else {
    pkt.push([x1, y1, r]);
  }
  pkt.push([x0 + sciecie, y1, r], [x0, y1 - sciecie, r], [x0, y0 + sciecie, r]);

  const v = pkt.map(([x, y]) => new THREE.Vector2(x, y));
  const n = v.length;
  const wejscie = (i) => {
    const [, , ri] = pkt[i];
    if (!ri) return v[i].clone();
    const prev = v[(i - 1 + n) % n];
    return v[i].clone().add(prev.clone().sub(v[i]).setLength(ri));
  };
  const wyjscie = (i) => {
    const [, , ri] = pkt[i];
    if (!ri) return v[i].clone();
    const next = v[(i + 1) % n];
    return v[i].clone().add(next.clone().sub(v[i]).setLength(ri));
  };
  const start = wyjscie(0);
  s.moveTo(start.x, start.y);
  for (let k = 1; k <= n; k++) {
    const i = k % n;
    const [, , ri, lukTu] = pkt[i];
    if (lukTu) {
      // Łuk ugryzienia od poprzedniego wierzchołka (na prawej krawędzi) do tego (na górnej).
      const a0 = Math.atan2(v[(i - 1 + n) % n].y - lukTu.c.y, v[(i - 1 + n) % n].x - lukTu.c.x);
      const a1 = Math.atan2(v[i].y - lukTu.c.y, v[i].x - lukTu.c.x);
      const [a, b] = [a0 < 0 ? a0 + Math.PI * 2 : a0, a1 < 0 ? a1 + Math.PI * 2 : a1];
      for (let z = 0; z < lukTu.zeby; z++) {
        const ta = a + ((b - a) * z) / lukTu.zeby;
        const tb = a + ((b - a) * (z + 1)) / lukTu.zeby;
        const tm = (ta + tb) / 2;
        const kon = new THREE.Vector2(Math.cos(tb), Math.sin(tb))
          .multiplyScalar(lukTu.R)
          .add(lukTu.c);
        const ster = new THREE.Vector2(Math.cos(tm), Math.sin(tm))
          .multiplyScalar(lukTu.R + lukTu.glebokosc * 2)
          .add(lukTu.c);
        s.quadraticCurveTo(ster.x, ster.y, kon.x, kon.y);
      }
      continue;
    }
    const we = wejscie(i);
    s.lineTo(we.x, we.y);
    if (ri) {
      const wy = wyjscie(i);
      s.quadraticCurveTo(v[i].x, v[i].y, wy.x, wy.y);
    }
  }
  const srodekOtworu = new THREE.Vector2(x0 + sciecie * 0.72, 0);
  if (otwor) {
    const o = new THREE.Path();
    o.absarc(srodekOtworu.x, srodekOtworu.y, otwor, 0, Math.PI * 2, true);
    s.holes.push(o);
  }
  const obrys = s.getPoints(24);
  const naMetce = (x, y, margines = 0.06) => {
    // punkt w wielokącie (ray casting) + odstęp od krawędzi i od otworu
    let w_ = false;
    for (let i = 0, j = obrys.length - 1; i < obrys.length; j = i++) {
      const a = obrys[i];
      const b = obrys[j];
      if (a.y > y !== b.y > y && x < ((b.x - a.x) * (y - a.y)) / (b.y - a.y) + a.x) w_ = !w_;
    }
    if (!w_) return false;
    for (let i = 0, j = obrys.length - 1; i < obrys.length; j = i++) {
      const a = obrys[i];
      const b = obrys[j];
      const ab = b.clone().sub(a);
      const t = Math.max(0, Math.min(1, new THREE.Vector2(x, y).sub(a).dot(ab) / ab.lengthSq()));
      if (a.clone().add(ab.multiplyScalar(t)).distanceTo(new THREE.Vector2(x, y)) < margines)
        return false;
    }
    if (otwor && srodekOtworu.distanceTo(new THREE.Vector2(x, y)) < otwor + margines * 2)
      return false;
    return true;
  };
  return { ksztalt: s, naMetce, srodekOtworu, luk };
}

// Bryła metki z konturu (grubość wzdłuż osi Z, przód metki na z = +grubosc / 2).
export function metka({ grubosc = 0.26, faza = 0.05, material, ...kontur } = {}) {
  const k = ksztaltMetki(kontur);
  const geo = new THREE.ExtrudeGeometry(k.ksztalt, {
    depth: grubosc - faza * 2,
    bevelEnabled: true,
    bevelThickness: faza,
    bevelSize: faza,
    bevelSegments: 4,
    curveSegments: 24,
  });
  geo.translate(0, 0, -(grubosc - faza * 2) / 2);
  const m = new THREE.Mesh(geo, material);
  m.castShadow = true;
  m.receiveShadow = true;
  return { mesh: m, przod: grubosc / 2, ...k };
}

// Pęknięcia kintsugi na płaskiej ścianie: losowe łamane od punktu startu, z odgałęzieniami.
// naScianie(x, y) – czy punkt leży na ścianie; zwraca siatkę wstążek o zwężającej się szerokości.
export function pekniecia({
  starty,
  naScianie,
  z = 0,
  ziarno = 3,
  krok = 0.05,
  dlugosc = 2.2,
  szerokosc = 0.045,
  galezie = 0.08,
  material,
}) {
  const rnd = losowe(ziarno);
  const linie = [];
  const idz = (x, y, kat, zostalo, szer) => {
    const linia = [new THREE.Vector2(x, y)];
    let kierunek = kat;
    while (zostalo > 0) {
      // odcinki prawie proste, co kilka kroków ostry zwrot – jak pęknięcie w kamieniu
      kierunek += rnd() < 0.22 ? (rnd() - 0.5) * 1.5 : (rnd() - 0.5) * 0.22;
      // powrót do kierunku głównego – pęknięcie nie zawraca
      kierunek += (kat - kierunek) * 0.18;
      const nx = x + Math.cos(kierunek) * krok * (0.6 + rnd() * 0.8);
      const ny = y + Math.sin(kierunek) * krok * (0.6 + rnd() * 0.8);
      if (!naScianie(nx, ny)) break;
      x = nx;
      y = ny;
      linia.push(new THREE.Vector2(x, y));
      zostalo -= krok;
      if (rnd() < galezie && zostalo > 0.3 && szer > 0.012) {
        idz(
          x,
          y,
          kierunek + (rnd() < 0.5 ? -1 : 1) * (0.5 + rnd() * 0.6),
          zostalo * 0.55,
          szer * 0.6,
        );
      }
    }
    if (linia.length > 2) linie.push({ linia, szer });
  };
  for (const [x, y, kat, dl = dlugosc] of starty) idz(x, y, kat, dl, szerokosc);

  const poz = [];
  const idx = [];
  for (const { linia, szer } of linie) {
    const baza = poz.length / 3;
    linia.forEach((p, i) => {
      const a = linia[Math.max(0, i - 1)];
      const b = linia[Math.min(linia.length - 1, i + 1)];
      const nrm = new THREE.Vector2(-(b.y - a.y), b.x - a.x).normalize();
      const t = i / (linia.length - 1);
      const s = (szer * (1 - t * 0.85) * (0.75 + 0.5 * Math.abs(Math.sin(i * 1.7)))) / 2;
      poz.push(p.x + nrm.x * s, p.y + nrm.y * s, z, p.x - nrm.x * s, p.y - nrm.y * s, z);
      if (i > 0) {
        const q = baza + (i - 1) * 2;
        idx.push(q, q + 1, q + 2, q + 1, q + 3, q + 2);
      }
    });
  }
  const wstazka = (skala, dz) => {
    const p = [];
    for (let i = 0; i < poz.length; i += 6) {
      const [ax, ay, , bx, by] = poz.slice(i, i + 6);
      const [sx, sy] = [(ax + bx) / 2, (ay + by) / 2];
      p.push(sx + (ax - sx) * skala, sy + (ay - sy) * skala, z + dz);
      p.push(sx + (bx - sx) * skala, sy + (by - sy) * skala, z + dz);
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.Float32BufferAttribute(p, 3));
    geo.setIndex(idx);
    geo.computeVertexNormals();
    return geo;
  };
  const grupa = new THREE.Group();
  const zewn = new THREE.Mesh(
    wstazka(1, 0),
    material ?? new THREE.MeshBasicMaterial({ color: kolory.turkus }),
  );
  // jasny rdzeń: pęknięcie „świeci od środka”
  const rdzen = new THREE.Mesh(
    wstazka(0.42, 0.001),
    new THREE.MeshBasicMaterial({ color: new THREE.Color("#9ff3ea") }),
  );
  for (const m of [zewn, rdzen]) {
    m.material.side = THREE.DoubleSide;
    m.renderOrder = 1;
    grupa.add(m);
  }
  return swieci(grupa);
}

// Okruch: nieregularna bryłka (np. odgryziony marmur).
export function okruch(rozmiar, material, ziarno = 1) {
  const rnd = losowe(ziarno);
  let geo = new THREE.IcosahedronGeometry(rozmiar, 1);
  geo.deleteAttribute("uv");
  geo.deleteAttribute("normal");
  geo = mergeVertices(geo, 1e-5);
  const p = geo.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const k = 0.7 + rnd() * 0.55;
    p.setXYZ(i, p.getX(i) * k, p.getY(i) * k * 0.72, p.getZ(i) * k);
  }
  geo.computeVertexNormals();
  const m = new THREE.Mesh(geo, material);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Sznurek (albo nitka) przez punkty krzywej.
export function sznurek(punkty, promien, material) {
  const krzywa = new THREE.CatmullRomCurve3(
    punkty.map((p) => new THREE.Vector3(...p)),
    false,
    "centripetal",
  );
  const m = new THREE.Mesh(new THREE.TubeGeometry(krzywa, 320, promien, 16, false), material);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

// Napis 3D krojem Helvetiker Bold z przykładów three.js (znaki ASCII, bez polskich liter).
const font = new FontLoader().parse(helvetiker);
export function napis(
  tekst,
  { rozmiar = 1, glebokosc = 0.15, faza = 0.02, material, srodek = true } = {},
) {
  const geo = new TextGeometry(tekst, {
    font,
    size: rozmiar,
    depth: glebokosc,
    curveSegments: 10,
    bevelEnabled: faza > 0,
    bevelThickness: faza,
    bevelSize: faza * 0.8,
    bevelSegments: 3,
  });
  if (srodek) geo.center();
  const m = new THREE.Mesh(geo, material);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

export function studio(opcje = {}) {
  const o = {
    tlo: kolory.tlo,
    podloga: kolory.podloga,
    mgla: null, // domyślnie od odległości kamery: obiekt ostry, tło znika we mgle
    otoczenie: 0.36,
    klucz: 2.8,
    kluczPoz: [-7, 9, 6],
    wypelnienie: 0.55,
    fov: 28,
    kamera: [0, 3, 16],
    cel: [0, 2.5, 0],
    ...opcje,
  };
  RectAreaLightUniformsLib.init();
  const S = SZYBKO ? 1 : Math.max(2, window.devicePixelRatio * 1.5);
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
  klucz.shadow.mapSize.set(SZYBKO ? 1024 : 2048, SZYBKO ? 1024 : 2048);
  klucz.shadow.radius = 14;
  klucz.shadow.blurSamples = 24;
  Object.assign(klucz.shadow.camera, { left: -10, right: 10, top: 10, bottom: -10, far: 60 });
  klucz.shadow.bias = -0.0004;
  scene.add(klucz);
  const wyp = new THREE.DirectionalLight(0xffffff, o.wypelnienie);
  wyp.position.set(6, 4, 8);
  scene.add(wyp);

  function render({
    ostrosc = null,
    przeslona = 0.003,
    rozmycie = 0.01,
    ao = 0.8,
    blask = null, // { sila, promien } – poświata obiektów oznaczonych swieci()
  } = {}) {
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
    if (blask) composer.addPass(poswiata(blask));
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

  // Wybiórcza poświata: osobny render tylko obiektów z warstwy blasku (reszta czarna, bez tła i mgły),
  // rozmyty przez UnrealBloomPass i dodany do obrazu. Zwraca przebieg do głównego łańcucha.
  function poswiata({ sila = 1.1, promien = 0.35 }) {
    const bloom = new EffectComposer(renderer);
    bloom.renderToScreen = false;
    bloom.addPass(new RenderPass(scene, camera));
    bloom.addPass(new UnrealBloomPass(new THREE.Vector2(W, H), sila, promien, 0));

    const warstwa = new THREE.Layers();
    warstwa.set(WARSTWA_BLASKU);
    const czern = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const materialy = new Map();
    const [tlo, mgla] = [scene.background, scene.fog];
    scene.background = new THREE.Color(0x000000);
    scene.fog = null;
    scene.traverse((o) => {
      if (o.isMesh && !warstwa.test(o.layers)) {
        materialy.set(o, o.material);
        o.material = czern;
      }
    });
    bloom.render();
    materialy.forEach((m, o) => (o.material = m));
    [scene.background, scene.fog] = [tlo, mgla];

    const miks = new ShaderPass(
      new THREE.ShaderMaterial({
        uniforms: {
          baseTexture: { value: null },
          bloomTexture: { value: bloom.renderTarget2.texture },
        },
        vertexShader:
          "varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader:
          "uniform sampler2D baseTexture; uniform sampler2D bloomTexture; varying vec2 vUv;" +
          "void main() { gl_FragColor = texture2D(baseTexture, vUv) + texture2D(bloomTexture, vUv); }",
      }),
      "baseTexture",
    );
    miks.needsSwap = true;
    return miks;
  }

  return { scene, camera, renderer, klucz, render };
}
