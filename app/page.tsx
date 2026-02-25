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
import { SectionNav } from "@/components/section-nav"

export default function Home() {
  return (
    <>
      <div id="hero"><HeroBanner /></div>
      <TradePricingBanner />
      <ValuePropStrip />
      <div id="promos"><PromoTiles /></div>
      <div id="departments"><SolutionsGrid /></div>
      <div id="new-arrivals"><NewArrivals /></div>
      <div id="curated"><CuratedRows /></div>
      <div id="shipping-map"><ShippingZoneTeaser /></div>
      <ProCtaBanner />
      <Certifications />
      <div id="blog"><BlogStrip /></div>
      <div id="reviews"><Testimonials /></div>
      <BrandPartners />
      <SectionNav />
    </>
  )
}
