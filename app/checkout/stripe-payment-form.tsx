'use client'

import { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'

interface StripePaymentFormProps {
  onComplete: () => Promise<void>
}

export function StripePaymentForm({ onComplete }: StripePaymentFormProps) {
  const stripe = useStripe()
  const elements = useElements()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!stripe || !elements) return
    setLoading(true)
    setError(null)

    // Validate the PaymentElement fields first
    const { error: submitError } = await elements.submit()
    if (submitError) {
      setError(submitError.message ?? 'Payment validation failed')
      setLoading(false)
      return
    }

    // Confirm payment with Stripe (handles 3DS, redirects, etc.)
    const { error: confirmError } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    })

    if (confirmError) {
      setError(confirmError.message ?? 'Payment failed')
      setLoading(false)
      return
    }

    // Payment confirmed — complete the Medusa order
    await onComplete()
    setLoading(false)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <PaymentElement
        options={{
          layout: 'tabs',
          paymentMethodOrder: ['card', 'apple_pay', 'google_pay'],
        }}
      />
      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
      <Button type="submit" className="w-full" disabled={loading || !stripe || !elements}>
        {loading ? 'Processing payment…' : 'Place order'}
      </Button>
    </form>
  )
}
