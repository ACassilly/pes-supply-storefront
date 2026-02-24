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
      "Safety & Workwear",
    ],
  },
  {
    title: "Solutions",
    links: [
      "Contractors & Trades",
      "Commercial Projects",
      "Property Managers",
      "Solar Installers",
      "System Design Help",
      "Bulk & Pallet Orders",
    ],
  },
  {
    title: "Resources",
    links: [
      "Installation Guides",
      "Product Datasheets",
      "Compliance Docs",
      "Warranty Info",
      "Financing Options",
      "Blog & News",
    ],
  },
  {
    title: "Company",
    links: [
      "About Us",
      "Careers",
      "Press",
      "Contact Us",
      "Support",
      "Pro Account",
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
                src="/images/pes-logo.png"
                alt="Portlandia Electric Supply"
                width={44}
                height={44}
                className="h-11 w-11 rounded-lg object-cover"
              />
              <div>
                <span className="text-[15px] font-bold leading-tight text-background">
                  Portlandia Electric
                </span>
                <span className="block text-[10px] font-semibold uppercase tracking-widest text-primary">
                  Supply
                </span>
              </div>
            </a>
            <p className="mb-3 max-w-xs text-sm text-background/50 leading-relaxed">
              40,000+ products across lighting, electrical, solar, tools, HVAC,
              plumbing, and more. In stock and ready to ship from our U.S.
              warehouses.
            </p>
            <div className="mb-4 flex gap-3">
              <div className="rounded-md border border-background/10 px-2.5 py-1.5">
                <div className="text-sm font-bold text-background">40K+</div>
                <div className="text-[9px] text-background/40">Products</div>
              </div>
              <div className="rounded-md border border-background/10 px-2.5 py-1.5">
                <div className="text-sm font-bold text-background">4.9/5</div>
                <div className="text-[9px] text-background/40">Rating</div>
              </div>
              <div className="rounded-md border border-background/10 px-2.5 py-1.5">
                <div className="text-sm font-bold text-background">2,400+</div>
                <div className="text-[9px] text-background/40">Reviews</div>
              </div>
            </div>
            <div className="flex flex-col gap-2 text-xs text-background/50">
              <a href="tel:8888760007" className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-3.5 w-3.5" /> (888) 876-0007
              </a>
              <a href="mailto:sales@portlandiaelectric.com" className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-3.5 w-3.5" /> sales@portlandiaelectric.com
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> Portland, OR
              </span>
            </div>
          </div>

          {/* Link columns */}
          {footerLinks.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-sm font-semibold text-background">{col.title}</h3>
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

        {/* Bottom bar */}
        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-background/10 pt-6 md:flex-row">
          <p className="text-xs text-background/40">
            &copy; 2026 Portlandia Electric Supply. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-xs text-background/40">
            <a href="#" className="hover:text-background">Privacy Policy</a>
            <a href="#" className="hover:text-background">Terms of Service</a>
            <a href="#" className="hover:text-background">Return Policy</a>
            <a href="#" className="hover:text-background">Shipping Info</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
