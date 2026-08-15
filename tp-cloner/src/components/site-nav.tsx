"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#work", label: "Work", chevron: true },
  { href: "/#process", label: "Process" },
  { href: "/#dashboard", label: "Product" },
  { href: "/#about", label: "About" },
  { href: "/docs", label: "Docs" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
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
    <header className="fixed inset-x-0 top-0 z-40 flex justify-center px-3 pt-3 sm:px-5 sm:pt-5">
      <nav
        className={cn(
          "relative flex w-full items-center justify-between gap-3 rounded-full border border-white/12 bg-black/55 px-4 py-2 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-500 ease-out",
          scrolled
            ? "max-w-3xl scale-[0.98] bg-black/82 px-3.5 py-1.5"
            : "max-w-6xl bg-black/48 px-4 py-2 sm:px-5 sm:py-2.5"
        )}
      >
        <Link
          href="/"
          className="font-pixel text-[15px] tracking-tight text-white transition hover:text-white/85 sm:text-[16px]"
          onClick={() => setOpen(false)}
        >
          vivacity
        </Link>

        <div
          className={cn(
            "hidden items-center transition-all duration-500 md:flex",
            scrolled ? "gap-5" : "gap-7"
          )}
        >
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="inline-flex items-center gap-1 font-pixel text-[12px] tracking-wide text-white/65 transition hover:text-white"
            >
              {l.label}
              {l.chevron ? <ChevronDown className="h-3 w-3 opacity-55" /> : null}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className={cn(
              "hidden rounded-full border border-white/20 font-pixel text-[11px] tracking-wide text-white transition hover:border-white/45 sm:inline-flex sm:text-[12px]",
              scrolled ? "px-3 py-1.5" : "px-3.5 py-1.5 sm:px-4 sm:py-2"
            )}
          >
            Sign in
          </Link>
          <a
            href="/#cta"
            className={cn(
              "rounded-full bg-white font-pixel text-[11px] tracking-wide text-black transition hover:bg-white/90 sm:text-[12px]",
              scrolled ? "px-3 py-1.5" : "px-3.5 py-1.5 sm:px-4 sm:py-2"
            )}
          >
            Book a call
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-white/80 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {open ? (
          <div className="absolute top-[calc(100%+10px)] left-0 right-0 overflow-hidden rounded-2xl border border-white/12 bg-black/92 p-2 shadow-2xl backdrop-blur-xl md:hidden">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between rounded-xl px-3.5 py-3 font-pixel text-[13px] text-white/75 transition hover:bg-white/[0.06] hover:text-white"
              >
                {l.label}
                {l.chevron ? (
                  <ChevronDown className="h-3.5 w-3.5 opacity-40" />
                ) : null}
              </Link>
            ))}
            <Link
              href="/signin"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-between rounded-xl bg-white px-3.5 py-3 font-pixel text-[13px] text-black"
            >
              Sign in
            </Link>
            <Link
              href="/newsletter"
              onClick={() => setOpen(false)}
              className="flex items-center justify-between rounded-xl px-3.5 py-3 font-pixel text-[13px] text-white/75 transition hover:bg-white/[0.06] hover:text-white"
            >
              Newsletter
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
