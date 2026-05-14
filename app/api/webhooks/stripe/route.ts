import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-04-30.basil' })
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig = req.headers.get('stripe-signature') ?? ''

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret)
  } catch (err) {
    console.error('[stripe webhook] signature error', err)
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
  }

  try {
    switch (event.type) {
      case 'payment_intent.succeeded': {
        const pi = event.data.object as Stripe.PaymentIntent
        console.log('[stripe] payment_intent.succeeded', pi.id, pi.amount / 100, pi.currency)
        // Medusa handles its own payment confirmation via payment provider plugin.
        // Add custom fulfillment triggers here if needed.
        break
      }
      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent
        console.warn('[stripe] payment_intent.payment_failed', pi.id, pi.last_payment_error?.message)
        break
      }
      case 'charge.dispute.created': {
        const dispute = event.data.object as Stripe.Dispute
        console.warn('[stripe] dispute created', dispute.id, dispute.amount / 100)
        // TODO: flag order in Odoo / send alert
        break
      }
      default:
        break
    }
  } catch (err) {
    console.error('[stripe webhook] handler error', err)
    return NextResponse.json({ error: 'Handler error' }, { status: 500 })
  }

  return NextResponse.json({ received: true })
}

export const config = { api: { bodyParser: false } }
