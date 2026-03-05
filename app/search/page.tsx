import Link from "next/link"
import Image from "next/image"
import { Search, ArrowRight, Star, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import type { Metadata } from "next"
import { searchShopifyProducts, type Product } from "@/lib/data"

export const metadata: Metadata = {
  title: "Search | PES Supply",
  description: "Search 40,000+ electrical, solar, HVAC, and industrial products at PES Supply.",
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string; dept?: string }> }) {
  const { q, dept } = await searchParams
  const query = q?.trim() || ""
  const results: Product[] = query ? await searchShopifyProducts(query, 40) : []

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search header */}
      <div className="mb-8">
        <h1 className="text-2xl font-black text-foreground sm:text-3xl">
          {query ? (
            <>
              {'Results for "'}<span className="text-primary">{query}</span>{'"'}
            </>
          ) : (
            "Search Products"
          )}
        </h1>
        {query && (
          <p className="mt-1 text-sm text-muted-foreground">
            {results.length} product{results.length !== 1 ? "s" : ""} found
            {dept && dept !== "All Departments" ? ` in ${dept}` : ""}
          </p>
        )}
      </div>

      {/* No query state */}
      {!query && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <Search className="h-16 w-16 text-muted-foreground/20" />
          <p className="text-lg text-muted-foreground">Enter a search term to find products, brands, or part numbers</p>
        </div>
      )}

      {/* No results */}
      {query && results.length === 0 && (
        <div className="flex flex-col items-center gap-4 py-20 text-center">
          <Search className="h-16 w-16 text-muted-foreground/20" />
          <p className="text-lg font-semibold text-foreground">No results found</p>
          <p className="max-w-md text-sm text-muted-foreground">
            {'Try a different search term, check for typos, or browse our '}
            <Link href="/departments" className="text-primary hover:underline">departments</Link>.
          </p>
        </div>
      )}

      {/* Results grid */}
      {results.length > 0 && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {results.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg"
            >
              <div className="relative aspect-square bg-muted">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform group-hover:scale-105"
                />
                <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground text-[10px]">
                  {product.badge}
                </Badge>
              </div>
              <div className="flex flex-1 flex-col p-3">
                <p className="text-xs text-muted-foreground">{product.brand}</p>
                <h3 className="mt-0.5 line-clamp-2 text-sm font-semibold text-card-foreground group-hover:text-primary">
                  {product.name}
                </h3>
                <div className="mt-1 flex items-center gap-1">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  <span className="text-xs font-medium text-foreground">{product.rating.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>
                <div className="mt-auto flex items-end justify-between pt-2">
                  <div>
                    <span className="text-lg font-black text-foreground">${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    {product.originalPrice > product.price && (
                      <span className="ml-1.5 text-xs text-muted-foreground line-through">${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    )}
                  </div>
                  {product.freeShipping && (
                    <span className="flex items-center gap-0.5 text-[10px] font-semibold text-primary">
                      <Truck className="h-3 w-3" /> Free
                    </span>
                  )}
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  )
}
