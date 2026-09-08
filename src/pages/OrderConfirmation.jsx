import { Link, useParams } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { money, dateLong } from '@/lib/format'
import { useSeo } from '@/lib/seo'
import Img from '@/components/Img'
import EmptyState from '@/components/EmptyState'

export default function OrderConfirmation() {
  const { id } = useParams()
  const { orders } = useStore()
  const order = orders.find((o) => o.id === id)
  useSeo({ title: 'Order Confirmed', description: 'Thank you for your order.' })
  if (!order) {
    return (
      <section data-tone="light" className="bg-ivory text-charcoal pt-[var(--header-h)]"><div className="container-site"><EmptyState title="Order not found" text="We could not find that order on this device." cta={{ label: 'Go to your account', to: '/account' }} /></div></section>
    )
  }
  return (
    <section data-tone="light" className="bg-ivory text-charcoal pt-[calc(var(--header-h)+64px)] pb-24 md:pb-36">
      <div className="container-site max-w-3xl">
        <p className="eyebrow text-gold">Order {order.id}</p>
        <h1 className="mt-5 text-[clamp(40px,5.4vw,72px)]">Thank you, {order.shipping.firstName}.</h1>
        <p className="mt-6 text-[17px] leading-relaxed text-charcoal/70">Your order was placed on {dateLong(order.placedAt)}. A confirmation has been sent to {order.contact.email}, and our delivery team will contact you to arrange a white-glove appointment.</p>
        <ul className="mt-12 divide-y hairline border-y hairline">
          {order.items.map((it) => (
            <li key={it.id} className="flex items-center gap-5 py-5">
              <Img image={it.image} alt="" className="h-24 w-20 shrink-0" sizes="80px" />
              <div className="flex-1"><p className="text-[20px] leading-tight"><Link to={`/collection/${it.slug}`}>{it.name}</Link></p><p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-charcoal/55">Quantity {it.qty}</p></div>
              <p className="tabular-nums">{money(it.price * it.qty)}</p>
            </li>
          ))}
        </ul>
        <dl className="mt-6 ml-auto max-w-xs space-y-2 text-[15px]">
          <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{money(order.totals.subtotal)}</dd></div>
          <div className="flex justify-between"><dt>Delivery</dt><dd className="tabular-nums">{order.totals.shipping ? money(order.totals.shipping) : 'Complimentary'}</dd></div>
          <div className="flex justify-between"><dt>Tax</dt><dd className="tabular-nums">{money(order.totals.tax)}</dd></div>
          <div className="flex justify-between border-t hairline pt-3 text-[17px]"><dt>Total</dt><dd className="tabular-nums">{money(order.totals.total)}</dd></div>
        </dl>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 text-[14px]">
          <div><p className="eyebrow text-[10px] text-charcoal/50">Delivering to</p><p className="mt-2 leading-relaxed">{order.shipping.firstName} {order.shipping.lastName}<br />{order.shipping.address1}{order.shipping.address2 && <>, {order.shipping.address2}</>}<br />{order.shipping.city} {order.shipping.postcode}<br />{order.shipping.country}</p></div>
          <div><p className="eyebrow text-[10px] text-charcoal/50">Payment</p><p className="mt-2">Card {order.card}</p></div>
        </div>
        <div className="mt-14 flex flex-wrap gap-4">
          <Link to="/account" className="btn btn-solid">View your orders</Link>
          <Link to="/collection" className="btn btn-charcoal">Continue browsing</Link>
        </div>
      </div>
    </section>
  )
}
