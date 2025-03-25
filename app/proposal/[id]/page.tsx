import { notFound } from "next/navigation"
import Link from "next/link"
import { Suspense } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Github, Twitter, Check, X, ArrowLeft, ThumbsUp, ThumbsDown } from "lucide-react"
import { proposals } from "@/data/xgov-sessions"
import { generateGradient } from "@/lib/gradient-utils"
import { GrainOverlay } from "@/components/grain-overlay"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { ProgressUpdates } from "@/components/progress-updates"
import { ClaimProposal } from "@/components/claim-proposal"
import { VoteButtons } from "@/components/votes/vote-buttons"
import { CommentsSection } from "@/components/comments/comments-section"
import Markdown from "@/components/markdown/markdown"
import prisma from "@/lib/prisma"
import ButtonLink from "@/components/ui/button-link"

// Update the generateMetadata function to await params
export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const proposal = proposals.find((p) => p.number === id)

  if (!proposal) {
    return {
      title: "Proposal Not Found | xGov Explorer",
      description: "The requested proposal could not be found.",
    }
  }

  return {
    title: `${proposal.title} | xGov Explorer`,
    description: proposal.description.substring(0, 160),
  }
}

// Update the page component to await params and fetch from database
export default async function ProposalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  // Try to fetch from database first
  const dbProposal = await prisma.proposal
    .findUnique({
      where: { number: Number.parseInt(id) },
      include: {
        milestones: true,
        progressUpdates: {
          orderBy: { createdAt: "desc" },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                image: true,
              },
            },
          },
        },
      },
    })
    .catch(() => null) // Add error handling here

  // Fall back to static data if not in database
  const staticProposal = proposals.find((p) => p.number === id)

  // Use database data if available, otherwise use static data
  const proposal = dbProposal || staticProposal

  if (!proposal) {
    notFound()
  }

  // Fetch vote counts from database
  const voteData = await prisma.vote
    .groupBy({
      by: ["voteType"],
      where: {
        proposalId: proposal.id,
      },
      _count: {
        id: true,
      },
    })
    .catch(() => [])

  // Calculate upvotes and downvotes
  const upvotes = voteData.find((v) => v.voteType === "UPVOTE")?._count?.id || 0
  const downvotes = voteData.find((v) => v.voteType === "DOWNVOTE")?._count?.id || 0

  const gradient = generateGradient(proposal.id)

  return (
    <div className="min-h-screen">
      {/* Back button */}
      <div className="container px-4 md:px-6 pt-6">
        <ButtonLink text="Back to Proposals" icon={<ArrowLeft className=" h-4 w-4" />} href="/proposals" variant="ghost" className="mb-4" />
      </div>

      {/* Gradient Banner */}
      <div className="relative h-48 md:h-64 w-full overflow-hidden" style={{ background: gradient }}>
        <GrainOverlay intensity="light" />

        {/* Proposal ID Badge */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-mono cursor-help">
                #{proposal.id}
              </div>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p className="text-sm max-w-[250px]">
                This unique gradient was generated from the proposal ID hash, creating a visual fingerprint for this
                proposal.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        {/* Vote Buttons */}
        <div className="absolute bottom-4 right-4 bg-black/20 backdrop-blur-sm rounded-lg p-3">
          <VoteButtons
            entityId={proposal.id}
            entityType="proposal"
            initialUpvotes={upvotes}
            initialDownvotes={downvotes}
            size="lg"
            className="text-white"
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="container px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Left Column - Main Content */}
          <div className="md:col-span-2 space-y-8">
            <div>
              <div className="flex flex-wrap items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold">{proposal.title}</h1>
                <Badge className="ml-auto">{proposal.category}</Badge>
              </div>
              <p className="text-muted-foreground">
                By {proposal.team} • {proposal.xGovPeriod} • Awarded {new Date(proposal.awardDate).toLocaleDateString()}
              </p>
            </div>

            {/* Vote Results (if available) */}
            {"voteResult" in proposal && proposal.voteResult && (
              <div className="p-4 rounded-lg border bg-card">
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
                  <span className="font-medium">
                    {proposal.voteResult.passed ? "Proposal Passed" : "Proposal Failed"}
                  </span>
                  <span className="text-sm text-muted-foreground ml-2">
                    ({Math.round((proposal.voteResult.votesReceived / proposal.voteResult.votesNeeded) * 100)}% of
                    required votes)
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

            {/* Proposal Description */}
            <div>
              <h3 className="text-lg font-semibold mb-3">About the Proposal</h3>
              <div className="text-muted-foreground space-y-4 prose prose-sm dark:prose-invert max-w-none">
                {/* Handle HTML content if present */}
                {typeof proposal.description === "string" && proposal.description.includes("<") ? (
                  <div dangerouslySetInnerHTML={{ __html: proposal.description }} />
                ) : (
                  <Suspense fallback={<div>Loading...</div>}>
                    <Markdown body={proposal.description} />
                  </Suspense>
                )}

                {"longDescription" in proposal &&
                  proposal.longDescription &&
                  (proposal.longDescription.includes("<") ? (
                    <div className="mt-4" dangerouslySetInnerHTML={{ __html: proposal.longDescription }} />
                  ) : (
                    <Suspense fallback={<div>Loading...</div>}>
                      <Markdown body={proposal.longDescription} />
                    </Suspense>
                  ))}
              </div>
            </div>

            {/* Claim Proposal Section */}
            {dbProposal && (
              <div>
                <h3 className="text-lg font-semibold mb-3">Claim This Proposal</h3>
                <ClaimProposal
                  proposalId={proposal.id}
                  proposalGithub={proposal.github ?? undefined}
                  teamName={proposal.team}
                  initialClaimed={dbProposal.claimed}
                />
              </div>
            )}

            {/* Progress Updates Section */}
            <ProgressUpdates
              proposalId={proposal.id}
              teamName={proposal.team}
              currentCompletionPercentage={proposal.completionPercentage}
              progressUpdates={
                dbProposal?.progressUpdates.map((update) => ({
                  ...update,
                  createdAt: update.createdAt.toISOString(),
                  updatedAt: update.updatedAt.toISOString(),
                })) || []
              }
              isInDatabase={!!dbProposal}
            />

            {/* Milestones Section */}
            {"milestones" in proposal && proposal.milestones && proposal.milestones.length > 0 && (
              <div>
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

            {/* Comments Section */}
            <CommentsSection proposalId={proposal.id} />
          </div>

          {/* Right Column - Proposal Info */}
          <div className="space-y-6">
            {/* Proposal Summary Card */}
            <div className="bg-card rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-3">Proposal Summary</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-muted-foreground">Funding</div>
                  <div className="font-bold">
                    {proposal.fundingAmount > 0 ? `${proposal.fundingAmount.toLocaleString()} ALGO` : "Core Proposal"}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">xGov Period</div>
                  <div className="font-bold">{proposal.xGovPeriod}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Status</div>
                  <div className="font-bold">{proposal.status}</div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Completion</div>
                  <div className="font-bold">{proposal.completionPercentage}%</div>
                  <div className="w-full h-2 bg-muted rounded-full mt-1 overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${proposal.completionPercentage}%` }}></div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground">Community Votes</div>
                  <div className="flex items-center gap-4 mt-1">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1 text-green-600" />
                      <span className="font-bold">{upvotes}</span>
                    </div>
                    <div className="flex items-center">
                      <ThumbsDown className="h-4 w-4 mr-1 text-red-600" />
                      <span className="font-bold">{downvotes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Links Section */}
            <div className="bg-card rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-3">Links</h3>
              <div className="space-y-3">
                {proposal.website && (
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href={proposal.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Website
                    </a>
                  </Button>
                )}
                {proposal.github && (
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href={proposal.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                )}
                {proposal.twitter && (
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href={proposal.twitter} target="_blank" rel="noopener noreferrer">
                      <Twitter className="mr-2 h-4 w-4" />
                      Twitter
                    </a>
                  </Button>
                )}
                {proposal.proposalLink && (
                  <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                    <a href={proposal.proposalLink} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      View Original Proposal
                    </a>
                  </Button>
                )}
              </div>
            </div>

            {/* Team Info */}
            <div className="bg-card rounded-lg border p-4">
              <h3 className="text-lg font-semibold mb-3">Team</h3>
              <div className="text-muted-foreground">
                <p>{proposal.team}</p>
                <Button variant="link" className="p-0 h-auto mt-2" asChild>
                  <Link href={`/teams?team=${encodeURIComponent(proposal.team)}`}>View all proposals by this team</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

