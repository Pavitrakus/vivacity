"use client";

import Image from "next/image";
import { LogoMarquee } from "@/components/ui/logo-marquee";
import { cn } from "@/lib/utils";

const partners = [
  {
    name: "ChatGPT",
    src: "/images/logos/chatgpt.png",
    invert: true,
  },
  {
    name: "Claude",
    src: "/images/logos/claude.png",
    invert: false,
  },
  {
    name: "Cursor",
    src: "/images/logos/cursor.png",
    invert: false,
  },
  {
    name: "Gemini",
    src: "/images/logos/gemini.png",
    invert: false,
  },
  {
    name: "Perplexity",
    src: "/images/logos/perplexity.png",
    invert: false,
  },
  {
    name: "OpenAI",
    src: "/images/logos/openai.png",
    invert: true,
  },
] as const;

function LogoMark({
  name,
  src,
  invert,
}: {
  name: string;
  src: string;
  invert: boolean;
}) {
  return (
    <div className="group flex w-[72px] flex-col items-center gap-2 sm:w-[88px]">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/12 bg-white/[0.08] shadow-[inset_0_1px_0_rgba(255,255,255,0.08)] transition group-hover:border-white/25 sm:h-12 sm:w-12">
        <Image
          src={src}
          alt=""
          width={28}
          height={28}
          className={cn(
            "h-7 w-7 object-contain",
            invert && "brightness-0 invert"
          )}
        />
      </div>
      <span className="text-center font-pixel text-[10px] tracking-wide text-white/55">
        {name}
      </span>
    </div>
  );
}

export function LogoStrip() {
  const marks = () =>
    partners.map((p) => (
      <LogoMark key={p.name} name={p.name} src={p.src} invert={p.invert} />
    ));

  return (
    <section className="mx-auto max-w-6xl px-5 pt-1 pb-8 sm:pt-2 sm:pb-10 md:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.04] to-transparent px-4 py-6 sm:px-8 sm:py-8">
        <p className="text-center font-pixel text-[10px] tracking-[0.22em] text-white/40 uppercase">
          Works with
        </p>

        <div className="mt-5 grid grid-cols-3 justify-items-center gap-x-3 gap-y-5 sm:hidden">
          {marks()}
        </div>

        <LogoMarquee className="mt-6 hidden sm:block">{marks()}</LogoMarquee>

        <p className="relative mt-5 text-center text-[11px] text-white/35 sm:mt-6 sm:text-xs">
          Claude Code, ChatGPT, Cursor, or your own agent. Prompt in, video out.
        </p>
      </div>
    </section>
  );
}
