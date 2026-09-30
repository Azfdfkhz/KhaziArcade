'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

export default function ArcadeCamera({ zoomedIn = false }) {
  const cameraRef = useRef();
  const { camera, size } = useThree();

  const currentLookAt = useRef(new THREE.Vector3(0, 1.1, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 1.1, 0));
  const targetPosition = useRef(new THREE.Vector3(0, 1.15, 3.5));

  const isMobile = size.width < 768;

  useEffect(() => {
    if (zoomedIn) {
      // Close-up cabinet framing: Marquee top, CRT center, control deck bottom
      const zPos = isMobile ? 2.4 : 1.62;
      const yPos = isMobile ? 0.52 : 0.52;
      targetPosition.current.set(0, yPos, zPos);
      targetLookAt.current.set(0, 0.52, 0.44);
    } else {
      // Full room view: Center the arcade machine with room decor
      const zPos = isMobile ? 5.2 : 3.5;
      const yPos = isMobile ? 1.05 : 1.15;
      targetPosition.current.set(0, yPos, zPos);
      targetLookAt.current.set(0, 1.1, 0);
    }
  }, [zoomedIn, isMobile]);

  useFrame((_, delta) => {
    if (!camera) return;

    // Smooth cinematic spring-like camera glide
    const factor = 1 - Math.exp(-3.5 * delta);
    camera.position.lerp(targetPosition.current, factor);
    currentLookAt.current.lerp(targetLookAt.current, factor);
    camera.lookAt(currentLookAt.current);
  });

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[0, 2.15, isMobile ? 5.2 : 3.5]}
      fov={45}
      near={0.1}
      far={100}
    />
  );
}
