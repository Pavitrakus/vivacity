import type { Metadata } from "next";
import { DocsShell } from "@/components/docs-shell";

export const metadata: Metadata = {
  title: "Interface",
  description:
    "Vivacity verbs: create, observe, act, simulate, fork, rollback, verify, commit, render.",
  alternates: { canonical: "https://tryvivacity.com/docs/interface" },
};

export default function InterfaceDocs() {
  return (
    <DocsShell active="/docs/interface">
      <p className="font-mono text-[11px] tracking-[0.16em] uppercase">Docs</p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-[var(--ink)]">
        Interface
      </h1>
      <p className="mt-5">
        Agents call a runtime. The surface is small on purpose. Every verb
        either reads state, writes state, or produces a report about state.
        Rendering is last and optional.
      </p>
      <pre className="plate mt-8 overflow-x-auto rounded-[2px] p-5 font-mono text-[12px] leading-6 text-[#efe8dc]">
{`create(spec) -> World
observe(view?) -> Observation
act(action) -> State
simulate(horizon) -> Trace
fork() -> Branch
verify(constraints) -> Report
commit(branch) -> World
rollback(branch) -> World
render(view) -> Frame`}
      </pre>
      <h2 className="mt-12 font-serif text-2xl text-[var(--ink)]">create</h2>
      <p className="mt-3">
        A spec names a domain schema and initial conditions. The runtime
        compiles that into objects, constraints, and a live world identifier.
        create does not generate video.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-[var(--ink)]">observe / render</h2>
      <p className="mt-3">
        observe returns whatever view the caller asked for — telemetry, a
        mesh, a camera. render is the special case where that view is pixels.
        Agents that can act on numbers should not be forced through a decoder.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-[var(--ink)]">act / simulate</h2>
      <p className="mt-3">
        act applies one action. simulate steps a horizon. Both go through the
        router. The backend may be exact, approximate, or learned. The
        contract does not change.
      </p>
      <h2 className="mt-10 font-serif text-2xl text-[var(--ink)]">fork / commit / rollback</h2>
      <p className="mt-3">
        Alternatives stay addressable. The parent world is not destroyed when
        a branch is opened. commit promotes a branch that passed. rollback
        restores the parent.
      </p>
    </DocsShell>
  );
}
