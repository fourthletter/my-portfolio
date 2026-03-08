import type { Metadata } from "next";
import Image from "next/image";
import { bioParagraphs, capabilities, skills } from "../data";

export const metadata: Metadata = {
  title: "About | Di Luong",
  description:
    "About Di Luong, Senior Program Leader focused on AI, digital rights, and social impact.",
};

export default function AboutPage() {
  return (
    <main className="bg-[#e8eaed] text-[#142635]">
      <section className="fade-in-up mx-auto w-full max-w-6xl px-6 py-20 sm:px-10">
        <div className="grid items-start gap-12 md:grid-cols-[320px_minmax(0,1fr)]">
          <div className="rounded-2xl border border-[#b9c4cc] bg-[#f4f6f8] p-4 shadow-[0_12px_28px_rgba(20,38,53,0.12)]">
            <Image
              src="/di-photo.jpg"
              alt="Di Luong profile photo"
              width={320}
              height={320}
              className="h-auto w-full rounded-xl object-cover"
              priority
            />
          </div>
          <div>
            <p className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              About
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl leading-[0.98] font-extrabold tracking-tight sm:text-7xl">
              Advancing inclusive and equitable AI systems.
            </h1>
            <div className="mt-8 max-w-3xl space-y-6 text-lg leading-9 text-[#4c5a67]">
              {bioParagraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="fade-in-up border-y border-[#b9c4cc] bg-[#f4f6f8] [animation-delay:120ms]">
        <div className="mx-auto grid w-full max-w-6xl gap-14 px-6 py-18 sm:px-10 md:grid-cols-2">
          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              Core Capabilities
            </h2>
            <div className="mt-6 flex flex-wrap gap-3.5">
              {capabilities.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#9fb0bd] bg-[#d7ecf5] px-4 py-2.5 text-sm font-semibold text-[#1f3443]"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-sm font-medium tracking-[0.18em] text-[#4c5a67] uppercase">
              Skills
            </h2>
            <div className="mt-6 flex flex-wrap gap-3.5">
              {skills.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-[#9fb0bd] bg-[#d7ecf5] px-4 py-2.5 text-sm font-semibold text-[#1f3443]"
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
