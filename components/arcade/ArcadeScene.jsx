'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import ArcadeModel from './ArcadeModel';
import ArcadeLights from './ArcadeLights';
import ArcadeCamera from './ArcadeCamera';
import RoomEnvironment from './RoomEnvironment';
import ScreenTracker from './ScreenTracker';

export default function ArcadeScene({
  zoomedIn = false,
  intro = false,
  joystickDir = 'idle',
  isButtonPressed = false,
  screenRef,
  screenOverlayRef,
  introScreenVisible = false,
  onPartPress,
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ArcadeCamera zoomedIn={zoomedIn} intro={intro} />
        <ArcadeLights />

        <Suspense fallback={null}>
          <RoomEnvironment />

          <ArcadeModel
            zoomedIn={zoomedIn}
            joystickDir={joystickDir}
            isButtonPressed={isButtonPressed}
            screenRef={screenRef}
            onPartPress={onPartPress}
          />

          <ContactShadows
            position={[0, -1.1, 0]}
            opacity={0.5}
            scale={10}
            blur={2.4}
            far={3.5}
            color="#237F85"
          />

          <Environment preset="city" environmentIntensity={0.35} />
        </Suspense>

        {/* Setelah kamera diupdate di frame yang sama */}
        <ScreenTracker
          screenRef={screenRef}
          overlayRef={screenOverlayRef}
          visible={!intro || introScreenVisible}
        />
      </Canvas>
    </div>
  );
}
