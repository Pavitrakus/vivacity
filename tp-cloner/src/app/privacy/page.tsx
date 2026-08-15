import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Privacy",
  description:
    "Vivacity privacy policy. How we collect, use, and safeguard information for the website and video generation API.",
  alternates: { canonical: "https://tryvivacity.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <PageShell>
      <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
        Legal
      </p>
      <h1 className="mt-3 font-pixel text-3xl tracking-tight text-white sm:text-4xl">
        Privacy Policy
      </h1>
      <p className="mt-2 text-sm text-white/40">Last updated: July 2026</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-white/65">
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            1. Introduction
          </h2>
          <p className="mt-3">
            At Vivacity, we take your privacy seriously. This Privacy Policy explains
            how we collect, use, disclose, and safeguard your information when you
            visit our website or use our video generation API and services.
          </p>
        </section>
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            2. Information we collect
          </h2>
          <p className="mt-3">
            We may collect information you provide directly (account details, payment
            information), data collected automatically (IP addresses, browser
            characteristics), and data generated through your use of the API (prompts
            and rendered videos).
          </p>
        </section>
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            3. Use of your information
          </h2>
          <p className="mt-3">
            We use information to generate requested animations, process payments,
            operate the service, and improve rendering infrastructure.
          </p>
        </section>
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            4. Data security
          </h2>
          <p className="mt-3">
            We use administrative, technical, and physical security measures to help
            protect personal information. Rendered videos and prompt data are encrypted
            at rest and in transit where applicable.
          </p>
        </section>
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            5. Contact
          </h2>
          <p className="mt-3">
            Questions:{" "}
            <a
              href="mailto:pavitra@paxus.in"
              className="text-white underline underline-offset-4"
            >
              pavitra@paxus.in
            </a>
          </p>
        </section>
      </div>
    </PageShell>
  );
}
