import * as THREE from 'three';
import { LineSegments2 } from 'three/addons/lines/LineSegments2.js';
import { LineSegmentsGeometry } from 'three/addons/lines/LineSegmentsGeometry.js';
import { LineMaterial } from 'three/addons/lines/LineMaterial.js';

/**
 * Outline bergaya "line art / grease pencil" untuk mesin arcade dan kota.
 *
 * Grease Pencil tidak bisa diekspor ke GLB, jadi garisnya dibuat di sisi web:
 * tepi tajam (crease) tiap mesh diambil dengan EdgesGeometry lalu digambar
 * sebagai garis tebal (LineSegments2). Garis mengikuti kamera orbit dari
 * sudut mana pun dan tidak menambah ukuran GLB.
 *
 * - Kota (statis): semua tepi digabung jadi SATU draw call.
 * - Mesin arcade: bagian statis digabung jadi satu, bagian yang bergerak
 *   (tombol, joystick) punya garis sendiri sebagai child mesh-nya.
 */

export const OUTLINE_CONFIG = {
  colorLight: '#12373a', // tinta gelap kehijauan di mode terang
  colorDark: '#020406', // hampir hitam di mode malam

  arcade: { width: 4.6, angle: 28, minLength: 0.004 }, // width dalam px
  city: { width: 3.1, angle: 32, minLength: 0.06 },

  // Mesh yang tidak diberi garis (terlalu ramai / tidak perlu)
  skipArcade: /Speaker_Hole|Screw|Bolt|Cable|Screen_Glass|Screen_Inner_Glow/i,
  skipCity: /leaf|Text_|rubber|ground_asphalt/i,

  // Bagian arcade yang bergerak -> garis dipasang langsung di mesh-nya
  moving: /^(Button_|Small_Button|Coin_Button|Joystick_Right_Shaft)/,
};

const colorLight = new THREE.Color(OUTLINE_CONFIG.colorLight);
const colorDark = new THREE.Color(OUTLINE_CONFIG.colorDark);

// Hasil EdgesGeometry di-cache per geometry (geometry dibagi antar clone scene)
const edgeCache = new WeakMap();

function localEdges(geometry, angle, minLength) {
  const hit = edgeCache.get(geometry);
  if (hit) return hit;

  const eg = new THREE.EdgesGeometry(geometry, angle);
  const src = eg.getAttribute('position').array;
  const minSq = minLength * minLength;
  const out = [];
  for (let i = 0; i < src.length; i += 6) {
    const dx = src[i + 3] - src[i];
    const dy = src[i + 4] - src[i + 1];
    const dz = src[i + 5] - src[i + 2];
    if (dx * dx + dy * dy + dz * dz < minSq) continue;
    for (let k = 0; k < 6; k++) out.push(src[i + k]);
  }
  eg.dispose();

  const arr = new Float32Array(out);
  edgeCache.set(geometry, arr);
  return arr;
}

function makeMaterial(width) {
  return new LineMaterial({
    color: OUTLINE_CONFIG.colorLight,
    linewidth: width,
    worldUnits: false,
    fog: true, // ikut tertutup kabut seperti permukaan di sekitarnya
    // Tarik garis sedikit ke depan agar tidak z-fight dengan permukaan
    polygonOffset: true,
    polygonOffsetFactor: -1,
    polygonOffsetUnits: -4,
  });
}

function makeLines(positions, material, name) {
  const geo = new LineSegmentsGeometry();
  geo.setPositions(positions);
  const lines = new LineSegments2(geo, material);
  lines.name = name;
  lines.userData.isOutline = true;
  // LineSegments2 turunan Mesh: matikan raycast supaya klik tombol / hover
  // di ArcadeModel tidak terhalang garis.
  lines.raycast = () => {};
  return lines;
}

// Gabungkan tepi beberapa mesh ke satu array, dalam ruang lokal `root`
function mergeInto(root, meshes, opts) {
  root.updateWorldMatrix(true, false);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const rel = new THREE.Matrix4();
  const v = new THREE.Vector3();
  const chunks = [];
  let total = 0;

  for (const mesh of meshes) {
    const edges = localEdges(mesh.geometry, opts.angle, opts.minLength);
    if (!edges.length) continue;
    mesh.updateWorldMatrix(true, false);
    rel.multiplyMatrices(inv, mesh.matrixWorld);
    const out = new Float32Array(edges.length);
    for (let i = 0; i < edges.length; i += 3) {
      v.set(edges[i], edges[i + 1], edges[i + 2]).applyMatrix4(rel);
      out[i] = v.x;
      out[i + 1] = v.y;
      out[i + 2] = v.z;
    }
    chunks.push(out);
    total += out.length;
  }

  const merged = new Float32Array(total);
  let o = 0;
  for (const c of chunks) {
    merged.set(c, o);
    o += c.length;
  }
  return merged;
}

/**
 * Pasang outline ke scene hasil clone GLB.
 * @returns {{ update: (size, darkT) => void, dispose: () => void }}
 */
export function buildOutlines(scene, { machineName = 'ARCADE_MACHINE', cityName = 'JP4_ROOT' } = {}) {
  const cfg = OUTLINE_CONFIG;
  const added = [];
  const materials = [];

  const machine = scene.getObjectByName(machineName);
  const city = scene.getObjectByName(cityName);

  // ===== Mesin arcade =====
  if (machine) {
    const arcadeMat = makeMaterial(cfg.arcade.width);
    materials.push(arcadeMat);

    const staticMeshes = [];
    const movingMeshes = [];
    machine.traverse((o) => {
      if (!o.isMesh || o.userData.isOutline) return;
      if (cfg.skipArcade.test(o.name)) return;
      (cfg.moving.test(o.name) ? movingMeshes : staticMeshes).push(o);
    });

    const staticPos = mergeInto(machine, staticMeshes, cfg.arcade);
    if (staticPos.length) {
      const lines = makeLines(staticPos, arcadeMat, 'OUTLINE_ARCADE');
      machine.add(lines);
      added.push(lines);
    }

    for (const mesh of movingMeshes) {
      const pos = localEdges(mesh.geometry, cfg.arcade.angle, cfg.arcade.minLength);
      if (!pos.length) continue;
      const lines = makeLines(pos, arcadeMat, `OUTLINE_${mesh.name}`);
      mesh.add(lines);
      added.push(lines);
    }
  }

  // ===== Kota (statis, satu draw call) =====
  if (city) {
    const cityMat = makeMaterial(cfg.city.width);
    materials.push(cityMat);

    const meshes = [];
    city.traverse((o) => {
      if (!o.isMesh || o.userData.isOutline) return;
      if (cfg.skipCity.test(o.name)) return;
      meshes.push(o);
    });

    const pos = mergeInto(city, meshes, cfg.city);
    if (pos.length) {
      const lines = makeLines(pos, cityMat, 'OUTLINE_CITY');
      city.add(lines);
      added.push(lines);
    }
  }

  return {
    // Panggil tiap frame: resolusi layar (px) + warna tinta sesuai tema
    update(size, darkT = 0) {
      for (const m of materials) {
        m.resolution.set(size.width, size.height);
        m.color.lerpColors(colorLight, colorDark, darkT);
      }
    },
    dispose() {
      for (const l of added) {
        l.parent?.remove(l);
        l.geometry.dispose();
      }
      for (const m of materials) m.dispose();
    },
  };
}
