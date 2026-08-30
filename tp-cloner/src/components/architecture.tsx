const STEPS = [
  { k: "01", title: "World compiler", body: "Turns “simulate orbital mechanics” into objects, variables, constraints, and an objective." },
  { k: "02", title: "Canonical state", body: "A domain schema, not a universal ontology. Persistent, addressable, forkable." },
  { k: "03", title: "Action interface", body: "move, setParameter, applyForce, attach — explicit, typed, replayable." },
  { k: "04", title: "Execution router", body: "Chooses exact physics, a scientific solver, a robotics sim, a game engine, a world model, or a private backend." },
  { k: "05", title: "Branch + critic", body: "fork → simulate → compare → rollback or commit. The planner sees traces, not frames." },
  { k: "06", title: "Observation", body: "Render only if a human or a vision model needs O_t. State does not live in the image." },
];

const BACKENDS = [
  "Exact physics",
  "Scientific solvers",
  "Learned world models",
  "Robotics simulators",
  "Game engines",
  "Private company backends",
];

export function Architecture() {
  return (
    <section id="architecture" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
        05 — Architecture
      </p>
      <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
        Route the work. Keep the memory.
      </h2>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-white/55">
        The defensible piece is not prettier rendering. It is the operating
        memory of execution: states, adapters, action-to-outcome traces, and
        verification. Every backend makes the runtime useful in more rooms.
        Every run leaves a trace the next planner can use.
      </p>

      <ol className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
        {STEPS.map((s) => (
          <li key={s.k} className="bg-[#0b0d11] p-6">
            <p className="font-mono text-[10px] tracking-[0.14em] text-white/35">{s.k}</p>
            <h3 className="mt-3 text-[16px] text-[#eeeae2]">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/48">{s.body}</p>
          </li>
        ))}
      </ol>

      <div className="mt-8">
        <p className="font-mono text-[10px] tracking-[0.14em] text-white/38 uppercase">
          Router targets
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {BACKENDS.map((b) => (
            <span
              key={b}
              className="rounded-full border border-white/10 px-3 py-1.5 font-mono text-[11px] text-white/60"
            >
              {b}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
