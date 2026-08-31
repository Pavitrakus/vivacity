import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export function PageShell({
  children,
  wide,
}: {
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className="min-h-screen bg-[var(--paper)] text-[var(--ink)]">
      <SiteNav />
      <main
        className={`mx-auto px-5 pt-28 pb-20 sm:px-8 lg:px-12 ${
          wide ? "max-w-[1400px]" : "max-w-3xl"
        }`}
      >
        {children}
      </main>
      <SiteFooter />
    </div>
  );
}
