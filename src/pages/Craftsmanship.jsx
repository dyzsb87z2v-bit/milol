import { Link } from 'react-router-dom'
import { REGIONS } from '@/data/site'
import { useSeo } from '@/lib/seo'
import { useParallax } from '@/lib/useParallax'
import { asset } from '@/lib/assets'
import PageHero from '@/components/PageHero'
import Reveal, { Words } from '@/components/Reveal'
import Img from '@/components/Img'
import { useCountUp } from '@/lib/useCountUp'

function Stat({ value, label, suffix = '' }) {
  const numeric = typeof value === 'number'
  const [ref, v] = useCountUp(numeric ? value : 0, 2000)
  return (
    <div ref={ref}><p className="serif gold-text text-[clamp(30px,4.6vw,56px)]">{numeric ? v.toLocaleString('en-US') + suffix : value}</p><p className="mt-2 text-[10.5px] uppercase tracking-[0.24em] text-ivory/50">{label}</p></div>
  )
}

const SILK = [
  { n: '01', title: 'The silkworm', text: 'Every masterpiece begins with nature.', image: { src: '/img/silk-silkworm.webp', small: '/img/silk-silkworm-sm.webp' }, alt: 'Silkworm cocoons hanging on fine threads against black' },
  { n: '02', title: 'The cocoon', text: 'Nature creates its first thread.', image: { src: '/img/silk-cocoons.webp', small: '/img/silk-cocoons-sm.webp' }, alt: 'A heap of white silk cocoons with their threads drawn upward' },
  { n: '03', title: 'The fibres', text: 'From one cocoon, endless possibilities.', image: { src: '/img/silk-fibers.webp', small: '/img/silk-fibers-sm.webp' }, alt: 'Silk cocoons suspended by their unwound fibres' },
  { n: '04', title: 'The hand', text: 'Craft begins where nature meets the human hand.', image: { src: '/img/silk-hand.webp', small: '/img/silk-hand-sm.webp' }, alt: 'An artisan’s hand drawing a bundle of silk filaments from a cocoon' },
]

const LOOM = [
  ['Stringing the warp', 'Cotton or silk threads are stretched vertically on the loom, hundreds to the metre, and tensioned until they ring.'],
  ['Tying the knot', 'Each strand of pile is wrapped around two warps and pulled through. A master weaver ties eight to twelve thousand a day.'],
  ['The weft and the comb', 'After every row, a weft thread is passed and beaten down with a heavy comb. Row density is judged by feel.'],
  ['The pattern emerges', 'Working from a painted cartoon, or from memory, the weaver reads the design knot by knot as it rises from the loom.'],
  ['Shearing and washing', 'The finished pile is clipped level, then washed to set the dyes and bring up the sheen.'],
  ['Cutting it free', 'The carpet is cut from the warp, the fringes knotted, the selvedges overcast. It has taken a year.'],
]

const STEPS = [
  { n: '01', title: 'Inspired by History', text: 'Every design begins in the archive: a Safavid garden carpet, a village prayer rug, the geometry of a tiled courtyard. We draw from six centuries of pattern and choose what still speaks.', image: { src: '/img/craft-history.webp', small: '/img/craft-history-sm.webp' }, alt: 'A classical medallion carpet hanging in a dark gallery' },
  { n: '02', title: 'Handwoven by Master Artisans', text: 'Silk is reeled by hand, wool is spun on the spindle, and a single carpet passes through the fingers of a master weaver up to a million times before it leaves the loom.', image: { src: '/img/silk-hand.webp', small: '/img/silk-hand-sm.webp' }, alt: 'An artisan’s hand drawing silk filaments from a cocoon' },
  { n: '03', title: 'Collected for Generations', text: 'A hand-knotted carpet does not wear out. It wears in. The pieces we sell are chosen to be lived on, handed down, and loved more in fifty years than they are today.', image: { src: '/img/craft-collected.webp', small: '/img/craft-collected-sm.webp' }, alt: 'A handmade carpet in a quiet, light-filled living room' },
]

export default function Craftsmanship() {
  const layer = useParallax(0.08)
  useSeo({ title: 'Craftsmanship', description: 'How a MILAEDIA carpet is made: from silk cocoon and hand-spun wool to the loom, the knot, the wash and the six cities that shaped the art.' })
  return (
    <>
      <PageHero eyebrow="Craftsmanship" title="Made Slowly. Made to Last." intro="From cocoon to floor, a fine carpet passes through more hands, and more months, than almost any object in your home. This is how it is done." image={{ src: '/img/craft-fibers.webp', small: '/img/craft-fibers-sm.webp' }} alt="Close-up of hand-knotted wool fibres in crimson and ivory" />

      <section data-tone="dark" className="bg-black text-ivory py-24 md:py-36">
        <div className="container-site">
          <Reveal className="mx-auto grid max-w-4xl grid-cols-3 gap-6 border-y hairline-gold py-10 text-center">
            <Stat value={490000} label="knots in one square metre at 50 raj" />
            <Stat value="8 – 14" label="months for a fine 3 × 2 m piece" />
            <Stat value={2} label="warps carried by every knot" />
          </Reveal>
          <div className="mt-24 grid gap-12 md:grid-cols-3 md:gap-8">
            {STEPS.map((s, i) => (
              <Reveal key={s.n} delay={i * 110} className={i === 1 ? 'md:mt-16' : ''}>
                <Reveal mask className="border hairline"><Img image={s.image} alt={s.alt} className="aspect-[4/5]" sizes="(min-width: 768px) 30vw, 100vw" /></Reveal>
                <p className="mt-7 eyebrow">{s.n}</p>
                <h3 className="mt-3 text-[clamp(26px,2.6vw,34px)]">{s.title}</h3>
                <p className="mt-4 text-[15px] leading-relaxed text-ivory/60">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-tone="dark" className="bg-walnut text-ivory py-24 md:py-36">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">From the cocoon to the floor</p>
            <h2 className="mt-5 text-[clamp(38px,5vw,66px)]"><Words text="The silk journey." /></h2>
            <p className="mt-6 text-[16px] leading-relaxed text-ivory/65">A silk carpet begins as a thread a fraction of the width of a hair, reeled by hand from cocoons softened in warm water. Several hundred are twisted into a single strand strong enough to knot. The result is a surface that holds light the way water does.</p>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SILK.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <Reveal mask className="border hairline bg-black"><Img image={s.image} alt={s.alt} className="aspect-[4/5]" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw" /></Reveal>
                <p className="mt-5 eyebrow">{s.n}</p>
                <h3 className="mt-2 text-[26px]">{s.title}</h3>
                <p className="mt-2 text-[14px] text-ivory/55">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section data-tone="dark" className="relative overflow-hidden bg-black text-ivory">
        <div className="relative min-h-[70vh]">
          <div ref={layer} className="absolute inset-0 will-change-transform">
            <img src={asset('/img/craft-texture.webp')} srcSet={`${asset('/img/craft-texture-sm.webp')} 600w, ${asset('/img/craft-texture.webp')} 1200w`} sizes="100vw" alt="Close-up of hand-knotted pile" className="h-full w-full object-cover" loading="lazy" decoding="async" />
          </div>
          <div className="absolute inset-0 bg-black/55" aria-hidden="true" />
          <div className="container-site relative grid min-h-[70vh] items-center py-24">
            <Reveal className="max-w-xl">
              <p className="eyebrow">On the loom</p>
              <h2 className="mt-5 text-[clamp(38px,5vw,66px)]"><Words text="Six movements, one carpet." /></h2>
            </Reveal>
          </div>
        </div>
        <div className="container-site py-20 md:py-28">
          <ol className="grid gap-x-10 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
            {LOOM.map(([t, d], i) => (
              <Reveal as="li" key={t} delay={(i % 3) * 90} className="border-t hairline-gold pt-6">
                <p className="eyebrow">0{i + 1}</p>
                <h3 className="mt-3 text-[26px]">{t}</h3>
                <p className="mt-3 text-[14.5px] leading-relaxed text-ivory/60">{d}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-16 max-w-2xl">
            <p className="text-[16px] leading-relaxed text-ivory/65">Colour changes, tension and row density are judged by hand, by eye, and by feel. The weaver decides when to switch dye batches, how hard to beat the weft, and whether a row sits true against the last. No chart accounts for the variation. This is why two rugs woven from the same design are never identical.</p>
          </Reveal>
        </div>
      </section>

      <section data-tone="dark" className="bg-walnut text-ivory py-24 md:py-36">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">From Persia. To your home.</p>
            <h2 className="mt-5 text-[clamp(38px,5vw,66px)]"><Words text="Six cities, each with a hand of its own." /></h2>
            <p className="mt-6 text-[16px] leading-relaxed text-ivory/65">A collector can name the town a carpet came from across a room, and after an hour with one of ours, so can you.</p>
          </Reveal>
          <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 90} className="border-t hairline-gold pt-6">
                <dt className="text-[30px]">{r.name}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-ivory/60">{r.text}</dd>
              </Reveal>
            ))}
          </dl>
          <Reveal className="mt-16 flex flex-col gap-4 sm:flex-row">
            <Link to="/collection" className="btn btn-3d">Explore the Collection</Link>
            <Link to="/about#how-we-choose" className="btn btn-ivory">How pieces are chosen</Link>
          </Reveal>
        </div>
      </section>
    </>
  )
}
