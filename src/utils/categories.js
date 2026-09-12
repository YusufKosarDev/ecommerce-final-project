import { slugify } from './slugify'

// Backend /categories shape:
//   { id, code: "k:tisort", title: "Tişört", img, rating, gender: "k" | "e" }
// NOT: code alanindaki slug tutarsiz (ornegin id 9 -> "e:ayakkabı", Turkce karakterli).
// Bu yuzden URL slug'i her zaman slugify(title) ile uretilir.

const GENDER_SLUGS = { k: 'kadin', e: 'erkek' }
const GENDER_LABELS = { k: 'Kadın', e: 'Erkek' }

export function getGenderSlug(gender) {
  const key = String(gender ?? '').toLowerCase()
  return GENDER_SLUGS[key] ?? slugify(gender)
}

export function getGenderLabel(gender) {
  const key = String(gender ?? '').toLowerCase()
  return GENDER_LABELS[key] ?? String(gender ?? '')
}

// /shop/:gender/:categoryName/:categoryId
export function buildCategoryPath(category) {
  if (!category) return '/shop'
  return `/shop/${getGenderSlug(category.gender)}/${slugify(category.title)}/${category.id}`
}

// Rating'e gore en yuksek N kategori. Redux state'i degistirmez, kopya uzerinde siralar.
export function getTopCategories(categories, count = 5) {
  if (!Array.isArray(categories)) return []
  return [...categories]
    .sort((a, b) => Number(b?.rating ?? 0) - Number(a?.rating ?? 0))
    .slice(0, count)
}

// Header dropdown icin cinsiyete gore gruplama
export function groupCategoriesByGender(categories) {
  if (!Array.isArray(categories)) return []
  const groups = new Map()
  categories.forEach((category) => {
    const key = String(category?.gender ?? '').toLowerCase()
    if (!groups.has(key)) groups.set(key, { gender: key, label: getGenderLabel(key), items: [] })
    groups.get(key).items.push(category)
  })
  return [...groups.values()]
}
