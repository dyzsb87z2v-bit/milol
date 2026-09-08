import { useState } from 'react'
import { Link } from 'react-router-dom'
import { load, save } from '@/lib/storage'
import { useStore } from '@/store/StoreContext'
import Reveal, { Words } from '@/components/Reveal'
import Img from '@/components/Img'

const SERVICES = [
  ['Private consultations', 'At the gallery, in your home, or by video. We begin with your room: its light, proportions and the way you live in it.'],
  ['Custom sizing', 'Commission a carpet woven to your exact dimensions and palette on the looms of Isfahan, Tabriz or Anatolia. Four to nine months.'],
  ['Sourcing', 'Give us a brief, a region, a period, a size, and we look for it. We report what we find, and what we rejected, and why.'],
  ['Worldwide delivery', 'Insured, documented, customs handled at both ends, and placed in the room by hand. Nothing is folded, ever.'],
]

export default function BespokeHome() {
  const { toast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', city: '', date: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (!form.city.trim()) errs.city = 'Where is the room?'
    setErrors(errs)
    if (Object.keys(errs).length) return
    save('consultations', [...load('consultations', []), { ...form, at: new Date().toISOString() }])
    setDone(true)
    toast('Thank you. We will confirm a time personally within one working day.')
  }
  return (
    <section data-tone="dark" className="bg-walnut text-ivory py-24 md:py-36">
      <div className="container-site grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <p className="eyebrow">Bespoke Service</p>
            <h2 className="mt-5 text-[clamp(38px,5vw,66px)]"><Words text="Created for your space, and no other." /></h2>
          </Reveal>
          <dl className="mt-12 grid gap-x-8 gap-y-9 sm:grid-cols-2">
            {SERVICES.map(([t, d], i) => (
              <Reveal key={t} delay={i * 90} className="border-t hairline-gold pt-5">
                <dt className="text-[24px]">{t}</dt>
                <dd className="mt-2 text-[13.5px] leading-relaxed text-ivory/60">{d}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal mask delay={200} className="mt-12 hidden lg:block">
            <Img image={{ src: '/img/bespoke-detail.webp', small: '/img/bespoke-detail-sm.webp' }} alt="Detail of an ivory medallion on a burgundy ground" className="aspect-[16/9]" sizes="50vw" />
          </Reveal>
        </div>
        <Reveal delay={150} className="lg:col-span-5 lg:col-start-8">
          <div className="border hairline-gold bg-black/40 p-7 md:p-10">
            <p className="eyebrow">Book a private consultation</p>
            <h3 className="mt-4 text-[clamp(28px,3vw,40px)]">Tell us about the room.</h3>
            <p className="mt-3 text-[13.5px] leading-relaxed text-ivory/55">We reply personally within one working day. No payment is taken and nothing is committed.</p>
            {done ? (
              <p className="serif mt-8 text-[26px]" role="status">Thank you. We will write to you shortly to arrange a time.</p>
            ) : (
              <form onSubmit={submit} noValidate className="mt-8 grid gap-6 sm:grid-cols-2">
                <div><label htmlFor="h-name" className="label">Name</label><input id="h-name" className="field" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} />{errors.name && <p className="error-text">{errors.name}</p>}</div>
                <div><label htmlFor="h-email" className="label">Email</label><input id="h-email" type="email" className="field" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={Boolean(errors.email)} />{errors.email && <p className="error-text">{errors.email}</p>}</div>
                <div><label htmlFor="h-city" className="label">City</label><input id="h-city" className="field" value={form.city} onChange={set('city')} placeholder="Berlin, Vienna, Zürich…" aria-invalid={Boolean(errors.city)} />{errors.city && <p className="error-text">{errors.city}</p>}</div>
                <div><label htmlFor="h-date" className="label">Preferred date</label><input id="h-date" type="date" className="field" value={form.date} onChange={set('date')} /></div>
                <div className="sm:col-span-2"><label htmlFor="h-notes" className="label">The room, the size, the feeling</label><textarea id="h-notes" rows={3} className="field resize-none" value={form.notes} onChange={set('notes')} placeholder="A living room of about 40 m², warm light, oak floor…" /></div>
                <div className="sm:col-span-2 flex flex-wrap items-center gap-5"><button type="submit" className="btn btn-3d">Request a Consultation</button><Link to="/bespoke" className="link-line">About bespoke</Link></div>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
