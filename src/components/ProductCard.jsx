function ProductCard({ title, department, oldPrice, newPrice }) {
  return (
    <article className="flex w-full flex-col gap-3 bg-white pb-4">
      <div className="flex h-60 w-full items-center justify-center bg-gray-100">
        <span className="text-sm text-gray-400">Product image</span>
      </div>

      <div className="flex flex-col items-center gap-2 px-2 text-center">
        <h3 className="text-base font-bold text-gray-900">{title}</h3>
        <p className="text-sm font-bold text-gray-500">{department}</p>

        <div className="flex items-center gap-2">
          <span className="text-base font-bold text-gray-400">{oldPrice}</span>
          <span className="text-base font-bold text-green-600">{newPrice}</span>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
