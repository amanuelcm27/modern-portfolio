"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Float, Html, Line, OrbitControls, Sphere } from "@react-three/drei";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";

type Node = { label: string; position: [number, number, number]; color: string };

const nodes: Node[] = [
  { label: "Django", position: [0, 0, 0], color: "#ff8f3d" },
  { label: "REST Framework", position: [1.8, 0.9, -0.4], color: "#f9c74f" },
  { label: "NextJS", position: [0.2, 1.8, 0.4], color: "#22c55e" },
  { label: "React Native", position: [-1.5, 1.3, 0.3], color: "#61dafb" },
  { label: "Postgres", position: [-1.7, 0.8, 0.2], color: "#4cc9f0" },
  { label: "TensorFlow", position: [0.9, -1.4, 0.6], color: "#06d6a0" },
  { label: "PyTorch", position: [-1.1, -1.3, -0.7], color: "#f72585" },
  { label: "RAG", position: [2.3, -0.6, 0.2], color: "#a78bfa" },
  { label: "Agents", position: [-2.1, -0.4, -0.2], color: "#fb7185" },
];

const nodeDescriptions: Record<string, string> = {
  Django: "Backend orchestration, domain logic, and service boundaries.",
  "REST Framework": "API delivery for internal systems and external integrations.",
  NextJS: "Modern React framework for fast, production-ready frontend delivery.",
  "React Native": "Cross-platform mobile development with native-like performance.",
  Postgres: "Structured persistence and centralized business data.",
  TensorFlow: "Model training and experimentation for predictive workflows.",
  PyTorch: "Research-friendly deep learning and vision pipelines.",
  RAG: "Retrieval-augmented generation for grounded AI answers.",
  Agents: "Tool-using AI agents that automate discovery and reasoning.",
};

type NetworkProps = {
  hovered: string | null;
  setHovered: (value: string | null) => void;
};

function Network({ hovered, setHovered }: NetworkProps) {
  const lines = useMemo(() => {
    const center = new THREE.Vector3(...nodes[0].position);
    return nodes.slice(1).map((node) => [center, new THREE.Vector3(...node.position)]);
  }, []);

  return (
    <>
      {lines.map((line, idx) => (
        <Line
          key={idx}
          points={line}
          color={hovered ? "#ffb26b" : "#9ccfff"}
          lineWidth={hovered ? 1.8 : 1.2}
          transparent
          opacity={hovered ? 0.9 : 0.55}
        />
      ))}

      {nodes.map((node) => (
        <Float key={node.label} speed={1.8} rotationIntensity={0.25} floatIntensity={0.8}>
          <group
            position={node.position}
            scale={hovered === node.label ? 1.35 : node.label === "Django" ? 1.15 : 1}
            onPointerOver={(event) => {
              event.stopPropagation();
              setHovered(node.label);
            }}
            onPointerOut={() => setHovered(null)}
          >
            <Sphere args={[0.13, 24, 24]}>
              <meshStandardMaterial
                color={node.color}
                emissive={node.color}
                emissiveIntensity={hovered === node.label ? 1.1 : 0.5}
              />
            </Sphere>

            <mesh>
              <sphereGeometry args={[0.19, 20, 20]} />
              <meshBasicMaterial color={node.color} transparent opacity={hovered === node.label ? 0.18 : 0.06} />
            </mesh>

            <Html center style={{ pointerEvents: "none" }}>
              <div
                className="grid h-6 w-6 place-items-center rounded-full bg-black/50 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 ring-1 ring-white/15 backdrop-blur-sm"
                style={{ boxShadow: `0 0 22px ${node.color}55` }}
              >
                {node.label.charAt(0)}
              </div>
            </Html>

            <AnimatePresence>
              {hovered === node.label ? (
                <Html position={[0, 0.9, 0]} center transform={false} style={{ pointerEvents: "none" }}>
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.96 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.96 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="w-36 rounded-2xl border border-white/10 bg-[#0b1220] px-3 py-2 text-left shadow-2xl shadow-black/35"
                    style={{ transformOrigin: "left top" }}
                  >
                    <p className="text-[9px] uppercase tracking-[0.18em] text-orange-200">{node.label}</p>
                    <p className="mt-1 text-[11px] leading-4 text-slate-200">{nodeDescriptions[node.label]}</p>
                  </motion.div>
                </Html>
              ) : null}
            </AnimatePresence>
          </group>
        </Float>
      ))}
    </>
  );
}

export default function TechNetworkScene() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="relative h-full w-full">
      <Canvas camera={{ position: [0, 0, 6.6], fov: 52 }} dpr={[1, 1.5]}>
        <ambientLight intensity={0.6} />
        <pointLight position={[4, 4, 3]} intensity={1.6} color="#ff8c2f" />
        <pointLight position={[-4, -2, -2]} intensity={1.3} color="#67cfff" />
        <Network hovered={hovered} setHovered={setHovered} />
        <OrbitControls enablePan={false} enableZoom={false} autoRotate autoRotateSpeed={0.35} />
      </Canvas>
    </div>
  );
}
