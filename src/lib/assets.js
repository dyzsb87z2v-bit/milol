// Every static asset is referenced through this helper so the site works
// both at the domain root and under a sub-path such as GitHub Pages.
const base = import.meta.env.BASE_URL.replace(/\/$/, '')
export const asset = (path) => `${base}${path}`
