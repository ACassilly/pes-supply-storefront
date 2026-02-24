"use client"

import { useState, useEffect } from "react"
import { ArrowRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

function useCountdown(targetDate: Date) {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(targetDate))

  function getTimeLeft(target: Date) {
    const diff = target.getTime() - Date.now()
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / (1000 * 60)) % 60),
      seconds: Math.floor((diff / 1000) % 60),
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  return timeLeft
}

export function DealsBanner() {
  const endDate = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
  const { days, hours, minutes, seconds } = useCountdown(endDate)

  return (
    <section className="border-y border-border bg-foreground" aria-label="Flash deals">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-10 text-center md:flex-row md:text-left">
        <div className="flex-1">
          <div className="mb-2 flex items-center justify-center gap-2 md:justify-start">
            <Clock className="h-5 w-5 text-accent" />
            <span className="text-sm font-semibold uppercase tracking-wider text-accent">
              Flash Sale - Limited Time
            </span>
          </div>
          <h2 className="mb-2 text-pretty text-2xl font-bold text-background md:text-3xl">
            Right-Sized Solar Starts Here
          </h2>
          <p className="text-sm text-background/60 leading-relaxed">
            Save up to 40% on panels, racking, and BOS. Order the exact count you
            need — singles, partial pallets, or full pallets. Shipped jobsite ready.
          </p>
        </div>

        {/* Countdown */}
        <div className="flex gap-3">
          {[
            { label: "Days", value: days },
            { label: "Hours", value: hours },
            { label: "Min", value: minutes },
            { label: "Sec", value: seconds },
          ].map((unit) => (
            <div key={unit.label} className="flex flex-col items-center">
              <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-background/10 text-2xl font-bold text-background tabular-nums md:h-16 md:w-16 md:text-3xl">
                {String(unit.value).padStart(2, "0")}
              </div>
              <span className="mt-1 text-[10px] font-medium uppercase text-background/50">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        <Button
          size="lg"
          className="gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
        >
          Shop Deals
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </section>
  )
}
