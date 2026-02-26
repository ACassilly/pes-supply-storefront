"use client"

import Link from "next/link"
import { useState } from "react"
import { Truck, Package, ShieldCheck, Clock, MapPin, Phone, Mail, DollarSign, ChevronDown, FileText, XCircle, AlertTriangle, HelpCircle, CheckCircle, MessageCircle, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

/* ── Shipping tiers ── */
const shippingTiers = [
  { method: "Parcel (UPS/FedEx)", transit: "1-5 business days", cost: "Free over $999 / calculated", carrier: "UPS / FedEx Ground", note: "Items under 150 lbs" },
  { method: "LTL Freight", transit: "2-5 business days", cost: "Free over $999 / quoted", carrier: "Portlandia Logistics network", note: "150-10,000 lbs, palletized" },
  { method: "FTL / Dedicated", transit: "1-3 business days", cost: "Project-based pricing", carrier: "Portlandia Logistics (14,000+ carriers)", note: "Full truckloads 10,000+ lbs" },
  { method: "Port & Intermodal", transit: "Varies by origin", cost: "Custom quote", carrier: "Portlandia Logistics", note: "Ocean containers, rail, utility-scale" },
  { method: "Expedited / Hot Shot", transit: "Same-day or next-day", cost: "Custom quote", carrier: "Team drivers / dedicated", note: "Emergency & time-critical deliveries" },
]

/* ── Zone data ── */
const zones = [
  { zone: "Zone 1 -- 1-2 Day Ground", region: "KY, IN, OH, TN, WV, IL", color: "bg-primary", description: "Typical 1-2 business day delivery." },
  { zone: "Zone 2 -- 2-3 Day Ground", region: "GA, AL, MS, MO, IA, WI, MI, PA, VA, NC, SC, AR, KS, NE, MN, NY, NJ, MD, DE, DC, CT", color: "bg-primary/60", description: "Most of the eastern US and Midwest." },
  { zone: "Zone 3 -- 3-5 Day Ground", region: "TX, FL, LA, OK, CO, SD, ND, WY, MT, ME, VT, NH, MA, RI, NM, AZ", color: "bg-primary/30", description: "Gulf states, Plains, Northeast, and Southwest." },
  { zone: "Zone 4 -- 5-7 Day Ground", region: "WA, OR, CA, NV, UT, ID, AK, HI", color: "bg-muted-foreground/20", description: "West Coast and Pacific states." },
]

const stateZones: Record<string, number> = {
  KY:1,IN:1,OH:1,TN:1,WV:1,IL:1,
  GA:2,AL:2,MS:2,MO:2,IA:2,WI:2,MI:2,PA:2,VA:2,NC:2,SC:2,AR:2,KS:2,NE:2,MN:2,NY:2,NJ:2,MD:2,DE:2,DC:2,CT:2,
  TX:3,FL:3,LA:3,OK:3,CO:3,SD:3,ND:3,WY:3,MT:3,ME:3,VT:3,NH:3,MA:3,RI:3,NM:3,AZ:3,
  WA:4,OR:4,CA:4,NV:4,UT:4,ID:4,AK:4,HI:4,
}

const statePositions: Record<string,[number,number]> = {
  WA:[120,75],OR:[95,145],CA:[70,280],NV:[115,240],ID:[155,145],MT:[210,80],WY:[230,170],UT:[175,240],
  CO:[260,250],AZ:[155,330],NM:[225,340],ND:[310,85],SD:[315,140],NE:[330,190],KS:[345,245],OK:[365,295],
  TX:[340,375],MN:[375,100],IA:[385,170],MO:[415,240],AR:[415,305],LA:[420,370],WI:[415,110],IL:[435,200],
  MS:[440,330],IN:[465,205],MI:[475,130],OH:[510,195],KY:[495,245],TN:[490,275],AL:[475,320],GA:[510,320],
  FL:[530,390],SC:[535,300],NC:[555,270],VA:[555,235],WV:[530,220],PA:[555,175],NY:[570,135],NJ:[580,185],
  DE:[575,205],MD:[565,210],CT:[590,160],MA:[600,148],RI:[600,158],VT:[580,110],NH:[590,115],ME:[610,85],
}

function zoneColor(z: number) { return z===1?"fill-primary":z===2?"fill-primary/50":z===3?"fill-primary/25":"fill-muted" }
function zoneTextColor(z: number) { return z<=2?"fill-primary-foreground":"fill-foreground" }

/* ── TOC sections ── */
const tocSections = [
  { id: "free-shipping", label: "Free Shipping", icon: Truck },
  { id: "shipping-costs", label: "Shipping Costs", icon: DollarSign },
  { id: "shipping-types", label: "Shipping Types", icon: Clock },
  { id: "lead-times", label: "Lead Times", icon: Clock },
  { id: "destinations", label: "Destinations", icon: MapPin },
  { id: "receiving", label: "Receiving Guide", icon: FileText },
  { id: "confirmations", label: "Confirmations", icon: FileText },
  { id: "cancellations", label: "Cancellations", icon: XCircle },
  { id: "returns", label: "Returns", icon: Package },
  { id: "damaged", label: "Damaged Products", icon: AlertTriangle },
  { id: "faq", label: "FAQ", icon: HelpCircle },
]

/* ── FAQ ── */
const faqs = [
  { q: "How long does it take for my order to ship?", a: "Most in-stock orders placed before 2:00 PM ET Monday-Friday are processed the same business day. Parcel items (electrical, tools, accessories) typically ship within 1-2 days. Solar panels, inverters, and batteries may take 2-7 days depending on manufacturer availability. Generators and specialty equipment can be 5-14 days. See our Lead Times section above for details by category." },
  { q: "Do you offer free shipping?", a: "Yes. Standard ground shipping is free on qualifying orders of $999 or more within the contiguous United States. Orders under $999 receive a calculated rate at checkout based on weight and destination. Pro Account holders receive reduced freight thresholds -- contact your rep for details." },
  { q: "Can I expedite my order?", a: "Yes. 2-Day and Next-Day air options are available at checkout for most items under 150 lbs. LTL freight shipments (pallets, panels, large equipment) cannot be expedited via air but can be shipped via hot-shot dedicated truck for same-day or next-day delivery. Call (888) 876-0007 for hot-shot quotes." },
  { q: "Do you ship to Alaska, Hawaii, or U.S. territories?", a: "Currently we ship only within the contiguous 48 United States. We do not ship to Alaska, Hawaii, Puerto Rico, Guam, U.S. Virgin Islands, or APO/FPO addresses. International shipments can be arranged through PES Global -- contact sales@pes.supply for a quote." },
  { q: "How are oversized or heavy items shipped?", a: "Items over 150 lbs or exceeding standard parcel dimensions ship via LTL freight carrier. LTL shipments typically arrive in 2-5 business days depending on destination. Liftgate delivery is $75-$125 depending on shipment size. Residential delivery incurs an additional surcharge from the carrier." },
  { q: "What if my order arrives damaged?", a: "Inspect all deliveries upon receipt and note any damage on the BOL before signing. If damage is visible, take photos and refuse the damaged items. Contact us within 48 hours with your order number, signed BOL, and photos. For concealed damage discovered after delivery, notify us within 7 days. We will file a carrier claim and arrange a replacement or refund." },
  { q: "Can I change my shipping address after ordering?", a: "Address changes can be made within 30 minutes of order confirmation, before the order enters the fulfillment queue. After that window the order cannot be redirected. Please verify your address at checkout." },
  { q: "Do you offer local pickup?", a: "Local pickup is available at select stocking partner locations. Check availability at checkout or contact your account rep. This option is great for contractors near a regional hub who need materials the same day." },
  { q: "Am I tax-exempt?", a: "If you hold a valid resale certificate or tax-exempt status, upload your documentation in your Pro Account settings to remove sales tax at checkout. Contact your account rep if you need help setting this up." },
  { q: "Where can I track my order?", a: "Track your order anytime at pes.supply/account/orders. You can also use the tracking number emailed to you after shipment. If you can't find your tracking email, contact us with your order number and we'll resend it." },
  { q: "Do you offer freight or pallet pricing?", a: "Yes. Bulk and pallet orders receive volume-based freight discounts. Pro Account holders receive the best rates. Visit our Bulk Pricing page or contact your account rep for a custom freight quote." },
]

export function ShippingContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-[1400px] items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">Shipping Policy</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="border-b border-border bg-foreground py-10 md:py-14">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="flex items-center gap-3 text-primary">
            <Truck className="h-7 w-7" />
            <span className="text-sm font-bold uppercase tracking-widest">Shipping & Delivery</span>
          </div>
          <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-background md:text-4xl">
            Same-Day Order Processing
          </h1>
          <p className="mt-3 max-w-2xl text-pretty text-base leading-relaxed text-background/60">
            Order by 2 PM ET and it ships today. Free freight on qualified orders over $999. Every shipment fully insured with real-time tracking. Portlandia Logistics coordinates every delivery.
          </p>
        </div>
      </section>

      {/* Quick stats */}
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4">
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

      {/* Jump-link TOC */}
      <section className="border-b border-border bg-muted/30">
        <div className="mx-auto max-w-[1400px] overflow-x-auto px-4 py-3">
          <nav className="flex items-center gap-2 md:justify-center" aria-label="Shipping policy sections">
            {tocSections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <s.icon className="h-3 w-3" />{s.label}
              </a>
            ))}
          </nav>
        </div>
      </section>

      {/* Main content + sidebar */}
      <div className="mx-auto max-w-[1400px] px-4 py-10 md:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">
          {/* Main column */}
          <div className="flex flex-col gap-12">

            {/* Zone map */}
            <section>
              <h2 className="mb-2 text-2xl font-bold text-foreground">Fast & Reliable Shipping Nationwide</h2>
              <p className="mb-6 text-sm text-muted-foreground">Transit times are estimates for UPS/FedEx Ground from the nearest PES stocking or manufacturer location.</p>
              <div className="flex flex-col gap-8 lg:flex-row">
                <div className="relative flex items-center justify-center overflow-hidden rounded-xl border border-border bg-muted/20 p-6 lg:w-3/5">
                  <svg viewBox="0 0 700 440" className="h-full w-full" aria-label="US shipping zone map" role="img">
                    <title>Typical ground transit zones</title>
                    {Object.entries(statePositions).map(([abbr, [x, y]]) => {
                      const zone = stateZones[abbr] || 4
                      return (<g key={abbr}><rect x={x-18} y={y-12} width={36} height={24} rx={4} className={`${zoneColor(zone)} stroke-background`} strokeWidth={1.5} /><text x={x} y={y+4} textAnchor="middle" className={`${zoneTextColor(zone)} text-[10px] font-bold`}>{abbr}</text></g>)
                    })}
                    {/* Port city markers */}
                    {[{x:95,y:310,l:"LA/LB"},{x:350,y:390,l:"Houston"},{x:580,y:170,l:"NY/NJ"}].map((p) => (
                      <g key={p.l}><rect x={p.x-6} y={p.y-6} width={12} height={12} rx={2} fill="hsl(210,80%,50%)" className="stroke-background" strokeWidth={1.5} /><text x={p.x} y={p.y-10} textAnchor="middle" className="fill-foreground text-[7px] font-bold">{p.l}</text></g>
                    ))}
                    {/* Louisville operations HQ */}
                    <circle cx={495} cy={245} r={6} className="fill-accent stroke-background" strokeWidth={2} />
                    <circle cx={495} cy={245} r={12} className="fill-accent/20" />
                    <text x={495} y={230} textAnchor="middle" className="fill-foreground text-[9px] font-bold">Operations HQ</text>
                  </svg>
                </div>
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
                    <p className="text-xs leading-relaxed text-muted-foreground">Transit times vary by product, stocking location, and carrier. Most orders ship directly from manufacturer or regional stocking partners.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* Free Shipping */}
            <section id="free-shipping" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><Truck className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">To Qualify for Free Shipping</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-start gap-2.5 text-sm text-card-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Your order must total <strong>$999 or more</strong> before taxes, fees, or shipping charges.</li>
                  <li className="flex items-start gap-2.5 text-sm text-card-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Free shipping applies to orders weighing <strong>up to 150 pounds</strong> meeting standard parcel dimensions.</li>
                  <li className="flex items-start gap-2.5 text-sm text-card-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />You must be a resident of the <strong>contiguous 48 United States.</strong></li>
                  <li className="flex items-start gap-2.5 text-sm text-card-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><strong>Pro Account holders</strong> receive reduced freight thresholds. <Link href="/pro" className="font-semibold text-primary hover:underline">Open a Pro Account</Link></li>
                </ul>
                <p className="mt-4 rounded-lg bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">Some products may require additional shipping charges due to weight, size, or special handling. You will be charged an additional shipping cost if the service is not covered by our free shipping policy. Surcharges are clearly marked on product pages and at checkout.</p>
              </div>
            </section>

            {/* Shipping Costs */}
            <section id="shipping-costs" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><DollarSign className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Shipping Costs</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <p className="mb-4 text-sm leading-relaxed text-card-foreground">Rates are determined by your service level, order weight, and destination. Shipping charges are non-refundable. Enter your ZIP code at checkout for exact costs.</p>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-2.5 text-left font-semibold text-foreground">Order Total</th><th className="px-4 py-2.5 text-left font-semibold text-foreground">Standard Ground</th><th className="hidden px-4 py-2.5 text-left font-semibold text-foreground md:table-cell">2-Day Air</th></tr></thead>
                    <tbody>
                      <tr className="border-b border-border"><td className="px-4 py-2.5 text-card-foreground">Under $250</td><td className="px-4 py-2.5 text-muted-foreground">Calculated at checkout</td><td className="hidden px-4 py-2.5 text-muted-foreground md:table-cell">Calculated at checkout</td></tr>
                      <tr className="border-b border-border"><td className="px-4 py-2.5 text-card-foreground">$250 - $499</td><td className="px-4 py-2.5 text-muted-foreground">Flat $29.99</td><td className="hidden px-4 py-2.5 text-muted-foreground md:table-cell">Calculated at checkout</td></tr>
                      <tr className="border-b border-border"><td className="px-4 py-2.5 text-card-foreground">$500 - $998</td><td className="px-4 py-2.5 text-muted-foreground">Flat $14.99</td><td className="hidden px-4 py-2.5 text-muted-foreground md:table-cell">Calculated at checkout</td></tr>
                      <tr className="bg-primary/5"><td className="px-4 py-2.5 font-semibold text-primary">$999+</td><td className="px-4 py-2.5 font-semibold text-primary">FREE</td><td className="hidden px-4 py-2.5 text-muted-foreground md:table-cell">Calculated at checkout</td></tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </section>

            {/* Shipping Types */}
            <section id="shipping-types" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><Clock className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Shipping Types</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <p className="mb-4 text-sm text-card-foreground">Portlandia Logistics coordinates every shipment via <strong>UPS, FedEx, and 14,000+ vetted freight carriers</strong>. Insurance and tracking on every shipment.</p>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-2.5 text-left font-semibold text-foreground">Method</th><th className="px-4 py-2.5 text-left font-semibold text-foreground">Transit Time</th><th className="hidden px-4 py-2.5 text-left font-semibold text-foreground md:table-cell">Cost</th><th className="hidden px-4 py-2.5 text-left font-semibold text-foreground lg:table-cell">Carrier</th></tr></thead>
                    <tbody>
                      {shippingTiers.map((t, i) => (
                        <tr key={t.method} className={i < shippingTiers.length - 1 ? "border-b border-border" : ""}>
                          <td className="px-4 py-3 font-medium text-foreground">{t.method}</td>
                          <td className="px-4 py-3 text-muted-foreground">{t.transit}</td>
                          <td className="hidden px-4 py-3 text-muted-foreground md:table-cell">{t.cost}</td>
                          <td className="hidden px-4 py-3 text-muted-foreground lg:table-cell">{t.carrier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 rounded-lg bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">Shipping times are in business days (Monday-Friday, excluding holidays) and begin once the order has been processed and shipped. Handling generally takes 0-1 business days for in-stock items. There is no overnight shipping for LTL freight.</p>
              </div>
            </section>

            {/* Shipping method detail cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2"><Package className="h-5 w-5 text-primary" /><h3 className="text-base font-bold text-card-foreground">Parcel</h3></div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Items under 150 lbs via UPS/FedEx</p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Free on qualifying orders $999+.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Ships from the nearest manufacturer DC or stocking partner.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />1-5 business days depending on zone.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Tracking emailed as soon as label is created.</li>
                </ul>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /><h3 className="text-base font-bold text-card-foreground">LTL Freight</h3></div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">150-10,000 lbs, palletized, shared truck</p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Free freight on qualifying orders over $999.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />2-5 business days, freight class optimized.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Liftgate service: <strong>$75-$125</strong> depending on shipment size.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Best for pallet quantities, battery systems, multi-unit orders.</li>
                </ul>
                <div className="mt-3 rounded-lg bg-accent/10 px-3 py-2">
                  <p className="text-xs text-accent"><strong>Residential delivery?</strong> Expect a carrier surcharge ($75-$150). Commercial addresses and jobsites with dock access get priority routing and lower rates.</p>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2"><Truck className="h-5 w-5 text-primary" /><h3 className="text-base font-bold text-card-foreground">FTL / Dedicated / Hot Shot</h3></div>
                <p className="mb-2 text-xs font-medium text-muted-foreground">Full trucks, port drayage, emergency delivery</p>
                <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />FTL: 10,000+ lbs, direct point-to-point, 1-3 days.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Intermodal rail for long-haul 750+ miles (25% savings).</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Port drayage from LA, NY/NJ, Houston.</li>
                  <li className="flex items-start gap-2"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Hot shot same-day/next-day for emergencies.</li>
                </ul>
              </div>
            </div>

            {/* Lead Times by Category */}
            <section id="lead-times" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><Clock className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Estimated Lead Times by Category</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <p className="mb-4 text-sm text-card-foreground">Processing times vary by product type and manufacturer availability. These are typical lead times after order confirmation:</p>
                <div className="overflow-hidden rounded-lg border border-border">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-border bg-muted/50"><th className="px-4 py-2.5 text-left font-semibold text-foreground">Category</th><th className="px-4 py-2.5 text-left font-semibold text-foreground">Typical Lead Time</th><th className="hidden px-4 py-2.5 text-left font-semibold text-foreground md:table-cell">Notes</th></tr></thead>
                    <tbody>
                      <tr className="border-b border-border"><td className="px-4 py-2.5 text-card-foreground">Electrical, Tools, Safety, Accessories</td><td className="px-4 py-2.5 font-semibold text-primary">1-2 business days</td><td className="hidden px-4 py-2.5 text-muted-foreground md:table-cell">Usually in stock, ships quickly</td></tr>
                      <tr className="border-b border-border"><td className="px-4 py-2.5 text-card-foreground">Solar Panels, Inverters, Batteries</td><td className="px-4 py-2.5 font-semibold text-accent">2-7 business days</td><td className="hidden px-4 py-2.5 text-muted-foreground md:table-cell">Depends on manufacturer availability</td></tr>
                      <tr className="border-b border-border"><td className="px-4 py-2.5 text-card-foreground">Generators, EV Chargers, Specialty</td><td className="px-4 py-2.5 font-semibold text-accent">5-14 business days</td><td className="hidden px-4 py-2.5 text-muted-foreground md:table-cell">Often made-to-order or drop-shipped</td></tr>
                      <tr><td className="px-4 py-2.5 text-card-foreground">Racking & Mounting Systems</td><td className="px-4 py-2.5 font-semibold text-accent">Varies</td><td className="hidden px-4 py-2.5 text-muted-foreground md:table-cell">Confirm lead time with your rep</td></tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 rounded-lg bg-accent/10 px-4 py-3">
                  <p className="text-xs font-medium text-accent"><strong>Solar panel pro tip:</strong> We recommend ordering 2-5% more panels than your design requires to account for possible transit damage. Replacements ship fast, but having spares on site keeps your crew working.</p>
                </div>
                <p className="mt-3 rounded-lg bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">During Q4 (October-December) and end-of-year ITC deadlines, processing and transit times may extend by 2-3 business days.</p>
              </div>
            </section>

            {/* Will Call / Local Pickup */}
            <section className="scroll-mt-24">
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <div className="mb-3 flex items-center gap-2"><MapPin className="h-5 w-5 text-primary" /><h3 className="text-base font-bold text-card-foreground">Will Call / Local Pickup</h3></div>
                <p className="text-sm leading-relaxed text-card-foreground">Local pickup is available at select stocking partner locations. Check availability at checkout or contact your account rep. For contractors near a regional hub, this is the fastest way to get materials on site the same day.</p>
              </div>
            </section>

            {/* Receiving Guide */}
            <section id="receiving" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><FileText className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Freight Receiving Guide</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <p className="mb-4 text-sm leading-relaxed text-card-foreground">LTL and FTL shipments require you to inspect and sign a Bill of Lading (BOL) at delivery. <strong>How you handle the BOL directly affects your ability to file a damage claim.</strong> Follow these steps:</p>
                <div className="flex flex-col gap-4">
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">1. Count every piece against the BOL</p>
                    <p className="text-sm text-muted-foreground">Match the number of pallets, boxes, and loose items to the line items on the BOL. If something is missing, note it on the BOL before signing.</p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">2. Inspect for visible damage</p>
                    <p className="text-sm text-muted-foreground">Look at all sides of every pallet and box. Check for crushed corners, torn shrink wrap, punctured boxes, and water damage. Take photos of everything -- even if it looks fine.</p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">3. Note ALL damage on the BOL</p>
                    <p className="text-sm text-muted-foreground">Write specific notes like &quot;2 boxes crushed on left side&quot; or &quot;pallet wrap torn, panels exposed.&quot; Generic notes like &quot;possible damage&quot; weaken your claim. Be specific.</p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">4. Sign &quot;Subject to Inspection&quot;</p>
                    <p className="text-sm text-muted-foreground">Next to your signature, write &quot;Subject to further inspection&quot; or &quot;STC&quot; (Subject to Count). This preserves your right to file a concealed damage claim after unpacking.</p>
                  </div>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-foreground">5. Keep copies of everything</p>
                    <p className="text-sm text-muted-foreground">Keep your copy of the signed BOL, all photos, and the carrier&apos;s PRO number. You&apos;ll need these if you file a damage claim.</p>
                  </div>
                </div>
                <div className="mt-4 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
                  <p className="text-xs font-medium text-destructive"><strong>Important:</strong> If the BOL is signed clean (no damage notes) and you discover damage later, PES Supply cannot guarantee the carrier will honor the claim. Always note damage before signing.</p>
                </div>
              </div>
            </section>

            {/* Destinations */}
            <section id="destinations" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><MapPin className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Shipping Destinations</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <p className="mb-3 text-sm leading-relaxed text-card-foreground"><strong>We currently ship within the contiguous 48 United States.</strong> The following are not eligible:</p>
                <p className="mb-4 text-sm text-muted-foreground">Alaska, Hawaii, American Samoa, Guam, Marshall Islands, Micronesia, North Mariana Islands, Palau, Puerto Rico, U.S. Virgin Islands, and APO/FPO addresses. We do not recommend using a PO Box as a shipping address.</p>
                <p className="mb-3 text-sm text-card-foreground">Once placed, shipping addresses <strong>cannot be changed</strong> due to state tax regulations. Please verify your address at checkout.</p>
                <div className="rounded-lg border border-accent/20 bg-accent/5 px-4 py-3">
                  <p className="text-xs font-medium text-accent">International Shipping: For orders outside the U.S., contact PES Global at <a href="mailto:sales@pes.supply" className="underline">sales@pes.supply</a> for a custom quote and logistics coordination.</p>
                </div>
                <div className="mt-3 rounded-lg border border-primary/20 bg-primary/5 px-4 py-3">
                  <p className="text-xs font-medium text-primary"><strong>Tax-exempt?</strong> Upload your resale certificate in your Pro Account settings to remove sales tax at checkout. Contact your account rep for help.</p>
                </div>
              </div>
            </section>

            {/* Confirmations */}
            <section id="confirmations" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><FileText className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Shipping & Order Confirmations</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <p className="mb-3 text-sm leading-relaxed text-card-foreground">As soon as your order is placed, you will receive an email confirmation with your order summary. A second email with tracking information and the expected shipping date will be sent once the order ships. Tracking numbers are provided upon availability.</p>
                <p className="mb-3 text-sm leading-relaxed text-card-foreground"><strong>Track your order anytime</strong> at <a href="https://pes.supply/account/orders" className="font-semibold text-primary hover:underline">pes.supply/account/orders</a> or contact us with your order number if you can&apos;t locate your tracking email.</p>
                <p className="text-sm leading-relaxed text-card-foreground">For LTL freight shipments, you will also receive the carrier name, PRO number, and estimated delivery window. Keep the PRO number handy -- you&apos;ll need it to schedule your delivery appointment and reference it on the BOL at receiving.</p>
              </div>
            </section>

            {/* Cancellations */}
            <section id="cancellations" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><XCircle className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Order Cancellations</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <p className="mb-3 text-sm leading-relaxed text-card-foreground">Order cancellations are permitted <strong>within 30 minutes</strong> of receiving your emailed order confirmation. You can cancel through your account dashboard or by calling <a href="tel:8888760007" className="font-semibold text-primary hover:underline">(888) 876-0007</a> during business hours.</p>
                <p className="text-sm text-muted-foreground">After the 30-minute window, orders enter the fulfillment queue and cannot be stopped or redirected. If your order has already shipped, please initiate a return.</p>
              </div>
            </section>

            {/* Freight Returns */}
            <section id="returns" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><Package className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Freight Returns</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <p className="mb-3 text-sm leading-relaxed text-card-foreground">Returning a freight shipment (pallets, panels, large equipment) is not the same as returning a parcel package. Please review these requirements before initiating a freight return:</p>
                <ul className="flex flex-col gap-2.5">
                  <li className="flex items-start gap-2.5 text-sm text-card-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" /><strong>Contact us within 30 days</strong> of delivery to initiate a return.</li>
                  <li className="flex items-start gap-2.5 text-sm text-card-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Items must be in <strong>original, unopened packaging</strong> and in resellable condition.</li>
                  <li className="flex items-start gap-2.5 text-sm text-card-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />Freight returns are subject to a <strong>restocking fee</strong> plus return shipping costs.</li>
                  <li className="flex items-start gap-2.5 text-sm text-card-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />You are responsible for palletizing and shrink-wrapping the return shipment.</li>
                  <li className="flex items-start gap-2.5 text-sm text-card-foreground"><CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-primary" />PES will arrange carrier pickup. <strong>Do not ship returns without an RMA number.</strong></li>
                </ul>
                <p className="mt-4 rounded-lg bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">Installed, modified, or custom-ordered products cannot be returned. Contact your account rep or email <a href="mailto:connect@portlandiaelectric.supply" className="font-medium text-primary hover:underline">connect@portlandiaelectric.supply</a> to start the process.</p>
              </div>
            </section>

            {/* Damaged Products */}
            <section id="damaged" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><AlertTriangle className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Damaged Products</h2>
              </div>
              <div className="rounded-xl border border-border bg-card px-6 py-5">
                <div className="mb-4">
                  <p className="mb-2 text-sm font-semibold text-foreground">If damage is visible at delivery:</p>
                  <ul className="flex flex-col gap-1.5 pl-1">
                    <li className="flex items-start gap-2 text-sm text-card-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Do not accept the damaged items -- refuse delivery.</li>
                    <li className="flex items-start gap-2 text-sm text-card-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Take photographs of the damage and packaging immediately.</li>
                    <li className="flex items-start gap-2 text-sm text-card-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Obtain copies of the carrier paperwork (BOL) if possible.</li>
                    <li className="flex items-start gap-2 text-sm text-card-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Contact us immediately to arrange a replacement or refund.</li>
                  </ul>
                </div>
                <div className="mb-4">
                  <p className="mb-2 text-sm font-semibold text-foreground">If damage is discovered after delivery:</p>
                  <ul className="flex flex-col gap-1.5 pl-1">
                    <li className="flex items-start gap-2 text-sm text-card-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Notify us within <strong>7 days</strong> of receiving the product.</li>
                    <li className="flex items-start gap-2 text-sm text-card-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Take photos of the damage and retain all original packaging.</li>
                    <li className="flex items-start gap-2 text-sm text-card-foreground"><span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />Email <a href="mailto:connect@portlandiaelectric.supply" className="font-medium text-primary hover:underline">connect@portlandiaelectric.supply</a> with your order number, the signed BOL, and photos.</li>
                  </ul>
                </div>
                <p className="rounded-lg bg-muted/50 px-4 py-2.5 text-xs text-muted-foreground">Products that have been installed or altered cannot be submitted for damage claims. If the BOL is not properly noted at time of delivery, PES Supply cannot be held responsible for additional replacement costs.</p>
              </div>
            </section>

            {/* FAQ */}
            <section id="faq" className="scroll-mt-24">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"><HelpCircle className="h-4 w-4 text-primary" /></div>
                <h2 className="text-xl font-bold text-foreground">Frequently Asked Questions</h2>
              </div>
              <div className="flex flex-col gap-2">
                {faqs.map((f, i) => (
                  <div key={i} className="overflow-hidden rounded-xl border border-border bg-card">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-muted/30" aria-expanded={openFaq === i}>
                      <span className="pr-4 text-sm font-semibold text-foreground">{f.q}</span>
                      <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                    </button>
                    {openFaq === i && (
                      <div className="border-t border-border px-5 py-4">
                        <p className="text-sm leading-relaxed text-muted-foreground">{f.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 flex flex-col gap-4">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="mb-1 text-sm font-bold text-foreground">Need Help?</p>
                <p className="mb-4 text-xs text-muted-foreground">Monday - Friday, 8 AM - 5 PM ET</p>
                <div className="flex flex-col gap-2.5">
                  <button className="flex items-center gap-3 rounded-lg border border-border px-3.5 py-2.5 transition-colors hover:bg-muted">
                    <MessageCircle className="h-4 w-4 text-primary" />
                    <div className="text-left"><p className="text-xs font-semibold text-foreground">Live Chat</p><p className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" /> Online Now</p></div>
                  </button>
                  <a href="tel:8888760007" className="flex items-center gap-3 rounded-lg border border-border px-3.5 py-2.5 transition-colors hover:bg-muted">
                    <Phone className="h-4 w-4 text-primary" />
                    <div><p className="text-xs font-semibold text-foreground">Call</p><p className="text-[10px] text-muted-foreground">(888) 876-0007</p></div>
                  </a>
                  <a href="mailto:sales@pes.supply" className="flex items-center gap-3 rounded-lg border border-border px-3.5 py-2.5 transition-colors hover:bg-muted">
                    <Mail className="h-4 w-4 text-primary" />
                    <div><p className="text-xs font-semibold text-foreground">Email</p><p className="text-[10px] text-muted-foreground">sales@pes.supply</p></div>
                  </a>
                </div>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="mb-3 text-sm font-bold text-foreground">Quick Links</p>
                <div className="flex flex-col gap-2">
                  <Link href="/account" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"><FileText className="h-3 w-3" /> Order Summary</Link>
                  <Link href="/account" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"><Truck className="h-3 w-3" /> Track Your Order</Link>
                  <Link href="/quote" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"><FileText className="h-3 w-3" /> Request a Quote</Link>
                  <Link href="/bulk" className="flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-primary"><Package className="h-3 w-3" /> Bulk Pricing</Link>
                </div>
              </div>
              <div className="rounded-xl border border-primary/20 bg-primary/5 p-5">
                <p className="mb-1 text-sm font-bold text-foreground">Pro Account Holders</p>
                <p className="mb-3 text-xs text-muted-foreground">Get reduced freight thresholds, net-30 terms, and a named account rep.</p>
                <Button size="sm" asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90"><Link href="/pro">Open a Pro Account</Link></Button>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Bottom action cards */}
      <section className="border-t border-border bg-muted/30 py-8">
        <div className="mx-auto grid max-w-[1400px] gap-3 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: FileText, title: "Order Summary", desc: "View recent orders and invoices", href: "/account" },
            { icon: Truck, title: "Track Your Order", desc: "Real-time tracking for all shipments", href: "/account" },
            { icon: Package, title: "Shipping Options", desc: "Compare rates and delivery times", href: "#shipping-types" },
            { icon: ArrowRight, title: "Return Instructions", desc: "Start a return or exchange", href: "/shipping" },
          ].map((card) => (
            <Link key={card.title} href={card.href} className="flex items-center gap-4 rounded-xl border border-border bg-card px-5 py-4 transition-colors hover:border-primary/40 hover:bg-muted/40">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10"><card.icon className="h-5 w-5 text-primary" /></div>
              <div><p className="text-sm font-semibold text-foreground">{card.title}</p><p className="text-xs text-muted-foreground">{card.desc}</p></div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
