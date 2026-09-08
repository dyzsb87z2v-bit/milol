import { Link } from 'react-router-dom'
import { REGIONS, SERVICES } from '@/data/site'
import { useSeo } from '@/lib/seo'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Img from '@/components/Img'

const VALUES = [
  ['Provenance', 'We know the workshop, and often the weaver, behind every piece we sell. Nothing enters the collection without a history we can vouch for.'],
  ['Natural materials', 'Hand-spun wool, reeled silk, cotton foundations and plant dyes. Materials that were good enough five hundred years ago are still the best there are.'],
  ['Slowness', 'A carpet that takes a year to weave should not be sold in a minute. We would rather you visit, sit with a piece, and take it home on approval.'],
  ['Stewardship', 'We look after the carpets we sell for as long as you own them: washing, repair, and one day, if you wish, finding their next home.'],
]

const SILK = [
  { n: '01', title: 'The silkworm', text: 'Every masterpiece begins with nature.', image: { src: '/img/silk-silkworm.webp', small: '/img/silk-silkworm-sm.webp' }, alt: 'Silkworm cocoons hanging on fine threads against black' },
  { n: '02', title: 'The cocoon', text: 'Nature creates its first thread.', image: { src: '/img/silk-cocoons.webp', small: '/img/silk-cocoons-sm.webp' }, alt: 'A heap of white silk cocoons with their threads drawn upward' },
  { n: '03', title: 'The fibres', text: 'From one cocoon, endless possibilities.', image: { src: '/img/silk-fibers.webp', small: '/img/silk-fibers-sm.webp' }, alt: 'Silk cocoons suspended by their unwound fibres' },
  { n: '04', title: 'The hand', text: 'Craft begins where nature meets the human hand.', image: { src: '/img/silk-hand.webp', small: '/img/silk-hand-sm.webp' }, alt: 'An artisan’s hand drawing a bundle of silk filaments from a cocoon' },
]

const EXAMINED = ['Knot density, counted by hand across the warp', 'Dye type and consistency, under daylight', 'Foundation — warp and weft', 'Condition — pile, sides, ends', 'Provenance and prior ownership']
const REJECTED = ['Undisclosed restoration', 'Structural damage hidden under the pile', 'Synthetic dyes presented as natural', 'False provenance or certificates', 'Condition that honest repair cannot resolve']

export default function OurStory() {
  useSeo({ title: 'Our Story', description: 'MILAEDIA is a Berlin-based gallery for exceptional handmade Persian and Turkish carpets, serving collectors, designers and homeowners across Europe.' })
  return (
    <>
      <PageHero eyebrow="Our Story · Berlin" title="Persian Heritage. European Elegance." intro="MILAEDIA is a Berlin-based gallery serving collectors, designers and homeowners across Europe. The collection is kept deliberately small: a rug is not chosen to fill a catalogue, it is chosen because it is worth keeping." image={{ src: '/img/atelier-salon.webp', small: '/img/atelier-salon-sm.webp' }} alt="A Berlin salon at dusk with a large medallion carpet beneath crystal chandeliers" />

      <section data-tone="light" className="bg-ivory text-charcoal py-24 md:py-36">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">The gallery</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Nothing arrives unseen.</h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7 prose-luxe">
            <p>MILAEDIA began with a single carpet, a Tabriz bought from a weaver's family and carried home across two borders. Everything since has been an attempt to give other people that same feeling: of bringing something into a room that has more time in it than the room itself.</p>
            <p>The gallery works directly with sources in Persia and Anatolia. Each piece is examined in person before it joins the collection: knot by knot, dye by dye, foundation by foundation. We serve collectors who value authenticity over spectacle, and we would rather say plainly that a piece cannot be attributed with confidence than dress it up.</p>
            <p>Beyond the held collection, the gallery takes bespoke commissions: rugs woven to a client's dimensions and palette, and custom works created for a specific room. Every commission begins with a conversation.</p>
          </Reveal>
        </div>
      </section>

      <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
        <div className="container-site">
          <div className="grid gap-6 md:grid-cols-2">
            <Reveal className="zoom-parent"><Img image={{ src: '/img/atelier-library.webp', small: '/img/atelier-library-sm.webp' }} alt="A chandelier in the gallery library" className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" /></Reveal>
            <Reveal delay={120} className="zoom-parent md:mt-20"><Img image={{ src: '/img/library-rug.webp', small: '/img/library-rug-sm.webp' }} alt="A medallion carpet on the floor of the gallery library" className="aspect-[4/3]" sizes="(min-width: 768px) 50vw, 100vw" /></Reveal>
          </div>
          <Reveal className="mx-auto mt-20 max-w-3xl text-center">
            <blockquote className="serif text-[clamp(26px,3.2vw,40px)] italic leading-snug">“A carpet is the only artwork you are meant to walk across, and the only one that grows more beautiful for it.”</blockquote>
            <p className="mt-5 eyebrow text-charcoal/55">The MILAEDIA atelier</p>
          </Reveal>
        </div>
      </section>

      <section data-tone="dark" className="bg-charcoal text-ivory py-24 md:py-36">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">Four commitments</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">What we promise every piece, and every client.</h2>
          </Reveal>
          <dl className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(([t, d], i) => (
              <Reveal key={t} delay={i * 90} className="border-t hairline-light pt-6">
                <dt className="text-[26px]">{t}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-ivory/70">{d}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section data-tone="light" className="bg-ivory text-charcoal py-24 md:py-36">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">From the cocoon to the floor</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">The silk journey.</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-charcoal/70">A silk carpet begins as a thread a fraction of the width of a hair, reeled by hand from cocoons softened in warm water. Several hundred are twisted into a single strand strong enough to knot. The result is a surface that holds light the way water does.</p>
          </Reveal>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {SILK.map((s, i) => (
              <Reveal key={s.n} delay={i * 90}>
                <div className="zoom-parent bg-charcoal"><Img image={s.image} alt={s.alt} className="aspect-[4/5]" sizes="(min-width: 1024px) 24vw, (min-width: 640px) 50vw, 100vw" /></div>
                <p className="mt-5 eyebrow text-gold">{s.n}</p>
                <h3 className="mt-2 text-[24px]">{s.title}</h3>
                <p className="mt-2 text-[14px] text-charcoal/65">{s.text}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-14 max-w-2xl">
            <p className="text-[16px] leading-relaxed text-charcoal/70">Wool is the older material, and in the highlands of Anatolia and Azerbaijan it is still spun by hand, dyed in pots over wood fires, and knotted onto looms that have not changed in shape since the fourteenth century.</p>
          </Reveal>
        </div>
      </section>

      <section data-tone="light" className="bg-sand/40 text-charcoal py-24 md:py-36">
        <div className="container-site">
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">From Persia. To your home.</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Six cities, each with a hand of its own.</h2>
            <p className="mt-6 text-[16px] leading-relaxed text-charcoal/70">A collector can name the town a carpet came from across a room, and after an hour with one of ours, so can you. These carpets were woven for courts and are bought today for apartments in Berlin, Vienna and Milan. A Persian masterpiece does not fight a contemporary room; it gives it a centre.</p>
          </Reveal>
          <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {REGIONS.map((r, i) => (
              <Reveal key={r.name} delay={(i % 3) * 90} className="border-t border-charcoal/20 pt-6">
                <dt className="text-[28px]">{r.name}</dt>
                <dd className="mt-3 text-[15px] leading-relaxed text-charcoal/70">{r.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <section id="how-we-choose" data-tone="light" className="bg-ivory text-charcoal py-24 md:py-36 scroll-mt-[var(--header-h)]">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">How pieces are chosen</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Rejected more often than kept.</h2>
            <div className="mt-10 grid gap-10 sm:grid-cols-2 lg:grid-cols-1">
              <div>
                <p className="eyebrow text-charcoal/55">Examined before acquisition</p>
                <ul className="mt-4 space-y-2 text-[14px] text-charcoal/80">{EXAMINED.map((x) => <li key={x} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{x}</li>)}</ul>
              </div>
              <div>
                <p className="eyebrow text-charcoal/55">Grounds for rejection</p>
                <ul className="mt-4 space-y-2 text-[14px] text-charcoal/80">{REJECTED.map((x) => <li key={x} className="flex gap-3"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-gold" />{x}</li>)}</ul>
              </div>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7 prose-luxe">
            <p>Every piece in the gallery is sourced in person. Most come from contacts built over years inside Persia and Anatolia: dealers, weavers, and families selling from private holdings. A smaller number arrive through European auctions and estate sales. Nothing is bought unseen from a photograph.</p>
            <p>Before acquisition, each rug is examined on the floor and on a table. Knot density is counted by hand across the warp. The dye is checked under daylight for consistency and bleed. The foundation is inspected on the back: warp material, weft count, and any signs of repair. Condition is assessed edge to edge.</p>
            <p>Provenance is the last check. Where a certificate exists, it is verified. Where one does not, the gallery issues its own after acquisition, based on the physical evidence of the rug itself. The standard is not perfection. It is transparency.</p>
          </Reveal>
        </div>
      </section>

      <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
        <div className="container-site">
          <div className="rule mb-16" />
          <Reveal className="max-w-2xl">
            <p className="eyebrow text-gold">Services</p>
            <h2 className="mt-5 text-[clamp(32px,4vw,52px)]">A gallery, not a warehouse.</h2>
            <p className="mt-5 text-[16px] leading-relaxed text-charcoal/70">Most of our work happens before a rug is ever listed, and much of it continues long after it has been placed.</p>
          </Reveal>
          <div className="mt-12 grid gap-x-10 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s, i) => (
              <Reveal key={s.title} delay={(i % 3) * 90}>
                <h3 className="text-[26px]">{s.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-charcoal/70">{s.text}</p>
                <Link to={s.to} className="link-line mt-4 inline-block">Enquire</Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section id="authenticity" data-tone="dark" className="bg-charcoal text-ivory py-24 md:py-36 scroll-mt-[var(--header-h)]">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">Authenticity</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Documented, knot by knot.</h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[17px] leading-[1.85] text-ivory/70">Each carpet is delivered with a signed certificate recording its reference number, origin, weaver or workshop, materials, knot density, dyes, condition and dimensions, together with the atelier photographs. The certificate is registered to the piece and transfers with it. Should a piece ever prove to be other than described, we refund it in full.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/collection" className="btn btn-solid-ivory">View the Collection</Link>
              <Link to="/contact" className="btn btn-ivory">Begin a Conversation</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
