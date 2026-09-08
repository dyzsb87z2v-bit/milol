import Reveal from './Reveal'

export default function SectionHeading({ eyebrow, title, subtitle, align = 'left', tone = 'dark', className = '' }) {
  const isDark = tone === 'dark'
  return (
    <Reveal className={`${align === 'center' ? 'text-center mx-auto' : ''} max-w-3xl ${className}`}>
      {eyebrow && <p className={`eyebrow ${isDark ? 'text-gold' : 'text-gold'}`}>{eyebrow}</p>}
      <h2 className={`mt-5 text-[clamp(38px,5.2vw,64px)] ${isDark ? 'text-ivory' : 'text-ivory'}`}>{title}</h2>
      {subtitle && <p className={`mt-5 text-base md:text-lg leading-relaxed ${isDark ? 'text-ivory/65' : 'text-ivory/65'}`}>{subtitle}</p>}
    </Reveal>
  )
}
