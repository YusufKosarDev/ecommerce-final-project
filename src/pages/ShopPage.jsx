import { ChevronRight, LayoutGrid, List } from 'lucide-react'
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ShopCategoryCard from '../components/ShopCategoryCard'
import { SHOP_CATEGORIES, SHOP_PRODUCTS, SORT_OPTIONS } from '../data/shopData'
import { buildProductPath } from '../utils/slugify'

function ShopPage() {
  return (
    <>
      {/* Page title + breadcrumb */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 py-8 md:flex-row md:justify-between md:py-6">
          <h1 className="text-2xl font-bold text-dark">Shop</h1>

          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-sm font-bold">
              <li>
                <Link to="/" className="text-dark">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center text-gray-300">
                <ChevronRight size={16} />
              </li>
              <li className="text-muted">Shop</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Category cards */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 pb-8 md:flex-row md:gap-4">
          {SHOP_CATEGORIES.map((category) => (
            <ShopCategoryCard
              key={category.id}
              {...category}
              className="h-44 w-full md:h-56 md:w-1/5"
            />
          ))}
        </div>
      </section>

      {/* Results + view + sort + filter */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 py-6 md:flex-row md:justify-between">
          <p className="text-sm font-bold text-muted">
            Showing all {SHOP_PRODUCTS.length} results
          </p>

          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-muted">Views:</span>
            <button
              type="button"
              aria-label="Grid view"
              className="flex h-10 w-10 items-center justify-center border border-gray-200 text-dark"
            >
              <LayoutGrid size={18} />
            </button>
            <button
              type="button"
              aria-label="List view"
              className="flex h-10 w-10 items-center justify-center border border-gray-200 text-muted"
            >
              <List size={18} />
            </button>
          </div>

          <div className="flex w-full items-center gap-3 md:w-auto">
            <select
              aria-label="Sort products"
              defaultValue={SORT_OPTIONS[0]}
              className="h-10 w-full border border-gray-200 bg-light px-4 text-sm text-muted outline-none md:w-48"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>

            <button
              type="button"
              className="h-10 shrink-0 bg-primary px-6 text-sm font-bold text-white"
            >
              Filter
            </button>
          </div>
        </div>
      </section>

      {/* Product grid */}
      <section className="w-full bg-white">
        <div className="mx-auto w-full max-w-screen-xl px-4 pb-12 md:pb-20">
          <div className="-mx-3 flex flex-wrap">
            {SHOP_PRODUCTS.map((product) => (
              <div key={product.id} className="w-full px-3 pb-8 md:w-1/2 lg:w-1/4">
                <ProductCard {...product} to={buildProductPath(product)} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default ShopPage
