import type { Metadata } from "next"
import { projects } from "@/data/xgov-sessions"
import { getUniqueTeams } from "@/data/xgov-sessions/transform"
import { TeamList } from "@/components/team-list"

export const metadata: Metadata = {
  title: "xGov Projects by Team | Algorand xGov Explorer",
  description: "Explore Algorand xGov projects grouped by team or creator across all voting sessions.",
}

export default function ProjectsPage() {
  // Get unique teams with their projects
  const teams = getUniqueTeams(projects)

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="my-10 text-center">
        <h1 className="text-4xl font-bold mb-4">xGov Projects by Team</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore all xGov projects grouped by team or creator. See which teams have contributed multiple proposals
          across different voting sessions.
        </p>
      </div>

      <div>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-semibold">Teams ({teams.length})</h2>
          <p className="text-muted-foreground text-sm">
            Showing {teams.reduce((acc, team) => acc + team.projects.length, 0)} total projects across {teams.length}{" "}
            teams
          </p>
        </div>

        <TeamList teams={teams} />
      </div>
    </div>
  )
}

