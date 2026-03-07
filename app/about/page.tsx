import type { Metadata } from "next";
import Image from "next/image";
import { bioParagraphs, capabilities, skills } from "../data";

export const metadata: Metadata = {
  title: "About | Diluong",
  description:
    "About Diluong, Senior Program Leader focused on AI, digital rights, and social impact.",
};

export default function AboutPage() {
  return (
    <main className="bg-stone-50 text-stone-900">
      <section className="fade-in-up mx-auto w-full max-w-6xl px-6 py-16 sm:px-10">
        <div className="grid items-start gap-10 md:grid-cols-[280px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-stone-200 bg-white p-4">
            <Image
              src="/favicon-di-image.png"
              alt="Diluong profile photo"
              width={320}
              height={320}
              className="h-auto w-full rounded-xl object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
              About
            </p>
            <h1 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-5xl">
              Advancing inclusive and equitable AI systems.
            </h1>
            <div className="mt-8 max-w-3xl space-y-5 text-base leading-8 text-stone-700">
              {bioParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="fade-in-up border-y border-stone-200 bg-white [animation-delay:120ms]">
        <div className="mx-auto grid w-full max-w-6xl gap-12 px-6 py-14 sm:px-10 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
              Core Capabilities
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {capabilities.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-stone-500 uppercase">
              Skills
            </h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {skills.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm text-stone-700"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
