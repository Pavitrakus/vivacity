"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ShineButtonProps = {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: "solid" | "ghost";
  className?: string;
  disabled?: boolean;
};

export function ShineButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  className,
  disabled,
}: ShineButtonProps) {
  const look = cn(
    "group relative inline-flex h-11 w-full min-w-0 items-center justify-center overflow-hidden rounded-full px-3 font-pixel text-[11px] tracking-wide whitespace-nowrap disabled:opacity-60 sm:h-auto sm:px-5 sm:py-2.5 sm:text-[12px]",
    variant === "solid"
      ? "bg-white text-black"
      : "border border-white/20 bg-black/40 text-white hover:border-white/45"
  );

  const inner = (
    <>
      <span className="relative z-10 inline-flex items-center justify-center gap-2">
        {children}
      </span>
      <motion.span
        aria-hidden
        className="pointer-events-none absolute inset-0"
        initial={{ x: "-120%" }}
        animate={{ x: "140%" }}
        transition={{
          duration: 1.4,
          repeat: Infinity,
          repeatDelay: 1.6,
          ease: "linear",
        }}
        style={{
          background:
            variant === "solid"
              ? "linear-gradient(75deg, transparent 30%, rgba(0,0,0,0.14) 50%, transparent 70%)"
              : "linear-gradient(75deg, transparent 30%, rgba(255,255,255,0.22) 50%, transparent 70%)",
        }}
      />
    </>
  );

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.97 },
    transition: {
      type: "spring" as const,
      stiffness: 500,
      damping: 30,
      mass: 0.5,
    },
  };

  if (href) {
    const external = href.startsWith("http") || href.startsWith("mailto:");
    if (external) {
      return (
        <motion.a
          href={href}
          className={cn(look, className)}
          {...motionProps}
        >
          {inner}
        </motion.a>
      );
    }
    return (
      <motion.div
        {...motionProps}
        className={cn("inline-flex min-w-0", className)}
      >
        <Link href={href} className={look}>
          {inner}
        </Link>
      </motion.div>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(look, className)}
      {...motionProps}
    >
      {inner}
    </motion.button>
  );
}
