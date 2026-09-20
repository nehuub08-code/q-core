import React, { useState } from "react";
import { Atom, Check, AlertCircle, Brain, ShieldCheck, Dna, CloudRain, TrendingUp, Cpu } from "lucide-react";
import QuantumChip3D from "./QuantumChip3D";
import BlochSphere3D from "./BlochSphere3D";
import QuantumPipeline from "./QuantumPipeline";
import { QUANTUM_DATA } from "../../data/academicContent";
import SectionModeToggle from "../common/SectionModeToggle";
import ClassicalOverview from "../Classical/ClassicalOverview";

export default function QuantumOverview() {
  const [selectedLayerId, setSelectedLayerId] = useState("qubits");
  const [activeTab, setActiveTab] = useState("bloch"); // 'bloch' | 'chip3d' | 'pipeline' | 'proscons'
  const [sectionMode, setSectionMode] = useState("quantum");

  const iconMap = {
    Brain: Brain,
    ShieldCheck: ShieldCheck,
    Dna: Dna,
    CloudRain: CloudRain,
    TrendingUp: TrendingUp
  };

  if (sectionMode === "classical") {
    return (
      <div className="space-y-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-12">
          <SectionModeToggle
            mode={sectionMode}
            onModeChange={setSectionMode}
            classicalLabel="Classical Microprocessor (CPU)"
            quantumLabel="Quantum Microprocessor (QPU)"
          />
        </div>
        <ClassicalOverview />
      </div>
    );
  }

  return (
    <section id="quantum" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-12">
        {/* Module Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold tracking-wide">
            <Atom className="w-3.5 h-3.5" />
            Module 02: Quantum Architecture
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Quantum Microprocessor Systems (QPU)
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            {QUANTUM_DATA.working.summary}
          </p>

          {/* Section Filter Switcher */}
          <SectionModeToggle
            mode={sectionMode}
            onModeChange={setSectionMode}
            classicalLabel="Classical Microprocessor (CPU)"
            quantumLabel="Quantum Microprocessor (QPU)"
          />

          {/* Module Navigation Tabs */}
          <div className="inline-flex p-1 rounded-xl bg-slate-100 border border-slate-200 mt-2 flex-wrap justify-center shadow-xs">
            <button
              onClick={() => setActiveTab("bloch")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "bloch"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              3D Bloch Sphere
            </button>
            <button
              onClick={() => setActiveTab("chip3d")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "chip3d"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              3D QPU Cryostat
            </button>
            <button
              onClick={() => setActiveTab("pipeline")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "pipeline"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Working Pipeline (Slide 5)
            </button>
            <button
              onClick={() => setActiveTab("proscons")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                activeTab === "proscons"
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Advantages & Limitations (Slide 7)
            </button>
          </div>
        </div>

        {/* Dynamic Tab Body */}
        {activeTab === "bloch" && <BlochSphere3D />}

        {activeTab === "chip3d" && (
          <QuantumChip3D
            layers={QUANTUM_DATA.layers}
            selectedLayerId={selectedLayerId}
            onSelectLayer={setSelectedLayerId}
          />
        )}

        {activeTab === "pipeline" && <QuantumPipeline />}

        {activeTab === "proscons" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Advantages Card (Slide 7) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                  <Check className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900">
                    Advantages of Quantum Microprocessors
                  </h3>
                  <span className="text-xs text-emerald-600 font-semibold">
                    Reference PPT • Slide 7
                  </span>
                </div>
              </div>

              <ul className="space-y-4">
                {QUANTUM_DATA.advantages.map((adv, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✓
                    </span>
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Disadvantages Card (Slide 7) */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-rose-200 shadow-sm relative overflow-hidden">
              <div className="flex items-center gap-3 border-b border-slate-200 pb-4 mb-6">
                <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-center">
                  <AlertCircle className="w-5 h-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-slate-900">
                    Disadvantages of Quantum Microprocessors
                  </h3>
                  <span className="text-xs text-rose-600 font-semibold">
                    Reference PPT • Slide 7
                  </span>
                </div>
              </div>

              <ul className="space-y-4">
                {QUANTUM_DATA.disadvantages.map((dis, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                      ✕
                    </span>
                    <span>{dis}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* Applications of Quantum Microprocessors (Slide 6) */}
        <div className="space-y-6 pt-4">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-xl font-bold text-slate-900">
                Applications of Quantum Microprocessors
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                From Reference PPT • Slide 6 (5 Quantum Computing Frontiers)
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">5 Frontiers</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {QUANTUM_DATA.applications.map((app) => {
              const IconComp = iconMap[app.icon] || Atom;
              return (
                <div
                  key={app.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 hover:border-indigo-500 transition-all duration-200 group hover:-translate-y-0.5 shadow-xs hover:shadow-sm"
                >
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center mb-3 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                    <IconComp className="w-4 h-4 text-indigo-600 group-hover:text-white transition-colors" />
                  </div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-slate-900 mb-1">
                    {app.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {app.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
