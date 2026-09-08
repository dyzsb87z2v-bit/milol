import Img from './Img'

/** Editorial page opener: optional full-bleed image with a serif title. */
export default function PageHero({ eyebrow, title, intro, image, alt, dark = false }) {
  if (image) {
    return (
      <section data-tone="dark" className="relative min-h-[70vh] flex items-end bg-walnut text-ivory">
        <Img image={image} alt={alt} className="absolute inset-0" priority sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/30" aria-hidden="true" />
        <div className="container-site relative pb-16 pt-48 md:pb-24">
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="mt-5 max-w-4xl text-[clamp(44px,7vw,96px)]">{title}</h1>
          {intro && <p className="mt-6 max-w-2xl text-lg text-ivory/75 leading-relaxed">{intro}</p>}
        </div>
      </section>
    )
  }
  return (
    <section data-tone={dark ? 'dark' : 'light'} className={`${dark ? 'bg-walnut text-ivory' : 'bg-black text-ivory'} pt-[calc(var(--header-h)+64px)] pb-16 md:pt-[calc(var(--header-h)+96px)] md:pb-24`}>
      <div className="container-site">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1 className="mt-5 max-w-4xl text-[clamp(42px,6.4vw,88px)]">{title}</h1>
        {intro && <p className={`mt-6 max-w-2xl text-lg leading-relaxed text-ivory/60`}>{intro}</p>}
      </div>
    </section>
  )
}
