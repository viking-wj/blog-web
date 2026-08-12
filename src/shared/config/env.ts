const DEFAULT_API_BASE_URL = '/api'

function normalizeBaseUrl(value: string): string {
  return value.trim().replace(/\/$/, '')
}

export const env = Object.freeze({
  apiBaseUrl: normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL || DEFAULT_API_BASE_URL),
  appTitle: import.meta.env.VITE_APP_TITLE?.trim() || 'W 的小站',
  siteUrl: normalizeBaseUrl(import.meta.env.VITE_SITE_URL || window.location.origin)
})
