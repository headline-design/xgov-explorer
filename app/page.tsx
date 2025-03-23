import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ProposalExplorer } from "@/components/proposal-explorer"
import { FaqSection } from "@/components/faq-section"
import { VoteStatistics } from "@/components/vote-statistics"
import { VotingTrends } from "@/components/voting-trends"
import { proposals } from "@/data/xgov-sessions"
import FeaturedProposals from "@/components/featured-proposals"
import { faqItems } from "@/lib/faq-data"

// Rich metadata optimized for SEO
export const metadata: Metadata = {
  title: "SIWA | Sign-In with Algorand",
  description:
    "Discover the power of Algorand and Algorand Unified Auth for secure, scalable blockchain solutions. Learn how Algorand's innovative technology is revolutionizing decentralized applications.",
  openGraph: {
    title: "SIWA | Sign-In with Algorand",
    description:
      "Discover the power of Algorand and Algorand Unified Auth for secure, scalable blockchain solutions. Learn how Algorand's innovative technology is revolutionizing decentralized applications.",
    type: "website",
    url: "https://siwa.org",
    images: [{ url: "/opengraph-image.png" }],
  },
  alternates: {
    canonical: "https://siwa.org",
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
    "ETF",
    "CBDC",
    "Ethereum comparison",
    "environmental impact",
    "interoperability",
  ],
  other: {
    structured_data: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqItems.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: `${item.answer} (Source: ${item.source})`,
        },
        citation: {
          "@type": "CreativeWork",
          url: item.source,
        },
      })),
    }),
  },
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
      <FeaturedProposals proposals={sortedFeaturedProposals} />
      <VoteStatistics />
      <VotingTrends />
      <ProposalExplorer />

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

