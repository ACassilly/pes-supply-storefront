import Image from "next/image"
import { Star, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    name: "Michael Chen, PE",
    company: "Pacific NW Electrical",
    location: "Seattle, WA",
    quote:
      "We order breakers, wire, and LED fixtures through PES every week. One vendor for everything means fewer POs and less time chasing shipments. Their Portland team actually picks up the phone.",
    rating: 5,
    image: "/images/person-michael.jpg",
  },
  {
    name: "Sarah Martinez",
    company: "Lone Star Contractors",
    location: "Austin, TX",
    quote:
      "Switched from our old distributor and haven't looked back. Same-day shipping is real, pricing is competitive, and they carry the exact brands my guys want on the truck. DeWalt, Southwire, Square D -- one order.",
    rating: 5,
    image: "/images/person-sarah.jpg",
  },
  {
    name: "David Kim, PMP",
    company: "Elevate Property Group",
    location: "Denver, CO",
    quote:
      "As a property manager I need replacement breakers, HVAC parts, and bulk LED lamps. PES lets me order exactly what I need -- one fixture or a case of 48 -- without minimum order games or upsell nonsense.",
    rating: 5,
    image: "/images/person-david.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="bg-muted/30" aria-label="Customer reviews">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-10 flex flex-col items-center gap-4 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">
              People who build things buy from PES.
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Electricians, GCs, property managers, and facility teams across the U.S.
            </p>
          </div>
          {/* Aggregate */}
          <div className="flex flex-col items-center gap-2 rounded-xl border border-border bg-card px-6 py-4">
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-accent text-accent" />
              ))}
            </div>
            <span className="text-2xl font-bold text-foreground">4.9 / 5</span>
            <span className="text-xs text-muted-foreground">2,400+ reviews on Google & Trustpilot</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex flex-col rounded-xl border border-border bg-card p-6"
            >
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-accent text-accent" />
                ))}
              </div>

              <p className="mb-5 flex-1 text-sm text-card-foreground/90 leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
                  <Image
                    src={review.image}
                    alt={review.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-card-foreground">
                    {review.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {review.company} &middot; {review.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">
            Questions? Talk to a real person on our Portland team.
          </p>
          <Button variant="outline" className="gap-2 text-primary">
            <Phone className="h-4 w-4" />
            (888) 876-0007
          </Button>
        </div>
      </div>
    </section>
  )
}
