"use client"

import { useState, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { ChevronDown, ChevronUp, X, SlidersHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"

interface FilterOption {
  value: string
  label: string
  count?: number
}

interface ProductFiltersProps {
  brands: FilterOption[]
  priceRanges: FilterOption[]
  totalProducts: number
  deptSlug: string
}

const SORT_OPTIONS = [
  { value: "best-selling", label: "Best Selling" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "name-asc", label: "Name: A to Z" },
  { value: "name-desc", label: "Name: Z to A" },
]

export function ProductFilters({ brands, priceRanges, totalProducts, deptSlug }: ProductFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [brandsOpen, setBrandsOpen] = useState(true)
  const [priceOpen, setPriceOpen] = useState(true)
  const [mobileOpen, setMobileOpen] = useState(false)

  const currentSort = searchParams.get("sort") || "best-selling"
  const currentBrands = searchParams.get("brands")?.split(",").filter(Boolean) || []
  const currentPriceRange = searchParams.get("price") || ""
  const currentPage = parseInt(searchParams.get("page") || "1", 10)

  const updateFilters = useCallback((updates: Record<string, string | null>) => {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === "") {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    // Reset to page 1 when filters change
    if (!updates.page) params.delete("page")
    router.push(`/departments/${deptSlug}?${params.toString()}`)
  }, [router, searchParams, deptSlug])

  const toggleBrand = (brand: string) => {
    const newBrands = currentBrands.includes(brand)
      ? currentBrands.filter((b) => b !== brand)
      : [...currentBrands, brand]
    updateFilters({ brands: newBrands.length > 0 ? newBrands.join(",") : null })
  }

  const clearAllFilters = () => {
    router.push(`/departments/${deptSlug}`)
  }

  const hasActiveFilters = currentBrands.length > 0 || currentPriceRange

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Clear filters */}
      {hasActiveFilters && (
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="w-full justify-start text-muted-foreground hover:text-destructive">
          <X className="mr-2 h-4 w-4" /> Clear all filters
        </Button>
      )}

      {/* Brand filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => setBrandsOpen(!brandsOpen)}
          className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground"
        >
          Brand
          {brandsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {brandsOpen && (
          <div className="mt-2 max-h-48 space-y-2 overflow-y-auto pr-2">
            {brands.slice(0, 15).map((brand) => (
              <label key={brand.value} className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox
                  checked={currentBrands.includes(brand.value)}
                  onCheckedChange={() => toggleBrand(brand.value)}
                />
                <span className="flex-1 truncate text-muted-foreground">{brand.label}</span>
                {brand.count !== undefined && (
                  <span className="text-xs text-muted-foreground">({brand.count})</span>
                )}
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price range filter */}
      <div className="border-b border-border pb-4">
        <button
          onClick={() => setPriceOpen(!priceOpen)}
          className="flex w-full items-center justify-between py-2 text-sm font-semibold text-foreground"
        >
          Price Range
          {priceOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </button>
        {priceOpen && (
          <div className="mt-2 space-y-2">
            {priceRanges.map((range) => (
              <label key={range.value} className="flex cursor-pointer items-center gap-2 text-sm">
                <Checkbox
                  checked={currentPriceRange === range.value}
                  onCheckedChange={() => updateFilters({ price: currentPriceRange === range.value ? null : range.value })}
                />
                <span className="text-muted-foreground">{range.label}</span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <label className="flex cursor-pointer items-center gap-2 text-sm">
          <Checkbox
            checked={searchParams.get("inStock") === "true"}
            onCheckedChange={(checked) => updateFilters({ inStock: checked ? "true" : null })}
          />
          <span className="text-muted-foreground">In Stock Only</span>
        </label>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop filter sidebar - hidden on mobile */}
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="sticky top-24">
          <h2 className="mb-4 text-sm font-bold text-foreground">Filters</h2>
          <FilterContent />
        </div>
      </aside>

      {/* Mobile filter + sort bar */}
      <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="gap-2">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {hasActiveFilters && (
                <span className="ml-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">
                  {currentBrands.length + (currentPriceRange ? 1 : 0)}
                </span>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80">
            <SheetHeader>
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <div className="mt-6">
              <FilterContent />
            </div>
          </SheetContent>
        </Sheet>

        <Select value={currentSort} onValueChange={(value) => updateFilters({ sort: value })}>
          <SelectTrigger className="w-44">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Desktop sort dropdown */}
      <div className="mb-4 hidden items-center justify-between lg:flex">
        <p className="text-sm text-muted-foreground">{totalProducts} products</p>
        <Select value={currentSort} onValueChange={(value) => updateFilters({ sort: value })}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((opt) => (
              <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </>
  )
}

// Pagination component
export function ProductPagination({ currentPage, totalPages, deptSlug }: { currentPage: number; totalPages: number; deptSlug: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page === 1) {
      params.delete("page")
    } else {
      params.set("page", String(page))
    }
    router.push(`/departments/${deptSlug}?${params.toString()}`)
  }

  if (totalPages <= 1) return null

  const pages: (number | "...")[] = []
  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
      pages.push(i)
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...")
    }
  }

  return (
    <div className="mt-8 flex items-center justify-center gap-1">
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
      >
        Previous
      </Button>
      {pages.map((page, i) =>
        page === "..." ? (
          <span key={`ellipsis-${i}`} className="px-2 text-muted-foreground">...</span>
        ) : (
          <Button
            key={page}
            variant={page === currentPage ? "default" : "outline"}
            size="sm"
            onClick={() => goToPage(page)}
            className="min-w-[2.5rem]"
          >
            {page}
          </Button>
        )
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
      >
        Next
      </Button>
    </div>
  )
}
