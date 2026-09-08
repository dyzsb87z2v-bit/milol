import { useSeo } from '@/lib/seo'
import EmptyState from '@/components/EmptyState'

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you were looking for does not exist.' })
  return (
    <section data-tone="dark" className="bg-black text-ivory pt-[var(--header-h)]">
      <div className="container-site">
        <EmptyState title="This page has moved on" text="The page you were looking for does not exist, or has been rolled up and put away." cta={{ label: 'Return home', to: '/' }} />
      </div>
    </section>
  )
}
