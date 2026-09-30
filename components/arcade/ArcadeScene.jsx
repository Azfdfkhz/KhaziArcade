'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import ArcadeModel from './ArcadeModel';
import ArcadeLights from './ArcadeLights';
import ArcadeCamera from './ArcadeCamera';
import RoomEnvironment from './RoomEnvironment';

export default function ArcadeScene({
  zoomedIn = false,
  joystickDir = 'idle',
  isButtonPressed = false,
  started = false,
  activeScreen = 'menu',
  selectedIndex = 0,
  onSelect,
  onNavigate,
  onStart,
  horizontalNavTrigger,
}) {
  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        <ArcadeCamera zoomedIn={zoomedIn} />
        <ArcadeLights />

        <Suspense fallback={null}>
          <RoomEnvironment />

          <ArcadeModel
            zoomedIn={zoomedIn}
            joystickDir={joystickDir}
            isButtonPressed={isButtonPressed}
            started={started}
            activeScreen={activeScreen}
            selectedIndex={selectedIndex}
            onSelect={onSelect}
            onNavigate={onNavigate}
            onStart={onStart}
            horizontalNavTrigger={horizontalNavTrigger}
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
      </Canvas>
    </div>
  );
}
