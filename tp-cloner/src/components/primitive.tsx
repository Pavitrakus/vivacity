export function Primitive() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
        03 — The primitive
      </p>
      <h2 className="mt-3 max-w-3xl font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
        State is what is true. Observation is what somebody sees.
      </h2>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <Equation
          k="S_t"
          title="World state"
          body="Position, velocity, mass, fuel, constraints. The variables a backend can actually step. Pixels do not store these."
        />
        <Equation
          k="S_{t+1}=T(S_t,A_t,C)"
          title="Branchable transition"
          body="An action changes state under a constraint set. Fork several futures from the same S_t. Discard the bad ones. Commit one."
        />
        <Equation
          k="O_t=R(S_t,V_t)"
          title="Observation"
          body="A camera, a plot, a frame, a tensor. Rendering is optional and late. Agents do not have to see the whole world to act on it."
        />
      </div>
      <p className="mt-8 max-w-2xl text-sm leading-relaxed text-white/45">
        There is no universal schema for all reality. Orbits, circuits, and
        reaction networks need different state. The shared object is the
        transition protocol, plus domain adapters behind it.
      </p>
    </section>
  );
}

function Equation({
  k,
  title,
  body,
}: {
  k: string;
  title: string;
  body: string;
}) {
  return (
    <div className="panel p-6">
      <p className="font-serif text-[1.35rem] tracking-tight text-[#eeeae2]">{k}</p>
      <h3 className="mt-4 text-[15px] text-white/85">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/50">{body}</p>
    </div>
  );
}
