import Image from "next/image"
import { Lock, CreditCard, RotateCcw, Headphones, ShieldCheck, Truck } from "lucide-react"

const signals = [
  {
    icon: Lock,
    title: "Secure Checkout",
    description: "256-bit SSL encryption on every transaction",
  },
  {
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Visa, MC, Amex, ACH, wire & Net-30 terms available",
  },
  {
    icon: RotateCcw,
    title: "30-Day Returns",
    description: "Hassle-free returns on unused, in-box items",
  },
  {
    icon: Headphones,
    title: "Portland-Based Support",
    description: "Real people who know the products, Mon-Fri 7am-5pm PT",
  },
  {
    icon: ShieldCheck,
    title: "Authorized Distributor",
    description: "Full manufacturer warranties on everything we sell",
  },
  {
    icon: Truck,
    title: "Fast Shipping",
    description: "Same-day shipping on in-stock orders placed by 2pm PT",
  },
]

const paymentLogos = [
  { name: "Visa", src: "https://logo.clearbit.com/visa.com" },
  { name: "Mastercard", src: "https://logo.clearbit.com/mastercard.com" },
  { name: "American Express", src: "https://logo.clearbit.com/americanexpress.com" },
  { name: "Discover", src: "https://logo.clearbit.com/discover.com" },
  { name: "PayPal", src: "https://logo.clearbit.com/paypal.com" },
]

export function TrustSignals() {
  return (
    <section
      className="border-y border-border bg-card"
      aria-label="Trust and security"
    >
      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-6">
          {signals.map((s) => (
            <div key={s.title} className="flex flex-col items-center text-center">
              <div className="mb-2.5 flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                <s.icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-xs font-semibold text-foreground">{s.title}</h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground leading-snug">
                {s.description}
              </p>
            </div>
          ))}
        </div>

        {/* Payment & compliance */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 border-t border-border pt-6">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-medium uppercase text-muted-foreground tracking-wider">
              We Accept
            </span>
            {paymentLogos.map((pm) => (
              <div
                key={pm.name}
                className="flex h-8 w-12 items-center justify-center rounded border border-border bg-background p-1"
              >
                <Image
                  src={pm.src}
                  alt={pm.name}
                  width={36}
                  height={24}
                  className="h-5 w-auto object-contain"
                  unoptimized
                />
              </div>
            ))}
            {["ACH", "Wire", "Net-30"].map((m) => (
              <span
                key={m}
                className="rounded border border-border bg-background px-2 py-1.5 text-[10px] font-bold text-foreground/70"
              >
                {m}
              </span>
            ))}
          </div>

          <span className="hidden h-4 w-px bg-border lg:block" />

          <div className="flex items-center gap-3">
            {["Authorized Distributor", "UL Listed Products", "BABA Compliant"].map(
              (badge) => (
                <span
                  key={badge}
                  className="flex items-center gap-1 text-[10px] font-semibold text-primary"
                >
                  <ShieldCheck className="h-3.5 w-3.5" />
                  {badge}
                </span>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
