import { ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'

function PlaceholderArea({ title, note, className = '' }) {
  return (
    <div
      className={`flex w-full flex-col items-center justify-center gap-2 border border-dashed border-gray-300 bg-light px-4 py-12 text-center ${className}`}
    >
      <p className="text-sm font-bold text-dark">{title}</p>
      <p className="text-xs text-muted">{note}</p>
    </div>
  )
}

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
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 pb-8 md:flex-row">
          <PlaceholderArea
            title="Category cards"
            note="Kategori kartları burada listelenecek"
            className="md:h-56"
          />
        </div>
      </section>

      {/* Filter / sort controls */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <PlaceholderArea
            title="Filter & sort controls"
            note="Sonuç sayısı, görünüm seçimi, sıralama ve filtre burada olacak"
            className="md:py-8"
          />
        </div>
      </section>

      {/* Product list / grid */}
      <section className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-6 px-4 pb-12 md:pb-20">
          <PlaceholderArea
            title="Product grid"
            note="Ürün kartları burada listelenecek"
            className="md:h-96"
          />
        </div>
      </section>
    </>
  )
}

export default ShopPage
