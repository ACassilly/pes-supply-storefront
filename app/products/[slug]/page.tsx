import { notFound } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Star, Truck, ShieldCheck, MapPin, Check, Package, Clock, Scale, Globe } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { products, departments, getProductsByDepartment } from "@/lib/data"
import { AddToCartButton } from "@/components/add-to-cart-button"
import { RequestQuoteButton } from "@/components/request-quote-button"
import { ProductImageGallery } from "@/components/product-image-gallery"
import { ProductTabs } from "@/components/product-tabs"
import { StickyBuyBar } from "@/components/sticky-buy-bar"
import type { Metadata } from "next"

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) return {}
  return {
    title: `${product.name} | ${product.brand} | PES Supply`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [{ url: product.image, width: 1200, height: 630 }],
    },
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.slug === slug)
  if (!product) notFound()

  const dept = departments.find((d) => d.slug === product.department)
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
  const related = getProductsByDepartment(product.department).filter((p) => p.id !== product.id).slice(0, 4)
  const compatible = (product.compatibleWith || []).map((s) => products.find((p) => p.slug === s)).filter(Boolean)
  const isKit = product.type === "kit"
  const gallery = product.gallery?.length ? product.gallery : [product.image]

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    image: `https://pes.supply${product.image}`,
    description: product.description,
    sku: product.sku,
    brand: { "@type": "Brand", name: product.brand },
    offers: {
      "@type": "Offer",
      url: `https://pes.supply/products/${product.slug}`,
      priceCurrency: "USD",
      price: product.price,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "PES Supply" },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews,
    },
  }

  return (
    <div className="bg-background pb-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          {dept && (
            <>
              <li><Link href={`/departments/${dept.slug}`} className="hover:text-primary">{dept.name}</Link></li>
              <li><ChevronRight className="h-3 w-3" /></li>
            </>
          )}
          <li className="truncate font-medium text-foreground">{product.name}</li>
        </ol>
      </nav>

      {/* Product Hero */}
      <section className="mx-auto max-w-7xl px-4 py-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-12">

          {/* Left: Image Gallery */}
          <div className="lg:w-1/2">
            <ProductImageGallery images={gallery} alt={product.name} badge={product.badge} discount={discount} />
          </div>

          {/* Right: Details */}
          <div className="flex-1 lg:w-1/2">

            {/* Type badge + brand + SKU */}
            <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
              {isKit && <Badge variant="outline" className="border-accent text-accent">Kit</Badge>}
              <Link href={`/brands/${product.brand.toLowerCase().replace(/\s+/g, "-")}`} className="font-semibold text-primary hover:underline">{product.brand}</Link>
              <span>|</span>
              <span>SKU: {product.sku}</span>
              {product.upc && <><span>|</span><span>UPC: {product.upc}</span></>}
            </div>

            {/* Title */}
            <h1 className="mt-2 text-balance text-xl font-bold text-foreground md:text-2xl">{product.name}</h1>

            {/* Rating */}
            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-0.5" aria-label={`${product.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className={`h-4 w-4 ${i < Math.round(product.rating) ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">{product.rating}</span>
              <span className="text-sm text-muted-foreground">({product.reviews.toLocaleString()} reviews)</span>
            </div>

            {/* Price block */}
            <div className="mt-5 rounded-lg border border-border bg-muted/30 p-4">
              <div className="flex items-baseline gap-3">
                <span className="text-3xl font-black text-foreground">${product.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                <span className="text-lg text-muted-foreground line-through">${product.originalPrice.toLocaleString("en-US", { minimumFractionDigits: 2 })}</span>
                {discount > 0 && <span className="rounded-full bg-sale px-2 py-0.5 text-xs font-bold text-sale-foreground">-{discount}%</span>}
              </div>
              {isKit && product.includes && (
                <p className="mt-1 text-xs text-muted-foreground">${(product.price / product.includes.reduce((s, i) => s + i.qty, 0)).toFixed(2)}/component avg</p>
              )}
              {product.freeShipping && <p className="mt-1 text-xs font-medium text-primary">Free freight on this item</p>}
              {!product.freeShipping && product.price >= 999 && <p className="mt-1 text-xs font-medium text-primary">Free freight on this item (over $999)</p>}
              <Link href="/account" className="mt-1.5 inline-block text-xs font-semibold text-primary hover:underline">Sign in for Pro pricing</Link>
            </div>

            {/* Availability + shipping info */}
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <Check className="h-4 w-4 text-primary" />
                <span className="font-semibold text-primary">{product.badge}</span>
              </div>
              {product.leadTime && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Lead time: {product.leadTime}</span>
                </div>
              )}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Ships from: {product.shipsFrom}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Truck className="h-4 w-4" />
                <span>Order by 2 PM ET for same-day processing</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <ShieldCheck className="h-4 w-4" />
                <span>{product.warranty || "Full manufacturer warranty"}</span>
              </div>
              {product.weight && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Scale className="h-4 w-4" />
                  <span>{product.weight}{parseInt(product.weight) > 150 ? " -- ships LTL freight" : " -- ships parcel"}</span>
                </div>
              )}
              {product.countryOfOrigin && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Globe className="h-4 w-4" />
                  <span>Origin: {product.countryOfOrigin}</span>
                </div>
              )}
            </div>

            {/* Certifications */}
            {product.certifications && product.certifications.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-1.5">
                {product.certifications.map((cert) => (
                  <span key={cert} className="rounded-full border border-primary/20 bg-primary/5 px-2.5 py-1 text-[10px] font-semibold text-primary">{cert}</span>
                ))}
              </div>
            )}

            {/* Kit contents quick summary */}
            {isKit && product.includes && product.includes.length > 0 && (
              <div className="mt-4 rounded-lg border border-border bg-card p-4">
                <h3 className="mb-2 flex items-center gap-2 text-sm font-bold text-foreground">
                  <Package className="h-4 w-4 text-primary" />
                  Kit Contains {product.includes.reduce((s, i) => s + i.qty, 0)} Items
                </h3>
                <ul className="flex flex-col gap-1">
                  {product.includes.slice(0, 4).map((item) => (
                    <li key={item.sku} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">{item.name}</span>
                      <span className="font-semibold text-foreground">x{item.qty}</span>
                    </li>
                  ))}
                  {product.includes.length > 4 && (
                    <li className="text-xs font-medium text-primary">+{product.includes.length - 4} more items (see Kit Contents tab)</li>
                  )}
                </ul>
              </div>
            )}

            {/* Actions */}
            <div id="quote-section" className="mt-6 flex flex-col gap-3 sm:flex-row">
              <AddToCartButton product={product} size="lg" className="mt-0 sm:flex-1" />
              <RequestQuoteButton productName={product.name} sku={product.sku} />
            </div>

            {/* Min order qty */}
            {product.minOrderQty && product.minOrderQty > 1 && (
              <p className="mt-2 text-xs text-muted-foreground">Minimum order quantity: {product.minOrderQty} units</p>
            )}

            {/* Panel damage buffer tip */}
            {product.category === "solar-panels" && (
              <div className="mt-4 rounded-lg border border-accent/20 bg-accent/5 px-4 py-2.5">
                <p className="text-xs text-accent"><strong>Pro tip:</strong> Order 2-5% more panels than your design requires to account for possible transit damage. Spares on site keep your crew working.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Tabs Section */}
      <section className="mx-auto max-w-7xl px-4 py-4">
        <ProductTabs product={product} />
      </section>

      {/* Compatible Products */}
      {compatible.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-8">
          <h2 className="mb-5 text-lg font-bold text-foreground">Compatible Products</h2>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {compatible.map((rp) => rp && (
              <Link key={rp.id} href={`/products/${rp.slug}`} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md">
                <div className="relative aspect-square overflow-hidden bg-muted">
                  <Image src={rp.image} alt={rp.name} fill sizes="(max-width:640px) 50vw,25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  <Badge className="absolute left-2 top-2 bg-primary text-[10px] text-primary-foreground">{rp.badge}</Badge>
                </div>
                <div className="p-3">
                  <p className="text-[10px] font-medium text-muted-foreground">{rp.brand}</p>
                  <p className="line-clamp-2 text-xs font-semibold text-card-foreground group-hover:text-primary">{rp.name}</p>
                  <p className="mt-1 text-sm font-bold text-foreground">${rp.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Related Products */}
      {related.length > 0 && (
        <section className="border-t border-border bg-muted/30 px-4 py-10">
          <div className="mx-auto max-w-7xl">
            <h2 className="mb-5 text-lg font-bold text-foreground">Customers Also Viewed</h2>
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {related.map((rp) => (
                <Link key={rp.id} href={`/products/${rp.slug}`} className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image src={rp.image} alt={rp.name} fill sizes="(max-width:640px) 50vw,25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                    <Badge className="absolute left-2 top-2 bg-primary text-[10px] text-primary-foreground">{rp.badge}</Badge>
                  </div>
                  <div className="p-3">
                    <p className="text-[10px] font-medium text-muted-foreground">{rp.brand}</p>
                    <p className="line-clamp-2 text-xs font-semibold text-card-foreground group-hover:text-primary">{rp.name}</p>
                    <p className="mt-1 text-sm font-bold text-foreground">${rp.price.toLocaleString("en-US", { minimumFractionDigits: 2 })}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sticky Buy Bar */}
      <StickyBuyBar product={{ id: product.id, name: product.name, price: product.price, image: product.image, sku: product.sku }} />
    </div>
  )
}
