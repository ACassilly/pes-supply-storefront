import Link from "next/link"
import Image from "next/image"
import { ArrowRight, BookOpen } from "lucide-react"

const posts = [
  {
    title: "How to Size a Transfer Switch for Standby Generators",
    category: "Generators",
    image: "/images/cat-generators.jpg",
    href: "/blog/sizing-transfer-switch",
    readTime: "6 min read",
  },
  {
    title: "NEC 2026 Code Changes Every Electrician Needs to Know",
    category: "Electrical",
    image: "/images/cat-electrical.jpg",
    href: "/blog/nec-2026-changes",
    readTime: "8 min read",
  },
  {
    title: "Residential Solar: Microinverters vs. String Inverters",
    category: "Solar",
    image: "/images/product-solar-panel.jpg",
    href: "/blog/micro-vs-string-inverters",
    readTime: "5 min read",
  },
]

export function BlogStrip() {
  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <h2 className="text-lg font-bold text-foreground">From the PES Blog</h2>
          </div>
          <Link href="/blog" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
            All Articles <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {posts.map((post) => (
            <Link key={post.title} href={post.href} className="group overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-primary/30 hover:shadow-md">
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
                <Image src={post.image} alt={post.title} fill sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
                <span className="absolute left-2 top-2 rounded bg-foreground/80 px-2 py-0.5 text-[10px] font-bold text-background">{post.category}</span>
              </div>
              <div className="p-4">
                <h3 className="mb-2 line-clamp-2 text-sm font-bold leading-snug text-card-foreground group-hover:text-primary">{post.title}</h3>
                <span className="text-[11px] text-muted-foreground">{post.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
