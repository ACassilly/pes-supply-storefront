import { Truck, Package, ShieldCheck, Clock, MapPin, Phone, Mail } from "lucide-react"

const shippingTiers = [
  { method: "Standard Ground", transit: "7 -- 10 business days", cost: "Calculated at checkout", carrier: "FedEx / UPS" },
  { method: "Expedited Ground", transit: "3 -- 5 business days", cost: "Calculated at checkout", carrier: "FedEx / UPS" },
  { method: "Freight / LTL", transit: "5 -- 14 business days", cost: "Calculated at checkout (Free over $999)", carrier: "Trusted freight partners" },
  { method: "Container / Project", transit: "Custom quote", cost: "Project-based pricing", carrier: "PES Logistics" },
]

const zones = [
  { zone: "Zone 1", region: "KY, IN, OH, TN", ground: "1 -- 3 days", color: "bg-primary" },
  { zone: "Zone 2", region: "IL, MI, WV, VA, NC, GA, AL, MS, MO", ground: "3 -- 5 days", color: "bg-primary/70" },
  { zone: "Zone 3", region: "East Coast, Midwest, South", ground: "5 -- 7 days", color: "bg-primary/50" },
  { zone: "Zone 4", region: "Mountain West, Pacific NW, Southwest", ground: "7 -- 10 days", color: "bg-primary/30" },
]

export function ShippingContent() {
  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-5xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><a href="/" className="hover:text-primary">Home</a></li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">Shipping Policy</li>
        </ol>
      </nav>

      {/* Hero banner */}
      <section className="border-b border-border bg-muted/30 py-12 md:py-16">
        <div className="mx-auto max-w-5xl px-4">
          <div className="flex items-center gap-3 text-primary">
            <Truck className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-widest">Shipping Policy</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Fast, Insured Shipping Nationwide
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted-foreground">
            Every PES Supply order ships insured via FedEx, UPS, or trusted freight carriers. Orders over $999 ship freight-free. Same-day dispatch on orders placed before 2 PM ET.
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-5xl grid-cols-2 md:grid-cols-4">
          {[
            { icon: Truck, label: "Free Freight", value: "Orders $999+" },
            { icon: Clock, label: "Same-Day Dispatch", value: "Order by 2 PM ET" },
            { icon: ShieldCheck, label: "Fully Insured", value: "Every Shipment" },
            { icon: Package, label: "Carriers", value: "FedEx / UPS / LTL" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center border-b border-r border-border px-4 py-6 last:border-r-0 md:border-b-0">
              <stat.icon className="h-6 w-6 text-primary" />
              <span className="mt-2 text-lg font-extrabold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        {/* Shipping tiers table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Shipping Methods & Rates</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Shipping costs are calculated based on weight, dimensions, and destination. All shipments are made using PES Supply shipping accounts for logistics and insurance purposes.
          </p>
          <div className="mt-6 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 font-semibold text-foreground">Method</th>
                  <th className="px-4 py-3 font-semibold text-foreground">Transit Time</th>
                  <th className="hidden px-4 py-3 font-semibold text-foreground md:table-cell">Cost</th>
                  <th className="hidden px-4 py-3 font-semibold text-foreground lg:table-cell">Carrier</th>
                </tr>
              </thead>
              <tbody>
                {shippingTiers.map((tier, i) => (
                  <tr key={tier.method} className={i < shippingTiers.length - 1 ? "border-b border-border" : ""}>
                    <td className="px-4 py-3.5 font-medium text-foreground">{tier.method}</td>
                    <td className="px-4 py-3.5 text-muted-foreground">{tier.transit}</td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground md:table-cell">{tier.cost}</td>
                    <td className="hidden px-4 py-3.5 text-muted-foreground lg:table-cell">{tier.carrier}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Coverage map */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Shipping Coverage Zones</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            PES Supply ships from Louisville, KY to all 50 states. Estimated ground transit times by zone:
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            {/* Map visual */}
            <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/30 p-8">
              <div className="relative h-64 w-full">
                {/* Simplified US map with concentric zones radiating from Louisville */}
                <svg viewBox="0 0 400 250" className="h-full w-full" aria-label="US shipping zone map from Louisville, KY">
                  {/* Zone 4 - farthest */}
                  <ellipse cx="200" cy="130" rx="190" ry="110" className="fill-primary/10 stroke-primary/20" strokeWidth="1" />
                  {/* Zone 3 */}
                  <ellipse cx="220" cy="130" rx="140" ry="85" className="fill-primary/20 stroke-primary/30" strokeWidth="1" />
                  {/* Zone 2 */}
                  <ellipse cx="240" cy="125" rx="90" ry="60" className="fill-primary/35 stroke-primary/40" strokeWidth="1" />
                  {/* Zone 1 */}
                  <ellipse cx="255" cy="120" rx="45" ry="35" className="fill-primary/60 stroke-primary/70" strokeWidth="1.5" />
                  {/* Louisville marker */}
                  <circle cx="255" cy="120" r="4" className="fill-primary" />
                  <circle cx="255" cy="120" r="8" className="fill-primary/30" />
                  <text x="255" y="108" textAnchor="middle" className="fill-foreground text-[9px] font-bold">Louisville, KY</text>
                  {/* Zone labels */}
                  <text x="255" y="145" textAnchor="middle" className="fill-primary text-[8px] font-semibold">Zone 1</text>
                  <text x="290" y="170" textAnchor="middle" className="fill-primary/70 text-[8px] font-semibold">Zone 2</text>
                  <text x="320" y="200" textAnchor="middle" className="fill-primary/50 text-[8px] font-semibold">Zone 3</text>
                  <text x="80" y="230" textAnchor="middle" className="fill-primary/30 text-[8px] font-semibold">Zone 4</text>
                </svg>
              </div>
            </div>
            {/* Zone table */}
            <div className="flex flex-col gap-3">
              {zones.map((z) => (
                <div key={z.zone} className="flex items-center gap-4 rounded-lg border border-border p-4">
                  <div className={`h-4 w-4 shrink-0 rounded-full ${z.color}`} />
                  <div className="flex-1">
                    <span className="text-sm font-bold text-foreground">{z.zone}</span>
                    <p className="text-xs text-muted-foreground">{z.region}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">{z.ground}</span>
                </div>
              ))}
              <div className="mt-2 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  All orders ship from our facility at 1507 Portland Ave, Louisville, KY 40203. Transit times are estimates and may vary during peak seasons or holidays.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Inspection policy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Inspecting Shipments Upon Delivery</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              When your order arrives, it is crucial that you thoroughly inspect your shipment. By signing the delivery receipt without noting any damages or issues, you confirm that you received the shipment in good condition. PES Supply cannot be held responsible for any damage or missing items not noted on the delivery receipt.
            </p>
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <h3 className="mb-3 text-sm font-bold text-foreground">If You Receive a Damaged Shipment:</h3>
              <ol className="ml-4 list-decimal space-y-2">
                <li>If delivered by freight truck and you find damage, contact the carrier using the phone number on the carrier{"'"}s bill. Take photos immediately.</li>
                <li>If you accept a visibly damaged package, note on the delivery receipt that you are signing for a damaged package and include a photo.</li>
                <li>After receiving your shipment, carefully count and inspect the contents before acknowledging delivery.</li>
                <li>In case of damage during transit, take photos and note the damage on the Bill of Lading (BOL). If there is significant visible damage, you should reject the delivery.</li>
                <li>Notify PES Supply by email (<a href="mailto:connect@portlandiaelectric.supply" className="font-medium text-primary hover:underline">connect@portlandiaelectric.supply</a>) within 24 hours of delivery, including the signed BOL and any supporting photos.</li>
              </ol>
            </div>
            <p className="text-xs text-muted-foreground">
              If the BOL is not properly noted at the time of delivery, PES Supply cannot be held responsible for additional costs for replacement materials. All returned items are subject to inspection and approval, and may have a 40% inspection fee.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-border bg-muted/30 p-6 md:p-8">
          <h2 className="text-lg font-bold text-foreground">Questions About Your Shipment?</h2>
          <p className="mt-2 text-sm text-muted-foreground">Our Louisville team is available Monday -- Friday, 8 AM -- 6 PM ET.</p>
          <div className="mt-4 flex flex-wrap gap-4">
            <a href="tel:8888760007" className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">
              <Phone className="h-4 w-4" /> (888) 876-0007
            </a>
            <a href="mailto:connect@portlandiaelectric.supply" className="flex items-center gap-2 rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground">
              <Mail className="h-4 w-4" /> connect@portlandiaelectric.supply
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
