import React, { useState } from "react";
import { motion } from "framer-motion";
import { QUANTUM_DATA } from "../../data/academicContent";
import { sound } from "../../utils/audioEffects";
import { ArrowRight, Sparkles, CheckCircle2, ChevronRight, Layers } from "lucide-react";

export default function QuantumPipeline() {
  const [activeStep, setActiveStep] = useState(1);
  const steps = QUANTUM_DATA.working.flowchart;

  const handleStepClick = (step) => {
    sound.playClick();
    setActiveStep(step);
  };

  return (
    <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-8 shadow-sm">
      <div>
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 animate-pulse" />
          <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white">
            Working of a Quantum Microprocessor
          </h3>
        </div>
        <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">
          Exact Pipeline from Reference PPT • Slide 5 (Input Data → Qubits → Superposition → Gates → Processing → Measurement → Output)
        </p>
      </div>

      {/* Horizontal Flowchart Node Chain */}
      <div className="overflow-x-auto pb-4">
        <div className="flex items-center gap-2 min-w-[760px]">
          {steps.map((s, idx) => {
            const isActive = activeStep === s.step;
            return (
              <React.Fragment key={s.step}>
                <button
                  onClick={() => handleStepClick(s.step)}
                  className={`flex-1 p-3 rounded-2xl border text-center transition-all duration-200 relative group cursor-pointer ${
                    isActive
                      ? "bg-indigo-600 text-white border-indigo-600 shadow-md scale-105"
                      : "bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-700 hover:border-indigo-400 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 shadow-xs"
                  }`}
                >
                  <span className={`text-[10px] font-mono font-bold block mb-1 ${isActive ? "text-indigo-100" : "text-indigo-600 dark:text-indigo-400"}`}>
                    Step 0{s.step}
                  </span>
                  <span className={`font-['Plus_Jakarta_Sans'] text-xs font-bold block leading-tight ${isActive ? "text-white" : "text-slate-900 dark:text-white"}`}>
                    {s.title}
                  </span>
                  {s.title.includes("Gates") && (
                    <span className={`text-[9px] font-mono block mt-1 ${isActive ? "text-indigo-200" : "text-indigo-600 dark:text-indigo-400"}`}>
                      H, X, CNOT
                    </span>
                  )}
                </button>

                {idx < steps.length - 1 && (
                  <ChevronRight className="w-4 h-4 text-slate-400 dark:text-slate-600 shrink-0" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Active Step Deep-Dive Card */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xs">
        <div className="md:col-span-8 space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold border border-indigo-200 dark:border-indigo-800">
              Stage 0{activeStep} of 07
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900 dark:text-white">
              {steps[activeStep - 1]?.title}
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            {steps[activeStep - 1]?.desc}
          </p>
        </div>

        <div className="md:col-span-4 p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center space-y-2 shadow-xs">
          <span className="text-[10px] uppercase font-mono font-bold text-indigo-600 dark:text-indigo-400 block tracking-wider">
            Flowchart Transformation
          </span>
          <div className="font-mono text-xs font-bold text-slate-900 dark:text-white">
            {activeStep === 1 && "Classical Bitstream → Pulse Shaping"}
            {activeStep === 2 && "|0⟩ Ground State Initialized"}
            {activeStep === 3 && "|ψ⟩ = (|0⟩ + |1⟩)/√2 Entangled"}
            {activeStep === 4 && "Unitary Matrices (H, Pauli-X, CNOT)"}
            {activeStep === 5 && "Constructive Wave Interference"}
            {activeStep === 6 && "Wavefunction Collapse (Born's Rule)"}
            {activeStep === 7 && "High-Probability Binary Bitstring"}
          </div>
        </div>
      </div>
    </div>
  );
}
