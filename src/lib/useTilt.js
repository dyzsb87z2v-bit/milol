import { useCallback, useRef } from 'react'

/**
 * Pointer-tracked 3D tilt for a card. Attach `bind` to the perspective
 * wrapper and `bodyRef` to the element that should rotate. Fine pointers only.
 */
export function useTilt(max = 7) {
  const bodyRef = useRef(null)
  const wrapRef = useRef(null)
  const enabled = () => typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const onPointerMove = useCallback((e) => {
    if (!enabled() || !bodyRef.current || !wrapRef.current) return
    const r = wrapRef.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width
    const py = (e.clientY - r.top) / r.height
    const rx = (0.5 - py) * max * 2
    const ry = (px - 0.5) * max * 2
    wrapRef.current.classList.add('is-tilting')
    bodyRef.current.style.transform = `rotateX(${rx.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) translateZ(12px)`
    wrapRef.current.style.setProperty('--gx', `${(px * 100).toFixed(1)}%`)
    wrapRef.current.style.setProperty('--gy', `${(py * 100).toFixed(1)}%`)
  }, [max])
  const onPointerLeave = useCallback(() => {
    if (!bodyRef.current || !wrapRef.current) return
    wrapRef.current.classList.remove('is-tilting')
    bodyRef.current.style.transform = ''
  }, [])
  return { bodyRef, bind: { ref: wrapRef, onPointerMove, onPointerLeave, className: 'tilt' } }
}
