import { Star, Quote } from "lucide-react"

const reviews = [
  {
    name: "Michael Chen, PE",
    location: "Seattle, WA",
    company: "Pacific Solar Engineering",
    stat: "15+ MW Commercial Installations",
    quote:
      "VoltMax has been our primary supplier for commercial solar projects throughout the Pacific Northwest. Their technical support and consistent product availability have been instrumental in completing our installations this year.",
    rating: 5,
  },
  {
    name: "Sarah Martinez",
    location: "Portland, OR",
    company: "Northwest Solar Solutions",
    stat: "500+ Residential Installations",
    quote:
      "We've partnered with VoltMax for over 4 years on residential solar installations. Their inventory management and same-day shipping help us maintain project schedules and customer satisfaction.",
    rating: 5,
  },
  {
    name: "David Kim, PMP",
    location: "Denver, CO",
    company: "Green Energy Development",
    stat: "2.8MW Municipal Solar Project",
    quote:
      "Their engineering team provided critical support during the permitting process for our municipal solar project. The technical documentation and compliance assistance made the difference in meeting our timeline.",
    rating: 5,
  },
]

export function Testimonials() {
  return (
    <section className="bg-muted/30" aria-label="Customer reviews">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-foreground">Trusted by Contractors Nationwide</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Real feedback from professionals who build with our equipment
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {reviews.map((review) => (
            <div
              key={review.name}
              className="flex flex-col rounded-lg border border-border bg-card p-6"
            >
              <div className="mb-3 flex items-center gap-1">
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
              </div>
              <Quote className="mb-2 h-6 w-6 text-primary/30" />
              <p className="mb-4 flex-1 text-sm text-card-foreground leading-relaxed">
                {review.quote}
              </p>
              <div className="border-t border-border pt-4">
                <div className="text-sm font-semibold text-card-foreground">
                  {review.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {review.location} &middot; {review.company}
                </div>
                <div className="mt-1 text-xs font-medium text-primary">{review.stat}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
