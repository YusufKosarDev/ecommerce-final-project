import BlogCard from '../BlogCard'
import { FEATURED_POSTS } from '../../data/homeData'

function FeaturedPosts() {
  return (
    <section className="w-full bg-white">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-10 px-4 py-12 md:py-20">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="text-sm font-bold text-primary">Practice Advice</p>
          <h2 className="text-3xl font-bold text-dark md:text-4xl">Featured Posts</h2>
          <p className="max-w-xl text-sm text-muted">
            Problems trying to resolve the conflict between the two major realms of
            Classical physics: Newtonian mechanics
          </p>
        </div>

        <div className="flex flex-col gap-8 md:flex-row md:gap-6">
          {FEATURED_POSTS.map((post) => (
            <div key={post.id} className="w-full md:w-1/3">
              <BlogCard {...post} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default FeaturedPosts
