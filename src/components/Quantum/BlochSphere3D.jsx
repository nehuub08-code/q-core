import React, { useState, useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { sound } from "../../utils/audioEffects";
import { Zap, RotateCcw, Sparkles, CheckCircle2 } from "lucide-react";

// 3D Bloch Sphere Scene
function BlochSphereScene({ theta, phi, isMeasuring, measuredState }) {
  const sphereRadius = 1.6;

  const x = sphereRadius * Math.sin(theta) * Math.cos(phi);
  const y = sphereRadius * Math.cos(theta); // North pole: theta=0 -> y=R
  const z = sphereRadius * Math.sin(theta) * Math.sin(phi);

  const vectorTarget = useMemo(() => new THREE.Vector3(x, y, z), [x, y, z]);

  return (
    <group>
      {/* Outer Transparent Sphere */}
      <mesh>
        <sphereGeometry args={[sphereRadius, 32, 32]} />
        <meshStandardMaterial
          color="#0F172A"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.8}
        />
      </mesh>

      {/* Wireframe Grid */}
      <mesh>
        <sphereGeometry args={[sphereRadius + 0.005, 16, 16]} />
        <meshBasicMaterial color="#00E5FF" wireframe transparent opacity={0.2} />
      </mesh>

      {/* Equator Ring (XY Quantum plane) */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[sphereRadius - 0.02, sphereRadius + 0.02, 64]} />
        <meshBasicMaterial color="#7C4DFF" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>

      {/* Primary Axes */}
      {/* Z-Axis (|0⟩ to |1⟩: Three.js Y) */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.015, 0.015, sphereRadius * 2.5, 16]} />
        <meshBasicMaterial color="#00E5FF" />
      </mesh>

      {/* X-Axis (Three.js X) */}
      <mesh position={[0, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.012, 0.012, sphereRadius * 2.3, 16]} />
        <meshBasicMaterial color="#22C55E" />
      </mesh>

      {/* Y-Axis (Three.js Z) */}
      <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.012, 0.012, sphereRadius * 2.3, 16]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>

      {/* Pole Labels (Html overlays) */}
      <Html position={[0, sphereRadius + 0.3, 0]} center>
        <span className="px-2 py-0.5 rounded bg-[#00E5FF] text-black font-bold font-mono text-[11px] shadow-lg">
          |0⟩ (North)
        </span>
      </Html>
      <Html position={[0, -sphereRadius - 0.3, 0]} center>
        <span className="px-2 py-0.5 rounded bg-[#7C4DFF] text-white font-bold font-mono text-[11px] shadow-lg">
          |1⟩ (South)
        </span>
      </Html>
      <Html position={[sphereRadius + 0.35, 0, 0]} center>
        <span className="text-[#22C55E] font-mono text-[10px] font-bold">|+⟩</span>
      </Html>
      <Html position={[-sphereRadius - 0.35, 0, 0]} center>
        <span className="text-[#22C55E] font-mono text-[10px] font-bold">|-⟩</span>
      </Html>

      {/* State Vector Arrow */}
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geo) => {
            const positions = new Float32Array([0, 0, 0, x, y, z]);
            geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
          }}
        />
        <lineBasicMaterial color="#FFFFFF" linewidth={3} />
      </line>

      {/* State Vector Tip Bead */}
      <mesh position={[x, y, z]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial
          color="#FFFFFF"
          emissive={isMeasuring ? "#22C55E" : "#00E5FF"}
          emissiveIntensity={1.8}
        />
      </mesh>

      {/* Projection onto XY Equator Plane */}
      <mesh position={[x, 0, z]}>
        <cylinderGeometry args={[0.04, 0.04, 0.02, 8]} />
        <meshBasicMaterial color="#7C4DFF" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}

export default function BlochSphere3D() {
  const [theta, setTheta] = useState(Math.PI / 2); // 90 deg: equal superposition |+⟩
  const [phi, setPhi] = useState(0); // 0 deg
  const [measurementResult, setMeasurementResult] = useState(null);
  const [isCollapsing, setIsCollapsing] = useState(false);

  // Probabilities according to Born's rule
  const prob0 = Math.cos(theta / 2) ** 2;
  const prob1 = Math.sin(theta / 2) ** 2;

  // Quantum State Equation text
  const alphaVal = Math.cos(theta / 2).toFixed(3);
  const betaMagnitude = Math.sin(theta / 2).toFixed(3);
  const phiDeg = Math.round((phi * 180) / Math.PI);

  const handleMeasure = () => {
    sound.playQuantumBeep();
    setIsCollapsing(true);
    setMeasurementResult(null);

    setTimeout(() => {
      const collapsed = Math.random() < prob0 ? 0 : 1;
      setMeasurementResult(collapsed);
      setIsCollapsing(false);
      sound.playSuccess();
    }, 600);
  };

  const applyPreset = (presetTheta, presetPhi) => {
    sound.playClick();
    setTheta(presetTheta);
    setPhi(presetPhi);
    setMeasurementResult(null);
  };

  return (
    <div className="bg-white dark:bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/15 space-y-6 shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-slate-900 dark:text-white">
              Interactive 3D Bloch Sphere Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">
            Visualizing single-qubit pure state superposition in 3D Hilbert Space
          </p>
        </div>

        {/* State Presets */}
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            onClick={() => applyPreset(0, 0)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-xs ${
              theta === 0
                ? "bg-blue-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20"
            }`}
          >
            |0⟩ Ground
          </button>
          <button
            onClick={() => applyPreset(Math.PI, 0)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-xs ${
              theta === Math.PI
                ? "bg-indigo-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20"
            }`}
          >
            |1⟩ Excited
          </button>
          <button
            onClick={() => applyPreset(Math.PI / 2, 0)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-xs ${
              theta === Math.PI / 2 && phi === 0
                ? "bg-purple-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20"
            }`}
          >
            |+⟩ Superposition
          </button>
          <button
            onClick={() => applyPreset(Math.PI / 2, Math.PI / 2)}
            className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer shadow-xs ${
              theta === Math.PI / 2 && phi === Math.PI / 2
                ? "bg-emerald-600 text-white shadow-sm"
                : "bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-white/20"
            }`}
          >
            |i⟩ Phase State
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* 3D Canvas */}
        <div className="lg:col-span-7 h-[420px] rounded-3xl border border-slate-300 dark:border-slate-700 relative overflow-hidden bg-slate-950 shadow-inner">
          <Canvas camera={{ position: [2.8, 2.4, 3.2], fov: 46 }}>
            <ambientLight intensity={0.9} />
            <pointLight position={[6, 8, 6]} intensity={1.5} color="#00E5FF" />
            <pointLight position={[-6, -4, -6]} intensity={1.2} color="#7C4DFF" />
            <BlochSphereScene
              theta={theta}
              phi={phi}
              isMeasuring={isCollapsing}
              measuredState={measurementResult}
            />
            <OrbitControls
              enablePan={false}
              enableZoom={true}
              minDistance={2.5}
              maxDistance={6}
            />
          </Canvas>

          <div className="absolute top-4 left-4 bg-slate-900/90 backdrop-blur-md px-3 py-1 rounded-xl border border-slate-700 text-xs font-mono text-cyan-400">
            Bloch Coordinates: θ={(theta / Math.PI).toFixed(2)}π, φ={(phi / Math.PI).toFixed(2)}π
          </div>

          <div className="absolute bottom-3 left-0 right-0 text-center pointer-events-none">
            <span className="text-[11px] text-slate-400 font-mono">
              ✦ Drag background to rotate 3D sphere view
            </span>
          </div>
        </div>

        {/* Live Math & Controls */}
        <div className="lg:col-span-5 space-y-5">
          {/* Live Mathematical State Equation Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 space-y-2 shadow-xs">
            <span className="text-xs font-bold text-indigo-700 dark:text-indigo-400 uppercase tracking-wider block">
              Live State Equation: |ψ⟩ = α|0⟩ + β|1⟩
            </span>
            <div className="p-3 rounded-xl bg-white dark:bg-slate-900 font-mono text-xs sm:text-sm text-slate-900 dark:text-white tracking-wide border border-slate-200 dark:border-white/10 shadow-xs">
              |ψ⟩ = <span className="text-blue-600 dark:text-blue-400 font-bold">{alphaVal}</span>|0⟩ +{" "}
              <span className="text-indigo-600 dark:text-indigo-400 font-bold">
                ({betaMagnitude} {phiDeg !== 0 ? `· e^{i·${phiDeg}°}` : ""})
              </span>
              |1⟩
            </div>
          </div>

          {/* Sliders for Theta and Phi */}
          <div className="space-y-4">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Polar Angle θ (Superposition Weight):</span>
                <span className="text-blue-700 dark:text-blue-400 font-bold">
                  {(theta / Math.PI).toFixed(2)}π ({(theta * (180 / Math.PI)).toFixed(0)}°)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.PI}
                step={0.01}
                value={theta}
                onChange={(e) => {
                  setTheta(Number(e.target.value));
                  setMeasurementResult(null);
                }}
                className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-slate-800 dark:text-slate-200 font-semibold">Azimuthal Phase φ (Quantum Phase):</span>
                <span className="text-indigo-700 dark:text-indigo-400 font-bold">
                  {(phi / Math.PI).toFixed(2)}π ({(phi * (180 / Math.PI)).toFixed(0)}°)
                </span>
              </div>
              <input
                type="range"
                min={0}
                max={2 * Math.PI}
                step={0.01}
                value={phi}
                onChange={(e) => {
                  setPhi(Number(e.target.value));
                  setMeasurementResult(null);
                }}
                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Probability Bars (Born's Rule) */}
          <div className="space-y-3 pt-2">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-blue-700 dark:text-blue-400 font-bold">P(|0⟩) = |α|²:</span>
                <span className="font-bold text-slate-900 dark:text-white">{(prob0 * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all duration-150"
                  style={{ width: `${prob0 * 100}%` }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-indigo-700 dark:text-indigo-400 font-bold">P(|1⟩) = |β|²:</span>
                <span className="font-bold text-slate-900 dark:text-white">{(prob1 * 100).toFixed(1)}%</span>
              </div>
              <div className="h-3 rounded-full bg-slate-100 dark:bg-white/10 border border-slate-200 dark:border-white/10 overflow-hidden">
                <div
                  className="h-full bg-indigo-600 transition-all duration-150"
                  style={{ width: `${prob1 * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Measurement / Collapse Trigger Button */}
          <div className="pt-2 flex items-center gap-3">
            <button
              onClick={handleMeasure}
              disabled={isCollapsing}
              className="flex-1 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-indigo-200" />
              <span>{isCollapsing ? "Collapsing Wavefunction..." : "Measure / Collapse Qubit"}</span>
            </button>

            {measurementResult !== null && (
              <div className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/10 border border-slate-300 dark:border-white/15 text-center">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block uppercase font-mono">Output</span>
                <span className="font-bold text-lg text-slate-900 dark:text-white">
                  |{measurementResult}⟩
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
