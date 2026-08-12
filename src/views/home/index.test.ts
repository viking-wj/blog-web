import { mount } from '@vue/test-utils'
import { describe, expect, it, vi } from 'vitest'
import HomeView from './index.vue'

vi.mock('@/features/articles/composables/useArticleList', async () => {
  const { ref } = await import('vue')

  return {
    useArticleList: () => ({
      articles: ref([]),
      loading: ref(false),
      error: ref(''),
      load: vi.fn()
    })
  }
})

describe('HomeView', () => {
  it('renders the primary call to action as an in-page link', () => {
    const wrapper = mount(HomeView)
    const callToAction = wrapper.get('a[href="#latest-articles"]')

    expect(callToAction.text()).toContain('开始阅读')
  })
})
