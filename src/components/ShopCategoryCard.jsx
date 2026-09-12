import { Link } from 'react-router-dom'

function ShopCategoryCard({ image, title, subtitle, to, className = '' }) {
  const content = (
    <>
      <img src={image} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-dark/40 text-white">
        <h3 className="text-base font-bold">{title}</h3>
        {subtitle && <p className="text-sm">{subtitle}</p>}
      </div>
    </>
  )

  return (
    <article className={`relative flex overflow-hidden ${className}`}>
      {to ? (
        <Link to={to} className="flex h-full w-full">
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  )
}

export default ShopCategoryCard
