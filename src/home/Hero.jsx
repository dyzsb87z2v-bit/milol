import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { HERO } from '@/data/site'
import { asset } from '@/lib/assets'

const BLACK = [11, 11, 10]
const WALNUT = [43, 29, 22]

const clamp01 = (v) => Math.min(1, Math.max(0, v))
const smooth = (a, b, v) => { const t = clamp01((v - a) / (b - a)); return t * t * (3 - 2 * t) }
const mix = (a, b, t) => a + (b - a) * t
const mixRgb = (a, b, t) => `rgb(${Math.round(mix(a[0], b[0], t))}, ${Math.round(mix(a[1], b[1], t))}, ${Math.round(mix(a[2], b[2], t))})`

/**
 * The opening film. A tall section pins a full-viewport stage; scrolling
 * through it drives a reversible 3D transformation of the video: it recedes
 * in perspective, scales into a rounded floating card with a soft shadow and
 * a slight tilt, while the stage turns from charcoal through stone to ivory
 * and the copy fades. The last part of the scroll lets the card settle forward
 * again so it lands naturally above the introduction.
 *
 * Progress is smoothed with a small lerp so wheel steps never look stepped,
 * and only transform/opacity/background are animated. Reduced motion gets a
 * static full-viewport frame.
 */
export default function Hero() {
  const section = useRef(null)
  const stage = useRef(null)
  const card = useRef(null)
  const veil = useRef(null)
  const halo = useRef(null)
  const copy = useRef(null)
  const cue = useRef(null)
  const video = useRef(null)
  const [videoFailed, setVideoFailed] = useState(false)
  const [reduced, setReduced] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const on = () => setReduced(mq.matches)
    mq.addEventListener('change', on)
    return () => mq.removeEventListener('change', on)
  }, [])

  useEffect(() => {
    if (reduced) return
    const sec = section.current
    let target = 0
    let current = -1
    let raf = 0
    let running = false

    const measure = () => {
      const rect = sec.getBoundingClientRect()
      const total = sec.offsetHeight - window.innerHeight
      target = total > 0 ? clamp01(-rect.top / total) : 0
    }

    const paint = (p) => {
      const mobile = window.innerWidth < 768
      const a = smooth(0, 0.72, p) // recede
      const b = smooth(0.72, 1, p) // settle
      const scale = mix(1, mobile ? 0.9 : 0.84, a)
      // On phones the landscape film is letterboxed into a 4:5 card as it recedes.
      const insetY = mobile ? Math.max(0, (window.innerHeight - window.innerWidth * 1.25) / 2) * a : 0
      const z = mix(0, mobile ? -260 : -520, a) + mix(0, mobile ? 40 : 90, b)
      const rx = mix(0, 4, a) - mix(0, 1.6, b)
      const ry = mix(0, -2.4, a) + mix(0, 1, b)
      const ty = mix(0, mobile ? -2 : -5, b) // vh
      const radius = mix(0, mobile ? 20 : 26, a)
      const shadow = a * 0.5
      card.current.style.transform = `translate3d(0, ${ty}vh, ${z}px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`
      card.current.style.borderRadius = `${radius}px`
      card.current.style.clipPath = mobile ? `inset(${insetY}px 0 round ${radius}px)` : 'none'
      card.current.style.boxShadow = mobile ? 'none' : `0 ${40 * a}px ${120 * a}px -${20 * a}px rgba(0,0,0,${shadow + 0.2}), 0 0 0 1px rgba(177,138,74,${0.35 * a})`
      // clip-path clips a box-shadow too, so on phones the shadow lives on a
      // separate layer squeezed to the letterboxed shape.
      const f = mobile ? (window.innerHeight - 2 * insetY) / window.innerHeight : 1
      halo.current.style.opacity = mobile ? String(shadow) : '0'
      halo.current.style.transform = `${card.current.style.transform} scaleY(${f})`
      halo.current.style.borderRadius = `${radius}px / ${radius / f}px`
      veil.current.style.opacity = String(mix(0.38, 0.12, a))
      const bg = p < 0.55 ? mixRgb(BLACK, WALNUT, smooth(0.15, 0.55, p)) : mixRgb(WALNUT, BLACK, smooth(0.55, 1, p))
      stage.current.style.backgroundColor = bg
      const copyT = smooth(0, 0.3, p)
      copy.current.style.opacity = String(1 - copyT)
      copy.current.style.transform = `translate3d(0, ${-28 * copyT}px, 0)`
      copy.current.style.pointerEvents = copyT > 0.6 ? 'none' : ''
      cue.current.style.opacity = String(1 - smooth(0, 0.12, p))
            sec.dataset.film = p < 0.45 ? 'true' : 'false'
    }

    const tick = () => {
      const diff = target - current
      if (Math.abs(diff) < 0.0006) {
        current = target
        paint(current)
        running = false
        return
      }
      current = current < 0 ? target : current + diff * 0.14
      paint(current)
      raf = requestAnimationFrame(tick)
    }
    const kick = () => { measure(); if (!running) { running = true; raf = requestAnimationFrame(tick) } }

    kick()
    window.addEventListener('scroll', kick, { passive: true })
    window.addEventListener('resize', kick)
    return () => { window.removeEventListener('scroll', kick); window.removeEventListener('resize', kick); cancelAnimationFrame(raf) }
  }, [reduced])

  // Autoplay can be refused by low-power modes; if the film never starts,
  // reveal the poster/fallback quietly instead of a black frame.
  useEffect(() => {
    const v = video.current
    if (!v || reduced) return
    const p = v.play?.()
    if (p && typeof p.catch === 'function') p.catch(() => {})
  }, [reduced])

  const scrollToCollection = () => document.getElementById('collection')?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'start' })

  const film = (
    <>
    <div ref={halo} className="absolute inset-0 will-change-transform" style={{ boxShadow: '0 40px 100px -10px rgba(22,22,22,0.55)', opacity: 0, background: 'transparent' }} aria-hidden="true" />
    <div ref={card} className="absolute inset-0 overflow-hidden bg-black will-change-transform" style={{ transformStyle: 'preserve-3d', backfaceVisibility: 'hidden' }}>
      <img src={asset(HERO.fallback)} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
      {!videoFailed && !reduced && (
        <video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster={asset(HERO.poster)}
          onError={() => setVideoFailed(true)}
          aria-hidden="true"
          tabIndex={-1}
        >
          <source src={asset(HERO.video720)} type="video/mp4" media="(max-width: 767px)" />
          <source src={asset(HERO.video1080)} type="video/mp4" />
        </video>
      )}
      {reduced && <img src={asset(HERO.poster)} alt="A handwoven Persian carpet unfurling across a sunlit room" className="absolute inset-0 h-full w-full object-cover" />}
      <div ref={veil} className="absolute inset-0 bg-black" style={{ opacity: 0.38 }} aria-hidden="true" />
    </div>
    </>
  )

  const overlay = (
    <div ref={copy} className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-ivory will-change-[opacity,transform]">
      <p className="eyebrow">Handmade Persian &amp; Turkish Carpets · Berlin</p>
      <h1 className="mt-6 max-w-5xl text-[clamp(46px,8.4vw,132px)] leading-[0.98]">Where Heritage <em className="font-light italic text-gold">Becomes</em> Art</h1>
      <p className="mt-7 max-w-xl text-[15px] leading-relaxed text-ivory/75 md:text-[17px]">Exceptional handmade Persian and Turkish carpets, selected for extraordinary interiors.</p>
      <div className="mt-11 flex flex-col gap-4 sm:flex-row">
        <button type="button" onClick={scrollToCollection} className="btn btn-solid">Explore the Collection</button>
        <Link to="/contact?topic=home" className="btn btn-ivory">Book a Private Viewing</Link>
      </div>
    </div>
  )

  if (reduced) {
    return (
      <section data-tone="dark" data-film="false" className="relative h-[100svh] min-h-[560px] bg-black">
        {film}
        {overlay}
      </section>
    )
  }

  return (
    <section ref={section} data-tone="dark" data-film="true" className="relative bg-black" style={{ height: '230vh' }}>
      <div ref={stage} className="sticky top-0 h-[100svh] min-h-[560px] overflow-hidden bg-black" style={{ perspective: '1400px', perspectiveOrigin: '50% 45%' }}>
        {film}
        {overlay}
        <div ref={cue} className="absolute inset-x-0 bottom-7 flex flex-col items-center gap-4 text-ivory/60" aria-hidden="true">
          <span className="text-[9.5px] uppercase tracking-[0.4em]">Scroll</span>
          <span className="block h-12 w-px overflow-hidden bg-ivory/20"><span className="scroll-cue-line block h-full w-full bg-black/70" /></span>
        </div>
      </div>
    </section>
  )
}
