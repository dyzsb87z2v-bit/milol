/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: { xs: '440px' },
      colors: {
        charcoal: '#161616',
        ivory: '#F5F0E8',
        sand: '#D7C5AC',
        gold: '#B08A57',
        stone: '#A7A39B',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      letterSpacing: { widest2: '0.32em' },
      transitionTimingFunction: { luxe: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      maxWidth: { site: '1440px' },
    },
  },
  plugins: [],
}
