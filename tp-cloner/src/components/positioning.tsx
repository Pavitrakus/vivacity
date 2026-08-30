const IS = [
  "A simulation runtime agents can call",
  "A common state / action / verify contract",
  "A router across exact and learned backends",
  "Developer infrastructure, sold to teams",
];

const IS_NOT = [
  "A foundation world model",
  "A claim that generated video is physics",
  "A finished universal environment",
  "A consumer education app",
];

export function Positioning() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
        06 — Position
      </p>
      <h2 className="mt-3 font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
        Precise about the bet.
      </h2>
      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-2">
        <List heading="Vivacity is" items={IS} />
        <List heading="Vivacity is not" items={IS_NOT} muted />
      </div>
      <p className="mt-6 max-w-2xl text-sm leading-relaxed text-white/45">
        World Labs, Genie, Cosmos, MuJoCo, Isaac, and domain solvers already
        exist. The disagreement is not “nobody understands state.” It is that
        production agents will need many of those systems through one
        execution layer, with traces they can trust.
      </p>
    </section>
  );
}

function List({
  heading,
  items,
  muted,
}: {
  heading: string;
  items: string[];
  muted?: boolean;
}) {
  return (
    <div className="bg-[#0b0d11] p-7">
      <p className="font-mono text-[10px] tracking-[0.14em] text-white/38 uppercase">
        {heading}
      </p>
      <ul className="mt-5 space-y-3">
        {items.map((item) => (
          <li
            key={item}
            className={muted ? "text-[15px] text-white/42" : "text-[15px] text-[#eeeae2]"}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
