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
  { label: 'Craftsmanship', to: '/craftsmanship' },
  { label: 'Journal', to: '/journal' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
]

export const SECONDARY_NAV = [
  { label: 'New Arrivals', to: '/new-arrivals' },
  { label: 'Bespoke', to: '/bespoke' },
  { label: 'Private Home Experience', to: '/bespoke#home-experience' },
  { label: 'Wishlist', to: '/wishlist' },
  { label: 'Account', to: '/account' },
]

export const LANGUAGES = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'fa', label: 'فارسی', short: 'FA' },
]

/** The three editorial families every piece belongs to. */
export const FAMILIES = [
  { id: 'persian-heritage', name: 'Persian Heritage', text: 'The court weaves of Isfahan, Tabriz, Kashan and Heriz: medallions, gardens and vines drawn at densities that approach painting.', image: { src: '/img/tabriz-1.webp', small: '/img/tabriz-1-sm.webp' }, alt: 'A classical Persian medallion carpet suspended in a dark hall' },
  { id: 'turkish-elegance', name: 'Turkish Elegance', text: 'Anatolia’s bold geometry and hand-spun, plant-dyed wool. Village looms with a palette taken from the plateau itself.', image: { src: '/img/anatolian-1.webp', small: '/img/anatolian-1-sm.webp' }, alt: 'A geometric Anatolian carpet in terracotta and umber' },
  { id: 'contemporary-icons', name: 'Contemporary Icons', text: 'Pale, tonal pieces woven to old standards for modern rooms: Nain lattices and over-scaled Oushak blooms.', image: { src: '/img/oushak-1.webp', small: '/img/oushak-1-sm.webp' }, alt: 'A pale Oushak carpet with over-scaled floral motifs' },
]

export const TESTIMONIALS = [
  { quote: 'The Tabriz arrived rolled in cotton and was laid before we had finished our coffee. Six months on, the room still turns around it.', name: 'A. Lindqvist', place: 'Private residence, Stockholm' },
  { quote: 'We asked for a video of the exact piece and received a film of it under evening light, front and back. Nobody else does this.', name: 'M. Ferrante', place: 'Interior architect, Milan' },
  { quote: 'They brought three carpets to the apartment and told us, honestly, that none of them was right. The fourth was. That is why we returned.', name: 'S. & R. Weber', place: 'Charlottenburg, Berlin' },
  { quote: 'A bespoke commission for a hotel lobby, delivered in eight months with photographs from the loom every few weeks. Faultless.', name: 'D. Haddad', place: 'Hospitality project, Dubai' },
  { quote: 'The certificate, the provenance, the knot count. It is the first time buying a rug felt like buying a work of art.', name: 'C. Marchetti', place: 'Collector, Zürich' },
]

export const GALLERY = [
  { image: { src: '/img/atelier-salon.webp', small: '/img/atelier-salon-sm.webp' }, alt: 'A Berlin salon at dusk with a large medallion carpet', tall: true },
  { image: { src: '/img/isfahan-1.webp', small: '/img/isfahan-1-sm.webp' }, alt: 'Isfahan Silk Garden from above' },
  { image: { src: '/img/library-rug.webp', small: '/img/library-rug-sm.webp' }, alt: 'A medallion carpet in the gallery library' },
  { image: { src: '/img/silk-cocoons.webp', small: '/img/silk-cocoons-sm.webp' }, alt: 'Silk cocoons with their threads drawn upward', tall: true },
  { image: { src: '/img/intro-room.webp', small: '/img/intro-room-sm.webp' }, alt: 'A handmade carpet in a sunlit modern living room' },
  { image: { src: '/img/bespoke-hall.webp', small: '/img/bespoke-hall-sm.webp' }, alt: 'A finished carpet suspended in the atelier' },
  { image: { src: '/img/story-desert.webp', small: '/img/story-desert-sm.webp' }, alt: 'A crimson carpet laid across desert rock at dusk' },
  { image: { src: '/img/silk-hand.webp', small: '/img/silk-hand-sm.webp' }, alt: 'An artisan drawing silk from a cocoon', tall: true },
]

export const ASSURANCES = [
  { title: 'Insured worldwide delivery', text: 'Rolled, never folded, in a case cut to size. White-glove placement in Europe.' },
  { title: 'Certificate of authenticity', text: 'Origin, materials, knot density and dimensions, signed and registered to the piece.' },
  { title: 'Secure payment', text: 'Card, bank transfer or invoice. Card details never touch our servers.' },
  { title: 'Fourteen-day returns', text: 'Live with a stock piece for two weeks. If it is not right, we collect it.' },
]


export const CARE_LINKS = [
  { label: 'Shipping & Returns', to: '/shipping-returns' },
  { label: 'How Pieces Are Chosen', to: '/about#how-we-choose' },
  { label: 'Certificate of Authenticity', to: '/about#authenticity' },
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
  { title: 'Authenticity & provenance', text: 'Written condition reports, dating, regional attribution and, where the history is known, the record of previous ownership. We say plainly when a piece cannot be attributed with confidence.', to: '/about#how-we-choose' },
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
