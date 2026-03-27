"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Star, CheckCircle2, ChevronRight, MapPin, Phone, Mail, Calendar, Clock, Shield, Award, Building2, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

const installersData: Record<string, {
  name: string
  avatar: string
  verified: boolean
  rating: number
  reviewCount: number
  projectsLast12Mo: number
  totalProjects: number
  costRange: string
  avgCost: string
  specialties: string[]
  serviceArea: string[]
  categories: string[]
  about: string
  yearsInBusiness: number
  certifications: string[]
  phone: string
  email: string
  recentProjects: { title: string; location: string; date: string; image: string }[]
  reviews: { author: string; rating: number; date: string; text: string; project: string }[]
  ratingDistribution: { stars: number; count: number }[]
}> = {
  "bluegrass-electric": {
    name: "Bluegrass Electric Services",
    avatar: "/images/installer-bluegrass.jpg",
    verified: true,
    rating: 4.9,
    reviewCount: 127,
    projectsLast12Mo: 89,
    totalProjects: 412,
    costRange: "$150-$350/hr",
    avgCost: "$245/hr",
    specialties: ["Commercial Electrical", "Industrial", "Panel Upgrades", "EV Charging", "Lighting Retrofits"],
    serviceArea: ["Downtown Louisville", "St. Matthews", "Jeffersontown", "New Albany IN", "Clarksville IN", "Prospect"],
    categories: ["electrician"],
    about: "Family-owned electrical contractor serving Louisville and Southern Indiana since 1987. We specialize in commercial and industrial electrical work, with a focus on energy efficiency and code compliance. Our team of 12 licensed electricians handles everything from panel upgrades to full facility buildouts.",
    yearsInBusiness: 37,
    certifications: ["Master Electrician", "NFPA 70E", "OSHA 30", "Generac Authorized", "Tesla Certified"],
    phone: "(502) 555-0142",
    email: "info@bluegrasselectric.com",
    recentProjects: [
      { title: "200A Panel Upgrade", location: "St. Matthews", date: "Feb 2026", image: "/images/project-panel.jpg" },
      { title: "EV Charger Installation", location: "Prospect", date: "Feb 2026", image: "/images/project-ev.jpg" },
      { title: "Commercial Lighting Retrofit", location: "Downtown", date: "Jan 2026", image: "/images/project-lighting.jpg" },
      { title: "Generator Install", location: "Jeffersontown", date: "Jan 2026", image: "/images/project-generator.jpg" },
    ],
    reviews: [
      { author: "Mike R.", rating: 5, date: "Feb 2026", text: "Outstanding work on our panel upgrade. The crew was professional, cleaned up after themselves, and explained everything clearly. Highly recommend.", project: "200A Panel Upgrade" },
      { author: "Sarah T.", rating: 5, date: "Jan 2026", text: "Had them install a Tesla Wall Connector. Fast, clean work and they handled all the permitting. Price was competitive.", project: "EV Charger Installation" },
      { author: "Commercial Property Mgr", rating: 5, date: "Jan 2026", text: "They retrofitted our entire office building with LED lighting. The energy savings have been significant. Great communication throughout.", project: "LED Retrofit" },
      { author: "James K.", rating: 4, date: "Dec 2025", text: "Good work overall. Had to reschedule once due to supply issues but they made it right. Final result is excellent.", project: "Subpanel Installation" },
    ],
    ratingDistribution: [
      { stars: 5, count: 108 },
      { stars: 4, count: 15 },
      { stars: 3, count: 3 },
      { stars: 2, count: 1 },
      { stars: 1, count: 0 },
    ],
  },
  "derby-city-solar": {
    name: "Derby City Solar",
    avatar: "/images/installer-derby.jpg",
    verified: true,
    rating: 4.8,
    reviewCount: 94,
    projectsLast12Mo: 67,
    totalProjects: 289,
    costRange: "$2.50-$3.20/watt",
    avgCost: "$2.85/watt",
    specialties: ["Residential Solar", "Battery Storage", "EV Charging", "Solar + Storage"],
    serviceArea: ["Jefferson County", "Oldham County", "Bullitt County", "Shelby County"],
    categories: ["solar", "ev"],
    about: "Louisville's leading residential solar installer. We design and install custom solar systems paired with battery storage for energy independence. Our focus is on quality components and long-term performance.",
    yearsInBusiness: 8,
    certifications: ["NABCEP Certified", "Tesla Powerwall", "Enphase Platinum", "SunPower Elite"],
    phone: "(502) 555-0287",
    email: "hello@derbycitysolar.com",
    recentProjects: [
      { title: "10kW Solar + Powerwall", location: "Prospect", date: "Feb 2026", image: "/images/project-solar1.jpg" },
      { title: "8kW Roof Mount", location: "St. Matthews", date: "Feb 2026", image: "/images/project-solar2.jpg" },
      { title: "Ground Mount System", location: "Oldham County", date: "Jan 2026", image: "/images/project-ground.jpg" },
      { title: "Commercial Carport", location: "Jeffersontown", date: "Jan 2026", image: "/images/project-carport.jpg" },
    ],
    reviews: [
      { author: "Jennifer M.", rating: 5, date: "Feb 2026", text: "Excellent experience from start to finish. The design team was thorough, installation crew was professional, and our system is performing above projections.", project: "10kW Solar System" },
      { author: "Robert S.", rating: 5, date: "Jan 2026", text: "Third solar company I got quotes from and they were the most knowledgeable. System looks great and the Powerwall gives us peace of mind.", project: "Solar + Battery" },
      { author: "Lisa W.", rating: 4, date: "Dec 2025", text: "Good installation but permitting took longer than expected. Not their fault, just city bureaucracy. System works great.", project: "6kW Residential" },
    ],
    ratingDistribution: [
      { stars: 5, count: 78 },
      { stars: 4, count: 12 },
      { stars: 3, count: 3 },
      { stars: 2, count: 1 },
      { stars: 1, count: 0 },
    ],
  },
}

export default function InstallerProfilePage() {
  const params = useParams()
  const slug = params.slug as string
  const installer = installersData[slug]
  
  const [formSubmitting, setFormSubmitting] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)

  if (!installer) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground">Installer Not Found</h1>
          <p className="mt-2 text-sm text-muted-foreground">The installer profile you are looking for does not exist.</p>
          <Button asChild className="mt-4">
            <Link href="/powerlink/directory">Back to Directory</Link>
          </Button>
        </div>
      </div>
    )
  }

  const maxReviews = Math.max(...installer.ratingDistribution.map((r) => r.count))

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault()
    setFormSubmitting(true)
    setTimeout(() => {
      setFormSubmitting(false)
      setFormSubmitted(true)
    }, 1500)
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
          <li><Link href="/powerlink/directory" className="hover:text-primary">Directory</Link></li>
          <li><ChevronRight className="h-3 w-3" /></li>
          <li className="font-medium text-foreground">{installer.name}</li>
        </ol>
      </nav>

      {/* Header */}
      <section className="border-b border-border bg-foreground py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="h-20 w-20 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={installer.avatar}
                    alt={installer.name}
                    width={80}
                    height={80}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(installer.name)}&background=1a7a3d&color=fff&size=80`
                    }}
                  />
                </div>
                {installer.verified && (
                  <div className="absolute -bottom-1 -right-1 flex h-7 w-7 items-center justify-center rounded-full border-2 border-foreground bg-primary">
                    <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                  </div>
                )}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-background md:text-2xl">{installer.name}</h1>
                  {installer.verified && (
                    <Badge className="bg-primary text-primary-foreground">PES Verified</Badge>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-background">{installer.rating}</span>
                    <span className="text-sm text-background/60">({installer.reviewCount} reviews)</span>
                  </div>
                  <span className="text-sm text-background/60">{installer.yearsInBusiness} years in business</span>
                </div>
              </div>
            </div>
            {/* Certifications */}
            <div className="flex flex-wrap gap-2">
              {installer.certifications.map((cert) => (
                <Badge key={cert} variant="outline" className="border-background/20 bg-background/10 text-background">
                  <Award className="mr-1 h-3 w-3" /> {cert}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-b border-border bg-muted/30 py-6">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-primary">{installer.projectsLast12Mo}</p>
              <p className="text-xs text-muted-foreground">Projects (12mo)</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{installer.totalProjects}</p>
              <p className="text-xs text-muted-foreground">Total Projects</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{installer.costRange}</p>
              <p className="text-xs text-muted-foreground">Cost Range</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{installer.avgCost}</p>
              <p className="text-xs text-muted-foreground">Avg Cost</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-8 lg:col-span-2">
            {/* About */}
            <div>
              <h2 className="mb-3 text-lg font-bold text-foreground">About</h2>
              <p className="text-sm leading-relaxed text-muted-foreground">{installer.about}</p>
            </div>

            {/* Specialties */}
            <div>
              <h2 className="mb-3 text-lg font-bold text-foreground">Specialties</h2>
              <div className="flex flex-wrap gap-2">
                {installer.specialties.map((spec) => (
                  <Badge key={spec} variant="outline" className="px-3 py-1">{spec}</Badge>
                ))}
              </div>
            </div>

            {/* Recent Projects */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-foreground">Recent Projects</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {installer.recentProjects.map((project, idx) => (
                  <div key={idx} className="overflow-hidden rounded-lg border border-border bg-card">
                    <div className="aspect-video bg-muted">
                      <Image
                        src={project.image}
                        alt={project.title}
                        width={400}
                        height={225}
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.style.display = "none"
                        }}
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-card-foreground">{project.title}</h3>
                      <p className="mt-1 flex items-center gap-2 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" /> {project.location}
                        <span className="text-border">|</span>
                        <Calendar className="h-3 w-3" /> {project.date}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Service Area */}
            <div>
              <h2 className="mb-3 text-lg font-bold text-foreground">Service Area</h2>
              <div className="flex flex-wrap gap-2">
                {installer.serviceArea.map((area) => (
                  <Badge key={area} className="bg-muted text-foreground hover:bg-muted">
                    <MapPin className="mr-1 h-3 w-3" /> {area}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Reviews */}
            <div>
              <h2 className="mb-4 text-lg font-bold text-foreground">Reviews</h2>
              
              {/* Rating Distribution */}
              <div className="mb-6 rounded-lg border border-border bg-card p-5">
                <div className="flex items-center gap-6">
                  <div className="text-center">
                    <p className="text-4xl font-bold text-foreground">{installer.rating}</p>
                    <div className="mt-1 flex justify-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className={`h-4 w-4 ${star <= Math.round(installer.rating) ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                      ))}
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">{installer.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 space-y-1.5">
                    {installer.ratingDistribution.map((dist) => (
                      <div key={dist.stars} className="flex items-center gap-2">
                        <span className="w-8 text-xs text-muted-foreground">{dist.stars} star</span>
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                          <div 
                            className="h-full rounded-full bg-amber-400" 
                            style={{ width: `${(dist.count / maxReviews) * 100}%` }}
                          />
                        </div>
                        <span className="w-8 text-right text-xs text-muted-foreground">{dist.count}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Cards */}
              <div className="space-y-4">
                {installer.reviews.map((review, idx) => (
                  <div key={idx} className="rounded-lg border border-border bg-card p-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-semibold text-card-foreground">{review.author}</p>
                        <div className="mt-0.5 flex items-center gap-2">
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className={`h-3.5 w-3.5 ${star <= review.rating ? "fill-amber-400 text-amber-400" : "text-muted"}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">{review.date}</span>
                        </div>
                      </div>
                      <Badge variant="outline" className="text-[10px]">{review.project}</Badge>
                    </div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{review.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Contact Form */}
          <div className="lg:sticky lg:top-4 lg:self-start">
            <div className="rounded-xl border border-border bg-card p-6">
              {/* PES Verified Badge */}
              {installer.verified && (
                <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/10 px-3 py-2">
                  <Shield className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs font-bold text-primary">PES Verified</p>
                    <p className="text-[10px] text-muted-foreground">Background checked, licensed & insured</p>
                  </div>
                </div>
              )}

              <h3 className="text-lg font-bold text-card-foreground">Contact {installer.name.split(" ")[0]}</h3>
              <p className="mt-1 text-sm text-muted-foreground">Get a free quote for your project.</p>

              {formSubmitted ? (
                <div className="mt-6 text-center">
                  <CheckCircle2 className="mx-auto h-12 w-12 text-primary" />
                  <p className="mt-3 font-semibold text-foreground">Message Sent!</p>
                  <p className="mt-1 text-sm text-muted-foreground">{installer.name} will respond within 1 business day.</p>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="mt-4 space-y-3">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      required
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Email"
                      required
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <input
                      type="tel"
                      placeholder="Phone"
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      placeholder="ZIP Code"
                      required
                      className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Describe your project..."
                      rows={4}
                      required
                      className="w-full resize-none rounded-lg border border-input bg-background px-3 py-2.5 text-sm placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <Button type="submit" className="w-full" disabled={formSubmitting}>
                    {formSubmitting ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending...</> : "Request Quote"}
                  </Button>
                </form>
              )}

              {/* Contact Info */}
              <div className="mt-6 space-y-2 border-t border-border pt-4">
                <a href={`tel:${installer.phone}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <Phone className="h-4 w-4" /> {installer.phone}
                </a>
                <a href={`mailto:${installer.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                  <Mail className="h-4 w-4" /> {installer.email}
                </a>
                <p className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4" /> Responds within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
