import Reveal from '@/components/Reveal'
import NewsletterForm from '@/components/NewsletterForm'

export default function Newsletter() {
  return (
    <section data-tone="light" className="bg-sand/40 text-charcoal py-24 md:py-32">
      <div className="container-site">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow text-gold">Newsletter</p>
          <h2 className="mt-6 text-[clamp(36px,5vw,64px)]">A Note from MILAEDIA</h2>
          <p className="mt-6 text-[16px] leading-relaxed text-charcoal/70">Receive private previews, new arrivals, and stories from the world of handmade rugs.</p>
          <div className="mx-auto mt-10 max-w-md">
            <NewsletterForm />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
