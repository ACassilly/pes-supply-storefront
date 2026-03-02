"use client"

import { useRef, useEffect, useState } from "react"
import Link from "next/link"
import { brands } from "@/lib/data"

const marquee = brands.slice(0, 20)

export function PartnerStrip() {
  const ref = useRef<HTMLDivElement>(null)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0.1 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section className="border-b border-border bg-card py-1.5" aria-label="Our Partners">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-4">
        {/* Label */}
        <span className="hidden shrink-0 text-xs font-bold text-foreground md:block">Our Partners</span>
        <div className="h-5 w-px shrink-0 bg-border hidden md:block" />

        {/* Marquee */}
        <div
          ref={ref}
          className="min-w-0 flex-1 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div
            className="flex gap-4"
            style={{
              animation: "scroll 40s linear infinite",
              animationPlayState: visible && !paused ? "running" : "paused",
              width: "max-content",
              willChange: "transform",
            }}
          >
            {[...marquee, ...marquee].map((brand, i) => (
              <Link
                key={`${brand.slug}-${i}`}
                href={`/brands/${brand.slug}`}
                className="flex h-7 shrink-0 items-center rounded border border-border bg-background px-3 transition-colors hover:border-primary/30"
              >
                <span className="whitespace-nowrap text-xs font-bold text-foreground/70">{brand.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
