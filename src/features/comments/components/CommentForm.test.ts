import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import CommentForm from './CommentForm.vue'

describe('CommentForm', () => {
  it('shows inline validation errors and focuses the first invalid field', async () => {
    const wrapper = mount(CommentForm, { attachTo: document.body })

    await wrapper.get('form').trigger('submit')

    expect(wrapper.text()).toContain('请填写评论内容。')
    expect(wrapper.text()).toContain('请填写昵称。')
    expect(wrapper.text()).toContain('请输入有效的邮箱地址。')
    expect(document.activeElement?.id).toBe('comment-content')
    expect(wrapper.emitted('submit')).toBeUndefined()

    wrapper.unmount()
  })

  it('emits a normalized draft and clears the comment after a valid submit', async () => {
    const wrapper = mount(CommentForm)

    await wrapper.get('#comment-content').setValue('写得很好')
    await wrapper.get('#comment-name').setValue('读者')
    await wrapper.get('#comment-email').setValue('reader@example.com')
    await wrapper.get('#comment-website').setValue('https://example.com')
    await wrapper.get('form').trigger('submit')

    expect(wrapper.emitted('submit')?.[0]?.[0]).toEqual({
      content: '写得很好',
      name: '读者',
      email: 'reader@example.com',
      website: 'https://example.com',
      images: []
    })
    expect((wrapper.get('#comment-content').element as HTMLTextAreaElement).value).toBe('')
  })
})
