import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ShippingContent } from "@/components/shipping-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Shipping Policy | PES Supply",
  description:
    "PES Supply shipping policy -- free freight on orders over $999, same-day shipping on orders by 2 PM ET, insured shipments via FedEx, UPS, and freight carriers. Nationwide coverage from Louisville, KY.",
}

export default function ShippingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <ShippingContent />
      </main>
      <SiteFooter />
    </div>
  )
}
