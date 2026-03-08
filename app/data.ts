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
    slug: "ai-notetaking-app-nextjs",
    title: "AI Notetaking App with Next.js",
    description:
      "Built an AI-assisted notetaking product in Next.js for faster capture, organization, and summarization of ideas.",
    stack: ["Next.js", "TypeScript", "AI Features"],
    challenge:
      "Users struggled to turn scattered notes into searchable, useful insights.",
    approach:
      "Designed a clean note workflow with AI summaries and structured retrieval.",
    impact:
      "Reduced friction between capturing information and turning it into action.",
  },
  {
    slug: "micro-service-applications-with-ai",
    title: "Building Micro-Service Applications with AI",
    description:
      "Developed modular micro-service systems where AI capabilities are exposed through independent services.",
    stack: ["Microservices", "Python", "System Design"],
    challenge:
      "AI features needed to scale without tightly coupling product logic and model logic.",
    approach:
      "Defined clear service boundaries, contracts, and observability for AI-heavy workloads.",
    impact:
      "Improved reliability, maintainability, and independent scaling of services.",
  },
  {
    slug: "newsletter-app",
    title: "Newsletter App",
    description:
      "Created a newsletter app to streamline content preparation, publishing workflows, and repeatable updates.",
    stack: ["Automation", "Content Ops", "Python"],
    challenge:
      "Publishing flows were manual and time-consuming.",
    approach:
      "Implemented reusable tooling to support drafting, review, and delivery steps.",
    impact:
      "Increased publishing consistency and reduced turnaround time.",
  },
  {
    slug: "esusu",
    title: "eSuSu",
    description:
      "Built a group lending and savings platform where friends, family members, colleagues, and neighbors can loan to each other and motivate consistent saving.",
    stack: ["Fintech", "Peer Lending", "Transaction Tracking"],
    challenge:
      "People saving alone often struggle with accountability and visibility into shared financial activities.",
    approach:
      "Designed group-based workflows for lending, saving motivation, and transparent tracking of loans and financial transactions.",
    impact:
      "Enabled community-driven saving behavior and gave users clearer visibility into their group financial progress.",
  },
  {
    slug: "nanny-state",
    title: "Nanny State",
    description:
      "Researched how AI and surveillance technologies affect domestic workers, while involving nannies and housekeepers in designing community-centered solutions.",
    stack: ["AI Governance", "Labor Rights", "Community Research"],
    challenge:
      "AI systems on job platforms often overlook legal frameworks and the lived experiences of domestic laborers.",
    approach:
      "Documented surveillance prevalence in households across Europe and co-designed worker-informed AI recommendations with domestic workers.",
    impact:
      "Elevated worker expertise in AI policy/design conversations and advanced dignity-centered approaches for domestic labor.",
  },
  {
    slug: "demochat",
    title: "DemoChat",
    description:
      "Created an electronic suggestion box for factory workers to report workplace conditions and make labor issues more transparent.",
    stack: ["Worker Reporting", "Labor Transparency", "Conversational UX"],
    challenge:
      "Poor labor conditions were underreported due to limited safe and structured reporting channels.",
    approach:
      "Implemented a simple digital reporting flow that captures worker feedback in a consistent, actionable format.",
    impact:
      "Improved visibility into workplace issues and supported more responsive labor-condition monitoring.",
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

export const skills: string[] = [
  "HTML based websites",
  "Coding with AI Agents",
  "Python scripting, scraping",
  "Langflow automation",
];

export const bioParagraphs: string[] = [
  "I am a Senior Program Leader with over 15 years of experience in global social impact projects, specializing in AI, digital rights, and program management.",
  "I have led research and partnerships at organizations like the Algorithmic Justice League and the Open Technology Fund, advocating for equitable digital solutions.",
  "I have worked on projects to assess AI's impact on society and develop tools that empower communities to understand and challenge technological harms.",
  "Through my work, I have seen how data and AI can either empower or harm communities. My mission is to drive change through informed, inclusive, and actionable insights.",
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
