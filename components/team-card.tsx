"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Proposal } from "@/types/proposal"
import { generateGradient } from "@/lib/gradient-utils"

interface TeamCardProps {
  teamName: string
  proposals: Proposal[]
  activeSince: string
  totalFunding: number
  onProposalClick: (proposal: Proposal) => void
}

export function TeamCard({ teamName, proposals, activeSince, totalFunding, onProposalClick }: TeamCardProps) {
  // Use the first proposal's ID to generate a team gradient
  const teamGradient = generateGradient(proposals[0].id + teamName)

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-24 w-full relative" style={{ background: teamGradient }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-xl font-bold text-white drop-shadow-md px-4 text-center truncate">{teamName}</h3>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {proposals.length} Proposal{proposals.length !== 1 ? "s" : ""}
          </CardTitle>
          <Badge variant="outline">Active since {activeSince}</Badge>
        </div>
        <CardDescription>Total funding: {totalFunding.toLocaleString()} ALGO</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto custom-scrollbar">
        <div className="space-y-3">
          {proposals.map((proposal) => (
            <div key={proposal.id} className="p-3 rounded-md border border-border hover:bg-accent/50 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium line-clamp-1">{proposal.title}</h4>
                <Badge variant="secondary" className="ml-2 shrink-0">
                  {proposal.xGovPeriod}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{proposal.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {new Date(proposal.awardDate).toLocaleDateString()}
                </span>
                <Button variant="ghost" size="sm" onClick={() => onProposalClick(proposal)} className="h-7 text-xs">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

