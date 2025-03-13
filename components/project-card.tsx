"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { InfoIcon } from "lucide-react"
import type { Project } from "@/types/project"
import { generateGradient, shortenId } from "@/lib/gradient-utils"
import { GrainOverlay } from "@/components/grain-overlay"

interface ProjectCardProps {
  project: Project
  onClick: (project: Project) => void
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  const gradient = generateGradient(project.id)
  const shortId = shortenId(project.id)

  return (
    <Card
      key={project.id}
      className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer dark:hover:shadow-primary/10"
      onClick={() => onClick(project)}
    >
      <div className="aspect-video w-full overflow-hidden bg-muted relative" style={{ background: gradient }}>
        {/* Grain overlay */}
        <GrainOverlay intensity="light" />

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild onClick={(e) => e.stopPropagation()}>
              <div className="absolute top-0 right-0 p-1.5 bg-black/30 backdrop-blur-sm rounded-bl-md dark:bg-white/10 flex items-center gap-1.5 hover:bg-black/40 dark:hover:bg-white/20 transition-colors z-10">
                <span className="text-xs font-mono text-white dark:text-white/90">#{shortId}</span>
                <InfoIcon className="h-3.5 w-3.5 text-white/80 dark:text-white/70" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="max-w-[250px] text-xs bg-background">
              <p className="text-xs text-foreground">
                This unique gradient is deterministically generated from the proposal&apos;s ID, creating a visual
                fingerprint specific to this proposal.
              </p>
              <p className="mt-1 font-mono text-muted-foreground">Full ID: {project.id}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black/50 to-transparent z-[1]"></div>
      </div>
      <CardHeader>
        <div className="flex justify-between items-start">
          <CardTitle className="line-clamp-1">{project.title}</CardTitle>
          <Badge>{project.category}</Badge>
        </div>
        <CardDescription className="line-clamp-2">{project.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between text-sm">
          <span>Team: {project.team}</span>
          <span className="font-medium">
            {project.fundingAmount > 0 ? `${project.fundingAmount.toLocaleString()} ALGO` : "Core Project"}
          </span>
        </div>
      </CardContent>
      <CardFooter className="text-xs text-muted-foreground">
        <div className="w-full flex justify-between">
          <span>Awarded: {new Date(project.awardDate).toLocaleDateString()}</span>
          <span>{project.xGovPeriod}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

