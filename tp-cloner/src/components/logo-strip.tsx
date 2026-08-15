"use client";

import Image from "next/image";
import { LogoMarquee } from "@/components/ui/logo-marquee";

const partners = [
  { name: "ChatGPT", src: "/images/logos/chatgpt.png", note: "ChatGPT" },
  { name: "Claude", src: "/images/logos/claude.png", note: "Claude Code" },
  { name: "Cursor", src: "/images/logos/cursor.png", note: "Cursor CLI" },
  { name: "Gemini", src: "/images/logos/gemini.png", note: "Gemini" },
  { name: "Perplexity", src: "/images/logos/perplexity.png", note: "Perplexity" },
  { name: "OpenAI", src: "/images/logos/openai.png", note: "OpenAI API" },
];

export function LogoStrip() {
  const items = partners.map((p) => (
    <div
      key={p.name}
      className="group flex w-[88px] flex-col items-center gap-2 sm:w-[96px]"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-[11px] border border-white/[0.1] bg-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition group-hover:border-white/25">
        <Image
          src={p.src}
          alt={p.name}
          width={22}
          height={22}
          className="h-[22px] w-[22px] object-contain"
        />
      </div>
      <span className="text-center font-pixel text-[10px] tracking-wide text-white/45 transition group-hover:text-white/70">
        {p.note}
      </span>
    </div>
  ));

  return (
    <section className="mx-auto max-w-6xl px-5 pt-1 pb-8 sm:pt-2 sm:pb-10 md:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.035] to-transparent px-4 py-6 sm:px-8 sm:py-8">
        <p className="text-center font-pixel text-[10px] tracking-[0.22em] text-white/40 uppercase">
          Works with
        </p>
        <LogoMarquee className="mt-6">{items}</LogoMarquee>
        <p className="relative mt-5 text-center text-[11px] text-white/35 sm:mt-6 sm:text-xs">
          Claude Code, ChatGPT, Cursor, or your own agent. Prompt in, video out.
        </p>
      </div>
    </section>
  );
}
