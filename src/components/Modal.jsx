import { useEffect, useRef } from 'react'

/**
 * Accessible overlay shell: backdrop, Escape to close, focus trap and
 * focus restore. Children render inside `panelClassName`.
 */
export default function Modal({ open, onClose, label, panelClassName = 'modal-panel', wrapperClassName = 'modal-center', children }) {
  const panel = useRef(null)
  const restore = useRef(null)

  useEffect(() => {
    if (!open) return
    restore.current = document.activeElement
    const el = panel.current
    const focusables = () => el.querySelectorAll('a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])')
    const first = focusables()[0]
    ;(first || el).focus({ preventScroll: true })
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'Tab') {
        const list = [...focusables()]
        if (!list.length) return
        const a = list[0], z = list[list.length - 1]
        if (e.shiftKey && document.activeElement === a) { e.preventDefault(); z.focus() }
        else if (!e.shiftKey && document.activeElement === z) { e.preventDefault(); a.focus() }
      }
    }
    window.addEventListener('keydown', onKey)
    return () => { window.removeEventListener('keydown', onKey); restore.current?.focus?.({ preventScroll: true }) }
  }, [open, onClose])

  if (!open) return null
  return (
    <>
      <div className="overlay-backdrop" onClick={onClose} aria-hidden="true" />
      <div className={wrapperClassName}>
        <div ref={panel} role="dialog" aria-modal="true" aria-label={label} tabIndex={-1} className={panelClassName}>
          {children}
        </div>
      </div>
    </>
  )
}
