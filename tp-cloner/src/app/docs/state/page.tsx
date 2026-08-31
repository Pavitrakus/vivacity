import type { Metadata } from "next";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = {
  title: "State",
  description:
    "Vivacity stores world state. Observations are views. Pixels are not the world.",
  alternates: { canonical: "https://tryvivacity.com/docs/state" },
};

export default function StateDocs() {
  return (
    <DocsShell active="/docs/state">
      <p className="font-mono text-[11px] tracking-[0.16em] uppercase">Docs</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-[var(--ink)]">
        State
      </h1>
      <p className="mt-5">
        S<sub>t</sub> is the world at time t. O<sub>t</sub> is a view of that
        world. A<sub>t</sub> is an action. The runtime persists S, not a reel
        of frames. This is the entire thesis.
      </p>
      <pre className="plate mt-8 overflow-x-auto rounded-[2px] p-5 font-mono text-[12px] leading-6 text-[#efe8dc]">
{`S_{t+1} = T(S_t, A_t, C)
O_t     = R(S_t, V_t)
report  = V(S, constraints)`}
      </pre>
      <h2 className="mt-12 font-serif text-2xl text-[var(--ink)]">Persistence</h2>
      <p className="mt-3">
        A world has an identity. Forks copy that identity into a branch.
        Rollback restores a prior S. If the only record of the world is a
        generated clip, none of those operations exist.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-[var(--ink)]">Schemas</h2>
      <p className="mt-3">
        Orbital mechanics is positions, velocities, masses, and a potential.
        A circuit is nodes and currents. A warehouse is SKUs and poses. The
        runtime is shared. The schema is not. We will not invent a universal
        object and call it physics.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-[var(--ink)]">The instrument</h2>
      <p className="mt-3">
        The landing page runs an orbital-mechanics schema on an exact-physics
        backend. Drag to look. Fork Δv. Verify energy and eccentricity. Commit
        or roll back. That is a world, not a demo video.
      </p>
    </DocsShell>
  );
}
