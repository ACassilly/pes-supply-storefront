import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { AboutContent } from "@/components/about-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us | PES Supply -- A PES Global Company",
  description:
    "Portlandia Electric Supply (PES) is the distribution arm of PES Global. 169 brands, 500+ vendors, 8 core product categories. Non-stocking distributor and contract stocking group based in Louisville, KY.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <AboutContent />
      </main>
      <SiteFooter />
    </div>
  )
}
