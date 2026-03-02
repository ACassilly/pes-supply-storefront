"use client"

import Link from "next/link"
import { ArrowRight, ShieldCheck, FileCheck, Building2, CheckCircle2, ChevronDown, Scale, Landmark, HardHat, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const eligibleCategories = [
  { name: "Electrical Distribution", examples: "Panels, breakers, switchgear, disconnects, transformers" },
  { name: "Wire & Cable", examples: "NM-B, THHN, MC, SER, XHHW -- domestic mill certifications" },
  { name: "Solar & Renewables", examples: "Modules, inverters, racking, rapid shutdown, combiners" },
  { name: "Lighting", examples: "LED high bay, area lighting, emergency, exit signs" },
  { name: "Conduit & Fittings", examples: "EMT, rigid, PVC, liquidtight, strut, hangers" },
  { name: "Safety & PPE", examples: "Arc-rated clothing, gloves, hard hats, lockout/tagout" },
  { name: "Tools & Test Equipment", examples: "Multimeters, clamp meters, hand tools, power tools" },
  { name: "HVAC Controls", examples: "Thermostats, contactors, capacitors, disconnect switches" },
]

const faqs = [
  {
    q: "What is BABA?",
    a: "The Build America, Buy America Act (BABA) is a federal law requiring that iron, steel, manufactured products, and construction materials used in federally funded infrastructure projects are produced in the United States. It applies to projects funded through the Infrastructure Investment and Jobs Act (IIJA) and other federal programs.",
  },
  {
    q: "How do I know if my project requires BABA compliance?",
    a: "If your project receives federal funding through programs like IIJA, FEMA grants, USDA Rural Development, or EPA water infrastructure funding, BABA requirements likely apply. Your contracting officer or project specifications will define the compliance requirements.",
  },
  {
    q: "Does PES Supply provide BABA documentation?",
    a: "Yes. For every BABA-eligible order, PES Supply provides manufacturer certifications, country-of-origin documentation, mill test reports (for wire and steel), and a consolidated BABA compliance package ready for your project files.",
  },
  {
    q: "What if a product doesn't have a domestic equivalent?",
    a: "BABA includes a waiver process for products where domestic alternatives are unavailable, cost-prohibitive (25%+ premium), or against public interest. PES Supply can help identify waiver-eligible items and provide supporting documentation.",
  },
  {
    q: "Can I filter products by BABA eligibility on your website?",
    a: "We are actively building a BABA product filter. In the meantime, contact our compliance team at compliance@pes.supply or call (888) 876-0007 and we will confirm BABA eligibility for any product before you order.",
  },
  {
    q: "Does PES Supply handle prevailing wage or Davis-Bacon documentation?",
    a: "PES Supply provides product compliance documentation. For labor-related compliance (prevailing wage, Davis-Bacon), consult your project manager or legal counsel. We can connect you with partners who specialize in labor compliance if needed.",
  },
]

export function BabaContent() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-border bg-foreground py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5">
            <ShieldCheck className="h-4 w-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-primary">BABA Compliant</span>
          </div>
          <h1 className="mx-auto max-w-3xl text-2xl font-bold text-background md:text-4xl">
            Build America, Buy America. We make compliance simple.
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-background/60 md:text-base">
            PES Supply stocks BABA-eligible products across electrical, solar, lighting, and infrastructure categories -- with documentation ready before your order ships.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/quote">Request a BABA Quote <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
            <Button asChild variant="outline" className="gap-1.5 border-background/20 bg-transparent text-background hover:border-background hover:bg-background/10">
              <Link href="/contact">Talk to Compliance Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why BABA matters */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-xl font-bold text-foreground md:text-2xl">Why BABA matters for your project</h2>
          <p className="mx-auto mb-8 max-w-2xl text-center text-sm text-muted-foreground">
            Non-compliant materials can trigger funding clawbacks, project delays, and audit failures. PES removes that risk.
          </p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-border bg-card p-5">
              <Scale className="mb-3 h-6 w-6 text-primary" />
              <h3 className="text-sm font-bold text-card-foreground">Federal Requirement</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">BABA applies to all federally funded infrastructure projects under IIJA, including electrical, water, broadband, and transportation.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <Landmark className="mb-3 h-6 w-6 text-primary" />
              <h3 className="text-sm font-bold text-card-foreground">Funding at Risk</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">Non-compliant materials can trigger federal funding clawbacks. One wrong product can jeopardize an entire project budget.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <HardHat className="mb-3 h-6 w-6 text-primary" />
              <h3 className="text-sm font-bold text-card-foreground">Contractor Liability</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">GCs and subs are responsible for material compliance. Buying from an authorized distributor with documentation shifts that burden.</p>
            </div>
            <div className="rounded-xl border border-border bg-card p-5">
              <Globe className="mb-3 h-6 w-6 text-primary" />
              <h3 className="text-sm font-bold text-card-foreground">PES Global Advantage</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">PES Global{"'"}s sourcing network identifies domestic manufacturers first. When waivers are needed, we provide the documentation.</p>
            </div>
          </div>
        </div>
      </section>

      {/* What PES provides */}
      <section className="border-y border-border bg-muted/30 py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-xl font-bold text-foreground md:text-2xl">What PES provides for every BABA order</h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-sm text-muted-foreground">
            Compliance documentation ships with your materials -- not weeks later.
          </p>
          <div className="mx-auto grid max-w-3xl gap-3">
            {[
              "Manufacturer BABA certification letters",
              "Country-of-origin documentation per line item",
              "Mill test reports for wire, cable, and steel products",
              "Consolidated compliance package (PDF) per order",
              "Waiver eligibility assessment for non-domestic items",
              "Audit-ready documentation format accepted by federal agencies",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-card-foreground">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligible categories */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-2 text-center text-xl font-bold text-foreground md:text-2xl">BABA-eligible product categories</h2>
          <p className="mx-auto mb-8 max-w-xl text-center text-sm text-muted-foreground">
            PES stocks domestic-manufactured products across these categories. Contact us for specific SKU eligibility.
          </p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {eligibleCategories.map((cat) => (
              <div key={cat.name} className="rounded-xl border border-border bg-card p-4">
                <div className="mb-2 flex items-center gap-2">
                  <FileCheck className="h-4 w-4 text-primary" />
                  <h3 className="text-sm font-bold text-card-foreground">{cat.name}</h3>
                </div>
                <p className="text-xs leading-relaxed text-muted-foreground">{cat.examples}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-y border-border bg-foreground py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-8 text-center text-xl font-bold text-background md:text-2xl">How to order BABA-compliant materials</h2>
          <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">1</div>
              <h3 className="text-sm font-bold text-background">Send your material list</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-background/60">Email your BOM or spec sheet to compliance@pes.supply, or submit through our quote form.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">2</div>
              <h3 className="text-sm font-bold text-background">We verify eligibility</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-background/60">Our compliance team confirms BABA eligibility for each line item and flags any items that may need waivers.</p>
            </div>
            <div className="text-center">
              <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-primary text-lg font-bold text-primary-foreground">3</div>
              <h3 className="text-sm font-bold text-background">Materials + docs ship together</h3>
              <p className="mt-1.5 text-xs leading-relaxed text-background/60">Your order ships with a complete BABA compliance package included. Portlandia Logistics coordinates fulfillment.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-6 text-center text-xl font-bold text-foreground md:text-2xl">Frequently asked questions</h2>
          <div className="flex flex-col gap-2">
            {faqs.map((faq, i) => (
              <div key={i} className="rounded-lg border border-border bg-card">
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="flex w-full items-center justify-between px-5 py-4 text-left"
                  aria-expanded={openFaq === i}
                >
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

      {/* Bottom CTA */}
      <section className="border-t border-border bg-primary/5 py-10">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <Building2 className="mx-auto mb-3 h-8 w-8 text-primary" />
          <h2 className="text-lg font-bold text-foreground md:text-xl">Bidding on a federally funded project?</h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
            Get a BABA-verified quote with compliance documentation included. Our team responds within 24 hours.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Button asChild className="gap-1.5 bg-primary text-primary-foreground hover:bg-primary/90">
              <Link href="/quote">Request a BABA Quote <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
            <Button asChild variant="outline">
              <a href="mailto:compliance@pes.supply">Email Compliance Team</a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  )
}
