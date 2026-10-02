'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import ArcadeModel from './ArcadeModel';
import ArcadeLights from './ArcadeLights';
import ArcadeCamera from './ArcadeCamera';
import ScreenTracker from './ScreenTracker';
import ArcadeAtmosphere from './ArcadeAtmosphere';
import ArcadeGlow from './ArcadeGlow';
import QualityMonitor from './QualityMonitor';
import { QUALITY_PRESETS, getInitialQuality } from '@/utils/quality';

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
  // Scene ini hanya dirender di client (dynamic ssr:false), jadi aman membaca
  // window/navigator di initializer. Dijalankan sekali.
  const [initial] = useState(getInitialQuality);
  const [tier, setTier] = useState(initial.tier);
  const quality = QUALITY_PRESETS[tier];

  return (
    <div className="w-full h-full">
      <Canvas
        shadows
        dpr={quality.dpr}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        style={{ background: 'transparent' }}
      >
        {/* Menyesuaikan kualitas dengan FPS aktual (nonaktif jika ?quality= dipaksa) */}
        <QualityMonitor tier={tier} onTierChange={setTier} enabled={!initial.forced} />

        {/* Langit, kabut, dan transisi tema terang/gelap */}
        <ArcadeAtmosphere dark={dark} />

        <ArcadeCamera zoomedIn={zoomedIn} intro={intro} />
        <ArcadeLights quality={quality} />

        <Suspense fallback={null}>
          <ArcadeModel
            zoomedIn={zoomedIn}
            joystickDir={joystickDir}
            isButtonPressed={isButtonPressed}
            screenRef={screenRef}
            onPartPress={onPartPress}
            outlineMode={quality.outline}
          />

          <ArcadeGlow />

          {quality.contactShadows && (
            <ContactShadows
              position={[0, -1 + 0.09, 0]}
              opacity={0.5}
              scale={10}
              blur={2.4}
              far={3.5}
              color="#237F85"
            />
          )}

          {quality.environment && <Environment preset="city" environmentIntensity={0.35} />}
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
