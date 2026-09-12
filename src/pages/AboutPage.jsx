import { Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import StatItem from '../components/StatItem'
import ValueCard from '../components/ValueCard'
import { ABOUT_IMAGES, ABOUT_STATS, ABOUT_VALUES } from '../data/aboutData'

function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-10 px-4 py-12 md:flex-row md:gap-12 md:py-20">
          <div className="flex w-full flex-col items-center gap-6 text-center md:w-1/2 md:items-start md:text-left">
            <p className="text-sm font-bold tracking-widest text-dark">ABOUT COMPANY</p>

            <h1 className="text-4xl font-bold leading-tight text-dark md:text-6xl">
              ABOUT US
            </h1>

            <p className="max-w-md text-base text-muted md:text-lg">
              We know how large objects will act, but things on a small scale just do not
              act that way.
            </p>

            <Link
              to="/contact"
              className="rounded bg-primary px-9 py-4 text-sm font-bold text-white"
            >
              Get Quote Now
            </Link>
          </div>

          <div className="flex w-full justify-center md:w-1/2">
            <img
              src={ABOUT_IMAGES.hero}
              alt="Our team at work"
              className="h-72 w-full max-w-md object-cover md:h-[420px] md:max-w-none"
            />
          </div>
        </div>
      </section>

      {/* Intro + stats */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-12 px-4 py-12 md:py-20">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:gap-16">
            <div className="flex w-full flex-col gap-3 md:w-1/2">
              <p className="text-sm font-bold text-primary">Problems trying</p>
              <h2 className="text-2xl font-bold leading-snug text-dark md:text-4xl">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              </h2>
            </div>

            <p className="w-full text-sm text-muted md:w-1/2 md:text-base">
              Problems trying to resolve the conflict between the two major realms of
              Classical physics: Newtonian mechanics and quantum mechanics.
            </p>
          </div>

          <div className="flex flex-col gap-10 md:flex-row md:gap-6">
            {ABOUT_STATS.map((stat) => (
              <StatItem key={stat.id} {...stat} />
            ))}
          </div>
        </div>
      </section>

      {/* Video / media placeholder */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl px-4 pb-12 md:pb-20">
          <div className="relative flex w-full">
            <img
              src={ABOUT_IMAGES.video}
              alt="Company introduction"
              className="h-64 w-full rounded object-cover md:h-[520px]"
            />
            <button
              type="button"
              aria-label="Play introduction video"
              className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-white md:h-20 md:w-20"
            >
              <Play size={28} fill="currentColor" strokeWidth={0} />
            </button>
          </div>
        </div>
      </section>

      {/* Company values */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-12 md:py-20">
          <div className="flex flex-col items-center gap-3 text-center">
            <h2 className="text-2xl font-bold text-dark md:text-4xl">What we value</h2>
            <p className="max-w-xl text-sm text-muted">
              Problems trying to resolve the conflict between the two major realms of
              Classical physics: Newtonian mechanics
            </p>
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:gap-6">
            {ABOUT_VALUES.map((value) => (
              <div key={value.id} className="flex w-full md:w-1/3">
                <ValueCard {...value} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="w-full bg-dark">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-6 px-4 py-12 text-center md:py-20">
          <p className="text-sm font-bold tracking-widest text-white">WORK WITH US</p>

          <h2 className="max-w-xl text-2xl font-bold leading-snug text-white md:text-4xl">
            Now Let&apos;s grow Yours
          </h2>

          <p className="max-w-xl text-sm text-gray-300">
            The gradual accumulation of information about atomic and small-scale behavior
            during the first quarter of the 20th century.
          </p>

          <Link
            to="/contact"
            className="rounded border border-primary bg-primary px-9 py-4 text-sm font-bold text-white"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  )
}

export default AboutPage
