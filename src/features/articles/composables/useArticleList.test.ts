import { defineComponent, nextTick } from 'vue'
import { flushPromises, mount } from '@vue/test-utils'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { getArticles } from '../api/articles'
import { useArticleList } from './useArticleList'

vi.mock('../api/articles', () => ({
  getArticles: vi.fn()
}))

const getArticlesMock = vi.mocked(getArticles)
const TestHost = defineComponent({
  setup() {
    return useArticleList()
  },
  template: '<div>{{ loading }}|{{ error }}|{{ articles.length }}</div>'
})

describe('useArticleList', () => {
  beforeEach(() => {
    getArticlesMock.mockReset()
  })

  it('loads article data on mount', async () => {
    getArticlesMock.mockResolvedValue([
      {
        id: '1',
        title: '文章',
        excerpt: '摘要',
        thumbnailUrl: '',
        publishedAt: '',
        commentCount: 0,
        author: { id: '1', name: 'W', avatarUrl: '', bio: '' }
      }
    ])

    const wrapper = mount(TestHost)
    await flushPromises()

    expect(wrapper.text()).toBe('false||1')
  })

  it('exposes a recoverable error state', async () => {
    getArticlesMock.mockRejectedValueOnce(new Error('服务不可用')).mockResolvedValueOnce([])
    const wrapper = mount(TestHost)
    await flushPromises()

    expect(wrapper.text()).toBe('false|服务不可用|0')
    await (wrapper.vm as unknown as { load: () => Promise<void> }).load()
    await nextTick()

    expect(wrapper.text()).toBe('false||0')
  })
})
