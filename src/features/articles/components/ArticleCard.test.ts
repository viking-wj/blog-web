import { RouterLinkStub, mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import ArticleCard from './ArticleCard.vue'

describe('ArticleCard', () => {
  it('keeps article navigation and accessible fallback media', () => {
    const wrapper = mount(ArticleCard, {
      props: {
        article: {
          id: 'hello world',
          title: '第一篇文章',
          excerpt: '',
          thumbnailUrl: '',
          publishedAt: '2026-08-13T00:00:00.000Z',
          commentCount: 2,
          author: { id: 'author-1', name: 'W', avatarUrl: '', bio: '' }
        }
      },
      global: {
        stubs: { RouterLink: RouterLinkStub }
      }
    })

    const links = wrapper.findAllComponents(RouterLinkStub)
    expect(links[0].props('to')).toBe('/article/hello%20world')
    expect(links[0].attributes('aria-label')).toBe('阅读《第一篇文章》')
    expect(wrapper.get('.app-image__fallback').attributes('aria-label')).toBe('第一篇文章的封面')
    expect(wrapper.text()).toContain('2 条评论')
    expect(wrapper.text()).toContain('这篇文章暂时没有摘要。')
  })
})
