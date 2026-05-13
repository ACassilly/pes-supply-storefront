import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'

/**
 * Storefront Webhook Subscriber
 * Fires on Medusa events and notifies the Next.js storefront
 * to bust ISR cache and push orders to Odoo.
 *
 * Env vars required on Medusa backend:
 *   STOREFRONT_URL=https://pes.supply
 *   MEDUSA_WEBHOOK_SECRET=<same value as GitHub Secret MEDUSA_WEBHOOK_SECRET>
 */

const STOREFRONT_URL = process.env.STOREFRONT_URL ?? 'https://pes.supply'
const WEBHOOK_SECRET = process.env.MEDUSA_WEBHOOK_SECRET ?? ''

async function notifyStorefront(event: string, data: unknown): Promise<void> {
  try {
    const res = await fetch(`${STOREFRONT_URL}/api/webhooks/medusa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-medusa-webhook-secret': WEBHOOK_SECRET,
      },
      body: JSON.stringify({ event, data }),
    })
    if (!res.ok) {
      console.error(`[subscriber] Storefront webhook failed: ${res.status} ${await res.text()}`)
    } else {
      console.log(`[subscriber] Notified storefront: ${event}`)
    }
  } catch (e) {
    console.error('[subscriber] Failed to reach storefront:', e)
  }
}

// ── product.updated
export default async function productUpdatedSubscriber({
  event: { data },
}: SubscriberArgs<{ id: string; handle?: string }>) {
  await notifyStorefront('product.updated', data)
}

export const config: SubscriberConfig = {
  event: ['product.updated', 'product.created'],
}
