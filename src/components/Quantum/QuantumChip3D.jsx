import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html } from "@react-three/drei";
import { sound } from "../../utils/audioEffects";

function CryogenicStack3D({ activeLayerId, onSelectLayer }) {
  const stackRef = useRef();

  useFrame((state, delta) => {
    if (stackRef.current) {
      stackRef.current.rotation.y += delta * 0.25;
    }
  });

  return (
    <group ref={stackRef} position={[0, -0.3, 0]}>
      {/* 1. Cryostat 50K Shield Ring (Top Disk) */}
      <group
        position={[0, 1.3, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer("cryostat");
        }}
      >
        <mesh>
          <cylinderGeometry args={[2.0, 2.0, 0.12, 32]} />
          <meshStandardMaterial
            color={activeLayerId === "cryostat" ? "#D97706" : "#78350F"}
            metalness={0.9}
            roughness={0.2}
            emissive="#F59E0B"
            emissiveIntensity={activeLayerId === "cryostat" ? 0.6 : 0.1}
          />
        </mesh>
      </group>

      {/* 2. Microwave Coaxial Lines (Gold Pencils) */}
      <group
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer("microwave");
        }}
      >
        {[-1.2, -0.6, 0.6, 1.2].map((x, i) => (
          <mesh key={i} position={[x, 0.6, 0]}>
            <cylinderGeometry args={[0.04, 0.04, 1.3, 12]} />
            <meshStandardMaterial
              color={activeLayerId === "microwave" ? "#00E5FF" : "#FBBF24"}
              metalness={0.95}
              roughness={0.1}
              emissive="#00E5FF"
              emissiveIntensity={activeLayerId === "microwave" ? 0.8 : 0.1}
            />
          </mesh>
        ))}
      </group>

      {/* 3. 15 mK Mixing Chamber Gold Plate */}
      <group
        position={[0, -0.1, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer("cryostat");
        }}
      >
        <mesh>
          <cylinderGeometry args={[1.7, 1.7, 0.1, 32]} />
          <meshStandardMaterial color="#B45309" metalness={0.9} roughness={0.15} />
        </mesh>
      </group>

      {/* 4. Superconducting Chip Carrier & Die */}
      <group
        position={[0, -0.4, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer("chip");
        }}
      >
        <mesh>
          <boxGeometry args={[1.8, 0.08, 1.8]} />
          <meshStandardMaterial
            color={activeLayerId === "chip" ? "#00E5FF" : "#0F172A"}
            metalness={0.8}
            roughness={0.2}
            emissive="#00E5FF"
            emissiveIntensity={activeLayerId === "chip" ? 0.7 : 0.1}
          />
        </mesh>
      </group>

      {/* 5. Transmon Qubits Array (Cross Resonators) */}
      <group
        position={[0, -0.32, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer("qubits");
        }}
      >
        {[-0.5, 0, 0.5].map((x) =>
          [-0.5, 0, 0.5].map((z) => (
            <group key={`q-${x}-${z}`} position={[x, 0, z]}>
              <mesh>
                <boxGeometry args={[0.26, 0.02, 0.06]} />
                <meshStandardMaterial
                  color="#7C4DFF"
                  emissive="#7C4DFF"
                  emissiveIntensity={activeLayerId === "qubits" ? 1.5 : 0.9}
                />
              </mesh>
              <mesh>
                <boxGeometry args={[0.06, 0.02, 0.26]} />
                <meshStandardMaterial
                  color="#00E5FF"
                  emissive="#00E5FF"
                  emissiveIntensity={activeLayerId === "qubits" ? 1.5 : 0.9}
                />
              </mesh>
            </group>
          ))
        )}
      </group>

      {/* 6. Readout Resonators System (Outer Torus wave) */}
      <group
        position={[0, -0.45, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectLayer("readout");
        }}
      >
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.3, 0.03, 16, 48]} />
          <meshStandardMaterial
            color={activeLayerId === "readout" ? "#22C55E" : "#7C4DFF"}
            emissive="#7C4DFF"
            emissiveIntensity={0.8}
          />
        </mesh>
      </group>

      {/* Hotspot Floating Badges */}
      <Html position={[0, 1.45, 0]} distanceFactor={7} center>
        <button
          onClick={() => onSelectLayer("cryostat")}
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all shadow-lg ${
            activeLayerId === "cryostat" ? "bg-amber-500 text-slate-950 scale-110" : "bg-slate-900/90 text-amber-400 border border-amber-500/40"
          }`}
        >
          Cryostat (15 mK)
        </button>
      </Html>

      <Html position={[0, -0.22, 0]} distanceFactor={7} center>
        <button
          onClick={() => onSelectLayer("qubits")}
          className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold transition-all shadow-lg ${
            activeLayerId === "qubits" ? "bg-indigo-600 text-white scale-110" : "bg-slate-900/90 text-indigo-300 border border-indigo-500/40"
          }`}
        >
          Transmon Qubits
        </button>
      </Html>
    </group>
  );
}

export default function QuantumChip3D({ layers, selectedLayerId, onSelectLayer }) {
  const currentLayer = layers.find((l) => l.id === selectedLayerId) || layers[0];

  const handleSelect = (id) => {
    sound.playQuantumBeep();
    onSelectLayer(id);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
      {/* 3D Cryogenic Quantum Stage */}
      <div className="lg:col-span-7 h-[420px] rounded-3xl bg-slate-900 border border-slate-700 relative overflow-hidden shadow-md">
        <Canvas camera={{ position: [3.5, 2.5, 3.5], fov: 46 }}>
          <ambientLight intensity={0.6} />
          <pointLight position={[6, 8, 6]} intensity={1.5} color="#00E5FF" />
          <pointLight position={[-6, -4, -6]} intensity={1.2} color="#7C4DFF" />
          <spotLight position={[0, 6, 0]} intensity={2.0} color="#FBBF24" />
          <CryogenicStack3D activeLayerId={selectedLayerId} onSelectLayer={handleSelect} />
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2 + 0.3}
            minDistance={2.5}
            maxDistance={7.5}
          />
        </Canvas>

        <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700 text-xs font-mono text-purple-400">
          3D Dilution Refrigerator Stage
        </div>
        <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
          <span className="text-[11px] text-slate-400 font-mono">
            Click on layers or badges to inspect cryogenic hardware
          </span>
        </div>
      </div>

      {/* Layer Detail Card */}
      <div className="lg:col-span-5 space-y-4">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
          <span>Sub-Kelvin QPU Layer Architecture</span>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-700 pb-3">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white">
                {currentLayer.name}
              </h3>
              <p className="text-xs font-mono text-indigo-600 dark:text-indigo-400 mt-0.5">
                {currentLayer.role}
              </p>
            </div>
            {currentLayer.temp && (
              <span className="px-2.5 py-1 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-mono font-bold">
                {currentLayer.temp}
              </span>
            )}
          </div>

          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {currentLayer.desc}
          </p>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-800 dark:text-slate-200">
            <span className="text-indigo-600 dark:text-indigo-400 block text-[10px] uppercase tracking-wider mb-1 font-bold">
              Cryogenic Specifications
            </span>
            {currentLayer.material || currentLayer.freq || currentLayer.count || "Sub-Kelvin Superconducting Interconnect"}
          </div>

          {/* Layer Selector Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2">
            {layers.map((l) => (
              <button
                key={l.id}
                onClick={() => handleSelect(l.id)}
                className={`px-3 py-2 rounded-lg text-xs font-mono font-bold transition-all truncate cursor-pointer ${
                  selectedLayerId === l.id
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-600"
                }`}
              >
                {l.name.split(" ")[0]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
