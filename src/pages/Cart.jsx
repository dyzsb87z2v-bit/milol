import { Link } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { money, sizeLabel } from '@/lib/format'
import { useSeo } from '@/lib/seo'
import { FREE_SHIPPING_THRESHOLD } from '@/data/site'
import Img from '@/components/Img'
import QuantityStepper from '@/components/QuantityStepper'
import EmptyState from '@/components/EmptyState'
import PageHero from '@/components/PageHero'

export default function Cart() {
  const { cartLines, totals, setQty, removeFromCart } = useStore()
  useSeo({ title: 'Your Bag', description: 'Review the pieces in your bag.' })
  return (
    <>
      <PageHero eyebrow="Shopping Bag" title={cartLines.length ? `Your Bag (${totals.count})` : 'Your Bag'} />
      <section data-tone="dark" className="bg-black text-ivory pb-24 md:pb-36">
        <div className="container-site">
          {cartLines.length === 0 ? (
            <EmptyState title="Your bag is empty" text="Every piece in the collection is one of one. Begin with the one that stops you." />
          ) : (
            <div className="grid gap-14 lg:grid-cols-12">
              <ul className="lg:col-span-8 border-t hairline">
                {cartLines.map(({ product, qty }) => (
                  <li key={product.id} className="grid grid-cols-[96px_1fr] gap-6 border-b hairline py-8 sm:grid-cols-[140px_1fr]">
                    <Link to={`/collection/${product.slug}`}><Img image={product.images[0]} alt={product.name} className="aspect-[4/5]" sizes="140px" /></Link>
                    <div className="flex flex-col">
                      <div className="flex justify-between gap-4">
                        <div>
                          <p className="eyebrow">{product.collection}</p>
                          <h2 className="mt-2 text-[clamp(22px,2.4vw,30px)] leading-tight"><Link to={`/collection/${product.slug}`}>{product.name}</Link></h2>
                          <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-ivory/55">{sizeLabel(product)} · {product.origin}</p>
                        </div>
                        <p className="text-[16px] tabular-nums">{money(product.price * qty)}</p>
                      </div>
                      <div className="mt-auto flex flex-wrap items-center justify-between gap-4 pt-6">
                        <QuantityStepper value={qty} onChange={(q) => setQty(product.id, q)} label={`Quantity for ${product.name}`} />
                        <button type="button" onClick={() => removeFromCart(product.id)} className="link-line text-ivory/60 hover:text-ivory">Remove</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <aside className="lg:col-span-4">
                <div className="sticky top-[calc(var(--header-h)+32px)] border hairline p-7">
                  <h2 className="font-sans text-[12px] uppercase tracking-[0.28em] font-medium">Summary</h2>
                  <dl className="mt-6 space-y-3 text-[15px]">
                    <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{money(totals.subtotal)}</dd></div>
                    <div className="flex justify-between"><dt>Delivery</dt><dd className="tabular-nums">{totals.shipping === 0 ? 'Complimentary' : money(totals.shipping)}</dd></div>
                    <div className="flex justify-between"><dt>Estimated tax</dt><dd className="tabular-nums">{money(totals.tax)}</dd></div>
                    <div className="flex justify-between border-t hairline pt-4 text-[17px]"><dt>Total</dt><dd className="tabular-nums">{money(totals.total)}</dd></div>
                  </dl>
                  <p className="mt-4 text-[12px] text-ivory/55">{totals.subtotal >= FREE_SHIPPING_THRESHOLD ? 'White-glove delivery is included.' : `Complimentary white-glove delivery on orders over ${money(FREE_SHIPPING_THRESHOLD)}.`}</p>
                  <Link to="/checkout" className="btn btn-solid mt-8 w-full">Proceed to Checkout</Link>
                  <Link to="/collection" className="link-line mt-5 block text-center">Continue browsing</Link>
                </div>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
