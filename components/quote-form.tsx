"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Trash2, Phone, Mail, MessageCircle, DollarSign, Warehouse, UserCheck, Package, CheckCircle } from "lucide-react"

const INDUSTRIES = [
  "Construction & General Contracting",
  "Electrical Contracting",
  "Solar Installation",
  "HVAC Contracting",
  "Plumbing",
  "Property Management, Residential",
  "Property Management, Commercial",
  "Government / Municipal",
  "Education / Institutional",
  "Healthcare / Hospital",
  "Data Center / IT",
  "Manufacturing",
  "Agriculture",
  "Reseller / Retail / E-commerce",
  "Roofing",
  "Fire & Water Restoration",
  "Landscaping",
  "Non-Profit Organization",
  "Homeowner (Personal Use)",
  "Other",
]

const PRIORITIES = [
  { value: "high", label: "High Priority: Within 24 hours" },
  { value: "medium", label: "Medium Priority: Within 48 hours" },
  { value: "low", label: "Low Priority: Within 72 hours" },
]

interface LineItem {
  id: number
  item: string
  qty: string
  zip: string
}

export function QuoteForm() {
  const [submitted, setSubmitted] = useState(false)
  const [lines, setLines] = useState<LineItem[]>([
    { id: 1, item: "", qty: "", zip: "" },
  ])

  function addLine() {
    setLines((prev) => [
      ...prev,
      { id: Date.now(), item: "", qty: "", zip: "" },
    ])
  }

  function removeLine(id: number) {
    setLines((prev) => (prev.length > 1 ? prev.filter((l) => l.id !== id) : prev))
  }

  function updateLine(id: number, field: keyof Omit<LineItem, "id">, value: string) {
    setLines((prev) =>
      prev.map((l) => (l.id === id ? { ...l, [field]: value } : l))
    )
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="bg-background">
      {/* Header */}
      <section className="border-b border-border bg-foreground py-8 text-background">
        <div className="mx-auto max-w-[1400px] px-4">
          <h1 className="text-2xl font-bold tracking-tight text-balance md:text-3xl">
            Get a Custom Quote for Bulk Orders
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-background/70">
            Provide your business details and list the item name, SKU, MPN, or product URL, with the desired quantity and ZIP code, to receive your preferred rates within 1 business day.
          </p>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1400px] gap-8 px-4 py-8 lg:grid-cols-[1fr_340px]">
        {/* Left -- Form */}
        <div>
          {submitted ? (
            <div className="flex flex-col items-center rounded-lg border border-primary/20 bg-primary/5 px-6 py-16 text-center">
              <CheckCircle className="mb-4 h-12 w-12 text-primary" />
              <h2 className="text-xl font-bold text-foreground">Thanks for contacting us!</h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground">
                {"We'll get back to you within 1 business day with your custom pricing. Check your inbox for a confirmation."}
              </p>
              <Button asChild className="mt-6">
                <Link href="/">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact details */}
              <fieldset className="space-y-4">
                <legend className="text-base font-bold text-foreground">Your Details</legend>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="q-first" className="text-xs font-medium text-foreground">First Name <span className="text-sale">*</span></Label>
                    <Input id="q-first" required placeholder="Alex" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-last" className="text-xs font-medium text-foreground">Last Name <span className="text-sale">*</span></Label>
                    <Input id="q-last" required placeholder="Johnson" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-email" className="text-xs font-medium text-foreground">Email <span className="text-sale">*</span></Label>
                    <Input id="q-email" type="email" required placeholder="alex@company.com" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-phone" className="text-xs font-medium text-foreground">Phone</Label>
                    <Input id="q-phone" type="tel" placeholder="(555) 123-4567" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-biz" className="text-xs font-medium text-foreground">Business Name <span className="text-sale">*</span></Label>
                    <Input id="q-biz" required placeholder="Johnson Electric LLC" className="h-9 text-sm" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="q-industry" className="text-xs font-medium text-foreground">Industry <span className="text-sale">*</span></Label>
                    <select id="q-industry" required className="flex h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-card-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring">
                      <option value="">Select industry...</option>
                      {INDUSTRIES.map((ind) => (
                        <option key={ind} value={ind}>{ind}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="q-priority" className="text-xs font-medium text-foreground">Quote Priority</Label>
                  <select id="q-priority" className="flex h-9 w-full rounded-md border border-input bg-card px-3 text-sm text-card-foreground shadow-sm focus:outline-none focus:ring-1 focus:ring-ring sm:max-w-sm">
                    {PRIORITIES.map((p) => (
                      <option key={p.value} value={p.value}>{p.label}</option>
                    ))}
                  </select>
                  <p className="text-[10px] text-muted-foreground">Requests submitted on weekends or holidays are processed on the next business day.</p>
                </div>
              </fieldset>

              {/* Line items */}
              <fieldset className="space-y-4">
                <legend className="text-base font-bold text-foreground">Items for Your Quote</legend>
                <p className="text-xs text-muted-foreground">
                  Item should be a name, MPN, SKU, or product URL. ZIP code is required to calculate shipping.
                </p>
                <div className="space-y-3">
                  {lines.map((line, idx) => (
                    <div key={line.id} className="flex items-start gap-2">
                      <span className="mt-2.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">{idx + 1}</span>
                      <div className="grid flex-1 gap-2 sm:grid-cols-[1fr_80px_100px]">
                        <Input
                          value={line.item}
                          onChange={(e) => updateLine(line.id, "item", e.target.value)}
                          placeholder="Product name, MPN, SKU, or URL"
                          className="h-9 text-sm"
                          required
                        />
                        <Input
                          value={line.qty}
                          onChange={(e) => updateLine(line.id, "qty", e.target.value)}
                          placeholder="QTY"
                          type="number"
                          min="1"
                          className="h-9 text-sm"
                          required
                        />
                        <Input
                          value={line.zip}
                          onChange={(e) => updateLine(line.id, "zip", e.target.value)}
                          placeholder="ZIP Code"
                          className="h-9 text-sm"
                          required
                        />
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.id)}
                        className="mt-1.5 rounded p-1 text-muted-foreground transition-colors hover:bg-muted hover:text-sale"
                        aria-label="Remove line item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
                <button type="button" onClick={addLine} className="flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
                  <Plus className="h-4 w-4" /> Add more items
                </button>
              </fieldset>

              {/* Additional notes */}
              <div className="space-y-1.5">
                <Label htmlFor="q-notes" className="text-xs font-medium text-foreground">Additional Notes</Label>
                <Textarea id="q-notes" rows={3} placeholder="Delivery timeline, special requirements, job-specific details..." className="text-sm" />
              </div>

              <div className="flex items-center gap-4">
                <Button type="submit" size="lg" className="gap-2">
                  Submit Quote Request
                </Button>
                <p className="text-[10px] text-muted-foreground">
                  {"We're committed to your privacy."}{" "}
                  <Link href="/about" className="underline hover:text-primary">Learn more</Link>
                </p>
              </div>
            </form>
          )}
        </div>

        {/* Right -- Contact sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-4 lg:self-start">
          {/* Call instead */}
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="text-sm font-bold text-card-foreground">Prefer to call us instead?</p>
            <p className="mt-0.5 text-xs text-muted-foreground">Contact your dedicated Account Manager</p>
            <div className="mt-3 space-y-1 text-xs text-muted-foreground">
              <p>Available Monday - Friday</p>
              <p>8:00 AM - 5:00 PM EST</p>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <a href="tel:8888760007" className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2.5 transition-colors hover:bg-muted">
                <Phone className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs font-medium text-card-foreground">Call</p>
                  <p className="text-[10px] text-muted-foreground">(888) 876-0007</p>
                </div>
              </a>
              <a href="mailto:quotes@pes.supply" className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2.5 transition-colors hover:bg-muted">
                <Mail className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs font-medium text-card-foreground">Email</p>
                  <p className="text-[10px] text-muted-foreground">quotes@pes.supply</p>
                </div>
              </a>
              <button className="flex items-center gap-2.5 rounded-md border border-border px-3 py-2.5 text-left transition-colors hover:bg-muted">
                <MessageCircle className="h-4 w-4 text-primary" />
                <div>
                  <p className="text-xs font-medium text-card-foreground">Live Chat</p>
                  <p className="flex items-center gap-1 text-[10px] text-muted-foreground"><span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" /> Online Now</p>
                </div>
              </button>
            </div>
          </div>

          {/* Value props */}
          <div className="rounded-lg border border-border bg-card p-5">
            <p className="mb-3 text-xs font-bold text-card-foreground">
              We offer fast, no-obligation quotes for businesses of all sizes.
            </p>
            <div className="space-y-3">
              {[
                { icon: DollarSign, title: "Trade Pricing", desc: "Volume discounts and project-level pricing on every order." },
                { icon: Warehouse, title: "Managed Fulfillment", desc: "Portlandia Logistics coordinates every shipment from the nearest stocking location." },
                { icon: UserCheck, title: "Dedicated Account Manager", desc: "Your named rep handles quotes, orders, and follow-up." },
                { icon: Package, title: "40,000+ SKUs", desc: "Electrical, solar, HVAC, plumbing, tools, safety, and more." },
              ].map((prop) => (
                <div key={prop.title} className="flex gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <prop.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-card-foreground">{prop.title}</p>
                    <p className="text-[10px] leading-relaxed text-muted-foreground">{prop.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Net-30 teaser */}
          <div className="rounded-lg bg-foreground p-5 text-background">
            <p className="text-sm font-bold">Net-30 Payment Terms</p>
            <p className="mt-1 text-xs leading-relaxed text-background/70">
              Qualified businesses can purchase on terms. Apply for a Pro Account to get started.
            </p>
            <Button asChild size="sm" variant="outline" className="mt-3 border-background/30 bg-transparent text-background hover:border-background hover:bg-background/10">
              <Link href="/pro">Apply for Pro Account</Link>
            </Button>
          </div>
        </aside>
      </div>

      {/* Bottom benefits strip */}
      <section className="border-t border-border bg-muted/40 py-10">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: DollarSign, title: "Professional pricing for every trade", desc: "Custom rates for contractors, installers, and property managers." },
            { icon: Warehouse, title: "Nationwide stocking network", desc: "Portlandia Logistics ships from the nearest location. Parcel to full truckload." },
            { icon: UserCheck, title: "Dedicated account management", desc: "Your named rep handles every quote and every follow-up." },
            { icon: Package, title: "40,000+ SKUs across 10 departments", desc: "Electrical, solar, HVAC, plumbing, tools, safety, EV, generators." },
          ].map((card) => (
            <div key={card.title} className="flex flex-col items-center rounded-lg border border-border bg-card px-4 py-6 text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <card.icon className="h-6 w-6 text-primary" />
              </div>
              <p className="text-sm font-bold text-card-foreground">{card.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
