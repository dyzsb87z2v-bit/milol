import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { PRODUCTS } from '@/data/products'
import { asset } from '@/lib/assets'
import { money } from '@/lib/format'
import Reveal, { Words } from '@/components/Reveal'

/**
 * The Hall: six carpets standing in a 3D ring over a glossy floor. The ring
 * turns slowly on its own, follows a drag, and steps with the arrows; the
 * piece facing the visitor is named beneath it.
 */
export default function Hall3D() {
  const items = PRODUCTS.filter((p) => p.featured).slice(0, 6)
  const n = items.length
  const step = 360 / n
  const [angle, setAngle] = useState(0)
  const [dragging, setDragging] = useState(false)
  const [size, setSize] = useState({ w: 320, h: 430, r: 520 })
  const drag = useRef({ x: 0, a: 0 })
  const idle = useRef(true)
  const reduced = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    const fit = () => {
      const vw = window.innerWidth
      const w = vw < 640 ? Math.min(240, vw * 0.62) : vw < 1024 ? 280 : 340
      const h = Math.round(w * 1.32)
      const r = Math.round((w * 1.18) / (2 * Math.tan(Math.PI / n)))
      setSize({ w, h, r })
    }
    fit()
    window.addEventListener('resize', fit)
    return () => window.removeEventListener('resize', fit)
  }, [n])

  useEffect(() => {
    if (reduced) return
    const id = window.setInterval(() => { if (idle.current) setAngle((a) => a - 0.08) }, 40)
    return () => window.clearInterval(id)
  }, [reduced])

  const front = (((Math.round(-angle / step) % n) + n) % n)
  const snap = (a) => Math.round(a / step) * step

  const onDown = (e) => { idle.current = false; setDragging(true); drag.current = { x: e.clientX, a: angle }; e.currentTarget.setPointerCapture?.(e.pointerId) }
  const onMove = (e) => { if (!dragging) return; setAngle(drag.current.a + (e.clientX - drag.current.x) * 0.35) }
  const onUp = () => { if (!dragging) return; setDragging(false); setAngle((a) => snap(a)); window.setTimeout(() => { idle.current = true }, 4000) }
  const stepBy = (d) => { idle.current = false; setAngle((a) => snap(a) - d * step); window.setTimeout(() => { idle.current = true }, 5000) }

  return (
    <section data-tone="dark" className="relative overflow-hidden bg-black text-ivory py-24 md:py-32">
      <div className="container-site">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">The Hall</p>
            <h2 className="mt-5 text-[clamp(38px,5vw,66px)]"><Words text="Walk the collection." /></h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-ivory/60">Drag to turn the hall, or let it turn on its own. The piece facing you is named below.</p>
          </div>
          <div className="flex gap-2">
            <button type="button" onClick={() => stepBy(-1)} className="icon-btn border-metal" aria-label="Previous piece"><ArrowLeft size={15} strokeWidth={1} /></button>
            <button type="button" onClick={() => stepBy(1)} className="icon-btn border-metal" aria-label="Next piece"><ArrowRight size={15} strokeWidth={1} /></button>
          </div>
        </Reveal>
      </div>

      <div
        className={`hall relative mt-10 select-none touch-pan-y ${dragging ? 'is-dragging cursor-grabbing' : 'cursor-grab'}`}
        style={{ height: size.h * 1.75 }}
        onPointerDown={onDown} onPointerMove={onMove} onPointerUp={onUp} onPointerCancel={onUp} onPointerLeave={onUp}
        role="group" aria-roledescription="carousel" aria-label="Carpets in the hall"
      >
        <div className="hall-floor" aria-hidden="true" />
        <div className="hall-ring mx-auto" style={{ width: size.w, height: size.h, transform: `translateY(${size.h * 0.18}px) rotateX(-6deg) rotateY(${angle}deg)` }}>
          {items.map((p, i) => {
            const a = i * step
            const isFront = i === front
            return (
              <div key={p.id} className="hall-item" style={{ width: size.w, height: size.h, transform: `translateX(-50%) rotateY(${a}deg) translateZ(${size.r}px)` }} aria-hidden={!isFront}>
                <div className={`hall-face h-full w-full overflow-hidden transition-opacity duration-700 ${isFront ? 'opacity-100' : 'opacity-70'}`}>
                  <img src={asset(p.images[0].small)} srcSet={`${asset(p.images[0].small)} 600w, ${asset(p.images[0].src)} 1200w`} sizes="340px" alt={isFront ? `${p.name}, facing you` : ''} className="h-full w-full object-cover" draggable="false" loading="lazy" decoding="async" />
                </div>
                <div className="hall-reflection" aria-hidden="true">
                  <img src={asset(p.images[0].small)} alt="" className="h-full w-full object-cover object-bottom" draggable="false" loading="lazy" decoding="async" />
                </div>
              </div>
            )
          })}
        </div>
        <div className="hall-vignette" aria-hidden="true" />
      </div>

      <div className="container-site relative -mt-6 text-center" aria-live="polite">
        <p className="eyebrow">{items[front].collection} · {items[front].origin.split(',')[0]}</p>
        <h3 className="mt-3 text-[clamp(28px,3.4vw,44px)]"><Link to={`/collection/${items[front].slug}`} className="transition-colors hover:text-gold">{items[front].name}</Link></h3>
        <p className="mt-2 text-[14px] text-ivory/60">{money(items[front].price)}</p>
        <Link to={`/collection/${items[front].slug}`} className="btn btn-3d mt-7">View This Piece</Link>
      </div>
    </section>
  )
}
