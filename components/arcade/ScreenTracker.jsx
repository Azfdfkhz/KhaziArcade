'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { SCREEN_LOGICAL_W, SCREEN_LOGICAL_H } from '@/utils/screen';

/**
 * Menempelkan overlay HTML (UI layar) tepat di atas mesh layar arcade.
 * Setiap frame: proyeksikan sudut mesh layar ke koordinat piksel canvas,
 * lalu atur translate + scale elemen overlay. Ikut bergerak saat kamera zoom.
 */
export default function ScreenTracker({ screenRef, overlayRef }) {
  const bounds = useRef(null);
  const a = useRef(new THREE.Vector3());
  const b = useRef(new THREE.Vector3());

  useFrame(({ camera, size }) => {
    const mesh = screenRef?.current;
    const el = overlayRef?.current;
    if (!mesh || !mesh.geometry || !el) return;

    if (!bounds.current) {
      mesh.geometry.computeBoundingBox();
      bounds.current = mesh.geometry.boundingBox.clone();
    }
    const box = bounds.current;

    camera.updateMatrixWorld();
    mesh.updateWorldMatrix(true, false);

    // Sisi depan layar = -Z lokal (model menghadap -Z)
    a.current.set(box.min.x, box.max.y, box.min.z).applyMatrix4(mesh.matrixWorld).project(camera);
    b.current.set(box.max.x, box.min.y, box.min.z).applyMatrix4(mesh.matrixWorld).project(camera);

    const toPx = (v) => ({
      x: ((v.x + 1) / 2) * size.width,
      y: ((1 - v.y) / 2) * size.height,
    });
    const p1 = toPx(a.current);
    const p2 = toPx(b.current);

    const x = Math.min(p1.x, p2.x);
    const y = Math.min(p1.y, p2.y);
    const w = Math.abs(p2.x - p1.x);
    const h = Math.abs(p2.y - p1.y);
    if (w < 2 || h < 2) return;

    el.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0) scale(${(w / SCREEN_LOGICAL_W).toFixed(4)}, ${(h / SCREEN_LOGICAL_H).toFixed(4)})`;
    if (el.style.opacity !== '1') el.style.opacity = '1';
  });

  return null;
}
