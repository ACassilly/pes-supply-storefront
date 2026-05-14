'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { formatPrice } from '@/lib/format'
import { trackAddToCart } from '@/lib/analytics'

interface WishlistItem {
  id: string
  handle: string
  title: string
  thumbnail: string | null
  price: number | null
  currency: string
  variantId: string | null
}

export default function WishlistPage() {
  const [items, setItems] = useState<WishlistItem[]>([])

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('pes_wishlist') ?? '[]')
      setItems(stored)
    } catch {}
  }, [])

  function remove(id: string) {
    const next = items.filter((i) => i.id !== id)
    setItems(next)
    localStorage.setItem('pes_wishlist', JSON.stringify(next))
  }

  function addToCart(item: WishlistItem) {
    if (!item.variantId) return
    const cartId = localStorage.getItem('medusa_cart_id')
    if (!cartId) return
    fetch(`${process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL}/store/carts/${cartId}/line-items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-publishable-api-key': process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? '',
      },
      body: JSON.stringify({ variant_id: item.variantId, quantity: 1 }),
    }).then(() => {
      trackAddToCart({ itemId: item.id, itemName: item.title, price: item.price ?? undefined, quantity: 1, currency: item.currency })
    })
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">My Wishlist</h1>

        {items.length === 0 ? (
          <div className="py-24 text-center">
            <p className="text-5xl mb-4">♥️</p>
            <p className="text-gray-500 dark:text-gray-400">Your wishlist is empty.</p>
            <Link href="/shop" className="mt-4 inline-block text-blue-600 hover:underline text-sm">Browse products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item.id} className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-100 dark:border-gray-800 overflow-hidden">
                {item.thumbnail && (
                  <Link href={`/shop/products/${item.handle}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={item.thumbnail} alt={item.title} className="w-full h-48 object-contain p-4" />
                  </Link>
                )}
                <div className="p-4">
                  <Link href={`/shop/products/${item.handle}`} className="font-semibold text-sm text-gray-900 dark:text-white hover:text-blue-600 line-clamp-2">
                    {item.title}
                  </Link>
                  {item.price && (
                    <p className="mt-1 text-blue-600 dark:text-blue-400 font-bold text-sm">{formatPrice(item.price, item.currency)}</p>
                  )}
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={() => addToCart(item)}
                      disabled={!item.variantId}
                      className="flex-1 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg hover:bg-blue-700 disabled:opacity-40 transition"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => remove(item.id)}
                      className="px-3 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-950 rounded-lg transition"
                      aria-label="Remove"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
