import { Star } from "lucide-react"

const sizes = {
  xs: "h-2.5 w-2.5",
  sm: "h-3 w-3",
  md: "h-3.5 w-3.5",
} as const

export function StarRating({ rating, size = "sm", className = "" }: { rating: number; size?: keyof typeof sizes; className?: string }) {
  const s = sizes[size]
  return (
    <div className={`flex items-center gap-0.5 ${className}`} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.min(1, Math.max(0, rating - i))
        return (
          <span key={i} className={`relative inline-block ${s}`}>
            <Star className={`absolute inset-0 ${s} fill-muted text-muted`} />
            {fill > 0 && (
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <Star className={`${s} fill-accent text-accent`} />
              </span>
            )}
          </span>
        )
      })}
    </div>
  )
}
