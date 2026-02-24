import { Zap, Phone, Mail, MapPin } from "lucide-react"

const footerLinks = [
  {
    title: "Products",
    links: [
      "Solar Panels",
      "Inverters",
      "Batteries & ESS",
      "Generators",
      "EV Charging",
      "Electrical Supplies",
      "Tools & Hardware",
      "Racking & Mounting",
    ],
  },
  {
    title: "Solutions",
    links: [
      "Residential Solar",
      "Commercial Projects",
      "Off-Grid Systems",
      "Solar Kits",
      "System Design",
      "Bulk Orders",
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
      "About VoltMax",
      "Careers",
      "Press",
      "Contact Us",
      "Support",
      "Pro Network",
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
            <a href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Zap className="h-5 w-5 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-background">
                  Volt<span className="text-primary">Max</span>
                </span>
                <span className="block text-[10px] font-medium uppercase tracking-widest text-background/50">
                  Supply Co.
                </span>
              </div>
            </a>
            <p className="mb-4 max-w-xs text-sm text-background/50 leading-relaxed">
              America&apos;s trusted source for solar panels, electrical equipment, generators,
              and industrial supplies. Wholesale pricing with expert support.
            </p>
            <div className="flex flex-col gap-2 text-xs text-background/50">
              <a href="tel:8888760007" className="flex items-center gap-2 hover:text-primary">
                <Phone className="h-3.5 w-3.5" /> (888) 876-0007
              </a>
              <a href="mailto:support@voltmax.supply" className="flex items-center gap-2 hover:text-primary">
                <Mail className="h-3.5 w-3.5" /> support@voltmax.supply
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="h-3.5 w-3.5" /> 12+ Distribution Centers
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
            &copy; 2026 VoltMax Supply Co. All rights reserved.
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
