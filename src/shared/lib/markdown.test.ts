import { describe, expect, it } from 'vitest'
import { renderMarkdown } from './markdown'

describe('renderMarkdown', () => {
  it('removes executable tags and inline event handlers', () => {
    const html = renderMarkdown('<script>alert(1)</script><img src="https://example.com/a.png" onerror="alert(1)">')

    expect(html).not.toContain('<script')
    expect(html).not.toContain('onerror')
    expect(html).toContain('loading="lazy"')
  })

  it('removes dangerous URL schemes', () => {
    const html = renderMarkdown('[危险链接](javascript:alert(1))')

    expect(html).not.toContain('javascript:')
  })

  it('protects external links opened in a new tab', () => {
    const html = renderMarkdown('[安全链接](https://example.com)')

    expect(html).toContain('target="_blank"')
    expect(html).toContain('rel="noopener noreferrer"')
  })

  it('escapes unknown code languages instead of treating code as HTML', () => {
    const html = renderMarkdown('```unknown\n<img src=x onerror=alert(1)>\n```')

    expect(html).toContain('&lt;img')
    expect(html).not.toContain('<img src="x"')
  })
})
