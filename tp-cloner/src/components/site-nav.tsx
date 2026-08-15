"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#process", label: "Process" },
  { href: "/#dashboard", label: "Product" },
  { href: "/#about", label: "About" },
  { href: "/docs", label: "Docs" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [menuMounted, setMenuMounted] = useState(false);
  const [menuShown, setMenuShown] = useState(false);
  const [hoverX, setHoverX] = useState<number | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    if (open) {
      setMenuMounted(true);
      const id = requestAnimationFrame(() => setMenuShown(true));
      return () => cancelAnimationFrame(id);
    }
    setMenuShown(false);
    const t = window.setTimeout(() => setMenuMounted(false), 320);
    return () => window.clearTimeout(t);
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
          className="font-pixel text-[15px] tracking-tight text-white transition duration-300 hover:text-white/85 sm:text-[16px]"
          onClick={() => setOpen(false)}
        >
          vivacity
        </Link>

        <div
          ref={listRef}
          onMouseMove={(e) => {
            const rect = listRef.current?.getBoundingClientRect();
            if (!rect) return;
            setHoverX(e.clientX - rect.left);
          }}
          onMouseLeave={() => setHoverX(null)}
          className={cn(
            "relative hidden items-center transition-all duration-500 md:flex",
            scrolled ? "gap-1" : "gap-1.5"
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300"
            style={{
              opacity: hoverX === null ? 0 : 1,
              background: `radial-gradient(90px circle at ${hoverX ?? 0}px 100%, rgba(255,255,255,0.16), transparent 58%)`,
            }}
          />
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="relative z-[1] inline-flex items-center gap-1 rounded-full px-3 py-1.5 font-pixel text-[12px] tracking-wide text-white/65 transition duration-300 hover:text-white"
            >
              {l.label}
              {l.href === "/#work" ? (
                <ChevronDown className="h-3 w-3 opacity-55" />
              ) : null}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/signin"
            className={cn(
              "hidden rounded-full border border-white/20 font-pixel text-[11px] tracking-wide text-white transition duration-300 hover:border-white/45 sm:inline-flex sm:text-[12px]",
              scrolled ? "px-3 py-1.5" : "px-3.5 py-1.5 sm:px-4 sm:py-2"
            )}
          >
            Sign in
          </Link>
          <a
            href="/#cta"
            className={cn(
              "rounded-full bg-white font-pixel text-[11px] tracking-wide text-black transition duration-300 hover:bg-white/90 sm:text-[12px]",
              scrolled ? "px-3 py-1.5" : "px-3.5 py-1.5 sm:px-4 sm:py-2"
            )}
          >
            Book a call
          </a>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/12 text-white/80 transition duration-300 hover:border-white/30 md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span
              className={cn(
                "transition-transform duration-300 ease-out",
                open && "rotate-90"
              )}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </span>
          </button>
        </div>

        {menuMounted ? (
          <div
            className={cn(
              "absolute top-[calc(100%+10px)] right-0 left-0 origin-top overflow-hidden rounded-2xl border border-white/12 bg-black/92 p-2 shadow-2xl backdrop-blur-xl md:hidden",
              "transition-[opacity,transform] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
              menuShown
                ? "translate-y-0 scale-y-100 opacity-100"
                : "-translate-y-2 scale-y-95 opacity-0"
            )}
          >
            {links.map((l, i) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                style={{
                  transitionDelay: menuShown ? `${40 + i * 35}ms` : "0ms",
                }}
                className={cn(
                  "flex items-center justify-between rounded-xl px-3.5 py-3 font-pixel text-[13px] text-white/75 transition-all duration-300 hover:bg-white/[0.06] hover:text-white",
                  menuShown
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-1 opacity-0"
                )}
              >
                {l.label}
              </Link>
            ))}
            <Link
              href="/signin"
              onClick={() => setOpen(false)}
              style={{ transitionDelay: menuShown ? "220ms" : "0ms" }}
              className={cn(
                "mt-1 flex items-center justify-between rounded-xl bg-white px-3.5 py-3 font-pixel text-[13px] text-black transition-all duration-300",
                menuShown
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-1 opacity-0"
              )}
            >
              Sign in
            </Link>
            <Link
              href="/newsletter"
              onClick={() => setOpen(false)}
              style={{ transitionDelay: menuShown ? "255ms" : "0ms" }}
              className={cn(
                "flex items-center justify-between rounded-xl px-3.5 py-3 font-pixel text-[13px] text-white/75 transition-all duration-300 hover:bg-white/[0.06] hover:text-white",
                menuShown
                  ? "translate-y-0 opacity-100"
                  : "-translate-y-1 opacity-0"
              )}
            >
              Newsletter
            </Link>
          </div>
        ) : null}
      </nav>
    </header>
  );
}
