import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'
import { ARTICLES, CATEGORIES } from '@/data/journal'
import { useSeo } from '@/lib/seo'
import PageHero from '@/components/PageHero'
import { ArticleCard } from '@/home/JournalTeaser'

export default function Journal() {
  const [params, setParams] = useSearchParams()
  const cat = CATEGORIES.includes(params.get('c')) ? params.get('c') : 'All'
  const items = useMemo(() => (cat === 'All' ? ARTICLES : ARTICLES.filter((a) => a.category === cat)), [cat])
  useSeo({ title: 'The Journal', description: 'Notes on Persian weaving: how a rug is made, how to read one, and how to live with it. Written for people who intend to keep what they buy.' })
  return (
    <>
      <PageHero eyebrow="Journal" title="The Journal" intro="Notes on Persian weaving: how a rug is made, how to read one, and how to live with it. Written for people who intend to keep what they buy, without jargon or salesmanship." />
      <section data-tone="dark" className="bg-black text-ivory pb-24 md:pb-36">
        <div className="container-site">
          <nav aria-label="Subjects" className="flex flex-wrap gap-x-8 gap-y-3 border-y hairline py-4">
            {CATEGORIES.map((c) => (
              <button key={c} type="button" onClick={() => setParams(c === 'All' ? {} : { c }, { replace: true })} aria-current={cat === c ? 'page' : undefined} className={`link-line ${cat === c ? '' : 'text-ivory/50 after:scale-x-0 hover:text-ivory hover:after:scale-x-100 hover:after:origin-left'}`}>{c}</button>
            ))}
          </nav>
          <p className="mt-6 text-[12px] text-ivory/55" aria-live="polite">{items.length} {items.length === 1 ? 'article' : 'articles'}</p>
          <div className="mt-10 grid gap-12 md:grid-cols-3 md:gap-8">
            {items.map((a, i) => <ArticleCard key={a.slug} article={a} delay={(i % 3) * 100} />)}
          </div>
        </div>
      </section>
    </>
  )
}
