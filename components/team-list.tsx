"use client"

import { useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Users, Award, Calendar, X } from "lucide-react"
import type { Proposal } from "@/types/proposal"
import { ProposalDetailView } from "@/components/proposal-detail-view"

import "./team-list.css"
import DialogV2 from "./ui/dialog-v2/dialog-v2"

interface TeamListProps {
  teams: { team: string; proposals: Proposal[] }[]
}

export function TeamList({ teams }: TeamListProps) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const teamParam = searchParams.get("team")

  const [searchQuery, setSearchQuery] = useState(teamParam || "")
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Update search query when URL parameter changes
  useEffect(() => {
    if (teamParam) {
      setSearchQuery(teamParam)
    }
  }, [teamParam])

  // Filter teams based on search query
  const filteredTeams = teams.filter(
    (team) =>
      team.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.proposals.some(
        (proposal) =>
          proposal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          proposal.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  )

  const handleProposalClick = (proposal: Proposal) => {
    setSelectedProposal(proposal)
    setIsDialogOpen(true)
  }

  const handleSearchChange = (value: string) => {
    setSearchQuery(value)

    // Update URL with search query
    if (value) {
      const params = new URLSearchParams(searchParams.toString())
      params.set("team", value)
      router.push(`/teams?${params.toString()}`, { scroll: false })
    } else {
      // Remove query parameter if search is cleared
      router.push("/teams", { scroll: false })
    }
  }

  const clearSearch = () => {
    setSearchQuery("")
    router.push("/teams", { scroll: false })
  }

  // If we have a team parameter and exactly one matching team, highlight it
  const exactMatch =
    teamParam && filteredTeams.length === 1 && filteredTeams[0].team.toLowerCase() === teamParam.toLowerCase()

  return (
    <>
      <div className="mb-6">
        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search teams or proposals..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={clearSearch}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {teamParam && (
        <div className="mb-4 flex items-center">
          <Badge variant="outline" className="mr-2">
            Filtered by team: {teamParam}
          </Badge>
          <Button variant="ghost" size="sm" onClick={clearSearch} className="h-7 px-2">
            <X className="h-3.5 w-3.5 mr-1" />
            Clear filter
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card
            key={team.team}
            className={`overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full ${exactMatch ? "ring-2 ring-primary" : ""
              }`}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold line-clamp-2 pr-2">{team.team}</h3>
                <Badge className="shrink-0">
                  {team.proposals.length} {team.proposals.length === 1 ? "Proposal" : "Proposals"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    Active since xGov{" "}
                    {
                      team.proposals.sort((a, b) => new Date(a.awardDate).getTime() - new Date(b.awardDate).getTime())[0]
                        .xGovPeriod
                    }
                  </span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Award className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    Total funding:{" "}
                    {team.proposals.reduce((sum, proposal) => sum + proposal.fundingAmount, 0).toLocaleString()} ALGO
                  </span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    Latest proposal:{" "}
                    {new Date(
                      team.proposals.sort((a, b) => new Date(b.awardDate).getTime() - new Date(a.awardDate).getTime())[0]
                        .awardDate,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Proposals:</h4>
                <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
                  {team.proposals.map((proposal) => (
                    <Button
                      key={proposal.id}
                      variant="outline"
                      className="w-full justify-start text-left p-2.5 h-auto border-muted"
                      asChild
                    >
                      <Link href={`/proposal/${proposal.number}`}>
                        <div className="w-full">
                          <div className="font-medium text-sm line-clamp-1">{proposal.title}</div>
                          <div className="text-xs text-muted-foreground flex justify-between w-full mt-1">
                            <span className="flex items-center">
                              <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1.5"></span>
                              {proposal.xGovPeriod}
                            </span>
                            <span>{proposal.fundingAmount.toLocaleString()} ALGO</span>
                          </div>
                        </div>
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredTeams.length === 0 && (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No teams found</h3>
          <p className="text-muted-foreground">Try adjusting your search query</p>
          <Button variant="outline" className="mt-4" onClick={clearSearch}>
            Clear search
          </Button>
        </div>
      )}

      <DialogV2 showModal={isDialogOpen} setShowModal={setIsDialogOpen}>
        {selectedProposal && <ProposalDetailView proposal={selectedProposal} closeModal={() => setIsDialogOpen(false)} />}
      </DialogV2>
    </>
  )
}

