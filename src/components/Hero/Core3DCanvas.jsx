import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Text, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// 3D Classical CPU Die Model
function ClassicalChipModel({ isHovered, wireframe }) {
  const meshRef = useRef();
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Base Substrate (Silicon Carrier) */}
      <mesh position={[0, -0.15, 0]}>
        <boxGeometry args={[3.2, 0.15, 3.2]} />
        <meshStandardMaterial
          color="#064E3B"
          roughness={0.4}
          metalness={0.6}
          wireframe={wireframe}
        />
      </mesh>

      {/* Gold Edge Connector Pins */}
      {[-1.5, 1.5].map((x, idx) => (
        <group key={`pins-${idx}`}>
          {[-1.3, -0.9, -0.5, -0.1, 0.3, 0.7, 1.1].map((z, j) => (
            <mesh key={`pin-${x}-${j}`} position={[x, -0.22, z]}>
              <cylinderGeometry args={[0.03, 0.03, 0.15, 8]} />
              <meshStandardMaterial color="#F59E0B" metalness={0.9} roughness={0.2} />
            </mesh>
          ))}
        </group>
      ))}

      {/* Silicon Die (IHS Heatspreader) */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[2.2, 0.22, 2.2]} />
        <meshStandardMaterial
          color="#1E293B"
          metalness={0.85}
          roughness={0.2}
          wireframe={wireframe}
        />
      </mesh>

      {/* Central Core Mirror Cap */}
      <mesh position={[0, 0.2, 0]}>
        <boxGeometry args={[1.5, 0.06, 1.5]} />
        <meshStandardMaterial
          color="#00E5FF"
          emissive="#00E5FF"
          emissiveIntensity={isHovered ? 0.6 : 0.25}
          metalness={0.9}
          roughness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* Circuit Bus Lines (Glowing Traces) */}
      {[-0.8, -0.4, 0, 0.4, 0.8].map((offset, i) => (
        <mesh key={`bus-${i}`} position={[offset, 0.18, 0]}>
          <boxGeometry args={[0.04, 0.02, 2.0]} />
          <meshStandardMaterial
            color="#38BDF8"
            emissive="#00E5FF"
            emissiveIntensity={0.8}
          />
        </mesh>
      ))}

      {/* Copper Heat Dissipation Fins */}
      {[-0.7, -0.35, 0, 0.35, 0.7].map((offset, i) => (
        <mesh key={`fin-${i}`} position={[0, 0.26, offset]}>
          <boxGeometry args={[1.3, 0.08, 0.04]} />
          <meshStandardMaterial color="#B45309" metalness={0.8} roughness={0.3} />
        </mesh>
      ))}
    </group>
  );
}

// 3D Quantum QPU Chip & Dilution Refrigerator Stage
function QuantumChipModel({ isHovered, wireframe }) {
  const groupRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.4;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.8;
      ringRef.current.rotation.x = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Cryogenic Gold Cold Plate (15 mK stage) */}
      <mesh position={[0, -0.6, 0]}>
        <cylinderGeometry args={[1.8, 1.8, 0.12, 32]} />
        <meshStandardMaterial
          color="#D97706"
          metalness={0.95}
          roughness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* Microwave Coaxial Posts */}
      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => {
        const x = Math.cos(angle) * 1.3;
        const z = Math.sin(angle) * 1.3;
        return (
          <mesh key={`coax-${i}`} position={[x, -0.1, z]}>
            <cylinderGeometry args={[0.05, 0.05, 0.9, 12]} />
            <meshStandardMaterial color="#FBBF24" metalness={0.9} roughness={0.2} />
          </mesh>
        );
      })}

      {/* Superconducting Substrate */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[2.0, 0.12, 2.0]} />
        <meshStandardMaterial
          color="#0F172A"
          metalness={0.9}
          roughness={0.15}
          wireframe={wireframe}
        />
      </mesh>

      {/* 3x3 Array of Transmon Qubits (Cross Resonators) */}
      {[-0.6, 0, 0.6].map((x) =>
        [-0.6, 0, 0.6].map((z) => (
          <group key={`qubit-${x}-${z}`} position={[x, 0.08, z]}>
            <mesh>
              <boxGeometry args={[0.32, 0.03, 0.08]} />
              <meshStandardMaterial
                color="#7C4DFF"
                emissive="#7C4DFF"
                emissiveIntensity={isHovered ? 1.2 : 0.8}
              />
            </mesh>
            <mesh>
              <boxGeometry args={[0.08, 0.03, 0.32]} />
              <meshStandardMaterial
                color="#00E5FF"
                emissive="#00E5FF"
                emissiveIntensity={isHovered ? 1.2 : 0.8}
              />
            </mesh>
          </group>
        ))
      )}

      {/* Quantum Entanglement Wave Field */}
      <group ref={ringRef} position={[0, 0.25, 0]}>
        <mesh>
          <torusGeometry args={[1.5, 0.03, 16, 64]} />
          <meshStandardMaterial
            color="#7C4DFF"
            emissive="#7C4DFF"
            emissiveIntensity={1.5}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.2, 0.02, 16, 64]} />
          <meshStandardMaterial
            color="#00E5FF"
            emissive="#00E5FF"
            emissiveIntensity={1.2}
            transparent
            opacity={0.6}
          />
        </mesh>
      </group>
    </group>
  );
}

export default function Core3DCanvas({ mode = "quantum", onModeToggle }) {
  const [isHovered, setIsHovered] = useState(false);
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className="relative w-full h-[420px] md:h-[500px] rounded-3xl overflow-hidden bg-gradient-to-b from-slate-50 via-white to-slate-100 border border-slate-200 shadow-lg shadow-slate-200/50">
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [3.2, 2.6, 3.8], fov: 48 }}
        onPointerOver={() => setIsHovered(true)}
        onPointerOut={() => setIsHovered(false)}
      >
        <ambientLight intensity={1.2} />
        <pointLight position={[10, 10, 10]} intensity={1.8} color="#2563EB" />
        <pointLight position={[-10, -5, -10]} intensity={1.5} color="#7C3AED" />
        <spotLight
          position={[0, 8, 2]}
          angle={0.4}
          penumbra={1}
          intensity={2.5}
          color={mode === "quantum" ? "#7C3AED" : "#2563EB"}
        />

        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
          {mode === "classical" ? (
            <ClassicalChipModel isHovered={isHovered} wireframe={wireframe} />
          ) : (
            <QuantumChipModel isHovered={isHovered} wireframe={wireframe} />
          )}
        </Float>

        <OrbitControls
          enablePan={true}
          enableZoom={true}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minDistance={2.5}
          maxDistance={8}
        />
      </Canvas>

      {/* Floating UI Controls inside Canvas Card */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-slate-200 flex items-center gap-2 pointer-events-auto shadow-sm">
          <div
            className={`w-2.5 h-2.5 rounded-full animate-ping ${
              mode === "quantum" ? "bg-indigo-600" : "bg-blue-600"
            }`}
          />
          <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold tracking-wider uppercase text-slate-800">
            {mode === "quantum" ? "Superconducting QPU (15 mK)" : "Silicon CMOS CPU (3.5 GHz)"}
          </span>
        </div>

        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setWireframe(!wireframe)}
            className={`px-3 py-1.5 text-xs font-mono rounded-xl border transition-all cursor-pointer shadow-xs ${
              wireframe
                ? "bg-blue-600 border-blue-600 text-white"
                : "bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50"
            }`}
          >
            {wireframe ? "Solid View" : "Wireframe"}
          </button>
          <button
            onClick={onModeToggle}
            className="px-3.5 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 hover:bg-blue-600 text-white transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            Switch to {mode === "quantum" ? "Classical" : "Quantum"}
          </button>
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
        <span className="text-[11px] text-slate-500 font-medium px-3 py-1 rounded-full bg-white/80 border border-slate-200/80 shadow-xs backdrop-blur-sm">
          ✦ Drag to rotate • Scroll to zoom • Right-click to pan
        </span>
      </div>
    </div>
  );
}
