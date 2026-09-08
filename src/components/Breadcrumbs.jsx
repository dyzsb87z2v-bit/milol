import { Link } from 'react-router-dom'

export default function Breadcrumbs({ items, tone = 'dark' }) {
  const c = tone === 'dark' ? 'text-ivory/55 hover:text-ivory' : 'text-ivory/55 hover:text-ivory'
  return (
    <nav aria-label="Breadcrumb" className="eyebrow">
      <ol className="flex flex-wrap items-center gap-x-3 gap-y-1">
        {items.map((it, i) => (
          <li key={i} className="flex items-center gap-3">
            {i > 0 && <span aria-hidden="true" className="opacity-40">/</span>}
            {it.to ? (
              <Link to={it.to} className={`${c} transition-colors`}>{it.label}</Link>
            ) : (
              <span aria-current="page" className={tone === 'dark' ? 'text-ivory' : 'text-ivory'}>{it.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  )
}
