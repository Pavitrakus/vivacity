"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/video-player";

const cases = [
  {
    id: "edtech",
    label: "EdTech",
    context: "JEE · NEET · tutoring apps",
    body: "Doubt in the chatbot becomes a narrated, exact diagram. Built for the Indian competitive exam stack and beyond.",
    video: "/videos/demo-537.mp4",
  },
  {
    id: "agents",
    label: "Agents",
    context: "LLM apps · copilots · tools",
    body: "When your model finishes reasoning, Vivacity turns the answer into motion your user can watch. Video as a first-class tool output.",
    video: "/videos/divergence.mp4",
  },
  {
    id: "creators",
    label: "Creators",
    context: "Channels · courses · explainers",
    body: "Ship Manim-grade explainers without a freelance timeline. English, Hindi, Hinglish on the same pipeline.",
    video: "/videos/unit_circle.mp4",
  },
];

export function People() {
  const [active, setActive] = useState(cases[0]);

  return (
    <section id="people" className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8">
      <h2 className="font-pixel text-[1.75rem] tracking-tight sm:text-3xl md:text-4xl">
        The people we make it for.
      </h2>
      <p className="mt-3 max-w-xl text-[15px] text-white/55 sm:text-base">
        We would rather you see the output. Real generations on topics that used
        to take hours of hand-written Manim.
      </p>

      <div className="mt-10 grid overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] md:grid-cols-2">
        <div className="border-b border-white/10 p-3 md:border-r md:border-b-0 md:p-4">
          <VideoPlayer key={active.video} src={active.video} className="h-full" />
        </div>
        <div className="flex flex-col p-5 sm:p-7">
          <div className="inline-flex w-fit rounded-full border border-white/12 p-1 font-pixel text-[11px]">
            {cases.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActive(c)}
                className={cn(
                  "rounded-full px-3 py-1.5 transition",
                  active.id === c.id
                    ? "bg-white/12 text-white"
                    : "text-white/45 hover:text-white/75"
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
          <p className="mt-5 font-pixel text-[11px] tracking-wide text-white/40 uppercase">
            {active.context}
          </p>
          <p className="mt-3 flex-1 text-sm leading-relaxed text-white/75 sm:text-base">
            {active.body}
          </p>
          <a
            href="#cta"
            className="mt-8 flex items-center justify-end border-t border-white/10 pt-4 font-pixel text-[12px] text-white/80 hover:text-white"
          >
            View integration path →
          </a>
        </div>
      </div>
    </section>
  );
}
