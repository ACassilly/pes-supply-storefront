"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { Package, Truck, Percent, ArrowRight, SlidersHorizontal, ChevronDown, X, Tag, Calculator } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductCard } from "@/components/product-card"
import { departments, products } from "@/lib/data"

const bulkTiers = [
  { label: "5+ units", discount: "5%", color: "bg-primary/10 text-primary border-primary/20" },
  { label: "25+ units", discount: "10%", color: "bg-primary/20 text-primary border-primary/30" },
  { label: "100+ units", discount: "15%", color: "bg-primary/30 text-primary border-primary/40" },
  { label: "Pallet qty", discount: "Call", color: "bg-accent/10 text-accent border-accent/30" },
]

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name-asc", label: "A - Z" },
  { value: "name-desc", label: "Z - A" },
]

export function BulkDiscountContent() {
  const [activeDept, setActiveDept] = useState<string | null>(null)
  const [sort, setSort] = useState("featured")
  const [showSort, setShowSort] = useState(false)
  const [showFilters, setShowFilters] = useState(false)

  const filteredProducts = useMemo(() => {
    let result = activeDept ? products.filter((p) => p.department === activeDept) : [...products]
    switch (sort) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break
      case "price-desc": result.sort((a, b) => b.price - a.price); break
      case "rating": result.sort((a, b) => b.rating - a.rating); break
      case "name-asc": result.sort((a, b) => a.name.localeCompare(b.name)); break
      case "name-desc": result.sort((a, b) => b.name.localeCompare(a.name)); break
    }
    return result
  }, [activeDept, sort])

  const activeDeptData = activeDept ? departments.find((d) => d.slug === activeDept) : null

  return (
    <main>
      {/* Hero banner */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(22,163,74,0.15),transparent_60%)]" />
        <div className="relative mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-4 py-12 text-center md:py-16">
          <Badge className="border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">Volume Pricing on 40,000+ Products</Badge>
          <h1 className="text-balance text-3xl font-extrabold tracking-tight text-background md:text-4xl lg:text-5xl">
            Buy More. <span className="text-primary">Save More.</span>
          </h1>
          <p className="max-w-2xl text-pretty text-base text-background/70 md:text-lg">
            Automatic tiered discounts on every order. The more you buy, the more you save -- no coupon codes, no minimum commitments. Free freight on pallet quantities.
          </p>
          {/* Tier cards */}
          <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
            {bulkTiers.map((tier) => (
              <div key={tier.label} className={`flex flex-col items-center rounded-lg border px-5 py-3 ${tier.color}`}>
                <span className="text-2xl font-extrabold md:text-3xl">{tier.discount}</span>
                <span className="text-xs font-medium opacity-80">{tier.label}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 flex gap-3">
            <Button size="sm" asChild className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/quote">Request Pallet Quote <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
            <Button size="sm" variant="outline" asChild className="gap-1.5 border-background/30 bg-transparent text-background hover:border-background hover:bg-background/10">
              <Link href="/pro">Open Pro Account</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* How it works strip */}
      <section className="border-b border-border bg-muted/50">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-6 px-4 py-8 md:flex-row md:justify-between md:gap-4 md:py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><Calculator className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-sm font-bold text-foreground">Automatic Discounts</p>
              <p className="text-xs text-muted-foreground">Tiers apply at checkout -- no codes needed</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><Truck className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-sm font-bold text-foreground">Free Freight on Pallets</p>
              <p className="text-xs text-muted-foreground">Full pallet orders ship free via LTL</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><Tag className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-sm font-bold text-foreground">Pro Pricing Stacks</p>
              <p className="text-xs text-muted-foreground">Bulk discounts stack on top of Pro trade pricing</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><Package className="h-5 w-5 text-primary" /></div>
            <div>
              <p className="text-sm font-bold text-foreground">Ships from Louisville</p>
              <p className="text-xs text-muted-foreground">1-2 day ground to 60% of the US</p>
            </div>
          </div>
        </div>
      </section>

      {/* Department filter tiles */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-[1400px] px-4 py-8">
          <h2 className="mb-1 text-lg font-bold text-foreground">Explore by Department</h2>
          <p className="mb-5 text-sm text-muted-foreground">Select a department to filter bulk-eligible products</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
            {departments.map((dept) => (
              <button
                key={dept.slug}
                onClick={() => setActiveDept(activeDept === dept.slug ? null : dept.slug)}
                className={`group relative flex flex-col items-center gap-2 overflow-hidden rounded-lg border p-3 transition-all hover:border-primary/40 hover:shadow-md ${activeDept === dept.slug ? "border-primary bg-primary/5 shadow-md" : "border-border bg-card"}`}
              >
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <Image src={dept.image} alt={dept.name} fill sizes="64px" className="object-cover" loading="lazy" />
                </div>
                <span className={`text-center text-xs font-semibold ${activeDept === dept.slug ? "text-primary" : "text-card-foreground"}`}>{dept.name}</span>
                <span className="text-[10px] text-muted-foreground">{dept.count} products</span>
                {activeDept === dept.slug && <Badge className="absolute right-1.5 top-1.5 bg-primary px-1 py-0 text-[8px] text-primary-foreground">Active</Badge>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Bulk pricing table example */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-[1400px] px-4 py-8">
          <h2 className="mb-1 text-lg font-bold text-foreground">How Bulk Pricing Works</h2>
          <p className="mb-5 text-sm text-muted-foreground">Example pricing on a $100.00 list price item</p>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[500px] text-left text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="pb-3 pr-4 font-semibold text-foreground">Quantity</th>
                  <th className="pb-3 pr-4 font-semibold text-foreground">Discount</th>
                  <th className="pb-3 pr-4 font-semibold text-foreground">Unit Price</th>
                  <th className="pb-3 pr-4 font-semibold text-foreground">You Save</th>
                  <th className="pb-3 font-semibold text-primary">Pro + Bulk</th>
                </tr>
              </thead>
              <tbody className="text-card-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4">1 - 4</td>
                  <td className="py-3 pr-4 text-muted-foreground">--</td>
                  <td className="py-3 pr-4">$100.00</td>
                  <td className="py-3 pr-4 text-muted-foreground">--</td>
                  <td className="py-3 font-medium text-primary">$85.00</td>
                </tr>
                <tr className="border-b border-border/50 bg-primary/[0.02]">
                  <td className="py-3 pr-4 font-medium">5 - 24</td>
                  <td className="py-3 pr-4"><Badge className="bg-primary/10 text-primary">5% OFF</Badge></td>
                  <td className="py-3 pr-4">$95.00</td>
                  <td className="py-3 pr-4 font-medium text-primary">$5.00/ea</td>
                  <td className="py-3 font-bold text-primary">$80.75</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 pr-4 font-medium">25 - 99</td>
                  <td className="py-3 pr-4"><Badge className="bg-primary/15 text-primary">10% OFF</Badge></td>
                  <td className="py-3 pr-4">$90.00</td>
                  <td className="py-3 pr-4 font-medium text-primary">$10.00/ea</td>
                  <td className="py-3 font-bold text-primary">$76.50</td>
                </tr>
                <tr className="border-b border-border/50 bg-primary/[0.02]">
                  <td className="py-3 pr-4 font-medium">100+</td>
                  <td className="py-3 pr-4"><Badge className="bg-primary/20 text-primary">15% OFF</Badge></td>
                  <td className="py-3 pr-4">$85.00</td>
                  <td className="py-3 pr-4 font-medium text-primary">$15.00/ea</td>
                  <td className="py-3 font-bold text-primary">$72.25</td>
                </tr>
                <tr>
                  <td className="py-3 pr-4 font-bold">Pallet</td>
                  <td className="py-3 pr-4"><Badge className="bg-accent/10 text-accent">Custom</Badge></td>
                  <td className="py-3 pr-4 text-muted-foreground" colSpan={3}>
                    <Link href="/quote" className="font-semibold text-primary hover:underline">Request pallet quote for best pricing + free freight</Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Product grid with sort + filter controls */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-4 py-8">
          {/* Toolbar */}
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <h2 className="text-lg font-bold text-foreground">
                {activeDeptData ? activeDeptData.name : "All Departments"}
              </h2>
              <span className="text-sm text-muted-foreground">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </span>
              {activeDept && (
                <button onClick={() => setActiveDept(null)} className="flex items-center gap-1 rounded-full border border-primary/30 bg-primary/5 px-2.5 py-0.5 text-xs font-medium text-primary hover:bg-primary/10">
                  {activeDeptData?.name} <X className="h-3 w-3" />
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              {/* Sort dropdown */}
              <div className="relative">
                <button
                  onClick={() => setShowSort(!showSort)}
                  className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-card-foreground transition-colors hover:bg-muted"
                >
                  Sort by: {sortOptions.find((o) => o.value === sort)?.label}
                  <ChevronDown className={`h-3 w-3 transition-transform ${showSort ? "rotate-180" : ""}`} />
                </button>
                {showSort && (
                  <div className="absolute right-0 top-full z-30 mt-1 w-48 rounded-lg border border-border bg-card py-1 shadow-xl">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => { setSort(opt.value); setShowSort(false) }}
                        className={`flex w-full px-3 py-2 text-left text-xs transition-colors hover:bg-muted ${sort === opt.value ? "font-semibold text-primary" : "text-card-foreground"}`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {/* Mobile filter toggle */}
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-1.5 rounded-lg border border-border px-3 py-2 text-xs font-medium text-card-foreground transition-colors hover:bg-muted md:hidden">
                <SlidersHorizontal className="h-3.5 w-3.5" /> Filter
              </button>
            </div>
          </div>

          {/* Mobile department filter */}
          {showFilters && (
            <div className="mb-6 flex flex-wrap gap-2 md:hidden">
              <button onClick={() => setActiveDept(null)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${!activeDept ? "bg-primary text-primary-foreground" : "border border-border bg-card text-card-foreground hover:bg-muted"}`}>All</button>
              {departments.map((dept) => (
                <button key={dept.slug} onClick={() => setActiveDept(dept.slug)} className={`rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${activeDept === dept.slug ? "bg-primary text-primary-foreground" : "border border-border bg-card text-card-foreground hover:bg-muted"}`}>
                  {dept.name}
                </button>
              ))}
            </div>
          )}

          {/* Product grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={{ ...product, slug: product.slug, originalPrice: product.originalPrice }} variant="vertical" />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="flex flex-col items-center gap-3 py-16 text-center">
              <Package className="h-12 w-12 text-muted-foreground/40" />
              <p className="text-lg font-semibold text-foreground">No products found</p>
              <p className="text-sm text-muted-foreground">Try selecting a different department or clearing your filter.</p>
              <Button size="sm" variant="outline" onClick={() => setActiveDept(null)}>Clear Filter</Button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="border-t border-border bg-foreground">
        <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 px-4 py-10 text-center md:py-12">
          <Percent className="h-8 w-8 text-primary" />
          <h2 className="text-xl font-bold text-background md:text-2xl">Need a custom quote for large volumes?</h2>
          <p className="max-w-lg text-sm text-background/70">Our team handles pallet, container, and job-lot pricing every day. Tell us what you need and we will get you the best price with free freight.</p>
          <div className="flex gap-3">
            <Button size="sm" asChild className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/quote">Request a Quote <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
            <Button size="sm" variant="outline" asChild className="gap-1.5 border-background/30 bg-transparent text-background hover:border-background hover:bg-background/10">
              <a href="tel:8888760007">Call (888) 876-0007</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
