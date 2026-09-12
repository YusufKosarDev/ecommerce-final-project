import { Handshake, Rocket, ShieldCheck } from 'lucide-react'

const img = (seed, w, h) => `https://picsum.photos/seed/${seed}/${w}/${h}`

export const ABOUT_IMAGES = {
  hero: img('bandage-about-hero', 800, 700),
  video: img('bandage-about-video', 1200, 700),
}

export const ABOUT_STATS = [
  { id: 1, value: '15K', label: 'Happy Customers' },
  { id: 2, value: '150K', label: 'Monthly Visitors' },
  { id: 3, value: '15', label: 'Countries Worldwide' },
  { id: 4, value: '100+', label: 'Top Partners' },
]

export const ABOUT_VALUES = [
  {
    id: 1,
    icon: Rocket,
    title: 'Fast delivery',
    description:
      'We know how large objects will act, but things on a small scale just do not act that way.',
  },
  {
    id: 2,
    icon: ShieldCheck,
    title: 'Secure shopping',
    description:
      'We know how large objects will act, but things on a small scale just do not act that way.',
  },
  {
    id: 3,
    icon: Handshake,
    title: 'Trusted partners',
    description:
      'We know how large objects will act, but things on a small scale just do not act that way.',
  },
]
