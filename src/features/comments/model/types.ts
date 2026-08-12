export interface CommentAuthor {
  name: string
  avatarUrl: string
  role?: string
}

export interface ArticleComment {
  id: string
  author: CommentAuthor
  createdAt: string
  content: string
  imageUrls: string[]
}

export interface CommentDraft {
  content: string
  name: string
  email: string
  website: string
  images: File[]
}
