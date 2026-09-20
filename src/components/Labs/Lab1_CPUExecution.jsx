import React, { useState } from "react";
import { Play, RotateCcw, Cpu, Binary, CheckCircle2, ArrowRight } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function Lab1_CPUExecution({ onLabComplete }) {
  const [r1, setR1] = useState(15);
  const [r2, setR2] = useState(7);
  const [operation, setOperation] = useState("ADD"); // ADD | SUB | AND | OR | XOR
  const [isExecuting, setIsExecuting] = useState(false);
  const [executionStep, setExecutionStep] = useState(0); // 0: Ready, 1: Bus load, 2: ALU calc, 3: Result writeback

  const to8Bit = (val) => (val & 0xff).toString(2).padStart(8, "0");

  const calculateResult = () => {
    switch (operation) {
      case "ADD":
        return r1 + r2;
      case "SUB":
        return r1 - r2;
      case "AND":
        return r1 & r2;
      case "OR":
        return r1 | r2;
      case "XOR":
        return r1 ^ r2;
      default:
        return 0;
    }
  };

  const result = calculateResult();
  const result8Bit = to8Bit(result);
  const isZero = (result & 0xff) === 0;
  const isNegative = result < 0;
  const hasCarry = result > 255 || result < 0;

  const runExecution = () => {
    sound.playClick();
    setIsExecuting(true);
    setExecutionStep(1);

    setTimeout(() => {
      sound.playQuantumBeep();
      setExecutionStep(2);
    }, 600);

    setTimeout(() => {
      sound.playSuccess();
      setExecutionStep(3);
      setIsExecuting(false);
      if (onLabComplete) onLabComplete("lab1");
    }, 1200);
  };

  const handleReset = () => {
    sound.playClick();
    setR1(15);
    setR2(7);
    setOperation("ADD");
    setExecutionStep(0);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Lab 01: CPU Execution & ALU Lab
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">
            Student Register Control, Bitwise ALU Operations & Status Flags
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={runExecution}
            disabled={isExecuting}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs flex items-center gap-2 shadow-sm hover:shadow transition-all disabled:opacity-50"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span>{isExecuting ? "Executing Cycle..." : "Execute Instruction"}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-700 dark:text-slate-300"
            title="Reset Registers"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Interactive Controls & Inputs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Register R1 Input */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2">
          <label className="text-xs font-mono text-blue-700 dark:text-blue-400 flex justify-between font-bold">
            <span>Register R1 (Decimal):</span>
            <span>0b{to8Bit(r1)}</span>
          </label>
          <input
            type="number"
            min={0}
            max={255}
            value={r1}
            onChange={(e) => {
              setR1(Math.max(0, Math.min(255, Number(e.target.value) || 0)));
              setExecutionStep(0);
            }}
            className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono text-sm focus:border-blue-600 focus:outline-none"
          />
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            Hex: 0x{(r1 & 0xff).toString(16).toUpperCase().padStart(2, "0")}
          </div>
        </div>

        {/* Operation Selector */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2">
          <label className="text-xs font-mono text-indigo-700 dark:text-indigo-400 font-bold block">
            ALU Opcode:
          </label>
          <div className="grid grid-cols-3 gap-1.5">
            {["ADD", "SUB", "AND", "OR", "XOR"].map((op) => (
              <button
                key={op}
                onClick={() => {
                  sound.playClick();
                  setOperation(op);
                  setExecutionStep(0);
                }}
                className={`py-1.5 px-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  operation === op
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10"
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>

        {/* Register R2 Input */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2">
          <label className="text-xs font-mono text-blue-700 dark:text-blue-400 flex justify-between font-bold">
            <span>Register R2 (Decimal):</span>
            <span>0b{to8Bit(r2)}</span>
          </label>
          <input
            type="number"
            min={0}
            max={255}
            value={r2}
            onChange={(e) => {
              setR2(Math.max(0, Math.min(255, Number(e.target.value) || 0)));
              setExecutionStep(0);
            }}
            className="w-full bg-white dark:bg-black/50 border border-slate-300 dark:border-white/10 rounded-xl px-3 py-2 text-slate-900 dark:text-white font-mono text-sm focus:border-blue-600 focus:outline-none"
          />
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            Hex: 0x{(r2 & 0xff).toString(16).toUpperCase().padStart(2, "0")}
          </div>
        </div>
      </div>

      {/* Bitwise Visualization & ALU Core */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/15 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Bitwise Micro-Operation Engine
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                isZero ? "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400" : "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
              }`}
            >
              ZF: {isZero ? "1 (Set)" : "0"}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                hasCarry ? "bg-amber-100 text-amber-700 dark:bg-amber-950/40 dark:text-amber-400" : "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
              }`}
            >
              CF: {hasCarry ? "1 (Carry)" : "0"}
            </span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                isNegative ? "bg-rose-100 text-rose-700 dark:bg-rose-950/40 dark:text-rose-400" : "bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-300"
              }`}
            >
              SF: {isNegative ? "1 (Neg)" : "0"}
            </span>
          </div>
        </div>

        {/* 8-bit Alignment Grid */}
        <div className="font-mono text-sm space-y-2 max-w-xl mx-auto bg-white dark:bg-black/40 p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-white/10 pb-1">
            <span>Bit Position</span>
            <span className="tracking-widest">7 6 5 4 3 2 1 0</span>
          </div>

          <div className="flex items-center justify-between text-slate-800 dark:text-white">
            <span className="text-blue-700 dark:text-blue-400 font-bold">R1 ({r1}):</span>
            <span className="tracking-widest font-bold">{to8Bit(r1).split("").join(" ")}</span>
          </div>

          <div className="flex items-center justify-between text-slate-800 dark:text-white">
            <span className="text-indigo-700 dark:text-indigo-400 font-bold">
              {operation} R2 ({r2}):
            </span>
            <span className="tracking-widest font-bold">{to8Bit(r2).split("").join(" ")}</span>
          </div>

          <div className="border-t-2 border-blue-500/40 pt-2 flex items-center justify-between">
            <span className="text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase">
              ALU Output:
            </span>
            <span className="tracking-widest font-bold text-lg text-emerald-700 dark:text-emerald-400">
              {executionStep >= 2 ? result8Bit.split("").join(" ") : "- - - - - - - -"}
            </span>
          </div>
        </div>

        {/* Output Metrics Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shadow-xs">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono font-medium">Decimal Result</span>
            <span className="text-xl font-bold font-['Space_Grotesk'] text-slate-900 dark:text-white">
              {executionStep >= 2 ? result : "---"}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shadow-xs">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono font-medium">Hexadecimal</span>
            <span className="text-xl font-bold font-mono text-blue-700 dark:text-blue-400">
              {executionStep >= 2 ? `0x${(result & 0xff).toString(16).toUpperCase().padStart(2, "0")}` : "---"}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shadow-xs">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono font-medium">Active Destination</span>
            <span className="text-sm font-bold font-mono text-amber-700 dark:text-amber-400">
              R1 (Accumulator)
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-center shadow-xs">
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block font-mono font-medium">Cycle Latency</span>
            <span className="text-sm font-bold font-mono text-emerald-700 dark:text-emerald-400">
              1 Clock Cycle
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
