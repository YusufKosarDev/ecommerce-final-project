import CategoryCard from '../CategoryCard'
import { CATEGORIES } from '../../data/homeData'

function EditorsPick() {
  const [men, women, accessories, kids] = CATEGORIES

  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-12 md:py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <h2 className="text-2xl font-bold text-dark">EDITOR&apos;S PICK</h2>
          <p className="max-w-sm text-sm text-muted">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="flex flex-col gap-4 md:flex-row">
          <CategoryCard {...men} className="h-[500px] md:h-[500px] md:w-1/2" />
          <CategoryCard {...women} className="h-[500px] md:h-[500px] md:w-1/4" />

          <div className="flex flex-col gap-4 md:w-1/4">
            <CategoryCard {...accessories} className="h-[230px] md:h-[242px]" />
            <CategoryCard {...kids} className="h-[240px] md:h-[242px]" />
          </div>
        </div>
      </div>
    </section>
  )
}

export default EditorsPick
