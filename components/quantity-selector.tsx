"use client"

import { Minus, Plus } from "lucide-react"

interface QuantitySelectorProps {
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
  size?: "sm" | "default"
}

export function QuantitySelector({
  value,
  onChange,
  min = 1,
  max = 999,
  size = "default"
}: QuantitySelectorProps) {
  const decrease = () => {
    if (value > min) onChange(value - 1)
  }

  const increase = () => {
    if (value < max) onChange(value + 1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10)
    if (isNaN(val)) return
    if (val < min) onChange(min)
    else if (val > max) onChange(max)
    else onChange(val)
  }

  const buttonSize = size === "sm" ? "h-8 w-8" : "h-10 w-10"
  const inputSize = size === "sm" ? "w-12 h-8 text-sm" : "w-14 h-10 text-base"

  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        onClick={decrease}
        disabled={value <= min}
        className={`${buttonSize} flex items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50`}
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <input
        type="number"
        value={value}
        onChange={handleInputChange}
        min={min}
        max={max}
        className={`${inputSize} rounded-md border border-border bg-background text-center font-semibold text-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none`}
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={increase}
        disabled={value >= max}
        className={`${buttonSize} flex items-center justify-center rounded-md border border-border bg-card text-foreground transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50`}
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  )
}
