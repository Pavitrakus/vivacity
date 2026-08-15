"use client";

import { cn } from "@/lib/utils";

export function AnimatedRays({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div
        className="absolute inset-0 animate-[auroraShift_18s_linear_infinite] opacity-50"
        style={{
          backgroundImage: `
            repeating-linear-gradient(100deg, rgba(255,255,255,0.07) 0%, rgba(255,255,255,0.07) 7%, transparent 10%, transparent 12%, rgba(255,255,255,0.07) 16%),
            repeating-linear-gradient(100deg, rgba(150,170,210,0.22) 10%, rgba(255,255,255,0.14) 18%, rgba(150,170,210,0.2) 26%, rgba(180,190,210,0.12) 34%)
          `,
          backgroundSize: "240% 240%, 180% 180%",
          filter: "blur(18px) saturate(140%)",
          maskImage:
            "radial-gradient(ellipse at 100% 0%, black 32%, transparent 72%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 100% 0%, black 32%, transparent 72%)",
        }}
      />
    </div>
  );
}
