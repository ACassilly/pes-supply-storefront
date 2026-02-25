import Image from "next/image"
import { Star, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    name: "Michael Chen, PE",
    company: "Pacific NW Electrical",
    location: "Seattle, WA",
    quote: "I call, they pick up. I order, it ships. That's it. Been doing this 20 years and most distributors make you chase your own freight. PES just handles it.",
    rating: 5,
    image: "/images/person-michael.jpg",
  },
  {
    name: "Sarah Martinez",
    company: "Lone Star Contractors",
    location: "Austin, TX",
    quote: "Switched about a year ago. Pricing is fair, the stuff shows up when they say it will, and I don't have to call three people to get a straight answer. I just wish they had a Texas branch.",
    rating: 4,
    image: "/images/person-sarah.jpg",
  },
  {
    name: "David Kim, PMP",
    company: "Elevate Property Group",
    location: "Denver, CO",
    quote: "I manage 200+ units. I need one breaker or a case of 48 lamps, no minimums, no upsell games. PES gets that. The reorder process is dead simple too.",
    rating: 5,
    image: "/images/person-david.jpg",
  },
]

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "lg" }) {
  const cls = size === "lg" ? "h-5 w-5" : "h-4 w-4"
  return (
    <div className="flex items-center gap-0.5" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`${cls} ${i < rating ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
      ))}
    </div>
  )
}

export function Testimonials() {
  return (
    <section className="bg-muted/30" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-10 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h2 id="reviews-heading" className="text-2xl font-bold text-foreground">People who build things buy from PES.</h2>
            <p className="mt-1 text-sm text-muted-foreground">Electricians, GCs, property managers, and facility teams across the U.S.</p>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-6 py-4">
            <StarRating rating={5} size="lg" />
            <span className="text-2xl font-bold text-foreground">4.9 / 5</span>
            <a href="https://www.google.com/search?q=PES+Supply+reviews" target="_blank" rel="noopener noreferrer" className="text-xs text-muted-foreground hover:text-primary hover:underline">
              2,400+ verified reviews
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div key={review.name} className="flex flex-col rounded-xl border border-border bg-card p-6">
              <div className="mb-4">
                <StarRating rating={review.rating} />
              </div>
              <blockquote className="mb-5 flex-1 text-sm leading-relaxed text-card-foreground/90">
                {`\u201C${review.quote}\u201D`}
              </blockquote>
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                  <Image src={review.image} alt={review.name} fill className="object-cover" sizes="44px" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-card-foreground">{review.name}</div>
                  <div className="text-xs text-muted-foreground">{review.company} {"\u00B7"} {review.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">Questions? Talk to a real person on our Louisville team.</p>
          <Button variant="outline" className="gap-2 text-primary" asChild>
            <a href="tel:8888760007"><Phone className="h-4 w-4" /> (888) 876-0007</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
