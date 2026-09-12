import { Facebook, Instagram, Twitter } from '../components/icons/SocialIcons'
import { FOOTER_COLUMNS } from '../data/homeData'

function Footer() {
  return (
    <footer className="flex w-full flex-col">
      {/* Brand + social */}
      <div className="w-full bg-light md:bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-4 px-4 py-10 md:flex-row md:items-center md:justify-between md:border-b md:border-gray-200">
          <h2 className="text-2xl font-bold text-dark">Bandage</h2>
          <div className="flex items-center gap-5 text-primary">
            <Facebook size={24} />
            <Instagram size={24} />
            <Twitter size={24} />
          </div>
        </div>
      </div>

      {/* Link columns */}
      <div className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-8 px-4 py-10 md:flex-row md:justify-between">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-5">
              <h3 className="text-base font-bold text-dark">{column.title}</h3>
              <ul className="flex flex-col gap-3">
                {column.links.map((link) => (
                  <li key={link} className="text-sm font-bold text-muted">
                    {link}
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="flex flex-col gap-5">
            <h3 className="text-base font-bold text-dark">Get In Touch</h3>
            <div className="flex">
              <input
                type="email"
                placeholder="Your Email"
                className="w-full rounded-l border border-gray-200 bg-light px-4 py-3 text-sm text-muted outline-none md:w-48"
              />
              <button
                type="button"
                className="rounded-r bg-primary px-5 py-3 text-sm text-white"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm text-muted">Lore imp sum dolor Amit</p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="w-full bg-light">
        <div className="mx-auto flex w-full max-w-screen-xl px-4 py-6">
          <p className="w-full text-center text-sm font-bold text-muted md:text-left">
            Made With Love By Finland All Right Reserved
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
