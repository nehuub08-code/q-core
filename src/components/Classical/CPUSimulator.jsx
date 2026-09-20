import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Play, RotateCcw, Cpu, Database, Binary, Activity } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function CPUSimulator() {
  const [currentStep, setCurrentStep] = useState(0); // 0: Idle, 1: Fetch, 2: Decode, 3: Execute, 4: Store
  const [isAutoRunning, setIsAutoRunning] = useState(false);
  const [clockSpeed, setClockSpeed] = useState(1200); // ms per step

  // Operands: 1010 (10) and 1100 (12), Operation: ADD
  const program = {
    instruction: "ADD R1, R2",
    op1Binary: "1010",
    op1Dec: 10,
    op2Binary: "1100",
    op2Dec: 12,
    resultBinary: "10110",
    resultDec: 22
  };

  const steps = [
    {
      id: 1,
      name: "Fetch",
      unit: "Memory & Program Counter",
      description: "Fetches the binary instruction (ADD R1, R2) and operands from memory address 0x04 into the Instruction Register.",
      activeComponent: "memory"
    },
    {
      id: 2,
      name: "Decode",
      unit: "Control Unit (CU)",
      description: "The Control Unit decodes the opcode bits 'ADD', sets the ALU control lines, and routes operands from R1 & R2.",
      activeComponent: "cu"
    },
    {
      id: 3,
      name: "Execute",
      unit: "Arithmetic Logic Unit (ALU)",
      description: "The ALU calculates: 1010 + 1100 = 10110 (Decimal: 10 + 12 = 22). Carry flags and zero flags are updated.",
      activeComponent: "alu"
    },
    {
      id: 4,
      name: "Store",
      unit: "Registers & Memory",
      description: "The computation result 10110 (22) is written back into Register R1 (Accumulator). PC increments to next instruction.",
      activeComponent: "registers"
    }
  ];

  // Auto-run loop
  useEffect(() => {
    let timer;
    if (isAutoRunning) {
      timer = setTimeout(() => {
        if (currentStep < 4) {
          handleStep(currentStep + 1);
        } else {
          handleStep(1); // continuous cycle as stated in Slide 2
        }
      }, clockSpeed);
    }
    return () => clearTimeout(timer);
  }, [isAutoRunning, currentStep, clockSpeed]);

  const handleStep = (stepNum) => {
    sound.playClick();
    setCurrentStep(stepNum);
    if (stepNum === 3) sound.playQuantumBeep();
    if (stepNum === 4) sound.playSuccess();
  };

  const handleReset = () => {
    sound.playClick();
    setIsAutoRunning(false);
    setCurrentStep(0);
  };

  return (
    <div className="bg-white dark:bg-slate-900/80 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-white/15 space-y-6 shadow-sm">
      {/* Simulator Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-slate-900 dark:text-white">
              Classical Von Neumann Cycle Simulator
            </h3>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">
            Slide 2 Academic Pipeline: Fetch → Decode → Execute → Store
          </p>
        </div>

        {/* Step Control Buttons - High Contrast and Legible in Bright & Dark */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleStep(1)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currentStep === 1
                ? "bg-blue-600 text-white shadow-sm ring-2 ring-blue-500/30 scale-102"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200"
            }`}
          >
            1. Fetch
          </button>
          <button
            onClick={() => handleStep(2)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currentStep === 2
                ? "bg-cyan-600 text-white shadow-sm ring-2 ring-cyan-500/30 scale-102"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200"
            }`}
          >
            2. Decode
          </button>
          <button
            onClick={() => handleStep(3)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currentStep === 3
                ? "bg-emerald-600 text-white shadow-sm ring-2 ring-emerald-500/30 scale-102"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200"
            }`}
          >
            3. Execute
          </button>
          <button
            onClick={() => handleStep(4)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
              currentStep === 4
                ? "bg-amber-600 text-white shadow-sm ring-2 ring-amber-500/30 scale-102"
                : "bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-slate-200"
            }`}
          >
            4. Store
          </button>

          <button
            onClick={() => setIsAutoRunning(!isAutoRunning)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-xs ${
              isAutoRunning
                ? "bg-rose-600 hover:bg-rose-700 text-white"
                : "bg-blue-600 hover:bg-blue-700 text-white"
            }`}
          >
            {isAutoRunning ? <Activity className="w-3.5 h-3.5 animate-spin" /> : <Play className="w-3.5 h-3.5 fill-current" />}
            {isAutoRunning ? "Pause Clock" : "Auto Clock"}
          </button>

          <button
            onClick={handleReset}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300"
            title="Reset Simulator"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Hardware Data Flow Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-stretch relative">
        {/* 1. Memory Panel */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            currentStep === 1
              ? "bg-blue-50/80 dark:bg-blue-950/40 border-blue-500 ring-2 ring-blue-500/20 shadow-md scale-[1.02]"
              : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-blue-700 dark:text-blue-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                RAM Memory
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/40 text-blue-800 dark:text-blue-300 font-bold">0x04</span>
            </div>
            <div className="font-mono text-xs space-y-1.5 bg-slate-50 dark:bg-black/40 p-2.5 rounded-xl border border-slate-200 dark:border-white/5">
              <div className="text-slate-500 dark:text-slate-400">Address: [0x04]</div>
              <div className="text-slate-900 dark:text-white font-bold tracking-wider">Instruction: ADD</div>
              <div className="text-blue-700 dark:text-blue-400 flex justify-between">
                <span className="font-semibold">Operand 1:</span>
                <span className="font-bold">{program.op1Binary} ({program.op1Dec})</span>
              </div>
              <div className="text-cyan-700 dark:text-cyan-400 flex justify-between">
                <span className="font-semibold">Operand 2:</span>
                <span className="font-bold">{program.op2Binary} ({program.op2Dec})</span>
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] font-medium text-slate-600 dark:text-slate-400">
            Status: {currentStep === 1 ? "Emitting opcode onto Bus..." : "Standing By"}
          </div>
        </div>

        {/* 2. Control Unit (CU) */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            currentStep === 2
              ? "bg-cyan-50/80 dark:bg-cyan-950/40 border-cyan-500 ring-2 ring-cyan-500/20 shadow-md scale-[1.02]"
              : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-cyan-700 dark:text-cyan-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Cpu className="w-3.5 h-3.5" />
                Control Unit (CU)
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-cyan-100 dark:bg-cyan-900/40 text-cyan-800 dark:text-cyan-300 font-bold">Decoded</span>
            </div>
            <div className="font-mono text-xs space-y-1.5 bg-slate-50 dark:bg-black/40 p-2.5 rounded-xl border border-slate-200 dark:border-white/5">
              <div className="text-slate-500 dark:text-slate-400">Opcode: 0x01 (ADD)</div>
              <div className="text-slate-800 dark:text-slate-200">Src1: R1 (1010)</div>
              <div className="text-slate-800 dark:text-slate-200">Src2: R2 (1100)</div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold">ALU Gate: ENABLED</div>
            </div>
          </div>
          <div className="mt-3 text-[11px] font-medium text-slate-600 dark:text-slate-400">
            Status: {currentStep === 2 ? "Generating control clock pulse..." : "Idle"}
          </div>
        </div>

        {/* 3. Arithmetic Logic Unit (ALU) */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            currentStep === 3
              ? "bg-emerald-50/80 dark:bg-emerald-950/40 border-emerald-500 ring-2 ring-emerald-500/20 shadow-md scale-[1.02]"
              : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-emerald-700 dark:text-emerald-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Binary className="w-3.5 h-3.5" />
                ALU Core
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-900/40 text-emerald-800 dark:text-emerald-300 font-bold">Execute</span>
            </div>
            <div className="font-mono text-xs space-y-1.5 bg-slate-50 dark:bg-black/40 p-2.5 rounded-xl border border-slate-200 dark:border-white/5">
              <div className="text-slate-500 dark:text-slate-400">Operation: Binary ADD</div>
              <div className="text-slate-800 dark:text-slate-200">  {program.op1Binary}  (10)</div>
              <div className="text-slate-800 dark:text-slate-200">+ {program.op2Binary}  (12)</div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold border-t border-slate-300 dark:border-white/20 pt-1">
                = {currentStep >= 3 ? `${program.resultBinary} (${program.resultDec})` : "----"}
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] font-medium text-slate-600 dark:text-slate-400">
            Status: {currentStep === 3 ? "Sum calculated. Flags set." : "Waiting for operands"}
          </div>
        </div>

        {/* 4. Registers (Store) */}
        <div
          className={`p-4 rounded-2xl border transition-all duration-300 flex flex-col justify-between ${
            currentStep === 4
              ? "bg-amber-50/80 dark:bg-amber-950/40 border-amber-500 ring-2 ring-amber-500/20 shadow-md scale-[1.02]"
              : "bg-white dark:bg-slate-900/60 border-slate-200 dark:border-white/10"
          }`}
        >
          <div>
            <div className="flex items-center justify-between text-xs font-mono font-bold text-amber-700 dark:text-amber-400 mb-2">
              <span className="flex items-center gap-1.5">
                <Database className="w-3.5 h-3.5" />
                CPU Registers
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 font-bold">R1 / ACC</span>
            </div>
            <div className="font-mono text-xs space-y-1.5 bg-slate-50 dark:bg-black/40 p-2.5 rounded-xl border border-slate-200 dark:border-white/5">
              <div className="text-slate-500 dark:text-slate-400">Register R1 (Accumulator):</div>
              <div className="text-xl font-bold text-amber-700 dark:text-amber-400 tracking-wider py-1">
                {currentStep === 4 ? program.resultBinary : program.op1Binary}
              </div>
              <div className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold">
                Decimal Value: {currentStep === 4 ? program.resultDec : program.op1Dec}
              </div>
            </div>
          </div>
          <div className="mt-3 text-[11px] font-medium text-slate-600 dark:text-slate-400">
            Status: {currentStep === 4 ? "Stored! Cycle complete." : "Cached"}
          </div>
        </div>
      </div>

      {/* Active Phase Explanation Box */}
      <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-white/5 border border-blue-200 dark:border-white/10 flex items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-blue-700 dark:text-blue-400 uppercase">
              Current Cycle Step:
            </span>
            <span className="text-xs font-bold font-mono text-slate-900 dark:text-white">
              {currentStep === 0 ? "Simulator Idle — Click Fetch or Auto Clock" : steps[currentStep - 1]?.name}
            </span>
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
            {currentStep === 0
              ? "Press '1. Fetch' or 'Auto Clock' to initiate continuous microcode execution."
              : steps[currentStep - 1]?.description}
          </p>
        </div>

        <div className="hidden sm:flex items-center gap-2 font-mono text-xs text-slate-600 dark:text-slate-400">
          <span className="font-semibold">Clock:</span>
          <select
            value={clockSpeed}
            onChange={(e) => setClockSpeed(Number(e.target.value))}
            className="bg-white dark:bg-slate-800 border border-slate-300 dark:border-white/15 rounded-lg px-2.5 py-1 text-slate-800 dark:text-white text-xs font-medium focus:outline-none"
          >
            <option value={2000}>0.5 Hz (Slow)</option>
            <option value={1200}>1.0 Hz (Normal)</option>
            <option value={600}>2.0 Hz (Fast)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
