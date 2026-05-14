import { Metadata } from 'next'
import { getProducts, getCategories } from '@/lib/medusa'
import { buildMetadata } from '@/lib/seo'
import ProductCard from '@/components/product-card'
import ProductFilters from '@/components/product-filters'

export const metadata: Metadata = buildMetadata({
  path: '/shop',
  title: 'Shop All Products',
  description: 'Browse all electrical supplies — breakers, wire, conduit, panels and more at trade pricing.',
})

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; limit?: string; offset?: string; sort?: string }>
}) {
  const { category, limit = '24', offset = '0' } = await searchParams

  let products: Awaited<ReturnType<typeof getProducts>>['products'] = []
  let count = 0

  try {
    const data = await getProducts({
      limit: Number(limit),
      offset: Number(offset),
      category_handle: category,
    })
    products = data.products
    count = data.count
  } catch {
    // Medusa offline — graceful empty state
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">All Products</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{count} products</p>
          </div>
        </div>
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 shrink-0">
            <ProductFilters />
          </aside>
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                <p className="text-5xl mb-4">📦</p>
                <p className="text-lg">Products loading… check back shortly.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
