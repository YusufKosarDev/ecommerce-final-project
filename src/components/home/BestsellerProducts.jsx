import ProductCard from '../ProductCard'
import { BESTSELLER_PRODUCTS } from '../../data/homeData'

function BestsellerProducts() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-12 md:py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-xl text-muted">Featured Products</p>
          <h2 className="text-2xl font-bold text-dark">BESTSELLER PRODUCTS</h2>
          <p className="max-w-sm text-sm text-muted">
            Problems trying to resolve the conflict between
          </p>
        </div>

        <div className="-mx-3 flex flex-wrap">
          {BESTSELLER_PRODUCTS.map((product) => (
            <div key={product.id} className="w-full px-3 pb-6 md:w-1/2 lg:w-1/4">
              <ProductCard {...product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default BestsellerProducts
