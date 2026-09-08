import { useState } from 'react'
import { BRAND } from '@/data/site'
import { useSeo } from '@/lib/seo'
import { load, save } from '@/lib/storage'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { useStore } from '@/store/StoreContext'

export default function Contact() {
  const { toast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', subject: 'General enquiry', message: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  useSeo({ title: 'Contact', description: 'Visit the MILAEDIA atelier by appointment, or write to us about a rug, a room or a commission.' })
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10) errs.message = 'Please write a few more words.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    save('messages', [...load('messages', []), { ...form, at: new Date().toISOString() }])
    setDone(true)
    toast('Thank you. We will reply within two business days.')
  }
  return (
    <>
      <PageHero eyebrow="Contact" title="We would love to hear from you." intro="Write to us about a rug, a room or a commission, or arrange a visit to the atelier." />
      <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4 space-y-10">
            <div>
              <p className="eyebrow text-gold">Atelier</p>
              <p className="mt-4 text-[16px] leading-relaxed text-charcoal/75">{BRAND.address}</p>
              <p className="mt-1 text-[16px] leading-relaxed text-charcoal/75">Tuesday to Saturday, 11:00 – 18:00</p>
            </div>
            <div>
              <p className="eyebrow text-gold">Write</p>
              <p className="mt-4"><a href={`mailto:${BRAND.email}`} className="text-[16px] underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal">{BRAND.email}</a></p>
              <p className="mt-1"><a href={`tel:${BRAND.phone.replace(/[^+\d]/g, '')}`} className="text-[16px] underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal">{BRAND.phone}</a></p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            {done ? (
              <p className="serif text-[28px]" role="status">Thank you. Your message has reached the atelier.</p>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="c-name" className="label">Name</label>
                  <input id="c-name" className="field" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} />
                  {errors.name && <p className="error-text">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="c-email" className="label">Email</label>
                  <input id="c-email" type="email" className="field" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={Boolean(errors.email)} />
                  {errors.email && <p className="error-text">{errors.email}</p>}
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-subject" className="label">Subject</label>
                  <select id="c-subject" className="field" value={form.subject} onChange={set('subject')}>
                    {['General enquiry', 'A specific rug', 'Bespoke commission', 'Private viewing', 'Care & restoration', 'Press'].map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="label">Message</label>
                  <textarea id="c-message" rows={5} className="field resize-none" value={form.message} onChange={set('message')} aria-invalid={Boolean(errors.message)} />
                  {errors.message && <p className="error-text">{errors.message}</p>}
                </div>
                <div className="sm:col-span-2"><button type="submit" className="btn btn-solid">Send Message</button></div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
