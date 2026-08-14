import { VideoPlayer } from "@/components/video-player";

export function Hero() {
  return (
    <section className="mx-auto grid max-w-6xl gap-10 px-5 pb-12 pt-28 sm:gap-12 sm:pb-16 sm:pt-36 md:grid-cols-[1.05fr_1fr] md:items-center md:gap-14 md:px-8 lg:pt-40">
      <div>
        <a
          href="#people"
          className="mb-5 inline-flex items-center rounded-full border border-white/15 bg-white/[0.03] px-3.5 py-1.5 font-pixel text-[11px] tracking-wide text-white/75 transition hover:border-white/35 hover:text-white sm:mb-7"
        >
          Hear from builders →
        </a>
        <h1 className="font-pixel text-[2rem] leading-[1.1] tracking-tight text-balance sm:text-[2.35rem] sm:leading-[1.08] md:text-5xl lg:text-[3.4rem]">
          LLMs answer in text.
          <span className="mt-1 block text-white/90">We make it move.</span>
        </h1>
        <p className="mt-5 max-w-md text-[14px] leading-relaxed text-white/60 sm:mt-6 sm:text-[15px] md:text-base">
          Near-real-time video infrastructure for LLMs. Turn prompts, documents,
          and AI answers into mathematically exact explainer videos. Coordinated.
          Narrated. Cheap enough to call from an agent.
        </p>
        <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
          <a
            href="#cta"
            className="rounded-full bg-white px-5 py-2.5 text-center font-pixel text-[12px] tracking-wide text-black transition hover:bg-white/90"
          >
            Book a call
          </a>
          <a
            href="#work"
            className="rounded-full border border-white/20 bg-black/40 px-5 py-2.5 text-center font-pixel text-[12px] tracking-wide text-white transition hover:border-white/45"
          >
            See our work
          </a>
        </div>
      </div>

      <div>
        <VideoPlayer
          src="/videos/unit_circle.mp4"
          badge="UNIT CIRCLE"
          caption="Mathematically exact Manim motion"
          className="ring-1 ring-white/5"
        />
        <p className="mt-3 font-pixel text-[11px] tracking-wide text-white/40">
          The engine showreel.
        </p>
      </div>
    </section>
  );
}
