import { beforeEach, describe, expect, it } from 'vitest'
import { updateSeo } from './seo'

describe('updateSeo', () => {
  beforeEach(() => {
    document.head.innerHTML = '<meta name="description" content="old">'
    window.history.replaceState({}, '', '/article/1')
  })

  it('updates page, canonical and social metadata', () => {
    updateSeo(
      {
        title: '测试文章',
        description: '文章摘要',
        path: '/article/1',
        imageUrl: '/cover.jpg',
        type: 'article'
      },
      { appTitle: 'W 的小站', siteUrl: 'https://blog.example.com' }
    )

    expect(document.title).toBe('测试文章 · W 的小站')
    expect(document.querySelector<HTMLMetaElement>('meta[name="description"]')?.content).toBe('文章摘要')
    expect(document.querySelector<HTMLMetaElement>('meta[property="og:type"]')?.content).toBe('article')
    expect(document.querySelector<HTMLMetaElement>('meta[property="og:image"]')?.content).toBe(
      'https://blog.example.com/cover.jpg'
    )
    expect(document.querySelector<HTMLLinkElement>('link[rel="canonical"]')?.href).toBe(
      'https://blog.example.com/article/1'
    )
  })

  it('removes stale social images on image-less pages', () => {
    document.head.innerHTML += '<meta property="og:image" content="old"><meta name="twitter:image" content="old">'
    updateSeo(
      { title: '页面不存在', description: '地址无效。' },
      { appTitle: 'W 的小站', siteUrl: 'https://blog.example.com' }
    )

    expect(document.querySelector('meta[property="og:image"]')).toBeNull()
    expect(document.querySelector('meta[name="twitter:image"]')).toBeNull()
  })
})
