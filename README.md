# MILAEDIA

**Timeless Art for Exceptional Interiors.**
The e-commerce site of MILAEDIA, a Berlin-based gallery for luxury handmade Persian and Turkish carpets. Built with React, Vite and Tailwind CSS.

## Publishing (read this first)

Every push to `main` builds the site and publishes it to GitHub Pages through `.github/workflows/deploy.yml`.

**One-time setup, required:** in the repository open **Settings → Pages → Build and deployment** and set **Source** to **GitHub Actions**. With the default "Deploy from a branch" GitHub publishes the raw source instead of the built site and the page stays blank.

Until the custom domain is connected the site is served at `https://dyzsb87z2v-bit.github.io/milol/`. The workflow detects that sub-path automatically.

**Custom domain (milaedia.com):** add these DNS records at the registrar, then enter `milaedia.com` under Settings → Pages → Custom domain and tick "Enforce HTTPS". The next deploy switches to the root path on its own.

```
A     @    185.199.108.153
A     @    185.199.109.153
A     @    185.199.110.153
A     @    185.199.111.153
CNAME www  dyzsb87z2v-bit.github.io
```

## Design direction

Dark gallery palette: near-black `#0B0B0A`, warm ivory `#F4F0E8`, antique gold `#B18A4A`, deep walnut `#2B1D16`. Cormorant Garamond headlines, Manrope body. Thin gold hairlines, a faint static film grain, no rounded corners, a gold custom cursor on fine-pointer desktops. Motion is restrained: fade-up reveals, image mask wipes, staggered headline words, slow parallax, all disabled under `prefers-reduced-motion`.

## Highlights

- **Cinematic 3D scroll hero.** The homepage opens on the brand film edge-to-edge. Scrolling pins the scene and drives a reversible transformation: the film recedes in perspective, scales into a rounded floating card with a soft shadow and a slight tilt, while the stage turns from charcoal through stone to ivory and the copy fades. On phones the landscape film letterboxes into a 4:5 card. `prefers-reduced-motion` gets a static frame.
- **Ten homepage chapters.** Featured collections (three editorial panels), an asymmetric statement gallery, "The Art Beneath Every Thread" film split with statistics, an interactive macro texture with hotspots, a full-width interiors scene with parallax, bespoke service with a booking form, the editorial journal, a testimonial carousel, a gallery strip and the newsletter.
- **Working commerce.** Bag with add / remove / quantity, wishlist, search with keyboard navigation, filters and sorting synced to the URL, quick view, a four-step validated checkout, order confirmation, account area (orders, addresses, profile), toasts, empty states. Cart, wishlist, recently viewed, orders and account persist in `localStorage`.
- **The gallery's own content.** Our Story (four commitments, the silk journey, six weaving cities, how pieces are chosen), services, the private home experience, "A Closer Look" private videos, the Collector's Guide in the Journal, shipping and legal terms under German law, an imprint.
- **Accessibility and SEO.** Semantic HTML, skip link, focus-trapped dialogs, keyboard-navigable search, visible focus rings, alt text, per-page titles, descriptions, Open Graph, canonical links, Store, Product and Article JSON-LD, sitemap and robots.

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run lint
npm run build
npm run preview
```

Regenerate `public/sitemap.xml` after adding products or articles:

```bash
node scripts/sitemap.mjs
```

## Structure

```
public/            video, images, favicon, manifest, robots, sitemap
src/
  components/      header, footer, drawers, modals, cards, primitives
  data/            site facts and services, catalogue, journal and guides
  home/            homepage sections including the scroll hero
  lib/             catalog filtering, formatting, SEO, storage helpers
  pages/           routed pages
  store/           cart / wishlist / orders / UI state (React context)
  styles/          design tokens and primitives
```

Brand facts, services, trust pillars and weaving regions live in `src/data/site.js`; the catalogue in `src/data/products.js`; the Journal and Collector's Guide in `src/data/journal.js`.

## Brand

| Token | Value |
| --- | --- |
| Near-black | `#0B0B0A` |
| Warm Ivory | `#F4F0E8` |
| Antique Gold | `#B18A4A` |
| Deep Walnut | `#2B1D16` |

Headings: Cormorant Garamond. Body: Manrope.

MILAEDIA is a Berlin-based gallery for handmade Persian and Turkish carpets, open by appointment Tuesday to Saturday, 11:00 to 18:00. Brand facts, services, families, testimonials and assurances live in `src/data/site.js`; the catalogue in `src/data/products.js`; the Journal and Collector's Guide in `src/data/journal.js`.
