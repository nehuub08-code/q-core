# Q-CORE: Quantum vs Classical Microprocessor Educational Experience

[![React](https://img.shields.io/badge/React-19.2-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-8.3-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Three.js](https://img.shields.io/badge/Three.js-WebGL-black?logo=three.js)](https://threejs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Live Educational Web Application:** [https://nehuub08-code.github.io/q-core/](https://nehuub08-code.github.io/q-core/)

---

## 🏛️ Academic Institutional Attribution

This industry-grade interactive educational platform was developed based on the academic presentation and curriculum for:

* **Institute:** Dr. D. Y. Patil Educational Federation's **DR. D. Y. PATIL COLLEGE OF ENGINEERING AND INNOVATION**, Varale, Talegaon, Pune Campus
* **Affiliation:** Savitribai Phule Pune University (Autonomous Institute, NAAC 'A' Grade)
* **Department:** Department of Computer Engineering
* **Subject:** Computer Architecture and Organization
* **Class:** Second Year B.Tech (SE), Division: B
* **Student Author Team:**
  1. **Neha Borkar** (Roll No: 12242)
  2. **Mayuri Mundkar** (Roll No: 12234)
  3. **Janvhi Patil** (Roll No: 12255)
  4. **Vedika Karlekar** (Roll No: 12210)

---

## 🚀 Key Modules & Capabilities

### 1. 📽️ Presentation Deck (1:1 Slide Alignment)
* High-resolution 16:9 interactive cinema slide deck reproducing all 9 slides from the college curriculum.
* Includes both **Presentation Mode** (with keyboard navigation & auto-play) and **All Slides Grid Mode**.
* Direct download links for both the original `.pptx` and `.pdf` presentation files.

### 2. 🌌 3D Interactive Morphing Core (Hero Section)
* Rotating 3D WebGL centerpiece using Three.js & React Three Fiber.
* Smoothly toggles between a **Classical Silicon CMOS CPU Die** (heatspreader, pins, copper fins, bus traces) and a **Superconducting QPU Chip** (cryogenic cold plate, transmon resonators, microwave coaxial feeds, entanglement wave fields).

### 3. ⏳ Evolution Timeline
* Interactive horizontal milestone scrubber from 1940s Vacuum Tubes (ENIAC) to discrete transistors, integrated circuits, microprocessors (Intel 4004), multi-core supercomputing, and quantum transmon computing.

### 4. 💻 Classical Microprocessor Module
* **Section A — 3D Architecture:** Interactive 3D motherboard die with clickable component hotspots for the Arithmetic Logic Unit (ALU), Control Unit (CU), Registers, Cache, and System Bus.
* **Section B — Working Simulator:** Live animated implementation of the **Fetch → Decode → Execute → Store** cycle (Slide 2).
* **Curriculum Summary:** Exact 5 advantages and 5 limitations from Slide 4, and 8 application domains from Slide 3.

### 5. ⚛️ Quantum Microprocessor Module
* **3D Dilution Refrigerator Stage:** Sub-Kelvin cryogenic cross-section view from outer 50K shield down to the 15 mK mixing chamber.
* **3D Bloch Sphere Simulator:** Interactive single-qubit pure state visualizer with $\theta$ and $\phi$ polar sliders, live Born's rule probability bars ($P(|0\rangle) = |\alpha|^2$, $P(|1\rangle) = |\beta|^2$), live state equation updates, and projective wavefunction collapse simulator.
* **Quantum Pipeline Flowchart:** Interactive 7-step pipeline from Slide 5 (`Input Data → Qubits → Superposition & Entanglement → Quantum Gates → Processing → Measurement → Output`).

### 6. 🧪 4 Virtual Laboratories (Flagship Suites)
* **Lab 01 — CPU Execution Lab:** Custom student register inputs (R1, R2 in dec/bin/hex), opcode selector (ADD, SUB, AND, OR, XOR), bit-by-bit ALU computation, carry flag, zero flag, and sign flag updates.
* **Lab 02 — Qubit State Lab (IBM Quantum Style):** Single-qubit state preparation, Hadamard/Pauli-X/Pauli-Z gate pulses, and 1,024-shot statistical measurement histogram.
* **Lab 03 — Quantum Circuit Builder:** Multi-qubit circuit grid ($q_0, q_1$) with gate placement (H, X, Y, Z, CNOT, Measure), playhead laser animation, circuit depth counter, and Bell state synthesis.
* **Lab 04 — Cryogenic Cooling Simulator:** Thermal dilution refrigerator simulation from 0.015 K to 300 K. Watch thermal noise increase, Cooper pairs break at $T_c \approx 1.2\text{ K}$, and qubits decohere into noisy classical resistors.

### 7. ⚖️ Comparison Center & Performance Benchmarks
* **Comparison Wheel:** Rotary selector covering all 7 official criteria from Slide 8 (Basic Unit, State Principle, Processing Style, Speed, Error Rate, Operating Conditions, Maturity).
* **Performance Benchmark Dashboard:** Dynamic Recharts graphs comparing Classical vs Quantum algorithms across Database Search (Linear vs Grover), RSA Cryptography (GNFS vs Shor), Molecular Chemistry (FCI vs VQE), and Combinatorial Optimization (Branch & Bound vs QAOA).

### 8. 🤖 Q-TUTOR: AI Architecture Assistant
* Floating cyber-orb assistant with:
  * Section-aware contextual explanations
  * Simple Everyday Analogies (ELI5 Mode)
  * **Hindi / Hinglish Bilingual Mode** tailored for Indian engineering students
  * **Voice Narration** via the browser's Web Speech API
  * Dynamic practice MCQ generator and doubt resolution

### 9. 🏆 3-Tier Assessment & Certification
* **Level 1 (Easy):** Conceptual Multiple Choice Questions from the PPT curriculum.
* **Level 2 (Medium):** Component & Function Matching matrix challenge.
* **Level 3 (Hard):** Micro-Architecture CPU Cycle ordering & Quantum Bell state circuit construction.
* **Personalized Certificate of Completion:** Displays student's name, college honours, accuracy %, rank, and download/print capability with celebratory confetti.

---

## 🛠️ Local Development & Setup

### Prerequisites
* **Node.js**: v18.0 or higher (v20+ recommended)
* **npm**: v9.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/nehuub08-code/q-core.git

# Navigate to project directory
cd q-core

# Install dependencies (using legacy-peer-deps for React 19 Three.js compatibility)
npm install --legacy-peer-deps

# Start local development server
npm run dev
```

Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### Production Build

```bash
npm run build
```

---

## 📜 Academic Credits & License

Created for academic presentation and educational instruction under the curriculum of Savitribai Phule Pune University (SPPU) at Dr. D. Y. Patil College of Engineering and Innovation.

Licensed under the [MIT License](LICENSE).
