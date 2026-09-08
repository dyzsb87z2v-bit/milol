import { useEffect, useRef } from 'react'

/**
 * Moves an element's inner layer by a fraction of its scroll offset. Returns
 * a ref for the moving layer. Transform only; disabled with reduced motion.
 */
export function useParallax(strength = 0.12) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    const paint = () => {
      raf = 0
      const r = el.parentElement.getBoundingClientRect()
      const mid = r.top + r.height / 2 - window.innerHeight / 2
      el.style.transform = `translate3d(0, ${(-mid * strength).toFixed(1)}px, 0) scale(${1 + strength * 2})`
    }
    const on = () => { if (!raf) raf = requestAnimationFrame(paint) }
    paint()
    window.addEventListener('scroll', on, { passive: true })
    window.addEventListener('resize', on)
    return () => { window.removeEventListener('scroll', on); window.removeEventListener('resize', on); cancelAnimationFrame(raf) }
  }, [strength])
  return ref
}
