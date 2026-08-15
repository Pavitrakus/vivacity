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
    <div
      className={cn(
        "relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]",
        className
      )}
    >
      <div className="flex w-max animate-[marquee_32s_linear_infinite] motion-reduce:animate-none">
        <div className="flex items-center gap-10 px-5 sm:gap-12">{children}</div>
        <div
          className="flex items-center gap-10 px-5 sm:gap-12"
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}
