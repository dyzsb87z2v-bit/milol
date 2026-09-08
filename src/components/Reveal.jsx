import { useEffect, useRef } from 'react'

/**
 * Enters the viewport once and stays. `mask` wipes an image in from the
 * bottom with a slow settle; the default fades and lifts.
 */
export default function Reveal({ as = 'div', className = '', delay = 0, mask = false, children, ...rest }) {
  const Tag = as
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!('IntersectionObserver' in window)) { el.classList.add('is-in'); return }
    const io = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { el.classList.add('is-in'); io.disconnect() } }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  // A fully clipped element never intersects the viewport, so the observed
  // wrapper stays unclipped and the mask lives on an inner layer.
  if (mask) {
    return (
      <Tag ref={ref} className={`reveal-wrap ${className}`} {...rest}>
        <div className="reveal-mask h-full" style={delay ? { transitionDelay: `${delay}ms` } : undefined}>{children}</div>
      </Tag>
    )
  }
  return (
    <Tag ref={ref} className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}ms` } : undefined} {...rest}>
      {children}
    </Tag>
  )
}

/** Splits a headline into words that rise one after another. Use inside a Reveal. */
export function Words({ text, step = 45, from = 0 }) {
  return text.split(' ').map((w, i) => (
    <span key={i}>
      <span className="split-word"><span style={{ transitionDelay: `${from + i * step}ms` }}>{w}</span></span>{' '}
    </span>
  ))
}
