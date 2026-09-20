import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Sparkles, Cpu, Atom, BookOpen, Layers } from "lucide-react";
import Core3DCanvas from "./Core3DCanvas";
import { INSTITUTION_INFO } from "../../data/academicContent";
import { sound } from "../../utils/audioEffects";
import SectionModeToggle from "../common/SectionModeToggle";

export default function Hero({ onNavigate }) {
  const [coreMode, setCoreMode] = useState("quantum");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const toggleCore = () => {
    sound.playQuantumBeep();
    setCoreMode(prev => (prev === "quantum" ? "classical" : "quantum"));
  };

  return (
    <section id="hero" className="relative min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden">
      {/* Dynamic Background: Starfield, Binary Particles & Quantum Energy Waves */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial Glow Centers */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#00E5FF]/10 rounded-full blur-[128px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#7C4DFF]/15 rounded-full blur-[128px] animate-pulse" style={{ animationDelay: "2s" }} />

        {/* Ambient Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

        {/* Floating Binary / Quantum Bits */}
        <div className="absolute inset-0 overflow-hidden opacity-25">
          {["0", "1", "|0⟩", "|1⟩", "H", "CNOT", "λ", "ψ", "ALU", "CU"].map((token, i) => (
            <motion.span
              key={i}
              className="absolute font-mono text-xs text-[#00E5FF]"
              style={{
                top: `${(i * 19 + 7) % 95}%`,
                left: `${(i * 27 + 11) % 92}%`
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.2, 0.7, 0.2]
              }}
              transition={{
                duration: 5 + (i % 4),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              {token}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 w-full">
        {/* Academic Attribution Banner */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-6"
        >
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 text-xs text-slate-600 dark:text-slate-300 shadow-sm backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse" />
            <span className="font-semibold text-slate-800 dark:text-white">
              {INSTITUTION_INFO.college}
            </span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">•</span>
            <span className="hidden md:inline text-blue-600 dark:text-blue-400 font-medium">
              {INSTITUTION_INFO.department}
            </span>
          </div>
        </motion.div>

        {/* Two-Column Hero Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Cinematic Typography & CTAs */}
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
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                {coreMode === "classical"
                  ? "Classical Silicon Microprocessor • Von Neumann Architecture"
                  : "Superconducting Quantum Microprocessor • Sub-Kelvin QPU"}
              </div>
              <h1 className="font-['Plus_Jakarta_Sans'] font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 leading-[1.08]">
                {coreMode === "classical" ? "Classical Silicon" : "Quantum Superconducting"}
                <span className={`block mt-1 ${coreMode === "classical" ? "text-blue-600" : "text-indigo-600"}`}>
                  Microprocessors
                </span>
              </h1>
            </div>

            <p className="text-base sm:text-lg text-slate-600 max-w-xl font-normal leading-relaxed">
              {coreMode === "classical"
                ? "Standardized binary computing using billions of nanometer-scale silicon CMOS transistors running deterministic ALU operations, cache hierarchies, and the continuous Fetch-Decode-Execute pipeline at room temperature."
                : "Non-classical computing harnessing quantum superposition and entanglement at 15 milliKelvin. Transmon qubits process exponentially large Hilbert spaces simultaneously to solve previously intractable problems in seconds."}
            </p>

            {/* Sub-tagline */}
            <div className="flex items-center justify-center lg:justify-start gap-4 text-xs sm:text-sm font-semibold tracking-wider text-slate-500 uppercase">
              <span className="text-blue-600 font-bold">{coreMode === "classical" ? "CMOS SILICON" : "TRANSMON QUBITS"}</span>
              <span className="text-slate-300">•</span>
              <span className="text-indigo-600 font-bold">{coreMode === "classical" ? "3.5+ GHZ CLOCK" : "15 MK CRYOSTAT"}</span>
              <span className="text-slate-300">•</span>
              <span className="text-emerald-600 font-bold">{coreMode === "classical" ? "DETERMINISTIC" : "EXPONENTIAL PARALLEL"}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
              <button
                onClick={() => {
                  sound.playQuantumBeep();
                  onNavigate("labs");
                }}
                className={`px-6 py-3 rounded-xl text-white font-semibold text-sm flex items-center gap-2 shadow-sm transition-all hover:shadow hover:-translate-y-0.5 active:translate-y-0 cursor-pointer ${
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
                className="px-6 py-3 rounded-xl bg-white border border-slate-200 hover:border-blue-500 text-slate-800 font-semibold text-sm flex items-center gap-2 shadow-xs transition-all hover:bg-slate-50 cursor-pointer"
              >
                <span>{coreMode === "classical" ? "Classical 3D Die & Cycles" : "Quantum Bloch & Cryo"}</span>
                <ArrowRight className="w-4 h-4 text-blue-600" />
              </button>

              <button
                onClick={() => {
                  sound.playClick();
                  onNavigate("comparison");
                }}
                className="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 text-sm font-semibold transition-all cursor-pointer"
              >
                Comparison Matrix
              </button>
            </div>

            {/* Quick Curriculum Indicators */}
            <div className="pt-4 grid grid-cols-3 gap-3 border-t border-slate-200 text-left">
              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-blue-600 font-bold">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>{coreMode === "classical" ? "Unit: Bits" : "Unit: Qubits"}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1 font-mono">
                  {coreMode === "classical" ? "Definite 0 or 1" : "α|0⟩ + β|1⟩ Superposition"}
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-indigo-600 font-bold">
                  <Atom className="w-3.5 h-3.5" />
                  <span>{coreMode === "classical" ? "Pipeline" : "Gates"}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1 font-mono">
                  {coreMode === "classical" ? "Fetch-Decode-Execute" : "Hadamard & CNOT Unitary"}
                </div>
              </div>

              <div className="bg-white border border-slate-200 p-3 rounded-xl shadow-xs">
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 font-bold">
                  <Layers className="w-3.5 h-3.5" />
                  <span>{coreMode === "classical" ? "Operating Temp" : "Cryogenics"}</span>
                </div>
                <div className="text-xs text-slate-600 mt-1 font-mono">
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
              <div className="mt-3 flex items-center justify-between text-xs text-[#94A3B8] px-2">
                <span className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                  Live 3D Hardware Simulation
                </span>
                <span className="font-mono text-[#00E5FF]">
                  Mode: {coreMode === "quantum" ? "Superconducting QPU (15 mK)" : "Silicon Microprocessor (3.5 GHz)"}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
