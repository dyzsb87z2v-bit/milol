import { Link } from 'react-router-dom'
import { Heart } from 'lucide-react'
import { money, sizeLabel } from '@/lib/format'
import { useStore } from '@/store/StoreContext'
import Img from './Img'

export default function ProductCard({ product, priority = false }) {
  const { addToCart, toggleWishlist, isWished, openQuickView } = useStore()
  const wished = isWished(product.id)
  const reserved = product.availability === 'reserved'
  return (
    <article className="group relative">
      <div className="relative">
        <Link to={`/collection/${product.slug}`} className="block zoom-parent" aria-label={`${product.name}, ${money(product.price)}`}>
          <Img image={product.images[0]} alt={`${product.name}, a ${product.collection.replace(' Collection', '')} rug from ${product.origin}`} className="aspect-[4/5]" priority={priority} sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 50vw" />
        </Link>
        <div className="absolute left-3 top-3 flex gap-2">
          {product.isNew && <span className="bg-ivory/90 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em]">New</span>}
          {reserved && <span className="bg-charcoal/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.24em] text-ivory">Reserved</span>}
        </div>
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className="icon-btn absolute right-2 top-2 bg-ivory/80 hover:bg-ivory"
          aria-pressed={wished}
          aria-label={wished ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
        >
          <Heart size={16} strokeWidth={1.25} className={wished ? 'fill-gold text-gold' : ''} />
        </button>
        <div className="card-actions absolute inset-x-3 bottom-3 flex gap-2">
          <button type="button" onClick={() => openQuickView(product.id)} className="btn btn-solid-ivory min-h-[44px] flex-1 px-3 text-[10px]">Quick View</button>
          <button type="button" onClick={() => addToCart(product.id)} disabled={reserved} className="btn btn-solid min-h-[44px] flex-1 px-3 text-[10px]">
            {reserved ? 'Reserved' : 'Add to Bag'}
          </button>
        </div>
      </div>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-[22px] leading-tight">
            <Link to={`/collection/${product.slug}`} className="hover:text-gold transition-colors">{product.name}</Link>
          </h3>
          <p className="mt-1.5 text-[11px] uppercase tracking-[0.22em] text-charcoal/55">{product.collection} · {sizeLabel(product)}</p>
        </div>
        <p className="shrink-0 pt-1 text-[15px] tabular-nums">{money(product.price)}</p>
      </div>
    </article>
  )
}
