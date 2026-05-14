import type { Metadata } from 'next'
import { getProducts } from '@/lib/medusa'
import { buildMetadata } from '@/lib/seo'
import { trackSearch } from '@/lib/analytics'
import ProductCard from '@/components/product-card'
import ProductFilters from '@/components/product-filters'

export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}): Promise<Metadata> {
  const { q } = await searchParams
  return buildMetadata({
    path: `/search${q ? `?q=${encodeURIComponent(q)}` : ''}`,
    title: q ? `Search results for "${q}"` : 'Search',
    description: q
      ? `Find ${q} at PES Supply — professional electrical distributor.`
      : 'Search all products at PES Supply.',
  })
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; limit?: string; offset?: string }>
}) {
  const { q, limit = '24', offset = '0' } = await searchParams

  let products: Awaited<ReturnType<typeof getProducts>>['products'] = []
  let count = 0

  if (q) {
    try {
      const data = await getProducts({
        q,
        limit: Number(limit),
        offset: Number(offset),
      })
      products = data.products
      count = data.count
    } catch {
      // Medusa not yet connected — show empty state
    }
  }

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {q ? (
              <>
                Results for{' '}
                <span className="text-blue-600 dark:text-blue-400">"{q}"</span>
              </>
            ) : (
              'Search Products'
            )}
          </h1>
          {q && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {count} product{count !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {/* Search bar */}
        <form method="GET" className="mb-8">
          <div className="flex gap-3">
            <input
              type="search"
              name="q"
              defaultValue={q}
              placeholder="Search by product name, part number, brand…"
              className="flex-1 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition"
            >
              Search
            </button>
          </div>
        </form>

        {!q && (
          <div className="py-20 text-center text-gray-500 dark:text-gray-400">
            <p className="text-5xl mb-4">🔍</p>
            <p className="text-lg font-medium">Enter a search term above to find products.</p>
          </div>
        )}

        {q && products.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-5xl mb-4">😕</p>
            <p className="text-lg font-semibold text-gray-900 dark:text-white">
              No results for &ldquo;{q}&rdquo;
            </p>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Try different keywords, or{' '}
              <a href="/contact" className="text-blue-600 underline">contact us</a>{' '}
              for a custom quote.
            </p>
          </div>
        )}

        {products.length > 0 && (
          <div className="flex gap-8">
            <aside className="hidden lg:block w-56 shrink-0">
              <ProductFilters />
            </aside>
            <div className="flex-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
                {products.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
