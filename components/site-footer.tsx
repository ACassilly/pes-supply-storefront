import Image from "next/image"

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
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About PES Supply", href: "/about" },
      { label: "PES Global", href: "/about" },
      { label: "Careers", href: "/about" },
      { label: "Contact", href: "/contact" },
      { label: "Brands", href: "/brands" },
    ],
  },
]

const socialLinks = [
  { name: "LinkedIn", href: "#", image: "/images/icon-linkedin.jpg" },
  { name: "Facebook", href: "#", image: "/images/icon-facebook.jpg" },
  { name: "YouTube", href: "#", image: "/images/icon-youtube.jpg" },
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
              <a href="tel:8888760007" className="flex items-center gap-2 hover:text-primary"><Image src="/images/icon-phone.jpg" alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain brightness-0 invert opacity-50" /> (888) 876-0007</a>
              <a href="tel:5027900600" className="flex items-center gap-2 hover:text-primary"><Image src="/images/icon-phone.jpg" alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain brightness-0 invert opacity-50" /> (502) 790-0600</a>
              <a href="mailto:connect@portlandiaelectric.supply" className="flex items-center gap-2 hover:text-primary"><Image src="/images/icon-email.jpg" alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain brightness-0 invert opacity-50" /> connect@portlandiaelectric.supply</a>
              <a href="https://maps.google.com/?q=1507+Portland+Ave+Louisville+KY+40203" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                <Image src="/images/icon-mappin.jpg" alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain brightness-0 invert opacity-50" /> 1507 Portland Ave, Louisville, KY 40203
              </a>
            </div>
            <div className="mt-4 flex items-center gap-3">
              {socialLinks.map((s) => (
                <a key={s.name} href={s.href} className="relative flex h-8 w-8 items-center justify-center overflow-hidden rounded-md bg-background/10 transition-colors hover:bg-primary" aria-label={s.name}>
                  <Image src={s.image} alt={s.name} width={16} height={16} className="h-4 w-4 object-contain brightness-0 invert opacity-50 transition-opacity hover:opacity-100" />
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

      {/* Brand stamp */}
      <div className="overflow-hidden border-t border-background/5 bg-foreground py-6">
        <p className="text-center font-sans text-[clamp(2rem,8vw,6rem)] font-black uppercase leading-none tracking-tighter text-background/[0.04]" aria-hidden="true">
          PORTLANDIA
        </p>
      </div>
    </footer>
  )
}
