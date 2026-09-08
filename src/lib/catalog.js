import { PRODUCTS, SIZE_BUCKETS, PRICE_BUCKETS, COLOR_FAMILIES } from '@/data/products'

export const SORTS = [
  { id: 'featured', label: 'Featured' },
  { id: 'newest', label: 'Newest' },
  { id: 'price-asc', label: 'Price: Low to High' },
  { id: 'price-desc', label: 'Price: High to Low' },
]

export const FILTERS = {
  collection: {
    label: 'Collection',
    options: [
      { id: 'persian', label: 'Persian', test: (p) => p.collection === 'Persian Collection' },
      { id: 'turkish', label: 'Turkish', test: (p) => p.collection === 'Turkish Collection' },
    ],
  },
  origin: {
    label: 'Origin',
    options: [...new Set(PRODUCTS.map((p) => p.origin.split(',')[0]))].map((city) => ({
      id: city.toLowerCase().replace(/[^a-z]+/g, '-'),
      label: city,
      test: (p) => p.origin.startsWith(city),
    })),
  },
  size: { label: 'Size', options: SIZE_BUCKETS },
  color: {
    label: 'Colour',
    options: COLOR_FAMILIES.map((f) => ({ ...f, test: (p) => p.colors.some((c) => f.match.includes(c)) })),
  },
  price: { label: 'Price', options: PRICE_BUCKETS },
  availability: {
    label: 'Availability',
    options: [
      { id: 'in-stock', label: 'In stock', test: (p) => p.availability === 'in-stock' },
      { id: 'made-to-order', label: 'Made to order', test: (p) => p.availability === 'made-to-order' },
    ],
  },
}

/** Reads `?collection=persian,turkish&sort=newest` into { filters, sort }. */
export function readParams(searchParams) {
  const filters = {}
  for (const key of Object.keys(FILTERS)) {
    const v = searchParams.get(key)
    filters[key] = v ? v.split(',').filter(Boolean) : []
  }
  const sort = SORTS.some((s) => s.id === searchParams.get('sort')) ? searchParams.get('sort') : 'featured'
  return { filters, sort }
}

export function applyCatalog(list, { filters, sort }) {
  let out = list.filter((p) =>
    Object.entries(filters).every(([key, chosen]) => {
      if (!chosen.length) return true
      const opts = FILTERS[key].options.filter((o) => chosen.includes(o.id))
      return opts.some((o) => o.test(p))
    }),
  )
  switch (sort) {
    case 'newest':
      out = [...out].sort((a, b) => Number(b.isNew) - Number(a.isNew) || b.era.localeCompare(a.era))
      break
    case 'price-asc':
      out = [...out].sort((a, b) => a.price - b.price)
      break
    case 'price-desc':
      out = [...out].sort((a, b) => b.price - a.price)
      break
    default:
      out = [...out].sort((a, b) => Number(b.featured) - Number(a.featured))
  }
  return out
}

export function searchProducts(query) {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const terms = q.split(/\s+/)
  return PRODUCTS.map((p) => {
    const hay = [p.name, p.collection, p.origin, p.materials, p.colors.join(' '), p.tags.join(' '), p.short].join(' ').toLowerCase()
    const score = terms.reduce((s, t) => s + (p.name.toLowerCase().includes(t) ? 3 : hay.includes(t) ? 1 : 0), 0)
    return { p, score }
  })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((r) => r.p)
}

export function related(product, n = 4) {
  return PRODUCTS.filter((p) => p.id !== product.id)
    .map((p) => ({ p, s: (p.collection === product.collection ? 2 : 0) + p.tags.filter((t) => product.tags.includes(t)).length }))
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((r) => r.p)
}
