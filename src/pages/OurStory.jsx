import { Link } from 'react-router-dom'
import { useSeo } from '@/lib/seo'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import Img from '@/components/Img'

export default function OurStory() {
  useSeo({ title: 'Our Story', description: 'MILAEDIA began with a single rug and a conviction: that a handwoven carpet is the most lasting piece of art a home can hold.' })
  return (
    <>
      <PageHero eyebrow="Our Story" title="Quiet luxury, woven slowly." intro="MILAEDIA began with a single rug and a conviction: that a handwoven carpet is the most lasting piece of art a home can hold." image={{ src: '/img/story-desert.webp', small: '/img/story-desert-sm.webp' }} alt="A crimson medallion carpet laid across warm desert rock at dusk" />

      <section data-tone="light" className="bg-ivory text-charcoal py-24 md:py-36">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">Heritage</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Two traditions, one house.</h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7 prose-luxe">
            <p>Persian and Turkish carpets have grown side by side for five centuries: the curvilinear gardens of Isfahan and Kashan, the bold geometry of the Anatolian plateau. MILAEDIA was founded to bring the best of both into rooms that value calm over spectacle.</p>
            <p>We work directly with weaving families in Isfahan, Tabriz, Nain, Uşak and Konya. Many of our pieces are woven to our own designs; others are chosen, one at a time, from the finest contemporary production. Nothing we sell is a reproduction, and nothing is machine-made.</p>
            <p>Every rug in the collection has been walked on, turned over and examined knot by knot before it is offered. That is slow work, and it is the reason the collection is small.</p>
          </Reveal>
        </div>
      </section>

      <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
        <div className="container-site grid gap-6 md:grid-cols-2">
          <Reveal className="zoom-parent"><Img image={{ src: '/img/craft-history.webp', small: '/img/craft-history-sm.webp' }} alt="A classical medallion carpet in the gallery" className="aspect-[4/5]" sizes="(min-width: 768px) 50vw, 100vw" /></Reveal>
          <Reveal delay={120} className="zoom-parent md:mt-24"><Img image={{ src: '/img/intro-room.webp', small: '/img/intro-room-sm.webp' }} alt="A handmade rug in a sunlit modern living room" className="aspect-[4/5]" sizes="(min-width: 768px) 50vw, 100vw" /></Reveal>
        </div>
      </section>

      <section id="authenticity" data-tone="dark" className="bg-charcoal text-ivory py-24 md:py-36 scroll-mt-[var(--header-h)]">
        <div className="container-site grid gap-14 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <p className="eyebrow text-gold">Authenticity</p>
            <h2 className="mt-5 text-[clamp(36px,4.6vw,60px)]">Documented, knot by knot.</h2>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-6 lg:col-start-7">
            <p className="text-[17px] leading-[1.85] text-ivory/70">Each rug is delivered with a signed certificate recording its origin, materials, knot density and the date of weaving. We keep a record of every piece we have sold, so a MILAEDIA rug can always be traced back to its loom, and its story passed on with it.</p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link to="/collection" className="btn btn-solid-ivory">View the Collection</Link>
              <Link to="/contact" className="btn btn-ivory">Visit the Atelier</Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}
