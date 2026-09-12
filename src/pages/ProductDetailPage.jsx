import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  ShoppingCart,
  Star,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { SHOP_PRODUCTS } from '../data/shopData'

const TABS = ['Description', 'Additional Information', 'Reviews (0)']

function ProductDetailPage() {
  // Gercek urun fetch islemi T16 kapsaminda gelecek; simdilik statik mock esleniyor
  const { gender, categoryName, categoryId, productNameSlug, productId } = useParams()
  const product =
    SHOP_PRODUCTS.find((item) => String(item.id) === productId) || SHOP_PRODUCTS[0]

  return (
    <>
      {/* Breadcrumb */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl px-4 py-6">
          <nav aria-label="Breadcrumb" className="w-full">
            <ol className="flex flex-wrap items-center gap-2 text-sm font-bold">
              <li>
                <Link to="/" className="text-dark">
                  Home
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center text-gray-300">
                <ChevronRight size={16} />
              </li>
              <li>
                <Link to="/shop" className="text-dark">
                  Shop
                </Link>
              </li>
              <li aria-hidden="true" className="flex items-center text-gray-300">
                <ChevronRight size={16} />
              </li>
              <li className="text-muted">{categoryName}</li>
            </ol>
          </nav>
        </div>
      </section>

      {/* Gallery + product info */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 pb-10 md:flex-row md:gap-10">
          {/* Gallery */}
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <div className="relative w-full">
              <img
                src={product.image}
                alt={product.title}
                className="h-80 w-full object-cover md:h-[450px]"
              />
              <button
                type="button"
                aria-label="Previous image"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
              >
                <ChevronLeft size={32} strokeWidth={1.5} />
              </button>
              <button
                type="button"
                aria-label="Next image"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
              >
                <ChevronRight size={32} strokeWidth={1.5} />
              </button>
            </div>

            <div className="flex items-center gap-4">
              {[0, 1].map((thumb) => (
                <button
                  key={thumb}
                  type="button"
                  aria-label={`Thumbnail ${thumb + 1}`}
                  className="h-20 w-24 overflow-hidden border border-gray-200"
                >
                  <img src={product.image} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex w-full flex-col gap-4 md:w-1/2">
            <h1 className="text-xl text-dark md:text-2xl">{product.title}</h1>

            {/* Rating / review placeholder */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 text-[#F3CD03]">
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} size={18} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <span className="text-sm font-bold text-muted">10 Reviews</span>
            </div>

            <p className="text-2xl font-bold text-dark">{product.newPrice}</p>

            <p className="text-sm font-bold text-muted">
              Availability : <span className="text-primary">In Stock</span>
            </p>

            <p className="text-sm text-muted">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT
              official consequent.
            </p>

            <hr className="border-gray-200" />

            {/* Color options placeholder */}
            <div className="flex items-center gap-2">
              {product.colors.map((color) => (
                <span key={color} className={`h-8 w-8 rounded-full ${color}`} />
              ))}
            </div>

            {/* Quantity / action placeholder */}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="bg-primary px-6 py-3 text-sm font-bold text-white"
              >
                Select Options
              </button>
              <button
                type="button"
                aria-label="Add to favorites"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-dark"
              >
                <Heart size={16} />
              </button>
              <button
                type="button"
                aria-label="Add to cart"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-dark"
              >
                <ShoppingCart size={16} />
              </button>
              <button
                type="button"
                aria-label="Quick view"
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-dark"
              >
                <Eye size={16} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Additional product information */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 py-10 md:py-16">
          <div className="flex flex-col items-center gap-4 border-b border-gray-200 pb-4 md:flex-row md:justify-center md:gap-10">
            {TABS.map((tab) => (
              <button key={tab} type="button" className="text-sm font-bold text-muted">
                {tab}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-6 md:flex-row md:gap-10">
            <div className="flex w-full flex-col gap-3 md:w-1/3">
              <h2 className="text-base font-bold text-dark">the quick fox jumps over</h2>
              <p className="text-sm text-muted">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT
                official consequent.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-1/3">
              <h2 className="text-base font-bold text-dark">the quick fox jumps over</h2>
              <p className="text-sm text-muted">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 md:w-1/3">
              <h2 className="text-base font-bold text-dark">Product details</h2>
              <ul className="flex flex-col gap-2 text-sm text-muted">
                <li>Gender: {gender}</li>
                <li>Category: {categoryName}</li>
                <li>Category ID: {categoryId}</li>
                <li>Slug: {productNameSlug}</li>
                <li>Product ID: {productId}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default ProductDetailPage
