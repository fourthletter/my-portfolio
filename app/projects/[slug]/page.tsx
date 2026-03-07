import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "../../data";

type ProjectDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: ProjectDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found | Di Luong",
    };
  }

  return {
    title: `${project.title} | Di Luong`,
    description: project.description,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-[#e8eaed] text-[#142635]">
      <section className="fade-in-up mx-auto w-full max-w-4xl px-6 py-20 sm:px-10">
        <Link
          href="/projects"
          className="btn btn-secondary btn-sm"
        >
          Back to projects
        </Link>
        <p className="mt-10 text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
          Case Study
        </p>
        <h1 className="mt-5 text-5xl leading-[0.98] font-extrabold tracking-tight sm:text-7xl">
          {project.title}
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-9 text-[#4c5a67]">
          {project.description}
        </p>
        <div className="mt-7 flex flex-wrap gap-2.5">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-md border border-[#9fb0bd] bg-[#d7ecf5] px-3 py-1.5 text-xs font-semibold text-[#1f3443]"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="fade-in-up border-y border-[#b9c4cc] bg-[#f4f6f8] [animation-delay:120ms]">
        <div className="mx-auto grid w-full max-w-4xl gap-10 px-6 py-18 sm:px-10 md:grid-cols-3">
          <article className="space-y-3">
            <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              Challenge
            </h2>
            <p className="text-base leading-8 text-[#4c5a67]">{project.challenge}</p>
          </article>
          <article className="space-y-3">
            <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              Approach
            </h2>
            <p className="text-base leading-8 text-[#4c5a67]">{project.approach}</p>
          </article>
          <article className="space-y-3">
            <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              Impact
            </h2>
            <p className="text-base leading-8 text-[#4c5a67]">{project.impact}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
