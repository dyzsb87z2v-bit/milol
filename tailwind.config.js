/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      screens: { xs: '440px' },
      colors: {
        black: '#0B0B0A',
        ink: '#0B0B0A',
        charcoal: '#141311',
        walnut: '#2B1D16',
        ivory: '#F4F0E8',
        sand: '#D7C5AC',
        gold: '#B18A4A',
        stone: '#8E877C',
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      transitionTimingFunction: { luxe: 'cubic-bezier(0.16, 1, 0.3, 1)' },
      maxWidth: { site: '1520px' },
    },
  },
  plugins: [],
}
