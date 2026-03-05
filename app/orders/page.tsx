import Link from "next/link"
import { Package, Truck, Clock, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Order History | PES Supply",
  description: "View and track your PES Supply orders. Sign in to access order history, shipping updates, and reorder tools.",
}

const sampleOrders = [
  { id: "PES-2026-00847", date: "Feb 28, 2026", status: "Delivered", statusColor: "text-primary", items: 12, total: "$4,287.50", tracking: "1Z999AA10123456784" },
  { id: "PES-2026-00812", date: "Feb 21, 2026", status: "In Transit", statusColor: "text-accent", items: 5, total: "$1,832.00", tracking: "1Z999AA10123456785" },
  { id: "PES-2026-00798", date: "Feb 14, 2026", status: "Processing", statusColor: "text-amber-600", items: 3, total: "$612.75", tracking: null },
  { id: "PES-2026-00756", date: "Feb 7, 2026", status: "Delivered", statusColor: "text-primary", items: 8, total: "$3,420.00", tracking: "1Z999AA10123456786" },
  { id: "PES-2026-00701", date: "Jan 30, 2026", status: "Delivered", statusColor: "text-primary", items: 22, total: "$8,915.25", tracking: "1Z999AA10123456787" },
]

export default function OrdersPage() {
  return (
    <main>
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-2xl font-bold text-background md:text-3xl">Order History</h1>
          <p className="mt-2 text-sm text-background/60">Track shipments, reorder past purchases, and download invoices.</p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-10">
        {/* Sign-in prompt */}
        <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <p className="text-sm font-semibold text-foreground">Sign in to view your orders</p>
          <p className="mt-1 text-xs text-muted-foreground">Access your full order history, tracking info, and reorder tools.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Button asChild size="sm"><Link href="/account">Sign In <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
            <Button asChild variant="outline" size="sm"><Link href="/pro">Open a Pro Account</Link></Button>
          </div>
        </div>

        {/* Sample orders preview */}
        <h2 className="mb-4 text-lg font-bold text-foreground">Recent Orders (Demo)</h2>
        <div className="flex flex-col gap-3">
          {sampleOrders.map((order) => (
            <div key={order.id} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted">
                  {order.status === "Delivered" ? <Package className="h-5 w-5 text-primary" /> :
                   order.status === "In Transit" ? <Truck className="h-5 w-5 text-accent" /> :
                   <Clock className="h-5 w-5 text-amber-600" />}
                </div>
                <div>
                  <p className="text-sm font-bold text-card-foreground">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.date} &middot; {order.items} items</p>
                  <p className={`mt-0.5 text-xs font-semibold ${order.statusColor}`}>{order.status}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:text-right">
                <p className="text-sm font-bold text-card-foreground">{order.total}</p>
                <div className="flex gap-2">
                  {order.tracking && (
                    <button className="rounded-md border border-border px-3 py-1.5 text-xs font-medium text-card-foreground hover:bg-muted">Track</button>
                  )}
                  <button className="rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10">Reorder</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Help links */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <Link href="/shipping" className="rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-primary/30">
            <Truck className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 text-xs font-semibold text-card-foreground">Shipping Info</p>
          </Link>
          <Link href="/returns" className="rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-primary/30">
            <Package className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 text-xs font-semibold text-card-foreground">Return Policy</p>
          </Link>
          <Link href="/quote" className="rounded-lg border border-border bg-card p-4 text-center transition-colors hover:border-primary/30">
            <Clock className="mx-auto h-5 w-5 text-primary" />
            <p className="mt-2 text-xs font-semibold text-card-foreground">Request a Quote</p>
          </Link>
        </div>
      </div>
    </main>
  )
}
