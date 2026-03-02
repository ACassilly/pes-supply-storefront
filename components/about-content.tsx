import Image from "next/image"
import { Zap, Globe, Cpu, Users, ShieldCheck, Truck, Target, Lightbulb, Building, Wrench, Factory, Home } from "lucide-react"

const stats = [
  { value: "169", label: "Brands" },
  { value: "500+", label: "Vendors" },
  { value: "8", label: "Core Categories" },
  { value: "50", label: "States Served" },
]

const coreCategories = [
  { icon: Zap, name: "Power & Energy Solutions", desc: "Solar modules, inverters, and hybrid systems." },
  { icon: Lightbulb, name: "Energy Storage Systems", desc: "Scalable batteries and innovative storage for industrial and residential use." },
  { icon: Building, name: "Electrical Equipment", desc: "Transformers, control panels, and switchgear for infrastructure projects." },
  { icon: Wrench, name: "HVAC Systems", desc: "High-efficiency heating, cooling, and ventilation solutions." },
  { icon: Truck, name: "EV Chargers", desc: "Smart charging systems for residential, commercial, and industrial needs." },
  { icon: Factory, name: "Generators & Backup Power", desc: "Reliable systems for off-grid, emergency, and industrial applications." },
  { icon: ShieldCheck, name: "Boilers", desc: "Energy-efficient industrial and commercial boiler systems." },
  { icon: Home, name: "Parts & Accessories", desc: "Components to maintain, repair, or upgrade existing systems." },
]

const differentiators = [
  { title: "Precision & Flexibility", desc: "Our non-stocking and contract stocking model adapts to your needs without compromising speed or reliability." },
  { title: "Proven Track Record", desc: "Decades of experience delivering consistent results across energy, electrical, and industrial markets." },
  { title: "Technology-Driven", desc: "AI-powered tools and real-time data ensure efficient procurement, logistics, and inventory management." },
  { title: "Global Reach, Local Execution", desc: "Partnerships with global manufacturers and regional suppliers mean innovation with local support." },
  { title: "Unwavering Reliability", desc: "From first inquiry to final delivery, PES is a partner you can depend on to keep your project moving." },
]

const whoWeServe = [
  { icon: Wrench, name: "Contractors", desc: "Simplified procurement, phased deliveries, and spot pricing for streamlined project management." },
  { icon: Building, name: "Developers", desc: "Scalable solutions for utility-scale and infrastructure projects with precise lifecycle planning." },
  { icon: Zap, name: "Utilities", desc: "Compliance-driven procurement and logistics for grid modernization and renewable integrations." },
  { icon: Factory, name: "Manufacturers", desc: "Expanded visibility and streamlined logistics to meet growing market demands." },
  { icon: Globe, name: "Industrial Leaders", desc: "Scalable sourcing for critical infrastructure and operational systems." },
  { icon: Home, name: "SMBs & Residential", desc: "Pre-packaged solutions and certified partner pairings for dependable results." },
]

export function AboutContent() {
  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-5xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><a href="/" className="hover:text-primary">Home</a></li>
          <li className="text-border">/</li>
          <li className="font-medium text-foreground">About PES Supply</li>
        </ol>
      </nav>

      {/* Hero */}
      <section className="relative border-b border-border bg-foreground py-16 md:py-24">
        <div className="mx-auto max-w-5xl px-4">
          <span className="text-sm font-bold uppercase tracking-widest text-primary">About PES Supply</span>
          <h1 className="mt-4 text-balance text-3xl font-extrabold tracking-tight text-background md:text-5xl">
            The Independent Hub for Energy, Electrical & Industrial Solutions
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-background/70">
            Portlandia Electric Supply (PES) is revolutionizing how professionals in energy, electrical, and industrial sectors move, manage, and scale their projects. Operating as both a non-stocking distributor and a contract stocking group, PES bridges the gap between manufacturers and professionals.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-background/10 bg-background/5 px-4 py-5 text-center">
                <span className="block text-2xl font-extrabold text-primary md:text-3xl">{s.value}</span>
                <span className="mt-1 block text-xs font-medium text-background/50">{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        {/* Mission / Vision */}
        <section className="mb-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-border p-6">
            <Target className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-xl font-bold text-foreground">Our Mission</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To redefine supply chains across energy, electrical, and industrial sectors by delivering innovative solutions that simplify sourcing, scale projects, and drive progress. PES connects industry, enables progress, and makes sourcing seamless with flexible procurement options that adapt to your timeline and budget.
            </p>
          </div>
          <div className="rounded-xl border border-border p-6">
            <Globe className="h-8 w-8 text-primary" />
            <h2 className="mt-4 text-xl font-bold text-foreground">Our Vision</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              To be the essential link in global energy and industrial supply chains, enabling professionals to source, scale, and deliver with confidence. We envision a future where supply chains are as dynamic, connected, and reliable as the industries they serve.
            </p>
          </div>
        </section>

        {/* What we do - 3 pillars */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">What We Do</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            PES provides tailored procurement and logistics solutions designed to help professionals succeed in an increasingly complex market.
          </p>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              { num: "01", title: "Global Reach, Local Execution", desc: "Flexible options including spot pricing for urgent needs and strategic long-term contracts designed to meet each project's specific requirements." },
              { num: "02", title: "Strategic Freight & Logistics", desc: "Contract facilities to store and stage materials for phased or large-scale deliveries. Optimized freight solutions to minimize delays and control costs." },
              { num: "03", title: "PowerLink Ecosystem", desc: "A rapidly growing connected platform uniting energy professionals with real-time inventory visibility, lifecycle support, and collaborative tools." },
            ].map((p) => (
              <div key={p.num} className="rounded-xl border border-border p-5">
                <span className="text-3xl font-extrabold text-primary/20">{p.num}</span>
                <h3 className="mt-2 text-sm font-bold text-foreground">{p.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Core categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">8 Core Product Categories</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            PES delivers access to essential products and solutions, with thousands of SKUs added annually to meet evolving market demands.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
            {coreCategories.map((cat) => (
              <div key={cat.name} className="flex flex-col items-center rounded-xl border border-border p-4 text-center">
                <cat.icon className="h-7 w-7 text-primary" />
                <h3 className="mt-3 text-xs font-bold text-foreground">{cat.name}</h3>
                <p className="mt-1 text-[10px] leading-relaxed text-muted-foreground">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why choose PES */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Why Choose PES?</h2>
          <div className="mt-6 space-y-3">
            {differentiators.map((d, i) => (
              <div key={d.title} className="flex gap-4 rounded-xl border border-border p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-foreground">{d.title}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{d.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Who we serve */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-foreground">Who We Serve</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {whoWeServe.map((w) => (
              <div key={w.name} className="flex gap-3 rounded-xl border border-border p-5">
                <w.icon className="mt-0.5 h-6 w-6 shrink-0 text-primary" />
                <div>
                  <h3 className="text-sm font-bold text-foreground">{w.name}</h3>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Team / warehouse photo */}
        <section className="mb-16 overflow-hidden rounded-xl border border-border">
          <div className="relative aspect-[21/9]">
            <Image src="/images/team-warehouse.jpg" alt="PES Supply operations team in Louisville, KY" fill className="object-cover" sizes="(max-width: 768px) 100vw, 1024px" />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent" />
            <div className="absolute bottom-0 left-0 p-6 md:p-8">
              <h2 className="text-xl font-bold text-background md:text-2xl">Our Operations Team</h2>
              <p className="mt-1 max-w-lg text-sm text-background/70">
                Based in Louisville, KY. Our team manages every order from placement to delivery -- and actually picks up the phone when you call.
              </p>
              <div className="mt-3 flex flex-wrap gap-3">
                <a href="tel:8888760007" className="rounded-lg bg-primary px-4 py-2 text-sm font-bold text-primary-foreground">(888) 876-0007</a>
                <a href="tel:5027900600" className="rounded-lg border border-background/20 px-4 py-2 text-sm font-medium text-background">(502) 790-0600</a>
              </div>
            </div>
          </div>
        </section>

        {/* PowerLink callout */}
        <section className="rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8">
          <div className="flex items-center gap-3">
            <Cpu className="h-8 w-8 text-primary" />
            <h2 className="text-xl font-bold text-foreground">PowerLink: The Connected Ecosystem</h2>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            PowerLink is the backbone of PES{"'"}s commitment to creating a dynamic, collaborative supply chain. With real-time inventory visibility, collaborative project tools, and lifecycle support, PowerLink is rapidly expanding to connect energy professionals nationwide with a vision to serve over 1.2 million members.
          </p>
          <div className="mt-4 flex flex-wrap gap-4">
            <a href="#" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground">Join PowerLink</a>
            <a href="mailto:connect@portlandiaelectric.supply" className="rounded-lg border border-border px-5 py-2.5 text-sm font-medium text-foreground">Learn More</a>
          </div>
        </section>
      </div>
    </div>
  )
}
