import Reveal, { Words } from '@/components/Reveal'
import NewsletterForm from '@/components/NewsletterForm'
import { asset } from '@/lib/assets'

export default function Newsletter() {
  return (
    <section data-tone="dark" className="relative overflow-hidden bg-black text-ivory">
      <img src={asset('/img/silk-cocoons.webp')} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover opacity-30" loading="lazy" decoding="async" />
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" aria-hidden="true" />
      <div className="container-site relative py-28 md:py-40">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">Newsletter</p>
          <h2 className="mt-6 text-[clamp(38px,5.4vw,72px)]"><Words text="Enter the World of MILAEDIA" /></h2>
          <p className="mt-6 text-[15.5px] leading-relaxed text-ivory/60">Private previews, new arrivals and stories from the world of handmade carpets. A few letters a year.</p>
          <div className="mx-auto mt-10 max-w-md">
            <NewsletterForm tone="light" buttonLabel="Subscribe" gold />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
