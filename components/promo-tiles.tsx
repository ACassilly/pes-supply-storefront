"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const promos = [
  {
    title: "Free Freight Week",
    subtitle: "Orders $999+",
    href: "/departments/electrical",
    image: "/images/hero-commercial.jpg",
    color: "from-foreground/90 to-foreground/40",
  },
  {
    title: "Solar Bundles",
    subtitle: "Panel + Inverter Kits",
    href: "/departments/solar",
    image: "/images/product-solar-panel.jpg",
    color: "from-foreground/85 to-foreground/35",
  },
  {
    title: "EV Charger Sale",
    subtitle: "Up to 15% Off",
    href: "/departments/ev-charging",
    image: "/images/product-ev-charger.jpg",
    color: "from-foreground/90 to-foreground/35",
  },
  {
    title: "New: MRCOOL",
    subtitle: "Ductless Mini Splits",
    href: "/departments/hvac",
    image: "/images/cat-hvac.jpg",
    color: "from-foreground/85 to-foreground/40",
  },
  {
    title: "Bulk Wire Deals",
    subtitle: "Pallet Pricing",
    href: "/departments/electrical",
    image: "/images/cat-electrical.jpg",
    color: "from-foreground/90 to-foreground/45",
  },
  {
    title: "Clearance",
    subtitle: "While Supplies Last",
    href: "/departments",
    image: "/images/cat-generators.jpg",
    color: "from-foreground/95 to-foreground/40",
  },
]

export function PromoTiles() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  function checkScroll() {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 4)
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 4)
  }

  useEffect(() => {
    checkScroll()
    const el = scrollRef.current
    if (el) el.addEventListener("scroll", checkScroll, { passive: true })
    return () => { if (el) el.removeEventListener("scroll", checkScroll) }
  }, [])

  function scroll(dir: number) {
    const el = scrollRef.current
    if (!el) return
    el.scrollBy({ left: dir * 280, behavior: "smooth" })
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6" aria-label="Current promotions">
      <div className="relative">
        {canScrollLeft && (
          <button
            onClick={() => scroll(-1)}
            className="absolute -left-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md transition-colors hover:bg-muted"
            aria-label="Scroll promotions left"
          >
            <ChevronLeft className="h-4 w-4 text-foreground" />
          </button>
        )}

        <div
          ref={scrollRef}
          className="scrollbar-none flex gap-3 overflow-x-auto scroll-smooth"
        >
          {promos.map((promo) => (
            <Link
              key={promo.title}
              href={promo.href}
              className="group relative flex h-28 w-56 shrink-0 overflow-hidden rounded-lg border border-border transition-all hover:border-primary/30 hover:shadow-lg sm:h-32 sm:w-64"
            >
              <Image
                src={promo.image}
                alt=""
                fill
                sizes="260px"
                loading="lazy"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${promo.color}`} />
              <div className="relative flex flex-col justify-end p-4">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-white/70">{promo.subtitle}</span>
                <span className="text-sm font-bold text-white sm:text-base">{promo.title}</span>
              </div>
            </Link>
          ))}
        </div>

        {canScrollRight && (
          <button
            onClick={() => scroll(1)}
            className="absolute -right-2 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-card shadow-md transition-colors hover:bg-muted"
            aria-label="Scroll promotions right"
          >
            <ChevronRight className="h-4 w-4 text-foreground" />
          </button>
        )}
      </div>
    </section>
  )
}
