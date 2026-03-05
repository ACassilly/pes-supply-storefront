import Link from "next/link"
import { MapPin, ArrowRight, Zap, Users, TrendingUp, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Careers | PES Supply",
  description: "Join the PES Supply team in Louisville, KY. Open positions in warehouse, sales, account management, and more.",
}

const values = [
  { icon: Zap, title: "Move Fast", desc: "Same-day shipping is a promise, not a goal. We operate with urgency because our customers depend on us." },
  { icon: Users, title: "Own the Relationship", desc: "Every customer gets a named rep. We build trust through real conversations, not chatbots." },
  { icon: TrendingUp, title: "Grow With Us", desc: "We are scaling fast. Early team members shape the culture and grow into leadership roles." },
  { icon: Heart, title: "Do Right", desc: "No gray market. No cutting corners. Authorized brands, full warranties, honest pricing." },
]

const openings = [
  { title: "Account Manager -- Commercial Sales", location: "Louisville, KY", type: "Full-Time", dept: "Sales" },
  { title: "Warehouse Associate -- Pick & Pack", location: "Louisville, KY", type: "Full-Time", dept: "Operations" },
  { title: "Inside Sales Representative", location: "Louisville, KY (Hybrid)", type: "Full-Time", dept: "Sales" },
  { title: "E-Commerce Catalog Specialist", location: "Remote", type: "Full-Time", dept: "Digital" },
  { title: "Logistics Coordinator", location: "Louisville, KY", type: "Full-Time", dept: "Operations" },
  { title: "Solar Product Specialist", location: "Louisville, KY (Hybrid)", type: "Full-Time", dept: "Sales" },
]

export default function CareersPage() {
  return (
    <main>
      {/* Hero */}
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-12 text-center md:py-16">
          <span className="rounded-full bg-primary/20 px-4 py-1 text-xs font-semibold text-primary">We&apos;re Hiring</span>
          <h1 className="mt-4 text-2xl font-bold text-background md:text-3xl">Build the Future of Electrical Distribution</h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-background/60">PES Supply is growing fast. We are looking for people who care about getting it right for the contractors, installers, and builders who depend on us every day.</p>
          <div className="mt-6 flex items-center justify-center gap-2 text-xs text-background/50">
            <MapPin className="h-3.5 w-3.5" />
            <span>Based in Louisville, KY &middot; Remote roles available</span>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-b border-border bg-muted/30 py-10">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="mb-6 text-center text-xl font-bold text-foreground">What We Value</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.title} className="rounded-lg border border-border bg-card p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <v.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="text-sm font-bold text-card-foreground">{v.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open positions */}
      <section className="py-10">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="mb-2 text-xl font-bold text-foreground">Open Positions</h2>
          <p className="mb-6 text-sm text-muted-foreground">{openings.length} roles currently open. Apply directly or send your resume to <a href="mailto:careers@portlandiaelectric.supply" className="font-semibold text-primary hover:underline">careers@portlandiaelectric.supply</a>.</p>

          <div className="flex flex-col gap-3">
            {openings.map((job) => (
              <div key={job.title} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-bold text-card-foreground">{job.title}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {job.location}</span>
                    <span className="text-border">|</span>
                    <span>{job.type}</span>
                    <span className="text-border">|</span>
                    <span>{job.dept}</span>
                  </div>
                </div>
                <a href={`mailto:careers@portlandiaelectric.supply?subject=Application: ${job.title}`} className="rounded-md bg-primary px-4 py-2 text-center text-xs font-semibold text-primary-foreground hover:bg-primary/90">
                  Apply
                </a>
              </div>
            ))}
          </div>

          {/* General application */}
          <div className="mt-8 rounded-xl border border-border bg-muted/30 p-6 text-center">
            <h3 className="text-lg font-bold text-foreground">Don&apos;t see your role?</h3>
            <p className="mt-1 text-sm text-muted-foreground">We are always looking for talented people. Send your resume and tell us how you can contribute.</p>
            <Button asChild size="sm" className="mt-4 gap-1.5">
              <a href="mailto:careers@portlandiaelectric.supply?subject=General Application">Send Your Resume <ArrowRight className="h-3.5 w-3.5" /></a>
            </Button>
          </div>

          {/* About link */}
          <div className="mt-6 flex gap-4">
            <Link href="/about" className="text-xs font-semibold text-primary hover:underline">About PES Supply</Link>
            <Link href="/pro" className="text-xs font-semibold text-primary hover:underline">Pro Account</Link>
            <Link href="/contact" className="text-xs font-semibold text-primary hover:underline">Contact</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
