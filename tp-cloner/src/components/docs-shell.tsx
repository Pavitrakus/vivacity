import Link from "next/link";
import { PageShell } from "@/components/page-shell";

const NAV = [
  ["/docs", "Overview"],
  ["/docs/interface", "Interface"],
  ["/docs/state", "State"],
  ["/docs/router", "Router"],
  ["/docs/verify", "Verify"],
] as const;

export function DocsShell({
  active,
  children,
}: {
  active: string;
  children: React.ReactNode;
}) {
  return (
    <PageShell wide>
      <div className="grid gap-10 lg:grid-cols-[200px_1fr]">
        <aside className="h-fit border border-[var(--line)] bg-[#f7f3ec] p-4 lg:sticky lg:top-20">
          <p className="font-mono text-[10px] tracking-[0.14em] text-[var(--mute)] uppercase">
            Runtime
          </p>
          <nav className="mt-3 space-y-1 text-sm">
            {NAV.map(([href, label]) => (
              <Link
                key={href}
                href={href}
                className={`block rounded px-2 py-1.5 ${
                  active === href
                    ? "bg-[rgba(22,20,16,0.06)] text-[var(--ink)]"
                    : "text-[var(--mute)] hover:bg-[rgba(22,20,16,0.04)] hover:text-[var(--ink)]"
                }`}
              >
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <article className="max-w-2xl text-[15px] leading-relaxed text-[var(--mute)]">
          {children}
        </article>
      </div>
    </PageShell>
  );
}
