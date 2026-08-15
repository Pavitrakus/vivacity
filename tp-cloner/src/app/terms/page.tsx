import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Terms - Vivacity",
};

export default function TermsPage() {
  return (
    <PageShell>
      <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
        Legal
      </p>
      <h1 className="mt-3 font-pixel text-3xl tracking-tight text-white sm:text-4xl">
        Terms of Service
      </h1>
      <p className="mt-2 text-sm text-white/40">Last updated: July 2026</p>

      <div className="mt-10 space-y-8 text-[15px] leading-relaxed text-white/65">
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            1. Agreement to terms
          </h2>
          <p className="mt-3">
            By accessing or using the Vivacity API and website, you agree to be bound
            by these Terms of Service. If you disagree with any part of the terms, you
            do not have permission to access the Service.
          </p>
        </section>
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            2. Intellectual property
          </h2>
          <p className="mt-3">
            Other than content you own (such as prompts you input), Vivacity and/or
            its licensors own the intellectual property rights and materials contained
            in this website and service.
          </p>
        </section>
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            3. Acceptable use
          </h2>
          <p className="mt-3">
            You agree not to use Vivacity to generate inappropriate, illegal, or
            harmful content, and to use the service in compliance with applicable laws.
          </p>
        </section>
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            4. Beta access
          </h2>
          <p className="mt-3">
            Early beta features may change, break, or be withdrawn. Access codes are
            personal and non-transferable without permission from the team.
          </p>
        </section>
        <section>
          <h2 className="font-pixel text-[12px] tracking-[0.14em] text-white/80 uppercase">
            5. Contact
          </h2>
          <p className="mt-3">
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
