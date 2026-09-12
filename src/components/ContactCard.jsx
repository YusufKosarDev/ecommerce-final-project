function ContactCard({ icon: Icon, lines = [], action, highlighted = false }) {
  return (
    <article
      className={`flex w-full flex-col items-center gap-4 px-8 py-10 text-center ${
        highlighted ? 'bg-dark text-white' : 'bg-white text-dark'
      }`}
    >
      <Icon size={40} className={highlighted ? 'text-white' : 'text-primary'} />

      <div className="flex flex-col gap-1">
        {lines.map((line) => (
          <p key={line} className="text-sm font-bold">
            {line}
          </p>
        ))}
      </div>

      <p className="text-base font-bold">{action}</p>

      <button
        type="button"
        className={`rounded-full border px-8 py-3 text-sm font-bold ${
          highlighted ? 'border-white text-white' : 'border-primary text-primary'
        }`}
      >
        Submit Request
      </button>
    </article>
  )
}

export default ContactCard
