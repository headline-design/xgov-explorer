"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Search, Users, Award, Calendar } from "lucide-react"
import type { Project } from "@/types/project"
import { ProjectDetailView } from "@/components/project-detail-view"

// Add this after the imports
import "./team-list.css"

interface TeamListProps {
  teams: { team: string; projects: Project[] }[]
}

export function TeamList({ teams }: TeamListProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Filter teams based on search query
  const filteredTeams = teams.filter(
    (team) =>
      team.team.toLowerCase().includes(searchQuery.toLowerCase()) ||
      team.projects.some(
        (project) =>
          project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          project.description.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  )

  return (
    <>
      <div className="mb-6">
        <div className="relative max-w-md mx-auto sm:mx-0">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search teams or projects..."
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label="Clear search"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.map((team) => (
          <Card key={team.team} className="overflow-hidden hover:shadow-md transition-shadow flex flex-col h-full">
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <h3 className="text-xl font-bold line-clamp-2 pr-2">{team.team}</h3>
                <Badge className="shrink-0">
                  {team.projects.length} {team.projects.length === 1 ? "Project" : "Projects"}
                </Badge>
              </div>

              <div className="grid grid-cols-1 gap-3 mb-4 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Users className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    Active since xGov{" "}
                    {
                      team.projects.sort((a, b) => new Date(a.awardDate).getTime() - new Date(b.awardDate).getTime())[0]
                        .xGovPeriod
                    }
                  </span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Award className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    Total funding:{" "}
                    {team.projects.reduce((sum, project) => sum + project.fundingAmount, 0).toLocaleString()} ALGO
                  </span>
                </div>

                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-2 h-4 w-4 shrink-0" />
                  <span className="truncate">
                    Latest project:{" "}
                    {new Date(
                      team.projects.sort((a, b) => new Date(b.awardDate).getTime() - new Date(a.awardDate).getTime())[0]
                        .awardDate,
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-sm mb-2">Projects:</h4>
                <div className="space-y-1.5 max-h-[250px] overflow-y-auto pr-1 custom-scrollbar">
                  {team.projects.map((project) => (
                    <Dialog key={project.id}>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left p-2.5 h-auto border-muted"
                          onClick={() => setSelectedProject(project)}
                        >
                          <div className="w-full">
                            <div className="font-medium text-sm line-clamp-1">{project.title}</div>
                            <div className="text-xs text-muted-foreground flex justify-between w-full mt-1">
                              <span className="flex items-center">
                                <span className="inline-block w-2 h-2 rounded-full bg-primary mr-1.5"></span>
                                {project.xGovPeriod}
                              </span>
                              <span>{project.fundingAmount.toLocaleString()} ALGO</span>
                            </div>
                          </div>
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                        {selectedProject && <ProjectDetailView project={selectedProject} />}
                      </DialogContent>
                    </Dialog>
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
        </div>
      )}
    </>
  )
}

