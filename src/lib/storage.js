// Small, defensive wrappers around localStorage. Every read and write is
// guarded: private windows and some embedded contexts throw on access.
const PREFIX = 'milaedia:'

export function load(key, fallback) {
  try {
    const raw = window.localStorage.getItem(PREFIX + key)
    return raw == null ? fallback : JSON.parse(raw)
  } catch {
    return fallback
  }
}

export function save(key, value) {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value))
  } catch {
    /* storage unavailable — state simply lives for the session */
  }
}
