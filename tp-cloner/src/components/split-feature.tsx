"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { VideoPlayer } from "@/components/video-player";

export function SplitFeature() {
  const [mode, setMode] = useState<"exact" | "text">("exact");

  return (
    <section className="mx-auto grid max-w-6xl gap-8 px-5 py-12 sm:gap-12 sm:py-16 md:grid-cols-2 md:items-center md:gap-14 md:px-8">
      <div>
        <h2 className="font-pixel text-[1.75rem] tracking-tight text-balance sm:text-3xl md:text-4xl lg:text-[2.75rem] lg:leading-[1.12]">
          An AI answer does not need to look like a wall of text.
        </h2>
        <p className="mt-4 max-w-md text-[15px] leading-relaxed text-white/55 sm:mt-5 sm:text-base">
          Exact diagrams. Timed narration. Spatial coordination. The motion
          teachers sketch on a blackboard, generated for any prompt, document, or
          model output.
        </p>
        <a
          href="#process"
          className="mt-7 inline-flex font-pixel text-[12px] tracking-wide text-white/70 transition hover:text-white"
        >
          How the pipeline works →
        </a>
      </div>

      <div>
        <div className="mb-3 flex w-full rounded-full border border-white/12 bg-black/30 p-1 font-pixel text-[11px]">
          <button
            type="button"
            onClick={() => setMode("exact")}
            className={cn(
              "min-w-0 flex-1 rounded-full px-2 py-1.5 text-center transition sm:px-3.5",
              mode === "exact"
                ? "border border-white/25 bg-white/10 text-white"
                : "text-white/45"
            )}
          >
            With Vivacity
          </button>
          <button
            type="button"
            onClick={() => setMode("text")}
            className={cn(
              "min-w-0 flex-1 rounded-full px-2 py-1.5 text-center transition sm:px-3.5",
              mode === "text"
                ? "border border-white/25 bg-white/10 text-white"
                : "text-white/45"
            )}
          >
            Text-only answer
          </button>
        </div>
        {mode === "exact" ? (
          <VideoPlayer src="/videos/matrix.mp4" />
        ) : (
          <div className="soft-card flex aspect-video flex-col justify-center gap-3 p-6 font-mono text-xs leading-relaxed text-white/55 sm:p-8 sm:text-sm">
            <p className="text-white/30">model.generate()</p>
            <p>
              A matrix transforms vectors by linear combination of basis axes.
              Eigenvectors remain on their line. Eigenvalues scale them. In
              practice one multiplies…
            </p>
            <p className="text-white/30">[ 2,412 tokens of more text ]</p>
          </div>
        )}
      </div>
    </section>
  );
}
