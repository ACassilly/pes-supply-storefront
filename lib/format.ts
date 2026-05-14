/**
 * Formatting utilities — currency, dates, numbers.
 */

export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency.toUpperCase(),
    minimumFractionDigits: 2,
  }).format(amount / 100)
}

export function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(iso))
}

export function formatOrderId(displayId: number): string {
  return `#${String(displayId).padStart(5, '0')}`
}

export function truncate(str: string, maxLength = 120): string {
  if (str.length <= maxLength) return str
  return str.slice(0, maxLength - 1) + '…'
}
