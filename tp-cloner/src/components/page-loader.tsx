"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function PageLoader() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(true);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    setVisible(true);
    setExiting(false);
    const ready = window.setTimeout(() => setExiting(true), 420);
    const hide = window.setTimeout(() => setVisible(false), 780);
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
      <div className="flex flex-col items-center gap-3">
        <p className="font-pixel text-2xl tracking-tight text-white animate-[pulseSoft_1.1s_ease-in-out_infinite]">
          vivacity
        </p>
        <div className="h-px w-16 overflow-hidden bg-white/10">
          <div className="h-full w-full origin-left animate-[loadBar_0.7s_ease-out_forwards] bg-white/70" />
        </div>
      </div>
    </div>
  );
}
