"use client"

import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { useVotes } from "@/lib/hooks/use-votes"
import { cn } from "@/lib/utils"
import { useEffect } from "react"

interface VoteButtonsProps {
    entityId: string
    entityType: "proposal" | "comment"
    initialUpvotes?: number
    initialDownvotes?: number
    initialUserVote?: "UPVOTE" | "DOWNVOTE" | null
    size?: "sm" | "md" | "lg"
    className?: string
    showCounts?: boolean
    onVoteChange?: (voteType: "UPVOTE" | "DOWNVOTE" | null, previousVote: "UPVOTE" | "DOWNVOTE" | null) => void
}

export function VoteButtons({
    entityId,
    entityType,
    initialUpvotes = 0,
    initialDownvotes = 0,
    initialUserVote = null,
    size = "md",
    className,
    showCounts = true,
    onVoteChange,
}: VoteButtonsProps) {
    const { voteCount, userVote, upvote, downvote, isLoading } = useVotes({
        initialVoteCount: { upvotes: initialUpvotes, downvotes: initialDownvotes },
        initialUserVote,
        entityId,
        entityType,
    })

    // Notify parent component when vote changes
    useEffect(() => {
        if (onVoteChange && userVote !== initialUserVote) {
            onVoteChange(userVote, initialUserVote)
        }
    }, [userVote, initialUserVote, onVoteChange])

    // Size mappings
    const sizeClasses = {
        sm: {
            button: "h-7 w-7",
            icon: "h-3 w-3",
            count: "text-xs",
        },
        md: {
            button: "h-9 w-9",
            icon: "h-4 w-4",
            count: "text-sm",
        },
        lg: {
            button: "h-10 w-10",
            icon: "h-5 w-5",
            count: "text-base",
        },
    }

    return (
        <div className={cn("flex items-center gap-1", className)}>
            <div className="flex flex-col items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        sizeClasses[size].button,
                        userVote === "UPVOTE" &&
                        "bg-green-100 text-green-700 hover:bg-green-200 hover:text-green-800 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50",
                        isLoading && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={upvote}
                    disabled={isLoading}
                    aria-label="Upvote"
                >
                    <ThumbsUp className={sizeClasses[size].icon} />
                </Button>
                {showCounts && (
                    <span className={cn("text-muted-foreground", sizeClasses[size].count)}>{voteCount.upvotes}</span>
                )}
            </div>

            <div className="flex flex-col items-center">
                <Button
                    variant="ghost"
                    size="icon"
                    className={cn(
                        sizeClasses[size].button,
                        userVote === "DOWNVOTE" &&
                        "bg-red-100 text-red-700 hover:bg-red-200 hover:text-red-800 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50",
                        isLoading && "opacity-50 cursor-not-allowed",
                    )}
                    onClick={downvote}
                    disabled={isLoading}
                    aria-label="Downvote"
                >
                    <ThumbsDown className={sizeClasses[size].icon} />
                </Button>
                {showCounts && (
                    <span className={cn("text-muted-foreground", sizeClasses[size].count)}>{voteCount.downvotes}</span>
                )}
            </div>
        </div>
    )
}

