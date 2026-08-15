"use client";

import { GlowCard } from "@/components/ui/glow-card";
import { HighlightGrid } from "@/components/ui/highlight-grid";
import { ShineButton } from "@/components/ui/shine-button";
import { StatsCounter } from "@/components/ui/stats-counter";
import { StaggerText } from "@/components/ui/stagger-text";

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8">
      <h2 className="font-pixel text-[1.75rem] tracking-tight sm:text-3xl md:text-4xl">
        <StaggerText>The process.</StaggerText>
      </h2>
      <p className="mt-3 max-w-lg text-[15px] text-white/55 sm:text-base">
        One foundation. Then an engine that repeats. Near real-time, API
        callable, low unit cost.
      </p>

      <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-[0.9fr_1.45fr_0.85fr]">
        <GlowCard>
          <div className="p-5 sm:p-6">
            <span className="rounded-full bg-white/8 px-2.5 py-1 font-pixel text-[10px] tracking-wider text-white/65 uppercase">
              Foundational
            </span>
            <h3 className="mt-4 font-pixel text-lg tracking-tight">Infrastructure</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">
              Auth, jobs, storage, and the Scene IR contract agents call into.
            </p>
            <a
              href="/docs#api"
              className="mt-6 inline-flex font-pixel text-[12px] text-white/75 hover:text-white"
            >
              View the API shape →
            </a>
          </div>
        </GlowCard>

        <div className="soft-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between font-pixel text-[10px] tracking-wider text-white/40 uppercase sm:mb-6">
            <span>Every generation</span>
            <span>next job</span>
          </div>
          <HighlightGrid
            rows={[
              [
                { label: "Ingest" },
                { label: "Scene IR" },
              ],
              [
                { label: "Voice" },
                { label: "Motion" },
              ],
            ]}
          />
          <div className="mt-7 sm:mt-9">
            <div className="flex justify-between font-pixel text-[10px] text-white/35">
              <span>Start</span>
              <span>video_url</span>
            </div>
            <div className="mt-2 h-px bg-white/10">
              <div className="h-px w-3/4 bg-white/65" />
            </div>
          </div>
        </div>

        <GlowCard>
          <div className="flex h-full flex-col justify-center p-5 sm:p-6">
            <div className="font-pixel text-3xl tracking-tight sm:text-4xl">
              ~₹
              <StatsCounter value={7} />
            </div>
            <p className="mt-2 text-sm text-white/55">
              Per careful short render. Built to be called thousands of times.
            </p>
          </div>
        </GlowCard>
      </div>

      <ShineButton href="/docs#arch" variant="ghost" className="mt-8">
        See the full process →
      </ShineButton>
    </section>
  );
}
