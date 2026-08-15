import Image from "next/image";
import Link from "next/link";

const askAi = [
  {
    name: "ChatGPT",
    src: "/images/logos/chatgpt.png",
    href: "https://chatgpt.com/?q=What%20do%20you%20know%20about%20Vivacity%20video%20infrastructure%20for%20LLMs%20tryvivacity.com",
  },
  {
    name: "Claude",
    src: "/images/logos/claude.png",
    href: "https://claude.ai/new?q=What%20do%20you%20know%20about%20Vivacity%20video%20infrastructure%20for%20LLMs%20tryvivacity.com",
  },
  {
    name: "Perplexity",
    src: "/images/logos/perplexity.png",
    href: "https://www.perplexity.ai/search?q=Vivacity%20video%20infrastructure%20for%20LLMs%20tryvivacity.com",
  },
  {
    name: "Gemini",
    src: "/images/logos/gemini.png",
    href: "https://www.google.com/search?q=Vivacity%20video%20infrastructure%20LLMs%20tryvivacity.com",
  },
];

export function FinalCTA() {
  return (
    <section id="cta" className="mx-auto max-w-6xl px-5 py-14 sm:py-20 md:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/10 px-5 py-12 text-center sm:px-10 sm:py-16">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,255,255,0.12),transparent_55%)]" />
        <p className="relative font-pixel text-sm tracking-tight text-white/50">
          V.
        </p>
        <h2 className="relative mx-auto mt-3 max-w-2xl font-pixel text-[1.75rem] tracking-tight text-balance sm:text-4xl md:text-5xl">
          Let us put video behind your model.
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-[15px] text-white/55 sm:text-base">
          One call to see if Vivacity fits your product. EdTech, agents, or
          creator pipelines.
        </p>
        <div className="relative mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="mailto:pavitra@paxus.in?subject=Vivacity%20call"
            className="rounded-full bg-white px-6 py-3 text-center font-pixel text-[12px] tracking-wide text-black transition hover:bg-white/90"
          >
            Book a call
          </a>
          <Link
            href="/signin"
            className="rounded-full border border-white/20 px-6 py-3 text-center font-pixel text-[12px] tracking-wide text-white transition hover:border-white/45"
          >
            Open workspace
          </Link>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="mt-4 border-t border-white/10 sm:mt-6">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-12 sm:gap-12 sm:py-16 md:grid-cols-[1.25fr_1fr_1fr] md:px-8">
        <div>
          <Link
            href="/"
            className="font-pixel text-[16px] tracking-tight text-white"
          >
            vivacity
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
            Video infrastructure for LLMs. Mathematically exact explainers. Near
            real-time. API first.
          </p>
          <a
            href="mailto:pavitra@paxus.in"
            className="mt-6 inline-flex rounded-full bg-white px-4 py-2 font-pixel text-[12px] text-black transition hover:bg-white/90"
          >
            Book a call
          </a>
        </div>

        <div className="grid grid-cols-2 gap-8 md:contents">
          <div>
            <p className="font-pixel text-[10px] tracking-[0.16em] text-white/35 uppercase">
              Navigate
            </p>
            <div className="mt-4 grid gap-2.5 text-sm text-white/65">
              {[
                ["/#work", "Work"],
                ["/#process", "Process"],
                ["/#dashboard", "Product"],
                ["/#about", "FAQ"],
                ["/newsletter", "Newsletter"],
                ["/contact", "Contact"],
              ].map(([href, label]) => (
                <Link
                  key={label}
                  href={href}
                  className="transition hover:text-white"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="font-pixel text-[10px] tracking-[0.16em] text-white/35 uppercase">
              Resources
            </p>
            <div className="mt-4 space-y-2.5 text-sm text-white/65">
              <Link href="/docs" className="block transition hover:text-white">
                Docs
              </Link>
              <Link href="/signin" className="block transition hover:text-white">
                Sign in
              </Link>
              <a
                href="https://pavitrakushwaha.dev"
                className="block transition hover:text-white"
                target="_blank"
                rel="noreferrer"
              >
                Founder
              </a>
              <Link href="/privacy" className="block transition hover:text-white">
                Privacy
              </Link>
              <Link href="/terms" className="block transition hover:text-white">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-8 sm:py-10 md:flex-row md:items-center md:justify-between md:px-8">
          <div className="min-w-0">
            <p className="font-pixel text-[10px] tracking-[0.16em] text-white/35 uppercase">
              Don&apos;t just take our word for it
            </p>
            <h3 className="mt-2 font-pixel text-xl tracking-tight sm:text-2xl md:text-3xl">
              Ask an AI what it knows about us.
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            {askAi.map((a) => (
              <a
                key={a.name}
                href={a.href}
                target="_blank"
                rel="noreferrer"
                className="group flex flex-col items-center gap-1.5"
                title={`Ask ${a.name}`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.1] bg-black/55 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)] transition group-hover:border-white/25">
                  <Image
                    src={a.src}
                    alt={a.name}
                    width={20}
                    height={20}
                    className="h-5 w-5 object-contain"
                  />
                </div>
                <span className="font-pixel text-[9px] text-white/40 transition group-hover:text-white/65">
                  {a.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 font-pixel text-[11px] text-white/35 sm:flex-row sm:justify-between md:px-8">
          <span>© vivacity, 2026.</span>
          <span>Kanpur · Bangalore · API-first</span>
        </div>
      </div>
    </footer>
  );
}
