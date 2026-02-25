import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ChevronRight } from "lucide-react"
import { departments } from "@/lib/data"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "All Departments",
  description: "Browse all 10 departments at PES Supply. Electrical, lighting, solar, tools, HVAC, plumbing, generators, EV charging, safety, and data communications.",
}

export default function DepartmentsPage() {
  return (
    <div className="bg-background">
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-medium text-foreground">All Departments</li>
        </ol>
      </nav>

      <section className="mx-auto max-w-7xl px-4 py-10">
        <h1 className="text-2xl font-bold text-foreground md:text-3xl">All Departments</h1>
        <p className="mt-2 text-sm text-muted-foreground">Everything between the meter and the roof. 40,000+ products across 10 departments.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {departments.map((dept) => (
            <Link key={dept.slug} href={`/departments/${dept.slug}`} className="group flex gap-4 overflow-hidden rounded-lg border border-border bg-card p-4 transition-all hover:border-primary/30 hover:shadow-md">
              <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-md bg-muted">
                <Image src={dept.image} alt={dept.name} fill sizes="96px" className="object-cover" />
              </div>
              <div className="flex flex-1 flex-col">
                <h2 className="text-sm font-bold text-card-foreground group-hover:text-primary">{dept.name}</h2>
                <p className="mt-0.5 text-xs text-muted-foreground">{dept.count} products</p>
                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{dept.description.split(".")[0]}.</p>
                <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-primary">
                  Shop {dept.name} <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}
