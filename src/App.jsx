import { lazy } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { StoreProvider } from '@/store/StoreContext'
import Layout from '@/components/Layout'
import Home from '@/pages/Home'

// The home page ships in the main bundle so the opening film never waits on
// a second request; every other page is split and fetched on navigation.
const Collection = lazy(() => import('@/pages/Collection'))
const Product = lazy(() => import('@/pages/Product'))
const Bespoke = lazy(() => import('@/pages/Bespoke'))
const OurStory = lazy(() => import('@/pages/OurStory'))
const Journal = lazy(() => import('@/pages/Journal'))
const JournalArticle = lazy(() => import('@/pages/JournalArticle'))
const Contact = lazy(() => import('@/pages/Contact'))
const Cart = lazy(() => import('@/pages/Cart'))
const Checkout = lazy(() => import('@/pages/Checkout'))
const OrderConfirmation = lazy(() => import('@/pages/OrderConfirmation'))
const Account = lazy(() => import('@/pages/Account'))
const Wishlist = lazy(() => import('@/pages/Wishlist'))
const Search = lazy(() => import('@/pages/Search'))
const Info = lazy(() => import('@/pages/Info'))
const NotFound = lazy(() => import('@/pages/NotFound'))

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/\/$/, '')}>
      <StoreProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/new-arrivals" element={<Collection newArrivals />} />
            <Route path="/collection/:slug" element={<Product />} />
            <Route path="/bespoke" element={<Bespoke />} />
            <Route path="/our-story" element={<OurStory />} />
            <Route path="/journal" element={<Journal />} />
            <Route path="/journal/:slug" element={<JournalArticle />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/checkout/confirmation/:id" element={<OrderConfirmation />} />
            <Route path="/account" element={<Account />} />
            <Route path="/wishlist" element={<Wishlist />} />
            <Route path="/search" element={<Search />} />
            <Route path="/shipping-returns" element={<Info doc="shipping" />} />
            <Route path="/privacy-policy" element={<Info doc="privacy" />} />
            <Route path="/terms" element={<Info doc="terms" />} />
            <Route path="/imprint" element={<Info doc="imprint" />} />
            <Route path="/not-found" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/not-found" replace />} />
          </Route>
        </Routes>
      </StoreProvider>
    </BrowserRouter>
  )
}
