"use client"

import type React from "react"

import { useState } from "react"
import { Heart, Reply } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { toast } from "@/components/ui/toast/toast"
import ImageV2 from "@/components/ui/image-v2"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { addComment, deleteComment } from "@/app/actions/article-social-actions"
import { useRouter } from "next/navigation"

interface CommentProps {
    id: string
    content: string
    createdAt: Date
    user: {
        id: string
        name?: string
        image?: string
    }
    _count?: {
        replies: number
    }
    replies?: CommentProps[]
    articleId: string
}

export function CommentSection({ comments, articleId }: { comments: CommentProps[]; articleId: string }) {
    if (!comments || comments.length === 0) {
        return (
            <div className="text-center py-8 text-muted-foreground">
                No comments yet. Be the first to share your thoughts!
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {comments.map((comment) => (
                <Comment key={comment.id} comment={comment} articleId={articleId} />
            ))}
        </div>
    )
}

function Comment({ comment, articleId }: { comment: CommentProps; articleId: string }) {
    const router = useRouter()
    const [isReplying, setIsReplying] = useState(false)
    const [replyContent, setReplyContent] = useState("")
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [showReplies, setShowReplies] = useState(false)
    const [hasLiked, setHasLiked] = useState(false)
    const [likesCount, setLikesCount] = useState(0)

    const handleLike = async () => {
        // This would be implemented with a voteOnComment function
        toast("Comment liking not implemented yet")
    }

    const handleReply = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!replyContent.trim()) return

        setIsSubmitting(true)
        try {
            const result = await addComment(articleId, replyContent, comment.id)
            if (result.success) {
                setReplyContent("")
                setIsReplying(false)
                toast.success("Reply added successfully")
                router.refresh() // Refresh the page to show the new reply
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.error("Error adding reply:", error)
            toast.error("Failed to add reply. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleDelete = async () => {
        if (!confirm("Are you sure you want to delete this comment?")) return

        try {
            const result = await deleteComment(comment.id)
            if (result.success) {
                toast.success("Comment deleted successfully")
                router.refresh() // Refresh the page to remove the deleted comment
            } else {
                toast.error(result.message)
            }
        } catch (error) {
            console.error("Error deleting comment:", error)
            toast.error("Failed to delete comment. Please try again.")
        }
    }

    return (
        <div className="p-4 rounded-lg border">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <ImageV2
                        src={comment.user.image || "/placeholder.svg?height=40&width=40"}
                        alt={comment.user.name || "User"}
                        width={40}
                        height={40}
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <div className="flex items-center justify-between">
                        <h4 className="font-medium">{comment.user.name || "Anonymous User"}</h4>
                        <span className="text-xs text-muted-foreground">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                        </span>
                    </div>
                    <p className="mt-2 text-sm">{comment.content}</p>
                    <div className="flex items-center gap-4 mt-2">
                        <button
                            className="text-xs text-muted-foreground hover:text-foreground"
                            onClick={() => setIsReplying(!isReplying)}
                        >
                            Reply
                        </button>
                        <button
                            className={cn(
                                "text-xs text-muted-foreground hover:text-foreground flex items-center gap-1",
                                hasLiked && "text-primary",
                            )}
                            onClick={handleLike}
                        >
                            <Heart className={cn("h-3 w-3", hasLiked && "fill-primary text-primary")} />
                            <span>{likesCount}</span>
                        </button>
                    </div>

                    {/* Reply form */}
                    {isReplying && (
                        <form onSubmit={handleReply} className="mt-4">
                            <textarea
                                placeholder="Write a reply..."
                                className="w-full min-h-[80px] p-3 text-sm rounded-lg border border-input bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                                value={replyContent}
                                onChange={(e) => setReplyContent(e.target.value)}
                                required
                            />
                            <div className="flex justify-end gap-2 mt-2">
                                <Button type="button" variant="outline" size="sm" onClick={() => setIsReplying(false)}>
                                    Cancel
                                </Button>
                                <Button type="submit" size="sm" disabled={isSubmitting || !replyContent.trim()}>
                                    {isSubmitting ? "Posting..." : "Post Reply"}
                                </Button>
                            </div>
                        </form>
                    )}

                    {/* Show replies button */}
                    {comment._count && comment._count?.replies > 0 && !showReplies && (
                        <button
                            className="mt-3 text-xs flex items-center gap-1 text-primary hover:text-primary/80"
                            onClick={() => setShowReplies(true)}
                        >
                            <Reply className="h-3 w-3" />
                            Show {comment._count.replies} {comment._count.replies === 1 ? "reply" : "replies"}
                        </button>
                    )}

                    {/* Replies */}
                    {showReplies && comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 space-y-4 pl-4 border-l-2 border-muted">
                            {comment.replies.map((reply) => (
                                <div key={reply.id} className="flex items-start gap-2">
                                    <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                                        <ImageV2
                                            src={reply.user.image || "/placeholder.svg?height=32&width=32"}
                                            alt={reply.user.name || "User"}
                                            width={32}
                                            height={32}
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between">
                                            <h5 className="text-sm font-medium">{reply.user.name || "Anonymous User"}</h5>
                                            <span className="text-xs text-muted-foreground">
                                                {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                            </span>
                                        </div>
                                        <p className="mt-1 text-sm">{reply.content}</p>
                                    </div>
                                </div>
                            ))}
                            {/* Hide replies button */}
                            <button className="text-xs text-primary hover:text-primary/80" onClick={() => setShowReplies(false)}>
                                Hide replies
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

