export type Project = {
  slug: string;
  title: string;
  description: string;
  stack: string[];
  challenge: string;
  approach: string;
  impact: string;
};

export const projects: Project[] = [
  {
    slug: "ai-newsletter-automation",
    title: "AI Newsletter Automation",
    description:
      "Built autonomous agents that curate, summarize, and publish newsletter content with minimal manual work.",
    stack: ["Python", "AI Agents", "Automation"],
    challenge:
      "Editorial workflows required high manual effort and inconsistent publishing cadence.",
    approach:
      "Designed an agent pipeline for source discovery, summarization, and quality checks before publication.",
    impact:
      "Reduced preparation time and improved repeatability, enabling faster iteration on newsletter themes.",
  },
  {
    slug: "langflow-automation-workflows",
    title: "Langflow Automation Workflows",
    description:
      "Designed visual AI pipelines with Langflow to orchestrate prompt chains, tools, and integrations.",
    stack: ["Langflow", "LLM Workflows", "API Integrations"],
    challenge:
      "Teams needed faster experimentation across prompt flows without rebuilding core logic each time.",
    approach:
      "Mapped reusable Langflow blocks for ingestion, reasoning, and action-taking with clear interfaces.",
    impact:
      "Increased prototyping speed and improved collaboration between technical and non-technical stakeholders.",
  },
  {
    slug: "ai-notetaking-app",
    title: "AI Notetaking App",
    description:
      "Developed a Next.js app for capturing notes, organizing ideas, and adding AI-assisted summarization.",
    stack: ["Next.js", "TypeScript", "AI Features"],
    challenge:
      "Users needed a way to turn raw notes into structured insights without added friction.",
    approach:
      "Built a clean, responsive interface with AI-assisted summaries and searchable note organization.",
    impact:
      "Improved content clarity and retrieval, helping users move from capture to action more efficiently.",
  },
  {
    slug: "microservice-apps-with-ai",
    title: "Microservice Apps with AI",
    description:
      "Implemented microservice-based systems where AI capabilities are exposed as modular services.",
    stack: ["Microservices", "Python", "System Design"],
    challenge:
      "AI functionality had to be integrated without coupling tightly to product-specific logic.",
    approach:
      "Separated AI workloads into service boundaries with explicit contracts and observability points.",
    impact:
      "Improved maintainability and enabled independent scaling of AI-heavy application paths.",
  },
  {
    slug: "python-scripting-scraping",
    title: "Python Scripting & Scraping",
    description:
      "Created data collection and automation scripts for repeatable extraction and transformation workflows.",
    stack: ["Python", "Web Scraping", "Data Pipelines"],
    challenge:
      "Data collection tasks were repetitive, brittle, and difficult to monitor over time.",
    approach:
      "Built robust scripts with retry logic, validation steps, and structured output for downstream use.",
    impact:
      "Increased data reliability and reduced operational overhead for recurring collection processes.",
  },
  {
    slug: "html-based-websites",
    title: "HTML-Based Websites",
    description:
      "Built fast, lightweight websites with clear structure and modern design fundamentals.",
    stack: ["HTML", "CSS", "JavaScript"],
    challenge:
      "Many projects needed polished experiences with minimal stack complexity and quick turnaround.",
    approach:
      "Focused on semantic structure, performance-first styling, and straightforward maintainable code.",
    impact:
      "Delivered reliable web experiences that were easy to ship, audit, and evolve.",
  },
];

export const capabilities: string[] = [
  "Program Leadership",
  "AI & Society Research",
  "Digital Rights Advocacy",
  "Partnership Development",
  "Inclusive Technology Strategy",
  "Data-Informed Decision Making",
];

export const skills: string[] = ["Cursor.ai", "Langflow", "Python"];

export const bioParagraphs: string[] = [
  "I am a Senior Program Leader with over 15 years of experience in global social impact projects, specializing in AI, digital rights, and program management.",
  "I have led research and partnerships at organizations like the Algorithmic Justice League and the Open Technology Fund, advocating for equitable digital solutions.",
  "I have worked on projects to assess AI's impact on society and develop tools that empower communities to understand and challenge technological harms.",
  "Through my work, I have seen how data and AI can either empower or harm communities. My mission is to drive change through informed, inclusive, and actionable insights.",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
