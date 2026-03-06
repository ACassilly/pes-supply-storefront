"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Search, X } from "lucide-react"
import { brands } from "@/lib/data"

export default function BrandsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filter brands by search
  const filteredBrands = useMemo(() => {
    if (!searchQuery.trim()) return brands
    const q = searchQuery.toLowerCase()
    return brands.filter((b) => b.name.toLowerCase().includes(q))
  }, [searchQuery])
  
  // Group by first letter
  const alphabeticalGroups = useMemo(() => {
    const groups: Record<string, typeof brands> = {}
    filteredBrands.forEach((b) => {
      const letter = b.name[0].toUpperCase()
      if (!groups[letter]) groups[letter] = []
      groups[letter].push(b)
    })
    return groups
  }, [filteredBrands])
  
  const letters = Object.keys(alphabeticalGroups).sort()
  const allLetters = Array.from(new Set(brands.map((b) => b.name[0].toUpperCase()))).sort()

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
          {brands.length} brands, 500+ vendors. Every product ships with the full OEM warranty. We are an authorized distributor, not a gray-market reseller.
        </p>

        {/* Search input */}
        <div className="relative mt-6 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search brands..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-lg border border-input bg-background py-2.5 pl-10 pr-10 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* A-Z quick nav */}
        <div className="mt-6 flex flex-wrap gap-1.5">
          {allLetters.map((letter) => {
            const hasResults = alphabeticalGroups[letter]?.length > 0
            return (
              <a 
                key={letter} 
                href={hasResults ? `#letter-${letter}` : undefined}
                className={`flex h-8 w-8 items-center justify-center rounded-md border text-xs font-bold transition-colors ${
                  hasResults 
                    ? "border-border text-muted-foreground hover:border-primary hover:text-primary" 
                    : "border-border/50 text-muted-foreground/30 cursor-default"
                }`}
              >
                {letter}
              </a>
            )
          })}
        </div>

        {/* Results count */}
        {searchQuery && (
          <p className="mt-4 text-sm text-muted-foreground">
            {filteredBrands.length} brand{filteredBrands.length !== 1 ? "s" : ""} found
          </p>
        )}

        {/* Alphabetical sections */}
        <div className="mt-10 space-y-10">
          {letters.map((letter) => {
            const letterBrands = alphabeticalGroups[letter]
            return (
              <div key={letter} id={`letter-${letter}`} className="scroll-mt-20">
                <h2 className="mb-4 border-b border-border pb-2 text-lg font-bold text-foreground">{letter}</h2>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {letterBrands.map((brand) => (
                    <Link key={brand.slug} href={`/brands/${brand.slug}`} className="group flex items-center gap-3 rounded-lg border border-border bg-card p-3 transition-all hover:border-primary/30 hover:shadow-md">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-md bg-white">
                        {brand.logo ? (
                          <Image 
                            src={brand.logo} 
                            alt={brand.name} 
                            width={40} 
                            height={40} 
                            className="h-10 w-10 object-contain" 
                            loading="lazy"
                            unoptimized
                          />
                        ) : (
                          <Image
                            src={`https://logo.clearbit.com/${brand.name.toLowerCase().replace(/\s+/g, "")}.com`}
                            alt={brand.name}
                            width={40}
                            height={40}
                            className="h-10 w-10 object-contain"
                            loading="lazy"
                            unoptimized
                            onError={(e) => {
                              const target = e.target as HTMLImageElement
                              target.style.display = "none"
                              const parent = target.parentElement
                              if (parent) {
                                parent.innerHTML = `<span class="text-sm font-bold text-primary">${brand.name.slice(0, 2).toUpperCase()}</span>`
                              }
                            }}
                          />
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-semibold text-card-foreground group-hover:text-primary">{brand.name}</h3>
                        <p className="truncate text-xs text-muted-foreground">{brand.productCount.toLocaleString()} products</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {filteredBrands.length === 0 && (
          <div className="mt-10 text-center">
            <p className="text-lg font-semibold text-foreground">No brands found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search term</p>
          </div>
        )}
      </section>
    </div>
  )
}
