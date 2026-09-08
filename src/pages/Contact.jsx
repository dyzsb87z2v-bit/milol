import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BRAND, CONTACT_TOPICS } from '@/data/site'
import { useSeo } from '@/lib/seo'
import { load, save } from '@/lib/storage'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import { useStore } from '@/store/StoreContext'

const WhatsApp = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9.2 9.3c.2 1.9 2 3.9 4 4.5l1.2-1.1 1.9.8-.3 1.5c-3.6.4-7.3-3.2-7.6-6.8l1.4-.4.9 1.8-1.5.7Z" /></svg>
)

export default function Contact() {
  const { toast } = useStore()
  const [params] = useSearchParams()
  const initialTopic = CONTACT_TOPICS.some((t) => t.id === params.get('topic')) ? params.get('topic') : 'general'
  const [form, setForm] = useState({ name: '', email: '', topic: initialTopic, piece: params.get('piece') || '', message: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  useEffect(() => { setForm((f) => ({ ...f, topic: initialTopic, piece: params.get('piece') || f.piece })) }, [initialTopic, params])
  useSeo({ title: 'Contact', description: 'MILAEDIA is a Berlin-based gallery, open by appointment Tuesday to Saturday. Write to us about a rug, a room, a private video or a commission.' })

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))
  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (form.message.trim().length < 10 && form.topic !== 'video') errs.message = 'Please write a few more words.'
    setErrors(errs)
    if (Object.keys(errs).length) return
    save('messages', [...load('messages', []), { ...form, at: new Date().toISOString() }])
    setDone(true)
    toast('Thank you. We reply personally within two working days.')
  }
  const topic = CONTACT_TOPICS.find((t) => t.id === form.topic)
  const waText = form.topic === 'video' ? `Hello MILAEDIA, I would like a private video of ${form.piece || 'a piece from the collection'}.` : BRAND.whatsappText(form.piece)

  return (
    <>
      <PageHero eyebrow="Contact · Berlin" title="We would love to hear from you." intro="Write to us about a rug, a room, a private video or a commission, or arrange a visit. We reply personally. No automated pricing." />
      <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-4 space-y-10">
            <div>
              <p className="eyebrow text-gold">Gallery</p>
              <p className="mt-4 text-[16px] leading-relaxed text-charcoal/75">{BRAND.address}<br />{BRAND.hours}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-charcoal/55">There is no showroom to walk into. We bring pieces to you, or receive you by appointment.</p>
            </div>
            <div>
              <p className="eyebrow text-gold">Write</p>
              <p className="mt-4"><a href={`mailto:${BRAND.email}`} className="text-[16px] underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal">{BRAND.email}</a></p>
              <p className="mt-1"><a href={`tel:${BRAND.phone.replace(/[^+\d]/g, '')}`} className="text-[16px] underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal">{BRAND.phone}</a></p>
              <a href={`${BRAND.whatsapp}?text=${encodeURIComponent(waText)}`} target="_blank" rel="noreferrer" className="btn btn-charcoal mt-6 gap-3"><WhatsApp /> Message on WhatsApp</a>
            </div>
            <div>
              <p className="eyebrow text-gold">Follow</p>
              <p className="mt-4"><a href={BRAND.instagram} target="_blank" rel="noreferrer" className="text-[16px] underline underline-offset-4 decoration-charcoal/30 hover:decoration-charcoal">Instagram {BRAND.instagramHandle}</a></p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7 lg:col-start-6">
            {done ? (
              <p className="serif text-[28px]" role="status">Thank you. Your message has reached the gallery.</p>
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
                  <label htmlFor="c-topic" className="label">Subject</label>
                  <select id="c-topic" className="field" value={form.topic} onChange={set('topic')}>
                    {CONTACT_TOPICS.map((t) => <option key={t.id} value={t.id}>{t.label}</option>)}
                  </select>
                </div>
                {['piece', 'video', 'home'].includes(form.topic) && (
                  <div className="sm:col-span-2">
                    <label htmlFor="c-piece" className="label">Which piece?</label>
                    <input id="c-piece" className="field" value={form.piece} onChange={set('piece')} placeholder="e.g. Isfahan Silk Garden, MLD-IS-001" />
                    {form.topic === 'video' && <p className="mt-2 text-[12px] text-charcoal/55">We film the exact piece you are considering, the pile under moving light, the reverse, the selvedge, the colour as it truly reads, and send it to you personally, usually within a few days. Only available pieces are filmed.</p>}
                  </div>
                )}
                <div className="sm:col-span-2">
                  <label htmlFor="c-message" className="label">Message{form.topic === 'video' ? ' (optional)' : ''}</label>
                  <textarea id="c-message" rows={5} className="field resize-none" value={form.message} onChange={set('message')} aria-invalid={Boolean(errors.message)} placeholder={topic?.id === 'home' ? 'City, a preferred date and the room the carpet is for.' : undefined} />
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
