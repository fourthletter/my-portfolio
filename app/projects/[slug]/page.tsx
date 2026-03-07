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
      title: "Project Not Found | Diluong",
    };
  }

  return {
    title: `${project.title} | Diluong`,
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
    <main className="bg-stone-50 text-stone-900">
      <section className="fade-in-up mx-auto w-full max-w-4xl px-6 py-16 sm:px-10">
        <Link
          href="/projects"
          className="text-sm font-medium text-stone-600 underline decoration-stone-300 underline-offset-4 transition hover:text-stone-900 hover:decoration-stone-800"
        >
          Back to projects
        </Link>
        <p className="mt-8 text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
          Case Study
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-5 max-w-3xl text-base leading-8 text-stone-600">
          {project.description}
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.stack.map((tag) => (
            <span
              key={tag}
              className="rounded-md bg-white px-3 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      <section className="fade-in-up border-y border-stone-200 bg-white [animation-delay:120ms]">
        <div className="mx-auto grid w-full max-w-4xl gap-10 px-6 py-14 sm:px-10 md:grid-cols-3">
          <article className="space-y-3">
            <h2 className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
              Challenge
            </h2>
            <p className="text-sm leading-7 text-stone-700">{project.challenge}</p>
          </article>
          <article className="space-y-3">
            <h2 className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
              Approach
            </h2>
            <p className="text-sm leading-7 text-stone-700">{project.approach}</p>
          </article>
          <article className="space-y-3">
            <h2 className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
              Impact
            </h2>
            <p className="text-sm leading-7 text-stone-700">{project.impact}</p>
          </article>
        </div>
      </section>
    </main>
  );
}
