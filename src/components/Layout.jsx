import { Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Header'
import MobileMenu from './MobileMenu'
import Footer from './Footer'
import CartDrawer from './CartDrawer'
import SearchOverlay from './SearchOverlay'
import QuickView from './QuickView'
import Toasts from './Toasts'
import ScrollToTop from './ScrollToTop'

function PageFallback() {
  return (
    <div data-tone="light" className="container-site pt-[calc(var(--header-h)+80px)] pb-32" aria-busy="true" aria-live="polite">
      <div className="skeleton h-3 w-32" />
      <div className="skeleton mt-6 h-16 w-2/3" />
      <div className="mt-16 grid gap-8 md:grid-cols-3">
        {[0, 1, 2].map((i) => <div key={i} className="skeleton aspect-[4/5]" />)}
      </div>
    </div>
  )
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <a href="#main" className="skip-link">Skip to content</a>
      <ScrollToTop />
      <Header />
      <MobileMenu />
      <main id="main" className="flex-1">
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <CartDrawer />
      <SearchOverlay />
      <QuickView />
      <Toasts />
    </div>
  )
}
