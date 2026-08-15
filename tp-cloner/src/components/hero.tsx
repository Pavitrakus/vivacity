"use client";

import { VideoPlayer } from "@/components/video-player";
import { AnimatedRays } from "@/components/ui/animated-rays";
import { MorphText } from "@/components/ui/morph-text";
import { ShineButton } from "@/components/ui/shine-button";
import { StaggerText } from "@/components/ui/stagger-text";

export function Hero() {
  return (
    <section className="relative mx-auto grid max-w-6xl gap-10 px-5 pt-24 pb-12 sm:gap-12 sm:pt-36 sm:pb-16 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-14 md:px-8 lg:pt-40">
      <AnimatedRays className="opacity-70" />
      <div className="relative">
        <a
          href="#people"
          className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 font-pixel text-[11px] tracking-wide text-white/75 transition hover:border-white/35 hover:text-white sm:mb-7"
        >
          Hear from builders →
        </a>
        <h1 className="font-pixel text-[2rem] leading-[1.1] tracking-tight text-balance sm:text-[2.35rem] sm:leading-[1.08] md:text-5xl lg:text-[3.4rem]">
          <StaggerText>LLMs answer in text.</StaggerText>
          <span className="mt-1 block text-white/90">
            <StaggerText delay={0.18}>We make it move.</StaggerText>
          </span>
        </h1>
        <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/60 sm:mt-6 sm:text-[15px] md:text-base">
          Near-real-time video infrastructure for{" "}
          <MorphText
            words={["LLMs", "agents", "EdTech", "tutors"]}
            className="font-pixel text-white"
          />
          . Turn prompts, documents, and AI answers into mathematically exact
          explainer videos. Coordinated. Narrated. Cheap enough to call from an
          agent.
        </p>
        <div className="mt-7 grid max-w-md grid-cols-2 gap-2 sm:mt-9 sm:flex sm:max-w-none sm:flex-wrap sm:gap-3">
          <ShineButton href="#cta" className="w-full sm:w-auto">
            Book a call
          </ShineButton>
          <ShineButton href="#work" variant="ghost" className="w-full sm:w-auto">
            See our work
          </ShineButton>
        </div>
      </div>

      <div className="relative">
        <VideoPlayer
          src="/videos/unit_circle.mp4"
          badge="UNIT CIRCLE"
          caption="Mathematically exact Manim motion"
          className="ring-1 ring-white/5"
        />
        <p className="mt-3 font-pixel text-[11px] tracking-wide text-white/40">
          The engine showreel.
        </p>
      </div>
    </section>
  );
}
