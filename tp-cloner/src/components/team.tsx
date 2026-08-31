import { team } from "@/lib/site";

export function Team() {
  return (
    <section id="team" className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mute)] uppercase">
          Team
        </p>
        <h2 className="mt-4 max-w-xl font-serif text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.12] tracking-[-0.03em] text-[var(--ink)]">
          Three builders. Systems, research, pipelines.
        </h2>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-sm bg-[var(--line)] sm:grid-cols-3">
          {team.map((p) => (
            <li key={p.name} className="bg-[var(--paper)] p-6">
              <p className="font-serif text-[1.45rem] tracking-[-0.03em] text-[var(--ink)]">
                {p.name}
              </p>
              <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-[var(--copper)] uppercase">
                {p.role}
              </p>
              <p className="mt-4 text-[13.5px] leading-6 text-[var(--mute)]">{p.note}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
