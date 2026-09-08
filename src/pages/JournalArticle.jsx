import { Link, Navigate, useParams } from 'react-router-dom'
import { ARTICLES, articleBySlug } from '@/data/journal'
import { dateLong } from '@/lib/format'
import { useSeo } from '@/lib/seo'
import { asset } from '@/lib/assets'
import Img from '@/components/Img'
import Breadcrumbs from '@/components/Breadcrumbs'
import { ArticleCard } from '@/home/JournalTeaser'

function Body({ lines }) {
  const out = []
  let list = []
  const flush = () => { if (list.length) { out.push(<ul key={`ul-${out.length}`}>{list.map((l, i) => <li key={i}>{l}</li>)}</ul>); list = [] } }
  lines.forEach((line, i) => {
    if (line.startsWith('- ')) return list.push(line.slice(2))
    flush()
    if (line.startsWith('## ')) out.push(<h2 key={i}>{line.slice(3)}</h2>)
    else if (line.startsWith('> ')) out.push(<blockquote key={i}>{line.slice(2)}</blockquote>)
    else out.push(<p key={i}>{line}</p>)
  })
  flush()
  return out
}

export default function JournalArticle() {
  const { slug } = useParams()
  const a = articleBySlug(slug)
  useSeo({ title: a?.title, description: a?.excerpt, image: a ? asset(a.image) : undefined, type: 'article', jsonLd: a && { '@context': 'https://schema.org', '@type': 'Article', headline: a.title, datePublished: a.date, author: { '@type': 'Organization', name: 'MILAEDIA' } } })
  if (!a) return <Navigate to="/not-found" replace />
  const more = ARTICLES.filter((x) => x.slug !== a.slug && x.category === a.category).concat(ARTICLES.filter((x) => x.slug !== a.slug && x.category !== a.category)).slice(0, 2)
  return (
    <>
      <article data-tone="dark" className="bg-black text-ivory pt-[calc(var(--header-h)+32px)]">
        <div className="container-site">
          <Breadcrumbs items={[{ label: 'Home', to: '/' }, { label: 'Journal', to: '/journal' }, { label: a.category }]} />
          <header className="mx-auto mt-10 max-w-3xl text-center">
            <p className="eyebrow">{a.category} · {dateLong(a.date)} · {a.readTime}</p>
            <h1 className="mt-6 text-[clamp(38px,5.4vw,72px)]">{a.title}</h1>
            {a.subtitle && <p className="mt-4 serif text-[24px] italic text-ivory/60">{a.subtitle}</p>}
            <p className="mt-6 text-[18px] leading-relaxed text-ivory/65">{a.excerpt}</p>
          </header>
          <Img image={{ src: a.image, small: a.imageSmall }} alt="" className="mt-14 aspect-[16/9]" priority sizes="100vw" />
          <div className="prose-luxe mx-auto mt-16 max-w-2xl pb-24">
            <Body lines={a.body} />
            <p className="mt-12 border-t hairline pt-8 text-[13px] uppercase tracking-[0.22em] text-ivory/55"><Link to="/journal" className="hover:text-ivory">← Back to the Journal</Link></p>
          </div>
        </div>
      </article>
      <section data-tone="dark" className="bg-black text-ivory pb-24 md:pb-36" aria-labelledby="more">
        <div className="container-site">
          <div className="rule mb-16" />
          <h2 id="more" className="text-[clamp(30px,4vw,46px)]">More from the Journal</h2>
          <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-8 lg:w-2/3">
            {more.map((x, i) => <ArticleCard key={x.slug} article={x} delay={i * 100} />)}
          </div>
        </div>
      </section>
    </>
  )
}
