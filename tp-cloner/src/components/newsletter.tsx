"use client";

export function Newsletter() {
  return (
    <section id="newsletter" className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <div className="soft-card p-6 sm:p-10">
        <p className="font-pixel text-[11px] tracking-[0.16em] text-white/40 uppercase">
          Newsletter
        </p>
        <h2 className="mt-3 max-w-lg font-pixel text-3xl tracking-tight sm:text-4xl">
          Notes on making video the default interface for AI.
        </h2>
        <form
          className="mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="email"
            required
            placeholder="you@company.com"
            className="flex-1 rounded-full border border-white/12 bg-black/50 px-4 py-2.5 text-sm outline-none placeholder:text-white/30 focus:border-white/35"
          />
          <button
            type="submit"
            className="rounded-full bg-white px-5 py-2.5 font-pixel text-[12px] tracking-wide text-black transition hover:bg-white/90"
          >
            Subscribe
          </button>
        </form>
        <p className="mt-3 text-xs text-white/35">
          Occasional notes, no spam. Unsubscribe anytime.
        </p>

        <div className="mt-10 grid gap-3 border-t border-white/10 pt-8 sm:grid-cols-3">
          {[
            {
              t: "Why exact motion beats doodles for STEM.",
              d: "When the diagram is wrong, the lesson is wrong.",
            },
            {
              t: "Video as a tool call for agents.",
              d: "Text was the easy medium. That is changing.",
            },
            {
              t: "Unit economics of explainer infra.",
              d: "If it is not cheap, chatbots will never call it.",
            },
          ].map((c) => (
            <article
              key={c.t}
              className="rounded-xl border border-white/10 bg-black/30 p-4 transition hover:border-white/20"
            >
              <h3 className="font-pixel text-sm leading-snug tracking-tight">{c.t}</h3>
              <p className="mt-2 text-xs text-white/40">{c.d}</p>
              <span className="mt-4 inline-flex font-pixel text-[11px] text-white/55">
                Read →
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
