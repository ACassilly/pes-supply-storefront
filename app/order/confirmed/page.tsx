import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function OrderConfirmedPage({
  searchParams,
}: {
  searchParams: { id?: string }
}) {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <div className="mb-6 text-5xl">✅</div>
      <h1 className="mb-3 text-2xl font-semibold">Order confirmed!</h1>
      {searchParams.id && (
        <p className="mb-2 text-muted-foreground">
          Order <span className="font-mono font-medium">#{searchParams.id}</span>
        </p>
      )}
      <p className="mb-8 text-sm text-muted-foreground">
        You’ll receive a confirmation email shortly. Your order is now in our system and will be fulfilled from inventory.
      </p>
      <div className="flex justify-center gap-3">
        <Button asChild><Link href="/products">Continue shopping</Link></Button>
        <Button asChild variant="outline"><Link href="/account/orders">View orders</Link></Button>
      </div>
    </div>
  )
}
