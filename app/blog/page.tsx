import Link from "next/link"
import Image from "next/image"
import { BookOpen, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Blog | PES Supply",
  description: "Technical guides, product spotlights, code updates, and industry news from PES Supply. Written for contractors, installers, and building professionals.",
}

const categories = ["All", "Electrical", "Solar", "Generators", "HVAC", "Lighting", "Tools", "Industry News"]

const posts = [
  {
    title: "How to Size a Transfer Switch for Standby Generators",
    excerpt: "Choosing the right transfer switch is critical for generator installations. We break down load calculations, ATS vs. MTS, and the most common sizing mistakes.",
    category: "Generators",
    image: "/images/blog-transfer-switch.jpg",
    href: "/blog/sizing-transfer-switch",
    readTime: "6 min read",
    date: "Feb 25, 2026",
    featured: true,
  },
  {
    title: "NEC 2026 Code Changes Every Electrician Needs to Know",
    excerpt: "The 2026 National Electrical Code introduces significant changes to GFCI requirements, EV circuit provisions, and solar rapid shutdown. Here is what matters for your jobs.",
    category: "Electrical",
    image: "/images/blog-nec-code.jpg",
    href: "/blog/nec-2026-changes",
    readTime: "8 min read",
    date: "Feb 18, 2026",
    featured: true,
  },
  {
    title: "Residential Solar: Microinverters vs. String Inverters",
    excerpt: "The microinverter vs. string inverter debate comes down to shade tolerance, cost per watt, and monitoring. We compare Enphase, Sol-Ark, and SolarEdge head to head.",
    category: "Solar",
    image: "/images/blog-solar-inverter.jpg",
    href: "/blog/micro-vs-string-inverters",
    readTime: "5 min read",
    date: "Feb 10, 2026",
    featured: false,
  },
  {
    title: "BABA Compliance: What Contractors Need to Know for Government Projects",
    excerpt: "Build America, Buy America requirements are expanding. Learn which products qualify, how to document compliance, and how PES simplifies procurement.",
    category: "Industry News",
    image: "/images/hero-electrical.jpg",
    href: "/blog/baba-compliance-guide",
    readTime: "7 min read",
    date: "Feb 3, 2026",
    featured: false,
  },
  {
    title: "Mini-Split HVAC Installation: A Contractor's Quick Reference",
    excerpt: "From line set sizing to refrigerant charge calculations, this guide covers the essentials of ductless mini-split installation. Includes MRCOOL and Samsung spec comparisons.",
    category: "HVAC",
    image: "/images/hero-hvac.jpg",
    href: "/blog/mini-split-install-guide",
    readTime: "6 min read",
    date: "Jan 27, 2026",
    featured: false,
  },
  {
    title: "LED Retrofit ROI Calculator: How to Sell the Upgrade",
    excerpt: "Show your commercial clients the payback period for LED retrofits. Includes wattage savings charts, utility rebate links, and a downloadable ROI spreadsheet.",
    category: "Lighting",
    image: "/images/hero-lighting.jpg",
    href: "/blog/led-retrofit-roi",
    readTime: "4 min read",
    date: "Jan 20, 2026",
    featured: false,
  },
]

export default function BlogPage() {
  const featured = posts.filter((p) => p.featured)
  const rest = posts.filter((p) => !p.featured)

  return (
    <main>
      {/* Hero */}
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <div className="mb-3 flex items-center justify-center gap-2">
            <BookOpen className="h-5 w-5 text-primary" />
            <span className="text-xs font-semibold uppercase tracking-widest text-primary">PES Supply Blog</span>
          </div>
          <h1 className="text-2xl font-bold text-background md:text-3xl">Technical Guides & Industry News</h1>
          <p className="mt-2 text-sm text-background/60">Written for contractors, installers, and building professionals. No fluff.</p>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {/* Category pills */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button key={cat} className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${cat === "All" ? "bg-primary text-primary-foreground" : "border border-border bg-card text-muted-foreground hover:border-primary/30 hover:text-foreground"}`}>
              {cat}
            </button>
          ))}
        </div>

        {/* Featured posts */}
        <div className="mb-10 grid gap-6 md:grid-cols-2">
          {featured.map((post) => (
            <Link key={post.title} href={post.href} className="group overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/30 hover:shadow-lg">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <span className="absolute left-3 top-3 rounded bg-foreground/80 px-2.5 py-1 text-[10px] font-bold text-background">{post.category}</span>
              </div>
              <div className="p-5">
                <h2 className="mb-2 text-lg font-bold leading-snug text-card-foreground group-hover:text-primary">{post.title}</h2>
                <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Rest of posts */}
        <h2 className="mb-4 text-lg font-bold text-foreground">More Articles</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {rest.map((post) => (
            <Link key={post.title} href={post.href} className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw" className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <span className="absolute left-2 top-2 rounded bg-foreground/80 px-2 py-0.5 text-[10px] font-bold text-background">{post.category}</span>
              </div>
              <div className="p-4">
                <h3 className="mb-1 line-clamp-2 text-sm font-bold leading-snug text-card-foreground group-hover:text-primary">{post.title}</h3>
                <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">{post.excerpt}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground">
                  <span>{post.date}</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-12 rounded-xl border border-border bg-muted/30 p-6 text-center md:p-8">
          <h3 className="text-lg font-bold text-foreground">Get the PES Supply Newsletter</h3>
          <p className="mt-1 text-sm text-muted-foreground">Code updates, product drops, and Pro-only deals. Monthly. No spam.</p>
          <div className="mx-auto mt-4 flex max-w-sm gap-2">
            <input type="email" placeholder="you@company.com" className="flex-1 rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            <Button size="sm" className="gap-1.5">Subscribe <ArrowRight className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
      </div>
    </main>
  )
}
