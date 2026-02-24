import Image from "next/image"
import { Phone, Mail, MapPin } from "lucide-react"

const footerLinks = [
  {
    title: "Departments",
    links: [
      "Lighting & Electrical",
      "Solar & Renewables",
      "Tools & Equipment",
      "HVAC & Ventilation",
      "Plumbing",
      "Hardware & Fasteners",
      "Building Materials",
      "Safety & PPE",
    ],
  },
  {
    title: "For Professionals",
    links: [
      "Pro Account",
      "Net-30 Terms",
      "Bulk & Pallet Pricing",
      "Project Quotes",
      "Commercial Sales",
      "Government & BABA",
    ],
  },
  {
    title: "Resources",
    links: [
      "Spec Sheets & Data",
      "Installation Guides",
      "Warranty Info",
      "Return Policy",
      "Shipping & Delivery",
      "Blog",
    ],
  },
  {
    title: "Company",
    links: [
      "About PES Supply",
      "PES Global",
      "Careers",
      "Contact",
      "Support",
      "Press",
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
            <a href="/" className="mb-4 flex items-center gap-3">
              <Image
                src="/images/pes-logo.jpg"
                alt="PES Supply"
                width={44}
                height={44}
                className="h-11 w-11 rounded-lg object-cover"
              />
              <div>
                <span className="text-[15px] font-bold leading-tight text-background">
                  PES Supply
                </span>
                <span className="block text-[10px] font-medium text-background/50">
                  A PES Global Company
                </span>
              </div>
            </a>
            <p className="mb-4 max-w-xs text-sm text-background/50 leading-relaxed">
              40,000+ products across lighting, electrical, solar, tools, HVAC,
              plumbing, and more. In stock and shipping from U.S. warehouses.
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-xs text-background/50 transition-colors hover:text-primary"
                    >
                      {link}
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
            <a href="#" className="hover:text-background">Returns</a>
            <a href="#" className="hover:text-background">Shipping</a>
            <a href="#" className="hover:text-background">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
