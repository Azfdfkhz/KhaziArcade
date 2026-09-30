'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FOV = 45;
const TAN_HALF_FOV = Math.tan(THREE.MathUtils.degToRad(FOV / 2));

// Posisi layar di world space (model dipindah y -1.1 dan diputar 180°)
const SCREEN_Z = 0.45;

export default function ArcadeCamera({ zoomedIn = false }) {
  const { camera, size } = useThree();

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetPosition = useRef(new THREE.Vector3(0, 0.25, 3.7));

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);

    if (zoomedIn) {
      // Layar (0.51 x 0.46 unit) mengisi ±65% tinggi / ±90% lebar viewport
      // supaya teks di layar besar dan terbaca jelas.
      const halfH = Math.max(0.23 / 0.65, 0.255 / 0.9 / aspect);
      const dist = halfH / TAN_HALF_FOV;
      targetLookAt.current.set(0, 0.38, SCREEN_Z);
      targetPosition.current.set(0, 0.38, SCREEN_Z + dist);
    } else {
      // Seluruh arcade (lantai -1.1 sampai marquee ±1.25) terlihat utuh
      // tapi dibuat lebih dekat agar layar tidak terlalu kecil
      const halfH = Math.max(1.3, 0.6 / aspect);
      const dist = halfH / TAN_HALF_FOV;
      targetLookAt.current.set(0, 0.05, 0);
      targetPosition.current.set(0, 0.25, dist);
    }
  }, [zoomedIn, size.width, size.height]);

  useFrame((_, delta) => {
    if (!camera) return;
    // Gerakan kamera halus & sinematik
    const factor = 1 - Math.exp(-3.5 * delta);
    camera.position.lerp(targetPosition.current, factor);
    currentLookAt.current.lerp(targetLookAt.current, factor);
    camera.lookAt(currentLookAt.current);
  });

  return (
    <PerspectiveCamera
      makeDefault
      position={[0, 0.6, 5]}
      fov={FOV}
      near={0.1}
      far={100}
    />
  );
}
