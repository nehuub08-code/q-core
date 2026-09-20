import React, { useState } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  LineChart,
  Line
} from "recharts";
import { BENCHMARK_PROBLEMS } from "../../data/benchmarkData";
import { sound } from "../../utils/audioEffects";
import { Activity, Zap, Server, Cpu, Atom, Clock, HelpCircle } from "lucide-react";
import SectionModeToggle from "../common/SectionModeToggle";

export default function BenchmarkCenter() {
  const [selectedProblemId, setSelectedProblemId] = useState("crypto");
  const [activeMetric, setActiveMetric] = useState("time"); // 'time' | 'power' | 'parallel'
  const [algoDomain, setAlgoDomain] = useState("classical");

  const currentProblem = BENCHMARK_PROBLEMS.find((p) => p.id === selectedProblemId) || BENCHMARK_PROBLEMS[0];

  const handleSelectProblem = (id) => {
    sound.playClick();
    setSelectedProblemId(id);
  };

  // Custom Theme-Aware Tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 rounded-xl shadow-xl text-xs font-mono">
          <p className="text-slate-900 dark:text-white font-bold mb-1">{`Dataset / Input Size: ${label}`}</p>
          {payload.map((entry, index) => (
            <p key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${
                activeMetric === "time"
                  ? entry.value >= 1000
                    ? `${entry.value.toExponential(2)} s`
                    : `${entry.value} s`
                  : `${entry.value} Watts`
              }`}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="benchmarks" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold tracking-wide">
            <Activity className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
            Performance & Complexity Analysis
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
            Computational Complexity & Benchmarks
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Directly test theoretical speedups: compare classical polynomial/exponential slowdown against quantum polynomial algorithms (Shor's, Grover's, VQE).
          </p>
        </div>

        {/* Section Mode Filter Buttons */}
        <SectionModeToggle
          mode={algoDomain}
          onModeChange={setAlgoDomain}
          classicalLabel="Classical Algorithmic Analysis"
          quantumLabel="Quantum Speedup Advantage"
        />

        {/* Problem Selection Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {BENCHMARK_PROBLEMS.map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectProblem(p.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shadow-xs cursor-pointer ${
                selectedProblemId === p.id
                  ? "bg-blue-600 text-white shadow-sm scale-105"
                  : "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700"
              }`}
            >
              {p.name}
            </button>
          ))}
        </div>

        {/* Benchmark Dashboard Container */}
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-slate-200 dark:border-slate-700 space-y-8 shadow-sm">
          {/* Active Problem Summary */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-slate-200 dark:border-slate-700 pb-6">
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-mono text-xs font-bold border border-indigo-200 dark:border-indigo-800">
                  {currentProblem.speedupType}
                </span>
                <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900 dark:text-white">
                  {currentProblem.name}
                </h3>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentProblem.description} {currentProblem.realWorldImpact}
              </p>
            </div>

            {/* Complexity Badges */}
            <div className="md:col-span-4 space-y-2 bg-slate-50 dark:bg-slate-900/60 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs font-mono shadow-xs">
              <div className={`flex items-center justify-between p-2 rounded-xl transition-all ${algoDomain === "classical" ? "bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800" : ""}`}>
                <span className="text-blue-700 dark:text-blue-400 font-bold flex items-center gap-1.5">
                  <Cpu className="w-3.5 h-3.5" />
                  Classical:
                </span>
                <span className="text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-semibold">
                  {currentProblem.classicalAlgo}
                </span>
              </div>
              <div className={`flex items-center justify-between p-2 rounded-xl transition-all ${algoDomain === "quantum" ? "bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800" : ""}`}>
                <span className="text-indigo-700 dark:text-indigo-400 font-bold flex items-center gap-1.5">
                  <Atom className="w-3.5 h-3.5" />
                  Quantum:
                </span>
                <span className="text-slate-900 dark:text-white bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 font-semibold">
                  {currentProblem.quantumAlgo}
                </span>
              </div>
            </div>
          </div>

          {/* Metric Selector Tabs */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveMetric("time");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMetric === "time"
                    ? "bg-blue-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Execution Time (Seconds)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveMetric("power");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMetric === "power"
                    ? "bg-amber-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Power Consumption (Watts)
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveMetric("parallel");
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeMetric === "parallel"
                    ? "bg-indigo-600 text-white shadow-xs"
                    : "bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                Parallelism Model
              </button>
            </div>

            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
              Interactive Complexity Model
            </span>
          </div>

          {/* Visualization Body */}
          {activeMetric === "time" && (
            <div className="h-[360px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentProblem.dataPoints}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="size" stroke="#94A3B8" fontSize={12} fontFamily="Space Grotesk" />
                  <YAxis stroke="#94A3B8" fontSize={12} fontFamily="Space Grotesk" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="classicalTime" name="Classical CPU Time (s)" fill="#2563EB" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="quantumTime" name="Quantum QPU Time (s)" fill="#7C3AED" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeMetric === "power" && (
            <div className="h-[360px] w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={currentProblem.dataPoints}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(148, 163, 184, 0.2)" />
                  <XAxis dataKey="size" stroke="#94A3B8" fontSize={12} fontFamily="Space Grotesk" />
                  <YAxis stroke="#94A3B8" fontSize={12} fontFamily="Space Grotesk" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="classicalPower" name="Classical Server Cluster (Watts)" fill="#D97706" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="quantumPower" name="Quantum Dilution Cryo (Watts)" fill="#059669" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeMetric === "parallel" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 items-center">
              {/* Classical Von Neumann Parallelism */}
              <div className="space-y-3 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-blue-600 dark:text-blue-400">
                  <Cpu className="w-4 h-4" />
                  <span>Sequential / Multi-Core Classical Model</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Classical computers run threads across discrete CPU cores. Even with 128 cores, each core calculates 1 state at a time sequentially.
                </p>
                <div className="font-mono text-xs text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700/60 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                  States Explored = Cores × Clock Frequency (Linear Scaling)
                </div>
              </div>

              {/* Quantum Hilbert Space Parallelism */}
              <div className="space-y-3 p-5 rounded-2xl bg-white dark:bg-slate-800 border border-indigo-200 dark:border-indigo-800/60 shadow-xs">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400">
                  <Atom className="w-4 h-4" />
                  <span>Inherent Quantum Superposition Model</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  Quantum processors do not just run fast—they operate in a 2^N dimensional Hilbert state space simultaneously. A 50-qubit processor calculates 1.12 quadrillion states at once.
                </p>
                <div className="font-mono text-xs text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-700/60 p-3 rounded-lg border border-slate-200 dark:border-slate-600">
                  States Explored = 2^N Simultaneous Amplitudes (Exponential)
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
