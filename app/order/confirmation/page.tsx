'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import { formatPrice, formatOrderId } from '@/lib/format'
import { trackPurchase } from '@/lib/analytics'

function ConfirmationContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get('order_id')
  const [order, setOrder] = useState<{
    id: string
    display_id: number
    total: number
    currency_code: string
    email?: string
  } | null>(null)

  useEffect(() => {
    if (!orderId) return
    const token = localStorage.getItem('medusa_token') ?? ''
    fetch(`/api/account/order/${orderId}`, {
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    })
      .then((r) => r.json())
      .then((d) => {
        if (d.order) {
          setOrder(d.order)
          trackPurchase({
            orderId: d.order.id,
            total: d.order.total / 100,
            currency: d.order.currency_code,
          })
          // Clear cart
          localStorage.removeItem('medusa_cart_id')
        }
      })
      .catch(() => {})
  }, [orderId])

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-20">
      <div className="max-w-lg w-full bg-white dark:bg-gray-900 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 p-10 text-center">
        <div className="text-6xl mb-6">✅</div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Order Confirmed!</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Thank you for your order. We’ll send a confirmation email shortly.
        </p>

        {order && (
          <div className="mt-8 bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-left">
            <div className="flex justify-between text-sm">
              <span className="text-gray-500 dark:text-gray-400">Order</span>
              <span className="font-semibold text-gray-900 dark:text-white">{formatOrderId(order.display_id)}</span>
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span className="text-gray-500 dark:text-gray-400">Total</span>
              <span className="font-bold text-blue-600 dark:text-blue-400">
                {formatPrice(order.total, order.currency_code)}
              </span>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <a
            href={order ? `/account/orders/${order.id}` : '/account/orders'}
            className="px-6 py-3 bg-blue-600 text-white text-sm font-semibold rounded-xl hover:bg-blue-700 transition"
          >
            View Order
          </a>
          <a
            href="/shop"
            className="px-6 py-3 border border-gray-200 dark:border-gray-700 text-sm font-semibold rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    </main>
  )
}

export default function OrderConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  )
}
