"use client";

import { useState } from "react";
import { FAQS } from "@/lib/site";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
        09 — Questions
      </p>
      <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
        Straight answers.
      </h2>
      <div className="mt-10 divide-y divide-white/8 border-y border-white/8">
        {FAQS.map((item, i) => {
          const expanded = open === i;
          return (
            <div key={item.q}>
              <button
                type="button"
                className="flex w-full items-start justify-between gap-6 py-5 text-left"
                aria-expanded={expanded}
                onClick={() => setOpen(expanded ? null : i)}
              >
                <span className="text-[16px] text-[#eeeae2]">{item.q}</span>
                <span className="font-mono text-[12px] text-white/35">
                  {expanded ? "–" : "+"}
                </span>
              </button>
              {expanded ? (
                <p className="max-w-3xl pb-6 text-sm leading-relaxed text-white/52">
                  {item.a}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
    </section>
  );
}
