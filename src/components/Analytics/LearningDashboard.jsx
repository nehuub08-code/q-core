import React, { useState, useEffect } from "react";
import { BarChart3, Award, Clock, Target, CheckCircle2, Lock, Sparkles, Cpu, Atom, Layers, Zap, Gauge, Flame, Snowflake, Activity } from "lucide-react";
import SectionModeToggle from "../common/SectionModeToggle";
import { sound } from "../../utils/audioEffects";

export default function LearningDashboard({ completedLabs = {}, quizScore = 0 }) {
  const [mode, setMode] = useState("classical");
  const [sessionSeconds, setSessionSeconds] = useState(210);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionSeconds((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}m ${s < 10 ? "0" : ""}${s}s`;
  };

  const totalLabsCompleted = Object.values(completedLabs).filter(Boolean).length;
  const labProgressPercent = Math.round((totalLabsCompleted / 4) * 100);

  // Classical Badges
  const classicalAchievements = [
    {
      id: "cpu_explorer",
      title: "CPU Explorer",
      desc: "Inspected classical 3D die & ALU microarchitecture.",
      icon: Cpu,
      color: "#2563EB",
      isUnlocked: true
    },
    {
      id: "register_master",
      title: "Register Master",
      desc: "Executed custom bitwise operations in Lab 01.",
      icon: Zap,
      color: "#0284C7",
      isUnlocked: !!completedLabs.lab1 || totalLabsCompleted > 0
    },
    {
      id: "pipeline_architect",
      title: "Pipeline Architect",
      desc: "Mastered the 4-stage Fetch-Decode-Execute-Store cycle.",
      icon: Layers,
      color: "#EA580C",
      isUnlocked: true
    },
    {
      id: "silicon_specialist",
      title: "Silicon Benchmark Specialist",
      desc: "Evaluated $O(N)$ linear complexity and cache latency.",
      icon: Gauge,
      color: "#7C3AED",
      isUnlocked: true
    },
    {
      id: "von_neumann_scholar",
      title: "Von Neumann Scholar",
      desc: "Passed Classical Certification Challenge Level 3.",
      icon: Award,
      color: "#059669",
      isUnlocked: quizScore >= 50 || totalLabsCompleted >= 1
    }
  ];

  // Quantum Badges
  const quantumAchievements = [
    {
      id: "quantum_scientist",
      title: "Quantum Scientist",
      desc: "Manipulated 3D Bloch sphere superposition in Lab 02.",
      icon: Atom,
      color: "#7C3AED",
      isUnlocked: !!completedLabs.lab2 || totalLabsCompleted >= 2
    },
    {
      id: "circuit_builder",
      title: "Circuit Builder",
      desc: "Assembled an entangled multi-qubit circuit in Lab 03.",
      icon: Layers,
      color: "#2563EB",
      isUnlocked: !!completedLabs.lab3 || totalLabsCompleted >= 3
    },
    {
      id: "bell_state_master",
      title: "Bell State Entangler",
      desc: "Generated maximal EPR pair (|00⟩ + |11⟩)/√2.",
      icon: Sparkles,
      color: "#DB2777",
      isUnlocked: totalLabsCompleted >= 2
    },
    {
      id: "quantum_supremacy",
      title: "Quantum Supremacy Analyst",
      desc: "Analyzed Shor's algorithm and quadratic Grover speedup.",
      icon: Activity,
      color: "#0284C7",
      isUnlocked: true
    },
    {
      id: "cryo_engineer",
      title: "Cryogenic QPU Master",
      desc: "Calibrated superconducting transmon qubits at 15 mK.",
      icon: Snowflake,
      color: "#059669",
      isUnlocked: quizScore >= 50 || totalLabsCompleted >= 3
    }
  ];

  const currentAchievements = mode === "classical" ? classicalAchievements : quantumAchievements;

  return (
    <section id="analytics" className="py-24 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
            <BarChart3 className="w-3.5 h-3.5" />
            Telemetry & Competency Tracking
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Learning Analytics & Hardware Honors
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Monitor hardware telemetry, simulation milestones, and course badges tailored specifically to Classical CPU or Quantum QPU tracks.
          </p>
        </div>

        {/* Executive Section Mode Toggle */}
        <SectionModeToggle
          mode={mode}
          onModeChange={setMode}
          classicalCount="Classical CPU Telemetry"
          quantumCount="Quantum QPU Telemetry"
        />

        {/* 4 Dynamic Metric Cards */}
        {mode === "classical" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* CPU Clock Frequency */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Clock Frequency
                </span>
                <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900">
                  4.80 GHz
                </div>
                <span className="text-[11px] font-semibold text-blue-600">
                  Dynamic Boost Turbo
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Cpu className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            {/* IPC Throughput */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Instructions / Cycle (IPC)
                </span>
                <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900">
                  2.65 IPC
                </div>
                <span className="text-[11px] font-semibold text-emerald-600">
                  Out-of-Order Execution
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <Zap className="w-6 h-6 text-emerald-600" />
              </div>
            </div>

            {/* L1 Cache Hit Rate */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  L1 Cache Hit Rate
                </span>
                <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900">
                  99.2%
                </div>
                <span className="text-[11px] font-semibold text-indigo-600">
                  ~1.2 ns Latency
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                <Layers className="w-6 h-6 text-indigo-600" />
              </div>
            </div>

            {/* Thermal Dissipation */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Thermal Design Power
                </span>
                <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900">
                  65 Watts
                </div>
                <span className="text-[11px] font-semibold text-amber-600">
                  Room Temperature (22°C)
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Flame className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Cryogenic Base Temp */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Dilution Base Temp
                </span>
                <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900">
                  14.8 mK
                </div>
                <span className="text-[11px] font-semibold text-blue-600">
                  Near Absolute Zero (-273.13°C)
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Snowflake className="w-6 h-6 text-blue-600" />
              </div>
            </div>

            {/* Qubit Coherence T1 */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Qubit Coherence Time (T₁)
                </span>
                <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900">
                  125 μs
                </div>
                <span className="text-[11px] font-semibold text-indigo-600">
                  Transmon Relaxation Time
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                <Atom className="w-6 h-6 text-indigo-600" />
              </div>
            </div>

            {/* Single-Qubit Gate Fidelity */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Single-Qubit Gate Fidelity
                </span>
                <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900">
                  99.95%
                </div>
                <span className="text-[11px] font-semibold text-emerald-600">
                  Microwave Pulse Control
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
            </div>

            {/* Two-Qubit CZ Fidelity */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 flex items-center justify-between shadow-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 block">
                  Two-Qubit CZ Fidelity
                </span>
                <div className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-slate-900">
                  99.60%
                </div>
                <span className="text-[11px] font-semibold text-amber-600">
                  Fault-Tolerant Threshold
                </span>
              </div>
              <div className="w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-amber-600" />
              </div>
            </div>
          </div>
        )}

        {/* Gamification: Badges Showcase */}
        <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                {mode === "classical" ? "Classical Microprocessor Honors" : "Quantum Computing Honors"}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Milestones awarded through interactive laboratory simulations and academic curriculum evaluations
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              {currentAchievements.filter(a => a.isUnlocked).length} of 5 Unlocked
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {currentAchievements.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`p-5 rounded-2xl border text-center transition-all duration-200 relative group flex flex-col items-center justify-between shadow-xs ${
                    badge.isUnlocked
                      ? "bg-white border-slate-200 hover:border-blue-500 hover:scale-102 hover:shadow-sm"
                      : "bg-slate-50 border-slate-200 opacity-60"
                  }`}
                >
                  <div className="space-y-3">
                    <div
                      className={`w-12 h-12 rounded-2xl mx-auto flex items-center justify-center transition-transform ${
                        badge.isUnlocked ? "scale-105" : "grayscale"
                      }`}
                      style={{
                        backgroundColor: badge.isUnlocked ? `${badge.color}15` : "rgba(0,0,0,0.04)",
                        border: `1px solid ${badge.isUnlocked ? badge.color : "rgba(0,0,0,0.1)"}`
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: badge.isUnlocked ? badge.color : "#94A3B8" }} />
                    </div>

                    <div>
                      <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-slate-900">
                        {badge.title}
                      </h4>
                      <p className="text-[10px] text-slate-500 mt-1 line-clamp-2">
                        {badge.desc}
                      </p>
                    </div>
                  </div>

                  <div className="mt-4 pt-2 border-t border-slate-100 w-full flex items-center justify-center gap-1 text-[10px] font-medium">
                    {badge.isUnlocked ? (
                      <span className="text-emerald-600 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" />
                        Unlocked
                      </span>
                    ) : (
                      <span className="text-slate-400 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Locked
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
