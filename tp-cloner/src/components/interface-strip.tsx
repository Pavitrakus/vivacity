import { RouterGraph } from "@/components/router-graph";
import { backends } from "@/lib/site";

export function InterfaceStrip() {
  return (
    <section id="router" className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="grid items-start gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div>
            <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mute)] uppercase">
              Router
            </p>
            <h2 className="mt-4 font-serif text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.12] tracking-[-0.03em] text-[var(--ink)]">
              One interface. The right engine for the step.
            </h2>
            <p className="mt-5 text-[15px] leading-7 text-[var(--mute)]">
              A navigation agent should not wait on a video model. A materials agent should
              not pretend a game engine is chemistry. Vivacity keeps the contract stable and
              routes the work.
            </p>
          </div>
          <RouterGraph />
        </div>

        <ol className="mt-14 divide-y divide-[var(--line)] border border-[var(--line)] bg-[#f7f3ec]">
          {backends.map((b) => (
            <li
              key={b.name}
              className="grid grid-cols-[7.5rem_1fr] gap-4 px-5 py-4 sm:grid-cols-[10rem_1fr]"
            >
              <span className="font-mono text-[12px] text-[var(--ink)]">{b.name}</span>
              <span className="text-[13.5px] leading-6 text-[var(--mute)]">{b.note}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
