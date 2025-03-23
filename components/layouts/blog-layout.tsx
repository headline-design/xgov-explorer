import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"

import type { Blog } from "contentlayer/generated"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { formatDate } from "@/lib/utils"
import { Mdx } from "../docs/mdx-components"

interface BlogLayoutProps {
  post: Blog
  related?: Blog[]
}

export function BlogLayout({ post, related }: BlogLayoutProps) {
  if (!post) {
    notFound()
  }

  // Use the computed ogImage field or fall back to the static image
  const imageUrl = post.ogImage || post.image || "/placeholder.svg"

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
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={post.title}
          width={1200}
          height={630}
          className="aspect-video object-cover"
          priority={true}
        />
      </div>
      {post.author && (
        <div className="flex items-center space-x-4 py-4">
          {post.authorImage && (
            <Image
              src={post.authorImage || "/placeholder.svg"}
              alt={post.author}
              width={40}
              height={40}
              className="rounded-full"
            />
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
            {related.map((relatedPost) => (
              <Link
                key={relatedPost.slug}
                href={`/blog${relatedPost.slug}`}
                className="group rounded-lg border p-4 transition-colors hover:border-foreground"
              >
                <div className="mb-3 overflow-hidden rounded-lg">
                  <Image
                    src={relatedPost.ogImage || relatedPost.image || "/placeholder.svg"}
                    alt={relatedPost.title}
                    width={600}
                    height={340}
                    className="aspect-video object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium group-hover:underline">{relatedPost.title}</h3>
                <p className="line-clamp-2 text-sm text-muted-foreground">{relatedPost.description}</p>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

