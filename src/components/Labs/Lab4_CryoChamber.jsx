import React, { useState, useMemo } from "react";
import { ThermometerSnowflake, AlertTriangle, ShieldAlert, Zap, Activity, RotateCcw } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function Lab4_CryoChamber({ onLabComplete }) {
  // Temperature in Kelvin: 0.015 K (15 mK) to 300 K
  const [temperature, setTemperature] = useState(0.015);
  const [noiseLevel, setNoiseLevel] = useState(5); // %
  const [coolingPower, setCoolingPower] = useState(90); // %
  const [magneticDisturbance, setMagneticDisturbance] = useState(2); // Gauss

  // Critical superconducting temperature for Niobium / Aluminum is around 1.2 K
  const isSuperconducting = temperature <= 1.2;

  // Calculate live telemetry metrics
  const metrics = useMemo(() => {
    const tempFactor = Math.min(1, Math.log10(temperature / 0.015 + 1) / Math.log10(300 / 0.015 + 1));
    const noiseFactor = noiseLevel / 100;
    const coolingFactor = coolingPower / 100;
    const magFactor = magneticDisturbance / 100;

    const stability = Math.max(
      1.5,
      (1 - tempFactor * 0.85 - noiseFactor * 0.1 - magFactor * 0.15) * (0.8 + 0.2 * coolingFactor) * 100
    );

    const errorRate = Math.min(
      99.2,
      0.05 + tempFactor * 85 + noiseFactor * 8 + magFactor * 12
    );

    const fidelity = Math.max(10.0, 100 - errorRate);
    const t2 = Math.max(0.002, 120 * (1 - tempFactor * 0.999)).toFixed(2);

    return {
      stability: stability.toFixed(1),
      errorRate: errorRate.toFixed(2),
      fidelity: fidelity.toFixed(2),
      t2
    };
  }, [temperature, noiseLevel, coolingPower, magneticDisturbance]);

  const handleTempPreset = (kelvin) => {
    sound.playClick();
    setTemperature(kelvin);
    if (kelvin > 1.5) {
      sound.playError();
    } else {
      sound.playSuccess();
    }
    if (onLabComplete) onLabComplete("lab4");
  };

  const handleReset = () => {
    sound.playClick();
    setTemperature(0.015);
    setNoiseLevel(5);
    setCoolingPower(90);
    setMagneticDisturbance(2);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 dark:border-white/10 pb-4">
        <div>
          <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <ThermometerSnowflake className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            Lab 04: Cryogenic Cooling & Sub-Kelvin Chamber Simulator
          </h3>
          <p className="text-xs text-slate-600 dark:text-slate-400 font-mono mt-1">
            Why Quantum Computers Require ~15 mK (Slide 8: Operating Conditions)
          </p>
        </div>

        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset to 15 mK</span>
        </button>
      </div>

      {/* Temperature Alert Banner */}
      {!isSuperconducting && (
        <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-800 flex items-center gap-3 text-sm text-rose-700 dark:text-rose-400">
          <AlertTriangle className="w-5 h-5 shrink-0" />
          <div>
            <span className="font-bold block">
              CRITICAL DECOHERENCE EVENT (T &gt; 1.2 K)
            </span>
            <span className="text-xs text-slate-700 dark:text-slate-300">
              Cooper pairs have broken apart. Superconductivity collapsed. Qubits have turned into noisy classical resistors!
            </span>
          </div>
        </div>
      )}

      {/* Controls & Presets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Temperature Control */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-800 dark:text-white font-bold">Chamber Temp:</span>
            <span className={temperature <= 0.02 ? "text-blue-700 dark:text-cyan-400 font-bold" : "text-rose-600 dark:text-rose-400 font-bold"}>
              {temperature < 1 ? `${(temperature * 1000).toFixed(0)} mK` : `${temperature.toFixed(1)} K`}
            </span>
          </div>
          <input
            type="range"
            min={0.015}
            max={300}
            step={0.5}
            value={temperature}
            onChange={(e) => setTemperature(Number(e.target.value))}
            className="w-full accent-blue-600 h-2 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer"
          />
          <div className="flex justify-between text-[10px] text-slate-500 dark:text-slate-400 font-mono pt-1">
            <span>15 mK</span>
            <span>4 K (LHe)</span>
            <span>77 K (LN2)</span>
            <span>300 K</span>
          </div>
        </div>

        {/* Thermal Noise */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-800 dark:text-white font-bold">Thermal Noise:</span>
            <span className="text-amber-700 dark:text-amber-400 font-bold">{noiseLevel}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={noiseLevel}
            onChange={(e) => setNoiseLevel(Number(e.target.value))}
            className="w-full accent-amber-600 h-2 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            Blackbody Johnson-Nyquist Noise
          </div>
        </div>

        {/* Cooling Power */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-800 dark:text-white font-bold">Cooling Power:</span>
            <span className="text-emerald-700 dark:text-emerald-400 font-bold">{coolingPower}%</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={coolingPower}
            onChange={(e) => setCoolingPower(Number(e.target.value))}
            className="w-full accent-emerald-600 h-2 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            He3/He4 Dilution Cycle Flow
          </div>
        </div>

        {/* Magnetic Disturbance */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/80 border border-slate-200 dark:border-white/10 space-y-2">
          <div className="flex justify-between text-xs font-mono">
            <span className="text-slate-800 dark:text-white font-bold">EM Field Flux:</span>
            <span className="text-indigo-700 dark:text-indigo-400 font-bold">{magneticDisturbance} G</span>
          </div>
          <input
            type="range"
            min={0}
            max={100}
            value={magneticDisturbance}
            onChange={(e) => setMagneticDisturbance(Number(e.target.value))}
            className="w-full accent-indigo-600 h-2 bg-slate-200 dark:bg-white/10 rounded-lg cursor-pointer"
          />
          <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
            Mu-Metal Shield Penetration
          </div>
        </div>
      </div>

      {/* Quick Scientific Milestones */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">Scientific Milestones:</span>
        <button
          onClick={() => handleTempPreset(0.015)}
          className="px-3 py-1 rounded-xl bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white dark:bg-blue-950/40 dark:hover:bg-blue-600 border border-blue-300 dark:border-blue-800 dark:text-blue-300 dark:hover:text-white text-xs font-mono font-bold transition-all shadow-xs"
        >
          15 mK (Operational QPU)
        </button>
        <button
          onClick={() => handleTempPreset(4.2)}
          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white text-xs font-mono font-medium transition-all shadow-xs"
        >
          4.2 K (Liquid Helium)
        </button>
        <button
          onClick={() => handleTempPreset(77)}
          className="px-3 py-1 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 border border-slate-300 dark:border-white/15 text-slate-800 dark:text-white text-xs font-mono font-medium transition-all shadow-xs"
        >
          77 K (Liquid Nitrogen)
        </button>
        <button
          onClick={() => handleTempPreset(300)}
          className="px-3 py-1 rounded-xl bg-rose-50 hover:bg-rose-600 text-rose-700 hover:text-white dark:bg-rose-950/40 dark:hover:bg-rose-600 border border-rose-300 dark:border-rose-800 dark:text-rose-300 dark:hover:text-white text-xs font-mono font-bold transition-all shadow-xs"
        >
          300 K (Room Temperature)
        </button>
      </div>

      {/* Live Quantum Core Telemetry Dashboard */}
      <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-white/15 space-y-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-white/10 pb-3">
          <span className="text-xs font-mono font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Sub-Kelvin Cryo-Telemetry Dashboard
          </span>
          <span className={`text-xs font-mono font-bold ${isSuperconducting ? "text-emerald-700 dark:text-emerald-400" : "text-rose-700 dark:text-rose-400"}`}>
            {isSuperconducting ? "● Superconducting Regime" : "▲ Normal Conduction Regime"}
          </span>
        </div>

        {/* 4 Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Error Rate */}
          <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1 shadow-xs">
            <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold block">Gate Error Rate</span>
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-extrabold ${Number(metrics.errorRate) > 5 ? "text-rose-600 dark:text-rose-400" : "text-emerald-700 dark:text-emerald-400"}`}>
                {metrics.errorRate}%
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Target: &lt; 0.1% per gate</div>
          </div>

          {/* Qubit Stability */}
          <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1 shadow-xs">
            <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold block">Qubit Stability</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-blue-700 dark:text-cyan-400">
                {metrics.stability}%
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Hilbert Phase Coherence</div>
          </div>

          {/* Average Gate Fidelity */}
          <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1 shadow-xs">
            <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold block">Gate Fidelity</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold text-indigo-700 dark:text-indigo-400">
                {metrics.fidelity}%
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">State Overlap Probability</div>
          </div>

          {/* Decoherence T2 Time */}
          <div className="p-4 rounded-xl bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 space-y-1 shadow-xs">
            <span className="text-[10px] uppercase font-mono text-slate-500 dark:text-slate-400 font-bold block">Decoherence Time T₂</span>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-extrabold font-['Space_Grotesk'] text-amber-700 dark:text-amber-400">
                {metrics.t2} μs
              </span>
            </div>
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Phase Relaxation Window</div>
          </div>
        </div>

        {/* Visual Simulated Qubit Array Grid */}
        <div className="p-5 rounded-2xl bg-white dark:bg-black/50 border border-slate-200 dark:border-white/5 space-y-3 shadow-xs">
          <div className="flex justify-between items-center text-xs font-mono text-slate-600 dark:text-slate-400 font-semibold">
            <span>Active Qubit Core Grid (16 Transmon Array):</span>
            <span className={isSuperconducting ? "text-blue-700 dark:text-cyan-400" : "text-rose-600 dark:text-rose-400"}>
              {isSuperconducting ? "Resonators Synchronized" : "Phase Scrambled by Phonons"}
            </span>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
            {[...Array(16)].map((_, i) => (
              <div
                key={i}
                className={`h-12 rounded-xl border flex flex-col items-center justify-center font-mono text-[10px] transition-all duration-300 ${
                  isSuperconducting
                    ? "bg-blue-50 dark:bg-indigo-950/40 border-blue-300 dark:border-indigo-600 text-blue-800 dark:text-cyan-300 shadow-xs"
                    : "bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-600 text-rose-700 dark:text-rose-300"
                }`}
              >
                <span className="font-bold">q[{i}]</span>
                <span className="text-[9px] font-semibold opacity-90">
                  {isSuperconducting ? "15 mK" : "NOISE"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
