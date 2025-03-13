"use client"

import { useState } from "react"
import type { Project } from "@/types/project"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ProjectDetailView } from "@/components/project-detail-view"
import { generateGradient } from "@/lib/gradient-utils"
import { GrainOverlay } from "@/components/grain-overlay"

interface FeaturedProjectsProps {
  projects: Project[]
}

export const FeaturedProjects = ({ projects }: FeaturedProjectsProps) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  // Select the 3 most recently awarded projects
  const featured = [...projects]
    .sort((a, b) => new Date(b.awardDate).getTime() - new Date(a.awardDate).getTime())
    .slice(0, 3)

  return (
    <section className="w-full py-12 md:py-24 bg-background" id="featured">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col space-y-4 mb-8">
          <h2 className="text-3xl font-bold tracking-tighter">Featured Projects</h2>
          <p className="text-muted-foreground max-w-3xl">
            Highlighting exceptional contributions from the xGov program.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedProject(project)}
            >
              <div className="h-40 w-full relative" style={{ background: generateGradient(project.id) }}>
                <GrainOverlay intensity="light" />
              </div>

              <CardHeader className="pb-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="text-xl font-semibold line-clamp-2">{project.title}</h3>
                  <Badge className="shrink-0">{project.category}</Badge>
                </div>
              </CardHeader>

              <CardContent className="pb-2">
                <p className="text-sm text-muted-foreground">By {project.team}</p>
              </CardContent>

              <CardFooter className="text-sm text-muted-foreground pt-0">
                <div className="flex justify-between w-full">
                  <span>{project.xGovPeriod}</span>
                  <span>{project.fundingAmount.toLocaleString()} ALGO</span>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Project detail dialog */}
      <Dialog open={!!selectedProject} onOpenChange={(open) => !open && setSelectedProject(null)}>
        <DialogContent className="max-w-4xl">
          {selectedProject && <ProjectDetailView project={selectedProject} />}
        </DialogContent>
      </Dialog>
    </section>
  )
}

export default FeaturedProjects

