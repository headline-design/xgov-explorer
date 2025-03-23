import { notFound } from "next/navigation"
import type { Metadata } from "next"
import { allBlogs } from "contentlayer/generated"

import { BlogLayout } from "@/components/layouts/blog-layout"

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

async function getPostFromParams(params: BlogPostPageProps["params"]) {
  const slug = params.slug
  const post = allBlogs.find((post) => post.slugAsParams === slug)

  if (!post) {
    return null
  }

  return post
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = await getPostFromParams(params)

  if (!post) {
    return {}
  }

  const ogImage = post.ogImage || post.image

  return {
    title: post.title,
    description: post.description,
    openGraph: ogImage
      ? {
          images: [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ],
        }
      : undefined,
  }
}

export async function generateStaticParams(): Promise<BlogPostPageProps["params"][]> {
  return allBlogs
    .filter((post) => post.published !== false)
    .map((post) => ({
      slug: post.slugAsParams,
    }))
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getPostFromParams(params)

  if (!post) {
    notFound()
  }

  // Find related posts (posts with matching tags, excluding current post)
  const relatedPosts = post.tags
    ? allBlogs
        .filter((p) => p.slug !== post.slug && p.published !== false && p.tags?.some((tag) => post.tags?.includes(tag)))
        .slice(0, 3)
    : []

  return <BlogLayout post={post} related={relatedPosts} />
}

