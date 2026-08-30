import Link from "next/link";
import { Mark } from "@/components/mark";
import { SITE_EMAIL } from "@/lib/site";

const NAV = [
  ["/#lab", "Runtime"],
  ["/#interface", "Interface"],
  ["/#architecture", "Architecture"],
  ["/docs", "Docs"],
  ["/demo", "Book a demo"],
  ["/#team", "Team"],
];

const LEGAL = [
  ["/privacy", "Privacy"],
  ["/terms", "Terms"],
  ["/contact", "Contact"],
];

export function SiteFooter() {
  return (
    <footer className="border-t border-white/8">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-2 text-[14px] text-[#eeeae2]">
            <Mark className="h-4 w-4" />
            Vivacity
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/45">
            Executable simulation runtime for AI agents. Built in India. Sold
            to teams that need a world their models can actually run.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-white/35 uppercase">
            Product
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/50">
            {NAV.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.14em] text-white/35 uppercase">
            Company
          </p>
          <ul className="mt-4 space-y-2.5 text-sm text-white/50">
            {LEGAL.map(([href, label]) => (
              <li key={href}>
                <Link href={href} className="hover:text-white">
                  {label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`mailto:${SITE_EMAIL}`} className="hover:text-white">
                {SITE_EMAIL}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/8">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 font-mono text-[11px] text-white/32 sm:flex-row sm:justify-between md:px-8">
          <span>© Vivacity, 2026</span>
          <span>India · San Francisco</span>
        </div>
      </div>
    </footer>
  );
}
