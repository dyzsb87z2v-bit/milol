import { Link } from 'react-router-dom'
import { X } from 'lucide-react'
import { useStore } from '@/store/StoreContext'

export default function Toasts() {
  const { toasts, dismissToast } = useStore()
  return (
    <div className="pointer-events-none fixed bottom-6 left-1/2 z-[120] flex w-[min(92vw,420px)] -translate-x-1/2 flex-col gap-2" aria-live="polite" aria-atomic="false">
      {toasts.map((t) => (
        <div key={t.id} className="toast pointer-events-auto flex items-center gap-4 border hairline-gold bg-charcoal px-5 py-4 text-ivory shadow-2xl">
          <p className="flex-1 text-[13px] leading-snug">{t.message}</p>
          {t.action && (t.action.to ? (
            <Link to={t.action.to} onClick={() => dismissToast(t.id)} className="link-line text-gold">{t.action.label}</Link>
          ) : (
            <button type="button" onClick={() => { t.action.onClick?.(); dismissToast(t.id) }} className="link-line text-gold">{t.action.label}</button>
          ))}
          <button type="button" onClick={() => dismissToast(t.id)} className="icon-btn h-8 w-8 text-ivory/70 hover:text-ivory" aria-label="Dismiss">
            <X size={14} strokeWidth={1.25} />
          </button>
        </div>
      ))}
    </div>
  )
}
