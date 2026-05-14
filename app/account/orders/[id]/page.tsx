'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { formatPrice, formatDate, formatOrderId } from '@/lib/format'
import type { MedusaOrder } from '@/lib/medusa'

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [order, setOrder] = useState<MedusaOrder | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('medusa_token') : null
    if (!token) { router.push('/account?redirect=/account/orders'); return }

    fetch(`/api/account/order/${params.id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((d) => setOrder(d.order))
      .catch(() => setError('Could not load order.'))
      .finally(() => setLoading(false))
  }, [params.id, router])

  if (loading)
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-4 border-blue-500 border-t-transparent" />
      </main>
    )

  if (error || !order)
    return (
      <main className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-600">{error ?? 'Order not found.'}</p>
        <a href="/account/orders" className="text-blue-600 underline text-sm">← Back to orders</a>
      </main>
    )

  const statusColor: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    processing: 'bg-blue-100 text-blue-800',
    shipped: 'bg-indigo-100 text-indigo-800',
    delivered: 'bg-green-100 text-green-800',
    canceled: 'bg-red-100 text-red-800',
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <a href="/account/orders" className="text-sm text-blue-600 dark:text-blue-400 hover:underline">← Back to orders</a>

        <div className="mt-6 bg-white dark:bg-gray-900 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 p-8">
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                Order {formatOrderId(order.display_id)}
              </h1>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Placed {formatDate(order.created_at)}
              </p>
            </div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize ${
                statusColor[order.status] ?? 'bg-gray-100 text-gray-700'
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Items */}
          <section>
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Items</h2>
            <ul className="divide-y divide-gray-100 dark:divide-gray-800">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4 py-4">
                  {item.thumbnail && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={item.thumbnail} alt={item.title} className="h-16 w-16 object-contain rounded-lg border border-gray-100 dark:border-gray-800" />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white truncate">{item.title}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {formatPrice(item.unit_price * item.quantity, order.currency_code)}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* Totals */}
          <section className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
            <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-4">Order Total</h2>
            <div className="text-sm space-y-2 text-gray-700 dark:text-gray-300">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-bold text-gray-900 dark:text-white text-base">
                  {formatPrice(order.total, order.currency_code)}
                </span>
              </div>
            </div>
          </section>

          {/* Shipping address */}
          {order.shipping_address && (
            <section className="mt-8 border-t border-gray-100 dark:border-gray-800 pt-6">
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide mb-2">Ship To</h2>
              <address className="not-italic text-sm text-gray-700 dark:text-gray-300">
                <p>{order.shipping_address.first_name} {order.shipping_address.last_name}</p>
                <p>{order.shipping_address.address_1}</p>
                <p>
                  {order.shipping_address.city},{' '}
                  {order.shipping_address.province}{' '}
                  {order.shipping_address.postal_code}
                </p>
                <p>{order.shipping_address.country_code.toUpperCase()}</p>
              </address>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
