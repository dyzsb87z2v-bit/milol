import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { NAV, BRAND } from '@/data/site'
import { useStore } from '@/store/StoreContext'

export default function MobileMenu() {
  const { ui, closeMenu, openSearch } = useStore()
  useEffect(() => {
    if (!ui.menuOpen) return
    const onKey = (e) => e.key === 'Escape' && closeMenu()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ui.menuOpen, closeMenu])
  if (!ui.menuOpen) return null
  return (
    <div className="menu-full" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="container-site flex h-[var(--header-h)] items-center justify-between">
        <span className="serif text-[22px] tracking-[0.42em] uppercase">MILAEDIA</span>
        <button type="button" onClick={closeMenu} className="icon-btn -mr-3 text-ivory" aria-label="Close menu" autoFocus>
          <X size={22} strokeWidth={1.25} />
        </button>
      </div>
      <nav className="container-site flex-1 overflow-auto py-8" aria-label="Mobile">
        <ul>
          {NAV.map((n, i) => (
            <li key={n.to}>
              <NavLink to={n.to} onClick={closeMenu} className={({ isActive }) => `menu-link ${isActive ? 'text-gold' : 'text-ivory'}`} style={{ animationDelay: `${80 + i * 55}ms` }}>
                {n.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 eyebrow text-ivory/70">
          <li><button type="button" onClick={() => { closeMenu(); openSearch() }} className="link-line">Search</button></li>
          <li><Link to="/account" onClick={closeMenu} className="link-line">Account</Link></li>
          <li><Link to="/wishlist" onClick={closeMenu} className="link-line">Wishlist</Link></li>
          <li><Link to="/cart" onClick={closeMenu} className="link-line">Bag</Link></li>
        </ul>
      </nav>
      <div className="container-site border-t hairline-light py-6 text-[12px] text-ivory/50">
        <p>{BRAND.tagline}</p>
        <p className="mt-1">{BRAND.email}</p>
      </div>
    </div>
  )
}
