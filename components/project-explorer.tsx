"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ProjectDetailView } from "@/components/project-detail-view"
import { ProjectCard } from "@/components/project-card"
import { ProjectListItem } from "@/components/project-list-item"
import { Search, Filter, ArrowUpDown, CheckCircle, XCircle } from "lucide-react"
import { projects, session1Projects, session2Projects, session3Projects, session4Projects } from "@/data/xgov-sessions"
import type { Project } from "@/types/project"

export function ProjectExplorer() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedPeriod, setSelectedPeriod] = useState("all")
  const [selectedVoteStatus, setSelectedVoteStatus] = useState("all")
  const [sortBy, setSortBy] = useState("newest")
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Extract unique categories from projects
  const categories = ["all", ...Array.from(new Set(projects.map((project) => project.category)))].sort()

  // Define periods
  const periods = [
    { value: "all", label: "All Periods" },
    { value: "period1", label: "Period 1 (Jul-Aug 2023)" },
    { value: "period2", label: "Period 2 (Nov-Dec 2023)" },
    { value: "period3", label: "Period 3 (Feb-Mar 2024)" },
    { value: "period4", label: "Period 4 (May-Jun 2024)" },
  ]

  // Define vote status options
  const voteStatuses = [
    { value: "all", label: "All Proposals" },
    { value: "passed", label: "Passed Proposals" },
    { value: "failed", label: "Failed Proposals" },
    { value: "no-vote", label: "No Vote Data" },
  ]

  useEffect(() => {
    // First, select projects by period
    let periodProjects: Project[] = projects
    if (selectedPeriod === "period1") {
      periodProjects = session1Projects
    } else if (selectedPeriod === "period2") {
      periodProjects = session2Projects
    } else if (selectedPeriod === "period3") {
      periodProjects = session3Projects
    } else if (selectedPeriod === "period4") {
      periodProjects = session4Projects
    }

    let result = [...periodProjects]

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.team.toLowerCase().includes(query),
      )
    }

    // Filter by category
    if (selectedCategory !== "all") {
      result = result.filter((project) => project.category === selectedCategory)
    }

    // Filter by vote status
    if (selectedVoteStatus !== "all") {
      if (selectedVoteStatus === "passed") {
        result = result.filter((project) => project.voteResult?.passed === true)
      } else if (selectedVoteStatus === "failed") {
        result = result.filter((project) => project.voteResult?.passed === false)
      } else if (selectedVoteStatus === "no-vote") {
        result = result.filter((project) => !project.voteResult)
      }
    }

    // Sort projects
    if (sortBy === "newest") {
      result = result.sort((a, b) => new Date(b.awardDate).getTime() - new Date(a.awardDate).getTime())
    } else if (sortBy === "oldest") {
      result = result.sort((a, b) => new Date(a.awardDate).getTime() - new Date(b.awardDate).getTime())
    } else if (sortBy === "fundingHighToLow") {
      result = result.sort((a, b) => b.fundingAmount - a.fundingAmount)
    } else if (sortBy === "fundingLowToHigh") {
      result = result.sort((a, b) => a.fundingAmount - b.fundingAmount)
    } else if (sortBy === "alphabetical") {
      result = result.sort((a, b) => a.title.localeCompare(b.title))
    } else if (sortBy === "voteMargin") {
      // Sort by vote margin (votes received - votes needed) for projects with vote data
      result = result.sort((a, b) => {
        const marginA = a.voteResult ? a.voteResult.votesReceived - a.voteResult.votesNeeded : Number.NEGATIVE_INFINITY
        const marginB = b.voteResult ? b.voteResult.votesReceived - b.voteResult.votesNeeded : Number.NEGATIVE_INFINITY
        return marginB - marginA
      })
    }

    setFilteredProjects(result)
  }, [searchQuery, selectedCategory, selectedPeriod, selectedVoteStatus, sortBy])

  const handleProjectClick = (project: Project) => {
    setSelectedProject(project)
    setIsDialogOpen(true)
  }

  // Calculate vote statistics
  const voteStats = {
    total: filteredProjects.length,
    passed: filteredProjects.filter((p) => p.voteResult?.passed).length,
    failed: filteredProjects.filter((p) => p.voteResult?.passed === false).length,
    noVote: filteredProjects.filter((p) => !p.voteResult).length,
  }

  return (
    <section className="w-full py-6 md:py-12" id="projects">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col space-y-4">
          <h2 className="text-3xl font-bold tracking-tighter">xGov Award Winners</h2>
          <p className="text-muted-foreground">
            Browse through projects that have received funding through the Algorand Foundation xGov program.
          </p>

          <div className="flex flex-col md:flex-row gap-4 my-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search projects..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                  <SelectTrigger className="w-[220px]">
                    <SelectValue placeholder="Period" />
                  </SelectTrigger>
                  <SelectContent>
                    {periods.map((period) => (
                      <SelectItem key={period.value} value={period.value}>
                        {period.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-muted-foreground" />
                <Select value={selectedVoteStatus} onValueChange={setSelectedVoteStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Vote Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {voteStatuses.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                    <SelectItem value="fundingHighToLow">Funding: High to Low</SelectItem>
                    <SelectItem value="fundingLowToHigh">Funding: Low to High</SelectItem>
                    <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    <SelectItem value="voteMargin">Vote Margin</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Vote statistics */}
          {(selectedPeriod === "period3" || selectedPeriod === "period4") && (
            <div className="flex flex-wrap gap-3 mb-6">
              <div className="bg-card border rounded-md px-4 py-2 flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Total:</span>
                <span className="font-medium">{voteStats.total} projects</span>
              </div>
              <div className="bg-card border rounded-md px-4 py-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span className="text-sm text-muted-foreground">Passed:</span>
                <span className="font-medium">{voteStats.passed} projects</span>
              </div>
              <div className="bg-card border rounded-md px-4 py-2 flex items-center gap-2">
                <XCircle className="h-4 w-4 text-red-500" />
                <span className="text-sm text-muted-foreground">Failed:</span>
                <span className="font-medium">{voteStats.failed} projects</span>
              </div>
              {voteStats.noVote > 0 && (
                <div className="bg-card border rounded-md px-4 py-2 flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">No Vote Data:</span>
                  <span className="font-medium">{voteStats.noVote} projects</span>
                </div>
              )}
            </div>
          )}

          <Tabs defaultValue="grid" className="w-full">
            <div className="flex justify-end mb-4">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="grid" className="mt-0">
              {filteredProjects.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project) => (
                    <ProjectCard key={project.id} project={project} onClick={handleProjectClick} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setSelectedPeriod("all")
                      setSelectedVoteStatus("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="list" className="mt-0">
              {filteredProjects.length > 0 ? (
                <div className="space-y-4">
                  {filteredProjects.map((project) => (
                    <ProjectListItem key={project.id} project={project} onClick={handleProjectClick} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No projects found matching your criteria.</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("all")
                      setSelectedPeriod("all")
                      setSelectedVoteStatus("all")
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          {selectedProject && <ProjectDetailView project={selectedProject} />}
        </DialogContent>
      </Dialog>
    </section>
  )
}

