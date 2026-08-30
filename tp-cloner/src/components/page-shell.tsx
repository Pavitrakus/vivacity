import type { ReactNode } from "react";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";

export function PageShell({
  children,
  wide = false,
}: {
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteNav />
      <main
        className={
          (wide
            ? "mx-auto w-full max-w-6xl flex-1 px-5 pt-28 pb-16 md:px-8 md:pt-32"
            : "mx-auto w-full max-w-3xl flex-1 px-5 pt-28 pb-16 md:px-8 md:pt-32")
        }
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
