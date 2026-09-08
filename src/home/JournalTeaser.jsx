import { Link } from 'react-router-dom'
import { ARTICLES } from '@/data/journal'
import Reveal from '@/components/Reveal'
import Img from '@/components/Img'
import SectionHeading from '@/components/SectionHeading'

export function ArticleCard({ article, delay = 0 }) {
  return (
    <Reveal as="article" delay={delay}>
      <Link to={`/journal/${article.slug}`} className="block zoom-parent">
        <Img image={{ src: article.image, small: article.imageSmall }} alt="" className="aspect-[4/3]" sizes="(min-width: 768px) 30vw, 100vw" />
      </Link>
      <p className="mt-6 eyebrow text-gold">{article.category}</p>
      <h3 className="mt-3 text-[clamp(24px,2.4vw,30px)] leading-tight">
        <Link to={`/journal/${article.slug}`} className="hover:text-gold transition-colors">{article.title}</Link>
      </h3>
      <p className="mt-3 text-[15px] leading-relaxed text-charcoal/65">{article.excerpt}</p>
      <Link to={`/journal/${article.slug}`} className="link-line mt-5 inline-block">Read Article</Link>
    </Reveal>
  )
}

export default function JournalTeaser() {
  return (
    <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
      <div className="container-site">
        <div className="rule mb-20 md:mb-28" />
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading eyebrow="Journal" title="The Journal" subtitle="Notes on interiors, heritage and the care of handmade things." />
          <Reveal delay={100} className="md:pb-3"><Link to="/journal" className="link-line">All articles</Link></Reveal>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8">
          {ARTICLES.map((a, i) => <ArticleCard key={a.slug} article={a} delay={i * 100} />)}
        </div>
      </div>
    </section>
  )
}
