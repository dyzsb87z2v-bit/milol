const WORDS = ['Isfahan', 'Tabriz', 'Kashan', 'Nain', 'Qom', 'Kerman', 'Oushak', 'Konya', 'Heriz', 'Hereke']

/** A slow band of gold-outlined city names between sections. */
export default function Marquee() {
  const row = [...WORDS, ...WORDS]
  return (
    <div className="marquee border-y hairline py-6" aria-hidden="true">
      <div className="marquee-track">
        {row.map((w, i) => (
          <span key={i} className="serif flex items-center gap-10 px-5 text-[clamp(28px,4vw,56px)] leading-none">
            <span className={i % 2 ? 'outline-gold' : 'gold-text'}>{w}</span>
            <span className="h-1.5 w-1.5 rounded-full bg-gold/70" />
          </span>
        ))}
      </div>
    </div>
  )
}
