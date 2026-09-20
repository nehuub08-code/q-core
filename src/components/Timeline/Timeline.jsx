import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CLASSICAL_TIMELINE, QUANTUM_TIMELINE } from "../../data/timelineData";
import { sound } from "../../utils/audioEffects";
import { Calendar, CheckCircle2, ChevronRight, Sparkles, X, Info, Cpu, Atom } from "lucide-react";
import SectionModeToggle from "../common/SectionModeToggle";

export default function Timeline() {
  const [timelineMode, setTimelineMode] = useState("classical");
  const [activeIdx, setActiveIdx] = useState(0);

  const activeMilestones = timelineMode === "classical" ? CLASSICAL_TIMELINE : QUANTUM_TIMELINE;
  const safeIdx = activeIdx >= activeMilestones.length ? 0 : activeIdx;
  const selectedMilestone = activeMilestones[safeIdx];

  const handleModeChange = (mode) => {
    setTimelineMode(mode);
    setActiveIdx(0);
  };

  const handleSelect = (idx) => {
    sound.playClick();
    setActiveIdx(idx);
  };

  return (
    <section id="timeline" className="py-24 relative overflow-hidden">
      {/* Background Subtle Gradient */}
      <div className="absolute top-1/2 left-0 right-0 h-96 bg-gradient-to-b from-transparent via-blue-50/50 to-transparent pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide mb-4">
            <Calendar className="w-3.5 h-3.5" />
            Architectural Evolution
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            {timelineMode === "classical" ? "Classical Microprocessor Evolution" : "Quantum Hardware & QPU Breakthroughs"}
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            {timelineMode === "classical"
              ? "From 1940s thermionic vacuum bulbs to modern 3nm EUV multi-core silicon CMOS supercomputing."
              : "From Feynman's 1981 vision to Shor's factoring, Google Sycamore supremacy, and fault-tolerant logical QPUs."}
          </p>
        </div>

        {/* Section Mode Filter Buttons */}
        <SectionModeToggle
          mode={timelineMode}
          onModeChange={handleModeChange}
          classicalLabel="Classical Microprocessor Milestones"
          quantumLabel="Quantum Microprocessor Milestones"
        />

        {/* Horizontal Timeline Bar with SVG connecting track */}
        <div className="relative mb-12 mt-8">
          {/* Connecting Track */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -translate-y-1/2 rounded-full overflow-hidden">
            <motion.div
              className={`h-full ${timelineMode === "classical" ? "bg-blue-600" : "bg-indigo-600"}`}
              initial={{ width: "0%" }}
              animate={{ width: `${((safeIdx + 1) / activeMilestones.length) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>

          {/* Milestone Node Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 relative z-10">
            {activeMilestones.map((m, idx) => {
              const isSelected = safeIdx === idx;
              return (
                <button
                  key={m.year + m.title}
                  onClick={() => handleSelect(idx)}
                  className={`flex flex-col items-center text-center p-3.5 rounded-2xl bg-white border transition-all duration-200 relative group shadow-xs cursor-pointer ${
                    isSelected
                      ? timelineMode === "classical"
                        ? "border-blue-600 ring-2 ring-blue-500/20 shadow-md scale-105"
                        : "border-indigo-600 ring-2 ring-indigo-500/20 shadow-md scale-105"
                      : "border-slate-200 hover:border-slate-400"
                  }`}
                >
                  {/* Indicator Dot */}
                  <div
                    className={`w-3.5 h-3.5 rounded-full border-2 mb-2 transition-all duration-200 ${
                      isSelected
                        ? timelineMode === "classical"
                          ? "bg-blue-600 border-white scale-110 shadow-xs"
                          : "bg-indigo-600 border-white scale-110 shadow-xs"
                        : "bg-slate-300 border-white group-hover:bg-slate-400"
                    }`}
                  />
                  <span className={`text-xs font-bold ${timelineMode === "classical" ? "text-blue-600" : "text-indigo-600"}`}>
                    {m.year}
                  </span>
                  <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-slate-800 mt-1 line-clamp-1">
                    {m.title}
                  </span>
                  <span className="text-[10px] text-slate-500 font-mono mt-0.5">
                    {timelineMode === "classical" ? `Era 0${idx + 1}` : `Milestone 0${idx + 1}`}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Animated Information Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedMilestone.year + timelineMode}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 relative overflow-hidden shadow-sm"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Left Column: Narrative & Breakthrough */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="px-3 py-1 rounded-md text-xs font-bold uppercase tracking-wider text-white"
                    style={{ backgroundColor: selectedMilestone.color }}
                  >
                    {selectedMilestone.year}
                  </span>
                  <span className="text-xs font-semibold text-slate-600">
                    {selectedMilestone.era}
                  </span>
                </div>

                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] font-extrabold text-2xl text-slate-900">
                    {selectedMilestone.title}
                  </h3>
                  <p className={`text-xs font-mono mt-1 ${timelineMode === "classical" ? "text-blue-600" : "text-indigo-600"}`}>
                    {selectedMilestone.subtitle}
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedMilestone.description}
                </p>

                {/* Key Breakthrough Banner */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-3">
                  <Sparkles className={`w-5 h-5 flex-shrink-0 mt-0.5 ${timelineMode === "classical" ? "text-blue-600" : "text-indigo-600"}`} />
                  <div>
                    <span className="text-xs font-bold text-slate-900 block uppercase tracking-wider">
                      Architectural Breakthrough:
                    </span>
                    <p className="text-xs text-slate-600 mt-0.5">
                      {selectedMilestone.breakthrough}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Column: Key Technical Specifications */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Hardware Metrics & Parameters:
                </span>
                <div className="space-y-2.5">
                  {selectedMilestone.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between shadow-xs hover:border-slate-300 transition-colors"
                    >
                      <span className="text-xs text-slate-500 font-medium">
                        {spec.label}
                      </span>
                      <span className="text-xs font-mono font-bold text-slate-900">
                        {spec.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
