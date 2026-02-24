"use client"

import Image from "next/image"
import { ArrowRight, Truck, ShieldCheck, CreditCard, Headphones, Award, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"

const pillars = [
  { icon: ShieldCheck, title: "Authorized Distributor", desc: "Full OEM warranties from 50+ manufacturers. Factory-direct, always." },
  { icon: Truck, title: "Same-Day Shipping", desc: "Orders by 2 PM ET ship same day. Free freight over $999." },
  { icon: CreditCard, title: "Net-30 & Trade Pricing", desc: "30-day terms and volume-tiered pricing for approved accounts." },
  { icon: Headphones, title: "Named Account Rep", desc: "A real person in Louisville who knows your projects and picks up the phone." },
  { icon: Award, title: "Compliance Ready", desc: "BABA compliant, UL listed, NABCEP certified. Procurement-ready docs." },
  { icon: Globe, title: "Backed by PES Global", desc: "Local service, global supply chain, enterprise-grade operations." },
]

export function ProMembership() {
  return (
    <section className="border-y border-border bg-muted/30" aria-label="Why PES and Pro Account">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          {/* Left: value props */}
          <div className="flex-1">
            <span className="mb-2 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
              Why Contractors Choose PES
            </span>
            <h2 className="mb-2 text-2xl font-bold text-foreground md:text-3xl">
              Not a marketplace. A real distributor.
            </h2>
            <p className="mb-8 max-w-lg text-sm text-muted-foreground leading-relaxed">
              PES Supply is the distribution arm of PES Global -- with a warehouse, a team, and a phone number. We stock it, we ship it, we stand behind it.
            </p>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <p.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Team photo */}
            <div className="mt-8 flex items-center gap-4 rounded-lg bg-card p-4 border border-border">
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image src="/images/team-warehouse.jpg" alt="PES Supply warehouse team in Louisville, KY" fill className="object-cover" sizes="112px" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Real people. Real warehouse. Louisville, KY.</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Our team picks, packs, and supports every order. Call (888) 876-0007 or (502) 790-0600.</p>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className="w-full rounded-xl border border-border bg-card p-6 lg:w-[400px] lg:p-8">
            <h3 className="mb-1 text-lg font-bold text-card-foreground">Open a Pro Account</h3>
            <p className="mb-5 text-xs text-muted-foreground">Takes 2 minutes. Our team responds within one business day.</p>
            <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
              <input type="text" placeholder="Company Name" className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="text" placeholder="Your Name" className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="email" placeholder="Email Address" className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <input type="tel" placeholder="Phone (optional)" className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
              <select className="rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="What do you need?">
                <option value="">What are you looking for?</option>
                <option value="pro">Pro Account (trade pricing + terms)</option>
                <option value="quote">Project Quote</option>
                <option value="bulk">Bulk / Pallet Pricing</option>
                <option value="other">Something Else</option>
              </select>
              <Button type="submit" className="mt-1 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                Submit <ArrowRight className="h-4 w-4" />
              </Button>
              <p className="text-center text-[10px] text-muted-foreground">Response within 1 business day from our Louisville team</p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
