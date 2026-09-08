import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { ChevronDown, Heart, Menu, Search, ShoppingBag } from 'lucide-react'
import { NAV, LANGUAGES } from '@/data/site'
import { useStore } from '@/store/StoreContext'
import { load, save } from '@/lib/storage'

/**
 * Fixed header. Transparent over the opening film, a solid near-black bar
 * with a hairline once the page has scrolled. While the film is full-screen
 * ("film" mode, declared by the hero via data-film) the header steps back to
 * the wordmark, the bag and the menu.
 */
export default function Header() {
  const { totals, wishlist, openCart, openSearch, openMenu } = useStore()
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [film, setFilm] = useState(pathname === '/')
  const [lang, setLang] = useState(() => load('lang', 'en'))
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      setScrolled(window.scrollY > 24)
      const probe = document.elementFromPoint(Math.min(window.innerWidth - 1, 40), 96)
      const section = probe?.closest('[data-film]')
      setFilm(section ? section.dataset.film === 'true' : false)
    }
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(read) }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); cancelAnimationFrame(raf) }
  }, [pathname])

  useEffect(() => {
    if (!langOpen) return
    const close = (e) => { if (!langRef.current?.contains(e.target)) setLangOpen(false) }
    window.addEventListener('pointerdown', close)
    return () => window.removeEventListener('pointerdown', close)
  }, [langOpen])

  const pick = (code) => { setLang(code); save('lang', code); setLangOpen(false); document.documentElement.lang = code; document.documentElement.dir = code === 'fa' ? 'rtl' : 'ltr' }
  // The film keeps the header transparent; the navigation stays available.
  const hide = 'opacity-100'
  const navClass = ({ isActive }) => `link-line text-ivory/85 hover:text-ivory ${isActive ? 'text-ivory' : 'after:scale-x-0 hover:after:scale-x-100 hover:after:origin-left'}`

  return (
    <header className={`fixed inset-x-0 top-0 z-50 text-ivory transition-[background-color,box-shadow,backdrop-filter] duration-700 ease-luxe ${scrolled && !film ? 'header-glass' : 'bg-transparent'}`}>
      <div className="container-site flex h-[var(--header-h)] items-center justify-between gap-6">
        <div className="flex items-center gap-1 lg:hidden">
          <button type="button" onClick={openMenu} className="icon-btn -ml-3" aria-label="Open menu"><Menu size={20} strokeWidth={1} /></button>
        </div>

        <nav aria-label="Primary" className={`hidden lg:block transition-opacity duration-700 ${hide}`}>
          <ul className="flex items-center gap-9">
            {NAV.slice(0, 3).map((n) => <li key={n.to}><NavLink to={n.to} end={n.to === '/'} className={navClass}>{n.label}</NavLink></li>)}
          </ul>
        </nav>

        <Link to="/" className={`absolute left-1/2 -translate-x-1/2 serif gold-text text-[24px] font-light tracking-[0.46em] uppercase pl-[0.46em] transition-opacity duration-700 opacity-100`} aria-label="MILAEDIA home">
          MILAEDIA
        </Link>

        <div className="flex items-center gap-0.5 -mr-3">
          <nav aria-label="Secondary" className={`hidden lg:block mr-7 transition-opacity duration-700 ${hide}`}>
            <ul className="flex items-center gap-9">
              {NAV.slice(3).map((n) => <li key={n.to}><NavLink to={n.to} className={navClass}>{n.label}</NavLink></li>)}
            </ul>
          </nav>
          <button type="button" onClick={openSearch} className={`icon-btn transition-opacity duration-700 ${hide}`} aria-label="Search"><Search size={18} strokeWidth={1} /></button>
          <Link to="/wishlist" className={`icon-btn relative hidden sm:inline-flex transition-opacity duration-700 ${hide}`} aria-label={`Wishlist, ${wishlist.length} items`}>
            <Heart size={18} strokeWidth={1} />
            {wishlist.length > 0 && <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-gold" aria-hidden="true" />}
          </Link>
          <button type="button" onClick={openCart} className={`icon-btn relative transition-opacity duration-700 `} aria-label={`Shopping bag, ${totals.count} items`}>
            <ShoppingBag size={18} strokeWidth={1} />
            {totals.count > 0 && <span className="absolute -right-0.5 top-1 min-w-[18px] rounded-full bg-gold px-1 text-center text-[10px] font-medium leading-[18px] text-black" aria-hidden="true">{totals.count}</span>}
          </button>
          <div ref={langRef} className={`relative hidden md:block transition-opacity duration-700 ${hide}`}>
            <button type="button" onClick={() => setLangOpen((o) => !o)} aria-haspopup="listbox" aria-expanded={langOpen} className="icon-btn w-auto gap-1 px-3 text-[10.5px] tracking-[0.3em]">
              {LANGUAGES.find((l) => l.code === lang)?.short} <ChevronDown size={12} strokeWidth={1.25} aria-hidden="true" />
            </button>
            {langOpen && (
              <ul role="listbox" aria-label="Language" className="absolute right-0 top-full mt-2 min-w-[150px] border hairline-gold bg-black/95 py-2 backdrop-blur">
                {LANGUAGES.map((l) => (
                  <li key={l.code} role="option" aria-selected={l.code === lang}>
                    <button type="button" onClick={() => pick(l.code)} className={`flex w-full items-center justify-between px-4 py-2.5 text-[12px] tracking-[0.12em] hover:bg-gold/15 ${l.code === lang ? 'text-gold' : 'text-ivory/80'}`}>
                      {l.label} <span className="text-[10px] text-ivory/40">{l.short}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
