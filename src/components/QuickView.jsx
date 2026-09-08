import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Heart, X } from 'lucide-react'
import { useStore } from '@/store/StoreContext'
import { byId, AVAILABILITY_LABEL } from '@/data/products'
import { money, sizeLabel } from '@/lib/format'
import Modal from './Modal'
import Img from './Img'
import QuantityStepper from './QuantityStepper'

export default function QuickView() {
  const { ui, closeQuickView, addToCart, toggleWishlist, isWished } = useStore()
  const product = ui.quickView ? byId(ui.quickView) : null
  const [qty, setQty] = useState(1)
  const [img, setImg] = useState(0)
  useEffect(() => { setQty(1); setImg(0) }, [ui.quickView])
  if (!product) return null
  const reserved = product.availability === 'reserved'
  const wished = isWished(product.id)
  return (
    <Modal open={Boolean(product)} onClose={closeQuickView} label={`Quick view: ${product.name}`}>
      <div className="grid md:grid-cols-2">
        <div className="relative bg-sand/30">
          <Img image={product.images[img]} alt={`${product.name} detail`} className="aspect-[4/5] md:h-full" sizes="(min-width: 768px) 520px, 100vw" />
          <div className="absolute bottom-4 left-4 flex gap-2">
            {product.images.map((im, i) => (
              <button key={i} type="button" onClick={() => setImg(i)} className={`h-14 w-11 overflow-hidden border-2 transition-colors ${img === i ? 'border-ivory' : 'border-transparent opacity-80'}`} aria-label={`View image ${i + 1}`} aria-pressed={img === i}>
                <Img image={im} alt="" className="h-full" sizes="44px" />
              </button>
            ))}
          </div>
        </div>
        <div className="relative flex flex-col p-7 md:p-10">
          <button type="button" onClick={closeQuickView} className="icon-btn absolute right-3 top-3" aria-label="Close quick view"><X size={20} strokeWidth={1.25} /></button>
          <p className="eyebrow text-gold">{product.collection}</p>
          <h2 className="mt-3 text-[clamp(30px,3.4vw,42px)] pr-10">{product.name}</h2>
          <p className="mt-3 text-[18px] tabular-nums">{money(product.price)}</p>
          <p className="mt-5 text-[15px] leading-relaxed text-charcoal/70">{product.short}</p>
          <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 text-[13px]">
            <div><dt className="eyebrow text-[10px] text-charcoal/50">Origin</dt><dd className="mt-1">{product.origin}</dd></div>
            <div><dt className="eyebrow text-[10px] text-charcoal/50">Size</dt><dd className="mt-1">{sizeLabel(product)}</dd></div>
            <div><dt className="eyebrow text-[10px] text-charcoal/50">Material</dt><dd className="mt-1">{product.materials}</dd></div>
            <div><dt className="eyebrow text-[10px] text-charcoal/50">Availability</dt><dd className="mt-1">{AVAILABILITY_LABEL[product.availability]}</dd></div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <QuantityStepper value={qty} onChange={setQty} />
            <button type="button" disabled={reserved} onClick={() => { addToCart(product.id, qty); closeQuickView() }} className="btn btn-solid flex-1">{reserved ? 'Reserved' : 'Add to Bag'}</button>
            <button type="button" onClick={() => toggleWishlist(product.id)} className="icon-btn border hairline" aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}>
              <Heart size={18} strokeWidth={1.25} className={wished ? 'fill-gold text-gold' : ''} />
            </button>
          </div>
          <Link to={`/collection/${product.slug}`} onClick={closeQuickView} className="link-line mt-8 self-start">View full details</Link>
        </div>
      </div>
    </Modal>
  )
}
