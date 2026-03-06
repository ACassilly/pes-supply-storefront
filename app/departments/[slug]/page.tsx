import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, ShieldCheck, Star, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { departments, getProductsByDepartment, fetchShopifyCollectionProducts, type Product } from "@/lib/data"
import type { Metadata } from "next"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { ProductFilters, ProductPagination } from "@/components/product-filters"
import { Suspense } from "react"

export async function generateStaticParams() {
  return departments.map((d) => ({ slug: d.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const dept = departments.find((d) => d.slug === slug)
  if (!dept) return {}
  return {
    title: `${dept.name} | ${dept.count} Products`,
    description: dept.description,
  }
}

const PRODUCTS_PER_PAGE = 24

const PRICE_RANGES = [
  { value: "0-100", label: "Under $100" },
  { value: "100-500", label: "$100 - $500" },
  { value: "500-1000", label: "$500 - $1,000" },
  { value: "1000-5000", label: "$1,000 - $5,000" },
  { value: "5000+", label: "$5,000+" },
]

function filterProducts(products: Product[], params: { brands?: string; price?: string; inStock?: string }) {
  let filtered = [...products]
  
  // Filter by brands
  if (params.brands) {
    const brandList = params.brands.split(",").map((b) => b.toLowerCase())
    filtered = filtered.filter((p) => brandList.includes(p.brand.toLowerCase()))
  }
  
  // Filter by price range
  if (params.price) {
    const [min, max] = params.price.split("-").map((v) => (v === "5000+" ? Infinity : parseInt(v, 10)))
    filtered = filtered.filter((p) => {
      if (max === Infinity) return p.price >= 5000
      return p.price >= (min || 0) && p.price <= (max || Infinity)
    })
  }
  
  // Filter by in stock
  if (params.inStock === "true") {
    filtered = filtered.filter((p) => p.badge !== "Out of Stock")
  }
  
  return filtered
}

function sortProducts(products: Product[], sortKey: string) {
  const sorted = [...products]
  switch (sortKey) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price)
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price)
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name))
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name))
    case "newest":
      return sorted.reverse()
    case "best-selling":
    default:
      return sorted.sort((a, b) => b.reviews - a.reviews)
  }
}

export default async function DepartmentPage({ 
  params, 
  searchParams 
}: { 
  params: Promise<{ slug: string }>
  searchParams: Promise<{ sort?: string; brands?: string; price?: string; inStock?: string; page?: string; subcategory?: string }>
}) {
  const { slug } = await params
  const { sort = "best-selling", brands, price, inStock, page = "1", subcategory } = await searchParams
  const dept = departments.find((d) => d.slug === slug)
  if (!dept) notFound()

  // Try Shopify collection first, fall back to static data
  const shopifyProducts = await fetchShopifyCollectionProducts(slug, 100)
  const allProducts = shopifyProducts.length > 0 ? shopifyProducts : getProductsByDepartment(slug)
  
  // Apply subcategory filter (if provided, filter by category field)
  const subcategoryFilteredProducts = subcategory 
    ? allProducts.filter((p) => p.category.toLowerCase() === subcategory.toLowerCase() || p.category.toLowerCase().includes(subcategory.toLowerCase()))
    : allProducts
  
  // Apply filters
  const filteredProducts = filterProducts(subcategoryFilteredProducts, { brands, price, inStock })
  
  // Apply sorting
  const sortedProducts = sortProducts(filteredProducts, sort)
  
  // Pagination
  const currentPage = Math.max(1, parseInt(page, 10))
  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)
  const startIdx = (currentPage - 1) * PRODUCTS_PER_PAGE
  const deptProducts = sortedProducts.slice(startIdx, startIdx + PRODUCTS_PER_PAGE)
  
  // Extract unique brands for filter options
  const brandCounts = allProducts.reduce((acc, p) => {
    acc[p.brand] = (acc[p.brand] || 0) + 1
    return acc
  }, {} as Record<string, number>)
  const brandOptions = Object.entries(brandCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([brand, count]) => ({ value: brand, label: brand, count }))

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/departments" className="hover:text-primary">Departments</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-medium text-foreground">{dept.name}</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative border-b border-border bg-foreground">
        <div className="absolute inset-0 overflow-hidden">
          <Image src={dept.image} alt="" fill className="object-cover opacity-20" sizes="100vw" />
        </div>
        <div className="relative mx-auto flex max-w-7xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:py-14">
          <div>
            <h1 className="text-2xl font-bold text-background md:text-3xl">{dept.name}</h1>
            <p className="mt-2 max-w-xl text-sm leading-relaxed text-background/60">{dept.description}</p>
            <p className="mt-3 text-sm font-semibold text-primary">{dept.count} products in stock</p>
          </div>
        </div>
      </section>

      {/* Subcategories */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-5 text-lg font-bold text-foreground">Shop by Category</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-7">
          {/* All Products reset */}
          <Link
            href={`/departments/${slug}`}
            className={`group flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all hover:shadow-md ${
              !subcategory 
                ? "border-primary bg-primary/5 border-2" 
                : "border-border bg-card hover:border-primary/30"
            }`}
          >
            <span className={`text-sm font-semibold ${!subcategory ? "text-primary" : "text-card-foreground group-hover:text-primary"}`}>All Products</span>
            <span className="text-xs text-muted-foreground">{dept.count}</span>
          </Link>
          {dept.subs.map((sub) => {
            const isActive = subcategory === sub.slug
            return (
              <Link
                key={sub.slug}
                href={`/departments/${slug}?subcategory=${sub.slug}`}
                className={`group flex flex-col items-center gap-2 rounded-lg border p-4 text-center transition-all hover:shadow-md ${
                  isActive 
                    ? "border-primary bg-primary/5 border-2" 
                    : "border-border bg-card hover:border-primary/30"
                }`}
              >
                <span className={`text-sm font-semibold ${isActive ? "text-primary" : "text-card-foreground group-hover:text-primary"}`}>{sub.name}</span>
                <span className="text-xs text-muted-foreground">{sub.count} products</span>
                <ArrowRight className={`h-3.5 w-3.5 transition-transform group-hover:translate-x-1 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-primary"}`} />
              </Link>
            )
          })}
        </div>
      </section>

      {/* Products with Filters */}
      <section className="mx-auto max-w-7xl px-4 pb-12">
        <div className="flex gap-8">
          {/* Filter Sidebar */}
          <Suspense fallback={null}>
            <ProductFilters
              brands={brandOptions}
              priceRanges={PRICE_RANGES}
              totalProducts={sortedProducts.length}
              deptSlug={slug}
            />
          </Suspense>

          {/* Product Grid */}
          <div className="flex-1">
            {deptProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <p className="text-lg font-semibold text-foreground">No products match your filters</p>
                <p className="mt-2 text-sm text-muted-foreground">Try adjusting your filters or clearing them to see more products.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {deptProducts.map((product) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              return (
                <div key={product.id} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
                  <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-muted">
                    <Image src={product.image} alt={product.name} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <Badge className="absolute left-2 top-2 bg-primary text-[10px] text-primary-foreground">{product.badge}</Badge>
                    {discount > 0 && <Badge className="absolute right-2 top-2 bg-sale text-[10px] text-sale-foreground">{discount}% OFF</Badge>}
                  </Link>
                  <div className="flex flex-1 flex-col p-3">
                    <div className="mb-2 flex flex-wrap gap-1">
                      {product.specs.map((s) => <span key={s} className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">{s}</span>)}
                    </div>
                    <Link href={`/products/${product.slug}`} className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary">{product.name}</Link>
                    <p className="mb-1 text-xs text-muted-foreground">{product.brand}</p>
                    <div className="mb-2 flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
                        ))}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                    </div>
                    <div className="mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold text-foreground">${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                        <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                      </div>
                      {product.freeShipping && <span className="mt-1 flex items-center gap-1 text-[10px] font-medium text-primary"><Truck className="h-3 w-3" /> Free Shipping</span>}
                    </div>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              )
            })}
                </div>

                {/* Pagination */}
                <Suspense fallback={null}>
                  <ProductPagination currentPage={currentPage} totalPages={totalPages} deptSlug={slug} />
                </Suspense>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="border-t border-border bg-muted/30 px-4 py-8">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5 font-semibold text-primary"><ShieldCheck className="h-4 w-4" /> Authorized Distributor</span>
          <span className="flex items-center gap-1.5 font-semibold text-primary"><Truck className="h-4 w-4" /> Same-Day Shipping</span>
          <span className="flex items-center gap-1.5 font-semibold text-primary"><ShieldCheck className="h-4 w-4" /> Full Manufacturer Warranty</span>
        </div>
      </section>
    </div>
  )
}
