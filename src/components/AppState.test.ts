import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppState from './AppState.vue'

describe('AppState', () => {
  it('announces errors and emits the recovery action', async () => {
    const wrapper = mount(AppState, {
      props: {
        kind: 'error',
        title: '加载失败',
        message: '请检查网络。',
        actionLabel: '重试'
      }
    })

    expect(wrapper.attributes('aria-live')).toBe('assertive')
    expect(wrapper.text()).toContain('请检查网络。')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('action')).toHaveLength(1)
  })

  it('marks loading states as busy', () => {
    const wrapper = mount(AppState, {
      props: {
        kind: 'loading',
        title: '加载中',
        message: '请稍候。'
      }
    })

    expect(wrapper.attributes('aria-busy')).toBe('true')
    expect(wrapper.find('.spinner').exists()).toBe(true)
  })
})
