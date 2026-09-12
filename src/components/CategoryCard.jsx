function CategoryCard({ image, label, className = '' }) {
  return (
    <article className={`relative flex overflow-hidden ${className}`}>
      <img src={image} alt={label} className="h-full w-full object-cover" />
      <span className="absolute bottom-8 left-8 bg-white px-8 py-3 text-sm font-bold text-dark">
        {label}
      </span>
    </article>
  )
}

export default CategoryCard
