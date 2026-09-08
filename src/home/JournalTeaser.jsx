import { Link } from 'react-router-dom'
import { ARTICLES } from '@/data/journal'
import Reveal, { Words } from '@/components/Reveal'
import Img from '@/components/Img'

const HOME_SLUGS = ['how-to-choose-a-carpet-for-a-modern-interior', 'the-language-of-persian-motifs', 'a-guide-to-handmade-turkish-rugs']

export function ArticleCard({ article, delay = 0, large = false }) {
  return (
    <Reveal as="article" delay={delay} className="group">
      <Link to={`/journal/${article.slug}`} className="block border hairline transition-colors duration-700 group-hover:border-gold/50">
        <Reveal mask>
          <Img image={{ src: article.image, small: article.imageSmall }} alt="" className={large ? 'aspect-[16/10]' : 'aspect-[4/3]'} imgClassName="transition-transform duration-[1800ms] ease-luxe group-hover:scale-105" sizes="(min-width: 768px) 33vw, 100vw" />
        </Reveal>
      </Link>
      <p className="mt-6 eyebrow">{article.category} · {article.readTime}</p>
      <h3 className="mt-3 text-[clamp(26px,2.4vw,32px)] leading-tight"><Link to={`/journal/${article.slug}`} className="transition-colors hover:text-gold">{article.title}</Link></h3>
      <p className="mt-3 text-[14.5px] leading-relaxed text-ivory/60">{article.excerpt}</p>
      <Link to={`/journal/${article.slug}`} className="link-line link-gold mt-5 inline-block">Read Article</Link>
    </Reveal>
  )
}

export default function JournalTeaser() {
  const items = HOME_SLUGS.map((s) => ARTICLES.find((a) => a.slug === s)).filter(Boolean)
  return (
    <section data-tone="dark" className="bg-black text-ivory py-24 md:py-36">
      <div className="container-site">
        <Reveal className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow">Editorial Journal</p>
            <h2 className="mt-5 text-[clamp(38px,5vw,66px)]"><Words text="Notes for people who keep what they buy." /></h2>
          </div>
          <Link to="/journal" className="link-line link-gold md:pb-3">All articles</Link>
        </Reveal>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {items.map((a, i) => <ArticleCard key={a.slug} article={a} delay={i * 100} />)}
        </div>
      </div>
    </section>
  )
}
