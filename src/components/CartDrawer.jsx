import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useStore } from '@/store/StoreContext'
import { money, sizeLabel } from '@/lib/format'
import { FREE_SHIPPING_THRESHOLD } from '@/data/site'
import Modal from './Modal'
import Img from './Img'
import QuantityStepper from './QuantityStepper'
import EmptyState from './EmptyState'

export default function CartDrawer() {
  const { ui, closeCart, cartLines, totals, setQty, removeFromCart } = useStore()
  const remaining = FREE_SHIPPING_THRESHOLD - totals.subtotal
  return (
    <Modal open={ui.cartOpen} onClose={closeCart} label="Shopping bag" panelClassName="drawer-right" wrapperClassName="">
      <div className="flex items-center justify-between border-b hairline px-6 py-5">
        <h2 className="font-sans text-[12px] uppercase tracking-[0.28em] font-medium">Your Bag <span className="text-ivory/50">({totals.count})</span></h2>
        <button type="button" onClick={closeCart} className="icon-btn -mr-3" aria-label="Close bag"><X size={20} strokeWidth={1.25} /></button>
      </div>
      {cartLines.length === 0 ? (
        <div className="flex-1 px-6">
          <EmptyState compact title="Your bag is empty" text="Every piece in the collection is one of one. Begin with the one that stops you." onCta={closeCart} />
        </div>
      ) : (
        <>
          <ul className="flex-1 overflow-auto px-6">
            {cartLines.map(({ product, qty }) => (
              <li key={product.id} className="flex gap-5 border-b hairline py-6">
                <Link to={`/collection/${product.slug}`} onClick={closeCart} className="w-24 shrink-0">
                  <Img image={product.images[0]} alt={product.name} className="aspect-[4/5]" sizes="96px" />
                </Link>
                <div className="flex flex-1 flex-col">
                  <div className="flex justify-between gap-4">
                    <div>
                      <h3 className="text-[19px] leading-tight"><Link to={`/collection/${product.slug}`} onClick={closeCart}>{product.name}</Link></h3>
                      <p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-ivory/55">{sizeLabel(product)}</p>
                    </div>
                    <p className="text-[14px] tabular-nums">{money(product.price * qty)}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <QuantityStepper size="sm" value={qty} onChange={(q) => setQty(product.id, q)} label={`Quantity for ${product.name}`} />
                    <button type="button" onClick={() => removeFromCart(product.id)} className="link-line text-ivory/60 hover:text-ivory">Remove</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="border-t hairline px-6 py-6">
            <p className="text-[12px] text-ivory/60">
              {remaining > 0 ? `Add ${money(remaining)} more for complimentary white-glove delivery.` : 'Complimentary white-glove delivery included.'}
            </p>
            <div className="mt-4 flex justify-between text-[15px]">
              <span>Subtotal</span>
              <span className="tabular-nums">{money(totals.subtotal)}</span>
            </div>
            <p className="mt-1 text-[12px] text-ivory/50">Taxes and delivery calculated at checkout.</p>
            <Link to="/checkout" onClick={closeCart} className="btn btn-solid mt-6 w-full">Checkout</Link>
            <Link to="/cart" onClick={closeCart} className="link-line mt-5 block text-center">View full bag</Link>
          </div>
        </>
      )}
    </Modal>
  )
}
