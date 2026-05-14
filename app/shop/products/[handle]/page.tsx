import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getProductByHandle } from '@/lib/medusa'
import { productMetadata, productJsonLd, breadcrumbJsonLd } from '@/lib/seo'
import ProductImageGallery from '@/components/product-image-gallery'
import ProductTabs from '@/components/product-tabs'
import PdpAddToCart from '@/components/pdp-add-to-cart'
import StickyBuyBar from '@/components/sticky-buy-bar'
import { formatPrice } from '@/lib/format'

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  try {
    const { product } = await getProductByHandle(handle)
    return product ? productMetadata(product) : { title: 'Product Not Found' }
  } catch {
    return { title: handle }
  }
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params
  let product = null
  try {
    const data = await getProductByHandle(handle)
    product = data.product
  } catch {}

  if (!product) notFound()

  const variant = product.variants[0]
  const price = variant?.calculated_price?.calculated_amount
  const currency = variant?.calculated_price?.currency_code ?? 'USD'

  const productLd = productJsonLd(product)
  const breadcrumbLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://pes.supply/' },
    { name: 'Shop', url: 'https://pes.supply/shop' },
    { name: product.title, url: `https://pes.supply/shop/products/${handle}` },
  ])

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

      <div className="max-w-7xl mx-auto px-4 py-10">
        <nav className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          <a href="/shop" className="hover:underline">Shop</a> &rsaquo;{' '}
          <span className="text-gray-700 dark:text-gray-200">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gallery */}
          <ProductImageGallery
            images={product.images.map((i) => i.url)}
            thumbnail={product.thumbnail ?? undefined}
            title={product.title}
          />

          {/* Info */}
          <div className="flex flex-col gap-6">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white leading-tight">
                {product.title}
              </h1>
              {variant?.sku && (
                <p className="mt-1 text-xs text-gray-400">SKU: {variant.sku}</p>
              )}
            </div>

            {price && (
              <p className="text-3xl font-extrabold text-blue-600 dark:text-blue-400">
                {formatPrice(price, currency)}
              </p>
            )}

            {product.description && (
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                {product.description}
              </p>
            )}

            <PdpAddToCart product={product} />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-16">
          <ProductTabs product={product} />
        </div>
      </div>

      <StickyBuyBar product={product} />
    </main>
  )
}
