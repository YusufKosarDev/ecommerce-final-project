const TURKISH_MAP = {
  ı: 'i',
  İ: 'i',
  ğ: 'g',
  Ğ: 'g',
  ü: 'u',
  Ü: 'u',
  ş: 's',
  Ş: 's',
  ö: 'o',
  Ö: 'o',
  ç: 'c',
  Ç: 'c',
}

export function slugify(value) {
  return String(value)
    .replace(/[ıİğĞüÜşŞöÖçÇ]/g, (char) => TURKISH_MAP[char])
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

// /shop/:gender/:categoryName/:categoryId/:productNameSlug/:productId
export function buildProductPath({ gender, categoryName, categoryId, title, id }) {
  return `/shop/${slugify(gender)}/${slugify(categoryName)}/${categoryId}/${slugify(title)}/${id}`
}
