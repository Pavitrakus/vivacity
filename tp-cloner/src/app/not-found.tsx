import Link from "next/link";
import { PageShell } from "@/components/page-shell";

export default function NotFound() {
  return (
    <PageShell>
      <p className="font-mono text-[11px] tracking-[0.16em] text-[var(--mute)] uppercase">
        404
      </p>
      <h1 className="mt-3 font-serif text-4xl tracking-tight text-[var(--ink)]">
        No such world.
      </h1>
      <p className="mt-4 text-[15px] leading-relaxed text-[var(--mute)]">
        That path is not in the runtime.
      </p>
      <Link
        href="/"
        className="mt-8 inline-flex h-11 items-center rounded-full bg-[var(--ink)] px-6 text-[14px] text-[var(--paper)]"
      >
        Back to Vivacity
      </Link>
    </PageShell>
  );
}
