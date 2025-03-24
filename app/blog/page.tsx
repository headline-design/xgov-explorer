import { Suspense } from "react"
import { allBlogs } from "contentlayer/generated"
import type { Metadata } from "next"
import BlogPageClient from "./client-page"
import prisma from "@/lib/prisma"
import { batchSyncArticles } from "../actions/sync-articles"

export const metadata: Metadata = {
  title: "Blog | xGov Explorer",
  description: "Read the latest news and updates from the xGov Explorer team",
}

// This is a server component that will sync articles before rendering the client component
export default async function BlogPage() {
  // Get all published blogs from Contentlayer
  const publishedBlogs = allBlogs.filter((blog) => blog.published !== false)

  // Sync all published blogs with Prisma
  await batchSyncArticles(
    publishedBlogs.map((blog) => ({
      slug: blog.slug,
      title: blog.title,
      description: blog.description || "",
      content: blog.body.raw,
      publishedAt: new Date(blog.date),
      coverImage: blog.image,
      tags: blog.tags || [],
      featured: blog.featured || false,
      author: blog.author,
    })),
  )

  // Get social data for all articles
  const socialData = await prisma.article.findMany({
    select: {
      slug: true,
      viewCount: true,
      _count: {
        select: {
          votes: true,
          comments: true,
          bookmarks: true,
        },
      },
    },
  })

  // Create a map of social data by slug for easy lookup
  const socialDataMap = Object.fromEntries(socialData.map((data) => [data.slug, data]))

  return (
    <Suspense fallback={<div className="container py-10">Loading blog posts...</div>}>
      <BlogPageClient initialSocialData={socialDataMap} />
    </Suspense>
  )
}

