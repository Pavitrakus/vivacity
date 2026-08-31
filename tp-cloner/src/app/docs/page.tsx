import type { Metadata } from "next";
import Link from "next/link";
import { DocsShell } from "@/components/docs-shell";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Vivacity runtime interface: create, observe, act, simulate, fork, verify, commit. Conceptual contract for design partners.",
  alternates: { canonical: "https://tryvivacity.com/docs" },
};

export default function DocsPage() {
  return (
    <DocsShell active="/docs">
      <div className="space-y-14">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--mute)] uppercase">
              Docs · conceptual
            </p>
            <h1
              id="intro"
              className="mt-3 font-serif text-4xl tracking-tight text-[var(--ink)] sm:text-5xl"
            >
              Simulation runtime
            </h1>
            <p className="mt-5">
              Vivacity is a common interface through which an agent can create a
              world, inspect state, change it, simulate alternatives, verify
              outcomes, and render observations using the appropriate simulator
              or world model.
            </p>
            <p className="mt-3">
              It is not a video API. It is not a foundation world model. The
              pixels an agent sees are an observation of a world that already
              exists as state.
            </p>
          </div>

          <div>
            <h2 id="status" className="font-serif text-3xl text-[var(--ink)]">
              Status
            </h2>
            <p className="mt-4">
              Treat this document as the contract we are implementing with
              design partners. Domain schemas and WorldState primitives exist as
              prototypes. General routing, branching, and verification across
              arbitrary backends are being built. We will not pretend they are
              finished.
            </p>
          </div>

          <div>
            <h2 id="verbs" className="font-serif text-3xl text-[var(--ink)]">
              Verbs
            </h2>
            <pre className="plate mt-4 overflow-x-auto rounded-[2px] p-5 font-mono text-[12px] leading-6 text-[#efe8dc]">
{`world = create(spec)
world.observe(view?)
world.act(action)
trace = world.simulate(horizon)
branch = world.fork()
report = branch.verify(constraints)
world.commit(branch)
world.rollback(branch)
world.render(view)`}
            </pre>
            <ul className="mt-5 space-y-3">
              <li>
                <strong className="text-[var(--ink)]">create</strong> compiles a
                high-level spec into a domain schema: objects, constraints,
                variables, relationships.
              </li>
              <li>
                <strong className="text-[var(--ink)]">observe</strong> returns
                O<sub>t</sub> = R(S<sub>t</sub>, V<sub>t</sub>). Agents may act
                without a full render.
              </li>
              <li>
                <strong className="text-[var(--ink)]">act / simulate</strong>{" "}
                apply A<sub>t</sub> and step S<sub>t+1</sub> = T(S<sub>t</sub>,
                A<sub>t</sub>, C) on a chosen backend.
              </li>
              <li>
                <strong className="text-[var(--ink)]">fork / commit / rollback</strong>{" "}
                keep alternatives addressable without destroying the parent
                world.
              </li>
              <li>
                <strong className="text-[var(--ink)]">verify</strong> is numerical:
                conservation, clearance, units, constraints. A plausible frame
                is not a pass.
              </li>
            </ul>
          </div>

          <div>
            <h2 id="state" className="font-serif text-3xl text-[var(--ink)]">
              State
            </h2>
            <p className="mt-4">
              S<sub>t</sub> is the world. O<sub>t</sub> is a view. A<sub>t</sub>{" "}
              is an action. The runtime stores S, not a reel of frames. Forks
              copy addressable state. Rollback restores it. Commit promotes a
              branch that passed verification.
            </p>
          </div>

          <div>
            <h2 id="schemas" className="font-serif text-3xl text-[var(--ink)]">
              Schemas
            </h2>
            <p className="mt-4">
              We do not believe one magical state object can represent all
              reality. Orbital mechanics needs positions and masses. Circuits
              need nodes and currents. Chemistry needs a different description.
              The runtime is shared. The schemas are not.
            </p>
          </div>

          <div>
            <h2 id="router" className="font-serif text-3xl text-[var(--ink)]">
              Router
            </h2>
            <p className="mt-4">
              The router selects a backend for a branch: exact physics, a
              scientific solver, a robotics simulator, a game engine, a learned
              world model, or a private company system. Correctness, latency,
              and cost differ. That is the point of routing instead of betting
              the company on one generator.
            </p>
          </div>

          <div>
            <h2 id="verify" className="font-serif text-3xl text-[var(--ink)]">
              Verify
            </h2>
            <p className="mt-4">
              Verification is not a caption model saying the scene looks right.
              It is a report: energy drift, eccentricity, periapsis, constraint
              residuals, unit consistency. Backends that cannot produce those
              numbers are marked as such. Learned models can still be used;
              they are not allowed to pretend they conserved anything.
            </p>
          </div>

          <div>
            <h2 id="access" className="font-serif text-3xl text-[var(--ink)]">
              Access
            </h2>
            <p className="mt-4">
              There is no public signup and no self-serve key. If you want this
              in your agent loop,{" "}
              <Link
                href="/demo"
                className="text-[var(--ink)] underline underline-offset-4"
              >
                book a demo
              </Link>{" "}
              or write {SITE_EMAIL}.
            </p>
          </div>
      </div>
    </DocsShell>
  );
}
