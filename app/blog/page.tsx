"use client"

import Link from "next/link"
import { allBlogs } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useCurrentTheme } from "@/lib/hooks/use-theme"
import { useEffect, useState } from "react"
import ImageV2 from "@/components/ui/image-v2"

export default function BlogPage() {
  const currentTheme = useCurrentTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const posts = allBlogs
    .filter((post) => post.published !== false)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  // Get the appropriate placeholder based on theme
  const placeholderUrl = mounted && currentTheme === 'dark'
    ? '/placeholder-dark.svg'
    : '/placeholder-light.svg'

  return (
    <div className="container py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">Read the latest news and updates from the xGov Explorer team</p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            // Generate theme-aware OG image URL
            const imageUrl = post.useOgImage
              ? `/api/og?title=${encodeURIComponent(post.title)}&summary=${encodeURIComponent(post.description || "")}&theme=${currentTheme}`
              : post.image || placeholderUrl

            return (
              <article key={post.slug} className="group relative flex flex-col space-y-2">
                <Link
                  href={`${post.slug}`}
                  className="overflow-hidden rounded-md border bg-muted transition-colors"
                >
                  <ImageV2
                    src={imageUrl}
                    alt={post.title}
                    width={804}
                    height={452}
                    className="h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  />
                </Link>
                <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>•</span>
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="px-1 py-0 text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <h2 className="text-2xl font-bold" data-id={post.slug}>
                  <Link href={`${post.slug}`} className="transition-colors hover:text-foreground/80">
                    {post.title}
                  </Link>
                </h2>
                {post.description && <p className="text-muted-foreground">{post.description}</p>}
                {post.author && (
                  <div className="flex items-center gap-3">
                    {post.authorImage && (
                      <ImageV2
                        src={`/api/www/avatar/${post.author}`}
                        alt={post.author}
                        width={42}
                        height={42}
                        className="rounded-full overflow-hidden"
                      />
                    )}
                    <div className="text-sm">
                      <p className="font-medium">{post.author}</p>
                    </div>
                  </div>
                )}
              </article>
            )
          })}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}


