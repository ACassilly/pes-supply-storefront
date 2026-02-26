"use client"

import { useState } from "react"
import { Star, ChevronLeft, ChevronRight, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

const reviews = [
  {
    name: "Michael Chen, PE",
    location: "Seattle, Washington",
    quote: "I call, they pick up. I order, it ships. That's it. Been doing this 20 years and most distributors make you chase your own freight. PES just handles it.",
    rating: 5,
  },
  {
    name: "Sarah Martinez",
    location: "Austin, Texas",
    quote: "Switched about a year ago. Pricing is fair, the stuff shows up when they say it will, and I don't have to call three people to get a straight answer.",
    rating: 4,
  },
  {
    name: "David Kim, PMP",
    location: "Denver, Colorado",
    quote: "I manage 200+ units. I need one breaker or a case of 48 lamps, no minimums, no upsell games. PES gets that. The reorder process is dead simple too.",
    rating: 5,
  },
  {
    name: "James Whitfield",
    location: "Nashville, Tennessee",
    quote: "Same-day processing is real. Ordered a panel at 11 AM, it shipped by 1 PM. Showed up next morning. PES doesn't mess around.",
    rating: 5,
  },
  {
    name: "Linda Tran",
    location: "Phoenix, Arizona",
    quote: "The solar panel kits came exactly as described, well packaged, and the price beat every quote I got locally. Will absolutely order again.",
    rating: 4,
  },
  {
    name: "Robert Egan",
    location: "Charlotte, North Carolina",
    quote: "Net-30 terms without jumping through hoops. My rep actually knows my account. It's like having a local counter without the drive.",
    rating: 5,
  },
]

function BigStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center justify-center gap-1" role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-6 w-6 ${i < rating ? "fill-accent text-accent" : "fill-muted text-muted"}`} />
      ))}
    </div>
  )
}

export function Testimonials() {
  const pageSize = 3
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(reviews.length / pageSize)
  const visible = reviews.slice(page * pageSize, page * pageSize + pageSize)

  return (
    <section className="bg-muted/30 py-10 md:py-14" aria-labelledby="reviews-heading">
      <div className="mx-auto max-w-7xl px-4">
        <h2 id="reviews-heading" className="mb-8 text-center text-xl font-bold text-foreground md:text-2xl">
          Trust in our customers' experiences
        </h2>

        <div className="relative">
          {/* Prev arrow */}
          {totalPages > 1 && (
            <button
              onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)}
              className="absolute -left-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-2 shadow-md hover:bg-muted md:flex"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5 text-foreground" />
            </button>
          )}

          <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:px-10">
            {visible.map((review) => (
              <div key={review.name} className="flex flex-col items-center rounded-xl border border-border bg-card px-6 py-8 text-center">
                <BigStars rating={review.rating} />
                <blockquote className="mt-5 flex-1 text-sm leading-relaxed text-card-foreground">
                  {`\u201C${review.quote}\u201D`}
                </blockquote>
                <p className="mt-5 text-sm font-medium text-muted-foreground">
                  {"- "}{review.name}{", "}{review.location}{"."}
                </p>
              </div>
            ))}
          </div>

          {/* Next arrow */}
          {totalPages > 1 && (
            <button
              onClick={() => setPage((p) => (p + 1) % totalPages)}
              className="absolute -right-2 top-1/2 z-10 hidden -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card p-2 shadow-md hover:bg-muted md:flex"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5 text-foreground" />
            </button>
          )}
        </div>

        {/* Mobile pagination */}
        {totalPages > 1 && (
          <div className="mt-4 flex items-center justify-center gap-2 md:hidden">
            <button onClick={() => setPage((p) => (p - 1 + totalPages) % totalPages)} className="rounded-full border border-border p-1.5" aria-label="Previous reviews">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-xs text-muted-foreground">{page + 1} / {totalPages}</span>
            <button onClick={() => setPage((p) => (p + 1) % totalPages)} className="rounded-full border border-border p-1.5" aria-label="Next reviews">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        )}

        <div className="mt-8 flex flex-col items-center gap-3 text-center">
          <p className="text-sm text-muted-foreground">Questions? Talk to a real person on our team.</p>
          <Button variant="outline" className="gap-2 text-primary" asChild>
            <a href="tel:8888760007"><Phone className="h-4 w-4" /> (888) 876-0007</a>
          </Button>
        </div>
      </div>
    </section>
  )
}
