import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | PES Supply",
  description: "Technical guides, product spotlights, code updates, and industry news from PES Supply. Written for contractors, installers, and building professionals.",
  alternates: { canonical: "https://portlandiaelectric.supply/blog" },
  openGraph: {
    title: "Blog | PES Supply",
    description: "Technical guides and industry news for contractors and installers.",
    url: "https://portlandiaelectric.supply/blog",
    siteName: "PES Supply",
    type: "website",
  },
}

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
