import { HeroBanner } from "@/components/hero-banner"
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
  return (
    <>
      <HeroBanner />
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
