import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Vivacity privacy policy for the website and design-partner conversations.",
  alternates: { canonical: "https://tryvivacity.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <p className="font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">
        Legal
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-[#eeeae2]">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-white/40">Last updated: August 2026</p>
      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-white/58">
        <section>
          <h2 className="text-[#eeeae2]">1. What this covers</h2>
          <p className="mt-3">
            This policy applies to tryvivacity.com and to notes you send when
            you book a demo. There is no public account system and no
            self-serve workspace.
          </p>
        </section>
        <section>
          <h2 className="text-[#eeeae2]">2. Information we collect</h2>
          <p className="mt-3">
            If you request a demo we receive the name, email, company, role,
            and project description you submit. The site may also collect
            ordinary server logs such as IP address and user agent.
          </p>
        </section>
        <section>
          <h2 className="text-[#eeeae2]">3. How we use it</h2>
          <p className="mt-3">
            We use that information to reply, to decide whether a
            design-partner engagement makes sense, and to operate the website.
            We do not sell it.
          </p>
        </section>
        <section>
          <h2 className="text-[#eeeae2]">4. Contact</h2>
          <p className="mt-3">
            Questions:{" "}
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-[#eeeae2] underline underline-offset-4"
            >
              {SITE_EMAIL}
            </a>
          </p>
        </section>
      </div>
    </PageShell>
  );
}
