"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { FAQS } from "@/lib/site";
import { StaggerText } from "@/components/ui/stagger-text";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="about" className="mx-auto max-w-3xl px-5 py-14 sm:py-20 md:px-8">
      <h2 className="font-pixel text-[1.75rem] tracking-tight sm:text-3xl md:text-4xl">
        <StaggerText>Common questions.</StaggerText>
      </h2>
      <p className="mt-3 text-[15px] text-white/55 sm:text-base">
        The things people ask before integrating. Answered straight.
      </p>

      <ul className="mt-10 border-y border-white/10">
        {FAQS.map((f, i) => {
          const isOpen = open === i;
          return (
            <li
              key={f.q}
              className={cn(
                "border-b border-white/10 last:border-b-0 transition-colors duration-300",
                isOpen && "bg-white/[0.03]"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className={cn(
                  "flex w-full items-center gap-3 border-l-[5px] py-4 pr-3 pl-3 text-left transition-colors duration-300 sm:gap-4 sm:py-5 sm:pr-4 sm:pl-4 md:border-l-[10px]",
                  isOpen
                    ? "border-l-white text-white"
                    : "border-l-white/20 text-white/80 hover:border-l-white/50 hover:text-white"
                )}
              >
                <span className="w-4 shrink-0 font-pixel text-base text-white/45 sm:w-5 sm:text-lg">
                  {isOpen ? "−" : "+"}
                </span>
                <span className="flex-1 font-pixel text-[13px] tracking-tight sm:text-[15px]">
                  {f.q}
                </span>
              </button>
              <div
                className={cn(
                  "grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <p className="pr-3 pb-4 pl-10 text-sm leading-relaxed text-white/50 sm:pr-4 sm:pb-5 sm:pl-[3.25rem] md:pl-16">
                    {f.a}
                  </p>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
