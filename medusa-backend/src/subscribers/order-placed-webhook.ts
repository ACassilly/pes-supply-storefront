import type { SubscriberArgs, SubscriberConfig } from '@medusajs/framework'

const STOREFRONT_URL = process.env.STOREFRONT_URL ?? 'https://pes.supply'
const WEBHOOK_SECRET = process.env.MEDUSA_WEBHOOK_SECRET ?? ''

export default async function orderPlacedSubscriber({
  event: { data },
}: SubscriberArgs<Record<string, unknown>>) {
  try {
    const res = await fetch(`${STOREFRONT_URL}/api/webhooks/medusa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-medusa-webhook-secret': WEBHOOK_SECRET,
      },
      body: JSON.stringify({ event: 'order.placed', data }),
    })
    if (!res.ok) {
      console.error(`[subscriber] order.placed webhook failed: ${res.status}`)
    }
  } catch (e) {
    console.error('[subscriber] order.placed failed:', e)
  }
}

export const config: SubscriberConfig = {
  event: 'order.placed',
}
