"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Project } from "@/types/project"
import { generateGradient } from "@/lib/gradient-utils"

interface TeamCardProps {
  teamName: string
  projects: Project[]
  activeSince: string
  totalFunding: number
  onProjectClick: (project: Project) => void
}

export function TeamCard({ teamName, projects, activeSince, totalFunding, onProjectClick }: TeamCardProps) {
  // Use the first project's ID to generate a team gradient
  const teamGradient = generateGradient(projects[0].id + teamName)

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="h-24 w-full relative" style={{ background: teamGradient }}>
        <div className="absolute inset-0 flex items-center justify-center">
          <h3 className="text-xl font-bold text-white drop-shadow-md px-4 text-center truncate">{teamName}</h3>
        </div>
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">
            {projects.length} Project{projects.length !== 1 ? "s" : ""}
          </CardTitle>
          <Badge variant="outline">Active since {activeSince}</Badge>
        </div>
        <CardDescription>Total funding: {totalFunding.toLocaleString()} ALGO</CardDescription>
      </CardHeader>

      <CardContent className="flex-grow overflow-y-auto custom-scrollbar">
        <div className="space-y-3">
          {projects.map((project) => (
            <div key={project.id} className="p-3 rounded-md border border-border hover:bg-accent/50 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <h4 className="font-medium line-clamp-1">{project.title}</h4>
                <Badge variant="secondary" className="ml-2 shrink-0">
                  {project.xGovPeriod}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground line-clamp-2 mb-2">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">
                  {new Date(project.awardDate).toLocaleDateString()}
                </span>
                <Button variant="ghost" size="sm" onClick={() => onProjectClick(project)} className="h-7 text-xs">
                  View Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

