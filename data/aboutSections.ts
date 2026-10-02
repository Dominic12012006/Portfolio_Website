export interface AboutSection {
  id: string;
  index: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  coordinate: string;
}

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    id: "architecture",
    index: "01",
    title: "Systems & Architecture",
    tagline: "Distributed foundations, deterministic pipelines & clean abstractions.",
    description:
      "Designing resilient software architectures that balance high throughput with minimal cognitive complexity. Focused on explicit state transitions, strict type safety, and modularity.",
    tags: ["Distributed Systems", "TypeScript", "State Machines", "Modular Design"],
    coordinate: "SEC // 01 [000° - 045°]",
  },
  {
    id: "computation",
    index: "02",
    title: "Creative Computation",
    tagline: "Shaders, procedural synthesis & GPU-accelerated graphics.",
    description:
      "Exploring the convergence of mathematics, physics, and visual aesthetics through WebGL, GLSL fragment shaders, and custom rasterization algorithms.",
    tags: ["WebGL / OGL", "GLSL Shaders", "Procedural Math", "Rasterization"],
    coordinate: "SEC // 02 [045° - 090°]",
  },
  {
    id: "interfaces",
    index: "03",
    title: "Spatial & Kinetic UI",
    tagline: "Sub-pixel tactile feedback, micro-gestures & spatial composition.",
    description:
      "Crafting interfaces that behave like responsive physical objects. Prioritizing tactile motion, fluid spring curves, accessibility, and typographic poise.",
    tags: ["Spatial Layouts", "Kinetic Physics", "Fluid Gestures", "A11y"],
    coordinate: "SEC // 03 [090° - 135°]",
  },
  {
    id: "autonomy",
    index: "04",
    title: "Intelligent Agents",
    tagline: "Autonomous workflows, structured inference & deterministic tool use.",
    description:
      "Engineering agentic architectures that orchestrate multi-step code generation, automated verification pipelines, and intelligent pair-programming environments.",
    tags: ["Agentic Systems", "Tool Calling", "Structured Outputs", "Verification"],
    coordinate: "SEC // 04 [135° - 180°]",
  },
  {
    id: "performance",
    index: "05",
    title: "Precision & Performance",
    tagline: "Zero bundle waste, 60fps rendering budgets & low-latency execution.",
    description:
      "Relentlessly profiling Core Web Vitals, memory lifecycles, and rendering pipelines to ensure butter-smooth frame rates and negligible battery consumption.",
    tags: ["CWV / INP", "Memory Profiling", "Zero Bloat", "Frame Budgets"],
    coordinate: "SEC // 05 [180° - 225°]",
  },
  {
    id: "infrastructure",
    index: "06",
    title: "Cloud & Edge Runtimes",
    tagline: "Global edge computing, containerization & autonomous deployment.",
    description:
      "Deploying distributed web infrastructure to low-latency edge networks with reproducible build pipelines, environment isolation, and declarative security.",
    tags: ["Edge Runtimes", "CI/CD Workflows", "Containerization", "Linux"],
    coordinate: "SEC // 06 [225° - 270°]",
  },
  {
    id: "philosophy",
    index: "07",
    title: "Digital Discipline",
    tagline: "Minimalism over noise. Subtraction over accumulation.",
    description:
      "Every element must earn its place on screen. Rejecting superficial clutter in favor of timeless clarity, semantic structure, and enduring engineering rigor.",
    tags: ["Intentionality", "Typography", "Clarity", "Discipline"],
    coordinate: "SEC // 07 [270° - 315°]",
  },
  {
    id: "exploration",
    index: "08",
    title: "Research & Curiosity",
    tagline: "Continuous experimentation with emerging web standards.",
    description:
      "Probing emerging browser capabilities, WebAssembly compilers, and open-source paradigms to push the limits of modern client-side computing.",
    tags: ["Open Source", "WebAssembly", "W3C Standards", "Exploration"],
    coordinate: "SEC // 08 [315° - 360°]",
  },
];
