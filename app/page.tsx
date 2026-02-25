import { HeroBanner } from "@/components/hero-banner"
import { PromoTiles } from "@/components/promo-tiles"
import { SolutionsGrid } from "@/components/solutions-grid"
import { CuratedRows } from "@/components/curated-rows"
import { FeaturedProducts } from "@/components/featured-products"
import { ProMembership } from "@/components/pro-membership"
import { Testimonials } from "@/components/testimonials"
import { BrandPartners } from "@/components/brand-partners"

export default function Home() {
  return (
    <>
      <HeroBanner />
      <PromoTiles />
      <SolutionsGrid />
      <CuratedRows />
      <FeaturedProducts />
      <ProMembership />
      <Testimonials />
      <BrandPartners />
    </>
  )
}
