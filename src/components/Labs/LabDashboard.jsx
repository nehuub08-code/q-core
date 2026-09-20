import React, { useState } from "react";
import { Cpu, Atom, Layers, ThermometerSnowflake, CheckCircle2, Sparkles, ArrowRight } from "lucide-react";
import Lab1_CPUExecution from "./Lab1_CPUExecution";
import Lab2_QubitState from "./Lab2_QubitState";
import Lab3_CircuitBuilder from "./Lab3_CircuitBuilder";
import Lab4_CryoChamber from "./Lab4_CryoChamber";
import { sound } from "../../utils/audioEffects";
import SectionModeToggle from "../common/SectionModeToggle";

export default function LabDashboard({ completedLabs = {}, onLabComplete }) {
  const [labMode, setLabMode] = useState("classical");
  const [activeLabId, setActiveLabId] = useState("lab1");

  const labCards = [
    {
      id: "lab1",
      domain: "classical",
      number: "01",
      title: "CPU Execution Lab",
      subtitle: "Bitwise ALU & Von Neumann Execution",
      icon: Cpu,
      color: "#2563EB",
      description: "Control registers R1 & R2, execute ADD/SUB/AND/OR/XOR micro-operations, and inspect status flags."
    },
    {
      id: "lab2",
      domain: "quantum",
      number: "02",
      title: "Qubit State Lab",
      subtitle: "IBM Composer & Superposition",
      icon: Atom,
      color: "#4F46E5",
      description: "Manipulate theta/phi polar coordinates, fire unitary Hadamard pulses, and sample 1,024-shot measurement collapse."
    },
    {
      id: "lab3",
      domain: "quantum",
      number: "03",
      title: "Quantum Circuit Builder",
      subtitle: "Gate Array & Bell State Synthesizer",
      icon: Layers,
      color: "#7C3AED",
      description: "Place quantum gates (H, X, Y, Z, CNOT, Measure) on multi-qubit wires and simulate Hilbert state vectors."
    },
    {
      id: "lab4",
      domain: "quantum",
      number: "04",
      title: "Cryogenic Cooling Simulator",
      subtitle: "Sub-Kelvin Thermal Management",
      icon: ThermometerSnowflake,
      color: "#0284C7",
      description: "Explore why quantum computing requires ~15 mK dilution refrigerators. Watch qubits decohere at 300 K."
    }
  ];

  const handleModeChange = (mode) => {
    setLabMode(mode);
    if (mode === "classical") {
      setActiveLabId("lab1");
    } else {
      if (activeLabId === "lab1") setActiveLabId("lab2");
    }
  };

  const filteredLabs = labCards.filter((l) => l.domain === labMode);

  const handleSelectLab = (id) => {
    sound.playClick();
    setActiveLabId(id);
  };

  return (
    <section id="labs" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Flagship Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 text-blue-700 dark:text-blue-300 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Interactive Simulation Suites
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Virtual Laboratories
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Hands-on engineering simulation suites designed to bridge textbook computer architecture concepts with experimental quantum physics.
          </p>
        </div>

        {/* Section Mode Filter Buttons */}
        <SectionModeToggle
          mode={labMode}
          onModeChange={handleModeChange}
          classicalLabel="Classical Microprocessor Labs"
          quantumLabel="Quantum Microprocessor Labs"
        />

        {/* Laboratory Selection Cards */}
        <div className={`grid gap-4 ${labMode === "classical" ? "grid-cols-1 max-w-md mx-auto" : "grid-cols-1 sm:grid-cols-3"}`}>
          {filteredLabs.map((lab) => {
            const isSelected = activeLabId === lab.id;
            const isCompleted = completedLabs[lab.id];
            const Icon = lab.icon;

            return (
              <button
                key={lab.id}
                onClick={() => handleSelectLab(lab.id)}
                className={`p-5 rounded-3xl text-left bg-white dark:bg-slate-800/90 border transition-all duration-200 relative overflow-hidden group flex flex-col justify-between shadow-xs hover:shadow-md cursor-pointer ${
                  isSelected
                    ? "border-blue-600 dark:border-blue-500 ring-2 ring-blue-500/20 scale-[1.02]"
                    : "border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500"
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-slate-500 dark:text-slate-400">
                      LAB {lab.number}
                    </span>
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[10px] font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </span>
                    ) : (
                      <span className="text-[10px] font-medium text-slate-600 dark:text-slate-300 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700/60 border border-slate-200 dark:border-slate-600">
                        Interactive
                      </span>
                    )}
                  </div>

                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center transition-all group-hover:scale-105"
                    style={{ backgroundColor: `${lab.color}15`, border: `1px solid ${lab.color}35` }}
                  >
                    <Icon className="w-5 h-5" style={{ color: lab.color }} />
                  </div>

                  <div>
                    <h3 className="font-['Plus_Jakarta_Sans'] font-bold text-base text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {lab.title}
                    </h3>
                    <p className="text-[11px] font-medium text-blue-600 dark:text-blue-400 mt-0.5">
                      {lab.subtitle}
                    </p>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                    {lab.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs font-semibold" style={{ color: lab.color }}>
                  <span>{isSelected ? "Active Suite" : "Launch Lab"}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Lab Display Chamber */}
        <div className="bg-white dark:bg-slate-800/90 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 relative overflow-hidden shadow-sm">
          {activeLabId === "lab1" && <Lab1_CPUExecution onLabComplete={onLabComplete} />}
          {activeLabId === "lab2" && <Lab2_QubitState onLabComplete={onLabComplete} />}
          {activeLabId === "lab3" && <Lab3_CircuitBuilder onLabComplete={onLabComplete} />}
          {activeLabId === "lab4" && <Lab4_CryoChamber onLabComplete={onLabComplete} />}
        </div>
      </div>
    </section>
  );
}
