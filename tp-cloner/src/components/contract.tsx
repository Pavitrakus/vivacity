import { verbs } from "@/lib/site";

export function Contract() {
  return (
    <section id="interface" className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mute)] uppercase">
          Interface
        </p>
        <h2 className="mt-4 max-w-3xl font-serif text-[clamp(1.75rem,3.4vw,2.85rem)] leading-[1.12] tracking-[-0.03em] text-[var(--ink)]">
          Ten verbs. Persistent state. Branch, rewind, verify, then commit.
        </h2>
        <p className="mt-5 max-w-2xl text-[15px] leading-7 text-[var(--mute)]">
          Agents do not talk to a video model and hope. They call a runtime. The world is
          stored as state; rendering is one observation among many.
        </p>

        <div className="mt-12 grid gap-px overflow-hidden rounded-sm bg-[var(--line)] sm:grid-cols-2 lg:grid-cols-5">
          {verbs.map((v) => (
            <article key={v.name} className="bg-[var(--paper)] p-5">
              <p className="font-mono text-[13px] text-[var(--copper)]">{v.name}()</p>
              <p className="mt-3 text-[13.5px] leading-6 text-[var(--mute)]">{v.blurb}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
