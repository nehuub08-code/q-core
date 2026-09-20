import React from "react";
import { Cpu, Atom, Check } from "lucide-react";
import { sound } from "../../utils/audioEffects";

export default function SectionModeToggle({
  mode = "classical",
  onModeChange,
  classicalLabel = "Classical Microprocessors",
  quantumLabel = "Quantum Microprocessors",
  className = "",
  size = "md" // 'sm' | 'md' | 'lg'
}) {
  const isClassical = mode === "classical";
  const isQuantum = mode === "quantum";

  const handleSelect = (targetMode) => {
    if (targetMode === "classical") {
      sound.playClick();
    } else {
      sound.playQuantumBeep();
    }
    if (onModeChange) {
      onModeChange(targetMode);
    }
  };

  const isSmall = size === "sm";

  return (
    <div className={`flex flex-col items-center justify-center my-6 ${className}`}>
      {/* Visual Mode Pill Switcher */}
      <div className="bg-slate-100/90 border border-slate-200/90 p-1.5 rounded-2xl shadow-sm inline-flex items-center gap-1.5 max-w-full overflow-x-auto">
        {/* Classical Button */}
        <button
          type="button"
          onClick={() => handleSelect("classical")}
          className={`flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 select-none cursor-pointer ${
            isSmall ? "px-3.5 py-1.5 text-xs" : "px-5 py-2.5 text-xs sm:text-sm"
          } ${
            isClassical
              ? "bg-blue-600 text-white shadow-md shadow-blue-500/25 ring-2 ring-blue-500/20 scale-100"
              : "bg-white text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200/80 hover:border-blue-300"
          }`}
          aria-pressed={isClassical}
        >
          <div className={`p-1 rounded-lg ${isClassical ? "bg-white/20 text-white" : "bg-blue-50 text-blue-600"}`}>
            <Cpu className={isSmall ? "w-3.5 h-3.5" : "w-4 h-4"} />
          </div>
          <span className="tracking-tight">{classicalLabel}</span>
          {isClassical && (
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          )}
        </button>

        {/* Quantum Button */}
        <button
          type="button"
          onClick={() => handleSelect("quantum")}
          className={`flex items-center gap-2 rounded-xl font-semibold transition-all duration-200 select-none cursor-pointer ${
            isSmall ? "px-3.5 py-1.5 text-xs" : "px-5 py-2.5 text-xs sm:text-sm"
          } ${
            isQuantum
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-500/20 scale-100"
              : "bg-white text-slate-700 hover:text-indigo-600 hover:bg-slate-50 border border-slate-200/80 hover:border-indigo-300"
          }`}
          aria-pressed={isQuantum}
        >
          <div className={`p-1 rounded-lg ${isQuantum ? "bg-white/20 text-white" : "bg-indigo-50 text-indigo-600"}`}>
            <Atom className={isSmall ? "w-3.5 h-3.5" : "w-4 h-4"} />
          </div>
          <span className="tracking-tight">{quantumLabel}</span>
          {isQuantum && (
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          )}
        </button>
      </div>

      {/* Active Filter Indicator Line */}
      <div className="mt-2 text-center">
        <span className="text-[11px] font-mono font-medium text-slate-500">
          Showing details for:{" "}
          <strong className={isClassical ? "text-blue-600 font-bold" : "text-indigo-600 font-bold"}>
            {isClassical ? "Classical Architecture (Silicon CMOS • Von Neumann)" : "Quantum Architecture (Sub-Kelvin QPU • Superposition)"}
          </strong>
        </span>
      </div>
    </div>
  );
}
