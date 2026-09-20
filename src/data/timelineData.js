export const CLASSICAL_TIMELINE = [
  {
    year: "1940s",
    title: "Vacuum Tubes",
    era: "First Generation Computing",
    subtitle: "Thermionic Valves & ENIAC",
    color: "#D97706",
    icon: "Radio",
    description: "Computing began with glass vacuum tubes controlling electrical current through a thermionic vacuum. Massive machines like ENIAC required thousands of tubes, consumed kilowatts of power, and generated intense heat.",
    specs: [
      { label: "Switching Speed", value: "Kilohertz (kHz)" },
      { label: "Size per bit", value: "~10-15 cm" },
      { label: "Failure Rate", value: "Tubes burned out every few hours" },
      { label: "Key Example", value: "ENIAC (1945), 18,000 tubes" }
    ],
    breakthrough: "Proved that electronic binary logic calculation was possible without mechanical gears."
  },
  {
    year: "1947 - 1950s",
    title: "Discrete Transistors",
    era: "Second Generation Computing",
    subtitle: "Solid-State Silicon Revolution",
    color: "#059669",
    icon: "Zap",
    description: "Invented at Bell Labs by Bardeen, Brattain, and Shockley. Transistors replaced delicate glass tubes with solid semiconductor crystals (Germanium and Silicon), dramatically shrinking computers and boosting reliability.",
    specs: [
      { label: "Switching Speed", value: "Megahertz (MHz)" },
      { label: "Size per bit", value: "~1 cm" },
      { label: "Power Draw", value: "Milliwatts per switch" },
      { label: "Key Example", value: "IBM 7090 Transistor Mainframe" }
    ],
    breakthrough: "Eliminated vacuum tube warm-up times, burnout, and extreme power waste."
  },
  {
    year: "1958 - 1960s",
    title: "Integrated Circuits",
    era: "Third Generation Computing",
    subtitle: "Planar Silicon Monoliths",
    color: "#0284C7",
    icon: "Layers",
    description: "Jack Kilby (Texas Instruments) and Robert Noyce (Fairchild) placed multiple interconnected transistors, resistors, and capacitors onto a single piece of semiconductor silicon wafer.",
    specs: [
      { label: "Transistor Count", value: "Tens to thousands per chip" },
      { label: "Integration", value: "SSI to MSI (Small/Medium Scale)" },
      { label: "Significance", value: "Gave birth to Silicon Valley" },
      { label: "Key Example", value: "Apollo Guidance Computer (AGC)" }
    ],
    breakthrough: "Enabled miniaturized guidance systems that navigated the Apollo moon landings."
  },
  {
    year: "1971 - 1990s",
    title: "Microprocessors",
    era: "Fourth Generation Computing",
    subtitle: "Single-Chip CPU Architecture",
    color: "#2563EB",
    icon: "Cpu",
    description: "The entire Central Processing Unit (ALU, Control Unit, Registers) was condensed onto a single silicon die. Led by Federico Faggin, Ted Hoff, and Stan Mazor at Intel with the iconic 4004 and 8086.",
    specs: [
      { label: "Clock Frequency", value: "740 kHz (4004) to 300+ MHz" },
      { label: "Data Width", value: "4-bit to 32-bit architecture" },
      { label: "Transistors", value: "2,300 (4004) to millions (Pentium)" },
      { label: "Key Example", value: "Intel 4004 (1971), 8086 (1978)" }
    ],
    breakthrough: "Standardized the Fetch-Decode-Execute von Neumann pipeline on personal computers."
  },
  {
    year: "2000s - 2020s",
    title: "Multi-Core & Supercomputing",
    era: "Modern Classical Peak",
    subtitle: "Gigahertz Parallelism & FinFETs",
    color: "#4F46E5",
    icon: "Server",
    description: "Thermal limits (the 'Power Wall' and breakdown of Dennard scaling) forced architects to transition from raw clock frequency increases to multi-core parallelism, hyperthreading, and advanced 3nm EUV lithography.",
    specs: [
      { label: "Transistor Count", value: "Over 100 Billion transistors" },
      { label: "Clock Frequency", value: "3.5 GHz to 5.8 GHz" },
      { label: "Bottleneck", value: "Von Neumann Memory Wall & Heat" },
      { label: "Key Example", value: "AMD EPYC, Apple M-Series, Intel Core" }
    ],
    breakthrough: "Billions of nanometer-scale transistors running billions of calculations per second."
  }
];

export const QUANTUM_TIMELINE = [
  {
    year: "1981",
    title: "Feynman's Vision",
    era: "Theoretical Foundations",
    subtitle: "Simulating Physics with Quantum Mechanics",
    color: "#D97706",
    icon: "Radio",
    description: "Nobel laureate Richard Feynman famously noted that classical computers cannot efficiently simulate quantum mechanical systems. He proposed designing machines based on quantum physics itself.",
    specs: [
      { label: "Core Concept", value: "Quantum Hamiltonian Simulation" },
      { label: "Nature", value: "Theoretical physics keynote" },
      { label: "Key Paper", value: "Simulating Physics with Computers (1982)" },
      { label: "Key Figure", value: "Richard Feynman & Paul Benioff" }
    ],
    breakthrough: "Established that quantum phenomena could be harnessed directly for computational advantage."
  },
  {
    year: "1994 - 1996",
    title: "Quantum Algorithms",
    era: "Algorithmic Discovery",
    subtitle: "Shor's & Grover's Speedups",
    color: "#059669",
    icon: "Zap",
    description: "Peter Shor published a polynomial-time quantum algorithm to factor large prime integers, threatening RSA cryptography. Lov Grover followed with a quadratic search acceleration algorithm.",
    specs: [
      { label: "Factoring Speed", value: "Polynomial O((log N)^3)" },
      { label: "Search Speed", value: "Quadratic O(sqrt(N))" },
      { label: "Impact", value: "Proved commercial & cybersecurity value" },
      { label: "Key Example", value: "Shor's Algorithm (1994), Grover's (1996)" }
    ],
    breakthrough: "Mathematically proved that quantum computing can achieve exponential speedup over classical algorithms."
  },
  {
    year: "1998 - 2000s",
    title: "First Physical Qubits",
    era: "Laboratory Experimental Stage",
    subtitle: "NMR & Superconducting Transmons",
    color: "#0284C7",
    icon: "Layers",
    description: "Researchers built the first 2-qubit working processors using Nuclear Magnetic Resonance (NMR) and cavity quantum electrodynamics. In 2007, Yale introduced the transmon qubit, solving charge noise.",
    specs: [
      { label: "Qubit Count", value: "2 to 7 physical qubits" },
      { label: "Coherence Time", value: "Nanoseconds to microseconds" },
      { label: "Cooling Tech", value: "Dilution Refrigerators (15 mK)" },
      { label: "Key Example", value: "Yale Transmon Resonator (2007)" }
    ],
    breakthrough: "Transitioned quantum mechanics from abstract mathematical formulas into tangible solid-state hardware."
  },
  {
    year: "2019",
    title: "Quantum Supremacy",
    era: "NISQ Era (Noisy Intermediate Scale)",
    subtitle: "Google Sycamore 53-Qubit Processor",
    color: "#2563EB",
    icon: "Atom",
    description: "Google's 53-qubit superconducting Sycamore chip performed a specific random circuit sampling benchmark in 200 seconds that would take the world's fastest supercomputer thousands of years.",
    specs: [
      { label: "Physical Qubits", value: "53 Superconducting Transmons" },
      { label: "Execution Time", value: "200 seconds" },
      { label: "Two-Qubit Error", value: "~0.6% gate fidelity" },
      { label: "Key Example", value: "Google Sycamore (Nature 2019)" }
    ],
    breakthrough: "First experimental demonstration of quantum computational advantage over classical supercomputing."
  },
  {
    year: "2024 - Beyond",
    title: "Fault-Tolerant & Logical QPUs",
    era: "Commercial Utility Era",
    subtitle: "Quantum Error Correction (QEC)",
    color: "#7C3AED",
    icon: "Cpu",
    description: "IBM Heron (133 qubits with tunable couplers) and Harvard/QuEra neutral atom arrays demonstrated logical error-corrected qubits, moving quantum technology toward production enterprise utility.",
    specs: [
      { label: "Logical Qubits", value: "48+ error-corrected logical qubits" },
      { label: "Gate Fidelity", value: "Exceeding 99.9% 2-qubit thresholds" },
      { label: "Applications", value: "VQE chemistry, material science, PQC" },
      { label: "Key Example", value: "IBM Heron / Condor, Harvard QEC" }
    ],
    breakthrough: "Mitigating quantum decoherence with surface codes to enable deep fault-tolerant quantum algorithms."
  }
];

export const TIMELINE_MILESTONES = [
  ...CLASSICAL_TIMELINE,
  QUANTUM_TIMELINE[3]
];
