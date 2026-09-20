import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { sound } from "../../utils/audioEffects";
import SectionModeToggle from "../common/SectionModeToggle";
import {
  Brain,
  ShieldCheck,
  Dna,
  CloudRain,
  Bot,
  TrendingUp,
  Rocket,
  X,
  ArrowRight,
  Cpu,
  Atom,
  CheckCircle2,
  Smartphone,
  Car,
  Activity,
  Radio,
  Tv,
  Factory,
  Layers,
  Sparkles
} from "lucide-react";

export default function ApplicationsGallery() {
  const [mode, setMode] = useState("classical");
  const [selectedApp, setSelectedApp] = useState(null);

  // Slide 3: Classical Microprocessors Applications
  const classicalApplications = [
    {
      id: "personal_computing",
      title: "Personal Computers & Laptops",
      category: "Desktop & Workstation Architecture",
      icon: Cpu,
      color: "#2563EB",
      summary: "Powers operating systems, productivity software, web browsers, and high-performance multi-threaded software execution.",
      detail: "x86-64 and ARM processors utilize out-of-order execution, multi-level caches (L1/L2/L3), and multi-core parallelism to handle simultaneous desktop workloads with deterministic response times.",
      curriculumRef: "Slide 3: Personal computers and laptops rely on classical microprocessors for all OS scheduling, user interface rendering, and general-purpose computational tasks.",
      hardwareSpecs: "Clock: 3.5 - 5.5 GHz | Cores: 8 - 64 cores | Cache: Up to 96MB L3 | Instruction Sets: x86-64, ARMv9"
    },
    {
      id: "smartphones",
      title: "Smartphones & Mobile Devices",
      category: "Ultra-Low Power Mobile SoCs",
      icon: Smartphone,
      color: "#0284C7",
      summary: "Energy-efficient ARM-based microprocessors driving modern mobile operating systems (Android, iOS) and cellular basebands.",
      detail: "Utilizes heterogeneous big.LITTLE architectures balancing high-performance cores for gaming with energy-saving cores for background syncing, yielding multi-day battery life.",
      curriculumRef: "Slide 3: Smartphones and tablets represent the highest-volume deployment of classical microprocessors globally.",
      hardwareSpecs: "Architecture: ARM big.LITTLE | Power: 3 - 7 Watts | Transistors: 15+ Billion (3nm node)"
    },
    {
      id: "automotive",
      title: "Automotive Electronic Control Units (ECUs)",
      category: "Safety-Critical Embedded Systems",
      icon: Car,
      color: "#EA580C",
      summary: "Real-time engine management, Anti-lock Braking Systems (ABS), airbag deployment, and Advanced Driver Assistance (ADAS).",
      detail: "Hard real-time microcontrollers (e.g. Infineon TriCore, NXP S32) execute deterministic sub-millisecond control loops meeting ISO 26262 ASIL-D automotive safety integrity levels.",
      curriculumRef: "Slide 3: Modern vehicles contain between 50 to 150 classical microprocessors controlling powertrain, safety, and infotainment.",
      hardwareSpecs: "Standards: ISO 26262 ASIL-D | Latency: < 100 μs deterministic | Temp Range: -40°C to +125°C"
    },
    {
      id: "industrial_automation",
      title: "Industrial Automation & Robotics",
      category: "Manufacturing & SCADA Control",
      icon: Factory,
      color: "#D97706",
      summary: "Programmable Logic Controllers (PLCs), robotic assembly arms, machine vision, and real-time conveyor synchronization.",
      detail: "Ruggedized industrial microprocessors run fieldbus protocols (EtherCAT, PROFINET) with cycle times under 250 microseconds, ensuring precision manufacturing tolerances.",
      curriculumRef: "Slide 3: Assembly lines, automated warehouses, and CNC machinery are governed by classical real-time microprocessors.",
      hardwareSpecs: "Protocols: EtherCAT, Modbus, PROFINET | Cycle Jitter: < 1 μs | MTBF: > 200,000 hours"
    },
    {
      id: "medical_devices",
      title: "Medical Diagnostic Equipment",
      category: "Biomedical & Life Support",
      icon: Activity,
      color: "#059669",
      summary: "Digital MRI consoles, heart rate monitors, pacemakers, infusion pumps, and surgical robotic feedback controllers.",
      detail: "High-reliability microprocessors perform fast Fourier transforms (FFT) on biopotential signals and implement fail-safe redundant execution channels for patient safety.",
      curriculumRef: "Slide 3: Medical devices demand 100% deterministic classical execution where computation errors cannot be tolerated.",
      hardwareSpecs: "Safety Standard: IEC 62304 Class C | Redundancy: Dual-core lockstep | Power: Micro-watts for implants"
    },
    {
      id: "telecom",
      title: "Telecommunications & 5G Routers",
      category: "Network Infrastructure",
      icon: Radio,
      color: "#7C3AED",
      summary: "Packet routing engines, optical transceivers, cellular base station beamforming, and gigabit home switches.",
      detail: "Network processors (NPUs) and RISC cores inspect, route, and encrypt packet headers at multi-terabit speeds with hardware-accelerated QoS prioritization.",
      curriculumRef: "Slide 3: The entire physical Internet infrastructure operates on billions of classical microprocessor packet switchers.",
      hardwareSpecs: "Throughput: 100 Gbps - 1.6 Tbps | Memory: TCAM line-rate lookup | Packet Buffer: High-bandwidth HBM3"
    },
    {
      id: "aerospace",
      title: "Aerospace & Avionics Guidance",
      category: "Radiation-Hardened Mission Systems",
      icon: Rocket,
      color: "#4F46E5",
      summary: "Fly-by-wire flight control computers, Mars rover navigation (RAD750), missile guidance, and satellite payload telemetry.",
      detail: "Radiation-hardened silicon chips engineered with triple modular redundancy (TMR) resist cosmic rays, Single Event Upsets (SEU), and extreme orbital thermal cycles.",
      curriculumRef: "Slide 3: Space missions rely on proven radiation-hardened classical architectures due to verified decades-long reliability.",
      hardwareSpecs: "Rad Hardening: > 100 krad(Si) | Fault Tolerance: Triple Modular Redundancy | Processor: BAE RAD750"
    },
    {
      id: "consumer_electronics",
      title: "Consumer Electronics & Smart Home",
      category: "Everyday IoT & Entertainment",
      icon: Tv,
      color: "#DB2777",
      summary: "Smart 4K TVs, video game consoles, microwave controllers, IoT thermostats, and digital camera image signal processors.",
      detail: "Dedicated image signal processors (ISPs) and system-on-chips decode 4K HDR HEVC video streams in real-time while consuming under 10 Watts.",
      curriculumRef: "Slide 3: Consumer appliances encapsulate everyday embedded microprocessors that automate modern living.",
      hardwareSpecs: "Decoding: 4K 120 FPS AV1/HEVC | Standby Power: < 0.5 Watts | Interface: HDMI 2.1, Wi-Fi 6E"
    }
  ];

  // Slide 6: Quantum Computing Applications
  const quantumApplications = [
    {
      id: "cryptography",
      title: "Cryptography & Security (QKD & Shor)",
      category: "National & Financial Security",
      icon: ShieldCheck,
      color: "#7C3AED",
      summary: "Shor's algorithm can factor large integers exponentially faster than classical computers, threatening RSA while enabling Quantum Key Distribution.",
      detail: "A sufficiently large fault-tolerant quantum computer running Shor's algorithm solves discrete logarithms and prime factorization in polynomial time $O((\\log N)^3)$, rendering RSA-2048 obsolete. Simultaneously, Quantum Key Distribution (QKD) leverages the Heisenberg Uncertainty Principle and No-Cloning Theorem to establish provably unhackable keys.",
      curriculumRef: "Slide 6: Cryptography & Security — Breaking classical encryption via Shor's algorithm and creating unbreakable Quantum Key Distribution.",
      hardwareSpecs: "Algorithm: Shor's Factoring | Quantum Advantage: Exponential | Defense: Post-Quantum NIST Lattice Standards"
    },
    {
      id: "drug_discovery",
      title: "Drug Discovery & Molecular Modeling",
      category: "Quantum Chemistry & Therapeutics",
      icon: Dna,
      color: "#059669",
      summary: "Simulating electron-electron correlations and quantum wavefunctions to accurately model protein folding and synthetic drug synthesis.",
      detail: "Classical supercomputers require approximations because simulating a 100-electron molecule requires more memory states than atoms in the visible universe ($2^{100}$). Quantum processors natively simulate quantum molecular Hamiltonians using the Variational Quantum Eigensolver (VQE) algorithm.",
      curriculumRef: "Slide 6: Drug Discovery & Molecular Modeling — Simulating complex molecular structures and chemical reactions at the atomic level.",
      hardwareSpecs: "Algorithm: VQE / Quantum Phase Estimation | Target: FeMoco nitrogenase & cancer targeting proteins"
    },
    {
      id: "optimization",
      title: "Complex Global Optimization",
      category: "Logistics, Swarms & Supply Chains",
      icon: Brain,
      color: "#2563EB",
      summary: "Solving NP-hard combinatorial optimization challenges such as the Traveling Salesperson, global airline scheduling, and supply chains.",
      detail: "Quantum Approximate Optimization Algorithm (QAOA) and Quantum Annealing explore vast combinatorial configuration spaces through quantum tunneling, traversing high potential barriers that trap classical heuristic search algorithms.",
      curriculumRef: "Slide 6: Optimization Problems — Finding optimal routes, logistics scheduling, and supply chain management.",
      hardwareSpecs: "Algorithm: QAOA, Quantum Annealing | Speedup: Polynomial to Exponential over classical simulated annealing"
    },
    {
      id: "financial_modeling",
      title: "Financial Risk & Portfolio Optimization",
      category: "Quantitative Finance & Arbitrage",
      icon: TrendingUp,
      color: "#EA580C",
      summary: "Quantum Amplitude Estimation accelerates Monte Carlo derivative pricing and portfolio value-at-risk (VaR) calculations with quadratic speedup.",
      detail: "Where classical Monte Carlo requires $10^8$ sample trajectories to calculate a financial derivative's payoff with precision $\\epsilon$ ($O(1/\\epsilon^2)$), Quantum Amplitude Estimation achieves the same precision with only $O(1/\\epsilon)$ circuit evaluations.",
      curriculumRef: "Slide 6: Financial Modeling — Portfolio optimization, risk analysis, and fraud detection at scale.",
      hardwareSpecs: "Speedup: Quadratic $O(N) \\to O(\\sqrt{N})$ | Applications: Credit default swaps, high-frequency arbitrage"
    },
    {
      id: "quantum_ml",
      title: "Quantum Machine Learning (QML)",
      category: "Next-Gen AI & Kernel Estimation",
      icon: Bot,
      color: "#DB2777",
      summary: "Quantum Neural Networks (QNN) and quantum kernels project complex data into exponentially large Hilbert spaces for superior classification.",
      detail: "Parametrized quantum circuits act as variational machine learning models. By encoding classical data vectors into high-dimensional quantum states, quantum kernel methods can identify non-linear relationships that classical deep neural networks miss.",
      curriculumRef: "Slide 6: Machine Learning & AI — Training AI models exponentially faster and uncovering hidden patterns in massive datasets.",
      hardwareSpecs: "Frameworks: Qiskit Machine Learning, PennyLane | Advantage: High-dimensional Hilbert space separation"
    },
    {
      id: "materials_science",
      title: "Materials Science & Climate Catalysts",
      category: "Atmospheric & Energy Physics",
      icon: CloudRain,
      color: "#0284C7",
      summary: "Designing high-temperature room-temperature superconductors, next-gen lithium-sulfur batteries, and industrial carbon capture catalysts.",
      detail: "Modeling the Haber-Bosch nitrogenase enzyme (FeMoco) on a quantum processor could unlock energy-efficient synthetic fertilizers (currently responsible for 2% of global greenhouse emissions). Simulating quantum lattice Hamiltonians unlocks novel solid-state battery electrolytes.",
      curriculumRef: "Slide 6: Materials Science — Developing room-temperature superconductors and carbon capture technologies.",
      hardwareSpecs: "Impact: 2% global energy savings via room-temp fertilizer catalysis | Quantum State: Strongly correlated electrons"
    }
  ];

  const currentList = mode === "classical" ? classicalApplications : quantumApplications;

  const handleOpen = (app) => {
    sound.playQuantumBeep();
    setSelectedApp(app);
  };

  const handleClose = () => {
    sound.playClick();
    setSelectedApp(null);
  };

  return (
    <section id="applications" className="py-24 relative bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-semibold tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            Curriculum Applications (Slides 3 & 6)
          </div>
          <h2 className="font-['Plus_Jakarta_Sans'] font-extrabold text-3xl sm:text-4xl text-slate-900 tracking-tight">
            Real-World Industry Applications
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Toggle between Classical Microprocessor applications running today's world (Slide 3) and Quantum Computing breakthroughs shaping the future (Slide 6).
          </p>
        </div>

        {/* Executive Section Mode Toggle */}
        <SectionModeToggle
          mode={mode}
          onModeChange={setMode}
          classicalCount="8 Domains (Slide 3)"
          quantumCount="6 Frontiers (Slide 6)"
        />

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {currentList.map((app) => {
            const Icon = app.icon;
            return (
              <button
                key={app.id}
                onClick={() => handleOpen(app)}
                className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-blue-500 text-left transition-all duration-200 group flex flex-col justify-between hover:-translate-y-1 relative overflow-hidden shadow-xs hover:shadow-md"
              >
                <div className="space-y-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: `${app.color}15`, border: `1px solid ${app.color}35` }}
                  >
                    <Icon className="w-6 h-6" style={{ color: app.color }} />
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 block mb-1">
                      {app.category}
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {app.title}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {app.summary}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold" style={{ color: app.color }}>
                  <span>Inspect Academic Details</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {/* Fullscreen Interactive Modal */}
        <AnimatePresence>
          {selectedApp && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md"
              onClick={handleClose}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 max-w-2xl w-full relative space-y-6 shadow-2xl"
              >
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute top-5 right-5 p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-500 hover:text-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: `${selectedApp.color}15`, border: `1px solid ${selectedApp.color}35` }}
                  >
                    <selectedApp.icon className="w-6 h-6" style={{ color: selectedApp.color }} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-blue-600">
                      {selectedApp.category}
                    </span>
                    <h3 className="font-['Plus_Jakarta_Sans'] text-xl sm:text-2xl font-extrabold text-slate-900">
                      {selectedApp.title}
                    </h3>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800 block">
                      Curriculum Reference & Context
                    </span>
                    <p className="text-xs text-slate-700 leading-relaxed font-medium">
                      {selectedApp.curriculumRef}
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                      Technical Architecture & Implementation
                    </h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {selectedApp.detail}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                    <div className="font-bold text-slate-900 text-[11px]">Hardware Specifications & Benchmarks:</div>
                    <div className="text-slate-600">{selectedApp.hardwareSpecs}</div>
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={handleClose}
                    className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold transition-all shadow-xs"
                  >
                    Close Overview
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
