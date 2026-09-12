import { BarChart2, ChevronRight, Clock } from 'lucide-react'

function BlogCard({ image, tags = [], title, excerpt, date, comments }) {
  return (
    <article className="flex w-full flex-col bg-white shadow-sm">
      <div className="relative w-full">
        <img src={image} alt={title} className="h-60 w-full object-cover" />
        <span className="absolute left-5 top-5 bg-danger px-3 py-1 text-xs font-bold text-white">
          NEW
        </span>
      </div>

      <div className="flex flex-col gap-4 p-6">
        <div className="flex flex-wrap items-center gap-3 text-sm text-muted">
          {tags.map((tag, index) => (
            <span key={tag} className={index === 0 ? 'text-primary' : ''}>
              {tag}
            </span>
          ))}
        </div>

        <h3 className="text-xl text-dark">{title}</h3>
        <p className="text-sm text-muted">{excerpt}</p>

        <div className="flex items-center justify-between text-xs font-bold text-muted">
          <span className="flex items-center gap-2">
            <Clock size={16} className="text-primary" />
            {date}
          </span>
          <span className="flex items-center gap-2">
            <BarChart2 size={16} className="text-[#23856D]" />
            {comments}
          </span>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 text-sm font-bold text-dark"
        >
          Learn More
          <ChevronRight size={16} className="text-primary" />
        </button>
      </div>
    </article>
  )
}

export default BlogCard
