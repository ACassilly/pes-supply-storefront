import Image from "next/image"
import { ArrowRight, Home, Building2, HardHat, Container } from "lucide-react"
import { Button } from "@/components/ui/button"

const solutions = [
  {
    icon: Home,
    title: "Residential Systems",
    description:
      "Complete solar kits and components for homeowners and residential installers.",
    cta: "Explore Residential",
    image: "/images/hero-solar.jpg",
  },
  {
    icon: Building2,
    title: "Commercial Projects",
    description:
      "Bulk pricing and technical support for commercial and utility-scale installations.",
    cta: "Get Commercial Quote",
    image: "/images/hero-commercial.jpg",
  },
  {
    icon: HardHat,
    title: "Installer Network",
    description:
      "Join PowerLink for contractor pricing, leads, and technical resources.",
    cta: "Join Pro Network",
    image: "/images/product-tools.jpg",
  },
  {
    icon: Container,
    title: "Bulk & Container",
    description:
      "Pallet and container pricing for large projects and inventory stocking.",
    cta: "View Bulk Pricing",
    image: "/images/cat-racking.jpg",
  },
]

export function SolutionPaths() {
  return (
    <section className="bg-muted/50" aria-label="Solution paths">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Choose Your Solution Path</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Solar and electrical solutions for every application
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((sol) => (
            <div
              key={sol.title}
              className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:shadow-lg hover:border-primary/30"
            >
              <div className="relative h-40 overflow-hidden">
                <Image
                  src={sol.image}
                  alt={sol.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent" />
                <div className="absolute bottom-3 left-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/90">
                  <sol.icon className="h-5 w-5 text-primary-foreground" />
                </div>
              </div>
              <div className="flex flex-1 flex-col p-4">
                <h3 className="mb-1 text-base font-semibold text-card-foreground">
                  {sol.title}
                </h3>
                <p className="mb-4 flex-1 text-xs text-muted-foreground leading-relaxed">
                  {sol.description}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full gap-1.5 text-primary hover:bg-primary hover:text-primary-foreground"
                >
                  {sol.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
