import { Link } from 'react-router-dom'
import { PRODUCTS } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import Reveal, { Words } from '@/components/Reveal'

// An asymmetric editorial grid: two tall statement pieces and four in a
// tighter rhythm, so the eye moves rather than scans.
const LAYOUT = [
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-5',
  'md:col-span-7 md:row-span-2',
  'md:col-span-5',
]

export default function StatementCollection() {
  const items = PRODUCTS.filter((p) => p.featured).slice(0, 6)
  return (
    <section data-tone="dark" className="bg-black text-ivory pb-24 md:pb-36">
      <div className="container-site">
        <div className="rule mb-20 md:mb-28" />
        <Reveal className="grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-7">
            <p className="eyebrow">Statement Collection</p>
            <h2 className="mt-5 text-[clamp(38px,5.4vw,72px)]"><Words text="Pieces that give a room its centre." /></h2>
          </div>
          <p className="md:col-span-4 md:col-start-9 text-[15px] leading-relaxed text-ivory/60">Every carpet here is a single physical object, held in Berlin, examined knot by knot and filmed for you on request. When one is placed, it leaves this page.</p>
        </Reveal>
        <div className="mt-14 grid gap-x-6 gap-y-14 md:grid-cols-12 md:gap-y-16">
          {items.map((p, i) => (
            <Reveal key={p.id} delay={(i % 2) * 100} className={LAYOUT[i]}>
              <ProductCard product={p} priority={i === 0} aspect={LAYOUT[i].includes('row-span-2') ? 'aspect-[4/5] md:aspect-[5/7]' : 'aspect-[4/5] md:aspect-[5/4]'} sizes={LAYOUT[i].includes('col-span-7') ? '(min-width: 768px) 55vw, 100vw' : '(min-width: 768px) 40vw, 100vw'} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-16 text-center">
          <Link to="/collection" className="btn btn-gold">See the full collection</Link>
        </Reveal>
      </div>
    </section>
  )
}
