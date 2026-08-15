"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

export function LineHoverLink({
  href,
  children,
  className,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  const classes = cn(
    "relative inline-flex w-fit text-white/65 transition-colors hover:text-white",
    "after:pointer-events-none after:absolute after:left-0 after:top-[100%] after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-current after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.22,1,0.36,1)]",
    "hover:after:origin-left hover:after:scale-x-100",
    className
  );

  if (external) {
    return (
      <a href={href} target="_blank" rel="noreferrer" className={classes}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
}
