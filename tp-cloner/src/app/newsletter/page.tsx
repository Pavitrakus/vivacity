import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { NEWSLETTERS } from "@/lib/newsletters";

export const metadata: Metadata = {
  title: "Newsletter - Vivacity",
  description: "Notes on making video the default interface for AI.",
};

export default function NewsletterIndexPage() {
  return (
    <PageShell wide>
      <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
        Newsletter
      </p>
      <h1 className="mt-3 max-w-2xl font-pixel text-3xl tracking-tight text-white sm:text-4xl">
        Notes on making video the default interface for AI.
      </h1>
      <p className="mt-4 max-w-lg text-[15px] text-white/55">
        Occasional notes. No spam. Subscribe from the homepage, or read the archive
        below.
      </p>

      <div className="mt-12 grid gap-4 sm:grid-cols-3">
        {NEWSLETTERS.map((n) => (
          <Link
            key={n.slug}
            href={`/newsletter/${n.slug}`}
            className="rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition hover:border-white/25"
          >
            <p className="font-pixel text-[10px] text-white/35">{n.date}</p>
            <h2 className="mt-3 font-pixel text-sm leading-snug tracking-tight text-white">
              {n.title}
            </h2>
            <p className="mt-2 text-xs text-white/45">{n.blurb}</p>
            <span className="mt-5 inline-flex font-pixel text-[11px] text-white/60">
              Read →
            </span>
          </Link>
        ))}
      </div>
    </PageShell>
  );
}
