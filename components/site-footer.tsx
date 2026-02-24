import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks = [
  {
    title: "Departments",
    links: [
      { label: "Lighting & Electrical", href: "#" },
      { label: "Solar & Renewables", href: "#" },
      { label: "Tools & Equipment", href: "#" },
      { label: "HVAC & Ventilation", href: "#" },
      { label: "Plumbing", href: "#" },
      { label: "Hardware & Fasteners", href: "#" },
      { label: "Building Materials", href: "#" },
      { label: "Safety & PPE", href: "#" },
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
      { label: "Blog", href: "#" },
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
      { label: "Press", href: "#" },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="bg-foreground text-background/80" aria-label="Site footer">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-6">
          {/* Brand */}
          <div className="col-span-2">
            <a href="/" className="mb-4 inline-block">
              <Image
                src="/images/pes-logo.png"
                alt="PES Supply"
                width={100}
                height={100}
                className="h-14 w-auto brightness-0 invert"
              />
            </a>
            <p className="mb-4 max-w-xs text-sm text-background/50 leading-relaxed">
              169 brands, 500+ vendors, 40,000+ products across energy, electrical, solar, tools, HVAC,
              plumbing, and more. Shipping nationwide from Louisville, KY.
            </p>
            <div className="flex flex-col gap-2 text-xs text-background/50">
              <a
                href="tel:8888760007"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Phone className="h-3.5 w-3.5" /> (888) 876-0007
              </a>
              <a
                href="tel:5027900600"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Phone className="h-3.5 w-3.5" /> (502) 790-0600
              </a>
              <a
                href="mailto:connect@portlandiaelectric.supply"
                className="flex items-center gap-2 hover:text-primary"
              >
                <Mail className="h-3.5 w-3.5" /> connect@portlandiaelectric.supply
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> 1507 Portland Ave, Louisville, KY 40203
              </span>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-background">
                {col.title}
              </h3>
              <ul className="flex flex-col gap-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-background/50 transition-colors hover:text-primary"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 md:flex-row">
          <div className="flex flex-col gap-1 text-xs text-background/40">
            <span>
              &copy; 2026 Portlandia Electric Supply, Inc. All rights reserved.
            </span>
            <span>
              PES Supply is a division of{" "}
              <a href="#" className="font-semibold text-background/60 hover:text-primary">
                PES Global
              </a>
              .
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
