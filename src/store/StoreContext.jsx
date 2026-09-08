import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react'
import { byId } from '@/data/products'
import { load, save } from '@/lib/storage'
import { FREE_SHIPPING_THRESHOLD, SHIPPING_FLAT, TAX_RATE } from '@/data/site'

const StoreContext = createContext(null)

const initial = () => ({
  cart: load('cart', []), // [{ id, qty }]
  wishlist: load('wishlist', []), // [id]
  recents: load('recents', []), // [id]
  orders: load('orders', []), // [{ id, placedAt, items, totals, shipping }]
  account: load('account', null), // { firstName, lastName, email, phone, addresses: [] }
})

function reducer(state, action) {
  switch (action.type) {
    case 'cart/add': {
      const { id, qty } = action
      const exists = state.cart.find((l) => l.id === id)
      const cart = exists
        ? state.cart.map((l) => (l.id === id ? { ...l, qty: Math.min(9, l.qty + qty) } : l))
        : [...state.cart, { id, qty }]
      return { ...state, cart }
    }
    case 'cart/set':
      return { ...state, cart: state.cart.map((l) => (l.id === action.id ? { ...l, qty: action.qty } : l)).filter((l) => l.qty > 0) }
    case 'cart/remove':
      return { ...state, cart: state.cart.filter((l) => l.id !== action.id) }
    case 'cart/clear':
      return { ...state, cart: [] }
    case 'wishlist/toggle':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id) ? state.wishlist.filter((i) => i !== action.id) : [...state.wishlist, action.id],
      }
    case 'wishlist/remove':
      return { ...state, wishlist: state.wishlist.filter((i) => i !== action.id) }
    case 'recents/push':
      return { ...state, recents: [action.id, ...state.recents.filter((i) => i !== action.id)].slice(0, 8) }
    case 'orders/add':
      return { ...state, orders: [action.order, ...state.orders] }
    case 'account/set':
      return { ...state, account: action.account }
    default:
      return state
  }
}

export function StoreProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, initial)
  const [ui, setUi] = useState({ cartOpen: false, searchOpen: false, menuOpen: false, quickView: null })
  const [toasts, setToasts] = useState([])
  const toastId = useRef(0)

  useEffect(() => save('cart', state.cart), [state.cart])
  useEffect(() => save('wishlist', state.wishlist), [state.wishlist])
  useEffect(() => save('recents', state.recents), [state.recents])
  useEffect(() => save('orders', state.orders), [state.orders])
  useEffect(() => save('account', state.account), [state.account])

  // Lock page scroll while any overlay is open.
  useEffect(() => {
    const open = ui.cartOpen || ui.searchOpen || ui.menuOpen || Boolean(ui.quickView)
    document.body.classList.toggle('no-scroll', open)
    return () => document.body.classList.remove('no-scroll')
  }, [ui])

  const toast = useCallback((message, opts = {}) => {
    const id = ++toastId.current
    setToasts((t) => [...t, { id, message, ...opts }])
    window.setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), opts.duration ?? 3400)
  }, [])

  const dismissToast = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), [])

  const openCart = useCallback(() => setUi((u) => ({ ...u, cartOpen: true, searchOpen: false, menuOpen: false, quickView: null })), [])
  const closeCart = useCallback(() => setUi((u) => ({ ...u, cartOpen: false })), [])
  const openSearch = useCallback(() => setUi((u) => ({ ...u, searchOpen: true, cartOpen: false, menuOpen: false, quickView: null })), [])
  const closeSearch = useCallback(() => setUi((u) => ({ ...u, searchOpen: false })), [])
  const openMenu = useCallback(() => setUi((u) => ({ ...u, menuOpen: true })), [])
  const closeMenu = useCallback(() => setUi((u) => ({ ...u, menuOpen: false })), [])
  const openQuickView = useCallback((id) => setUi((u) => ({ ...u, quickView: id })), [])
  const closeQuickView = useCallback(() => setUi((u) => ({ ...u, quickView: null })), [])
  const closeAll = useCallback(() => setUi({ cartOpen: false, searchOpen: false, menuOpen: false, quickView: null }), [])

  const addToCart = useCallback(
    (id, qty = 1) => {
      const p = byId(id)
      if (!p || p.availability === 'reserved') return
      dispatch({ type: 'cart/add', id, qty })
      toast(`${p.name} added to your bag`, { action: { label: 'View bag', onClick: openCart } })
    },
    [toast, openCart],
  )
  const setQty = useCallback((id, qty) => dispatch({ type: 'cart/set', id, qty }), [])
  const removeFromCart = useCallback(
    (id) => {
      dispatch({ type: 'cart/remove', id })
      const p = byId(id)
      if (p) toast(`${p.name} removed from your bag`)
    },
    [toast],
  )
  const clearCart = useCallback(() => dispatch({ type: 'cart/clear' }), [])

  const toggleWishlist = useCallback(
    (id) => {
      const p = byId(id)
      const was = state.wishlist.includes(id)
      dispatch({ type: 'wishlist/toggle', id })
      if (p) toast(was ? `${p.name} removed from your wishlist` : `${p.name} saved to your wishlist`, was ? {} : { action: { label: 'View', to: '/wishlist' } })
    },
    [state.wishlist, toast],
  )
  const pushRecent = useCallback((id) => dispatch({ type: 'recents/push', id }), [])
  const placeOrder = useCallback((order) => dispatch({ type: 'orders/add', order }), [])
  const setAccount = useCallback((account) => dispatch({ type: 'account/set', account }), [])

  const cartLines = useMemo(() => state.cart.map((l) => ({ ...l, product: byId(l.id) })).filter((l) => l.product), [state.cart])
  const totals = useMemo(() => {
    const subtotal = cartLines.reduce((s, l) => s + l.product.price * l.qty, 0)
    const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FLAT
    const tax = Math.round(subtotal * TAX_RATE)
    return { subtotal, shipping, tax, total: subtotal + shipping + tax, count: cartLines.reduce((s, l) => s + l.qty, 0) }
  }, [cartLines])

  const value = useMemo(
    () => ({
      ...state,
      cartLines,
      totals,
      ui,
      toasts,
      toast,
      dismissToast,
      openCart, closeCart, openSearch, closeSearch, openMenu, closeMenu, openQuickView, closeQuickView, closeAll,
      addToCart, setQty, removeFromCart, clearCart,
      toggleWishlist, isWished: (id) => state.wishlist.includes(id),
      pushRecent, placeOrder, setAccount,
    }),
    [state, cartLines, totals, ui, toasts, toast, dismissToast, openCart, closeCart, openSearch, closeSearch, openMenu, closeMenu, openQuickView, closeQuickView, closeAll, addToCart, setQty, removeFromCart, clearCart, toggleWishlist, pushRecent, placeOrder, setAccount],
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const ctx = useContext(StoreContext)
  if (!ctx) throw new Error('useStore must be used inside StoreProvider')
  return ctx
}
