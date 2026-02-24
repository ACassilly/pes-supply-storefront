import Image from "next/image"
import { Star } from "lucide-react"

const reviews = [
  {
    name: "Michael Chen, PE",
    location: "Seattle, WA",
    company: "Pacific NW Electrical",
    stat: "200+ Jobs/Year",
    quote:
      "We buy everything from breakers to wire to LED fixtures through Portlandia Electric. Having 40,000 products from one source means fewer vendors and less headache. Their team in Portland actually picks up the phone.",
    rating: 5,
    image: "/images/person-michael.jpg",
  },
  {
    name: "Sarah Martinez",
    location: "Austin, TX",
    company: "Lone Star Contractors",
    stat: "15-Person Crew",
    quote:
      "Switched from our old distributor last year and haven't looked back. Same-day shipping is real, the pricing is competitive, and they carry the exact brands my guys want on the truck. DeWalt, Southwire, Square D -- all in one order.",
    rating: 5,
    image: "/images/person-sarah.jpg",
  },
  {
    name: "David Kim, PMP",
    location: "Denver, CO",
    company: "Elevate Property Group",
    stat: "120 Units Managed",
    quote:
      "As a property manager, I need everything from replacement breakers to HVAC parts to bulk LED lamps. Portlandia Electric lets me order exactly what I need -- one fixture or a case of 48 -- without minimum order games.",
    rating: 5,
    image: "/images/person-david.jpg",
  },
]

export function Testimonials() {
  return (
    <section className="bg-muted/30" aria-label="Customer reviews">
      <div className="mx-auto max-w-7xl px-4 py-14">
        <div className="mb-10 text-center">
          <h2 className="text-2xl font-bold text-foreground">
            What Our Customers Say
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground leading-relaxed">
            Electricians, contractors, property managers, and builders who rely
            on Portlandia Electric Supply every day
          </p>
          {/* Aggregate rating */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className="h-4 w-4 fill-accent text-accent"
                />
              ))}
            </div>
            <span className="text-sm font-semibold text-foreground">4.9/5</span>
            <span className="text-xs text-muted-foreground">
              from 2,400+ verified reviews
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="mb-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < review.rating
                        ? "fill-accent text-accent"
                        : "fill-muted text-muted"
                    }`}
                  />
                ))}
                <span className="ml-1 rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                  Verified Buyer
                </span>
              </div>

              {/* Quote */}
              <p className="mb-5 flex-1 text-sm text-card-foreground/90 leading-relaxed">
                &ldquo;{review.quote}&rdquo;
              </p>

              {/* Person */}
              <div className="flex items-center gap-3 border-t border-border pt-4">
                <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-primary/20">
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
                    {review.company}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {review.location}
                  </div>
                </div>
                <span className="shrink-0 rounded-md bg-primary/10 px-2 py-1 text-[10px] font-bold text-primary">
                  {review.stat}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
