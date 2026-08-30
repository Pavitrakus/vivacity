import type { Metadata } from "next";
import Link from "next/link";
import { PageShell } from "@/components/page-shell";
import { SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Docs",
  description:
    "Vivacity runtime interface: create, observe, act, simulate, fork, verify, commit. Conceptual contract for design partners.",
  alternates: { canonical: "https://tryvivacity.com/docs" },
};

export default function DocsPage() {
  return (
    <PageShell wide>
      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
        <aside className="h-fit border border-white/10 p-4 lg:sticky lg:top-20">
          <p className="font-mono text-[10px] tracking-[0.14em] text-white/35 uppercase">
            Runtime
          </p>
          <nav className="mt-3 space-y-1 text-sm text-white/55">
            {[
              ["#intro", "Introduction"],
              ["#status", "Status"],
              ["#verbs", "Verbs"],
              ["#schemas", "Schemas"],
              ["#router", "Router"],
              ["#access", "Access"],
            ].map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="block rounded px-2 py-1.5 hover:bg-white/[0.04] hover:text-white"
              >
                {label}
              </a>
            ))}
          </nav>
        </aside>

        <article className="max-w-2xl space-y-12 text-[15px] leading-relaxed text-white/58">
          <div>
            <p className="font-mono text-[11px] tracking-[0.16em] text-white/40 uppercase">
              Docs · conceptual
            </p>
            <h1
              id="intro"
              className="mt-3 font-serif text-4xl tracking-tight text-[#eeeae2] sm:text-5xl"
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
              education engine we shipped is evidence that structured, checkable
              execution was the right first environment. The company is the
              layer that work revealed.
            </p>
          </div>

          <div>
            <h2 id="status" className="font-serif text-3xl text-[#eeeae2]">
              Status
            </h2>
            <p className="mt-4">
              Treat this document as the contract we are implementing with
              design partners. Domain schemas and WorldState primitives exist as
              prototypes extracted from the earlier engine. General routing,
              branching, and verification across arbitrary backends are being
              built. We will not pretend they are finished.
            </p>
          </div>

          <div>
            <h2 id="verbs" className="font-serif text-3xl text-[#eeeae2]">
              Verbs
            </h2>
            <pre className="mt-4 overflow-x-auto border border-white/10 bg-[#07080b] p-4 font-mono text-[12px] leading-6 text-[#d8d3c8]">
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
                <strong className="text-white/80">create</strong> compiles a
                high-level spec into a domain schema: objects, constraints,
                variables, relationships.
              </li>
              <li>
                <strong className="text-white/80">observe</strong> returns O_t =
                R(S_t, V_t). Agents may act without a full render.
              </li>
              <li>
                <strong className="text-white/80">act / simulate</strong> apply
                A_t and step S_&#123;t+1&#125; = T(S_t, A_t, C) on a chosen
                backend.
              </li>
              <li>
                <strong className="text-white/80">fork / commit / rollback</strong>{" "}
                keep alternatives addressable without destroying the parent
                world.
              </li>
              <li>
                <strong className="text-white/80">verify</strong> is numerical:
                conservation, clearance, units, constraints. A plausible frame
                is not a pass.
              </li>
            </ul>
          </div>

          <div>
            <h2 id="schemas" className="font-serif text-3xl text-[#eeeae2]">
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
            <h2 id="router" className="font-serif text-3xl text-[#eeeae2]">
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
            <h2 id="access" className="font-serif text-3xl text-[#eeeae2]">
              Access
            </h2>
            <p className="mt-4">
              There is no public signup and no self-serve key. If you want this
              in your agent loop,{" "}
              <Link href="/demo" className="text-[#eeeae2] underline underline-offset-4">
                book a demo
              </Link>{" "}
              or write {SITE_EMAIL}.
            </p>
          </div>
        </article>
      </div>
    </PageShell>
  );
}
