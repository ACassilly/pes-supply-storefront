import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { StatsBar } from "@/components/stats-bar"
import { CategoryGrid } from "@/components/category-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { DealsBanner } from "@/components/deals-banner"
import { SolutionPaths } from "@/components/solution-paths"
import { ProMembership } from "@/components/pro-membership"
import { BrandPartners } from "@/components/brand-partners"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <StatsBar />
        <CategoryGrid />
        <FeaturedProducts />
        <DealsBanner />
        <SolutionPaths />
        <ProMembership />
        <BrandPartners />
        <Testimonials />
        <Newsletter />
      </main>
      <SiteFooter />
    </div>
  )
}
