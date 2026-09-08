import { Link } from 'react-router-dom'
import { useParallax } from '@/lib/useParallax'
import { asset } from '@/lib/assets'
import Reveal, { Words } from '@/components/Reveal'

export default function InteriorsScene() {
  const layer = useParallax(0.1)
  return (
    <section data-tone="dark" className="relative overflow-hidden bg-black text-ivory">
      <div className="relative min-h-[90vh] md:min-h-[100vh]">
        <div ref={layer} className="absolute inset-0 will-change-transform">
          <img src={asset('/img/library-rug.webp')} srcSet={`${asset('/img/library-rug-sm.webp')} 640w, ${asset('/img/library-rug.webp')} 1400w`} sizes="100vw" alt="A medallion carpet in a panelled library with chandeliers" className="h-full w-full object-cover" loading="lazy" decoding="async" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/30 to-black/80" aria-hidden="true" />
        <div className="container-site relative flex min-h-[90vh] flex-col justify-end pb-20 pt-40 md:min-h-[100vh] md:pb-28">
          <Reveal className="max-w-3xl">
            <p className="eyebrow">Designed for Exceptional Interiors</p>
            <blockquote className="mt-6 text-[clamp(32px,4.8vw,66px)] leading-[1.08]"><Words text="“A carpet is the only artwork you are meant to walk across, and the only one that grows more beautiful for it.”" step={30} /></blockquote>
            <p className="mt-6 eyebrow eyebrow-muted">The MILAEDIA atelier</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/collection" className="btn btn-solid-gold">Find Your Signature Piece</Link>
              <Link to="/bespoke#home-experience" className="btn btn-ivory">See it in your room</Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
