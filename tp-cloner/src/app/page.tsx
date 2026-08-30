import type { Metadata } from "next";
import { Architecture } from "@/components/architecture";
import { BookDemo } from "@/components/book-demo";
import { FAQ } from "@/components/faq";
import { Hero } from "@/components/hero";
import { OrbitLab } from "@/components/orbit-lab";
import { Positioning } from "@/components/positioning";
import { Primitive } from "@/components/primitive";
import { Problem } from "@/components/problem";
import { RuntimeApi } from "@/components/runtime-api";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { Team } from "@/components/team";
import { Thesis } from "@/components/thesis";
import { UseCases } from "@/components/use-cases";
import { SITE_DESCRIPTION, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export const metadata: Metadata = {
  title: {
    absolute: `Vivacity — ${SITE_TAGLINE}`,
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: SITE_URL },
};

export default function Home() {
  return (
    <div className="min-h-screen">
      <SiteNav />
      <main>
        <Hero />
        <Thesis />
        <OrbitLab />
        <Problem />
        <Primitive />
        <RuntimeApi />
        <Architecture />
        <Positioning />
        <UseCases />
        <Team />
        <FAQ />
        <BookDemo />
      </main>
      <SiteFooter />
    </div>
  );
}
