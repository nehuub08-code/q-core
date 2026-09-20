import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Core3DCanvas from "./Core3DCanvas";
import { Play, ArrowRight, BookOpen, Layers, Cpu, Atom, Sparkles } from "lucide-react";
import { sound } from "../../utils/audioEffects";
import { INSTITUTION_INFO } from "../../data/academicContent";
import SectionModeToggle from "../common/SectionModeToggle";

export default function Hero({ onNavigate }) {
  const [coreMode, setCoreMode] = useState("classical"); // "classical" or "quantum"
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 20;
      const y = (clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleCore = () => {
    if (coreMode === "classical") {
      sound.playQuantumBeep();
      setCoreMode("quantum");
    } else {
      sound.playClick();
      setCoreMode("classical");
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden select-none"
    >
      {/* Dynamic Background Light Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className={`absolute top-1/4 -left-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-25 transition-all duration-700 ${
            coreMode === "classical" ? "bg-blue-400" : "bg-indigo-400"
          }`}
        />
        <div
          className={`absolute bottom-1/4 -right-20 w-[500px] h-[500px] rounded-full blur-[140px] opacity-20 transition-all duration-700 ${
            coreMode === "classical" ? "bg-sky-300" : "bg-purple-400"
          }`}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full space-y-8">
        {/* Academic Institution Header Banner */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center space-y-2 max-w-4xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-semibold shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-ping" />
            <span>{INSTITUTION_INFO.college}</span>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden md:inline text-blue-700 dark:text-blue-400 font-bold">
              {INSTITUTION_INFO.department}
            </span>
          </div>
        </motion.div>

        {/* Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Typography & CTAs */}
          <motion.div
            className="lg:col-span-6 space-y-6 text-center lg:text-left"
            style={{
              transform: `translate3d(${mousePos.x * 0.3}px, ${mousePos.y * 0.3}px, 0)`
            }}
          >
            {/* Dynamic Section Mode Switcher */}
            <SectionModeToggle
              mode={coreMode}
              onModeChange={(m) => setCoreMode(m)}
              classicalLabel="Classical Microprocessors"
              quantumLabel="Quantum Microprocessors"
            />

            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-300 text-xs font-bold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                {coreMode === "classical"
                  ? "Classical Silicon Microprocessor • Von Neumann Architecture"
                  : "Superconducting Quantum Microprocessor • Sub-Kelvin QPU"}
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.08]">
                {coreMode === "classical" ? "Classical Silicon" : "Quantum Superconducting"}
                <span className={`block mt-1 ${coreMode === "classical" ? "text-blue-600 dark:text-blue-400" : "text-indigo-600 dark:text-indigo-400"}`}>
                  Microprocessors
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 max-w-xl font-medium leading-relaxed">
              {coreMode === "classical"
                ? "Standardized binary computing using billions of nanometer-scale silicon CMOS transistors running deterministic ALU operations, cache hierarchies, and the continuous Fetch-Decode-Execute pipeline at room temperature."
                : "Non-classical computing harnessing quantum superposition and entanglement at 15 milliKelvin. Transmon qubits process exponentially large Hilbert spaces simultaneously to solve previously intractable problems in seconds."}
            </p>

            {/* Sub-tagline */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-bold tracking-wider uppercase">
              <span className="text-blue-700 dark:text-blue-400">{coreMode === "classical" ? "CMOS SILICON" : "TRANSMON QUBITS"}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-indigo-700 dark:text-indigo-400">{coreMode === "classical" ? "3.5+ GHZ CLOCK" : "15 MK CRYOSTAT"}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="text-emerald-700 dark:text-emerald-400">{coreMode === "classical" ? "DETERMINISTIC" : "EXPONENTIAL PARALLEL"}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playQuantumBeep();
                  onNavigate("labs");
                }}
                className={`px-6 py-3 rounded-xl text-white font-bold text-sm flex items-center gap-2 shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
                  coreMode === "classical" ? "bg-blue-600 hover:bg-blue-700" : "bg-indigo-600 hover:bg-indigo-700"
                }`}
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{coreMode === "classical" ? "Test CPU in Lab 01" : "Explore Qubits in Lab 02"}</span>
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate(coreMode === "classical" ? "classical" : "quantum");
                }}
                className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-500 text-slate-900 dark:text-white font-bold text-sm flex items-center gap-2 shadow-xs transition-all hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer"
              >
                <span>{coreMode === "classical" ? "Classical 3D Die & Cycles" : "Quantum Bloch & Cryo"}</span>
                <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate("comparison");
                }}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-sm font-bold transition-all cursor-pointer"
              >
                Comparison Matrix
              </button>
            </div>

            {/* Quick Curriculum Indicators */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200 dark:border-slate-800 text-left">
              <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-blue-600 dark:text-blue-400 font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{coreMode === "classical" ? "Unit: Bits" : "Unit: Qubits"}</span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-mono font-medium">
                  {coreMode === "classical" ? "Definite 0 or 1" : "α|0⟩ + β|1⟩ Superposition"}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 dark:text-indigo-400 font-bold">
                  <Atom className="w-3.5 h-3.5" />
                  <span>{coreMode === "classical" ? "Pipeline" : "Gates"}</span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-mono font-medium">
                  {coreMode === "classical" ? "Fetch-Decode-Execute" : "Hadamard & CNOT Unitary"}
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/90 border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-bold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{coreMode === "classical" ? "Operating Temp" : "Cryogenics"}</span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-mono font-medium">
                  {coreMode === "classical" ? "300 K (Room Temp)" : "15 mK Sub-Kelvin Stage"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Interactive Morphing Chip Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6"
            style={{
              transform: `translate3d(${-mousePos.x * 0.2}px, ${-mousePos.y * 0.2}px, 0)`
            }}
          >
            <div className="relative">
              <Core3DCanvas mode={coreMode} onModeToggle={toggleCore} />
              
              {/* Quick Switch Overlay Buttons */}
              <div className="mt-3 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 px-2">
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  Three.js WebGL Real-Time Raycast Active
                </span>
                <span className="font-mono text-[11px] font-semibold">
                  3D View: {coreMode === "classical" ? "Silicon Core Die" : "Cryo-Package (15 mK)"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
