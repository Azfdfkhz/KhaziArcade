'use client';

import { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export default function ArcadeModel({
  zoomedIn = false,
  joystickDir = 'idle',
  isButtonPressed = false,
  screenRef,
  onPartPress,
}) {
  const groupRef = useRef();
  const { scene } = useGLTF('/models/arcade.glb');

  // Clone scene so multiple instances don't clash
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const joystickShaft = useRef(null);
  const buttons = useRef([]);
  const initialJoystickRot = useRef(null);
  const initialButtonPos = useRef([]);

  useEffect(() => {
    if (!clonedScene) return;

    // Enhance materials for modern retro pastel aesthetic
    clonedScene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;

        if (child.material) {
          child.material.roughness = Math.min(child.material.roughness, 0.55);
        }

        // Screen glass — deep teal CRT phosphor surface
        if (child.name.includes('Screen_Glass') || child.name.includes('Screen_Inner_Glow')) {
          if (child.material) {
            child.material.color = new THREE.Color('#15484c');
            child.material.emissive = new THREE.Color('#1a5c61');
            child.material.emissiveIntensity = 0.35;
            child.material.roughness = 0.2;
          }
        }

        // Marquee light glow
        if (
          child.name.includes('Marquee_Face') ||
          child.name.includes('Marquee_Logo') ||
          child.name.includes('Marquee_Khaz')
        ) {
          if (child.material) {
            child.material.emissive = new THREE.Color('#FFF3D6');
            child.material.emissiveIntensity = 0.4;
          }
        }

        // Presentation ground / pedestal
        if (child.name.includes('Presentation_Ground')) {
          if (child.material) {
            child.material.color = new THREE.Color('#E8E4D8');
            child.material.roughness = 0.8;
          }
        }
      }
    });

    // Mesh layar: dipakai ScreenTracker untuk menempelkan UI tepat di layar
    if (screenRef) {
      screenRef.current = clonedScene.getObjectByName('Screen_Inner_Glow');
    }

    // Locate interactive joystick (in updated GLB, shaft + ball is node Joystick_Right_Shaft)
    joystickShaft.current = clonedScene.getObjectByName('Joystick_Right_Shaft');
    if (joystickShaft.current && !initialJoystickRot.current) {
      initialJoystickRot.current = {
        x: joystickShaft.current.rotation.x,
        z: joystickShaft.current.rotation.z,
      };
    }

    // Locate buttons
    const btnNames = [
      'Button_01',
      'Button_02',
      'Button_03',
      'Button_04',
      'Button_05',
      'Button_06',
    ];
    buttons.current = btnNames
      .map((name) => clonedScene.getObjectByName(name))
      .filter(Boolean);

    initialButtonPos.current = buttons.current.map((btn) => btn.position.clone());
  }, [clonedScene, screenRef]);

  // Animation frame
  useFrame((state) => {
    if (!groupRef.current) return;

    const t = state.clock.elapsedTime;

    // Subtle idle floating / breathing animation in wide room view
    const idleY = zoomedIn ? 0 : Math.sin(t * 0.8) * 0.012;
    groupRef.current.position.y = -1.1 + idleY;

    // Base rotation: Math.PI brings front to facing camera (+Z)
    // Reduce rotation when zoomed in so reading is straight and aligned
    const rotAmplitude = zoomedIn ? 0.003 : 0.02;
    const idleRotY = Math.PI + Math.sin(t * 0.5) * rotAmplitude;
    groupRef.current.rotation.y = idleRotY;

    // Interactive Joystick tilt around socket
    if (joystickShaft.current && initialJoystickRot.current) {
      const baseRot = initialJoystickRot.current;
      let targetRotX = baseRot.x;
      let targetRotZ = baseRot.z;

      // Notice: Model front faces -Z locally, so Up tilts -X, Down tilts +X, Left tilts +Z, Right tilts -Z
      if (joystickDir === 'up') targetRotX = baseRot.x - 0.28;
      else if (joystickDir === 'down') targetRotX = baseRot.x + 0.28;
      else if (joystickDir === 'left') targetRotZ = baseRot.z + 0.28;
      else if (joystickDir === 'right') targetRotZ = baseRot.z - 0.28;

      joystickShaft.current.rotation.x = THREE.MathUtils.lerp(
        joystickShaft.current.rotation.x,
        targetRotX,
        0.25
      );
      joystickShaft.current.rotation.z = THREE.MathUtils.lerp(
        joystickShaft.current.rotation.z,
        targetRotZ,
        0.25
      );
    }

    // Interactive Button press
    if (buttons.current.length > 0 && initialButtonPos.current.length > 0) {
      buttons.current.forEach((btn, idx) => {
        const base = initialButtonPos.current[idx];
        if (!base) return;
        const targetY = isButtonPressed ? base.y - 0.012 : base.y;
        btn.position.y = THREE.MathUtils.lerp(btn.position.y, targetY, 0.35);
      });
    }
  });

  // Tombol fisik di model 3D bisa diklik / disentuh
  const isPressable = (name = '') =>
    name.startsWith('Button_') ||
    name.startsWith('Small_Button') ||
    name.startsWith('Coin_Button');

  return (
    <group
      ref={groupRef}
      position={[0, -1.1, 0]}
      onClick={(e) => {
        if (isPressable(e.object.name)) {
          e.stopPropagation();
          onPartPress?.(e.object.name);
        }
      }}
      onPointerOver={(e) => {
        if (isPressable(e.object.name)) document.body.style.cursor = 'pointer';
      }}
      onPointerOut={() => {
        document.body.style.cursor = 'auto';
      }}
    >
      <primitive object={clonedScene} />
    </group>
  );
}

useGLTF.preload('/models/arcade.glb');
