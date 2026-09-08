import { useSeo } from '@/lib/seo'
import PageHero from '@/components/PageHero'

const DOCS = {
  shipping: {
    title: 'Shipping & Returns',
    intro: 'Every rug travels rolled, wrapped in breathable cotton and delivered by hand.',
    sections: [
      ['Delivery', 'Orders over $2,500 include complimentary white-glove delivery within the continental United States. Our team will contact you to arrange an appointment, unroll the rug in place and remove all packaging. International delivery to Europe, the Middle East and Asia is quoted at checkout and typically takes 7 to 14 days.'],
      ['Made-to-order pieces', 'Rugs woven to order ship within the timeframe stated on their page, usually 10 to 14 weeks. We will share photographs from the loom as the piece progresses.'],
      ['Returns', 'A rug may be returned within 14 days of delivery provided it is in its original condition. Contact us to arrange collection; a return delivery fee applies outside the continental United States. Made-to-order and bespoke commissions are final sale.'],
      ['Damage in transit', 'Every shipment is insured. Please inspect the rug at delivery and note any concern with our team before they leave.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro: 'We collect as little as we can, and we never sell what we collect.',
    sections: [
      ['What we collect', 'When you place an order, book a consultation or join our list we record the details you give us: your name, contact details and delivery address. This demonstration site stores that information in your own browser only.'],
      ['How it is used', 'To fulfil your order, to answer your enquiry and, if you have asked for it, to send an occasional note from the atelier. You can unsubscribe at any time.'],
      ['Cookies and storage', 'We use browser storage to remember your bag, wishlist and recently viewed pieces. No third-party advertising trackers are used.'],
      ['Your rights', 'You may ask to see, correct or delete the information we hold about you at any time by writing to atelier@milaedia.com.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro: 'The short version: we describe every rug honestly, and we stand behind it.',
    sections: [
      ['Descriptions', 'Each rug is handmade and unique. Dimensions are measured at the widest points and may vary by up to 3 percent; colours are photographed under daylight and may differ slightly on screen.'],
      ['Pricing and payment', 'Prices are shown in US dollars and exclude taxes, which are calculated at checkout. This demonstration site does not process payments.'],
      ['Reserved pieces', 'A rug marked as reserved is held for a client and cannot be purchased online. We are always glad to suggest similar pieces.'],
      ['Authenticity', 'Every rug is supplied with a signed certificate of authenticity. If a rug is ever found not to be as described, we will take it back and refund it in full.'],
      ['Governing law', 'These terms are governed by the laws of the State of New York.'],
    ],
  },
}

export default function Info({ doc }) {
  const d = DOCS[doc]
  useSeo({ title: d.title, description: d.intro })
  return (
    <>
      <PageHero eyebrow="Customer Care" title={d.title} intro={d.intro} />
      <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
        <div className="container-site prose-luxe max-w-3xl">
          {d.sections.map(([h, p]) => (<div key={h}><h2>{h}</h2><p>{p}</p></div>))}
        </div>
      </section>
    </>
  )
}
