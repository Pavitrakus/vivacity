export function Thesis() {
  return (
    <section className="border-y border-white/8">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-4 md:px-8 md:py-16">
        {[
          ["Models plan.", "Reasoning systems can propose a future."],
          ["Worlds generate.", "Video and world models can imagine one."],
          ["Simulators execute.", "Physics engines already know how to step."],
          ["Agents still glue.", "There is no common place to keep state."],
        ].map(([title, body]) => (
          <div key={title}>
            <p className="font-serif text-2xl tracking-tight text-[#eeeae2]">{title}</p>
            <p className="mt-2 text-sm leading-relaxed text-white/48">{body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
