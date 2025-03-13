"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { generateGradient, shortenId, getGradientExplanation } from "@/lib/gradient-utils"
import { GrainOverlay } from "@/components/grain-overlay"
import type { Project } from "@/types/project"

interface ProjectListItemProps {
  project: Project
  onClick: (project: Project) => void
}

export function ProjectListItem({ project, onClick }: ProjectListItemProps) {
  const gradient = generateGradient(project.id)

  return (
    <Card
      key={project.id}
      className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer dark:hover:shadow-primary/10"
      onClick={() => onClick(project)}
    >
      <div className="flex flex-col md:flex-row">
        <div className="md:w-1/4 aspect-video overflow-hidden bg-muted relative">
          <div className="h-full w-full" style={{ background: gradient }}>
            <GrainOverlay intensity="light" />

            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div
                    className="absolute top-2 right-2 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-md cursor-help z-10"
                    onClick={(e) => e.stopPropagation()}
                  >
                    #{shortenId(project.id)}
                  </div>
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-xs bg-background">
                  <p className="text-sm font-medium mb-1 text-foreground">Project ID: {project.id}</p>
                  <p className="text-xs text-muted-foreground">{getGradientExplanation(project.id)}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-bold">{project.title}</h3>
            <Badge>{project.category}</Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{project.description}</p>
          <div className="flex justify-between text-sm">
            <span>Team: {project.team}</span>
            <span className="font-medium">
              {project.fundingAmount > 0 ? `${project.fundingAmount.toLocaleString()} ALGO` : "Core Project"}
            </span>
          </div>
          <div className="flex justify-between text-xs text-muted-foreground mt-2">
            <span>Awarded: {new Date(project.awardDate).toLocaleDateString()}</span>
            <span>{project.xGovPeriod}</span>
          </div>
        </div>
      </div>
    </Card>
  )
}

