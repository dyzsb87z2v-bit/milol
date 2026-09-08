import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { GALLERY, BRAND } from '@/data/site'
import Reveal from '@/components/Reveal'
import Img from '@/components/Img'

export default function GalleryStrip() {
  const rail = useRef(null)
  const scroll = (d) => rail.current?.scrollBy({ left: d * Math.min(520, rail.current.clientWidth * 0.8), behavior: 'smooth' })
  return (
    <section data-tone="dark" className="bg-black text-ivory pb-24 md:pb-36">
      <div className="container-site flex items-end justify-between gap-6">
        <Reveal>
          <p className="eyebrow">Gallery</p>
          <h2 className="mt-4 text-[clamp(30px,3.6vw,48px)]">From the atelier and the rooms we have furnished.</h2>
          <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="link-line link-gold mt-4 inline-block">Follow {BRAND.instagramHandle}</a>
        </Reveal>
        <div className="hidden gap-2 md:flex">
          <button type="button" onClick={() => scroll(-1)} className="icon-btn border-metal" aria-label="Scroll left"><ArrowLeft size={15} strokeWidth={1} /></button>
          <button type="button" onClick={() => scroll(1)} className="icon-btn border-metal" aria-label="Scroll right"><ArrowRight size={15} strokeWidth={1} /></button>
        </div>
      </div>
      <div ref={rail} className="rail mt-10 flex gap-3 overflow-x-auto px-[22px] md:gap-4 md:px-12 xl:px-20" aria-label="Gallery">
        {GALLERY.map((g, i) => (
          <Reveal key={i} mask delay={i * 60} className={`shrink-0 ${g.tall ? 'w-[62vw] sm:w-[34vw] lg:w-[22vw]' : 'w-[78vw] sm:w-[46vw] lg:w-[30vw]'}`}>
            <a href={BRAND.instagram} target="_blank" rel="noreferrer" className="group block border hairline transition-colors duration-700 hover:border-gold/50">
              <Img image={g.image} alt={g.alt} className={g.tall ? 'aspect-[3/4]' : 'aspect-[4/3]'} imgClassName="transition-transform duration-[1800ms] ease-luxe group-hover:scale-105" sizes="(min-width: 1024px) 30vw, 70vw" />
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
