// Shared product/department/brand data used across all pages

export type ProductType = "part" | "kit"

export interface KitItem {
  name: string
  sku: string
  qty: number
  slug?: string
}

export interface ProductDocument {
  label: string
  url: string
  type: "datasheet" | "install-guide" | "warranty" | "spec-sheet" | "certificate"
}

export interface Product {
  id: number
  slug: string
  name: string
  brand: string
  category: string
  department: string
  price: number
  originalPrice: number
  rating: number
  reviews: number
  image: string
  badge: "In Stock" | "Ships Today" | "Ready to Ship" | "Ships Free" | "Low Stock"
  freeShipping: boolean
  specs: string[]
  sku: string
  description: string
  features: string[]
  shipsFrom: string
  // New fields -- all optional for backward compat
  type?: ProductType
  gallery?: string[]
  includes?: KitItem[]
  documents?: ProductDocument[]
  certifications?: string[]
  weight?: string
  dimensions?: string
  warranty?: string
  leadTime?: string
  minOrderQty?: number
  compatibleWith?: string[]
  upc?: string
  countryOfOrigin?: string
}

export interface Department {
  name: string
  slug: string
  count: string
  image: string
  description: string
  subs: { name: string; slug: string; count: string }[]
}

export interface Brand {
  name: string
  slug: string
  departments: string[]
  productCount: number
  description: string
  website: string
  logo?: string
}

export const departments: Department[] = [
  {
    name: "Electrical", slug: "electrical", count: "12,400+", image: "/images/cat-electrical.jpg",
    description: "Circuit breakers, panels, wire, cable, conduit, fittings, switches, outlets, boxes, enclosures, disconnects, and transformers from Eaton, Siemens, Schneider Electric, Leviton, and more.",
    subs: [
      { name: "Circuit Breakers & Panels", slug: "circuit-breakers-panels", count: "2,800+" },
      { name: "Wire & Cable", slug: "wire-cable", count: "3,200+" },
      { name: "Conduit & Fittings", slug: "conduit-fittings", count: "1,900+" },
      { name: "Switches & Outlets", slug: "switches-outlets", count: "2,100+" },
      { name: "Boxes & Enclosures", slug: "boxes-enclosures", count: "1,400+" },
      { name: "Disconnects & Transformers", slug: "disconnects-transformers", count: "980+" },
    ],
  },
  {
    name: "Lighting", slug: "lighting", count: "5,200+", image: "/images/cat-lighting.jpg",
    description: "LED fixtures, high bay, troffers, emergency and exit lighting, controls, sensors, bulbs, and outdoor area lighting from Lithonia, RAB, Hubbell, Lutron, and more.",
    subs: [
      { name: "LED Fixtures", slug: "led-fixtures", count: "1,800+" },
      { name: "Emergency & Exit Lighting", slug: "emergency-exit", count: "640+" },
      { name: "High Bay & Industrial", slug: "high-bay", count: "720+" },
      { name: "Controls & Sensors", slug: "controls-sensors", count: "580+" },
      { name: "Bulbs & Lamps", slug: "bulbs-lamps", count: "890+" },
      { name: "Outdoor & Area Lighting", slug: "outdoor-area", count: "570+" },
    ],
  },
  {
    name: "Solar & Renewables", slug: "solar", count: "4,200+", image: "/images/product-solar-panel.jpg",
    description: "Solar panels, inverters, optimizers, racking, mounting, batteries, ESS, monitoring, and rapid shutdown from Jinko, Q Cells, Enphase, SolarEdge, Sol-Ark, IronRidge, and more.",
    subs: [
      { name: "Solar Panels", slug: "solar-panels", count: "680+" },
      { name: "Inverters & Optimizers", slug: "inverters-optimizers", count: "420+" },
      { name: "Racking & Mounting", slug: "racking-mounting", count: "1,200+" },
      { name: "Batteries & ESS", slug: "batteries-ess", count: "340+" },
      { name: "Solar Kits", slug: "solar-kits", count: "180+" },
      { name: "Monitoring & Rapid Shutdown", slug: "monitoring-shutdown", count: "380+" },
    ],
  },
  {
    name: "Tools & Test", slug: "tools", count: "6,800+", image: "/images/product-tools.jpg",
    description: "Power tools, hand tools, meters, testers, fish tape, pulling equipment, crimping, termination, and tool storage from Milwaukee, DeWalt, Klein, Fluke, Bosch, and more.",
    subs: [
      { name: "Power Tools", slug: "power-tools", count: "2,100+" },
      { name: "Hand Tools", slug: "hand-tools", count: "1,800+" },
      { name: "Meters & Testers", slug: "meters-testers", count: "920+" },
      { name: "Fish Tape & Pulling", slug: "fish-tape-pulling", count: "480+" },
      { name: "Crimping & Termination", slug: "crimping-termination", count: "640+" },
      { name: "Tool Storage", slug: "tool-storage", count: "860+" },
    ],
  },
  {
    name: "HVAC", slug: "hvac", count: "3,600+", image: "/images/cat-hvac.jpg",
    description: "Mini splits, thermostats, fans, ventilation, heaters, and HVAC parts from MRCOOL, Honeywell, Rheem, and more.",
    subs: [
      { name: "Mini Splits", slug: "mini-splits", count: "420+" },
      { name: "Thermostats", slug: "thermostats", count: "680+" },
      { name: "Fans & Ventilation", slug: "fans-ventilation", count: "920+" },
      { name: "Heaters", slug: "heaters", count: "580+" },
      { name: "HVAC Parts & Accessories", slug: "hvac-parts", count: "1,000+" },
    ],
  },
  {
    name: "Plumbing", slug: "plumbing", count: "2,900+", image: "/images/cat-plumbing.jpg",
    description: "Pipe, fittings, valves, water heaters, pumps, and plumbing tools from SharkBite, Watts, Rheem, and more.",
    subs: [
      { name: "Pipe & Fittings", slug: "pipe-fittings", count: "1,200+" },
      { name: "Valves", slug: "valves", count: "580+" },
      { name: "Water Heaters", slug: "water-heaters", count: "340+" },
      { name: "Pumps", slug: "pumps", count: "420+" },
      { name: "Plumbing Tools", slug: "plumbing-tools", count: "360+" },
    ],
  },
  {
    name: "Generators", slug: "generators", count: "1,400+", image: "/images/cat-generators.jpg",
    description: "Standby, portable, and commercial generators plus transfer switches and maintenance parts from Generac and more.",
    subs: [
      { name: "Standby & Whole-Home", slug: "standby-generators", count: "280+" },
      { name: "Portable", slug: "portable-generators", count: "340+" },
      { name: "Commercial & Industrial", slug: "commercial-generators", count: "180+" },
      { name: "Transfer Switches", slug: "transfer-switches", count: "320+" },
      { name: "Parts & Maintenance", slug: "generator-parts", count: "280+" },
    ],
  },
  {
    name: "EV Charging", slug: "ev-charging", count: "800+", image: "/images/cat-ev.jpg",
    description: "Level 2 residential and commercial chargers, DC fast chargers, cables, connectors, and mounting from Tesla, ChargePoint, and more.",
    subs: [
      { name: "Level 2 Residential", slug: "l2-residential", count: "180+" },
      { name: "Level 2 Commercial", slug: "l2-commercial", count: "220+" },
      { name: "DC Fast Chargers", slug: "dc-fast", count: "120+" },
      { name: "Cables & Connectors", slug: "ev-cables", count: "160+" },
      { name: "Mounting & Pedestals", slug: "ev-mounting", count: "120+" },
    ],
  },
  {
    name: "Safety & PPE", slug: "safety", count: "2,200+", image: "/images/cat-safety.jpg",
    description: "Hard hats, safety glasses, gloves, hi-vis and FR clothing, fall protection, and first aid from 3M, Honeywell, and more.",
    subs: [
      { name: "Hard Hats & Head Protection", slug: "hard-hats", count: "280+" },
      { name: "Safety Glasses & Goggles", slug: "safety-glasses", count: "420+" },
      { name: "Gloves", slug: "gloves", count: "580+" },
      { name: "Hi-Vis & FR Clothing", slug: "hi-vis-fr", count: "460+" },
      { name: "Fall Protection", slug: "fall-protection", count: "280+" },
      { name: "First Aid", slug: "first-aid", count: "180+" },
    ],
  },
  {
    name: "Data & Comm", slug: "datacomm", count: "1,800+", image: "/images/cat-hardware.jpg",
    description: "Structured cabling, racks, enclosures, patch panels, fiber optic, network switches, and cable management.",
    subs: [
      { name: "Structured Cabling", slug: "structured-cabling", count: "520+" },
      { name: "Racks & Enclosures", slug: "racks-enclosures", count: "280+" },
      { name: "Patch Panels", slug: "patch-panels", count: "220+" },
      { name: "Fiber Optic", slug: "fiber-optic", count: "340+" },
      { name: "Network Switches", slug: "network-switches", count: "240+" },
      { name: "Cable Management", slug: "cable-management", count: "200+" },
    ],
  },
]

export const brands: Brand[] = [
  { name: "Eaton", slug: "eaton", departments: ["Electrical"], productCount: 3200, description: "Circuit breakers, panels, transformers, and power distribution equipment.", website: "eaton.com" },
  { name: "Siemens", slug: "siemens", departments: ["Electrical", "HVAC"], productCount: 2800, description: "Electrical distribution, automation, and building technology.", website: "siemens.com" },
  { name: "Schneider Electric", slug: "schneider-electric", departments: ["Electrical", "Solar & Renewables"], productCount: 2400, description: "Square D panels, breakers, switchgear, and energy management.", website: "se.com" },
  { name: "Leviton", slug: "leviton", departments: ["Electrical", "Data & Comm", "Lighting"], productCount: 1800, description: "Wiring devices, lighting controls, and networking solutions.", website: "leviton.com" },
  { name: "Hubbell", slug: "hubbell", departments: ["Electrical", "Lighting"], productCount: 1600, description: "Wiring devices, boxes, fittings, and commercial lighting.", website: "hubbell.com" },
  { name: "Southwire", slug: "southwire", departments: ["Electrical", "Tools & Test"], productCount: 1400, description: "Wire, cable, cord products, and electrical tools.", website: "southwire.com" },
  { name: "Lutron", slug: "lutron", departments: ["Lighting", "Electrical"], productCount: 980, description: "Dimmers, lighting controls, shading solutions, and smart home integration.", website: "lutron.com" },
  { name: "Milwaukee Tool", slug: "milwaukee", departments: ["Tools & Test"], productCount: 2100, description: "M18 and M12 power tools, hand tools, and accessories.", website: "milwaukeetool.com" },
  { name: "DeWalt", slug: "dewalt", departments: ["Tools & Test"], productCount: 1900, description: "20V MAX and FLEXVOLT power tools, hand tools, and accessories.", website: "dewalt.com" },
  { name: "Klein Tools", slug: "klein-tools", departments: ["Tools & Test"], productCount: 1200, description: "Professional-grade hand tools, meters, and test equipment.", website: "kleintools.com" },
  { name: "Fluke", slug: "fluke", departments: ["Tools & Test"], productCount: 680, description: "Digital multimeters, clamp meters, thermal imaging, and test instruments.", website: "fluke.com" },
  { name: "Bosch", slug: "bosch", departments: ["Tools & Test", "HVAC"], productCount: 1100, description: "Power tools, measuring tools, and HVAC components.", website: "boschtools.com" },
  { name: "Honeywell", slug: "honeywell", departments: ["HVAC", "Safety & PPE"], productCount: 1400, description: "Thermostats, HVAC controls, and personal protective equipment.", website: "honeywell.com" },
  { name: "3M", slug: "3m", departments: ["Safety & PPE", "Electrical"], productCount: 980, description: "Safety equipment, electrical tapes, connectors, and abrasives.", website: "3m.com" },
  { name: "Generac", slug: "generac", departments: ["Generators"], productCount: 420, description: "Standby, portable, and commercial generators and transfer switches.", website: "generac.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Generac.webp?v=1714417975" },
  { name: "Rheem", slug: "rheem", departments: ["HVAC", "Plumbing"], productCount: 580, description: "Water heaters, HVAC systems, and plumbing solutions.", website: "rheem.com" },
  { name: "Enphase", slug: "enphase", departments: ["Solar & Renewables"], productCount: 340, description: "Microinverters, batteries, and solar monitoring systems.", website: "enphase.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Enphase.webp?v=1714417975" },
  { name: "SolarEdge", slug: "solaredge", departments: ["Solar & Renewables"], productCount: 280, description: "String inverters, power optimizers, and monitoring platforms.", website: "solaredge.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/SolarEdge.webp?v=1714417976" },
  { name: "Jinko Solar", slug: "jinko", departments: ["Solar & Renewables"], productCount: 120, description: "Tier 1 mono and bifacial solar panels.", website: "jinkosolar.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Jinko_Solar_image_2.png?v=1731948031" },
  { name: "Q Cells", slug: "q-cells", departments: ["Solar & Renewables"], productCount: 140, description: "High-efficiency solar modules and complete solar solutions.", website: "q-cells.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Qcells.png?v=1731277082" },
  { name: "Sol-Ark", slug: "sol-ark", departments: ["Solar & Renewables"], productCount: 60, description: "Hybrid inverters and whole-home energy management.", website: "sol-ark.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Sol-Ark.webp?v=1714417976" },
  { name: "ChargePoint", slug: "chargepoint", departments: ["EV Charging"], productCount: 180, description: "Commercial and residential EV charging solutions.", website: "chargepoint.com" },
  { name: "IronRidge", slug: "ironridge", departments: ["Solar & Renewables"], productCount: 320, description: "Solar racking, mounting hardware, and roof attachments.", website: "ironridge.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/IronRidge.png?v=1731277082" },
  { name: "RAB Lighting", slug: "rab-lighting", departments: ["Lighting"], productCount: 640, description: "LED outdoor, area, and landscape lighting fixtures.", website: "rablighting.com" },
  { name: "Lithonia", slug: "lithonia", departments: ["Lighting"], productCount: 780, description: "Commercial indoor and outdoor LED lighting fixtures.", website: "lithonia.com" },
  { name: "Watts", slug: "watts", departments: ["Plumbing"], productCount: 420, description: "Plumbing, flow control, and water quality products.", website: "watts.com" },
  { name: "MRCOOL", slug: "mrcool", departments: ["HVAC"], productCount: 180, description: "DIY ductless mini splits and HVAC systems.", website: "mrcool.com" },
  { name: "SharkBite", slug: "sharkbite", departments: ["Plumbing"], productCount: 340, description: "Push-to-connect plumbing fittings and PEX systems.", website: "sharkbite.com" },
  { name: "Tesla", slug: "tesla", departments: ["EV Charging"], productCount: 12, description: "Wall Connector and EV charging accessories.", website: "tesla.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Tesla_Powerwall.png?v=1731277082" },
  { name: "Wallbox", slug: "wallbox", departments: ["EV Charging"], productCount: 45, description: "Smart EV charging and energy management solutions.", website: "wallbox.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Wallbox.png?v=1731277082" },
  { name: "Renogy", slug: "renogy", departments: ["Solar & Renewables"], productCount: 220, description: "Solar energy products and storage solutions.", website: "renogy.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Renogy.webp?v=1714417976" },
  { name: "BYD", slug: "byd", departments: ["Solar & Renewables"], productCount: 80, description: "Batteries, solar products, and electric vehicles.", website: "byd.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/BYD.webp?v=1714417975" },
  { name: "Fortress Power", slug: "fortress-power", departments: ["Solar & Renewables"], productCount: 40, description: "Advanced lithium battery energy storage.", website: "fortresspower.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Fortress_Power.webp?v=1714417975" },
  { name: "Sungrow", slug: "sungrow", departments: ["Solar & Renewables"], productCount: 90, description: "Power conversion and energy storage systems.", website: "sungrow.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Sungrow.webp?v=1714417976" },
  { name: "Fronius", slug: "fronius", departments: ["Solar & Renewables"], productCount: 65, description: "Inverters and energy management solutions.", website: "fronius.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Fronius.webp?v=1714417975" },
  { name: "General Electric", slug: "general-electric", departments: ["Electrical", "Generators"], productCount: 1200, description: "Power generation and industrial energy solutions.", website: "ge.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/General_Electric.webp?v=1714417975" },
  { name: "GoodWe", slug: "goodwe", departments: ["Solar & Renewables"], productCount: 55, description: "Solar inverters and energy storage systems.", website: "goodwe.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/GoodWe.webp?v=1714417975" },
  { name: "SMA Solar", slug: "sma-solar", departments: ["Solar & Renewables"], productCount: 70, description: "Solar inverters and energy solutions.", website: "sma.de", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/SMA_Solar.webp?v=1714417976" },
  { name: "Panasonic", slug: "panasonic", departments: ["Solar & Renewables", "Electrical"], productCount: 180, description: "Solar panels, batteries, and electrical components.", website: "panasonic.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Panasonic_Image_2.png?v=1731948032" },
  { name: "Canadian Solar", slug: "canadian-solar", departments: ["Solar & Renewables"], productCount: 95, description: "Solar modules and energy storage systems.", website: "canadiansolar.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/canadian-solar.png?v=1735576361" },
  { name: "Trina Solar", slug: "trina-solar", departments: ["Solar & Renewables"], productCount: 85, description: "High-efficiency solar modules.", website: "trinasolar.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/trina-solar.png?v=1735576362" },
  { name: "LONGi Solar", slug: "longi", departments: ["Solar & Renewables"], productCount: 75, description: "Mono PERC and bifacial solar modules.", website: "longi.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/LONGi_Solar_Image_3.png?v=1731948032" },
  { name: "Victron Energy", slug: "victron", departments: ["Solar & Renewables"], productCount: 160, description: "Off-grid inverters, chargers, and energy monitoring.", website: "victronenergy.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Victron_Energy.png?v=1731277082" },
  { name: "Goodman", slug: "goodman", departments: ["HVAC"], productCount: 240, description: "Residential and commercial air conditioning and heating systems.", website: "goodmanmfg.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Goodman.webp?v=1714417975" },
  { name: "Daikin", slug: "daikin", departments: ["HVAC"], productCount: 190, description: "HVAC systems and indoor air quality solutions.", website: "daikin.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Daikin.png?v=1731277081" },
  { name: "Briggs & Stratton", slug: "briggs-stratton", departments: ["Generators"], productCount: 140, description: "The most powerful home/business generator solutions.", website: "briggsandstratton.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Briggs_and_Stratton.webp?v=1714417975" },
  { name: "Amana PTAC", slug: "amana", departments: ["HVAC"], productCount: 120, description: "High quality HVAC systems.", website: "amana-hac.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Amana_PTAC.webp?v=1714417975" },
  { name: "LG Solar", slug: "lg-solar", departments: ["Solar & Renewables"], productCount: 45, description: "High-efficiency solar panels.", website: "lg.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/LG.png?v=1731277082" },
  { name: "Unirac", slug: "unirac", departments: ["Solar & Renewables"], productCount: 180, description: "Solar mounting and racking systems.", website: "unirac.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Unirac.png?v=1731277082" },
  { name: "EcoFasten", slug: "ecofasten", departments: ["Solar & Renewables"], productCount: 90, description: "Solar roof mount solutions.", website: "ecofastensolar.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/EcoFasten.webp?v=1714417975" },
  { name: "AP Systems", slug: "ap-systems", departments: ["Solar & Renewables"], productCount: 55, description: "Microinverters and module-level power electronics.", website: "apsystems.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/AP_Systems.webp?v=1714417975" },
  { name: "Hoymiles", slug: "hoymiles", departments: ["Solar & Renewables"], productCount: 40, description: "Microinverters and module-level power electronics.", website: "hoymiles.com", _dead_logo: "https://cdn.shopify.com/s/files/1/0723/2137/2981/files/Hoymiles.webp?v=1714417975" },
]

export const products: Product[] = [
  { id: 1, slug: "square-d-200a-main-breaker-panel", name: "Square D 200A Main Breaker Panel", brand: "Schneider Electric", category: "circuit-breakers-panels", department: "electrical", price: 189.95, originalPrice: 234.0, rating: 4.7, reviews: 567, image: "/images/product-panel.jpg", badge: "In Stock", freeShipping: false, specs: ["200A", "30-Space", "Indoor"], sku: "SQD-HOM3060M200PC", description: "Square D Homeline 200-amp 30-space 60-circuit main breaker load center. UL listed, NEMA 1 indoor rated. Compatible with Homeline plug-on neutral breakers.", features: ["200A main breaker included", "30 spaces, 60 circuits", "Plug-on neutral ready", "NEMA 1 indoor enclosure", "UL listed, CSA certified"], shipsFrom: "Manufacturer DC", type: "part", gallery: ["/images/product-panel.jpg", "/images/product-panel.jpg"], certifications: ["UL Listed", "CSA Certified", "NEMA 1"], weight: "32 lbs", dimensions: "15.4 x 3.75 x 26.6 in", warranty: "1-year manufacturer warranty", leadTime: "1-2 business days", upc: "785901877684", countryOfOrigin: "Mexico", documents: [{ label: "Specification Sheet", url: "#", type: "spec-sheet" }, { label: "Installation Guide", url: "#", type: "install-guide" }, { label: "UL Certificate", url: "#", type: "certificate" }], compatibleWith: ["eaton-br-100a-panel"] },
  { id: 2, slug: "milwaukee-m18-fuel-hammer-drill-kit", name: 'Milwaukee M18 FUEL 1/2" Hammer Drill Kit', brand: "Milwaukee Tool", category: "power-tools", department: "tools", price: 199.0, originalPrice: 279.0, rating: 4.9, reviews: 1204, image: "/images/product-tools.jpg", badge: "Ships Today", freeShipping: true, specs: ["18V", "Brushless", "2-Speed"], sku: "MIL-2904-22", description: "Milwaukee M18 FUEL 1/2-inch hammer drill/driver kit with POWERSTATE brushless motor, REDLINK PLUS intelligence, and REDLITHIUM battery technology.", features: ["POWERSTATE brushless motor", "REDLINK PLUS intelligence", "0-2,000 RPM", "1,200 in-lbs torque", "Includes 2 batteries, charger, and bag"], shipsFrom: "Nearest stocking location" },
  { id: 3, slug: "mrcool-diy-24k-mini-split", name: "MRCOOL DIY 24K BTU Ductless Mini Split", brand: "MRCOOL", category: "mini-splits", department: "hvac", price: 1549.0, originalPrice: 1899.0, rating: 4.6, reviews: 893, image: "/images/cat-hvac.jpg", badge: "In Stock", freeShipping: true, specs: ["24K BTU", "20 SEER", "WiFi"], sku: "MRC-DIY-24-HP-WM-230C", description: "MRCOOL DIY 4th Generation 24,000 BTU ductless mini split heat pump. WiFi-enabled, works with Alexa and Google. DIY-friendly pre-charged line set.", features: ["24,000 BTU cooling/heating", "20 SEER efficiency", "WiFi smart control", "DIY pre-charged line set", "Energy Star certified"], shipsFrom: "Nearest stocking location" },
  { id: 4, slug: "jinko-580w-bifacial-module", name: "Jinko 580W N-Type Bifacial Module", brand: "Jinko Solar", category: "solar-panels", department: "solar", price: 133.4, originalPrice: 174.0, rating: 4.8, reviews: 342, image: "/images/product-solar-panel.jpg", badge: "Ready to Ship", freeShipping: true, specs: ["580W", "Bifacial", "Tier 1"], sku: "JKM580N-72HL4-BDV", description: "Jinko Tiger Neo 580W bifacial N-type solar module. Industry-leading efficiency with TOPCon cell technology. 30-year performance warranty.", features: ["580W rated output", "N-type TOPCon cells", "Bifacial power gain up to 25%", "21.8% module efficiency", "30-year linear warranty"], shipsFrom: "Manufacturer DC", type: "part", gallery: ["/images/product-solar-panel.jpg", "/images/product-solar-panel.jpg"], certifications: ["UL 61730", "IEC 61215", "BABA Eligible"], weight: "62 lbs", dimensions: "90.2 x 44.7 x 1.4 in", warranty: "12-year product, 30-year linear performance", leadTime: "2-7 business days", upc: "697681340015", countryOfOrigin: "China (BABA alternatives available)", documents: [{ label: "Datasheet", url: "#", type: "datasheet" }, { label: "Installation Manual", url: "#", type: "install-guide" }, { label: "Warranty Certificate", url: "#", type: "warranty" }, { label: "UL Certificate", url: "#", type: "certificate" }], compatibleWith: ["sol-ark-15k-hybrid-inverter"] },
  { id: 5, slug: "generac-22kw-standby-generator", name: "Generac 22kW Standby Generator", brand: "Generac", category: "standby-generators", department: "generators", price: 5299.0, originalPrice: 5799.0, rating: 4.6, reviews: 128, image: "/images/product-generator.jpg", badge: "In Stock", freeShipping: true, specs: ["22kW", "NG/LP", "Auto Transfer"], sku: "GEN-7043", description: "Generac Guardian Series 22kW whole-home standby generator with 200A automatic transfer switch. Runs on natural gas or LP. Mobile Link WiFi monitoring.", features: ["22,000W standby power", "200A smart transfer switch", "Dual fuel: natural gas or LP", "Mobile Link WiFi monitoring", "5-year limited warranty"], shipsFrom: "Nearest stocking location" },
  { id: 6, slug: "sharkbite-push-connect-valve-kit", name: 'SharkBite 1/2" Push-to-Connect Valve Kit', brand: "SharkBite", category: "valves", department: "plumbing", price: 24.97, originalPrice: 34.99, rating: 4.8, reviews: 2310, image: "/images/cat-plumbing.jpg", badge: "Ships Today", freeShipping: false, specs: ['1/2"', "Push-Fit", "Lead-Free"], sku: "SHK-22222-0000LFA", description: "SharkBite 1/2-inch push-to-connect quarter-turn ball valve. No soldering, clamps, or glue required. Lead-free brass construction.", features: ["Push-to-connect installation", "No tools required", "Lead-free brass", "Quarter-turn operation", "Works on copper, PEX, CPVC"], shipsFrom: "Nearest stocking location" },
  { id: 7, slug: "tesla-wall-connector-gen3", name: "Tesla Wall Connector Gen 3 EV Charger", brand: "Tesla", category: "l2-residential", department: "ev-charging", price: 475.0, originalPrice: 530.0, rating: 4.7, reviews: 891, image: "/images/product-ev-charger.jpg", badge: "In Stock", freeShipping: true, specs: ["48A", "Level 2", "WiFi"], sku: "TSL-1457768-S-02-F", description: "Tesla Wall Connector Gen 3 with up to 48A output. Compatible with all Tesla vehicles and J1772 EVs with adapter. WiFi-enabled for OTA updates.", features: ["Up to 48A / 11.5kW output", "24-foot cable length", "WiFi connectivity", "Power sharing for multiple units", "Indoor/outdoor rated"], shipsFrom: "Nearest stocking location" },
  { id: 8, slug: "sol-ark-15k-hybrid-inverter", name: "Sol-Ark 15K Hybrid Inverter", brand: "Sol-Ark", category: "inverters-optimizers", department: "solar", price: 3995.0, originalPrice: 4595.0, rating: 4.9, reviews: 187, image: "/images/product-inverter.jpg", badge: "Ready to Ship", freeShipping: true, specs: ["15kW", "Hybrid", "200A MPPT"], sku: "SA-15K", description: "Sol-Ark 15K all-in-one hybrid inverter. Supports grid-tied, off-grid, and battery backup. Built-in 200A MPPT charge controllers and rapid shutdown.", features: ["15kW continuous output", "Built-in 200A MPPT", "Grid-tied + off-grid capable", "Rapid shutdown compliant", "10-year warranty, made in USA"], shipsFrom: "Manufacturer DC", type: "part", gallery: ["/images/product-inverter.jpg", "/images/product-inverter.jpg"], certifications: ["UL 1741", "IEEE 1547", "FCC Part 15", "BABA Compliant"], weight: "123 lbs", dimensions: "28.3 x 15.6 x 9.8 in", warranty: "10-year manufacturer warranty", leadTime: "2-5 business days", countryOfOrigin: "USA", documents: [{ label: "Datasheet", url: "#", type: "datasheet" }, { label: "Installation Manual", url: "#", type: "install-guide" }, { label: "Warranty Document", url: "#", type: "warranty" }], compatibleWith: ["jinko-580w-bifacial-module"] },
  { id: 9, slug: "eaton-br-100a-panel", name: "Eaton BR 100A Main Breaker Panel", brand: "Eaton", category: "circuit-breakers-panels", department: "electrical", price: 89.95, originalPrice: 119.0, rating: 4.5, reviews: 892, image: "/images/product-panel.jpg", badge: "In Stock", freeShipping: false, specs: ["100A", "20-Space", "Indoor"], sku: "EAT-BR2020B100V", description: "Eaton BR Series 100-amp 20-space 20-circuit main breaker load center with value pack.", features: ["100A main breaker included", "20 spaces, 20 circuits", "Type BR breaker compatible", "NEMA 1 indoor enclosure", "UL listed"], shipsFrom: "Nearest stocking location" },
  { id: 10, slug: "klein-cl800-digital-clamp-meter", name: "Klein CL800 Digital Clamp Meter", brand: "Klein Tools", category: "meters-testers", department: "tools", price: 89.99, originalPrice: 109.99, rating: 4.8, reviews: 1456, image: "/images/product-tools.jpg", badge: "Ships Today", freeShipping: false, specs: ["600A AC/DC", "TRMS", "CAT III"], sku: "KLE-CL800", description: "Klein Tools CL800 digital clamp meter with auto-ranging True RMS. Measures AC/DC current to 600A and AC/DC voltage to 1000V.", features: ["600A AC/DC current", "True RMS for accuracy", "Auto-ranging", "Temperature measurement", "CAT III 1000V rated"], shipsFrom: "Nearest stocking location" },
  { id: 11, slug: "lithonia-2x4-led-troffer", name: "Lithonia 2x4 LED Flat Panel Troffer", brand: "Lithonia", category: "led-fixtures", department: "lighting", price: 64.5, originalPrice: 89.0, rating: 4.6, reviews: 2340, image: "/images/cat-lighting.jpg", badge: "In Stock", freeShipping: false, specs: ["40W", "5000K", "DLC"], sku: "LIT-CPX-2X4-4000LM-50K", description: "Lithonia CPX 2x4 LED flat panel troffer. 4,000 lumens, 5000K daylight. DLC premium listed for utility rebates.", features: ["4,000 lumens output", "5000K daylight color", "DLC Premium listed", "10-year warranty", "Drop ceiling compatible"], shipsFrom: "Nearest stocking location" },
  { id: 12, slug: "honeywell-t6-pro-thermostat", name: "Honeywell T6 Pro Programmable Thermostat", brand: "Honeywell", category: "thermostats", department: "hvac", price: 79.99, originalPrice: 99.99, rating: 4.4, reviews: 678, image: "/images/cat-hvac.jpg", badge: "Ships Today", freeShipping: false, specs: ["7-Day", "2H/2C", "Pro Install"], sku: "HON-TH6220U2000", description: "Honeywell T6 Pro programmable thermostat with flexible scheduling. Compatible with most HVAC systems.", features: ["7-day programmable", "2 heat / 2 cool stages", "Large backlit display", "Pro installer preferred", "UL listed"], shipsFrom: "Nearest stocking location" },
  {
    id: 13,
    slug: "pes-10kw-residential-solar-kit",
    name: "PES 10kW Residential Solar Kit -- Jinko + Sol-Ark + IronRidge",
    brand: "PES Supply",
    category: "solar-kits",
    department: "solar",
    price: 12495.0,
    originalPrice: 15230.0,
    rating: 4.8,
    reviews: 47,
    image: "/images/product-solar-panel.jpg",
    badge: "Ready to Ship",
    freeShipping: true,
    specs: ["10kW", "18 Panels", "Hybrid Ready"],
    sku: "PES-KIT-10KW-RES-01",
    description: "Complete 10kW residential solar kit designed for grid-tied or hybrid installations. Includes 18x Jinko 580W N-Type bifacial panels, 1x Sol-Ark 15K hybrid inverter, and complete IronRidge XR100 racking for standard comp shingle roofs. All components are UL listed and BABA-eligible. Kit is designed by PES engineers for a typical 2,000-3,000 sq ft home. Does not include batteries, conduit, wire, or permitting -- those can be quoted separately through your account rep.",
    features: [
      "18x Jinko 580W panels (10.44kW nameplate)",
      "1x Sol-Ark 15K hybrid inverter",
      "IronRidge XR100 racking for comp shingle roof",
      "All UL listed, BABA-eligible components",
      "Designed for grid-tied or hybrid (battery-ready)",
      "Free freight to commercial address",
      "Engineering stamp available (separate quote)",
    ],
    shipsFrom: "Multiple locations",
    type: "kit",
    gallery: ["/images/product-solar-panel.jpg", "/images/product-inverter.jpg", "/images/product-solar-panel.jpg"],
    includes: [
      { name: "Jinko 580W N-Type Bifacial Module", sku: "JKM580N-72HL4-BDV", qty: 18, slug: "jinko-580w-bifacial-module" },
      { name: "Sol-Ark 15K Hybrid Inverter", sku: "SA-15K", qty: 1, slug: "sol-ark-15k-hybrid-inverter" },
      { name: "IronRidge XR100 Rail (168 in)", sku: "IR-XR-100-168A", qty: 12 },
      { name: "IronRidge FlashFoot2 Comp", sku: "IR-FF2-001", qty: 36 },
      { name: "IronRidge UFO Mid Clamp", sku: "IR-UFO-MC-01", qty: 34 },
      { name: "IronRidge UFO End Clamp", sku: "IR-UFO-EC-01", qty: 4 },
      { name: "IronRidge Splice Bar", sku: "IR-SB-01", qty: 6 },
      { name: "IronRidge Grounding Lug", sku: "IR-GL-01", qty: 18 },
    ],
    documents: [
      { label: "Kit Bill of Materials (BOM)", url: "#", type: "spec-sheet" },
      { label: "Jinko Panel Datasheet", url: "#", type: "datasheet" },
      { label: "Sol-Ark Install Manual", url: "#", type: "install-guide" },
      { label: "IronRidge Racking Guide", url: "#", type: "install-guide" },
      { label: "BABA Compliance Letter", url: "#", type: "certificate" },
    ],
    certifications: ["UL 61730", "UL 1741", "IEC 61215", "BABA Eligible", "FCC Part 15"],
    weight: "1,850 lbs (palletized)",
    dimensions: "Ships on 2 pallets: 48x40x60 in each",
    warranty: "Component warranties apply: 30-year Jinko, 10-year Sol-Ark, 25-year IronRidge",
    leadTime: "3-7 business days (multi-location coordination)",
    minOrderQty: 1,
    countryOfOrigin: "Multi-origin (panels: China, inverter: USA, racking: USA)",
    compatibleWith: [],
  },
]

export function getProductsByDepartment(deptSlug: string): Product[] {
  return products.filter((p) => p.department === deptSlug)
}

export function getProductsByBrand(brandSlug: string): Product[] {
  const brand = brands.find((b) => b.slug === brandSlug)
  if (!brand) return []
  return products.filter((p) => p.brand === brand.name)
}

export function getDepartment(slug: string): Department | undefined {
  return departments.find((d) => d.slug === slug)
}

export function getBrand(slug: string): Brand | undefined {
  return brands.find((b) => b.slug === slug)
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
