import { useEffect } from 'react'

const SITE = 'MILAEDIA'

function setMeta(selector, attrs) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    Object.entries(attrs).forEach(([k, v]) => k !== 'content' && el.setAttribute(k, v))
    document.head.appendChild(el)
  }
  el.setAttribute('content', attrs.content)
}

/**
 * Per-page head management: title, description, Open Graph, canonical and
 * optional JSON-LD. Cleans up the structured data when the page unmounts.
 */
export function useSeo({ title, description, image, type = 'website', jsonLd }) {
  useEffect(() => {
    const full = title ? `${title} | ${SITE}` : `${SITE} | Timeless Art for Exceptional Interiors`
    document.title = full
    if (description) {
      setMeta('meta[name="description"]', { name: 'description', content: description })
      setMeta('meta[property="og:description"]', { property: 'og:description', content: description })
    }
    setMeta('meta[property="og:title"]', { property: 'og:title', content: full })
    setMeta('meta[property="og:type"]', { property: 'og:type', content: type })
    setMeta('meta[property="og:url"]', { property: 'og:url', content: window.location.href })
    if (image) setMeta('meta[property="og:image"]', { property: 'og:image', content: new URL(image, window.location.origin).href })

    let link = document.head.querySelector('link[rel="canonical"]')
    if (!link) {
      link = document.createElement('link')
      link.rel = 'canonical'
      document.head.appendChild(link)
    }
    link.href = window.location.origin + window.location.pathname

    let script
    if (jsonLd) {
      script = document.createElement('script')
      script.type = 'application/ld+json'
      script.dataset.page = 'true'
      script.textContent = JSON.stringify(jsonLd)
      document.head.appendChild(script)
    }
    return () => script?.remove()
  }, [title, description, image, type, jsonLd])
}
