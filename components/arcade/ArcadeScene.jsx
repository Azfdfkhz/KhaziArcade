'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import ArcadeModel from './ArcadeModel';
import ArcadeLights from './ArcadeLights';
import ArcadeCamera from './ArcadeCamera';
import ScreenTracker from './ScreenTracker';
import ArcadeAtmosphere from './ArcadeAtmosphere';
import ArcadeGlow from './ArcadeGlow';

export default function ArcadeScene({
  dark = false,
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
        {/* Langit, kabut, dan transisi tema terang/gelap */}
        <ArcadeAtmosphere dark={dark} />

        <ArcadeCamera zoomedIn={zoomedIn} intro={intro} />
        <ArcadeLights />

        <Suspense fallback={null}>
          <ArcadeModel
            zoomedIn={zoomedIn}
            joystickDir={joystickDir}
            isButtonPressed={isButtonPressed}
            screenRef={screenRef}
            onPartPress={onPartPress}
          />

          <ArcadeGlow />

          <ContactShadows
            position={[0, -1.1 + 0.09, 0]}
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
