'use client';

export default function RoomEnvironment() {
  return (
    <group>
      {/* Floor plane */}
      <mesh receiveShadow position={[0, -1.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#F8F6EF" roughness={0.9} />
      </mesh>

      {/* Back wall plane */}
      <mesh position={[0, 4, -4]}>
        <planeGeometry args={[40, 20]} />
        <meshStandardMaterial color="#F8F6EF" roughness={0.95} />
      </mesh>

      {/* Right Crates (from Frame 1 of design sheet) */}
      <group position={[1.45, -1.1, -0.1]}>
        {/* Yellow bottom crate */}
        <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
          <boxGeometry args={[0.55, 0.32, 0.45]} />
          <meshStandardMaterial color="#F4C96B" roughness={0.35} />
        </mesh>

        {/* Coral/Peach top crate (slightly offset) */}
        <mesh castShadow receiveShadow position={[0.08, 0.42, 0.04]}>
          <boxGeometry args={[0.42, 0.22, 0.36]} />
          <meshStandardMaterial color="#F29A8D" roughness={0.35} />
        </mesh>
      </group>

      {/* Left Potted Plant (from Frame 1 of design sheet) */}
      <group position={[-1.45, -1.1, -0.15]}>
        {/* White Ceramic Pot */}
        <mesh castShadow receiveShadow position={[0, 0.16, 0]}>
          <cylinderGeometry args={[0.16, 0.12, 0.32, 24]} />
          <meshStandardMaterial color="#FFF3D6" roughness={0.2} />
        </mesh>

        {/* Plant Soil */}
        <mesh position={[0, 0.31, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.03, 16]} />
          <meshStandardMaterial color="#3E2723" roughness={0.9} />
        </mesh>

        {/* Plant Leaves / Foliage */}
        <group position={[0, 0.45, 0]}>
          <mesh castShadow position={[0, 0.05, 0]}>
            <sphereGeometry args={[0.18, 16, 16]} />
            <meshStandardMaterial color="#237F85" roughness={0.5} />
          </mesh>
          <mesh castShadow position={[0.08, 0.18, 0.04]}>
            <sphereGeometry args={[0.14, 16, 16]} />
            <meshStandardMaterial color="#63C8CC" roughness={0.5} />
          </mesh>
          <mesh castShadow position={[-0.08, 0.14, -0.04]}>
            <sphereGeometry args={[0.13, 16, 16]} />
            <meshStandardMaterial color="#237F85" roughness={0.5} />
          </mesh>
        </group>
      </group>
    </group>
  );
}
