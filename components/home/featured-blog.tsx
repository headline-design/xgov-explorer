import Link from "next/link"
import { Calendar, ArrowRight, Tag } from "lucide-react"
import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { OgImage } from "@/components/blog/og-image"
import Author from "@/components/blog/author"
import prisma from "@/lib/prisma"

export async function FeaturedBlog() {
    // Fetch the featured article from the database
    const featuredArticle = await prisma.article.findFirst({
        where: {
            featured: true,
            publishedAt: {
                not: null,
            },
        },
        orderBy: {
            publishedAt: "desc",
        },
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

    // If no featured article, try to get the latest one
    if (!featuredArticle) {
        return null
    }

    return (
        <section className="py-16 bg-muted/30">
            <div className="container">
                <div className="flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                    <div className="w-full md:w-1/2 overflow-hidden rounded-xl">
                        <Link href={`/blog/${featuredArticle.slug}`} className="block overflow-hidden">
                            <OgImage
                                title={featuredArticle.title}
                                description={featuredArticle.description}
                                fallbackImage={featuredArticle.coverImage || "/placeholder.svg?height=600&width=800"}
                                width={800}
                                height={600}
                                className="w-full aspect-[4/3] object-cover transition-transform duration-300 hover:scale-105"
                                alt={featuredArticle.title}
                            />
                        </Link>
                    </div>

                    <div className="w-full md:w-1/2 space-y-4">
                        <div className="space-y-2">
                            <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                <time dateTime={featuredArticle.publishedAt?.toISOString() || ""}>
                                    <div className="flex items-center">
                                        <Calendar className="mr-1 h-4 w-4" />
                                        {featuredArticle.publishedAt ? formatDate(featuredArticle.publishedAt.toISOString()) : "Draft"}
                                    </div>
                                </time>
                                {featuredArticle.tags && featuredArticle.tags.length > 0 && (
                                    <Link href={`/blog?tag=${featuredArticle.tags[0]}`}>
                                        <Badge className="px-2 py-1">
                                            <Tag className="mr-1 h-3 w-3" />
                                            {featuredArticle.tags[0]}
                                        </Badge>
                                    </Link>
                                )}
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight lg:text-4xl">
                                <Link href={`/blog/${featuredArticle.slug}`} className="hover:text-primary transition-colors">
                                    {featuredArticle.title}
                                </Link>
                            </h2>
                        </div>

                        <p className="text-muted-foreground text-lg">{featuredArticle.description}</p>

                        <div className="pt-4">
                            {featuredArticle.author && (
                                <Author
                                    username={featuredArticle.author.username || featuredArticle.author.id}
                                    size="md"
                                    showSocial={false}
                                />
                            )}
                        </div>

                        <div className="pt-2">
                            <Link href={`/blog/${featuredArticle.slug}`}>
                                <Button className="group">
                                    Read article
                                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

