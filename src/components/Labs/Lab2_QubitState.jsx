import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { Zap, RotateCcw, Sparkles, BarChart2, Atom, Layers } from "lucide-react";
import { sound } from "../../utils/audioEffects";

// Embedded Bloch 3D component for Lab 2
function MiniBloch({ theta, phi }) {
  const radius = 1.4;
  const x = radius * Math.sin(theta) * Math.cos(phi);
  const y = radius * Math.cos(theta);
  const z = radius * Math.sin(theta) * Math.sin(phi);

  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 24, 24]} />
        <meshStandardMaterial color="#64748B" transparent opacity={0.15} roughness={0.1} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius + 0.005, 12, 12]} />
        <meshBasicMaterial color="#4F46E5" wireframe transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.02, radius + 0.02, 48]} />
        <meshBasicMaterial color="#0284C7" side={THREE.DoubleSide} transparent opacity={0.6} />
      </mesh>
      {/* Z Axis */}
      <mesh>
        <cylinderGeometry args={[0.012, 0.012, radius * 2.4, 8]} />
        <meshBasicMaterial color="#2563EB" />
      </mesh>
      {/* State Vector */}
      <line>
        <bufferGeometry
          attach="geometry"
          onUpdate={(geo) => {
            const pos = new Float32Array([0, 0, 0, x, y, z]);
            geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
          }}
        />
        <lineBasicMaterial color="#E11D48" linewidth={3} />
      </line>
      <mesh position={[x, y, z]}>
        <sphereGeometry args={[0.09, 16, 16]} />
        <meshStandardMaterial color="#E11D48" emissive="#E11D48" emissiveIntensity={0.8} />
      </mesh>
    </group>
  );
}

export default function Lab2_QubitState({ onLabComplete }) {
  const [theta, setTheta] = useState(0); // Ground state |0⟩
  const [phi, setPhi] = useState(0);
  const [shots, setShots] = useState(1024);
  const [measurementData, setMeasurementData] = useState(null);
  const [isSampling, setIsSampling] = useState(false);

  const prob0 = Math.cos(theta / 2) ** 2;
  const prob1 = Math.sin(theta / 2) ** 2;

  // Gate actions
  const applyHadamard = () => {
    sound.playQuantumBeep();
    // Hadamard puts |0⟩ into (|0⟩+|1⟩)/√2 (theta=pi/2, phi=0)
    setTheta(Math.PI / 2);
    setPhi(0);
    setMeasurementData(null);
  };

  const applyPauliX = () => {
    sound.playQuantumBeep();
    // Pauli-X flips |0⟩ to |1⟩ and vice-versa
    setTheta(prev => (prev === 0 ? Math.PI : 0));
    setMeasurementData(null);
  };

  const applyPauliZ = () => {
    sound.playQuantumBeep();
    setPhi(prev => (prev === 0 ? Math.PI : 0));
    setMeasurementData(null);
  };

  const handleReset = () => {
    sound.playClick();
    setTheta(0);
    setPhi(0);
    setMeasurementData(null);
  };

  const runShotsMeasurement = () => {
    sound.playQuantumBeep();
    setIsSampling(true);

    setTimeout(() => {
      let count0 = 0;
      for (let i = 0; i < shots; i++) {
        if (Math.random() < prob0) count0++;
      }
      const count1 = shots - count0;
      setMeasurementData({ count0, count1 });
      setIsSampling(false);
      sound.playSuccess();
      if (onLabComplete) onLabComplete("lab2");
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Atom className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Lab 02: Qubit State & IBM Quantum Composer Lab
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">
            Superposition Simulator, Unitary Gate Pulses & Statistical Collapse
          </p>
        </div>

        {/* Gate Pulse Toolbar - Crisp, High Contrast in Bright & Dark */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={applyHadamard}
            className="px-3.5 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white dark:bg-indigo-950/40 dark:hover:bg-indigo-600 border border-indigo-300 dark:border-indigo-700 dark:text-indigo-300 dark:hover:text-white font-mono font-bold text-xs transition-all shadow-xs"
            title="Hadamard Gate (Create Superposition)"
          >
            Gate H
          </button>
          <button
            onClick={applyPauliX}
            className="px-3.5 py-1.5 rounded-xl bg-cyan-50 hover:bg-cyan-600 text-cyan-800 hover:text-white dark:bg-cyan-950/40 dark:hover:bg-cyan-600 border border-cyan-300 dark:border-cyan-700 dark:text-cyan-300 dark:hover:text-white font-mono font-bold text-xs transition-all shadow-xs"
            title="Pauli-X (Quantum NOT Gate)"
          >
            Gate X
          </button>
          <button
            onClick={applyPauliZ}
            className="px-3.5 py-1.5 rounded-xl bg-amber-50 hover:bg-amber-600 text-amber-800 hover:text-white dark:bg-amber-950/40 dark:hover:bg-amber-600 border border-amber-300 dark:border-amber-700 dark:text-amber-300 dark:hover:text-white font-mono font-bold text-xs transition-all shadow-xs"
            title="Pauli-Z (Phase Flip Gate)"
          >
            Gate Z
          </button>

          <button
            onClick={runShotsMeasurement}
            disabled={isSampling}
            className="px-4 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50 transition-all"
          >
            <Zap className="w-3.5 h-3.5 fill-current text-indigo-200" />
            <span>{isSampling ? "Sampling 1024 Shots..." : "Measure Qubit"}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300"
            title="Reset to Ground State |0⟩"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Lab 2 Interactive Console */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: 3D Mini Bloch Sphere Canvas */}
        <div className="lg:col-span-6 h-[300px] sm:h-[340px] rounded-3xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-white/10 overflow-hidden relative shadow-inner">
          <Canvas camera={{ position: [0, 1.2, 3.2], fov: 50 }}>
            <ambientLight intensity={1.2} />
            <pointLight position={[10, 10, 10]} intensity={1.5} />
            <MiniBloch theta={theta} phi={phi} />
            <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.8} />
          </Canvas>

          {/* Canvas Floating Coordinates */}
          <div className="absolute top-3 left-3 bg-white/90 dark:bg-black/60 border border-slate-200 dark:border-white/10 rounded-xl px-2.5 py-1 text-[11px] font-mono text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-xs">
            θ: {(theta / Math.PI).toFixed(2)}π | φ: {(phi / Math.PI).toFixed(2)}π
          </div>
        </div>

        {/* Right: State Vectors & Controls */}
        <div className="lg:col-span-6 space-y-4">
          {/* Mathematical State Display */}
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2 shadow-xs">
            <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400 tracking-wider block">
              Quantum State Vector:
            </span>
            <div className="font-mono text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
              |ψ⟩ = {Math.cos(theta / 2).toFixed(2)} |0⟩ + {Math.sin(theta / 2).toFixed(2)} e^(i{(phi / Math.PI).toFixed(2)}π) |1⟩
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Superposition coefficients |α|² + |β|² = 1.00 (Normalization satisfied)
            </p>
          </div>

          {/* Interactive Angle Sliders */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 space-y-3">
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono font-semibold">
                <span className="text-slate-800 dark:text-slate-200">Colatitude Theta (θ):</span>
                <span className="text-blue-700 dark:text-cyan-400 font-bold">{(theta / Math.PI).toFixed(2)}π rad</span>
              </div>
              <input
                type="range"
                min={0}
                max={Math.PI}
                step={0.01}
                value={theta}
                onChange={(e) => {
                  setTheta(Number(e.target.value));
                  setMeasurementData(null);
                }}
                className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer"
              />
            </div>

            <div className="space-y-1">
              <div className="flex justify-between text-xs font-mono font-semibold">
                <span className="text-slate-800 dark:text-slate-200">Phase Phi (φ):</span>
                <span className="text-indigo-700 dark:text-indigo-400 font-bold">{(phi / Math.PI).toFixed(2)}π rad</span>
              </div>
              <input
                type="range"
                min={0}
                max={2 * Math.PI}
                step={0.01}
                value={phi}
                onChange={(e) => {
                  setPhi(Number(e.target.value));
                  setMeasurementData(null);
                }}
                className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer"
              />
            </div>
          </div>

          {/* Probabilities - High-Contrast Visible Cards */}
          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/40 text-center shadow-xs">
              <span className="text-xs text-blue-700 dark:text-blue-400 font-mono font-bold block mb-1">
                P(|0⟩)
              </span>
              <span className="font-['Space_Grotesk'] text-2xl font-extrabold text-slate-900 dark:text-white">
                {(prob0 * 100).toFixed(1)}%
              </span>
            </div>
            <div className="p-3.5 rounded-2xl bg-indigo-50/80 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-900/40 text-center shadow-xs">
              <span className="text-xs text-indigo-700 dark:text-indigo-400 font-mono font-bold block mb-1">
                P(|1⟩)
              </span>
              <span className="font-['Space_Grotesk'] text-2xl font-extrabold text-slate-900 dark:text-white">
                {(prob1 * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Measurement Sampling Histogram */}
      {measurementData && (
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/15 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-2">
            <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <BarChart2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Multi-Shot Quantum Measurement Histogram (1,024 Shots)
            </span>
            <span className="text-[11px] font-mono font-bold text-emerald-600 dark:text-emerald-400">
              Wavefunction Collapsed
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* |0⟩ Result Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-blue-700 dark:text-blue-400 font-bold">Outcome |0⟩:</span>
                <span className="text-slate-900 dark:text-white font-bold">{measurementData.count0} shots ({((measurementData.count0 / shots) * 100).toFixed(1)}%)</span>
              </div>
              <div className="h-6 rounded-lg bg-slate-200 dark:bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full bg-blue-600 dark:bg-blue-500 rounded transition-all duration-500"
                  style={{ width: `${(measurementData.count0 / shots) * 100}%` }}
                />
              </div>
            </div>

            {/* |1⟩ Result Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-indigo-700 dark:text-indigo-400 font-bold">Outcome |1⟩:</span>
                <span className="text-slate-900 dark:text-white font-bold">{measurementData.count1} shots ({((measurementData.count1 / shots) * 100).toFixed(1)}%)</span>
              </div>
              <div className="h-6 rounded-lg bg-slate-200 dark:bg-white/10 overflow-hidden p-0.5">
                <div
                  className="h-full bg-indigo-600 dark:bg-indigo-500 rounded transition-all duration-500"
                  style={{ width: `${(measurementData.count1 / shots) * 100}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
