export const BRAND = {
  name: 'MILAEDIA',
  tagline: 'Timeless Art for Exceptional Interiors',
  strapline: 'Persian Heritage. European Elegance.',
  location: 'Berlin, Germany',
  locationLine: 'Berlin · Persian Heritage · Worldwide',
  address: 'Berlin · By appointment',
  hours: 'Tuesday – Saturday, 11:00 – 18:00',
  email: 'atelier@milaedia.com',
  phone: '+49 163 6207202',
  whatsapp: 'https://wa.me/491636207202',
  whatsappText: (piece) => `Hello MILAEDIA, I am interested in ${piece ? piece : 'a piece from the collection'}.`,
  instagramHandle: '@MILAEDIA_',
  instagram: 'https://www.instagram.com/MILAEDIA_/',
  pinterest: 'https://www.pinterest.com/',
  url: 'https://milaedia.com',
}

export const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/collection' },
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Bespoke', to: '/bespoke' },
  { label: 'Our Story', to: '/our-story' },
  { label: 'Journal', to: '/journal' },
  { label: 'Contact', to: '/contact' },
]

export const CARE_LINKS = [
  { label: 'Shipping & Returns', to: '/shipping-returns' },
  { label: 'How Pieces Are Chosen', to: '/our-story#how-we-choose' },
  { label: 'Certificate of Authenticity', to: '/our-story#authenticity' },
  { label: 'A Closer Look — Private Video', to: '/contact?topic=video' },
  { label: 'Private Home Experience', to: '/bespoke#home-experience' },
  { label: 'Care Guide', to: '/journal/caring-for-a-handmade-carpet' },
]

export const LEGAL_LINKS = [
  { label: 'Privacy Policy', to: '/privacy-policy' },
  { label: 'Terms & Conditions', to: '/terms' },
  { label: 'Imprint', to: '/imprint' },
]

/** The gallery's services, as offered in Berlin and across Europe. */
export const SERVICES = [
  { title: 'Private sourcing', text: 'A brief for a specific piece — a size, a region, a palette, a period — and we look for it. Sourcing can take a season or several years. We report what we find and what we have rejected, and why.', to: '/contact?topic=sourcing' },
  { title: 'Collection curation', text: 'For clients assembling a group rather than buying once. We advise on what a collection needs, what it already has too much of, and which pieces will still read well together in twenty years.', to: '/collection' },
  { title: 'Interior consultation', text: 'Working with architects and designers on scale, palette and placement. A rug that is right in the gallery can be wrong in the room; we would rather establish that before it is delivered.', to: '/contact?topic=consultation' },
  { title: 'A closer look', text: 'A filmed presentation of the exact piece you are considering — the pile under moving light, the reverse, the selvedge, the colour as it truly reads. Sent to you personally, not published anywhere.', to: '/contact?topic=video' },
  { title: 'International shipping', text: 'Fully insured, documented and tracked, with customs handled at both ends. Pieces travel rolled, never folded, in a rigid case cut to size.', to: '/shipping-returns' },
  { title: 'Authenticity & provenance', text: 'Written condition reports, dating, regional attribution and, where the history is known, the record of previous ownership. We say plainly when a piece cannot be attributed with confidence.', to: '/our-story#how-we-choose' },
]

/** Trust pillars shown on the home page. */
export const PILLARS = [
  { title: 'Authentic & Certified', text: 'Every carpet comes with a signed certificate of authenticity.' },
  { title: 'Handmade Excellence', text: 'Handwoven by master artisans, one knot at a time.' },
  { title: 'Worldwide Shipping', text: 'Insured, white-glove delivery from Berlin to anywhere.' },
  { title: 'Custom Made', text: 'Commission a rug woven to your room, palette and story.' },
  { title: 'Expert Consultation', text: 'Personal advice, in your home or ours. No automated pricing.' },
]

/** The six weaving cities the gallery collects from. */
export const REGIONS = [
  { name: 'Isfahan', text: 'Court weaving at its most disciplined — fine wool on silk warps, ivory grounds, arabesque held in perfect symmetry.' },
  { name: 'Nain', text: 'The quietest palette in Persia. Ivory, sand and a blue that reads almost grey, woven at extraordinary density.' },
  { name: 'Tabriz', text: 'The north-west school, and the most varied. Medallions, hunting scenes and the famous Mahi fish design.' },
  { name: 'Kashan', text: 'Deep madder reds and indigo, with a medallion that fills the field. The classical drawing-room carpet.' },
  { name: 'Qom', text: 'Almost entirely silk. Small formats, panel designs, and a sheen that shifts as you walk past it.' },
  { name: 'Kerman', text: 'Soft rose, celadon and cream from the south-east, drawn with an unmistakable floral fluency.' },
]

export const HERO = {
  video1080: '/video/hero-1080.mp4',
  video720: '/video/hero-720.mp4',
  poster: '/img/hero-poster.jpg',
  fallback: '/img/intro-room.webp',
}

export const CONTACT_TOPICS = [
  { id: 'general', label: 'A general question' },
  { id: 'piece', label: 'About a specific piece' },
  { id: 'video', label: 'A private video of a piece (A Closer Look)' },
  { id: 'home', label: 'Book the private home experience' },
  { id: 'consultation', label: 'Interior consultation' },
  { id: 'sourcing', label: 'Private sourcing' },
  { id: 'bespoke', label: 'A bespoke commission' },
  { id: 'care', label: 'Cleaning, repair or care' },
]

export const FREE_SHIPPING_THRESHOLD = 2500
export const SHIPPING_FLAT = 190
export const TAX_RATE = 0.19
