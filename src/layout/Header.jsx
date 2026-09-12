import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import {
  ChevronDown,
  Heart,
  Mail,
  Menu,
  Phone,
  Search,
  ShoppingCart,
  User,
  X,
} from 'lucide-react'
import { Facebook, Instagram, Twitter, Youtube } from '../components/icons/SocialIcons'
import UserAvatar from '../components/UserAvatar'
import { NAV_LINKS } from '../data/homeData'

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const user = useSelector((state) => state.client.user)
  const isLoggedIn = Boolean(user && user.email)

  return (
    <header className="flex w-full flex-col">
      {/* Top bar - desktop only */}
      <div className="hidden w-full bg-dark text-white md:flex">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4 px-4 py-3 text-sm font-bold">
          <div className="flex items-center gap-6">
            <a href="tel:(225) 555-0118" className="flex items-center gap-2">
              <Phone size={16} />
              (225) 555-0118
            </a>
            <a href="mailto:michelle.rivera@example.com" className="flex items-center gap-2">
              <Mail size={16} />
              michelle.rivera@example.com
            </a>
          </div>

          <p className="hidden lg:block">Follow Us and get a chance to win 80% off</p>

          <div className="flex items-center gap-3">
            <span>Follow Us :</span>
            <Instagram size={18} />
            <Youtube size={18} />
            <Facebook size={18} />
            <Twitter size={18} />
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div className="w-full bg-white">
        <div className="mx-auto flex w-full max-w-screen-xl items-center justify-between gap-4 px-4 py-5 md:py-4">
          <Link to="/" className="text-2xl font-bold text-dark">
            Bandage
          </Link>

          {/* Desktop navigation */}
          <nav className="hidden md:flex">
            <ul className="flex items-center gap-3 whitespace-nowrap text-sm font-bold text-muted lg:gap-5">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-1 transition-colors hover:text-dark"
                  >
                    {link.label}
                    {link.label === 'Shop' && <ChevronDown size={14} />}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop actions */}
          <div className="hidden items-center gap-3 whitespace-nowrap text-sm font-bold text-primary md:flex lg:gap-4">
            {isLoggedIn ? (
              <span
                className="flex items-center gap-2 text-dark"
                data-testid="header-user"
              >
                <UserAvatar email={user.email} name={user.name} />
                <span className="hidden lg:inline">{user.name || user.email}</span>
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <User size={16} />
                <span className="hidden lg:inline">
                  <Link to="/login" className="hover:underline">
                    Login
                  </Link>{' '}
                  /{' '}
                  <Link to="/signup" className="hover:underline">
                    Register
                  </Link>
                </span>
              </span>
            )}
            <button type="button" aria-label="Search">
              <Search size={18} />
            </button>
            <button type="button" aria-label="Cart" className="flex items-center gap-1">
              <ShoppingCart size={18} />
              <span>1</span>
            </button>
            <button type="button" aria-label="Favorites" className="flex items-center gap-1">
              <Heart size={18} />
              <span>1</span>
            </button>
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-5 text-dark md:hidden">
            <button type="button" aria-label="Search">
              <Search size={22} />
            </button>
            <button type="button" aria-label="Cart">
              <ShoppingCart size={22} />
            </button>
            <button
              type="button"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              onClick={() => setIsMenuOpen((open) => !open)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="w-full pb-12 md:hidden">
            <ul className="flex flex-col items-center gap-8 text-3xl text-muted">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link to={link.path} onClick={() => setIsMenuOpen(false)}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header
