import { ChevronLeft, ChevronRight } from 'lucide-react'

// Cok sayfali listelerde tum numaralari basmamak icin pencereli sayfa listesi uretir.
// Ornek (24 sayfa, current 12): 1 … 11 12 13 … 24
export function getPageItems(currentPage, totalPages) {
  if (totalPages <= 0) return []
  if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1)

  const pages = new Set([1, totalPages, currentPage])
  if (currentPage - 1 > 1) pages.add(currentPage - 1)
  if (currentPage + 1 < totalPages) pages.add(currentPage + 1)

  const sorted = [...pages].filter((p) => p >= 1 && p <= totalPages).sort((a, b) => a - b)

  const items = []
  sorted.forEach((page, index) => {
    if (index > 0 && page - sorted[index - 1] > 1) items.push(`gap-${page}`)
    items.push(page)
  })
  return items
}

const baseButton =
  'flex h-10 min-w-10 items-center justify-center border border-gray-200 px-3 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-40'

function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null

  const items = getPageItems(currentPage, totalPages)
  const isFirst = currentPage <= 1
  const isLast = currentPage >= totalPages

  return (
    <nav
      aria-label="Pagination"
      data-testid="pagination"
      className="flex w-full flex-col items-center gap-3 py-8 md:flex-row md:justify-center md:gap-2"
    >
      <button
        type="button"
        data-testid="pagination-prev"
        disabled={isFirst}
        onClick={() => onPageChange(currentPage - 1)}
        className={`${baseButton} w-full gap-1 bg-white text-primary md:w-auto`}
      >
        <ChevronLeft size={16} aria-hidden="true" />
        Previous
      </button>

      <ul className="flex flex-wrap items-center justify-center gap-2">
        {items.map((item) =>
          typeof item === 'number' ? (
            <li key={item}>
              <button
                type="button"
                aria-current={item === currentPage ? 'page' : undefined}
                onClick={() => onPageChange(item)}
                className={`${baseButton} ${
                  item === currentPage
                    ? 'border-primary bg-primary text-white'
                    : 'bg-white text-primary'
                }`}
              >
                {item}
              </button>
            </li>
          ) : (
            <li key={item} aria-hidden="true" className="px-1 text-sm text-muted">
              ...
            </li>
          ),
        )}
      </ul>

      <button
        type="button"
        data-testid="pagination-next"
        disabled={isLast}
        onClick={() => onPageChange(currentPage + 1)}
        className={`${baseButton} w-full gap-1 bg-white text-primary md:w-auto`}
      >
        Next
        <ChevronRight size={16} aria-hidden="true" />
      </button>
    </nav>
  )
}

export default Pagination
