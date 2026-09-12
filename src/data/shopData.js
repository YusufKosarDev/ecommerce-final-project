const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`

const PRODUCT_COLORS = ['bg-primary', 'bg-[#23856D]', 'bg-[#E77C40]', 'bg-dark']

// Geçici route metadata - T16'da gerçek API verisiyle değiştirilecek
const ROUTE_META = [
  { gender: 'kadin', categoryName: 'elbise', categoryId: 1 },
  { gender: 'erkek', categoryName: 'tisort', categoryId: 2 },
  { gender: 'kadin', categoryName: 'ayakkabi', categoryId: 3 },
  { gender: 'erkek', categoryName: 'ceket', categoryId: 4 },
]

export const SHOP_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: 'Graphic Design',
  department: 'English Department',
  oldPrice: '$16.48',
  newPrice: '$6.48',
  colors: PRODUCT_COLORS,
  image: img(`bandage-shop-product-${i + 1}`, 480, 860),
  ...ROUTE_META[i % ROUTE_META.length],
}))

export const SORT_OPTIONS = [
  'Popularity',
  'Price: Low to High',
  'Price: High to Low',
  'Newest',
]
