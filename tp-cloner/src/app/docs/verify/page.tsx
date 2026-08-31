import type { Metadata } from "next";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = {
  title: "Verify",
  description:
    "Vivacity verification is numerical: conservation, clearance, units, constraints. A plausible frame is not a pass.",
  alternates: { canonical: "https://tryvivacity.com/docs/verify" },
};

export default function VerifyDocs() {
  return (
    <DocsShell active="/docs/verify">
      <p className="font-mono text-[11px] tracking-[0.16em] uppercase">Docs</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-[var(--ink)]">
        Verify
      </h1>
      <p className="mt-5">
        A plausible frame is not a pass. Verification returns a report:
        conserved quantities, geometric clearance, unit consistency,
        constraint residuals. Backends that cannot produce those numbers are
        marked as such.
      </p>
      <h2 className="mt-12 font-serif text-2xl text-[var(--ink)]">Orbital example</h2>
      <p className="mt-3">
        The live instrument on the homepage checks energy, eccentricity,
        periapsis, and whether the trajectory intersects the body. Fork five
        Δv factors. Some branches fail. Commit the one that does not.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-[var(--ink)]">Honesty</h2>
      <p className="mt-3">
        Learned world models can still be used. They are not allowed to
        pretend they ran a conserved integrator. The report says what was
        checked and what was not. Design partners should expect that
        distinction in every backend adapter.
      </p>
    </DocsShell>
  );
}
