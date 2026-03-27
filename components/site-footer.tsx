"use client"

import { useState } from "react"
import Image from "next/image"
import { Phone, Mail, MapPin, ArrowRight, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

const socialLinks = [
  { name: "Facebook", href: "https://facebook.com/portlandiaelectric", path: "M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" },
  { name: "Instagram", href: "https://instagram.com/portlandiaelectric", path: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.986.01-4.04.058-.976.045-1.505.207-1.858.344-.466.182-.8.398-1.15.748-.35.35-.566.684-.748 1.15-.137.353-.3.882-.344 1.857-.048 1.055-.058 1.37-.058 4.041 0 2.67.01 2.986.058 4.04.045.976.207 1.505.344 1.858.182.466.399.8.748 1.15.35.35.684.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058 2.67 0 2.987-.01 4.04-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.684.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041 0-2.67-.01-2.986-.058-4.04-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.055-.048-1.37-.058-4.041-.058zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.671a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z" },
  { name: "LinkedIn", href: "https://linkedin.com/company/portlandia-electric-supply", path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" },
  { name: "YouTube", href: "https://youtube.com/@portlandiaelectric", path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" },
]

const footerLinks = [
  {
    title: "Departments",
    links: [
      { label: "Electrical", href: "/departments/electrical" },
      { label: "Lighting", href: "/departments/lighting" },
      { label: "Solar & Renewables", href: "/departments/solar" },
      { label: "Tools & Test", href: "/departments/tools" },
      { label: "HVAC", href: "/departments/hvac" },
      { label: "Plumbing", href: "/departments/plumbing" },
      { label: "Safety & PPE", href: "/departments/safety" },
      { label: "Generators", href: "/departments/generators" },
    ],
  },
  {
    title: "For Professionals",
    links: [
      { label: "Pro Account", href: "/pro" },
      { label: "Net-30 Terms", href: "/pro" },
      { label: "Bulk & Pallet Pricing", href: "/bulk" },
      { label: "Project Quotes", href: "/pro" },
      { label: "Commercial Sales", href: "/pro" },
      { label: "Government & BABA", href: "/baba" },
      { label: "Power Link Installers", href: "/powerlink" },
      { label: "Request a Quote", href: "/quote" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Spec Sheets & Data", href: "/departments" },
      { label: "Installation Guides", href: "/departments" },
      { label: "Warranty Info", href: "/shipping" },
      { label: "Return Policy", href: "/returns" },
      { label: "Shipping & Delivery", href: "/shipping" },
      { label: "Blog & Guides", href: "/blog" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About PES Supply", href: "/about" },
      { label: "PES Global", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
      { label: "Brands", href: "/brands" },
    ],
  },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)
  const [subscribing, setSubscribing] = useState(false)

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return
    setSubscribing(true)
    setTimeout(() => {
      setSubscribing(false)
      setSubscribed(true)
    }, 1000)
  }

  return (
    <footer className="bg-foreground text-background/80" aria-label="Site footer">
      {/* Newsletter Section */}
      <div className="border-b border-background/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-8 md:flex-row">
          <div>
            <h3 className="text-lg font-bold text-background">Get the PES Newsletter</h3>
            <p className="text-sm text-background/50">Pro deals, code updates, and product drops. Monthly. No spam.</p>
          </div>
          {subscribed ? (
            <div className="flex items-center gap-2 text-primary">
              <CheckCircle2 className="h-5 w-5" />
              <span className="text-sm font-semibold">You&apos;re subscribed!</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex w-full max-w-sm gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                required
                className="flex-1 rounded-lg border border-background/20 bg-background/10 px-4 py-2.5 text-sm text-background placeholder:text-background/40 focus:border-primary focus:outline-none"
              />
              <Button type="submit" disabled={subscribing} className="gap-1.5">
                {subscribing ? "..." : "Subscribe"} <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </form>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2">
            <a href="/" className="mb-4 inline-block">
              <Image
                src="/images/pes-logo.png"
                alt="Portlandia Electric Supply"
                width={140}
                height={140}
                className="h-12 w-auto brightness-0 invert"
              />
            </a>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-background/50">
              Wholesale electrical, solar, and building materials from 169 authorized brands. Shipped from 10 stocking locations nationwide. A PES Global company.
            </p>
            <div className="flex flex-col gap-2 text-xs text-background/50">
              <a href="tel:8888760007" className="flex items-center gap-2 hover:text-primary"><Phone className="h-3.5 w-3.5" /> (888) 876-0007</a>
              <a href="tel:5027900600" className="flex items-center gap-2 hover:text-primary"><Phone className="h-3.5 w-3.5" /> (502) 790-0600</a>
              <a href="mailto:connect@portlandiaelectric.supply" className="flex items-center gap-2 hover:text-primary"><Mail className="h-3.5 w-3.5" /> connect@portlandiaelectric.supply</a>
              <a href="https://maps.google.com/?q=1507+Portland+Ave+Louisville+KY+40203" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                <MapPin className="h-3.5 w-3.5" /> 1507 Portland Ave, Louisville, KY 40203
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a key={s.name} href={s.href} className="flex h-8 w-8 items-center justify-center rounded-md bg-background/10 text-background/50 transition-colors hover:bg-primary hover:text-primary-foreground" aria-label={s.name}>
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-background">{col.title}</h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="text-xs text-background/50 transition-colors hover:text-primary">{link.label}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 md:flex-row">
          <div className="flex flex-col gap-1 text-xs text-background/40">
            <span>{`\u00A9 ${year} PES Supply (Portlandia Electric Supply, Inc.). All rights reserved.`}</span>
            <span>
              {"PES Supply is a division of "}
              <a href="/about" className="font-semibold text-background/60 hover:text-primary">PES Global</a>.
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-background/40">
            <a href="/privacy" className="hover:text-background">Privacy</a>
            <a href="/terms" className="hover:text-background">Terms</a>
            <a href="/returns" className="hover:text-background">Returns</a>
            <a href="/shipping" className="hover:text-background">Shipping</a>
            <a href="/accessibility" className="hover:text-background">Accessibility</a>
          </div>
        </div>
      </div>

      {/* Brand stamp */}
      <div className="overflow-hidden border-t border-background/5 bg-foreground py-6">
        <p className="text-center font-sans text-[clamp(2rem,8vw,6rem)] font-black uppercase leading-none tracking-tighter text-background/[0.04]" aria-hidden="true">
          PORTLANDIA
        </p>
      </div>
    </footer>
  )
}
