import { TopBar } from "@/components/top-bar"
import { Navbar } from "@/components/navbar"
import { SiteFooter } from "@/components/site-footer"
import { ReturnsContent } from "@/components/returns-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Return Policy | PES Supply",
  description:
    "PES Supply return and RMA policy. 30-day return window, RMA form required within 5 business days, restocking fees may apply. Contact connect@portlandiaelectric.supply.",
}

export default function ReturnsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <Navbar />
      <main className="flex-1">
        <ReturnsContent />
      </main>
      <SiteFooter />
    </div>
  )
}
