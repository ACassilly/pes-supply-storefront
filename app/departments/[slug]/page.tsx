import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Truck, ShieldCheck, Star, ChevronRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { departments, getProductsByDepartment, fetchShopifyCollectionProducts } from "@/lib/data"
import type { Metadata } from "next"
import { AddToCartButton } from "@/components/add-to-cart-button"

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

export default async function DepartmentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const dept = departments.find((d) => d.slug === slug)
  if (!dept) notFound()

  // Try Shopify collection first, fall back to static data
  const shopifyProducts = await fetchShopifyCollectionProducts(slug, 50)
  const deptProducts = shopifyProducts.length > 0 ? shopifyProducts : getProductsByDepartment(slug)

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
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {dept.subs.map((sub) => (
            <Link
              key={sub.slug}
              href={`/departments/${slug}/${sub.slug}`}
              className="group flex flex-col items-center gap-2 rounded-lg border border-border bg-card p-4 text-center transition-all hover:border-primary/30 hover:shadow-md"
            >
              <span className="text-sm font-semibold text-card-foreground group-hover:text-primary">{sub.name}</span>
              <span className="text-xs text-muted-foreground">{sub.count} products</span>
              <ArrowRight className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
            </Link>
          ))}
        </div>
      </section>

      {/* Products */}
      {deptProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 pb-12">
          <div className="mb-5 flex items-end justify-between">
            <h2 className="text-lg font-bold text-foreground">Popular in {dept.name}</h2>
            <span className="text-xs text-muted-foreground">{deptProducts.length} products shown</span>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        </section>
      )}

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
