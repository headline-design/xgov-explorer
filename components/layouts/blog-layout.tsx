"use client"

import type React from "react"

import Link from "next/link"
import { notFound } from "next/navigation"
import {
  ChevronLeft,
  Clock,
  Calendar,
  Copy,
  ArrowUp,
  Twitter,
  Facebook,
  Linkedin,
  Share2,
  Bookmark,
  BookmarkCheck,
  MessageSquare,
  Heart,
  Eye,
  Tag,
} from "lucide-react"
import { useEffect, useState, useRef, useCallback } from "react"
import { toast } from "@/components/ui/toast/toast"

import type { Blog } from "contentlayer/generated"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { formatDate } from "@/lib/utils"
import { Mdx } from "../docs/mdx-components"
import { useCurrentTheme } from "@/lib/hooks/use-theme"
import ImageV2 from "../ui/image-v2"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import Author from "../blog/author"
import Button from "../ui/rust-button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { voteOnArticle, toggleBookmark, addComment } from "@/app/actions/article-social-actions"
import { CommentSection } from "@/components/blog/comment-section"
import { useRouter } from "next/navigation"
import ButtonLink from "../ui/button-link"

interface BlogLayoutProps {
  post: Blog
  article: any // Prisma article with social data
  related?: Blog[]
}

export function BlogLayout({ post, article, related }: BlogLayoutProps) {
  if (!post || !article) {
    notFound()
  }

  const router = useRouter()
  const currentTheme = useCurrentTheme()
  const [mounted, setMounted] = useState(false)
  const [imageError, setImageError] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(article.bookmarks?.length > 0)
  const [likes, setLikes] = useState(article._count.votes)
  const [hasLiked, setHasLiked] = useState(article.votes?.length > 0)
  const [views, setViews] = useState(article.viewCount)
  const [activeHeading, setActiveHeading] = useState("")
  const [commentContent, setCommentContent] = useState("")
  const [isSubmittingComment, setIsSubmittingComment] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [tableOfContents, setTableOfContents] = useState<{ id: string; text: string; level: number }[]>([])

  // Calculate reading time - stable calculation
  const readingTime = Math.ceil((post.body.raw.split(/\s+/).length || 0) / 200) // Assuming 200 words per minute

  useEffect(() => {
    setMounted(true)
  }, [])

  // Extract headings for table of contents - only run once after mount
  useEffect(() => {
    if (!mounted || !contentRef.current) return

    // Extract headings for table of contents
    const headings = Array.from(contentRef.current.querySelectorAll("h2, h3")).map((heading) => ({
      id: heading.id,
      text: heading.textContent || "",
      level: heading.tagName === "H2" ? 2 : 3,
    }))

    setTableOfContents(headings)
  }, [mounted])

  // Handle scroll events - separate from table of contents extraction
  useEffect(() => {
    if (!mounted) return

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
      const scrollPercent = scrollTop / docHeight
      setReadingProgress(scrollPercent * 100)
      setShowScrollTop(scrollTop > 300)

      // Update active heading based on scroll position
      if (contentRef.current && tableOfContents.length > 0) {
        // Create a stable array that won't change on each render
        const headingElements = tableOfContents
          .map((heading) => document.getElementById(heading.id))
          .filter(Boolean) as HTMLElement[]

        let foundActive = false

        for (let i = headingElements.length - 1; i >= 0; i--) {
          const heading = headingElements[i]
          if (heading && heading.getBoundingClientRect().top <= 100) {
            // Only update if different to avoid unnecessary re-renders
            if (heading.id !== activeHeading) {
              setActiveHeading(heading.id)
            }
            foundActive = true
            break
          }
        }

        // If no active heading found and we have one set, clear it
        if (!foundActive && activeHeading !== "") {
          setActiveHeading("")
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [mounted, tableOfContents, activeHeading]) // Include activeHeading to prevent stale closures

  // Memoize image URL generation to avoid recalculations
  const getOgImageUrl = useCallback(
    (blogPost: Blog) => {
      if (!mounted) return blogPost.image || ""

      try {
        const title = encodeURIComponent(blogPost.title || "")
        const summary = encodeURIComponent(blogPost.description || "")
        return blogPost.useOgImage
          ? `/api/og?title=${title}&summary=${summary}&theme=${currentTheme}`
          : blogPost.image || ""
      } catch (error) {
        console.error("Error generating OG image URL:", error)
        return blogPost.image || ""
      }
    },
    [mounted, currentTheme],
  )

  // Get the appropriate placeholder based on theme
  const placeholderUrl = mounted && currentTheme === "dark" ? "/placeholder-dark.svg" : "/placeholder-light.svg"

  // Use static image during SSR, or fallback to placeholder if OG image fails
  const ogImageUrl = mounted ? getOgImageUrl(post) : ""
  const staticImageUrl = post.image
  const imageUrl = !mounted || imageError || !ogImageUrl ? staticImageUrl || placeholderUrl : ogImageUrl

  // Copy current URL to clipboard
  const copyToClipboard = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href)
      toast.success("Link copied to clipboard")
    }
  }

  // Scroll to top function
  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  // Share functions
  const shareOnTwitter = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(
          window.location.href,
        )}`,
        "_blank",
      )
    }
  }

  const shareOnFacebook = () => {
    if (typeof window !== "undefined") {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, "_blank")
    }
  }

  const shareOnLinkedIn = () => {
    if (typeof window !== "undefined") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`,
        "_blank",
      )
    }
  }

  // Toggle bookmark
  const handleToggleBookmark = async () => {
    try {
      const result = await toggleBookmark(article.id)
      if (result.success) {
        setIsBookmarked(!isBookmarked)
        toast.success(result.message)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error toggling bookmark:", error)
      toast.error("Failed to toggle bookmark. Please try again.")
    }
  }

  // Toggle like
  const handleToggleLike = async () => {
    try {
      const result = await voteOnArticle(article.id, "UPVOTE")
      if (result.success) {
        setHasLiked(!hasLiked)
        setLikes(hasLiked ? likes - 1 : likes + 1)
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error toggling like:", error)
      toast.error("Failed to like article. Please try again.")
    }
  }

  // Handle comment submission
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentContent.trim()) return

    setIsSubmittingComment(true)
    try {
      const result = await addComment(article.id, commentContent)
      if (result.success) {
        setCommentContent("")
        toast.success("Comment added successfully")
        router.refresh() // Refresh the page to show the new comment
      } else {
        toast.error(result.message)
      }
    } catch (error) {
      console.error("Error adding comment:", error)
      toast.error("Failed to add comment. Please try again.")
    } finally {
      setIsSubmittingComment(false)
    }
  }

  // Format number with K/M suffix - memoize to avoid recalculations
  const formatNumber = useCallback((num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + "M"
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + "K"
    }
    return num.toString()
  }, [])

  // Render a loading state during SSR/before hydration to avoid mismatches
  if (!mounted) {
    return (
      <div className="container relative max-w-5xl py-6 lg:py-10">
        <div className="animate-pulse">
          <div className="h-8 w-32 bg-muted rounded mb-8"></div>
          <div className="h-8 w-full bg-muted rounded mb-4"></div>
          <div className="h-8 w-2/3 bg-muted rounded mb-8"></div>
          <div className="h-[400px] w-full bg-muted rounded mb-8"></div>
          <div className="h-4 w-full bg-muted rounded mb-4"></div>
          <div className="h-4 w-full bg-muted rounded mb-4"></div>
          <div className="h-4 w-2/3 bg-muted rounded mb-4"></div>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Reading progress bar */}
      <div
        className="fixed top-0 left-0 z-50 h-1 bg-primary transition-all duration-300"
        style={{ width: `${readingProgress}%` }}
      />

      <div className="container relative max-w-5xl py-6 lg:py-10">

        {/* Mobile navigation */}
        <div className="flex items-center justify-between mb-8">
          <ButtonLink href="/blog" variant="ghost" className="inline-flex" icon={<ChevronLeft className="h-4 w-4" />} text="Back to blog" />
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleToggleBookmark}
                    className="p-2 rounded-full hover:bg-muted transition-colors"
                    aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-5 w-5 text-primary" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                  </button>
                </TooltipTrigger>
                <TooltipContent>{isBookmarked ? "Remove bookmark" : "Bookmark this post"}</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="Share this post"
                      >
                        <Share2 className="h-5 w-5" />
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy link
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer">
                        <Twitter className="h-4 w-4 mr-2" />
                        Share on Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareOnFacebook} className="cursor-pointer">
                        <Facebook className="h-4 w-4 mr-2" />
                        Share on Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareOnLinkedIn} className="cursor-pointer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        Share on LinkedIn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TooltipTrigger>
                <TooltipContent>Share this post</TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        {/* Article header */}
        <div className="space-y-4 mb-8">
          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {post.tags?.map((tag) => (
              <Link href={`/blog?tag=${tag}`} key={tag}>
                <Badge variant="outline" className="hover:bg-muted transition-colors">
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>

          {/* Title */}
          <h1 className="text-4xl font-extrabold leading-tight tracking-tighter lg:text-5xl">{post.title}</h1>

          {/* Description */}
          {post.description && <p className="text-xl text-muted-foreground leading-relaxed">{post.description}</p>}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4" />
              <time dateTime={post.date}>{formatDate(post.date)}</time>
            </div>
            <div className="flex items-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{readingTime} min read</span>
            </div>
            <div className="flex items-center">
              <Eye className="mr-1 h-4 w-4" />
              <span>{formatNumber(views)} views</span>
            </div>
          </div>

          {/* Author info */}
          {post.author && (
            <div className="pt-2">
              <Author username={post.author} updatedAt={post.date} size="md" showSocial />
            </div>
          )}
        </div>

        {/* Featured image */}
        <div className="my-8 overflow-hidden rounded-xl border shadow-sm">
          <ImageV2
            src={imageUrl || "/placeholder.svg"}
            alt={post.title}
            width={1200}
            height={630}
            className="aspect-[21/9] w-full object-cover"
            priority={true}
          />
        </div>

        {/* Desktop layout with table of contents */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main content */}
          <div className="flex-1 order-2 lg:order-1">
            {/* Content engagement bar - mobile */}
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleToggleLike}
                  className="flex items-center gap-1 text-sm hover:text-primary transition-colors"
                  aria-label={hasLiked ? "Unlike this post" : "Like this post"}
                >
                  <Heart className={cn("h-5 w-5", hasLiked && "fill-primary text-primary")} />
                  <span>{formatNumber(likes)}</span>
                </button>
                <Link href="#comments" className="flex items-center gap-1 text-sm hover:text-primary transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span>Comments</span>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={copyToClipboard}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                  aria-label="Copy link"
                >
                  <Copy className="h-4 w-4" />
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="p-1.5 rounded-full hover:bg-muted transition-colors"
                  aria-label="Share on Twitter"
                >
                  <Twitter className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Content */}
            <div ref={contentRef} className="prose prose-lg max-w-none dark:prose-invert">
              <Mdx code={post.body.code} />
            </div>

            {/* Tags */}
            <div className="mt-8 pt-4 border-t">
              <h3 className="text-lg font-semibold mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {post.tags?.map((tag) => (
                  <Link href={`/blog?tag=${tag}`} key={tag}>
                    <Badge className="px-3 py-1 hover:bg-primary/90 transition-colors">{tag}</Badge>
                  </Link>
                ))}
              </div>
            </div>

            {/* Engagement footer */}
            <div className="mt-8 pt-4 border-t flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  onClick={handleToggleLike}
                  className="flex items-center gap-1.5 hover:text-primary transition-colors"
                  aria-label={hasLiked ? "Unlike this post" : "Like this post"}
                >
                  <Heart className={cn("h-5 w-5", hasLiked && "fill-primary text-primary")} />
                  <span>{formatNumber(likes)}</span>
                </button>
                <Link href="#comments" className="flex items-center gap-1.5 hover:text-primary transition-colors">
                  <MessageSquare className="h-5 w-5" />
                  <span>Comments ({article._count.comments})</span>
                </Link>
              </div>
              <div className="flex items-center gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={handleToggleBookmark}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label={isBookmarked ? "Remove bookmark" : "Bookmark this post"}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="h-5 w-5 text-primary" />
                        ) : (
                          <Bookmark className="h-5 w-5" />
                        )}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>{isBookmarked ? "Remove bookmark" : "Bookmark this post"}</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={copyToClipboard}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="Copy link"
                      >
                        <Copy className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Copy link</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={shareOnTwitter}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="Share on Twitter"
                      >
                        <Twitter className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Share on Twitter</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={shareOnFacebook}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="Share on Facebook"
                      >
                        <Facebook className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Share on Facebook</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={shareOnLinkedIn}
                        className="p-2 rounded-full hover:bg-muted transition-colors"
                        aria-label="Share on LinkedIn"
                      >
                        <Linkedin className="h-5 w-5" />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Share on LinkedIn</TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Author bio */}
            {post.author && (
              <div className="mt-8 p-6 rounded-xl border bg-card shadow-sm">
                <h3 className="text-lg font-semibold mb-4">About the author</h3>
                <Author username={post.author} size="lg" showSocial />
              </div>
            )}

            {/* Comments section */}
            <div id="comments" className="mt-12 pt-4 border-t">
              <h2 className="text-2xl font-bold mb-6">Comments ({article._count.comments})</h2>

              {/* Comment form */}
              <form onSubmit={handleSubmitComment} className="mb-8">
                <textarea
                  placeholder="Leave a comment..."
                  className="w-full min-h-[120px] p-4 rounded-lg border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  value={commentContent}
                  onChange={(e) => setCommentContent(e.target.value)}
                  required
                />
                <div className="flex justify-end mt-2">
                  <Button
                    variant="default"
                    size="sm"
                    disabled={isSubmittingComment || !commentContent.trim()}
                  >
                    {isSubmittingComment ? "Posting..." : "Post Comment"}
                  </Button>
                </div>
              </form>

              {/* Comments list */}
              <CommentSection comments={article.comments} articleId={article.id} />
            </div>
          </div>

          {/* Sidebar - desktop only */}
          <div className="hidden lg:block w-72 order-1 lg:order-2">
            <div className="sticky top-20 space-y-8">
              {/* Content engagement */}
              <div className="p-4 rounded-lg border bg-card shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <button
                    onClick={handleToggleLike}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    <Heart className={cn("h-6 w-6", hasLiked && "fill-primary text-primary")} />
                    <span className="text-sm">{formatNumber(likes)}</span>
                  </button>
                  <button
                    onClick={handleToggleBookmark}
                    className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors"
                  >
                    {isBookmarked ? (
                      <BookmarkCheck className="h-6 w-6 text-primary" />
                    ) : (
                      <Bookmark className="h-6 w-6" />
                    )}
                    <span className="text-sm">Save</span>
                  </button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <button className="flex flex-col items-center gap-1 p-2 rounded-lg hover:bg-muted transition-colors">
                        <Share2 className="h-6 w-6" />
                        <span className="text-sm">Share</span>
                      </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={copyToClipboard} className="cursor-pointer">
                        <Copy className="h-4 w-4 mr-2" />
                        Copy link
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareOnTwitter} className="cursor-pointer">
                        <Twitter className="h-4 w-4 mr-2" />
                        Twitter
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareOnFacebook} className="cursor-pointer">
                        <Facebook className="h-4 w-4 mr-2" />
                        Facebook
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={shareOnLinkedIn} className="cursor-pointer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Separator className="my-2" />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{formatNumber(views)} views</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{article._count.comments} comments</span>
                  </div>
                </div>
              </div>

              {/* Table of contents */}
              {tableOfContents.length > 0 && (
                <div className="p-4 rounded-lg border bg-card shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Table of Contents</h3>
                  <ul className="space-y-2 text-sm">
                    {tableOfContents.map((heading) => (
                      <li
                        key={heading.id}
                        className={cn(
                          "border-l-2 pl-3 py-1 transition-colors",
                          activeHeading === heading.id
                            ? "border-primary text-primary font-medium"
                            : "border-muted hover:border-primary/50 hover:text-primary/80",
                          heading.level === 3 ? "ml-4" : "",
                        )}
                      >
                        <a href={`#${heading.id}`}>{heading.text}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Newsletter signup */}
              <div className="p-4 rounded-lg border bg-card shadow-sm">
                <h3 className="text-lg font-semibold mb-2">Stay updated</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Get the latest xGov Explorer updates delivered to your inbox.
                </p>
                <form
                  className="space-y-2"
                  onSubmit={(e) => {
                    e.preventDefault()
                    toast.success("Thanks for subscribing!")
                      ; (e.target as HTMLFormElement).reset()
                  }}
                >
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full h-9 px-3 py-2 text-sm rounded-md border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    required
                  />
                  <Button className="w-full">Subscribe</Button>
                </form>
              </div>

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="p-4 rounded-lg border bg-card shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Link href={`/blog?tag=${tag}`} key={tag}>
                        <Badge variant="secondary" className="px-2 py-1 hover:bg-secondary/80 transition-colors">
                          {tag}
                        </Badge>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Related posts */}
        {related && related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-bold">Related Posts</h2>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((relatedPost) => {
                // Use OG image for related posts too
                const relatedImageUrl = mounted ? getOgImageUrl(relatedPost) : relatedPost.image || placeholderUrl

                return (
                  <Card key={relatedPost.slug} className="overflow-hidden h-full flex flex-col group">
                    <Link href={`/blog/${relatedPost.slug}`} className="overflow-hidden">
                      <ImageV2
                        src={relatedImageUrl || "/placeholder.svg"}
                        alt={relatedPost.title}
                        width={600}
                        height={340}
                        className="h-48 w-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                      />
                    </Link>
                    <CardContent className="flex flex-col flex-1 p-4">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                        <time dateTime={relatedPost.date}>{formatDate(relatedPost.date)}</time>
                        {relatedPost.tags && relatedPost.tags.length > 0 && (
                          <>
                            <span>•</span>
                            <Badge variant="secondary" className="px-1 py-0 text-xs">
                              {relatedPost.tags[0]}
                            </Badge>
                          </>
                        )}
                      </div>
                      <h3 className="text-lg font-medium mb-2 group-hover:text-primary transition-colors">
                        <Link href={`/blog/${relatedPost.slug}`}>{relatedPost.title}</Link>
                      </h3>
                      {relatedPost.description && (
                        <p className="line-clamp-2 text-sm text-muted-foreground mb-4">{relatedPost.description}</p>
                      )}
                      <div className="mt-auto flex items-center justify-between">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className={cn(buttonVariants({ variant: "link" }), "p-0 h-auto")}
                        >
                          Read more
                        </Link>
                        {relatedPost.author && <Author username={relatedPost.author} imageOnly size="sm" />}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        )}

        {/* Newsletter signup - mobile and tablet */}
        <div className="mt-16 rounded-lg border bg-card p-6 shadow-sm lg:hidden">
          <h3 className="text-xl font-bold mb-2">Subscribe to our newsletter</h3>
          <p className="text-muted-foreground mb-4">Get the latest updates and news delivered to your inbox.</p>
          <form
            className="flex flex-col sm:flex-row gap-2"
            onSubmit={(e) => {
              e.preventDefault()
              toast.success("Thanks for subscribing!")
                ; (e.target as HTMLFormElement).reset()
            }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              required
            />
            <Button className="sm:w-auto">Subscribe</Button>
          </form>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 p-3 rounded-full bg-primary text-primary-foreground shadow-md hover:bg-primary/90 transition-opacity duration-300 z-10"
          style={{ opacity: showScrollTop ? 1 : 0 }}
          aria-label="Scroll to top"
        >
          <ArrowUp className="h-5 w-5" />
        </button>
      )}
    </>
  )
}

