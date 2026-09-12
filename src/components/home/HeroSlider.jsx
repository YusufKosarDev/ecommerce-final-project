import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { HERO_SLIDES } from '../../data/homeData'

function HeroSlider() {
  const [activeIndex, setActiveIndex] = useState(0)
  const slide = HERO_SLIDES[activeIndex]

  const goTo = (step) =>
    setActiveIndex(
      (current) => (current + step + HERO_SLIDES.length) % HERO_SLIDES.length,
    )

  return (
    <section className={`relative flex w-full overflow-hidden ${slide.background}`}>
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center px-12 pt-16 text-center text-white md:flex-row md:items-center md:px-16 md:pt-0 md:text-left">
        <div className="z-10 flex w-full flex-col items-center gap-6 md:w-1/2 md:items-start md:py-40">
          <p className="text-sm font-bold tracking-widest">{slide.season}</p>
          <h1 className={`font-bold leading-tight ${slide.titleClass}`}>{slide.title}</h1>
          <p className="max-w-md text-base font-normal md:text-lg">{slide.description}</p>

          <div className="flex flex-col items-center gap-6 md:flex-row">
            {slide.price && <span className="text-2xl font-bold">{slide.price}</span>}
            <button
              type="button"
              className="bg-success px-8 py-4 text-sm font-bold text-white"
            >
              {slide.cta}
            </button>
          </div>
        </div>

        <div className="mt-10 flex w-full justify-center md:absolute md:right-0 md:top-0 md:mt-0 md:h-full md:w-1/2 md:justify-end">
          <img
            src={slide.image}
            alt={slide.title}
            className="h-80 w-full max-w-md object-cover md:h-full md:max-w-none"
          />
        </div>
      </div>

      <button
        type="button"
        aria-label="Previous slide"
        onClick={() => goTo(-1)}
        className="absolute left-2 top-1/2 -translate-y-1/2 text-white md:left-6"
      >
        <ChevronLeft size={44} strokeWidth={1} />
      </button>
      <button
        type="button"
        aria-label="Next slide"
        onClick={() => goTo(1)}
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white md:right-6"
      >
        <ChevronRight size={44} strokeWidth={1} />
      </button>

      <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
        {HERO_SLIDES.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-label={`Go to slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            className={`h-1 w-16 ${index === activeIndex ? 'bg-white' : 'bg-white/40'}`}
          />
        ))}
      </div>
    </section>
  )
}

export default HeroSlider
