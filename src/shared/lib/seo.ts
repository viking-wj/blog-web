export interface SeoMetadata {
  title: string
  description: string
  path?: string
  imageUrl?: string
  type?: 'website' | 'article'
}

function setMeta(selector: string, attribute: 'name' | 'property', key: string, content: string): void {
  let element = document.head.querySelector<HTMLMetaElement>(selector)
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.content = content
}

function setCanonical(url: string): void {
  let element = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!element) {
    element = document.createElement('link')
    element.rel = 'canonical'
    document.head.appendChild(element)
  }
  element.href = url
}

function absoluteUrl(value: string, siteUrl: string): string {
  if (!value) return ''
  try {
    return new URL(value, siteUrl).toString()
  } catch {
    return ''
  }
}

export function updateSeo(metadata: SeoMetadata, options: { appTitle: string; siteUrl: string }): void {
  const pageTitle = metadata.title === options.appTitle ? metadata.title : `${metadata.title} · ${options.appTitle}`
  const canonical = absoluteUrl(metadata.path || window.location.pathname, options.siteUrl)
  const imageUrl = absoluteUrl(metadata.imageUrl || '', options.siteUrl)

  document.title = pageTitle
  setMeta('meta[name="description"]', 'name', 'description', metadata.description)
  setMeta('meta[property="og:title"]', 'property', 'og:title', pageTitle)
  setMeta('meta[property="og:description"]', 'property', 'og:description', metadata.description)
  setMeta('meta[property="og:type"]', 'property', 'og:type', metadata.type || 'website')
  setMeta('meta[property="og:url"]', 'property', 'og:url', canonical)
  setMeta('meta[name="twitter:card"]', 'name', 'twitter:card', imageUrl ? 'summary_large_image' : 'summary')
  setMeta('meta[name="twitter:title"]', 'name', 'twitter:title', pageTitle)
  setMeta('meta[name="twitter:description"]', 'name', 'twitter:description', metadata.description)
  setCanonical(canonical)

  if (imageUrl) {
    setMeta('meta[property="og:image"]', 'property', 'og:image', imageUrl)
    setMeta('meta[name="twitter:image"]', 'name', 'twitter:image', imageUrl)
  } else {
    document.head.querySelector('meta[property="og:image"]')?.remove()
    document.head.querySelector('meta[name="twitter:image"]')?.remove()
  }
}
