import { beforeEach, describe, expect, it, vi } from 'vitest'
import { request } from '@/shared/api/http'
import { getArticle, getArticles } from './articles'

vi.mock('@/shared/api/http', () => ({
  request: vi.fn()
}))

const requestMock = vi.mocked(request)

describe('articles API adapter', () => {
  beforeEach(() => {
    requestMock.mockReset()
  })

  it('sends filters using the backend form contract and maps summaries', async () => {
    requestMock.mockResolvedValue([
      {
        id: 7,
        title: '测试文章',
        context: '# 正文',
        releaseTime: '2026-08-12',
        commentCount: '3',
        author: { id: 2, name: 'W', avatar: '/avatar.png' }
      }
    ])

    const articles = await getArticles({ title: '测试', categoryId: '1', author: 'W' })
    const config = requestMock.mock.calls[0][0]

    expect(config.url).toBe('/article')
    expect(config.data).toBeInstanceOf(URLSearchParams)
    expect((config.data as URLSearchParams).toString()).toBe('title=%E6%B5%8B%E8%AF%95&categoryId=1&author=W')
    expect(articles[0]).toMatchObject({ id: '7', commentCount: 3, author: { name: 'W' } })
  })

  it('maps the legacy detail response into the frontend domain model', async () => {
    requestMock.mockResolvedValue({
      id: '9',
      title: '详情',
      context: '**内容**',
      sourceLink: 'https://example.com',
      author: { name: '作者', description: '简介' },
      comments: [{ id: 1, context: '评论', createTime: '2026-08-12', user: { name: '访客' } }]
    })

    const article = await getArticle('9')

    expect(requestMock).toHaveBeenCalledWith({ url: '/article/9', method: 'GET' })
    expect(article).toMatchObject({
      markdown: '**内容**',
      sourceUrl: 'https://example.com',
      author: { name: '作者', bio: '简介' }
    })
    expect(article.comments[0]).toMatchObject({ content: '评论', author: { name: '访客' } })
  })
})
