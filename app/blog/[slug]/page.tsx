import { notFound } from "next/navigation"
import { allBlogs } from "contentlayer/generated"
import type { Metadata } from "next"
import { incrementViewCount } from "@/app/actions/article-social-actions"
import prisma from "@/lib/prisma"
import { getSession } from "@/lib/auth"
import { BlogLayout } from "@/components/layouts/blog-layout"
import { ExtendedArticle } from "@/types/blog"
import { syncArticle } from "@/app/actions/article-actions"

export async function generateMetadata({ params }): Promise<Metadata> {
  const awaitedParams = await params
  const slug = awaitedParams.slug
    // Find the post with or without the "blog/" prefix
    const post = allBlogs.find(
      (post) => post.slug === slug)

  if (!post) {
    return {
      title: "Not Found",
      description: "The page you are looking for does not exist.",
    }
  }

  return {
    title: post.title,
    description: post.description || "",
    openGraph: {
      title: post.title,
      description: post.description || "",
      type: "article",
      url: `${process.env.NEXT_PUBLIC_APP_URL}/blog/${params.slug}`,
      images: [
        {
          url: post.image || `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURIComponent(post.title)}`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description || "",
      images: [post.image || `${process.env.NEXT_PUBLIC_APP_URL}/og?title=${encodeURIComponent(post.title)}`],
    },
  }
}

export async function generateStaticParams() {
  return allBlogs.map((post) => ({
    // Remove 'blog/' prefix if it exists
    slug: post.slug.replace(/^blog\//, ""),
  }))
}

export default async function BlogPost({ params }) {
const awaitedParams = await params
const slug = awaitedParams.slug
  // Find the post with or without the "blog/" prefix
  const post = allBlogs.find(
    (post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  // Clean the slug for database operations
  const cleanSlug = post.slug.replace(/^blog\//, "")

  // Check if the article already exists in the database
  const dbArticle = await prisma.article.findUnique({
    where: { slug: cleanSlug },
  })

  let articleId: string

  // Only sync if the article doesn't exist yet
  if (!dbArticle) {
    articleId = await syncArticle({
      slug: cleanSlug,
      title: post.title,
      description: post.description || "",
      content: post.body.raw,
      publishedAt: new Date(post.date),
      coverImage: post.image,
      tags: post.tags || [],
      featured: post.featured || false,
      author: post.author,
    })
  } else {
    articleId = dbArticle.id
  }

  // Get the current user
  const session = await getSession()

  // Get the post with social data from Prisma
  const fullArticle = await prisma.article.findUnique({
    where: { id: articleId },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
      _count: {
        select: {
          votes: { where: { voteType: "UPVOTE" } },
          comments: true,
          bookmarks: true,
        },
      },
      votes: session?.user?.id
        ? {
            where: { userId: session.user.id },
          }
        : undefined,
      comments: {
        include: {
          user: {
            select: {
              id: true,
              name: true,
              image: true,
            },
          },
          replies: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  image: true,
                },
              },
              _count: {
                select: {
                  replies: true,
                },
              },
            },
            orderBy: {
              createdAt: "asc",
            },
          },
          _count: {
            select: {
              replies: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
        where: {
          parentId: null, // Only get top-level comments
        },
      },
      bookmarks: session?.user?.id
        ? {
            where: { userId: session.user.id },
          }
        : undefined,
    },
  })

  if (!fullArticle) {
    notFound()
  }

  // Increment view count (don't await to avoid blocking)
  incrementViewCount(fullArticle.id).catch(console.error)

  // Get related posts
  const relatedPosts = allBlogs
    .filter((p) => p.slug !== post.slug && p.tags?.some((tag) => post.tags?.includes(tag)))
    .slice(0, 3)
    .map((p) => ({
      ...p,
      slug: p.slug.replace(/^blog\//, ""), // Clean the slug for related posts
    }))

  // Prepare social data with proper typing
  const article: ExtendedArticle = {
    ...fullArticle,
    likes: fullArticle._count.votes || 0,
    commentsCount: fullArticle._count.comments || 0,
    isBookmarked: fullArticle.bookmarks && fullArticle.bookmarks.length > 0,
    hasLiked: fullArticle.votes && fullArticle.votes.length > 0,
  }

  return (
    <BlogLayout
      post={{ ...post, slug: cleanSlug }} // Clean the slug in the post object
      article={article}
      related={relatedPosts}
    />
  )
}

