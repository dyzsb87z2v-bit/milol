import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Check } from 'lucide-react'
import { useStore } from '@/store/StoreContext'
import { money, sizeLabel } from '@/lib/format'
import { useSeo } from '@/lib/seo'
import Img from '@/components/Img'

const STEPS = ['Contact', 'Delivery', 'Payment', 'Review']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const Field = ({ id, label, error, children }) => (
  <div>
    <label htmlFor={id} className="label">{label}</label>
    {children}
    {error && <p className="error-text" id={`${id}-err`}>{error}</p>}
  </div>
)

export default function Checkout() {
  const { cartLines, totals, account, placeOrder, clearCart } = useStore()
  const navigate = useNavigate()
  const [step, setStep] = useState(0)
  const [busy, setBusy] = useState(false)
  const [form, setForm] = useState({
    email: account?.email || '', phone: account?.phone || '',
    firstName: account?.firstName || '', lastName: account?.lastName || '',
    address1: account?.addresses?.[0]?.address1 || '', address2: account?.addresses?.[0]?.address2 || '',
    city: account?.addresses?.[0]?.city || '', postcode: account?.addresses?.[0]?.postcode || '', country: account?.addresses?.[0]?.country || 'United States',
    cardName: '', cardNumber: '', expiry: '', cvc: '', notes: '',
  })
  const [errors, setErrors] = useState({})
  useSeo({ title: 'Checkout', description: 'Secure checkout.' })

  if (cartLines.length === 0) return <Navigate to="/cart" replace />

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const inp = (id, extra = {}) => ({ id, className: 'field', value: form[id], onChange: set(id), 'aria-invalid': Boolean(errors[id]), 'aria-describedby': errors[id] ? `${id}-err` : undefined, ...extra })

  const validate = () => {
    const e = {}
    if (step === 0) {
      if (!EMAIL.test(form.email)) e.email = 'Please enter a valid email address.'
      if (form.phone.replace(/\D/g, '').length < 7) e.phone = 'Please enter a phone number for the delivery team.'
    }
    if (step === 1) {
      if (!form.firstName.trim()) e.firstName = 'Required.'
      if (!form.lastName.trim()) e.lastName = 'Required.'
      if (!form.address1.trim()) e.address1 = 'Please enter a street address.'
      if (!form.city.trim()) e.city = 'Required.'
      if (!form.postcode.trim()) e.postcode = 'Required.'
    }
    if (step === 2) {
      if (!form.cardName.trim()) e.cardName = 'Name as printed on the card.'
      if (form.cardNumber.replace(/\s/g, '').length !== 16 || !/^\d+$/.test(form.cardNumber.replace(/\s/g, ''))) e.cardNumber = 'Please enter a 16-digit card number.'
      if (!/^(0[1-9]|1[0-2])\s?\/\s?\d{2}$/.test(form.expiry)) e.expiry = 'Use MM / YY.'
      if (!/^\d{3,4}$/.test(form.cvc)) e.cvc = '3 or 4 digits.'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }
  const next = () => { if (validate()) { setStep((s) => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }) } }

  const place = () => {
    setBusy(true)
    // A real store would confirm payment with its provider here.
    window.setTimeout(() => {
      const id = `ML-${Date.now().toString(36).toUpperCase().slice(-6)}`
      placeOrder({
        id, placedAt: new Date().toISOString(),
        items: cartLines.map((l) => ({ id: l.id, qty: l.qty, price: l.product.price, name: l.product.name, slug: l.product.slug, image: l.product.images[0] })),
        totals, contact: { email: form.email, phone: form.phone },
        shipping: { firstName: form.firstName, lastName: form.lastName, address1: form.address1, address2: form.address2, city: form.city, postcode: form.postcode, country: form.country },
        card: `•••• ${form.cardNumber.replace(/\s/g, '').slice(-4)}`, notes: form.notes,
      })
      clearCart()
      navigate(`/checkout/confirmation/${id}`)
    }, 900)
  }

  return (
    <section data-tone="light" className="bg-ivory text-charcoal pt-[calc(var(--header-h)+40px)] pb-24 md:pb-36">
      <div className="container-site">
        <p className="eyebrow text-gold">Checkout</p>
        <h1 className="mt-4 text-[clamp(36px,4.6vw,60px)]">{STEPS[step]}</h1>

        <ol className="mt-8 flex flex-wrap gap-x-8 gap-y-2 border-b hairline pb-5" aria-label="Checkout progress">
          {STEPS.map((s, i) => (
            <li key={s} className={`flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] ${i === step ? 'text-charcoal' : i < step ? 'text-gold' : 'text-charcoal/40'}`} aria-current={i === step ? 'step' : undefined}>
              <span className={`inline-flex h-5 w-5 items-center justify-center rounded-full border text-[10px] ${i < step ? 'border-gold bg-gold text-charcoal' : i === step ? 'border-charcoal' : 'border-charcoal/30'}`}>{i < step ? <Check size={11} strokeWidth={2} /> : i + 1}</span>
              {s}
            </li>
          ))}
        </ol>

        <div className="mt-12 grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-7">
            {step === 0 && (
              <form onSubmit={(e) => { e.preventDefault(); next() }} noValidate className="grid gap-7 sm:grid-cols-2">
                <Field id="email" label="Email" error={errors.email}><input type="email" autoComplete="email" {...inp('email')} /></Field>
                <Field id="phone" label="Phone" error={errors.phone}><input type="tel" autoComplete="tel" {...inp('phone')} /></Field>
                <div className="sm:col-span-2"><button type="submit" className="btn btn-solid">Continue to Delivery</button></div>
              </form>
            )}
            {step === 1 && (
              <form onSubmit={(e) => { e.preventDefault(); next() }} noValidate className="grid gap-7 sm:grid-cols-2">
                <Field id="firstName" label="First name" error={errors.firstName}><input autoComplete="given-name" {...inp('firstName')} /></Field>
                <Field id="lastName" label="Last name" error={errors.lastName}><input autoComplete="family-name" {...inp('lastName')} /></Field>
                <div className="sm:col-span-2"><Field id="address1" label="Address" error={errors.address1}><input autoComplete="address-line1" {...inp('address1')} /></Field></div>
                <div className="sm:col-span-2"><Field id="address2" label="Apartment, floor (optional)"><input autoComplete="address-line2" {...inp('address2')} /></Field></div>
                <Field id="city" label="City" error={errors.city}><input autoComplete="address-level2" {...inp('city')} /></Field>
                <Field id="postcode" label="Postal code" error={errors.postcode}><input autoComplete="postal-code" {...inp('postcode')} /></Field>
                <div className="sm:col-span-2"><Field id="country" label="Country"><select {...inp('country')}>{['United States', 'United Kingdom', 'Germany', 'France', 'Italy', 'Switzerland', 'United Arab Emirates', 'Türkiye', 'Other'].map((c) => <option key={c}>{c}</option>)}</select></Field></div>
                <div className="sm:col-span-2"><Field id="notes" label="Delivery notes (optional)"><textarea rows={3} {...inp('notes', { className: 'field resize-none' })} /></Field></div>
                <div className="sm:col-span-2 flex flex-wrap gap-4"><button type="button" onClick={() => setStep(0)} className="btn btn-charcoal">Back</button><button type="submit" className="btn btn-solid">Continue to Payment</button></div>
              </form>
            )}
            {step === 2 && (
              <form onSubmit={(e) => { e.preventDefault(); next() }} noValidate className="grid gap-7 sm:grid-cols-2">
                <div className="sm:col-span-2"><Field id="cardName" label="Name on card" error={errors.cardName}><input autoComplete="cc-name" {...inp('cardName')} /></Field></div>
                <div className="sm:col-span-2"><Field id="cardNumber" label="Card number" error={errors.cardNumber}><input inputMode="numeric" autoComplete="cc-number" placeholder="0000 0000 0000 0000" {...inp('cardNumber')} /></Field></div>
                <Field id="expiry" label="Expiry" error={errors.expiry}><input inputMode="numeric" autoComplete="cc-exp" placeholder="MM / YY" {...inp('expiry')} /></Field>
                <Field id="cvc" label="Security code" error={errors.cvc}><input inputMode="numeric" autoComplete="cc-csc" placeholder="CVC" {...inp('cvc')} /></Field>
                <p className="sm:col-span-2 text-[12px] text-charcoal/55">This is a demonstration checkout. No payment is taken and card details are never stored.</p>
                <div className="sm:col-span-2 flex flex-wrap gap-4"><button type="button" onClick={() => setStep(1)} className="btn btn-charcoal">Back</button><button type="submit" className="btn btn-solid">Review Order</button></div>
              </form>
            )}
            {step === 3 && (
              <div className="space-y-8">
                <dl className="grid gap-6 sm:grid-cols-3 text-[14px]">
                  <div><dt className="eyebrow text-[10px] text-charcoal/50">Contact</dt><dd className="mt-2">{form.email}<br />{form.phone}</dd><button type="button" onClick={() => setStep(0)} className="link-line mt-2 text-charcoal/60">Edit</button></div>
                  <div><dt className="eyebrow text-[10px] text-charcoal/50">Deliver to</dt><dd className="mt-2">{form.firstName} {form.lastName}<br />{form.address1}{form.address2 && <>, {form.address2}</>}<br />{form.city} {form.postcode}<br />{form.country}</dd><button type="button" onClick={() => setStep(1)} className="link-line mt-2 text-charcoal/60">Edit</button></div>
                  <div><dt className="eyebrow text-[10px] text-charcoal/50">Payment</dt><dd className="mt-2">Card ending {form.cardNumber.replace(/\s/g, '').slice(-4)}</dd><button type="button" onClick={() => setStep(2)} className="link-line mt-2 text-charcoal/60">Edit</button></div>
                </dl>
                <button type="button" onClick={place} disabled={busy} className="btn btn-solid w-full sm:w-auto">{busy ? 'Placing your order…' : `Place Order — ${money(totals.total)}`}</button>
                <p className="text-[12px] text-charcoal/55">By placing an order you agree to our <Link to="/terms" className="underline underline-offset-4">Terms & Conditions</Link>.</p>
              </div>
            )}
          </div>

          <aside className="lg:col-span-5" aria-label="Order summary">
            <div className="border hairline p-7 lg:sticky lg:top-[calc(var(--header-h)+32px)]">
              <h2 className="font-sans text-[12px] uppercase tracking-[0.28em] font-medium">Your order</h2>
              <ul className="mt-6 divide-y hairline">
                {cartLines.map(({ product, qty }) => (
                  <li key={product.id} className="flex items-center gap-4 py-4">
                    <Img image={product.images[0]} alt="" className="h-20 w-16 shrink-0" sizes="64px" />
                    <div className="flex-1"><p className="text-[18px] leading-tight">{product.name}</p><p className="mt-1 text-[11px] uppercase tracking-[0.2em] text-charcoal/55">{sizeLabel(product)} × {qty}</p></div>
                    <p className="text-[14px] tabular-nums">{money(product.price * qty)}</p>
                  </li>
                ))}
              </ul>
              <dl className="mt-6 space-y-3 border-t hairline pt-6 text-[15px]">
                <div className="flex justify-between"><dt>Subtotal</dt><dd className="tabular-nums">{money(totals.subtotal)}</dd></div>
                <div className="flex justify-between"><dt>Delivery</dt><dd className="tabular-nums">{totals.shipping === 0 ? 'Complimentary' : money(totals.shipping)}</dd></div>
                <div className="flex justify-between"><dt>Tax</dt><dd className="tabular-nums">{money(totals.tax)}</dd></div>
                <div className="flex justify-between border-t hairline pt-4 text-[17px]"><dt>Total</dt><dd className="tabular-nums">{money(totals.total)}</dd></div>
              </dl>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
