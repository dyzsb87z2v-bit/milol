import { Link } from 'react-router-dom'
import { BRAND, NAV, CARE_LINKS, LEGAL_LINKS, ASSURANCES } from '@/data/site'
import NewsletterForm from './NewsletterForm'

const Instagram = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>)
const Pinterest = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M10.5 16.5 12 9m0 0c-2 0-3.5 1.4-3.5 3s1 2 1.6 1.6M12 9c1.8 0 3 1.2 3 2.8 0 2.2-1.4 4-3 4-.8 0-1.4-.5-1.4-1.2" /></svg>)
const WhatsApp = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true"><path d="M20 11.5a8 8 0 0 1-11.7 7.1L4 20l1.4-4.1A8 8 0 1 1 20 11.5Z" /><path d="M9.2 9.3c.2 1.9 2 3.9 4 4.5l1.2-1.1 1.9.8-.3 1.5c-3.6.4-7.3-3.2-7.6-6.8l1.4-.4.9 1.8-1.5.7Z" /></svg>)

export default function Footer() {
  return (
    <footer data-tone="dark" className="relative bg-black text-ivory">
      <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/60 to-transparent" aria-hidden="true" />
      <div className="container-site">
        <ul className="grid gap-8 border-b hairline py-12 sm:grid-cols-2 lg:grid-cols-4">
          {ASSURANCES.map((a) => (
            <li key={a.title} className="border-l hairline-gold pl-5">
              <p className="text-[11px] uppercase tracking-[0.26em]">{a.title}</p>
              <p className="mt-2 text-[13px] leading-relaxed text-ivory/50">{a.text}</p>
            </li>
          ))}
        </ul>
        <div className="grid gap-14 py-20 md:grid-cols-12 md:py-24">
          <div className="md:col-span-4">
            <p className="serif gold-text text-[30px] font-light tracking-[0.46em] uppercase">MILAEDIA</p>
            <p className="mt-3 eyebrow">{BRAND.strapline}</p>
            <p className="mt-7 max-w-sm text-[15px] leading-relaxed text-ivory/60">A Berlin gallery for exceptional handmade Persian and Turkish carpets: pieces examined knot by knot, documented, and delivered by hand to interiors across Europe and the world.</p>
            <ul className="mt-8 flex gap-2">
              <li><a href={BRAND.instagram} target="_blank" rel="noreferrer" className="icon-btn border hairline text-ivory/80" aria-label="Instagram"><Instagram /></a></li>
              <li><a href={BRAND.pinterest} target="_blank" rel="noreferrer" className="icon-btn border hairline text-ivory/80" aria-label="Pinterest"><Pinterest /></a></li>
              <li><a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="icon-btn border hairline text-ivory/80" aria-label="WhatsApp"><WhatsApp /></a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow">Explore</p>
            <ul className="mt-6 space-y-3 text-[14px] text-ivory/75">
              {NAV.map((n) => <li key={n.to}><Link to={n.to} className="transition-colors hover:text-gold">{n.label}</Link></li>)}
              <li><Link to="/bespoke" className="transition-colors hover:text-gold">Bespoke</Link></li>
              <li><Link to="/new-arrivals" className="transition-colors hover:text-gold">New Arrivals</Link></li>
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">Client Care</p>
            <ul className="mt-6 space-y-3 text-[14px] text-ivory/75">
              {CARE_LINKS.map((n) => <li key={n.to}><Link to={n.to} className="transition-colors hover:text-gold">{n.label}</Link></li>)}
            </ul>
            <p className="mt-8 eyebrow">Gallery</p>
            <p className="mt-4 text-[14px] leading-relaxed text-ivory/60">{BRAND.address}<br />{BRAND.hours}<br /><a href={`mailto:${BRAND.email}`} className="hover:text-gold">{BRAND.email}</a><br /><a href={`tel:${BRAND.phone.replace(/[^+\d]/g, '')}`} className="hover:text-gold">{BRAND.phone}</a></p>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow">Enter the World of MILAEDIA</p>
            <p className="mt-6 text-[14px] leading-relaxed text-ivory/60">Private previews, new arrivals and stories from the atelier. A few letters a year, never more.</p>
            <div className="mt-5"><NewsletterForm tone="light" compact buttonLabel="Subscribe" /></div>
          </div>
        </div>
        <div className="flex flex-col gap-4 border-t hairline py-8 text-[12px] text-ivory/45 md:flex-row md:items-center md:justify-between">
          <p>© 2026 MILAEDIA. All rights reserved. · {BRAND.locationLine}</p>
          <ul className="flex flex-wrap gap-6">
            {LEGAL_LINKS.map((n) => <li key={n.to}><Link to={n.to} className="transition-colors hover:text-ivory">{n.label}</Link></li>)}
            <li><Link to="/shipping-returns" className="transition-colors hover:text-ivory">Shipping & Returns</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
