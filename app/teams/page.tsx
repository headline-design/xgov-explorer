import type { Metadata } from "next"
import { proposals } from "@/data/xgov-sessions"
import { getUniqueTeams } from "@/data/xgov-sessions/transform"
import { TeamList } from "@/components/team-list"
import { Suspense } from "react"

export const metadata: Metadata = {
  title: "xGov Proposals by Team | Algorand xGov Explorer",
  description: "Explore Algorand xGov proposals grouped by team or creator across all voting sessions.",
}

export default function ProposalsPage() {
  // Get unique teams with their proposals
  const teams = getUniqueTeams(proposals)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="my-10 text-center">
        <h1 className="text-4xl font-bold mb-4">xGov Proposals by Team</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore all xGov proposals grouped by team or creator. See which teams have contributed multiple proposals
          across different voting sessions.
        </p>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Teams ({teams.length})</h2>
          <p className="text-muted-foreground text-sm">
            Showing {teams.reduce((acc, team) => acc + team.proposals.length, 0)} total proposals across {teams.length}{" "}
            teams
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <TeamList teams={teams} />
        </Suspense>
      </div>
    </div>
  )
}

