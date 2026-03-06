import type { Metadata } from "next"
import { brands } from "@/lib/data"

export const metadata: Metadata = {
  title: `Brands Directory | ${brands.length} Authorized Brands`,
  description: `Browse all ${brands.length} authorized brands at PES Supply. Eaton, Siemens, Schneider Electric, Milwaukee, Generac, Enphase, and more. Full OEM warranties.`,
}

export default function BrandsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
