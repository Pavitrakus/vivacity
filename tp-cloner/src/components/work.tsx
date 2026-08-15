"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { VideoPlayer } from "@/components/video-player";

const items = [
  { title: "Unit circle", tag: "Trigonometry", src: "/videos/unit_circle.mp4" },
  { title: "Matrix intuition", tag: "Linear algebra", src: "/videos/matrix.mp4" },
  { title: "Divergence", tag: "Vector calculus", src: "/videos/divergence.mp4" },
  { title: "Demo reel 01", tag: "Physics", src: "/videos/demo-vid1.mp4" },
  { title: "Demo reel 02", tag: "Concepts", src: "/videos/demo-537.mp4" },
];

export function Work() {
  const scroller = useRef<HTMLDivElement>(null);
  const scrollBy = (dir: number) => {
    scroller.current?.scrollBy({ left: dir * 420, behavior: "smooth" });
  };

  return (
    <section id="work" className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8">
      <div className="mb-8 flex items-end justify-between gap-6 sm:mb-10">
        <div className="max-w-xl">
          <h2 className="font-pixel text-[1.75rem] tracking-tight sm:text-3xl md:text-4xl">
            Some of our work.
          </h2>
          <p className="mt-3 text-[14px] leading-relaxed text-white/55 sm:text-sm md:text-base">
            Math, physics, and concept explainers. Prompt in, coordinated Manim
            motion out. For the moments a whiteboard doodle is not enough.
          </p>
        </div>
        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            aria-label="Previous"
            onClick={() => scrollBy(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/75 transition hover:border-white/35"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => scrollBy(1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/12 text-white/75 transition hover:border-white/35"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={scroller}
        className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 [-ms-overflow-style:none] [scrollbar-width:none] sm:gap-5 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item) => (
          <article
            key={item.title}
            className="w-[min(86vw,420px)] shrink-0 snap-start sm:w-[440px]"
          >
            <VideoPlayer src={item.src} />
            <h3 className="mt-3 font-pixel text-sm tracking-tight">{item.title}</h3>
            <p className="text-sm text-white/40">{item.tag}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
