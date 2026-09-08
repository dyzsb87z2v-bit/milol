import { Link } from 'react-router-dom'
import { PRODUCTS } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import SectionHeading from '@/components/SectionHeading'
import Reveal from '@/components/Reveal'

export default function FeaturedCollection() {
  const items = PRODUCTS.filter((p) => p.featured).slice(0, 6)
  return (
    <section id="collection" data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36 scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <div className="rule mb-20 md:mb-28" />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Featured" title="The Collection" subtitle="Curated rugs for interiors with character." />
          <Reveal delay={100} className="md:pb-3">
            <Link to="/collection" className="link-line">View all pieces</Link>
          </Reveal>
        </div>
        <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-14 xs:grid-cols-2 lg:grid-cols-3">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 3) * 90}>
              <ProductCard product={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
