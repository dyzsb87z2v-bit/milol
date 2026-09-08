import { useEffect, useMemo, useRef, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { Heart, ShieldCheck } from 'lucide-react'
import { bySlug, byId, AVAILABILITY_LABEL } from '@/data/products'
import { related } from '@/lib/catalog'
import { money, sizeLabel } from '@/lib/format'
import { useSeo } from '@/lib/seo'
import { asset } from '@/lib/assets'
import { useStore } from '@/store/StoreContext'
import Img from '@/components/Img'
import Breadcrumbs from '@/components/Breadcrumbs'
import QuantityStepper from '@/components/QuantityStepper'
import Accordion from '@/components/Accordion'
import ProductRow from '@/components/ProductRow'
import Reveal from '@/components/Reveal'

/** Main gallery image with pointer-tracked zoom on hover / focus. */
function ZoomImage({ image, alt }) {
  const ref = useRef(null)
  const [zoom, setZoom] = useState(false)
  const move = (e) => {
    const r = ref.current.getBoundingClientRect()
    const x = ((e.clientX - r.left) / r.width) * 100
    const y = ((e.clientY - r.top) / r.height) * 100
    ref.current.style.setProperty('--zx', `${x}%`)
    ref.current.style.setProperty('--zy', `${y}%`)
  }
  return (
    <div
      ref={ref}
      className="relative overflow-hidden bg-sand/30"
      onMouseEnter={() => setZoom(true)}
      onMouseLeave={() => setZoom(false)}
      onMouseMove={move}
      style={{ '--zx': '50%', '--zy': '50%' }}
    >
      <Img key={image.src} image={image} alt={alt} className="aspect-[4/5]" priority sizes="(min-width: 1024px) 55vw, 100vw" imgClassName={`transition-transform duration-500 ease-luxe ${zoom ? 'scale-[1.8]' : ''}`} />
      <span className="pointer-events-none absolute bottom-3 right-3 bg-ivory/85 px-2.5 py-1 text-[10px] uppercase tracking-[0.22em] text-charcoal/70">Hover to zoom</span>
    </div>
  )
}

export default function Product() {
  const { slug } = useParams()
  const product = bySlug(slug)
  const { addToCart, toggleWishlist, isWished, pushRecent, recents } = useStore()
  const [qty, setQty] = useState(1)
  const [active, setActive] = useState(0)

  useEffect(() => { if (product) { pushRecent(product.id); setActive(0); setQty(1) } }, [product, pushRecent])

  const jsonLd = useMemo(() => product && {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.short,
    image: product.images.map((i) => new URL(asset(i.src), window.location.origin).href),
    brand: { '@type': 'Brand', name: 'MILAEDIA' },
    material: product.materials,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: product.availability === 'in-stock' ? 'https://schema.org/InStock' : product.availability === 'made-to-order' ? 'https://schema.org/PreOrder' : 'https://schema.org/SoldOut',
      url: window.location.href,
    },
  }, [product])

  useSeo({ title: product?.name, description: product?.short, image: product ? asset(product.images[0].src) : undefined, type: 'product', jsonLd })

  if (!product) return <Navigate to="/not-found" replace />

  const reserved = product.availability === 'reserved'
  const wished = isWished(product.id)
  const recentItems = recents.filter((id) => id !== product.id).map(byId).filter(Boolean).slice(0, 4)

  return (
    <>
      <article data-tone="light" className="bg-ivory text-charcoal pt-[calc(var(--header-h)+32px)] pb-24 md:pb-32">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Collection', to: '/collection' }, { label: product.name }]} />
          <div className="mt-8 grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <div className="zoom-origin">
                <ZoomImage image={product.images[active]} alt={`${product.name}, view ${active + 1}`} />
              </div>
              <ul className="mt-4 flex gap-3" aria-label="Gallery thumbnails">
                {product.images.map((im, i) => (
                  <li key={i}>
                    <button type="button" onClick={() => setActive(i)} aria-pressed={active === i} aria-label={`Show image ${i + 1}`} className={`block w-20 overflow-hidden border transition-colors ${active === i ? 'border-charcoal' : 'border-transparent hover:border-charcoal/40'}`}>
                      <Img image={im} alt="" className="aspect-[4/5]" sizes="80px" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-[calc(var(--header-h)+24px)]">
                <p className="eyebrow text-gold">{product.collection}</p>
                <h1 className="mt-4 text-[clamp(36px,4.4vw,58px)]">{product.name}</h1>
                <p className="mt-4 text-[22px] tabular-nums">{money(product.price)}</p>
                <p className="mt-2 text-[12px] uppercase tracking-[0.2em] text-charcoal/55">{AVAILABILITY_LABEL[product.availability]} · {product.delivery}</p>

                <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-4 border-y hairline py-6 text-[14px]">
                  <div><dt className="eyebrow text-[10px] text-charcoal/50">Origin</dt><dd className="mt-1">{product.origin}</dd></div>
                  <div><dt className="eyebrow text-[10px] text-charcoal/50">Dimensions</dt><dd className="mt-1">{sizeLabel(product)}</dd></div>
                  <div><dt className="eyebrow text-[10px] text-charcoal/50">Materials</dt><dd className="mt-1">{product.materials}</dd></div>
                  <div><dt className="eyebrow text-[10px] text-charcoal/50">Weaving</dt><dd className="mt-1">{product.weaving}</dd></div>
                  <div><dt className="eyebrow text-[10px] text-charcoal/50">Knot density</dt><dd className="mt-1">{product.density}</dd></div>
                  <div><dt className="eyebrow text-[10px] text-charcoal/50">Era</dt><dd className="mt-1">{product.era}</dd></div>
                  <div className="col-span-2">
                    <dt className="eyebrow text-[10px] text-charcoal/50">Colour palette</dt>
                    <dd className="mt-2 flex items-center gap-4">
                      {product.colors.map((c, i) => (
                        <span key={c} className="inline-flex items-center gap-2 text-[13px]">
                          <span className="inline-block h-4 w-4 rounded-full border border-charcoal/15" style={{ background: product.swatches[i] }} aria-hidden="true" />{c}
                        </span>
                      ))}
                    </dd>
                  </div>
                </dl>

                <div className="mt-8 flex flex-wrap items-center gap-4">
                  {!reserved && <QuantityStepper value={qty} onChange={setQty} />}
                  <button type="button" disabled={reserved} onClick={() => addToCart(product.id, qty)} className="btn btn-solid flex-1">
                    {reserved ? 'Reserved' : `Add to Bag — ${money(product.price * qty)}`}
                  </button>
                  <button type="button" onClick={() => toggleWishlist(product.id)} className="icon-btn h-[52px] w-[52px] border hairline" aria-pressed={wished} aria-label={wished ? 'Remove from wishlist' : 'Add to wishlist'}>
                    <Heart size={18} strokeWidth={1.25} className={wished ? 'fill-gold text-gold' : ''} />
                  </button>
                </div>
                {reserved && <p className="mt-4 text-[13px] text-charcoal/60">This piece is currently reserved. <a href="/contact" className="underline underline-offset-4">Enquire</a> about similar rugs or a bespoke commission.</p>}

                <div className="mt-10">
                  <h2 className="font-sans text-[12px] uppercase tracking-[0.24em] font-medium">Description</h2>
                  <p className="mt-4 text-[15px] leading-[1.85] text-charcoal/75">{product.description}</p>
                </div>

                <div className="mt-8">
                  <Accordion items={[
                    { title: 'Care instructions', content: product.care },
                    { title: 'Shipping & returns', content: 'Complimentary white-glove delivery on orders over $2,500 within the continental United States; international delivery is quoted at checkout. Every rug may be returned within 14 days of delivery in its original condition. Made-to-order and bespoke pieces are final sale.' },
                    { title: 'Viewing in person', content: 'We are happy to bring a selection of rugs to your home for a private viewing in New York, London and Istanbul, or to arrange a video consultation from the atelier.' },
                  ]} />
                </div>

                <div id="authenticity" className="mt-10 flex gap-4 border hairline p-5">
                  <ShieldCheck size={22} strokeWidth={1} className="shrink-0 text-gold" aria-hidden="true" />
                  <div>
                    <h2 className="font-sans text-[12px] uppercase tracking-[0.24em] font-medium">Certificate of Authenticity</h2>
                    <p className="mt-2 text-[14px] leading-relaxed text-charcoal/70">Each MILAEDIA rug is delivered with a signed certificate recording its origin, materials, knot count and the date of weaving, together with lifetime care guidance.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      <div data-tone="light" className="bg-ivory text-charcoal">
        <Reveal><ProductRow id="related" eyebrow="You may also like" title="Related Rugs" products={related(product)} /></Reveal>
        {recentItems.length > 0 && <Reveal><ProductRow id="recent" eyebrow="Recently viewed" title="Continue Looking" products={recentItems} /></Reveal>}
      </div>
    </>
  )
}
