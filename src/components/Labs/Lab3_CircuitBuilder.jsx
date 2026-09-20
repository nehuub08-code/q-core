import React, { useState } from "react";
import { Play, RotateCcw, Sparkles, CheckCircle2, Zap, HelpCircle, Layers } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function Lab3_CircuitBuilder({ onLabComplete }) {
  // 2-Qubit, 4-Step grid
  const [circuit, setCircuit] = useState([
    ["H", null, null, "M"], // q0
    [null, "CNOT_TARGET", null, "M"]  // q1 (CNOT target coupled with q0 step 1)
  ]);
  const [selectedGate, setSelectedGate] = useState("H");
  const [isRunning, setIsRunning] = useState(false);
  const [activePlayhead, setActivePlayhead] = useState(-1);
  const [simResults, setSimResults] = useState(null);

  const availableGates = [
    { id: "H", label: "H", name: "Hadamard", color: "#4F46E5", desc: "Creates equal superposition" },
    { id: "X", label: "X", name: "Pauli-X", color: "#0284C7", desc: "Quantum NOT / Bit Flip" },
    { id: "Y", label: "Y", name: "Pauli-Y", color: "#10B981", desc: "Bit & Phase Flip" },
    { id: "Z", label: "Z", name: "Pauli-Z", color: "#D97706", desc: "Phase Flip (|1⟩ → -|1⟩)" },
    { id: "CNOT", label: "CX", name: "CNOT", color: "#DB2777", desc: "Entangles control & target" },
    { id: "M", label: "M", name: "Measure", color: "#64748B", desc: "Projects into classical bit" }
  ];

  const handleSlotClick = (qubitIdx, stepIdx) => {
    sound.playClick();
    const next = circuit.map((row) => [...row]);

    if (selectedGate === "CNOT") {
      // CNOT connects q0 (control) and q1 (target)
      next[0][stepIdx] = "CNOT_CONTROL";
      next[1][stepIdx] = "CNOT_TARGET";
    } else {
      if (next[qubitIdx][stepIdx] === selectedGate) {
        next[qubitIdx][stepIdx] = null;
      } else {
        next[qubitIdx][stepIdx] = selectedGate;
      }
    }
    setCircuit(next);
    setSimResults(null);
  };

  const loadPreset = (presetName) => {
    sound.playClick();
    if (presetName === "bell") {
      setCircuit([
        ["H", "CNOT_CONTROL", null, "M"],
        [null, "CNOT_TARGET", null, "M"]
      ]);
    } else if (presetName === "superposition") {
      setCircuit([
        ["H", null, null, "M"],
        ["H", null, null, "M"]
      ]);
    } else if (presetName === "x_flip") {
      setCircuit([
        ["X", null, null, "M"],
        [null, null, null, "M"]
      ]);
    }
    setSimResults(null);
  };

  const handleReset = () => {
    sound.playClick();
    setCircuit([
      [null, null, null, null],
      [null, null, null, null]
    ]);
    setSimResults(null);
  };

  // Run simulation & evaluate state
  const runCircuit = () => {
    sound.playQuantumBeep();
    setIsRunning(true);
    setActivePlayhead(0);
    setSimResults(null);

    const steps = [0, 1, 2, 3];
    steps.forEach((step, idx) => {
      setTimeout(() => {
        setActivePlayhead(step);
        sound.playClick();
      }, (idx + 1) * 350);
    });

    setTimeout(() => {
      setIsRunning(false);
      setActivePlayhead(-1);
      sound.playSuccess();

      const q0HasH = circuit[0].includes("H");
      const q0HasX = circuit[0].includes("X");
      const hasCNOT = circuit[0].includes("CNOT_CONTROL") && circuit[1].includes("CNOT_TARGET");

      let finalState = "|00⟩";
      let probabilities = [
        { basis: "|00⟩", prob: 1.0 },
        { basis: "|01⟩", prob: 0.0 },
        { basis: "|10⟩", prob: 0.0 },
        { basis: "|11⟩", prob: 0.0 }
      ];
      let isEntangled = false;
      let depth = circuit[0].filter(Boolean).length + circuit[1].filter(Boolean).length;

      if (q0HasH && hasCNOT) {
        finalState = "(|00⟩ + |11⟩) / √2";
        isEntangled = true;
        probabilities = [
          { basis: "|00⟩", prob: 0.5 },
          { basis: "|01⟩", prob: 0.0 },
          { basis: "|10⟩", prob: 0.0 },
          { basis: "|11⟩", prob: 0.5 }
        ];
      } else if (q0HasH && !hasCNOT) {
        finalState = "(|00⟩ + |10⟩) / √2";
        probabilities = [
          { basis: "|00⟩", prob: 0.5 },
          { basis: "|01⟩", prob: 0.0 },
          { basis: "|10⟩", prob: 0.5 },
          { basis: "|11⟩", prob: 0.0 }
        ];
      } else if (q0HasX && !hasCNOT) {
        finalState = "|10⟩";
        probabilities = [
          { basis: "|00⟩", prob: 0.0 },
          { basis: "|01⟩", prob: 0.0 },
          { basis: "|10⟩", prob: 1.0 },
          { basis: "|11⟩", prob: 0.0 }
        ];
      }

      setSimResults({
        finalState,
        probabilities,
        isEntangled,
        depth: Math.max(1, depth)
      });

      if (onLabComplete) onLabComplete("lab3");
    }, 1800);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            Lab 03: Interactive Quantum Circuit Builder
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">
            Drag-and-Place Unitary Gate Array, Multi-Qubit Entanglement & State Evaluator
          </p>
        </div>

        {/* Presets & Run Action */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => loadPreset("bell")}
            className="px-3 py-1.5 rounded-xl bg-pink-50 hover:bg-pink-600 text-pink-700 hover:text-white dark:bg-pink-950/40 dark:hover:bg-pink-600 border border-pink-300 dark:border-pink-800 dark:text-pink-300 dark:hover:text-white text-xs font-mono font-bold transition-all shadow-xs"
          >
            Preset: Bell State
          </button>
          <button
            onClick={() => loadPreset("superposition")}
            className="px-3 py-1.5 rounded-xl bg-indigo-50 hover:bg-indigo-600 text-indigo-700 hover:text-white dark:bg-indigo-950/40 dark:hover:bg-indigo-600 border border-indigo-300 dark:border-indigo-800 dark:text-indigo-300 dark:hover:text-white text-xs font-mono font-bold transition-all shadow-xs"
          >
            Preset: Superposition
          </button>

          <button
            onClick={runCircuit}
            disabled={isRunning}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50 transition-all"
          >
            <Play className="w-3.5 h-3.5 fill-current text-indigo-200" />
            <span>{isRunning ? "Simulating Waves..." : "Run Quantum Circuit"}</span>
          </button>

          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300"
            title="Clear Circuit"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gate Selector Palette */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2">
        <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
          Quantum Gate Palette (Click to select gate, then click slot on wire to place):
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
          {availableGates.map((g) => (
            <button
              key={g.id}
              onClick={() => {
                sound.playClick();
                setSelectedGate(g.id);
              }}
              className={`p-2.5 rounded-xl border flex flex-col items-center justify-center transition-all ${
                selectedGate === g.id
                  ? "bg-blue-600 dark:bg-white text-white dark:text-slate-900 font-bold scale-105 shadow-md border-blue-600 dark:border-white"
                  : "bg-white dark:bg-slate-800 border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:border-blue-400 shadow-xs"
              }`}
            >
              <span
                className="w-7 h-7 rounded-lg flex items-center justify-center font-mono font-bold text-xs mb-1"
                style={{
                  backgroundColor: selectedGate === g.id ? "rgba(255,255,255,0.2)" : g.color,
                  color: "#FFFFFF"
                }}
              >
                {g.label}
              </span>
              <span className="text-[11px] font-semibold">{g.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Circuit Grid Canvas */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-950/80 border border-slate-200 dark:border-white/15 space-y-6 relative overflow-hidden shadow-xs">
        {/* Playhead Laser Pulse Line */}
        {isRunning && activePlayhead >= 0 && (
          <div
            className="absolute top-0 bottom-0 w-1 bg-blue-600 dark:bg-cyan-400 shadow-md transition-all duration-300 pointer-events-none z-20"
            style={{ left: `${(activePlayhead + 1.2) * 20}%` }}
          />
        )}

        {/* Qubit Wire 0 */}
        <div className="flex items-center gap-4">
          <div className="w-16 font-mono text-sm font-bold text-blue-700 dark:text-cyan-400 flex items-center gap-1.5 shrink-0">
            <span>q[0]:</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold">|0⟩</span>
          </div>

          <div className="flex-1 relative flex items-center justify-between py-4">
            {/* Wire Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-300 dark:bg-white/20 -translate-y-1/2" />

            {/* 4 Time Slots */}
            {[0, 1, 2, 3].map((slotIdx) => {
              const gate = circuit[0][slotIdx];
              return (
                <div
                  key={`q0-slot-${slotIdx}`}
                  onClick={() => handleSlotClick(0, slotIdx)}
                  className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    gate
                      ? "bg-indigo-600 border-indigo-700 text-white font-mono font-bold text-sm shadow-sm scale-105"
                      : "bg-slate-100 dark:bg-slate-900 border-dashed border-slate-300 dark:border-white/30 text-slate-500 hover:border-indigo-500 hover:bg-indigo-50/50"
                  }`}
                >
                  {gate === "CNOT_CONTROL" ? (
                    <div className="w-3.5 h-3.5 rounded-full bg-pink-500 border-2 border-white" />
                  ) : (
                    gate || "+"
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* CNOT Entanglement Linking Line */}
        {circuit[0].some((g, i) => g === "CNOT_CONTROL" && circuit[1][i] === "CNOT_TARGET") && (
          <div className="relative h-4 pointer-events-none">
            <div className="absolute left-[40%] top-[-10px] bottom-[-10px] w-0.5 bg-pink-500" />
          </div>
        )}

        {/* Qubit Wire 1 */}
        <div className="flex items-center gap-4">
          <div className="w-16 font-mono text-sm font-bold text-indigo-700 dark:text-indigo-400 flex items-center gap-1.5 shrink-0">
            <span>q[1]:</span>
            <span className="text-[11px] px-1.5 py-0.5 rounded bg-indigo-100 dark:bg-indigo-900/40 text-indigo-800 dark:text-indigo-300 font-bold">|0⟩</span>
          </div>

          <div className="flex-1 relative flex items-center justify-between py-4">
            {/* Wire Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-slate-300 dark:bg-white/20 -translate-y-1/2" />

            {/* 4 Time Slots */}
            {[0, 1, 2, 3].map((slotIdx) => {
              const gate = circuit[1][slotIdx];
              return (
                <div
                  key={`q1-slot-${slotIdx}`}
                  onClick={() => handleSlotClick(1, slotIdx)}
                  className={`relative z-10 w-12 h-12 rounded-xl border flex items-center justify-center cursor-pointer transition-all duration-200 ${
                    gate
                      ? "bg-blue-600 border-blue-700 text-white font-mono font-bold text-sm shadow-sm scale-105"
                      : "bg-slate-100 dark:bg-slate-900 border-dashed border-slate-300 dark:border-white/30 text-slate-500 hover:border-blue-500 hover:bg-blue-50/50"
                  }`}
                >
                  {gate === "CNOT_TARGET" ? (
                    <div className="w-5 h-5 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white">
                      ⊕
                    </div>
                  ) : (
                    gate || "+"
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Output Simulation Results Dashboard */}
      {simResults && (
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/15 space-y-4 shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
            <div>
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider block">
                Circuit Execution Telemetry
              </span>
              <span className="text-xs font-mono font-bold text-indigo-700 dark:text-cyan-400">
                Final State Vector: {simResults.finalState}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-800 dark:text-white font-semibold">
                Circuit Depth: {simResults.depth}
              </span>
              {simResults.isEntangled && (
                <span className="px-2.5 py-0.5 rounded-lg bg-pink-100 dark:bg-pink-950/40 border border-pink-300 dark:border-pink-800 text-xs font-mono font-bold text-pink-700 dark:text-pink-300">
                  Entangled Bell Pair
                </span>
              )}
            </div>
          </div>

          {/* Basis State Probability Bars */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {simResults.probabilities.map((item) => (
              <div key={item.basis} className="p-3.5 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1.5 shadow-xs">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-900 dark:text-white font-bold">{item.basis}</span>
                  <span className="text-blue-700 dark:text-cyan-400 font-bold">{(item.prob * 100).toFixed(0)}%</span>
                </div>
                <div className="h-2 rounded-full bg-slate-200 dark:bg-white/10 overflow-hidden">
                  <div
                    className="h-full bg-indigo-600 dark:bg-cyan-400 transition-all duration-500"
                    style={{ width: `${item.prob * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
