// Writes public/sitemap.xml from the catalogue and journal so every product
// and article is discoverable. Run: node scripts/sitemap.mjs
import { writeFileSync } from 'node:fs'
import { PRODUCTS } from '../src/data/products.js'
import { ARTICLES } from '../src/data/journal.js'

const ORIGIN = process.env.SITE_ORIGIN || 'https://milaedia.example.com'
const STATIC = ['/', '/collection', '/new-arrivals', '/bespoke', '/our-story', '/journal', '/contact', '/shipping-returns', '/privacy-policy', '/terms']
const urls = [
  ...STATIC.map((p) => ({ loc: p, priority: p === '/' ? '1.0' : '0.7' })),
  ...PRODUCTS.map((p) => ({ loc: `/collection/${p.slug}`, priority: '0.8' })),
  ...ARTICLES.map((a) => ({ loc: `/journal/${a.slug}`, priority: '0.6', lastmod: a.date })),
]
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url><loc>${ORIGIN}${u.loc}</loc>${u.lastmod ? `<lastmod>${u.lastmod}</lastmod>` : ''}<priority>${u.priority}</priority></url>`).join('\n')}
</urlset>
`
writeFileSync(new URL('../public/sitemap.xml', import.meta.url), xml)
console.log(`sitemap: ${urls.length} urls`)
