import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { StatsBar } from "@/components/stats-bar"
import { DealTicker } from "@/components/deal-ticker"
import { CategoryGrid } from "@/components/category-grid"
import { SolarQuoteForm } from "@/components/solar-quote-form"
import { FeaturedProducts } from "@/components/featured-products"
import { ProMembership } from "@/components/pro-membership"
import { Testimonials } from "@/components/testimonials"
import { BrandPartners } from "@/components/brand-partners"
import { SiteFooter } from "@/components/site-footer"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <StatsBar />
        <DealTicker />
        <CategoryGrid />
        <SolarQuoteForm />
        <FeaturedProducts />
        <ProMembership />
        <Testimonials />
        <BrandPartners />
      </main>
      <SiteFooter />
    </div>
  )
}
