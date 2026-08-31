import { POSITION } from "@/lib/site";

export function Position() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mute)] uppercase">
          Place
        </p>
        <h2 className="mt-4 max-w-2xl font-serif text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.12] tracking-[-0.03em] text-[var(--ink)]">
          Not a world model. Not a sandbox. The runtime in between.
        </h2>

        <div className="mt-12 divide-y divide-[var(--line)] border-y border-[var(--line)]">
          {POSITION.map((row) => (
            <article
              key={row.they}
              className="grid gap-4 py-8 lg:grid-cols-[minmax(0,0.32fr)_minmax(0,0.36fr)_minmax(0,0.32fr)] lg:gap-10"
            >
              <div>
                <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--mute)] uppercase">
                  Adjacent
                </p>
                <p className="mt-2 text-[17px] text-[var(--ink)]">{row.they}</p>
              </div>
              <p className="text-[14.5px] leading-7 text-[var(--mute)]">{row.theyNote}</p>
              <p className="text-[14.5px] leading-7 text-[var(--ink)]">{row.we}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
