"use client"

import { useState } from "react"
import Image from "next/image"
import { ArrowRight, Truck, ShieldCheck, CreditCard, Headphones, Award, Globe, CheckCircle2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const pillars = [
  { icon: ShieldCheck, title: "Authorized Distributor", desc: "Full OEM warranties from 169 brands and 500+ vendors. Factory-direct, always." },
  { icon: Truck, title: "Same-Day Shipping", desc: "Orders by 2 PM ET ship same day. Free freight over $999." },
  { icon: CreditCard, title: "Net-30 & Trade Pricing", desc: "30-day terms and volume-tiered pricing for approved accounts." },
  { icon: Headphones, title: "Named Account Rep", desc: "A real person who knows your projects and picks up the phone." },
  { icon: Award, title: "Compliance Ready", desc: "BABA compliant, UL listed, NABCEP certified. Procurement-ready docs." },
  { icon: Globe, title: "Backed by PES Global", desc: "Local service, global supply chain, enterprise-grade operations." },
]

interface FormData { company: string; name: string; email: string; phone: string; need: string }
interface FormErrors { company?: string; name?: string; email?: string }

function validate(d: FormData): FormErrors {
  const e: FormErrors = {}
  if (!d.company.trim()) e.company = "Company name is required"
  if (!d.name.trim()) e.name = "Your name is required"
  if (!d.email.trim()) e.email = "Email is required"
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) e.email = "Enter a valid email"
  return e
}

export function ProMembership() {
  const [form, setForm] = useState<FormData>({ company: "", name: "", email: "", phone: "", need: "" })
  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(form)
    setErrors(errs)
    if (Object.keys(errs).length > 0) return
    setSubmitting(true)
    // Simulate API call
    setTimeout(() => { setSubmitting(false); setSubmitted(true) }, 1200)
  }

  function handleChange(field: keyof FormData, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field as keyof FormErrors]) setErrors((prev) => { const n = { ...prev }; delete n[field as keyof FormErrors]; return n })
  }

  return (
    <section className="border-y border-border bg-muted/30" aria-labelledby="pro-heading">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="flex flex-col gap-10 lg:flex-row lg:gap-14">
          <div className="flex-1">
            <span className="mb-2 inline-block rounded-md bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">Why Contractors Choose PES</span>
            <h2 id="pro-heading" className="mb-2 text-2xl font-bold text-foreground md:text-3xl">One store. One team. Everything handled.</h2>
            <p className="mb-8 max-w-lg text-sm leading-relaxed text-muted-foreground">Vendors list products on PES. We handle the rest -- warehousing, fulfillment, support, and warranties. You see one store. You get one invoice. We run everything behind the curtain.</p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {pillars.map((p) => (
                <div key={p.title} className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10"><p.icon className="h-4 w-4 text-primary" /></div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{p.title}</h3>
                    <p className="text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-4 rounded-lg border border-border bg-card p-4">
              <div className="relative h-16 w-28 shrink-0 overflow-hidden rounded-lg">
                <Image src="/images/team-warehouse.jpg" alt="PES Supply operations team" fill className="object-cover" sizes="112px" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Real people. Real support. Louisville, KY.</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Our operations team manages every order from start to delivery.</p>
              </div>
            </div>
          </div>

          <div className="w-full rounded-xl border border-border bg-card p-6 lg:w-[400px] lg:p-8">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <CheckCircle2 className="h-12 w-12 text-primary" />
                <h3 className="mt-4 text-lg font-bold text-card-foreground">Application Received</h3>
                <p className="mt-2 text-sm text-muted-foreground">Our team will reach out within 1 business day. Check your email at <strong className="text-card-foreground">{form.email}</strong>.</p>
                <Button variant="outline" className="mt-6" onClick={() => { setSubmitted(false); setForm({ company: "", name: "", email: "", phone: "", need: "" }) }}>Submit Another</Button>
              </div>
            ) : (
              <>
                <h3 className="mb-1 text-lg font-bold text-card-foreground">Open a Pro Account</h3>
                <p className="mb-5 text-xs text-muted-foreground">Our team responds within one business day.</p>
                <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
                  <div>
                    <input type="text" required placeholder="Company Name *" value={form.company} onChange={(e) => handleChange("company", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.company ? "border-destructive" : "border-input focus:border-primary"}`} />
                    {errors.company && <p className="mt-1 text-xs text-destructive">{errors.company}</p>}
                  </div>
                  <div>
                    <input type="text" required placeholder="Your Name *" value={form.name} onChange={(e) => handleChange("name", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.name ? "border-destructive" : "border-input focus:border-primary"}`} />
                    {errors.name && <p className="mt-1 text-xs text-destructive">{errors.name}</p>}
                  </div>
                  <div>
                    <input type="email" required placeholder="Email Address *" value={form.email} onChange={(e) => handleChange("email", e.target.value)} className={`w-full rounded-lg border bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.email ? "border-destructive" : "border-input focus:border-primary"}`} />
                    {errors.email && <p className="mt-1 text-xs text-destructive">{errors.email}</p>}
                  </div>
                  <input type="tel" placeholder="Phone (optional)" value={form.phone} onChange={(e) => handleChange("phone", e.target.value)} pattern="[0-9\-\(\)\s\+]*" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                  <select value={form.need} onChange={(e) => handleChange("need", e.target.value)} className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" aria-label="What do you need?">
                    <option value="">What are you looking for?</option>
                    <option value="pro">Pro Account (trade pricing + terms)</option>
                    <option value="quote">Project Quote</option>
                    <option value="bulk">Bulk / Pallet Pricing</option>
                    <option value="other">Something Else</option>
                  </select>
                  <Button type="submit" disabled={submitting} className="mt-1 w-full gap-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    {submitting ? "Submitting..." : "Submit"} {!submitting && <ArrowRight className="h-4 w-4" />}
                  </Button>
                  <p className="text-center text-[10px] text-muted-foreground">Response within 1 business day from our team</p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
