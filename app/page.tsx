import type { Metadata } from "next"
import { HeroSection } from "@/components/hero-section"
import { ProjectExplorer } from "@/components/project-explorer"
import { FaqSection } from "@/components/faq-section"
import { FeaturedProjects } from "@/components/featured-projects"
import { VoteStatistics } from "@/components/vote-statistics"
import { VotingTrends } from "@/components/voting-trends"
import { projects } from "@/data/xgov-sessions"

export const metadata: Metadata = {
  title: "xGov Explorer | Algorand Foundation",
  description:
    "Discover innovative projects awarded through the Algorand Foundation xGov community governance program.",
}

export default function Home() {
  // Calculate statistics for the hero section
  const totalProjects = projects.length
  const totalFunding = projects.reduce((sum, project) => sum + (project.fundingAmount || 0), 0)
  const uniqueTeams = new Set(projects.map((p) => p.team)).size
  const categories = [...new Set(projects.map((p) => p.category))].filter(Boolean)


  const featuredProjectIds: string[] = [
    "b27703ae-a303-4969-8f18-44c2e33cf973",
    "e9e5d945-9025-4dc4-b5a2-135c761fb937",
    "a37478f9-42b1-4215-a321-1f01c21a81f5",
  ];

  const featuredProjects = projects.filter((project) =>
    featuredProjectIds.includes(project.id)
  )

  // Sort projects by funding amount in ascending order
  const sortedFeaturedProjects = featuredProjects.sort((a, b) => {
    const fundingA = a.fundingAmount || 0;
    const fundingB = b.fundingAmount || 0;
    return fundingA - fundingB; // Sort in ascending order
  });

  return (
    <>
      <HeroSection
        totalProjects={totalProjects}
        totalFunding={totalFunding}
        uniqueTeams={uniqueTeams}
        categories={categories}
      />
      <FeaturedProjects projects={sortedFeaturedProjects} />
      <VoteStatistics />
      <VotingTrends />
      <ProjectExplorer />

      <FaqSection />
    </>
  )
}

