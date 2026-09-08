import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { FAMILIES } from '@/data/site'
import Reveal, { Words } from '@/components/Reveal'
import Img from '@/components/Img'

export default function FeaturedFamilies() {
  return (
    <section id="collection" data-tone="dark" className="bg-black text-ivory pt-8 pb-24 md:pb-36 scroll-mt-[var(--header-h)]">
      <div className="container-site">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Featured Collections</p>
            <h2 className="mt-5 max-w-2xl text-[clamp(38px,5.4vw,72px)]"><Words text="Three editions. One standard." /></h2>
          </div>
          <Link to="/collection" className="link-line link-gold md:pb-3">View the whole collection</Link>
        </Reveal>
        <div className="mt-14 grid gap-4 md:grid-cols-3 md:gap-5">
          {FAMILIES.map((f, i) => (
            <Reveal key={f.id} mask delay={i * 120} className={i === 1 ? 'md:mt-16' : ''}>
              <Link to={`/collection?family=${f.id}`} className="group relative block overflow-hidden border hairline transition-colors duration-700 hover:border-gold/60">
                <Img image={f.image} alt={f.alt} className="aspect-[3/4] md:aspect-[4/6]" imgClassName="transition-transform duration-[1800ms] ease-luxe group-hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/10 transition-opacity duration-700 group-hover:opacity-90" aria-hidden="true" />
                <div className="absolute inset-x-0 bottom-0 p-7 md:p-9">
                  <p className="eyebrow">0{i + 1}</p>
                  <h3 className="mt-3 text-[clamp(30px,3.2vw,44px)]">{f.name}</h3>
                  <p className="mt-3 max-w-xs text-[13.5px] leading-relaxed text-ivory/65 opacity-0 translate-y-2 transition-all duration-700 group-hover:opacity-100 group-hover:translate-y-0">{f.text}</p>
                  <span className="mt-6 inline-flex items-center gap-3 text-[10.5px] uppercase tracking-[0.3em] text-gold">
                    Discover <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-gold/60 transition-transform duration-700 group-hover:translate-x-2"><ArrowRight size={13} strokeWidth={1.25} /></span>
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
