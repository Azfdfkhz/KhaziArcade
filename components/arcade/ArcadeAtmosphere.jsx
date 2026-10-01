'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export const LIGHT_SKY = '#D9EAE6';
export const DARK_SKY = '#04070b';

const LIGHT_ENV = 0.35;
const DARK_ENV = 0.04;

const skyLight = new THREE.Color(LIGHT_SKY);
const skyDark = new THREE.Color(DARK_SKY);

/**
 * Pengendali tema untuk seluruh scene 3D.
 * - Menghaluskan transisi terang -> gelap menjadi nilai 0..1 yang disimpan di
 *   scene.userData.darkT (dibaca oleh lampu, glow, dan material model).
 * - Mengatur warna langit, kabut, dan intensitas environment map.
 */
export default function ArcadeAtmosphere({ dark = false }) {
  const bgRef = useRef();
  const fogRef = useRef();

  useFrame((state, delta) => {
    const scene = state.scene;
    const current = scene.userData.darkT ?? 0;
    const t = THREE.MathUtils.damp(current, dark ? 1 : 0, 3.2, delta);
    scene.userData.darkT = Math.abs(t - (dark ? 1 : 0)) < 0.001 ? (dark ? 1 : 0) : t;
    const k = scene.userData.darkT;

    if (bgRef.current) bgRef.current.lerpColors(skyLight, skyDark, k);
    if (fogRef.current) {
      fogRef.current.color.lerpColors(skyLight, skyDark, k);
      fogRef.current.near = THREE.MathUtils.lerp(16, 7, k);
      fogRef.current.far = THREE.MathUtils.lerp(42, 28, k);
    }
    scene.environmentIntensity = THREE.MathUtils.lerp(LIGHT_ENV, DARK_ENV, k);
  });

  return (
    <>
      <color ref={bgRef} attach="background" args={[LIGHT_SKY]} />
      <fog ref={fogRef} attach="fog" args={[LIGHT_SKY, 16, 42]} />
    </>
  );
}
