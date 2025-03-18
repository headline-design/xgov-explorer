"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon, Check, X } from "lucide-react"
import type { Proposal } from "@/types/proposal"
import { generateGradient, shortenId } from "@/lib/gradient-utils"
import { GrainOverlay } from "@/components/grain-overlay"

interface ProposalCardProps {
  proposal: Proposal
  onClick?: (proposal: Proposal) => void
}

export function ProposalCard({ proposal, onClick }: ProposalCardProps) {
  const gradient = generateGradient(proposal.id)
  const shortId = shortenId(proposal.id)

  const handleClick = () => {
    if (onClick) {
      onClick(proposal)
    }
  }

  return (
    <Card
      key={proposal.id}
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer dark:hover:shadow-primary/10"
      onClick={handleClick}
    >
      <Link onClick={(e) => e.stopPropagation()} href={`/proposal/${proposal.number}`} className="block">
        <div className="h-48 w-full overflow-hidden bg-muted relative" style={{ background: gradient }}>
          {/* Grain overlay */}
          <GrainOverlay intensity="light" />

          {/* Vote result badge (if available) */}
          {proposal.voteResult && (
            <div
              className={`absolute top-2 left-2 px-2 py-1 rounded-md flex items-center gap-1.5 text-xs font-medium ${proposal.voteResult.passed
                ? "bg-green-500/90 text-white backdrop-blur-sm"
                : "bg-red-500/90 text-white backdrop-blur-sm"
                }`}
            >
              {proposal.voteResult.passed ? <Check className="h-3 w-3" /> : <X className="h-3 w-3" />}
              {proposal.voteResult.passed ? "Passed" : "Failed"}
              <span className="text-xs opacity-90 ml-1">
                ({Math.round((proposal.voteResult.votesReceived / proposal.voteResult.votesNeeded) * 100)}%)
              </span>
            </div>
          )}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
                <div className="absolute top-0 right-0 p-1.5 bg-black/30 backdrop-blur-sm rounded-bl-md dark:bg-white/10 flex items-center gap-1.5 hover:bg-black/40 dark:hover:bg-white/20 transition-colors z-10">
                  <span className="text-xs font-mono text-white dark:text-white/90">#{shortId}</span>
                  <InfoIcon className="h-3.5 w-3.5 text-white/80 dark:text-white/70" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="max-w-[250px] text-xs">
                <p>
                  This unique gradient is deterministically generated from the proposal&apos;s ID, creating a visual
                  fingerprint specific to this proposal.
                </p>
                <p className="mt-1 font-mono text-muted-foreground">Full ID: {proposal.id}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent z-[1]"></div>
        </div>
      </Link>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">
            <Link onClick={(e) => e.stopPropagation()} href={`/proposal/${proposal.number}`} className="hover:underline">
              {proposal.title}
            </Link>
          </CardTitle>
          <Badge>{proposal.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{proposal.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <span>Team: {proposal.team}</span>
          <span className="font-medium">
            {proposal.fundingAmount > 0 ? `${proposal.fundingAmount.toLocaleString()} ALGO` : "Core Proposal"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <div className="w-full flex justify-between">
          <span>Awarded: {new Date(proposal.awardDate).toLocaleDateString()}</span>
          <span>{proposal.xGovPeriod}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

