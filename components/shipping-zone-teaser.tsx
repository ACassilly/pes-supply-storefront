import Link from "next/link"
import { ArrowRight, MapPin, Clock, Truck } from "lucide-react"

/* Simplified US map paths grouped by shipping zone from Louisville, KY */
const zone1 = "M680,180 L720,175 730,200 725,230 690,235 665,220 660,195Z M635,210 L665,205 670,235 690,240 685,270 650,275 630,250 625,225Z M590,165 L635,160 640,190 635,215 620,225 585,220 580,195 585,175Z M720,230 L755,225 760,255 730,270 695,265 690,240Z M640,245 L685,240 690,270 680,295 645,290 635,265Z"
const zone2 = "M555,140 L590,135 595,165 585,195 555,200 540,180 545,155Z M510,160 L545,155 555,200 540,225 510,220 500,195 505,175Z M595,230 L635,225 640,250 635,275 600,280 590,255Z M730,270 L770,265 780,290 755,310 725,305 720,280Z M680,295 L720,290 725,310 710,330 680,325 670,310Z M760,195 L790,190 795,220 785,245 760,250 755,225Z M790,215 L820,210 830,235 820,260 795,255 790,230Z M820,235 L850,230 855,255 840,270 820,265Z M640,285 L680,280 685,305 670,325 640,320 635,300Z M600,280 L640,275 645,300 640,320 610,325 600,305Z"
const zone3 = "M330,115 L380,110 390,140 380,170 340,175 320,155 325,130Z M380,140 L420,135 430,160 425,185 390,190 380,170Z M420,135 L460,130 470,155 465,180 430,185 425,160Z M460,130 L510,125 520,155 510,180 470,185 465,160Z M255,150 L305,145 315,170 310,195 270,200 255,180Z M305,145 L340,140 350,170 340,200 310,200 305,170Z M340,175 L380,170 390,195 385,220 350,225 340,205Z M380,195 L425,190 435,215 425,240 390,240 385,220Z M425,215 L465,210 475,235 465,260 435,260 425,240Z M465,210 L510,205 520,230 510,255 475,255 465,235Z M680,325 L720,320 730,345 710,365 680,360 670,340Z M640,320 L680,315 685,340 670,360 640,355 635,335Z M600,305 L640,300 645,325 640,345 610,350 600,325Z M560,230 L595,225 600,255 590,280 560,280 550,260Z M510,220 L555,215 560,245 550,270 515,270 510,245Z M255,180 L305,175 310,200 300,225 265,225 255,205Z M210,165 L260,160 265,185 255,210 220,210 210,190Z M170,185 L210,180 215,205 205,230 175,230 170,210Z M770,290 L810,285 820,310 800,330 770,325 765,305Z M810,310 L840,305 850,330 835,350 810,340Z"

export function ShippingZoneTeaser() {
  return (
    <section className="py-6 md:py-8">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="mb-1 text-center text-xl font-bold text-foreground md:text-2xl">Estimated Shipping Times</h2>
        <p className="mb-1 text-center text-xs font-bold uppercase tracking-widest text-primary">Portlandia Logistics</p>
        <p className="mb-6 text-center text-sm text-muted-foreground">
          In-house fulfillment from our Louisville, KY warehouse. Our team, our trucks, our accountability.
        </p>
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <div className="grid items-center md:grid-cols-[1.3fr_1fr]">
            {/* Map */}
            <div className="relative bg-muted/30 px-4 py-6 md:px-8 md:py-10">
              <svg
                viewBox="120 90 780 300"
                className="mx-auto w-full max-w-[600px]"
                role="img"
                aria-label="US shipping zone map from Louisville, KY showing 1-day, 2-day, and 3-5 day delivery zones"
              >
                {/* Zone 3: 3-5 days - lightest */}
                <path d={zone3} fill="hsl(var(--primary) / 0.2)" stroke="hsl(var(--primary) / 0.3)" strokeWidth="1" />
                {/* Zone 2: 2 days - medium */}
                <path d={zone2} fill="hsl(var(--primary) / 0.45)" stroke="hsl(var(--primary) / 0.5)" strokeWidth="1" />
                {/* Zone 1: 1 day - darkest */}
                <path d={zone1} fill="hsl(var(--primary) / 0.8)" stroke="hsl(var(--primary))" strokeWidth="1.5" />

                {/* Louisville pin */}
                <circle cx="680" cy="250" r="6" fill="hsl(var(--accent))" stroke="hsl(var(--card))" strokeWidth="2" />
                <text x="680" y="245" textAnchor="middle" fontSize="8" fontWeight="700" fill="hsl(var(--foreground))" dy="-10">Louisville, KY</text>
              </svg>

              {/* Legend */}
              <div className="mt-4 flex items-center justify-center gap-5">
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-3.5 w-3.5 rounded-sm bg-primary/80" />
                  <span className="text-xs font-semibold text-foreground">1 day</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-3.5 w-3.5 rounded-sm bg-primary/45" />
                  <span className="text-xs font-semibold text-foreground">2 days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-3.5 w-3.5 rounded-sm bg-primary/20" />
                  <span className="text-xs font-semibold text-foreground">3-5 days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="inline-block h-3 w-3 rounded-full bg-accent" />
                  <span className="text-xs text-muted-foreground">Fulfillment Center</span>
                </div>
              </div>
            </div>

            {/* Right: Details + CTA */}
            <div className="flex flex-col gap-4 px-6 py-6 md:px-8">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-primary" />
                <h3 className="text-lg font-bold text-foreground">Portlandia Logistics</h3>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                PES{"'"}s in-house logistics arm picks, packs, and ships every order. No 3PL middlemen. When something goes wrong, our team in Louisville fixes it -- not a call center.
              </p>
              <ul className="flex flex-col gap-2.5">
                <li className="flex items-center gap-2.5 text-sm text-card-foreground">
                  <Clock className="h-4 w-4 shrink-0 text-primary" />
                  <span>Order by 2 PM ET for same-day dispatch</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-card-foreground">
                  <Truck className="h-4 w-4 shrink-0 text-primary" />
                  <span>Free freight on orders $999+</span>
                </li>
                <li className="flex items-center gap-2.5 text-sm text-card-foreground">
                  <MapPin className="h-4 w-4 shrink-0 text-primary" />
                  <span>1-2 day ground to 60% of the US</span>
                </li>
              </ul>
              <Link href="/shipping" className="mt-2 flex items-center gap-1 text-sm font-semibold text-primary hover:underline">
                View full shipping details <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
