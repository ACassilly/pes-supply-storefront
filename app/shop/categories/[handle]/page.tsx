import { Metadata } from 'next'
import { getProducts, getCategoryByHandle } from '@/lib/medusa'
import { categoryMetadata, breadcrumbJsonLd } from '@/lib/seo'
import ProductCard from '@/components/product-card'
import ProductFilters from '@/components/product-filters'

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }): Promise<Metadata> {
  const { handle } = await params
  try {
    const { product_categories } = await getCategoryByHandle(handle)
    if (product_categories[0]) return categoryMetadata(product_categories[0])
  } catch {}
  return { title: handle }
}

export default async function CategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ handle: string }>
  searchParams: Promise<{ limit?: string; offset?: string }>
}) {
  const { handle } = await params
  const { limit = '24', offset = '0' } = await searchParams

  let category = null
  let products: Awaited<ReturnType<typeof getProducts>>['products'] = []

  try {
    const catData = await getCategoryByHandle(handle)
    category = catData.product_categories[0] ?? null
    const prodData = await getProducts({ category_handle: handle, limit: Number(limit), offset: Number(offset) })
    products = prodData.products
  } catch {}

  const crumbsLd = breadcrumbJsonLd([
    { name: 'Home', url: 'https://pes.supply/' },
    { name: 'Shop', url: 'https://pes.supply/shop' },
    { name: 'Categories', url: 'https://pes.supply/shop/categories' },
    { name: category?.name ?? handle, url: `https://pes.supply/shop/categories/${handle}` },
  ])

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(crumbsLd) }} />
      <div className="max-w-7xl mx-auto px-4 py-10">
        <nav className="text-xs text-gray-500 dark:text-gray-400 mb-6">
          <a href="/shop" className="hover:underline">Shop</a> &rsaquo;{' '}
          <a href="/shop/categories" className="hover:underline">Categories</a> &rsaquo;{' '}
          <span className="text-gray-700 dark:text-gray-200">{category?.name ?? handle}</span>
        </nav>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">{category?.name ?? handle}</h1>
        <div className="flex gap-8">
          <aside className="hidden lg:block w-56 shrink-0">
            <ProductFilters />
          </aside>
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="py-20 text-center text-gray-400">
                <p className="text-5xl mb-4">📦</p>
                <p>No products yet in this category.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
