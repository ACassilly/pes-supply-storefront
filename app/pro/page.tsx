"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Truck, ShieldCheck, CreditCard, Headphones, Award, Globe, CheckCircle2, Loader2, Users, ClipboardList, BarChart3, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"

const benefits = [
  { icon: CreditCard, title: "Net-30 Terms", desc: "Approved trade accounts get 30-day payment terms. No credit card required." },
  { icon: Truck, title: "Same-Day Shipping", desc: "Orders placed by 2 PM ET ship same day from Louisville, KY. Free freight over $999." },
  { icon: Headphones, title: "Named Account Rep", desc: "A dedicated rep who knows your projects, picks up the phone, and sends quotes in hours -- not days." },
  { icon: ShieldCheck, title: "Authorized Distributor", desc: "Full OEM warranties from 169 brands. Factory-direct pricing. No gray market." },
  { icon: Award, title: "Compliance Ready", desc: "BABA compliant, UL listed, NABCEP certified. Procurement-ready documentation on every order." },
  { icon: Globe, title: "Backed by PES Global", desc: "Local service with a global supply chain. Enterprise-grade operations, startup-fast response." },
]

const proFeatures = [
  { icon: BarChart3, title: "Pro Pricing", desc: "Volume-tiered pricing unlocked automatically as your account grows. The more you buy, the better your rate." },
  { icon: ClipboardList, title: "Quick Reorder", desc: "One-click reorder from your purchase history. Save job lists. Paste POs directly into the quick-order pad." },
  { icon: Users, title: "Multi-User Accounts", desc: "Add project managers, foremen, and purchasing agents to your account with custom permissions." },
  { icon: Building2, title: "Job Accounts", desc: "Separate billing and shipping by job site. Track spend per project. Export reports for your accountant." },
]

const testimonials = [
  { quote: "We switched from Rexel to PES for our solar installs. Same brands, better pricing, and our rep actually picks up the phone.", name: "Mike R.", title: "Solar Installer", location: "Nashville, TN", rating: 5 },
  { quote: "The quick-order pad saved us hours. We paste our takeoff sheet and the whole order is built in 30 seconds.", name: "Carlos D.", title: "Electrical Contractor", location: "Atlanta, GA", rating: 5 },
  { quote: "Net-30 terms from day one. No other online distributor did that for us without a year of history.", name: "Sarah K.", title: "Property Manager", location: "Columbus, OH", rating: 5 },
]

interface FormData { company: string; name: string; email: string; phone: string; type: string; need: string }
interface FormErrors { company?: string; name?: string; email?: string }

function validate(d: FormData): FormErrors {
  const e: FormErrors = {}
  if (!d.company.trim()) e.company = "Company name is required"
  if (!d.name.trim()) e.name = "Your name is required"
  if (!d.email.trim()) e.email = "Email is required"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email"
  return e
}

export default function ProPage() {
  const [form, setForm] = useState<FormData>({ company: "", name: "", email: "", phone: "", type: "", need: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [tab, setTab] = useState<"business" | "personal">("business")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1200)
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) setErrors((prev) => { const n = { ...prev }; delete n[field as keyof FormErrors]; return n })
  }

  return (
    <main>
      {/* Hero banner */}
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center md:py-16">
          <span className="rounded-full bg-primary/20 px-4 py-1 text-xs font-semibold text-primary">For Trade Professionals</span>
          <h1 className="max-w-2xl text-balance text-3xl font-bold text-background md:text-4xl">Your Business Deserves Pro Pricing, Pro Terms, and a Pro Team.</h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-background/60">Join the contractors, installers, and property managers who switched to PES for authorized brands, Net-30 terms, same-day shipping, and a named rep who actually picks up the phone.</p>
          <div className="flex gap-3">
            <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#register">Create a Business Account <ArrowRight className="h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:border-background hover:bg-background/10">
              <a href="#quote">Request a Quote</a>
            </Button>
          </div>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-xl font-bold text-foreground md:text-2xl">Why Professionals Choose PES</h2>
          <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground">Everything you need from a distributor -- without the runaround.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-5">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <b.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-card-foreground">{b.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pro features */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-xl font-bold text-foreground md:text-2xl">What You Get With a Pro Account</h2>
          <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground">Tools built for how you actually work.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {proFeatures.map((f) => (
              <div key={f.title} className="flex items-start gap-4 rounded-xl border border-border bg-card p-6">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <f.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-card-foreground">{f.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration section (MaxWarehouse split pattern) */}
      <section id="register" className="scroll-mt-20 border-b border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
            {/* Left: account type selector + benefits */}
            <div className="flex-1">
              <h2 className="mb-1 text-2xl font-bold text-foreground">Register for PES Supply</h2>
              <p className="mb-6 text-sm text-muted-foreground">Choose your account type to get started.</p>

              {/* Tab selector */}
              <div className="mb-6 flex gap-2">
                <button
                  onClick={() => setTab("business")}
                  className={`flex-1 rounded-lg border px-4 py-3 text-left transition-colors ${tab === "business" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"}`}
                >
                  <p className={`text-sm font-bold ${tab === "business" ? "text-primary" : "text-card-foreground"}`}>Business Account</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Trade pricing, Net-30 terms, named rep</p>
                </button>
                <button
                  onClick={() => setTab("personal")}
                  className={`flex-1 rounded-lg border px-4 py-3 text-left transition-colors ${tab === "personal" ? "border-primary bg-primary/5" : "border-border bg-card hover:border-primary/30"}`}
                >
                  <p className={`text-sm font-bold ${tab === "personal" ? "text-primary" : "text-card-foreground"}`}>Personal Account</p>
                  <p className="mt-0.5 text-xs text-muted-foreground">Browse and buy at listed prices</p>
                </button>
              </div>

              {tab === "business" ? (
                <div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    Join our program tailored to professionals like you. Get <strong className="text-foreground">FREE access</strong> to exclusive purchasing features and Pro Pricing.
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {["Volume-tiered pricing that improves as you grow", "Net-30 payment terms from day one", "Named account rep in Louisville, KY", "Quick-order pad -- paste your PO or takeoff sheet", "Multi-user accounts with job-level tracking", "BABA-compliant documentation on every order"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-6 flex items-center gap-4 rounded-lg border border-border bg-card p-4">
                    <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
                      <Image src="/images/team-warehouse.jpg" alt="PES Supply warehouse team in Louisville, KY" fill className="object-cover" sizes="112px" loading="lazy" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Real people. Real warehouse.</p>
                      <p className="mt-0.5 text-xs text-muted-foreground">Our Louisville team picks, packs, and supports every order.</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                    Create a personal account to browse our full catalog, save favorites, track orders, and check out at listed prices. No business verification required.
                  </p>
                  <ul className="flex flex-col gap-2.5">
                    {["Browse 40,000+ products across 10 departments", "Save items to your wishlist", "Track order status and shipping", "Upgrade to Pro anytime for trade pricing"].map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <p className="mt-6 text-xs text-muted-foreground">
                Already have an account? <Link href="/account" className="font-semibold text-primary hover:underline">Sign In</Link>
              </p>
            </div>

            {/* Right: form */}
            <div id="quote" className="w-full scroll-mt-20 rounded-xl border border-border bg-card p-6 lg:w-[420px] lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                  <h3 className="mt-4 text-lg font-bold text-card-foreground">{tab === "business" ? "Application Received" : "Account Created"}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {tab === "business"
                      ? <>Our Louisville team will reach out within 1 business day. Check your email at <strong className="text-card-foreground">{form.email}</strong>.</>
                      : <>You can now browse, save favorites, and track orders. Check your email at <strong className="text-card-foreground">{form.email}</strong>.</>
                    }
                  </p>
                  <Button variant="outline" className="mt-6" onClick={() => { setSubmitted(false); setForm({ company: "", name: "", email: "", phone: "", type: "", need: "" }) }}>Submit Another</Button>
                </div>
              ) : (
                <>
                  <h3 className="mb-1 text-lg font-bold text-card-foreground">
                    {tab === "business" ? "Create a Business Account" : "Create a Personal Account"}
                  </h3>
                  <p className="mb-5 text-xs text-muted-foreground">
                    {tab === "business" ? "Our team responds within one business day." : "Start shopping in seconds."}
                  </p>
                  <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
                    {tab === "business" && (
                      <div>
                        <input type="text" required placeholder="Company Name *" value={form.company} onChange={(e) => handleChange("company", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.company ? "border-destructive" : "border-input focus:border-primary"}`} />
                        {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
                      </div>
                    )}
                    <div>
                      <input type="text" required placeholder="Your Name *" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-destructive" : "border-input focus:border-primary"}`} />
                      {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                    </div>
                    <div>
                      <input type="email" required placeholder="Email Address *" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-destructive" : "border-input focus:border-primary"}`} />
                      {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                    </div>
                    <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                    {tab === "business" && (
                      <>
                        <select value={form.type} onChange={(e) => handleChange("type", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="Business type">
                          <option value="">Business Type</option>
                          <option value="electrical">Electrical Contractor</option>
                          <option value="solar">Solar Installer</option>
                          <option value="hvac">HVAC Contractor</option>
                          <option value="plumbing">Plumber</option>
                          <option value="gc">General Contractor</option>
                          <option value="property">Property Manager</option>
                          <option value="government">Government / Municipal</option>
                          <option value="reseller">Reseller / Distributor</option>
                          <option value="other">Other</option>
                        </select>
                        <select value={form.need} onChange={(e) => handleChange("need", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="What do you need?">
                          <option value="">What are you looking for?</option>
                          <option value="pro">Pro Account (trade pricing + terms)</option>
                          <option value="quote">Project Quote</option>
                          <option value="bulk">Bulk / Pallet Pricing</option>
                          <option value="other">Something Else</option>
                        </select>
                      </>
                    )}
                    <Button type="submit" disabled={submitting} className="mt-1 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      {submitting ? "Submitting..." : tab === "business" ? "Create Business Account" : "Create Account"}
                      {!submitting && <ArrowRight className="h-4 w-4" />}
                    </Button>
                    <p className="text-center text-[10px] text-muted-foreground">
                      By selecting &quot;Create Account&quot; you agree to our{" "}
                      <Link href="/terms" className="text-primary hover:underline">Terms</Link> and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-xl font-bold text-foreground">What Pros Are Saying</h2>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {testimonials.map((t) => (
              <div key={t.name} className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
                <StarRating rating={t.rating} size="md" />
                <p className="mt-4 text-sm leading-relaxed text-card-foreground">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-xs font-semibold text-foreground">- {t.name}, {t.title}</p>
                <p className="text-xs text-muted-foreground">{t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-foreground py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-background md:text-3xl">Ready to get started?</h2>
          <p className="mt-2 text-sm text-background/60">Create your account in 60 seconds. Our team will have you set up within one business day.</p>
          <div className="mt-6 flex justify-center gap-3">
            <Button asChild size="lg" className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
              <a href="#register">Create a Business Account <ArrowRight className="h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:border-background hover:bg-background/10">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
