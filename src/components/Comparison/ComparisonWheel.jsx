import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { COMPARISON_MATRIX } from "../../data/academicContent";
import { sound } from "../../utils/audioEffects";
import { Cpu, Atom, Zap, Binary, AlertTriangle, ThermometerSnowflake, Clock, DollarSign, Layers } from "lucide-react";
import SectionModeToggle from "../common/SectionModeToggle";

export default function ComparisonWheel() {
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);
  const [comparisonFocus, setComparisonFocus] = useState("classical");

  // Extend comparison matrix to include Cost from PPT advantages/disadvantages
  const extendedCategories = [
    ...COMPARISON_MATRIX,
    {
      category: "Cost & Practicality",
      classical: "Low cost – widely available and supported",
      quantum: "Very expensive to build & maintain",
      classicalDetail: "Slide 4: Standardized silicon fabrication plants mass-produce billions of chips for dollars each.",
      quantumDetail: "Slide 7: Multimillion-dollar dilution refrigerators, shielded labs, and specialized microwave electronics required.",
      icon: "DollarSign"
    }
  ];

  const currentItem = extendedCategories[activeCategoryIdx];

  const handleSelect = (idx) => {
    sound.playClick();
    setActiveCategoryIdx(idx);
  };

  return (
    <section id="comparison" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
            <Layers className="w-3.5 h-3.5" />
            Architectural Matrix Analysis
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Head-to-Head Comparison Wheel
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Slide 8 Academic Comparison Matrix transformed into an interactive rotary dial. Select any architectural criterion to inspect side-by-side mechanics.
          </p>
        </div>

        {/* Section Mode Filter Buttons */}
        <SectionModeToggle
          mode={comparisonFocus}
          onModeChange={setComparisonFocus}
          classicalLabel="Classical Microprocessor Focus"
          quantumLabel="Quantum Microprocessor Focus"
        />

        {/* Category Selector Hub */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2">
          {extendedCategories.map((cat, idx) => {
            const isSelected = activeCategoryIdx === idx;
            return (
              <button
                key={cat.category}
                onClick={() => handleSelect(idx)}
                className={`p-3 rounded-2xl border text-center transition-all duration-200 relative group flex flex-col items-center justify-center shadow-xs cursor-pointer ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600 shadow-md scale-105"
                    : "bg-white border-slate-200 text-slate-700 hover:border-blue-400 hover:bg-slate-50"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full mb-1.5 transition-all ${
                    isSelected ? "bg-white scale-125" : "bg-slate-300"
                  }`}
                />
                <span className={`text-xs font-bold block leading-tight ${isSelected ? "text-white" : "text-slate-900"}`}>
                  {cat.category}
                </span>
                <span className={`text-[9px] font-mono mt-1 ${isSelected ? "text-blue-100" : "text-slate-500"}`}>
                  Aspect 0{idx + 1}
                </span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Comparative Stage */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentItem.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch"
          >
            {/* Left Card: Classical Microprocessor */}
            <div
              className={`lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border space-y-6 flex flex-col justify-between relative overflow-hidden transition-all duration-200 ${
                comparisonFocus === "classical"
                  ? "border-blue-600 ring-2 ring-blue-500/20 shadow-md scale-[1.01]"
                  : "border-slate-200 opacity-90 shadow-sm"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                      <Cpu className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900">
                        Classical Microprocessor
                      </h3>
                      <span className="text-xs font-semibold text-blue-600">
                        Reference PPT • Slide 8
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-blue-50 text-xs font-mono text-blue-700 font-semibold border border-blue-200">
                    Binary Logic
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {currentItem.category} Characteristic:
                  </span>
                  <div className="text-xl font-bold text-slate-900">
                    {currentItem.classical}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentItem.classicalDetail}
                </p>
              </div>

              {/* Classical Visual Indicator */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-blue-700 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Hardware Paradigm:</span>
                <div>Deterministic CMOS Transistors • Room Temp (300 K) • Von Neumann Bus</div>
              </div>
            </div>

            {/* Right Card: Quantum Microprocessor */}
            <div
              className={`lg:col-span-6 bg-white p-6 sm:p-8 rounded-3xl border space-y-6 flex flex-col justify-between relative overflow-hidden transition-all duration-200 ${
                comparisonFocus === "quantum"
                  ? "border-indigo-600 ring-2 ring-indigo-500/20 shadow-md scale-[1.01]"
                  : "border-slate-200 opacity-90 shadow-sm"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-200 flex items-center justify-center">
                      <Atom className="w-5 h-5 text-indigo-600" />
                    </div>
                    <div>
                      <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900">
                        Quantum Microprocessor (QPU)
                      </h3>
                      <span className="text-xs font-semibold text-indigo-600">
                        Reference PPT • Slide 8
                      </span>
                    </div>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-xs font-mono text-indigo-700 font-semibold">
                    Superposition & Entanglement
                  </span>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                    {currentItem.category} Characteristic:
                  </span>
                  <div className="text-xl font-bold text-slate-900">
                    {currentItem.quantum}
                  </div>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {currentItem.quantumDetail}
                </p>
              </div>

              {/* Quantum Visual Indicator */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 font-mono text-xs text-indigo-700 space-y-1">
                <span className="text-[10px] text-slate-500 uppercase block font-semibold">Quantum Paradigm:</span>
                <div>Josephson Junction Qubits • Sub-Kelvin (15 mK) • Unitary Interference</div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
