import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { TESTIMONIALS } from '@/data/site'
import Reveal from '@/components/Reveal'

export default function Testimonials() {
  const [i, setI] = useState(0)
  const [paused, setPaused] = useState(false)
  const timer = useRef(0)
  const n = TESTIMONIALS.length
  useEffect(() => {
    if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    timer.current = window.setInterval(() => setI((x) => (x + 1) % n), 7000)
    return () => window.clearInterval(timer.current)
  }, [paused, n])
  const t = TESTIMONIALS[i]
  return (
    <section data-tone="dark" className="bg-black text-ivory pb-24 md:pb-36" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container-site">
        <div className="rule mb-20 md:mb-28" />
        <Reveal className="mx-auto max-w-4xl text-center">
          <p className="eyebrow">Clients</p>
          <div className="relative mt-10 min-h-[220px]" aria-live="polite">
            <blockquote key={i} className="animate-[rise_0.9s_var(--ease)]">
              <p className="serif text-[clamp(26px,3.6vw,46px)] leading-[1.25]">“{t.quote}”</p>
              <footer className="mt-8">
                <p className="text-[12px] uppercase tracking-[0.28em]">{t.name}</p>
                <p className="mt-1 text-[12px] text-ivory/50">{t.place}</p>
              </footer>
            </blockquote>
          </div>
          <div className="mt-10 flex items-center justify-center gap-6">
            <button type="button" onClick={() => setI((i - 1 + n) % n)} className="icon-btn border-metal" aria-label="Previous testimonial"><ArrowLeft size={15} strokeWidth={1} /></button>
            <ol className="flex gap-3" aria-label="Testimonials">
              {TESTIMONIALS.map((_, k) => (
                <li key={k}><button type="button" onClick={() => setI(k)} aria-label={`Testimonial ${k + 1}`} aria-current={k === i} className={`block h-px w-8 transition-colors duration-500 ${k === i ? 'bg-gold' : 'bg-ivory/25'}`} /></li>
              ))}
            </ol>
            <button type="button" onClick={() => setI((i + 1) % n)} className="icon-btn border-metal" aria-label="Next testimonial"><ArrowRight size={15} strokeWidth={1} /></button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
