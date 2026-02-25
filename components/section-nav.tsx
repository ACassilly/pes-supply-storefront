"use client"

import { useState, useEffect } from "react"

const sections = [
  { id: "hero", label: "Top" },
  { id: "promos", label: "Promos" },
  { id: "departments", label: "Departments" },
  { id: "new-arrivals", label: "New" },
  { id: "curated", label: "Products" },
  { id: "shipping-map", label: "Shipping" },
  { id: "blog", label: "Blog" },
  { id: "reviews", label: "Reviews" },
]

export function SectionNav() {
  const [active, setActive] = useState("hero")
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 400)

      const offsets = sections.map((s) => {
        const el = document.getElementById(s.id)
        return { id: s.id, top: el ? el.getBoundingClientRect().top : 99999 }
      })

      // find the section closest to the top of the viewport
      const current = offsets.reduce((best, s) => {
        if (s.top <= 120 && s.top > best.top) return s
        return best
      }, { id: "hero", top: -99999 })

      setActive(current.id)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <nav className="fixed bottom-4 left-1/2 z-40 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-card/95 px-2 py-1.5 shadow-lg backdrop-blur-sm md:flex" aria-label="Page sections">
      {sections.map((s) => (
        <button
          key={s.id}
          onClick={() => {
            const el = document.getElementById(s.id)
            if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
          }}
          className={`rounded-full px-3 py-1 text-[11px] font-medium transition-colors ${active === s.id ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}
        >
          {s.label}
        </button>
      ))}
    </nav>
  )
}
