"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Mark } from "@/components/mark";

const links = [
  { href: "/#lab", label: "Runtime" },
  { href: "/#interface", label: "Interface" },
  { href: "/#architecture", label: "Architecture" },
  { href: "/docs", label: "Docs" },
  { href: "/#team", label: "Team" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
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
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200",
        scrolled
          ? "border-white/10 bg-[#08090b]/88 backdrop-blur-xl"
          : "border-transparent bg-transparent"
      )}
    >
      <nav className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 md:px-8">
        <Link
          href="/"
          className="flex items-center gap-2 text-[14px] tracking-tight text-[#eeeae2]"
          onClick={() => setOpen(false)}
        >
          <Mark className="h-4 w-4" />
          <span>Vivacity</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-[13px] text-white/50 hover:text-white"
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/demo"
            className="inline-flex h-8 items-center rounded-full bg-[#eeeae2] px-3.5 text-[12.5px] text-[#0a0b0d] hover:bg-white"
          >
            Book a demo
          </Link>
          <button
            type="button"
            className="inline-flex h-8 w-8 items-center justify-center text-white/70 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#08090b] px-5 py-4 md:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/6 py-3 text-[15px] text-white/70"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
