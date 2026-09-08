import { Link } from 'react-router-dom'
import { BRAND, NAV, CARE_LINKS, LEGAL_LINKS } from '@/data/site'
import NewsletterForm from './NewsletterForm'

const Instagram = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" /></svg>
)
const Pinterest = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M10.5 16.5 12 9m0 0c-2 0-3.5 1.4-3.5 3s1 2 1.6 1.6M12 9c1.8 0 3 1.2 3 2.8 0 2.2-1.4 4-3 4-.8 0-1.4-.5-1.4-1.2" /></svg>
)

export default function Footer() {
  return (
    <footer data-tone="dark" className="bg-charcoal text-ivory">
      <div className="container-site pt-20 pb-10 md:pt-28">
        <div className="grid gap-14 md:grid-cols-12">
          <div className="md:col-span-4">
            <p className="serif text-[26px] tracking-[0.42em] uppercase">MILAEDIA</p>
            <p className="mt-3 eyebrow text-gold">{BRAND.strapline}</p>
            <p className="mt-6 max-w-xs text-[15px] leading-relaxed text-ivory/65">
              A Berlin-based gallery for handmade Persian and Turkish carpets, chosen one at a time for interiors that value quiet, lasting beauty.
            </p>
            <p className="mt-5 text-[13px] leading-relaxed text-ivory/55">{BRAND.address}<br />{BRAND.hours}<br /><a href={`mailto:${BRAND.email}`} className="hover:text-ivory">{BRAND.email}</a> · <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="hover:text-ivory">WhatsApp</a></p>
            <ul className="mt-8 flex gap-3">
              <li><a href={BRAND.instagram} target="_blank" rel="noreferrer" className="icon-btn text-ivory/80 hover:text-ivory" aria-label="Instagram"><Instagram /></a></li>
              <li><a href={BRAND.pinterest} target="_blank" rel="noreferrer" className="icon-btn text-ivory/80 hover:text-ivory" aria-label="Pinterest"><Pinterest /></a></li>
            </ul>
          </div>
          <div className="md:col-span-2">
            <p className="eyebrow text-gold">Navigate</p>
            <ul className="mt-6 space-y-3 text-[14px] text-ivory/80">
              {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-ivory transition-colors">{n.label}</Link></li>)}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-gold">Customer Care</p>
            <ul className="mt-6 space-y-3 text-[14px] text-ivory/80">
              {CARE_LINKS.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-ivory transition-colors">{n.label}</Link></li>)}
            </ul>
          </div>
          <div className="md:col-span-3">
            <p className="eyebrow text-gold">A Note from MILAEDIA</p>
            <p className="mt-6 text-[14px] leading-relaxed text-ivory/65">Private previews and stories from the atelier, a few times a year.</p>
            <div className="mt-4">
              <NewsletterForm tone="light" compact buttonLabel="Join the list" />
            </div>
          </div>
        </div>
        <div className="mt-20 flex flex-col gap-4 border-t hairline-light pt-8 text-[12px] text-ivory/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 MILAEDIA. All rights reserved. · {BRAND.locationLine}</p>
          <ul className="flex flex-wrap gap-6">
            {LEGAL_LINKS.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-ivory transition-colors">{n.label}</Link></li>)}
            <li><Link to="/shipping-returns" className="hover:text-ivory transition-colors">Shipping & Returns</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
