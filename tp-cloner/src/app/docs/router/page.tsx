import type { Metadata } from "next";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = {
  title: "Router",
  description:
    "Vivacity routes each step to exact physics, scientific solvers, robotics sims, or world models.",
  alternates: { canonical: "https://tryvivacity.com/docs/router" },
};

export default function RouterDocs() {
  return (
    <DocsShell active="/docs/router">
      <p className="font-mono text-[11px] tracking-[0.16em] uppercase">Docs</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-[var(--ink)]">
        Router
      </h1>
      <p className="mt-5">
        One interface. Many engines. The router picks a backend for a branch
        based on what the step is allowed to get wrong — and how fast it must
        return.
      </p>
      <h2 className="mt-12 font-serif text-2xl text-[var(--ink)]">When exact</h2>
      <p className="mt-3">
        If the law is known, use it. Orbits, rigid bodies, circuits, many
        robotics contacts. Conservation is cheap here. A video model is a
        waste of time and a source of silent error.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-[var(--ink)]">When learned</h2>
      <p className="mt-3">
        Some scenes have no closed form. World Labs, Decart, Genie, Cosmos
        and their successors belong here. The runtime still owns state,
        forks, and whatever checks the backend can support. A learned model
        is not allowed to claim it conserved energy unless it did.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-[var(--ink)]">When private</h2>
      <p className="mt-3">
        Plants, warehouses, proprietary solvers. The agent still speaks
        create / act / fork. The backend stays on the customer side. That is
        the point of a runtime instead of a single hosted generator.
      </p>
    </DocsShell>
  );
}
