import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  Heart,
  LoaderCircle,
  ShoppingCart,
  Star,
} from 'lucide-react'
import { Link, useHistory, useParams } from 'react-router-dom'
import { fetchProduct } from '../store/actions/productActions'
import { findCategoryById, formatPrice } from '../utils/products'

const TABS = ['Description', 'Additional Information', 'Reviews (0)']

function ProductDetailPage() {
  const dispatch = useDispatch()
  const history = useHistory()
  const { categoryName, productId } = useParams()

  const product = useSelector((state) => state.product.product)
  const categories = useSelector((state) => state.product.categories)

  // Shop listesinin fetchState'ini ezmemek icin detay kendi state'ini tutuyor
  const [isLoading, setIsLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  useEffect(() => {
    let isActive = true

    setIsLoading(true)
    setErrorMessage('')
    setActiveImageIndex(0)

    dispatch(fetchProduct(productId))
      .catch(() => {
        // Backend gecersiz id'de 500 + "Internal server error" donuyor;
        // ham sunucu metni yerine anlasilir bir mesaj gosteriliyor.
        if (isActive) setErrorMessage('Urun bulunamadi veya yuklenemedi.')
      })
      .finally(() => {
        if (isActive) setIsLoading(false)
      })

    return () => {
      isActive = false
    }
  }, [dispatch, productId])

  const goBack = () => {
    if (history.length > 1) history.goBack()
    else history.push('/shop')
  }

  const images = Array.isArray(product?.images)
    ? [...product.images].sort((a, b) => Number(a?.index ?? 0) - Number(b?.index ?? 0))
    : []
  const activeImage = images[activeImageIndex] ?? images[0]
  const category = findCategoryById(categories, product?.category_id)
  const rating = Number(product?.rating ?? 0)
  const isLoaded = !isLoading && !errorMessage && Boolean(product?.id)

  const showImage = (step) => {
    if (images.length === 0) return
    setActiveImageIndex((current) => (current + step + images.length) % images.length)
  }

  return (
    <>
      {/* Breadcrumb + back */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
          <nav aria-label="Breadcrumb">
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
              <li className="text-muted">{category?.title ?? categoryName}</li>
            </ol>
          </nav>

          <button
            type="button"
            onClick={goBack}
            data-testid="back-button"
            className="flex items-center gap-1 self-start text-sm font-bold text-primary hover:underline md:self-auto"
          >
            <ChevronLeft size={16} aria-hidden="true" />
            Back
          </button>
        </div>
      </section>

      {/* Gallery + product info */}
      <section className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 pb-10 md:flex-row md:gap-10">
          {isLoading && (
            <div
              data-testid="product-loading"
              className="flex w-full items-center justify-center gap-2 py-20 text-sm font-bold text-muted"
            >
              <LoaderCircle size={20} className="animate-spin" aria-hidden="true" />
              Urun yukleniyor...
            </div>
          )}

          {!isLoading && errorMessage && (
            <p
              role="alert"
              data-testid="product-error"
              className="w-full py-20 text-center text-sm font-bold text-danger"
            >
              {errorMessage}
            </p>
          )}

          {isLoaded && (
            <>
              {/* Gallery */}
              <div className="flex w-full flex-col gap-4 md:w-1/2">
                <div className="relative w-full">
                  {activeImage ? (
                    <img
                      src={activeImage.url}
                      alt={product.name}
                      className="h-80 w-full object-cover md:h-[450px]"
                    />
                  ) : (
                    <div className="flex h-80 w-full items-center justify-center bg-gray-100 text-sm text-muted md:h-[450px]">
                      Gorsel yok
                    </div>
                  )}

                  {images.length > 1 && (
                    <>
                      <button
                        type="button"
                        aria-label="Previous image"
                        onClick={() => showImage(-1)}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white"
                      >
                        <ChevronLeft size={32} strokeWidth={1.5} />
                      </button>
                      <button
                        type="button"
                        aria-label="Next image"
                        onClick={() => showImage(1)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white"
                      >
                        <ChevronRight size={32} strokeWidth={1.5} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnail'lar gercek images dizisinden uretilir */}
                {images.length > 0 && (
                  <div className="flex items-center gap-4" data-testid="product-thumbnails">
                    {images.map((image, index) => (
                      <button
                        key={image.url ?? index}
                        type="button"
                        aria-label={`Image ${index + 1}`}
                        onClick={() => setActiveImageIndex(index)}
                        className={`h-20 w-24 overflow-hidden border ${
                          index === activeImageIndex ? 'border-primary' : 'border-gray-200'
                        }`}
                      >
                        <img src={image.url} alt="" className="h-full w-full object-cover" />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex w-full flex-col gap-4 md:w-1/2">
                <h1 className="text-xl text-dark md:text-2xl">{product.name}</h1>

                <div className="flex flex-wrap items-center gap-3">
                  <div className="flex items-center gap-1 text-[#F3CD03]">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        size={18}
                        strokeWidth={0}
                        fill="currentColor"
                        className={star <= Math.round(rating) ? '' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-bold text-muted" data-testid="product-rating">
                    {rating.toFixed(2)}
                  </span>
                  <span className="text-sm font-bold text-muted" data-testid="product-sell-count">
                    {product.sell_count} Sold
                  </span>
                </div>

                <p className="text-2xl font-bold text-dark" data-testid="product-price">
                  {formatPrice(product.price)}
                </p>

                <p className="text-sm font-bold text-muted" data-testid="product-stock">
                  Availability :{' '}
                  <span className={product.stock > 0 ? 'text-primary' : 'text-danger'}>
                    {product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}
                  </span>
                </p>

                <p className="text-sm text-muted" data-testid="product-description">
                  {product.description}
                </p>

                <hr className="border-gray-200" />

                {/* T17'de islevsellik kazanacak; simdilik yalnizca gorsel */}
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
            </>
          )}
        </div>
      </section>

      {/* Additional product information */}
      {isLoaded && (
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
              <div className="flex w-full flex-col gap-3 md:w-1/2">
                <h2 className="text-base font-bold text-dark">{product.name}</h2>
                <p className="text-sm text-muted">{product.description}</p>
              </div>

              <div className="flex w-full flex-col gap-3 md:w-1/2">
                <h2 className="text-base font-bold text-dark">Additional Information</h2>
                <ul className="flex flex-col gap-2 text-sm text-muted">
                  <li>Category: {category?.title ?? '-'}</li>
                  <li>Price: {formatPrice(product.price)}</li>
                  <li>Stock: {product.stock}</li>
                  <li>Rating: {rating.toFixed(2)}</li>
                  <li>Sold: {product.sell_count}</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}

export default ProductDetailPage
