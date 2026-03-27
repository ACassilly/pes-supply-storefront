"use client"

import { useState, useMemo } from "react"
import Link from "next/link"
import Image from "next/image"
import { Search, MapPin, Star, CheckCircle2, ChevronRight, Filter, ChevronDown, Zap, Sun, Wind, Droplets, Home, Wrench, BatteryCharging } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const categories = [
  { id: "electrician", name: "Electrician", icon: Zap, count: 47, color: "bg-amber-50 text-amber-600" },
  { id: "solar", name: "Solar Installer", icon: Sun, count: 23, color: "bg-yellow-50 text-yellow-600" },
  { id: "hvac", name: "HVAC Contractor", icon: Wind, count: 31, color: "bg-blue-50 text-blue-600" },
  { id: "plumber", name: "Plumber", icon: Droplets, count: 28, color: "bg-cyan-50 text-cyan-600" },
  { id: "roofer", name: "Roofer", icon: Home, count: 19, color: "bg-orange-50 text-orange-600" },
  { id: "general", name: "General Contractor", icon: Wrench, count: 35, color: "bg-gray-100 text-gray-600" },
  { id: "ev", name: "EV Charger Installer", icon: BatteryCharging, count: 12, color: "bg-green-50 text-green-600" },
]

const installers = [
  {
    slug: "bluegrass-electric",
    name: "Bluegrass Electric Services",
    avatar: "/images/installer-bluegrass.jpg",
    verified: true,
    rating: 4.9,
    reviewCount: 127,
    projectsLast12Mo: 89,
    costRange: "$150-$350/hr",
    specialties: ["Commercial", "Industrial", "Panel Upgrades"],
    serviceArea: "Louisville Metro, Southern Indiana",
    categories: ["electrician"],
    featured: true,
  },
  {
    slug: "derby-city-solar",
    name: "Derby City Solar",
    avatar: "/images/installer-derby.jpg",
    verified: true,
    rating: 4.8,
    reviewCount: 94,
    projectsLast12Mo: 67,
    costRange: "$2.50-$3.20/watt",
    specialties: ["Residential Solar", "Battery Storage", "EV Charging"],
    serviceArea: "Jefferson County, Oldham County",
    categories: ["solar", "ev"],
    featured: true,
  },
  {
    slug: "river-city-hvac",
    name: "River City HVAC",
    avatar: "/images/installer-rivercity.jpg",
    verified: true,
    rating: 4.7,
    reviewCount: 156,
    projectsLast12Mo: 112,
    costRange: "$85-$175/hr",
    specialties: ["Mini Splits", "Commercial HVAC", "Maintenance"],
    serviceArea: "Greater Louisville Area",
    categories: ["hvac"],
    featured: false,
  },
  {
    slug: "commonwealth-contractors",
    name: "Commonwealth Contractors LLC",
    avatar: "/images/installer-commonwealth.jpg",
    verified: false,
    rating: 4.5,
    reviewCount: 43,
    projectsLast12Mo: 31,
    costRange: "$65-$125/hr",
    specialties: ["Remodels", "Electrical", "Plumbing"],
    serviceArea: "Louisville, Lexington",
    categories: ["general", "electrician", "plumber"],
    featured: false,
  },
]

export default function DirectoryPage() {
  const [zipCode, setZipCode] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [verifiedOnly, setVerifiedOnly] = useState(false)
  const [minRating, setMinRating] = useState(0)
  const [sortBy, setSortBy] = useState<"rating" | "reviews" | "projects">("rating")
  const [showFilters, setShowFilters] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const filteredInstallers = useMemo(() => {
    let result = installers
    if (selectedCategory) {
      result = result.filter((i) => i.categories.includes(selectedCategory))
    }
    if (verifiedOnly) {
      result = result.filter((i) => i.verified)
    }
    if (minRating > 0) {
      result = result.filter((i) => i.rating >= minRating)
    }
    // Sort
    result = [...result].sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount
      return b.projectsLast12Mo - a.projectsLast12Mo
    })
    return result
  }, [selectedCategory, verifiedOnly, minRating, sortBy])

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    setHasSearched(true)
  }

  return (
    <div className="bg-background">
      {/* Breadcrumb */}
      <nav className="border-b border-border bg-muted/30 px-4 py-3" aria-label="Breadcrumb">
        <ol className="mx-auto flex max-w-7xl items-center gap-1.5 text-xs text-muted-foreground">
          <li><Link href="/" className="hover:text-primary">Home</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li><Link href="/powerlink" className="hover:text-primary">PowerLink</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-medium text-foreground">Find an Installer</li>
        </ol>
      </nav>

      {/* Hero / Search */}
      <section className="border-b border-border bg-foreground py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-2xl font-bold text-background md:text-3xl">Find a Verified Installer</h1>
            <p className="mt-2 text-sm text-background/60">Search our network of PES-certified contractors in your area.</p>
            
            <form onSubmit={handleSearch} className="mt-6 flex flex-col gap-3 sm:flex-row">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Enter ZIP code"
                  value={zipCode}
                  onChange={(e) => setZipCode(e.target.value)}
                  className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-4 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
              </div>
              <select
                value={selectedCategory || ""}
                onChange={(e) => setSelectedCategory(e.target.value || null)}
                className="rounded-lg border border-input bg-background px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <option value="">All Categories</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
                ))}
              </select>
              <Button type="submit" className="gap-2">
                <Search className="h-4 w-4" /> Search
              </Button>
            </form>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        {!hasSearched ? (
          /* Category Grid */
          <>
            <h2 className="mb-6 text-lg font-bold text-foreground">Browse by Category</h2>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {categories.map((cat) => {
                const Icon = cat.icon
                return (
                  <button
                    key={cat.id}
                    onClick={() => { setSelectedCategory(cat.id); setHasSearched(true) }}
                    className="group flex items-center gap-4 rounded-xl border border-border bg-card p-5 text-left transition-all hover:border-primary/30 hover:shadow-md"
                  >
                    <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${cat.color}`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-semibold text-card-foreground group-hover:text-primary">{cat.name}</p>
                      <p className="text-sm text-muted-foreground">{cat.count} installers</p>
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Featured Installers */}
            <div className="mt-12">
              <h2 className="mb-6 text-lg font-bold text-foreground">Featured Installers</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {installers.filter((i) => i.featured).map((installer) => (
                  <InstallerCard key={installer.slug} installer={installer} />
                ))}
              </div>
            </div>
          </>
        ) : (
          /* Search Results */
          <>
            {/* Filter Bar */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center gap-2 rounded-lg border border-border bg-card px-4 py-2 text-sm font-medium text-foreground hover:border-primary/30"
                >
                  <Filter className="h-4 w-4" /> Filters <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? "rotate-180" : ""}`} />
                </button>
                <label className="flex cursor-pointer items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={verifiedOnly}
                    onChange={(e) => setVerifiedOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary"
                  />
                  <span>Verified Only</span>
                </label>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "rating" | "reviews" | "projects")}
                  className="rounded-lg border border-input bg-background px-3 py-1.5 text-sm focus:border-primary focus:outline-none"
                >
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="projects">Most Projects</option>
                </select>
              </div>
            </div>

            {/* Expanded Filters */}
            {showFilters && (
              <div className="mb-6 rounded-lg border border-border bg-muted/30 p-4">
                <div className="flex flex-wrap gap-6">
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-foreground">Category</label>
                    <select
                      value={selectedCategory || ""}
                      onChange={(e) => setSelectedCategory(e.target.value || null)}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value="">All Categories</option>
                      {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-xs font-semibold text-foreground">Min Rating</label>
                    <select
                      value={minRating}
                      onChange={(e) => setMinRating(Number(e.target.value))}
                      className="rounded-lg border border-input bg-background px-3 py-2 text-sm"
                    >
                      <option value={0}>Any Rating</option>
                      <option value={4}>4+ Stars</option>
                      <option value={4.5}>4.5+ Stars</option>
                    </select>
                  </div>
                  <button 
                    onClick={() => { setSelectedCategory(null); setVerifiedOnly(false); setMinRating(0) }}
                    className="self-end text-sm font-semibold text-primary hover:underline"
                  >
                    Clear All
                  </button>
                </div>
              </div>
            )}

            {/* Results Count */}
            <p className="mb-4 text-sm text-muted-foreground">
              {filteredInstallers.length} installer{filteredInstallers.length !== 1 ? "s" : ""} found
              {zipCode && ` near ${zipCode}`}
              {selectedCategory && ` in ${categories.find((c) => c.id === selectedCategory)?.name}`}
            </p>

            {/* Results Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              {filteredInstallers.map((installer) => (
                <InstallerCard key={installer.slug} installer={installer} />
              ))}
            </div>

            {filteredInstallers.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-lg font-semibold text-foreground">No installers found</p>
                <p className="mt-1 text-sm text-muted-foreground">Try adjusting your filters or search in a different area.</p>
                <Button onClick={() => { setSelectedCategory(null); setVerifiedOnly(false); setMinRating(0) }} variant="outline" className="mt-4">
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Back to categories */}
            <div className="mt-8 text-center">
              <button onClick={() => setHasSearched(false)} className="text-sm font-semibold text-primary hover:underline">
                Back to Categories
              </button>
            </div>
          </>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-primary/30 bg-primary/5 p-6 text-center md:p-8">
          <h3 className="text-lg font-bold text-foreground">Are you a contractor?</h3>
          <p className="mt-1 text-sm text-muted-foreground">Join PowerLink to get listed, receive leads, and access exclusive pricing.</p>
          <Button asChild className="mt-4 gap-2">
            <Link href="/powerlink">Join PowerLink <ChevronRight className="h-4 w-4" /></Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function InstallerCard({ installer }: { installer: typeof installers[0] }) {
  return (
    <div className="flex gap-4 rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-md">
      {/* Avatar */}
      <div className="relative h-16 w-16 shrink-0">
        <div className="h-16 w-16 overflow-hidden rounded-full bg-muted">
          <Image
            src={installer.avatar}
            alt={installer.name}
            width={64}
            height={64}
            className="h-full w-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement
              target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(installer.name)}&background=1a7a3d&color=fff&size=64`
            }}
          />
        </div>
        {installer.verified && (
          <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-card bg-primary">
            <CheckCircle2 className="h-3.5 w-3.5 text-primary-foreground" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-bold text-card-foreground">{installer.name}</h3>
            <div className="mt-0.5 flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                <span className="text-sm font-semibold">{installer.rating}</span>
              </div>
              <span className="text-xs text-muted-foreground">({installer.reviewCount} reviews)</span>
            </div>
          </div>
          {installer.verified && (
            <Badge className="shrink-0 bg-primary/10 text-primary hover:bg-primary/10">PES Verified</Badge>
          )}
        </div>

        {/* Stats */}
        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          <span><strong className="text-foreground">{installer.projectsLast12Mo}</strong> projects (12mo)</span>
          <span><strong className="text-foreground">{installer.costRange}</strong></span>
        </div>

        {/* Specialties */}
        <div className="mt-2 flex flex-wrap gap-1">
          {installer.specialties.slice(0, 3).map((spec) => (
            <Badge key={spec} variant="outline" className="text-[10px]">{spec}</Badge>
          ))}
        </div>

        {/* Service Area */}
        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
          <MapPin className="h-3 w-3" /> {installer.serviceArea}
        </p>

        {/* Actions */}
        <div className="mt-4 flex gap-2">
          <Button asChild size="sm" variant="outline" className="flex-1">
            <Link href={`/powerlink/installer/${installer.slug}`}>View Profile</Link>
          </Button>
          <Button size="sm" className="flex-1">Contact</Button>
        </div>
      </div>
    </div>
  )
}
