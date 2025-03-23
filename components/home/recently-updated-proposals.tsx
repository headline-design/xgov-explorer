"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, ArrowRight, CheckCircle, BarChart2, RefreshCw, Filter, Loader2, TrendingUp } from "lucide-react"
import { useProposals, type UpdatedProposal } from "@/providers/proposals-provider"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export function RecentlyUpdatedProposals() {
    const { recentlyUpdatedProposals, loading, error } = useProposals()
    const [filter, setFilter] = useState<"all" | "claimed" | "progress" | "status">("all")
    const [showAll, setShowAll] = useState(false)

    // Filter proposals based on the selected filter
    const filteredProposals =
        filter === "all"
            ? recentlyUpdatedProposals
            : recentlyUpdatedProposals.filter((proposal) => proposal.updateType === filter)

    // Get relative time string (e.g., "2 days ago")
    const getRelativeTimeString = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffInMs = now.getTime() - date.getTime()
        const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
        const diffInMinutes = Math.floor(diffInMs / (1000 * 60))

        if (diffInDays > 0) {
            return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`
        } else if (diffInHours > 0) {
            return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`
        } else if (diffInMinutes > 0) {
            return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`
        } else {
            return "Just now"
        }
    }

    // Get badge variant and text based on update type
    const getUpdateBadge = (updateType: UpdatedProposal["updateType"]) => {
        switch (updateType) {
            case "claimed":
                return {
                    variant: "default" as const,
                    text: "Claimed",
                    icon: <CheckCircle className="h-3 w-3 mr-1" />,
                }
            case "progress":
                return {
                    variant: "secondary" as const,
                    text: "Progress Update",
                    icon: <BarChart2 className="h-3 w-3 mr-1" />,
                }
            case "status":
                return {
                    variant: "outline" as const,
                    text: "Status Change",
                    icon: <RefreshCw className="h-3 w-3 mr-1" />,
                }
        }
    }

    // For demo purposes, let's assume we have previous completion percentages
    // In a real app, this would come from the API
    const getPreviousCompletionPercentage = (proposal: UpdatedProposal) => {
        // For progress updates, simulate a previous lower percentage
        if (proposal.updateType === "progress" && proposal.completionPercentage) {
            // Randomly reduce by 5-15%
            const reduction = Math.floor(Math.random() * 10) + 5
            return Math.max(0, proposal.completionPercentage - reduction)
        }

        // For status changes, simulate a previous lower percentage
        if (proposal.updateType === "status" && proposal.completionPercentage) {
            // Randomly reduce by 10-20%
            const reduction = Math.floor(Math.random() * 10) + 10
            return Math.max(0, proposal.completionPercentage - reduction)
        }

        // For claimed proposals, return 0 (just claimed)
        if (proposal.updateType === "claimed") {
            return 0
        }

        // Default fallback
        return proposal.completionPercentage || 0
    }

    if (loading) {
        return (
            <section className="w-full py-12 md:py-16">
                <div className="container px-4">
                    <div className="flex justify-center items-center py-20">
                        <Loader2 className="h-10 w-10 animate-spin text-primary mr-2" />
                        <span className="text-lg">Loading recent updates...</span>
                    </div>
                </div>
            </section>
        )
    }

    if (error) {
        return (
            <section className="w-full py-12 md:py-16">
                <div className="container px-4">
                    <div className="text-center py-12 border rounded-lg bg-muted/30">
                        <p className="text-destructive">Error loading recent updates. Please try again later.</p>
                    </div>
                </div>
            </section>
        )
    }

    return (
        <section className="w-full py-12 md:py-16">
            <div className="container px-4">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight mb-2">Recently Updated</h2>
                        <p className="text-muted-foreground max-w-[600px]">
                            Stay up-to-date with the latest developments and newly claimed proposals in the Algorand ecosystem.
                        </p>
                    </div>

                    <Tabs defaultValue="all" className="w-full md:w-auto">
                        <TabsList className="grid grid-cols-4 w-full md:w-auto">
                            <TabsTrigger value="all" onClick={() => setFilter("all")}>
                                All
                            </TabsTrigger>
                            <TabsTrigger value="claimed" onClick={() => setFilter("claimed")}>
                                Claimed
                            </TabsTrigger>
                            <TabsTrigger value="progress" onClick={() => setFilter("progress")}>
                                Progress
                            </TabsTrigger>
                            <TabsTrigger value="status" onClick={() => setFilter("status")}>
                                Status
                            </TabsTrigger>
                        </TabsList>
                    </Tabs>
                </div>

                {filteredProposals.length === 0 ? (
                    <div className="text-center py-12 border rounded-lg bg-muted/30">
                        <Filter className="h-12 w-12 mx-auto text-muted-foreground mb-4 opacity-50" />
                        <h3 className="text-xl font-medium mb-2">No updates found</h3>
                        <p className="text-muted-foreground">There are no recent updates matching your selected filter.</p>
                    </div>
                ) : (
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
                            {filteredProposals.slice(0, showAll ? filteredProposals.length : 4).map((proposal) => {
                                const badge = getUpdateBadge(proposal.updateType)
                                const previousPercentage = getPreviousCompletionPercentage(proposal)
                                const hasProgressChange = proposal.completionPercentage !== previousPercentage
                                const progressDifference = proposal.completionPercentage
                                    ? proposal.completionPercentage - previousPercentage
                                    : 0

                                return (
                                    <Card
                                        key={`${proposal.id}-${proposal.updateDate}`}
                                        className="flex flex-col h-full overflow-hidden border-muted"
                                    >
                                        <CardContent className="flex-1 p-3">
                                            <div className="flex justify-between items-start mb-1">
                                                <Badge variant={badge.variant} className="flex items-center text-xs py-0.5 px-2 h-5">
                                                    {badge.icon}
                                                    <span className="truncate">{badge.text}</span>
                                                </Badge>
                                                <div className="flex items-center text-xs text-muted-foreground">
                                                    <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
                                                    {getRelativeTimeString(proposal.updateDate)}
                                                </div>
                                            </div>

                                            <h3 className="text-sm font-medium mb-1 line-clamp-1">{proposal.title}</h3>

                                            <div className="flex items-center mb-2 text-xs">
                                                <Avatar className="h-4 w-4 mr-1">
                                                    <AvatarImage src={proposal.teamImage} alt={proposal.team} />
                                                    <AvatarFallback>{proposal.team.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <span className="text-muted-foreground truncate">{proposal.team}</span>

                                                {proposal.category && (
                                                    <>
                                                        <span className="mx-1 text-muted-foreground">•</span>
                                                        <span className="px-1.5 py-0.5 bg-muted rounded-full text-xs leading-none">
                                                            {proposal.category}
                                                        </span>
                                                    </>
                                                )}
                                            </div>

                                            <p className="text-xs text-muted-foreground line-clamp-2 mb-2">{proposal.updateDescription}</p>

                                            {proposal.completionPercentage !== undefined && (
                                                <div className="mt-0.5">
                                                    <div className="flex justify-between text-xs mb-1">
                                                        <span className="text-muted-foreground">Completion</span>
                                                        <div className="flex items-center">
                                                            {hasProgressChange && progressDifference > 0 && (
                                                                <TooltipProvider>
                                                                    <Tooltip>
                                                                        <TooltipTrigger asChild>
                                                                            <Badge
                                                                                variant="outline"
                                                                                className="mr-1 h-4 px-1.5 text-xs bg-green-50 text-green-700 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800"
                                                                            >
                                                                                <TrendingUp className="h-2 w-2 mr-0.5" />+{progressDifference}%
                                                                            </Badge>
                                                                        </TooltipTrigger>
                                                                        <TooltipContent>
                                                                            <p className="text-xs">Progress increased by {progressDifference}%</p>
                                                                        </TooltipContent>
                                                                    </Tooltip>
                                                                </TooltipProvider>
                                                            )}
                                                            <span>{proposal.completionPercentage}%</span>
                                                        </div>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden relative">
                                                        {/* Previous progress bar */}
                                                        {hasProgressChange && (
                                                            <div
                                                                className="absolute h-full bg-primary/30"
                                                                style={{ width: `${previousPercentage}%` }}
                                                            />
                                                        )}
                                                        {/* Current progress bar */}
                                                        <div
                                                            className={`h-full ${hasProgressChange ? "bg-green-500" : "bg-primary"}`}
                                                            style={{ width: `${proposal.completionPercentage}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </CardContent>

                                        <div className="px-2 pb-2 pt-0">
                                            <Button asChild variant="ghost" size="sm" className="w-full justify-between h-6 text-xs px-2">
                                                <Link href={`/proposal/${proposal.number}`}>
                                                    View
                                                    <ArrowRight className="h-3 w-3 ml-1" />
                                                </Link>
                                            </Button>
                                        </div>
                                    </Card>
                                )
                            })}
                        </div>

                        {filteredProposals.length > 4 && (
                            <div className="flex justify-center mt-4">
                                <Button variant="outline" size="sm" onClick={() => setShowAll(!showAll)}>
                                    {showAll ? "Show Less" : `Show More (${filteredProposals.length - 4})`}
                                </Button>
                            </div>
                        )}
                    </>
                )}

                <div className="flex justify-center mt-6">
                    <Button asChild variant="outline" size="lg">
                        <Link href="/proposals" className="flex items-center gap-2">
                            View All Proposals
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

