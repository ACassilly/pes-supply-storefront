import Link from "next/link"
import Image from "next/image"
import { ChevronRight, Calendar, User, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

export const dynamic = "force-dynamic"

// Static blog content fallback for when Shopify doesn't have the article
const staticArticles: Record<string, {
  title: string
  excerpt: string
  contentHtml: string
  publishedAt: string
  author: { name: string }
  image: { url: string; altText: string | null }
  seo: { title: string | null; description: string | null }
}> = {
  "sizing-transfer-switch": {
    title: "How to Size a Transfer Switch for Standby Generators",
    excerpt: "Choosing the right transfer switch is critical for generator installations. We break down load calculations, ATS vs. MTS, and the most common sizing mistakes.",
    contentHtml: `
      <p>When installing a standby generator system, the transfer switch is the critical link between utility power and backup power. Sizing it correctly ensures safe, reliable operation and code compliance.</p>
      <h2>Understanding Transfer Switch Types</h2>
      <p><strong>Automatic Transfer Switches (ATS)</strong> detect power loss and automatically switch to generator power within seconds. They're ideal for whole-home backup and critical commercial applications.</p>
      <p><strong>Manual Transfer Switches (MTS)</strong> require someone to physically flip the switch. They're more affordable and suitable for occasional use or non-critical loads.</p>
      <h2>Load Calculation Basics</h2>
      <p>The transfer switch must handle your total connected load. Follow these steps:</p>
      <ul>
        <li>List all circuits you want on backup power</li>
        <li>Add up the breaker amperage for each circuit</li>
        <li>Apply a 80% derating factor for continuous loads</li>
        <li>Select a transfer switch rated at or above your calculated load</li>
      </ul>
      <h2>Common Sizing Mistakes</h2>
      <p><strong>Undersizing:</strong> Choosing a transfer switch smaller than your generator's output limits your backup capacity and can cause nuisance tripping.</p>
      <p><strong>Ignoring starting currents:</strong> Motors draw 3-7x their running current on startup. AC compressors, well pumps, and refrigerators need this headroom.</p>
      <h2>Our Recommendations</h2>
      <p>For most residential applications with a 22-24kW generator, we recommend a 200-amp automatic transfer switch. PES Supply stocks Generac, Eaton, and Siemens transfer switches with same-day shipping.</p>
    `,
    publishedAt: "2026-02-25T10:00:00Z",
    author: { name: "PES Technical Team" },
    image: { url: "/images/blog-transfer-switch.jpg", altText: "Transfer switch installation" },
    seo: { title: "How to Size a Transfer Switch | PES Supply", description: "Learn how to properly size a transfer switch for standby generators. Load calculations, ATS vs MTS comparison, and common mistakes to avoid." },
  },
  "nec-2026-changes": {
    title: "NEC 2026 Code Changes Every Electrician Needs to Know",
    excerpt: "The 2026 National Electrical Code introduces significant changes to GFCI requirements, EV circuit provisions, and solar rapid shutdown.",
    contentHtml: `
      <p>The 2026 National Electrical Code (NEC) brings sweeping changes that affect residential, commercial, and solar installations. Here are the updates that will impact your work.</p>
      <h2>Expanded GFCI Requirements</h2>
      <p>GFCI protection now extends to more areas:</p>
      <ul>
        <li>All 125V through 250V receptacles in dwelling unit bathrooms</li>
        <li>Outdoor receptacles at commercial buildings</li>
        <li>Indoor damp or wet locations in commercial settings</li>
      </ul>
      <h2>EV Charging Circuit Changes</h2>
      <p>Article 625 has been significantly updated:</p>
      <ul>
        <li>New load management system requirements</li>
        <li>Automatic load shedding provisions</li>
        <li>Updated calculations for multiple EV charging outlets</li>
      </ul>
      <h2>Solar Rapid Shutdown 2.0</h2>
      <p>Module-level rapid shutdown requirements are stricter:</p>
      <ul>
        <li>30-second shutdown requirement (down from 60 seconds)</li>
        <li>New labeling requirements at service disconnect</li>
        <li>Updated conductor voltage limits</li>
      </ul>
      <h2>Stay Code Compliant</h2>
      <p>PES Supply stocks NEC 2026-compliant equipment from all major manufacturers. Our technical team can help you spec the right products for your jurisdiction's adoption timeline.</p>
    `,
    publishedAt: "2026-02-18T10:00:00Z",
    author: { name: "PES Technical Team" },
    image: { url: "/images/blog-nec-code.jpg", altText: "NEC 2026 code book" },
    seo: { title: "NEC 2026 Code Changes for Electricians | PES Supply", description: "Complete guide to NEC 2026 changes including GFCI expansion, EV charging updates, and solar rapid shutdown requirements." },
  },
  "micro-vs-string-inverters": {
    title: "Residential Solar: Microinverters vs. String Inverters",
    excerpt: "The microinverter vs. string inverter debate comes down to shade tolerance, cost per watt, and monitoring.",
    contentHtml: `
      <p>Choosing between microinverters and string inverters is one of the most important decisions in residential solar design. Let's break down the pros and cons.</p>
      <h2>Microinverters</h2>
      <p><strong>How they work:</strong> Each solar panel gets its own small inverter mounted underneath. DC-to-AC conversion happens at the panel level.</p>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Best shade tolerance - one shaded panel doesn't affect others</li>
        <li>Panel-level monitoring and diagnostics</li>
        <li>Easier system expansion</li>
        <li>No single point of failure</li>
        <li>Longer warranties (25 years typical)</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Higher upfront cost per watt</li>
        <li>More components on the roof</li>
        <li>Potentially more maintenance points</li>
      </ul>
      <h2>String Inverters</h2>
      <p><strong>How they work:</strong> Multiple panels wire together in "strings" feeding a single central inverter, usually mounted near the electrical panel.</p>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Lower cost per watt</li>
        <li>Fewer components overall</li>
        <li>Easier troubleshooting (single unit)</li>
        <li>Well-proven technology</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Shade affects entire string</li>
        <li>System-level monitoring only (unless you add optimizers)</li>
        <li>Shorter warranties (10-12 years typical)</li>
      </ul>
      <h2>Our Recommendation</h2>
      <p>For most residential installations, we recommend <strong>Enphase IQ8 microinverters</strong> for shade-prone roofs and <strong>Sol-Ark or SolarEdge</strong> for unshaded arrays where battery backup is planned.</p>
    `,
    publishedAt: "2026-02-10T10:00:00Z",
    author: { name: "PES Technical Team" },
    image: { url: "/images/blog-solar-inverter.jpg", altText: "Solar inverter comparison" },
    seo: { title: "Microinverters vs String Inverters | PES Supply", description: "Compare microinverters and string inverters for residential solar. Pros, cons, and our recommendations for different scenarios." },
  },
  "baba-compliance-guide": {
    title: "BABA Compliance: What Contractors Need to Know for Government Projects",
    excerpt: "Build America, Buy America requirements are expanding. Learn which products qualify and how to document compliance.",
    contentHtml: `
      <p>The Build America, Buy America (BABA) Act is reshaping government procurement. If you bid on federal, state, or local projects using federal funds, compliance is mandatory.</p>
      <h2>What is BABA?</h2>
      <p>BABA requires that iron, steel, manufactured products, and construction materials used in federally-funded infrastructure projects are produced in the United States.</p>
      <h2>Key Requirements</h2>
      <ul>
        <li><strong>Iron and Steel:</strong> All manufacturing processes must occur in the US</li>
        <li><strong>Manufactured Products:</strong> Must be manufactured in the US with at least 55% domestic components</li>
        <li><strong>Construction Materials:</strong> Must be manufactured in the US</li>
      </ul>
      <h2>Documentation Requirements</h2>
      <p>You'll need to maintain:</p>
      <ul>
        <li>Mill test reports for iron and steel</li>
        <li>Manufacturer certifications</li>
        <li>Country of origin documentation</li>
        <li>Component cost breakdowns for manufactured products</li>
      </ul>
      <h2>How PES Supply Helps</h2>
      <p>PES Supply maintains a curated catalog of BABA-compliant products. We provide compliance documentation with every qualifying order and can help you spec compliant alternatives for your projects.</p>
    `,
    publishedAt: "2026-02-03T10:00:00Z",
    author: { name: "PES Technical Team" },
    image: { url: "/images/hero-electrical.jpg", altText: "BABA compliance documentation" },
    seo: { title: "BABA Compliance Guide for Contractors | PES Supply", description: "Complete guide to Build America Buy America compliance for government projects. Requirements, documentation, and compliant products." },
  },
  "mini-split-install-guide": {
    title: "Mini-Split HVAC Installation: A Contractor's Quick Reference",
    excerpt: "From line set sizing to refrigerant charge calculations, this guide covers the essentials of ductless mini-split installation.",
    contentHtml: `
      <p>Ductless mini-split systems are increasingly popular for their efficiency and flexibility. This guide covers the key installation considerations.</p>
      <h2>Line Set Sizing</h2>
      <p>Proper line set sizing is critical for system performance:</p>
      <ul>
        <li><strong>9,000-12,000 BTU:</strong> 1/4" liquid, 3/8" suction</li>
        <li><strong>18,000-24,000 BTU:</strong> 1/4" liquid, 1/2" suction</li>
        <li><strong>36,000+ BTU:</strong> 3/8" liquid, 5/8" suction</li>
      </ul>
      <h2>Maximum Line Set Length</h2>
      <p>Most manufacturers allow 50-75 feet without additional refrigerant. Check your specific model's installation manual.</p>
      <h2>Electrical Requirements</h2>
      <ul>
        <li>Dedicated circuit required</li>
        <li>Disconnect switch within sight of outdoor unit</li>
        <li>Properly sized breaker per manufacturer specs</li>
      </ul>
      <h2>Common Installation Mistakes</h2>
      <ul>
        <li>Not evacuating the lines properly (minimum 500 microns)</li>
        <li>Kinking line sets during installation</li>
        <li>Improper drainage pitch (need 1/4" per foot minimum)</li>
        <li>Not using proper flaring tools</li>
      </ul>
      <h2>Get the Right Equipment</h2>
      <p>PES Supply stocks MRCOOL, Samsung, LG, and Mitsubishi mini-splits with fast shipping. Our tech team can help you spec the right system for any application.</p>
    `,
    publishedAt: "2026-01-27T10:00:00Z",
    author: { name: "PES Technical Team" },
    image: { url: "/images/hero-hvac.jpg", altText: "Mini-split installation" },
    seo: { title: "Mini-Split Installation Guide | PES Supply", description: "Complete mini-split HVAC installation guide. Line set sizing, electrical requirements, and common mistakes to avoid." },
  },
  "led-retrofit-roi": {
    title: "LED Retrofit ROI Calculator: How to Sell the Upgrade",
    excerpt: "Show your commercial clients the payback period for LED retrofits with our ROI calculator and savings charts.",
    contentHtml: `
      <p>LED retrofits offer compelling energy savings, but clients need to see the numbers. Here's how to calculate and present the ROI.</p>
      <h2>Basic ROI Formula</h2>
      <p><strong>Payback Period = Project Cost / Annual Savings</strong></p>
      <h2>Calculating Annual Savings</h2>
      <ol>
        <li>Count existing fixtures and their wattage</li>
        <li>Determine operating hours per year</li>
        <li>Calculate current kWh usage</li>
        <li>Calculate new kWh usage with LEDs</li>
        <li>Multiply savings by your client's kWh rate</li>
      </ol>
      <h2>Example Calculation</h2>
      <p>100 fixtures × 150W (existing) × 4,000 hours = 60,000 kWh/year</p>
      <p>100 fixtures × 50W (LED) × 4,000 hours = 20,000 kWh/year</p>
      <p>Savings: 40,000 kWh × $0.12/kWh = <strong>$4,800/year</strong></p>
      <h2>Don't Forget Utility Rebates</h2>
      <p>Many utilities offer $10-50 per fixture rebates for commercial LED retrofits. This can cut payback period in half.</p>
      <h2>Maintenance Savings</h2>
      <p>LED fixtures last 50,000+ hours vs. 10,000 for fluorescent. Include reduced lamp replacement labor in your ROI calculations.</p>
      <h2>Get Started</h2>
      <p>PES Supply offers free lighting audits and rebate processing assistance for commercial LED retrofits. Contact our lighting specialists today.</p>
    `,
    publishedAt: "2026-01-20T10:00:00Z",
    author: { name: "PES Technical Team" },
    image: { url: "/images/hero-lighting.jpg", altText: "LED retrofit installation" },
    seo: { title: "LED Retrofit ROI Calculator | PES Supply", description: "Calculate LED retrofit payback periods and annual savings. ROI formula, utility rebates, and how to sell the upgrade to commercial clients." },
  },
}

async function getArticle(slug: string) {
  // First try Shopify
  try {
    const { getBlogArticle } = await import("@/lib/shopify")
    // Try both blog handles that the Shopify store might use
    const article = await getBlogArticle("news", slug) || await getBlogArticle("generators", slug)
    if (article) {
      console.log("[v0] Found article in Shopify:", slug)
      return article
    }
  } catch (e) {
    console.log("[v0] Shopify blog fetch failed for:", slug, e)
  }
  
  // Fall back to static content
  if (staticArticles[slug]) {
    console.log("[v0] Using static article:", slug)
    const sa = staticArticles[slug]
    return {
      id: slug,
      title: sa.title,
      handle: slug,
      excerpt: sa.excerpt,
      content: sa.contentHtml.replace(/<[^>]+>/g, ""),
      contentHtml: sa.contentHtml,
      publishedAt: sa.publishedAt,
      image: sa.image,
      author: sa.author,
      blog: { handle: "news" },
      seo: sa.seo,
    }
  }
  
  return null
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticle(slug)
  if (!article) return { title: "Article Not Found | PES Supply" }
  return {
    title: `${article.seo?.title || article.title} | PES Supply Blog`,
    description: article.seo?.description || article.excerpt,
    alternates: { canonical: `https://portlandiaelectric.supply/blog/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.publishedAt,
      images: article.image ? [{ url: article.image.url }] : [],
    },
  }
}

export default async function BlogArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = await getArticle(slug)

  if (!article) {
    // Show a graceful fallback for articles that don't exist in Shopify yet
    return (
      <main className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6">
        <h1 className="text-2xl font-black text-foreground">Article Not Found</h1>
        <p className="mt-3 text-muted-foreground">This article may have been moved or is no longer available.</p>
        <Link href="/blog" className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>
      </main>
    )
  }

  const publishDate = new Date(article.publishedAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-primary">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link href="/blog" className="hover:text-primary">Blog</Link>
        <ChevronRight className="h-3 w-3" />
        <span className="truncate text-foreground">{article.title}</span>
      </nav>

      {/* Article Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-black leading-tight text-foreground sm:text-4xl text-balance">
          {article.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
          {article.author && (
            <span className="flex items-center gap-1.5">
              <User className="h-4 w-4" /> {article.author.name}
            </span>
          )}
          <span className="flex items-center gap-1.5">
            <Calendar className="h-4 w-4" /> {publishDate}
          </span>
        </div>
      </header>

      {/* Featured Image */}
      {article.image && (
        <div className="relative mb-8 aspect-video overflow-hidden rounded-xl">
          <Image
            src={article.image.url}
            alt={article.image.altText || article.title}
            fill
            sizes="(max-width: 768px) 100vw, 720px"
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Article Content */}
      <article
        className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-black prose-a:text-primary prose-img:rounded-xl"
        dangerouslySetInnerHTML={{ __html: article.contentHtml }}
      />

      {/* Back to blog */}
      <div className="mt-12 border-t border-border pt-8">
        <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to all articles
        </Link>
      </div>
    </main>
  )
}
