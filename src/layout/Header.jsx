import { Link } from 'react-router-dom'

function Header() {
  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col items-center gap-4 px-4 py-4 md:flex-row md:justify-between md:gap-6">
        <Link to="/" className="text-xl font-bold text-gray-900">
          Bandage
        </Link>

        <nav>
          <ul className="flex flex-col items-center gap-4 text-sm font-medium text-gray-600 md:flex-row md:gap-6">
            <li>
              <Link to="/" className="hover:text-gray-900">
                Home
              </Link>
            </li>
            <li>
              <Link to="/shop" className="hover:text-gray-900">
                Shop
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-gray-900">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-gray-900">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

export default Header
