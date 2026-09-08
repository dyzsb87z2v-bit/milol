import { useState } from 'react'
import { asset } from '@/lib/assets'

/**
 * Lazy image with a small/large source pair, a fade-in on load and a
 * neutral placeholder so layouts never jump. `image` is { src, small }.
 */
export default function Img({ image, alt, className = '', imgClassName = '', priority = false, sizes = '(min-width: 1024px) 50vw, 100vw', style }) {
  const [loaded, setLoaded] = useState(false)
  const src = typeof image === 'string' ? image : image.src
  const small = typeof image === 'string' ? null : image.small
  return (
    <div className={`relative overflow-hidden bg-walnut ${className}`} style={style}>
      {!loaded && <div className="absolute inset-0 skeleton" aria-hidden="true" />}
      <img
        src={asset(src)}
        srcSet={small ? `${asset(small)} 600w, ${asset(src)} 1200w` : undefined}
        sizes={small ? sizes : undefined}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchpriority={priority ? 'high' : undefined}
        onLoad={() => setLoaded(true)}
        className={`h-full w-full object-cover transition-opacity duration-700 ease-luxe ${loaded ? 'opacity-100' : 'opacity-0'} ${imgClassName}`}
      />
    </div>
  )
}
