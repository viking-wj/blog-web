import { expect, test, type Page } from '@playwright/test'

const article = {
  id: 'article-1',
  title: '端到端测试文章',
  context: '这是一篇用于验证关键阅读流程的文章。',
  thumbnail: '',
  releaseTime: '2026-08-13T00:00:00.000Z',
  commentCount: 0,
  author: {
    id: 'author-1',
    name: 'W',
    avatar: '',
    description: '持续记录与分享。'
  }
}

async function mockArticleApi(page: Page): Promise<void> {
  await page.route('**/api/article', async (route) => {
    if (route.request().method() !== 'POST') return route.fallback()
    await route.fulfill({ json: { code: 200, message: 'ok', data: [article] } })
  })

  await page.route('**/api/article/article-1', async (route) => {
    await route.fulfill({
      json: {
        code: 200,
        message: 'ok',
        data: {
          ...article,
          context: '# 文章正文\n\n端到端流程验证成功。',
          comments: []
        }
      }
    })
  })
}

test('reads an article and submits a local comment', async ({ page }) => {
  await mockArticleApi(page)
  await page.goto('/')

  await expect(page.getByRole('heading', { name: article.title })).toBeVisible()
  await page.getByRole('link', { name: article.title, exact: true }).click()

  await expect(page).toHaveURL(/\/article\/article-1$/)
  await expect(page.getByRole('heading', { level: 1, name: article.title })).toBeVisible()
  await expect(page.getByText('端到端流程验证成功。')).toBeVisible()

  await page.locator('#comment-content').fill('端到端评论')
  await page.locator('#comment-name').fill('测试读者')
  await page.locator('#comment-email').fill('reader@example.com')
  await page.locator('button[type="submit"]').click()

  await expect(page.getByRole('status')).toBeVisible()
  await expect(page.getByText('端到端评论')).toBeVisible()
})

test('shows a route-level not-found state', async ({ page }) => {
  await page.goto('/missing-page')

  await expect(page.locator('#main-content')).toBeFocused()
  await expect(page.locator('.state-panel')).toBeVisible()
  await expect(page.locator('.state-panel button')).toBeVisible()
})

test('shows a recoverable state when the article list API fails', async ({ page }) => {
  await page.route('**/api/article', async (route) => {
    await route.fulfill({ status: 500, json: { message: '测试服务异常' } })
  })
  await page.goto('/')

  const errorState = page.locator('.state-panel[aria-live="assertive"]')
  await expect(errorState).toBeVisible()
  await expect(errorState).toContainText('测试服务异常')
  await expect(errorState.locator('button')).toBeVisible()
})
