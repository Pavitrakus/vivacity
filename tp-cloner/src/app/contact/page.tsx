import type { Metadata } from "next";
import { PageShell } from "@/components/page-shell";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Vivacity for early beta access, EdTech pilots, agent integrations, and partnerships. Email pavitra@paxus.in.",
  alternates: { canonical: "https://tryvivacity.com/contact" },
};

export default function ContactPage() {
  return (
    <PageShell>
      <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
        Contact
      </p>
      <h1 className="mt-3 font-pixel text-3xl tracking-tight text-white sm:text-4xl">
        Talk to the team.
      </h1>
      <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/60">
        Early beta, partnerships, EdTech pilots, or agent integrations. One email is
        enough.
      </p>

      <div className="mt-10 space-y-4">
        <a
          href="mailto:pavitra@paxus.in?subject=Vivacity%20call"
          className="inline-flex rounded-full bg-white px-6 py-3 font-pixel text-[12px] text-black transition hover:bg-white/90"
        >
          Book a call
        </a>
        <p className="text-sm text-white/45">
          Or write{" "}
          <a
            href="mailto:pavitra@paxus.in"
            className="text-white underline underline-offset-4"
          >
            pavitra@paxus.in
          </a>
        </p>
        <p className="text-sm text-white/45">
          Need workspace access?{" "}
          <a href="/signin" className="text-white underline underline-offset-4">
            Request beta / enter code
          </a>
        </p>
      </div>
    </PageShell>
  );
}
