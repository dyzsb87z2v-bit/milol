import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// On GitHub Pages the site is served from /<repo-name>/, so the deploy
// workflow sets BASE_PATH. Locally and on a custom domain it stays "/".
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  plugins: [react()],
})
