import { HeroBanner } from "@/components/hero-banner"
import { SolutionsGrid } from "@/components/solutions-grid"
import { NewArrivals } from "@/components/new-arrivals"
import { CuratedRows } from "@/components/curated-rows"
import { ShippingZoneTeaser } from "@/components/shipping-zone-teaser"
import { ProCtaBanner } from "@/components/pro-cta-banner"
import { Testimonials } from "@/components/testimonials"
import { BrandPartners } from "@/components/brand-partners"
import { PowerLinkCallout } from "@/components/powerlink-callout"
import { PesGlobalSection } from "@/components/pes-global-section"
import { WhyPesStrip } from "@/components/why-pes-strip"
import { QuoteBuilder } from "@/components/quote-builder"
import { HowItWorks } from "@/components/how-it-works"
import { ResidentialRedirect } from "@/components/residential-redirect"
import { NewsletterCta } from "@/components/newsletter-cta"

export default function Home() {
  return (
    <>
      <HeroBanner />
      <HowItWorks />
      <SolutionsGrid />
      <QuoteBuilder />
      <ResidentialRedirect />
      <NewArrivals />
      <CuratedRows />
      <ShippingZoneTeaser />
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
