import { ARTICLES } from '@/data/journal'
import { useSeo } from '@/lib/seo'
import PageHero from '@/components/PageHero'
import { ArticleCard } from '@/home/JournalTeaser'

export default function Journal() {
  useSeo({ title: 'The Journal', description: 'Notes on interiors, heritage and the care of handmade carpets, from the MILAEDIA atelier.' })
  return (
    <>
      <PageHero eyebrow="Journal" title="The Journal" intro="Notes on interiors, heritage and the care of handmade things." />
      <section data-tone="light" className="bg-ivory text-charcoal pb-24 md:pb-36">
        <div className="container-site grid gap-12 md:grid-cols-3 md:gap-8">
          {ARTICLES.map((a, i) => <ArticleCard key={a.slug} article={a} delay={i * 100} />)}
        </div>
      </section>
    </>
  )
}
