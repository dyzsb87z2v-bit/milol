import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { SlidersHorizontal, X } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { FILTERS, SORTS, readParams, applyCatalog } from '@/lib/catalog'
import { useSeo } from '@/lib/seo'
import ProductCard from '@/components/ProductCard'
import Reveal from '@/components/Reveal'
import Modal from '@/components/Modal'
import EmptyState from '@/components/EmptyState'
import PageHero from '@/components/PageHero'

function FilterGroups({ filters, toggle }) {
  return (
    <div className="space-y-9">
      {Object.entries(FILTERS).map(([key, group]) => (
        <fieldset key={key}>
          <legend className="eyebrow text-ivory/60">{group.label}</legend>
          <ul className="mt-4 space-y-2.5">
            {group.options.map((o) => {
              const checked = filters[key].includes(o.id)
              return (
                <li key={o.id}>
                  <label className="flex cursor-pointer items-center gap-3 text-[14px]">
                    <input type="checkbox" checked={checked} onChange={() => toggle(key, o.id)} className="peer sr-only" />
                    <span className={`inline-block h-3.5 w-3.5 border transition-colors ${checked ? 'border-ivory bg-charcoal' : 'border-ivory/40'} peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-gold peer-focus-visible:outline-offset-2`} aria-hidden="true" />
                    <span className={checked ? '' : 'text-ivory/75'}>{o.label}</span>
                  </label>
                </li>
              )
            })}
          </ul>
        </fieldset>
      ))}
    </div>
  )
}

export default function Collection({ newArrivals = false }) {
  const [params, setParams] = useSearchParams()
  const [drawer, setDrawer] = useState(false)
  const { filters, sort } = useMemo(() => readParams(params), [params])
  const base = newArrivals ? PRODUCTS.filter((p) => p.isNew) : PRODUCTS
  const items = useMemo(() => applyCatalog(base, { filters, sort }), [base, filters, sort])
  const activeCount = Object.values(filters).reduce((s, v) => s + v.length, 0)

  useSeo({
    title: newArrivals ? 'New Arrivals' : 'The Collection',
    description: newArrivals ? 'The latest handmade Persian and Turkish rugs to join the MILAEDIA collection.' : 'Curated handmade Persian and Turkish rugs for interiors with character. Filter by collection, origin, size, colour and price.',
  })

  const update = (next) => {
    const sp = new URLSearchParams()
    Object.entries(next.filters).forEach(([k, v]) => v.length && sp.set(k, v.join(',')))
    if (next.sort !== 'featured') sp.set('sort', next.sort)
    setParams(sp, { replace: true })
  }
  const toggle = (key, id) => {
    const cur = filters[key]
    update({ sort, filters: { ...filters, [key]: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id] } })
  }
  const clear = () => update({ sort, filters: Object.fromEntries(Object.keys(FILTERS).map((k) => [k, []])) })
  const chips = Object.entries(filters).flatMap(([key, ids]) => ids.map((id) => ({ key, id, label: FILTERS[key].options.find((o) => o.id === id)?.label })))

  return (
    <>
      <PageHero
        eyebrow={newArrivals ? 'Just arrived' : 'The Collection'}
        title={newArrivals ? 'New Arrivals' : 'Curated rugs for interiors with character.'}
        intro={newArrivals ? 'Recently finished pieces and new acquisitions, photographed as they arrive at the atelier.' : 'Every piece is chosen one at a time, for the quality of its weave and the life it will have in a room. Nothing here is a reproduction.'}
      />
      <section data-tone="dark" className="bg-black text-ivory pb-24 md:pb-36">
        <div className="container-site">
          <div className="flex flex-wrap items-center justify-between gap-4 border-y hairline py-4">
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => setDrawer(true)} className="link-line inline-flex items-center gap-2 lg:hidden">
                <SlidersHorizontal size={14} strokeWidth={1.25} /> Filters {activeCount > 0 && `(${activeCount})`}
              </button>
              <p className="text-[12px] text-ivory/55" aria-live="polite">{items.length} {items.length === 1 ? 'piece' : 'pieces'}</p>
            </div>
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="eyebrow text-ivory/60">Sort</label>
              <select id="sort" value={sort} onChange={(e) => update({ filters, sort: e.target.value })} className="field w-auto border-0 py-1 text-[13px]">
                {SORTS.map((s) => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>

          {chips.length > 0 && (
            <ul className="mt-5 flex flex-wrap items-center gap-2" aria-label="Active filters">
              {chips.map((c) => (
                <li key={`${c.key}-${c.id}`}>
                  <button type="button" onClick={() => toggle(c.key, c.id)} className="inline-flex items-center gap-2 border hairline px-3 py-1.5 text-[12px] hover:border-ivory transition-colors" aria-label={`Remove filter ${c.label}`}>
                    {c.label} <X size={12} strokeWidth={1.5} />
                  </button>
                </li>
              ))}
              <li><button type="button" onClick={clear} className="link-line ml-2 text-ivory/60">Clear all</button></li>
            </ul>
          )}

          <div className="mt-12 grid gap-12 lg:grid-cols-12">
            <aside className="hidden lg:col-span-3 lg:block" aria-label="Filters">
              <div className="sticky top-[calc(var(--header-h)+32px)]">
                <FilterGroups filters={filters} toggle={toggle} />
              </div>
            </aside>
            <div className="lg:col-span-9">
              {items.length === 0 ? (
                <EmptyState title="No pieces match" text="Try loosening a filter or two. The collection is small by design, and every rug is one of one." cta={{ label: 'Clear filters' }} onCta={clear} />
              ) : (
                <div className="grid grid-cols-1 gap-x-6 gap-y-14 xs:grid-cols-2 xl:grid-cols-3">
                  {items.map((p, i) => (
                    <Reveal key={p.id} delay={(i % 3) * 80}>
                      <ProductCard product={p} priority={i < 3} />
                    </Reveal>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <Modal open={drawer} onClose={() => setDrawer(false)} label="Filters" panelClassName="drawer-right" wrapperClassName="">
        <div className="flex items-center justify-between border-b hairline px-6 py-5">
          <h2 className="font-sans text-[12px] uppercase tracking-[0.28em] font-medium">Filters</h2>
          <button type="button" onClick={() => setDrawer(false)} className="icon-btn -mr-3" aria-label="Close filters"><X size={20} strokeWidth={1.25} /></button>
        </div>
        <div className="flex-1 overflow-auto px-6 py-8"><FilterGroups filters={filters} toggle={toggle} /></div>
        <div className="flex gap-3 border-t hairline px-6 py-5">
          <button type="button" onClick={clear} className="btn btn-ivory flex-1">Clear</button>
          <button type="button" onClick={() => setDrawer(false)} className="btn btn-solid flex-1">Show {items.length}</button>
        </div>
      </Modal>
    </>
  )
}
