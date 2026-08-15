"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
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
                  "flex w-full items-center gap-4 border-l-[6px] py-5 pr-4 pl-4 text-left transition-colors duration-300 md:border-l-[10px]",
                  isOpen
                    ? "border-l-white text-white"
                    : "border-l-white/20 text-white/80 hover:border-l-white/50 hover:text-white"
                )}
              >
                <span className="w-5 shrink-0 font-pixel text-lg text-white/45">
                  {isOpen ? "−" : "+"}
                </span>
                <span className="flex-1 font-pixel text-sm tracking-tight sm:text-[15px]">
                  {f.q}
                </span>
                <Plus
                  className={cn(
                    "h-4 w-4 shrink-0 text-white/35 transition-transform duration-300 ease-out",
                    isOpen && "rotate-45"
                  )}
                />
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
                  <p className="pr-4 pb-5 pl-[3.25rem] text-sm leading-relaxed text-white/50 md:pl-16">
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
