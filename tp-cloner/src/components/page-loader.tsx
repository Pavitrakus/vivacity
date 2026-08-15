"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);
  const letters = "vivacity".split("");

  useEffect(() => {
    setVisible(true);
    setExiting(false);
    const ready = window.setTimeout(() => setExiting(true), 900);
    const hide = window.setTimeout(() => setVisible(false), 1280);
    return () => {
      window.clearTimeout(ready);
      window.clearTimeout(hide);
    };
  }, [pathname]);

  if (!visible) return null;

  return (
    <div
      className={cn(
        "pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-[#020202] transition-opacity duration-300 ease-out",
        exiting ? "opacity-0" : "opacity-100"
      )}
      aria-hidden
    >
      <div className="flex flex-col items-center gap-4">
        <p className="flex font-pixel text-3xl tracking-tight text-white sm:text-4xl">
          {letters.map((ch, i) => (
            <span
              key={`${ch}-${i}`}
              className="inline-block origin-bottom animate-[letterStretch_1.05s_ease-in-out_infinite]"
              style={{ animationDelay: `${i * 70}ms` }}
            >
              {ch}
            </span>
          ))}
        </p>
        <div className="h-px w-20 overflow-hidden bg-white/10">
          <div className="h-full w-full origin-left animate-[loadBar_0.9s_ease-out_forwards] bg-white/70" />
        </div>
      </div>
    </div>
  );
}
