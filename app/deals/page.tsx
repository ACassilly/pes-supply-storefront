"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Tag, Clock, PackageOpen, ArrowDown, ChevronDown, ChevronUp, AlertTriangle, Percent, Flame, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ProductCard, type ProductCardData } from "@/components/product-card"

const dealCategories = [
  {
    id: "weekly",
    title: "Weekly Deals",
    tagline: "Act Fast, Stock Won't Last!",
    description: "Handpicked items from our warehouse with special pricing. Refreshed every week.",
    icon: Flame,
    color: "bg-sale text-sale-foreground",
    borderColor: "border-sale/30 hover:border-sale",
  },
  {
    id: "open-box",
    title: "Open Box",
    tagline: "Products Like New, Prices Like Never!",
    description: "Customer returns fully inspected and tested. Same product, lower cost.",
    icon: PackageOpen,
    color: "bg-accent text-accent-foreground",
    borderColor: "border-accent/30 hover:border-accent",
  },
  {
    id: "clearance",
    title: "Clearance",
    tagline: "Final Markdown, Unbeatable Prices!",
    description: "Warehouse closeout -- final markdowns on discontinued and overstock items.",
    icon: ArrowDown,
    color: "bg-primary text-primary-foreground",
    borderColor: "border-primary/30 hover:border-primary",
  },
]

const weeklyDeals: ProductCardData[] = [
  { slug: "square-d-200a-main-breaker-panel", name: "Square D 200A Main Breaker Panel", sku: "HOM2040M200PCVP", price: 149.95, originalPrice: 234.0, rating: 4.7, reviews: 567, image: "/images/product-panel.jpg", badge: "Weekly Deal", freeShipping: true, specs: ["200A", "30-Space", "Indoor"] },
  { slug: "milwaukee-m18-fuel-hammer-drill-kit", name: 'Milwaukee M18 FUEL 1/2" Hammer Drill Kit', sku: "2904-22", price: 159.0, originalPrice: 279.0, rating: 4.9, reviews: 1204, image: "/images/product-tools.jpg", badge: "Weekly Deal", freeShipping: true, specs: ["18V", "Brushless", "2-Speed"] },
  { slug: "generac-22kw-standby-generator", name: "Generac 22kW Standby Generator", sku: "7043", price: 4799.0, originalPrice: 5799.0, rating: 4.6, reviews: 128, image: "/images/product-generator.jpg", badge: "Weekly Deal", freeShipping: true, specs: ["22kW", "NG/LP", "Auto Transfer"] },
  { slug: "tesla-wall-connector-gen3", name: "Tesla Wall Connector Gen 3 EV Charger", sku: "1457768", price: 399.0, originalPrice: 530.0, rating: 4.7, reviews: 891, image: "/images/product-ev-charger.jpg", badge: "Weekly Deal", freeShipping: true, specs: ["48A", "Level 2", "WiFi"] },
]

const openBoxDeals: ProductCardData[] = [
  { slug: "mrcool-diy-24k-mini-split", name: "MRCOOL DIY 24K BTU Ductless Mini Split", sku: "DIY-24-HP-WM-230C", price: 1149.0, originalPrice: 1899.0, rating: 4.6, reviews: 893, image: "/images/cat-hvac.jpg", badge: "Open Box", freeShipping: true, specs: ["24K BTU", "20 SEER", "WiFi"] },
  { slug: "sol-ark-15k-hybrid-inverter", name: "Sol-Ark 15K Hybrid Inverter", sku: "SOL-ARK-15K", price: 2995.0, originalPrice: 4595.0, rating: 4.9, reviews: 187, image: "/images/product-inverter.jpg", badge: "Open Box", freeShipping: true, specs: ["15kW", "Hybrid", "200A MPPT"] },
]

const clearanceDeals: ProductCardData[] = [
  { slug: "jinko-580w-bifacial-module", name: "Jinko 580W N-Type Bifacial Module", sku: "JKM580N-72HL4-V", price: 89.99, originalPrice: 174.0, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", badge: "Clearance", freeShipping: true, specs: ["580W", "Bifacial", "Tier 1"] },
  { slug: "sharkbite-push-connect-valve-kit", name: 'SharkBite 1/2" Push-to-Connect Valve Kit', sku: "22222-0000LFA", price: 14.97, originalPrice: 34.99, rating: 4.8, reviews: 2310, image: "/images/cat-plumbing.jpg", badge: "Clearance", freeShipping: false, specs: ['1/2"', "Push-Fit", "Lead-Free"] },
]

const faqData = [
  { q: "What is PES Outlet?", a: "PES Outlet is our deals hub offering deeply discounted products across three categories: Weekly Deals with rotating special pricing, Open Box items that are fully inspected and tested, and Clearance closeouts at final markdown pricing. All items are limited stock." },
  { q: "What types of deals are available?", a: "We offer three tiers: Weekly Deals are handpicked items from our Louisville warehouse with special pricing that refreshes every week. Open Box items are customer returns with opened packaging but fully tested to function like new. Clearance items are final markdowns on discontinued or overstock products." },
  { q: "Are all sales final?", a: "Weekly Deal items follow our standard return policy. Open Box and Clearance items are final sale -- this is how we offer the deepest discounts. If your product arrives damaged due to shipping, contact our team within 30 days and we will resolve it." },
  { q: "What does 'Open Box' mean?", a: "Open Box items are products that have been returned by customers. They may have opened packaging or minor cosmetic wear but are fully inspected and tested by our Louisville warehouse team to ensure they function like new." },
  { q: "Do Open Box items come with a warranty?", a: "Open Box items are guaranteed for full functionality upon delivery. Manufacturer warranty coverage varies by product -- check the product listing for specific warranty details." },
  { q: "How often do Weekly Deals change?", a: "Weekly Deals are refreshed every Monday at 9 AM EST with new selections from our warehouse. Stock is limited and sold on a first-come, first-served basis. Sign up for our newsletter to get notified of new deals." },
  { q: "Can I reserve an item in my cart?", a: "No, placing an item in your cart does not reserve it. Due to limited stock, all outlet items are sold on a first-come, first-served basis. We recommend completing your purchase immediately to secure your item." },
  { q: "Do I get trade pricing on Outlet items?", a: "PES Pro members receive their trade discount on Weekly Deal items. Open Box and Clearance items are already at their lowest price and are not eligible for additional discounts." },
]

export default function DealsPage() {
  const [activeTab, setActiveTab] = useState("weekly")
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  const tabs = [
    { id: "weekly", label: "Weekly Deals", count: weeklyDeals.length, icon: Flame },
    { id: "open-box", label: "Open Box", count: openBoxDeals.length, icon: PackageOpen },
    { id: "clearance", label: "Clearance", count: clearanceDeals.length, icon: ArrowDown },
  ]

  const activeProducts = activeTab === "weekly" ? weeklyDeals : activeTab === "open-box" ? openBoxDeals : clearanceDeals

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden bg-foreground">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -left-20 -top-20 h-80 w-80 rounded-full bg-sale blur-3xl" />
          <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-accent blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-[1400px] px-4 py-10 text-center md:py-14">
          <Badge className="mb-3 bg-sale/20 text-sale">
            <AlertTriangle className="mr-1 h-3 w-3" /> Limited Stock, Massive Savings
          </Badge>
          <h1 className="mx-auto max-w-2xl text-balance text-3xl font-extrabold tracking-tight text-background md:text-4xl lg:text-5xl">
            PES Outlet
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-pretty text-sm text-background/60 md:text-base">
            Extra discounts start at 5% OFF and increase weekly. All items ship from our Louisville, KY warehouse.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <Button asChild className="gap-1.5 bg-sale text-sale-foreground hover:bg-sale/90">
              <Link href="#products">Shop All Deals <ArrowRight className="h-4 w-4" /></Link>
            </Button>
            <Link href="/shipping" className="inline-flex items-center gap-1 text-sm text-background/50 underline-offset-2 hover:text-background/80 hover:underline">
              Shipping Policy
            </Link>
          </div>
        </div>
      </section>

      {/* All sales final notice */}
      <div className="border-b border-sale/20 bg-sale/5 py-2 text-center text-xs font-medium text-sale">
        <AlertTriangle className="mr-1 inline-block h-3 w-3" /> Open Box & Clearance items are final sale. Weekly Deals follow standard return policy.
      </div>

      {/* Category cards */}
      <section className="mx-auto max-w-[1400px] px-4 py-8">
        <div className="grid gap-4 md:grid-cols-3">
          {dealCategories.map((cat) => {
            const Icon = cat.icon
            return (
              <button
                key={cat.id}
                onClick={() => setActiveTab(cat.id)}
                className={`group flex flex-col items-center rounded-xl border-2 p-6 text-center transition-all ${activeTab === cat.id ? cat.borderColor.split(" ")[0].replace("/30", "") + " bg-muted shadow-md" : "border-border bg-card hover:shadow-md " + cat.borderColor}`}
              >
                <span className={`mb-3 inline-flex h-12 w-12 items-center justify-center rounded-xl ${cat.color}`}>
                  <Icon className="h-6 w-6" />
                </span>
                <h3 className="text-lg font-bold text-foreground">{cat.title}</h3>
                <p className="mt-0.5 text-sm font-semibold text-primary">{cat.tagline}</p>
                <p className="mt-2 text-xs text-muted-foreground">{cat.description}</p>
                <span className="mt-3 flex items-center gap-1 text-xs font-semibold text-primary">
                  Shop All <ArrowRight className="h-3 w-3" />
                </span>
              </button>
            )
          })}
        </div>
      </section>

      {/* Product grid with tabs */}
      <section id="products" className="mx-auto max-w-[1400px] px-4 pb-10">
        {/* Tabs */}
        <div className="mb-6 flex items-center gap-1 overflow-x-auto border-b border-border">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-semibold transition-colors ${activeTab === tab.id ? "border-primary text-primary" : "border-transparent text-muted-foreground hover:text-foreground"}`}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                <Badge variant="secondary" className="text-[10px]">{tab.count}</Badge>
              </button>
            )
          })}
        </div>

        {/* Section description */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground">
              {activeTab === "weekly" ? "Weekly Deals" : activeTab === "open-box" ? "Open Box" : "Clearance"}
            </h2>
            <p className="mt-0.5 text-sm text-muted-foreground">
              {activeTab === "weekly" ? "Handpicked items with special pricing -- refreshed every Monday." : activeTab === "open-box" ? "Open box products fully inspected and tested. Same product, lower cost." : "Warehouse closeout -- final markdowns, while supplies last."}
            </p>
          </div>
          <Link href="#" className="hidden items-center gap-1 text-sm font-semibold text-primary hover:underline md:flex">View all items <ArrowRight className="h-3.5 w-3.5" /></Link>
        </div>

        {/* Product grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {activeProducts.map((product) => (
            <ProductCard key={product.slug} product={product} variant="vertical" />
          ))}
        </div>

        {activeProducts.length === 0 && (
          <div className="flex flex-col items-center py-16 text-center">
            <Tag className="mb-3 h-10 w-10 text-muted-foreground/40" />
            <p className="text-lg font-semibold text-foreground">No items in this category right now.</p>
            <p className="mt-1 text-sm text-muted-foreground">Check back soon -- deals refresh weekly.</p>
          </div>
        )}
      </section>

      {/* Value strip */}
      <section className="border-y border-border bg-muted/50">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 px-4 py-8 md:grid-cols-4">
          {[
            { icon: Percent, label: "Up to 50% Off", desc: "Deep discounts across all tiers" },
            { icon: Tag, label: "Refreshed Weekly", desc: "New deals every Monday at 9 AM" },
            { icon: PackageOpen, label: "Inspected & Tested", desc: "Open Box items verified by our team" },
            { icon: Clock, label: "Same-Day Shipping", desc: "Order by 2 PM EST, ships today" },
          ].map((item) => {
            const Icon = item.icon
            return (
              <div key={item.label} className="flex flex-col items-center text-center">
                <span className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <span className="text-sm font-bold text-foreground">{item.label}</span>
                <span className="mt-0.5 text-xs text-muted-foreground">{item.desc}</span>
              </div>
            )
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-[1400px] px-4 py-12">
        <h2 className="mb-2 text-center text-2xl font-bold text-foreground">Clear your doubts about PES Outlet</h2>
        <p className="mb-8 text-center text-sm text-muted-foreground">Everything you need to know about our deals program.</p>
        <div className="mx-auto max-w-3xl">
          {faqData.map((faq, i) => (
            <div key={i} className="border-b border-border">
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="flex w-full items-center justify-between py-4 text-left"
                aria-expanded={openFaq === i}
              >
                <span className="text-sm font-semibold text-foreground">{faq.q}</span>
                {openFaq === i ? <ChevronUp className="h-4 w-4 shrink-0 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 shrink-0 text-muted-foreground" />}
              </button>
              {openFaq === i && (
                <div className="pb-4 pr-8 text-sm leading-relaxed text-muted-foreground">{faq.a}</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-foreground py-10 text-center">
        <h2 className="text-2xl font-bold text-background">Shopping for your business?</h2>
        <p className="mx-auto mt-2 max-w-md text-sm text-background/60">
          PES Pro members get trade pricing on Weekly Deals. Open a Pro Account for exclusive access.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/pro">Open a Pro Account</Link>
          </Button>
          <Button asChild variant="outline" className="border-background/30 bg-transparent text-background hover:border-background hover:bg-background/10">
            <Link href="/quote">Request a Quote</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
