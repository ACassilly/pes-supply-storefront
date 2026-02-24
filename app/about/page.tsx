import { AboutContent } from "@/components/about-content"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About PES Supply",
  description: "Portlandia Electric Supply (PES) is the distribution arm of PES Global. 169 brands, 500+ vendors, 8 core product categories based in Louisville, KY.",
}

export default function AboutPage() {
  return <AboutContent />
}
