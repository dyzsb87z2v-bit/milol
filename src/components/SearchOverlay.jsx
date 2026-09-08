import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Search, X } from 'lucide-react'
import { useStore } from '@/store/StoreContext'
import { searchProducts } from '@/lib/catalog'
import { money } from '@/lib/format'
import Modal from './Modal'
import Img from './Img'

const SUGGESTIONS = ['Isfahan', 'Silk', 'Oushak', 'Geometric', 'Ivory', 'Turkish']

export default function SearchOverlay() {
  const { ui, closeSearch } = useStore()
  const [q, setQ] = useState('')
  const [active, setActive] = useState(-1)
  const input = useRef(null)
  const navigate = useNavigate()
  const results = useMemo(() => searchProducts(q).slice(0, 6), [q])

  useEffect(() => { if (ui.searchOpen) { setQ(''); setActive(-1); setTimeout(() => input.current?.focus(), 30) } }, [ui.searchOpen])

  const go = (path) => { closeSearch(); navigate(path) }
  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive((a) => Math.min(results.length - 1, a + 1)) }
    if (e.key === 'ArrowUp') { e.preventDefault(); setActive((a) => Math.max(-1, a - 1)) }
    if (e.key === 'Enter') {
      e.preventDefault()
      if (active >= 0 && results[active]) go(`/collection/${results[active].slug}`)
      else if (q.trim()) go(`/search?q=${encodeURIComponent(q.trim())}`)
    }
  }

  return (
    <Modal open={ui.searchOpen} onClose={closeSearch} label="Search" wrapperClassName="fixed inset-x-0 top-0 z-[90]" panelClassName="bg-black text-ivory shadow-2xl max-h-[92vh] overflow-auto animate-[rise_0.6s_var(--ease)]">
      <div className="container-site py-6 md:py-10">
        <div className="flex items-center gap-4 border-b border-ivory/30 pb-3">
          <Search size={20} strokeWidth={1.25} className="shrink-0 text-ivory/60" aria-hidden="true" />
          <label htmlFor="site-search" className="sr-only">Search the collection</label>
          <input
            ref={input}
            id="site-search"
            type="search"
            value={q}
            onChange={(e) => { setQ(e.target.value); setActive(-1) }}
            onKeyDown={onKey}
            placeholder="Search rugs, origins, colours…"
            autoComplete="off"
            role="combobox"
            aria-expanded={results.length > 0}
            aria-controls="search-results"
            aria-activedescendant={active >= 0 ? `sr-${results[active]?.id}` : undefined}
            className="serif w-full bg-transparent text-[clamp(26px,4vw,44px)] placeholder:text-ivory/30 focus:outline-none"
          />
          <button type="button" onClick={closeSearch} className="icon-btn -mr-3 shrink-0" aria-label="Close search"><X size={22} strokeWidth={1.25} /></button>
        </div>

        {q.trim() === '' ? (
          <div className="py-8">
            <p className="eyebrow text-ivory/50">Suggestions</p>
            <ul className="mt-4 flex flex-wrap gap-3">
              {SUGGESTIONS.map((s) => (
                <li key={s}><button type="button" onClick={() => setQ(s)} className="border hairline px-4 py-2 text-[12px] uppercase tracking-[0.2em] hover:border-ivory transition-colors">{s}</button></li>
              ))}
            </ul>
          </div>
        ) : results.length === 0 ? (
          <p className="py-10 text-ivory/60">No pieces match “{q}”. Try a colour, an origin or a weaving style.</p>
        ) : (
          <>
            <ul id="search-results" role="listbox" className="grid gap-x-8 py-6 md:grid-cols-2">
              {results.map((p, i) => (
                <li key={p.id} id={`sr-${p.id}`} role="option" aria-selected={active === i}>
                  <Link to={`/collection/${p.slug}`} onClick={closeSearch} onMouseEnter={() => setActive(i)} className={`flex items-center gap-5 border-b hairline py-4 transition-colors ${active === i ? 'bg-ivory/[0.06]' : ''}`}>
                    <Img image={p.images[0]} alt="" className="h-20 w-16 shrink-0" sizes="64px" />
                    <div className="flex-1">
                      <p className="text-[20px] leading-tight">{p.name}</p>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ivory/55">{p.collection}</p>
                    </div>
                    <p className="text-[14px] tabular-nums">{money(p.price)}</p>
                  </Link>
                </li>
              ))}
            </ul>
            <button type="button" onClick={() => go(`/search?q=${encodeURIComponent(q.trim())}`)} className="link-line inline-flex items-center gap-2">
              View all results <ArrowRight size={14} strokeWidth={1.25} />
            </button>
          </>
        )}
      </div>
    </Modal>
  )
}
