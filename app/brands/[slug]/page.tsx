import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { ChevronRight, Star, Truck, Globe, ShieldCheck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { brands, getProductsByBrand } from "@/lib/data"
import { AddToCartButton } from "@/components/add-to-cart-button"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return brands.map((b) => ({ slug: b.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const brand = brands.find((b) => b.slug === slug)
  if (!brand) return {}
  return {
    title: `${brand.name} | Authorized Distributor`,
    description: `Shop ${brand.name} products at PES Supply. ${brand.description} ${brand.productCount.toLocaleString()} products in stock. Authorized distributor with full OEM warranty.`,
  }
}

export default async function BrandPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const brand = brands.find((b) => b.slug === slug)
  if (!brand) notFound()

  const brandProducts = getProductsByBrand(slug)

  return (
    <div className="bg-background">
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/brands" className="hover:text-primary">Brands</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-medium text-foreground">{brand.name}</li>
        </ol>
      </nav>

      {/* Brand hero */}
      <section className="border-b border-border bg-muted/30 px-4 py-10">
        <div className="mx-auto flex max-w-7xl items-center gap-6">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-border bg-card text-2xl font-black text-muted-foreground">
            {brand.name.slice(0, 2).toUpperCase()}
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-foreground md:text-3xl">{brand.name}</h1>
              <Badge className="bg-primary text-xs text-primary-foreground">Authorized</Badge>
            </div>
            <p className="mt-2 max-w-xl text-sm text-muted-foreground">{brand.description}</p>
            <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{brand.productCount.toLocaleString()} products</span>
              <span className="flex items-center gap-1"><ShieldCheck className="h-3.5 w-3.5 text-primary" /> Full OEM Warranty</span>
              {brand.departments.map((d) => (
                <span key={d} className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium">{d}</span>
              ))}
              <a href={`https://${brand.website}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-primary hover:underline">
                <Globe className="h-3 w-3" /> {brand.website}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="mx-auto max-w-7xl px-4 py-10">
        <h2 className="mb-5 text-lg font-bold text-foreground">{brand.name} Products at PES Supply</h2>
        {brandProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {brandProducts.map((product) => {
              const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
              return (
                <div key={product.id} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
                  <Link href={`/products/${product.slug}`} className="relative aspect-square w-full overflow-hidden bg-muted">
                    <Image src={product.image} alt={product.name} fill sizes="(max-width:640px) 100vw,(max-width:1024px) 50vw,25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <Badge className="absolute left-2 top-2 bg-primary text-[10px] text-primary-foreground">{product.badge}</Badge>
                    {discount > 0 && <Badge className="absolute right-2 top-2 bg-sale text-[10px] text-sale-foreground">{discount}% OFF</Badge>}
                  </Link>
                  <div className="flex flex-1 flex-col p-3">
                    <Link href={`/products/${product.slug}`} className="mb-1 line-clamp-2 text-sm font-semibold leading-snug text-card-foreground group-hover:text-primary">{product.name}</Link>
                    <div className="mb-2 flex items-center gap-1.5">
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => <Star key={i} className={`h-3 w-3 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`} />)}
                      </div>
                      <span className="text-xs text-muted-foreground">({product.reviews.toLocaleString()})</span>
                    </div>
                    <div className="mt-auto flex items-baseline gap-2">
                      <span className="text-lg font-bold text-foreground">${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                      <span className="text-xs text-muted-foreground line-through">${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                    </div>
                    {product.freeShipping && <span className="mt-1 flex items-center gap-1 text-[10px] font-medium text-primary"><Truck className="h-3 w-3" /> Free Shipping</span>}
                    <AddToCartButton product={product} />
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="rounded-lg border border-dashed border-border py-16 text-center">
            <p className="text-sm text-muted-foreground">Full {brand.name} catalog coming soon. Contact us for availability and pricing.</p>
            <Link href="/contact" className="mt-3 inline-block text-sm font-semibold text-primary hover:underline">Contact Sales</Link>
          </div>
        )}
      </section>
    </div>
  )
}
