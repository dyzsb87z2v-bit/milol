import { Link } from 'react-router-dom'
import Reveal from '@/components/Reveal'
import Img from '@/components/Img'

export default function Introduction() {
  return (
    <section data-tone="light" className="relative bg-ivory text-charcoal pt-24 pb-24 md:pt-36 md:pb-36">
      <div className="container-site">
        <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5 lg:pt-10">
            <Reveal>
              <p className="eyebrow text-gold">Introduction</p>
              <h2 className="mt-6 text-[clamp(40px,5.4vw,72px)]">Handwoven Stories for Beautiful Spaces</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-md text-[17px] leading-[1.85] text-charcoal/75">
                At MILAEDIA, every rug is more than an object. It is a living piece of art, shaped by heritage, texture, color, and the hands of master artisans.
              </p>
              <Link to="/our-story" className="link-line mt-10 inline-block">Explore Our Story</Link>
            </Reveal>
          </div>
          <div className="lg:col-span-7">
            <Reveal delay={160}>
              <Img image={{ src: '/img/intro-interior.webp', small: '/img/intro-interior-sm.webp' }} alt="A sunlit living room with a handmade crimson Persian carpet beneath low modern furniture" className="aspect-[4/3]" sizes="(min-width: 1024px) 58vw, 100vw" />
              <p className="mt-4 text-[11px] uppercase tracking-[0.24em] text-charcoal/50">Isfahan Silk Garden, in a collector's apartment</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
