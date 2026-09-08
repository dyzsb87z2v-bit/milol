import { useState } from 'react'
import { useSeo } from '@/lib/seo'
import { load, save } from '@/lib/storage'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Img from '@/components/Img'
import { useStore } from '@/store/StoreContext'

const STEPS = [
  { n: '01', title: 'Conversation', text: 'We begin with your room: its light, its proportions, the way you live in it. Bring photographs, plans or simply a feeling.' },
  { n: '02', title: 'Design', text: 'Our designers draw the piece to scale, choosing motif, palette and material. You approve a painted cartoon and dyed yarn samples.' },
  { n: '03', title: 'Weaving', text: 'Master weavers tie the rug by hand over four to twelve months. We share progress from the loom at each stage.' },
  { n: '04', title: 'Delivery', text: 'The finished rug is washed, finished and documented, then placed in your room by our team.' },
]

export default function Bespoke() {
  const { toast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', room: '', size: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  useSeo({ title: 'Bespoke', description: 'Commission a one-of-one handwoven rug, designed for your room and woven by master artisans.' })

  const submit = (e) => {
    e.preventDefault()
    const errs = {}
    if (!form.name.trim()) errs.name = 'Please tell us your name.'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = 'Please enter a valid email address.'
    if (!form.room.trim()) errs.room = 'Which room is the rug for?'
    setErrors(errs)
    if (Object.keys(errs).length) return
    save('bespoke', [...load('bespoke', []), { ...form, at: new Date().toISOString() }])
    setDone(true)
    toast('Thank you. A member of the atelier will be in touch within two days.')
  }
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <PageHero eyebrow="Bespoke Service" title="Created for Your Space" intro="From scale and palette to material and motif, our bespoke service brings your vision into a one-of-one woven work of art." image={{ src: '/img/bespoke-hall.webp', small: '/img/bespoke-hall-sm.webp' }} alt="A finished carpet suspended in the atelier under a single light" />

      <section data-tone="light" className="bg-ivory text-charcoal py-24 md:py-36">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">The Process</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Four conversations, one rug.</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-charcoal/70">A bespoke MILAEDIA rug takes between six and fourteen months. Every stage is unhurried, and every decision is yours.</p>
            <div className="mt-10 zoom-parent">
              <Img image={{ src: '/img/bespoke-detail.webp', small: '/img/bespoke-detail-sm.webp' }} alt="Detail of an ivory medallion on a burgundy ground" className="aspect-[4/5]" sizes="(min-width: 1024px) 40vw, 100vw" />
            </div>
          </Reveal>
          <ol className="lg:col-span-6 lg:col-start-7 space-y-12">
            {STEPS.map((s, i) => (
              <Reveal as="li" key={s.n} delay={i * 90} className="grid grid-cols-[56px_1fr] gap-6 border-t hairline pt-8">
                <span className="serif text-[28px] text-gold">{s.n}</span>
                <div>
                  <h3 className="text-[clamp(26px,2.6vw,34px)]">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">{s.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section id="consultation" data-tone="dark" className="bg-charcoal text-ivory py-24 md:py-36 scroll-mt-[var(--header-h)]">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">Start a Project</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Book a Private Consultation</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-ivory/70">Tell us a little about the room and we will arrange a conversation at the atelier, at your home, or by video.</p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            {done ? (
              <p className="serif text-[28px]" role="status">Thank you. We will write to you within two days to arrange a time.</p>
            ) : (
              <form onSubmit={submit} noValidate className="grid gap-7 sm:grid-cols-2">
                <div>
                  <label htmlFor="b-name" className="label text-ivory/70">Name</label>
                  <input id="b-name" className="field field-dark" value={form.name} onChange={set('name')} autoComplete="name" aria-invalid={Boolean(errors.name)} />
                  {errors.name && <p className="error-text text-[#d9a49a]">{errors.name}</p>}
                </div>
                <div>
                  <label htmlFor="b-email" className="label text-ivory/70">Email</label>
                  <input id="b-email" type="email" className="field field-dark" value={form.email} onChange={set('email')} autoComplete="email" aria-invalid={Boolean(errors.email)} />
                  {errors.email && <p className="error-text text-[#d9a49a]">{errors.email}</p>}
                </div>
                <div>
                  <label htmlFor="b-room" className="label text-ivory/70">Room</label>
                  <input id="b-room" className="field field-dark" value={form.room} onChange={set('room')} placeholder="Living room, gallery, bedroom…" aria-invalid={Boolean(errors.room)} />
                  {errors.room && <p className="error-text text-[#d9a49a]">{errors.room}</p>}
                </div>
                <div>
                  <label htmlFor="b-size" className="label text-ivory/70">Approximate size</label>
                  <input id="b-size" className="field field-dark" value={form.size} onChange={set('size')} placeholder="e.g. 300 × 400 cm" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="b-notes" className="label text-ivory/70">Notes</label>
                  <textarea id="b-notes" rows={4} className="field field-dark resize-none" value={form.notes} onChange={set('notes')} placeholder="Palette, motifs you love, anything at all." />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn btn-solid-ivory">Request a Consultation</button>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </section>
    </>
  )
}
