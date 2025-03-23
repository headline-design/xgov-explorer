"use client"

import { useEffect, useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ExternalLink, Github, Twitter, Check, X } from "lucide-react"
import type { Proposal } from "@/types/proposal"
import { generateGradient, shortenId } from "@/lib/gradient-utils"
import { GrainOverlay } from "@/components/grain-overlay"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { VoteButtons } from "@/components/votes/vote-buttons"
import { CommentsSection } from "@/components/comments/comments-section"

interface ProposalDetailViewProps {
  proposal: Proposal
  closeModal: () => void
}

export function ProposalDetailView({ proposal, closeModal }: ProposalDetailViewProps) {
  const gradient = generateGradient(proposal.id)
  const [upvotes, setUpvotes] = useState(0)
  const [downvotes, setDownvotes] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  // Fetch vote counts when the component mounts
  useEffect(() => {
    const fetchVoteCounts = async () => {
      try {
        const response = await fetch(`/api/proposals/${proposal.id}/votes`)
        if (response.ok) {
          const data = await response.json()
          setUpvotes(data.upvotes || 0)
          setDownvotes(data.downvotes || 0)
        }
      } catch (error) {
        console.error("Error fetching vote counts:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchVoteCounts()
  }, [proposal.id])

  return (
    <>
      <DialogHeader className="sticky top-0 z-10 bg-background p-4">
        <div className="flex items-center justify-start max-w-[90%]">
          <DialogTitle className="text-2xl whitespace-nowrap text-ellipsis overflow-hidden">
            {proposal.title}
          </DialogTitle>
          <Badge className="ml-2">{proposal.category}</Badge>
        </div>
        <DialogDescription className="text-sm text-muted-foreground text-start">
          By {proposal.team} • {proposal.xGovPeriod} • Awarded {new Date(proposal.awardDate).toLocaleDateString()}
        </DialogDescription>
        <X
          className="absolute top-4 right-4 h-6 w-6 text-muted-foreground hover:text-foreground cursor-pointer"
          onClick={closeModal}
        />
      </DialogHeader>
      <div className="max-h-[60vh] overflow-y-auto px-4 pb-6">
        {/* Gradient Strip with ID Badge */}
        <div className="relative h-32 sm:h-40 w-full overflow-hidden rounded-lg bg-muted mb-6">
          <div className="absolute inset-0" style={{ background: gradient }} />
          <GrainOverlay intensity="light" />

          {/* ID Badge */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-mono cursor-help">
                  #{shortenId(proposal.id)}
                </div>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p className="text-sm font-mono mb-1">Proposal ID: {proposal.id}</p>
                <p className="text-xs max-w-[250px]">
                  This unique gradient was generated from the proposal ID hash, creating a visual fingerprint for this
                  proposal.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* Add Vote Buttons */}
          <div className="absolute bottom-3 left-3 bg-black/20 backdrop-blur-sm rounded-lg p-2">
            <VoteButtons
              entityId={proposal.id}
              entityType="proposal"
              initialUpvotes={upvotes}
              initialDownvotes={downvotes}
              size="md"
              className="text-white"
            />
          </div>
        </div>

        {/* Vote Results (if available) */}
        {proposal.voteResult && (
          <div className="mb-6 p-4 rounded-lg border bg-card">
            <h3 className="text-lg font-semibold mb-3">Vote Results</h3>
            <div className="flex items-center mb-3">
              <div
                className={`mr-2 p-1 rounded-full ${proposal.voteResult.passed ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"}`}
              >
                {proposal.voteResult.passed ? (
                  <Check className="h-4 w-4 text-green-600 dark:text-green-400" />
                ) : (
                  <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                )}
              </div>
              <span className="font-medium">{proposal.voteResult.passed ? "Proposal Passed" : "Proposal Failed"}</span>
              <span className="text-sm text-muted-foreground ml-2">
                ({Math.round((proposal.voteResult.votesReceived / proposal.voteResult.votesNeeded) * 100)}% of required
                votes)
              </span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-sm text-muted-foreground">Votes Received</div>
                <div className="font-medium">{proposal.voteResult.votesReceived.toLocaleString()}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Votes Needed</div>
                <div className="font-medium">{proposal.voteResult.votesNeeded.toLocaleString()}</div>
              </div>
            </div>
            <div className="mt-3">
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <div
                  className={`h-full ${proposal.voteResult.passed ? "bg-green-500" : "bg-red-500"}`}
                  style={{
                    width: `${Math.min(100, (proposal.voteResult.votesReceived / proposal.voteResult.votesNeeded) * 100)}%`,
                  }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Proposal Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          <div className="bg-muted p-3 rounded-lg dark:bg-muted/50">
            <div className="text-sm text-muted-foreground">Funding</div>
            <div className="font-bold">
              {proposal.fundingAmount > 0 ? `${proposal.fundingAmount.toLocaleString()} ALGO` : "Core Proposal"}
            </div>
          </div>
          <div className="bg-muted p-3 rounded-lg dark:bg-muted/50">
            <div className="text-sm text-muted-foreground">xGov Period</div>
            <div className="font-bold">{proposal.xGovPeriod}</div>
          </div>
          <div className="bg-muted p-3 rounded-lg dark:bg-muted/50">
            <div className="text-sm text-muted-foreground">Status</div>
            <div className="font-bold">{proposal.status}</div>
          </div>
          <div className="bg-muted p-3 rounded-lg dark:bg-muted/50">
            <div className="text-sm text-muted-foreground">Completion</div>
            <div className="font-bold">{proposal.completionPercentage}%</div>
          </div>
        </div>

        {/* Proposal Description */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">About the Proposal</h3>
          <div className="text-muted-foreground space-y-4 prose prose-sm dark:prose-invert max-w-none">
            {/* Handle HTML content if present */}
            {proposal.description.includes("<") ? (
              <div dangerouslySetInnerHTML={{ __html: proposal.description }} />
            ) : (
              <p>{proposal.description}</p>
            )}

            {proposal.longDescription &&
              (proposal.longDescription.includes("<") ? (
                <div className="mt-4" dangerouslySetInnerHTML={{ __html: proposal.longDescription }} />
              ) : (
                <p className="mt-4">{proposal.longDescription}</p>
              ))}
          </div>
        </div>

        {/* Milestones Section */}
        {proposal.milestones && proposal.milestones.length > 0 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Milestones</h3>
            <div className="space-y-4">
              {proposal.milestones.map((milestone, index) => (
                <div key={index} className="border-l-2 pl-4 pb-2 dark:border-primary/50">
                  <div className="flex items-center">
                    <div
                      className={`w-3 h-3 rounded-full mr-2 ${milestone.completed ? "bg-green-500" : "bg-muted-foreground"}`}
                    ></div>
                    <h4 className="font-medium">{milestone.title}</h4>
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                  {milestone.completedDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Completed: {new Date(milestone.completedDate).toLocaleDateString()}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Links Section */}
        <div className="flex flex-wrap gap-3 mb-6">
          {proposal.website && (
            <Button variant="outline" size="sm" asChild>
              <a href={proposal.website} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                Website
              </a>
            </Button>
          )}
          {proposal.github && (
            <Button variant="outline" size="sm" asChild>
              <a href={proposal.github} target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </a>
            </Button>
          )}
          {proposal.twitter && (
            <Button variant="outline" size="sm" asChild>
              <a href={proposal.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="mr-2 h-4 w-4" />
                Twitter
              </a>
            </Button>
          )}
          {proposal.proposalLink && (
            <Button variant="outline" size="sm" asChild>
              <a href={proposal.proposalLink} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="mr-2 h-4 w-4" />
                View Proposal
              </a>
            </Button>
          )}
        </div>

        {/* Comments Section */}
        <CommentsSection proposalId={proposal.id} />
      </div>
    </>
  )
}

