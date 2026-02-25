"use client"

import { useState } from "react"
import Link from "next/link"
import { Zap, ArrowRight, CheckCircle2, Loader2, MapPin, Users, ShieldCheck, TrendingUp, Wrench, Star, Award, Globe, ChevronDown, Building2, Phone, Mail, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StarRating } from "@/components/star-rating"

/* ---------- data ---------- */

const benefits = [
  { icon: MapPin, title: "Get Found Locally", short: "Appear in the PES Installer Directory when homeowners and property managers search for contractors in your area.", detail: "When a customer searches for an installer on PES Supply, your Power Link profile appears with your service area, specialties, certifications, and reviews. This gives you warm leads from buyers who are already sourcing materials -- the highest-intent traffic in the industry. Your listing links directly to your contact info and website." },
  { icon: TrendingUp, title: "Exclusive Referral Leads", short: "Receive project leads from PES customers who need professional installation for the products they purchase.", detail: "Customers buying solar panels, generators, HVAC systems, and EV chargers often need a qualified installer. When they request installation support at checkout, their project is routed to Power Link installers in their zip code. You get the customer's name, contact info, project details, and product specs -- ready to quote." },
  { icon: ShieldCheck, title: "Verified Pro Badge", short: "Earn a verified installer badge that appears on your profile and in search results -- building trust before first contact.", detail: "Power Link installers go through a verification process: active business license, proof of insurance, and trade certifications (NABCEP for solar, EPA 608 for HVAC, etc.). Once verified, your profile displays the Power Link Verified badge -- a trust signal that moves homeowners past the 'can I trust this person?' barrier." },
  { icon: Wrench, title: "Pro Pricing on Materials", short: "All Power Link members automatically qualify for PES Pro pricing -- trade discounts, Net-30 terms, and a named rep.", detail: "Power Link membership includes everything in a PES Pro Account: volume-tiered trade pricing, Net-30 payment terms, a dedicated account rep, quick-order pad, multi-user accounts, and job-level tracking. Your material costs go down, your margins go up." },
  { icon: Star, title: "Co-Marketing Support", short: "Get featured in PES email campaigns, product pages, and social media as a recommended installer in your region.", detail: "PES actively promotes Power Link installers in our marketing channels. When we send regional email campaigns, run promotions, or feature product categories (solar, generators, EV charging), we include recommended Power Link installers. This is free exposure to our buyer base -- no ad spend required." },
  { icon: Award, title: "Training & Certification", short: "Access manufacturer training, product webinars, and certification programs through PES and our brand partners.", detail: "PES Global partners with brands like Sol-Ark, MRCOOL, Generac, and Jinko to offer installer training and certification programs. Power Link members get priority access to these programs, plus continuing education credits where applicable. Certified installers rank higher in the directory." },
]

const howItWorks = [
  { step: "1", title: "Apply", desc: "Fill out the form below with your business info, service area, and specialties. Takes 2 minutes." },
  { step: "2", title: "Get Verified", desc: "Our team verifies your license, insurance, and certifications within 1-2 business days." },
  { step: "3", title: "Go Live", desc: "Your Power Link profile goes live in the installer directory. Start receiving leads immediately." },
  { step: "4", title: "Grow", desc: "Earn reviews, get featured in PES campaigns, and build your reputation on the platform." },
]

const specialties = [
  "Electrical (Residential)", "Electrical (Commercial)", "Solar Installation", "Battery Storage",
  "EV Charger Installation", "HVAC Installation", "HVAC Service & Repair", "Generator Installation",
  "Plumbing", "Lighting & Controls", "Fire Alarm & Security", "Data / Low Voltage",
  "Roofing (Solar-Ready)", "General Contracting", "Energy Auditing", "Other",
]

const serviceTerritories = [
  "Alabama", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware", "Florida",
  "Georgia", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky", "Louisiana", "Maine",
  "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri", "Montana",
  "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico", "New York", "North Carolina",
  "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
  "South Dakota", "Tennessee", "Texas", "Utah", "Vermont", "Virginia", "Washington",
  "West Virginia", "Wisconsin", "Wyoming",
]

const testimonials = [
  { quote: "We joined Power Link three months ago and have already closed 6 solar install jobs from PES customer referrals. The leads are warm -- they already bought the panels.", name: "Jason T.", title: "Solar Installer", location: "Tampa, FL", rating: 5 },
  { quote: "Being a verified Power Link installer gives us credibility before the first phone call. Customers show up already trusting us.", name: "Maria G.", title: "HVAC Contractor", location: "Louisville, KY", rating: 5 },
  { quote: "The Pro pricing alone covers the time it took to sign up. Add the referral leads and it's a no-brainer for any installer.", name: "Derek W.", title: "Electrical Contractor", location: "Charlotte, NC", rating: 5 },
]

/* ---------- sub components ---------- */

function ExpandableCard({ icon: Icon, title, short, detail }: typeof benefits[number]) {
  const [open, setOpen] = useState(false)
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent/15">
          <Icon className="h-5 w-5 text-accent" />
        </div>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-card-foreground">{title}</h3>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{short}</p>
          <button onClick={() => setOpen(!open)} className="mt-2 flex items-center gap-1 text-xs font-semibold text-accent hover:underline">
            {open ? "Close" : "Read more"}
            <ChevronDown className={`h-3 w-3 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="mt-4 border-t border-border pt-4">
          <p className="text-xs leading-relaxed text-muted-foreground">{detail}</p>
        </div>
      )}
    </div>
  )
}

/* ---------- form ---------- */

interface FormData {
  company: string; contact: string; email: string; phone: string
  license: string; insurance: string; website: string
  specialties: string[]; states: string[]; zipCodes: string
  yearsInBusiness: string; employees: string; about: string
}
interface FormErrors { company?: string; contact?: string; email?: string; phone?: string }

function validate(d: FormData): FormErrors {
  const e: FormErrors = {}
  if (!d.company.trim()) e.company = "Business name is required"
  if (!d.contact.trim()) e.contact = "Contact name is required"
  if (!d.email.trim()) e.email = "Email is required"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email"
  if (!d.phone.trim()) e.phone = "Phone is required for lead routing"
  return e
}

/* ---------- page ---------- */

export default function PowerLinkPage() {
  const [form, setForm] = useState<FormData>({
    company: "", contact: "", email: "", phone: "",
    license: "", insurance: "", website: "",
    specialties: [], states: [], zipCodes: "",
    yearsInBusiness: "", employees: "", about: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) setErrors((prev) => { const n = { ...prev }; delete n[field as keyof FormErrors]; return n })
  }

  function toggleSpecialty(s: string) {
    setForm((prev) => ({
      ...prev,
      specialties: prev.specialties.includes(s)
        ? prev.specialties.filter((x) => x !== s)
        : [...prev.specialties, s],
    }))
  }

  function toggleState(s: string) {
    setForm((prev) => ({
      ...prev,
      states: prev.states.includes(s)
        ? prev.states.filter((x) => x !== s)
        : [...prev.states, s],
    }))
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1500)
  }

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-12 text-center md:py-16">
          <span className="flex items-center gap-1.5 rounded-full bg-accent/20 px-4 py-1 text-xs font-bold text-accent">
            <Zap className="h-3.5 w-3.5" /> Power Link Installer Network
          </span>
          <h1 className="max-w-3xl text-balance text-3xl font-bold text-background md:text-4xl">Get Found. Get Leads. Get Paid.</h1>
          <p className="max-w-xl text-pretty text-sm leading-relaxed text-background/60">
            Join the Power Link Installer Network and connect with homeowners, property managers, and businesses who are already buying electrical, solar, HVAC, and plumbing materials from PES Supply -- and need a pro to install them.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#apply">Apply Now <ArrowRight className="h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:border-background hover:bg-background/10">
              <Link href="/pro">PES Pro Account</Link>
            </Button>
          </div>
          <p className="text-xs text-background/40">Free to join. No subscription fees. No hidden costs.</p>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-xl font-bold text-foreground md:text-2xl">How Power Link Works</h2>
          <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground">Four steps from application to your first referral lead.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((s) => (
              <div key={s.step} className="flex flex-col items-center rounded-xl border border-border bg-card p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-lg font-bold text-accent">{s.step}</div>
                <h3 className="mt-3 text-sm font-bold text-card-foreground">{s.title}</h3>
                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="border-b border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-xl font-bold text-foreground md:text-2xl">Why Installers Join Power Link</h2>
          <p className="mx-auto mb-8 max-w-lg text-center text-sm text-muted-foreground">Everything you need to grow your install business -- without paying for ads.</p>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => <ExpandableCard key={b.title} {...b} />)}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="border-b border-border py-12">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-xl font-bold text-foreground">What Power Link Installers Say</h2>
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

      {/* Application form */}
      <section id="apply" className="scroll-mt-20 border-b border-border bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
            {/* Left: info */}
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" />
                <h2 className="text-2xl font-bold text-foreground">Apply to Power Link</h2>
              </div>
              <p className="mt-2 mb-6 text-sm text-muted-foreground">Tell us about your business and service area. Our team reviews applications within 1-2 business days.</p>

              <ul className="flex flex-col gap-3">
                {[
                  "Free to join -- no subscription or listing fees",
                  "Receive warm leads from PES customers in your area",
                  "Verified Pro badge builds trust before first contact",
                  "Automatic PES Pro pricing on all material purchases",
                  "Featured placement in PES marketing campaigns",
                  "Access to manufacturer training and certification programs",
                  "Grow your reviews and reputation on the platform",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Contact sidebar */}
              <div className="mt-8 rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-bold text-card-foreground">Questions about Power Link?</p>
                <p className="mt-1 text-xs text-muted-foreground">Our installer partnerships team is here to help.</p>
                <div className="mt-4 flex flex-col gap-2.5">
                  <a href="tel:8888760007" className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-primary">
                    <Phone className="h-3.5 w-3.5 text-primary" /> (888) 876-0007
                  </a>
                  <a href="mailto:powerlink@pes.supply" className="flex items-center gap-2.5 text-xs text-muted-foreground hover:text-primary">
                    <Mail className="h-3.5 w-3.5 text-primary" /> powerlink@pes.supply
                  </a>
                  <span className="flex items-center gap-2.5 text-xs text-muted-foreground">
                    <MessageCircle className="h-3.5 w-3.5 text-primary" /> Live Chat -- Mon-Fri 8am-5pm EST
                  </span>
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="w-full rounded-xl border border-border bg-card p-6 lg:w-[480px] lg:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/15">
                    <Zap className="h-7 w-7 text-accent" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-card-foreground">Application Received</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Our installer partnerships team will review your application and respond within 1-2 business days at <strong className="text-card-foreground">{form.email}</strong>.</p>
                  <Button variant="outline" className="mt-6" onClick={() => { setSubmitted(false); setForm({ company: "", contact: "", email: "", phone: "", license: "", insurance: "", website: "", specialties: [], states: [], zipCodes: "", yearsInBusiness: "", employees: "", about: "" }) }}>Submit Another</Button>
                </div>
              ) : (
                <>
                  <h3 className="mb-1 text-lg font-bold text-card-foreground">Installer Application</h3>
                  <p className="mb-5 text-xs text-muted-foreground">All fields marked * are required.</p>
                  <form className="flex flex-col gap-3.5" onSubmit={handleSubmit} noValidate>
                    {/* Business info */}
                    <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Business Information</p>
                    <div>
                      <input type="text" required placeholder="Business Name *" value={form.company} onChange={(e) => handleChange("company", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 ${errors.company ? "border-destructive" : "border-input focus:border-accent"}`} />
                      {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
                    </div>
                    <div>
                      <input type="text" required placeholder="Contact Name *" value={form.contact} onChange={(e) => handleChange("contact", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 ${errors.contact ? "border-destructive" : "border-input focus:border-accent"}`} />
                      {errors.contact && <p className="mt-1 text-xs text-destructive">{errors.contact}</p>}
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <div>
                        <input type="email" required placeholder="Email *" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 ${errors.email ? "border-destructive" : "border-input focus:border-accent"}`} />
                        {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                      </div>
                      <div>
                        <input type="tel" required placeholder="Phone *" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/20 ${errors.phone ? "border-destructive" : "border-input focus:border-accent"}`} />
                        {errors.phone && <p className="mt-1 text-xs text-destructive">{errors.phone}</p>}
                      </div>
                    </div>
                    <input type="text" placeholder="Website (optional)" value={form.website} onChange={(e) => handleChange("website", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <input type="text" placeholder="License # (optional)" value={form.license} onChange={(e) => handleChange("license", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
                      <input type="text" placeholder="Insurance Provider (optional)" value={form.insurance} onChange={(e) => handleChange("insurance", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
                    </div>
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                      <select value={form.yearsInBusiness} onChange={(e) => handleChange("yearsInBusiness", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Years in business">
                        <option value="">Years in Business</option>
                        <option value="1">Less than 1 year</option>
                        <option value="1-3">1-3 years</option>
                        <option value="3-5">3-5 years</option>
                        <option value="5-10">5-10 years</option>
                        <option value="10+">10+ years</option>
                      </select>
                      <select value={form.employees} onChange={(e) => handleChange("employees", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" aria-label="Number of employees">
                        <option value="">Employees</option>
                        <option value="1">Just me</option>
                        <option value="2-5">2-5</option>
                        <option value="6-20">6-20</option>
                        <option value="21-50">21-50</option>
                        <option value="50+">50+</option>
                      </select>
                    </div>

                    {/* Specialties */}
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Specialties (select all that apply)</p>
                    <div className="flex flex-wrap gap-2">
                      {specialties.map((s) => (
                        <button key={s} type="button" onClick={() => toggleSpecialty(s)} className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${form.specialties.includes(s) ? "border-accent bg-accent/10 text-accent" : "border-border bg-background text-muted-foreground hover:border-accent/40"}`}>
                          {s}
                        </button>
                      ))}
                    </div>

                    {/* Service area */}
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Service Area</p>
                    <input type="text" placeholder="Primary ZIP codes (comma separated)" value={form.zipCodes} onChange={(e) => handleChange("zipCodes", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />
                    <details className="rounded-lg border border-input bg-background">
                      <summary className="cursor-pointer px-3 py-2.5 text-sm text-muted-foreground">States served ({form.states.length} selected)</summary>
                      <div className="flex max-h-48 flex-wrap gap-1.5 overflow-y-auto border-t border-input p-3">
                        {serviceTerritories.map((st) => (
                          <button key={st} type="button" onClick={() => toggleState(st)} className={`rounded-md border px-2 py-1 text-[10px] font-medium transition-colors ${form.states.includes(st) ? "border-accent bg-accent/10 text-accent" : "border-border text-muted-foreground hover:border-accent/40"}`}>
                            {st}
                          </button>
                        ))}
                      </div>
                    </details>

                    {/* About */}
                    <p className="mt-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">About Your Business</p>
                    <textarea rows={3} placeholder="Tell us about your business, experience, and what sets you apart (optional)" value={form.about} onChange={(e) => handleChange("about", e.target.value)} className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20" />

                    <Button type="submit" disabled={submitting} className="mt-2 w-full gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
                      {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Zap className="h-4 w-4" />}
                      {submitting ? "Submitting..." : "Submit Power Link Application"}
                    </Button>
                    <p className="text-center text-[10px] text-muted-foreground">
                      By applying, you agree to the{" "}
                      <Link href="/terms" className="text-primary hover:underline">Power Link Terms</Link> and{" "}
                      <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-foreground py-12">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <Zap className="mx-auto h-8 w-8 text-accent" />
          <h2 className="mt-4 text-2xl font-bold text-background md:text-3xl">Your next customer is already buying materials.</h2>
          <p className="mt-2 text-sm text-background/60">They just need an installer. Be the one they find.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild size="lg" className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#apply">Apply to Power Link <ArrowRight className="h-4 w-4" /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-background/30 bg-transparent text-background hover:border-background hover:bg-background/10">
              <Link href="/pro">Learn About PES Pro</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
