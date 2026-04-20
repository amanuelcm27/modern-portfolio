"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

function pseudoRandom(seed: number) {
  const x = Math.sin(seed * 917.13) * 43758.5453;
  return x - Math.floor(x);
}

function NeuralPoints() {
  const ref = useRef<THREE.Points>(null);

  const sphere = useMemo(() => {
    const count = 2600;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count; i += 1) {
      const i3 = i * 3;
      const radius = 2.8 + pseudoRandom(i + 1) * 2.2;
      const theta = pseudoRandom(i + 2) * Math.PI * 2;
      const phi = Math.acos(2 * pseudoRandom(i + 3) - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.8;
      positions[i3 + 2] = radius * Math.cos(phi);
    }

    return positions;
  }, []);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.07;
    ref.current.rotation.x += delta * 0.03;
  });

  return (
    <Points ref={ref} positions={sphere} stride={3} frustumCulled>
      <PointMaterial transparent color="#ffad6c" size={0.036} sizeAttenuation depthWrite={false} />
    </Points>
  );
}

function PulseRing() {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!ref.current) return;
    const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.08;
    ref.current.scale.setScalar(scale);
    ref.current.rotation.z = state.clock.elapsedTime * 0.12;
  });

  return (
    <mesh ref={ref} rotation-x={Math.PI / 2.1}>
      <torusGeometry args={[2.2, 0.02, 20, 120]} />
      <meshStandardMaterial color="#7ad2ff" emissive="#7ad2ff" emissiveIntensity={0.45} transparent opacity={0.55} />
    </mesh>
  );
}

export default function HeroNeuralScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 50 }} dpr={[1, 1.5]}>
      <ambientLight intensity={0.45} />
      <pointLight position={[4, 4, 2]} intensity={1.8} color="#ff8c2f" />
      <pointLight position={[-3, -2, -3]} intensity={1.3} color="#4ecbff" />
      <NeuralPoints />
      <PulseRing />
    </Canvas>
  );
}
