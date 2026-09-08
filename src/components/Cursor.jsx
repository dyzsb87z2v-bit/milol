import { useEffect, useRef } from 'react'

/** Gold dot and trailing ring on fine-pointer desktops; hidden elsewhere. */
export default function Cursor() {
  const dot = useRef(null)
  const ring = useRef(null)
  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!fine || reduced) return
    document.body.classList.add('has-cursor')
    let x = -100, y = -100, rx = -100, ry = -100, raf = 0, visible = false
    const move = (e) => {
      x = e.clientX; y = e.clientY
      if (!visible) { visible = true; dot.current?.classList.remove('is-hidden'); ring.current?.classList.remove('is-hidden') }
      const t = e.target instanceof Element ? e.target.closest('a, button, [role="button"], input, select, textarea, label') : null
      ring.current?.classList.toggle('is-link', Boolean(t))
    }
    const leave = () => { visible = false; dot.current?.classList.add('is-hidden'); ring.current?.classList.add('is-hidden') }
    const tick = () => {
      rx += (x - rx) * 0.18; ry += (y - ry) * 0.18
      if (dot.current) dot.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      if (ring.current) ring.current.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', move, { passive: true })
    document.documentElement.addEventListener('mouseleave', leave)
    raf = requestAnimationFrame(tick)
    return () => { window.removeEventListener('pointermove', move); document.documentElement.removeEventListener('mouseleave', leave); cancelAnimationFrame(raf); document.body.classList.remove('has-cursor') }
  }, [])
  return (
    <>
      <div ref={dot} className="cursor-dot is-hidden hidden md:block" aria-hidden="true" />
      <div ref={ring} className="cursor-ring is-hidden hidden md:block" aria-hidden="true" />
    </>
  )
}
