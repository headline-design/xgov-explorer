"use client"

import { useState } from "react"
import type { Proposal } from "@/types/proposal"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ProposalDetailView } from "@/components/proposal-detail-view"
import { generateGradient } from "@/lib/gradient-utils"
import { GrainOverlay } from "@/components/grain-overlay"
import DialogV2 from "../ui/dialog-v2/dialog-v2"
import Link from "next/link"

interface FeaturedProposalsProps {
  proposals: Proposal[]
}

export const FeaturedProposals = ({ proposals }: FeaturedProposalsProps) => {
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)

  // Select the 3 most recently awarded proposals
  const featured = [...proposals]
    .sort((a, b) => new Date(b.awardDate).getTime() - new Date(a.awardDate).getTime())
    .slice(0, 3)

  return (
    <section className="w-full py-12 md:py-24 bg-background" id="featured">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Featured Proposals</h2>
          <p className="text-muted-foreground max-w-3xl">
            Highlighting exceptional contributions from the xGov program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((proposal) => (
            <Card
              key={proposal.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedProposal(proposal)}
            >
              <Link onClick={(e) => e.stopPropagation()} href={`/proposal/${proposal.number}`} >
                <div className="h-32 w-full relative" style={{ background: generateGradient(proposal.id) }}>
                  <GrainOverlay intensity="light" />
                </div>
              </Link>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl font-semibold line-clamp-2">{proposal.title}</h3>
                  <Badge className="shrink-0">{proposal.category}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">By {proposal.team}</p>
              </CardContent>

              <CardFooter className="text-sm text-muted-foreground pt-0">
                <div className="flex justify-between w-full">
                  <span>{proposal.xGovPeriod}</span>
                  <span>{proposal.fundingAmount.toLocaleString()} ALGO</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Proposal detail dialog */}
      <DialogV2 showModal={!!selectedProposal} setShowModal={(open) => !open && setSelectedProposal(null)}>
        {selectedProposal && <ProposalDetailView proposal={selectedProposal} closeModal={() => setSelectedProposal(null)} />}
      </DialogV2>
    </section>
  )
}

export default FeaturedProposals

