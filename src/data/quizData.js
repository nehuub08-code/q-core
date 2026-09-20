export const QUIZ_LEVELS = [
  {
    level: 1,
    name: "Level 1: Academic Fundamentals (MCQ)",
    description: "Multiple choice questions based on core definitions, working, advantages, and applications from the curriculum.",
    type: "mcq",
    questions: [
      // Classical Questions
      {
        id: "qc1",
        type: "classical",
        question: "What basic unit does a classical microprocessor use, and what states can it hold?",
        options: [
          "Qubit – holds 0, 1, or both simultaneously",
          "Bit – holds either 0 or 1",
          "Trit – holds -1, 0, or 1",
          "Byte – holds 8 states simultaneously"
        ],
        correct: 1,
        explanation: "As stated in Slides 2 & 8: A classical microprocessor works using binary bits that hold either 0 or 1 at any given moment."
      },
      {
        id: "qc2",
        type: "classical",
        question: "What is the correct 4-stage execution cycle continuously followed by a classical microprocessor?",
        options: [
          "Superposition → Entanglement → Measurement",
          "Fetch → Decode → Execute → Store",
          "Read → Compile → Link → Run",
          "Encode → Transmit → Decrypt → Verify"
        ],
        correct: 1,
        explanation: "Slide 2: The classical microprocessor follows the continuous Fetch → Decode → Execute → Store cycle."
      },
      {
        id: "qc3",
        type: "classical",
        question: "Which component of the classical microprocessor decodes the fetched instruction?",
        options: [
          "Arithmetic Logic Unit (ALU)",
          "Control Unit (CU)",
          "Instruction Register only",
          "System Bus"
        ],
        correct: 1,
        explanation: "Slide 2: 'Decode: The Control Unit decodes the instruction into micro-operations.'"
      },
      {
        id: "qc4",
        type: "classical",
        question: "Which of the following is a primary disadvantage of classical microprocessors mentioned in Slide 4?",
        options: [
          "Very high sensitivity to room-temperature ambient noise",
          "Cannot perform quantum-level computations & slows exponentially on large combinatorial problems",
          "Requires liquid helium dilution refrigerators to operate",
          "High error rate and decoherence within microseconds"
        ],
        correct: 1,
        explanation: "Slide 4: Disadvantages of classical microprocessors include limited processing speed, exponential slowdown on combinatorial searches, and inability to perform quantum-level simulations."
      },

      // Quantum Questions
      {
        id: "qq1",
        type: "quantum",
        question: "What quantum mechanical principles allow quantum microprocessors to process $2^N$ states simultaneously?",
        options: [
          "Silicon doping & pipelining",
          "Superposition & Entanglement",
          "Von Neumann memory caching",
          "Overclocking & liquid metal cooling"
        ],
        correct: 1,
        explanation: "Slides 7 & 8: Quantum microprocessors utilize superposition and entanglement to represent and evaluate $2^N$ basis states simultaneously."
      },
      {
        id: "qq2",
        type: "quantum",
        question: "Under what operating conditions do superconducting quantum microprocessors typically function?",
        options: [
          "Room temperature (20°C - 25°C)",
          "Dry desert heat (50°C)",
          "Near absolute zero in a dilution refrigerator (~15 mK)",
          "Household deep freezer (-18°C)"
        ],
        correct: 2,
        explanation: "Slide 8: Superconducting quantum microprocessors require extreme cryogenic cooling near absolute zero (~15 milliKelvin) to prevent thermal noise from causing qubit decoherence."
      },
      {
        id: "qq3",
        type: "quantum",
        question: "Which quantum algorithm provides an exponential speedup for factoring large integers and discrete logarithms?",
        options: [
          "Grover's Search Algorithm",
          "Shor's Factoring Algorithm",
          "Dijkstra's Shortest Path Algorithm",
          "Quicksort Partition Algorithm"
        ],
        correct: 1,
        explanation: "Slides 6 & 8: Shor's algorithm provides exponential speedup for prime factorization, fundamentally threatening classical RSA cryptography."
      },
      {
        id: "qq4",
        type: "quantum",
        question: "What does the No-Cloning Theorem state regarding quantum information?",
        options: [
          "Qubits can be copied infinitely fast across fiber cables",
          "An unknown quantum state cannot be duplicated identically",
          "Quantum circuits cannot use Hadamard gates consecutively",
          "Quantum memory cannot be cleared after measurement"
        ],
        correct: 1,
        explanation: "Slide 6: The No-Cloning Theorem proves that an arbitrary unknown quantum state cannot be cloned, providing the physical foundation for tamper-evident Quantum Key Distribution (QKD)."
      }
    ]
  },
  {
    level: 2,
    name: "Level 2: Component Architecture Match (Medium)",
    description: "Pair each architectural component to its exact physical function in classical and quantum hardware.",
    type: "matching",
    pairs: [
      // Classical
      {
        id: "m1",
        component: "ALU (Arithmetic Logic Unit)",
        match: "Performs arithmetic (ADD/SUB) and logical (AND/OR/XOR) operations",
        type: "classical"
      },
      {
        id: "m2",
        component: "Control Unit (CU)",
        match: "Decodes instructions and orchestrates machine execution timing",
        type: "classical"
      },
      {
        id: "m3",
        component: "CPU General Registers",
        match: "Ultra-fast on-die memory for temporary storage of operands and results",
        type: "classical"
      },
      {
        id: "m4",
        component: "System Bus (Address & Data)",
        match: "Carries memory addresses, instruction words, and data signals across motherboard",
        type: "classical"
      },

      // Quantum
      {
        id: "m5",
        component: "Transmon Qubit",
        match: "Superconducting Josephson junction storing state |ψ⟩ = α|0⟩ + β|1⟩",
        type: "quantum"
      },
      {
        id: "m6",
        component: "Dilution Refrigerator",
        match: "Cools the quantum chip to 15 mK to eliminate ambient thermal noise",
        type: "quantum"
      },
      {
        id: "m7",
        component: "Hadamard Gate (H)",
        match: "Puts a base computational qubit (|0⟩) into equal superposition (|0⟩+|1⟩)/√2",
        type: "quantum"
      },
      {
        id: "m8",
        component: "CNOT Entangling Coupler",
        match: "Inverts target qubit conditional on control qubit to create quantum entanglement",
        type: "quantum"
      }
    ]
  },
  {
    level: 3,
    name: "Level 3: Micro-Architecture & Circuit Construction (Hard)",
    description: "Assemble the classical instruction cycle in correct sequence or configure the quantum circuit to generate an entangled Bell state.",
    type: "interactive",
    challenges: [
      {
        id: "c1",
        type: "classical",
        title: "Classical Challenge: Sequence the Von Neumann Cycle",
        prompt: "Click or drag the operational steps to order the 4-phase classical microprocessor cycle correctly according to Slide 2.",
        correctOrder: ["Fetch", "Decode", "Execute", "Store"],
        scrambled: ["Execute", "Store", "Fetch", "Decode"],
        hints: "1. Load instruction from memory, 2. Control unit decodes, 3. ALU calculates, 4. Result saved to register/memory."
      },
      {
        id: "c2",
        type: "quantum",
        title: "Quantum Challenge: Synthesize a Maximally Entangled Bell State",
        prompt: "Configure a 2-qubit circuit to produce the maximally entangled Bell state: (|00⟩ + |11⟩) / √2.",
        targetState: "(|00⟩ + |11⟩) / √2",
        qubit0GatesRequired: ["H"],
        qubit1GatesRequired: [],
        multiQubitGateRequired: "CNOT(q0 -> q1)",
        explanation: "Applying a Hadamard gate on q0 creates (|0⟩+|1⟩)/√2. Then a CNOT with q0 as control and q1 as target creates the entangled state (|00⟩+|11⟩)/√2."
      }
    ]
  }
];
