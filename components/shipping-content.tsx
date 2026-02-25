import Link from "next/link"
import { Truck, Package, ShieldCheck, Clock, MapPin, Phone, Mail, DollarSign } from "lucide-react"

const shippingTiers = [
  { method: "Standard Ground", transit: "1 -- 5 business days", cost: "Calculated at checkout", carrier: "FedEx / UPS" },
  { method: "Expedited (2-Day)", transit: "2 business days", cost: "Calculated at checkout", carrier: "FedEx / UPS" },
  { method: "Next Day Air", transit: "1 business day", cost: "Calculated at checkout", carrier: "FedEx / UPS" },
  { method: "Freight / LTL", transit: "3 -- 10 business days", cost: "Free over $999", carrier: "Trusted freight partners" },
  { method: "Container / Project", transit: "Custom quote", cost: "Project-based pricing", carrier: "PES Logistics" },
]

const zones = [
  { zone: "Zone 1 -- 1-Day Ground", region: "KY, IN, OH, TN, WV, IL", color: "bg-primary", description: "Next-day delivery via UPS/FedEx Ground." },
  { zone: "Zone 2 -- 2-Day Ground", region: "GA, AL, MS, MO, IA, WI, MI, PA, VA, NC, SC, AR, KS, NE, MN, NY, NJ, MD, DE, DC, CT", color: "bg-primary/60", description: "Most of the eastern US and Midwest." },
  { zone: "Zone 3 -- 3-Day Ground", region: "TX, FL, LA, OK, CO, SD, ND, WY, MT, ME, VT, NH, MA, RI, NM, AZ", color: "bg-primary/30", description: "Gulf states, Plains, Northeast, and Southwest." },
  { zone: "Zone 4 -- 4-5 Day Ground", region: "WA, OR, CA, NV, UT, ID, AK, HI", color: "bg-muted-foreground/20", description: "West Coast and Pacific states." },
]

// US state abbreviations mapped to zones (1-4) for the SVG map
const stateZones: Record<string, number> = {
  KY: 1, IN: 1, OH: 1, TN: 1, WV: 1, IL: 1,
  GA: 2, AL: 2, MS: 2, MO: 2, IA: 2, WI: 2, MI: 2, PA: 2, VA: 2, NC: 2, SC: 2, AR: 2, KS: 2, NE: 2, MN: 2, NY: 2, NJ: 2, MD: 2, DE: 2, DC: 2, CT: 2,
  TX: 3, FL: 3, LA: 3, OK: 3, CO: 3, SD: 3, ND: 3, WY: 3, MT: 3, ME: 3, VT: 3, NH: 3, MA: 3, RI: 3, NM: 3, AZ: 3,
  WA: 4, OR: 4, CA: 4, NV: 4, UT: 4, ID: 4, AK: 4, HI: 4,
}

// Approximate center-of-state coordinates on a 960x600 viewBox
const statePositions: Record<string, [number, number]> = {
  WA:[120,75],OR:[95,145],CA:[70,280],NV:[115,240],ID:[155,145],MT:[210,80],WY:[230,170],UT:[175,240],
  CO:[260,250],AZ:[155,330],NM:[225,340],ND:[310,85],SD:[315,140],NE:[330,190],KS:[345,245],OK:[365,295],
  TX:[340,375],MN:[375,100],IA:[385,170],MO:[415,240],AR:[415,305],LA:[420,370],WI:[415,110],IL:[435,200],
  MS:[440,330],IN:[465,205],MI:[475,130],OH:[510,195],KY:[495,245],TN:[490,275],AL:[475,320],GA:[510,320],
  FL:[530,390],SC:[535,300],NC:[555,270],VA:[555,235],WV:[530,220],PA:[555,175],NY:[570,135],NJ:[580,185],
  DE:[575,205],MD:[565,210],CT:[590,160],MA:[600,148],RI:[600,158],VT:[580,110],NH:[590,115],ME:[610,85],
}

function zoneColor(z: number) {
  if (z === 1) return "fill-primary"
  if (z === 2) return "fill-primary/50"
  if (z === 3) return "fill-primary/25"
  return "fill-muted"
}

function zoneTextColor(z: number) {
  if (z === 1) return "fill-primary-foreground"
  if (z === 2) return "fill-primary-foreground"
  return "fill-foreground"
}

export function ShippingContent() {
  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-6xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">Shipping & Delivery</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="border-b border-border bg-foreground py-12 md:py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex items-center gap-3 text-primary">
            <Truck className="h-8 w-8" />
            <span className="text-sm font-bold uppercase tracking-widest">Shipping & Delivery</span>
          </div>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-background md:text-4xl">
            Same-Day Shipping from Louisville, KY
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-background/60">
            Order by 2 PM ET and it ships today. Free freight on orders over $999. Every shipment fully insured with real-time tracking.
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-4">
          {[
            { icon: Clock, label: "Same-Day Dispatch", value: "Order by 2 PM ET" },
            { icon: DollarSign, label: "Free Freight", value: "Orders $999+" },
            { icon: ShieldCheck, label: "Fully Insured", value: "Every Shipment" },
            { icon: Truck, label: "Ground Coverage", value: "1-5 Day Delivery" },
          ].map((stat, idx) => (
            <div key={stat.label} className={`flex flex-col items-center px-4 py-6 ${idx < 3 ? "border-r border-border" : ""} ${idx < 2 ? "border-b border-border md:border-b-0" : ""}`}>
              <stat.icon className="h-6 w-6 text-primary" />
              <span className="mt-2 text-lg font-extrabold text-foreground">{stat.value}</span>
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {/* Zone map */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Ground Delivery Zones</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Transit times are estimates for UPS/FedEx Ground after same-day dispatch from Louisville, KY.
          </p>

          <div className="mt-6 flex flex-col gap-8 lg:flex-row">
            {/* Visual map */}
            <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/20 p-6 lg:w-3/5">
              <svg viewBox="0 0 700 440" className="h-full w-full" aria-label="US shipping zone map from Louisville, KY" role="img">
                <title>Shipping zones from Louisville, KY</title>
                {Object.entries(statePositions).map(([abbr, [x, y]]) => {
                  const zone = stateZones[abbr] || 4
                  return (
                    <g key={abbr}>
                      <rect x={x - 18} y={y - 12} width={36} height={24} rx={4} className={`${zoneColor(zone)} stroke-background`} strokeWidth={1.5} />
                      <text x={x} y={y + 4} textAnchor="middle" className={`${zoneTextColor(zone)} text-[10px] font-bold`}>{abbr}</text>
                    </g>
                  )
                })}
                {/* Louisville marker */}
                <circle cx={495} cy={245} r={6} className="fill-accent stroke-background" strokeWidth={2} />
                <circle cx={495} cy={245} r={12} className="fill-accent/20" />
                <text x={495} y={230} textAnchor="middle" className="fill-foreground text-[9px] font-bold">Louisville</text>
              </svg>
            </div>

            {/* Zone legend */}
            <div className="flex flex-col gap-3 lg:w-2/5">
              {zones.map((z) => (
                <div key={z.zone} className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                  <div className={`mt-1 h-4 w-4 shrink-0 rounded ${z.color}`} />
                  <div>
                    <h3 className="text-sm font-bold text-card-foreground">{z.zone}</h3>
                    <p className="mt-0.5 text-xs text-muted-foreground">{z.region}</p>
                    <p className="mt-0.5 text-[11px] text-muted-foreground">{z.description}</p>
                  </div>
                </div>
              ))}
              <div className="mt-1 flex items-start gap-2 rounded-lg bg-muted/50 p-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Ships from 1507 Portland Ave, Louisville, KY 40203. Transit times may vary during peak seasons.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Shipping methods table */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Shipping Methods & Rates</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Rates are calculated at checkout based on weight, dimensions, and destination. All shipments use PES Supply accounts for logistics and insurance.
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

        {/* Ground / Freight details */}
        <section className="mb-16 grid gap-6 lg:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <Package className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-card-foreground">Ground / Parcel</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Free on orders $999+. Otherwise calculated at checkout.</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> UPS Ground, FedEx Ground, or USPS Priority depending on weight.</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Expedited (2-Day, Next Day) available at checkout.</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Tracking emailed as soon as label is created.</li>
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-card p-6">
            <div className="mb-3 flex items-center gap-2">
              <Truck className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-bold text-card-foreground">Freight / LTL</h2>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Items over 150 lbs or oversized ship via LTL carrier.</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Free freight on most generators, panels, and inverters over $999.</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Liftgate and residential delivery available for additional fee.</li>
              <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" /> Request a freight quote for pallet quantities or job-site delivery.</li>
            </ul>
          </div>
        </section>

        {/* Inspection policy */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Inspecting Shipments Upon Delivery</h2>
          <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              When your order arrives, it is crucial that you thoroughly inspect your shipment. By signing the delivery receipt without noting any damages, you confirm that you received the shipment in good condition. PES Supply cannot be held responsible for damage or missing items not noted on the delivery receipt.
            </p>
            <div className="rounded-xl border border-border bg-muted/30 p-5">
              <h3 className="mb-3 text-sm font-bold text-foreground">If You Receive a Damaged Shipment:</h3>
              <ol className="ml-4 list-decimal space-y-2">
                <li>If delivered by freight truck and you find damage, contact the carrier using the phone number on the carrier{"'"}s bill. Take photos immediately.</li>
                <li>If you accept a visibly damaged package, note on the delivery receipt that you are signing for a damaged package and include a photo.</li>
                <li>After receiving your shipment, carefully count and inspect the contents before acknowledging delivery.</li>
                <li>In case of damage during transit, take photos and note the damage on the Bill of Lading (BOL). If there is significant visible damage, you should reject the delivery.</li>
                <li>Notify PES Supply by email (<a href="mailto:connect@portlandiaelectric.supply" className="font-medium text-primary hover:underline">connect@portlandiaelectric.supply</a>) within 24 hours of delivery, including the signed BOL and supporting photos.</li>
              </ol>
            </div>
            <p className="text-xs text-muted-foreground">
              If the BOL is not properly noted at time of delivery, PES Supply cannot be held responsible for additional replacement costs. All returned items are subject to inspection and approval.
            </p>
          </div>
        </section>

        {/* Contact */}
        <section className="rounded-xl border border-border bg-foreground p-6 text-center md:p-8">
          <MapPin className="mx-auto h-6 w-6 text-primary" />
          <h2 className="mt-2 text-lg font-bold text-background">Need a shipping estimate?</h2>
          <p className="mt-1 text-sm text-background/60">Our Louisville team quotes freight in under an hour. Available Monday -- Friday, 8 AM -- 6 PM ET.</p>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <a href="tel:8888760007" className="flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-primary/90">
              <Phone className="h-4 w-4" /> (888) 876-0007
            </a>
            <a href="mailto:connect@portlandiaelectric.supply" className="flex items-center gap-2 rounded-lg border border-background/20 px-5 py-2.5 text-sm font-medium text-background hover:bg-background/10">
              <Mail className="h-4 w-4" /> Email Us
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
