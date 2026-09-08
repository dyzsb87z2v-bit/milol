import { useSeo } from '@/lib/seo'
import Hero from '@/home/Hero'
import FeaturedFamilies from '@/home/FeaturedFamilies'
import StatementCollection from '@/home/StatementCollection'
import ArtBeneath from '@/home/ArtBeneath'
import TextureDetail from '@/home/TextureDetail'
import InteriorsScene from '@/home/InteriorsScene'
import BespokeHome from '@/home/BespokeHome'
import JournalTeaser from '@/home/JournalTeaser'
import Testimonials from '@/home/Testimonials'
import GalleryStrip from '@/home/GalleryStrip'
import Newsletter from '@/home/Newsletter'
import Hall3D from '@/home/Hall3D'
import Marquee from '@/components/Marquee'

export default function Home() {
  useSeo({
    title: null,
    description: 'MILAEDIA — a Berlin gallery for exceptional handmade Persian and Turkish carpets, selected for extraordinary interiors. Collection, bespoke commissions and the craft behind every knot.',
    image: '/img/og-image.webp',
  })
  return (
    <>
      <Hero />
      <FeaturedFamilies />
      <Marquee />
      <Hall3D />
      <StatementCollection />
      <ArtBeneath />
      <TextureDetail />
      <InteriorsScene />
      <BespokeHome />
      <JournalTeaser />
      <Testimonials />
      <GalleryStrip />
      <Newsletter />
    </>
  )
}
