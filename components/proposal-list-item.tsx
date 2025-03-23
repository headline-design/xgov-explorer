"use client"

import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { generateGradient, shortenId, getGradientExplanation } from "@/lib/gradient-utils"
import { GrainOverlay } from "@/components/grain-overlay"
import { Check, X } from "lucide-react"
import type { Proposal } from "@/types/proposal"

interface ProposalListItemProps {
  proposal: Proposal
  onClick?: (proposal: Proposal) => void
}

export function ProposalListItem({ proposal, onClick }: ProposalListItemProps) {
  const gradient = generateGradient(proposal.id)

  const handleClick = () => {
    if (onClick) {
      onClick(proposal)
    }
  }

  return (
    <Card
      key={proposal.id}
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer dark:hover:shadow-primary/10"
      onClick={handleClick}
    >
      <div className="flex flex-col md:flex-row">
        <Link onClick={(e)=> e.stopPropagation()} href={`/proposal/${proposal.number}`} className="md:w-1/4 aspect-video overflow-hidden bg-muted relative">
          <div className="h-full w-full" style={{ background: gradient }}>
            <GrainOverlay intensity="light" />

            {/* Vote result badge (if available) */}
            {proposal.voteResult && (
              <div
                className={`absolute top-2 left-2 px-2 py-1 rounded-md flex items-center gap-1.5 text-xs font-medium ${
                  proposal.voteResult.passed ? "bg-green-500/80 text-white" : "bg-red-500/80 text-white"
                }`}
              >
                {proposal.voteResult.passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
                {proposal.voteResult.passed ? "Passed" : "Failed"}
              </div>
            )}

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md cursor-help z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    #{shortenId(proposal.id)}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs">
                  <p className="text-sm font-medium mb-1">Proposal ID: {proposal.id}</p>
                  <p className="text-xs text-muted-foreground">{getGradientExplanation(proposal.id)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </Link>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">
              <Link href={`/proposal/${proposal.number}`} className="hover:underline">
                {proposal.title}
              </Link>
            </h3>
            <Badge className="ml-2">{proposal.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{proposal.description}</p>
          <div className="flex justify-between text-sm">
            <span>Team: {proposal.team}</span>
            <span className="font-medium">
              {proposal.fundingAmount > 0 ? `${proposal.fundingAmount.toLocaleString()} ALGO` : "Core Proposal"}
            </span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Awarded: {new Date(proposal.awardDate).toLocaleDateString()}</span>
            <span>{proposal.xGovPeriod}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

