'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Nilai [terang, gelap] untuk setiap lampu. Transisi dikendalikan oleh
// scene.userData.darkT (0 = siang pastel, 1 = malam dengan glow neon).
const L = {
  ambient: { i: [0.5, 0.07], c: ['#F8F6EF', '#5f7fb8'] },
  key: { i: [1.4, 0.18], c: ['#FFF3D6', '#8fa8ff'] },
  fill: { i: [0.6, 0.1], c: ['#63C8CC', '#63C8CC'] },
  rim: { i: [0.7, 0.35], c: ['#F29A8D', '#F29A8D'] },
  screen: { i: [0.8, 3.2], c: ['#63C8CC', '#63C8CC'] },
  marquee: { i: [0.4, 2.4], c: ['#FFF3D6', '#FFE2A8'] },
  // Lampu khusus malam (intensitas 0 saat mode terang)
  neonCyan: { i: [0, 5], c: ['#63C8CC', '#63C8CC'] },
  neonPeach: { i: [0, 4], c: ['#F29A8D', '#F29A8D'] },
  wall: { i: [0, 9], c: ['#3FD0D6', '#3FD0D6'] },
};

const tmpA = new THREE.Color();
const tmpB = new THREE.Color();

export default function ArcadeLights() {
  const lights = useRef({});
  const setRef = (name) => (el) => {
    lights.current[name] = el;
  };

  useFrame((state) => {
    const k = state.scene.userData.darkT ?? 0;
    for (const name in L) {
      const light = lights.current[name];
      if (!light) continue;
      const cfg = L[name];
      light.intensity = THREE.MathUtils.lerp(cfg.i[0], cfg.i[1], k);
      tmpA.set(cfg.c[0]);
      tmpB.set(cfg.c[1]);
      light.color.copy(tmpA.lerp(tmpB, k));
      light.visible = light.intensity > 0.001;
    }
  });

  return (
    <>
      <ambientLight ref={setRef('ambient')} intensity={0.5} color="#F8F6EF" />

      {/* Key Light — warm main light (malam: cahaya bulan kebiruan) */}
      <directionalLight
        ref={setRef('key')}
        position={[4, 6, 4]}
        intensity={1.4}
        color="#FFF3D6"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={15}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />

      <directionalLight ref={setRef('fill')} position={[-4, 3, 3]} intensity={0.6} color="#63C8CC" />
      <directionalLight ref={setRef('rim')} position={[0, 4, -4]} intensity={0.7} color="#F29A8D" />

      {/* Screen glow */}
      <pointLight ref={setRef('screen')} position={[0, 0.25, 0.35]} intensity={0.8} color="#63C8CC" distance={1.2} decay={2} />

      {/* Marquee glow */}
      <pointLight ref={setRef('marquee')} position={[0, 0.5, 0.6]} intensity={0.4} color="#FFF3D6" distance={1} decay={2} />

      {/* ===== Lampu neon khusus mode gelap ===== */}
      <pointLight ref={setRef('neonCyan')} position={[-1.0, -0.5, 1.0]} intensity={0} color="#63C8CC" distance={1} decay={2} />
      <pointLight ref={setRef('neonPeach')} position={[1.0, -0.9, 1.0]} intensity={0} color="#F29A8D" distance={2} decay={2} />
      {/* Menyinari dinding gedung di belakang mesin agar ada aura di sekelilingnya */}
      <pointLight ref={setRef('wall')} position={[0, 0.2, -1.0]} intensity={0} color="#3FD0D6" distance={4.5} decay={2} />
    </>
  );
}
