import { TEAM } from "@/lib/site";

export function Team() {
  return (
    <section id="team" className="mx-auto max-w-6xl px-5 py-20 md:px-8 md:py-28">
      <p className="font-mono text-[11px] tracking-[0.16em] text-white/38 uppercase">
        08 — Founders
      </p>
      <h2 className="mt-3 max-w-2xl font-serif text-3xl tracking-tight text-[#eeeae2] sm:text-5xl">
        Three people who write the code.
      </h2>
      <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/55">
        We met through hackathons in Kanpur, built together, and shipped the
        first Vivacity engine ourselves. No agency wrote the core. The runtime
        is the same kind of work: systems, research, and production pipelines
        in one room.
      </p>
      <div className="mt-10 grid gap-px overflow-hidden rounded-lg border border-white/10 bg-white/10 md:grid-cols-3">
        {TEAM.map((person) => (
          <div key={person.name} className="bg-[#0b0d11] p-6">
            <h3 className="text-[16px] text-[#eeeae2]">{person.name}</h3>
            <p className="mt-1 font-mono text-[11px] text-white/40">{person.role}</p>
            <p className="mt-4 text-sm leading-relaxed text-white/50">{person.note}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
