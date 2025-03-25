import type { ArticleComment, User } from "@prisma/client"

export interface CommentWithUser extends ArticleComment {
  user: Pick<User, "id" | "name" | "image">
  _count: {
    replies: number
  }
  replies?: CommentWithUser[]
}

export interface ExtendedArticle {
  id: string
  slug: string
  title: string
  description: string
  content: string
  coverImage?: string | null
  publishedAt: Date | null
  featured: boolean
  viewCount: number
  author: string
  _count: {
    votes: number
    comments: number
    bookmarks: number
  }
  comments: CommentWithUser[]
  votes?: any[]
  bookmarks?: any[]
  // Social data for the UI
  likes: number
  commentsCount: number
  isBookmarked: boolean
  hasLiked: boolean
}

