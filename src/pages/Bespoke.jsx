import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSeo } from '@/lib/seo'
import { load, save } from '@/lib/storage'
import { asset } from '@/lib/assets'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Img from '@/components/Img'
import { useStore } from '@/store/StoreContext'

const STEPS = [
  { n: '01', title: 'Consultation', text: 'We begin with your room: its light, proportions, floor and furniture. In person, on a call, or from photographs and a floor plan.' },
  { n: '02', title: 'Design', text: 'Our designers draw the piece to scale, propose a palette of natural dyes, and weave a hand sample so you can hold the colour and the pile. Nothing is dyed and no loom is dressed until you approve it.' },
  { n: '03', title: 'Weaving', text: 'The design is translated into a knot-plan and set up on the loom in Isfahan, Tabriz or central Anatolia. Weaving takes three to nine months, with photographs from the loom along the way.' },
  { n: '04', title: 'Delivery', text: 'The finished carpet is washed, stretched, inspected and delivered white-glove, with its certificate. We return after a month to make sure it has settled.' },
]

const HOME_STEPS = [
  ['Choose your masterpiece', 'Select any piece from the collection, or several, if you would like to see them against one another.'],
  ['Book your private experience', 'Name a date, a time and an address. Apartment, villa, office, hotel or a project still being built.'],
  ['Experience the carpet', 'Our team arrives and lays each piece on your floor at true size, in your own light.'],
  ['Decide with confidence', 'You see the proportions, the palette and the room together before anything is bought. Then, and only then, you decide.'],
]

const BUDGETS = ['$6,500 – $10,000', '$10,000 – $20,000', '$20,000 – $40,000', 'Over $40,000', 'Not sure yet']

export default function Bespoke() {
  const { toast } = useStore()
  const [form, setForm] = useState({ name: '', email: '', room: '', size: '', budget: '', notes: '' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  useSeo({ title: 'Bespoke', description: 'Commission a one-of-one handwoven rug, designed for your room and woven by master artisans in Isfahan, Tabriz or Anatolia. Lead time four to nine months.' })

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
    toast('Thank you. A member of the atelier will be in touch within two working days.')
  }
  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  return (
    <>
      <PageHero eyebrow="Bespoke Service" title="Created for Your Space" intro="From scale and palette to material and motif, our bespoke service brings your vision into a one-of-one woven work of art." image={{ src: '/img/bespoke-hall.webp', small: '/img/bespoke-hall-sm.webp' }} alt="A finished carpet suspended in the atelier under a single light" />

      <section data-tone="light" className="bg-ivory text-charcoal py-24 md:py-36">
        <div className="container-site grid gap-16 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">The Process</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Four conversations, one carpet.</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-charcoal/70">A bespoke MILAEDIA rug takes between four and nine months. Every stage is unhurried, and every decision is yours.</p>
            <dl className="mt-10 grid grid-cols-3 gap-6 border-y hairline py-6">
              <div><dt className="eyebrow text-[10px] text-charcoal/50">Lead time</dt><dd className="mt-2 text-[22px] serif">4 – 9 months</dd></div>
              <div><dt className="eyebrow text-[10px] text-charcoal/50">Commissions from</dt><dd className="mt-2 text-[22px] serif">$6,500</dd></div>
              <div><dt className="eyebrow text-[10px] text-charcoal/50">Deposit</dt><dd className="mt-2 text-[22px] serif">30 %</dd></div>
            </dl>
            <p className="mt-3 text-[12px] text-charcoal/55">The deposit is taken on approval of the design, and releases the piece to the dye house. The balance is due before delivery.</p>
            <div className="relative mt-10 aspect-[3/4] overflow-hidden bg-charcoal">
              <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={asset('/img/silk-poster.webp')} aria-hidden="true" tabIndex={-1}>
                <source src={asset('/video/silk-loop.mp4')} type="video/mp4" />
              </video>
            </div>
            <p className="mt-3 text-[11px] uppercase tracking-[0.24em] text-charcoal/50">A finished silk piece, presented in the hall</p>
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

      <section id="home-experience" data-tone="light" className="bg-sand/40 text-charcoal py-24 md:py-36 scroll-mt-[var(--header-h)]">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">The private home experience</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Your space. Your masterpiece.</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-charcoal/70">MILAEDIA has no showroom to visit. Choose any piece and our team brings the private home experience to your own room: the carpet at true size, on your floor, in your own light, before anything is bought. The visit is a viewing, not a sale. Nothing is signed in your hallway.</p>
            <dl className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 lg:grid-cols-2">
              {[['±2 cm', 'placement accuracy'], ['60–90 min', 'typical visit'], ['Up to 6', 'pieces compared'], ['No fee', 'within Berlin']].map(([a, b]) => (
                <div key={b}><dt className="serif text-[30px]">{a}</dt><dd className="mt-1 eyebrow text-[10px] text-charcoal/55">{b}</dd></div>
              ))}
            </dl>
            <div className="mt-10 zoom-parent"><Img image={{ src: '/img/intro-room.webp', small: '/img/intro-room-sm.webp' }} alt="A carpet laid in a client's sunlit living room" className="aspect-[4/3]" sizes="(min-width: 1024px) 40vw, 100vw" /></div>
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            <ol className="space-y-10">
              {HOME_STEPS.map(([t, d], i) => (
                <Reveal as="li" key={t} delay={i * 90} className="grid grid-cols-[56px_1fr] gap-6 border-t border-charcoal/20 pt-8">
                  <span className="serif text-[28px] text-gold">0{i + 1}</span>
                  <div><h3 className="text-[clamp(24px,2.4vw,30px)]">{t}</h3><p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">{d}</p></div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={200} className="mt-12 flex flex-col gap-4 sm:flex-row">
              <Link to="/contact?topic=home" className="btn btn-solid">Book a Home Visit</Link>
              <Link to="/collection" className="btn btn-charcoal">Choose a Piece</Link>
            </Reveal>
            <p className="mt-6 text-[12px] text-charcoal/55">Anywhere in Europe. No payment is taken and nothing is committed; every visit is confirmed personally within one working day.</p>
          </div>
        </div>
      </section>

      <section id="consultation" data-tone="dark" className="bg-charcoal text-ivory py-24 md:py-36 scroll-mt-[var(--header-h)]">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">Start a Project</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Book a Private Consultation</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-ivory/70">Tell us a little about the room and we will arrange a conversation at the atelier, at your home, or by video. We reply personally within two working days.</p>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            {done ? (
              <p className="serif text-[28px]" role="status">Thank you. We will write to you within two working days to arrange a time.</p>
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
                  <label htmlFor="b-budget" className="label text-ivory/70">Budget</label>
                  <select id="b-budget" className="field field-dark" value={form.budget} onChange={set('budget')}>
                    <option value="">Select a range</option>
                    {BUDGETS.map((b) => <option key={b}>{b}</option>)}
                  </select>
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
