import React from "react";
import { Cpu, Atom, Heart, Shield, BookOpen, GraduationCap, Users } from "lucide-react";
import { INSTITUTION_INFO } from "../../data/academicContent";

export default function Footer({ onNavigate }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 relative z-10 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-800 flex items-center justify-center">
                <Cpu className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-['Plus_Jakarta_Sans'] font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                Q-CORE
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
              An interactive next-generation engineering education platform exploring the paradigm shift between classical silicon microprocessors and cryogenic quantum computers.
            </p>

            <div className="p-3.5 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 text-xs font-mono text-slate-600 dark:text-slate-400 space-y-1 shadow-xs">
              <div className="text-slate-900 dark:text-white font-bold flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Academic Reference Curriculum:
              </div>
              <div>{INSTITUTION_INFO.college}</div>
              <div>{INSTITUTION_INFO.campus}</div>
              <div className="text-blue-600 dark:text-blue-400 font-semibold">{INSTITUTION_INFO.subject}</div>
            </div>
          </div>

          {/* Student Team Credits (Exact from Slide 1) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
              <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
              Presentation Authors (SE Computer B)
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {INSTITUTION_INFO.students.map((st) => (
                <div key={st.roll} className="p-2.5 rounded-xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-white/10 shadow-xs">
                  <div className="font-bold text-slate-900 dark:text-white">{st.name}</div>
                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-semibold">Roll: {st.roll}</div>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Second Year B.Tech • Division: B • Dept. of Computer Engineering
            </p>
          </div>

          {/* Quick Syllabus Nav Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Quick Navigation
            </h4>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-400">
              {[
                { id: "hero", label: "Overview" },
                { id: "presentation", label: "PPT Deck" },
                { id: "timeline", label: "Timeline" },
                { id: "classical", label: "Classical CPU" },
                { id: "quantum", label: "Quantum QPU" },
                { id: "labs", label: "Virtual Labs" },
                { id: "comparison", label: "Comparison" },
                { id: "benchmarks", label: "Benchmarks" },
                { id: "quiz", label: "Certification" }
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className="text-left hover:text-blue-600 dark:hover:text-blue-400 transition-colors py-0.5"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Disclaimer */}
        <div className="border-t border-slate-200 dark:border-white/10 pt-8 flex flex-wrap items-center justify-between gap-4 text-xs font-mono text-slate-500 dark:text-slate-400">
          <div>
            © 2026 Q-CORE. Developed for educational demonstration at Dr. D. Y. Patil College of Engineering and Innovation.
          </div>
          <div className="flex items-center gap-4">
            <span className="text-blue-600 dark:text-blue-400 font-semibold">WebGL / Three.js 3D</span>
            <span className="text-indigo-600 dark:text-indigo-400 font-semibold">React 19 + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
