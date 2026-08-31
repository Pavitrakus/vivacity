import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)]">
      <div className="mx-auto flex max-w-[1400px] flex-wrap items-center justify-between gap-4 px-5 py-8 sm:px-8 lg:px-12">
        <p className="font-mono text-[11px] text-[var(--mute)]">
          {site.name} · {site.email}
        </p>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] text-[var(--mute)]">
          <Link className="hover:text-[var(--ink)]" href="/docs">
            Docs
          </Link>
          <Link className="hover:text-[var(--ink)]" href="/demo">
            Demo
          </Link>
          <Link className="hover:text-[var(--ink)]" href="/contact">
            Contact
          </Link>
          <Link className="hover:text-[var(--ink)]" href="/privacy">
            Privacy
          </Link>
          <Link className="hover:text-[var(--ink)]" href="/terms">
            Terms
          </Link>
        </nav>
      </div>
    </footer>
  );
}
