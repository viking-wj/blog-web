import { request } from '@/shared/api/http'
import type { ArticleComment } from '@/features/comments/model/types'
import type { ArticleDetail, ArticleFilters, ArticleSummary, Author } from '../model/types'

type UnknownRecord = Record<string, unknown>

function asRecord(value: unknown): UnknownRecord {
  return value && typeof value === 'object' ? (value as UnknownRecord) : {}
}

function asString(value: unknown, fallback = ''): string {
  return typeof value === 'string' ? value : value == null ? fallback : String(value)
}

function asNumber(value: unknown): number {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : 0
}

function mapAuthor(value: unknown): Author {
  const author = asRecord(value)
  return {
    id: asString(author.id),
    name: asString(author.name, '匿名作者'),
    avatarUrl: asString(author.avatarUrl || author.avatar),
    bio: asString(author.bio || author.description)
  }
}

function mapComment(value: unknown, index: number): ArticleComment {
  const comment = asRecord(value)
  const user = asRecord(comment.author || comment.user)
  const images = Array.isArray(comment.imageUrls || comment.images)
    ? ((comment.imageUrls || comment.images) as unknown[])
    : []

  return {
    id: asString(comment.id, `comment-${index}`),
    author: {
      name: asString(user.name, '访客'),
      avatarUrl: asString(user.avatarUrl || user.avatar),
      role: asString(user.role)
    },
    createdAt: asString(comment.createdAt || comment.createTime),
    content: asString(comment.content || comment.context),
    imageUrls: images.map((image) => asString(image)).filter(Boolean)
  }
}

function mapSummary(value: unknown): ArticleSummary {
  const article = asRecord(value)
  return {
    id: asString(article.id),
    title: asString(article.title, '未命名文章'),
    excerpt: asString(article.excerpt || article.summary || article.context),
    thumbnailUrl: asString(article.thumbnailUrl || article.thumbnail),
    publishedAt: asString(article.publishedAt || article.releaseTime),
    commentCount: asNumber(article.commentCount),
    author: mapAuthor(article.author)
  }
}

export async function getArticles(filters: ArticleFilters = {}): Promise<ArticleSummary[]> {
  const form = new URLSearchParams({
    title: filters.title || '',
    categoryId: filters.categoryId || '',
    author: filters.author || ''
  })
  const payload = await request<unknown[]>({
    url: '/article',
    method: 'POST',
    data: form,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })

  return Array.isArray(payload) ? payload.map(mapSummary) : []
}

export async function getArticle(id: string): Promise<ArticleDetail> {
  const payload = await request<unknown>({
    url: `/article/${encodeURIComponent(id)}`,
    method: 'GET'
  })
  const raw = asRecord(payload)
  const summary = mapSummary(raw)
  const comments = Array.isArray(raw.comments) ? raw.comments.map(mapComment) : []

  return {
    ...summary,
    markdown: asString(raw.markdown || raw.context),
    sourceUrl: asString(raw.sourceUrl || raw.sourceLink),
    comments
  }
}
