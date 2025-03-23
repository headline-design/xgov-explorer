"use client"

import { useState, useEffect } from "react"
import { useComments } from "@/lib/hooks/use-comments"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { VoteButtons } from "@/components/votes/vote-buttons"
import { MessageSquare, Send, Trash2, Reply } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { useSession } from "next-auth/react"
import { Skeleton } from "@/components/ui/skeleton"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface Comment {
  id: string
  content: string
  createdAt: string
  updatedAt: string
  userId: string
  user: {
    id: string
    name: string
    image: string
  }
  parentId: string | null
  replies: Comment[]
  upvotes: number
  downvotes: number
  userVote: "UPVOTE" | "DOWNVOTE" | null
}

interface CommentsSectionProps {
  proposalId: string
  initialComments?: Comment[]
}

export function CommentsSection({ proposalId, initialComments = [] }: CommentsSectionProps) {
  const { data: session } = useSession()
  const { comments, fetchComments, addComment, deleteComment, updateCommentVote, isLoading, error } = useComments({
    proposalId,
    initialComments,
  })
  const [newComment, setNewComment] = useState("")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyContent, setReplyContent] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    fetchComments()
  }, [fetchComments])

  const handleSubmitComment = async () => {
    if (!newComment.trim()) return

    setIsSubmitting(true)
    try {
      await addComment(newComment)
      setNewComment("")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSubmitReply = async (parentId: string) => {
    if (!replyContent.trim()) return

    setIsSubmitting(true)
    try {
      await addComment(replyContent, parentId)
      setReplyContent("")
      setReplyingTo(null)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(commentId)
  }

  const handleVoteChange = (
    commentId: string,
    voteType: "UPVOTE" | "DOWNVOTE" | null,
    previousVote: "UPVOTE" | "DOWNVOTE" | null,
  ) => {
    updateCommentVote(commentId, voteType, previousVote)
  }

  const renderComment = (comment: Comment, isReply = false) => {
    const isAuthor = session?.user?.id === comment.userId
    const initials = comment.user.name
      ? comment.user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
      : "?"

    return (
      <div key={comment.id} className={`p-4 border rounded-lg ${isReply ? "ml-12 mt-2" : "mb-4"}`}>
        <div className="flex items-start gap-4">
          <Avatar>
            <AvatarImage src={comment.user.image || ""} alt={comment.user.name || "User"} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">{comment.user.name || "Anonymous"}</p>
                <p className="text-xs text-muted-foreground">
                  {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                </p>
              </div>

              {isAuthor && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleDeleteComment(comment.id)}
                  className="h-8 w-8 p-0"
                >
                  <Trash2 className="h-4 w-4 text-muted-foreground" />
                </Button>
              )}
            </div>

            <p className="mt-2">{comment.content}</p>

            <div className="flex items-center gap-4 mt-2">
              <VoteButtons
                entityId={comment.id}
                entityType="comment"
                initialUpvotes={comment.upvotes}
                initialDownvotes={comment.downvotes}
                initialUserVote={comment.userVote}
                size="sm"
                onVoteChange={(voteType, previousVote) => handleVoteChange(comment.id, voteType, previousVote)}
              />

              {!isReply && session && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                  className="text-xs"
                >
                  <Reply className="h-3 w-3 mr-1" />
                  Reply
                </Button>
              )}
            </div>

            {replyingTo === comment.id && (
              <div className="mt-4">
                <Textarea
                  placeholder="Write a reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  className="min-h-[80px]"
                />
                <div className="flex justify-end gap-2 mt-2">
                  <Button variant="outline" size="sm" onClick={() => setReplyingTo(null)}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleSubmitReply(comment.id)}
                    disabled={!replyContent.trim() || isSubmitting}
                  >
                    <Send className="h-3 w-3 mr-1" />
                    Reply
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Render replies */}
        {comment.replies && comment.replies.length > 0 && (
          <div className="mt-2">{comment.replies.map((reply) => renderComment(reply, true))}</div>
        )}
      </div>
    )
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold flex items-center mb-4">
        <MessageSquare className="h-5 w-5 mr-2" />
        Comments {comments.length > 0 && `(${comments.length})`}
      </h3>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {session ? (
        <div className="mb-6">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[100px]"
          />
          <div className="flex justify-end mt-2">
            <Button onClick={handleSubmitComment} disabled={!newComment.trim() || isSubmitting}>
              <Send className="h-4 w-4 mr-2" />
              Post Comment
            </Button>
          </div>
        </div>
      ) : (
        <div className="bg-muted p-4 rounded-lg mb-6 text-center">
          <p>Please sign in to leave a comment.</p>
        </div>
      )}

      {isLoading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="p-4 border rounded-lg">
              <div className="flex items-start gap-4">
                <Skeleton className="h-10 w-10 rounded-full" />
                <div className="flex-1">
                  <Skeleton className="h-5 w-32 mb-2" />
                  <Skeleton className="h-3 w-24 mb-4" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : comments.length > 0 ? (
        <div>{comments.map((comment) => renderComment(comment))}</div>
      ) : (
        <div className="text-center py-8 border rounded-lg bg-muted/10">
          <MessageSquare className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
          <p className="text-muted-foreground">No comments yet. Be the first to comment!</p>
        </div>
      )}
    </div>
  )
}

