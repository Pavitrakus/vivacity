export function Process() {
  const steps = [
    { n: "01", title: "Ingest", body: "Prompt, document, or model answer." },
    { n: "02", title: "Scene IR", body: "Pedagogy plan and spoken math." },
    { n: "03", title: "Voice", body: "Timed narration, duration locked." },
    { n: "04", title: "Motion", body: "Exact animation and QA repair." },
  ];

  return (
    <section id="process" className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8">
      <h2 className="font-pixel text-[1.75rem] tracking-tight sm:text-3xl md:text-4xl">
        The process.
      </h2>
      <p className="mt-3 max-w-lg text-[15px] text-white/55 sm:text-base">
        One foundation. Then an engine that repeats. Near real-time, API
        callable, low unit cost.
      </p>

      <div className="mt-8 grid gap-3 sm:mt-10 sm:gap-4 lg:grid-cols-[0.9fr_1.45fr_0.85fr]">
        <div className="soft-card p-5 sm:p-6">
          <span className="rounded-full bg-white/8 px-2.5 py-1 font-pixel text-[10px] tracking-wider text-white/65 uppercase">
            Foundational
          </span>
          <h3 className="mt-4 font-pixel text-lg tracking-tight">Infrastructure</h3>
          <p className="mt-2 text-sm leading-relaxed text-white/50">
            Auth, jobs, storage, and the Scene IR contract agents call into.
          </p>
          <a
            href="/docs#api"
            className="mt-6 inline-flex font-pixel text-[12px] text-white/75 hover:text-white"
          >
            View the API shape →
          </a>
        </div>

        <div className="soft-card p-5 sm:p-6">
          <div className="mb-5 flex items-center justify-between font-pixel text-[10px] tracking-wider text-white/40 uppercase sm:mb-6">
            <span>Every generation</span>
            <span>next job</span>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-5">
            {steps.map((s) => (
              <div key={s.n}>
                <div className="font-pixel text-[11px] text-white/35">{s.n}</div>
                <div className="mt-1 font-pixel text-sm tracking-tight">{s.title}</div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/45">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-7 sm:mt-9">
            <div className="flex justify-between font-pixel text-[10px] text-white/35">
              <span>Start</span>
              <span>video_url</span>
            </div>
            <div className="mt-2 h-px bg-white/10">
              <div className="h-px w-3/4 bg-white/65" />
            </div>
          </div>
        </div>

        <div className="soft-card flex flex-col justify-center p-5 sm:p-6">
          <div className="font-pixel text-3xl tracking-tight sm:text-4xl">~₹7</div>
          <p className="mt-2 text-sm text-white/55">
            Per careful short render. Built to be called thousands of times.
          </p>
        </div>
      </div>

      <a
        href="/docs#arch"
        className="mt-8 inline-flex rounded-full border border-white/15 px-5 py-2.5 font-pixel text-[12px] text-white/80 transition hover:border-white/40"
      >
        See the full process →
      </a>
    </section>
  );
}
