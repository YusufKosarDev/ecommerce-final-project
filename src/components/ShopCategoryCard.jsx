function ShopCategoryCard({ image, title, itemCount, className = '' }) {
  return (
    <article className={`relative flex overflow-hidden ${className}`}>
      <img src={image} alt={title} className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-dark/40 text-white">
        <h3 className="text-base font-bold">{title}</h3>
        <p className="text-sm">{itemCount} Items</p>
      </div>
    </article>
  )
}

export default ShopCategoryCard
