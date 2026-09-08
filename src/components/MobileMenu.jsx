import { useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { X } from 'lucide-react'
import { NAV, SECONDARY_NAV, BRAND, LANGUAGES } from '@/data/site'
import { useStore } from '@/store/StoreContext'
import { load, save } from '@/lib/storage'

export default function MobileMenu() {
  const { ui, closeMenu, openSearch } = useStore()
  useEffect(() => {
    if (!ui.menuOpen) return
    const onKey = (e) => e.key === 'Escape' && closeMenu()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [ui.menuOpen, closeMenu])
  if (!ui.menuOpen) return null
  const lang = load('lang', 'en')
  return (
    <div className="menu-full" role="dialog" aria-modal="true" aria-label="Menu">
      <div className="container-site flex h-[var(--header-h)] items-center justify-between">
        <span className="serif text-[22px] tracking-[0.46em] uppercase">MILAEDIA</span>
        <button type="button" onClick={closeMenu} className="icon-btn -mr-3" aria-label="Close menu" autoFocus><X size={22} strokeWidth={1} /></button>
      </div>
      <nav className="container-site flex-1 overflow-auto py-6" aria-label="Mobile">
        <p className="eyebrow">Menu</p>
        <ul className="mt-4">
          {NAV.map((n, i) => (
            <li key={n.to}>
              <NavLink to={n.to} end={n.to === '/'} onClick={closeMenu} className={({ isActive }) => `menu-link ${isActive ? 'text-gold' : 'text-ivory'}`} style={{ animationDelay: `${80 + i * 60}ms` }}>{n.label}</NavLink>
            </li>
          ))}
        </ul>
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3 border-t hairline pt-8">
          {SECONDARY_NAV.map((n) => <Link key={n.to} to={n.to} onClick={closeMenu} className="text-[13px] tracking-[0.08em] text-ivory/70 hover:text-ivory">{n.label}</Link>)}
          <button type="button" onClick={() => { closeMenu(); openSearch() }} className="text-left text-[13px] tracking-[0.08em] text-ivory/70 hover:text-ivory">Search</button>
        </div>
        <div className="mt-8 flex gap-3">
          {LANGUAGES.map((l) => (
            <button key={l.code} type="button" onClick={() => { save('lang', l.code); document.documentElement.lang = l.code; document.documentElement.dir = l.code === 'fa' ? 'rtl' : 'ltr'; closeMenu() }} className={`border px-4 py-2 text-[11px] tracking-[0.24em] ${l.code === lang ? 'border-gold text-gold' : 'hairline text-ivory/60'}`}>{l.short}</button>
          ))}
        </div>
      </nav>
      <div className="container-site border-t hairline py-6 text-[12px] text-ivory/45">
        <p>{BRAND.address} · {BRAND.hours}</p>
        <p className="mt-1">{BRAND.email} · <a href={BRAND.whatsapp} className="hover:text-ivory">WhatsApp</a></p>
      </div>
    </div>
  )
}
