import type { Metadata } from "next";
import Link from "next/link";
import { projects } from "../data";

export const metadata: Metadata = {
  title: "Projects | Diluong",
  description:
    "Selected projects in AI automation, digital tools, and modern web applications.",
};

export default function ProjectsPage() {
  return (
    <main className="bg-stone-50 text-stone-900">
      <section className="fade-in-up mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <p className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
          Projects
        </p>
        <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
          Selected work across AI and social impact.
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-8 text-stone-600">
          A focused collection of projects spanning AI agents, workflow
          automation, modern web applications, and practical tooling.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-stone-400"
            >
              <h2 className="text-xl font-semibold tracking-tight">
                {project.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-stone-600">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-stone-100 px-3 py-1 text-xs font-medium text-stone-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-5 inline-flex text-sm font-medium text-stone-900 underline decoration-stone-300 underline-offset-4 transition hover:decoration-stone-800"
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
