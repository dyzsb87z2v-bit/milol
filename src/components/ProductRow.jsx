import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import ProductCard from './ProductCard'

/** Horizontal, snap-scrolling row of product cards with arrow controls. */
export default function ProductRow({ title, eyebrow, products, id }) {
  const ref = useRef(null)
  if (!products.length) return null
  const scroll = (dir) => ref.current?.scrollBy({ left: dir * Math.min(420, ref.current.clientWidth * 0.8), behavior: 'smooth' })
  return (
    <section aria-labelledby={id} className="py-20 md:py-28">
      <div className="container-site">
        <div className="flex items-end justify-between gap-6">
          <div>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h2 id={id} className="mt-4 text-[clamp(30px,4vw,46px)]">{title}</h2>
          </div>
          <div className="hidden gap-2 md:flex">
            <button type="button" onClick={() => scroll(-1)} className="icon-btn border hairline" aria-label="Scroll left"><ArrowLeft size={16} strokeWidth={1.25} /></button>
            <button type="button" onClick={() => scroll(1)} className="icon-btn border hairline" aria-label="Scroll right"><ArrowRight size={16} strokeWidth={1.25} /></button>
          </div>
        </div>
        <div ref={ref} className="rail -mx-[22px] mt-10 flex gap-5 overflow-x-auto px-[22px] pb-2 md:-mx-12 md:px-12 xl:-mx-20 xl:px-20">
          {products.map((p) => (
            <div key={p.id} className="w-[72vw] shrink-0 xs:w-[58vw] md:w-[34vw] xl:w-[23vw]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
