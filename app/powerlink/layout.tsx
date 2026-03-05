import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PowerLink Partner Program | PES Supply",
  description: "Join the PowerLink partner network. Exclusive dealer pricing, co-branded marketing, territory protection, technical support, and priority inventory access.",
  alternates: { canonical: "https://portlandiaelectric.supply/powerlink" },
  openGraph: {
    title: "PowerLink Partner Program | PES Supply",
    description: "Exclusive dealer pricing, co-branded marketing, and territory protection for qualified partners.",
    url: "https://portlandiaelectric.supply/powerlink",
    siteName: "PES Supply",
    type: "website",
  },
}

export default function PowerLinkLayout({ children }: { children: React.ReactNode }) {
  return children
}
