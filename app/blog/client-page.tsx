"use client"

import Link from "next/link"
import { allBlogs } from "contentlayer/generated"
import { compareDesc } from "date-fns"
import { useEffect, useState, useMemo } from "react"
import { Search, Calendar, Clock, Filter, X, Heart, MessageSquare, Eye } from "lucide-react"

import { formatDate } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { useCurrentTheme } from "@/lib/hooks/use-theme"
import ImageV2 from "@/components/ui/image-v2"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Author from "@/components/blog/author"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

interface SocialData {
  viewCount: number
  _count: {
    votes: number
    comments: number
    bookmarks: number
  }
}

interface BlogPageClientProps {
  initialSocialData: Record<string, SocialData>
}

export default function BlogPageClient({ initialSocialData }: BlogPageClientProps) {
  const currentTheme = useCurrentTheme()
  const [mounted, setMounted] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [socialData, setSocialData] = useState<Record<string, SocialData>>(initialSocialData)
  const postsPerPage = 9

  useEffect(() => {
    setMounted(true)
    // Simulate loading delay for skeleton effect
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 800)
    return () => clearTimeout(timer)
  }, [])

  // Get all posts and sort by date
  const allSortedPosts = useMemo(() => {
    return allBlogs
      .filter((post) => post.published !== false)
      .sort((a, b) => {
        return compareDesc(new Date(a.date), new Date(b.date))
      })
  }, [])

  // Extract all unique tags from posts
  const allTags = useMemo(() => {
    const tags = new Set<string>()
    allSortedPosts.forEach((post) => {
      post.tags?.forEach((tag) => tags.add(tag))
    })
    return Array.from(tags).sort()
  }, [allSortedPosts])

  // Filter posts based on search query and selected tags
  const filteredPosts = useMemo(() => {
    return allSortedPosts.filter((post) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.body.raw.toLowerCase().includes(searchQuery.toLowerCase())

      // Tag filter
      const matchesTags = selectedTags.length === 0 || selectedTags.some((tag) => post.tags?.includes(tag))

      return matchesSearch && matchesTags
    })
  }, [allSortedPosts, searchQuery, selectedTags])

  // Get featured posts (first 3 posts or posts marked as featured)
  const featuredPosts = useMemo(() => {
    const featured = allSortedPosts.filter((post) => post.featured)
    return featured.length > 0 ? featured.slice(0, 3) : allSortedPosts.slice(0, 3)
  }, [allSortedPosts])

  // Paginate posts
  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return filteredPosts.slice(startIndex, startIndex + postsPerPage)
  }, [filteredPosts, currentPage])

  // Calculate total pages
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  // Get the appropriate placeholder based on theme
  const placeholderUrl = mounted && currentTheme === "dark" ? "/placeholder-dark.svg" : "/placeholder-light.svg"

  // Generate theme-aware OG image URL with error handling
  const getOgImageUrl = (post) => {
    if (!mounted) return post.image || placeholderUrl

    try {
      const title = encodeURIComponent(post.title || "")
      const summary = encodeURIComponent(post.description || "")
      return post.useOgImage
        ? `/api/og?title=${title}&summary=${summary}&theme=${currentTheme}`
        : post.image || placeholderUrl
    } catch (error) {
      console.error("Error generating OG image URL:", error)
      return post.image || placeholderUrl
    }
  }

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    setSelectedTags((prev) => (prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]))
    setCurrentPage(1) // Reset to first page when filter changes
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setCurrentPage(1)
  }

  // Calculate reading time
  const getReadingTime = (content: string) => {
    const wordsPerMinute = 200
    const words = content.split(/\s+/).length
    return Math.ceil(words / wordsPerMinute)
  }

  // Format numbers for display (e.g., 1.2K, 3.5M)
  const formatNumber = (num: number) => {
    if (!num) return "0"
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }

  // Get social data for a post
  const getPostSocialData = (slug: string) => {
    return socialData[slug] || { viewCount: 0, _count: { votes: 0, comments: 0, bookmarks: 0 } }
  }

  return (
    <div className="container py-6 lg:py-10">
      <div className="flex flex-col items-start gap-4 md:flex-row md:justify-between md:gap-8">
        <div className="flex-1 space-y-4">
          <h1 className="inline-block text-4xl font-bold tracking-tight lg:text-5xl">Blog</h1>
          <p className="text-xl text-muted-foreground">Read the latest news and updates from the xGov Explorer team</p>
        </div>
      </div>

      {/* Featured posts section */}
      {currentPage === 1 && selectedTags.length === 0 && searchQuery === "" && (
        <div className="my-10">
          <h2 className="text-2xl font-bold mb-6">Featured Posts</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {isLoading
              ? // Skeleton loaders for featured posts
                Array(3)
                  .fill(0)
                  .map((_, i) => (
                    <div key={i} className="space-y-3">
                      <Skeleton className="h-48 w-full rounded-lg" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-8 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>
                  ))
              : featuredPosts.map((post) => {
                  const imageUrl = getOgImageUrl(post)
                  const postSocialData = getPostSocialData(post.slug)

                  return (
                    <Card key={post.slug} className="overflow-hidden h-full flex flex-col">
                      <Link href={`/blog/${post.slug}`} className="overflow-hidden">
                        <ImageV2
                          src={imageUrl || "/placeholder.svg"}
                          alt={post.title}
                          width={600}
                          height={340}
                          className="h-48 w-full object-cover transition-transform duration-300 ease-in-out hover:scale-105"
                        />
                      </Link>
                      <CardContent className="flex flex-col flex-1 p-4">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                          <div className="flex items-center">
                            <Calendar className="mr-1 h-3 w-3" />
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                          </div>
                          <span>•</span>
                          <div className="flex items-center">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>{getReadingTime(post.body.raw)} min read</span>
                          </div>
                        </div>
                        <h3 className="text-xl font-bold mb-2 hover:underline">
                          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                        </h3>
                        {post.description && (
                          <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{post.description}</p>
                        )}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {post.tags?.map((tag) => (
                            <Badge key={tag} variant="secondary" className="px-2 py-0.5 text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <div className="mt-auto flex justify-between items-center">
                          <div className="flex items-center gap-3 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Heart className="h-3 w-3" />
                              <span>{formatNumber(postSocialData._count.votes)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MessageSquare className="h-3 w-3" />
                              <span>{formatNumber(postSocialData._count.comments)}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Eye className="h-3 w-3" />
                              <span>{formatNumber(postSocialData.viewCount)}</span>
                            </div>
                          </div>
                          {post.author && <Author username={post.author} imageOnly size="sm" />}
                        </div>
                      </CardContent>
                    </Card>
                  )
                })}
          </div>
        </div>
      )}

      {/* Search and filter section */}
      <div className="my-8 flex flex-col sm:flex-row gap-4 items-center">
        <div className="relative w-full sm:w-auto sm:flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search posts..."
            className="w-full pl-8"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              setCurrentPage(1) // Reset to first page when search changes
            }}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="flex gap-2">
                <Filter className="h-4 w-4" />
                <span>Filter</span>
                {selectedTags.length > 0 && (
                  <Badge variant="secondary" className="ml-1 px-1 py-0">
                    {selectedTags.length}
                  </Badge>
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {allTags.map((tag) => (
                <DropdownMenuItem
                  key={tag}
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleTag(tag)}
                >
                  <span>{tag}</span>
                  {selectedTags.includes(tag) && (
                    <Badge variant="secondary">
                      <X className="h-3 w-3" />
                    </Badge>
                  )}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          {(selectedTags.length > 0 || searchQuery) && (
            <Button variant="ghost" onClick={clearFilters}>
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Active filters display */}
      {selectedTags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedTags.map((tag) => (
            <Badge key={tag} variant="secondary" className="px-2 py-1 flex items-center gap-1">
              {tag}
              <X className="h-3 w-3 cursor-pointer" onClick={() => toggleTag(tag)} />
            </Badge>
          ))}
        </div>
      )}

      {/* Main posts grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {isLoading
            ? // Skeleton loaders for posts
              Array(postsPerPage)
                .fill(0)
                .map((_, i) => (
                  <div key={i} className="space-y-3">
                    <Skeleton className="h-48 w-full rounded-lg" />
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-8 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-2/3" />
                  </div>
                ))
            : paginatedPosts.map((post) => {
                const imageUrl = getOgImageUrl(post)
                const readingTime = getReadingTime(post.body.raw)
                const postSocialData = getPostSocialData(post.slug)

                return (
                  <article key={post.slug} className="group relative flex flex-col space-y-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="overflow-hidden rounded-md border bg-muted transition-colors"
                    >
                      <ImageV2
                        src={imageUrl || "/placeholder.svg"}
                        alt={post.title}
                        width={804}
                        height={452}
                        className="h-48 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </Link>
                    <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <Calendar className="mr-1 h-4 w-4" />
                        <time dateTime={post.date}>{formatDate(post.date)}</time>
                      </div>
                      <span>•</span>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4" />
                        <span>{readingTime} min read</span>
                      </div>
                    </div>
                    <h2 className="text-2xl font-bold" data-id={post.slug}>
                      <Link href={`/blog/${post.slug}`} className="transition-colors hover:text-foreground/80">
                        {post.title}
                      </Link>
                    </h2>
                    {post.description && <p className="text-muted-foreground">{post.description}</p>}

                    {/* Social stats */}
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4" />
                        <span>{formatNumber(postSocialData._count.votes)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{formatNumber(postSocialData._count.comments)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{formatNumber(postSocialData.viewCount)}</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mt-2">
                      {post.tags?.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="px-2 py-0.5 text-xs cursor-pointer hover:bg-secondary/80"
                          onClick={(e) => {
                            e.preventDefault()
                            toggleTag(tag)
                          }}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    {post.author && (
                      <div className="flex items-center gap-3 mt-2">
                        <Author username={post.author} size="sm" />
                      </div>
                    )}
                  </article>
                )
              })}
        </div>
      ) : (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium mb-2">No posts found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
          <Button variant="outline" className="mt-4" onClick={clearFilters}>
            Clear all filters
          </Button>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-10">
          <div className="flex gap-1">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => setCurrentPage(page)}
                className={cn("w-9", currentPage === page && "pointer-events-none")}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

