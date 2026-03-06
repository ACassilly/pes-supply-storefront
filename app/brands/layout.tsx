import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brands Directory | 169 Authorized Brands",
  description: "Browse all authorized brands at PES Supply. Eaton, Siemens, Schneider Electric, Milwaukee, Generac, Enphase, and 160+ more. Full OEM warranties.",
}

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
