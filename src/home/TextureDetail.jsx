import { useState } from 'react'
import { useParallax } from '@/lib/useParallax'
import { asset } from '@/lib/assets'
import Reveal, { Words } from '@/components/Reveal'

const SPOTS = [
  { x: 24, y: 34, label: 'Hand-knotting', text: 'Each strand is tied around two warps by hand, then cut. Up to a million times per square metre.' },
  { x: 62, y: 28, label: 'Natural wool', text: 'Hand-spun highland wool, springy and slightly oily in the hand, that wears in rather than out.', flip: true },
  { x: 41, y: 66, label: 'Silk highlights', text: 'Reeled silk outlining the motifs, so the drawing lifts and shifts as the light moves.' },
  { x: 76, y: 70, label: 'Vegetable dyes', text: 'Madder for red, indigo for blue, walnut husk for brown. Colours that deepen with age.', flip: true },
]

export default function TextureDetail() {
  const layer = useParallax(0.08)
  const [open, setOpen] = useState(null)
  return (
    <section data-tone="dark" className="bg-black text-ivory py-24 md:py-36">
      <div className="container-site">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Under the Loupe</p>
          <h2 className="mt-5 text-[clamp(38px,5vw,66px)]"><Words text="Read a carpet the way we do." /></h2>
          <p className="mt-6 text-[15px] leading-relaxed text-ivory/60">Touch a marker to see what each detail tells you about how a piece was made.</p>
        </Reveal>
        <Reveal mask className="relative mt-14 overflow-hidden border hairline-gold">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden">
            <div ref={layer} className="absolute inset-0 will-change-transform">
              <img src={asset('/img/anatolian-3.webp')} srcSet={`${asset('/img/anatolian-3-sm.webp')} 600w, ${asset('/img/anatolian-3.webp')} 1200w`} sizes="100vw" alt="Macro view of hand-knotted wool pile in terracotta, umber and indigo" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </div>
            <div className="absolute inset-0 bg-black/20" aria-hidden="true" />
            {SPOTS.map((s, i) => (
              <div key={s.label} className={`hotspot ${s.flip ? 'flip' : ''} ${open === i ? 'is-open' : ''}`} style={{ left: `${s.x}%`, top: `${s.y}%` }}>
                <button type="button" className="hotspot-dot" aria-label={s.label} aria-expanded={open === i} onClick={() => setOpen(open === i ? null : i)} onFocus={() => setOpen(i)} />
                <span className="hotspot-label" role="tooltip">{s.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPOTS.map((s, i) => (
            <Reveal key={s.label} delay={i * 80} className={`border-t pt-4 transition-colors duration-500 ${open === i ? 'border-gold' : 'hairline'}`}>
              <p className="text-[11px] uppercase tracking-[0.28em]">{s.label}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ivory/55">{s.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
