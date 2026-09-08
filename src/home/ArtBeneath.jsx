import { Link } from 'react-router-dom'
import { asset } from '@/lib/assets'
import Reveal, { Words } from '@/components/Reveal'
import { useCountUp } from '@/lib/useCountUp'

function Percent() {
  const [ref, v] = useCountUp(100, 1600)
  return <span ref={ref} className="gold-text">{v}%</span>
}

const STATS = [
  ['100%', 'Handcrafted', 'Every knot tied by hand. No machine touches a MILAEDIA carpet.'],
  ['Natural', 'Materials', 'Hand-spun wool, reeled silk, cotton foundations and plant dyes.'],
  ['Generations', 'of Artistry', 'Weaving families whose craft passes from grandmother to grandchild.'],
  ['Worldwide', 'Delivery', 'Insured, documented and placed by hand, from Berlin to anywhere.'],
]

export default function ArtBeneath() {
  return (
    <section data-tone="dark" className="relative bg-walnut text-ivory">
      <div className="grid lg:grid-cols-2">
        <Reveal mask className="relative min-h-[70vh] lg:min-h-[100vh]">
          <video className="absolute inset-0 h-full w-full object-cover" autoPlay muted loop playsInline preload="metadata" poster={asset('/img/silk-poster.webp')} aria-hidden="true" tabIndex={-1}>
            <source src={asset('/video/silk-loop.mp4')} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-walnut/40" aria-hidden="true" />
        </Reveal>
        <div className="flex items-center px-6 py-20 md:px-14 lg:px-20 xl:px-28">
          <div className="max-w-xl">
            <Reveal>
              <p className="eyebrow">Craftsmanship</p>
              <h2 className="mt-5 text-[clamp(38px,4.8vw,64px)]"><Words text="The Art Beneath Every Thread" /></h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 text-[16px] leading-[1.9] text-ivory/70">A silk carpet begins as a thread a fraction of the width of a hair, reeled by hand from cocoons softened in warm water. Several hundred are twisted into a strand strong enough to knot. Then a weaver ties it, and the next, up to a million times, before the piece leaves the loom.</p>
              <p className="mt-5 text-[16px] leading-[1.9] text-ivory/70">Colour, tension and row density are judged by hand, by eye, and by feel. That is why two carpets woven from the same drawing are never identical, and why one of them can hold a room for a century.</p>
            </Reveal>
            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-8">
              {STATS.map(([a, b, c], i) => (
                <Reveal key={b} delay={160 + i * 80} className="border-t hairline-gold pt-5">
                  <dt className="serif text-[clamp(26px,2.6vw,34px)] leading-none">{a === '100%' ? <Percent /> : <span className="gold-text">{a}</span>} <span className="text-ivory/60">{b}</span></dt>
                  <dd className="mt-2 text-[12.5px] leading-relaxed text-ivory/55">{c}</dd>
                </Reveal>
              ))}
            </dl>
            <Reveal delay={400} className="mt-12"><Link to="/craftsmanship" className="link-line link-gold">The full story of the craft</Link></Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
