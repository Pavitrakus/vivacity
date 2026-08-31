"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { href: "/#runtime", label: "Runtime" },
  { href: "/#interface", label: "Interface" },
  { href: "/docs", label: "Docs" },
  { href: "/#team", label: "Team" },
];

export function SiteNav() {
  const [open, setOpen] = useState(false);
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 ${
        solid ? "border-b border-[rgba(22,20,16,0.12)] bg-[#f2eee6]/90 backdrop-blur-md" : ""
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-[1440px] items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2.5 text-[15px] tracking-tight text-[#161410]">
          <span className="inline-block h-[7px] w-[7px] rounded-full bg-[#c45a24]" />
          Vivacity
        </Link>
        <div className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-[#6e675b] hover:text-[#161410]"
            >
              {l.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            href="/demo"
            className="inline-flex h-9 items-center rounded-full bg-[#161410] px-4 text-[13px] text-[#f2eee6] hover:bg-black"
          >
            Book a demo
          </Link>
          <button
            type="button"
            className="text-[#161410] md:hidden"
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open ? (
        <div className="border-t border-[rgba(22,20,16,0.12)] bg-[#f2eee6] px-5 py-4 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[15px] text-[#161410]"
            >
              {l.label}
            </Link>
          ))}
        </div>
      ) : null}
    </header>
  );
}
