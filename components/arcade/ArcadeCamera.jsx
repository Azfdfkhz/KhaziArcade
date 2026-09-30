'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

const FOV = 45;
const TAN_HALF_FOV = Math.tan(THREE.MathUtils.degToRad(FOV / 2));
const SCREEN_Z = 0.45;

const INTRO_DURATION = 5.05;
const INTRO_START_ANGLE = -Math.PI * 1.28;
const INTRO_END_ANGLE = -0.035;

function smoothDamp(t) {
  return THREE.MathUtils.smootherstep(t, 0, 1);
}

function cinematicSine(t) {
  return Math.sin(t * Math.PI);
}

export default function ArcadeCamera({ zoomedIn = false, intro = false }) {
  const { camera, size } = useThree();

  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const targetPosition = useRef(new THREE.Vector3(0, 0.25, 3.7));

  const introStartedAt = useRef(null);
  const lastIntro = useRef(false);
  const introPosition = useRef(new THREE.Vector3());
  const introLookAt = useRef(new THREE.Vector3());

  useEffect(() => {
    if (intro && !lastIntro.current) {
      introStartedAt.current = null;
      // Start slightly farther out so the reveal feels like it opens onto a real space.
      camera.position.set(0, 0.48, 6.1);
      currentLookAt.current.set(0, 0.2, 0);
      camera.lookAt(currentLookAt.current);
    }
    lastIntro.current = intro;
  }, [intro, camera]);

  useEffect(() => {
    const aspect = size.width / Math.max(size.height, 1);

    if (zoomedIn) {
      const halfH = Math.max(0.23 / 0.65, 0.255 / 0.9 / aspect);
      const dist = halfH / TAN_HALF_FOV;
      targetLookAt.current.set(0, 0.38, SCREEN_Z);
      targetPosition.current.set(0, 0.38, SCREEN_Z + dist);
    } else {
      const halfH = Math.max(1.3, 0.6 / aspect);
      const dist = halfH / TAN_HALF_FOV;
      targetLookAt.current.set(0, 0.05, 0);
      targetPosition.current.set(0, 0.25, dist);
    }
  }, [zoomedIn, size.width, size.height]);

  useFrame((state, delta) => {
    if (!camera) return;

    if (intro) {
      if (introStartedAt.current === null) {
        introStartedAt.current = state.clock.elapsedTime;
      }

      const elapsed = state.clock.elapsedTime - introStartedAt.current;
      const progress = THREE.MathUtils.clamp(elapsed / INTRO_DURATION, 0, 1);
      const eased = smoothDamp(progress);

      // A broad, continuous orbit with a tiny push-in. Avoid abrupt direction changes.
      const angle = THREE.MathUtils.lerp(INTRO_START_ANGLE, INTRO_END_ANGLE, eased);
      const orbitWave = cinematicSine(progress);
      const radius = THREE.MathUtils.lerp(6.0, 4.65, eased) + orbitWave * 0.18;
      const height = THREE.MathUtils.lerp(0.52, 0.38, eased) + orbitWave * 0.10;

      introPosition.current.set(
        Math.sin(angle) * radius,
        height,
        Math.cos(angle) * radius
      );

      // The look target moves very subtly, giving the camera a natural cinematic parallax.
      introLookAt.current.set(
        Math.sin(progress * Math.PI * 0.9) * 0.08,
        0.18 + orbitWave * 0.035,
        0.02
      );

      const follow = 1 - Math.exp(-5.2 * delta);
      camera.position.lerp(introPosition.current, follow);
      currentLookAt.current.lerp(introLookAt.current, follow);
      camera.lookAt(currentLookAt.current);
      return;
    }

    const factor = 1 - Math.exp(-4.2 * delta);
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
