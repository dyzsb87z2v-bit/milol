import { Link } from 'react-router-dom'
import { BRAND } from '@/data/site'
import { useSeo } from '@/lib/seo'
import PageHero from '@/components/PageHero'

const DOCS = {
  shipping: {
    title: 'Shipping & Returns',
    intro: 'Every carpet we sell is delivered the way it was made: carefully, and by hand.',
    sections: [
      ['White-glove delivery', 'Each piece ships from Berlin. Stock pieces are dispatched within two working days and delivered by our specialist partners in five to ten working days across Europe, and ten to fifteen internationally. The carpet is unrolled, placed in the room of your choice and the packaging is taken away. Delivery is included on orders over $2,500.'],
      ['Express courier', 'Where speed matters more than ceremony, a rolled and fully insured courier service is available at checkout for a flat fee. Two to four working days across Europe.'],
      ['Packaging and insurance', 'Rugs are rolled, never folded, around a rigid core, wrapped in acid-free tissue and packed in a protective tube or crate cut to size. Every shipment is fully insured for its declared value from the moment it leaves the gallery until it is signed for at the destination.'],
      ['Duties and taxes', 'Prices are shown in US dollars. Local taxes and import duties outside the European Union are quoted per destination before the order is confirmed and can be prepaid so that nothing is due on delivery. We provide the invoice, certificate of authenticity and origin declaration for customs.'],
      ['Returns', 'A stock piece may be returned within fourteen days of delivery in its original condition and packaging. Write to us and we arrange collection; the refund is made to the original payment method within ten days of the carpet arriving back with us. Bespoke and made-to-order pieces are final sale.'],
      ['On approval', 'For clients within reach of the gallery, we are glad to bring one or two pieces to your home for a few days so you can see them in your own light. Within Berlin there is no fee. Ask us.'],
    ],
  },
  privacy: {
    title: 'Privacy Policy',
    intro: 'We collect as little as we need and keep it only as long as we must.',
    sections: [
      ['Controller', `The controller for this website is MILAEDIA, ${BRAND.location}. You can reach us at ${BRAND.email}.`],
      ['What we collect', 'When you place an order, book a consultation or write to us, we record the details you give us: name, contact information, delivery address and the correspondence itself. Payment details are processed by our payment provider and never reach our servers. This site currently stores your bag, wishlist, recently viewed pieces and preview account in your browser only.'],
      ['How we use it', 'To fulfil your order, to answer you, and, if you have asked for it, to send occasional letters about new pieces. The legal bases are the performance of a contract (Art. 6(1)(b) GDPR), your consent (Art. 6(1)(a)) and our legitimate interest in running the gallery (Art. 6(1)(f)). We do not sell or share personal information for marketing.'],
      ['Cookies and storage', 'Only essential storage is used: your language, your bag and your wishlist. No tracking or advertising cookies are set.'],
      ['Retention', 'Enquiries are kept until they are resolved; order records are kept for as long as commercial and tax law requires.'],
      ['Your rights', 'Under the GDPR you may ask at any time to see, correct, delete or export the information we hold about you, to restrict or object to its processing, and to withdraw consent. Write to us and we will act within thirty days. You may also complain to a supervisory authority.'],
    ],
  },
  terms: {
    title: 'Terms & Conditions',
    intro: 'The short version: we describe every piece honestly, and we stand behind it.',
    sections: [
      ['Descriptions', 'Each carpet is handmade and unique. Dimensions are measured at the widest points and may vary by up to two per cent; colours are photographed in daylight and may read differently on your screen. Where a piece has been restored, we say so. Minor deviations in colour, pattern or dimension are inherent to handmade work.'],
      ['Orders and payment', 'An order is accepted when we confirm it in writing. Payment is due in full for stock pieces, and by a thirty per cent deposit followed by the balance before delivery for bespoke commissions. Prices are shown in US dollars and exclude local taxes and duties, which are quoted before confirmation.'],
      ['Reserved pieces', 'A rug marked as reserved is held for a client and cannot be purchased online. We are always glad to suggest similar pieces or to have one woven.'],
      ['Authenticity', 'Every piece is sold with a certificate recording its origin, materials, knot density and dimensions. Should a piece ever prove to be other than described, we refund it in full.'],
      ['Governing law', 'These terms are governed by the laws of the Federal Republic of Germany. Nothing in them limits the statutory rights of consumers in their country of residence.'],
    ],
  },
  imprint: {
    title: 'Imprint',
    intro: 'Information in accordance with § 5 TMG.',
    sections: [
      ['Gallery', `MILAEDIA\n${BRAND.location}\nBy appointment, ${BRAND.hours}`],
      ['Contact', `Email: ${BRAND.email}\nTelephone: ${BRAND.phone}`],
      ['Registration', 'Street address, VAT identification number and commercial register entry: to be completed before commercial launch.'],
      ['Dispute resolution', 'The European Commission provides a platform for online dispute resolution at ec.europa.eu/consumers/odr. We are not obliged and not willing to take part in dispute resolution proceedings before a consumer arbitration board.'],
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
          {d.sections.map(([h, p]) => (<div key={h}><h2>{h}</h2><p className="whitespace-pre-line">{p}</p></div>))}
          <p className="mt-16 text-[13px] text-charcoal/55">Questions? <Link to="/contact" className="underline underline-offset-4">Write to the gallery</Link>. We reply personally within two working days.</p>
        </div>
      </section>
    </>
  )
}
