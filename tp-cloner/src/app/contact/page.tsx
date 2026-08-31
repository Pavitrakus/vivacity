import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact Vivacity for a design-partner demo. ${SITE_EMAIL}`,
  alternates: { canonical: "https://tryvivacity.com/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--mute)] uppercase">
        Contact
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-[var(--ink)] sm:text-5xl">
        Talk to the team.
      </h1>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-[var(--mute)]">
        Design-partner conversations, research collaborations, and press. No
        account required.
      </p>
      <div className="mt-10 flex flex-col gap-3">
        <Link
          href="/demo"
          className="inline-flex h-11 w-fit items-center rounded-full bg-[var(--ink)] px-6 text-[14px] text-[var(--paper)] hover:bg-black"
        >
          Book a demo
        </Link>
        <a
          href={`mailto:${SITE_EMAIL}`}
          className="text-sm text-[var(--mute)] underline underline-offset-4 hover:text-[var(--ink)]"
        >
          {SITE_EMAIL}
        </a>
      </div>
    </PageShell>
  );
}
