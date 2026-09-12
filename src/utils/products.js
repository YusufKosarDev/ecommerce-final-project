import { getGenderSlug } from './categories'
import { slugify } from './slugify'

// Backend /products shape:
//   { products: [{ id, name, description, price, stock, store_id,
//                  category_id, rating, sell_count, images: [{ url, index }] }],
//     total: 587 }

export function getProductImage(product) {
  const images = Array.isArray(product?.images) ? product.images : []
  if (images.length === 0) return ''
  const sorted = [...images].sort((a, b) => Number(a?.index ?? 0) - Number(b?.index ?? 0))
  return sorted[0]?.url ?? ''
}

export function formatPrice(value) {
  const price = Number(value)
  if (!Number.isFinite(price)) return ''
  return `$${price.toFixed(2)}`
}

export function findCategoryById(categories, categoryId) {
  if (!Array.isArray(categories)) return undefined
  return categories.find((category) => String(category?.id) === String(categoryId))
}

// /shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
// Kategori Redux listesinden eslestirilir; hard-coded metadata kullanilmaz.
// Kategori henuz yuklenmemisse route formati korunur, id'ler gercek kalir.
export function buildProductPathFromApi(product, categories) {
  const category = findCategoryById(categories, product?.category_id)
  const gender = category ? getGenderSlug(category.gender) : 'unisex'
  const categoryName = category ? slugify(category.title) : 'kategori'
  const categoryId = product?.category_id ?? category?.id ?? 0
  return `/shop/${gender}/${categoryName}/${categoryId}/${slugify(product?.name)}/${product?.id}`
}

// API urununu mevcut ProductCard prop yapisina cevirir.
// Gercek veri kaybedilmez; ProductCard'in bekledigi alanlara eslenir.
export function toProductCardProps(product, categories) {
  const category = findCategoryById(categories, product?.category_id)
  return {
    image: getProductImage(product),
    title: product?.name ?? '',
    department: category?.title ?? '',
    newPrice: formatPrice(product?.price),
    to: buildProductPathFromApi(product, categories),
  }
}
