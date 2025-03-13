import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { ExternalLink, Github, Twitter } from "lucide-react"
import type { Project } from "@/types/project"
import { generateGradient, shortenId } from "@/lib/gradient-utils"
import { GrainOverlay } from "@/components/grain-overlay"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProjectDetailViewProps {
  project: Project
}

export function ProjectDetailView({ project }: ProjectDetailViewProps) {
  const gradient = generateGradient(project.id)

  return (
    <div className="max-h-[80vh] overflow-y-auto pr-1">
      <DialogHeader className="sticky top-0 z-10 bg-background pb-4">
        <div className="flex items-center justify-between">
          <DialogTitle className="text-2xl">{project.title}</DialogTitle>
          <Badge className="ml-2">{project.category}</Badge>
        </div>
        <DialogDescription>
          By {project.team} • {project.xGovPeriod} • Awarded {new Date(project.awardDate).toLocaleDateString()}
        </DialogDescription>
      </DialogHeader>

      {/* Gradient Strip with ID Badge */}
      <div className="relative h-32 sm:h-40 w-full overflow-hidden rounded-lg bg-muted mb-6">
        <div className="absolute inset-0" style={{ background: gradient }} />
        <GrainOverlay intensity="light" />

        {/* ID Badge */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded font-mono cursor-help">
                #{shortenId(project.id)}
              </div>
            </TooltipTrigger>
            <TooltipContent side="left" className="bg-background">
              <p className="text-sm font-mono mb-1">Project ID: {project.id}</p>
              <p className="text-xs max-w-[250px]">
                This unique gradient was generated from the proposal ID hash, creating a visual fingerprint for this
                project.
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Project Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="bg-muted p-3 rounded-lg dark:bg-muted/50">
          <div className="text-sm text-muted-foreground">Funding</div>
          <div className="font-bold">
            {project.fundingAmount > 0 ? `${project.fundingAmount.toLocaleString()} ALGO` : "Core Project"}
          </div>
        </div>
        <div className="bg-muted p-3 rounded-lg dark:bg-muted/50">
          <div className="text-sm text-muted-foreground">xGov Period</div>
          <div className="font-bold">{project.xGovPeriod}</div>
        </div>
        <div className="bg-muted p-3 rounded-lg dark:bg-muted/50">
          <div className="text-sm text-muted-foreground">Status</div>
          <div className="font-bold">{project.status}</div>
        </div>
        <div className="bg-muted p-3 rounded-lg dark:bg-muted/50">
          <div className="text-sm text-muted-foreground">Completion</div>
          <div className="font-bold">{project.completionPercentage}%</div>
        </div>
      </div>

      {/* Project Description */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">About the Project</h3>
        <div className="text-muted-foreground space-y-4 prose prose-sm dark:prose-invert max-w-none">
          {/* Handle HTML content if present */}
          {project.description.includes("<") ? (
            <div dangerouslySetInnerHTML={{ __html: project.description }} />
          ) : (
            <p>{project.description}</p>
          )}

          {project.longDescription &&
            (project.longDescription.includes("<") ? (
              <div className="mt-4" dangerouslySetInnerHTML={{ __html: project.longDescription }} />
            ) : (
              <p className="mt-4">{project.longDescription}</p>
            ))}
        </div>
      </div>

      {/* Milestones Section */}
      {project.milestones && project.milestones.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-3">Milestones</h3>
          <div className="space-y-4">
            {project.milestones.map((milestone, index) => (
              <div key={index} className="border-l-2 pl-4 pb-2 dark:border-primary/50">
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-2 ${milestone.completed ? "bg-green-500" : "bg-muted-foreground"}`}
                  ></div>
                  <h4 className="font-medium">{milestone.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground mt-1">{milestone.description}</p>
                {milestone.completedDate && (
                  <p className="text-xs text-muted-foreground mt-1">
                    Completed: {new Date(milestone.completedDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Links Section */}
      <div className="flex flex-wrap gap-3">
        {project.website && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.website} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              Website
            </a>
          </Button>
        )}
        {project.github && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.github} target="_blank" rel="noopener noreferrer">
              <Github className="mr-2 h-4 w-4" />
              GitHub
            </a>
          </Button>
        )}
        {project.twitter && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.twitter} target="_blank" rel="noopener noreferrer">
              <Twitter className="mr-2 h-4 w-4" />
              Twitter
            </a>
          </Button>
        )}
        {project.proposalLink && (
          <Button variant="outline" size="sm" asChild>
            <a href={project.proposalLink} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="mr-2 h-4 w-4" />
              View Proposal
            </a>
          </Button>
        )}
      </div>
    </div>
  )
}

