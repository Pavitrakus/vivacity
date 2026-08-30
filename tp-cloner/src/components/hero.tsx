import Link from "next/link";
import { HeroOrbit } from "@/components/hero-orbit";

export function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-5 pt-28 pb-16 md:px-8 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="font-mono text-[11px] tracking-[0.18em] text-white/40 uppercase">
          Design partners · private runtime
        </p>
        <h1 className="mt-5 font-serif text-[2.6rem] leading-[1.05] tracking-tight text-[#eeeae2] sm:text-6xl md:text-[4.4rem]">
          Simulation runtime
          <span className="block italic text-white/72">for AI agents.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/55 sm:text-base">
          One interface to instantiate a world, inspect its state, change it,
          fork alternatives, send each branch through the right simulator, and
          verify what actually happened. Not a world model. The layer around
          them.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/demo"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-[#eeeae2] px-6 text-[14px] text-[#0a0b0d] hover:bg-white sm:w-auto"
          >
            Book a demo
          </Link>
          <Link
            href="#lab"
            className="inline-flex h-11 w-full items-center justify-center rounded-full border border-white/15 px-6 text-[14px] text-white/80 hover:border-white/35 hover:text-white sm:w-auto"
          >
            Open the orbit lab
          </Link>
        </div>
      </div>

      <div className="mx-auto mt-14 max-w-3xl">
        <HeroOrbit />
        <p className="mt-3 text-center font-mono text-[11px] text-white/35">
          Persistent state. The pixels are an observation of S<sub>t</sub>, not
          the world.
        </p>
      </div>
    </section>
  );
}
