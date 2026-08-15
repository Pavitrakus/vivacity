"use client";

import { cn } from "@/lib/utils";

export function GlowCard({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("group relative overflow-hidden rounded-2xl p-[1px]", className)}>
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[40%] animate-[glowSpin_8s_linear_infinite] opacity-60 blur-xl"
        style={{
          background:
            "conic-gradient(from var(--glow-angle, 0deg), transparent 0%, rgba(255,255,255,0.35) 18%, transparent 38%, rgba(160,180,220,0.28) 58%, transparent 78%)",
        }}
      />
      <div className="relative h-full rounded-[15px] bg-[#0a0a0a]/92 backdrop-blur-md">
        {children}
      </div>
    </div>
  );
}
