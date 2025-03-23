import Link from "next/link"
import Image from "next/image"
import { allBlogs } from "contentlayer/generated"
import { compareDesc } from "date-fns"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

export const metadata = {
  title: "Blog | xGov Explorer",
  description: "Read the latest news and updates from the xGov Explorer team",
}

export default async function BlogPage() {
  const posts = allBlogs
    .filter((post) => post.published !== false)
    .sort((a, b) => {
      return compareDesc(new Date(a.date), new Date(b.date))
    })

  return (
    <div className="container py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">The latest news and updates from the xGov Explorer team</p>
        </div>
      </div>
      <hr className="my-8" />
      {posts?.length ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article key={post.slug} className="group relative flex flex-col space-y-2">
              {post.image && (
                <Link
                  href={`/blog${post.slug}`}
                  className="overflow-hidden rounded-md border bg-muted transition-colors"
                >
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    width={800}
                    height={450}
                    className="h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              )}
              <div className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span>•</span>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
              <h2 className="text-xl font-semibold leading-tight">
                <Link href={`/blog${post.slug}`} className="hover:underline">
                  {post.title}
                </Link>
              </h2>
              <p className="line-clamp-3 text-muted-foreground">{post.description}</p>
              {post.author && (
                <div className="flex items-center space-x-2 text-sm">
                  {post.authorImage && (
                    <Image
                      src={post.authorImage || "/placeholder.svg"}
                      alt={post.author}
                      width={24}
                      height={24}
                      className="rounded-full"
                    />
                  )}
                  <span>{post.author}</span>
                </div>
              )}
            </article>
          ))}
        </div>
      ) : (
        <p>No posts published.</p>
      )}
    </div>
  )
}

