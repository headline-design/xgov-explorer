export interface Milestone {
  title: string
  description: string
  completed: boolean
  completedDate?: string
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription?: string
  team: string
  category: string
  fundingAmount: number
  awardDate: string
  status: "Completed" | "In Progress" | "Planning"
  completionPercentage: number
  xGovPeriod: string
  image: string
  website?: string
  github?: string
  twitter?: string
  proposalLink?: string
  milestones?: Milestone[]
}

