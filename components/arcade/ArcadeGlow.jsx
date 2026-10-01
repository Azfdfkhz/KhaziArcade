'use client';

import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Posisi dalam ruang scene: mesin berada di (0, -1.1, 0), menghadap +Z.
const FLOOR_GLOW_Y = -0.97; // permukaan trotoar

function makeGlowTexture() {
  const size = 512;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.25, 'rgba(255,255,255,0.55)');
  g.addColorStop(0.6, 'rgba(255,255,255,0.15)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

// Halo berlapis pengganti bloom (tanpa library postprocessing tambahan).
const SPRITES = [
  // aura besar di belakang kabinet
  { pos: [0, 0.1, -0.2], scale: [1.4, 1.4], color: '#3FD0D6', opacity: 0.5 },
  // aura peach di sisi bawah
  { pos: [0.1, -0.4, -0.3], scale: [0.2, 0.2], color: '#F29A8D', opacity: 0.32 },
  // marquee
  { pos: [0, 0.03, 0.5], scale: [0.2, 0.1], color: '#FFE2A8', opacity: 0.55 },
  // layar
  { pos: [0, 0.2, 0.5], scale: [1.2, 1.1], color: '#63C8CC', opacity: 0.28 },
];

export default function ArcadeGlow() {
  const texture = useMemo(() => makeGlowTexture(), []);
  const groupRef = useRef();
  const matRefs = useRef([]);
  const floorRef = useRef();

  useFrame((state) => {
    const k = state.scene.userData.darkT ?? 0;
    if (groupRef.current) groupRef.current.visible = k > 0.01;
    SPRITES.forEach((s, i) => {
      const m = matRefs.current[i];
      if (m) m.opacity = s.opacity * k;
    });
    if (floorRef.current) floorRef.current.opacity = 0.6 * k;
  });

  return (
    <group ref={groupRef} visible={false}>
      {SPRITES.map((s, i) => (
        <sprite key={i} position={s.pos} scale={[s.scale[0], s.scale[1], 1]} renderOrder={5}>
          <spriteMaterial
            ref={(el) => (matRefs.current[i] = el)}
            map={texture}
            color={s.color}
            transparent
            opacity={0}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            fog={false}
            toneMapped={false}
          />
        </sprite>
      ))}

      {/* Genangan cahaya di trotoar tepat di bawah mesin */}
      <mesh position={[0, FLOOR_GLOW_Y, 0.4]} rotation={[-Math.PI / 2, 0, 0]} renderOrder={4}>
        <planeGeometry args={[4.2, 3.6]} />
        <meshBasicMaterial
          ref={floorRef}
          map={texture}
          color="#63C8CC"
          transparent
          opacity={0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          polygonOffset
          polygonOffsetFactor={-2}
          fog={false}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}
