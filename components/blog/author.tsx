"use client"

import Link from "next/link"
import { timeAgo } from "@/lib/time"
import { ExternalLink, Twitter } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import BlurImage from "../ui/image/blur-image"

export interface AuthorData {
    name: string
    image: string
    twitterHandle?: string
    website?: string
    bio?: string
}

interface AuthorProps {
    username: string
    updatedAt?: string
    imageOnly?: boolean
    showSocial?: boolean
    size?: "sm" | "md" | "lg"
}

// This could be moved to a database or API in the future
const authors: Record<string, AuthorData> = {
    ussaaron: {
        name: "Aaron Martinez",
        image: "https://njbclcehtszuwqtkphdn.supabase.co/storage/v1/object/public/atlas/avatar/ussaaron.png",
        twitterHandle: "ussaaron_",
        website: "https://headline.dev",
        bio: "Founder of xGov Explorer. Building on Algorand.",
    },
    headline_crypto: {
        name: "HEADLINE",
        website: "https://headline.dev",
        image: "https://njbclcehtszuwqtkphdn.supabase.co/storage/v1/object/public/atlas/avatar/headline_crypto.png",
        twitterHandle: "headline_crypto",
        bio: "Contributor to xGov Explorer",
    },
}

export default function Author({
    username,
    updatedAt,
    imageOnly = false,
    showSocial = true,
    size = "md",
}: AuthorProps) {
    // Handle unknown authors gracefully
    if (!authors[username]) {
        //console.warn(`Author with username ${username} not found`)
        return null
    }

    const author = authors[username]

    // Image size based on the size prop
    const dimensions = {
        sm: { width: 32, height: 32 },
        md: { width: 40, height: 40 },
        lg: { width: 64, height: 64 },
    }[size]

    // Image only mode
    if (imageOnly) {
        return (
            <BlurImage
                type="avatar"
                src={author.image}
                alt={author.name}
                width={dimensions.width}
                height={dimensions.height}
                className="rounded-full transition-all hover:brightness-90"
            />
        )
    }

    // With update time
    if (updatedAt) {
        return (
            <div className="flex items-center space-x-3">
                <BlurImage
                    type="avatar"
                    src={author.image}
                    alt={author.name}
                    width={dimensions.width}
                    height={dimensions.height}
                    className="rounded-full"
                />
                <div className="flex flex-col">
                    <p className="text-sm font-medium">Written by {author.name}</p>
                    <time dateTime={updatedAt} className="text-sm text-muted-foreground">
                        Last updated {timeAgo(new Date(updatedAt))}
                    </time>
                </div>
            </div>
        )
    }

    // Default full author display with optional social links
    return (
        <div className="flex items-center space-x-3">
            <BlurImage
                type="avatar"
                src={author.image}
                alt={author.name}
                width={dimensions.width}
                height={dimensions.height}
                className="rounded-full"
            />
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <p className="font-semibold">{author.name}</p>
                    {showSocial && (
                        <div className="flex items-center gap-1">
                            <TooltipProvider>
                                {author.twitterHandle && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={`https://twitter.com/${author.twitterHandle}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <Twitter className="h-4 w-4" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>Twitter</TooltipContent>
                                    </Tooltip>
                                )}

                                {author.website && (
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={author.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors"
                                            >
                                                <ExternalLink className="h-4 w-4" />
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent>Website</TooltipContent>
                                    </Tooltip>
                                )}
                            </TooltipProvider>
                        </div>
                    )}
                </div>
                {author.bio && <p className="text-sm text-muted-foreground">{author.bio}</p>}
            </div>
        </div>
    )
}

