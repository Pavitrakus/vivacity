export function QuoteStrip() {
  return (
    <section className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto max-w-[1400px] px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <p className="max-w-4xl font-serif text-[clamp(1.7rem,4vw,3.15rem)] leading-[1.12] tracking-[-0.03em] text-[var(--ink)]">
          Rendering is an observation.
          <span className="italic text-[var(--mute)]"> It is not the world.</span>
        </p>
      </div>
    </section>
  );
}
