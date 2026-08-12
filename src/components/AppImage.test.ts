import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import AppImage from './AppImage.vue'

describe('AppImage', () => {
  it('shows an accessible fallback after an image load error', async () => {
    const wrapper = mount(AppImage, {
      props: { src: '/broken.jpg', alt: '文章封面', width: 720, height: 480 },
      slots: { fallback: 'W' }
    })

    await wrapper.get('img').trigger('error')

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.get('.app-image__fallback').attributes('role')).toBe('img')
    expect(wrapper.get('.app-image__fallback').attributes('aria-label')).toBe('文章封面')
  })

  it('renders the fallback immediately when the source is empty', () => {
    const wrapper = mount(AppImage, {
      props: { alt: '', width: 48, height: 48 },
      slots: { fallback: 'W' }
    })

    expect(wrapper.find('img').exists()).toBe(false)
    expect(wrapper.text()).toBe('W')
  })
})
