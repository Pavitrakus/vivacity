const CASES = [
  {
    title: "Agent planning",
    body: "An agent that must choose a burn does not want a story. It wants one hundred velocities, a stability check, and a commit.",
  },
  {
    title: "Robotics",
    body: "Keep the same act / fork / verify verbs while the router sends work to a robotics simulator or a learned residual model.",
  },
  {
    title: "Scientific products",
    body: "Conservation laws, units, and constraints are gates. If the visual is pretty and the numbers are wrong, the run failed.",
  },
  {
    title: "Private engines",
    body: "Companies already have solvers. They should not rebuild orchestration, branching, and traces around each one.",
  },
];

export function UseCases() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
        07 — Who this is for
      </p>
      <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
        Teams whose agents have to touch a world.
      </h2>
      <div className="mt-10 grid gap-8 sm:grid-cols-2">
        {CASES.map((c) => (
          <div key={c.title} className="border-t border-white/10 pt-5">
            <h3 className="text-[16px] text-[#eeeae2]">{c.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-white/50">{c.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
