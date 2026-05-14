import { Metadata } from 'next'
import Link from 'next/link'
import { getCategories } from '@/lib/medusa'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  path: '/shop/categories',
  title: 'Product Categories',
  description: 'Shop by category — breakers, wire, panels, conduit, lighting and more.',
})

export default async function CategoriesPage() {
  let categories: Awaited<ReturnType<typeof getCategories>>['product_categories'] = []
  try {
    const data = await getCategories()
    categories = data.product_categories
  } catch {}

  const fallback = [
    { handle: 'circuit-breakers', name: 'Circuit Breakers', description: 'Square D, Eaton, Siemens, GE' },
    { handle: 'wire-cable', name: 'Wire & Cable', description: 'THHN, Romex, MC, armored' },
    { handle: 'panels-load-centers', name: 'Panels & Load Centers', description: '100A–400A residential & commercial' },
    { handle: 'conduit-fittings', name: 'Conduit & Fittings', description: 'EMT, PVC, rigid, liquid-tight' },
    { handle: 'lighting', name: 'Lighting', description: 'LED, fluorescent, exit/emergency' },
    { handle: 'wiring-devices', name: 'Wiring Devices', description: 'Outlets, switches, GFCI, AFCI' },
    { handle: 'tools', name: 'Tools', description: 'Meters, strippers, fish tape' },
    { handle: 'safety', name: 'Safety', description: 'PPE, arc flash, lockout/tagout' },
  ]

  const items = categories.length > 0 ? categories : fallback

  return (
    <main className="min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Shop by Category</h1>
        <p className="text-gray-500 dark:text-gray-400 mb-10">Find exactly what you need.</p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {items.map((cat: { handle: string; name: string; description?: string | null }) => (
            <Link
              key={cat.handle}
              href={`/shop/categories/${cat.handle}`}
              className="group rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:border-blue-400 hover:shadow-md transition"
            >
              <h2 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">{cat.name}</h2>
              {cat.description && (
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-2">{cat.description}</p>
              )}
              <span className="mt-4 inline-block text-xs font-medium text-blue-600 dark:text-blue-400">Browse &rarr;</span>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
