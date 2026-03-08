import type { Metadata } from "next";
import Image from "next/image";
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

  const projectImages = project.images?.length
    ? project.images
    : project.image
      ? [project.image]
      : [];

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
        {projectImages.length ? (
          <div className="mt-8 grid max-w-3xl gap-4 sm:grid-cols-2">
            {projectImages.map((imagePath) => (
              <div
                key={imagePath}
                className="overflow-hidden rounded-2xl border border-[#b9c4cc] bg-white p-2 shadow-[0_10px_24px_rgba(20,38,53,0.12)]"
              >
                <Image
                  src={imagePath}
                  alt={`${project.title} project image`}
                  width={640}
                  height={420}
                  className="h-auto w-full rounded-xl object-cover"
                />
              </div>
            ))}
          </div>
        ) : null}
        {project.highlights?.length ? (
          <div className="mt-8 max-w-3xl">
            <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              Recognition
            </h2>
            <ul className="summary-readable mt-4 list-disc space-y-2 pl-5 text-base leading-8">
              {project.highlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ) : null}
        {project.references?.length ? (
          <div className="mt-8 max-w-3xl">
            <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              References
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              {project.references.map((reference) => (
                <a
                  key={reference.url}
                  href={reference.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary btn-sm"
                >
                  {reference.label}
                </a>
              ))}
            </div>
          </div>
        ) : null}
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
