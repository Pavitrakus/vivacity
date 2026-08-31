import { faqs } from "@/lib/site";

export function FAQ() {
  return (
    <section id="faq" className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mute)] uppercase">
          FAQ
        </p>
        <h2 className="mt-4 font-serif text-[clamp(1.75rem,3.2vw,2.6rem)] leading-[1.12] tracking-[-0.03em] text-[var(--ink)]">
          Direct answers.
        </h2>
        <dl className="mt-12 divide-y divide-[var(--line)] border-t border-[var(--line)]">
          {faqs.map((f) => (
            <div key={f.q} className="grid gap-3 py-7 lg:grid-cols-[minmax(0,0.42fr)_minmax(0,0.58fr)] lg:gap-16">
              <dt className="text-[16px] leading-6 text-[var(--ink)]">{f.q}</dt>
              <dd className="text-[14.5px] leading-7 text-[var(--mute)]">{f.a}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
