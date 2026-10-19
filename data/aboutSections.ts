export interface AboutSection {
  id: string;
  index: string;
  shortCode: string;
  title: string;
  tagline: string;
  description: string;
  tags: string[];
  coordinate: string;
}

export const ABOUT_SECTIONS: AboutSection[] = [
  {
    id: "systems",
    index: "01",
    shortCode: "SYSTEMS",
    title: "THINKING IN SYSTEMS",
    tagline: "Building systems where complex parts work together.",
    description:
      "I enjoy working on problems that cannot be solved by treating every component in isolation.\n\nMy projects have taken me across AI pipelines, backend services, databases, infrastructure, and hardware integrations. I like understanding how these pieces fit together, identifying where they fail, and making the complete system work.\n\nFor me, the interesting part is often not a single algorithm or component, but the engineering required to make everything work reliably together.",
    tags: ["AI Pipelines", "Backend Services", "Infrastructure", "Hardware Integration"],
    coordinate: "SEC // 01 [SYSTEMS]",
  },
  {
    id: "ai-ml",
    index: "02",
    shortCode: "AI / ML",
    title: "BUILDING INTELLIGENT SYSTEMS",
    tagline: "From language models to useful intelligent applications.",
    description:
      "My primary technical interest is artificial intelligence and machine learning, particularly in applications where models become part of a larger working system.\n\nI have explored language models, retrieval-augmented generation, model fine-tuning, speech processing, computer vision, and AI-powered conversational systems.\n\nI enjoy experimenting with different approaches, understanding their limitations, and integrating them into applications that solve actual problems.\n\nI am especially interested in the engineering between a model and its real-world use: retrieval, orchestration, inference, integration, and deployment.",
    tags: ["LLMs & RAG", "Computer Vision", "Speech AI", "Model Deployment"],
    coordinate: "SEC // 02 [AI / ML]",
  },
  {
    id: "building",
    index: "03",
    shortCode: "BUILDING",
    title: "LEARNING BY BUILDING",
    tagline: "Turning ideas into working, integrated implementations.",
    description:
      "I learn best by building.\n\nWorking on unfamiliar problems has repeatedly pushed me to learn new frameworks, tools, architectures, and techniques along the way.\n\nI do not approach every project with complete knowledge of the technologies involved. Instead, I break the problem down, investigate what I do not understand, experiment with possible solutions, and keep working toward a functioning result.\n\nI value the ability to learn, adapt, and execute across technical boundaries.\n\nThe goal is not simply to make something look impressive in a demonstration. It is to understand enough of the problem to build something that actually works.",
    tags: ["Rapid Prototyping", "Execution", "Problem Solving", "Adaptability"],
    coordinate: "SEC // 03 [BUILDING]",
  },
  {
    id: "ownership",
    index: "04",
    shortCode: "OWNERSHIP",
    title: "OWNERSHIP OVER TITLES",
    tagline: "Taking responsibility when the difficult work needs doing.",
    description:
      "One of the most defining experiences in my engineering journey has been leading the coding domain at SRM Team RoboCON.\n\nI led a team of 15 people within a larger robotics team, contributing to systems that brought together software, perception, control, embedded systems, and autonomous behavior.\n\nCompetition preparation demanded persistence, difficult technical decisions, coordination, and a willingness to take responsibility for work that could determine whether the overall system functioned.\n\nThat experience reinforced something I value: taking ownership means caring about the outcome, understanding the problem deeply, and doing what is needed to move the team forward.\n\nI care less about having a particular title than about making a meaningful contribution.",
    tags: ["RoboCON Leadership", "Perception & Control", "Embedded Systems", "Team Ownership"],
    coordinate: "SEC // 04 [OWNERSHIP]",
  },
  {
    id: "engineering",
    index: "05",
    shortCode: "ENGINEERING",
    title: "ACROSS THE STACK",
    tagline: "AI, software, infrastructure, and everything between.",
    description:
      "My work has taken me beyond model development into the systems required to make software useful.\n\nI have worked with backend services, microservices, databases, containers, cloud infrastructure, APIs, workflow automation, and deployment pipelines.\n\nI enjoy moving between different layers of a problem when necessary, whether that means understanding an AI component, investigating an integration issue, or working through the architecture of an application.\n\nI do not want to be limited by a narrow definition of what an AI engineer should do. I want to understand the technologies around the model and how they contribute to the final product.",
    tags: ["Microservices", "Cloud Infrastructure", "APIs & Databases", "CI/CD Pipelines"],
    coordinate: "SEC // 05 [ENGINEERING]",
  },
  {
    id: "milestones",
    index: "06",
    shortCode: "MILESTONES",
    title: "MILESTONES",
    tagline: "Research, competition, and achievements along the way.",
    description:
      "Some milestones that reflect my work so far:\n\nBEST PAPER AWARD — ICBSII 2026\nRecognized for DeepSight, an AI-driven navigation assistance system for visually impaired users.\n\nAIR 5 — DD ROBOCON 2026\nPart of the SRM team that achieved an All India Rank of 5 in the competition.\n\nSECOND PLACE — LLMVERSE HACKATHON\nDeveloped a voice-controlled AI assistant for visually impaired users, integrating speech technologies and large language models.\n\n9.85 CGPA — SRMIST\nAcademic performance in Computer Science and Engineering with Artificial Intelligence and Machine Learning.",
    tags: ["ICBSII Best Paper", "AIR 5 RoboCON", "LLMVerse 2nd", "9.85 CGPA"],
    coordinate: "SEC // 06 [MILESTONES]",
  },
  {
    id: "beyond-code",
    index: "07",
    shortCode: "BEYOND CODE",
    title: "OUTSIDE THE TERMINAL",
    tagline: "Football, cricket, basketball, F1, and a curious mind.",
    description:
      "Engineering is a big part of what I do, but it is not the whole picture.\n\nI enjoy football, cricket, basketball, Formula 1, and reading.\n\nI am also a big admirer of Cristiano Ronaldo. His competitive mentality, discipline, and persistence are qualities I find inspiring.\n\nOutside technical work, I enjoy having interests that give me something else to think about, learn from, and look forward to.",
    tags: ["Football & F1", "Cricket & Basketball", "Reading", "Competitive Mindset"],
    coordinate: "SEC // 07 [BEYOND CODE]",
  },
  {
    id: "curiosity",
    index: "08",
    shortCode: "CURIOSITY",
    title: "ALWAYS EXPLORING",
    tagline: "Exploring ideas, learning continuously, and building what matters.",
    description:
      "I do not have every step of my future mapped out, and I am comfortable with that.\n\nI want to keep learning, working on interesting problems, and developing the ability to build things that are genuinely useful.\n\nThe possibility of eventually creating a meaningful product or starting something of my own excites me. But I do not see one particular career path as the only definition of success.\n\nFor now, I want to keep exploring, become a better engineer, and work on problems worth solving.\n\nI am interested in what I can build next, not just what I have already built.",
    tags: ["Continuous Learning", "Exploration", "Long-Term Vision", "Impact"],
    coordinate: "SEC // 08 [CURIOSITY]",
  },
];
