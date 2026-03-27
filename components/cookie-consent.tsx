"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

const CONSENT_KEY = "pes-cookie-consent"

export function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem(CONSENT_KEY)
    if (!consent) {
      // Delay showing banner for better UX
      const timer = setTimeout(() => setVisible(true), 1500)
      return () => clearTimeout(timer)
    }
  }, [])

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "accepted")
    setVisible(false)
  }

  function handleDecline() {
    localStorage.setItem(CONSENT_KEY, "declined")
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card p-4 shadow-lg md:bottom-4 md:left-4 md:right-auto md:max-w-md md:rounded-xl md:border">
      <button
        onClick={handleDecline}
        className="absolute right-3 top-3 rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
      <h3 className="pr-8 text-sm font-bold text-foreground">We value your privacy</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
        We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic. 
        By clicking &quot;Accept&quot;, you consent to our use of cookies.{" "}
        <Link href="/privacy" className="text-primary hover:underline">Learn more</Link>
      </p>
      <div className="mt-4 flex gap-2">
        <Button onClick={handleAccept} size="sm" className="flex-1">
          Accept
        </Button>
        <Button onClick={handleDecline} variant="outline" size="sm" className="flex-1">
          Decline
        </Button>
      </div>
    </div>
  )
}
