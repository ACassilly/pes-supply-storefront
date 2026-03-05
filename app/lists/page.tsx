import Link from "next/link"
import { Heart, Plus, ArrowRight, Zap, Wrench, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Saved Lists | PES Supply",
  description: "Create and manage saved product lists for your projects. Organize by job site, reorder with one click, and share with your team.",
}

const sampleLists = [
  { name: "Main Panel Upgrade -- Johnson Residence", icon: Zap, items: 14, updated: "Feb 26, 2026", total: "$2,847.00" },
  { name: "Solar Install -- 422 Oak St", icon: Sun, items: 23, updated: "Feb 22, 2026", total: "$12,430.50" },
  { name: "Monthly Reorder -- Wire & Conduit", icon: Wrench, items: 8, updated: "Feb 15, 2026", total: "$1,156.25" },
]

export default function ListsPage() {
  return (
    <main>
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-2xl font-bold text-background md:text-3xl">Saved Lists</h1>
          <p className="mt-2 text-sm text-background/60">Organize products by job site. Reorder with one click. Share with your team.</p>
        </div>
      </section>

      <div className="mx-auto max-w-3xl px-4 py-10">
        {/* Sign-in prompt */}
        <div className="mb-8 rounded-xl border border-primary/20 bg-primary/5 p-6 text-center">
          <Heart className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-3 text-sm font-semibold text-foreground">Sign in to access your saved lists</p>
          <p className="mt-1 text-xs text-muted-foreground">Save products, create job lists, and reorder past favorites instantly.</p>
          <div className="mt-4 flex justify-center gap-3">
            <Button asChild size="sm"><Link href="/account">Sign In <ArrowRight className="ml-1 h-3.5 w-3.5" /></Link></Button>
          </div>
        </div>

        {/* New list CTA */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">Your Lists (Demo)</h2>
          <Button variant="outline" size="sm" className="gap-1.5">
            <Plus className="h-3.5 w-3.5" /> New List
          </Button>
        </div>

        {/* Sample lists */}
        <div className="flex flex-col gap-3">
          {sampleLists.map((list) => (
            <div key={list.name} className="flex flex-col gap-3 rounded-lg border border-border bg-card p-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <list.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-bold text-card-foreground">{list.name}</p>
                  <p className="text-xs text-muted-foreground">{list.items} items &middot; Updated {list.updated}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-sm font-bold text-card-foreground">{list.total}</p>
                <button className="rounded-md border border-primary/30 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary hover:bg-primary/10">Add All to Cart</button>
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { title: "Job Lists", desc: "Organize by project. Keep separate lists for each job site or client." },
            { title: "One-Click Reorder", desc: "Add an entire list to your cart with a single click. Save time on repeat orders." },
            { title: "Share with Team", desc: "Pro Account members can share lists with coworkers and project managers." },
          ].map((f) => (
            <div key={f.title} className="rounded-lg border border-border bg-card p-4">
              <p className="text-xs font-bold text-card-foreground">{f.title}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
