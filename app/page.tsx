import type { Metadata } from "next"
import { HeroSection } from "@/components/home/hero-section"
import { ProposalExplorer } from "@/components/proposal-explorer"
import { FaqSection } from "@/components/home/faq-section"
import { VoteStatistics } from "@/components/home/vote-statistics"
import { VotingTrends } from "@/components/home/voting-trends"
import { proposals } from "@/data/xgov-sessions"
import FeaturedProposals from "@/components/home/featured-proposals"
import { faqItems } from "@/lib/faq-data"
import { GitHubBanner } from "@/components/home/github-banner"
import { RecentlyUpdatedProposals } from "@/components/home/recently-updated-proposals"
import { FeaturedBlog } from "@/components/home/featured-blog"
import { LatestBlogs } from "@/components/home/latest-blogs"

// Rich metadata optimized for SEO
export const metadata: Metadata = {
  title: "xGov Explorer | Algorand Governance",
  description:
    "Discover the power of Algorand and Algorand Governance for secure, scalable blockchain solutions. Learn how Algorand's innovative technology is revolutionizing decentralized applications.",
  openGraph: {
    title: "xGov Explorer | Algorand Governance",
    description:
      "Discover the power of Algorand and Algorand Governance for secure, scalable blockchain solutions. Learn how Algorand's innovative technology is revolutionizing decentralized applications.",
    type: "website",
    url: "https://xgov.app",
    images: [{ url: "/images/og-image.png" }],
  },
  alternates: {
    canonical: "https://xgov.app",
  },
  keywords: [
    "Algorand",
    "blockchain",
    "cryptocurrency",
    "smart contracts",
    "ASA",
    "Pure Proof-of-Stake",
    "staking",
    "governance",
    "environmental impact",
    "interoperability",
  ],
};



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
      <GitHubBanner />
      <RecentlyUpdatedProposals />
      <FeaturedProposals proposals={sortedFeaturedProposals} />
      <VoteStatistics />
      <VotingTrends />
      <ProposalExplorer />
      <FeaturedBlog />
      <LatestBlogs />
      <FaqSection />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: faqItems.map((item) => ({
              "@type": "Question",
              name: item.question,
              acceptedAnswer: {
                "@type": "Answer",
                text: item.answer,
              },
            })),
          }),
        }}
      />
    </>
  )
}

