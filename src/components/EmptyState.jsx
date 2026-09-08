import { Link } from 'react-router-dom'

export default function EmptyState({ title, text, cta = { label: 'Explore the collection', to: '/collection' }, compact = false, onCta }) {
  return (
    <div className={`text-center ${compact ? 'py-16' : 'py-28 md:py-40'}`}>
      <svg width="56" height="56" viewBox="0 0 56 56" fill="none" aria-hidden="true" className="mx-auto text-gold">
        <rect x="8" y="12" width="40" height="32" stroke="currentColor" strokeWidth="1.2" />
        <path d="M14 18h28M14 24h28M14 30h28M14 36h28" stroke="currentColor" strokeWidth="0.8" opacity="0.5" />
      </svg>
      <h2 className="mt-8 text-[clamp(30px,4vw,44px)]">{title}</h2>
      {text && <p className="mt-4 mx-auto max-w-md text-ivory/65 leading-relaxed">{text}</p>}
      {cta && (
        <div className="mt-10">
          {onCta ? (
            <button type="button" onClick={onCta} className="btn btn-ivory">{cta.label}</button>
          ) : (
            <Link to={cta.to} className="btn btn-ivory">{cta.label}</Link>
          )}
        </div>
      )}
    </div>
  )
}
