import React, { useState, useEffect } from "react";
import { sound } from "../../utils/audioEffects";
import { Cpu, Atom, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";

export default function Level3_InteractiveBuild({ mode = "classical", onComplete }) {
  // Challenge 1: Order the Classical CPU Cycle (Slide 2: Fetch, Decode, Execute, Store)
  const [cpuSlots, setCpuSlots] = useState([null, null, null, null]);
  const [availableCpuSteps, setAvailableCpuSteps] = useState(["Execute", "Store", "Fetch", "Decode"]);
  const [cpuSuccess, setCpuSuccess] = useState(false);

  // Challenge 2: Synthesize a Bell State (|00⟩ + |11⟩)/√2
  const [quantumQ0Gate, setQuantumQ0Gate] = useState(null); // needs "H"
  const [quantumCoupler, setQuantumCoupler] = useState(false); // needs CNOT
  const [quantumSuccess, setQuantumSuccess] = useState(false);

  // Reset when mode changes
  useEffect(() => {
    setCpuSlots([null, null, null, null]);
    setAvailableCpuSteps(["Execute", "Store", "Fetch", "Decode"]);
    setCpuSuccess(false);

    setQuantumQ0Gate(null);
    setQuantumCoupler(false);
    setQuantumSuccess(false);
  }, [mode]);

  // CPU Cycle slotting
  const handlePickStep = (step) => {
    sound.playClick();
    const firstEmpty = cpuSlots.indexOf(null);
    if (firstEmpty !== -1) {
      const nextSlots = [...cpuSlots];
      nextSlots[firstEmpty] = step;
      setCpuSlots(nextSlots);
      setAvailableCpuSteps(prev => prev.filter(s => s !== step));

      // If full, check correctness
      if (nextSlots.every(s => s !== null)) {
        if (
          nextSlots[0] === "Fetch" &&
          nextSlots[1] === "Decode" &&
          nextSlots[2] === "Execute" &&
          nextSlots[3] === "Store"
        ) {
          sound.playSuccess();
          setCpuSuccess(true);
          onComplete({
            level: 3,
            mode: "classical",
            score: 100,
            accuracy: 100
          });
        } else {
          sound.playError();
        }
      }
    }
  };

  const handleClearCpuSlot = (idx) => {
    const step = cpuSlots[idx];
    if (!step) return;
    sound.playClick();
    const nextSlots = [...cpuSlots];
    nextSlots[idx] = null;
    setCpuSlots(nextSlots);
    setAvailableCpuSteps(prev => [...prev, step]);
    setCpuSuccess(false);
  };

  // Quantum Circuit Verification
  const verifyQuantumCircuit = () => {
    if (quantumQ0Gate === "H" && quantumCoupler) {
      sound.playSuccess();
      setQuantumSuccess(true);
      onComplete({
        level: 3,
        mode: "quantum",
        score: 100,
        accuracy: 100
      });
    } else {
      sound.playError();
    }
  };

  return (
    <div className="space-y-6">
      {mode === "classical" ? (
        /* Classical Architecture Challenge */
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-600" />
              <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-slate-900">
                Classical Challenge: Sequence the Instruction Cycle (Slide 2)
              </h4>
            </div>
            {cpuSuccess && (
              <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                Cycle Verified!
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600">
            Click available micro-operation steps in the exact sequential order followed by classical microprocessors:
          </p>

          {/* 4 Ordered Slots */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {["1. Fetch", "2. Decode", "3. Execute", "4. Store"].map((label, idx) => (
              <div
                key={idx}
                onClick={() => handleClearCpuSlot(idx)}
                className={`p-4 rounded-xl border text-center font-mono cursor-pointer transition-all ${
                  cpuSlots[idx]
                    ? cpuSuccess
                      ? "bg-emerald-50 border-emerald-400 text-emerald-700 font-bold"
                      : "bg-blue-50 border-blue-400 text-blue-800 font-bold"
                    : "bg-white border-dashed border-slate-300 text-slate-400"
                }`}
              >
                <div className="text-[10px] text-slate-400 uppercase">{label}</div>
                <div className="text-sm font-bold mt-1">
                  {cpuSlots[idx] || "(Click step)"}
                </div>
              </div>
            ))}
          </div>

          {/* Available Steps */}
          <div className="space-y-2 pt-2">
            <span className="text-xs font-bold text-slate-700 block">Available Cycle Steps:</span>
            <div className="flex flex-wrap gap-2">
              {availableCpuSteps.map((step) => (
                <button
                  key={step}
                  onClick={() => handlePickStep(step)}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-300 hover:border-blue-500 text-slate-800 font-bold text-xs transition-all shadow-xs"
                >
                  + {step}
                </button>
              ))}
            </div>
          </div>

          {cpuSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold">
              ✓ Classical Instruction Cycle accurately sequenced: 1. Fetch instruction from memory via PC → 2. Control Unit decodes → 3. ALU executes → 4. Write back / Store result to register.
            </div>
          )}
        </div>
      ) : (
        /* Quantum Architecture Challenge */
        <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div className="flex items-center gap-2">
              <Atom className="w-5 h-5 text-indigo-600" />
              <h4 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-slate-900">
                Quantum Challenge: Synthesize a 2-Qubit Bell State (|00⟩ + |11⟩)/√2
              </h4>
            </div>
            {quantumSuccess && (
              <span className="flex items-center gap-1 text-xs font-mono font-bold text-emerald-600">
                <CheckCircle2 className="w-4 h-4" />
                State Synthesized!
              </span>
            )}
          </div>

          <p className="text-xs text-slate-600">
            Apply the Hadamard (H) gate to Qubit 0 to enter superposition, then activate the CNOT entangling coupler to create maximal quantum entanglement:
          </p>

          <div className="p-4 rounded-xl bg-white border border-slate-200 space-y-4 shadow-xs">
            {/* Qubit 0 Rail */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold text-slate-700 w-16">|q0⟩ = |0⟩</span>
              <div className="flex-1 h-0.5 bg-slate-300 relative flex items-center">
                <button
                  onClick={() => {
                    sound.playQuantumBeep();
                    setQuantumQ0Gate(quantumQ0Gate === "H" ? null : "H");
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                    quantumQ0Gate === "H"
                      ? "bg-indigo-600 border-indigo-600 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"
                  }`}
                >
                  {quantumQ0Gate === "H" ? "H Gate (Active)" : "+ Insert H Gate"}
                </button>
              </div>
            </div>

            {/* Qubit 1 Rail */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-xs font-bold text-slate-700 w-16">|q1⟩ = |0⟩</span>
              <div className="flex-1 h-0.5 bg-slate-300 relative flex items-center">
                <button
                  onClick={() => {
                    sound.playClick();
                    setQuantumCoupler(!quantumCoupler);
                  }}
                  className={`px-3 py-1.5 rounded-lg border font-mono text-xs font-bold transition-all ${
                    quantumCoupler
                      ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                      : "bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-700"
                  }`}
                >
                  {quantumCoupler ? "CNOT Entangler (Linked)" : "+ Engage CNOT Coupler"}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <button
              onClick={verifyQuantumCircuit}
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <span>Execute Quantum Circuit Verification</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {quantumSuccess && (
            <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-semibold">
              ✓ Bell State (|Φ⁺⟩ = (|00⟩ + |11⟩)/√2) successfully synthesized! The two qubits are now maximally entangled via superposition and conditional inversion.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
