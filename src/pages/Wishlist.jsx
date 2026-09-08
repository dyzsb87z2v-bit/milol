import { useStore } from '@/store/StoreContext'
import { byId } from '@/data/products'
import { useSeo } from '@/lib/seo'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import EmptyState from '@/components/EmptyState'
import Reveal from '@/components/Reveal'

export default function Wishlist() {
  const { wishlist } = useStore()
  const items = wishlist.map(byId).filter(Boolean)
  useSeo({ title: 'Wishlist', description: 'The pieces you have saved.' })
  return (
    <>
      <PageHero eyebrow="Saved pieces" title="Your Wishlist" intro={items.length ? 'Every rug here is one of one. When you are ready, it is a single step to your bag.' : undefined} />
      <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
        <div className="container-site">
          {items.length === 0 ? (
            <EmptyState title="Nothing saved yet" text="Tap the heart on any rug to keep it here while you decide." />
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
