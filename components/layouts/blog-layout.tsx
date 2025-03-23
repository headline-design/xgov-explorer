"use client"

import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { useEffect, useState } from "react"

import type { Blog } from "contentlayer/generated"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Mdx } from "../docs/mdx-components"
import { useCurrentTheme } from "@/lib/hooks/use-theme"
import ImageV2 from "../ui/image-v2"

interface BlogLayoutProps {
  post: Blog
  related?: Blog[]
}

export function BlogLayout({ post, related }: BlogLayoutProps) {
  if (!post) {
    notFound()
  }

  const currentTheme = useCurrentTheme()
  const [mounted, setMounted] = useState(false)
  const [imageError, setImageError] = useState(false)

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  // Generate theme-aware OG image URL
  const getOgImageUrl = (blogPost: Blog) => {
    if (!blogPost.useOgImage || !mounted) return null

    try {
      const title = encodeURIComponent(blogPost.title || "")
      const summary = encodeURIComponent(blogPost.description || "")
      return `/api/og?title=${title}&summary=${summary}&theme=${currentTheme}`
    } catch (error) {
      console.error("Error generating OG image URL:", error)
      return null
    }
  }

  // Get the appropriate placeholder based on theme
  const placeholderUrl = mounted && currentTheme === "dark" ? "/placeholder-dark.svg" : "/placeholder-light.svg"

  // Use static image during SSR, or fallback to placeholder if OG image fails
  const ogImageUrl = getOgImageUrl(post)
  const staticImageUrl = post.image
  const imageUrl = imageError || !ogImageUrl ? staticImageUrl || placeholderUrl : ogImageUrl

  return (
    <div className="container relative max-w-4xl py-6 lg:py-10">
      <Link
        href="/blog"
        className={cn(buttonVariants({ variant: "ghost" }), "absolute left-[-200px] top-14 hidden xl:inline-flex")}
      >
        <ChevronLeft className="mr-2 h-4 w-4" />
        See all posts
      </Link>
      <div className="hidden items-start md:flex">
        <Link href="/blog" className={cn(buttonVariants({ variant: "ghost" }), "md:inline-flex")}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          See all posts
        </Link>
      </div>
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>•</span>
          <div className="flex items-center gap-1">
            {post.tags?.map((tag) => (
              <Badge key={tag} variant="secondary" className="mr-1">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <h1 className="inline-block text-4xl font-bold leading-tight lg:text-5xl">{post.title}</h1>
        {post.description && <p className="text-xl text-muted-foreground">{post.description}</p>}
      </div>
      <div className="my-8 overflow-hidden rounded-lg border">
        <ImageV2
          src={imageUrl}
          alt={post.title}
          width={1200}
          height={630}
          className="aspect-video object-cover"
          priority={true}
        />
      </div>
      {post.author && (
        <div className="flex items-center space-x-4 py-4">
          {post.authorImage ? (
            <Image
              src={`/api/www/avatar/${post.author}`} // Assuming authorImage is a path to the image
              alt={post.author}
              width={40}
              height={40}
              className="rounded-full"
              onError={(e) => {
                // Fallback to initial if author image fails to load
                e.currentTarget.style.display = "none"
              }}
            />
          ) : (
            <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
              {post.author.charAt(0)}
            </div>
          )}
          <div className="text-sm">
            <p className="font-medium">{post.author}</p>
            <p className="text-muted-foreground">Author</p>
          </div>
        </div>
      )}
      <div className="prose prose-lg max-w-none dark:prose-invert">
        <Mdx code={post.body.code} />
      </div>
      {related && related.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-4 text-2xl font-bold">Related Posts</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {related.map((relatedPost) => {
              // For related posts, just use static image or placeholder to avoid multiple OG image requests
              const relatedImageUrl = relatedPost.image || placeholderUrl

              return (
                <Link
                  key={relatedPost.slug}
                  href={`/blog${relatedPost.slug}`}
                  className="group rounded-lg border p-4 transition-colors hover:border-foreground"
                >
                  <div className="mb-3 overflow-hidden rounded-lg">
                    <Image
                      src={relatedImageUrl || "/placeholder.svg"}
                      alt={relatedPost.title}
                      width={600}
                      height={340}
                      className="aspect-video object-cover transition-transform group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to placeholder if image fails to load
                        e.currentTarget.src = placeholderUrl
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-medium group-hover:underline">{relatedPost.title}</h3>
                  <p className="line-clamp-2 text-sm text-muted-foreground">{relatedPost.description}</p>
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

