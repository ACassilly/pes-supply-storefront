"use client"

import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks = [
  {
    title: "Departments",
    links: [
      { label: "Electrical", href: "#" },
      { label: "Lighting", href: "#" },
      { label: "Solar & Renewables", href: "#" },
      { label: "Tools & Test", href: "#" },
      { label: "HVAC", href: "#" },
      { label: "Plumbing", href: "#" },
      { label: "Safety & PPE", href: "#" },
      { label: "Generators", href: "#" },
    ],
  },
  {
    title: "For Professionals",
    links: [
      { label: "Pro Account", href: "#" },
      { label: "Net-30 Terms", href: "#" },
      { label: "Bulk & Pallet Pricing", href: "#" },
      { label: "Project Quotes", href: "#" },
      { label: "Commercial Sales", href: "#" },
      { label: "Government & BABA", href: "#" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Spec Sheets & Data", href: "#" },
      { label: "Installation Guides", href: "#" },
      { label: "Warranty Info", href: "#" },
      { label: "Return Policy", href: "/returns" },
      { label: "Shipping & Delivery", href: "/shipping" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About PES Supply", href: "/about" },
      { label: "PES Global", href: "#" },
      { label: "Careers", href: "#" },
      { label: "Contact", href: "#" },
      { label: "Support", href: "#" },
    ],
  },
]

const socialLinks = [
  { name: "LinkedIn", href: "#", icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.784 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg> },
  { name: "Facebook", href: "#", icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" /></svg> },
  { name: "YouTube", href: "#", icon: <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" /></svg> },
]

export function SiteFooter() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-foreground text-background/80" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-6">
          {/* Brand column */}
          <div className="col-span-2">
            <a href="/" className="mb-4 inline-block">
              <Image src="/images/pes-logo.png" alt="PES Supply" width={100} height={100} className="h-14 w-auto brightness-0 invert" />
            </a>
            <p className="mb-4 max-w-xs text-sm leading-relaxed text-background/50">
              169 brands, 500+ vendors, 40,000+ products. Shipping nationwide from Louisville, KY.
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
                  {s.icon}
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

        {/* Newsletter */}
        <div className="mt-10 flex flex-col items-center gap-4 border-t border-background/10 pt-8 text-center md:flex-row md:text-left">
          <div className="flex-1">
            <h3 className="text-sm font-semibold text-background">Stay in the loop</h3>
            <p className="mt-0.5 text-xs text-background/50">Product launches, trade pricing, and industry updates.</p>
          </div>
          <form className="flex w-full max-w-sm items-center gap-2" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Email address" className="h-9 min-w-0 flex-1 rounded-md border border-background/20 bg-background/5 px-3 text-xs text-background placeholder:text-background/30 focus:border-primary focus:outline-none" />
            <button type="submit" className="h-9 shrink-0 rounded-md bg-primary px-4 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90">Subscribe</button>
          </form>
        </div>

        {/* Bottom */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 md:flex-row">
          <div className="flex flex-col gap-1 text-xs text-background/40">
            <span>{`\u00A9 ${year} PES Supply (Portlandia Electric Supply, Inc.). All rights reserved.`}</span>
            <span>
              {"PES Supply is a division of "}
              <a href="#" className="font-semibold text-background/60 hover:text-primary">PES Global</a>.
            </span>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-background/40">
            <a href="#" className="hover:text-background">Privacy</a>
            <a href="#" className="hover:text-background">Terms</a>
            <a href="/returns" className="hover:text-background">Returns</a>
            <a href="/shipping" className="hover:text-background">Shipping</a>
            <a href="#" className="hover:text-background">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
