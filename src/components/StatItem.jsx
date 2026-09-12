function StatItem({ value, label }) {
  return (
    <div className="flex w-full flex-col items-center gap-2 text-center md:w-1/4">
      <p className="text-4xl font-bold text-dark md:text-5xl">{value}</p>
      <p className="text-sm font-bold text-muted">{label}</p>
    </div>
  )
}

export default StatItem
