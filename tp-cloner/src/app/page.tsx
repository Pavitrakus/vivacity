import type { Metadata } from "next";
import { SiteNav } from "@/components/site-nav";
import { Hero } from "@/components/hero";
import { LogoStrip } from "@/components/logo-strip";
import { Work } from "@/components/work";
import { VisualStrip } from "@/components/visual-strip";
import { SplitFeature } from "@/components/split-feature";
import { Process } from "@/components/process";
import { DashboardPeek } from "@/components/dashboard-peek";
import { People } from "@/components/people";
import { FAQ } from "@/components/faq";
import { Newsletter } from "@/components/newsletter";
import { FinalCTA, SiteFooter } from "@/components/cta-footer";
import { SITE_DESCRIPTION, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `Vivacity - ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  return (
    <div className="grain min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 -left-24 h-[70vh] w-[70vw] rounded-full bg-[radial-gradient(circle,rgba(255,255,255,0.12),transparent_60%)] blur-3xl" />
        <div className="absolute top-[10%] right-[-10%] h-[40vh] w-[40vw] rounded-full bg-[radial-gradient(circle,rgba(150,170,210,0.08),transparent_65%)] blur-3xl" />
      </div>
      <SiteNav />
      <main className="animate-fade-up">
        <Hero />
        <LogoStrip />
        <Work />
        <VisualStrip />
        <SplitFeature />
        <Process />
        <DashboardPeek />
        <People />
        <FAQ />
        <Newsletter />
        <FinalCTA />
      </main>
      <SiteFooter />
    </div>
  );
}
