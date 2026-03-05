import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Deals & Clearance | Save Up to 60% | PES Supply",
  description: "Shop clearance, overstock, and limited-time deals on electrical, solar, HVAC, and industrial supplies. Up to 60% off with free freight on qualifying orders.",
  alternates: { canonical: "https://portlandiaelectric.supply/deals" },
  openGraph: {
    title: "Deals & Clearance | Save Up to 60%",
    description: "Clearance and overstock deals on electrical, solar, and industrial supplies. Up to 60% off.",
    url: "https://portlandiaelectric.supply/deals",
    siteName: "PES Supply",
    type: "website",
  },
}

export default function DealsLayout({ children }: { children: React.ReactNode }) {
  return children
}
