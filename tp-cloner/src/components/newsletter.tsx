"use client";

import Link from "next/link";
import { NEWSLETTERS } from "@/lib/newsletters";

export function Newsletter() {
  return (
    <section id="newsletter" className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <div className="soft-card p-6 sm:p-10">
        <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
          Newsletter
        </p>
        <h2 className="mt-3 max-w-lg font-pixel text-3xl tracking-tight sm:text-4xl">
          Notes on making video the default interface for AI.
        </h2>
        <form
          className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href =
              "mailto:pavitra@paxus.in?subject=Vivacity%20newsletter%20subscribe";
          }}
        >
          <input
            type="email"
            required
            name="email"
            placeholder="you@company.com"
            className="flex-1 rounded-full border border-white/12 bg-black/50 px-4 py-2.5 text-sm outline-none placeholder:text-white/30 focus:border-white/35"
          />
          <button
            type="submit"
            className="relative overflow-hidden rounded-full bg-white px-5 py-2.5 font-pixel text-[12px] tracking-wide text-black transition hover:bg-white/90"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-white/35">
          Occasional notes, no spam. Or browse the{" "}
          <Link href="/newsletter" className="text-white/60 underline underline-offset-2">
            archive
          </Link>
          .
        </p>

        <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
          {NEWSLETTERS.map((c) => (
            <Link
              key={c.slug}
              href={`/newsletter/${c.slug}`}
              className="rounded-xl border border-white/10 bg-black/30 p-4 transition duration-300 hover:-translate-y-0.5 hover:border-white/25"
            >
              <h3 className="font-pixel text-sm leading-snug tracking-tight">
                {c.title}
              </h3>
              <p className="mt-2 text-xs text-white/40">{c.blurb}</p>
              <span className="mt-4 inline-flex font-pixel text-[11px] text-white/55">
                Read →
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
