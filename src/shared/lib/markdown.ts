import { marked } from 'marked'
import { markedHighlight } from 'marked-highlight'
import hljs from 'highlight.js/lib/core'
import bash from 'highlight.js/lib/languages/bash'
import css from 'highlight.js/lib/languages/css'
import javascript from 'highlight.js/lib/languages/javascript'
import json from 'highlight.js/lib/languages/json'
import markdown from 'highlight.js/lib/languages/markdown'
import typescript from 'highlight.js/lib/languages/typescript'
import xml from 'highlight.js/lib/languages/xml'

hljs.registerLanguage('bash', bash)
hljs.registerLanguage('css', css)
hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('json', json)
hljs.registerLanguage('markdown', markdown)
hljs.registerLanguage('typescript', typescript)
hljs.registerLanguage('xml', xml)

marked.use(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, language) {
      return language && hljs.getLanguage(language) ? hljs.highlight(code, { language }).value : escapeHtml(code)
    }
  })
)

const ALLOWED_TAGS = new Set([
  'A',
  'BLOCKQUOTE',
  'BR',
  'CODE',
  'DEL',
  'EM',
  'H1',
  'H2',
  'H3',
  'H4',
  'H5',
  'H6',
  'HR',
  'IMG',
  'LI',
  'OL',
  'P',
  'PRE',
  'SPAN',
  'STRONG',
  'TABLE',
  'TBODY',
  'TD',
  'TH',
  'THEAD',
  'TR',
  'UL'
])
const DROP_CONTENT_TAGS = new Set(['IFRAME', 'NOSCRIPT', 'OBJECT', 'SCRIPT', 'STYLE', 'TEMPLATE'])
const GLOBAL_ATTRIBUTES = new Set(['class', 'title'])
const TAG_ATTRIBUTES: Record<string, Set<string>> = {
  A: new Set(['href']),
  IMG: new Set(['alt', 'height', 'src', 'width'])
}

function escapeHtml(value: string): string {
  return value.replace(
    /[&<>"']/g,
    (character) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
      }[character] || character)
  )
}

function isSafeUrl(value: string, attributeName: string): boolean {
  const trimmed = value.trim()
  if (!trimmed) return false
  if (attributeName === 'src' && /^data:image\/(?:gif|jpe?g|png|webp);base64,/i.test(trimmed)) return true

  try {
    const url = new URL(trimmed, window.location.origin)
    return ['http:', 'https:', 'mailto:', 'tel:'].includes(url.protocol)
  } catch {
    return false
  }
}

function sanitizeElement(element: Element): void {
  for (const child of Array.from(element.children)) sanitizeElement(child)

  if (DROP_CONTENT_TAGS.has(element.tagName)) {
    element.remove()
    return
  }

  if (!ALLOWED_TAGS.has(element.tagName)) {
    element.replaceWith(...Array.from(element.childNodes))
    return
  }

  for (const attribute of Array.from(element.attributes)) {
    const allowed = GLOBAL_ATTRIBUTES.has(attribute.name) || TAG_ATTRIBUTES[element.tagName]?.has(attribute.name)
    const safeUrl = !['href', 'src'].includes(attribute.name) || isSafeUrl(attribute.value, attribute.name)
    if (!allowed || !safeUrl) element.removeAttribute(attribute.name)
  }

  if (element.tagName === 'A' && element.hasAttribute('href')) {
    element.setAttribute('rel', 'noopener noreferrer')
    element.setAttribute('target', '_blank')
  }

  if (element.tagName === 'IMG') {
    element.setAttribute('loading', 'lazy')
    element.setAttribute('decoding', 'async')
    if (!element.hasAttribute('alt')) element.setAttribute('alt', '')
  }
}

export function renderMarkdown(markdownSource: string): string {
  const parsed = marked.parse(markdownSource || '', { async: false }) as string
  const document = new DOMParser().parseFromString(`<main>${parsed}</main>`, 'text/html')
  const root = document.body.firstElementChild

  if (!root) return ''
  for (const element of Array.from(root.children)) sanitizeElement(element)
  return root.innerHTML
}
