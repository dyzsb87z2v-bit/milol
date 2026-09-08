import Reveal from '@/components/Reveal'
import Img from '@/components/Img'
import SectionHeading from '@/components/SectionHeading'

const STEPS = [
  { n: '01', title: 'Inspired by History', text: 'Every design begins in the archive: a Safavid garden carpet, a village prayer rug, the geometry of a tiled courtyard. We draw from six centuries of pattern and choose what still speaks.', image: { src: '/img/craft-history.webp', small: '/img/craft-history-sm.webp' }, alt: 'A classical medallion carpet hanging in a dark gallery' },
  { n: '02', title: 'Handwoven by Master Artisans', text: 'Silk is reeled by hand, wool is spun on the spindle, and a single carpet passes through the fingers of a master weaver up to a million times before it leaves the loom.', image: { src: '/img/silk-hand.webp', small: '/img/silk-hand-sm.webp' }, alt: 'An artisan’s hand drawing silk filaments from a cocoon' },
  { n: '03', title: 'Collected for Generations', text: 'A hand-knotted carpet does not wear out. It wears in. The pieces we sell are chosen to be lived on, handed down, and loved more in fifty years than they are today.', image: { src: '/img/craft-collected.webp', small: '/img/craft-collected-sm.webp' }, alt: 'A handmade carpet in a quiet, light-filled living room' },
]

export default function Craftsmanship() {
  return (
    <section data-tone="light" className="bg-ivory text-charcoal py-24 md:py-36">
      <div className="container-site">
        <SectionHeading eyebrow="Craftsmanship" title="Made Slowly. Made to Last." align="center" />
        <Reveal className="mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-6 border-y hairline py-8 text-center">
          {[['490,000', 'knots in one square metre at 50 raj'], ['8 – 14', 'months for a fine 3 × 2 m piece'], ['2', 'warps carried by every knot']].map(([a, b]) => (
            <div key={b}><p className="serif text-[clamp(28px,4vw,44px)]">{a}</p><p className="mt-2 text-[11px] uppercase tracking-[0.2em] text-charcoal/55">{b}</p></div>
          ))}
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {STEPS.map((s, i) => (
            <Reveal key={s.n} delay={i * 110} className={i === 1 ? 'md:mt-16' : ''}>
              <div className="zoom-parent">
                <Img image={s.image} alt={s.alt} className="aspect-[4/5]" sizes="(min-width: 768px) 30vw, 100vw" />
              </div>
              <p className="mt-7 eyebrow text-gold">{s.n}</p>
              <h3 className="mt-3 text-[clamp(26px,2.6vw,34px)]">{s.title}</h3>
              <p className="mt-4 text-[15px] leading-relaxed text-charcoal/70">{s.text}</p>
            </Reveal>
          ))}
        </div>
        <Reveal className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-[16px] leading-relaxed text-charcoal/70">Colour changes, tension and row density are judged by hand, by eye, and by feel. This is why two rugs woven from the same design are never identical: the hand leaves its trace in every knot.</p>
        </Reveal>
      </div>
    </section>
  )
}
