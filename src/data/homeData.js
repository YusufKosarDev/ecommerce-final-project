const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const NAV_LINKS = [
  { label: 'Home', path: '/' },
  { label: 'Shop', path: '/shop' },
  { label: 'About', path: '/about' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
  { label: 'Pages', path: '/pages' },
]

export const HERO_SLIDES = [
  {
    id: 1,
    season: 'SUMMER 2020',
    title: 'NEW COLLECTION',
    titleClass: 'text-4xl uppercase md:text-6xl',
    description: 'We know how large objects will act, but things on a small scale.',
    cta: 'SHOP NOW',
    background: 'bg-primary',
    image: img('bandage-hero-1', 800, 900),
  },
  {
    id: 2,
    season: 'SUMMER 2020',
    title: 'Vita Classic Product',
    titleClass: 'text-4xl md:text-5xl',
    description: 'We know how large objects will act, We know how are objects will act, We know',
    price: '$16.48',
    cta: 'ADD TO CART',
    background: 'bg-[#23856D]',
    image: img('bandage-hero-2', 800, 900),
  },
]

export const CATEGORIES = [
  { id: 1, label: 'MEN', image: img('bandage-cat-men', 700, 900) },
  { id: 2, label: 'WOMEN', image: img('bandage-cat-women', 500, 900) },
  { id: 3, label: 'ACCESSORIES', image: img('bandage-cat-acc', 500, 400) },
  { id: 4, label: 'KIDS', image: img('bandage-cat-kids', 500, 400) },
]

const PRODUCT_COLORS = ['bg-primary', 'bg-[#23856D]', 'bg-[#E77C40]', 'bg-dark']

export const BESTSELLER_PRODUCTS = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: 'Graphic Design',
  department: 'English Department',
  oldPrice: '$16.48',
  newPrice: '$6.48',
  colors: PRODUCT_COLORS,
  image: img(`bandage-product-${i + 1}`, 480, 860),
}))

export const NEURAL_UNIVERSE = {
  season: 'SUMMER 2020',
  title: 'Part of the Neural Universe',
  description: 'We know how large objects will act, but things on a small scale.',
  primaryCta: 'BUY NOW',
  secondaryCta: 'READ MORE',
  image: img('bandage-neural', 700, 760),
}

export const FEATURED_POSTS = [
  {
    id: 1,
    image: img('bandage-blog-1', 700, 610),
    tags: ['Google', 'Trending', 'New'],
    title: "Loudest à la Madison #1 (L'integral)",
    excerpt:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: '22 April 2021',
    comments: '10 comments',
  },
  {
    id: 2,
    image: img('bandage-blog-2', 700, 610),
    tags: ['Google', 'Trending', 'New'],
    title: "Loudest à la Madison #1 (L'integral)",
    excerpt:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: '22 April 2021',
    comments: '10 comments',
  },
  {
    id: 3,
    image: img('bandage-blog-3', 700, 610),
    tags: ['Google', 'Trending', 'New'],
    title: "Loudest à la Madison #1 (L'integral)",
    excerpt:
      "We focus on ergonomics and meeting you where you work. It's only a keystroke away.",
    date: '22 April 2021',
    comments: '10 comments',
  },
]

export const FOOTER_COLUMNS = [
  {
    title: 'Company Info',
    links: ['About Us', 'Carrier', 'We are hiring', 'Blog'],
  },
  {
    title: 'Legal',
    links: ['About Us', 'Carrier', 'We are hiring', 'Blog'],
  },
  {
    title: 'Features',
    links: ['Business Marketing', 'User Analytic', 'Live Chat', 'Unlimited Support'],
  },
  {
    title: 'Resources',
    links: ['IOS & Android', 'Watch a Demo', 'Customers', 'API'],
  },
]
