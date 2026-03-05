"use client"

import { useState, useCallback } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, X } from "lucide-react"
import { products } from "@/lib/data"
import type { Product } from "@/lib/data"

interface CrossRefResult {
  product: Product
  match: { brand: string; partNumber: string; note?: string }
}

function searchCrossRefLocal(query: string): CrossRefResult[] {
  const q = query.toLowerCase().replace(/[\s\-]/g, "")
  if (q.length < 2) return []
  const results: CrossRefResult[] = []
  const seen = new Set<number>()

  for (const product of products) {
    // Match against cross-reference part numbers
    if (product.crossRef) {
      for (const ref of product.crossRef) {
        const pn = ref.partNumber.toLowerCase().replace(/[\s\-]/g, "")
        if (pn.includes(q) || q.includes(pn)) {
          if (!seen.has(product.id)) {
            results.push({ product, match: ref })
            seen.add(product.id)
          }
        }
      }
    }

    // Match against our own SKU
    const sku = product.sku.toLowerCase().replace(/[\s\-]/g, "")
    if (sku.includes(q) || q.includes(sku)) {
      if (!seen.has(product.id)) {
        results.push({ product, match: { brand: product.brand, partNumber: product.sku, note: "PES Supply SKU" } })
        seen.add(product.id)
      }
    }

    // Match against product name
    if (product.name.toLowerCase().includes(query.toLowerCase())) {
      if (!seen.has(product.id)) {
        results.push({ product, match: { brand: product.brand, partNumber: product.sku, note: "Name match" } })
        seen.add(product.id)
      }
    }
  }

  return results.slice(0, 8)
}

export function PartNumberLookup() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<CrossRefResult[]>([])
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = useCallback(() => {
    if (query.trim().length < 2) return
    const found = searchCrossRefLocal(query.trim())
    setResults(found)
    setHasSearched(true)
  }, [query])

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch()
  }, [handleSearch])

  const handleClear = useCallback(() => {
    setQuery("")
    setResults([])
    setHasSearched(false)
  }, [])

  return (
    <div className="rounded-xl border border-border bg-card p-5 md:p-8">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-lg font-bold text-foreground md:text-xl">Part Number Conversion</h2>
        <p className="mt-1.5 text-sm text-muted-foreground">Enter any manufacturer part number, competitor SKU, or product name to find the PES Supply equivalent.</p>
      </div>

      {/* Search bar */}
      <div className="mx-auto mt-5 flex max-w-xl gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="e.g. BR3060B200V, Fluke 376, DCD998W1..."
            className="h-11 w-full rounded-lg border border-border bg-background pl-10 pr-9 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
          />
          {query && (
            <button onClick={handleClear} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label="Clear search">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="inline-flex h-11 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Look Up
        </button>
      </div>

      {/* Results */}
      {hasSearched && (
        <div className="mx-auto mt-6 max-w-3xl">
          {results.length > 0 ? (
            <>
              <p className="mb-3 text-xs font-medium text-muted-foreground">{results.length} result{results.length !== 1 ? "s" : ""} found for &quot;{query}&quot;</p>
              <div className="flex flex-col gap-2">
                {results.map((r) => (
                  <Link
                    key={`${r.product.id}-${r.match.partNumber}`}
                    href={`/products/${r.product.slug}`}
                    className="group flex items-center gap-4 rounded-lg border border-border bg-background p-3 transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md bg-muted">
                      <Image src={r.product.image} alt={r.product.name} fill sizes="56px" className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-foreground group-hover:text-primary">{r.product.name}</p>
                      <div className="mt-0.5 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
                        <span>Matches: <span className="font-mono text-primary">{r.match.partNumber}</span> ({r.match.brand})</span>
                        {r.match.note && <span className="hidden sm:inline">{r.match.note}</span>}
                      </div>
                      <p className="mt-0.5 text-xs text-muted-foreground">PES SKU: <span className="font-mono font-semibold text-foreground">{r.product.sku}</span></p>
                    </div>
                    <div className="hidden shrink-0 text-right sm:block">
                      <p className="text-sm font-bold text-foreground">${r.product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                      <span className="inline-flex items-center gap-0.5 text-xs font-medium text-primary">
                        View <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="rounded-lg border border-border bg-muted/30 px-6 py-8 text-center">
              <p className="text-sm font-semibold text-foreground">No matches found for &quot;{query}&quot;</p>
              <p className="mt-1.5 text-xs text-muted-foreground">Try a different part number, or call us at <a href="tel:8888760007" className="font-semibold text-primary hover:underline">(888) 876-0007</a> and our team will look it up for you.</p>
            </div>
          )}
        </div>
      )}

      {/* Tip */}
      {!hasSearched && (
        <p className="mx-auto mt-4 max-w-xl text-center text-[11px] text-muted-foreground">
          Search by Eaton, Siemens, GE, Square D, Fluke, DeWalt, Mitsubishi, or any other manufacturer part number. We cross-reference 40,000+ SKUs across all departments.
        </p>
      )}
    </div>
  )
}
