import Reveal from '@/components/Reveal'
import Img from '@/components/Img'
import SectionHeading from '@/components/SectionHeading'

const STEPS = [
  { n: '01', title: 'Inspired by History', text: 'Every design begins in the archive: Safavid court carpets, Anatolian village weaves and the gardens that inspired them both.', image: { src: '/img/craft-history.webp', small: '/img/craft-history-sm.webp' }, alt: 'A classical medallion carpet hanging in a dark gallery' },
  { n: '02', title: 'Handwoven by Master Artisans', text: 'Hand-spun wool and silk, natural dyes and up to a million knots per square metre, tied one at a time over many months.', image: { src: '/img/craft-fibers.webp', small: '/img/craft-fibers-sm.webp' }, alt: 'Close-up of hand-knotted wool fibres in crimson and ivory' },
  { n: '03', title: 'Collected for Generations', text: 'A MILAEDIA rug is finished, washed and documented, then delivered to a room where it will outlast everything around it.', image: { src: '/img/craft-collected.webp', small: '/img/craft-collected-sm.webp' }, alt: 'A handmade carpet in a quiet, light-filled living room' },
]

export default function Craftsmanship() {
  return (
    <section data-tone="light" className="bg-ivory text-charcoal py-24 md:py-36">
      <div className="container-site">
        <SectionHeading eyebrow="Craftsmanship" title="Made Slowly. Made to Last." align="center" />
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
      </div>
    </section>
  )
}
