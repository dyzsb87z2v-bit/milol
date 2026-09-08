import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { searchProducts } from '@/lib/catalog'
import { useSeo } from '@/lib/seo'
import { useStore } from '@/store/StoreContext'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import EmptyState from '@/components/EmptyState'
import Reveal from '@/components/Reveal'

export default function Search() {
  const [params] = useSearchParams()
  const { openSearch } = useStore()
  const q = params.get('q') || ''
  const items = useMemo(() => searchProducts(q), [q])
  useSeo({ title: q ? `Search: ${q}` : 'Search', description: 'Search the MILAEDIA collection.' })
  return (
    <>
      <PageHero eyebrow="Search" title={q ? `“${q}”` : 'Search the collection'} intro={q ? `${items.length} ${items.length === 1 ? 'piece matches' : 'pieces match'} your search.` : undefined} />
      <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
        <div className="container-site">
          {items.length === 0 ? (
            <EmptyState title={q ? 'No pieces found' : 'What are you looking for?'} text={q ? 'Try a colour, an origin such as Isfahan or Konya, or a material such as silk.' : 'Search by name, origin, colour or material.'} cta={{ label: 'Search again' }} onCta={openSearch} />
          ) : (
            <div className="grid grid-cols-1 gap-x-6 gap-y-14 xs:grid-cols-2 lg:grid-cols-4">
              {items.map((p, i) => <Reveal key={p.id} delay={(i % 4) * 80}><ProductCard product={p} /></Reveal>)}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
