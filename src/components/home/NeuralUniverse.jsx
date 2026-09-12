import { NEURAL_UNIVERSE } from '../../data/homeData'

function NeuralUniverse() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-8 px-4 py-12 md:flex-row md:gap-16 md:py-20">
        <div className="order-2 flex w-full justify-center md:order-1 md:w-1/2">
          <img
            src={NEURAL_UNIVERSE.image}
            alt={NEURAL_UNIVERSE.title}
            className="h-80 w-full max-w-md object-cover md:h-[560px] md:max-w-none"
          />
        </div>

        <div className="order-1 flex w-full flex-col items-center gap-6 text-center md:order-2 md:w-1/2 md:items-start md:text-left">
          <p className="text-sm font-bold tracking-widest text-muted">
            {NEURAL_UNIVERSE.season}
          </p>
          <h2 className="text-3xl font-bold leading-tight text-dark md:text-4xl">
            {NEURAL_UNIVERSE.title}
          </h2>
          <p className="max-w-md text-base text-muted md:text-lg">
            {NEURAL_UNIVERSE.description}
          </p>

          <div className="flex w-full flex-col items-center gap-4 md:w-auto md:flex-row">
            <button
              type="button"
              className="w-full bg-success px-8 py-4 text-sm font-bold text-white md:w-auto"
            >
              {NEURAL_UNIVERSE.primaryCta}
            </button>
            <button
              type="button"
              className="w-full border border-success px-8 py-4 text-sm font-bold text-success md:w-auto"
            >
              {NEURAL_UNIVERSE.secondaryCta}
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default NeuralUniverse
