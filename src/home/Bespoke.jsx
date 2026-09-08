import { Link } from 'react-router-dom'
import Reveal from '@/components/Reveal'
import Img from '@/components/Img'

export default function Bespoke() {
  return (
    <section data-tone="dark" className="bg-charcoal text-ivory py-24 md:py-36">
      <div className="container-site">
        <div className="grid items-center gap-14 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Reveal className="zoom-parent">
              <Img image={{ src: '/img/bespoke-hall.webp', small: '/img/bespoke-hall-sm.webp' }} alt="A newly finished carpet suspended in a dark atelier, lit from above" className="aspect-[4/5] lg:aspect-[5/6]" sizes="(min-width: 1024px) 50vw, 100vw" />
            </Reveal>
          </div>
          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <p className="eyebrow text-gold">Bespoke Service</p>
              <h2 className="mt-6 text-[clamp(40px,5.4vw,72px)]">Created for Your Space</h2>
            </Reveal>
            <Reveal delay={120}>
              <p className="mt-8 max-w-md text-[17px] leading-[1.85] text-ivory/70">
                From scale and palette to material and motif, our bespoke service brings your vision into a one-of-one woven work of art.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Link to="/bespoke" className="btn btn-solid-ivory">Start a Bespoke Project</Link>
                <Link to="/bespoke#consultation" className="btn btn-ivory">Book a Private Consultation</Link>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
