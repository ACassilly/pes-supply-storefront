import { HeroBanner } from "@/components/hero-banner"
import { TradePricingBanner } from "@/components/trade-pricing-banner"
import { ValuePropStrip } from "@/components/value-prop-strip"
import { PromoTiles } from "@/components/promo-tiles"
import { SolutionsGrid } from "@/components/solutions-grid"
import { NewArrivals } from "@/components/new-arrivals"
import { CuratedRows } from "@/components/curated-rows"
import { ShippingZoneTeaser } from "@/components/shipping-zone-teaser"
import { ProCtaBanner } from "@/components/pro-cta-banner"
import { Certifications } from "@/components/certifications"
import { BlogStrip } from "@/components/blog-strip"
import { Testimonials } from "@/components/testimonials"
import { BrandPartners } from "@/components/brand-partners"

export default function Home() {
  return (
    <>
      <HeroBanner />
      <TradePricingBanner />
      <ValuePropStrip />
      <PromoTiles />
      <SolutionsGrid />
      <NewArrivals />
      <CuratedRows />
      <ShippingZoneTeaser />
      <ProCtaBanner />
      <Certifications />
      <BlogStrip />
      <Testimonials />
      <BrandPartners />
    </>
  )
}
