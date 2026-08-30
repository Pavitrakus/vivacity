export function Problem() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
        02 — Why this layer exists
      </p>
      <div className="mt-4 grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
            Illustration is not execution.
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/55">
            Ask a model what happens if a satellite speeds up by ten percent and
            it will narrate a plausible story. Ask a generator and it will
            produce another clip. Neither kept the orbit. Neither evolved it.
            Neither can tell you which of five futures remains bound.
          </p>
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-white/55">
            We learned this the hard way. Vivacity started as a structured
            scientific execution engine: exact problems became checkable scenes.
            Interactivity broke the abstraction. Changing a variable meant
            generating again, because nothing persisted underneath the render.
          </p>
        </div>
        <div className="grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10">
          <Compare
            label="Today"
            title="Regenerate the output"
            points={[
              "LLM predicts the next visual",
              "Pixels do not remember fuel, mass, or velocity",
              "A new request throws the last world away",
              "You cannot fork, compare, or roll back",
            ]}
          />
          <Compare
            label="Runtime"
            title="Evolve the state"
            points={[
              "v′ = 1.1 v is an action on S_t",
              "A backend steps S_{t+1} = T(S_t, A_t, C)",
              "Branches stay addressable until commit",
              "Verification is numerical, not cinematic",
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function Compare({
  label,
  title,
  points,
}: {
  label: string;
  title: string;
  points: string[];
}) {
  return (
    <div className="bg-[#0b0d11] p-6">
      <p className="font-mono text-[10px] tracking-[0.14em] text-white/38 uppercase">
        {label}
      </p>
      <h3 className="mt-2 font-serif text-2xl text-[#eeeae2]">{title}</h3>
      <ul className="mt-4 space-y-2 text-sm text-white/55">
        {points.map((p) => (
          <li key={p} className="pl-4 -indent-4">
            <span className="mr-2 text-white/25">/</span>
            {p}
          </li>
        ))}
      </ul>
    </div>
  );
}
