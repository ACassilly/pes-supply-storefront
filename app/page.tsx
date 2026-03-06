import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wholesale Electrical & Solar Supply | PES Supply",
  description: "Wholesale electrical, solar, HVAC, plumbing, and industrial supplies. 40,000+ products from 200+ brands. Free freight on $999+. Contractor pricing, same-day shipping.",
  alternates: { canonical: "https://portlandiaelectric.supply" },
  openGraph: {
    title: "Wholesale Electrical & Solar Supply | PES Supply",
    description: "40,000+ products from 200+ brands. Contractor pricing with free freight on $999+.",
    url: "https://portlandiaelectric.supply",
    siteName: "PES Supply",
    type: "website",
  },
}

import { HeroBanner } from "@/components/hero-banner"
import { StatsBar } from "@/components/stats-bar"
import { PartnerStrip } from "@/components/partner-strip"
import { HowItWorks } from "@/components/how-it-works"
import { WhoWeServe } from "@/components/who-we-serve"
import { SolutionsGrid } from "@/components/solutions-grid"
import { ResidentialRedirect } from "@/components/residential-redirect"
import { CuratedRows } from "@/components/curated-rows"
import { ShippingZoneTeaser } from "@/components/shipping-zone-teaser"
import { QuoteBuilder } from "@/components/quote-builder"
import { WhyPesStrip } from "@/components/why-pes-strip"
import { PesGlobalSection } from "@/components/pes-global-section"
import { ProCtaBanner } from "@/components/pro-cta-banner"
import { PowerLinkCallout } from "@/components/powerlink-callout"
import { Testimonials } from "@/components/testimonials"
import { BrandPartners } from "@/components/brand-partners"
import { NewsletterCta } from "@/components/newsletter-cta"

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "PES Supply",
    url: "https://portlandiaelectric.supply",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://portlandiaelectric.supply/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  }

  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Portlandia Electric Supply",
    alternateName: "PES Supply",
    url: "https://portlandiaelectric.supply",
    description: "Wholesale electrical, solar, HVAC, plumbing, and industrial supplies for contractors and businesses.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-503-888-8PES",
      contactType: "sales",
      availableLanguage: "English",
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
      <HeroBanner />
      <StatsBar />
      <PartnerStrip />
      <HowItWorks />
      <WhoWeServe />
      <SolutionsGrid />
      <ResidentialRedirect />
      <CuratedRows />
      <ShippingZoneTeaser />
      <QuoteBuilder />
      <WhyPesStrip />
      <PesGlobalSection />
      <ProCtaBanner />
      <PowerLinkCallout />
      <Testimonials />
      <BrandPartners />
      <NewsletterCta />
    </>
  )
}
