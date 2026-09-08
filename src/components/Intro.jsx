import { useEffect, useState } from 'react'

/** A short black curtain with the wordmark, once per session. */
export default function Intro() {
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem('milaedia:intro') } catch { return false }
  })
  useEffect(() => {
    if (!show) return
    try { sessionStorage.setItem('milaedia:intro', '1') } catch { /* ignore */ }
    const t = window.setTimeout(() => setShow(false), 2600)
    return () => window.clearTimeout(t)
  }, [show])
  if (!show) return null
  return (
    <div className="intro" aria-hidden="true">
      <div className="text-center">
        <p className="intro-mark gold-text">MILAEDIA</p>
        <div className="intro-line" />
      </div>
    </div>
  )
}
