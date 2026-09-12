import { Link } from 'react-router-dom'

function ProductCard({ image, title, department, oldPrice, newPrice, colors = [], to }) {
  const content = (
    <>
      <div className="w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-80 w-full object-cover transition-transform duration-300 hover:scale-105 md:h-[400px]"
        />
      </div>

      <div className="flex flex-col items-center gap-3 px-3 py-6 text-center">
        <h3 className="text-base font-bold text-dark">{title}</h3>
        <p className="text-sm font-bold text-muted">{department}</p>

        <div className="flex items-center gap-2 text-base font-bold">
          {oldPrice && <span className="text-gray-400">{oldPrice}</span>}
          <span className="text-[#23856D]">{newPrice}</span>
        </div>

        {colors.length > 0 && (
          <div className="flex items-center gap-2">
            {colors.map((color) => (
              <span key={color} className={`h-4 w-4 rounded-full ${color}`} />
            ))}
          </div>
        )}
      </div>
    </>
  )

  return (
    <article
      className={`flex w-full flex-col bg-white transition-shadow ${
        to ? 'cursor-pointer hover:shadow-lg' : ''
      }`}
    >
      {to ? (
        <Link to={to} className="flex w-full flex-col">
          {content}
        </Link>
      ) : (
        content
      )}
    </article>
  )
}

export default ProductCard
