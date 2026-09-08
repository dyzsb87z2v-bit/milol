import { useSeo } from '@/lib/seo'
import Hero from '@/home/Hero'
import Introduction from '@/home/Introduction'
import FeaturedCollection from '@/home/FeaturedCollection'
import Bespoke from '@/home/Bespoke'
import Craftsmanship from '@/home/Craftsmanship'
import JournalTeaser from '@/home/JournalTeaser'
import Newsletter from '@/home/Newsletter'

export default function Home() {
  useSeo({
    title: null,
    description: 'MILAEDIA — luxury handmade Persian and Turkish carpets. Curated collection, bespoke commissions and the craft behind every knot.',
    image: '/img/og-image.webp',
  })
  return (
    <>
      <Hero />
      <Introduction />
      <FeaturedCollection />
      <Bespoke />
      <Craftsmanship />
      <JournalTeaser />
      <Newsletter />
    </>
  )
}
