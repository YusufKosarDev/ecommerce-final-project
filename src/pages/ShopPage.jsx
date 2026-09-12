import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { ChevronRight, LayoutGrid, List, LoaderCircle } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import ShopCategoryCard from '../components/ShopCategoryCard'
import { SHOP_PRODUCTS, SORT_OPTIONS } from '../data/shopData'
import { getApiErrorMessage } from '../api/axiosInstance'
import { fetchCategories } from '../store/actions/productActions'
import { buildCategoryPath, getGenderLabel, getTopCategories } from '../utils/categories'
import { buildProductPath } from '../utils/slugify'

function ShopPage() {
  const dispatch = useDispatch()
  const categories = useSelector((state) => state.product.categories)

  // T14'te products?category=... icin kullanilacak; simdilik sadece okunuyor
  const { categoryId } = useParams()

  const [isCategoriesLoading, setIsCategoriesLoading] = useState(categories.length === 0)
  const [categoriesError, setCategoriesError] = useState('')

  useEffect(() => {
    let isActive = true

    dispatch(fetchCategories())
      .then(() => {
        if (isActive) setCategoriesError('')
      })
      .catch((error) => {
        if (isActive) setCategoriesError(getApiErrorMessage(error, 'Kategoriler yuklenemedi.'))
      })
      .finally(() => {
        if (isActive) setIsCategoriesLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [dispatch])

  // Rating'e gore en yuksek 5 kategori (Redux state'i degistirmeden)
  const topCategories = getTopCategories(categories, 5)

  // Route'tan gelen kategori. T14'te urun filtrelemesi icin kullanilacak.
  const selectedCategory = categoryId
    ? categories.find((category) => String(category.id) === String(categoryId))
    : undefined

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
              {selectedCategory && (
                <>
                  <li aria-hidden="true" className="flex items-center text-gray-300">
                    <ChevronRight size={16} />
                  </li>
                  <li className="text-muted" data-testid="selected-category">
                    {selectedCategory.title}
                  </li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </section>

      {/* Top 5 kategori (rating'e gore) */}
      <section className="w-full bg-light" data-testid="shop-categories">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 pb-8 md:flex-row md:gap-4">
          {isCategoriesLoading && (
            <div className="flex w-full items-center justify-center gap-2 py-10 text-sm font-bold text-muted">
              <LoaderCircle size={18} className="animate-spin" aria-hidden="true" />
              Kategoriler yukleniyor...
            </div>
          )}

          {!isCategoriesLoading && categoriesError && (
            <p role="alert" className="w-full py-10 text-center text-sm font-bold text-danger">
              {categoriesError}
            </p>
          )}

          {!isCategoriesLoading &&
            !categoriesError &&
            topCategories.map((category) => (
              <ShopCategoryCard
                key={category.id}
                image={category.img}
                title={category.title}
                subtitle={getGenderLabel(category.gender)}
                to={buildCategoryPath(category)}
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
