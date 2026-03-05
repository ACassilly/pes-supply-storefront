import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Pro Account | Contractor Pricing & Net Terms | PES Supply",
  description: "Apply for a PES Pro Account. Unlock contractor pricing, net-30 terms, dedicated account management, job-lot quoting, and priority freight. Free to join.",
  alternates: { canonical: "https://portlandiaelectric.supply/pro" },
  openGraph: {
    title: "Pro Account | Contractor Pricing & Net Terms",
    description: "Unlock contractor pricing, net-30 terms, and dedicated account management at PES Supply.",
    url: "https://portlandiaelectric.supply/pro",
    siteName: "PES Supply",
    type: "website",
  },
}

export default function ProLayout({ children }: { children: React.ReactNode }) {
  return children
}
