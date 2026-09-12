function ValueCard({ icon: Icon, title, description }) {
  return (
    <article className="flex w-full flex-col items-center gap-4 bg-white px-6 py-8 text-center md:items-start md:text-left">
      <Icon size={36} className="text-primary" />
      <h3 className="text-lg font-bold text-dark">{title}</h3>
      <p className="text-sm text-muted">{description}</p>
    </article>
  )
}

export default ValueCard
