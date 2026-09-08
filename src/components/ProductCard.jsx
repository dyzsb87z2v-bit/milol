import { Link } from 'react-router-dom'
import { ArrowUpRight, Heart } from 'lucide-react'
import { money, sizeLabel } from '@/lib/format'
import { useStore } from '@/store/StoreContext'
import Img from './Img'

/**
 * Editorial product card: a tall image on a hairline, the family and name
 * in serif, the material and price in small caps, and the actions revealed
 * on hover (always visible on touch).
 */
export default function ProductCard({ product, priority = false, aspect = 'aspect-[4/5]', sizes }) {
  const { addToCart, toggleWishlist, isWished, openQuickView } = useStore()
  const wished = isWished(product.id)
  const reserved = product.availability === 'reserved'
  return (
    <article className="group relative">
      <div className="relative border hairline transition-colors duration-700 group-hover:border-gold/50">
        <Link to={`/collection/${product.slug}`} className="block zoom-parent" aria-label={`${product.name}, ${money(product.price)}`}>
          <Img image={product.images[0]} alt={`${product.name}, a ${product.collection.replace(' Collection', '')} rug from ${product.origin}`} className={aspect} priority={priority} sizes={sizes || '(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 90vw'} />
        </Link>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100" aria-hidden="true" />
        <div className="absolute left-4 top-4 flex gap-2">
          {product.isNew && <span className="border border-ivory/40 bg-black/50 px-2.5 py-1 text-[9.5px] uppercase tracking-[0.28em] backdrop-blur">New</span>}
          {reserved && <span className="border border-gold/60 bg-black/60 px-2.5 py-1 text-[9.5px] uppercase tracking-[0.28em] text-gold backdrop-blur">Reserved</span>}
        </div>
        <button type="button" onClick={() => toggleWishlist(product.id)} className="icon-btn absolute right-3 top-3 bg-black/40 backdrop-blur hover:bg-black/60" aria-pressed={wished} aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}>
          <Heart size={15} strokeWidth={1} className={wished ? 'fill-gold text-gold' : ''} />
        </button>
        <div className="card-actions absolute inset-x-4 bottom-4 flex gap-2">
          <button type="button" onClick={() => openQuickView(product.id)} className="btn btn-ivory min-h-[44px] flex-1 px-3 text-[9.5px] backdrop-blur">Quick View</button>
          <button type="button" onClick={() => addToCart(product.id)} disabled={reserved} className="btn btn-solid min-h-[44px] flex-1 px-3 text-[9.5px]">{reserved ? 'Reserved' : 'Add to Bag'}</button>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <p className="eyebrow">{product.collection.replace(' Collection', '')} · {product.origin.split(',')[0]}</p>
          <h3 className="mt-2 text-[26px] leading-tight"><Link to={`/collection/${product.slug}`} className="transition-colors hover:text-gold">{product.name}</Link></h3>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.2em] text-ivory/50">{sizeLabel(product)} · {product.materials.split(' on ')[0]}</p>
        </div>
        <div className="shrink-0 text-right">
          <p className="pt-1 text-[15px] tabular-nums">{money(product.price)}</p>
          <Link to={`/collection/${product.slug}`} className="link-line link-gold mt-2 inline-flex items-center gap-1">View Piece <ArrowUpRight size={12} strokeWidth={1.25} /></Link>
        </div>
      </div>
    </article>
  )
}
