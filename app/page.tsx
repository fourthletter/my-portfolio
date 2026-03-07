import Link from "next/link";
import { projects, skills } from "./data";

export default function Home() {
  return (
    <main className="bg-[#e8eaed] text-[#142635]">
      <section className="fade-in-up mx-auto flex min-h-[80vh] w-full max-w-6xl flex-col justify-center px-6 py-28 sm:px-10">
        <p className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
          Senior Program Leader
        </p>
        <h1 className="mt-8 max-w-5xl text-5xl leading-[0.98] font-extrabold tracking-tight sm:text-7xl">
          Driving equitable AI through leadership, research, and action.
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-[#4c5a67] sm:text-2xl sm:leading-9">
          Senior Program Leader with 15+ years of experience delivering global
          social impact initiatives across AI, digital rights, and responsible
          technology.
        </p>
        <div className="mt-8 flex flex-wrap gap-2.5">
          {skills.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-[#aebac3] bg-[#eef2f5] px-3.5 py-1.5 text-xs font-semibold text-[#1f3443]"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="mt-12 flex flex-wrap gap-4">
          <Link
            href="/projects"
            className="btn btn-primary btn-lg"
          >
            Explore Projects
          </Link>
          <Link
            href="/about"
            className="btn btn-secondary btn-lg"
          >
            Read About Me
          </Link>
        </div>
      </section>

      <section className="fade-in-up border-y border-[#b9c4cc] bg-[#f4f6f8] [animation-delay:120ms]" id="contact">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-18 sm:px-10 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              Quick Intro
            </h2>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[#4c5a67]">
              Building partnerships, programs, and practical tools that help
              communities understand, challenge, and shape the impact of AI.
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              Connect
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="https://github.com/fourthletter"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary btn-md"
              >
                GitHub / fourthletter
              </a>
              <a
                href="https://www.linkedin.com/in/diluong"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary btn-md"
              >
                LinkedIn / diluong
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="fade-in-up mx-auto w-full max-w-6xl px-6 py-20 sm:px-10 [animation-delay:180ms]">
        <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
          Featured Projects
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.slice(0, 4).map((project) => (
            <article
              key={project.title}
              className="rounded-2xl border border-[#b9c4cc] bg-[#f4f6f8] p-7 transition hover:-translate-y-1 hover:border-[#63b9d7] hover:shadow-[0_14px_30px_rgba(20,38,53,0.14)]"
            >
              <h3 className="text-3xl leading-tight font-bold tracking-tight">
                {project.title}
              </h3>
              <p className="mt-4 text-base leading-8 text-[#4c5a67]">
                {project.description}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                {project.stack.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-md bg-[#d7ecf5] px-3 py-1 text-xs font-medium text-[#1f3443]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <Link
                href={`/projects/${project.slug}`}
                className="mt-6 inline-flex text-sm font-semibold text-[#1f3443] underline decoration-[#d8a34a] underline-offset-4 transition hover:text-[#142635]"
              >
                Read case study
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10">
          <Link
            href="/projects"
            className="btn btn-secondary btn-md"
          >
            View all projects
          </Link>
        </div>
      </section>
    </main>
  );
}
