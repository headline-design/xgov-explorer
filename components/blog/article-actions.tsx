"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, Bookmark, Share } from "lucide-react"
import { voteOnArticle, toggleBookmark } from "@/app/actions/article-actions"
import { VoteType } from "@prisma/client"
import { toast } from "@/hooks/use-toast"

interface ArticleActionsProps {
  articleId: string
  initialVote: VoteType | null
  initialBookmarked: boolean
  upvoteCount: number
  downvoteCount: number
}

export function ArticleActions({
  articleId,
  initialVote,
  initialBookmarked,
  upvoteCount,
  downvoteCount,
}: ArticleActionsProps) {
  const router = useRouter()
  const [vote, setVote] = useState<VoteType | null>(initialVote)
  const [bookmarked, setBookmarked] = useState(initialBookmarked)
  const [isVoting, setIsVoting] = useState(false)
  const [isBookmarking, setIsBookmarking] = useState(false)

  const handleVote = async (voteType: VoteType) => {
    try {
      setIsVoting(true)
      await voteOnArticle(articleId, voteType)

      // Update local state
      if (vote === voteType) {
        setVote(null)
      } else {
        setVote(voteType)
      }

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "You must be logged in to vote",
        variant: "destructive",
      })
    } finally {
      setIsVoting(false)
    }
  }

  const handleBookmark = async () => {
    try {
      setIsBookmarking(true)
      await toggleBookmark(articleId)
      setBookmarked(!bookmarked)

      toast({
        title: bookmarked ? "Bookmark removed" : "Bookmark added",
        description: bookmarked ? "Article removed from your bookmarks" : "Article added to your bookmarks",
      })

      router.refresh()
    } catch (error) {
      toast({
        title: "Error",
        description: "You must be logged in to bookmark",
        variant: "destructive",
      })
    } finally {
      setIsBookmarking(false)
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: document.title,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Article link copied to clipboard",
      })
    }
  }

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote(VoteType.UPVOTE)}
          disabled={isVoting}
          className={vote === VoteType.UPVOTE ? "text-green-500" : ""}
        >
          <ThumbsUp className="mr-1 h-4 w-4" />
          <span>{upvoteCount}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleVote(VoteType.DOWNVOTE)}
          disabled={isVoting}
          className={vote === VoteType.DOWNVOTE ? "text-red-500" : ""}
        >
          <ThumbsDown className="mr-1 h-4 w-4" />
          <span>{downvoteCount}</span>
        </Button>
      </div>

      <Button
        variant="ghost"
        size="sm"
        onClick={handleBookmark}
        disabled={isBookmarking}
        className={bookmarked ? "text-yellow-500" : ""}
      >
        <Bookmark className="mr-1 h-4 w-4" />
        <span>{bookmarked ? "Bookmarked" : "Bookmark"}</span>
      </Button>

      <Button variant="ghost" size="sm" onClick={handleShare}>
        <Share className="mr-1 h-4 w-4" />
        <span>Share</span>
      </Button>
    </div>
  )
}

