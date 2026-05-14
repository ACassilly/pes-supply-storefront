// Re-exports Medusa functions under stable interface so any import from '@/lib/commerce' works.
export { getProducts, getProduct, getCategories, getCategory, searchProducts, formatPrice, medusa } from '@/lib/medusa'
export type { MedusaProduct as Product, MedusaCategory as Category, MedusaCollection as Collection, MedusaVariant as Variant } from '@/lib/medusa'
