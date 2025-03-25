import Link from "next/link"
import { Calendar, ArrowRight, Tag } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { OgImage } from "@/components/blog/og-image"
import Author from "@/components/blog/author"
import prisma from "@/lib/prisma"
import ButtonLink from "../ui/button-link"

interface LatestBlogsProps {
  limit?: number
  showViewAll?: boolean
  title?: string
  subtitle?: string
}

export async function LatestBlogs({
  limit = 3,
  showViewAll = true,
  title = "Latest Articles",
  subtitle = "Stay updated with our latest insights and news",
}: LatestBlogsProps) {
  // Fetch latest articles from the database
  const articles = await prisma.article.findMany({
    where: {
      publishedAt: {
        not: null,
      },
    },
    orderBy: {
      publishedAt: "desc",
    },
    take: limit,
    include: {
      author: {
        select: {
          id: true,
          name: true,
          image: true,
          username: true,
        },
      },
      _count: {
        select: {
          votes: true,
          comments: true,
        },
      },
    },
  })

  if (articles.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-background">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-bold tracking-tight mb-3">{title}</h2>
            <p className="text-muted-foreground text-lg">{subtitle}</p>
          </div>
          {showViewAll && (
            <ButtonLink text="View all articles" href="/blog" variant="outline" className="group mt-4 md:mt-0" suffix={<ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />} />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Card key={article.id} className="overflow-hidden h-full flex flex-col group">
              <Link href={`/blog/${article.slug}`} className="overflow-hidden">
                <div className="aspect-video relative overflow-hidden">
                  <OgImage
                    title={article.title}
                    description={article.description}
                    fallbackImage={article.coverImage || "/placeholder.svg?height=400&width=600"}
                    width={600}
                    height={340}
                    className="h-full w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                    alt={article.title}
                  />
                </div>
              </Link>
              <CardContent className="flex flex-col flex-1 p-5">
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <time dateTime={article.publishedAt?.toISOString() || ""}>
                    <div className="flex items-center">
                      <Calendar className="mr-1 h-3 w-3" />
                      {article.publishedAt ? formatDate(article.publishedAt.toISOString()) : "Draft"}
                    </div>
                  </time>
                  {article.tags && article.tags.length > 0 && (
                    <>
                      <span>•</span>
                      <Link href={`/blog?tag=${article.tags[0]}`}>
                        <Badge variant="secondary" className="px-1 py-0 text-xs">
                          <Tag className="mr-1 h-3 w-3" />
                          {article.tags[0]}
                        </Badge>
                      </Link>
                    </>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                  <Link href={`/blog/${article.slug}`}>{article.title}</Link>
                </h3>
                <p className="line-clamp-3 text-sm text-muted-foreground mb-4">{article.description}</p>
                <div className="mt-auto flex items-center justify-between">
                  <Link href={`/blog/${article.slug}`} className="text-sm font-medium text-primary hover:underline">
                    Read more
                  </Link>
                  {article.author && (
                    <Author
                      username={article.author.username || article.author.id}
                      imageOnly
                      size="sm"
                    />
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

