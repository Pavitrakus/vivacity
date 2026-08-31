import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms",
  description: "Vivacity terms of use for the website and design-partner discussions.",
  alternates: { canonical: "https://tryvivacity.com/terms" },
};

export default function TermsPage() {
  return (
    <PageShell>
      <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--mute)] uppercase">
        Legal
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-[var(--ink)]">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-[var(--mute)]">Last updated: August 2026</p>
      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-[var(--mute)]">
        <section>
          <h2 className="text-[var(--ink)]">The site</h2>
          <p className="mt-3">
            The public site describes a simulation runtime and lets you request
            a demo. It is not a production API and it does not grant a license
            to any runtime software.
          </p>
        </section>
        <section>
          <h2 className="text-[var(--ink)]">Design partners</h2>
          <p className="mt-3">
            Any later access to software, schemas, or backends will be under a
            separate agreement. Materials on this site are conceptual unless a
            written contract says otherwise.
          </p>
        </section>
        <section>
          <h2 className="text-[var(--ink)]">Acceptable use</h2>
          <p className="mt-3">
            Do not use the site to attack, scrape in a way that degrades
            service, or submit unlawful content.
          </p>
        </section>
        <section>
          <h2 className="text-[var(--ink)]">Contact</h2>
          <p className="mt-3">
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-[var(--ink)] underline underline-offset-4"
            >
              {SITE_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </PageShell>
  );
}
