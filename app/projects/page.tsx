import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../data";

export const metadata: Metadata = {
  title: "Projects | Di Luong",
  description:
    "Selected projects in AI automation, digital tools, and modern web applications.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-[#e8eaed] text-[#142635]">
      <section className="fade-in-up mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
        <p className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
          Projects
        </p>
        <h1 className="mt-6 max-w-4xl text-5xl leading-[0.98] font-extrabold tracking-tight sm:text-7xl">
          Selected work across AI and social impact.
        </h1>
        <p className="mt-7 max-w-3xl text-lg leading-9 text-[#4c5a67]">
          A focused collection of projects spanning AI agents, workflow
          automation, modern web applications, and practical tooling.
        </p>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-[#b9c4cc] bg-[#f4f6f8] p-7 transition hover:-translate-y-1 hover:border-[#63b9d7] hover:shadow-[0_14px_30px_rgba(20,38,53,0.14)]"
            >
              <h2 className="text-3xl leading-tight font-bold tracking-tight">
                {project.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[#4c5a67]">
                {project.description}
              </p>
              <div className="mt-6 flex flex-wrap gap-2.5">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md border border-[#9fb0bd] bg-[#d7ecf5] px-3 py-1.5 text-xs font-semibold text-[#1f3443]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="btn btn-secondary btn-sm mt-6"
              >
                Open project details
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
