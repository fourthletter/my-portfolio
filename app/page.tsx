import Link from "next/link";
import { projects, skills } from "./data";

export default function Home() {
  return (
    <main className="bg-stone-50 text-stone-900">
      <section className="fade-in-up mx-auto flex min-h-[72vh] w-full max-w-6xl flex-col justify-center px-6 py-20 sm:px-10">
        <p className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
          Senior Program Leader
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl leading-tight font-semibold tracking-tight sm:text-6xl">
          Driving equitable AI through leadership, research, and action.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-7 text-stone-600 sm:text-lg">
          Senior Program Leader with 15+ years of experience delivering global
          social impact initiatives across AI, digital rights, and responsible
          technology.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-stone-200 bg-white px-3 py-1 text-xs font-medium text-stone-700"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="rounded-full bg-stone-900 px-6 py-3 text-sm font-medium text-stone-50 transition hover:bg-stone-700"
          >
            Explore Projects
          </Link>
          <Link
            href="/about"
            className="rounded-full border border-stone-300 bg-white px-6 py-3 text-sm font-medium text-stone-900 transition hover:border-stone-500"
          >
            Read About Me
          </Link>
        </div>
      </section>

      <section className="fade-in-up border-y border-stone-200 bg-white [animation-delay:120ms]" id="contact">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-14 sm:px-10 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
              Quick Intro
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-stone-700">
              Building partnerships, programs, and practical tools that help
              communities understand, challenge, and shape the impact of AI.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
              Connect
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/fourthletter"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-stone-900 px-5 py-2.5 text-sm font-medium text-stone-50 transition hover:bg-stone-700"
              >
                GitHub / fourthletter
              </a>
              <a
                href="https://www.linkedin.com/in/diluong"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:border-stone-500"
              >
                LinkedIn / diluong
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="fade-in-up mx-auto w-full max-w-6xl px-6 py-16 sm:px-10 [animation-delay:180ms]">
        <h2 className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
          Featured Projects
        </h2>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-stone-200 bg-white p-6 transition hover:border-stone-400"
            >
              <h3 className="text-xl font-semibold tracking-tight">
                {project.title}
              </h3>
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
                Read case study
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <Link
            href="/projects"
            className="inline-flex rounded-full border border-stone-300 bg-white px-5 py-2.5 text-sm font-medium text-stone-900 transition hover:border-stone-500"
          >
            View all projects
          </Link>
        </div>
      </section>
    </main>
  );
}
