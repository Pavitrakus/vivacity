import type { Metadata } from "next";
import { BookDemo } from "@/components/book-demo";
import { CodePlate } from "@/components/code-plate";
import { Contract } from "@/components/contract";
import { FAQ } from "@/components/faq";
import { InterfaceStrip } from "@/components/interface-strip";
import { Position } from "@/components/position";
import { QuoteStrip } from "@/components/quote-strip";
import { RuntimeConsole } from "@/components/runtime-console";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Team } from "@/components/team";
import { SITE_DESCRIPTION, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: `Vivacity — ${SITE_TAGLINE}` },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--paper)]">
      <SiteNav />
      <main>
        <RuntimeConsole />
        <QuoteStrip />
        <Contract />
        <CodePlate />
        <InterfaceStrip />
        <Position />
        <Team />
        <FAQ />
        <BookDemo />
      </main>
      <SiteFooter />
    </div>
  );
}
