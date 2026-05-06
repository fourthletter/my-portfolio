from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path


@dataclass(frozen=True)
class Project:
    slug: str
    title: str
    description: str
    stack: list[str]
    challenge: str
    approach: str
    impact: str
    image: str | None = None
    images: list[str] = field(default_factory=list)
    highlights: list[str] = field(default_factory=list)
    references: list[dict[str, str]] = field(default_factory=list)


PROJECTS: list[Project] = [
    Project(
        slug="ai-notetaking-app-nextjs",
        title="Notetaking App with Next.js",
        description="Built a notetaking product in Next.js for faster capture, organization, and summarization of ideas.",
        stack=["Next.js", "TypeScript", "AI Features"],
        challenge="Users struggled to turn scattered notes into searchable, useful insights.",
        approach="Designed a clean note workflow with AI summaries and structured retrieval.",
        impact="Reduced friction between capturing information and turning it into action.",
    ),
    Project(
        slug="micro-service-applications-with-ai",
        title="Building Micro-Service Applications",
        description="Developed modular micro-service systems where AI capabilities are exposed through independent services.",
        stack=["Microservices", "Python", "System Design"],
        challenge="AI features needed to scale without tightly coupling product logic and model logic.",
        approach="Defined clear service boundaries, contracts, and observability for AI-heavy workloads.",
        impact="Improved reliability, maintainability, and independent scaling of services.",
    ),
    Project(
        slug="newsletter-app",
        title="Newsletter App",
        description="Created a newsletter app to streamline content preparation, publishing workflows, and repeatable updates.",
        stack=["Automation", "Content Ops", "Python"],
        challenge="Publishing flows were manual and time-consuming.",
        approach="Implemented reusable tooling to support drafting, review, and delivery steps.",
        impact="Increased publishing consistency and reduced turnaround time.",
    ),
    Project(
        slug="esusu",
        title="eSuSu",
        description="Built a group lending and savings platform where friends, family members, colleagues, and neighbors can loan to each other and motivate consistent saving.",
        stack=["Fintech", "Peer Lending", "Transaction Tracking"],
        challenge="People saving alone often struggle with accountability and visibility into shared financial activities.",
        approach="Designed group-based workflows for lending, saving motivation, and transparent tracking of loans and financial transactions.",
        impact="Enabled community-driven saving behavior and gave users clearer visibility into their group financial progress.",
        image="images/e-susu.webp",
        highlights=[
            "Won the grand prize at Ujamaathon.",
            "Featured in TechCrunch for bridging informal community loan groups with digital tools.",
        ],
        references=[
            {"label": "GitHub repo", "slug": "esusu-repo"},
            {"label": "TechCrunch feature", "slug": "esusu-press"},
        ],
    ),
    Project(
        slug="nanny-state",
        title="Nanny State",
        description="The Nanny Surveillance State, a project under the Mozilla Foundation's Building Trustworthy AI Working Group, aims to illuminate the impact of surveillance and artificial intelligence on the labor industry, particularly on domestic workers, e.g., nannies and housekeepers. More details are shown when clicked on card.",
        stack=["AI Governance", "Labor Rights", "Community Research"],
        challenge="AI systems on job platforms often overlook legal frameworks and the lived experiences of domestic laborers.",
        approach="Through a design justice lens, this project centers the lived experiences of domestic workers to inform community-centered solutions that ensure their dignity as laborers. This discovery process provides a framework for the use of AI surveillance from a two-pronged approach: (1) research which defines the prevalence of home surveillance technology in households around Europe and (2) a co-design process involving nannies, housekeepers, and other domestic laborers in understanding surveillance technology that is currently driving their industry.",
        impact="Elevated worker expertise in AI policy/design conversations and advanced dignity-centered approaches for domestic labor.",
        images=["images/nanny-state-1.png", "images/nanny-state-2.png"],
        highlights=[
            "Selected as a Mozilla Foundation AI Working Group project.",
            "Featured at MozFest 2021 for design justice and inclusivity-centered AI work.",
        ],
        references=[
            {"label": "GitHub repo", "slug": "nanny-state-repo"},
            {"label": "Mozilla Foundation feature", "slug": "nanny-state-press"},
        ],
    ),
    Project(
        slug="exposing-the-invisible",
        title="Exposing The Invisible (Tactical Tech)",
        description="Contributed to Tactical Tech's Exposing The Invisible initiative, supporting collaboration, knowledge sharing, and practical skill-building for investigative communities.",
        stack=["Investigative Methods", "Digital Rights", "Community Training"],
        challenge="People and organizations often lack accessible, practical resources to investigate complex issues safely and effectively.",
        approach="Supported the development and adaptation of investigation-focused resources, workshops, and learning pathways that make investigative practices more usable for wider communities.",
        impact="Helped strengthen investigative capacity among journalists, researchers, and civic actors working to collect evidence and understand social issues responsibly.",
        references=[
            {"label": "Tactical Tech: Exposing The Invisible", "slug": "exposing-the-invisible"},
        ],
    ),
    Project(
        slug="mapping-pretrial-risk",
        title="Mapping Pretrial Risk",
        description="Supported a community-driven project documenting where pretrial risk assessment tools are used and how they can shape incarceration, supervision, and release decisions.",
        stack=["Data Mapping", "Criminal Justice", "Digital Rights"],
        challenge="Communities often have limited visibility into how pretrial risk assessments are implemented and how bias can affect outcomes.",
        approach="Contributed to research and accessible documentation practices that help organizers understand tool usage across jurisdictions and advocate for pretrial decarceration.",
        impact="Improved public access to information on pretrial risk assessment practices and supported movement-based analysis of algorithmic harm in the legal system.",
        references=[
            {"label": "Mapping Pretrial Risk", "slug": "mapping-pretrial-risk"},
        ],
    ),
    Project(
        slug="demochat",
        title="DemoChat",
        description="Prototype a mobile suggestion box for factory workers to report workplace conditions and make labor issues more transparent.",
        stack=["Worker Reporting", "Labor Transparency", "Conversational UX"],
        challenge="Poor labor conditions were underreported due to limited safe and structured reporting channels.",
        approach="Implemented a simple digital reporting flow that captures worker feedback in a consistent, actionable format.",
        impact="Improved visibility into workplace issues and supported more responsive labor-condition monitoring.",
        images=["images/Finalists-600x401.jpg"],
        highlights=[
            "Won the bronze prize at Make All Voices Count in Jakarta, Indonesia.",
            "Selected for the Digital Participation Camp in Munster, Germany.",
        ],
        references=[
            {"label": "DemoChat event video", "slug": "demochat-video"},
            {"label": "Making All Voices Count article", "slug": "demochat-press"},
        ],
    ),
]

CAPABILITIES = [
    "Program Leadership",
    "AI & Society Research",
    "Digital Rights Advocacy",
    "Partnership Development",
    "Inclusive Technology Strategy",
    "Data-Informed Decision Making",
]

SKILLS = [
    "Tech & Data for Good Advocate",
    "Python scripting, scraping",
    "Researcher",
]

BIO_PARAGRAPHS = [
    "I have over 15 years of experience in global social impact projects, specializing in AI, digital rights, and program management. My work at the Algorithmic Justice League and the Open Technology Fund focused on equitable digital solutions. Through my career, I've assessed AI's impact on society and developed platforms for communities to better understand and challenge technological harms. My mission is to drive social justice through informed, inclusive, and actionable insights.",
]


def get_project_by_slug(slug: str) -> Project | None:
    return next((project for project in PROJECTS if project.slug == slug), None)


def resolve_project_images(project: Project, static_dir: Path) -> list[str]:
    image_paths = project.images or ([project.image] if project.image else [])
    valid_images: list[str] = []
    for image_path in image_paths:
        if (static_dir / image_path).exists():
            valid_images.append(image_path)
    return valid_images
