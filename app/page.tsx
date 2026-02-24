import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { HeroBanner } from "@/components/hero-banner"
import { SolutionsGrid } from "@/components/solutions-grid"
import { FeaturedProducts } from "@/components/featured-products"
import { ProMembership } from "@/components/pro-membership"
import { Testimonials } from "@/components/testimonials"
import { BrandPartners } from "@/components/brand-partners"
import { SiteFooter } from "@/components/site-footer"
import { CartToastProvider } from "@/components/cart-toast"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <HeroBanner />
        <SolutionsGrid />
        <FeaturedProducts />
        <ProMembership />
        <Testimonials />
        <BrandPartners />
      </main>
      <SiteFooter />
      <CartToastProvider />
    </div>
  )
}
