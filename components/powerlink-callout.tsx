"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Zap, Users, MapPin, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: Users, value: "Installer Network", label: "Find work through PES" },
  { icon: MapPin, value: "Nationwide", label: "Leads across all 50 states" },
  { icon: TrendingUp, value: "Free to Join", label: "No fees, no contracts" },
]

export function PowerLinkCallout() {
  return (
    <section className="border-y border-accent/20 bg-accent/5 py-8 md:py-10" aria-label="Power Link Installer Network">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
          {/* Left: branding + pitch */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent/10 px-3 py-1">
              <Zap className="h-3.5 w-3.5 text-accent" />
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Power Link</span>
            </div>
            <h2 className="text-xl font-bold text-foreground md:text-2xl">
              Your material supplier that sends you work.
            </h2>
            <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
              Power Link is our contractor directory. When a homeowner or property manager needs an electrician, solar installer, or plumber, they search PES by ZIP code -- and we send them to you.
              No referral fee. No contract. No catch.
            </p>
            <div className="mt-4 flex flex-wrap justify-center gap-5 md:justify-start">
              {stats.map((s) => (
                <div key={s.label} className="flex items-center gap-2">
                  <s.icon className="h-4 w-4 text-accent" />
                  <div>
                    <span className="block text-xs font-bold text-foreground">{s.value}</span>
                    <span className="block text-[10px] text-muted-foreground">{s.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Photo + CTA */}
          <div className="flex shrink-0 flex-col items-center gap-3">
            <div className="relative h-48 w-64 overflow-hidden rounded-xl border border-accent/20 shadow-sm md:h-56 md:w-72">
              <Image src="/images/powerlink-installer.jpg" alt="Installer meeting a homeowner through Power Link" fill className="object-cover" sizes="288px" loading="lazy" />
            </div>
            <div className="text-center">
              <Button asChild className="gap-1.5 bg-accent text-accent-foreground hover:bg-accent/90">
                <Link href="/powerlink">Join Power Link <ArrowRight className="h-3.5 w-3.5" /></Link>
              </Button>
              <p className="mt-2 text-xs text-muted-foreground">Licensed contractors only. Free to join.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
