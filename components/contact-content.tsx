"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Phone, MessageCircle, Mail, ChevronDown, Package, FileText, Truck, RotateCcw, UserPlus, ArrowRightLeft, LogIn, MapPin, Clock, Globe } from "lucide-react"

const quickActions = [
  { label: "Check Order Status", href: "/shipping", icon: Package },
  { label: "View Order Summary", href: "/shipping", icon: FileText },
  { label: "Shipping Policies", href: "/shipping", icon: Truck },
  { label: "Start a Return", href: "/shipping#returns", icon: RotateCcw },
]

const accountActions = [
  { label: "I want to open a new PES Pro Business account", cta: "Sign Up", href: "/pro", icon: UserPlus },
  { label: "I want to join the Power Link Installer Network", cta: "Apply", href: "/powerlink", icon: ArrowRightLeft },
  { label: "I already have an existing PES Pro account", cta: "Sign In", href: "/account", icon: LogIn },
]

const topics = [
  "Returns",
  "Damaged Product",
  "Defective Product",
  "Problem with Order",
  "Tracking Information",
  "Quotation / Pricing",
  "Product Inquiry",
  "Pro Account",
  "Power Link Network",
  "Bulk / Pallet Order",
  "Government / BABA",
  "Other",
]

const faqs = [
  {
    q: "Where is PES Supply located?",
    a: "PES Supply is a division of PES Global, headquartered in Louisville, KY. Our operations team manages orders from here, with product shipping direct from manufacturer DCs and regional stocking partners nationwide.",
  },
  {
    q: "Do you have physical stores or a showroom?",
    a: "We are an online distributor. We do not have a retail storefront. Our Louisville office handles operations, order management, and customer support.",
  },
  {
    q: "Where do you ship to?",
    a: "We ship to all 50 US states. For international orders, PES Global can facilitate export logistics. Contact us for international shipping quotes. Alaska and Hawaii orders may have additional freight charges.",
  },
  {
    q: "What are your business hours?",
    a: "Our team is available Monday through Friday, 8:00 AM to 5:00 PM Eastern. Orders placed by 2:00 PM ET are processed same day. Live chat and email support are monitored during business hours.",
  },
  {
    q: "How do I get trade or volume pricing?",
    a: "Open a free PES Pro account to unlock trade pricing, Net-30 terms, and volume discounts. Bulk orders of 5+ units automatically receive tiered discounts. For pallet quantities, request a custom quote.",
  },
  {
    q: "Can I get a dedicated account manager?",
    a: "Yes. All PES Pro Business accounts with $5,000+ in annual purchases are assigned a dedicated account manager who can handle quotes, custom orders, and job-site scheduling.",
  },
  {
    q: "Do you offer BABA-compliant products?",
    a: "Yes. We carry a curated selection of Build America, Buy America (BABA) compliant products across electrical, solar, and HVAC categories. Filter by BABA on any collection page or contact us for a compliant product list.",
  },
  {
    q: "How do I join the Power Link Installer Network?",
    a: "Visit our Power Link page to apply. Approved installers receive lead referrals, a public profile in our installer directory, co-branded marketing support, and priority access to new product lines.",
  },
]

export function ContactContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [topic, setTopic] = useState("")
  const [hasOrder, setHasOrder] = useState<"yes" | "no" | "">("")
  const [contactBy, setContactBy] = useState<"email" | "phone">("email")
  const [language, setLanguage] = useState<"en" | "es">("en")
  const [submitted, setSubmitted] = useState(false)

  return (
    <main className="bg-background">
      {/* Hero */}
      <section className="bg-foreground py-10 text-background">
        <div className="mx-auto max-w-[1400px] px-4">
          <h1 className="text-center text-3xl font-bold text-balance md:text-4xl">How Can We Help?</h1>
          <p className="mx-auto mt-2 max-w-xl text-center text-sm text-background/70">Bilingual assistance from real people -- not bots, not overseas call centers.</p>

          {/* 3 contact cards */}
          <div className="mx-auto mt-8 grid max-w-3xl gap-4 md:grid-cols-3">
            <a href="tel:8888760007" className="flex flex-col items-center gap-2 rounded-xl border border-background/10 bg-background/5 p-6 transition-colors hover:bg-background/10">
              <Phone className="h-8 w-8 text-primary" />
              <span className="text-lg font-bold">Call</span>
              <span className="text-sm text-background/60">(888) 876-0007</span>
            </a>
            <button className="flex flex-col items-center gap-2 rounded-xl border border-background/10 bg-background/5 p-6 transition-colors hover:bg-background/10">
              <MessageCircle className="h-8 w-8 text-primary" />
              <span className="text-lg font-bold">Live Chat</span>
              <span className="flex items-center gap-1 text-sm text-background/60"><span className="inline-block h-2 w-2 rounded-full bg-primary" /> Online Now</span>
            </button>
            <a href="mailto:sales@pes.supply" className="flex flex-col items-center gap-2 rounded-xl border border-background/10 bg-background/5 p-6 transition-colors hover:bg-background/10">
              <Mail className="h-8 w-8 text-primary" />
              <span className="text-lg font-bold">Email</span>
              <span className="text-sm text-background/60">sales@pes.supply</span>
            </a>
          </div>
        </div>
      </section>

      {/* Quick Actions + Account Actions */}
      <section className="border-b border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="grid gap-8 lg:grid-cols-2">
            {/* Quick actions */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-foreground">Quick Actions</h2>
              <div className="grid gap-2 sm:grid-cols-2">
                {quickActions.map((a) => (
                  <Link key={a.label} href={a.href} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary hover:bg-primary/5">
                    <a.icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="text-sm font-medium text-card-foreground">{a.label}</span>
                  </Link>
                ))}
              </div>
            </div>
            {/* Account actions */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-foreground">Account & Pro</h2>
              <div className="flex flex-col gap-2">
                {accountActions.map((a) => (
                  <Link key={a.label} href={a.href} className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-primary hover:bg-primary/5">
                    <a.icon className="h-5 w-5 shrink-0 text-primary" />
                    <span className="flex-1 text-sm text-card-foreground">{a.label}</span>
                    <span className="shrink-0 rounded-md bg-primary px-3 py-1 text-xs font-bold text-primary-foreground">{a.cta}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form + Info sidebar */}
      <section className="py-12">
        <div className="mx-auto max-w-[1400px] px-4">
          <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
            {/* Form */}
            <div>
              <h2 className="text-2xl font-bold text-foreground">Contact Us</h2>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">Our team is here to assist you with any questions, concerns, or inquiries. We strive to provide exceptional support to ensure your experience with PES Supply is seamless.</p>

              {submitted ? (
                <div className="mt-8 rounded-xl border border-primary/20 bg-primary/5 p-8 text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-7 w-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Message Sent</h3>
                  <p className="mt-2 text-sm text-muted-foreground">We typically respond within 2-4 business hours during Monday - Friday, 8 AM - 5 PM ET.</p>
                </div>
              ) : (
                <form className="mt-6 space-y-5" onSubmit={(e) => { e.preventDefault(); setSubmitted(true) }}>
                  {/* Preferred language */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">Preferred Language</label>
                    <div className="flex gap-3">
                      <button type="button" onClick={() => setLanguage("en")} className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${language === "en" ? "border-primary bg-primary/5 font-semibold text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                        <Globe className="h-4 w-4" /> English
                      </button>
                      <button type="button" onClick={() => setLanguage("es")} className={`flex items-center gap-2 rounded-lg border px-4 py-2 text-sm transition-colors ${language === "es" ? "border-primary bg-primary/5 font-semibold text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}>
                        <Globe className="h-4 w-4" /> {"Espa\u00f1ol"}
                      </button>
                    </div>
                  </div>

                  {/* Name row */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-first" className="mb-1.5 block text-xs font-semibold text-foreground">First Name *</label>
                      <input id="c-first" required className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-card-foreground outline-none transition-colors focus:border-primary" />
                    </div>
                    <div>
                      <label htmlFor="c-last" className="mb-1.5 block text-xs font-semibold text-foreground">Last Name *</label>
                      <input id="c-last" required className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-card-foreground outline-none transition-colors focus:border-primary" />
                    </div>
                  </div>

                  {/* Email + Phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-email" className="mb-1.5 block text-xs font-semibold text-foreground">Email *</label>
                      <input id="c-email" type="email" required className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-card-foreground outline-none transition-colors focus:border-primary" />
                    </div>
                    <div>
                      <label htmlFor="c-phone" className="mb-1.5 block text-xs font-semibold text-foreground">Phone</label>
                      <input id="c-phone" type="tel" className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-card-foreground outline-none transition-colors focus:border-primary" />
                    </div>
                  </div>

                  {/* Have an order number? */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">Have an Order Number?</label>
                    <div className="flex gap-3">
                      {(["yes", "no"] as const).map((v) => (
                        <button key={v} type="button" onClick={() => setHasOrder(v)} className={`rounded-lg border px-5 py-2 text-sm capitalize transition-colors ${hasOrder === v ? "border-primary bg-primary/5 font-semibold text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}>{v}</button>
                      ))}
                    </div>
                  </div>
                  {hasOrder === "yes" && (
                    <div>
                      <label htmlFor="c-order" className="mb-1.5 block text-xs font-semibold text-foreground">Order Number</label>
                      <input id="c-order" placeholder="PES-00000" className="w-full rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-card-foreground outline-none transition-colors focus:border-primary" />
                    </div>
                  )}

                  {/* Contact me by */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-foreground">Contact me by</label>
                    <div className="flex gap-3">
                      {(["email", "phone"] as const).map((v) => (
                        <button key={v} type="button" onClick={() => setContactBy(v)} className={`rounded-lg border px-5 py-2 text-sm capitalize transition-colors ${contactBy === v ? "border-primary bg-primary/5 font-semibold text-primary" : "border-border text-muted-foreground hover:border-primary/40"}`}>{v}</button>
                      ))}
                    </div>
                  </div>

                  {/* Topic */}
                  <div>
                    <label htmlFor="c-topic" className="mb-1.5 block text-xs font-semibold text-foreground">Topic *</label>
                    <div className="relative">
                      <select id="c-topic" required value={topic} onChange={(e) => setTopic(e.target.value)} className="w-full appearance-none rounded-lg border border-border bg-card px-3 py-2.5 pr-10 text-sm text-card-foreground outline-none transition-colors focus:border-primary">
                        <option value="">Select a topic...</option>
                        {topics.map((t) => <option key={t} value={t}>{t}</option>)}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="c-message" className="mb-1.5 block text-xs font-semibold text-foreground">Message *</label>
                    <textarea id="c-message" required rows={5} className="w-full resize-none rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-card-foreground outline-none transition-colors focus:border-primary" />
                  </div>

                  {/* Newsletter opt-in */}
                  <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-0.5 h-4 w-4 rounded border-border accent-primary" />
                    <span className="text-xs text-muted-foreground">Keep me up to date on news, exclusive offers, and new product launches</span>
                  </label>

                  <Button type="submit" size="lg" className="w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto">Send Message</Button>
                </form>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Hours */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-card-foreground"><Clock className="h-4 w-4 text-primary" /> Business Hours</h3>
                <p className="mt-2 text-sm text-muted-foreground">Monday - Friday</p>
                <p className="text-sm font-semibold text-card-foreground">8:00 AM - 5:00 PM EST</p>
                <p className="mt-1.5 text-xs text-muted-foreground">Orders placed by 2 PM ET ship same day</p>
              </div>

              {/* Direct contacts */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-card-foreground"><Phone className="h-4 w-4 text-primary" /> Direct Contact</h3>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="text-muted-foreground"><span className="font-semibold text-card-foreground">Phone:</span> (888) 876-0007</p>
                  <p className="text-muted-foreground"><span className="font-semibold text-card-foreground">Email:</span> sales@pes.supply</p>
                  <p className="text-muted-foreground"><span className="font-semibold text-card-foreground">Quotes:</span> quotes@pes.supply</p>
                </div>
              </div>

              {/* Address */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="flex items-center gap-2 text-sm font-bold text-card-foreground"><MapPin className="h-4 w-4 text-primary" /> Operations Center</h3>
                <p className="mt-2 text-sm text-muted-foreground">PES Supply<br />Louisville, KY 40299</p>
                <p className="mt-1.5 text-xs text-muted-foreground">A division of PES Global</p>
              </div>

              {/* Compliance */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="text-sm font-bold text-card-foreground">Supplier & Compliance</h3>
                <p className="mt-2 text-sm text-muted-foreground">For supplier compliance inquiries:</p>
                <a href="mailto:compliance@pes.supply" className="text-sm font-semibold text-primary hover:underline">compliance@pes.supply</a>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-[900px] px-4">
          <h2 className="mb-6 text-center text-2xl font-bold text-foreground">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-border bg-card">
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="flex w-full items-center justify-between px-5 py-4 text-left" aria-expanded={openFaq === i}>
                  <span className="pr-4 text-sm font-semibold text-card-foreground">{faq.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-muted-foreground transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                </button>
                {openFaq === i && (
                  <div className="border-t border-border px-5 py-4">
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
