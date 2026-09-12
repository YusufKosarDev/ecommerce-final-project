const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const SHOP_CATEGORIES = [
  { id: 1, title: 'CLOTHS', itemCount: 5, image: img('bandage-shop-cat-cloths', 500, 400) },
  { id: 2, title: 'SHOES', itemCount: 5, image: img('bandage-shop-cat-shoes', 500, 400) },
  { id: 3, title: 'ACCESSORIES', itemCount: 5, image: img('bandage-shop-cat-acc', 500, 400) },
  { id: 4, title: 'BAGS', itemCount: 5, image: img('bandage-shop-cat-bags', 500, 400) },
  { id: 5, title: 'KIDS', itemCount: 5, image: img('bandage-shop-cat-kids', 500, 400) },
]

const PRODUCT_COLORS = ['bg-primary', 'bg-[#23856D]', 'bg-[#E77C40]', 'bg-dark']

export const SHOP_PRODUCTS = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: 'Graphic Design',
  department: 'English Department',
  oldPrice: '$16.48',
  newPrice: '$6.48',
  colors: PRODUCT_COLORS,
  image: img(`bandage-shop-product-${i + 1}`, 480, 860),
}))

export const SORT_OPTIONS = [
  'Popularity',
  'Price: Low to High',
  'Price: High to Low',
  'Newest',
]
