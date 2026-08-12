import type { ArticleComment } from '@/features/comments/model/types'

export interface Author {
  id: string
  name: string
  avatarUrl: string
  bio: string
}

export interface ArticleSummary {
  id: string
  title: string
  excerpt: string
  thumbnailUrl: string
  publishedAt: string
  commentCount: number
  author: Author
}

export interface ArticleDetail extends ArticleSummary {
  markdown: string
  sourceUrl: string
  comments: ArticleComment[]
}

export interface ArticleFilters {
  title?: string
  categoryId?: string
  userId?: string
}
