export function CodePlate() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto grid max-w-[1400px] items-start gap-10 px-5 py-16 sm:px-8 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:px-12 lg:py-24">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mute)] uppercase">
            Contract
          </p>
          <h2 className="mt-4 font-serif text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.12] tracking-[-0.03em] text-[var(--ink)]">
            The agent talks to a world, not a clip.
          </h2>
          <p className="mt-5 text-[15px] leading-7 text-[var(--mute)]">
            State is what is true. Observation is what somebody sees. A plausible
            frame is not a pass. The runtime keeps those facts separate so an
            agent can plan, branch, and check.
          </p>
        </div>
        <pre className="plate overflow-x-auto rounded-[2px] p-6 font-mono text-[12.5px] leading-7 text-[#efe8dc] sm:p-8 sm:text-[13.5px]">
          <code>
            {`world  = create(spec)
O_t    = world.observe(view?)
S_t+1  = world.act(A_t)
trace  = world.simulate(horizon)
branch = world.fork()
report = branch.verify(constraints)
world.commit(branch)
world.rollback(branch)
frame  = world.render(view)`}
          </code>
        </pre>
      </div>
    </section>
  );
}
