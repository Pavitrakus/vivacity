const SNIPPET = `world = create({
  schema: "orbital-mechanics",
  bodies: [
    { id: "earth", mass: 5.972e24 },
    { id: "sat", r: [6678e3, 0, 0], v: [0, 7.67e3, 0] },
  ],
})

world.observe()
branch = world.fork()
branch.act({ target: "sat", op: "scale_velocity", factor: 1.10 })
branch.simulate(horizon="2 orbits")
report = branch.verify(constraints=["bound", "clearance"])

if report.ok:
    world.commit(branch)
else:
    world.rollback(branch)`;

const VERBS = [
  ["create", "Compile a spec into typed, persistent state."],
  ["observe", "Return an observation, not the whole world."],
  ["act", "Apply an explicit action onto S_t."],
  ["simulate", "Step T through a horizon on a chosen backend."],
  ["fork", "Clone state so alternatives do not destroy the original."],
  ["verify", "Check constraints the pixels cannot prove."],
  ["commit", "Keep one branch as the new world."],
  ["rollback", "Drop a branch. The parent remains."],
];

export function RuntimeApi() {
  return (
    <section id="interface" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
        04 — Interface
      </p>
      <div className="mt-4 grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <h2 className="font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
            Eight verbs. Many backends.
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/55">
            This is the interface we are building with design partners — the
            contract, not a claim that every adapter already ships. Agents
            should not learn a new SDK for every simulator they touch.
          </p>
          <dl className="mt-8 space-y-4">
            {VERBS.map(([name, text]) => (
              <div key={name} className="grid grid-cols-[88px_1fr] gap-3 text-sm">
                <dt className="font-mono text-[12px] text-[#eeeae2]">{name}</dt>
                <dd className="text-white/50">{text}</dd>
              </div>
            ))}
          </dl>
        </div>
        <div className="panel overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/8 px-4 py-2.5 font-mono text-[10px] tracking-[0.12em] text-white/40 uppercase">
            <span>runtime.py</span>
            <span>conceptual</span>
          </div>
          <pre className="overflow-x-auto p-5 font-mono text-[12px] leading-6 text-[#d8d3c8] sm:text-[13px]">
            {SNIPPET}
          </pre>
        </div>
      </div>
    </section>
  );
}
