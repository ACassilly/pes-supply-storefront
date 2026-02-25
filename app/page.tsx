import { HeroBanner } from "@/components/hero-banner"
import { ValuePropStrip } from "@/components/value-prop-strip"
import { PromoTiles } from "@/components/promo-tiles"
import { SolutionsGrid } from "@/components/solutions-grid"
import { CuratedRows } from "@/components/curated-rows"
import { ProCtaBanner } from "@/components/pro-cta-banner"
import { Testimonials } from "@/components/testimonials"
import { BrandPartners } from "@/components/brand-partners"

export default function Home() {
  return (
    <>
      <HeroBanner />
      <ValuePropStrip />
      <PromoTiles />
      <SolutionsGrid />
      <CuratedRows />
      <ProCtaBanner />
      <Testimonials />
      <BrandPartners />
    </>
  )
}
