import Link from "next/link"
import { ChevronRight, ExternalLink } from "lucide-react"
import { brands, departments } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Brands Directory | 169 Authorized Brands",
  description: "Browse all authorized brands at PES Supply. Eaton, Siemens, Schneider Electric, Milwaukee, Generac, Enphase, and 160+ more. Full OEM warranties.",
}

export default function BrandsPage() {
  const deptNames = departments.map((d) => d.name)
  const grouped = deptNames.reduce<Record<string, typeof brands>>((acc, dept) => {
    acc[dept] = brands.filter((b) => b.departments.includes(dept))
    return acc
  }, {})

  return (
    <div className="bg-background">
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-medium text-foreground">Brands</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">Authorized Brands</h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          169 brands, 500+ vendors. Every product ships with the full OEM warranty. We are an authorized distributor, not a gray-market reseller.
        </p>

        {/* A-Z quick nav */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {Array.from(new Set(brands.map((b) => b.name[0].toUpperCase()))).sort().map((letter) => (
            <a key={letter} href={`#letter-${letter}`} className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-xs font-bold text-muted-foreground transition-colors hover:border-primary hover:text-primary">{letter}</a>
          ))}
        </div>

        {/* By department */}
        <div className="mt-10 space-y-10">
          {deptNames.map((dept) => {
            const deptBrands = grouped[dept]
            if (!deptBrands || deptBrands.length === 0) return null
            return (
              <div key={dept}>
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold text-foreground">{dept}</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {deptBrands.map((brand) => (
                    <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-md">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-muted">
                        {brand.logo ? (
                          <img src={brand.logo} alt={brand.name} loading="lazy" className="h-8 w-8 object-contain" />
                        ) : (
                          <span className="text-xs font-bold text-muted-foreground">{brand.name.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-card-foreground group-hover:text-primary">{brand.name}</h3>
                        <p className="truncate text-xs text-muted-foreground">{brand.productCount.toLocaleString()} products</p>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>
    </div>
  )
}
