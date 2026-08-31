"use client";

import { useState } from "react";
import { site } from "@/lib/site";

export function BookDemo({ heading }: { heading?: "page" | "section" }) {
  const [sent, setSent] = useState(false);
  const isPage = heading === "page";

  return (
    <section
      id="demo"
      className={`bg-[var(--paper)] ${isPage ? "" : "border-t border-[var(--line)]"}`}
    >
      <div className="mx-auto grid max-w-[1400px] items-end gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2 lg:px-12 lg:py-24">
        <div>
          <p className="font-mono text-[11px] tracking-[0.22em] text-[var(--mute)] uppercase">
            Access
          </p>
          <h2 className="mt-4 font-serif text-[clamp(1.9rem,3.8vw,3.1rem)] leading-[1.08] tracking-[-0.035em] text-[var(--ink)]">
            Book a working session.
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-7 text-[var(--mute)]">
            Bring an agent that needs a world it can branch. We walk the runtime, the
            router, and whether your backends belong behind the same interface.
          </p>
          <p className="mt-8 font-mono text-[12px] text-[var(--mute)]">
            Direct:{" "}
            <a className="text-[var(--ink)] underline decoration-[var(--line)] underline-offset-4 hover:text-[var(--copper)]" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>

        <form
          className="border border-[var(--line)] bg-[#f7f3ec] p-6 sm:p-8"
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const name = String(fd.get("name") ?? "");
            const work = String(fd.get("work") ?? "");
            const email = String(fd.get("email") ?? "");
            const note = String(fd.get("note") ?? "");
            window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Demo — " + work)}&body=${encodeURIComponent(`${name}\n${email}\n${work}\n\n${note}`)}`;
            setSent(true);
          }}
        >
          <label className="block font-mono text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">
            Name
            <input name="name" required className="mt-2 mb-5 w-full border-0 border-b border-[var(--line)] bg-transparent py-2 text-[15px] text-[var(--ink)] outline-none focus:border-[var(--copper)]" />
          </label>
          <label className="block font-mono text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">
            Work email
            <input name="email" type="email" required className="mt-2 mb-5 w-full border-0 border-b border-[var(--line)] bg-transparent py-2 text-[15px] text-[var(--ink)] outline-none focus:border-[var(--copper)]" />
          </label>
          <label className="block font-mono text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">
            What you are building
            <input name="work" required placeholder="Agent, domain, backends" className="mt-2 mb-5 w-full border-0 border-b border-[var(--line)] bg-transparent py-2 text-[15px] text-[var(--ink)] outline-none placeholder:text-[var(--mute)]/50 focus:border-[var(--copper)]" />
          </label>
          <label className="block font-mono text-[10px] tracking-[0.18em] text-[var(--mute)] uppercase">
            Note
            <textarea name="note" rows={3} className="mt-2 mb-6 w-full resize-none border-0 border-b border-[var(--line)] bg-transparent py-2 text-[15px] text-[var(--ink)] outline-none focus:border-[var(--copper)]" />
          </label>
          <button
            type="submit"
            className="rounded-full bg-[var(--ink)] px-6 py-2.5 text-[13px] font-medium text-[var(--paper)]"
          >
            {sent ? "Mail client opened" : "Request a demo"}
          </button>
        </form>
      </div>
    </section>
  );
}
