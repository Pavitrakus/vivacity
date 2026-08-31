import type { Metadata } from "next";
import { BookDemo } from "@/components/book-demo";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export const metadata: Metadata = {
  title: "Book a demo",
  description:
    "Book a Vivacity design-partner demo. No signup. Tell us what your agents need a world to do.",
  alternates: { canonical: "https://tryvivacity.com/demo" },
};

export default function DemoPage() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <SiteNav />
      <main className="pt-10">
        <BookDemo heading="page" />
      </main>
      <SiteFooter />
    </div>
  );
}
