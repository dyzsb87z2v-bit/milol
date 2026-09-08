import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Heart, Menu, Search, ShoppingBag, User } from 'lucide-react'
import { NAV } from '@/data/site'
import { useStore } from '@/store/StoreContext'

/**
 * Sticky header that reads the section beneath it. Sections declare
 * `data-tone="dark" | "light"`; over dark sections the header is
 * transparent with ivory type, over light ones it turns ivory with
 * charcoal type. While the opening film is full-screen the header
 * steps back to just the logo and the bag ("film" mode).
 */
export default function Header() {
  const { totals, wishlist, openCart, openSearch, openMenu } = useStore()
  const { pathname } = useLocation()
  const [tone, setTone] = useState('dark')
  const [film, setFilm] = useState(pathname === '/')

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const probe = document.elementFromPoint(Math.min(window.innerWidth - 1, 40), 78)
      const section = probe?.closest('[data-tone]')
      if (section) {
        setTone(section.dataset.tone)
        setFilm(section.dataset.film === 'true')
      }
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [pathname])

  const dark = tone === 'dark'
  const fg = dark ? 'text-ivory' : 'text-charcoal'

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,color,box-shadow] duration-700 ease-luxe ${fg} ${
        dark ? 'bg-transparent' : 'bg-ivory/92 backdrop-blur-md shadow-[0_1px_0_rgba(22,22,22,0.08)]'
      }`}
    >
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <div className="flex items-center gap-2 lg:hidden">
          <button type="button" onClick={openMenu} className="icon-btn -ml-3" aria-label="Open menu">
            <Menu size={20} strokeWidth={1.25} />
          </button>
        </div>

        <nav aria-label="Primary" className={`hidden lg:block transition-opacity duration-700 ${film ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          <ul className="flex items-center gap-8">
            {NAV.slice(1, 5).map((n) => (
              <li key={n.to}>
                <NavLink to={n.to} className={({ isActive }) => `link-line ${isActive ? '' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left'}`}>
                  {n.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <Link to="/" className={`absolute left-1/2 -translate-x-1/2 serif text-[22px] tracking-[0.42em] uppercase transition-opacity duration-700 ${film ? 'opacity-60' : 'opacity-100'}`} aria-label="MILAEDIA home">
          MILAEDIA
        </Link>

        <div className="flex items-center gap-0.5 -mr-3">
          <nav aria-label="Secondary" className={`hidden lg:block mr-6 transition-opacity duration-700 ${film ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <ul className="flex items-center gap-8">
              {NAV.slice(5).map((n) => (
                <li key={n.to}>
                  <NavLink to={n.to} className={({ isActive }) => `link-line ${isActive ? '' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left'}`}>{n.label}</NavLink>
                </li>
              ))}
            </ul>
          </nav>
          <button type="button" onClick={openSearch} className={`icon-btn transition-opacity duration-700 ${film ? 'opacity-0 pointer-events-none' : ''}`} aria-label="Search">
            <Search size={19} strokeWidth={1.25} />
          </button>
          <Link to="/account" className={`icon-btn hidden sm:inline-flex transition-opacity duration-700 ${film ? 'opacity-0 pointer-events-none' : ''}`} aria-label="Account">
            <User size={19} strokeWidth={1.25} />
          </Link>
          <Link to="/wishlist" className={`icon-btn relative hidden sm:inline-flex transition-opacity duration-700 ${film ? 'opacity-0 pointer-events-none' : ''}`} aria-label={`Wishlist, ${wishlist.length} items`}>
            <Heart size={19} strokeWidth={1.25} />
            {wishlist.length > 0 && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
          </Link>
          <button type="button" onClick={openCart} className={`icon-btn relative transition-opacity duration-700 ${film ? 'opacity-60' : ''}`} aria-label={`Shopping bag, ${totals.count} items`}>
            <ShoppingBag size={19} strokeWidth={1.25} />
            {totals.count > 0 && (
              <span className="absolute -right-0.5 top-1 min-w-[18px] rounded-full bg-gold px-1 text-[10px] leading-[18px] text-charcoal text-center font-medium" aria-hidden="true">{totals.count}</span>
            )}
          </button>
        </div>
      </div>
    </header>
  )
}
