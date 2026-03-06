"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, CheckCircle2, Loader2, Eye, EyeOff, Package, MapPin, CreditCard, Users, ChevronRight, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FormData { email: string; password: string }
interface RegisterData { name: string; email: string; password: string; confirm: string }

// Mock order data
const mockOrders = [
  { id: "PES-78291", date: "2026-02-28", status: "Delivered", total: 1247.50 },
  { id: "PES-78156", date: "2026-02-21", status: "Shipped", total: 892.00 },
  { id: "PES-77943", date: "2026-02-14", status: "Processing", total: 3450.75 },
  { id: "PES-77801", date: "2026-02-07", status: "Delivered", total: 567.25 },
]

const mockAddresses = [
  { id: 1, label: "Primary", name: "Johnson Electric LLC", street: "1234 Industrial Blvd", city: "Louisville", state: "KY", zip: "40299" },
  { id: 2, label: "Job Site", name: "Riverside Project", street: "789 River Road", city: "Louisville", state: "KY", zip: "40202" },
]

export default function AccountPage() {
  const [mode, setMode] = useState<"signin" | "register">("signin")
  const [form, setForm] = useState<FormData>({ email: "", password: "" })
  const [reg, setReg] = useState<RegisterData>({ name: "", email: "", password: "", confirm: "" })
  const [showPw, setShowPw] = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [loggedIn, setLoggedIn] = useState(false)
  const [userName, setUserName] = useState("")
  const [error, setError] = useState("")

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!form.email || !form.password) { setError("Please fill in all fields."); return }
    setSubmitting(true)
    setTimeout(() => { 
      setSubmitting(false)
      setUserName(form.email.split("@")[0])
      setLoggedIn(true)
    }, 1200)
  }

  function handleRegister(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    if (!reg.name || !reg.email || !reg.password) { setError("Please fill in all required fields."); return }
    if (reg.password !== reg.confirm) { setError("Passwords do not match."); return }
    if (reg.password.length < 8) { setError("Password must be at least 8 characters."); return }
    setSubmitting(true)
    setTimeout(() => { 
      setSubmitting(false)
      setUserName(reg.name.split(" ")[0])
      setLoggedIn(true)
    }, 1200)
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered": return <Badge className="bg-primary/10 text-primary hover:bg-primary/10">Delivered</Badge>
      case "Shipped": return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">Shipped</Badge>
      case "Processing": return <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">Processing</Badge>
      default: return <Badge variant="outline">{status}</Badge>
    }
  }

  // Dashboard view after login
  if (loggedIn) {
    return (
      <main className="bg-background">
        {/* Hero */}
        <section className="border-b border-border bg-foreground">
          <div className="mx-auto max-w-7xl px-4 py-8">
            <h1 className="text-2xl font-bold text-background md:text-3xl">Welcome back, {userName}!</h1>
            <p className="mt-1 text-sm text-background/60">Manage your orders, addresses, and account settings.</p>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-4 py-8">
          <div className="grid gap-6 lg:grid-cols-3">
            {/* Main content */}
            <div className="space-y-6 lg:col-span-2">
              {/* Recent Orders */}
              <div className="rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <h2 className="flex items-center gap-2 text-base font-bold text-card-foreground">
                    <Package className="h-5 w-5 text-primary" /> Recent Orders
                  </h2>
                  <Link href="/shipping" className="flex items-center gap-1 text-xs font-semibold text-primary hover:underline">
                    View All <ChevronRight className="h-3 w-3" />
                  </Link>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border bg-muted/30">
                        <th className="px-5 py-3 text-left font-semibold text-foreground">Order #</th>
                        <th className="px-5 py-3 text-left font-semibold text-foreground">Date</th>
                        <th className="px-5 py-3 text-left font-semibold text-foreground">Status</th>
                        <th className="px-5 py-3 text-right font-semibold text-foreground">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockOrders.map((order) => (
                        <tr key={order.id} className="border-b border-border last:border-0 hover:bg-muted/20">
                          <td className="px-5 py-3">
                            <Link href="/shipping" className="font-semibold text-primary hover:underline">{order.id}</Link>
                          </td>
                          <td className="px-5 py-3 text-muted-foreground">{order.date}</td>
                          <td className="px-5 py-3">{getStatusBadge(order.status)}</td>
                          <td className="px-5 py-3 text-right font-semibold text-foreground">${order.total.toLocaleString("en-US", { minimumFractionDigits: 2 })}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Saved Addresses */}
              <div className="rounded-xl border border-border bg-card">
                <div className="flex items-center justify-between border-b border-border px-5 py-4">
                  <h2 className="flex items-center gap-2 text-base font-bold text-card-foreground">
                    <MapPin className="h-5 w-5 text-primary" /> Saved Addresses
                  </h2>
                  <button className="text-xs font-semibold text-primary hover:underline">+ Add Address</button>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  {mockAddresses.map((addr) => (
                    <div key={addr.id} className="rounded-lg border border-border p-4">
                      <div className="mb-2 flex items-center justify-between">
                        <Badge variant="outline" className="text-[10px]">{addr.label}</Badge>
                        <button className="text-xs text-primary hover:underline">Edit</button>
                      </div>
                      <p className="text-sm font-semibold text-foreground">{addr.name}</p>
                      <p className="text-sm text-muted-foreground">{addr.street}</p>
                      <p className="text-sm text-muted-foreground">{addr.city}, {addr.state} {addr.zip}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Net-30 CTA */}
              <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
                <div className="mb-3 flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-foreground">Request Net-30 Terms</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Qualified businesses can purchase on terms. Apply for credit to unlock Net-30 payment options.</p>
                <Button asChild className="w-full gap-2">
                  <Link href="/pro">Apply Now <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>

              {/* PowerLink CTA */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="mb-3 flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  <h3 className="font-bold text-foreground">Join PowerLink</h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">Get listed in our installer directory, receive leads, and access exclusive pricing.</p>
                <Button asChild variant="outline" className="w-full gap-2">
                  <Link href="/powerlink">Learn More <ArrowRight className="h-4 w-4" /></Link>
                </Button>
              </div>

              {/* Quick Links */}
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="mb-3 font-bold text-foreground">Quick Links</h3>
                <div className="flex flex-col gap-2">
                  <Link href="/quote" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Clock className="h-4 w-4" /> Request a Quote
                  </Link>
                  <Link href="/shipping" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Package className="h-4 w-4" /> Track Shipments
                  </Link>
                  <Link href="/contact" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary">
                    <Users className="h-4 w-4" /> Contact Support
                  </Link>
                </div>
              </div>

              {/* Sign Out */}
              <button 
                onClick={() => { setLoggedIn(false); setForm({ email: "", password: "" }) }}
                className="w-full rounded-lg border border-border px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:border-destructive hover:text-destructive"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="py-10 md:py-16">
      {/* Hero */}
      <section className="border-b border-border bg-foreground">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center">
          <h1 className="text-2xl font-bold text-background md:text-3xl">My Account</h1>
          <p className="mt-2 text-sm text-background/60">Sign in to access Pro pricing, order history, saved lists, and your dedicated account manager.</p>
        </div>
      </section>

      <div className="mx-auto max-w-md px-4 py-10">
        {/* Tabs */}
        <div className="mb-6 flex gap-2">
          <button onClick={() => { setMode("signin"); setError("") }} className={`flex-1 rounded-lg border px-4 py-3 text-center text-sm font-semibold transition-colors ${mode === "signin" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30"}`}>
            Sign In
          </button>
          <button onClick={() => { setMode("register"); setError("") }} className={`flex-1 rounded-lg border px-4 py-3 text-center text-sm font-semibold transition-colors ${mode === "register" ? "border-primary bg-primary/5 text-primary" : "border-border bg-card text-muted-foreground hover:border-primary/30"}`}>
            Create Account
          </button>
        </div>

        {error && <p className="mb-4 rounded-lg border border-destructive/30 bg-destructive/5 px-3 py-2 text-xs text-destructive">{error}</p>}

        {mode === "signin" ? (
          <form onSubmit={handleSignIn} className="flex flex-col gap-4">
            <div>
              <label htmlFor="signin-email" className="mb-1 block text-xs font-semibold text-foreground">Email Address</label>
              <input id="signin-email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label htmlFor="signin-pw" className="mb-1 block text-xs font-semibold text-foreground">Password</label>
              <div className="relative">
                <input id="signin-pw" type={showPw ? "text" : "password"} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Enter your password" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
                <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" aria-label={showPw ? "Hide password" : "Show password"}>
                  {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>
            <div className="flex items-center justify-between text-xs">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-input" /> Remember me
              </label>
              <button type="button" className="font-semibold text-primary hover:underline">Forgot password?</button>
            </div>
            <Button type="submit" disabled={submitting} className="w-full gap-2">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Signing in...</> : "Sign In"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label htmlFor="reg-name" className="mb-1 block text-xs font-semibold text-foreground">Full Name *</label>
              <input id="reg-name" type="text" required value={reg.name} onChange={(e) => setReg({ ...reg, name: e.target.value })} placeholder="John Smith" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label htmlFor="reg-email" className="mb-1 block text-xs font-semibold text-foreground">Email Address *</label>
              <input id="reg-email" type="email" required value={reg.email} onChange={(e) => setReg({ ...reg, email: e.target.value })} placeholder="you@company.com" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label htmlFor="reg-pw" className="mb-1 block text-xs font-semibold text-foreground">Password *</label>
              <input id="reg-pw" type="password" required value={reg.password} onChange={(e) => setReg({ ...reg, password: e.target.value })} placeholder="Min 8 characters" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <div>
              <label htmlFor="reg-confirm" className="mb-1 block text-xs font-semibold text-foreground">Confirm Password *</label>
              <input id="reg-confirm" type="password" required value={reg.confirm} onChange={(e) => setReg({ ...reg, confirm: e.target.value })} placeholder="Confirm your password" className="w-full rounded-lg border border-input bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20" />
            </div>
            <Button type="submit" disabled={submitting} className="w-full gap-2">
              {submitting ? <><Loader2 className="h-4 w-4 animate-spin" /> Creating account...</> : "Create Account"}
            </Button>
            <p className="text-center text-[10px] text-muted-foreground">
              By creating an account you agree to our <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>
          </form>
        )}

        {/* Quick links */}
        <div className="mt-8 rounded-lg border border-border bg-muted/30 p-4">
          <p className="mb-3 text-xs font-semibold text-foreground">Looking for something else?</p>
          <div className="flex flex-col gap-2">
            <Link href="/pro" className="text-xs font-semibold text-primary hover:underline">Open a Pro Account (trade pricing + Net-30 terms)</Link>
            <Link href="/powerlink" className="text-xs font-semibold text-primary hover:underline">Join the Power Link Installer Network</Link>
            <Link href="/quote" className="text-xs font-semibold text-primary hover:underline">Request a Quote</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
