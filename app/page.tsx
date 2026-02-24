import { HeroBanner } from "@/components/hero-banner"
import { SolutionsGrid } from "@/components/solutions-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { ProMembership } from "@/components/pro-membership"
import { Testimonials } from "@/components/testimonials"
import { BrandPartners } from "@/components/brand-partners"

export default function Home() {
  return (
    <>
      <HeroBanner />
      <SolutionsGrid />
      <FeaturedProducts />
      <ProMembership />
      <Testimonials />
      <BrandPartners />
    </>
  )
}
