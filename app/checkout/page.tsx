'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import { useCart } from '@/lib/commerce/cart-context'
import { StripePaymentForm } from './stripe-payment-form'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '')

const MEDUSA_URL = process.env.NEXT_PUBLIC_MEDUSA_BACKEND_URL ?? ''
const MEDUSA_KEY = process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY ?? ''

type Step = 'address' | 'shipping' | 'payment'

interface ShippingOption {
  id: string
  name: string
  amount: number
  currency_code: string
}

async function medusaStore<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${MEDUSA_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      'x-publishable-api-key': MEDUSA_KEY,
      ...(options.headers ?? {}),
    },
  })
  if (!res.ok) throw new Error(`Medusa ${res.status}: ${await res.text()}`)
  return res.json() as Promise<T>
}

export default function CheckoutPage() {
  const router = useRouter()
  const { cart, clearCart } = useCart()
  const [step, setStep] = useState<Step>('address')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([])
  const [selectedShipping, setSelectedShipping] = useState<string | null>(null)
  const [clientSecret, setClientSecret] = useState<string | null>(null)

  const [address, setAddress] = useState({
    email: '',
    first_name: '',
    last_name: '',
    address_1: '',
    address_2: '',
    city: '',
    province: '',
    postal_code: '',
    country_code: 'us',
    phone: '',
  })

  const cartId = cart?.id

  useEffect(() => {
    if (!cartId) router.push('/cart')
  }, [cartId, router])

  async function handleAddressSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!cartId) return
    setLoading(true)
    setError(null)
    try {
      await medusaStore(`/store/carts/${cartId}`, {
        method: 'POST',
        body: JSON.stringify({
          email: address.email,
          shipping_address: {
            first_name: address.first_name,
            last_name: address.last_name,
            address_1: address.address_1,
            address_2: address.address_2 || undefined,
            city: address.city,
            province: address.province || undefined,
            postal_code: address.postal_code,
            country_code: address.country_code,
            phone: address.phone || undefined,
          },
        }),
      })
      const data = await medusaStore<{ shipping_options: ShippingOption[] }>(
        `/store/shipping-options?cart_id=${cartId}`
      )
      setShippingOptions(data.shipping_options ?? [])
      setStep('shipping')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Address update failed')
    } finally {
      setLoading(false)
    }
  }

  async function handleShippingSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!cartId || !selectedShipping) return
    setLoading(true)
    setError(null)
    try {
      await medusaStore(`/store/carts/${cartId}/shipping-methods`, {
        method: 'POST',
        body: JSON.stringify({ option_id: selectedShipping }),
      })
      const data = await medusaStore<{
        cart: { payment_sessions: Array<{ provider_id: string; data: { client_secret?: string } }> }
      }>(`/store/carts/${cartId}/payment-sessions`, {
        method: 'POST',
        body: JSON.stringify({ provider_id: 'stripe' }),
      })
      const session = data.cart.payment_sessions?.find((s) => s.provider_id === 'stripe')
      setClientSecret(session?.data?.client_secret ?? null)
      setStep('payment')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Shipping selection failed')
    } finally {
      setLoading(false)
    }
  }

  async function handlePaymentComplete() {
    if (!cartId) return
    try {
      await medusaStore(`/store/carts/${cartId}/payment-session`, {
        method: 'POST',
        body: JSON.stringify({ provider_id: 'stripe' }),
      })
      const data = await medusaStore<{
        type: string
        order?: { id: string; display_id: number }
      }>(`/store/carts/${cartId}/complete`, { method: 'POST' })
      if (data.type === 'order' && data.order) {
        clearCart()
        router.push(`/order/confirmed?id=${data.order.display_id}`)
      } else {
        setError('Order completion failed — please try again')
      }
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Order completion failed')
      throw e // Re-throw so StripePaymentForm can show error state
    }
  }

  const inputCls = 'mt-1'

  return (
    <div className="mx-auto max-w-xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Checkout</h1>

      {/* Step indicator */}
      <div className="mb-8 flex items-center gap-2 text-sm">
        {(['address', 'shipping', 'payment'] as Step[]).map((s, i) => (
          <>
            <span
              key={s}
              className={`capitalize ${
                step === s ? 'font-semibold text-foreground' : 'text-muted-foreground'
              }`}
            >
              {s}
            </span>
            {i < 2 && <span className="text-muted-foreground">/</span>}
          </>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-destructive/10 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* STEP 1: Address */}
      {step === 'address' && (
        <form onSubmit={handleAddressSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" required className={inputCls}
              value={address.email}
              onChange={(e) => setAddress((a) => ({ ...a, email: e.target.value }))} />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label htmlFor="first_name">First name</Label>
              <Input id="first_name" required className={inputCls}
                value={address.first_name}
                onChange={(e) => setAddress((a) => ({ ...a, first_name: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="last_name">Last name</Label>
              <Input id="last_name" required className={inputCls}
                value={address.last_name}
                onChange={(e) => setAddress((a) => ({ ...a, last_name: e.target.value }))} />
            </div>
          </div>
          <div>
            <Label htmlFor="address_1">Address</Label>
            <Input id="address_1" required className={inputCls}
              value={address.address_1}
              onChange={(e) => setAddress((a) => ({ ...a, address_1: e.target.value }))} />
          </div>
          <div>
            <Label htmlFor="address_2">Apt, suite, etc.</Label>
            <Input id="address_2" className={inputCls}
              value={address.address_2}
              onChange={(e) => setAddress((a) => ({ ...a, address_2: e.target.value }))} />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="col-span-1">
              <Label htmlFor="city">City</Label>
              <Input id="city" required className={inputCls}
                value={address.city}
                onChange={(e) => setAddress((a) => ({ ...a, city: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="province">State</Label>
              <Input id="province" className={inputCls}
                value={address.province}
                onChange={(e) => setAddress((a) => ({ ...a, province: e.target.value }))} />
            </div>
            <div>
              <Label htmlFor="postal_code">ZIP</Label>
              <Input id="postal_code" required className={inputCls}
                value={address.postal_code}
                onChange={(e) => setAddress((a) => ({ ...a, postal_code: e.target.value }))} />
            </div>
          </div>
          <div>
            <Label htmlFor="phone">Phone (optional)</Label>
            <Input id="phone" type="tel" className={inputCls}
              value={address.phone}
              onChange={(e) => setAddress((a) => ({ ...a, phone: e.target.value }))} />
          </div>
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Saving…' : 'Continue to shipping'}
          </Button>
        </form>
      )}

      {/* STEP 2: Shipping */}
      {step === 'shipping' && (
        <form onSubmit={handleShippingSubmit} className="space-y-4">
          <h2 className="font-medium">Shipping Method</h2>
          {shippingOptions.length === 0 && (
            <p className="text-sm text-muted-foreground">No shipping options available for this address.</p>
          )}
          {shippingOptions.map((opt) => (
            <label
              key={opt.id}
              className="flex cursor-pointer items-center gap-3 rounded-lg border p-4 transition-colors hover:bg-accent"
            >
              <input
                type="radio" name="shipping" value={opt.id}
                checked={selectedShipping === opt.id}
                onChange={() => setSelectedShipping(opt.id)}
              />
              <div className="flex flex-1 items-center justify-between">
                <span className="font-medium">{opt.name}</span>
                <span className="text-sm">
                  {(opt.amount / 100).toLocaleString('en-US', {
                    style: 'currency',
                    currency: opt.currency_code.toUpperCase(),
                  })}
                </span>
              </div>
            </label>
          ))}
          <Separator />
          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={() => setStep('address')}>Back</Button>
            <Button type="submit" className="flex-1" disabled={loading || !selectedShipping}>
              {loading ? 'Saving…' : 'Continue to payment'}
            </Button>
          </div>
        </form>
      )}

      {/* STEP 3: Payment */}
      {step === 'payment' && (
        <div className="space-y-4">
          <h2 className="font-medium">Payment</h2>
          {clientSecret ? (
            <Elements
              stripe={stripePromise}
              options={{
                clientSecret,
                appearance: { theme: 'stripe' },
              }}
            >
              <StripePaymentForm onComplete={handlePaymentComplete} />
            </Elements>
          ) : (
            <p className="text-sm text-destructive">
              Failed to initialize payment. Please go back and try again.
            </p>
          )}
          <Button variant="outline" onClick={() => setStep('shipping')}>Back</Button>
        </div>
      )}
    </div>
  )
}
