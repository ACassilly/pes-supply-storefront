import Image from "next/image"

const iconMap: Record<string, string> = {
  "arrow-right": "/images/icon-arrow-right.jpg",
  "arrow-up": "/images/icon-arrow-up.jpg",
  "arrow-down": "/images/icon-arrow-down.jpg",
  "arrow-right-left": "/images/icon-arrows-exchange.jpg",
  "chevron-left": "/images/icon-chevron-left.jpg",
  "chevron-right": "/images/icon-chevron-right.jpg",
  "chevron-down": "/images/icon-chevron-down.jpg",
  "chevron-up": "/images/icon-chevron-up.jpg",
  "search": "/images/icon-search.jpg",
  "shopping-cart": "/images/icon-cart.jpg",
  "user": "/images/icon-user.jpg",
  "users": "/images/icon-users.jpg",
  "user-plus": "/images/icon-user-plus.jpg",
  "user-check": "/images/icon-account-mgr.jpg",
  "menu": "/images/icon-menu.jpg",
  "x": "/images/icon-close.jpg",
  "heart": "/images/icon-heart.jpg",
  "rotate-ccw": "/images/icon-rotate.jpg",
  "plus": "/images/icon-plus.jpg",
  "minus": "/images/icon-minus.jpg",
  "trash-2": "/images/icon-trash.jpg",
  "check": "/images/icon-check.jpg",
  "check-circle": "/images/icon-check-circle.jpg",
  "check-circle-2": "/images/icon-check-circle.jpg",
  "x-circle": "/images/icon-x-circle.jpg",
  "lock": "/images/icon-lock.jpg",
  "send": "/images/icon-send.jpg",
  "star": "/images/icon-star.jpg",
  "star-filled": "/images/icon-star-filled.jpg",
  "sparkles": "/images/icon-sparkles.jpg",
  "file-text": "/images/icon-file-text.jpg",
  "file-down": "/images/icon-file-download.jpg",
  "file-check": "/images/icon-file-check.jpg",
  "external-link": "/images/icon-external-link.jpg",
  "package": "/images/icon-package.jpg",
  "package-open": "/images/icon-package-open.jpg",
  "clock": "/images/icon-clock.jpg",
  "alert-triangle": "/images/icon-alert.jpg",
  "help-circle": "/images/icon-help.jpg",
  "eye": "/images/icon-eye.jpg",
  "credit-card": "/images/icon-credit-card.jpg",
  "headphones": "/images/icon-headphones.jpg",
  "globe": "/images/icon-globe.jpg",
  "route": "/images/icon-route.jpg",
  "loader-2": "/images/icon-loader.jpg",
  "book-open": "/images/icon-book.jpg",
  "clipboard-list": "/images/icon-clipboard.jpg",
  "login": "/images/icon-login.jpg",
  "scale": "/images/icon-scale.jpg",
  "landmark": "/images/icon-landmark.jpg",
  "hard-hat": "/images/icon-hardhat.jpg",
  "cpu": "/images/icon-cpu.jpg",
  "target": "/images/icon-target.jpg",
  "lightbulb": "/images/icon-lightbulb.jpg",
  "building": "/images/icon-building.jpg",
  "building-2": "/images/icon-building.jpg",
  "wrench": "/images/icon-wrench.jpg",
  "factory": "/images/icon-factory.jpg",
  "home": "/images/icon-home.jpg",
  "percent": "/images/icon-percent.jpg",
  "sliders-horizontal": "/images/icon-sliders.jpg",
  "tag": "/images/icon-tag.jpg",
  "calculator": "/images/icon-calculator.jpg",
  "flame": "/images/icon-flame.jpg",
  "bar-chart-3": "/images/icon-bar-chart.jpg",
  "trending-up": "/images/icon-trending-up.jpg",
  "leaf": "/images/icon-leaf.jpg",
  "phone": "/images/icon-phone.jpg",
  "mail": "/images/icon-email.jpg",
  "message-circle": "/images/icon-chat.jpg",
  "map-pin": "/images/icon-mappin.jpg",
  "truck": "/images/icon-shipping.jpg",
  "shield-check": "/images/icon-warranty.jpg",
  "zap": "/images/icon-leads.jpg",
  "dollar-sign": "/images/icon-pricing.jpg",
  "warehouse": "/images/icon-warehouse.jpg",
  "award": "/images/icon-award.jpg",
}

interface IconProps {
  name: string
  className?: string
  size?: number
}

export function Icon({ name, className = "h-4 w-4", size }: IconProps) {
  const src = iconMap[name]
  if (!src) {
    return <span className={className} aria-hidden="true" />
  }
  const s = size || 20
  return (
    <Image
      src={src}
      alt=""
      width={s}
      height={s}
      className={`${className} object-contain`}
      aria-hidden="true"
    />
  )
}
