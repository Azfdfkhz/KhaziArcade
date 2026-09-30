'use client';

export default function ArcadeLights() {
  return (
    <>
      {/* Ambient */}
      <ambientLight intensity={0.5} color="#F8F6EF" />

      {/* Key Light — warm main light from front-right */}
      <directionalLight
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

      {/* Fill Light — soft turquoise from left */}
      <directionalLight
        position={[-4, 3, 3]}
        intensity={0.6}
        color="#63C8CC"
      />

      {/* Rim Light — soft peach from behind for edge separation */}
      <directionalLight
        position={[0, 4, -4]}
        intensity={0.7}
        color="#F29A8D"
      />

      {/* Screen glow — gentle point light right in front of the screen */}
      <pointLight
        position={[0, 0.45, 0.65]}
        intensity={0.8}
        color="#63C8CC"
        distance={2.5}
        decay={2}
      />

      {/* Marquee glow — gentle point light at top */}
      <pointLight
        position={[0, 1.05, 0.6]}
        intensity={0.4}
        color="#FFF3D6"
        distance={2}
        decay={2}
      />
    </>
  );
}
