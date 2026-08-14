import Image from "next/image";

const partners = [
  { name: "ChatGPT", src: "/images/logos/chatgpt.png", note: "ChatGPT" },
  { name: "Claude", src: "/images/logos/claude.png", note: "Claude Code" },
  { name: "Cursor", src: "/images/logos/cursor.png", note: "Cursor CLI" },
  { name: "Gemini", src: "/images/logos/gemini.png", note: "Gemini" },
  { name: "Perplexity", src: "/images/logos/perplexity.png", note: "Perplexity" },
  { name: "OpenAI", src: "/images/logos/openai.png", note: "OpenAI API" },
];

export function LogoStrip() {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-8 pt-1 sm:pb-10 sm:pt-2 md:px-8">
      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-gradient-to-b from-white/[0.035] to-transparent px-4 py-6 sm:px-10 sm:py-8">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-[radial-gradient(ellipse_at_left,rgba(255,255,255,0.07),transparent_70%)]" />
        <p className="relative text-center font-pixel text-[10px] tracking-[0.22em] text-white/40 uppercase">
          Works with
        </p>
        <div className="relative mt-5 grid grid-cols-3 justify-items-center gap-x-3 gap-y-5 sm:mt-6 sm:flex sm:flex-wrap sm:items-end sm:justify-center sm:gap-x-8">
          {partners.map((p) => (
            <div
              key={p.name}
              className="group flex w-[88px] flex-col items-center gap-2 sm:w-[80px] sm:gap-2.5"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-[10px] border border-white/[0.1] bg-black/60 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition group-hover:border-white/25 sm:h-11 sm:w-11 sm:rounded-[11px]">
                <Image
                  src={p.src}
                  alt=""
                  width={22}
                  height={22}
                  className="h-5 w-5 object-contain sm:h-[22px] sm:w-[22px]"
                />
              </div>
              <span className="text-center font-pixel text-[9px] leading-tight tracking-wide text-white/45 transition group-hover:text-white/70 sm:text-[10px]">
                {p.note}
              </span>
            </div>
          ))}
        </div>
        <p className="relative mt-5 text-center text-[11px] text-white/35 sm:mt-6 sm:text-xs">
          Claude Code, ChatGPT, Cursor, or your own agent. Prompt in, video out.
        </p>
      </div>
    </section>
  );
}
