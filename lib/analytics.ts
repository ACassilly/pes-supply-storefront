/**
 * Analytics helpers — GA4 event firing from client components.
 * Server-safe: all functions are no-ops if window is undefined.
 */

declare global {
  interface Window {
    gtag?: (
      command: string,
      eventName: string,
      params?: Record<string, unknown>
    ) => void
    dataLayer?: unknown[]
  }
}

function gtag(...args: Parameters<NonNullable<Window['gtag']>>) {
  if (typeof window === 'undefined' || !window.gtag) return
  window.gtag(...args)
}

// ─── Ecommerce events ─────────────────────────────────────────────────────────

export function trackViewItem(params: {
  itemId: string
  itemName: string
  price?: number
  currency?: string
}) {
  gtag('event', 'view_item', {
    currency: params.currency ?? 'USD',
    value: params.price,
    items: [
      {
        item_id: params.itemId,
        item_name: params.itemName,
        price: params.price,
        quantity: 1,
      },
    ],
  })
}

export function trackAddToCart(params: {
  itemId: string
  itemName: string
  price?: number
  quantity: number
  currency?: string
}) {
  gtag('event', 'add_to_cart', {
    currency: params.currency ?? 'USD',
    value: (params.price ?? 0) * params.quantity,
    items: [
      {
        item_id: params.itemId,
        item_name: params.itemName,
        price: params.price,
        quantity: params.quantity,
      },
    ],
  })
}

export function trackRemoveFromCart(params: {
  itemId: string
  itemName: string
  price?: number
  quantity: number
}) {
  gtag('event', 'remove_from_cart', {
    currency: 'USD',
    value: (params.price ?? 0) * params.quantity,
    items: [{ item_id: params.itemId, item_name: params.itemName, price: params.price, quantity: params.quantity }],
  })
}

export function trackBeginCheckout(cartTotal: number, itemCount: number) {
  gtag('event', 'begin_checkout', { value: cartTotal, currency: 'USD', items: itemCount })
}

export function trackPurchase(params: {
  orderId: string
  total: number
  tax?: number
  shipping?: number
  currency?: string
}) {
  gtag('event', 'purchase', {
    transaction_id: params.orderId,
    value: params.total,
    tax: params.tax ?? 0,
    shipping: params.shipping ?? 0,
    currency: params.currency ?? 'USD',
  })
}

// ─── UX / engagement events ───────────────────────────────────────────────────

export function trackSearch(query: string, resultsCount?: number) {
  gtag('event', 'search', { search_term: query, results: resultsCount })
}

export function trackQuoteRequest(productHandle: string) {
  gtag('event', 'quote_request', { product_handle: productHandle })
}

export function trackChatOpen() {
  gtag('event', 'chat_open', { widget: 'ai_chat' })
}

export function trackNewsletterSignup(email: string) {
  gtag('event', 'newsletter_signup', { method: 'footer_form' })
  void email // don't send PII to GA
}
