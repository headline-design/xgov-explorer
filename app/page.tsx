import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ProposalExplorer } from "@/components/proposal-explorer"
import { FaqSection } from "@/components/faq-section"
import { VoteStatistics } from "@/components/vote-statistics"
import { VotingTrends } from "@/components/voting-trends"
import { proposals } from "@/data/xgov-sessions"
import FeaturedProposals from "@/components/featured-proposals"
import { metadata } from "./metadata"

// Rich metadata optimized for SEO
export { metadata }

export default function Home() {
  // Calculate statistics for the hero section
  const totalProposals = proposals.length
  const totalFunding = proposals.reduce((sum, proposal) => sum + (proposal.fundingAmount || 0), 0)
  const uniqueTeams = new Set(proposals.map((p) => p.team)).size
  const categories = [...new Set(proposals.map((p) => p.category))].filter(Boolean)


  const featuredProposalIds: string[] = [
    "b27703ae-a303-4969-8f18-44c2e33cf973",
    "e9e5d945-9025-4dc4-b5a2-135c761fb937",
    "a37478f9-42b1-4215-a321-1f01c21a81f5",
  ];

  const featuredProposals = proposals.filter((proposal) =>
    featuredProposalIds.includes(proposal.id)
  )

  // Sort proposals by funding amount in ascending order
  const sortedFeaturedProposals = featuredProposals.sort((a, b) => {
    const fundingA = a.fundingAmount || 0;
    const fundingB = b.fundingAmount || 0;
    return fundingA - fundingB; // Sort in ascending order
  });

  return (
    <>
      <HeroSection
        totalProposals={totalProposals}
        totalFunding={totalFunding}
        uniqueTeams={uniqueTeams}
        categories={categories}
      />
      <FeaturedProposals proposals={sortedFeaturedProposals} />
      <VoteStatistics />
      <VotingTrends />
      <ProposalExplorer />

      <FaqSection />
    </>
  )
}

