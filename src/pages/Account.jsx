import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useStore } from '@/store/StoreContext'
import { money, dateLong } from '@/lib/format'
import { useSeo } from '@/lib/seo'
import PageHero from '@/components/PageHero'
import EmptyState from '@/components/EmptyState'
import Img from '@/components/Img'

const TABS = ['Orders', 'Addresses', 'Profile']
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function SignIn({ onDone }) {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '' })
  const [err, setErr] = useState('')
  const submit = (e) => {
    e.preventDefault()
    if (!form.firstName.trim() || !EMAIL.test(form.email)) return setErr('Please enter your name and a valid email address.')
    onDone({ ...form, phone: '', addresses: [] })
  }
  return (
    <form onSubmit={submit} noValidate className="max-w-lg">
      <p className="text-[16px] leading-relaxed text-ivory/60">Create a MILAEDIA account to follow orders, keep addresses and save the pieces you love. This demonstration keeps your details on this device only.</p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div><label htmlFor="a-first" className="label">First name</label><input id="a-first" className="field" autoComplete="given-name" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} /></div>
        <div><label htmlFor="a-last" className="label">Last name</label><input id="a-last" className="field" autoComplete="family-name" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} /></div>
        <div className="sm:col-span-2"><label htmlFor="a-email" className="label">Email</label><input id="a-email" type="email" className="field" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></div>
      </div>
      {err && <p className="error-text mt-3" role="alert">{err}</p>}
      <button type="submit" className="btn btn-solid mt-8">Continue</button>
    </form>
  )
}

export default function Account() {
  const { account, setAccount, orders, toast } = useStore()
  const [tab, setTab] = useState(0)
  const [profile, setProfile] = useState(null)
  const [addr, setAddr] = useState(null)
  useSeo({ title: 'Account', description: 'Your MILAEDIA account.' })

  const saveProfile = (e) => { e.preventDefault(); setAccount({ ...account, ...profile }); setProfile(null); toast('Profile updated') }
  const saveAddr = (e) => {
    e.preventDefault()
    if (!addr.address1.trim() || !addr.city.trim()) return toast('Please complete the address.')
    setAccount({ ...account, addresses: [...(account.addresses || []), addr] })
    setAddr(null)
    toast('Address saved')
  }
  const removeAddr = (i) => setAccount({ ...account, addresses: account.addresses.filter((_, j) => j !== i) })

  return (
    <>
      <PageHero eyebrow="Account" title={account ? `Welcome, ${account.firstName}.` : 'Your Account'} />
      <section data-tone="dark" className="bg-black text-ivory pb-24 md:pb-36">
        <div className="container-site">
          {!account ? (
            <SignIn onDone={(a) => { setAccount(a); toast(`Welcome, ${a.firstName}.`) }} />
          ) : (
            <div className="grid gap-12 lg:grid-cols-12">
              <nav className="lg:col-span-3" aria-label="Account sections">
                <ul className="flex gap-6 border-b hairline lg:flex-col lg:gap-0 lg:border-0">
                  {TABS.map((t, i) => (
                    <li key={t}><button type="button" onClick={() => setTab(i)} aria-current={tab === i ? 'page' : undefined} className={`block py-3 text-[12px] uppercase tracking-[0.24em] ${tab === i ? 'text-ivory border-b border-ivory lg:border-0' : 'text-ivory/50 hover:text-ivory'}`}>{t}</button></li>
                  ))}
                  <li className="lg:mt-6"><Link to="/wishlist" className="block py-3 text-[12px] uppercase tracking-[0.24em] text-ivory/50 hover:text-ivory">Wishlist</Link></li>
                  <li><button type="button" onClick={() => { setAccount(null); toast('Signed out') }} className="block py-3 text-[12px] uppercase tracking-[0.24em] text-ivory/50 hover:text-ivory">Sign out</button></li>
                </ul>
              </nav>
              <div className="lg:col-span-8 lg:col-start-5">
                {tab === 0 && (orders.length === 0 ? (
                  <EmptyState compact title="No orders yet" text="When you place an order it will appear here, with its delivery status." />
                ) : (
                  <ul className="divide-y hairline border-y hairline">
                    {orders.map((o) => (
                      <li key={o.id} className="py-7">
                        <div className="flex flex-wrap items-baseline justify-between gap-3">
                          <div><p className="eyebrow">Order {o.id}</p><p className="mt-1 text-[13px] text-ivory/60">{dateLong(o.placedAt)} · {o.items.length} {o.items.length === 1 ? 'piece' : 'pieces'} · In preparation</p></div>
                          <p className="tabular-nums">{money(o.totals.total)}</p>
                        </div>
                        <ul className="mt-5 flex gap-3">{o.items.map((it) => <li key={it.id}><Link to={`/collection/${it.slug}`}><Img image={it.image} alt={it.name} className="h-20 w-16" sizes="64px" /></Link></li>)}</ul>
                        <Link to={`/checkout/confirmation/${o.id}`} className="link-line mt-5 inline-block">View order</Link>
                      </li>
                    ))}
                  </ul>
                ))}
                {tab === 1 && (
                  <div>
                    {(account.addresses || []).length === 0 && !addr && <EmptyState compact title="No saved addresses" text="Save a delivery address to speed up checkout." cta={{ label: 'Add an address' }} onCta={() => setAddr({ label: 'Home', address1: '', address2: '', city: '', postcode: '', country: 'United States' })} />}
                    <ul className="grid gap-5 sm:grid-cols-2">
                      {(account.addresses || []).map((a, i) => (
                        <li key={i} className="border hairline p-6 text-[14px] leading-relaxed"><p className="eyebrow">{a.label}</p><p className="mt-3">{a.address1}{a.address2 && <>, {a.address2}</>}<br />{a.city} {a.postcode}<br />{a.country}</p><button type="button" onClick={() => removeAddr(i)} className="link-line mt-4 text-ivory/60">Remove</button></li>
                      ))}
                    </ul>
                    {addr ? (
                      <form onSubmit={saveAddr} className="mt-8 grid gap-6 sm:grid-cols-2 border-t hairline pt-8">
                        <div><label htmlFor="ad-label" className="label">Label</label><input id="ad-label" className="field" value={addr.label} onChange={(e) => setAddr({ ...addr, label: e.target.value })} /></div>
                        <div><label htmlFor="ad-country" className="label">Country</label><input id="ad-country" className="field" value={addr.country} onChange={(e) => setAddr({ ...addr, country: e.target.value })} /></div>
                        <div className="sm:col-span-2"><label htmlFor="ad-1" className="label">Address</label><input id="ad-1" className="field" value={addr.address1} onChange={(e) => setAddr({ ...addr, address1: e.target.value })} /></div>
                        <div><label htmlFor="ad-city" className="label">City</label><input id="ad-city" className="field" value={addr.city} onChange={(e) => setAddr({ ...addr, city: e.target.value })} /></div>
                        <div><label htmlFor="ad-post" className="label">Postal code</label><input id="ad-post" className="field" value={addr.postcode} onChange={(e) => setAddr({ ...addr, postcode: e.target.value })} /></div>
                        <div className="sm:col-span-2 flex gap-4"><button type="submit" className="btn btn-solid">Save address</button><button type="button" onClick={() => setAddr(null)} className="btn btn-ivory">Cancel</button></div>
                      </form>
                    ) : (account.addresses || []).length > 0 && (
                      <button type="button" onClick={() => setAddr({ label: 'Home', address1: '', address2: '', city: '', postcode: '', country: 'United States' })} className="btn btn-ivory mt-8">Add an address</button>
                    )}
                  </div>
                )}
                {tab === 2 && (
                  <form onSubmit={saveProfile} className="grid max-w-lg gap-6 sm:grid-cols-2">
                    <div><label htmlFor="p-first" className="label">First name</label><input id="p-first" className="field" value={(profile ?? account).firstName} onChange={(e) => setProfile({ ...(profile ?? account), firstName: e.target.value })} /></div>
                    <div><label htmlFor="p-last" className="label">Last name</label><input id="p-last" className="field" value={(profile ?? account).lastName} onChange={(e) => setProfile({ ...(profile ?? account), lastName: e.target.value })} /></div>
                    <div><label htmlFor="p-email" className="label">Email</label><input id="p-email" type="email" className="field" value={(profile ?? account).email} onChange={(e) => setProfile({ ...(profile ?? account), email: e.target.value })} /></div>
                    <div><label htmlFor="p-phone" className="label">Phone</label><input id="p-phone" type="tel" className="field" value={(profile ?? account).phone || ''} onChange={(e) => setProfile({ ...(profile ?? account), phone: e.target.value })} /></div>
                    <div className="sm:col-span-2"><button type="submit" disabled={!profile} className="btn btn-solid">Save changes</button></div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
