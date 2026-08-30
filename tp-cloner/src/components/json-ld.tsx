import { FAQS, SITE_DESCRIPTION, SITE_EMAIL, SITE_NAME, SITE_TAGLINE, SITE_URL } from "@/lib/site";

export function JsonLd() {
  const organization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    legalName: "Vivacity",
    url: SITE_URL,
    logo: `${SITE_URL}/favicon.svg`,
    email: SITE_EMAIL,
    description: SITE_DESCRIPTION,
    foundingLocation: {
      "@type": "Place",
      name: "India",
    },
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    publisher: { "@type": "Organization", name: SITE_NAME },
  };

  const software = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_NAME,
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Web",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    slogan: SITE_TAGLINE,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Design partner access by demo",
    },
    featureList: [
      "Simulation runtime for AI agents",
      "Persistent world state and actions",
      "Fork, simulate, verify, commit",
      "Execution routing across simulators and world models",
      "Domain schemas rather than a universal world object",
    ],
  };

  const faqPage = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.a,
      },
    })),
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Docs", item: `${SITE_URL}/docs` },
      { "@type": "ListItem", position: 3, name: "Book a demo", item: `${SITE_URL}/demo` },
      { "@type": "ListItem", position: 4, name: "Contact", item: `${SITE_URL}/contact` },
    ],
  };

  const payloads = [organization, website, software, faqPage, breadcrumb];

  return (
    <>
      {payloads.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
    </>
  );
}
