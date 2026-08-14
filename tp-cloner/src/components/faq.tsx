"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "What is Vivacity?",
    a: "Near-real-time video infrastructure for LLMs. It turns prompts, documents, and AI answers into narrated, mathematically exact explainer videos you can call from an app or agent.",
  },
  {
    q: "How is this different from whiteboard AI video?",
    a: "Whiteboard tools optimize for fast drawn explainers. Vivacity optimizes for coordinated, mathematically exact diagrams. Equation morphs, graphs, spatial proofs. When the visual has to be correct.",
  },
  {
    q: "What can I feed it?",
    a: "A plain prompt, a document, or an upstream model answer. Any topic works. Math and science are where precision shows most.",
  },
  {
    q: "How fast and how cheap?",
    a: "Near real-time on short clips. Careful short renders land around ₹7 / about $0.08. Designed so EdTech chatbots and agents can afford volume.",
  },
  {
    q: "Languages?",
    a: "English, Hindi, and Hinglish narration today, with more language paths on the roadmap.",
  },
  {
    q: "Is there an API?",
    a: "Yes. Submit a job, poll status, receive a video_url. Built so products and agents can embed generation without owning a render farm.",
  },
  {
    q: "Who is this for?",
    a: "EdTech platforms, LLM apps, creator pipelines, and anyone replacing text dumps with motion that teaches.",
  },
];

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="about" className="mx-auto max-w-3xl px-5 py-14 sm:py-20 md:px-8">
      <h2 className="font-pixel text-[1.75rem] tracking-tight sm:text-3xl md:text-4xl">
        Common questions.
      </h2>
      <p className="mt-3 text-[15px] text-white/55 sm:text-base">
        The things people ask before integrating. Answered straight.
      </p>

      <div className="mt-10 divide-y divide-white/10 border-y border-white/10">
        {faqs.map((f, i) => {
          const isOpen = open === i;
          return (
            <div key={f.q}>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-pixel text-sm tracking-tight sm:text-[15px]">{f.q}</span>
                <Plus
                  className={cn(
                    "h-4 w-4 shrink-0 text-white/45 transition",
                    isOpen && "rotate-45"
                  )}
                />
              </button>
              {isOpen ? (
                <p className="pb-5 text-sm leading-relaxed text-white/50">{f.a}</p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
