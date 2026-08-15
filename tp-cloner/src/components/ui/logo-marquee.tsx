"use client";

import { cn } from "@/lib/utils";

export function LogoMarquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#020202] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#020202] to-transparent sm:w-24" />
      <div className="flex w-max animate-[marquee_28s_linear_infinite] hover:[animation-play-state:paused]">
        <div className="flex items-center gap-8 px-4 sm:gap-12">{children}</div>
        <div className="flex items-center gap-8 px-4 sm:gap-12" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
